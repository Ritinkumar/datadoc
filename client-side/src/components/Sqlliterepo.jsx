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

const { Dragger } = Upload;

const Sqlliterepo = ({ setAddRepoFlag }) => {
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

    return (
        <div className=' w-full px-2 h-full   bg-white flex items-center justify-center bg-white rounded-xl  max-w-lg'>
            <div className='flex flex-col  w-full h-fit  items-center justify-center  '>
                <Input
                    className='w-[90%] border-gray-300 m-4'
                    placeholder='Enter Folder Name'
                    prefix={<FolderOutlined className='text-gray-500 ' />}
                    type='text'
                    onChange={(e) => setFolderName(e.target.value)}
                />

                <Dragger {...draggerProps} className='m-4 '>
                    <p className='ant-upload-drag-icon'>
                        <FileOutlined style={{ color: '#57534e' }} />
                    </p>
                    <p className='ant-upload-text'>
                        Drag and drop file here, or click to select file
                    </p>
                    <p className='ant-upload-hint'>
                        Only .db file are allowed.
                    </p>
                </Dragger>

                <div className=' p-4 h-fit flex overflow-auto   max-w-[80%] items-center  justify-between '>
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className='flex  items-center justify-center px-4  min-w-fit'
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
                    className=' text-xl px-8 py-2 text-gray-700 border border-gray-50 m-8'
                    onClick={() => {
                        console.log('iiii');
                    }}
                >
                    Add
                </Button>
            </div>
        </div>
    );
};

export default Sqlliterepo;
