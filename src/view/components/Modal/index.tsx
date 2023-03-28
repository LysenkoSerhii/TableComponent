import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../model/store';
import { closeModal } from '../../../model/reducers/modalReducer';
import {
	Backdrop,
	Show,
	Modal as SModal,
	Header,
	CloseIcon,
	ModalBody,
} from '../../styled/Modal.styles';
import type { MouseEvent } from 'react';
import { EModalActions } from '../../../controller/enums';
import TableModals from '../ModalsContainer';

const Modal: FC = () => {
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
				<SModal onClick={stopPropagation}>
					<Header>
						<CloseIcon onClick={onClose}>X</CloseIcon>
					</Header>
					<ModalBody>
						<TableModals {...{ onClose }} type={type as EModalActions} />
					</ModalBody>
				</SModal>
			</Show>
		</Backdrop>
	);
};

export default memo(Modal);
