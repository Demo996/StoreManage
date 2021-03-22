import axios from 'axios'
import qs from 'qs'

const get = params => {
    return axios.post('storege/innerPart/waitfor_check_main.php',
        qs.stringify(params)).then(res => res.data)
}
const getChild = params => {
    return axios.post('storege/innerPart/waitfor_check_detail.php',
        qs.stringify(params)).then(res => res.data)
}
const postChild = params => {
    return axios.post('storege/innerPart/linkSearDetail.php',
        qs.stringify(params)).then(res => res.data)
}
const checkIn = params => {
    return axios.post('storege/innerPart/checkInOrBack.php',
        qs.stringify(params)).then(res => res.data)
}

export default {
    get,
    getChild,
    postChild,
    checkIn
}