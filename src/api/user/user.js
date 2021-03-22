import axios from 'axios'
import qs from 'qs'

const createUser = params => {
    return axios.post("storege/user/create.php",
        qs.stringify(params)).then(res => res.data)
}
const showUser = params => {
    return axios.post("storege/user/index.php",
        qs.stringify(params)).then(res => res.data)
}
const delUser = params => {
    return axios.post("storege/user/delete.php",
        qs.stringify(params)).then(res => res.data)
}

//修改状态  禁用用户或者解禁
const state = params => {
    return axios.post("storege/user/state.php",
        qs.stringify(params)).then(res => res.data)
}

const getRolesName = () => {
    return axios.get("storege/user/rolesName.php").then(res => res.data)
}

const assign = params => {
    return axios.post("storege/user/assign.php",
        qs.stringify(params)).then(res => res.data)
}
const history = params => {
    return axios.post("storege/user/history.php",
        qs.stringify(params)).then(res => res.data)
}

const getPower = params => {
    return axios.post("storege/power/getPower.php",
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