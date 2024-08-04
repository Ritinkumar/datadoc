import React, { useEffect, useState } from 'react';
import {
    BellOutlined,
    FileTextOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MessageOutlined,
} from '@ant-design/icons';
import { Button, FloatButton, Layout, Menu, message, theme } from 'antd';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Maincontent from './Maincontent';
import { useGlobalState, useGlobalDispatch } from '../Globalstates';
const { Header, Sider, Content } = Layout;

const Main = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { isSmallScreen, isSmallScreenExtraSmall } = useGlobalState();
    const { setIsSmallScreen, setIsSmallScreenExtraSmall } =
        useGlobalDispatch();
    const [onMobile, setOnMobile] = useState(false);
    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            console.log('Mobile device');
            setOnMobile(true);
            setCollapsed(true);
        } else {
            console.log('Not a mobile device');
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
            if (window.innerWidth <= 500) {
                // setCollapsed(true);
            }
            setIsSmallScreenExtraSmall(window.innerWidth <= 640);
        };

        handleResize(); // Check screen size on initial render
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='min-h-screen h-screen'>
            <Layout className='min-h-screen h-screen'>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width={300}
                    collapsedWidth={0}
                >
                    <Sidebar collapsed={collapsed}></Sidebar>
                </Sider>

                <Layout className='h-full'>
                    <Header className='bg-white p-0 h-[8%] '>
                        <div className='flex '>
                            <Button
                                type='text'
                                size='large'
                                icon={
                                    collapsed ? (
                                        <MenuUnfoldOutlined className='text-[#645e5e]' />
                                    ) : (
                                        <MenuFoldOutlined className='text-[#645e5e]' />
                                    )
                                }
                                onClick={() => setCollapsed(!collapsed)}
                                className='text-semibold w-16 h-16 '
                            />

                            {!isSmallScreenExtraSmall || collapsed ? (
                                <Navbar></Navbar>
                            ) : (
                                <></>
                            )}
                        </div>
                    </Header>
                    {!isSmallScreenExtraSmall || collapsed ? (
                        <Content className='min-h-[280px] h-[92%]   rounded-lg'>
                            <Maincontent></Maincontent>
                        </Content>
                    ) : (
                        <></>
                    )}
                </Layout>
            </Layout>
        </div>
    );
};
export default Main;
