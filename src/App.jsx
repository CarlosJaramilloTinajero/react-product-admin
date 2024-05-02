import './App.css'
import { useEffect } from 'react';
import { initAPP } from './services/apiService';
import { APP_DEBUG } from './constants';
import router from './router';
import { RouterProvider } from 'react-router-dom';

function App() {
  useEffect(() => {
    if (!APP_DEBUG) initAPP();;
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App