import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Dashboard from '../Dashboard'
import { getComputers, destroy, getComputerFormData } from '../../api/computers'
import ModalComponent from '../../components/Shared/ModalComponent'
import ComputerForm from '../../Forms/ComputerForm'
import { FaPlus } from "react-icons/fa";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ComputersTable from '../../components/computer/ComputersTable'

export default function Computers() {
    const [computers, setComputers] = useState([])
    const [filteredComputers, setFilteredComputers] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    // const [totalPages, setTotalPages] = useState(null)
    // const [currentPage, setCurrentPage] = useState(null)
    const [search, setSearch] = useState('')
    const [selectedComputer, setSelectedComputer] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [action, setAction] = useState('')
    const [content, setContent] = useState(null)
    const [formData, setFormData] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        getComputerFormData().then(data => setFormData(data)).catch(err => console.log(err))
        setLoading(true)
        // setSearchParams({ page })
    }, [])

    const createItem = () => {
        setAction('create')
        setSelectedComputer({ images: [] })
    }

    const editItem = (computer) => {
        setAction('edit')
        setSelectedComputer(computer)
    }

    const deleteItem = (computer) => {
        setAction('delete')
        setModalTitle(`Deleting "${computer.name}"`)
        setOpenModal(true)
        setSelectedComputer(computer)
    }

    const deleteComputer = () => {
        destroy(selectedComputer._id).then(({ _id }) => {
            setOpenModal(false)
            setComputers(prevComputers => {
                return prevComputers.filter((prod) =>
                    prod._id !== _id
                );
            });
            alert('Computer deleted successfully')
        }).catch(err => console.log(err))
    }

    const closeForm = () => {
        setSelectedComputer(null)
        setAction('')
    }

    // function createContent() {
    //     console.log('Creating content')
    //     const data = filteredComputers.length ? filteredComputers : computers;
    //     let _jsx = null;

    //     const prevBtnClasses = page === 1 ? 'page-item disabled' : 'page-item'
    //     const nextBtnClasses = totalPages === currentPage ? 'page-item disabled' : 'page-item'

    //     if (loading) _jsx = <p>Loading...</p>

    //     if (computers.length > 0) {
    //         _jsx = (
    //             <div>
    //                 <Row>
    //                     <Col xs={9}>
    //                         <h1 className="display-4 fw-bolder">Computers</h1>
    //                     </Col>
    //                     <Col xs={3} className='d-flex align-items-center'>
    //                         <button className='btn btn-success ms-auto' onClick={createItem}><FaPlus /> New Computer</button>
    //                     </Col>
    //                 </Row>


    //                 {/* <table className='w-100 table table-striped'>
    //                     <thead>
    //                         <tr>
    //                             <th></th>
    //                             <th>Name</th>
    //                             <th>Brand</th>
    //                             <th>Operative System</th>
    //                             <th>Form Factor</th>
    //                             <th>DiskType</th>
    //                             <th>Disk</th>
    //                             <th>Ram</th>
    //                             <th>Processor</th>
    //                             <th>Quantity</th>
    //                             <th>Action</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {data.length > 0 ?
    //                             data.map((computer, index) => (
    //                                 <tr key={index}>
    //                                     <th>
    //                                         {computer?.images ? <img width={100} className="card-img-top" alt='' src={computer?.images[0] ? computer?.images[0] : '../../../img/default-computer-img.jpg'} /> : null}
    //                                     </th>
    //                                     <td className='pt-3'>{computer.name}</td>
    //                                     <td className='pt-3'>{computer.brand}</td>
    //                                     <td className='pt-3'>{computer.os}</td>
    //                                     <td className='pt-3'>{computer.formFactor}</td>
    //                                     <td className='pt-3'>{computer.diskType}</td>
    //                                     <td className='pt-3'>{computer.disk}</td>
    //                                     <td className='pt-3'>{computer.ram}</td>
    //                                     <td className='pt-3'>{computer.processor}</td>
    //                                     <td className='pt-3'>{computer.quantity}</td>
    //                                     <td className='pt-3'>
    //                                         <div className='d-flex border-none gap-2'>
    //                                             <button className='btn btn-warning btn-sm' onClick={() => editItem(computer)}>Edit</button>
    //                                             <button className='btn btn-danger btn-sm' onClick={() => deleteItem(computer)}>Delete</button>
    //                                         </div>
    //                                     </td>
    //                                 </tr>
    //                             )) : <p>No computers found.</p>}
    //                     </tbody>
    //                 </table> */}
    //                 <ComputersTable computers={computers} />
    //                 {/* <nav>
    //                     <ul className="pagination pagination-sm mt-3">
    //                         <li className={prevBtnClasses}>
    //                             <Link className="page-link text-dark" href='#' tabIndex="-1" onClick={(e) => { e.preventDefault(); setPage(prevPage => prevPage - 1) }}>Previous</Link>
    //                         </li>
    //                         <li className="page-item" aria-current="page" onClick={(e) => { e.preventDefault(); setPage(1) }}>
    //                             <Link className={`page-link ${page === 1 ? 'text-danger' : 'text-dark'}`} href='#'>1</Link>
    //                         </li>
    //                         <li className="page-item" onClick={(e) => { e.preventDefault(); setPage(2) }}>
    //                             <Link className={`page-link ${page === 2 ? 'text-danger' : 'text-dark'}`} href='#'>2</Link>
    //                         </li>
    //                         <li className="page-item" onClick={(e) => { e.preventDefault(); setPage(3) }}>
    //                             <Link className={`page-link ${page === 3 ? 'text-danger' : 'text-dark'}`} href='#'>3</Link>
    //                         </li>
    //                         <li className="page-item" onClick={(e) => { e.preventDefault(); setPage(4) }}>
    //                             <Link className={`page-link ${page === 4 ? 'text-danger' : 'text-dark'}`} href='#'>4</Link>
    //                         </li>
    //                         <li className="page-item" onClick={(e) => { e.preventDefault(); setPage(5) }}>
    //                             <Link className={`page-link ${page === 5 ? 'text-danger' : 'text-dark'}`} href='#'>5</Link>
    //                         </li>
    //                         <li className={`page-item disabled`} aria-current="page">
    //                             <Link className="page-link text-dark" href='#'>... {page === currentPage}</Link>
    //                         </li>

    //                         {page > 5 &&
    //                             <li className={`page-item`} aria-current="page">
    //                                 <Link className="page-link text-danger" href='#'>{page}</Link>
    //                             </li>
    //                         }

    //                         <li className={nextBtnClasses}>
    //                             <Link className="page-link text-dark" href='#' onClick={(e) => { e.preventDefault(); setPage(prevPage => prevPage + 1) }}>Next</Link>
    //                         </li>
    //                     </ul>
    //                 </nav> */}
    //             </div>
    //         )
    //     }

    //     setContent(_jsx)
    // }

    const handleSearch = async (e) => {
        setSearch(e.target.value)
        console.log('Keyword', e.target.value)
    }

    return (
        <Dashboard>
            <section className='p-0 my-2 col-sm-12' style={{ minHeight: '80vh' }}>

                {
                    selectedComputer
                    && <ComputerForm data={formData} setComputers={setComputers} createItem={createItem} editItem={editItem} closeForm={closeForm} computer={selectedComputer} />
                }

                <ComputersTable setSelectedComputer={setSelectedComputer} />

                {/* {
                    !['create', 'edit'].includes(action) && <ComputersTable />
                } */}

                {/* {openModal && <ModalComponent handleConfirm={deleteComputer} action={action} title={modalTitle} setOpenModal={setOpenModal}>
                    {action === 'delete' ? <p>Are you sure you want to confirm this action?</p> : <ComputerForm data={formData} computer={selectedComputer} />}
                </ModalComponent>} */}

            </section>
        </Dashboard>
    );
}

