import React, { useEffect, useMemo, useRef, useState } from 'react'
import Dashboard from '../Dashboard'
import TableComponent from '../../components/Shared/TableComponent'
import { getProducts, destroy, getProductFormData } from '../../api/products'
import ModalComponent from '../../components/Shared/ModalComponent'
import ProductForm from '../../Forms/ProductForm'
import { useTable, usePagination, useRowSelect } from 'react-table';
import { FaPlus } from "react-icons/fa";
import { formatPrice } from '../../utils'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useSWR from 'swr';

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
    const [tableData, setTableDada] = useState(undefined)
    const [action, setAction] = useState('')
    const [editRowId, setEditRowId] = useState(null);
    const [content, setContent] = useState(null)
    const [formData, setFormData] = useState([])

    useEffect(() => {
        setLoading(true)
        getProductFormData().then(data => setFormData(data)).catch(err => console.log(err))

        getProducts('', '', page)
            .then(({ products, totalPages, currentPage }) => {
                setLoading(false)
                setProducts(products)
                setTotalPages(totalPages)
                setCurrentPage(currentPage)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [page])

    const createItem = (product) => {
        setAction('create')
        setSelectedProduct(product)
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
            setProducts((prevProducts) => {
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
        console.log('total pages function', currentPage, totalPages)
        const data = filteredProducts.length ? filteredProducts : products;
        let _jsx = null;

        const prevBtnClasses = page === 1 ? 'page-item disabled' : 'page-item'
        const nextBtnClasses = totalPages == currentPage ? 'page-item disabled' : 'page-item'

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

                    <div className='card p-2 mb-2'>
                        <h5>Filters</h5>

                        <div className='row'>
                            <div className='col-sm-12'>
                                <input className='form-control my-2' placeholder='Filter by name' value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            <div className='col-sm-3'>
                                <select className='form-control my-2'>
                                    <option>Operative System</option>
                                    <option>Windows</option>
                                    <option>Mac OS</option>
                                    <option>Linux</option>
                                </select>
                            </div>
                            <div className='col-sm-3'>
                                <select className='form-control my-2'>
                                    <option>Form Factor</option>
                                    <option>Windows</option>
                                    <option>Mac OS</option>
                                    <option>Linux</option>
                                </select>
                            </div>
                            <div className='col-sm-3'>
                                <select className='form-control my-2'>
                                    <option>Processor</option>
                                    <option>Intel i3</option>
                                    <option>Intel i5</option>
                                    <option>Intel i7</option>
                                    <option>Intel i9</option>
                                    <option>Amd</option>
                                </select>
                            </div>
                            <div className='col-sm-3'>
                                <select className='form-control my-2'>
                                    <option>Disk Type</option>
                                    <option>HDD</option>
                                    <option>SSD</option>
                                </select>
                            </div>
                            <div className='col-sm-12'>
                                <h6>Ram</h6>
                                <input type='checkbox' value={'4 GB'} /> 4 GB &nbsp;&nbsp;
                                <input type='checkbox' value={'8 GB'} /> 8 GB &nbsp;&nbsp;
                                <input type='checkbox' value={'16 GB'} /> 16 GB &nbsp;&nbsp;
                                <input type='checkbox' value={'32 GB'} /> 32 GB &nbsp;&nbsp;
                            </div>
                        </div>
                    </div>
                    <table className='w-100 table table-striped'>
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
                                            <img height={40} className="card-img-top" src={product.images[0]} alt={product.images[0]} />
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
                    </table>
                    {<nav>
                        <ul className="pagination pagination-sm">
                            <li className={prevBtnClasses}>
                                <a className="page-link" href="javascript:void(0)" tabIndex="-1" onClick={() => setPage(prevPage => prevPage - 1)}>Previous</a>
                            </li>

                            <li className={`page-item ${page === 1 ? 'active' : ''}`} aria-current="page" onClick={() => setPage(1)}>
                                <a className="page-link" href="javascript:void(0)">1</a>
                            </li>
                            <li className={`page-item ${page === 2 ? 'active' : ''}`} aria-current="page" onClick={() => setPage(2)}>
                                <a className="page-link" href="javascript:void(0)">2</a>
                            </li>
                            <li className={`page-item ${page === 3 ? 'active' : ''}`} aria-current="page" onClick={() => setPage(3)}>
                                <a className="page-link" href="javascript:void(0)">3</a>
                            </li>
                            <li className={`page-item ${page === 4 ? 'active' : ''}`} aria-current="page" onClick={() => setPage(4)}>
                                <a className="page-link" href="javascript:void(0)">4</a>
                            </li>
                            <li className={`page-item ${page === 5 ? 'active' : ''}`} aria-current="page" onClick={() => setPage(5)}>
                                <a className="page-link" href="javascript:void(0)">5</a>
                            </li>
                            <li className={`page-item disabled`} aria-current="page">
                                <a className="page-link" href="javascript:void(0)">... {page === currentPage}</a>
                            </li>

                            {page > 5 &&
                                <li className={`page-item active`} aria-current="page">
                                    <a className="page-link" href="javascript:void(0)">{page}</a>
                                </li>
                            }

                            <li className={nextBtnClasses}>
                                <a className="page-link" href="javascript:void(0)" onClick={() => setPage(prevPage => prevPage + 1)}>Next</a>
                            </li>
                        </ul>
                    </nav>}
                </div>
            )
        }

        setContent(_jsx)
    }

    useEffect(() => {
        console.log('Search: ', search.toLowerCase())
        const filtered = products.filter(product => product.os.toLowerCase().includes(search.toLowerCase()))
        setFilteredProducts(filtered)
    }, [search])

    useEffect(() => {
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

