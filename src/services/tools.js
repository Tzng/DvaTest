import axios from 'axios';
import { Toast } from 'antd-mobile';

//raw的头部
const rawheaders = {
    headers:{
        'Content-Type':'application/json;charset=utf-8'
    }
};

/**
 * 泽羚的get请求
 * @param {*} param0 
 */
export const zlGet = ({
    url,
    msg = '接口异常', 
    headers={}
}) => {
    return axios.get(url,headers).then(res => {
        // 结果数据
        let resultData = res.data;
        if(resultData.code === 0){
            // 成功
            return resultData.result;
        }else{
            // 失败
            Toast.offline(resultData.msg);
        }
    }).catch(err => {
        console.log(err);
        Toast.offline('接口异常，请联系管理员')
    })
}

/**
 * 公用form表单提交方式
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const formPost = ({url, data, msg='接口异常', headers}) => {   
    //将参数转成form形式
    let formData = new FormData();
    for(let key in data){
        formData.append(key, data[key])
    }
    return axios.post(url, formData, rawheaders).then(res => {
        let resultData = res.data;
        if(resultData.code === "0"){
            return resultData.result;
        }else{
            Toast.offline(resultData.msg);
        }
    }).catch(err => {
        console.log(err);
        Toast.offline(msg);
    })
};

/**
 * 使用raw方式提交数据的方式
 * @param url 接口路径
 * @param data 数据注意是json格式的
 * @param msg 错误信息
 * @param rawheaders 请求头，在上面修改
 * @returns {Promise<AxiosResponse>} 返回的数据
 */
export const jsonPost = ({url, data, msg="接口异常"}) => {
    let jsonData = JSON.stringify(data);
    return axios.post(url, jsonData, rawheaders).then(res => {
        let resultData = res.data;
        if(resultData.code === "0"){
            return resultData.result;
        }else{
            Toast.offline(resultData.msg);
        }
    }).catch(err => {
        console.log(err);
        Toast.offline(msg);
    })
};

/**
 * 泽羚post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const zlPost = ({url, data, msg='接口异常', headers}) => {
    //将参数转成form形式
    let formData = new FormData();
    for(let key in data){
        formData.append(key, data[key])
    }
    return axios.post(url, formData, rawheaders).then(res => {
        let resultData = res.data;
        if(resultData.code === "0"){
            return resultData.result;
        }else{
            Toast.offline(resultData.msg);
        }
    }).catch(err => {
        console.log(err);
        Toast.offline(msg);
    })
};