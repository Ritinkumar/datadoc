import React from 'react';
import { Card } from 'antd';

import {
    CameraOutlined,
    FileOutlined,
    FolderAddFilled,
    FolderOutlined,
    GlobalOutlined,
    LaptopOutlined,
    QuestionCircleOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import colors from './color';

const Contenthome = () => {
    const features = [
        {
            icon: <FolderAddFilled style={{ fontSize: '24px' }} />,
            text: 'Click on Add new folder from Sidebar to create a new folder',
        },
        {
            icon: <QuestionCircleOutlined style={{ fontSize: '24px' }} />,
            text: 'Click on help from Navbar for tutorials  ',
        },
        {
            icon: <FolderOutlined style={{ fontSize: '24px' }} />,
            text: 'Select folder from Sidebar to chat with entire folder ',
        },
        {
            icon: <FileOutlined style={{ fontSize: '24px' }} />,
            text: 'Open Folder from Sidebar Select File to chat with a single file',
        },
    ];

    return (
        <div className='flex flex-col items-center justify-center  h-full  w-full overflow-auto  '>
            {/* <div className=' mb-8'>
                <GlobalOutlined style={{ fontSize: '48px' }} />
            </div> */}
            <div className='flex flex-wrap justify-center gap-4'>
                {features.map((feature, index) => (
                    <Card
                        key={index}
                        className={`w-64 h-32 flex flex-col items-start  justify-center  rounded-lg shadow-xl  text-${colors.primary}`}
                    >
                        {feature.icon}
                        <div className='mt-2'>{feature.text}</div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Contenthome;
