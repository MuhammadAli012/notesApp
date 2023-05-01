import React, { useState, useEffect } from 'react'
import { X, PlusLg, ArrowLeft } from 'react-bootstrap-icons'
import { useNavigate,useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'


export const UpdateNote = () => {
    const navigate = useNavigate();

    const { state, sum } = useLocation();

    // console.log(state);
    const [inputList, setInputList] = useState([{  'noteTitle': '', 'amount': '' }]);
    const [title, setTitle] = useState("");
    const [total, setTotal] = useState(0);
    const [noteId, setNoteId] = useState("");

    useEffect(() => {
        setInputList(state.notes);
        setTitle(state.title);
        setNoteId(state.id);
        let sum = state.notes.reduce(function (prev, current) {
            return prev + +current.amount
        }, 0);
        setTotal(sum);
    }, [])

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const titleChange = (e) => {
        setTitle(e.target.value)
    }


    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }


    const handleAddClick = () => {
        setInputList([...inputList, { id: uuidv4(), 'noteTitle': '', 'amount': '' }]);
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

    const _updateNote = (id) => {
        const _notes = JSON.parse(localStorage.getItem("notes"));
        let arr = [];
        for (let i = 0; i < _notes.length; i++) {
            if (_notes[i].id === noteId) {
                arr.push({
                    "id": noteId,
                    "title": title,
                    "notes": inputList
                })
            } else {
                arr.push(_notes[i]);
            }
        }

        localStorage.setItem("notes", JSON.stringify(arr));
        navigate('/');
        toast.success('Note Update SuccessFully')
        console.log(total)
    }


    


    return (
        <div>

            <div className='col-md-4 mx-auto'>
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand"><ArrowLeft style={{ cursor: 'pointer' }} onClick={_updateNote}/>  Update Notes</a>
                        

                    </div>
                </nav>

                <div className="d-flex justify-content-center mt-5 mb-5 ">
                    <div className="card back-shadow form-Note" style={{ width: "24rem" }}>

                        <div className="card-body">
                            <h5 className="card-title text-center">Update Note</h5>
                            <div className="mb-3 mt-4">

                            
                                
                                <input 
                                   type="text"
                                   className="form-control"
                                   placeholder="Please Enter Title"
                                   name='title' defaultValue={title} onChange={titleChange}
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
                                                value={x.amount} onChange={e => { handleInputChange(e, i); totalAdd() }}
                                                style={{ width: '150%' }}
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
