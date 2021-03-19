import axios from 'axios'
import qs from 'qs'

const createUser = params => {
    return axios.post("http://192.168.0.14:80/storege/user/create.php",
        qs.stringify(params)).then(res => res.data)
}
const showUser = params => {
    return axios.post("http://192.168.0.14:80/storege/user/index.php",
        qs.stringify(params)).then(res => res.data)
}
const delUser = params => {
    return axios.post("http://192.168.0.14:80/storege/user/delete.php",
        qs.stringify(params)).then(res => res.data)
}

//修改状态  禁用用户或者解禁
const state = params => {
    return axios.post("http://192.168.0.14:80/storege/user/state.php",
        qs.stringify(params)).then(res => res.data)
}

const getRolesName = () => {
    return axios.get("http://192.168.0.14:80/storege/user/rolesName.php").then(res => res.data)
}

const assign = params => {
    return axios.post("http://192.168.0.14:80/storege/user/assign.php",
        qs.stringify(params)).then(res => res.data)
}
const history = params => {
    return axios.post("http://192.168.0.14:80/storege/user/history.php",
        qs.stringify(params)).then(res => res.data)
}

const getPower = params => {
    return axios.post("http://192.168.0.14:80/storege/power/getPower.php",
        qs.stringify(params)).then(res => res.data)
}


export default {
    createUser,
    showUser,
    delUser,
    state,
    getRolesName,
    assign,
    history,
    getPower
}