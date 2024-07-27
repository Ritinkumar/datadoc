import React, { useEffect, useState } from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import { Collapse, Button } from 'antd';
import { getIpAddress } from './NetworkUtils';

const Faq = () => {
    const [expandIconPosition, setExpandIconPosition] = useState('start');
    const [videoUrl, setVideoUrl] = useState(null);
    const [playingVideo, setPlayingVideo] = useState(null);

    const fetchVideo = async (videoName) => {
        try {
            const ipaddr = getIpAddress();
            const response = await fetch(
                `http://${ipaddr}:8000/api/video?name=${videoName}`
            );
            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                return url;
            }
            throw new Error('Failed to fetch video');
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const faqItems = [
        {
            key: '1',
            question: 'What is a dog?',
            answer: 'A dog is a type of domesticated animal known for its loyalty and faithfulness.',
            videoName: 'dog-intro',
        },
        {
            key: '2',
            question: 'How to train a dog?',
            answer: 'Training a dog involves consistent practice and positive reinforcement.',
            videoName: 'dog-training',
        },
        {
            key: '3',
            question: 'What do dogs eat?',
            answer: 'Dogs typically eat meat-based diets, but some can eat vegetables as well.',
            videoName: 'dog-diet',
        },
        {
            key: '4',
            question: 'How to train a dog?',
            answer: 'Training a dog involves consistent practice and positive reinforcement.',
            videoName: 'dog-training-2',
        },
        {
            key: '5',
            question: 'What do dogs eat?',
            answer: 'Dogs typically eat meat-based diets, but some can eat vegetables as well.',
            videoName: 'dog-diet-2',
        },
    ];

    const items = faqItems.map((item) => {
        const isPlaying = playingVideo === item.videoName;

        const handleVideoToggle = async () => {
            if (isPlaying) {
                setVideoUrl(null);
                setPlayingVideo(null);
            } else {
                const url = await fetchVideo(item.videoName);
                setVideoUrl(url);
                setPlayingVideo(item.videoName);
            }
        };

        return {
            key: item.key,
            label: item.question,
            children: (
                <div>
                    <p>{item.answer}</p>
                    <Button
                        className='text-red-600  my-2 font-bold '
                        type='text'
                        icon={<PlayCircleOutlined />}
                        onClick={handleVideoToggle}
                    >
                        <p className='text-gray-600 '>
                            {' '}
                            {isPlaying ? 'Stop Video' : 'Watch Video'}
                        </p>
                    </Button>
                    {isPlaying && videoUrl && (
                        <video width='320' height='240' controls>
                            <source src={videoUrl} type='video/mp4' />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
            ),
        };
    });

    const onChange = (key) => {
        console.log(key);
    };

    const renderTabBar = (props, DefaultTabBar) => <DefaultTabBar {...props} />;

    return (
        <div className='w-full h-[580px] max-h-[580px] max-h-[70vh] overflow-auto bg-white flex max-w-lg py-4'>
            <Collapse
                className='w-full h-fit text-justify rounded-sm '
                defaultActiveKey={['1']}
                expandIconPosition={expandIconPosition}
                onChange={onChange}
                items={items}
            />
        </div>
    );
};

export default Faq;
