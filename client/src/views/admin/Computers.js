import React, { useEffect, useState } from 'react'
import { destroy, getComputerFormData } from '../../api/computers'
import ComputerForm from '../../Forms/ComputerForm'
import ComputersTable from '../../components/computer/ComputersTable'

export default function Computers () {
    const [selectedComputer, setSelectedComputer] = useState(null)
    const [formData, setFormData] = useState([])
    const [computers, setComputers] = useState([])

    useEffect(() => {
        getComputerFormData().then(data => setFormData(data)).catch(err => console.log(err))
    }, [])

    return (
        <section className='p-0 my-2 col-sm-12' style={{ minHeight: '80vh' }}>
            {
                selectedComputer
                && <ComputerForm data={formData} setComputers={setComputers} computer={selectedComputer} setSelectedComputer={setSelectedComputer} />
            }

            {selectedComputer === null && <ComputersTable display={'table'} setSelectedComputer={setSelectedComputer} />}
        </section>
    );
}

