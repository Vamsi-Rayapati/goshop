import { Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import CategoriesList from './CategoriesList'
import useFetch from 'feature/base/hooks/useFetch';
import { Category } from '../types';
import { CATEGORIES_API } from '../constants';

function Categories() {
    const [getCategoriesRes,getCategoriesReq] = useFetch<{categories:Category[], total: number}>();
    const [currentPage, setCurrentPage] = useState(1);
    const fetchCategories = () => {
        getCategoriesReq({
          url: CATEGORIES_API,
          method: 'GET',
          params: {
            page_no:currentPage,
            page_size: 5
          }
        });
    }

    useEffect(()=> {
      fetchCategories();
    },[])

    const onDelete = () => {};
    const onEdit = () => {};
    return (
        <div>
            <Typography.Title level={3}>Categories</Typography.Title>
            <CategoriesList loading={getCategoriesRes.isLoading} categories={getCategoriesRes.data.categories} total={getCategoriesRes.data.total}
            currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onDelete={onDelete}
          onEdit={onEdit}/>
            
        </div>
    )
}

export default Categories



