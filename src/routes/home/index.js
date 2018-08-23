import React from 'react';
import {connect} from 'dva';
import {TabBar} from 'antd-mobile';
import './index.less';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'blueTab',//设置选择的table
            hidden: false,//标签栏是否隐藏
            fullScreen: false,//全屏？
        };
    }

    // 组件初始化时创建
    componentDidMount() {
        this.getHomeData()
    }

    /**
     * 获取首页数据
     */
    getHomeData = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'home/getHomeData',
            payload: {}
        })
    }

    render() {

        const {newEntNum} = this.props.home;

        return (
            /* 设置整个body的高度 */
            <div style={{position: 'fixed', height: '100%', width: '100%', top: 0}}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="首页"
                        key="entlist"
                        icon={
                            <div className="icon iconfont icon-home" style={{fontSize: 20}}/>
                        }
                        selectedIcon={
                            <div className="icon iconfont icon-home" style={{fontSize: 20, color: '#33a3f4'}}/>
                        }
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                        }}
                    >
                        <div>你好</div>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div className="icon iconfont icon-user" style={{fontSize: 20}}/>
                        }
                        selectedIcon={
                            <div className="icon iconfont icon-user" style={{fontSize: 20, color: '#33a3f4'}}/>
                        }
                        title="我的"
                        key="my"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
                            });
                        }}
                    >
                        <div>我的</div>
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};

export default connect(mapStateToProps)(Home);
