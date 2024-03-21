import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ComputerCarousel from '../components/computer/ComputerCarousel';
import ComputerInfo from '../components/computer/ComputerInfo';
import SimilarComputers from '../components/SimilarComputers';
import { getById } from '../api/computers';
import Spinner from '../components/Spinner';
import Layout from '../components/Layout';

export default function Computer() {
    const [computer, setComputer] = useState(null)
    const [similarComputers, setSimilarComputers] = useState([])
    const { computerId } = useParams()

    useEffect(() => {
        getById(computerId)
            .then(data => {
                setComputer(data.computer)
                setSimilarComputers(data.similarComputers)
            }).then(() => window.scrollTo({
                top: 0,
                behavior: 'smooth',
            }))
            .catch(err => console.error(err))
    }, [computerId]);

    return (
        <Layout>
            {computer ? (<section className="container" style={{ height: '400px' }}>
                <div className="row p-2 align-items-center">
                    <ComputerCarousel computer={computer} />
                    <ComputerInfo computer={computer} />
                    <SimilarComputers similarComputers={similarComputers} />
                </div>
            </section>) :
                <Spinner />
            }
        </Layout>
    )
}
