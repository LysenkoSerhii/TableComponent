import { FC, memo, useCallback } from 'react';
import { postNewUser } from '../../../controller/api/users';
import { useAppSelector } from '../../../model/store';
import AddUserModalView from '../AddUser';
import { IUserInfoHandling } from '../../../controller/types';

interface AddUserContainerProps {
	userModalConfig: IUserInfoHandling;
}

const AddUserContainer: FC<AddUserContainerProps> = ({ userModalConfig }) => {
	const { users } = useAppSelector((s) => s.users);

	const handleAddUser = useCallback(() => {
		return postNewUser({
			id: users.length + 1,
			name: userModalConfig.userName,
			age: +userModalConfig.userAge,
			about: userModalConfig.userAbout,
		});
	}, [
		userModalConfig.userName,
		userModalConfig.userAge,
		userModalConfig.userAbout,
		users,
	]);

	return (
		<AddUserModalView
			{...userModalConfig}
			title={'Add'}
			onSubmit={handleAddUser}
			id={users.length + 1}
		/>
	);
};

export default memo(AddUserContainer);
