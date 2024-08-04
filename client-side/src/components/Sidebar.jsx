import React, { useEffect, useState } from 'react';
import logo from '../media/logo2.png';
import { Button } from 'antd';
import { FolderAddFilled, FolderAddOutlined } from '@ant-design/icons';

import Folderlist from './Folderlist';
import Addrepositorymain from './Addrepositorymain';

const Sidebar = ({ collapsed }) => {
    const [addRepoFlag, setAddRepoFlag] = useState(false);

    return (
        <div className='border-r border-gray-700  bg-white w-full h-full '>
            {addRepoFlag && (
                <Addrepositorymain
                    setAddRepoFlag={setAddRepoFlag}
                ></Addrepositorymain>
            )}
            <div className='flex flex-col items-center justify-start px-2 py-2 w-full h-full '>
                <img
                    src={logo}
                    alt='Logo'
                    className={`max-w-xs mx-8 mb-8 `}
                    style={{
                        width: '40%',
                    }}
                />

                <Button
                    className='text-xl font-semibold   text-gray-600   w-full '
                    type='text'
                    size='large'
                    onClick={() => {
                        setAddRepoFlag(true);
                    }}
                >
                    <div className='flex  '>
                        {/* <FolderAddOutlined /> */}
                        <FolderAddFilled />
                        <p className='ml-4  font-serif '>New Folder</p>
                    </div>
                </Button>
                <div className='relative mt-8 w-full h-[60%] flex-grow max-h-[70%]'>
                    <div className='absolute w-full h-full'>
                        <Folderlist />
                    </div>
                </div>

                <div className='h-[10%] mt-4 border-t border-[#645e5e] flex items-center justify-center w-full font-bold text-[#645e5e] '>
                    {localStorage.getItem('ddLoginMail')}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
