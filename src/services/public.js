import { formPost, zlGet, zlPost } from './tools';
import * as config from './api';
/**
 * mock测试
 * @param {Object} params 
 */
export const mockTest = (params) => formPost({
    url: config.MOCK.GET_AUDITEVENTLIST,
    data: params
})

/**
 * 获取首页数据
 */
export const getHomeData = () => zlGet({
    url: config.MOCK.GET_HOMEDATA
})

/**
 * 获取主体的详情
 */
export const getObjInfo = (params) => zlPost({
    url: config.MOCK.GET_SPACEINFO,
    data: params
})