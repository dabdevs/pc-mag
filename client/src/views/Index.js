import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import { useParams, useLocation } from 'react-router-dom'
import ListProducts from '../components/ListProducts'
import { getProducts } from '../api/products'
import SearchForm from '../components/SearchForm'
import { useProductsContext } from '../context/ProductsContext'

export default function Index() {
    const {search} = useLocation()
    const {category} = useParams()
    const {products, setProducts, loading, setLoading} = useProductsContext()
    
    useEffect(() => {
        setLoading(true)
        console.log('Url query', search)
        getProducts(category, search).then(data => {
            setProducts(data)
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
                    <Sidebar category={category} />
                    <ListProducts category={category} products={products} loading={loading} />
                </div>    
            </Layout>
        </div>
    )
}
