import './App.css'
import { TableBrands } from './components/Brands/TableBrands'
import { TableCategories } from './components/Categories/TableCategories'
import TableProducts from './components/Products/TableProducts'
import { TableSubcategory } from './components/Subcategories/TableSubcategory'

function App() {

  return (
    <div className="container">
      {/* <TableProducts /> */}
      {/* <TableBrands /> */}
      {/* <TableCategories /> */}
      <TableSubcategory />
    </div>
  )
}

export default App
