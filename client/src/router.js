import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProductView from "./components/ProductView";

const router = createBrowserRouter([
    {
        path: "/:category?",
        element: <App />,
    },
    {
        path: "/:productId/:productName",
        element: <ProductView />,
    }
]);

export default router;