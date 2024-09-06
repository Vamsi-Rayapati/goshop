import { Button, Space, Table, TableProps, Tag } from 'antd';
import { User, Role } from '../types';
import { useEffect } from 'react';
import useFetch from 'feature/base/hooks/useFetch';
import { USERS_API } from '../constants';
import moment from 'moment';

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



function UsersList() {
    const [usersRes,getUsersReq] = useFetch<{users:User[]}>();

    const columns: TableProps<User>['columns'] = [
      ...staticColumns??[],
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <div>
            <Button type={'link'}>Edit</Button>
            <Button type={'link'}>Delete</Button>
          </div>
        ),
      },
    ];
    useEffect(()=> {
        getUsersReq({
          url: USERS_API,
          method: 'GET'
        });
    },[]);
    return (
        <Table loading={usersRes.isLoading} columns={columns} dataSource={usersRes.data.users} />
    )
}

export default UsersList;