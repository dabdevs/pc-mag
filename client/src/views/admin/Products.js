import React, { useEffect, useState } from 'react'
import Dashboard from '../Dashboard'
import { getProducts, destroy, getProductFormData } from '../../api/products'
import ModalComponent from '../../components/Shared/ModalComponent'
import ProductForm from '../../Forms/ProductForm'
import { FaPlus } from "react-icons/fa";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useSearchParams } from 'react-router-dom';
import BasicTable from '../../components/BasicTable'
import SortingTable from '../../components/SortingTable'
import FilteringTable from '../../components/FilteringTable'

export default function Products() {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(null)
    const [search, setSearch] = useState('')
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [action, setAction] = useState('')
    const [content, setContent] = useState(null)
    const [formData, setFormData] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        getProductFormData().then(data => setFormData(data)).catch(err => console.log(err))
        setLoading(true)
        setSearchParams({page})
        getProducts('', '', page)
            .then(({ products, totalPages, currentPage }) => {
                setLoading(false)
                setProducts(products)
                setTotalPages(totalPages)
                setCurrentPage(currentPage)
                createContent()
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [page])

    const createItem = () => {
        setAction('create')
        setSelectedProduct({images: []})
    }

    const editItem = (product) => {
        setAction('edit')
        setSelectedProduct(product)
    }

    const deleteItem = (product) => {
        setAction('delete')
        setModalTitle(`Deleting "${product.name}"`)
        setOpenModal(true)
        setSelectedProduct(product)
    }

    const deleteProduct = () => {
        destroy(selectedProduct._id).then(({ _id }) => {
            setOpenModal(false)
            setProducts(prevProducts => {
                return prevProducts.filter((prod) =>
                    prod._id !== _id
                );
            });
            alert('Product deleted successfully')
        }).catch(err => console.log(err))
    }

    const closeForm = () => {
        setSelectedProduct(null)
        setAction('')
    }

    function createContent() {
        console.log('Creating content')
        const data = filteredProducts.length ? filteredProducts : products;
        let _jsx = null;

        const prevBtnClasses = page === 1 ? 'page-item disabled' : 'page-item'
        const nextBtnClasses = totalPages === currentPage ? 'page-item disabled' : 'page-item'

        if (loading) _jsx = <p>Loading...</p>

        if (products.length > 0) {
            _jsx = (
                <div>
                    <Row>
                        <Col xs={9}>
                            <h1 className="display-4 fw-bolder">Products</h1>
                        </Col>
                        <Col xs={3} className='d-flex align-items-center'>
                            <button className='btn btn-success ms-auto' onClick={createItem}><FaPlus /> New Product</button>
                        </Col>
                    </Row>

                    
                    {/* <table className='w-100 table table-striped'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Operative System</th>
                                <th>Form Factor</th>
                                <th>DiskType</th>
                                <th>Disk</th>
                                <th>Ram</th>
                                <th>Processor</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ?
                                data.map((product, index) => (
                                    <tr key={index}>
                                        <th>
                                            {product?.images ? <img width={100} className="card-img-top" alt='' src={product?.images[0] ? product?.images[0] : '../../../img/default-notebook-img.jpg'} /> : null}
                                        </th>
                                        <td className='pt-3'>{product.name}</td>
                                        <td className='pt-3'>{product.brand}</td>
                                        <td className='pt-3'>{product.os}</td>
                                        <td className='pt-3'>{product.formFactor}</td>
                                        <td className='pt-3'>{product.diskType}</td>
                                        <td className='pt-3'>{product.disk}</td>
                                        <td className='pt-3'>{product.ram}</td>
                                        <td className='pt-3'>{product.processor}</td>
                                        <td className='pt-3'>{product.quantity}</td>
                                        <td className='pt-3'>
                                            <div className='d-flex border-none gap-2'>
                                                <button className='btn btn-warning btn-sm' onClick={() => editItem(product)}>Edit</button>
                                                <button className='btn btn-danger btn-sm' onClick={() => deleteItem(product)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : <p>No products found.</p>}
                        </tbody>
                    </table> */}
                    <FilteringTable />
                    {/* <nav>
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
                    </nav> */}
                </div>
            )
        }

        setContent(_jsx)
    }

    const handleSearch = async (e) => {
        setSearch(e.target.value)
        console.log('Keyword',e.target.value)
    }

    useEffect(() => {
        console.log('Products changed', products)
        createContent()
    }, [products])

    return (
        <Dashboard>
            <section className='p-0 my-2 col-sm-12' style={{ minHeight: '80vh' }}>

                {
                    selectedProduct
                    && action !== 'delete'
                    && <ProductForm data={formData} setProducts={setProducts} closeForm={closeForm} product={selectedProduct} />
                }

                {
                    !['create', 'edit'].includes(action) && content
                }

                {openModal && <ModalComponent handleConfirm={deleteProduct} action={action} title={modalTitle} setOpenModal={setOpenModal}>
                    {action === 'delete' ? <p>Are you sure you want to confirm this action?</p> : <ProductForm data={formData} product={selectedProduct} />}
                </ModalComponent>}

            </section>
        </Dashboard>
    );
}

