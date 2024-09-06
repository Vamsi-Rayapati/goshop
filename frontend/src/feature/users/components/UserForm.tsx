import { Form, Input, Modal, Select, Spin } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { User } from '../types';
import { DefaultOptionType } from 'antd/es/select';
import useFetch from 'feature/base/hooks/useFetch';
import { USERS_API } from '../constants';


interface Props {
    userId?: string;
    onClose: ()=> void;
    onSubmit: (user: Partial<User>) => void;
    loading: boolean;
}

const roleOptions: DefaultOptionType[] = [
    { label: 'User', value: 'user'},
    { label: 'Admin', value:'admin'},
    { label: 'Operator', value: 'operator'}
]


function UserForm({onClose,onSubmit,loading, userId}:Props) {
    const title = userId ? 'Edit User' : 'Add User';
    const [changedFields, setChangedFields] = useState<Partial<User>>({});
    const [getUserRes, getUserReq] = useFetch<User>();
    const [form] = Form.useForm();

    const onValuesChange = (changedValues: Partial<User>) => {
        setChangedFields((prev) => ({
          ...prev,
          ...changedValues,
        }));
    };

    useEffect(()=> {
        if(userId) {
            getUserReq({
                url: `${USERS_API}/${userId}`,
                method: 'GET'
            });
        }
        
    },[])


    useEffect(()=> {
        if(getUserRes.isSuccess) {
            form.setFieldsValue(getUserRes.data);
        }

    },[getUserRes])

    const onFinish = (values:User) => {
        if(userId) onSubmit(changedFields);
        else onSubmit(values);
    }

    console.log(changedFields);
    return (
        <Modal
            onClose={onClose}
            onCancel={onClose}
            open={true}
            title={title}
            okText={'Submit'}
            okButtonProps={{htmlType:'submit', form: 'user-form', loading: loading}}>
            <Spin spinning={getUserRes.isLoading}>
            <Form
                id='user-form'
                onValuesChange={onValuesChange}
                form={form}
                onFinish={onFinish}>
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
            </Spin>

        </Modal>
    )
}

export default UserForm