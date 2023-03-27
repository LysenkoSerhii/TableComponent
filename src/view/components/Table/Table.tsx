import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { deleteUser, getUsers, putUserData } from '../../../api/users';
import { useAppDispatch, useAppSelector } from '../../../model/store';
import { setTotal, showAddUserModal } from '../../../model/reducers/modalReducer';
import { User } from '../../../controller/types';
import { SAddButton, STable, STBody,  STH, STHead, STHeadTR } from './styles';
import TableRow from '../TableRow/TableRow';
import { deleteUserR, editUser, setUsersR } from '../../../model/reducers/userReducer';

interface TableProps {
  data: User[];
}

const Table: FC<TableProps> = ({
  data,
}) => {
  // const [users, setUsers] = useState<User[]>([]);
  const { users } = useAppSelector((s) => s.users);
  const dispatch = useAppDispatch();
  const [isProccesing, setIsProccesing] = useState(false);
  const [isEditing, setIsEditing] = useState<null | number>(null);
  const [updatedUser, setUpdatedUser] = useState({} as User);
  const keys = Object.keys(data[0]);

  const handleDeleteUser = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    setIsProccesing(true);
    deleteUser(+e.target.value)
      .then(() => {
        dispatch(deleteUserR(+e.target.value));
      })
      .catch((error) => {
        throw new Error(error)
      })
      .finally(() => setIsProccesing(false));
  }, []);

  const handleIsOnEdit = useCallback(async (updtUser: User, id: number) => {
    if (id === isEditing) {
      setIsProccesing(true);
      putUserData(updtUser.id, updtUser)
        .then((res) => {
          dispatch(editUser(res));
        }).catch((error) => {
          throw new Error(error);
        }).finally(() => {
          localStorage.removeItem(id.toString());
          setIsProccesing(false);
          setIsEditing(null)
        });
    } else {
      setIsEditing(id);
    }
  }, [isEditing]);

  const openAddWorkerModal = useCallback(() => {
    dispatch(showAddUserModal())
    dispatch(setTotal(users.length + 1))
  }, [dispatch]
  );

  useEffect(() => {
    getUsers().then(usersFromServer => {
      dispatch(setUsersR(usersFromServer))
    })
  }, [isProccesing]);

  return (
    <>
      <SAddButton
        onClick={openAddWorkerModal}
      >
        Add new person
      </SAddButton>
      <STable>
        <STHead>
          <STHeadTR>
            {keys.map((item, index) => (
              <STH key={index}>{item}</STH>
            ))}
            <STH>Actions</STH>
          </STHeadTR>
        </STHead>
        <STBody>
          {users.map((obj: User, index) => (
            <TableRow
              key={index}
              user={obj}
              isEditing={isEditing}
              keys={keys}
              handleDeleteUser={handleDeleteUser}
              handleIsOnEdit={handleIsOnEdit}
              setUpdatedUser={setUpdatedUser}
              updatedUser={updatedUser}
            />
          ))}
        </STBody>
      </STable>
    </>
  );
}

export default Table;
