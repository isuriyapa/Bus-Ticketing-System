import React, { useEffect, useRef, useState } from "react";
import RestService from "../services/RestService";
import { ToastContainer, toast } from 'react-toastify';
import CustomeHeader from "../components/CustomeHeader";
import { ScheduleFrequency } from "../enums/ScheduleFrequency.ts";

function SchedulePage() {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [reload, setreload] = useState(false);

    const [schedules, setschedules] = useState([]);
    const [fSchedules, setfSchedules] = useState([]);


    useEffect(() => {
        RestService.getAllSchedules(token, {}).then(res => {
            setschedules(res.data.schedules)
            setfSchedules(res.data.schedules)
        }).catch(err => {
            console.log(err);
        })
    }, [reload]);


    const [bus, setbus] = useState("");
    const [route, setroute] = useState("");
    const [depTime, setdepTime] = useState("");
    const [arrTime, setarrTime] = useState("");
    const [frequency, setfrequency] = useState("");

    const [busList, setbusList] = useState([]);
    const [routes, setroutes] = useState([]);

    const [selectedSchedule, setselectedSchedule] = useState(null);

    useEffect(() => {
        RestService.getAllBuses(token, {}).then(res => {
            setbusList(res.data.busList)
        }).catch(err => {
            console.log(err);
        })
        RestService.getAllBusRoutes(token, {}).then(res => {
            setroutes(res.data.routes)
        }).catch(err => {
            console.log(err);
        })
    }, []);



    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function handleSelectedObject(obj) {
        setbus(obj.bus.id)
        setroute(obj.route.id)
        setdepTime(obj.depTime)
        setarrTime(obj.arrTime)
        setfrequency(getKeyByValue(ScheduleFrequency, obj.frequency))
        setselectedSchedule(obj)
    }

    function handleSearch(value){
      
        let temp = [];
        if(value == ""){
            setfSchedules(schedules);
            return;
        } else {
            for(let i of schedules){
                if(i.route.routeNo.startsWith(value)){
                    temp.push(i)
                }
            }
        }

        setfSchedules(temp);
    }

    function clearInputs() {
        setselectedSchedule(null)
        setbus("")
        setroute("")
        setdepTime("")
        setarrTime("")
        setfrequency("")
    }

    function getObjectById(id, objArray){
        for(let i of objArray){
            if(i.id == id){
                return i;
            }
        }
    }
    function handleAddSchedule() {

        if(bus=="" || route=="" || depTime=="" || arrTime=="" || frequency==""){
            handleValidationErrorMsg('Inputs cannot be empty')
            return;
        }

        setreload(false)
        const schedule = {
            bus:getObjectById(bus, busList),
            route:getObjectById(route, routes),
            depTime:depTime,
            arrTime:arrTime,
            frequency:frequency
        }

        RestService.addSchedule(token, {schedule:schedule}).then((res) => {
            if (res.data.success) {
                toast.success('Schedule Added Successfully!!', {
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

    function handleUpdateSchedule() {
        if(bus=="" || route=="" || depTime=="" || arrTime=="" || frequency==""){
            handleValidationErrorMsg('Inputs cannot be empty')
            return;
        }
        setreload(false);
        selectedSchedule.bus = getObjectById(bus, busList);
        selectedSchedule.route = getObjectById(route, routes);
        selectedSchedule.depTime = depTime;
        selectedSchedule.arrTime = arrTime;
        selectedSchedule.frequency = frequency;



        RestService.updateSchedule(token, { schedule: selectedSchedule }).then((res) => {
            if (res.data.success) {
                toast.success('Update Success!!', {
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


    function handleDeleteSchedule() {
        setreload(false)
        RestService.deleteSchedule(token, { schedule: selectedSchedule }).then((res) => {
            if (res.data.success) {
                toast.success('Delete Success!!', {
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






    return (
        <>
            <CustomeHeader title="Schedule Management" />
            <div className="main-page">
                <div className="row clear d-flex justify-content-center align-items-center">
                    <input  autoComplete="off" onChange={(e)=>handleSearch(e.target.value)} type="text" style={{ width: '80%' }} className="form-control curve-input" />
                    <button className="btn btn-dark m-3 btn-curve " data-toggle="modal" data-target="#addUserModal">Add New Schedule</button>
                </div>
                <div className="p-4">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Bus No</th>
                                <th scope="col">Route No</th>
                                <th scope="col">Departure Time</th>
                                <th scope="col">Arrival Time</th>
                                <th scope="col">Frequency</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fSchedules != null && fSchedules.map(i =>
                                <tr>
                                    <td>{i.id}</td>
                                    <td>{i.bus.busNo}</td>
                                    <td>{i.route.routeNo}</td>
                                    <td>{i.depTime}</td>
                                    <td>{i.arrTime}</td>
                                    <td>{i.frequency}</td>
                                    <td>
                                        <button class="btn  btn-secondary mr-1" data-toggle="modal" data-target="#updateModal" onClick={() => handleSelectedObject(i)}><i class="fa fa-edit "></i></button>
                                        <button class="btn  btn-secondary" data-toggle="modal" data-target="#deleteModal"  onClick={() => handleSelectedObject(i)}><i class="fa fa-trash "></i></button>
                                    </td>
                                </tr>

                            )}



                        </tbody>
                    </table>
                </div>


            </div>




            <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Add New User</h5>
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
                                <label htmlFor="">Route</label>
                                <select class="form-select form-control" value={route} onChange={(e) => setroute(e.target.value)} aria-label="Default select example">
                                    <option selected>Select Route</option>
                                    {routes != null && routes.map(i=>
                                        <option value={i.id}>{i.routeNo}</option>    
                                    )}  
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Departure Time</label>
                                <input type="time" value={depTime} onChange={(e) => setdepTime(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Arrival Time</label>
                                <input type="time" value={arrTime} onChange={(e) => setarrTime(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Frequency</label>
                                <select class="form-select form-control" value={frequency} onChange={(e) => setfrequency(e.target.value)} aria-label="Default select example">
                                    <option selected>Select Frequency</option>
                                    <option value="0">DAILY</option>
                                    <option value="1">WEEKEND</option>
                                </select>
                            </div>                    
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={clearInputs} data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-warning"  onClick={handleAddSchedule}>Add Scehdule</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Update User</h5>
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
                                <label htmlFor="">Route</label>
                                <select class="form-select form-control" value={route} onChange={(e) => setroute(e.target.value)} aria-label="Default select example">
                                    <option selected>Select Route</option>
                                    {routes != null && routes.map(i=>
                                        <option value={i.id}>{i.routeNo}</option>    
                                    )}  
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Departure Time</label>
                                <input type="time" value={depTime} onChange={(e) => setdepTime(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Arrival Time</label>
                                <input type="time" value={arrTime} onChange={(e) => setarrTime(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Frequency</label>
                                <select class="form-select form-control" value={frequency} onChange={(e) => setfrequency(e.target.value)} aria-label="Default select example">
                                    <option selected>Select Frequency</option>
                                    <option value="0">DAILY</option>
                                    <option value="1">WEEKEND</option>
                                </select>
                            </div>  
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-warning"  onClick={handleUpdateSchedule}>Update Schedule</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Delete User</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body mr-5 ml-5">
                            Are you sure you want to delete {selectedSchedule != null && selectedSchedule.id}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={handleDeleteSchedule}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default SchedulePage;