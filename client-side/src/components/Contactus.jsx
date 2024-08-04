import React from 'react';
import { Button, Form, Input, message } from 'antd';
import colors from './color';
const Contactus = () => {
    const [form] = Form.useForm();

    // Function to handle form submission
    const handleSubmit = (values) => {
        message.success('Support team will get back to you.');
        console.log('Submitted values:', values);

        // Implement your submission logic here, e.g., sending data to backend
    };

    return (
        <div className='w-full pt-4 h-full  max-h-[580px] overflow-auto bg-white flex flex-col items-center justify-center rounded-xl max-w-lg'>
            <Form
                className='w-full'
                form={form}
                onFinish={handleSubmit}
                labelCol={{ span: 0 }} // Set labelCol span to 0 to hide labels
                wrapperCol={{ span: 24 }}
            >
                <Form.Item name='username' initialValue='Rk_pawar'>
                    <Input disabled />
                </Form.Item>

                <Form.Item name='email' initialValue='johndoe@example.com'>
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name='issue'
                    rules={[
                        { required: true, message: 'Please enter your issue' },
                    ]}
                >
                    <Input.TextArea
                        rows={6}
                        placeholder='Describe your issue here'
                        size='large'
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 0 }}
                    className='flex items-center justify-center  '
                >
                    <Button
                        type='text'
                        className={`text-xl  border border-gray-200 w-full bg-${colors.primary} text-white`}
                        htmlType='submit'
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            <p className='flex font-bold mt-12 text-gray-600'>
                Contact us: +91-9999-111-449
            </p>
        </div>
    );
};

export default Contactus;
