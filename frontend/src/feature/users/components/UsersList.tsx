import { Button, Table, TableProps } from 'antd';
import { User } from '../types';
import { useEffect } from 'react';
import { GET_USERS } from '../api';
import useFetch from 'feature/base/hooks/useFetch';
const columns: TableProps<User>['columns'] = [
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
    }
  
]



function UsersList() {
    const [usersRes,getUsersReq] = useFetch<{users:User[]}>();

    useEffect(()=> {
        getUsersReq(GET_USERS)
    },[]);
    return (
        <Table columns={columns} dataSource={usersRes?.data.users ?? []} />
    )
}

export default UsersList;