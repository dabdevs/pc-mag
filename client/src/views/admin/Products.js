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

export default function Products() {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [tableData, setTableTada] = useState(undefined)
    const [action, setAction] = useState('')

    useEffect(() => {
        getProducts().then(products => {
            setProducts(products)
        }).catch(err => console.log(err))
    }, [])

    const data = useMemo(() => products, [])

    const columns = useMemo(() => [
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Form Factor',
            accessor: 'formFactor'
        },
        {
            Header: 'Operative System',
            accessor: 'os'
        },
        {
            Header: 'Processor',
            accessor: 'processor'
        },
        {
            Header: 'Ram',
            accessor: 'ram'
        },
        {
            Header: 'Disk Type',
            accessor: 'diskType'
        },
        {
            Header: 'Disk',
            accessor: 'disk'
        },
        {
            Header: 'Price',
            accessor: 'price'
        },
    ], []);

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page, 
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        state: { pageIndex }
    } = useTable({ columns, data, initialState: { pageIndex: 0 } }, usePagination);

    useEffect(() => {
        console.log('PRODUCTS CHANGED', products)
        // setTableTada({
        //     tHead: ['Name', 'Form Factor', 'OS', 'Processor', 'Ram', 'Disk', 'Price', 'Available', 'Actions'],
        //     tBody: products?.map(product =>
        //         [product.name, product.formFactor, product.os, product.processor, product.ram, `${product.disk} ${product.diskType}`, `$ ${formatPrice(product.price)}`, product.quantity ?? 0, <div className='d-flex border-none gap-2'><button className='btn btn-warning btn-sm' onClick={() => editItem(product)}>Edit</button><button className='btn btn-danger btn-sm' onClick={() => deleteItem(product)}>Delete</button></div>]
        //     )
        // })
    }, [products])

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

    return products.length > 0 ? (
        <Dashboard>
            <section style={{ minHeight: '80vh' }} className='p-0 my-2 col-sm-12'>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(page => {
                            prepareRow(page)
                            return (
                                <tr {...page.getRowProps()}>
                                    {page.cells.map(cell => (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className='mt-2'>
                    <button className='btn btn-outline-secondary btn-sm' onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Previous
                    </button>
                    <span className='px-2'>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <button className='btn btn-outline-secondary btn-sm' onClick={() => nextPage()} disabled={!canNextPage}>
                        Next
                    </button>
                </div>
            </section>
            {/* <section className='card my-2 col-sm-12' style={{ minHeight: '80vh' }}>
                <Row>
                    <Col xs={9}>
                        <h1 className="display-3 fw-bolder">Products</h1>
                    </Col>
                    <Col xs={3} className='d-flex align-items-center'>
                        <button className='btn btn-success ms-auto' onClick={createItem}><FaPlus /> New Product</button>
                    </Col>
                </Row>

                {
                    selectedProduct
                    && action !== 'delete'
                    && <ProductForm closeForm={closeForm} setProducts={setProducts} product={selectedProduct} />
                }

                {
                    !['create', 'edit'].includes(action) && <TableComponent data={tableData} />
                }

                {openModal && <ModalComponent handleConfirm={deleteProduct} action={action} title={modalTitle} setOpenModal={setOpenModal}>
                    {action === 'delete' ? <p>Are you sure you want to confirm this action?</p> : <ProductForm product={selectedProduct} />}
                </ModalComponent>}
            </section> */}
        </Dashboard>
    ) : null
}

