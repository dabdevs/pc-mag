import { createContext, useState, useContext } from "react";
import { getProducts } from "../api/products";

const ProductsContext = createContext({})

export function useProductsContext() {
    return useContext(ProductsContext);
}

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState()
    const [filtered, setFiltered] = useState(false)
    const [filters, setFilters] = useState([])
    const [loading, setLoading] = useState(false)
    const [filtersCleared, setFiltersCleared] = useState(false)

    const handleSearch = async (search, category='') => {
        setSearch(search)
        setFiltered(true)
        setLoading(true)

        getProducts(category, search)
        .then(data => {
            setProducts(data)
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
            setLoading(false)
        })
    }

    const handleSortBy = async (data, sort, category='') => {
        if (sort === '') {
            data = await getProducts(category, search, filters)
        }

        if (sort === 'lowest-price') {
            data = data.sort((a, b) => a.price - b.price)
        }

        if (sort === 'highest-price') {
            data = data.sort((a, b) => b.price - a.price)
        }

        return data
    }

    // const clearFilters = (category) => {
    //     setSearch('')
    //     setFiltered(false)
    //     setFilters()

    //     const inputs = document.querySelectorAll('input');

    //     inputs.forEach(input => {
    //         if (input.type === 'checkbox') {
    //             input.checked = false;
    //         }

    //         if (input.type === 'text') input.value = ''
    //     });

    //     document.getElementById('sort').value = ''

    //     getProducts(category)
    //         .then(data => setProducts(data))
    //         .catch(err => console.error(err));
    // }

    return (
        <ProductsContext.Provider value={{
            products,
            setProducts,
            search,
            setSearch,
            filtered,
            setFiltered,
            loading,
            setLoading,
            handleSearch,
            filtersCleared,
            setFiltersCleared,
            filters,
            setFilters,
            handleSortBy
        }}
        >
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext;