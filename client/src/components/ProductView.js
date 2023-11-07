import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import ProductCarousel from './ProductCarousel';
import Navbar from './Navbar';
import ProductInfo from './ProductInfo';
import SimilarProducts from './SimilarProducts';
import { ShoppingCartProvider } from '../context/ShoppingCartContext';
import { getProducts } from '../api/products';
import Spinner from './Spinner';

export default function ProductView() {
    const [product, setProduct] = useState(null)
    const [similarProducts, setSimilarProducts] = useState([])
    const {productId} = useParams()

    useEffect(() => {
        getProducts().then(products => {
            const data = products.find(product => product[0] === productId)
            const product = data[1]

            const similarProducts = products.filter(function ([key, value]) {
                console.log(key, value)
                const pass = key !== productId && (product.name.toLowerCase().includes(value.ram.toLowerCase()) || product.name.toLowerCase().includes(value.hdd.toLowerCase()) || product.name.toLowerCase().includes(value.processor.toLowerCase()))

                if (this.count <= 6 && pass) {
                    this.count++;
                    return true;
                }

                return false;
            }, { count: 0 });

            setProduct(product)
            setSimilarProducts(similarProducts)
        })
        .then(() => window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })).catch((err) => console.error(err))
    }, [productId]);

    return (
        <div className="ProductView">
            <Navbar />

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
        </div>
    )
}
