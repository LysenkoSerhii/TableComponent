import {
	ChangeEvent,
	FC,
	useCallback,
	useEffect,
	useState,
	useRef,
	memo,
} from 'react';
import { putUserData } from '../../../controller/api/users';
import { User } from '../../../controller/types';
import { isArraysEqual } from '../../../controller/utils';
import { editUser } from '../../../model/reducers/userReducer';
import { useAppDispatch } from '../../../model/store';
import {
	STBodyButton,
	STBodyInput,
	STBodyTR,
	STD,
} from '../../styled/Table.styles';

interface TableRowProps {
	user: User;
	keys: (keyof User)[];
	isLoading: boolean | number;
	onLoading: (value: number | boolean) => void;
	handleDeleteUser: (id: number) => Promise<void>;
}

const TableRow: FC<TableRowProps> = ({
	user,
	keys,
	isLoading,
	onLoading,
	handleDeleteUser,
}) => {
	const dispatch = useAppDispatch();
	const storage = useRef<User>({} as User);

	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [userName, setUserName] = useState<string>(user.name);
	const [userAge, setUserAge] = useState<number>(+user.age);
	const [userAbout, setUserAbout] = useState<string>(user.about);

	useEffect(() => {
		setIsEditing(Boolean(localStorage.getItem(user.id.toString())));
	}, [user.id]);

	useEffect(() => {
		const lStorage = localStorage.getItem(user.id.toString());
		storage.current = lStorage ? JSON.parse(lStorage) : {};
	}, [user.id, userName, userAge, userAbout]);

	useEffect(() => {
		isEditing
			? localStorage.setItem(`${user.id}`, JSON.stringify({}))
			: localStorage.removeItem(user.id.toString());
	}, [user.id, isEditing]);

	const handleCancel = useCallback(() => {
		setUserName(user.name);
		setUserAge(user.age);
		setUserAbout(user.about);
		setIsEditing(false);
	}, [user]);

	const handleSuccess = useCallback(
		async (updtUser: User, id: number) => {
			if (isEditing) {
				if (isArraysEqual(Object.values(updtUser), Object.values(user))) {
					handleCancel();
				}

				onLoading(id);
				putUserData(updtUser.id, updtUser)
					.then((res) => {
						dispatch(editUser(res));
					})
					.catch((error) => {
						throw new Error(error);
					})
					.finally(() => {
						onLoading(false);
						setIsEditing(false);
					});
			} else {
				setIsEditing(true);
			}
		},
		[user, isEditing, dispatch, onLoading, handleCancel]
	);

	const handleEditUserName = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setUserName(e.target.value);

			localStorage.setItem(
				`${user.id}`,
				JSON.stringify({
					id: +user.id,
					name: e.target.value === user.name ? undefined : e.target.value,
				})
			);
		},
		[user]
	);

	const handleEditUserAge = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const newAge = +e.target.value;

			if (typeof newAge === 'number') {
				setUserAge(newAge);

				localStorage.setItem(
					`${user.id}`,
					JSON.stringify({
						id: user.id,
						age: +e.target.value === user.age ? undefined : e.target.value,
					})
				);
			}
		},
		[user]
	);

	const handleEditUserAbout = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setUserAbout(e.target.value);

			localStorage.setItem(
				`${user.id}`,
				JSON.stringify({
					id: user.id,
					about: e.target.value === user.about ? undefined : e.target.value,
				})
			);
		},
		[user]
	);

	return (
		<STBodyTR key={`row-${user.id}-${user.name}`}>
			{keys.map((item: keyof User, index: number) => {
				const value = user[item];
				return (
					<>
						{isEditing && item !== 'id' ? (
							<STD key={`column-${index}`}>
								{(item === 'name' && (
									<STBodyInput
										key={`name-col-${index}`}
										value={userName}
										onChange={(e) => handleEditUserName(e)}
										placeholder={value.toString()}
									/>
								)) ||
									(item === 'age' && (
										<STBodyInput
											key={`age-col-${index}`}
											value={userAge}
											onChange={(e) => handleEditUserAge(e)}
											placeholder={value.toString()}
										/>
									)) ||
									(item === 'about' && (
										<STBodyInput
											key={`about-col-${index}`}
											value={userAbout}
											onChange={(e) => handleEditUserAbout(e)}
											placeholder={value.toString()}
										/>
									))}
							</STD>
						) : (
							<STD key={`column-${index}`}>{value}</STD>
						)}
					</>
				);
			})}
			<STD key={`column-actions`}>
				<STBodyButton
					value={user.id}
					onClick={() =>
						handleSuccess(
							{ id: user.id, name: userName, age: userAge, about: userAbout },
							user.id
						)
					}
				>
					{isEditing ? 'Save' : 'Edit'}
				</STBodyButton>
				{isEditing ? (
					<STBodyButton value={user.id} onClick={handleCancel}>
						{'Cancel'}
					</STBodyButton>
				) : (
					<STBodyButton
						value={user.id}
						onClick={() => handleDeleteUser(user.id)}
					>
						{'Delete'}
					</STBodyButton>
				)}
			</STD>
		</STBodyTR>
	);
};

export default memo(TableRow);
