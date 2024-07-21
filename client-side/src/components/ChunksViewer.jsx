import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

import { Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { message } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { getIpAddress } from './NetworkUtils';

const Chunksviewer = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [onMobile, setOnMobile] = useState(false);
    const newPlugin = defaultLayoutPlugin();
    const [pageNumber, setPageNubmer] = useState(0);

    //Buttons
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 4;
    const totalItems = 10;

    const handleNext = () => {
        if (startIndex + itemsPerPage < totalItems) {
            setStartIndex(startIndex + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (startIndex - itemsPerPage >= 0) {
            setStartIndex(startIndex - itemsPerPage);
        }
    };

    const ButtonsDisplay = () => {
        return (
            <div className='flex items-center justify-center '>
                <ArrowLeftOutlined
                    onClick={handlePrev}
                    shape='square'
                    disabled={startIndex === 0}
                />

                <div className='flex flex-wrap'>
                    {Array.from({ length: itemsPerPage }).map((_, index) => {
                        const itemIndex = startIndex + index;
                        if (itemIndex < totalItems) {
                            return (
                                <Button
                                    key={itemIndex}
                                    className='w-8 h-8 m-2 rounded-md '
                                    onClick={setPageNubmer(itemIndex + 1)}
                                >
                                    {itemIndex + 1}
                                </Button>
                            );
                        }
                        return null;
                    })}
                </div>
                <Button
                    type='text'
                    icon={<ArrowRightOutlined />}
                    onClick={handleNext}
                    disabled={startIndex + itemsPerPage >= totalItems}
                />
            </div>
        );
    };

    //buttons end

    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            console.log('Mobile device');
            setOnMobile(true);
        } else {
            console.log('Not a mobile device');
        }
    }, []);

    const fetchPdf = async (filename) => {
        try {
            const randomNumber = Math.floor(Math.random() * 10000);
            const ipaddr = await getIpAddress();
            const response = await fetch(
                `http://${ipaddr}:8000/get-pdf-temp/?filename=${encodeURIComponent(
                    `${filename}${randomNumber.toString()}`
                )}`
            );
            if (!response.ok) {
                throw new Error('PDF not found');
            }
            const blob = await response.blob();
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = (e) => {
                setPdfFile(e.target.result);
            };
        } catch (error) {
            message.error('File not found .');

            alert(error.message);
        }
    };

    const handleFileFetch = () => {
        const filename = 'AIJIEI';
        fetchPdf(filename);
    };
    useEffect(() => {
        handleFileFetch();
    }, [pageNumber]);

    return (
        <div>
            <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                {pdfFile && (
                    <div className='rounded-xl' style={{ height: '750px' }}>
                        <Viewer
                            fileUrl={pdfFile}
                            plugins={[newPlugin]}
                            initialPage={pageNumber}
                        />
                    </div>
                )}
            </Worker>
            <div className='bg-gray-300 border-t-0  border border-gray-400'>
                <ButtonsDisplay />
            </div>
        </div>
    );
};

export default Chunksviewer;
