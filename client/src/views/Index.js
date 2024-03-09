import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import { useParams, useLocation, useSearchParams } from 'react-router-dom'
import ListProducts from '../components/ListProducts'
import { getProducts } from '../api/products'
import SearchForm from '../components/SearchForm'
import { useProductsContext } from '../context/ProductsContext'

export default function Index() {
    const {search} = useLocation()
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')
    const [page, setPage] = useState(1) 
    const [productsCount, setProductsCount] = useState(0)
    const {products, setProducts, loading, setLoading} = useProductsContext()
    
    useEffect(() => {
        setLoading(true)
        getProducts(category, search, page).then(({products, count}) => {
            setProducts(products)
            setProductsCount(count)
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
            setLoading(false)
        });
    }, [category, search])

    return (
        <div>
            <Layout>
                <SearchForm />

                <div className='row py-lg-4'>
                    <Sidebar category={category} page={page} />
                    <ListProducts productsCount={productsCount} category={category} products={products} loading={loading} />
                </div>    
            </Layout>
        </div>
    )
}
