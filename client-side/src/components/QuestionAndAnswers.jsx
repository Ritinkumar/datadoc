import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Input, Space, Tooltip } from 'antd';
import {
    ArrowRightOutlined,
    InfoCircleOutlined,
    FolderOutlined,
    FileOutlined,
    QuestionCircleOutlined,
    UnorderedListOutlined,
    SendOutlined,
    CommentOutlined,
    MenuOutlined,
} from '@ant-design/icons';

import { useGlobalDispatch, useGlobalState } from '../Globalstates';
import { getIpAddress } from './NetworkUtils';
const dummyData_initial = [
    {
        id: 1,
        question: 'What is React?',
        answer: 'React is a JavaScript library for building user interfaces. React allows developers to create large web applications that can update and render efficiently in response to data changes. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with rendering data to the DOM, and so creating React applications usually requires the use of additional libraries for state management and routing. Redux and React Router are respective examples of such libraries.',
        foldername: 'Folder 1',
        filename: null,
    },
    {
        id: 2,
        question: 'How does useState work?',
        answer: 'useState is a hook that allows you to have state variables in functional components. You pass the initial state to this function and it returns a variable with the current state value (not necessarily the initial state) and another function to update this value. The useState hook is a special function that takes the initial state as an argument and returns an array with the current state and a function to update it. This hook makes it easier to encapsulate logic and share it among components, and it provides a way to manage the state of functional components.',
        foldername: 'Folder 2',
        filename: 'file2.js',
    },
    {
        id: 3,
        question:
            'Explain the useEffect hook.The useEffect hook allows you to perform side effects in function componentsThe useEffect hook allows you to perform side effects in function components',
        answer: 'The useEffect hook allows you to perform side effects in function components. It is similar to componentDidMount, componentDidUpdate, and componentWillUnmount in class components, but unified into a single API. The useEffect hook takes two arguments: a function that contains the side effect code, and an optional array of dependencies. The side effect function is executed after every render of the component, and if any values in the dependency array have changed since the last render, the side effect is re-executed. This hook is useful for data fetching, subscriptions, or manually changing the DOM in React components.',
        foldername: 'Folder 3',
        filename: null,
    },
    {
        id: 4,
        question: 'What is the Virtual DOM?',
        answer: 'The Virtual DOM (VDOM) is a programming concept where an ideal, or "virtual", representation of a UI is kept in memory and synced with the "real" DOM by a library such as ReactDOM. This process is called reconciliation. The Virtual DOM works by creating a copy of the real DOM, making changes to this virtual copy, and then comparing the virtual DOM to the real DOM to identify the changes that need to be made. This allows React to update only the parts of the DOM that have changed, rather than re-rendering the entire DOM, which results in significant performance improvements.',
        foldername: 'Folder 4',
        filename: null,
    },
    {
        id: 5,
        question: 'What are props in React?',
        answer: 'Props (short for "properties") are read-only attributes that are used to pass data from one component to another in React. They allow you to customize the appearance and behavior of a component based on the values passed to it. Props are passed from parent components to child components and can be of any data type, including functions. They are used to configure a component when it is created and cannot be changed by the child component itself. Instead, the parent component must change the props it passes to the child component if it wants to change the child component’s behavior.',
        foldername: 'Folder 5',
        filename: null,
    },
];

const QuestionAndAnswers = () => {
    const messagesEndRef = useRef(null);
    const { selectedRepo, selectedFile, webSocket } = useGlobalState();
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [dummyData, setDummyData] = useState(dummyData_initial);

    useEffect(() => {
        // Scroll to the bottom of the div when component mounts
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop =
                messagesEndRef.current.scrollHeight;
        }
    }, [dummyData]);

    useEffect(() => {
        if (!webSocket) return;

        const handleMessage = (event) => {
            const messageData = JSON.parse(event.data);
            if (messageData.type === 'qna_message') {
                setDummyData((prev) => [...prev, messageData.content]);
            }
        };

        webSocket.addEventListener('message', handleMessage);

        return () => {
            webSocket.removeEventListener('message', handleMessage);
        };
    }, [webSocket]);

    const sendQnaMessage = async () => {
        const email = localStorage.getItem('ddLoginMail'); // Update this with the actual email
        const ipaddr = getIpAddress();
        const response = await fetch(
            `http://${ipaddr}:8000/send-qna-message/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    email: email,
                }),
            }
        );

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error('Error:', response.statusText);
        }
    };

    return (
        <div className='h-full w-[98%] flex flex-col'>
            <div
                className='flex overflow-y-auto max-h-[750px] h-[750px]'
                ref={messagesEndRef}
            >
                <div className='w-[98%]'>
                    <Row gutter={16} className='py-4'>
                        <Col span={24}>
                            {dummyData.map((item) => (
                                <div key={item.id} className='mb-4 mt-4'>
                                    <div className='text-left  mb-2 flex  items-center'>
                                        <Tooltip
                                            title={
                                                item.filename
                                                    ? item.filename
                                                    : item.foldername
                                            }
                                        >
                                            {item.filename ? (
                                                <FileOutlined className='text-[#645e5e] text-lg' />
                                            ) : (
                                                <FolderOutlined className='text-[#645e5e] text-lg' />
                                            )}
                                        </Tooltip>
                                        <div
                                            className='ml-2  bg-[#645e5e]  text-white inline-block p-1 rounded-xl max-w-[85%]   px-4 cursor-pointer'
                                            onDoubleClick={() => {
                                                setCurrentQuestion(
                                                    item.question
                                                );
                                            }}
                                        >
                                            {item.question}
                                            <p
                                                className='text-gray-400  text-right '
                                                style={{ fontSize: '0.625rem' }}
                                            >
                                                {'12/7/2000 5:00pm'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='text-right max-w-[85%] ml-auto'>
                                        <div className='bg-gray-200 inline-block p-2 rounded-xl px-4'>
                                            <div className='text-justify'>
                                                {item.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Col>
                    </Row>
                </div>
            </div>

            <div className='w-[98%] mt-4 '>
                <Input
                    className='border border-[#645e5e] '
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            sendQnaMessage();
                        }
                    }}
                    prefix={
                        <Space>
                            <Tooltip
                                title={
                                    selectedFile
                                        ? `Ask Questions to ${selectedFile} from ${selectedRepo.foldername} `
                                        : `Ask Questions to  ${selectedRepo.foldername} `
                                }
                            >
                                <InfoCircleOutlined className='text-[#645e5e]' />
                            </Tooltip>
                        </Space>
                    }
                    placeholder={
                        selectedFile
                            ? `Ask Questions to ${selectedFile.filename} from ${selectedRepo.foldername} `
                            : `Ask Questions to  ${selectedRepo.foldername} `
                    }
                    size='large'
                    suffix={
                        <Space>
                            <SendOutlined
                                className='cursor-pointer px-1 text-[#645e5e]'
                                onClick={sendQnaMessage}
                            ></SendOutlined>
                            <Tooltip title='Double click to Ask to every file in folder'>
                                <MenuOutlined className='cursor-pointer text-[#645e5e]'></MenuOutlined>
                            </Tooltip>
                        </Space>
                    }
                    value={currentQuestion}
                    onChange={(e) => {
                        setCurrentQuestion(e.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default QuestionAndAnswers;
