import axios from 'axios'
const baseURl = 'http://localhost:3004/api/persons'

const getAll = () =>{
    const req = axios.get(baseURl);
    return req.then((response)=>response.data);
}

const create = (newObj) =>{
    const req = axios.post(baseURl,newObj);
    return req.then((response)=>response.data);
}

const update = (newObj,id) =>{
    const req = axios.put(`${baseURl}/${id}`,newObj);
    return req.then((response)=>response.data);
}

const deleteContact = (id) =>{
    const req = axios.delete(`${baseURl}/${id}`);
    return req.then((response)=>response.data);
}

export default {getAll,create,update,deleteContact};