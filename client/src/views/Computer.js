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
            {computer ? (<section className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
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
