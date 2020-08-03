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


import {
   exchangeFromTo,
   showCitySelector,
   hideCitySelector,
   setIsLoadingCityData,
   fetchCityData,
   setselectedCity
} from './actions'

import CitySelector from '../common/CitySelector'

function App(props){
   const {
      from,to,dispatch,
      isCitySelectorVisible,cityData,isLoadingCityData,
      
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
   


   //这里是Journey的CBS
   //将callback回调函数用memo包裹的同时并且用bindActionCreators函数将其合并
   const cbs=useMemo(() =>{
      return bindActionCreators({
         exchangeFromTo,
       showCitySelector,
      },dispatch)
   },[])


   return(
      <div>
            <div className='header-wrapper'>
                  <Header title='火车票' onBack={onBack}/> 
            </div>

            
            <form className="form">
                     <Journey 
                     from={from} to={to}
                     {...cbs}    //这里直接用解构语法进行赋值就行
                     />

                     <DepartDate />


                     <HighSpeed />


                     <Submit />


                     <CitySelector 
                        show={isCitySelectorVisible}   //show表示是否显示浮层
                        cityData={cityData}
                        isLoading={isLoadingCityData}    //isloding表示是否在加载数据
                        {...CitySelectorCbs}
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