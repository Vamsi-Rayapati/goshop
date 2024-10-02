import { Button, Card, Form, FormProps, Input } from 'antd'
import useFetch from 'feature/base/hooks/useFetch';
import React from 'react'
import { parseJWT } from '../functions';
import { USERS_API } from 'feature/users/constants';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'feature/base/router/constants';

interface OnBoardForm {
    firstName: string;
    lastName: string;
}

function Onboarding() {

    const [postUser, postUserReq] = useFetch();
    const navigate = useNavigate();

    const onFinish: FormProps<SignupForm>['onFinish'] = async(values) => {
       const user = parseJWT();
       const res = await postUserReq({
        url: USERS_API,
        method: 'POST',
        data: {
            ...values,
            ...user,
            role: 'user'
        }
       
       });
       if(res.isSuccess) navigate(ROUTE.CONSOLE);
    }
    return (
        <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Card>
                <Form
                    name="basic"
                    className='flex flex-col'
                    disabled={postUser.isLoading}
                    layout={'vertical'}
                    style={{ width: 300 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    variant={'filled'}
                    size={'large'}
                    autoComplete="off"
                >
                <Form.Item<OnBoardForm>
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your First Name!' }]}
                    >
                    <Input  />
                </Form.Item>
                <Form.Item<OnBoardForm>
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your Last Name!' }]}
                    >
                    <Input />
                </Form.Item>
                <Form.Item className='self-center'>
                    <Button type="primary" htmlType="submit" loading={postUser.isLoading} >
                        Finish
                    </Button>
                </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Onboarding