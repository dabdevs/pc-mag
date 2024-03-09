import { useProductsContext } from '../context/ProductsContext'
import ProductCard from './ProductCard'
import Menu from './Menu'
import LazyLoad from 'react-lazyload'
import { useSearchParams } from 'react-router-dom';


export default function ListProducts({productsCount, products, category }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const { search, filtered, setFiltered, loading } = useProductsContext()
    
    return (
        <div className="col-sm-9 col-lg-10 ms-sm-auto p-4" >
            <Menu category={category} />

            <div className='row-cols-2 gx-4 gx-lg-5'>
                <div className='col'>
                    {productsCount > 0 && (<b className=''>{productsCount} item{productsCount > 1 ? 's' : ''} {search && (<span>for <b>{search}</b></span>)} </b>)}
                    
                    {filtered}
                    
                    {filtered && (
                        <button type='button' onClick={() => {setSearchParams({}); setFiltered(false)}} className='btn btn-sm border btn-danger mx-1'>
                            Clear filters <i className="bi bi-x"></i>
                        </button>
                    )}
                </div>
            </div>

            {!loading && productsCount > 0 &&
                (
                    <div className="row gx-3 gx-lg-4 row-cols-xs-1 row-cols-md-2 row-cols-lg-4">
                        {products?.map(product =>
                        (<LazyLoad key={`ll-${product._id}`} offset={100}>
                            <ProductCard key={`pc-${product._id}`} id={product._id} product={product} />
                        </LazyLoad>)
                        )}
                    </div>
                )
            }

            {loading ? (<b>Loading...</b>) : productsCount === 0 && <p className='mx-auto lead my-5 text-center'>No products found <i className="bi bi-emoji-frown"></i></p>}
        </div >
    )
}

