import React, { useEffect, useState } from 'react'
import { destroy, getComputerFormData } from '../../api/computers'
import ComputerForm from '../../Forms/ComputerForm'
import ComputersTable from '../../components/computer/ComputersTable'
import { useParams } from 'react-router-dom'

export default function Computers () {
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedComputer, setSelectedComputer] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [action, setAction] = useState('')
    const [formData, setFormData] = useState([])
    const [computers, setComputers] = useState([])

    useEffect(() => {
        console.log('Admin Computers')
        getComputerFormData().then(data => setFormData(data)).catch(err => console.log(err))
        setLoading(true)
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
            // setComputers(prevComputers => {
            //     return prevComputers.filter((prod) =>
            //         prod._id !== _id
            //     );
            // });
            alert('Computer deleted successfully')
        }).catch(err => console.log(err))
    }

    const closeForm = () => {
        setSelectedComputer(null)
        setAction('')
    }

    return (
        <section className='p-0 my-2 col-sm-12' style={{ minHeight: '80vh' }}>
            {
                selectedComputer
                && <ComputerForm data={formData} setComputers={setComputers} closeForm={closeForm} computer={selectedComputer} />
            }

            {selectedComputer === null && <ComputersTable display={'table'} setSelectedComputer={setSelectedComputer} createItem={createItem} editItem={editItem} deleteItem={deleteItem} />}
        </section>
    );
}

