import { useEffect, useState } from 'react'
import { Link, useParams, useLocation, useSearchParams } from 'react-router-dom'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import { getProducts } from '../api/products'
import SearchForm from '../components/SearchForm'
import { useProductsContext } from '../context/ProductsContext'
import ProductCard from '../components/ProductCard'
import Menu from '../components/Menu'
import LazyLoad from 'react-lazyload'

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
    const { setProducts, filtered, setFiltered } = useProductsContext()

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
                createContent(products).then(() => setLoading(false))
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            });
    }, [category, search, page])

    const createContent = async (products) => {
        console.log('Creating content')
        const _jsx = <div className="row gx-3 gx-lg-4 row-cols-xs-1 row-cols-md-2 row-cols-lg-4">
            {products?.map(product =>
            (<LazyLoad key={`ll-${product._id}`} offset={100}>
                <ProductCard key={`pc-${product._id}`} id={product._id} product={product} />
            </LazyLoad>)
            )}
        </div>

        setContent(_jsx)
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
                                {productsCount > 0 && (<b className=''>{productsCount} item{productsCount > 1 ? 's' : ''} {!search.includes('?page=') && search && (<span>for <b>{search}</b></span>)} </b>)}

                                {filtered}

                                {filtered && (
                                    <button type='button' onClick={() => { setSearchParams({}); setFiltered(false) }} className='btn btn-sm border btn-danger mx-1'>
                                        Clear filters <i className="bi bi-x"></i>
                                    </button>
                                )}
                            </div>
                        </div>

                        {loading ? (<b>Loading...</b>) : productsCount === 0 && <p className='mx-auto lead my-5 text-center'>No products found <i className="bi bi-emoji-frown"></i></p>}

                        {content}

                        {!loading ? <nav>
                            <ul className="pagination pagination-sm mt-3">
                                <li className={prevBtnClasses}>
                                    <Link className="page-link text-dark" href='#' tabIndex="-1" onClick={(e) => { e.preventDefault(); setPage(prevPage => prevPage - 1) }}>Previous</Link>
                                </li>
                                <li className="page-item" aria-current="page" onClick={(e) => { e.preventDefault(); setPage(1) }}>
                                    <Link className={`page-link ${page === 1 ? 'text-danger' : 'text-dark'}`} href='#'>1</Link>
                                </li>
                                <li className="page-item" onClick={(e) => { e.preventDefault(); setPage(2) }}>
                                    <Link className={`page-link ${page === 2 ? 'text-danger' : 'text-dark'}`} href='#'>2</Link>
                                </li>
                                <li className="page-item" onClick={(e) => { e.preventDefault(); setPage(3) }}>
                                    <Link className={`page-link ${page === 3 ? 'text-danger' : 'text-dark'}`} href='#'>3</Link>
                                </li>
                                <li className="page-item" onClick={(e) => { e.preventDefault(); setPage(4) }}>
                                    <Link className={`page-link ${page === 4 ? 'text-danger' : 'text-dark'}`} href='#'>4</Link>
                                </li>
                                <li className="page-item" onClick={(e) => { e.preventDefault(); setPage(5) }}>
                                    <Link className={`page-link ${page === 5 ? 'text-danger' : 'text-dark'}`} href='#'>5</Link>
                                </li>
                                <li className={`page-item disabled`} aria-current="page">
                                    <Link className="page-link text-dark" href='#'>... {page === currentPage}</Link>
                                </li>

                                {page > 5 &&
                                    <li className={`page-item`} aria-current="page">
                                        <Link className="page-link text-danger" href='#'>{page}</Link>
                                    </li>
                                }

                                <li className={nextBtnClasses}>
                                    <Link className="page-link text-dark" href='#' onClick={(e) => { e.preventDefault(); setPage(prevPage => prevPage + 1) }}>Next</Link>
                                </li>
                            </ul>
                        </nav> : null}
                    </div >
                </div>
            </Layout>
        </div>
    )
}
