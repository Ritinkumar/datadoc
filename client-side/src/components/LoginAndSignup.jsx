import { Button, message, Input, Watermark } from 'antd';
import Title from 'antd/es/skeleton/Title';
import React, { useEffect, useState } from 'react';
import { useGlobalState, useGlobalDispatch } from '../Globalstates';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Input from 'antd/es/input/Input';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../media/logo.png';
import Alert from 'antd/es/alert/Alert';
import axios from 'axios';
import { getIpAddress } from './NetworkUtils';

const LoginAndSignup = () => {
    const { setIsUserLoggedIn } = useGlobalDispatch();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [otp, setOtp] = useState('');

    const [verifyOtp, setVerifyOtp] = useState(false);

    const validateAlreadyLoggedIn = (credentials) => {
        return true;
    };

    useEffect(() => {
        const alreadyLoggedInCredentials = localStorage.getItem('ddLoginMail');
        if (
            alreadyLoggedInCredentials &&
            validateAlreadyLoggedIn(alreadyLoggedInCredentials)
        ) {
            setIsUserLoggedIn(true);
            return;
        }
    }, []);

    const handleLogin = () => {
        console.log(email);
        console.log(password);
        message.success('Login successfull ');
        localStorage.setItem('ddLoginMail', email);
        setIsUserLoggedIn(true);
    };

    const handleSignUp = async () => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);

        try {
            setVerifyOtp(true);
            const ipaddr = getIpAddress();
            const response = await axios.post(
                `http://${ipaddr}:8000/validate_user/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 201) {
            } else if (response.status === 400) {
                setError(response.data.message);
                setVerifyOtp(false);
            }
        } catch (error) {
            console.error('Error validating user:', error);
            setError(`Failed to send otp make sure ${email} is valid`);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (isSignUp) {
                handleSignUp();
            } else {
                handleLogin();
            }
        }
    };

    const handleOtpVerification = async () => {
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('otp', parseInt(otp, 10));
            const ipaddr = getIpAddress();
            const response = await axios.post(
                `http://${ipaddr}:8000/register_user/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 201) {
                setIsUserLoggedIn(true);
            } else {
                setError(response.data.detail);
            }
        } catch (error) {
            setError('invalid otp');
            setError('An error occurred while registering.');
        }
    };

    return (
        <div className='fixed flex  w-full h-full '>
            {error && (
                <Alert
                    message='Error'
                    description={error}
                    type='error'
                    showIcon
                    closable
                    onClose={() => setError(null)}
                    className='fixed z-30 top-4  ml-auto mr-4 w-fit h-fit ' // Clear error message
                />
            )}

            <Watermark
                gap={[20, 20]}
                content={['Data doc', 'lets talk to your data']}
            >
                <div
                    style={{
                        height: 2000,
                        width: 2000,
                    }}
                >
                    <div className='fixed z-10 flex items-center justify-center w-full h-full'>
                        <div className='fixed w-[70%] h-fit max-w-sm flex flex-col bg-white items-center justify-center rounded-xl border border-gray-300'>
                            <img
                                src={logo}
                                alt='Logo'
                                className={`w-3/5 max-w-xs  mt-12 m-4`}
                            />
                            {!verifyOtp ? (
                                <>
                                    {isSignUp && (
                                        <Input
                                            size='large'
                                            placeholder='Username'
                                            className='w-[90%] border-gray-200 m-4 '
                                            prefix={<UserOutlined />}
                                            type='text'
                                            onChange={(e) => {
                                                setUsername(e.target.value);
                                            }}
                                            onKeyPress={handleKeyPress}
                                        />
                                    )}
                                    <Input
                                        size='large'
                                        placeholder='Email'
                                        className='w-[90%] border-gray-200 m-4 bg-white'
                                        prefix={<MailOutlined />}
                                        type='text'
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <Input.Password
                                        size='large'
                                        className='w-[90%] border-gray-200 m-4'
                                        placeholder='Password'
                                        prefix={<LockOutlined />}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        onKeyPress={handleKeyPress}
                                    />

                                    {isSignUp && (
                                        <Input.Password
                                            size='large'
                                            placeholder='Confirm Password'
                                            className='w-[90%] border-gray-200 m-4 '
                                            prefix={<LockOutlined />}
                                            onChange={(e) => {
                                                setConfirmPassword(
                                                    e.target.value
                                                );
                                            }}
                                            onKeyPress={handleKeyPress}
                                        />
                                    )}

                                    {isSignUp ? (
                                        <Button
                                            type='text'
                                            className=' text-2xl px-8 py-2 text-gray-700 border border-gray-200 m-4'
                                            onClick={handleSignUp}
                                        >
                                            Sign up
                                        </Button>
                                    ) : (
                                        <Button
                                            type='text'
                                            className=' text-2xl px-8 py-2 text-gray-700 border border-gray-200 m-4'
                                            onClick={handleLogin}
                                        >
                                            Login
                                        </Button>
                                    )}

                                    <p className='text-gray-700 mt-2 mb-4 '>
                                        {isSignUp
                                            ? ' Already have an account ? '
                                            : "Don't have an account ? "}
                                        <span
                                            className={`cursor-pointer text-blue-500`}
                                            onClick={() => {
                                                setIsSignUp(!isSignUp);
                                            }}
                                        >
                                            {isSignUp ? 'Login' : 'Sign up'}
                                        </span>
                                    </p>
                                </>
                            ) : (
                                <div className='flex flex-col items-center justify-center'>
                                    <Input
                                        size='large'
                                        className='w-[90%] border-gray-200 m-4'
                                        placeholder='Enter Otp '
                                        prefix={<LockOutlined />}
                                        type='text'
                                        onChange={(e) => {
                                            setOtp(e.target.value);
                                        }}
                                        onKeyPress={handleKeyPress}
                                    />

                                    <Button
                                        type='text'
                                        className=' text-xl px-8 py-2 text-gray-700 border border-gray-200 m-4'
                                        onClick={handleOtpVerification}
                                    >
                                        Verify Otp
                                    </Button>

                                    <p className='text-gray-400  '>{email}</p>

                                    <p className='text-gray-700 mt-2 mb-4 '>
                                        <span
                                            className={`cursor-pointer text-blue-500  `}
                                            onClick={() => {
                                                handleSignUp();
                                            }}
                                        >
                                            Resend
                                        </span>
                                        <span> Or</span>
                                        <span
                                            className={`cursor-pointer text-blue-500 ml-2 `}
                                            onClick={() => {
                                                setVerifyOtp(false);
                                            }}
                                        >
                                            Sign up
                                        </span>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Watermark>
        </div>
    );
};

export default LoginAndSignup;
