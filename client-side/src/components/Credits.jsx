import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import {
    DollarOutlined,
    FolderAddOutlined,
    FileAddOutlined,
    MessageOutlined,
    ShareAltOutlined,
    SearchOutlined,
    PlusOutlined,
    MinusOutlined,
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import Wallet from './Wallet';
const data = [
    {
        tid: 1233,
        task: 'deposit',
        filesAdded: [],
        timestamp: '2024-07-14 10:00:00',
        credits: 50,
        reponame: '',
        description: 'Top up of 50 credits.',
    },
    {
        tid: 1234,
        task: 'shared',
        filesAdded: ['file1.txt', 'file2.txt'],
        timestamp: '2024-07-14 11:00:00',
        credits: -20,
        reponame: '',
        description: 'Created repository my-repo.',
    },
    {
        tid: 1235,
        task: 'file addition',
        filesAdded: ['file3.txt'],
        timestamp: '2024-07-14 12:00:00',
        credits: -10,
        reponame: 'my-repo',
        description: 'Added file to my-repo.',
    },
    {
        tid: 1236,
        task: 'chat',
        filesAdded: [],
        timestamp: '2024-07-14 13:00:00',
        credits: -5,
        reponame: 'repo-chat1',
        description: 'Chat support session.',
    },
    {
        tid: 1237,
        task: 'deposit',
        filesAdded: [],
        timestamp: '2024-07-14 14:00:00',
        credits: 100,
        reponame: '',
        description: 'Top up of 100 credits.',
    },
    {
        tid: 1238,
        task: 'repo creation',
        filesAdded: ['fileA.txt', 'fileB.txt'],
        timestamp: '2024-07-14 15:00:00',
        credits: -30,
        reponame: 'new-repo',
        description: 'Created repository new-repo.',
    },
    {
        tid: 1239,
        task: 'file addition',
        filesAdded: ['file4.txt'],
        timestamp: '2024-07-14 16:00:00',
        credits: -15,
        reponame: 'another-repo',
        description: 'Added file to another-repo.',
    },
    {
        tid: 1240,
        task: 'chat',
        filesAdded: [],
        timestamp: '2024-07-14 17:00:00',
        credits: -5,
        reponame: 'repo-chat2',
        description: 'Chat support session.',
    },
    {
        tid: 1241,
        task: 'deposit',
        filesAdded: [],
        timestamp: '2024-07-14 18:00:00',
        credits: 75,
        reponame: '',
        description: 'Top up of 75 credits.',
    },
    {
        tid: 1242,
        task: 'repo creation',
        filesAdded: ['fileX.txt', 'fileY.txt'],
        timestamp: '2024-07-14 19:00:00',
        credits: -25,
        reponame: 'example-repo',
        description: 'Created repository example-repo.',
    },
    {
        tid: 1243,
        task: 'file addition',
        filesAdded: ['file5.txt'],
        timestamp: '2024-07-14 20:00:00',
        credits: -10,
        reponame: 'example-re',
        description: 'Added file to example-repo.',
    },
    {
        tid: 1244,
        task: 'chat',
        filesAdded: [],
        timestamp: '2024-07-14 21:00:00',
        credits: -5,
        reponame: 'repo-chat3',
        description: 'Chat support session.',
    },
    {
        tid: 1245,
        task: 'deposit',
        filesAdded: [],
        timestamp: '2024-07-14 22:00:00',
        credits: 60,
        reponame: '',
        description: 'Top up of 60 credits.',
    },
    {
        tid: 1246,
        task: 'repo creation',
        filesAdded: ['fileM.txt', 'fileN.txt'],
        timestamp: '2024-07-14 23:00:00',
        credits: -20,
        reponame: 'sample-repo',
        description: 'Created repository sample-repo.',
    },
    {
        tid: 1247,
        task: 'file addition',
        filesAdded: ['file6.txt'],
        timestamp: '2024-07-15 00:00:00',
        credits: -10,
        reponame: 'sample-repo',
        description: 'Added file to sample-repo.',
    },
    {
        tid: 1248,
        task: 'chat',
        filesAdded: [],
        timestamp: '2024-07-15 01:00:00',
        credits: -5,
        reponame: 'repo-chat4',
        description: 'Chat support session.',
    },
    {
        tid: 1249,
        task: 'deposit',
        filesAdded: [],
        timestamp: '2024-07-15 02:00:00',
        credits: 80,
        reponame: '',
        description: 'Top up of 80 credits.',
    },
    {
        tid: 1250,
        task: 'repo creation',
        filesAdded: ['fileP.txt', 'fileQ.txt'],
        timestamp: '2024-07-15 03:00:00',
        credits: -40,
        reponame: 'demo-repo',
        description: 'Created repository demo-repo.',
    },
    {
        tid: 1251,
        task: 'file addition',
        filesAdded: ['file7.txt'],
        timestamp: '2024-07-15 04:00:00',
        credits: -10,
        reponame: 'demo-repo',
        description: 'Added file to demo-repo.',
    },
    {
        tid: 1252,
        task: 'chat',
        filesAdded: [],
        timestamp: '2024-07-15 05:00:00',
        credits: -5,
        reponame: 'repo-chat5',
        description: 'Chat support session.',
    },
];

const Credits = ({ setCreditsFlag }) => {
    const [onMobile, setOnMobile] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            console.log('Mobile device');
            setOnMobile(true);
        } else {
            console.log('Not a mobile device');
        }
    }, []);
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                className='shadow-2xl'
                style={{ padding: 8 }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ marginBottom: 8, display: 'block' }}
                    size='large'
                />
                <Space>
                    <Button
                        type='text'
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters && handleReset(clearFilters);
                            handleSearch(selectedKeys, confirm, dataIndex);
                        }}
                        size='small'
                    >
                        Reset
                    </Button>
                    {/* <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button> */}
                    <Button
                        type='text'
                        className='text-red-500 '
                        size='small'
                        onClick={() => close()}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? '#1677ff' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

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

    const columns = [
        {
            title: 'Task',
            dataIndex: 'task',
            key: 'task',
            width: '20%',
            filters: [
                { text: 'Deposit', value: 'deposit' },
                { text: 'Shared', value: 'shared' },
                { text: 'Repo Creation', value: 'repo creation' },
                { text: 'File Addition', value: 'file addition' },
                { text: 'Chat', value: 'chat' },
            ],
            onFilter: (value, record) => record.task.includes(value),
            render: (task) => taskIcons[task],
        },
        {
            title: 'Details',
            dataIndex: 'details',
            key: 'details',
            width: '47%',
            ...getColumnSearchProps('reponame'),
            render: (_, record) => (
                <div>
                    <p className='font-semibold font-serif text-gray-800'>
                        {record.reponame || '-----'}
                    </p>
                    <p className='text-gray-600'>{record.timestamp}</p>
                </div>
            ),
        },
        {
            title: 'Credits',
            dataIndex: 'credits',
            key: 'credits',
            width: '25%',
            sorter: (a, b) => a.credits - b.credits,
            sortDirections: ['descend', 'ascend'],
            render: (credits) => (
                <span
                    className='flex w-full font-semibold font-serif items-center justify-center'
                    style={{ color: credits < 0 ? 'red' : 'green' }}
                >
                    {credits}
                </span>
            ),
        },
    ];

    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        setOnMobile(isMobile);
    }, []);

    const handleExpand = (expanded, record) => {
        setExpandedRowKeys(expanded ? [record.tid] : []);
    };

    const handleTableChange = (filters, sorter) => {};

    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 w-full h-full '>
            <div
                className={`fixed z-10 ${
                    onMobile
                        ? 'h-[90%] w-full'
                        : 'h-[80%] px-8 w-[95%] max-w-[500px] '
                } flex flex-col items-center justify-center  overflow-auto bg-white rounded-xl `}
            >
                <FontAwesomeIcon
                    icon={faDeleteLeft}
                    className='absolute top-4 right-4 text-red-500 cursor-pointer w-8 h-8'
                    title='back'
                    onClick={() => setCreditsFlag(false)}
                />

                <div className={` w-full  ${onMobile ? 'px-4' : ''} `}>
                    <Wallet />
                </div>
                <div className='w-full h-[50%] overflow-auto min-h-[200px] py-8 '>
                    <Table
                        className='w-full'
                        columns={columns}
                        dataSource={data}
                        rowKey='tid'
                        pagination={false}
                        sticky
                        expandable={{
                            expandedRowRender: (record) => (
                                <p style={{ margin: 0 }}>
                                    {record.description}
                                </p>
                            ),
                            expandedRowKeys: expandedRowKeys,
                            onExpand: (expanded, record) =>
                                handleExpand(expanded, record),
                            expandIcon: ({ expanded, onExpand, record }) =>
                                expanded ? (
                                    <MinusOutlined
                                        onClick={(e) => onExpand(record, e)}
                                    />
                                ) : (
                                    <PlusOutlined
                                        onClick={(e) => onExpand(record, e)}
                                    />
                                ),
                        }}
                        onChange={handleTableChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Credits;
