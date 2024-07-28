import { Button, FloatButton } from 'antd';
import React from 'react';
import colors from './color';
import backgroundc1 from '../media/backgroundc1.jpg';
import backgroundc2 from '../media/backgroundc2.jpg';
import background4 from '../media/background4.png';

const Addrepository = () => {
    return (
        <div className='overflow-auto w-full  h-screen'>
            <div className={`w-full h-[50%] bg-${colors.primary}  `}>
                <div className='p-4  flex items-center  '>
                    <p className={`font-serif text-2xl text-white `}>
                        DATA DOC{' '}
                    </p>
                    <Button
                        type='text'
                        size='large'
                        className={`ml-auto text-xl   px-16  bg-white  text-${colors.primary}`}
                    >
                        Sign Up
                    </Button>
                </div>
                <div className='flex items-center justify-center  w-full h-[90%]  '>
                    <div className='mt-16 flex flex-col items-center justify-center w-full text-white '>
                        <h1 className='text-5xl font-serif  mb-4'>
                            WELCOME TO DATA DOC
                        </h1>
                        <p className='text-xl font-serif mb-4'>
                            EXPLORE THE BEST WAY TO TALK TO YOUR DATA
                        </p>
                        <div className='flex flex-wrap items-center justify-center gap-4 my-16'>
                            <button className='bg-white text-gray-800 rounded-full px-4 py-2 border border-gray-300'>
                                PDF
                            </button>
                            <button className='bg-white text-gray-800 rounded-full px-4 py-2 border border-gray-300'>
                                DOCX
                            </button>
                            <button className='bg-white text-gray-800 rounded-full px-4 py-2 border border-gray-300'>
                                SQLite
                            </button>
                            <button className='bg-white text-gray-800 rounded-full px-4 py-2 border border-gray-300'>
                                PostgreSQL
                            </button>
                            <button className='bg-white text-gray-800 rounded-full px-4 py-2 border border-gray-300'>
                                DB
                            </button>
                            <button className='bg-white text-gray-800 rounded-full px-4 py-2 border border-gray-300'>
                                TXT
                            </button>
                            <button className='bg-white text-gray-800 rounded-full px-4 py-2 border border-gray-300'>
                                MySQL
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-center w-full h-full'>
                <img
                    src={background4}
                    alt='Background Image'
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>

            <footer className={`bg-${colors.primary} px-4 text-white py-4`}>
                <div className='flex'>
                    <div className='text-sm'>
                        <p>&copy; 2024 Data Doc. All rights reserved.</p>
                    </div>
                    <div className='flex space-x-4 ml-auto'>
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

export default Addrepository;
