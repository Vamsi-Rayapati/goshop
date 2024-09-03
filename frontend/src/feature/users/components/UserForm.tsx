import { Form, Input, Modal, Select } from 'antd'
import React, { useRef } from 'react'
import { User } from '../types';
import { DefaultOptionType } from 'antd/es/select';


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
    const formRef = useRef();
    return (
    <Modal onClose={onClose} open={open} title={'Add User'} okButtonProps={{}}>
            <Form
                // initialValues={{ remember: true }}
                // onFinish={onFinish}
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