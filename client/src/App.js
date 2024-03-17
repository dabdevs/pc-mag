import { ComputersContextProvider } from './context/ComputersContext';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from './views/Index';
import Computer from './views/Computer';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import CheckoutResponse from './components/Checkout/CheckoutResponse';
import ImageUploader from './components/ImageUploader';
import Login from './views/Login';
import { AuthContextProvider } from './context/AuthContext';
import Dashboard from './views/Dashboard';
import Computers from './views/admin/Computers';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />
    }, 
    {
      path: "/:category",
      element: <Index />
    },
    {
      path: "/search",
      element: <Index />
    },
    {
      path: "/computers/:computerId/:computerName",
      element: <Computer />
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
      path: "/admin/computers",
      element: <Computers />
    },
    {
      path: "*",
      element: <p>404 page not found</p>
    }
  ])

  return (
    <AuthContextProvider>
      <div className="App">
        <ComputersContextProvider>
          <ShoppingCartProvider>
            <RouterProvider router={router} />
          </ShoppingCartProvider>
        </ComputersContextProvider>
      </div>
    </AuthContextProvider>
  );
}

export default App;

