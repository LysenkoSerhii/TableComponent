import Table from './view/components/Table/Table';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './view/components/Table/theme';
import { createPortal } from 'react-dom';
import Modals from './view/modals';
import root from './index';

import './index.styles.css';

function App() {
  const keys = [{id: 0, name: '', age: 0, about: ''}];
  return (
    <ThemeProvider theme={lightTheme}>
      {createPortal(<Modals />, root)}
      <div className='table-container'>
        <Table
          data={keys}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
