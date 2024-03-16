import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import { getComputers } from '../api/computers'
import SearchForm from '../components/SearchForm'
import ComputerCard from '../components/computer/ComputerCard'
import Menu from '../components/Menu'
import LazyLoad from 'react-lazyload'
import List from '../components/computer/front/List'

export default function Index() {
    const [searchParams, setSearchParams] = useSearchParams()
    const formFactor = searchParams.get('formFactor')
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    return (
        <div>
            <Layout>
                <SearchForm />

                <div className='row py-lg-4'>
                    <Sidebar formFactor={formFactor} page={page} />

                    <div className="col-sm-9 col-lg-10 ms-sm-auto p-4" >
                        <Menu formFactor={formFactor} />

                        {loading ?
                            <b>Loading...</b> :
                            <List />
                        }
                    </div >
                </div>
            </Layout>
        </div>
    )
}
