import axios from 'axios'
import qs from 'qs'

const get = params => {
    return axios.post('http://192.168.0.14:80/storege/innerPart/waitfor_check_main.php',
        qs.stringify(params)).then(res => res.data)
}
const getChild = params => {
    return axios.post('http://192.168.0.14:80/storege/innerPart/waitfor_check_detail.php',
        qs.stringify(params)).then(res => res.data)
}
const postChild = params => {
    return axios.post('http://192.168.0.14:80/storege/innerPart/linkSearDetail.php',
        qs.stringify(params)).then(res => res.data)
}
const checkIn = params => {
    return axios.post('http://192.168.0.14:80/storege/innerPart/checkInOrBack.php',
        qs.stringify(params)).then(res => res.data)
}

export default {
    get,
    getChild,
    postChild,
    checkIn
}