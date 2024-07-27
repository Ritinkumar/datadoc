import React, { useEffect, useState } from 'react';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Faq from './Faq';
import Contactus from './Contactus';
import StickyBox from 'react-sticky-box';
import { Tabs } from 'antd';

const Help = ({ setHelpFlag }) => {
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
    const items = [
        {
            label: `Faq`,
            key: 1,
            children: <Faq></Faq>,
        },
        {
            label: `Customer support`,
            key: 2,
            children: <Contactus></Contactus>,
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

    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 w-full h-full '>
            <div
                className={`fixed w-[95%] z-10 ${
                    onMobile ? 'h-[90%] px-4' : 'h-[80%] px-8 '
                }   max-w-[400px] flex flex-col items-center justify-center overflow-auto bg-white rounded-xl `}
            >
                <FontAwesomeIcon
                    icon={faDeleteLeft}
                    className='absolute top-4 right-4 text-red-500 cursor-pointer w-8 h-8 '
                    title='back'
                    onClick={() => {
                        setHelpFlag(false);
                    }}
                />
                <Tabs
                    defaultActiveKey='1'
                    renderTabBar={renderTabBar}
                    items={items}
                    size='small'
                    className='flex  rounded-xl  text-purple-600 w-full h-full  mt-12  '
                    tabBarGutter={30}
                    tabBarStyle={{ color: '#fc03e3' }}
                />
            </div>
        </div>
    );
};

export default Help;
