import React, { useEffect, useRef, useState } from "react";
import RestService from "../services/RestService";
import { ToastContainer, toast } from 'react-toastify';
import CustomeHeader from "../components/CustomeHeader";
import { UserRole } from "../enums/UserRole.ts";

function BusManagement() {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [reload, setreload] = useState(false);

    const [busNo, setbusNo] = useState("");
    const [conductor, setconductor] = useState("");
    const [driver, setdriver] = useState("");

    const [drivers, setdrivers] = useState([]);
    const [conductors, setconductors] = useState([]);
    const [busList, setbusList] = useState([]);
    const [fBusList, setfBusList] = useState([]);

    useEffect(() => {
        RestService.getAllBusDrivers(token, {}).then(res => {
            setdrivers(res.data.drivers)
        }).catch(err => {
            console.log(err);
        })
        RestService.getAllConductors(token, {}).then(res => {
            setconductors(res.data.conductors)
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

    function getObjectById(id, objArray){
        for(let i of objArray){
            if(i.id == id){
                return i;
            }
        }
    }

    function clearInputs() {
        setbusNo("")
        setdriver("")
        setconductor("")
    }

    function handleSearch(value){
      
        let temp = [];
        if(value == ""){
            setfBusList(busList);
            return;
        } else {
            for(let i of busList){
                if(i.busNo.startsWith(value)){
                    temp.push(i)
                }
            }
        }

        setfBusList(temp);
    }

    function handleAddBus() {

        if(busNo=="" || driver=="" || conductor==""){
            handleValidationErrorMsg('Inputs cannot be empty')
            return;
        }

        setreload(false)
        const bus = {
            busNo: busNo,
            driver:getObjectById(driver, drivers),
            conductor:getObjectById(conductor,conductors)
        }

        RestService.addBus(token, {bus:bus}).then((res) => {
            if (res.data != null) {
                toast.success('Bus added successfully!!', {
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
            <CustomeHeader title="Bus Management" />
            <div className="main-page">
                <div className="row clear d-flex justify-content-center align-items-center">
                    <input  autoComplete="off" onChange={(e)=>handleSearch(e.target.value)} type="text" style={{ width: '80%' }} className="form-control curve-input" />
                    <button className="btn btn-dark m-3 btn-curve " data-toggle="modal" data-target="#addBusModal">Add New Bus</button>
                </div>
                <div className="p-4">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Bus No</th>
                                <th scope="col">Driver</th>
                                <th scope="col">Conductor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fBusList != null && fBusList.map(i =>
                                <tr>
                                    <td>{i.id}</td>
                                    <td>{i.busNo}</td>
                                    <td>{i.driver != null && i.driver.name}</td>
                                    <td>{i.conductor != null && i.conductor.name}</td>             
                                </tr>

                            )}
                        </tbody>
                    </table>
                </div>


            </div>




            <div class="modal fade" id="addBusModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Add New Bus</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body mr-5 ml-5">
                            <div className="form-group">
                                <label htmlFor="">Bus No</label>
                                <input type="text" value={busNo} onChange={(e) => setbusNo(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Driver</label>
                                <select class="form-select form-control" value={driver} onChange={(e) => setdriver(e.target.value)} aria-label="Default select example">
                                    <option selected>Select Driver</option>
                                    {drivers != null && drivers.map(i=>
                                        <option value={i.id}>{i.name}</option>    
                                    )}  
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Conductor</label>
                                <select class="form-select form-control" value={conductor} onChange={(e) => setconductor(e.target.value)} aria-label="Default select example">
                                    <option selected>Select Driver</option>
                                    {conductors != null && conductors.map(i=>
                                        <option value={i.id}>{i.name}</option>    
                                    )}  
                                </select>
                            </div>
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-warning"  onClick={handleAddBus}>Add bus</button>
                        </div>
                    </div>
                </div>
            </div>          
        </>
     );
}

export default BusManagement;