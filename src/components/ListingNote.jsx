import React, { useState, useEffect } from 'react'
import { XCircle } from 'react-bootstrap-icons';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { TrashFill } from 'react-bootstrap-icons'

import _ from 'lodash';
import { useNavigate } from 'react-router-dom'
import { PlusLg, PencilSquare, ThreeDotsVertical } from 'react-bootstrap-icons'
import { toast } from "react-toastify"

export const ListingNote = () => {
    const navigate = useNavigate();
    const [notesArray, setNotesArray] = useState(JSON.parse(localStorage.getItem('notes')) || []);
    
    useEffect(() => {
        if (localStorage.getItem('notes')) {
            setNotesArray(JSON.parse(localStorage.getItem('notes')));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notesArray));
    }, [notesArray]);


    const editItem = (note, total) => {
        navigate('/updateNote', { state: note, sum: total });
    }
    const deleteItem = (index, id) => {
        console.log(id);
        // const newTodos = [...notesArray];
        // newTodos.splice(index, 1);
        // // localStorage.removeItem("notes");
        // setNotesArray(newTodos);

        var array = [...notesArray];
        const data =  _.remove(array, function(o) { return o.id !== id; });
        // var data = _.slice(array,id);
        console.log('data', data);
        setNotesArray(data);
        toast.success('Note Deleted SuccesFully..')



        // var myArray = [...notesArray];
        // var data = _.remove(myArray,x=>x.id === id);
        // console.log(data);
        // setNotesArray(data);
    }
    return (
        <>
            <div className='col-md-4 mx-auto' >
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand">Notes List</a>
                    </div>
                </nav>

                <div className='row' style={{ padding: "5px 10px" }}>

                {
                                notesArray.map((note, index, total, id) => {
                                    return (


                    <div className='col-md-6 gutters' >
                        <div className='mainGetData'>

                            <div className='d-flex'>
                                <h3 className='justify-content-flex-start'>{note.title}</h3>
                            </div>

                            <ul className='listGetData'>
                            {note.notes.map((item, i) => {
                                                    return (
                                <li>
                                    <span className='noteGet'>
                                        {/* <ArrowRightCircleFill size={15} style={{ marginRight: '5px' }} /> */}
                                        {item.noteTitle}
                                    </span>
                                    <span className='amountGet'>{item.amount}</span><hr />
                                </li>
                                 )
                                })}

                            </ul>
                            <div style={{ textAlign: "right", marginRight: '5%', paddingBottom: '5%' }}>
                                <TrashFill
                                    size={22}
                                    style={{
                                        color: "hsl(25, 87%, 56%) ",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => deleteItem(index,note.id)}
                                />
                                <PencilSquare
                                    size={22}
                                    style={{
                                        color: "hsl(25, 87%, 56%) ",
                                        marginLeft: "2%",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => editItem(note, total)}

                                />
                            </div>
                        </div>
                    </div>

)
})
}

                </div>
                <div className='add-Note'>
                    <PlusLg
                        style={{ color: "white", fontSize: '40px', fontWeight: 'bold', marginTop: "20%" }}
                        onClick={() => navigate('/addNote')}
                    />
                </div>
            </div>
        </>
    )
}
