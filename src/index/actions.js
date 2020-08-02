export const ACTION_SET_FROM='SET-FROMS';
export const ACTION_SET_TO='SET_TO';
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE='SET_IS_CITY_SELECTOR_VISIBLE';
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY='SET_CURRENT_SELECTING_LEFT_CITY';
export const ACTION_SET_CITY_DATA='SET_CITY_DATA';
export const ACTION_SET_IS_LOADING_CITY_DATA='SET_IS_LOADING_CITY_DATA';
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE='SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_HIGH_SPEED='SET_HIGH_SPEED';
export const ACTION_SET_DEPART_DATE='SET_DEPART_DATE'


//设置始发站
export function setFrom(from){
    return{
        type:ACTION_SET_FROM,
        payload:from,
    }
}
//设置到达站
export function setTo(to){
    return{
        type:ACTION_SET_TO,
        payload:to,
    }
}
//加载城市数据
export function isLoadingCityData(isLoadingCityData){
    return{
        type:ACTION_SET_IS_LOADING_CITY_DATA,
        payload:isLoadingCityData,
    }
}
//设置出发日期
export function setDepartDate(departDate){
    return{
        type:ACTION_SET_DEPART_DATE,
        paypoad:departDate
    }
}
//设置日期
export function setcityData(cityData){
    return{
        type:ACTION_SET_CITY_DATA,
        payload:cityData,
    }
}
export function toggleHighSpeed(){
    return (dispatch,getState)=>{
        const {highSpeed}=getState();
        dispatch({
            type:ACTION_SET_HIGH_SPEED,
            payload:!highSpeed,
        })
    }
}
//开启城市选择浮层
export function showCitySelector(currentSelectingLeftCity){   
     //通过异步action把两个操作绑定到一起showCitySelector
    return (dispatch)=>{
        dispatch({
            type:ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
            payload:true,
        })
        dispatch({
            type:ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
            payload:currentSelectingLeftCity,
        })
    }
}
//隐藏城市选择浮层
export function hideCitySelector(){
    return{
        type:ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
        payload:false,
    }
}

//设置城市,如果当前城市不存在的话就回填到当前城市，如果当前城市存在的话就填到终点站
export function setselectedCity(city){
    return (dispatch,getState)=>{
        const {currentSelectingLeftCity}=getState();
        if(!currentSelectingLeftCity){
            dispatch(setFrom(city));
        }else{
            dispatch(setTo(city))
        }
    }
}

//开启日期选择浮层
export function showDateSelector(){
    return{
        type:ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload:true,
    }
}
//隐藏日期选择浮层
export function hideDateSelector(){
    return{
        type:ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload:false,
    }
}

//交换始发站和终点站,将from和to的值都dispatch互换
export function exchangeFromTo(){
    return(dispatch,getState)=>{
        const {from,to}=getState();
        dispatch(setFrom(to));
        dispatch(setTo(from))
    }
}

