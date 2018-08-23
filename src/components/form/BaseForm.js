import React from 'react';
import {Picker, List, InputItem, TextareaItem} from 'antd-mobile';
import Style from './BaseForm.less';

// 基础form表单组件，包括input输入框，picker选择框，现在只支持单选
class BaseForm extends React.Component {

    buildItem = (list, formObj) => {

        const { getFieldProps, getFieldError } = formObj;

        return list.map((item) => {
            if(item.type === 'input'){
                return (
                    <React.Fragment key={item.id}>
                        <div className={Style.formTitle}>{item.name}{(item.must)?(<span>*</span>):""}</div>
                        <InputItem
                            placeholder={`请输入${item.name}`}
                            error={!!getFieldError(item.id)}
                            {...getFieldProps(item.id, {
                                rules: [{required: item.must, message: `${item.name}不能为空`}]
                            })}
                        />
                    </React.Fragment>
                );
            }else if(item.type === 'picker'){
                return (
                    <Picker
                        data={item.value}
                        cols={1}
                        key={item.id}
                        {...getFieldProps(item.id, {
                            rules: [
                                { required: item.must, message: `请选择${item.name}` },
                            ],
                        })}
                    >
                        <List.Item arrow="horizontal">{item.name}</List.Item>
                    </Picker>
                );
            } else if(item.type === 'text'){
                return (
                    <React.Fragment key={item.id}>
                        <div className={Style.formTitle}>{item.name}{(item.must)?(<span>*</span>):""}</div>
                        <TextareaItem
                            labelNumber={5}
                            autoHeight
                            placeholder={`请输入${item.name}`}
                            {...getFieldProps(item.id, {
                                rules: [{required: item.must, message: `${item.name}不能为空`}]
                            })}
                        />
                    </React.Fragment>
                );
            } else {
                return ""
            }
        });
    };

    render() {

        const {itemList} = this.props;

        return (
            <div>
                <List style={{backgroundColor: 'white'}} className="picker-list">
                    {this.buildItem(itemList,this.props.form)}
                </List>
            </div>
        );
    }
}

export default BaseForm;
