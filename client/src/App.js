import { ProductsContextProvider } from './context/ProductsContext';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from './views/Index';
import Product from './views/Product';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import CheckoutResponse from './components/Checkout/CheckoutResponse';
import ImageUploader from './components/ImageUploader';
import Login from './views/Login';
import { AuthContextProvider } from './context/AuthContext';
import Dashboard from './views/Dashboard';
import Products from './views/Products';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />
    },
    {
      path: "/search",
      element: <Index />
    },
    {
      path: "/products/:productId/:productName",
      element: <Product />
    },
    {
      path: "/checkout/:response",
      element: <CheckoutResponse />
    },
    {
      path: "/upload",
      element: <ImageUploader />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/admin",
      element: <Dashboard />
    },
    {
      path: "/admin/products",
      element: <Products />
    },
    {
      path: "*",
      element: <p>404 page not found</p>
    }
  ])

  return (
    <AuthContextProvider>
      <div className="App">
        <ProductsContextProvider>
          <ShoppingCartProvider>
            <RouterProvider router={router} />
          </ShoppingCartProvider>
        </ProductsContextProvider>
      </div>
    </AuthContextProvider>
  );
}

export default App;

