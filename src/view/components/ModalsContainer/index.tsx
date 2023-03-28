import { ChangeEvent, FC, memo, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../model/store';
import { addNewUser } from '../../../model/reducers/userReducer';
import { EModalActions } from '../../../controller/enums';
import { IUserInfoHandling } from '../../../controller/types';
import AddUserModal from '../AddUserContainer';

interface ModalsContainerProps {
	type: EModalActions;
	onClose: () => void;
}

const ModalsContainer: FC<ModalsContainerProps> = ({ type, onClose }) => {
	const [newUserName, setNewUserName] = useState<string>('');
	const [newUserAge, setNewUserAge] = useState<number>(0);
	const [newUserAbout, setNewUserAbout] = useState<string>('');

	const handleNewUserName = useCallback(
		(e: ChangeEvent<HTMLInputElement> | string) => {
			setNewUserName(typeof e === 'string' ? e : e.target.value);
		},
		[]
	);

	const handleNewUserAge = useCallback(
		(e: ChangeEvent<HTMLInputElement> | string) => {
			setNewUserAge(typeof e === 'string' ? +e : +e.target.value);
		},
		[]
	);

	const handleNewUserAbout = useCallback(
		(e: ChangeEvent<HTMLInputElement> | string) => {
			setNewUserAbout(typeof e === 'string' ? e : e.target.value);
		},
		[]
	);

	const handleClose = useCallback(() => {
		setNewUserName('');
		setNewUserAge(0);
		setNewUserAbout('');
		onClose();
	}, [onClose]);

	const userModalConfig: IUserInfoHandling = {
		userName: newUserName,
		onNameChange: handleNewUserName,
		userAge: newUserAge,
		onAgeChange: handleNewUserAge,
		userAbout: newUserAbout,
		onAboutChange: handleNewUserAbout,
		onClose: handleClose,
	};

	return (
		<>
			{type === EModalActions.ADD_MODAL && (
				<AddUserModal userModalConfig={userModalConfig} />
			)}
		</>
	);
};

export default memo(ModalsContainer);
