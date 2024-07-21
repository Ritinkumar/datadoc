import React, { useState } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';

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

const Postgressrepo = () => {
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
        <div>
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
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'password']} label='DB Password'>
                    <Input.Password />
                </Form.Item>
                <Form.Item name={['user', 'host']} label='DB Host'>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'port']} label='DB Port'>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={['user', 'database']} label='Database Name'>
                    <Input />
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
                        className='text-xl text-gray-600 border border-gray-50'
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Postgressrepo;
