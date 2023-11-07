import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import SearchForm from './components/SearchForm';
import { ProductsContextProvider } from './context/ProductsContext';

function App() {

  return (
    <div className="App">
      <Navbar />
      
      <ProductsContextProvider>
        <SearchForm />
        <ProductList />
      </ProductsContextProvider>
    </div>
  );
}

export default App;

