import React, { useState, useEffect } from 'react';
import { Card, Form, Input, InputNumber, Button, Upload, Space, Typography, Divider, message, Select } from 'antd';
import { CloudUploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import useFetch from '../../base/hooks/useFetch';
import { PRODUCTS_API } from '../constants';
import { CATEGORIES_API } from '../../categories/constants';
import { Product } from '../types';
import { Category } from '../../categories/types';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;




function AddProduct() {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    category_id: 0,
    price: 0,
    stock: 0
  });
  const [fileList, setFileList] = useState<any[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Use the useFetch hook for API calls
  const [createProductRes, createProductReq] = useFetch<Product>();
  const [getCategoriesRes, getCategoriesReq] = useFetch<{
    categories: Category[];
    total: number;
  }>();

  // Fetch categories on component mount
  useEffect(() => {
    getCategoriesReq({
      url: CATEGORIES_API,
      method: 'GET',
      params: {
        page_no: 1,
        page_size: 100, // Get all categories
      },
    });
  }, []);

  const handleFormChange = () => {
    const values = form.getFieldsValue();
    setFormData(values);
    
    // Check if required fields are filled
    const isValid = values.name && values.price > 0 && values.stock >= 0 && values.category_id;
    setIsFormValid(isValid);
  };

  const handleSubmit = async (values: Product) => {
    try {
      const response = await createProductReq({
        url: PRODUCTS_API,
        method: 'POST',
        data: values
      });

      if (response.isSuccess) {
        message.success('Product added successfully!');
        form.resetFields();
        setFormData({ name: '', description: '', category_id: 0, price: 0, stock: 0 });
        setFileList([]);
        setIsFormValid(false);
        
        console.log('Product created:', response.data);
        console.log('Files to upload:', fileList);
        
        // TODO: Handle file uploads after product creation
        if (fileList.length > 0) {
          // Here you can implement the file upload logic
          // using the product ID from response.data
        }
      }
    } catch (error) {
      console.error('Error creating product:', error);
      // The useFetch hook already shows error messages via message.error
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: true,
    disabled: !isFormValid,
    fileList,
    beforeUpload: () => false, // Prevent auto upload
    onChange: (info: any) => {
      setFileList(info.fileList);
    },
    onRemove: (file: any) => {
      setFileList(fileList.filter(item => item.uid !== file.uid));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Title level={2} className="text-center mb-8">
        Add New Product
      </Title>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Information Card */}
        <Card 
          title={
            <div className="flex items-center space-x-2">
              <PlusOutlined className="text-blue-500" />
              <span>Product Information</span>
            </div>
          }
          className="shadow-lg hover:shadow-xl transition-shadow duration-300"
          bodyStyle={{ padding: '24px' }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            onValuesChange={handleFormChange}
            size="large"
          >
            <Form.Item
              label="Product Name"
              name="name"
              rules={[{ required: true, message: 'Please enter product name' }]}
            >
              <Input 
                placeholder="Enter product name"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category_id"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select
                placeholder="Select a category"
                className="rounded-lg"
                loading={getCategoriesRes.isLoading}
                showSearch
                filterOption={(input, option) =>
                  (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                }
              >
                {getCategoriesRes.data?.categories?.map((category) => (
                  <Option key={category.id} value={parseInt(category.id)}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
            >
              <TextArea 
                rows={4}
                placeholder="Enter product description"
                className="rounded-lg"
              />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label="Price ($)"
                name="price"
                rules={[
                  { required: true, message: 'Please enter price' },
                  { type: 'number', min: 0, message: 'Price must be positive' }
                ]}
              >
                <InputNumber
                  placeholder="0.00"
                  className="w-full rounded-lg"
                  precision={2}
                  min={0}
                />
              </Form.Item>

              <Form.Item
                label="Stock Quantity"
                name="stock"
                rules={[
                  { required: true, message: 'Please enter stock quantity' },
                  { type: 'number', min: 0, message: 'Stock must be non-negative' }
                ]}
              >
                <InputNumber
                  placeholder="0"
                  className="w-full rounded-lg"
                  min={0}
                />
              </Form.Item>
            </div>

            <Form.Item className="mb-0">
              <Button 
                type="primary" 
                htmlType="submit"
                size="large"
                className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 border-blue-500"
                disabled={!isFormValid}
                loading={createProductRes.isLoading}
              >
                {createProductRes.isLoading ? 'Adding Product...' : 'Add Product'}
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Document Upload Card */}
        <Card 
          title={
            <div className="flex items-center space-x-2">
              <CloudUploadOutlined className="text-green-500" />
              <span>Product Images</span>
              {!isFormValid && (
                <Text type="secondary" className="text-sm ml-2">
                  (Complete form first)
                </Text>
              )}
            </div>
          }
          className={`shadow-lg transition-all duration-300 ${
            isFormValid 
              ? 'hover:shadow-xl border-green-200' 
              : 'opacity-60 border-gray-200'
          }`}
          bodyStyle={{ padding: '24px' }}
        >
          <div className="space-y-4">
            <div className={`transition-opacity duration-300 ${!isFormValid ? 'opacity-50' : ''}`}>
              <Upload.Dragger 
                {...uploadProps}
                className="border-2 border-dashed rounded-lg hover:border-green-400 transition-colors"
              >
                <p className="ant-upload-drag-icon">
                  <CloudUploadOutlined className="text-4xl text-blue-500" />
                </p>
                <p className="ant-upload-text text-lg font-medium">
                  Click or drag files to this area to upload
                </p>
                <p className="ant-upload-hint text-gray-500">
                  Support for single or bulk upload. Strictly prohibited from uploading company data or other banned files.
                </p>
              </Upload.Dragger>
            </div>

            {!isFormValid && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <Text type="warning" className="text-sm">
                  📝 Please fill out the required product information first:
                </Text>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li>• Product Name {formData.name ? '✅' : '❌'}</li>
                  <li>• Category {formData.category_id ? '✅' : '❌'}</li>
                  <li>• Price {formData.price > 0 ? '✅' : '❌'}</li>
                  <li>• Stock Quantity {formData.stock >= 0 ? '✅' : '❌'}</li>
                </ul>
              </div>
            )}

            {fileList.length > 0 && (
              <div className="mt-4">
                <Divider orientation="left" className="text-sm">
                  Uploaded Files ({fileList.length})
                </Divider>
                <div className="space-y-2">
                  {fileList.map((file, index) => (
                    <div 
                      key={file.uid} 
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Text className="text-blue-600 font-medium text-xs">
                            {index + 1}
                          </Text>
                        </div>
                        <div>
                          <Text className="font-medium">{file.name}</Text>
                          <Text type="secondary" className="text-xs block">
                            {(file.size / 1024).toFixed(1)} KB
                          </Text>
                        </div>
                      </div>
                      <Button 
                        type="text" 
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => uploadProps.onRemove(file)}
                        className="hover:bg-red-50"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AddProduct;