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
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    category_id: 0,
    price: 0,
    stock: 0
  });
  const [fileList, setFileList] = useState<any[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [createdProduct, setCreatedProduct] = useState<Product | null>(null);
  
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

  const handleSubmit = async (values: Omit<Product, 'id'>) => {
    try {
      const response = await createProductReq({
        url: PRODUCTS_API,
        method: 'POST',
        data: values
      });

      if (response.isSuccess) {
        message.success('Product added successfully!');
        // Don't reset form fields - keep them filled
        // form.resetFields();
        // setFormData({ name: '', description: '', category_id: 0, price: 0, stock: 0 });
        setIsProductCreated(true);
        setCreatedProduct(response.data);
        
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
    disabled: !isProductCreated, // Only enable after product is created
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
              {isProductCreated && (
                <Text type="success" className="text-sm ml-2">
                  ✅ Completed
                </Text>
              )}
            </div>
          }
          className={`shadow-lg transition-all duration-300 ${
            isProductCreated 
              ? 'opacity-70 border-green-200' 
              : 'hover:shadow-xl'
          }`}
          bodyStyle={{ padding: '24px' }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            onValuesChange={handleFormChange}
            size="large"
            disabled={isProductCreated}
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
                disabled={!isFormValid || isProductCreated}
                loading={createProductRes.isLoading}
              >
                {isProductCreated 
                  ? 'Product Created Successfully ✅' 
                  : createProductRes.isLoading 
                    ? 'Adding Product...' 
                    : 'Add Product'
                }
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
              {!isProductCreated && (
                <Text type="secondary" className="text-sm ml-2">
                  (Create product first)
                </Text>
              )}
              {isProductCreated && (
                <Text type="success" className="text-sm ml-2">
                  ✅ Ready to upload
                </Text>
              )}
            </div>
          }
          className={`shadow-lg transition-all duration-300 ${
            isProductCreated 
              ? 'hover:shadow-xl border-green-200' 
              : 'opacity-60 border-gray-200'
          }`}
          bodyStyle={{ padding: '24px' }}
        >        <div className="space-y-4">
          <div className={`transition-opacity duration-300 ${!isProductCreated ? 'opacity-50' : ''}`}>
            <Upload.Dragger 
              {...uploadProps}
              className="border-2 border-dashed rounded-lg hover:border-green-400 transition-colors"
            >
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined className="text-4xl text-blue-500" />
              </p>
              <p className="ant-upload-text text-lg font-medium">
                {isProductCreated 
                  ? 'Click or drag files to this area to upload'
                  : 'Create product first to enable file upload'
                }
              </p>
              <p className="ant-upload-hint text-gray-500">
                {isProductCreated 
                  ? 'Support for single or bulk upload. Upload images for your product.'
                  : 'File upload will be enabled after product creation.'
                }
              </p>
            </Upload.Dragger>
          </div>

          {!isProductCreated && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <Text type="secondary" className="text-sm">
                🎯 Complete and submit the product form to enable image uploads
              </Text>
            </div>
          )}

          {isProductCreated && createdProduct && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <Text type="success" className="text-sm">
                ✅ Product "{createdProduct.name}" created successfully! You can now upload images.
              </Text>
              <Text type="secondary" className="text-xs block mt-1">
                Product ID: {createdProduct.id}
              </Text>
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