import axios from 'axios'
import qs from 'qs'

const importData = params => {
    return axios.post("storege/coding/input.php",
        qs.stringify(params)).then(res => res.data)
}

//获取编码表数据
const getPost = params => {
        return axios.post("storege/coding/getCode.php",
            qs.stringify(params)).then(res => res.data)
    }
    //编辑编码表数据
const editData = params => {
        return axios.post("storege/coding/editCode.php",
            qs.stringify(params)).then(res => res.data)
    }
    //删除编码表数据
const deleteData = params => {
    return axios.post("storege/coding/deleteCode.php",
        qs.stringify(params)).then(res => res.data)
}

//按条件返回编码
const filterCode = params => {
    return axios.post("storege/coding/filterCode.php",
        qs.stringify(params)).then(res => res.data)
}
export default {
    importData,
    getPost,
    editData,
    deleteData,
    filterCode
}