import React from 'react';
import { Card, Button } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

const BalanceCard = () => (
    <Card
        className='bg-[#645e5e] '
        style={{
            borderRadius: '12px',
            color: '#ffffff',
            width: '60%',
        }}
        bodyStyle={{ padding: '12px' }}
    >
        <div className='text-sm mb-2'>Total balance</div>
        <div className='text-4xl font-bold mb-4'>$1682.30</div>
        <div className='flex w-fit items-center'>
            <Button
                type='text'
                shape='round'
                size='large'
                className='font-semibold bg-white   text-gray-600'
            >
                Top Up
            </Button>
            <Button
                type='text'
                shape='round'
                className='font-semibold bg-white   text-gray-600 ml-4'
            >
                <FontAwesomeIcon icon={faShare}></FontAwesomeIcon>
            </Button>
        </div>
    </Card>
);

const InfoCard = ({ color, label, amount }) => (
    <div className='flex items-center justify-center '>
        <div
            className={`w-4 h-4 rounded-full`}
            style={{ backgroundColor: color }}
        ></div>
        <div className='ml-2'>
            <div className='text-sm text-gray-600'>{label}</div>
            <div className='text-base text-gray-600  font-bold'>${amount}</div>
        </div>
    </div>
);

const Wallet = () => (
    <div className='flex justify-between   w-full items-center h-fit  space-x-4 bg-white mb-4  '>
        <BalanceCard />
        <div className='space-y-4 flex flex-col'>
            <InfoCard color='#fca5a5' label='Expenses' amount='670.50' />
            <InfoCard color='#fef08a' label='Shared' amount='200.00' />
            <InfoCard color='#d9f99d' label='Added' amount='2300.00' />
        </div>
    </div>
);

export default Wallet;
