import * as publisServer from '../services/public';
import {routerRedux} from 'dva/router';

export default {

    namespace: 'home',

    state: {
        newEntNum: 0, // 新的企业数量
        objResult: {
            objList: [], // 列表数据容器
            pages: 0, //总页码
            pagenum: 1, // 初始页码
            finish: false, // 是否还有数据
            loading: false,
        }, // 主体数组
    },

    subscriptions: {
        setup({dispatch, history}) {  // eslint-disable-line
        },
    },

    effects: {

        // 获取首页数据
        * getHomeData({payload}, {call, put}) {
            //使用call来获取数据
            const hoemDate = yield call(publisServer.getHomeData, {});
            yield put({
                type: 'save', payload: {
                    newEntNum: hoemDate.newEntNum
                }
            })
        },

        // 获取主体列表
        * getObjList({payload}, {call, put}) {
            let objResult = {};
            let {params, datatype} = payload;
            //使用call来获取数据
            const result = yield call(publisServer.mockTest, params);
            // 判断是否还有数据，检测你的下一页是否还在
            if (params.pagenum <= result.pages) {
                objResult.finish = true;
                objResult.objList = result.objlist;
            } else {
                objResult.finish = false;
                objResult.objList = [];
            }
            // 如果两个刚好相等，那就说明没有数据了
            if (params.pagenum === result.pages) {
                objResult.finish = false;
            }
            // 还有数据
            objResult.pagenum = result.current;
            objResult.pages = result.pages;
            objResult.type = datatype;
            yield put({
                type: 'save', payload: {
                    objResult: objResult
                }
            })
        },

        /**打开搜索框 */* openSearch({payload}, {put}) {
            yield put(routerRedux.push('/entsearch'));
        },

        /**查看详情 */* showDetails({payload}, {put}) {
            let url = '/showent/' + payload.objid;
            yield put(routerRedux.push(url));
        }
    },

    reducers: {
        save(state, action) {
            return {...state, ...action.payload};
        },
    },

};
