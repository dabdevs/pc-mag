import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router-dom'
import ListProducts from '../components/ListProducts'
import { getProducts } from '../api/products'
import SearchForm from '../components/SearchForm'
import { useProductsContext } from '../context/ProductsContext'

export default function Index() {
    const { categoryName } = useParams()
    const {products, setProducts, loading, setLoading} = useProductsContext()

    useEffect(() => {
        setLoading(true)

        getProducts(categoryName).then(data => {
            setProducts(data)
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
            setLoading(false)
        });
    }, [categoryName])

    return (
        <div>
            <Layout>
                
                <SearchForm />

                <div className='row py-lg-4'>
                    <Sidebar category={categoryName} />
                    <ListProducts category={categoryName} products={products} loading={loading} />
                </div>    
            </Layout>
        </div>
    )
}
