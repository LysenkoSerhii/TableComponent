import { FC, useCallback } from 'react';
import { postNewUser } from '../../../../api/users';
import { useAppSelector } from '../../../../model/store';
import AddUserModalView from '../../../modal-views';
import { IUserInfoHandling } from '../../../../controller/types';

interface AddUserModalProps {
  userModalConfig: IUserInfoHandling
}
 
const AddUserModal: FC<AddUserModalProps> = ({ userModalConfig }) => {
  const { users } = useAppSelector(s => s.users);

  const handleAddUser = useCallback(() => {
    return postNewUser({
      id: users.length + 1,
      name: userModalConfig.userName,
      age: +userModalConfig.userAge,
      about: userModalConfig.userAbout,
    });
  }, [userModalConfig.userName, userModalConfig.userAge, userModalConfig.userAbout]);

  return (
    <AddUserModalView
      {...userModalConfig}
      title={'Add'}
      onSubmit={handleAddUser}
      id={users.length + 1}
    />
  );
}
 
export default AddUserModal;