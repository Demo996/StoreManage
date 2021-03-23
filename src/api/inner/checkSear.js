import axios from 'axios'
import qs from 'qs'
const post = params => {
    return axios.post("storege/innerPart/checkSearMain.php",
        qs.stringify(params)).then(res => res.data)
}

const postChild = params => {
    return axios.post("storege/innerPart/checkSearDetail.php",
        qs.stringify(params)).then(res => res.data)
}

export default {
    post,
    postChild
}