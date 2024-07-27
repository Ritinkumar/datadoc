import React, { useEffect, useState } from 'react';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, message, Space } from 'antd';
import { BankOutlined, CrownOutlined, ExportOutlined } from '@ant-design/icons';
import colors from './color';
const Plans = ({ setPlansFlag }) => {
    const [onMobile, setOnMobile] = useState(false);

    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            console.log('Mobile device');
            setOnMobile(true);
        } else {
            console.log('Not a mobile device');
        }
    }, []);
    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 w-full h-full '>
            <div
                className={`fixed w-[95%] z-10 ${
                    onMobile ? 'h-[90%]' : 'h-[80%]'
                }   max-w-[400px] flex flex-col items-center justify-center overflow-auto bg-white rounded-xl`}
            >
                <FontAwesomeIcon
                    icon={faDeleteLeft}
                    className='absolute top-4 right-4 text-red-500 cursor-pointer w-8 h-8 '
                    title='back'
                    onClick={() => {
                        setPlansFlag(false);
                    }}
                />
                <div className=' h-[90%] '>
                    <Space direction='vertical' size={16}>
                        <Card
                            className='shadow-2xl '
                            title={
                                <div className='flex'>
                                    <CrownOutlined className='text-gray-600 text-lg mr-4 ' />
                                    <p className='text-gray-600 font-serif'>
                                        Premium Plan
                                    </p>
                                </div>
                            }
                            // extra={
                            //     <CrownOutlined className='text-gray-600 text-lg' />
                            // }
                            style={{
                                width: 300,
                            }}
                            hoverable={true}
                        >
                            <p className='text-base font-bold font-serif text-gray-400 '>
                                Monthly
                            </p>
                            <p className='text-lg font-semibold font-serif'>
                                $49/month
                            </p>

                            <ul className='list-disc pl-5 ml-4  mb-8'>
                                <li>10% off on all credit buys</li>
                                <li>5 parllel repo creations</li>
                                <li>10 custom repo creations </li>
                            </ul>

                            <Button
                                type='text'
                                className={`text-xl  border border-gray-200 w-full   bg-${colors.primary} text-white`}
                                onClick={() => {
                                    message.warning(
                                        'premium feature not available right now'
                                    );
                                }}
                            >
                                <div className='flex'>
                                    <p>Upgrade</p>
                                    <ExportOutlined className='text-base ml-4' />
                                </div>
                            </Button>
                        </Card>
                        <Card
                            className='shadow-2xl '
                            title={
                                <div className='flex'>
                                    <BankOutlined className='text-gray-600 text-lg mr-4 '></BankOutlined>

                                    <p className='text-gray-600 font-serif '>
                                        Enterprise Plan
                                    </p>
                                </div>
                            }
                            // extra={
                            //     <CrownOutlined className='text-gray-600 text-lg' />
                            // }
                            style={{
                                width: 300,
                            }}
                            hoverable={true}
                        >
                            <p className='text-base font-bold text-gray-400 '>
                                Monthly
                            </p>
                            <p className='text-lg font-semibold font-serif'>
                                $199/month
                            </p>

                            <ul className='list-disc pl-5 ml-4  mb-8'>
                                <li>15% off on all credit buys</li>
                                <li>unlimited parllel repo creations</li>
                                <li>50 custom repo creations </li>
                            </ul>

                            <Button
                                type='text'
                                className={`text-xl  border border-gray-200 w-full   bg-${colors.primary} text-white`}
                                onClick={() => {
                                    message.warning(
                                        'premium feature not available right now'
                                    );
                                }}
                            >
                                <div className='flex'>
                                    <p>Upgrade</p>
                                    <ExportOutlined className='text-base ml-4' />
                                </div>
                            </Button>
                        </Card>
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default Plans;
