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
import { getIpAddress } from './NetworkUtils';

const PdfViewer = ({ fileDetailsToView, setPdfViewerMode }) => {
    const [pdfFile, setPdfFile] = useState(null);
    const [onMobile, setOnMobile] = useState(false);
    const newPlugin = defaultLayoutPlugin();

    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            console.log('Mobile device');
            setOnMobile(true);
        } else {
            console.log('Not a mobile device');
        }
    }, []);

    const fetchPdf = async () => {
        try {
            const ipaddr = getIpAddress();
            const response = await fetch(
                `http://${ipaddr}:8000/get-pdf/?file_id=${
                    fileDetailsToView.file_id
                }&folder_id=${
                    fileDetailsToView.folder_id
                }&email=${'rkpawar706@gmail.com'}`
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
            setPdfViewerMode(false);
            alert(error.message);
        }
    };

    const handleFileFetch = () => {
        fetchPdf();
    };
    useEffect(() => {
        handleFileFetch();
    }, []);

    return (
        <div className='fixed inset-0 z-10 bg-black bg-opacity-30 w-full h-full min-h-[700px] overflow-auto'>
            <div
                className={`fixed ${
                    onMobile ? 'w-full' : 'w-[75%] px-8'
                } pt-16 pb-8  h-fit bg-gray-100 rounded-xl  max-h-[90%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600 border border-gray-100  `}
            >
                <FontAwesomeIcon
                    icon={faDeleteLeft}
                    className='absolute top-4 right-4 text-red-500 cursor-pointer w-8 h-8 '
                    title='back'
                    onClick={() => {
                        setPdfViewerMode(false);
                    }}
                />

                <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                    {pdfFile && (
                        <div
                            className='rounded-xl'
                            style={{ height: '700px', fontSize: '16px' }}
                        >
                            <Viewer fileUrl={pdfFile} plugins={[newPlugin]} />
                        </div>
                    )}
                </Worker>
            </div>
        </div>
    );
};

export default PdfViewer;
