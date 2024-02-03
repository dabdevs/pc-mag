import React, { useEffect, useMemo, useRef, useState } from 'react'
import Dashboard from '../Dashboard'
import TableComponent from '../../components/Shared/TableComponent'
import { getProducts, create, update, destroy } from '../../api/products'
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
    const [search, setSearch] = useState('')
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [tableData, setTableDada] = useState(undefined)
    const [action, setAction] = useState('')
    const [editRowId, setEditRowId] = useState(null);

    useEffect(() => {
        setLoading(true)
        getProducts()
            .then(({products}) => {
                setLoading(false)
                setProducts(products)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [])

    useEffect(() => {
        console.log('Search: ', search.toLowerCase())
        const filtered = products.filter(product => product.os.toLowerCase().includes(search.toLowerCase()))
        setFilteredProducts(filtered)
    }, [search])

    const data = filteredProducts.length ? filteredProducts : products;

    return (
        <Dashboard>
            <section className='p-0 my-2 col-sm-12' style={{ minHeight: '80vh' }}>
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
                {loading ? 
                    <p>Loading...</p> : 
                    products.length ? 
                    <table className='w-100 table table-striped'>
                        <thead>
                            <th>Name</th>
                            <th>Operative System</th>
                            <th>Form Factor</th>
                            <th>DiskType</th>
                            <th>Disk</th>
                            <th>Ram</th>
                            <th>Processor</th>
                            <th>quantity</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {data &&
                                data.map((product, index) => (
                                    <tr key={index}>
                                        <td >{product.name}</td>
                                        <td>{product.os}</td>
                                        <td>{product.formFactor}</td>
                                        <td>{product.diskType}</td>
                                        <td>{product.disk}</td>
                                        <td>{product.ram}</td>
                                        <td>{product.processor}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.ram}</td>
                                        <td>Action</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table> : 
                    <p>No products found.</p> 
                }
            </section> 
        </Dashboard>
    );

    // useEffect(() => {
    //     getProducts().then(products => {
    //         setProducts(products)
    //     }).then(() => {
    //         setTableDada({
    //             tHead: ['Name', 'Form Factor', 'OS', 'Processor', 'Ram', 'Disk', 'Price', 'Available', 'Actions'],
    //             tBody: products?.map(product =>
    //                 [product.name, product.formFactor, product.os, product.processor, product.ram, `${product.disk} ${product.diskType}`, `$ ${formatPrice(product.price)}`, product.quantity ?? 0, <div className='d-flex border-none gap-2'><button className='btn btn-warning btn-sm' onClick={() => editItem(product)}>Edit</button><button className='btn btn-danger btn-sm' onClick={() => deleteItem(product)}>Delete</button></div>]
    //             )
    //         })
    //     }).catch(err => console.log(err))
    // }, [products])


    // const data = useMemo(async () => await getProducts(), [])

    // console.log(data)

    function selectComponent({ value }) {
        return (
            <input value={value} type='checkbox' className='form-control' onChange={(e) => e.target.value} />
        )
    }

    const handleEditClick = (rowId) => {
        setEditRowId(rowId);
    };

    const formatPrice = (value) => {
        if (value) {
            return `$${(value / 100).toFixed(2)}`;
        } else {
            return "-";
        }
    };

    const selectProduct = (id) => {
        console.log('Product selected with id', id)
    }



    // const columns = useMemo(() => [
    //     {
    //         Header: 'Name',
    //         accessor: 'name'
    //     },
    //     {
    //         Header: 'Form Factor',
    //         accessor: 'formFactor'
    //     },
    //     {
    //         Header: 'Operative System',
    //         accessor: 'os'
    //     },
    //     {
    //         Header: 'Processor',
    //         accessor: 'processor'
    //     },
    //     {
    //         Header: 'Ram',
    //         accessor: 'ram'
    //     },
    //     {
    //         Header: 'Disk Type',
    //         accessor: 'diskType'
    //     },
    //     {
    //         Header: 'Disk',
    //         accessor: 'disk'
    //     },
    //     {
    //         Header: 'Price',
    //         accessor: 'price',
    //         Cell: ({ value }) => formatPrice(value),
    //     },
    //     {
    //         Header: 'Action',
    //         accessor: '_id',
    //         Cell: ({ value }) => (<selectComponent value={value} />),
    //     }
    // ], []);

    // const {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     page,
    //     prepareRow,
    //     canPreviousPage,
    //     canNextPage,
    //     pageOptions,
    //     nextPage,
    //     previousPage,
    //     state: { pageIndex }
    // } = useTable({ columns, data, initialState: { pageIndex: 0 } }, usePagination);

    // useEffect(() => {
    //     console.log('PRODUCTS CHANGED', products)
    //     setTableDada({
    //         tHead: ['Name', 'Form Factor', 'OS', 'Processor', 'Ram', 'Disk', 'Price', 'Available', 'Actions'],
    //         tBody: products?.map(product =>
    //             [product.name, product.formFactor, product.os, product.processor, product.ram, `${product.disk} ${product.diskType}`, `$ ${formatPrice(product.price)}`, product.quantity ?? 0, <div className='d-flex border-none gap-2'><button className='btn btn-warning btn-sm' onClick={() => editItem(product)}>Edit</button><button className='btn btn-danger btn-sm' onClick={() => deleteItem(product)}>Delete</button></div>]
    //         )
    //     })
    // }, [products])

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
            // setProducts((prevProducts) => {
            //     return prevProducts.filter((prod) =>
            //         prod._id !== _id
            //     );
            // });
            alert('Product deleted successfully')
        }).catch(err => console.log(err))
    }

    const closeForm = () => {
        setSelectedProduct(null)
        setAction('')
    }

    // return products.length > 0 ? (
    //     <Dashboard>
    //         <section style={{ minHeight: '80vh' }} className='p-0 my-2 col-sm-12'>
    //             {/* <table {...getTableProps()} className='w-100'>
    //                 <thead>
    //                     {headerGroups.map(headerGroup => (
    //                         <tr {...headerGroup.getHeaderGroupProps()}>
    //                             {headerGroup.headers.map(column => (
    //                                 <th {...column.getHeaderProps()}>
    //                                     {column.render('Header')}
    //                                 </th>
    //                             ))}
    //                         </tr>
    //                     ))}
    //                 </thead>
    //                 <tbody {...getTableBodyProps()}>
    //                     {page.map(page => {
    //                         prepareRow(page)
    //                         return (
    //                             <tr {...page.getRowProps()}>
    //                                 {page.cells.map(cell => (
    //                                     <td {...cell.getCellProps()}>
    //                                         {cell.render('Cell')}
    //                                     </td>
    //                                 ))}
    //                             </tr>
    //                         )
    //                     })}
    //                 </tbody>
    //             </table> */}

    //             <table>
    //                 <thead>

    //                 </thead>
    //                 <tbody>

    //                 </tbody>
    //             </table>
    //             {/* <div className='mt-2'>
    //                 <button className='btn btn-outline-secondary btn-sm' onClick={() => previousPage()} disabled={!canPreviousPage}>
    //                     Previous
    //                 </button>
    //                 <span className='px-2'>
    //                     Page{' '}
    //                     <strong>
    //                         { pageIndex ? pageIndex + 1 : 0 } of {pageOptions.length}
    //                     </strong>
    //                 </span>
    //                 <button className='btn btn-outline-secondary btn-sm' onClick={() => nextPage()} disabled={!canNextPage}>
    //                     Next
    //                 </button>
    //             </div> */}
    //         </section>
    //         <section className='card my-2 col-sm-12' style={{ minHeight: '80vh' }}>
    //             <Row>
    //                 <Col xs={9}>
    //                     <h1 className="display-3 fw-bolder">Products</h1>
    //                 </Col>
    //                 <Col xs={3} className='d-flex align-items-center'>
    //                     <button className='btn btn-success ms-auto' onClick={createItem}><FaPlus /> New Product</button>
    //                 </Col>
    //             </Row>

    //             {
    //                 selectedProduct
    //                 && action !== 'delete'
    //                 && <ProductForm closeForm={closeForm} setProducts={setProducts} product={selectedProduct} />
    //             }

    //             {
    //                 !['create', 'edit'].includes(action) && <TableComponent data={tableData} />
    //             }

    //             {openModal && <ModalComponent handleConfirm={deleteProduct} action={action} title={modalTitle} setOpenModal={setOpenModal}>
    //                 {action === 'delete' ? <p>Are you sure you want to confirm this action?</p> : <ProductForm product={selectedProduct} />}
    //             </ModalComponent>}
    //         </section>
    //     </Dashboard>
    // ) : null
}

