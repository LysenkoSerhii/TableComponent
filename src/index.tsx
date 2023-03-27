import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './model/store';
import App from './App';

const root: HTMLElement = document.getElementById('root') || document.body;

ReactDOM.createRoot(root).render(
	<Provider store={store}>
		<App />
	</Provider>
);

export default root;