import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, message } from 'antd';
import colors from './color';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const Mysqlrepo = () => {
    const [form] = Form.useForm(); // Use Form hook to get form instance
    const [dbConnectionParams, setDbConnectionParams] = useState({
        username: '',
        password: '',
        host: '',
        port: '',
        database: '',
    });

    const onFinish = (values) => {
        console.log('Form values:', values);
        console.log('Database connection params:', dbConnectionParams);
        // Here you would handle database connection using dbConnectionParams
        // Example: pass dbConnectionParams to a function that initiates DB connection
    };

    const onDbParamChange = (changedValues, allValues) => {
        // Update dbConnectionParams state whenever form fields change
        setDbConnectionParams(allValues.user);
    };

    return (
        <div className='max-h-[60vh] font-normal flex overflow-y-auto overflow-x-hidden'>
            <Form
                {...layout}
                form={form} // Provide form instance to the Form component
                name='nest-messages'
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                validateMessages={validateMessages}
                onValuesChange={onDbParamChange} // Handle form field value changes
            >
                <Form.Item name={['user', 'username']} label='DB Username'>
                    <Input size='large' />
                </Form.Item>
                <Form.Item name={['user', 'password']} label='DB Password'>
                    <Input.Password size='large' />
                </Form.Item>
                <Form.Item name={['user', 'host']} label='DB Host'>
                    <Input size='large' />
                </Form.Item>
                <Form.Item name={['user', 'port']} label='DB Port'>
                    <InputNumber size='large' />
                </Form.Item>
                <Form.Item name={['user', 'database']} label='DB Name'>
                    <Input size='large' />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Button
                        type='text'
                        htmlType='submit'
                        className={`text-xl  border border-gray-200 w-[90%] bg-${colors.primary} text-white`}
                        size='large'
                        onClick={() => {
                            message.warning('feature is under  development');
                        }}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Mysqlrepo;
