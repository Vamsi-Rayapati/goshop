import Title from 'antd/es/typography/Title';
import { Button, message } from 'antd';
import UsersList from './components/UsersList';
import UserForm from './components/UserForm';
import { useEffect, useState } from 'react';
import { User } from './types';
import useFetch, { IResponse } from 'feature/base/hooks/useFetch';
import { USERS_API } from './constants';


function Users() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User|null>();
  const [getUsersRes,getUsersReq] = useFetch<{users:User[]}>();
  const [postUserRes, postUserReq] = useFetch();
  const [patchUserRes, patchUserReq] = useFetch();
  const [deleteUserRes, deleteUserReq] = useFetch();
  

  const onClose = () =>  {
    setOpenDialog(false);
    setSelectedUser(null);
  }

  const onAddUserClick = () => setOpenDialog(true);

  const onEdit = (user: User) => {
    setSelectedUser(user);
    setOpenDialog(true)
  }

  const fetchUsers = () => {
    getUsersReq({
      url: USERS_API,
      method: 'GET'
    });
  }


  const handleSuccess = (msg: string) => {
    message.success(msg);
    onClose();
    fetchUsers();
  }


  const onDelete = async(user: User) => {
    const res = await deleteUserReq({
      url: `${USERS_API}/${user.id}`,
      method: 'DELETE'
    });

    if(res.isSuccess) handleSuccess('User deleted sucessfully');
  }

  const onSubmit = async (user: Partial<User>) => {
    if(selectedUser) {
      const res = await patchUserReq({
        url: `${USERS_API}/${selectedUser.id}`,
        method: 'PATCH',
        data: user
      });
      if(res.isSuccess) handleSuccess('User updated sucessfully');
    } else {
      const res = await postUserReq({
        url: USERS_API,
        method: 'POST',
        data: user
      });
      if(res.isSuccess) handleSuccess('User added sucessfully');
    }

    
  }


  useEffect(()=> {
    fetchUsers();
  },[]);


  
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