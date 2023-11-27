import React, { useEffect, useRef, useState } from "react";
import RestService from "../services/RestService";
import { ToastContainer, toast } from 'react-toastify';
import CustomeHeader from "../components/CustomeHeader";
import { UserRole } from "../enums/UserRole.ts";

function UserManagementPage() {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [reload, setreload] = useState(false);

    const [users, setusers] = useState([]);
    const [fUsers, setfUsers] = useState([]);

    useEffect(() => {
        RestService.getAllUsers(token, {}).then(res => {
            setusers(res.data.users)
            setfUsers(res.data.users)
        }).catch(err => {
            console.log(err);
        })
    }, [reload]);

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [mobileNo, setmobileNo] = useState("");
    const [nic, setnic] = useState("");
    const [role, setrole] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [selectedUser, setselectedUser] = useState(null);

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function handleSelectedUser(u) {
        setname(u.name)
        setemail(u.email)
        setmobileNo(u.mobileNo)
        setnic(u.nic)
        setrole(getKeyByValue(UserRole, u.role))
        setusername(u.username)
        setselectedUser(u)
    }

    function handleSearch(value){
      
        let temp = [];
        if(value == ""){
            setfUsers(users);
            return;
        } else {
            for(let i of users){
                if(i.name.startsWith(value)){
                    temp.push(i)
                }
            }
        }

        setfUsers(temp);
    }

    function clearInputs() {
        setname("")
        setemail("")
        setmobileNo("")
        setnic("")
        setrole("")
        setusername("")
        setselectedUser(null)
        setpassword("")
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

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidMobileNumber(number) {
        var mobileNumberRegex = /^0\d{9}$/;
        return mobileNumberRegex.test(number);
      }
    
    //Function to handle new users
    function handleAddNewUser() {


        if(name=="" || email=="" || mobileNo=="" || nic=="" || role=="" || username=="" || password==""){
            handleValidationErrorMsg('Inputs cannot be empty')
            return;
        }

        if(!isValidEmail(email)){
            handleValidationErrorMsg('Invalid email')
            return;
        }

        if(!isValidMobileNumber(mobileNo)){
            handleValidationErrorMsg('Invalid Mobile')
            return;
        }


        setreload(false)
        const req = {
            name: name,
            email: email,
            mobileNo: mobileNo,
            nic: nic,
            role: role,
            username: username,
            password: password
        }

        RestService.register(req).then((res) => {
            if (res.data != null) {
                toast.success('Registration Success!!', {
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
    
    //Function to handle update a user
    function handleUpdateUser() {
        if(name=="" || email=="" || mobileNo=="" || nic=="" || role=="" || username=="" ){
            handleValidationErrorMsg('Inputs cannot be empty')
            return;
        }

        if(!isValidEmail(email)){
            handleValidationErrorMsg('Invalid email')
            return;
        }

        if(!isValidMobileNumber(mobileNo)){
            handleValidationErrorMsg('Invalid Mobile')
            return;
        }
        
        setreload(false);
        selectedUser.name = name;
        selectedUser.email = email;
        selectedUser.mobileNo = mobileNo;
        selectedUser.nic = nic;
        selectedUser.role = role;
        selectedUser.username = username;


        RestService.updateUser(token, { user: selectedUser }).then((res) => {
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

    //Function to delete a user
    function handleDeleteUser() {
        setreload(false)
        RestService.deleteUser(token, { user: selectedUser }).then((res) => {
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







    return (
        <>
            <CustomeHeader title="User Management" />
            <div className="main-page">
                <div className="row clear d-flex justify-content-center align-items-center">
                    <input  autoComplete="off" onChange={(e)=>handleSearch(e.target.value)} type="text" style={{ width: '80%' }} className="form-control curve-input" />
                    <button className="btn btn-dark m-3 btn-curve " data-toggle="modal" data-target="#addUserModal">Add New User</button>
                </div>
                <div className="p-4">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NIC</th>
                                <th scope="col">Username</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Role</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fUsers != null && fUsers.map(i =>
                                <tr>
                                    <td>{i.id}</td>
                                    <td>{i.nic}</td>
                                    <td>{i.username}</td>
                                    <td>{i.name}</td>
                                    <td>{i.email}</td>
                                    <td>{i.mobileNo}</td>
                                    <td>{i.role}</td>
                                    <td>
                                        <button class="btn  btn-secondary mr-1" data-toggle="modal" data-target="#updateUserModal" onClick={() => handleSelectedUser(i)}><i class="fa fa-edit "></i></button>
                                        <button class="btn  btn-secondary" data-toggle="modal" data-target="#deleteUserModal"  onClick={() => handleSelectedUser(i)}><i class="fa fa-trash "></i></button>
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
                                <label htmlFor="">Name</label>
                                <input type="text" value={name} onChange={(e) => setname(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Email</label>
                                <input type="text" value={email} onChange={(e) => setemail(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Mobile</label>
                                <input type="text" value={mobileNo} onChange={(e) => setmobileNo(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">NIC/Passport</label>
                                <input type="text" value={nic} onChange={(e) => setnic(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Role</label>
                                <select class="form-select form-control" value={role} onChange={(e) => setrole(e.target.value)} aria-label="Default select example">
                                    <option selected>Select Role</option>
                                    <option value="0">ADMIN</option>
                                    <option value="1">INSPECTOR</option>
                                    <option value="2">DRIVER</option>
                                    <option value="3">CONDUCTOR</option>
                                    <option value="4">LOCAL PASSENGER</option>
                                    <option value="5">FOREIGN PASSENGER</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Username</label>
                                <input type="text" value={username} onChange={(e) => setusername(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Password</label>
                                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} className="form-control" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-warning"  onClick={handleAddNewUser}>Add User</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="updateUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                <label htmlFor="">Name</label>
                                <input type="text" value={name} onChange={(e) => setname(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Email</label>
                                <input type="text" value={email} onChange={(e) => setemail(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Mobile</label>
                                <input type="text" value={mobileNo} onChange={(e) => setmobileNo(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">NIC/Passport</label>
                                <input type="text" value={nic} onChange={(e) => setnic(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Role</label>
                                <select class="form-select form-control" value={role} onChange={(e) => setrole(e.target.value)} aria-label="Default select example">
                                    <option selected>Select Role</option>
                                    <option value="0">ADMIN</option>
                                    <option value="1">INSPECTOR</option>
                                    <option value="2">DRIVER</option>
                                    <option value="3">CONDUCTOR</option>
                                    <option value="4">LOCAL PASSENGER</option>
                                    <option value="5">FOREIGN PASSENGER</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Username</label>
                                <input type="text" value={username} onChange={(e) => setusername(e.target.value)} className="form-control" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-warning" onClick={handleUpdateUser}>Update User</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="deleteUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Delete User</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body mr-5 ml-5">
                            Are you sure you want to delete {selectedUser != null && selectedUser.name}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-warning"  onClick={handleDeleteUser}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default UserManagementPage;