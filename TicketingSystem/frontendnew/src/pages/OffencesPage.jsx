import React, { useEffect, useRef, useState } from "react";
import RestService from "../services/RestService";
import { ToastContainer, toast } from 'react-toastify';
import CustomeHeader from "../components/CustomeHeader";

function OffencesPage() {

    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [reload, setreload] = useState(false);

    const [offences, setoffences] = useState([]);
    const [fOffences, setfOffences] = useState([]);

    useEffect(() => {
        RestService.getAllOffences(token, {}).then(res => {
            setfOffences(res.data.offences)
            setoffences(res.data.offences)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    function handleSearch(value){
      
        let temp = [];
        if(value == ""){
            setfOffences(offences);
            return;
        } else {
            for(let i of offences){
                if(i.inspector.name.startsWith(value)){
                    temp.push(i)
                }
            }
        }

        setfOffences(temp);
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
            <CustomeHeader title="Offences" />
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
                                <th scope="col">Time</th>
                                <th scope="col">Inspector</th>
                                <th scope="col">Bus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fOffences != null && fOffences.map(i =>
                                <tr>
                                    <td>{i.id}</td>
                                    <td>{formatDate(i.date)}</td>
                                    <td>{i.time}</td>
                                    <td>{i.inspector.name}</td>
                                    <td>{i.bus.busNo}</td>
                                </tr>

                            )}
                        </tbody>
                    </table>
                </div>


            </div>
        </>
    );
}

export default OffencesPage;