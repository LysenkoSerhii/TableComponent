import {
	FC,
	lazy,
	startTransition,
	Suspense,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { deleteUser, getUsers } from '../../../controller/api/users';
import { useAppDispatch, useAppSelector } from '../../../model/store';
import {
	setTotal,
	showAddUserModal,
} from '../../../model/reducers/modalReducer';
import { User } from '../../../controller/types';
import {
	SAddButton,
	STable,
	STBody,
	STH,
	STHead,
	STHeadTR,
} from '../../styled/Table.styles';
import { deleteUserR, setUsersR } from '../../../model/reducers/userReducer';
import Loader from '../Loader';
import { ESortTypes } from '../../../controller/enums';

const TableRow = lazy(() => import('../TableRow/TableRow'));

interface TableProps {
	data: User[];
}

const Table: FC<TableProps> = ({ data }) => {
	const dispatch = useAppDispatch();
	const { users } = useAppSelector((s) => s.users);
	const [isProccesing, setIsProccesing] = useState<number | boolean>(false);

	const keys = Object.keys(data[0]) as unknown as (keyof User)[];

	const handleDeleteUser = useCallback(
		async (id: number) => {
			startTransition(() => {
				setIsProccesing(id);

				deleteUser(id)
					.then(() => {
						dispatch(deleteUserR(id));
					})
					.catch((error) => {
						throw new Error(error);
					})
					.finally(() => {
						localStorage.removeItem(id.toString());
						setIsProccesing(false);
					});
			});
		},
		[dispatch]
	);

	const openAddWorkerModal = useCallback(() => {
		dispatch(showAddUserModal());
		dispatch(setTotal(users.length + 1));
	}, [dispatch, users]);

	const handleSort = useCallback(
		(field: keyof User, type: ESortTypes) => {
			dispatch(
				setUsersR(
					[...users].sort((a: User, b: User) => {
						if (typeof (a || b)[field] === 'string') {
							return type === ESortTypes.ASC
								? (a[field] as string).length - (b[field] as string).length
								: (b[field] as string).length - (a[field] as string).length;
						} else {
							return type === ESortTypes.ASC
								? (a[field] as number) - (b[field] as number)
								: (b[field] as number) - (a[field] as number);
						}
					})
				)
			);
		},
		[dispatch, users]
	);

	useEffect(() => {
		getUsers().then((usersFromServer) => {
			dispatch(setUsersR(usersFromServer));
		});
	}, [isProccesing, dispatch]);

	return (
		<>
			<Suspense fallback={<Loader />}>
				<>
					<SAddButton onClick={openAddWorkerModal}>Add new person</SAddButton>
					<STable>
						<STHead>
							<STHeadTR>
								{keys.map((item: keyof User, index: number) => (
									<STH key={`column-header-${index}`}>
										<span>
											<span
												onClick={() => handleSort(item, ESortTypes.ASC)}
												style={{
													cursor: 'pointer',
												}}
											>
												▲
											</span>
											<span
												onClick={() => handleSort(item, ESortTypes.DESC)}
												style={{
													cursor: 'pointer',
												}}
											>
												▼
											</span>
										</span>
										<span>{item}</span>
									</STH>
								))}
								<STH>Actions</STH>
							</STHeadTR>
						</STHead>
						<STBody>
							{users.map((obj: User, index) => (
								<TableRow
									key={`row-${index}-${obj.name}`}
									isLoading={isProccesing}
									onLoading={setIsProccesing}
									user={obj}
									keys={keys}
									handleDeleteUser={handleDeleteUser}
								/>
							))}
						</STBody>
					</STable>
				</>
			</Suspense>
		</>
	);
};

export default Table;
