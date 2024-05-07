import { MasterLayout } from '../components/Layout/MasterLayout'

// Views
import { ProductView } from '../views/product/ProductView';
import { CategoryView } from '../views/category/CategoryView';
import { BrandView } from '../views/brand/BrandView';
import { SubacetgoryView } from '../views/subcategory/SubactegoryView';
import { LoginView } from '../views/auth/LoginView';
import { DepartamentView } from '../views/departament/DepartamentView';
import BannerView from '../views/banner/BannerView';

// Router
import { createBrowserRouter } from 'react-router-dom';
import { redirect } from "react-router-dom";
import { baseURL } from '../constants';

const requiredAuth = () => {
  if (!localStorage.getItem('token')) {
    return redirect('/login');
  }

  return null;
}

const requiredGuest = () => {
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
    path: 'banners',
    element: <MasterLayout children={<BannerView />} />,
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

export default router;