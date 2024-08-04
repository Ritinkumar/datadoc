import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { useGlobalState, useGlobalDispatch } from '../Globalstates';
import Input from 'antd/es/input/Input';
import {
    FolderOutlined,
    FileOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import axios from 'axios';
import { getIpAddress } from './NetworkUtils';
import colors from './color';
const { Dragger } = Upload;

const Filesrepo = ({ setAddRepoFlag }) => {
    const { isSmallScreen, isSmallScreenExtraSmall, isUserLoggedIn } =
        useGlobalState();
    const { setIsSmallScreen, setIsSmallScreenExtraSmall, setIsUserLoggedIn } =
        useGlobalDispatch();

    const [folderName, setFolderName] = useState('');
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
            setIsSmallScreenExtraSmall(window.innerWidth <= 640);
        };

        handleResize(); // Check screen size on initial render
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        addFilesToState(selectedFiles);
    };

    const addFilesToState = (selectedFiles) => {
        const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
        ];

        const filteredFiles = selectedFiles.filter((file) =>
            allowedTypes.includes(file.type)
        );
        if (filteredFiles.length !== selectedFiles.length) {
            message.error('Only PDF, DOCX, and text files are allowed.');
        }

        // setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
        setFiles(filteredFiles);
    };

    const removeFile = (fileIndex) => {
        const updatedFiles = [...files];
        updatedFiles.splice(fileIndex, 1);
        setFiles(updatedFiles);
    };

    const draggerProps = {
        name: 'file',
        multiple: true,
        showUploadList: false,
        customRequest({ file, onSuccess }) {
            setTimeout(() => {
                onSuccess('ok');
            }, 0);
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                addFilesToState(
                    info.fileList.map((file) => file.originFileObj)
                );
                // Clear the fileList in Dragger after processing (not recommended, see note below)
                // info.fileList = [];
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
            addFilesToState(Array.from(e.dataTransfer.files));
            // Clear the dataTransfer after processing
            e.dataTransfer.clearData();
        },
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('email', 'rkpawar706@gmail.com');
        formData.append('foldername', folderName);

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        try {
            const ipaddr = getIpAddress();
            const response = await axios.post(
                `http://${ipaddr}:8000/new_folder`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading files:', error);
        } finally {
            setAddRepoFlag(false);
        }
    };

    return (
        <div className=' w-full px-2 h-full   bg-white flex items-center justify-center bg-white rounded-xl  max-w-lg'>
            <div className='flex flex-col  w-full h-fit  items-center justify-center  '>
                <Input
                    className='w-[90%] border-gray-300 m-4'
                    placeholder='Enter Folder Name'
                    prefix={<FolderOutlined className='text-gray-500 ' />}
                    type='text'
                    onChange={(e) => setFolderName(e.target.value)}
                    // style={{
                    //     fontSize: '16px',
                    // }}
                    size='large'
                />

                <Dragger {...draggerProps} className='m-4 '>
                    <p className='ant-upload-drag-icon'>
                        <FileOutlined style={{ color: '#57534e' }} />
                    </p>
                    <p className='ant-upload-text'>
                        Drag and drop files here, or click to select files
                    </p>
                    <p className='ant-upload-hint'>
                        Only PDF, DOCX, and text files are allowed.
                    </p>
                </Dragger>

                <div className=' p-4 h-fit flex overflow-auto   max-w-[80%] items-center  justify-between '>
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className='flex  items-center justify-center px-4  min-w-fit text-base'
                        >
                            <FileOutlined className='text-gray-500 mr-2' />
                            <span>{file.name}</span>
                            <DeleteOutlined
                                className='ml-2 text-red-500 cursor-pointer'
                                onClick={() => removeFile(index)}
                            ></DeleteOutlined>
                        </div>
                    ))}
                </div>

                <Button
                    type='text'
                    className={`text-xl  border border-gray-200 w-[90%] my-4 bg-${colors.primary} text-white`}
                    onClick={handleSubmit}
                    size='large'
                >
                    Add
                </Button>
            </div>
        </div>
    );
};

export default Filesrepo;
