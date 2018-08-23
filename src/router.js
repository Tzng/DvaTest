import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({history, app}) {

    // 使用dynamic进行代码拆分
    const Home = dynamic({
        app,
        models: () => [import('./models/home')],
        component: () => import('./routes/home')
    });

    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={Home}/>
            </Switch>
        </Router>
    );
}

export default RouterConfig;
