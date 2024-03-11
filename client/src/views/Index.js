import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import { getProducts } from '../api/products'
import SearchForm from '../components/SearchForm'
import { useProductsContext } from '../context/ProductsContext'
import ProductCard from '../components/ProductCard'
import Menu from '../components/Menu'
import LazyLoad from 'react-lazyload'
import List from '../components/Products/front/List'

export default function Index() {
    const { search } = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get('category')
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(null)
    const [productsCount, setProductsCount] = useState(0)
    const [content, setContent] = useState(null)
    const [products, setProducts] = useState([])
    const [filtered, setFiltered] = useState(false)
    //const { products, setProducts, filtered, setFiltered } = useProductsContext()

    const prevBtnClasses = page === 1 ? 'page-item disabled' : 'page-item'
    const nextBtnClasses = totalPages === currentPage ? 'page-item disabled' : 'page-item'

    useEffect(() => {
        setLoading(true)
        setSearchParams({ page })
        getProducts(category, search, page)
            .then(({ products, count, totalPages, currentPage }) => {
                setProducts(products)
                setProductsCount(count)
                setTotalPages(totalPages)
                setCurrentPage(currentPage)
                setLoading(false)
                //createContent(products).then(() => setLoading(false))
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            });
    }, [category, search, page])

    // const createContent = async (products) => {
    //     console.log('Creating content')
    //     const _jsx = <div className="row gx-3 gx-lg-4 row-cols-xs-1 row-cols-md-2 row-cols-lg-4">
    //         {products?.map(product =>
    //         (<LazyLoad key={`ll-${product._id}`} offset={100}>
    //             <ProductCard key={`pc-${product._id}`} id={product._id} product={product} />
    //         </LazyLoad>)
    //         )}
    //     </div>

    //     setContent(_jsx)
    // }

    const pagination = {
        page,
        setPage,
        prevBtnClasses,
        nextBtnClasses,
        currentPage
    }

    return (
        <div>
            <Layout>
                <SearchForm />

                <div className='row py-lg-4'>
                    <Sidebar category={category} page={page} />

                    <div className="col-sm-9 col-lg-10 ms-sm-auto p-4" >
                        <Menu category={category} />

                        <div className='row-cols-2 gx-4 gx-lg-5'>
                            <div className='col'>
                                {filtered}

                                {filtered && (
                                    <button type='button' onClick={() => { setSearchParams({}); setFiltered(false) }} className='btn btn-sm border btn-danger mx-1'>
                                        Clear filters <i className="bi bi-x"></i>
                                    </button>
                                )}
                            </div>
                        </div>

                        {loading?
                            <b>Loading...</b> :
                            <List products={products} pagination={pagination} />
                        }
                    </div >
                </div>
            </Layout>
        </div>
    )
}
