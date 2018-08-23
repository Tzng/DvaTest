/**
 * @author tangbin
 * @date 2018/7/10-20:13
 * @descriptions:
 */
import React from 'react';
import {Map} from 'react-amap';

class Address extends React.Component {

    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            what: '点击地图开始绘制',
            draggable: false,
            pointObj: null,
            point: null,
            pgypoint: {longitude: 116.1950433254, latitude: 39.9302372629}//苹果园坐标
        };
        //地图事件
        this.mapEvents = {
            //构建后触发
            created: (mapInstance) => {
                console.log('高德地图 Map 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
                console.log(mapInstance.getZoom());
                self.map = mapInstance;
                let AMap = window.AMap;
                AMap.plugin('AMap.Geocoder', () => {
                    self.geocoder = new AMap.Geocoder({
                        city: "010"//城市，默认：“全国”
                    });
                });
                // 定义地图
                const map = new AMap.Map('container', {
                    resizeEnable: true
                });
                // 监听定位
                AMap.plugin('AMap.Geolocation', function() {
                    let geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000, //超过10秒后停止定位，默认：无穷大
                        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                        buttonPosition:'RB'
                    });
                    map.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, 'complete', self.onComplete);//返回定位信息
                    AMap.event.addListener(geolocation, 'error', self.onError); //返回定位出错信息
                });
            },
        };
        this.pgypoint = {longitude: 116.1950433254, latitude: 39.9302372629};//苹果园坐标
    }

    // 定位信息
    onComplete = (data) => {
        this.props.onComplete(data);
        console.log(data);
    };

    // 错误信息
    onError = (data) => {
        alert('获取位置信息出错');
    };

    // 坐标转地理信息
    pointToAddress = (lnglat, e) => {
        this.geocoder && this.geocoder.getAddress(lnglat, (status, result) => {
            let text = "";
            console.log(result);
            this.mapAddress(result, e);
            // 在地图上显示一个点
            if (status === 'complete') {
                if (result.regeocode) {
                    text = `您当前所选择的坐标位置是 {${result.regeocode.formattedAddress || '未知地点'}}`;
                } else {
                    text = '未知地点';
                }
            } else {
                text = '未知地点';
            }
            this.setState({
                what: text
            });
        });
    };

    // 地址-》坐标
    addressToPoint = (address) => {
        let _this = this;
        // 地址解析
        _this.geocoder.getLocation(address, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                console.log(result);
                // 构建坐标点
                _this.setState({
                    point: result.geocodes[0].location,
                    pgypoint: {longitude: result.geocodes[0].location.lng, latitude: result.geocodes[0].location.lat}
                });
                // 构建坐标
                let pointobj = {
                    lnglat: {
                        lat: result.geocodes[0].location.lat,
                        lng: result.geocodes[0].location.lng
                    }
                };
                result["regeocode"] = {
                    formattedAddress: address
                };
                _this.mapAddress(result, pointobj);
            }
        });
    };

    render() {

        let {point, pgypoint} = this.state;

        return (
            <div style={{display: 'none'}}>
                <Map
                    amapkey="be89e5407529b1ce15528401cdcfd943"
                    center={pgypoint}
                    zoom={15}
                    events={this.mapEvents}
                    version={"1.4.7"}
                >
                </Map>
            </div>
        )
    }
}

export default Address;
