import axios from 'axios'
import qs from 'qs'

const receiptPost = params => {
    return axios.post("storege/outPart/receipt.php", qs.stringify(params)).then(res => res.data)
}
const recordPost = params => {
    return axios.post("storege/outPart/record.php", qs.stringify(params)).then(res => res.data)
}

const receiptingPost = params => {
    return axios.post("storege/outPart/receipting.php", qs.stringify(params)).then(res => res.data)
}

export default {
    receiptPost,
    recordPost,
    receiptingPost
}