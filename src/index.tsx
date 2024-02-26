import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { UserProvider } from './contexts/userContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './contexts/cartContext';

const container = document.getElementById('root');

const root = createRoot(container!);
root.render(
<StrictMode>
  <UserProvider>
    <CartProvider>
      <App />
      </CartProvider>
  </UserProvider>
</StrictMode>);