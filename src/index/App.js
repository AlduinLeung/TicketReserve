import React,
{
   useCallback, memo,useMemo
}from 'react'
import './App.css'
import {connect} from 'react-redux'
import Header from '../common/header'
import DepartDate from './DepartDate'
import HighSpeed from './Highspeed'
import Journey from  './Journey'
import Submit from './Submit'
import {bindActionCreators} from 'redux'
import {h0} from '../common/fp'

import {
   exchangeFromTo,
   showCitySelector,
   hideCitySelector,
   setIsLoadingCityData,
   fetchCityData,
   setselectedCity,
   hideDateSelector,
   showDateSelector,
   setDepartDate,
   toggleHighSpeed,
} from './actions'

import CitySelector from '../common/CitySelector'
import DateSelector from '../common/DateSelector'


function App(props){
   const {
      from,to,dispatch,
      isCitySelectorVisible,
      cityData,
      isLoadingCityData,
      isDateSelectorVisible,
      departDate,
      highSpeed,
   }=props;




   const onBack=useCallback(()=>{
      window.history.back();
   },[]);


   //这里是CitySelectors的cbs
   const CitySelectorCbs=useMemo(()=>{
      return bindActionCreators({
         onBack:hideCitySelector,
         fetchCityData,
         onSelect:setselectedCity,
      },dispatch)
   },[])
   

   //开启/关闭日期选择浮层
   const dateSelectorCbs=useMemo(()=>{
      return bindActionCreators({
         onBack:hideDateSelector
      },dispatch)
   },[])


   //这里是Journey的CBS
   //将callback回调函数用memo包裹的同时并且用bindActionCreators函数将其合并
   const cbs=useMemo(() =>{
      return bindActionCreators({
         exchangeFromTo,
       showCitySelector,
      },dispatch)
   },[])



   //显示日期选择浮层的cbs
   const departDateCbs=useMemo(()=>{
      return  bindActionCreators({
         onClick:showDateSelector,
      },dispatch)
   },[])

   //选中日期时进行回填的dispatch
   const onSelectDate = useCallback((day) => {
      if (!day) {
          return;
      }

      if (day < h0()) {
          return;
      }
      dispatch(setDepartDate(day));
      dispatch(hideDateSelector())
  }, []);

   
  //只看高铁/动车的CBS
  const highSpeedCbs=useMemo(()=>{
     return bindActionCreators({
        toggle:toggleHighSpeed,
     },dispatch)
  },[])
   return(
      <div>
            <div className='header-wrapper'>
                  <Header title='火车票' onBack={onBack}/> 
            </div>
            <form action='./query.html' className="form">
                     <Journey 
                     from={from} to={to}
                     {...cbs}    //这里直接用解构语法进行赋值就行
                     /> 
                     <DepartDate 
                        time={departDate}
                       {...departDateCbs}
                     />
                     <HighSpeed 
                         highSpeed={highSpeed}
                        {...highSpeedCbs}
                     />
                     <Submit />
                     <CitySelector 
                        show={isCitySelectorVisible}   //show表示是否显示浮层
                        cityData={cityData}
                        isLoading={isLoadingCityData}    //isloding表示是否在加载数据
                        {...CitySelectorCbs}
                     />
                       <DateSelector 
                        show={isDateSelectorVisible}
                        {...dateSelectorCbs}
                        onSelect={onSelectDate}
                     /> 
               </form>
      </div>
   )
}

export default connect(
   function mapStateToProps(state){
      return state;
   },function mapDispatchToProps(dispatch){
      return {dispatch}
   }
)(App);