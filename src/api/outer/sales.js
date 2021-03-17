import axios from 'axios'
import qs from 'qs'

const salesPost = params => {
    return axios.post("http://192.168.0.14:80/storege/outPart/sale.php", qs.stringify(params)).then(res => res.data)
}
const recordPost = params => {
    return axios.post("http://192.168.0.14:80/storege/outPart/saleRecord.php", qs.stringify(params)).then(res => res.data)
}


export default {
    salesPost,
    recordPost
}