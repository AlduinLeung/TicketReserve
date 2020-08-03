import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux'

import reducers from './reducer';
import thunk from 'redux-thunk';

export default createStore(
    combineReducers(reducers,+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),  //数据结构设计
    {
        from:'北京', //始发站城市
        to:'上海',    //终到站城市
        isCitySelectorVisible:false, //城市选择浮层
        departDate:null,
        currentSelectingLeftCity:false, //回填数据
        cityData:null,    //弹出浮层按需加载，弹出的浮层上的数据
        isLoadingCityData:false,//是否正在加载城市数据
        isDateSelectorVisible:false, //日期选择浮层的开关
        highSpeed:false, //是否选择高铁动车
    },
    applyMiddleware(thunk)
);