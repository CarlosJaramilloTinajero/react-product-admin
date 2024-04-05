import './App.css'
import { useEffect } from 'react';
import { MasterLayout } from './components/Layout/MasterLayout'
import { initAPP } from './services/apiService';

// Views
import { ProductView } from './views/product/ProductView';
import { CategoryView } from './views/category/CategoryView';
import { BrandView } from './views/brand/BrandView';
import { SubacetgoryView } from './views/subcategory/SubactegoryView';
import { LoginView } from './views/auth/LoginView';
import { DepartamentView } from './views/departament/DepartamentView';

// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { redirect } from "react-router-dom";
import { APP_DEBUG, baseURL } from './constants';

function App() {

  useEffect(() => {
    if (!APP_DEBUG) initAPP();;
  }, []);

  const requiredAuth = async () => {
    if (!localStorage.getItem('token')) {
      return redirect('/login');
    }

    return null;
  }

  const requiredGuest = async () => {
    if (localStorage.getItem('token')) {
      return redirect('/');
    }

    return null;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MasterLayout children={<ProductView />} />,
      loader: requiredAuth,
    },
    {
      path: 'productos',
      element: <MasterLayout children={<ProductView />} />,
      loader: requiredAuth
    },
    {
      path: 'departamentos',
      element: <MasterLayout children={<DepartamentView />} />,
      loader: requiredAuth
    },
    {
      path: 'categorias',
      element: <MasterLayout children={<CategoryView />} />,
      loader: requiredAuth
    },
    {
      path: 'subcategorias',
      element: <MasterLayout children={<SubacetgoryView />} />,
      loader: requiredAuth
    },
    {
      path: 'marcas',
      element: <MasterLayout children={<BrandView />} />,
      loader: requiredAuth
    },
    {
      path: 'login',
      element: <LoginView />,
      loader: requiredGuest
    }
  ],
    {
      basename: baseURL
    });

  return (
    <RouterProvider router={router} />
  );
}

export default App