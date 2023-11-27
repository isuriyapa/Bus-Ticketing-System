import React, { useEffect, useRef, useState } from "react";
import RestService from "../services/RestService";
import { ToastContainer, toast } from 'react-toastify';
import CustomeHeader from "../components/CustomeHeader";

function InspectorAssignPage() {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [reload, setreload] = useState(false);




    const [busList, setbusList] = useState([]);
    const [fBusList, setfBusList] = useState([]);

    const [inspector, setinspector] = useState("");
    const [bus, setbus] = useState("");

    const [inspectors, setinspectors] = useState();


    useEffect(() => {
        RestService.getAllInspectors(token, {}).then(res => {
            setinspectors(res.data.inspectors)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        RestService.getAllBuses(token, {}).then(res => {
            setbusList(res.data.busList)
            setfBusList(res.data.busList)
        }).catch(err => {
            console.log(err);
        })
    }, [reload]);

    function getObjectById(id, objArray){
        for(let i of objArray){
            if(i.id == id){
                return i;
            }
        }
    }

    function clearInputs() {
        setbus("")
        setinspector("")
    }

    function handleSearch(value){
      
        let temp = [];
        if(value == ""){
            setfBusList(busList);
            return;
        } else {
            for(let i of busList){
                if(i.inspector != null && i.inspector.name.startsWith(value)){
                    temp.push(i)
                }
            }
        }

        setfBusList(temp);
    }

    function handleValidationErrorMsg(msg){
        toast.error(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    function handleAssignInspector() {

        if(bus == "" || inspector == ""){
            handleValidationErrorMsg('Inputs cannot be empty')
            return;
        }
        setreload(false)
        
        let selectedBus = getObjectById(bus, busList);
        selectedBus.inspector = getObjectById(inspector,inspectors);
        console.log({bus:selectedBus})
        RestService.assignInspector(token, {bus:selectedBus}).then((res) => {
            
            if (res.data != null) {
                toast.success('Inspector assigned successfully!!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                clearInputs()
                setreload(true)
            } else {
                toast.error('Something went wrong. Please try again.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }

        }).catch((err) => {
            console.log(err);
            toast.error('Something went wrong. Please try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        })
    }



    return ( 
        <>
            <CustomeHeader title="Inspector Assign" />
            <div className="main-page">
                <div className="row clear d-flex justify-content-center align-items-center">
                    <input  autoComplete="off" onChange={(e)=>handleSearch(e.target.value)} type="text" style={{ width: '80%' }} className="form-control curve-input" />
                    <button className="btn btn-dark m-3 btn-curve " data-toggle="modal" data-target="#assignInspectorModal">Assign Inspector</button>
                </div>
                <div className="p-4">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Bus No</th>
                                <th scope="col">Inspector</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fBusList != null && fBusList.map(i =>
                                <tr>
                                    <td>{i.id}</td>
                                    <td>{i.busNo}</td>
                                    <td>{i.inspector != null ? i.inspector.name : ""}</td>            
                                </tr>

                            )}
                        </tbody>
                    </table>
                </div>


            </div>




            <div class="modal fade" id="assignInspectorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Assign Inspector</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body mr-5 ml-5">
                            <div className="form-group">
                                <label htmlFor="">Bus</label>
                                <select class="form-select form-control" value={bus} onChange={(e) => setbus(e.target.value)} aria-label="Default select example">
                                    <option selected>Select Bus</option>
                                    {busList != null && busList.map(i=>
                                        <option value={i.id}>{i.busNo}</option>    
                                    )}  
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Inspector</label>
                                <select class="form-select form-control" value={inspector} onChange={(e) => setinspector(e.target.value)} aria-label="Default select example">
                                    <option selected>Select Inspector</option>
                                    {inspectors != null && inspectors.map(i=>
                                        <option value={i.id}>{i.name}</option>    
                                    )}  
                                </select>
                            </div>
                           
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-warning" onClick={handleAssignInspector}>Assign Inspector</button>
                        </div>
                    </div>
                </div>
            </div>          
        </>
     );
}

export default InspectorAssignPage;