import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../model/store';
import { addNewUser } from '../../../model/reducers/userReducer';
import { EModalActions } from '../../../controller/enums';
import { IUserInfoHandling } from '../../../controller/types';
import AddUserModal from './AddUserModal';

interface TableModalsProps {
  type: EModalActions;
  onClose: () => void;
}

const TableModals: FC<TableModalsProps> = ({ type, onClose }) => {
  const [newUserName, setNewUserName] = useState('');
  const [newUserAge, setNewUserAge] = useState('');
  const [newUserAbout, setNewUserAbout] = useState('');

  const handleNewUserName = useCallback((
    e: ChangeEvent<HTMLInputElement> | string
  ) => {
    setNewUserName(typeof e === 'string' ? e : e.target.value);
  }, []);

  const handleNewUserAge = useCallback((
    e: ChangeEvent<HTMLInputElement> | string
  ) => {
    setNewUserAge(typeof e === 'string' ? e : e.target.value);
  }, []);

  const handleNewUserAbout = useCallback((
    e: ChangeEvent<HTMLInputElement> | string
  ) => {
    setNewUserAbout(typeof e === 'string' ? e : e.target.value);
  }, []);

  

  const userModalConfig: IUserInfoHandling = {
		userName: newUserName,
		onNameChange: handleNewUserName,
		userAge: newUserAge,
		onAgeChange: handleNewUserAge,
		userAbout: newUserAbout,
		onAboutChange: handleNewUserAbout,
		onClose,
	};

  return (
    <>
      {(type === EModalActions.ADD_MODAL && (
        <AddUserModal userModalConfig={userModalConfig}/>
      ))}
    </>
  );
}

export default TableModals;