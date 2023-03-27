import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { User } from '../../../controller/types';
import { STBodyButton, STBodyInput, STBodyTR, STD } from '../Table/styles';

interface TableRowProps {
  user: User;
  isEditing: number | null;
  handleDeleteUser: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleIsOnEdit: (updtUser: User, id: number) => Promise<void>;
  keys: string[];
  setUpdatedUser: ({ }: User) => void;
  updatedUser: User;
}

const TableRow: FC<TableRowProps> = ({
  user,
  isEditing,
  handleDeleteUser,
  handleIsOnEdit,
  keys,
  setUpdatedUser,
  updatedUser,
}) => {
  const [userId, setUserId] = useState(user.id);
  const [userName, setUserName] = useState<string>(user.name);
  const [userAge, setUserAge] = useState(user.age);
  const [userAbout, setUserAbout] = useState(user.about);

  const handleEditUserId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserId(+e.target.value);
  }, []);

  const storage = localStorage.getItem(user.id.toString());
  let parsedStorage: User = {} as User
  if (storage) {
    parsedStorage = JSON.parse(storage);
  }

  const handleEditUserName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (parsedStorage.name !== user.name) {
      setUserName(parsedStorage.name);
    } else {
      setUserName(e.target.value);
    }

    localStorage.setItem(`${user.id}`, JSON.stringify({
      id: +user.id,
      name: userName,
      age: userAge,
      about: userAbout,
    }));
  }, [userName, setUserName]);

  const handleEditUserAge = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserAge(+e.target.value);

    localStorage.setItem(`${user.id}`, JSON.stringify({
      id: user.id,
      name: userName,
      age: userAge,
      about: userAbout,
    }));
  }, [userAge, setUserAge]);

  const handleEditUserAbout = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserAbout(e.target.value);

    localStorage.setItem(`${user.id}`, JSON.stringify({
      id: user.id,
      name: userName,
      age: userAge,
      about: userAbout,
    }));
  }, [userAbout, setUserAbout]);


  useEffect(() => {
    setUpdatedUser({
      id: user.id,
      name: userName,
      age: +userAge,
      about: userAbout,
    })
  }, [userId, userName, userAge, userAbout]);

  return (
    <STBodyTR>
      {keys.map((item, index) => {
        const value = user[item];
        return (
          <>
            {isEditing === user.id ? (
              <STD key={index}>
                {item === 'id' && (
                  <STBodyInput
                    readOnly
                    value={userId}
                    onChange={(e) => handleEditUserId(e)}
                    placeholder={value}
                  />
                )
                  || item === 'name' && (
                    <STBodyInput
                      value={userName}
                      onChange={(e) => handleEditUserName(e)}
                      placeholder={value}
                    />
                  )
                  || item === 'age' && (
                    <STBodyInput
                      value={userAge}
                      onChange={(e) => handleEditUserAge(e)}
                      placeholder={value}
                    />
                  )
                  || item === 'about' && (
                    <STBodyInput
                      value={userAbout}
                      onChange={(e) => handleEditUserAbout(e)}
                      placeholder={value}
                    />
                  )}

              </STD>
            ) : (
              <STD key={index}>{value}</STD>
            )
            }
          </>
        )
      })}
      <STBodyButton value={user.id} onClick={() => handleIsOnEdit(updatedUser, user.id)}>
        {
          user.id === isEditing ?
            (
              <>Save</>
            ) : (
              <>Edit</>
            )
        }
      </STBodyButton>
      <STBodyButton value={user.id} onClick={() => handleDeleteUser}>Delete</STBodyButton>
    </STBodyTR>
  );
}

export default TableRow;