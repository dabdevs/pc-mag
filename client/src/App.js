import { ComputersContextProvider } from './context/ComputersContext';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from './views/Index';
import Computer from './views/Computer';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import CheckoutResponse from './components/Checkout/CheckoutResponse';
import ImageUploader from './components/ImageUploader';
import Login from './views/Login';
import { AuthContextProvider } from './context/AuthContext';
import Dashboard from './views/admin/Dashboard';
import Computers from './views/admin/Computers';
import Profile from './components/Profile';
import Keyboards from './views/admin/Keyboards';
import Chargers from './views/admin/Chargers';
import Mice from './views/admin/Mice';
import NotFound from './views/NotFound';

function App() {
  const router = createBrowserRouter([
    {
      path: "/:category?",
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
      element: <Dashboard />,
      children: [
        {
          path: "",
          element: <Computers />
        },
        {
          path: "computers",
          element: <Computers />
        },
        {
          path: "keyboards",
          element: <Keyboards />,
          loader: null
        },
        {
          path: "mice",
          element: <Mice />,
          loader: null
        },
        {
          path: "chargers",
          element: <Chargers />,
          loader: null
        },
        {
          path: "profile",
          element: <Profile />,
          loader: null
        },
      ]
    },
    // {
    //   path: "/admin/computers",
    //   element: <Computers />
    // },
    {
      path: "*",
      element: <NotFound />
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

