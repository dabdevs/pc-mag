import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel';
import ProductInfo from '../components/ProductInfo';
import SimilarProducts from '../components/SimilarProducts';
import { getById } from '../api/products';
import Spinner from '../components/Spinner';
import Layout from '../components/Layout';

export default function Product() {
    const [product, setProduct] = useState(null)
    const [similarProducts, setSimilarProducts] = useState([])
    const { productId} = useParams()

    console.log(productId)

    useEffect(() => {
        getById(productId)
            .then(data => {
                setProduct(data.product)
                setSimilarProducts(data.similarProducts)
            }).then(() => window.scrollTo({
                top: 0,
                behavior: 'smooth',
            }))
            .catch(err => console.error(err))
    }, [productId]);

    return (
        <Layout>
            {product ? (<section className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <ProductCarousel product={product} />
                    <ProductInfo product={product} />
                    <SimilarProducts similarProducts={similarProducts} />
                </div>
            </section>) :
                <Spinner />
            }
        </Layout>
    )
}
