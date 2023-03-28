import { memo } from 'react';
import type { FC } from 'react';

import styles from './styles.module.css';

interface IModalButtons {
	cancelText: string;
	confirmText: string;
	onClose: () => void;
	onSubmit?: () => void;
}

const ModalButtons: FC<IModalButtons> = ({
	cancelText,
	confirmText,
	onClose,
	onSubmit
}) => (
	<div className={styles.buttons}>
		<button
      type='button'
			onClick={onClose}>
			{cancelText}
		</button>
		<button
			type='submit'
			onClick={onSubmit}>
			{confirmText}
		</button>
	</div>
);

export default memo(ModalButtons);
