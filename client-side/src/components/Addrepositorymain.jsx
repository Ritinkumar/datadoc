import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import StickyBox from 'react-sticky-box';
import Addrepository from './Addrepository';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Filesrepo from './Filesrepo';
import Sqlliterepo from './Sqlliterepo';
import Postgressrepo from './Postgreerepo';
import Mysqlrepo from './Mysqlrepo';
import colors from './color';

const Addrepositorymain = ({ setAddRepoFlag }) => {
    const items = [
        {
            label: `Files`,
            key: 1,
            children: <Filesrepo setAddRepoFlag={setAddRepoFlag}></Filesrepo>,
        },
        {
            label: `Sqllite`,
            key: 2,
            children: (
                <Sqlliterepo setAddRepoFlag={setAddRepoFlag}></Sqlliterepo>
            ),
        },
        {
            label: `Postgress`,
            key: 3,
            children: (
                <Postgressrepo setAddRepoFlag={setAddRepoFlag}></Postgressrepo>
            ),
        },
        {
            label: `MySQL`,
            key: 4,
            children: <Mysqlrepo setAddRepoFlag={setAddRepoFlag} />,
        },
    ];

    const renderTabBar = (props, DefaultTabBar) => (
        <StickyBox
            offsetTop={64}
            offsetBottom={20}
            style={{
                zIndex: 1,
            }}
        >
            <DefaultTabBar {...props} />
        </StickyBox>
    );

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
        <div className='fixed inset-0 z-10 bg-black bg-opacity-50 w-full min-h-full '>
            <div
                className={`fixed ${
                    onMobile
                        ? 'w-[90%] px-4 pt-16 pb-8'
                        : 'w-[75%] px-8 pt-16 pb-8'
                } h-fit bg-white rounded-xl max-w-lg max-h-[90%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600 border border-gray-50 
            `}
            >
                <FontAwesomeIcon
                    icon={faDeleteLeft}
                    className='absolute top-4 right-4 text-red-500 cursor-pointer w-8 h-8 '
                    title='back'
                    onClick={() => {
                        setAddRepoFlag(false);
                    }}
                />

                <Tabs
                    defaultActiveKey='1'
                    renderTabBar={renderTabBar}
                    items={items}
                    size='small'
                    className='flex   text-xl font-serif  rounded-xl px-2   pt-2 '
                    tabBarGutter={30}
                />
            </div>
        </div>
    );
};

export default Addrepositorymain;
