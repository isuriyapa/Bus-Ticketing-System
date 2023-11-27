import axios from 'axios';

const BACKEND_URL = "http://localhost:8885/TicketingSystemBackend/";

class RestService {


    register(userDto) {
        return axios.post(BACKEND_URL + 'register',userDto)
    }

    authenticateUser(username, password) {
        return axios.post(BACKEND_URL + 'authenticate',{username:username, password:password})
    }


    getAllUsers(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'users/getAllUsers',req, config)
    }
    updateUser(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'users/updateUser',req, config)
    }
    deleteUser(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'users/deleteUser',req, config)
    }

    getAllBusDrivers(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'users/getAllBusDrivers',req, config)
    }

    getAllConductors(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'users/getAllConductors',req, config)
    }

    addBus(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'bus/addBus',req, config)
    }

    getAllBuses(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'bus/getAllBuses',req, config)
    }

    addNewBusRoute(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'route/addNewBusRoute',req, config)
    }

    getAllBusRoutes(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'route/getAllBusRoutes',req, config)
    }

    addSchedule(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'schedule/addSchedule',req, config)
    }

    getAllSchedules(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'schedule/getAllSchedules',req, config)
    }

    updateSchedule(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'schedule/updateSchedule',req, config)
    }

    deleteSchedule(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'schedule/deleteSchedule',req, config)
    }

    getAllInspectors(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'users/getAllInspectors',req, config)
    }

    assignInspector(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'bus/assignInspector',req, config)
    }

    getAllOffences(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'offence/getAllOffences',req, config)
    }

    getAllInvalidTickets(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'invalidTickets/getAllInvalidTickets',req, config)
    }

    getAllTrips(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'trip/getAllTrips',req, config)
    }

    getPassengerCounts(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'users/getPassengerCounts',req, config)
    }








}

export default new RestService();