import React from 'react';
import style from './EntItem.less';
import {Card} from 'antd-mobile';

/**
 * 接收列表数据，以及一个点击方法
 */
class EntItem extends React.Component {

    itemClick(id) {
        this.props.itemClick(id)
    }

    render() {

        const {rowData} = this.props;

        return (
            <Card full key={rowData.spaceid} onClick={() => this.itemClick(rowData.spaceid)}>
                <Card.Body>
                    {/* 左侧 */}
                    <div className={style.zlleft}>
                        <img src={rowData.objphoto} alt="" className={style.zlimg}/>
                    </div>
                    {/* 右侧 */}
                    <div style={{marginLeft: '110px'}}>
                        <p className={style.zlp}>{rowData.spacename}</p>
                        <p className={style.zlspan}>提交人：{rowData.updateuser}</p>
                        <p className={style.zlspan}>更新时间：{rowData.updatetime}</p>
                        <p className={style.zlmp}>{rowData.gpsaddress}</p>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default EntItem;
