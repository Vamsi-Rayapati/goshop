import React, { useEffect, useState } from 'react'
import ProductsList from './ProductsTable'
import useFetch from 'feature/base/hooks/useFetch'
import { PRODUCTS_API } from '../constants';
import { IProduct } from '../types';
import Title from 'antd/es/typography/Title';
import { Button, message } from 'antd';
import ProductForm from './ProductForm';

function Products() {
  const [productsRes ,getProductsReq] = useFetch<{products: IProduct[]}>();
  const [addProductRes ,addProductReq] = useFetch<IProduct>();
  const [openDialog, setOpenDialog] = useState(false);

  const onAddClick = () => {
    setOpenDialog(true);
  }

  const onClose = () => {
    setOpenDialog(false);
  }

  const fetchProducts = () => {
    getProductsReq({
      url: PRODUCTS_API,
      method: 'GET',
    });
  }

  const handleSuccess = (msg: string) => {
    message.success(msg);
    onClose();
    fetchProducts();
  }

  const onSubmit = async (product: Partial<IProduct>) => {
    const res = await addProductReq({
      url: PRODUCTS_API,
      method: 'POST',
      data: product
    })
    if(res.isSuccess) handleSuccess('Product added successfully');
  }

  useEffect(() => {
    fetchProducts();
  },[]);
  return (
    <div>
      <div className='header flex justify-between items-center'>
          <Title level={3}>Products</Title>
          <Button type={'primary'} onClick={onAddClick}>Add Product</Button>
      </div>
      <ProductsList loading={productsRes.isLoading} products={productsRes.data.products}/>

      {openDialog &&
          <ProductForm
            // userId={selectedUser?.id}
            loading={addProductRes.isLoading}
            onSubmit={onSubmit}
            onClose={onClose} />}
    </div>
  )
}

export default Products