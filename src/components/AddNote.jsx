import React, { useState, useEffect } from 'react'
import { X } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'


export const AddNote = () => {
    const navigate = useNavigate()


    // ======================LOGICS FOR INPUT ADD DELETE AND THEIR GETTING VALUES IN AN ARRAYY===================

    const [data, setData] = useState([{ note: "", amount: "" }])
    const handleClick = () => {
        setData([...data, { note: "", amount: "" }])
    }
    const handleChange = (e, i) => {
        const { name, value } = e.target
        const onchangeVal = [...data]
        onchangeVal[i][name] = value
        setData(onchangeVal)
    }
    const handleDelete = (i) => {
        const deleteVal = [...data]
        deleteVal.splice(i, 1)
        setData(deleteVal)
    }

    // ======================LOGICS FOR INPUT ADD DELETE AND THEIR GETTING VALUES IN AN ARRAYY====================

    
    //=======================MAIN ARRAY OF OBJECT TO GETTING DATA OF TITLT AND INPUTS ARRAY======================

    const [mainData, setMainData] = useState([])

    //title State Here....
    const [title, setTitle] = useState("");

    const mainDataGetHandler = () => {
        const newData = [    {      title,      data,    },  ];
        const updatedData = [...mainData, ...newData];
        setMainData(updatedData);
        localStorage.setItem("data", JSON.stringify(updatedData));
        setTitle("");
        setData([{ note: "", amount: "" }]);
        navigate("/");
      };

    //=======================MAIN ARRAY OF OBJECT TO GETTING DATA OF TITLT AND INPUTS ARRAY======================

        // ===================DATA SEND TO LOCAL STORAGE==================================
        
    


    return (
        <div>

            <div className='col-md-12'>
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand">Add Notes</a>
                        <a className="navbar-brand navbar-right"
                            onClick={() => navigate("/")}
                            style={{ cursor: "pointer" }}
                        >Lists Notes</a>

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
                                   value={title}
                                   onChange={(e)=>setTitle(e.target.value)}
                                />
                            </div>
                            {/* <h5 className='text-center'>Sum: 0</h5> */}

                            {
                                data.map((val, i) =>
                                    <div className="row" >
                                        <div className="col-sm-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="note"
                                                placeholder="Enter Notes"
                                                style={{ width: '120%' }}
                                                value={val.note} onChange={(e) => handleChange(e, i)}
                                            />

                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="amount"
                                                placeholder="Amount"
                                                style={{ width: '150%' }}
                                                value={val.amount} onChange={(e) => handleChange(e, i)}
                                            />

                                        </div>
                                        <div className="col-sm-2">
                                            <span>
                                                <X size={25} style={{ marginTop: '7px', cursor: "pointer" }} onClick={() => handleDelete(i)} />
                                            </span>
                                        </div>
                                    </div>
                                )
                            }

                            <div className="text-center">
                                <button type="button" className="btn btn-primary" onClick={handleClick}>Add</button>
                                <button type="button" className="btn btn-success" onClick={mainDataGetHandler} >Submit</button>

                            </div>
                            <p>INPUTS VALUE = {JSON.stringify(data)}</p>
                            <p>ALL VALUE = {JSON.stringify(mainData)}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
