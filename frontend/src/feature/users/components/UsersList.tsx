import { Table, TableProps, Tag } from 'antd';
import { User, Role } from '../types';
import moment from 'moment';
import UsersListActions from './UsersListActions';

const colors = {
  operator: 'geekblue',
  admin: 'gold',
  user: 'green'
}
const staticColumns: TableProps<User>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render(value: Role, record, index) {
        return <Tag color={colors[value]}>{value.toUpperCase()}</Tag>
      }
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render(value: string,record, index) {
        return <span>{moment.utc(value).local().format('DD MMM YYYY, hh:mm A')}</span>
      }
    }
]

interface Props {
  loading: boolean;
  users: User[];
  onDelete: (user: User)=> void;
  onEdit: (user: User)=> void;
}

function UsersList({users,loading,onDelete,onEdit}: Props) {
    
  const columns: TableProps<User>['columns'] = [
    ...staticColumns??[],
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => <UsersListActions user={record} onDelete={onDelete} onEdit={onEdit}/>,
    },
  ];

  return (
      <Table loading={loading} columns={columns} dataSource={users} rowKey="id"  />
  )
}

export default UsersList;