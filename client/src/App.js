import { ProductsContextProvider } from './context/ProductsContext';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from './views/Index';
import Product from './views/Product';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import CheckoutForm from './components/Checkout/CheckoutForm';
import CheckoutResponse from './components/Checkout/CheckoutResponse';
import ImageUploader from './components/ImageUploader';
import Login from './views/Login';
import { AuthContextProvider } from './context/AuthContext';
import Dashboard from './views/Dashboard';

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
      path: "/category/:categoryName",
      element: <Index />
    },
    {
      path: "/products/:productId/:productName",
      element: <Product />
    },
    {
      path: "/checkout",
      element: <CheckoutForm />
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
      path: "/dashboard",
      element: <Dashboard />
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

