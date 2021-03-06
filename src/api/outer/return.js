import axios from 'axios'
import qs from 'qs'

const normalPost = params => {
    return axios.post("storege/outPart/normalBack.php", qs.stringify(params)).then(res => res.data)
}
const awfulPost = params => {
    return axios.post("storege/outPart/badBack.php", qs.stringify(params)).then(res => res.data)
}

const normalRecord = params => {
    return axios.post("storege/outPart/normalRecord.php", qs.stringify(params)).then(res => res.data)
}
const awfulRecord = params => {
    return axios.post("storege/outPart/badRecord.php", qs.stringify(params)).then(res => res.data)
}
export default {
    normalPost,
    awfulPost,
    normalRecord,
    awfulRecord
}