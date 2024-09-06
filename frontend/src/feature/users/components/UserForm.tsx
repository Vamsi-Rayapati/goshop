import { Form, Input, Modal, Select } from 'antd'
import React, { useRef, useState } from 'react'
import { User } from '../types';
import { DefaultOptionType } from 'antd/es/select';
import useFetch from 'feature/base/hooks/useFetch';
import { USERS_API } from '../constants';


interface Props {
    open: boolean;
    onClose: ()=> void;
}

const roleOptions: DefaultOptionType[] = [
    { label: 'User', value: 'user'},
    { label: 'Admin', value:'admin'},
    { label: 'Operator', value: 'operator'}
]


function UserForm({open,onClose}:Props) {

    const [createUserRes, createUserReq] = useFetch();

    const onFinish = (values: User) => {
        createUserReq({
            url: USERS_API,
            method: 'POST',
            data: values
        });
        console.log(values)
    }

    return (
        <Modal
            onClose={onClose}
            onCancel={onClose}
            onOk={()=> console.log('Hello')}
            open={open}
            title={'Add User'}
            okText={'Submit'}
            okButtonProps={{htmlType:'submit', form: 'user-form', loading: createUserRes.isLoading}}>
            <Form
                id='user-form'
                // initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item<User>
                    label="First Name"
                    name={'firstName'}
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                    <Input />
                </Form.Item>
                <Form.Item<User>
                    label="Last Name"
                    name={'lastName'}
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                    <Input />
                </Form.Item>

                <Form.Item<User>
                    label="Email"
                    name={'email'}
                    rules={[
                        { type: 'email', message: 'The input is not valid E-mail!'},
                        { required: true, message: 'Please input your E-mail!'},
                    ]}
                    >
                    <Input />
                </Form.Item>

                <Form.Item<User>
                    label="Role"
                    name={'role'}
                    rules={[{ required: true, message: 'Please select role!' }]}>
                    <Select options={roleOptions} />
                </Form.Item>

            </Form>

        </Modal>
    )
}

export default UserForm