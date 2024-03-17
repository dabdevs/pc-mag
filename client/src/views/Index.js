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
import ComputersTable from '../components/computer/ComputersTable'

export default function Index() {
    const [searchParams, setSearchParams] = useSearchParams()
    const formFactor = searchParams.get('formFactor')
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    return (
        <div>
            <Layout>
                <section className="py-3 banner">
                    <div className="container px-4 px-lg-5 my-5">
                        <div className="text-center text-white row">
                            <h1 className="display-4 text-shadow fw-bolder mb-0">Shop Computers & Accesories</h1>
                            <p className="fw-normal text-white mb-0">Find your next great computer.</p>
                            <div className='col-sm-6 mx-auto'>
                                <SearchForm />
                            </div>
                        </div>
                    </div>
                </section>

                <div className='row py-lg-4'>
                    <Sidebar page={page} />

                    <div className="col-sm-9 col-lg-10 ms-sm-auto p-4" >
                        <Menu formFactor={formFactor} />

                        {loading ?
                            <b>Loading...</b> :
                            <ComputersTable display={'cards'} />
                        }
                    </div >
                </div>
            </Layout>
        </div>
    )
}
