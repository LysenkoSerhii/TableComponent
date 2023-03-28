import { memo } from 'react';
import type { FC } from 'react';

import styles from './styles.module.css';

interface ILabelInput {
	label: string;
	children: JSX.Element;
}

const LabelInput: FC<ILabelInput> = ({ children, label }) => (
	<div className={styles.formBlock}>
		<div className={styles.label}>{label}</div>
		{children}
	</div>
);

export default memo(LabelInput);
