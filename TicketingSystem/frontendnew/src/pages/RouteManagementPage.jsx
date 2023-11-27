import React, { useEffect, useRef, useState } from "react";
import RestService from "../services/RestService";
import { ToastContainer, toast } from 'react-toastify';
import CustomeHeader from "../components/CustomeHeader";
import { UserRole } from "../enums/UserRole.ts";

function RouteManagementPage() {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [reload, setreload] = useState(false);



    const [routes, setroutes] = useState([]);
    const [fRoutes, setfRoutes] = useState([]);

    const [routeNo, setrouteNo] = useState();
    const [startPoint, setstartPoint] = useState();
    const [endPoint, setendPoint] = useState();
    const [busHalts, setbusHalts] = useState([]);
    const [haltName, sethaltName] = useState();



    useEffect(() => {
        RestService.getAllBusRoutes(token, {}).then(res => {
            setroutes(res.data.routes)
            setfRoutes(res.data.routes)
        }).catch(err => {
            console.log(err);
        })
    }, [reload]);

    function getObjectById(id, objArray) {
        for (let i of objArray) {
            if (i.id == id) {
                return i;
            }
        }
    }

    function clearInputs() {
        setrouteNo("")
        setstartPoint("")
        setendPoint("")
        setbusHalts([])
    }

    function handleSearch(value) {

        let temp = [];
        if (value == "") {
            setfRoutes(routes);
            return;
        } else {
            for (let i of routes) {
                if (i.routeNo.startsWith(value)) {
                    temp.push(i)
                }
            }
        }
        setfRoutes(temp);
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

    

    function handleAddRoute() {

        if(routeNo=="" || startPoint=="" || endPoint=="" || busHalts.length ==0){
            handleValidationErrorMsg('Inputs cannot be empty')
            return
        }

        setreload(false)
        const route = {
            routeNo: routeNo,
            startPoint: startPoint,
            endPoint: endPoint,
            busHalts: busHalts
        }

        RestService.addNewBusRoute(token, { route: route }).then((res) => {
            if (res.data != null) {
                toast.success('Route added successfully!!', {
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

    function handleAddHalt(){
        let temp = busHalts;

        const busHalt = {
            name:haltName,
            haltOrder:busHalts.length
        }

        temp.push(busHalt);
        setbusHalts(temp);
        sethaltName("")
    }



    return (
        <>
            <CustomeHeader title="Route Management" />
            <div className="main-page">
                <div className="row clear d-flex justify-content-center align-items-center">
                    <input autoComplete="off" onChange={(e) => handleSearch(e.target.value)} type="text" style={{ width: '80%' }} className="form-control curve-input" />
                    <button className="btn btn-dark m-3 btn-curve " data-toggle="modal" data-target="#addBusModal">Add New Route</button>
                </div>
                <div className="p-4">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Route No</th>
                                <th scope="col">Start Point</th>
                                <th scope="col">End Point</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fRoutes != null && fRoutes.map(i =>
                                <tr>
                                    <td>{i.id}</td>
                                    <td>{i.routeNo}</td>
                                    <td>{i.startPoint}</td>
                                    <td>{i.endPoint}</td>
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
                            <h5 class="modal-title" id="exampleModalLongTitle">Add New Route</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body mr-5 ml-5">
                            <div className="form-group">
                                <label htmlFor="">Route No</label>
                                <input type="text" value={routeNo} onChange={(e) => setrouteNo(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Start Point</label>
                                <input type="text" value={startPoint} onChange={(e) => setstartPoint(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">End Point</label>
                                <input type="text" value={endPoint} onChange={(e) => setendPoint(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Bus Halts</label>
                                <input type="text" value={haltName} onChange={(e) => sethaltName(e.target.value)} className="form-control" />
                                <button type="button" class="btn btn-warning mt-2" onClick={handleAddHalt}>Add</button>
                            </div>
                            <div className="form-group">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Order</th>
                                            <th scope="col">Bus Stop Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {busHalts != null && busHalts.map(i =>
                                            <tr>
                                                <td>{i.haltOrder}</td>
                                                <td>{i.name}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={clearInputs}>Close</button>
                            <button type="button" class="btn btn-warning" onClick={handleAddRoute}>Add Route</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RouteManagementPage;