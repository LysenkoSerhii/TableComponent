import { lazy } from 'react';
import Table from './view/components/Table/Table';
import { ThemeProvider } from 'styled-components';
import { createPortal } from 'react-dom';
import { lightTheme } from './model/styles/theme';

import root from './index';
import './index.styles.css';

const Modals = lazy(() => import('./view/components/Modal'));

function App() {
	const keys = [{ id: 0, name: '', age: 0, about: '' }];
	return (
		<ThemeProvider theme={lightTheme}>
			{createPortal(<Modals />, root)}
			<div className="table-container">
				<Table data={keys} />
			</div>
		</ThemeProvider>
	);
}

export default App;
