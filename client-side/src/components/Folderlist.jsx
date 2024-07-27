import React, { useEffect, useState } from 'react';
import {
    List,
    Typography,
    Space,
    Button,
    Tooltip,
    Dropdown,
    message,
} from 'antd';
import {
    FolderOutlined,
    DownOutlined,
    RightOutlined,
    FilePdfOutlined,
    UnorderedListOutlined,
    FileAddOutlined,
    DeleteOutlined,
    ShareAltOutlined,
    ExportOutlined,
} from '@ant-design/icons';
import { useGlobalState, useGlobalDispatch } from '../Globalstates';
import PdfViewer from './PdfViewer';
import axios from 'axios';
import { getIpAddress } from './NetworkUtils';
const { Text } = Typography;

const repoListTemp = [
    {
        folder_id: 1,
        foldername: 'folder1',
        files: [
            { file_id: 1, filename: 'file1' },
            { file_id: 2, filename: 'file2' },
        ],
    },
    {
        folder_id: 2,
        foldername: 'folder2',
        files: [
            { file_id: 3, filename: 'file3' },
            { file_id: 4, filename: 'file4' },
        ],
    },
    {
        folder_id: 3,
        foldername: 'folder35555555555555555555555555555555555555555555555a',
        files: [
            {
                file_id: 5,
                filename: 'file5wertyhjukuiytrewrtyuiiuytretyytrety',
            },
            { file_id: 6, filename: 'file6' },
        ],
    },
    {
        folder_id: 4,
        foldername: 'folder4',
        files: [
            { file_id: 7, filename: 'file7' },
            { file_id: 8, filename: 'file8' },
        ],
    },
    {
        folder_id: 5,
        foldername: 'folder5',
        files: [
            { file_id: 9, filename: 'file9' },
            { file_id: 10, filename: 'file10' },
        ],
    },
];

