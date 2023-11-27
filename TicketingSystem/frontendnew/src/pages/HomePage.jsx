import React, { useEffect, useRef, useState } from "react";
import RestService from "../services/RestService";
import { ToastContainer, toast } from 'react-toastify';
import CustomeHeader from "../components/CustomeHeader";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

function HomePage() {

    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [reload, setreload] = useState(false);

    const [foreignUsers, setforeignUsers] = useState(0);
    const [localUsers, setlocalUsers] = useState(0);


    useEffect(() => {
        RestService.getPassengerCounts(token, {}).then(res => {
            setforeignUsers(res.data.foreignUsers)
            setlocalUsers(res.data.localUsers)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const data = {
        labels:['Local Passengers', 'Foreign Passengers'],
        datasets:[{
            label:'Count',
            data:[localUsers,foreignUsers],
            backgroundColor:['black','#fcba03'],
            borderColor:['black', '#fcba03']
        }]
    }

    const options = {

    }


    return (
        <>
            <CustomeHeader title="Home" />
            <div className="main-page">

                <div className="p-4 d-flex flex-column justify-content-center align-items-center" style={{height:'85%'}}>
                       <Doughnut data={data} options={options}></Doughnut> 
                </div>


            </div>
        </>
    );
}

export default HomePage;