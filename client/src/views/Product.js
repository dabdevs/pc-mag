import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel';
import ProductInfo from '../components/ProductInfo';
import SimilarProducts from '../components/SimilarProducts';
import { ShoppingCartProvider } from '../context/ShoppingCartContext';
import { getById } from '../api/products';
import Spinner from '../components/Spinner';
import Layout from '../components/Layout';
import { useProductsContext } from '../context/ProductsContext';

export default function Product() {
    const [product, setProduct] = useState({})
    const [similarProducts, setSimilarProducts] = useState([])
    const { productId } = useParams()

    useEffect(() => {
        getById(productId)
            .then(product => setProduct(product))
            .catch(err => console.error(err)) 
        
        
        // const similarProducts = products.filter(function ([key, value]) {
        //     console.log(key, value)
        //     const pass = key !== productId && (product.name.toLowerCase().includes(value.ram.toLowerCase()) || product.name.toLowerCase().includes(value.hdd.toLowerCase()) || product.name.toLowerCase().includes(value.processor.toLowerCase()))

        //     if (this.count <= 6 && pass) {
        //         this.count++;
        //         return true;
        //     }

        //     return false;
        // }, { count: 0 });

        // setProduct(product)
        // setSimilarProducts(similarProducts)

        // getProducts().then(products => {
            
        // })
        //     .then(() => window.scrollTo({
        //         top: 0,
        //         behavior: 'smooth',
        //     })).catch((err) => console.error(err))
    }, []);

    return (
        <Layout>
            {!product && <Spinner />}

            {product && (<section className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <ProductCarousel product={product} />
                    <ShoppingCartProvider>
                        <ProductInfo product={product} />
                    </ShoppingCartProvider>
                    <SimilarProducts similarProducts={similarProducts} />
                </div>
            </section>)}
        </Layout>
    )
}
