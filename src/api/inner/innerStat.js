import axios from 'axios'
import qs from 'qs'

const post = params => {
    return axios.post("storege/innerPart/enter.php",
        qs.stringify(params)).then(res => res.data)
}

export default {
    post
}