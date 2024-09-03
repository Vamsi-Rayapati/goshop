import Title from 'antd/es/typography/Title';
import { Button } from 'antd';
import UsersList from './components/UsersList';
import UserForm from './components/UserForm';
import { useState } from 'react';


function Users() {
  const [createVisible, setCreateVisible] = useState(false);

  const onClose = () => setCreateVisible(false);
  const onAddUserClick = () => setCreateVisible(true);
  

  return (
    <div>
        <div className='header flex justify-between items-center'>
            <Title level={3}>Users</Title>
            <Button type={'primary'} onClick={onAddUserClick}>Add User</Button>
        </div>
        <UsersList/>
        <UserForm open={createVisible} onClose={onClose} />
       
    </div>
  )
}

export default Users