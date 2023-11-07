import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
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
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { category } = useParams() 

    useEffect(() => {
        setLoading(true)
        getProducts(category)
            .then(products => {
                setProducts(products)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            });
    }, [])

    const handleSearch = async (search) => {
        setSearch(search)
        navigate(`/${category ? category : ''}?q=${search}`);
        setFiltered(true)
        setLoading(true)

        let data = await getProducts(category)
        data = data.filter(([key, value]) => value.name.toLowerCase().includes(search.toLowerCase()))

        setProducts(data)
        setLoading(false)
    }

    const handleSortBy = async (sort) => {
        let data = await getProducts(category)

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

    const handleFilter = async (filters) => {
        try {
            setFilters(filters)
            setFiltered(true)
            setLoading(true)

            let data = await getProducts(category)

            if (Object.keys(filters).length > 0) {
                Object.entries(filters).map(([column, values]) => {
                    if (column === 'processor') {
                        let processors = Object.keys(values).filter(key => values[key] === true)

                        if (processors.length > 0) {
                            data = data.filter(([key, product]) => {
                                for (const processor of processors) {
                                    if (product.processor.includes(processor)) {
                                        return true
                                    }
                                }
                                return false
                            })
                        }
                    }

                    if (column === 'formFactor') {
                        let formFactors = Object.keys(values).filter(key => values[key] === true)

                        console.log('form factor', formFactors)
                        if (formFactors.length > 0) {
                            data = data.filter(([key, value]) => formFactors.includes(value.form_factor))
                        }
                    }

                    if (column === 'ram') {
                        let rams = Object.keys(values).filter(key => values[key] === true)

                        if (rams.length > 0) {
                            data = data.filter(([key, value]) => rams.includes(value.ram))
                        }
                    }

                    if(column === 'minPrice') {
                        if (values !== '') {
                            data = data.filter(([key, value]) => formatPrice(value.price) >= parseInt(values))
                        }
                    }

                    if (column === 'maxPrice') {
                        if (values !== '') {
                            data = data.filter(([key, value]) => formatPrice(value.price) <= parseInt(values))
                        }
                    }
                });
            }

            setLoading(false)
            setProducts(data)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const clearFilters = () => {
        navigate(`/${category ? category : ''}`)
        setSearch('')
        setFiltered(false)
        setFilters()

        const inputs = document.querySelectorAll('.form-check-input');

        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            }
        });

        getProducts(category)
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
            category,
            handleSortBy
        }}
        >
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext;