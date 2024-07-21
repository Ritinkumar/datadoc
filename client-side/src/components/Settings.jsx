import { DeploymentUnitOutlined, UserOutlined } from '@ant-design/icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    ConfigProvider,
    Dropdown,
    Menu,
    message,
    Radio,
    Slider,
    Space,
} from 'antd';
import React, { useEffect, useState } from 'react';

const Settings = ({ setSettingsFlag }) => {
    const [temperatureValue, setTemperatureValue] = useState(50);
    const [referenceCount, setReferenceCount] = useState(3);
    const [answerType, setAnswerType] = useState(1);
    const [chatModel, setChatModel] = useState('gpt-3.5-turbo');
    const [embeddingModel, setEmbeddingModel] = useState(
        'text-embedding-model'
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
    const handleButtonClick_chat_model = (e) => {
        message.info(
            `Click on left button. You clicked on: ${
                items_chat_model[e.key - 1].label
            }`
        );
        setChatModel(items_chat_model[e.key - 1].label);
        console.log('click left button', e);
    };

    const handleMenuClick_chat_model = (e) => {
        message.info(
            `Click on menu item. You clicked on: ${
                items_chat_model.find((item) => item.key === e.key).label
            }`
        );
        setChatModel(items_chat_model[e.key - 1].label);
        console.log('click', e);
    };

    const items_chat_model = [
        {
            label: 'Gpt4',
            key: '1',
            icon: <DeploymentUnitOutlined className='text-gray-600' />,
        },
        {
            label: 'gpt-3.5-turbo',
            key: '2',
            icon: <DeploymentUnitOutlined className='text-gray-600' />,
        },
    ];

    const menu_chat_model = (
        <Menu onClick={handleMenuClick_chat_model}>
            {items_chat_model.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                    {item.label}
                </Menu.Item>
            ))}
        </Menu>
    );

    const handleButtonClick_embedding_model = (e) => {
        message.info(
            `Click on left button. You clicked on: ${
                items_embedding_model[e.key - 1].label
            }`
        );
        setEmbeddingModel(items_embedding_model[e.key - 1].label);
        console.log('click left button', e);
    };

    const handleMenuClick_embedding_model = (e) => {
        message.info(
            `Click on menu item. You clicked on: ${
                items_embedding_model.find((item) => item.key === e.key).label
            }`
        );
        setEmbeddingModel(items_embedding_model[e.key - 1].label);
        console.log('click', e);
    };

    const items_embedding_model = [
        {
            label: 'Gpt4',
            key: '1',
            icon: <DeploymentUnitOutlined className='text-gray-600' />,
        },
        {
            label: 'gpt-3.5-turbo',
            key: '2',
            icon: <DeploymentUnitOutlined className='text-gray-600' />,
        },
    ];

    const menu_embedding_model = (
        <Menu onClick={handleMenuClick_embedding_model}>
            {items_embedding_model.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                    {item.label}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-30 w-full h-full '>
            <div
                className={`fixed w-[95%] z-10 ${
                    onMobile ? 'h-[90%]' : 'h-[80%] px-8 '
                }   max-w-[400px] flex flex-col items-center justify-center overflow-auto bg-white rounded-xl `}
            >
                <FontAwesomeIcon
                    icon={faDeleteLeft}
                    className='absolute top-4 right-4 text-red-500 cursor-pointer w-8 h-8 '
                    title='back'
                    onClick={() => {
                        setSettingsFlag(false);
                    }}
                />
                <div className='flex flex-col mb-4  '>
                    <text className='text-base mb-1 '>
                        Select chat llm model :
                    </text>
                    <Dropdown.Button
                        className='flex items-start '
                        overlay={menu_chat_model}
                        placement={onMobile ? 'bottomLeft' : 'bottom'}
                        icon={
                            <DeploymentUnitOutlined className='text-gray-600' />
                        }
                        arrow={true}
                    >
                        <p className='min-w-[250px]  flex text-bold text-gray-700  '>
                            {chatModel}
                        </p>
                    </Dropdown.Button>
                </div>
                <div className='flex flex-col mb-4 '>
                    <text className='text-base mb-1 '>
                        Select embeddings llm model :
                    </text>
                    <Dropdown.Button
                        className='flex items-start '
                        overlay={menu_embedding_model}
                        placement={onMobile ? 'bottomLeft' : 'bottom'}
                        icon={
                            <DeploymentUnitOutlined className='text-gray-600' />
                        }
                        arrow={true}
                    >
                        <p className='min-w-[250px]   flex text-bold text-gray-700  '>
                            {embeddingModel}
                        </p>
                    </Dropdown.Button>
                </div>
                <div className='min-w-[318px]  h-fit p-0 mb-4 '>
                    <p className='text-base mb-1  p-0 m-0'>
                        Select temperature value :
                    </p>
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
                            className='mt-0 '
                            min={0}
                            max={100}
                            value={temperatureValue}
                            onChange={(e) => {
                                setTemperatureValue(e);
                            }}
                            trackStyle={{ backgroundColor: '#57534e' }}
                            railStyle={{ backgroundColor: '#d9d2d8' }}
                        />
                    </ConfigProvider>
                </div>

                <div className='min-w-[318px]  h-fit p-0 mb-4 '>
                    <p className='text-base mb-1  p-0 m-0'>
                        Select number of references :
                    </p>
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
                            className='mt-0 '
                            min={3}
                            max={10}
                            value={referenceCount}
                            onChange={(e) => {
                                setReferenceCount(e);
                            }}
                            trackStyle={{ backgroundColor: '#57534e' }}
                            railStyle={{ backgroundColor: '#d9d2d8' }}
                        />
                    </ConfigProvider>
                </div>
                <div className='min-w-[318px]   h-fit  mb-4 '>
                    <p className='text-base mb-1  p-0 m-0'>
                        Select your answer type :
                    </p>
                    <div className='border border-gray-300 '>
                        <Radio.Group
                            onChange={(e) => {
                                setAnswerType(e.target.value);
                            }}
                            value={answerType}
                            className='mb-4 mt-4 mx-4'
                        >
                            <Space direction='vertical'>
                                <Radio value={1}>Summarized Answer</Radio>
                                <Radio value={2}>Detailed Explanation</Radio>
                                <Radio value={3}>Direct Answer</Radio>
                                <Radio value={4}>Step-by-Step Solution</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                </div>

                <Button
                    type='text'
                    className={
                        onMobile
                            ? ' text-xl px-8 py-2 text-gray-700 border border-gray-200  '
                            : ' text-xl px-8 py-2 text-gray-700 border border-gray-200 m-4 '
                    }
                    onClick={() => {
                        message.success('New changes have been applied ');
                    }}
                >
                    Apply
                </Button>
            </div>
        </div>
    );
};

export default Settings;
