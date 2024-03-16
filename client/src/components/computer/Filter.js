import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { useComputersContext } from '../../context/ComputersContext';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Filter({ source, currentPage, setCurrentPage }) {
    const { setFiltered, filtered, setFilters } = useComputersContext()
    const [search, setSearch] = useState('')
    const [formFactor, setFormFactor] = useState([]);
    const [ram, setRam] = useState([]);
    const [os, setOs] = useState([]);
    const [processor, setProcessor] = useState([]);
    const [diskType, setDiskType] = useState([]);
    const [disk, setDisk] = useState([]);
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [error, setError] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()

    const disabled = formFactor.length === 0 && 
                    ram.length === 0 && 
                    processor.length === 0 && 
                    maxPrice === '' && 
                    minPrice === '' && 
                    search === '' && 
                    diskType.length === 0 && 
                    disk.length === 0 &&
                    os.length === 0

    useEffect(() => {
        if (!filtered) clearFilters()
    }, [filtered])

    const setFormFilters = (e) => {
        const value = e.target.value

        switch (e.target.name) {
            case 'formFactor':
                e.target.checked ? setFormFactor([...formFactor, value]) : setFormFactor(formFactor.filter(item => item !== value))
                break;
            case 'ram':
                e.target.checked ? setRam([...ram, value]) : setRam(ram.filter(item => item !== value))
                break;
            case 'os':
                e.target.checked ? setOs([...os, value]) : setOs(os.filter(item => item !== value))
                break;
            case 'processor':
                e.target.checked ? setProcessor([...processor, value]) : setProcessor(processor.filter(item => item !== value))
                break;
            case 'diskType':
                e.target.checked ? setDiskType([...diskType, value]) : setDiskType(diskType.filter(item => item !== value))
                break;
            case 'disk':
                e.target.checked ? setDisk([...disk, value]) : setDisk(disk.filter(item => item !== value))
                break;
            case 'minPrice':
                e.target.checked ? setMinPrice(value) : setMinPrice('')
                break;
            case 'maxPrice':
                e.target.checked ? setMaxPrice(value) : setMaxPrice('')
                break;
            default:
                break;
        }
    }

    const clearFilters = async () => {
        try {
            if (source === 'admin') setSearch('')
            else document.getElementById('sort').value = ''
            setMinPrice('')
            setMaxPrice('')
            setFormFactor([])
            setRam([])
            setOs([])
            setProcessor([])
            setDiskType([])
            setDisk([])
            setFilters([])
            setSearchParams({})
            setCurrentPage(1)

            const inputs = document.querySelectorAll('input');

            inputs.forEach(input => {
                if (input.type === 'checkbox') {
                    input.checked = false;
                }

                if (input.type === 'text') input.value = ''
            });
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (parseInt(minPrice) >= parseInt(maxPrice)) {
            setError('Max. price must be greater than min. price')
            return
        }

        const filters = {}
        if (formFactor) filters.formFactor = formFactor
        if (ram) filters.ram = ram
        if (os) filters.os = os
        if (processor) filters.processor = processor
        if (diskType) filters.diskType = diskType
        if (disk) filters.disk = disk
        if (minPrice) filters.minPrice = minPrice
        if (maxPrice) filters.maxPrice = maxPrice
        if (currentPage) filters.page = currentPage
        if (search) filters.search = search

        setSearchParams(filters)
        setFilters(filters)
        setFiltered(true)
    }

    return (
        <Form id="filter" onSubmit={handleSubmit}>
            {source === 'admin' ? <Row className='mb-2'>
                <Col xs={`${source === 'admin' ? 3 : 12}`}>
                    <Form.Label>Search</Form.Label>
                    <Form.Control
                        id='search'
                        defaultValue={''}
                        onChange={(e) => setSearch(e.target.value)}
                        className='form-control search-input w-100'
                        placeholder='Ex.: Dell'
                    />
                </Col>
            </Row> : null }

            <Row className="align-items-center mb-3" style={{ height: '200px' }}>
                <h5 className="border-top py-2">Filters</h5>
                <Col xs={`${source === 'admin' ? 3 : 12}`} className='h-100'>
                    <Form.Label>Form Factor</Form.Label>
                    <Form.Check
                        id='Laptop'
                        name='formFactor'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'Laptop'}
                        label="Laptop"
                    />
                    <Form.Check
                        id='Desktop'
                        name='formFactor'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'Desktop'}
                        label="Desktop"
                    />
                    <Form.Check
                        id='All-In-One'
                        name='formFactor'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'All-In-One'}
                        label="All-In-One"
                    />
                </Col>

                <Col xs={`${source === 'admin' ? 3 : 12}`} className='h-100'>
                    <Form.Label>Operative System</Form.Label>
                    <Form.Check
                        id='Windows'
                        name='os'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'Windows'}
                        label="Windows"
                    />
                    <Form.Check
                        id='MacOS'
                        name='os'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'macOS'}
                        label="MacOS"
                    />
                    <Form.Check
                        id='Linux'
                        name='os'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'Linux'}
                        label="Linux"
                    />
                    <Form.Check
                        id='Ubuntu'
                        name='os'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'Ubuntu'}
                        label="Ubuntu"
                    />
                    <Form.Check
                        id='Solaris'
                        name='os'
                        onChange={setFormFilters}
                        type='checkbox'
                        value={'Solaris'}
                        label="Solaris"
                    />
                </Col>

                <Col xs={`${source === 'admin' ? 3 : 'xs-12'}`}>
                    <Form.Select name='formFactor' onChange={setFormFilters} aria-label="Form factor" className='mb-2'>
                        <option value="">Operative System</option>
                        <option value='Windows'>Windows</option>
                        <option value="macOS">MacOS</option>
                        <option value="Linux">Linux</option>
                        <option value="Ubuntu">Ubuntu</option>
                        <option value="Chrome OS">Chrome OS</option>
                        <option value="Solaris">Solaris</option>
                    </Form.Select>
                </Col>
                <Col xs={`${source === 'admin' ? 3 : 'xs-12'}`}>
                    <Form.Check
                        type="checkbox"
                        id="autoSizingCheck"
                        className="mb-2"
                        label="Remember me"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={'4'} className={`${source === 'admin' ? 'd-flex gap-2' : ''}`}>
                    <Button disabled={disabled} type="submit" className="btn btn-dark w-100">
                        <i className="bi bi-funnel"></i> Filter
                    </Button>
                    {source === 'admin' && <Button onClick={clearFilters} type="button" className="btn btn-danger w-100">
                        <FaTrashAlt /> Clear filters
                    </Button>}
                </Col>
            </Row>
        </Form>

        // <form id="filter" onSubmit={handleSubmit} >
        //     <h5 className="border-bottom py-2">Filter</h5>
        //     <div className={`d-flex ${source === 'admin' ? 'justify-content-between flex-wrap gap-3' : 'flex-column'}`}>
        //         {source === 'admin' && 
        //             <div>
        //                 <label htmlFor='search'>Brand</label>
        //                 <input 
        //                     id='search'
        //                     defaultValue={''} 
        //                     onChange={(e) => setSearch(e.target.value)} 
        //                     className='form-control search-input w-100 mb-2' 
        //                     placeholder='Ex.: Apple' 
        //                 />
        //             </div>
        //         }

        //         <div className="mb-3">
        //             {/* <label htmlFor="filterPrice" className="form-label">Price</label>
        //             <div id="filterPrice" className='d-flex gap-2 w-100'>
        //                 <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} id="minPrice" type="number" className="form-control" min={100} placeholder='Min. Price' />
        //                 <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} id="maxPrice" type="number" className="form-control" min={100} placeholder='Max. Price' />
        //             </div> */}
        //             <InputGroup className="mb-3">
        //                 {/* <label htmlFor="filterPrice" className="form-label">Price</label> */}
        //                 <Form.Label htmlFor='price' className='mb-1'>Price</Form.Label>
        //                 <div className='d-flex gap-1' id='price'>
        //                     <Form.Control aria-label="Min. Price" placeholder='min. price' />
        //                     <Form.Control aria-label="Max. Price" placeholder='max. price' />
        //                 </div>
        //             </InputGroup>
        //         </div>

        //         <div className={'mb-3'}>
        //             <label htmlFor="filterdisk" className="form-label">Form factor</label>
        //             <div className={`d-flex ${source === 'admin' ? '' : 'flex-column'}`}>
        //                 <div className='d-flex'>
        //                     <input
        //                         id='Laptop'
        //                         name='formFactor'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'Laptop'}
        //                         className='form-check-input' />
        //                     <label htmlFor='Laptop'>&nbsp; Laptop</label>
        //                 </div>
        //                 <div>
        //                     <input
        //                         id='Desktop'
        //                         name='formFactor'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'Desktop'}
        //                         className='form-check-input' />
        //                     <label htmlFor='Desktop'>&nbsp; Desktop</label>
        //                 </div>
        //                 <div>
        //                     <input
        //                         id='All-In-One'
        //                         name='formFactor'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'All-In-One'}
        //                         className='form-check-input' />
        //                     <label htmlFor='All-In-One'>&nbsp; All-In-One</label>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className="mb-3">
        //             <label htmlFor="filterdisk" className="form-label">By Processor</label>
        //             <div className='d-flex flex-column'>
        //                 <div className='d-flex'>

        //                     <input
        //                         id='i3'
        //                         name='processor'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'Intel i3'}
        //                         className='form-check-input' />
        //                     <label htmlFor='i3'>&nbsp; Intel® Core™ i3</label>
        //                 </div>
        //                 <div>
        //                     <input
        //                         id='i5'
        //                         name='processor'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'Intel i5'}
        //                         className='form-check-input' />
        //                     <label htmlFor='i5'>&nbsp; Intel® Core™ i5</label>
        //                 </div>
        //                 <div>
        //                     <input
        //                         id='i7'
        //                         name='processor'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'Intel i7'}
        //                         className='form-check-input' />
        //                     <label htmlFor='i7'>&nbsp; Intel® Core™ i7</label>
        //                 </div>
        //                 <div>
        //                     <input
        //                         id='amd'
        //                         name='processor'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'amd'}
        //                         className='form-check-input' />
        //                     <label htmlFor='amd'>&nbsp; AMD Ryzen</label>
        //                 </div>
        //                 <div>
        //                     <input
        //                         id='apple'
        //                         name='processor'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'Apple M1'}
        //                         className='form-check-input' />
        //                     <label htmlFor='apple'>&nbsp; Apple M1</label>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className="mb-3">
        //             <label htmlFor="filterRam" className="form-label">By Ram</label>
        //             <div className='d-flex flex-column'>
        //                 <div className='d-flex'>
        //                     <input
        //                         id='4GB'
        //                         name='ram'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'4GB'}
        //                         className='form-check-input'
        //                     />
        //                     <label htmlFor='4GB'>&nbsp; 4 GB</label>
        //                 </div>
        //                 <div>
        //                     <input
        //                         id='8GB'
        //                         name='ram'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'8GB'}
        //                         className='form-check-input'
        //                     />
        //                     <label htmlFor='8GB'>&nbsp; 8 GB</label>
        //                 </div>
        //                 <div>
        //                     <input
        //                         id='16GB'
        //                         name='ram'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'16GB'}
        //                         className='form-check-input'
        //                     />
        //                     <label htmlFor='16GB'>&nbsp; 16 GB</label>
        //                 </div>
        //                 <div>
        //                     <input
        //                         id='32GB'
        //                         name='ram'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'32GB'}
        //                         className='form-check-input'
        //                     />
        //                     <label htmlFor='32GB'>&nbsp; 32 GB</label>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className="mb-3">
        //             <label htmlFor="diskType" className="form-label">By Disk Type</label>
        //             <div className='d-flex flex-column' id='diskType'>
        //                 <div className='d-flex'>
        //                     <input
        //                         id='HDD'
        //                         name='diskType'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'HDD'}
        //                         className='form-check-input'
        //                     />
        //                     <label htmlFor='HDD'>&nbsp; HDD</label>
        //                 </div>
        //                 <div>
        //                     <input
        //                         id='SSD'
        //                         name='diskType'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'SSD'}
        //                         className='form-check-input'
        //                     />
        //                     <label htmlFor='SSD'>&nbsp; SSD</label>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className="mb-3">
        //             <label htmlFor="disk" className="form-label">By Disk Capacity</label>
        //             <div className='d-flex flex-column' id='disk'>
        //                 <div className='d-flex'>
        //                     <input
        //                         id='disk'
        //                         name='disk'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'128GB'}
        //                         className='form-check-input'
        //                     />
        //                     <label htmlFor='disk'>&nbsp; 128 GB</label>
        //                 </div>
        //                 <div className='d-flex'>
        //                     <input
        //                         id='disk'
        //                         name='disk'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'256GB'}
        //                         className='form-check-input'
        //                     />
        //                     <label htmlFor='disk'>&nbsp; 256 GB</label>
        //                 </div>
        //                 <div className='d-flex'>
        //                     <input
        //                         id='disk'
        //                         name='disk'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'500GB'}
        //                         className='form-check-input'
        //                     />
        //                     <label htmlFor='disk'>&nbsp; 500 GB</label>
        //                 </div>
        //                 <div className='d-flex'>
        //                     <input
        //                         id='disk'
        //                         name='disk'
        //                         onChange={setFormFilters}
        //                         type='checkbox'
        //                         value={'1 TB'}
        //                         className='form-check-input'
        //                     />
        //                     <label htmlFor='disk'>&nbsp; 1 TB</label>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className="mb-3">
        //             {error && (<small className='mt-2 text-danger'>{error}</small>)}
        //         </div>
        //     </div>

        //     <div className={`d-flex gap-2 ${source === 'admin' ? 'col-sm-3' : ''}`}>
        //         <button disabled={disabled} type="submit" className="btn btn-dark w-100"><i className="bi bi-funnel"></i> Filter</button>
        //         {source === 'admin' && <button onClick={clearFilters} type="button" className="btn btn-danger w-100"><FaTrashAlt /> Clear filters</button>}
        //     </div>
        // </form>
    )
}
