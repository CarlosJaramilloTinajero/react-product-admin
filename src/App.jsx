import './App.css'
import { MasterLayout } from './components/Layout/MasterLayout'
import { ProductView } from './views/product/ProductView';
import { CategoryView } from './views/category/CategoryView';
import { BrandView } from './views/brand/BrandView';
import { SubacetgoryView } from './views/subcategory/SubactegoryView';

function App() {

  return (
    <MasterLayout>
      <ProductView />
      {/* <CategoryView /> */}
      {/* <BrandView /> */}
      {/* <SubacetgoryView /> */}
    </MasterLayout>
  );
}

export default App