const Folderlist = () => {
    const [openFolders, setOpenFolders] = useState([]);
    const { selectedRepo, selectedRepoForActio, selectedFile, webSocket } =
        useGlobalState();
    const { setSelectedRepo, setSelectedRepoForAction, setSelectedFile } =
        useGlobalDispatch();

    const [pdfViewerMode, setPdfViewerMode] = useState(false);
    const [fileDetailsToView, setFileDetailsToView] = useState(null);
    const [repoToView, setRepoToView] = useState(null);
    const [allFolderList, setAllFolderList] = useState(repoListTemp);

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

    useEffect(() => {
        if (!webSocket) return;

        const handleMessage = (event) => {
            const messageData = JSON.parse(event.data);
            if (messageData.type === 'new_folder_websocket_message') {
                setAllFolderList((prev) => [...prev, messageData.content]);
            }
        };

        webSocket.addEventListener('message', handleMessage);

        return () => {
            webSocket.removeEventListener('message', handleMessage);
        };
    }, [webSocket]);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const ipaddr = getIpAddress();
                const response = await axios.get(
                    `http://${ipaddr}:8000/get_folders`,
                    {
                        params: { email: 'rkpawar706@gmail.com' },
                    }
                );
                console.log(response.data);
                setAllFolderList(response.data);
            } catch (error) {
                console.error('Error fetching folders:', error);
            }
        };

        fetchFolders();
    }, []);

    const toggleFiles = (folder_id) => {
        if (openFolders.includes(folder_id)) {
            setOpenFolders(openFolders.filter((id) => id !== folder_id));
        } else {
            setOpenFolders([...openFolders, folder_id]);
        }
    };

    const repoActionItemCreation = (repo) => {
        const actionMenuItems = [
            {
                key: 'add-files ',
                label: (
                    <div
                        className=' flex text-gray-700 mx-4'
                        onClick={() => {
                            message.success(
                                `add files selected for ${repo.foldername}`
                            );
                        }}
                    >
                        <FileAddOutlined title='Add files' />
                        <Text className='ml-2 text-gray-700'>Add files</Text>
                    </div>
                ),
            },
            {
                key: 'share-repo',
                label: (
                    <div
                        className=' flex text-gray-700 mx-4 '
                        onClick={() => {
                            message.success(
                                `share repo selected for ${repo.foldername}`
                            );
                        }}
                    >
                        <ShareAltOutlined title='Share ' />
                        <Text className='ml-2 text-gray-700'>Share</Text>
                    </div>
                ),
            },
            {
                key: 'delete-repo',
                label: (
                    <div
                        className=' flex text-gray-700 mx-4'
                        onClick={() => {
                            message.success(
                                `delete repo selected for ${repo.foldername}`
                            );
                        }}
                    >
                        <DeleteOutlined title='delete respository'></DeleteOutlined>

                        <Text className='ml-2 text-gray-700 '>delete</Text>
                    </div>
                ),
            },
        ];
        return actionMenuItems;
    };

    const handleSelectingRepo = (repo) => {
        setSelectedFile(null);
        setSelectedRepo(repo);

        message.success(`selected repo ${repo.foldername} `);
    };

    const handleSelectingFile = (repo, file) => {
        setSelectedRepo(repo);
        setSelectedFile(file);
        message.success(`selected ${file.filename} from ${repo.foldername}`);
    };

    const handleSelectingRepoForAction = (repo) => {
        setSelectedRepoForAction(repo);
        message.success(`selected repo ${repo.foldername} to perform action`);
    };
    return (
        <div className='w-full overflow-x-hidden overflow-y-auto h-[99%] '>
            {pdfViewerMode && (
                <PdfViewer
                    setPdfViewerMode={setPdfViewerMode}
                    fileDetailsToView={fileDetailsToView}
                ></PdfViewer>
            )}
            <List
                itemLayout='horizontal'
                dataSource={allFolderList}
                renderItem={(repo) => (
                    <List.Item className='py-2 pl-2 mb-2 w-full'>
                        <Space
                            direction='vertical'
                            size='small'
                            className='w-full'
                        >
                            <div
                                className={`w-full flex items-center rounded-xl font-semibold font-serif  ${
                                    selectedRepo.folder_id === repo.folder_id
                                        ? 'bg-[#645e5e] text-white'
                                        : 'text-gray-600'
                                }`}
                            >
                                <Button
                                    type='text'
                                    icon={
                                        openFolders.includes(repo.folder_id) ? (
                                            <DownOutlined
                                                className={` ${
                                                    selectedRepo.folder_id ===
                                                    repo.folder_id
                                                        ? 'text-white'
                                                        : 'text-gray-600'
                                                }`}
                                            />
                                        ) : (
                                            <RightOutlined
                                                className={` ${
                                                    selectedRepo.folder_id ===
                                                    repo.folder_id
                                                        ? 'text-white'
                                                        : 'text-gray-600'
                                                }`}
                                            />
                                        )
                                    }
                                    onClick={() => toggleFiles(repo.folder_id)}
                                />
                                <FolderOutlined className='text-xl ' />

                                <div
                                    className='overflow-hidden w-3/5 max-w-3/5 ml-2 cursor-pointer '
                                    onClick={() => {
                                        handleSelectingRepo(repo);
                                    }}
                                >
                                    <Tooltip title={repo.foldername}>
                                        <Text
                                            ellipsis={true}
                                            className={` ${
                                                selectedRepo.folder_id ===
                                                repo.folder_id
                                                    ? 'text-white'
                                                    : 'text-gray-600'
                                            }`}
                                        >
                                            {repo.foldername}
                                        </Text>
                                    </Tooltip>
                                </div>

                                <Dropdown
                                    menu={{
                                        items: repoActionItemCreation(repo),
                                    }}
                                    placement={
                                        onMobile ? 'bottomLeft' : 'right'
                                    }
                                    arrow={true}
                                    className='shadow-2xl'
                                >
                                    <div className='ml-auto'>
                                        <Button
                                            type='text'
                                            shape='square'
                                            icon={
                                                <UnorderedListOutlined
                                                    className={` ${
                                                        selectedRepo.folder_id ===
                                                        repo.folder_id
                                                            ? 'text-white'
                                                            : 'text-gray-600'
                                                    }`}
                                                />
                                            }
                                            onClick={() => {
                                                handleSelectingRepoForAction(
                                                    repo
                                                );
                                            }}
                                        />
                                    </div>
                                </Dropdown>
                            </div>
                            {openFolders.includes(repo.folder_id) && (
                                <List
                                    size='small'
                                    dataSource={repo.files}
                                    renderItem={(file, index) => (
                                        <List.Item
                                            className={`w-4/5 ml-12 ${
                                                index === 0 ? 'border-t-0' : ''
                                            } mb-2  `}
                                        >
                                            <Space
                                                size='middle'
                                                className='flex w-full rounded-xl '
                                            >
                                                <FilePdfOutlined className='text-gray-600' />

                                                <Tooltip title={file.filename}>
                                                    <Text
                                                        className={`cursor-pointer px-2 rounded-xl  ${
                                                            selectedFile ===
                                                                file &&
                                                            selectedRepo.folder_id ===
                                                                repo.folder_id
                                                                ? 'bg-[#645e5e] text-white'
                                                                : 'text-gray-600'
                                                        }`}
                                                        style={{
                                                            maxWidth: '120px',
                                                            width: '120px',
                                                        }}
                                                        ellipsis={true}
                                                        onClick={() => {
                                                            handleSelectingFile(
                                                                repo,
                                                                file
                                                            );
                                                        }}
                                                    >
                                                        {file.filename}
                                                    </Text>
                                                </Tooltip>
                                                <Tooltip title={'view pdf'}>
                                                    <ExportOutlined
                                                        onClick={() => {
                                                            const t_data = {
                                                                folder_id:
                                                                    repo.folder_id,
                                                                file_id:
                                                                    file.file_id,
                                                            };
                                                            setFileDetailsToView(
                                                                t_data
                                                            );
                                                            setPdfViewerMode(
                                                                true
                                                            );
                                                        }}
                                                        className='text-gray-600 '
                                                    />
                                                </Tooltip>
                                            </Space>
                                        </List.Item>
                                    )}
                                />
                            )}
                        </Space>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Folderlist;
