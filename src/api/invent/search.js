import axios from 'axios'
import qs from 'qs'

const inventPost = params => {
    return axios.post("http://192.168.0.14:80/storege/inventPart/invent.php",
        qs.stringify(params)).then(res => res.data)
}

const alarmPost = params => {
    return axios.post("http://192.168.0.14:80/storege/inventPart/alarm.php",
        qs.stringify(params)).then(res => res.data)
}

export default {
    inventPost,
    alarmPost
}