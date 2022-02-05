import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import AuthProvider from './store/AuthProvider';

render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
