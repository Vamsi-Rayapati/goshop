import { Button, Card, Form, FormProps, Input } from 'antd'
import useFetch from 'feature/base/hooks/useFetch'
import React from 'react'
import { SIGNUP_URL } from '../constants';
import { useNavigate } from 'react-router-dom';



function Signup() {

    const [signupRes, signupReq]  = useFetch();

    const navigate = useNavigate();

    const onFinish: FormProps<SignupForm>['onFinish'] = async (values) => {
        const res = await signupReq({
            url: SIGNUP_URL,
            method: 'POST',
            data: values
        });

        if(res.isSuccess) {
            // navigate('/console/users');
        }

    }
    return (
        <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Card>
            <Form
                name="basic"
                className='flex flex-col'
                disabled={signupRes.isLoading}
                layout={'vertical'}
                // labelCol={{ span: 8 }}
                style={{ width: 300 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                variant={'filled'}
                autoComplete="off"
            >
            <Form.Item<SignupForm>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
            >
            <Input  size={'large'} />
            </Form.Item>

           
            <Form.Item<SignupForm>
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please input your First Name!' }]}
                >
                <Input  size={'large'} />
            </Form.Item>
            <Form.Item<SignupForm>
                label="Last Name"
                name="lastName"
                >
                <Input  size={'large'}/>
            </Form.Item>
            

            <Form.Item<SignupForm>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            >
            <Input.Password  size={'large'} />
            </Form.Item>

            <Form.Item className='self-center'>
            <Button type="primary" htmlType="submit" loading={signupRes.isLoading}  size={'large'}>
                Submit
            </Button>
            </Form.Item>
            </Form>
            </Card>
        </div>
    )
}

export default Signup