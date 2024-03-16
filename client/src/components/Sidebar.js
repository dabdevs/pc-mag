import React, { useEffect, useState } from 'react'
import { useComputersContext } from '../context/ComputersContext';
import { useSearchParams } from 'react-router-dom';
import Filter from './computer/Filter';

export default function Sidebar({ page, category }) {
    const { setFiltered, filtered } = useComputersContext()
    const [formFactor, setFormFactor] = useState([]);
    const [ram, setRam] = useState([]);
    const [processor, setProcessor] = useState([]);
    const [diskType, setDiskType] = useState([]);
    const [disk, setDisk] = useState([]);
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [error, setError] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()

    const disabled = formFactor.length === 0 && ram.length === 0 && processor.length === 0 && maxPrice && minPrice

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
                e.target.checked ? setMinPrice(value) : setMinPrice(null)
                break;
            case 'maxPrice':
                e.target.checked ? setMaxPrice(value) : setMaxPrice(null)
                break;
            default:
                break;
        }
    }

    const clearFilters = async () => {
        try {
            setMinPrice(null)
            setMaxPrice(null)
            setFormFactor([])
            setRam([])
            setProcessor([])
            setDiskType([])
            setDisk([])
            document.getElementById('sort').value = ''

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
        if (page) filters.page = page

        setSearchParams(filters)
        setFiltered(true)
    }

    return (
        <div id="sidebar" className="col-sm-3 col-lg-2 d-none d-md-block">
            <div className="position-sticky card p-3">
                <h5 className="border-bottom py-2">Filter Computers</h5>
                <Filter />
            </div>
        </div>
    )
}
