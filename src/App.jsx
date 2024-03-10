import './App.css'

import { MasterLayout } from './components/Layout/MasterLayout'

// Views
import { ProductView } from './views/product/ProductView';
import { CategoryView } from './views/category/CategoryView';
import { BrandView } from './views/brand/BrandView';
import { SubacetgoryView } from './views/subcategory/SubactegoryView';

// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { redirect } from "react-router-dom";
import { LoginView } from './views/auth/LoginView';
import { baseURL } from './constants';

function App() {
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