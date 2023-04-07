import React, { useState, useEffect } from 'react'

import { XCircle } from 'react-bootstrap-icons';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { TrashFill } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { PlusLg, PencilSquare } from 'react-bootstrap-icons'




export const ListingNote = () => {
    const navigate = useNavigate();
    const [fetchedData, setFetchedData] = useState([])
    useEffect(() => {
        const storeData = JSON.parse(localStorage.getItem('data'));
        if (storeData) {
            setFetchedData(storeData);
        }
    }, []);
    return (
        <>
            <div className='col-md-12'>
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand">Notes List</a>
                    </div>
                </nav>
            </div>
            <div className='row' style={{ padding: "5px 10px" }}>

                {
                    fetchedData.map((value, index) => {
                        return (
                            
                            <div className='col-md-3' key={index}>
                                <div className='mainGetData'>
                                    <h3>{value.title}</h3>
                                    <ul className='listGetData'  >
                                        {/* {
                                             
                                            fetchedData.data.map((value, index) => {
                                                return (
                                                    <li key={index}>
                                                        <span className='noteGet'>
                                                            <ArrowRightCircleFill size={15} style={{ marginRight: '5px' }} />
                                                            {value.note}
                                                        </span>
                                                        <span className='amountGet' > {value.amount}</span><hr />
                                                    </li>
                                                )
                                            })
                                        } */}

                                    </ul>
                                    <div style={{ textAlign: "right", marginRight: '5%', paddingBottom: '5%' }}>
                                        <TrashFill size={22} style={{
                                            color: "hsl(25, 87%, 56%) ",
                                            cursor: "pointer"

                                        }} />

                                        <PencilSquare size={22} style={{
                                            color: "hsl(25, 87%, 56%) ",
                                            marginLeft: "2%",
                                            cursor: "pointer"
                                        }} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='add-Note'>
                <PlusLg
                    style={{ color: "white", fontSize: '30px', fontWeight: 'bold' }}
                    onClick={() => navigate('/addNote')}
                />
            </div>
        </>

    )
}
