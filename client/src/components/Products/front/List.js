import React, { useEffect, useState } from 'react'
import ProductCard from '../../ProductCard'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'
import { useProductsContext } from '../../../context/ProductsContext'

export default function List() {
    const [content, setContent] = useState(null)
    const { products, search, page, setPage, prevBtnClasses, nextBtnClasses, currentPage, productsCount } = useProductsContext()

    useEffect(() => {
        console.log('Reloading List', 'page:', page, products)
        createContent(products)
    }, [products, page])

    const createContent = (products) => {
        const _jsx = <div>
            <b>{search}</b>
            {productsCount > 0 && <p className='m-0'>{productsCount} item{productsCount > 1 ? 's' : ''} </p>}

            {/* <div className='row-cols-2 gx-4 gx-lg-5'>
                <div className='col'>
                    {filtered}

                    {filtered && (
                        <button type='button' onClick={() => { setSearchParams({}); setFiltered(false) }} className='btn btn-sm border btn-danger mx-1'>
                            Clear filters <i className="bi bi-x"></i>
                        </button>
                    )}
                </div>
            </div> 
            */}

            {
                products.length > 0 &&
                (<div>
                    <div className='row gx-3 gx-lg-4 row-cols-xs-1 row-cols-md-2 row-cols-lg-4'>
                        {products?.map(product =>
                            <LazyLoad key={`ll-${product._id}`} offset={100}>
                                <ProductCard key={`pc-${product._id}`} id={product._id} product={product} />
                            </LazyLoad>
                        )}
                    </div>
                    <nav className='row px-2'>
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
                    </nav>
                </div>)
            }
        </div>

        setContent(_jsx)
    }

    return products.length > 0 ? content : <p className='mx-auto lead my-5 text-center'>No products found <i className="bi bi-emoji-frown"></i></p>
}
