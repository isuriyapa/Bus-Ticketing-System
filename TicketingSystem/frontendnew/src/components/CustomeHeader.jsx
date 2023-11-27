import { useState } from 'react';
import profile from '../assets/profile.png'

function CustomeHeader(props) {

    const [name, setname] = useState(sessionStorage.getItem("name"));

    return (
        <div className="row main-header clear" >
            <div className="row col-lg-12">
                <div className="col-lg-8">
                    <h1>{props.title}</h1>
                </div>
                <div className="col-lg-4 d-flex justify-content-center align-items-center">
                    <img src={profile} alt="" className='profile-pic' />
                    <h2>{name}</h2>
                </div>
            </div>
        </div>
    );
}

export default CustomeHeader;