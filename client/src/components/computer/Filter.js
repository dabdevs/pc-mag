import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { useComputersContext } from '../../context/ComputersContext';

export default function Filter({source, currentPage, setCurrentPage}) {
    const { setFiltered, filtered, setFilters } = useComputersContext()
    const [search, setSearch] = useState('')
    const [formFactor, setFormFactor] = useState([]);
    const [ram, setRam] = useState([]);
    const [processor, setProcessor] = useState([]);
    const [diskType, setDiskType] = useState([]);
    const [disk, setDisk] = useState([]);
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [error, setError] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()

    const disabled = formFactor.length === 0 && ram.length === 0 && processor.length === 0 && maxPrice === '' && minPrice === '' && search === ''

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
        <form id="filter" onSubmit={handleSubmit} >
            <div className={`d-flex ${source === 'admin' ? 'justify-content-between flex-wrap gap-3' : 'flex-column'}`}>
                {source === 'admin' && <input defaultValue={''} onChange={(e) => setSearch(e.target.value)} className='form-control search-input w-100 mb-2' placeholder='Ex.: Apple' />}

                <div className="mb-3">
                    <label htmlFor="filterPrice" className="form-label">By Price</label>
                    <div id="filterPrice" className='d-flex gap-2 w-100'>
                        <div>
                            <label htmlFor="minPrice" className="form-label"><small>Min. Price</small></label>
                            <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} id="minPrice" type="number" className="form-control" min={100} />
                        </div>

                        <div>
                            <label htmlFor="maxPrice" className="form-label"><small>Max. Price</small></label>
                            <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} id="maxPrice" type="number" className="form-control" min={100} />
                        </div>
                    </div>
                </div>

                <div className={formFactor ? 'mb-3 d-none' : 'mb-3'}>
                    <label htmlFor="filterdisk" className="form-label">By Device Type</label>
                    <div className={`d-flex ${source === 'admin' ? '' : 'flex-column'}`}>
                        <div className='d-flex'>
                            <input
                                id='Laptop'
                                name='formFactor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'Laptop'}
                                className='form-check-input' />
                            <label htmlFor='Laptop'>&nbsp; Laptop</label>
                        </div>
                        <div>
                            <input
                                id='Desktop'
                                name='formFactor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'Desktop'}
                                className='form-check-input' />
                            <label htmlFor='Desktop'>&nbsp; Desktop</label>
                        </div>
                        <div>
                            <input
                                id='All-In-One'
                                name='formFactor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'All-In-One'}
                                className='form-check-input' />
                            <label htmlFor='All-In-One'>&nbsp; All-In-One</label>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="filterdisk" className="form-label">By Processor</label>
                    <div className='d-flex flex-column'>
                        <div className='d-flex'>
                            <input
                                id='i3'
                                name='processor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'Intel i3'}
                                className='form-check-input' />
                            <label htmlFor='i3'>&nbsp; Intel® Core™ i3</label>
                        </div>
                        <div>
                            <input
                                id='i5'
                                name='processor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'Intel i5'}
                                className='form-check-input' />
                            <label htmlFor='i5'>&nbsp; Intel® Core™ i5</label>
                        </div>
                        <div>
                            <input
                                id='i7'
                                name='processor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'Intel i7'}
                                className='form-check-input' />
                            <label htmlFor='i7'>&nbsp; Intel® Core™ i7</label>
                        </div>
                        <div>
                            <input
                                id='amd'
                                name='processor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'amd'}
                                className='form-check-input' />
                            <label htmlFor='amd'>&nbsp; AMD Ryzen</label>
                        </div>
                        <div>
                            <input
                                id='apple'
                                name='processor'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'Apple M1'}
                                className='form-check-input' />
                            <label htmlFor='apple'>&nbsp; Apple M1</label>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="filterRam" className="form-label">By Ram</label>
                    <div className='d-flex flex-column'>
                        <div className='d-flex'>
                            <input
                                id='4GB'
                                name='ram'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'4GB'}
                                className='form-check-input'
                            />
                            <label htmlFor='4GB'>&nbsp; 4 GB</label>
                        </div>
                        <div>
                            <input
                                id='8GB'
                                name='ram'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'8GB'}
                                className='form-check-input'
                            />
                            <label htmlFor='8GB'>&nbsp; 8 GB</label>
                        </div>
                        <div>
                            <input
                                id='16GB'
                                name='ram'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'16GB'}
                                className='form-check-input'
                            />
                            <label htmlFor='16GB'>&nbsp; 16 GB</label>
                        </div>
                        <div>
                            <input
                                id='32GB'
                                name='ram'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'32GB'}
                                className='form-check-input'
                            />
                            <label htmlFor='32GB'>&nbsp; 32 GB</label>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="diskType" className="form-label">By Disk Type</label>
                    <div className='d-flex flex-column' id='diskType'>
                        <div className='d-flex'>
                            <input
                                id='HDD'
                                name='diskType'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'HDD'}
                                className='form-check-input'
                            />
                            <label htmlFor='HDD'>&nbsp; HDD</label>
                        </div>
                        <div>
                            <input
                                id='SSD'
                                name='diskType'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'SSD'}
                                className='form-check-input'
                            />
                            <label htmlFor='SSD'>&nbsp; SSD</label>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="disk" className="form-label">By Disk Capacity</label>
                    <div className='d-flex flex-column' id='disk'>
                        <div className='d-flex'>
                            <input
                                id='disk'
                                name='disk'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'128GB'}
                                className='form-check-input'
                            />
                            <label htmlFor='disk'>&nbsp; 128 GB</label>
                        </div>
                        <div className='d-flex'>
                            <input
                                id='disk'
                                name='disk'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'256GB'}
                                className='form-check-input'
                            />
                            <label htmlFor='disk'>&nbsp; 256 GB</label>
                        </div>
                        <div className='d-flex'>
                            <input
                                id='disk'
                                name='disk'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'500GB'}
                                className='form-check-input'
                            />
                            <label htmlFor='disk'>&nbsp; 500 GB</label>
                        </div>
                        <div className='d-flex'>
                            <input
                                id='disk'
                                name='disk'
                                onChange={setFormFilters}
                                type='checkbox'
                                value={'1 TB'}
                                className='form-check-input'
                            />
                            <label htmlFor='disk'>&nbsp; 1 TB</label>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    {error && (<small className='mt-2 text-danger'>{error}</small>)}
                </div>
            </div>

            <div className={`d-flex gap-2 ${source === 'admin' ? 'col-sm-3' : ''}`}>
                <button disabled={disabled} type="submit" className="btn btn-dark w-100"><i className="bi bi-funnel"></i> Filter</button>
                {source === 'admin' && <button onClick={clearFilters} type="button" className="btn btn-danger w-100"><FaTrashAlt /> Clear filters</button>}
            </div>
        </form>
    )
}
