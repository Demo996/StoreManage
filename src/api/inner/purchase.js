import axios from 'axios'
import qs from 'qs'

const post = params => {
    return axios.post("http://192.168.0.14:80/storege/innerPart/purchase_save.php", qs.stringify(params))
        .then(res => res.data)
}

export default {
    post
}