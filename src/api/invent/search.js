import axios from 'axios'
import qs from 'qs'

const inventPost = params => {
    return axios.post("storege/inventPart/invent.php",
        qs.stringify(params)).then(res => res.data)
}

const alarmPost = params => {
    return axios.post("storege/inventPart/alarm.php",
        qs.stringify(params)).then(res => res.data)
}
const filter = params => {
    return axios.post("storege/inventPart/filter.php",
        qs.stringify(params)).then(res => res.data)
}

export default {
    inventPost,
    alarmPost,
    filter
}