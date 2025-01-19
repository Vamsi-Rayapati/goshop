import { Form, Input, InputNumber, Modal, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { IProduct } from '../types';
import useFetch from 'feature/base/hooks/useFetch';
import { PRODUCTS_API } from '../constants';


interface Props {
    productId?: string;
    onClose: ()=> void;
    onSubmit: (product: Partial<IProduct>) => void;
    loading: boolean;
}


function ProductForm({onClose,onSubmit,loading, productId}:Props) {
    const title = productId ? 'Edit Product' : 'Add Product';
    const [changedFields, setChangedFields] = useState<Partial<IProduct>>({});
    const [getProductRes, getProductReq] = useFetch<IProduct>();
    const [form] = Form.useForm();

    const onValuesChange = (changedValues: Partial<IProduct>) => {
        setChangedFields((prev) => ({
          ...prev,
          ...changedValues,
        }));
    };

    useEffect(()=> {
        if(productId) {
            getProductReq({
                url: `${PRODUCTS_API}/${productId}`,
                method: 'GET'
            });
        }
        
    },[])


    useEffect(()=> {
        if(getProductRes.isSuccess) {
            form.setFieldsValue(getProductRes.data);
        }

    },[getProductRes])

    const onFinish = (values:IProduct) => {
        if(productId) onSubmit(changedFields);
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
            <Spin spinning={getProductRes.isLoading}>
            <Form
                id='user-form'
                onValuesChange={onValuesChange}
                form={form}
                onFinish={onFinish}>
                <Form.Item<IProduct>
                    label="Product Name"
                    name={'name'}
                    rules={[{ required: true}]}
                    >
                    <Input />
                </Form.Item>
                <Form.Item<IProduct>
                    label="Description"
                    name={'description'}
                    rules={[{ required: true }]}
                    >
                    <Input />
                </Form.Item>

                <Form.Item<IProduct>
                    label="Category"
                    name={'category'}
                    rules={[{ required: true }]}
                    >
                    <Input />
                </Form.Item>

                <Form.Item<IProduct>
                    label="Quantity"
                    name={'quantity'}
                    rules={[{ required: true }]}>
                     <InputNumber  />
                </Form.Item>

                <Form.Item<IProduct>
                    label="Price(per unit)"
                    name={'price'}
                    rules={[{ required: true }]}
                    >
                    <InputNumber />
                </Form.Item>

            </Form>
            </Spin>

        </Modal>
    )
}

export default ProductForm