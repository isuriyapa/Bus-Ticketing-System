import React, { useEffect, useRef, useState } from "react";
import RestService from "../services/RestService";
import { ToastContainer, toast } from 'react-toastify';
import CustomeHeader from "../components/CustomeHeader";

function InvalidTicketPage() {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [reload, setreload] = useState(false);

    const [invalidTickets, setinvalidTickets] = useState([]);
    const [fInvalidTickets, setfInvalidTickets] = useState([]);

    useEffect(() => {
        RestService.getAllInvalidTickets(token, {}).then(res => {
            setfInvalidTickets(res.data.invalidTickets)
            setinvalidTickets(res.data.invalidTickets)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    function handleSearch(value){
      
        let temp = [];
        if(value == ""){
            setfInvalidTickets(invalidTickets);
            return;
        } else {
            for(let i of invalidTickets){
                if(i.trip.id.startsWith(value)){
                    temp.push(i)
                }
            }
        }

        setfInvalidTickets(temp);
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
            <CustomeHeader title="Invalid Tickets" />
            <div className="main-page">
                <div className="row clear d-flex justify-content-center align-items-center">
                    <input autoComplete="off" onChange={(e) => handleSearch(e.target.value)} type="text" style={{ width: '80%' }} className="form-control curve-input mt-3" />
                </div>
                <div className="p-4">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Date</th>
                                <th scope="col">Route</th>
                                <th scope="col">Bus</th>
                                <th scope="col">No of Invalid Tickets</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fInvalidTickets != null && fInvalidTickets.map(i =>
                                <tr>
                                    <td>{i.id}</td>
                                    <td>{formatDate(i.trip.date)}</td>
                                    <td>{i.trip.route.routeNo}</td>
                                    <td>{i.trip.bus.busNo}</td>
                                    <td>{i.noOfTickets}</td>
                                </tr>

                            )}
                        </tbody>
                    </table>
                </div>


            </div>
        </>
    );
}

export default InvalidTicketPage;