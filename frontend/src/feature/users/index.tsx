import Title from 'antd/es/typography/Title';
import { Button } from 'antd';
import UsersList from './components/UsersList';
import UserForm from './components/UserForm';
import { useEffect, useState } from 'react';
import { User } from './types';
import useFetch from 'feature/base/hooks/useFetch';
import { USERS_API } from './constants';


function Users() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User|null>();
  const [getUsersRes,getUsersReq] = useFetch<{users:User[]}>();
  const [postUserRes, postUserReq] = useFetch();
  const [patchUserRes, patchUserReq] = useFetch();
  const [deleteUserRes, deleteUserReq] = useFetch();
  

  const onClose = () => setOpenDialog(false);
  const onAddUserClick = () => setOpenDialog(true);

  const onDelete = (user: User) => {
    deleteUserReq({
      url: `${USERS_API}/${user.id}`,
      method: 'DELETE'
    });
  }

  const onEdit = (user: User) => {
    setSelectedUser(user);
    setOpenDialog(true)
  }

  const onSubmit = (user: Partial<User>) => {
    if(selectedUser) {
      patchUserReq({
        url: `${USERS_API}/${selectedUser.id}`,
        method: 'PATCH',
        data: user
      });
    } else {
      postUserReq({
        url: USERS_API,
        method: 'POST',
        data: user
      });
    }
    
  }


  const fetchUsers = () => {
    getUsersReq({
      url: USERS_API,
      method: 'GET'
    });
  }


  useEffect(()=> {
    fetchUsers();
  },[]); 

  
  useEffect(()=> {
    if(deleteUserRes.isSuccess) {
      fetchUsers();
    }
  },[deleteUserRes])

  useEffect(()=> {
    if(postUserRes.isSuccess) {
      setOpenDialog(false);
      fetchUsers();
    }
  },[postUserRes])

  useEffect(()=> {
    if(patchUserRes.isSuccess) {
      setOpenDialog(false);
      fetchUsers();
    }
  },[patchUserRes])

  useEffect(()=> {
    if(!openDialog) setSelectedUser(null);
  },[openDialog])

  return (
    <div>
        <div className='header flex justify-between items-center'>
            <Title level={3}>Users</Title>
            <Button type={'primary'} onClick={onAddUserClick}>Add User</Button>
        </div>
        <UsersList
          loading={getUsersRes.isLoading}
          users={getUsersRes.data.users}
          onDelete={onDelete}
          onEdit={onEdit}/>
        {openDialog &&
          <UserForm
            userId={selectedUser?.id}
            loading={postUserRes.isLoading}
            onSubmit={onSubmit}
            onClose={onClose} />}
       
    </div>
  )
}

export default Users