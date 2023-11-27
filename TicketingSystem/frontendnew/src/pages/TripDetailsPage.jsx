import React, { useEffect, useRef, useState } from "react";
import RestService from "../services/RestService";
import { ToastContainer, toast } from 'react-toastify';
import CustomeHeader from "../components/CustomeHeader";

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function TripDetailsPage() {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [reload, setreload] = useState(false);

    const [trips, settrips] = useState([]);
    const [ftrips, setftrips] = useState([]);

    useEffect(() => {
        RestService.getAllTrips(token, {}).then(res => {
            setftrips(res.data.trips)
            settrips(res.data.trips)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    function downloadPdf(id) {
        const input = document.getElementById(id);
        html2canvas(input).then((canvas) => {

            let imgWidth = 208;
            let imgHeight = canvas.height * imgWidth / canvas.width;
            const imgData = canvas.toDataURL('img/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save("download.pdf");
        });
    }

    function handleSearch(value) {

        let temp = [];
        if (value == "") {
            setftrips(trips);
            return;
        } else {
            for (let i of trips) {
                if (i.route.routeNo.startsWith(value)) {
                    temp.push(i)
                }
            }
        }

        setftrips(temp);
    }

    function formatDate(inputDateStr) {
        const inputDate = new Date(inputDateStr);
        const day = String(inputDate.getDate()).padStart(2, '0');
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const year = inputDate.getFullYear();

        return `${day}-${month}-${year}`;
    }

    return (
        <>
            <CustomeHeader title="Trip Details" />
            <div className="main-page">
                <div className="row clear d-flex justify-content-center align-items-center">
                    <input autoComplete="off" onChange={(e) => handleSearch(e.target.value)} type="text" style={{ width: '80%' }} className="form-control curve-input" />
                    <button className="btn btn-dark m-3 btn-curve " data-toggle="modal" data-target="#report">Report</button>
                </div>
                <div className="p-4">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Date</th>
                                <th scope="col">Route</th>
                                <th scope="col">Bus</th>
                                <th scope="col">Income</th>
                                <th scope="col">Passenger Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ftrips != null && ftrips.map(i =>
                                <tr>
                                    <td>{i.id}</td>
                                    <td>{formatDate(i.date)}</td>
                                    <td>{i.route.routeNo}</td>
                                    <td>{i.bus.busNo}</td>
                                    <td>{i.income}</td>
                                    <td>{i.passengerTrips.length}</td>

                                </tr>

                            )}
                        </tbody>
                    </table>
                </div>


            </div>

            <div class="modal fade" id="report" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body mr-5 ml-5 p-5" id="reportPdf">
                            <div className="d-flex flex-column justify-content-center align-items-center title-box " style={{ height: '15%' }}>
                                <h1 className="nav-title">Ticket<span style={{ color: 'yellow' }}>+</span></h1>
                            </div>
                            <hr />
                            <h2 className="d-flex flex-column justify-content-center align-items-center p-3" style={{fontWeight:'100'}}>- Trip Report -</h2>
                            <table class="table table-hover mt-3">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Route</th>
                                        <th scope="col">Bus</th>
                                        <th scope="col">Income</th>
                                        <th scope="col">Passenger Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ftrips != null && ftrips.map(i =>
                                        <tr>
                                            <td>{i.id}</td>
                                            <td>{formatDate(i.date)}</td>
                                            <td>{i.route.routeNo}</td>
                                            <td>{i.bus.busNo}</td>
                                            <td>{i.income}</td>
                                            <td>{i.passengerTrips.length}</td>
                                        </tr>

                                    )}
                                </tbody>
                            </table>


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={() => downloadPdf('reportPdf')}>Download</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TripDetailsPage;