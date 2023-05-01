import React, { useState, useEffect } from 'react'
import { X } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PlusLg } from 'react-bootstrap-icons'
import { ArrowLeft } from 'react-bootstrap-icons'
import { v4 as uuidv4 } from 'uuid';


export const AddNote = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [total, setTotal] = useState(0);
    const [inputList, setInputList] = useState([
        {
            id: uuidv4(),
            'noteTitle': '',
            'amount': ''
        }
    ]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const totalAdd = () => {
        let sum = inputList.reduce(function (prev, current) {
            return prev + +current.amount
        }, 0);
        setTotal(sum);
    }

    const totalSub = (x, i) => {
        let obj = inputList.find(o => o.id === x.id);
        setTotal(total - obj.amount);
    }


    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }

    const handleAddClick = () => {
        setInputList([...inputList, { id: uuidv4(), 'noteTitle': '', 'amount': '' }])
    };

    const _addNote = () => {
        if (title !== '' || inputList[0].noteTitle !== '' || inputList[0].amount !== '') {
            let notesArray = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
            let data = { 
                "id": uuidv4(),
                "title": title,
                "notes": inputList
            }
            notesArray.push(data);
            localStorage.setItem("notes", JSON.stringify(notesArray));
        };
        navigate('/');
        toast.success('Note Add SuessFully')
    }



    return (
        <div>

            <div className='col-md-4 mx-auto'>
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand"> <ArrowLeft style={{ cursor: 'pointer' }} onClick={_addNote} /> Add Notes</a>


                    </div>
                </nav>

                <div className="d-flex justify-content-center mt-5 mb-5 ">
                    <div className="card back-shadow form-Note" style={{ width: "24rem" }}>

                        <div className="card-body">

                            <h5 className="card-title text-center">Add Note</h5>
                            <div className="mb-3 mt-4">



                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Please Enter Title"
                                    value={title} onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <h5>Sum: {total === 0 ? '' : total}</h5>

                            {
                                inputList.map((x, i) => {
                                    return (

                                        <div className="row" >
                                            <div className="col-sm-6">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="noteTitle"
                                                    placeholder="Enter Notes"
                                                    style={{ width: '120%' }}
                                                    value={x.noteTitle} onChange={e => handleInputChange(e, i)} 
                                                />

                                            </div>
                                            <div className="col-sm-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="amount"
                                                    placeholder="Amount"
                                                    style={{ width: '150%' }}
                                                    value={x.amount} onChange={e => { handleInputChange(e, i); totalAdd() }}
                                                />

                                            </div>
                                            <div className="col-sm-2">
                                                <span>
                                                    <X size={25} style={{ marginTop: '7px', cursor: "pointer" }} onClick={() => { handleRemoveClick(i); totalSub(x, i) }} />
                                                </span>
                                            </div>
                                        </div>

                                    )
                                })
                            }


                        </div>
                    </div>

                </div>
                <div className='add-Note'>
                    <PlusLg
                        style={{ color: "white", fontSize: '40px', fontWeight: 'bold', marginTop: "20%" }}
                        onClick={handleAddClick}
                    />
                </div>
            </div>
        </div>
    )
}
