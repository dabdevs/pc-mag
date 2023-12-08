import { ProductsContextProvider } from './context/ProductsContext';
import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import Index from './views/Index';
import Product from './views/Product';
import { ShoppingCartProvider } from './context/ShoppingCartContext';

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
      path: "/product/:productId/:slug",
      element: <Product />
    }, {
      path: "*",
      element: <p>404 page not found</p>
    }
  ])

  return (
    <div className="App">
      <ProductsContextProvider>
        <ShoppingCartProvider>
          <RouterProvider router={router} />
        </ShoppingCartProvider>
      </ProductsContextProvider>
    </div>
  );
}

export default App;

