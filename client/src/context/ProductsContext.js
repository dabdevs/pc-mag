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

    // useEffect(() => {
    //     setLoading(true)
    //     getProducts()
    //         .then(products => {
    //             setProducts(products)
    //             setLoading(false)
    //         })
    //         .catch(err => {
    //             console.error(err)
    //             setLoading(false)
    //         });
    // }, [])

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

    const handleSortBy = async (sort) => {
        let data = await getProducts()

        if (sort) {
            data = data.sort((a, b) => sort === 'lowest-price' ? formatPrice(a[1].price) - formatPrice(b[1].price) : a[1].price - formatPrice(b[1].price))
        }

        console.log('Sorting by:', sort)
        console.log('Data:', data)
        setProducts(data)
        setLoading(false)
    }

    function formatPrice(strNumber) {
        return parseInt(strNumber.replace(/,/g, '').replace('.', '')) / 100;
    }

    const handleFilter = async (filters, category) => {
        try {
            setFilters(filters)
            setFiltered(true)
            setLoading(true)

            let data = await getProducts(category, search, filters)

            setLoading(false)
            setProducts(data)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const clearFilters = () => {
        // navigate(`/${category ? category : ''}`)
        setSearch('')
        setFiltered(false)
        setFilters()

        const inputs = document.querySelectorAll('.form-check-input');

        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            }
        });

        getProducts()
            .then(data => {
                setProducts(data)
            })
            .catch(err => console.error(err));
    }

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
            handleFilter,
            handleSearch,
            clearFilters,
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