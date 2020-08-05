import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux'
import {h0} from '../common/fp'
import reducers from './reducer';
import thunk from 'redux-thunk';


import {ORDER_DEPART} from './constant'

//这里是从URL里获取到的参数，把他们创建成store
export default createStore(
    combineReducers(reducers),
    {
        from:null,        //URL中的起始车站的参数
        to:null,               //URL中到达的车站的参数
        departDate:h0(Date.now()), //URL中传入的日期
        highSpeed:false,        // URL中传入是否只看highspeed           
        trainList:[],            //         
        orderType:ORDER_DEPART,                //车票类型
        onlyTickets:false,        //只看有票
        ticketTypes:[],             //车票类型
        checkedTicketTypes:{},    //选中的车票类型
        trainTypes:[],            //车次类型
        departStations:{},        //始发站台
        checkedDepartStations:{},  //已经选中的始发站台
        arriveStations:[],        //到达站台
        checkedArriveStations:{},  //已经选中的到达站台
        departTimeStart:0,        //一天内的发车时间起始
        departTimeEnd:24,         //一天内的发车时间截止
        arriveTimeStart:0,        //一天内的到站时间起始
        arriveTimeEnd:24,         // 一天内的到站时间截止
        isFiltersVisible:false,    //筛选图层可见的flag
        searchParsed:false,        //浏览器解析地址栏的参数
    },
    applyMiddleware(thunk)
);