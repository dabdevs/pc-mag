import { useProductsContext } from '../context/ProductsContext'
import ProductCard from './ProductCard'
import Menu from './Menu'
import LazyLoad from 'react-lazyload'


export default function ListProducts({ products, category }) {
    const { search, clearFilters, filtered, loading } = useProductsContext()

    return (
        <div className="col-sm-9 col-lg-10 ms-sm-auto px-4" >
            <div className='row-cols-2 gx-4 gx-lg-5'>
                <Menu category={category} />

                {loading && (<b>Loading...</b>)}

                {!loading &&
                    (<div className='col'>
                        {products?.length > 0 && (<b className=''>{products?.length} item{products?.length > 1 ? 's' : ''} {search && (<span>for <b>{search}</b></span>)} </b>)}

                        {(filtered || products?.length === 0) && (
                            <button type='button' onClick={clearFilters} className='btn btn-sm border btn-danger mx-1'>
                                Clear filters <i className="bi bi-x"></i>
                            </button>
                        )}
                    </div>
                    )}
            </div>
            <div className="row gx-3 gx-lg-4 row-cols-1 row-cols-md-2 row-cols-lg-4">

                {products?.length > 0 && products?.map((product) => 
                (<LazyLoad key={`ll-${product._id}`} offset={100} className='col'>
                    <ProductCard key={`pc-${product._id}`} id={product._id} product={product} />
                </LazyLoad>)
                )}

                {!loading && products?.length === 0 && <p className='mx-auto lead my-5 text-center'>No products found <i className="bi bi-emoji-frown"></i></p>}
            </div>
        </div >
    )
}

