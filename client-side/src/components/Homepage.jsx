import { Button, FloatButton } from 'antd';
import React from 'react';
import colors from './color';
import backgroundc1 from '../media/backgroundc1.jpg';
import backgroundc2 from '../media/backgroundc2.jpg';
import background4 from '../media/background4.png';
import Banner from './3dslider/Banner';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();
    return (
        <div className='overflow-auto w-full  h-screen'>
            <div className='p-4  flex items-center bg-gray-100  '>
                <p className={`font-serif text-2xl  text-${colors.primary}`}>
                    DATA DOC{' '}
                </p>
                <Button
                    type='text'
                    size='large'
                    className={`ml-auto      bg-${colors.primary}  text-white `}
                    onClick={() => {
                        navigate('/app');
                    }}
                >
                    Log In / Sign Up
                </Button>
            </div>
            <div className='flex items-center justify-center w-full h-full '>
                <Banner />
            </div>

            <div className='flex flex-wrap items-center justify-center w-full h-full'>
                <img
                    src={background4}
                    alt='Background Image'
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'cover',
                    }}
                />
                <div className='my-16'>
                    <p
                        className={`flex w-full items-center justify-center text-2xl font-serif mb-4 text-${colors.primary}`}
                    >
                        SUPPORTED TYPES
                    </p>
                    <div className='flex flex-wrap items-center justify-center gap-4 '>
                        <button className='bg-white text-gray-800 rounded-full px-4 py-2 border border-gray-300 hover:scale-125 transition-transform duration-150'>
                            PDF
                        </button>
                        <button className='bg-white text-gray-800 rounded-full px-4 py-2 border border-gray-300 hover:scale-125 transition-transform duration-150'>
                            DOCX
                        </button>
                        <button className='bg-white text-gray-800 rounded-full px-4 py-2 border border-gray-300 hover:scale-125 transition-transform duration-150'>
                            SQLite
                        </button>
                        <button className='bg-white text-gray-800 rounded-full px-4 py-2 border border-gray-300 hover:scale-125 transition-transform duration-150'>
                            PostgreSQL
                        </button>
                        <button className='bg-white text-gray-800 rounded-full px-4 py-2 border border-gray-300 hover:scale-125 transition-transform duration-150'>
                            DB
                        </button>
                        <button className='bg-white text-gray-800 rounded-full px-4 py-2 border border-gray-300 hover:scale-125 transition-transform duration-150'>
                            TXT
                        </button>
                        <button className='bg-white text-gray-800 rounded-full px-4 py-2 border border-gray-300 hover:scale-125 transition-transform duration-150'>
                            MySQL
                        </button>
                    </div>
                </div>
            </div>

            <footer className={`bg-${colors.primary} px-4 text-white py-4`}>
                <div className='flex '>
                    <div className='text-sm'>
                        <p>&copy; 2024 Data Doc. All rights reserved.</p>
                    </div>
                    <div className='flex  space-x-4 ml-auto text-sm'>
                        <span className='hover:text-gray-300 transition-colors'>
                            Privacy Policy
                        </span>
                        <span className='hover:text-gray-300 transition-colors'>
                            Terms of Service
                        </span>
                        <span className='hover:text-gray-300 transition-colors'>
                            Contact Us
                        </span>
                    </div>
                </div>
            </footer>

            <FloatButton.BackTop />
        </div>
    );
};

export default Homepage;
