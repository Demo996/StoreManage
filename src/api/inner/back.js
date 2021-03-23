import axios from 'axios'
import qs from 'qs'
const post = params => {
    return axios.post('storege/innerPart/purchaseBack.php',
        qs.stringify(params)).then(res => res.data)
}

const postEdit = params => {
    return axios.post('storege/innerPart/purchaseBackUp.php',
        qs.stringify(params)).then(res => res.data)
}

export default {
    post,
    postEdit
}