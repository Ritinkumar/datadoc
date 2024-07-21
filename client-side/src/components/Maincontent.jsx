import React, { useEffect, useState } from 'react';
import { useGlobalState, useGlobalDispatch } from '../Globalstates';
import { Layout, Slider } from 'antd';
import { FloatButton } from 'antd';

import { ConfigProvider } from 'antd';
import { FileTextOutlined, MessageOutlined } from '@ant-design/icons';
import Chunksviewer from './ChunksViewer';
import QuestionAndAnswers from './QuestionAndAnswers';
const { Content } = Layout;

const Maincontent = () => {
    const [sliderValue, setSliderValue] = useState(50);
    const [showBoth, setShowBoth] = useState(true);
    const [showChat, setShowChat] = useState(true);
    const [showPdf, setShowPdf] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setShowBoth(window.innerWidth > 1024);
        };
        // Initial check on component mount
        handleResize();
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSliderChange = (value) => {
        setSliderValue(value);
    };

    const { selectedRepo, selectedRepoForAction } = useGlobalState();
    const { setSelectedRepo, setSelectedRepoForAction } = useGlobalDispatch();
    const handleFloatButton = () => {
        if (showPdf) {
            setShowPdf(false);
            setShowChat(true);
        } else {
            setShowPdf(true);
            setShowChat(false);
        }
    };

    return (
        <div className='w-full h-full border bg-white px-2 relative'>
            {showBoth && (
                <ConfigProvider
                    theme={{
                        components: {
                            Slider: {
                                handleColor: '#57534e',
                                handleActiveColor: '#57534e',
                                handleSize: 4,
                                handleSizeHover: 6,
                            },
                        },
                    }}
                >
                    <Slider
                        min={0}
                        max={100}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        trackStyle={{ backgroundColor: '#fff' }}
                        railStyle={{ backgroundColor: '#fff' }}
                    />
                </ConfigProvider>
            )}
            <div className='w-full h-[95%] flex  rounded-xl bg-white'>
                <Layout
                    className='h-full rounded-xl bg-white'
                    style={{ flexDirection: 'row' }}
                >
                    {(showBoth || showChat) && (
                        <Content
                            className={`transition-all duration-200 mr-2   rounded-xl   ${
                                !showBoth ? 'mt-8' : 'm-4 mt-0 '
                            } `}
                            style={{
                                width: `${sliderValue}%`,
                            }}
                        >
                            <QuestionAndAnswers />
                        </Content>
                    )}
                    {(showBoth || showPdf) && (
                        <Content
                            className={`transition-all duration-200   ml-2   rounded-xl ${
                                !showBoth ? 'mt-8' : 'm-4 mt-0 '
                            }  `}
                            style={{
                                width: `${100 - sliderValue}%`,
                                // padding: '20px',
                                backgroundColor: '#fff',
                            }}
                        >
                            <div>
                                <Chunksviewer></Chunksviewer>
                            </div>
                        </Content>
                    )}
                </Layout>
                {!showBoth && (
                    <FloatButton
                        className='fixed bottom-32 right-4  '
                        icon={
                            showChat ? (
                                <FileTextOutlined className='text-gray-600' />
                            ) : (
                                <MessageOutlined className='text-gray-600  ' />
                            )
                        }
                        onClick={handleFloatButton}
                    />
                )}
            </div>
        </div>
    );
};

export default Maincontent;
