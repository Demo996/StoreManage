import axios from 'axios'
import qs from 'qs'

const createRole = params => {
    return axios.post("storege/roles/create.php",
        qs.stringify(params)).then(res => res.data)
}
const showRole = params => {
    return axios.post("storege/roles/index.php",
        qs.stringify(params)).then(res => res.data)
}

const getPower = () => {
    return axios.get("storege/power/index.php").then(res => res.data)
}

const assign = params => {
    return axios.post("storege/roles/assign.php",
        qs.stringify(params)).then(res => res.data)
}
const edit = params => {
    return axios.post("storege/roles/edit.php",
        qs.stringify(params)).then(res => res.data)
}
const delRole = params => {
    return axios.post("storege/roles/delRole.php",
        qs.stringify(params)).then(res => res.data)
}
export default {
    createRole,
    showRole,
    getPower,
    assign,
    edit,
    delRole
}