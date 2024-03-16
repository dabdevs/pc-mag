import React, { useEffect, useState } from 'react'
import { useComputersContext } from '../context/ComputersContext';
import { useSearchParams } from 'react-router-dom';
import Filter from './computer/Filter';

export default function Sidebar() {
    return (
        <div id="sidebar" className="col-sm-3 col-lg-2 px-4 d-none d-md-block">
            <Filter />
        </div>
    )
}
