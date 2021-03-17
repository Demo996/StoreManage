import axios from 'axios'
import qs from 'qs'

const get = () => {
    return axios.get('http://192.168.0.14:80/storege/test3.php').then(res => res.data)
}
const getChild = params => {
    return axios.get('http://192.168.0.14:80/storege/test4.php').then(res => res.data)
}
const postChild = params => {
    return axios.post('http://192.168.0.14:80/storege/test4.php', params).then(res => res.data)
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