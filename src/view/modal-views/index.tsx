import { FC, useCallback } from 'react';
import LabelInput from '../elements/LabelInput';
import ModalButtons from '../elements/ModalButtons';
import { useAppDispatch, useAppSelector } from '../../model/store';
import { addNewUser } from '../../model/reducers/userReducer';
import { IUserInfoHandling } from '../../controller/types';
import styles from './styles.module.css';

interface AddUserModalViewProps {
  title: string;
  onSubmit: () => Promise<any>;
  id: number
}

const AddUserModalView: FC<AddUserModalViewProps & IUserInfoHandling> = ({
  title,
  onClose,
  userName,
  onNameChange,
  userAge,
  onAgeChange,
  userAbout,
  onAboutChange,
  onSubmit,
  id,
}) => {
  const dispatch = useAppDispatch();
  const handleSubmit = useCallback(() => {
    onSubmit()
    .then(() => {
      dispatch(addNewUser({
        id: id,
        name: userName,
        age: +userAge,
        about: userAbout,
      }));
      onClose();
    })
    .catch((e) => {
      console.error(e);
    });
  }, [onSubmit]);

  return (
    <div className={styles.formWrapper}>
      <LabelInput label='Name'>
        <input
          type='text'
          value={userName ?? ''}
          onChange={onNameChange}
        />
      </LabelInput>
      <LabelInput label='Age'>
        <input
          type='text'
          value={userAge ?? ''}
          onChange={onAgeChange}
        />
      </LabelInput>
      <LabelInput label='About person'>
        <input
          type='text'
          value={userAbout ?? ''}
          onChange={onAboutChange}
        />
      </LabelInput>
      <ModalButtons
        cancelText={'Cancel'}
        confirmText={title}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddUserModalView;