import { FC, Suspense, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../model/store';
import { closeModal } from '../../model/reducers/modalReducer';
import { Backdrop, Show, Modal, Header, CloseIcon, ModalBody } from './Modal.styles';
import type { MouseEvent } from 'react';
import {
  EModalActions
} from '../../controller/enums';
import TableModals from './TableModals';

const Modals: FC = () => {
  const { type, isShow } = useAppSelector((s) => s.modal);

  const dispatch = useAppDispatch();
  const [isOpacity, setIsOpacity] = useState(false);

  useEffect(() => {
    isShow && setIsOpacity(true);
  }, [isShow]);

  const onClose = useCallback(() => {
    setIsOpacity(false);
    dispatch(closeModal());
  }, []);

  const stopPropagation = (e: MouseEvent<Element, Event>) => {
    e.stopPropagation();
  };

  return (
    <Backdrop isOn={isOpacity} onClick={onClose}>
      <Show>
        <Modal onClick={stopPropagation}>
          <Header>
            <CloseIcon onClick={onClose}>X</CloseIcon>
          </Header>
          <ModalBody>
            <TableModals
              {...{ onClose }}
              type={type as EModalActions}
            />
          </ModalBody>
        </Modal>
      </Show>
    </Backdrop>
  );
}

export default Modals;