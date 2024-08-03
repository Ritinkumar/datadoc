import React, { useEffect, useState } from 'react';
import { Progress, Tooltip } from 'antd';
import {
    DollarOutlined,
    ShareAltOutlined,
    FolderAddOutlined,
    FileAddOutlined,
    MessageOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import colors from './color';

const list2 = [
    {
        repoid: 1251,
        task: 'file addition',
        filesAdded: ['file7.txt'],
        timestamp: '2024-07-15 04:00:00',
        credits: -10,
        percentageCompletion: 80,
        reponame: 'demo-repo',
        description: 'Added file to demo-repo.',
        status: 'exception',
    },
    {
        repoid: 1252,
        task: 'repo creation',
        filesAdded: [],
        timestamp: '2024-07-16 05:00:00',
        credits: 20,
        percentageCompletion: 100,
        reponame: 'new-repo',
        description: 'Created a new repository.',
        status: 'success',
    },
];
const list = [
    {
        repoid: 1251,
        task: 'file addition',
        filesAdded: ['file7.txt'],
        timestamp: '2024-07-15 04:00:00',
        credits: -10,
        percentageCompletion: 80,
        reponame: 'demo-repo',
        description: 'Added file to demo-repo.',
        status: 'exception',
    },
    {
        repoid: 1252,
        task: 'repo creation',
        filesAdded: [],
        timestamp: '2024-07-16 05:00:00',
        credits: 20,
        percentageCompletion: 100,
        reponame: 'new-repo',
        description: 'Created a new repository.',
        status: 'success',
    },
    {
        repoid: 1253,
        task: 'shared',
        filesAdded: [],
        timestamp: '2024-07-17 06:00:00',
        credits: 15,
        percentageCompletion: 50,
        reponame: 'shared-repo',
        description: 'Shared repository with collaborators.',
        status: 'active',
    },
    {
        repoid: 1254,
        task: 'chat',
        filesAdded: [],
        timestamp: '2024-07-18 07:00:00',
        credits: -5,
        percentageCompletion: 30,
        reponame: 'chat-repo',
        description: 'Chat with team members.',
        status: 'exception',
    },
    {
        repoid: 1255,
        task: 'file addition',
        filesAdded: ['file8.txt'],
        timestamp: '2024-07-19 08:00:00',
        credits: -10,
        percentageCompletion: 70,
        reponame: 'demo-repo',
        description: 'Added another file to demo-repo.',
        status: 'active',
    },
    {
        repoid: 1256,
        task: 'repo creation',
        filesAdded: [],
        timestamp: '2024-07-20 09:00:00',
        credits: 25,
        percentageCompletion: 100,
        reponame: 'another-repo',
        description: 'Created another new repository.',
        status: 'success',
    },
    {
        repoid: 1257,
        task: 'shared',
        filesAdded: [],
        timestamp: '2024-07-21 10:00:00',
        credits: 10,
        percentageCompletion: 40,
        reponame: 'shared-repo2',
        description: 'Shared another repository with collaborators.',
        status: 'active',
    },
    {
        repoid: 1258,
        task: 'file addition',
        filesAdded: ['file9.txt'],
        timestamp: '2024-07-22 11:00:00',
        credits: -5,
        percentageCompletion: 90,
        reponame: 'demo-repo',
        description: 'Added file to demo-repo.',
        status: 'active',
    },
    {
        repoid: 1259,
        task: 'chat',
        filesAdded: [],
        timestamp: '2024-07-23 12:00:00',
        credits: -10,
        percentageCompletion: 20,
        reponame: 'chat-repo2',
        description: 'Another chat with team members.',
        status: 'exception',
    },
    {
        repoid: 1260,
        task: 'shared',
        filesAdded: [],
        timestamp: '2024-07-24 13:00:00',
        credits: 5,
        percentageCompletion: 60,
        reponame: 'shared-repo3',
        description: 'Final share of the repository.',
        status: 'active',
    },
];

const taskIcons = {
    deposit: (
        <DollarOutlined
            className='rounded-lg text-white'
            style={{
                fontSize: '24px',
                backgroundColor: '#645e5e',
                padding: '4px',
            }}
        />
    ),
    shared: (
        <ShareAltOutlined
            className='rounded-lg text-white'
            style={{
                fontSize: '24px',
                backgroundColor: '#645e5e',
                padding: '4px',
            }}
        />
    ),
    'repo creation': (
        <FolderAddOutlined
            className='rounded-lg text-white'
            style={{
                fontSize: '24px',
                backgroundColor: '#645e5e',
                padding: '4px',
            }}
        />
    ),
    'file addition': (
        <FileAddOutlined
            className='rounded-lg text-white'
            style={{
                fontSize: '24px',
                backgroundColor: '#645e5e',
                padding: '4px',
            }}
        />
    ),
    chat: (
        <MessageOutlined
            className='rounded-lg text-white'
            style={{
                fontSize: '24px',
                backgroundColor: '#645e5e',
                padding: '4px',
            }}
        />
    ),
};

const Notifications = ({ setNotificationFlag }) => {
    const [notificationsList, setNotificationList] = useState(list);
    const [onMobile, setOnMobile] = useState(false);

    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        setOnMobile(isMobile);
    }, []);

    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 w-full h-full'>
            <div
                className={`fixed w-[95%] z-10 ${
                    onMobile ? 'h-[90%]' : 'h-[80%]'
                } max-w-[400px] flex flex-col items-start  justify-center overflow-auto bg-white rounded-xl`}
            >
                <CloseOutlined
                    title='Cancel'
                    className='w-8 h-8 absolute top-4 right-4 rounded-full items-center justify-center text-red-800 text-xl font-bold bg-gray-100 hover:bg-gray-200 hover:scale-110'
                    onClick={() => setNotificationFlag(false)}
                />
                <div className='max-h-[85%] h-[85%] overflow-auto  w-full p-4  '>
                    {list.map((notification) => (
                        <div
                            key={notification.repoid}
                            className='flex  items-center justify-between mb-4 p-2 border-b border-gray-300'
                        >
                            <div className='flex items-center w-full'>
                                <Tooltip
                                    title={notification.description}
                                    placement={onMobile ? 'topRight' : 'top'}
                                >
                                    {taskIcons[notification.task]}
                                </Tooltip>
                                <div className='ml-3 w-full  flex flex-col '>
                                    <Progress
                                        percent={
                                            notification.percentageCompletion
                                        }
                                        status={notification.status}
                                        strokeColor={
                                            notification.status === 'active'
                                                ? colors.primaryHex
                                                : ''
                                        }
                                        className='w-full '
                                    />
                                    <div className='mt-2 text-xs flex  justify-between w-full '>
                                        <div>{notification.reponame}</div>
                                        <div>{notification.timestamp}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
