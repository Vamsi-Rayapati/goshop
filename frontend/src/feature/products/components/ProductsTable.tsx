import { Table, TableProps, Tag } from 'antd';
import { IProduct } from '../types';

const colors = {
  operator: 'geekblue',
  admin: 'gold',
  user: 'green'
}
const staticColumns: TableProps<IProduct>['columns'] = [
    {
      title: 'ProductID',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
   
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    }
]

interface Props {
  loading: boolean;
  products: IProduct[];
  onDelete?: (user: IProduct)=> void;
  onEdit?: (user: IProduct)=> void;
}

function ProductsList({products,loading,onDelete,onEdit}: Props) {


  return (
      <Table loading={loading} columns={staticColumns} dataSource={products} rowKey="id"  />
  )
}

export default ProductsList;