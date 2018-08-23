import React from 'react';
import {connect} from 'dva';
import {SearchBar} from 'antd-mobile';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    componentDidMount() {
        this.autoFocusInst.focus();
    }

    /**
     * 查询企业
     */
    searchEnt = (value) => {
        console.log(value);
        this.setState({
            value
        })
    }

    /**
     * 查询提示
     */
    searchHints = (value) => {
        //这里调用接口进行模糊查询提示
        console.log(value);
    }

    /**
     * 页面回退
     */
    pageBack() {
        //window.history.go(-1);
        const {dispatch} = this.props;
        dispatch({
            type: 'search/toHome',
            payload: {}
        })
    }

    render() {
        return (
            <SearchBar
                placeholder="搜索企业名称/注册号/法人/统一信用代码"
                ref={ref => this.autoFocusInst = ref}
                maxLength={20}
                onSubmit={value => this.searchEnt({value})}
                onChange={value => this.searchHints(value)}
                onCancel={() => this.pageBack()}
            />
        )
    }

}

const mapStateToProps = state => {
    return state
};

export default connect(mapStateToProps)(Search);
