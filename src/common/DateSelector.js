import React from 'react'
import './DateSelector.css'
import '../index/index.css'
import propTypes from 'prop-types'
import classnames from 'classnames'
import Header from './header'
import {h0} from '../common/fp'


//月份组件
function Month(props){
    const {
        startingTimeInMonth,onSelect,
    }=props;
    const startDay=new Date(startingTimeInMonth);    //创建每个月的第一天
    const currentDay=new Date(startingTimeInMonth);     //创建当前日期
    let days=[];

    while(currentDay.getMonth()===startDay.getMonth()){   //当日期递增没有越界到下一个月时，把日期push到数组中
        days.push(currentDay.getTime());
        currentDay.setDate(currentDay.getDate()+1);
    }
    //getday方法获取到的是星期几,前面的补齐操作然后对每个月1号空出的部分填入null
    days=new Array(startDay.getDay()?startDay.getDay()-1:6).fill(null).concat(days); 

    //填入每个月最后的空缺
    const lastDay=new Date(days[days.length-1]);
    days=days.concat(new Array(lastDay.getDay()?7-lastDay.getDay():0).fill(null));

    //按照星期进行分组
   const weeks=[];
   for(let row=0;row<days.length/7;++row){
        const week=days.slice(row*7,(row+1)*7);
        weeks.push(week);
   }


    return(
        <table className='date-table'> 
            <thead>
                <tr>
                    <td colSpan='7'>
                            <h5>
                                    {startDay.getFullYear()}年{startDay.getMonth()+1}月
                                
                            </h5>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className='date-table-weeks'>
                    <th>周一</th>
                    <th>周二</th>
                    <th>周三</th>
                    <th>周四</th>
                    <th>周五</th>
                    <th className='weekend'>周六</th>
                    <th className='weekend'>周日</th>
                </tr>
                {
                    weeks.map((week,idx)=>{
                        return(
                            <Week 
                            key={idx}
                            days={week}
                            onSelect={onSelect}
                            />
                        )
                    })
                }
            </tbody>
        </table>
    )
}
Month.propTypes={
    startingTimeInMonth:propTypes.number.isRequired,
    onSelect:propTypes.func.isRequired

}
//具体某一天的组件
function Day(props){
    const {day,onSelect}=props;

    if(!day){
        return <td className="null"></td>
    }

    const classes=[];

    const now=h0();
    if(day<now){
        classes.push('disabled')
    }   
    if([6,0].includes(new Date(day).getDay())){
        classes.push('weekend')
    }
    const dateString=now===day?'今天':new Date(day).getDate()   
    return(
            <td className={classnames(classes)} onClick={() => {
                console.log(day)
                onSelect(day)}}>
                { dateString }
            </td>
       
    )
}
Day.propTypes={
    days:propTypes.number,
    onSelect:propTypes.func.isRequired,
}
//星期组件
function Week(props){
    const {
        days,
        onSelect
    }=props
    return(
        <tr className="date-table-days">
                {
                    days.map((day,idx)=>{
                        return <Day 
                            key={idx}
                            day={day}
                            onSelect={onSelect}
                        />
                    })
                }
        </tr>
    )
}
Week.propTypes={
    days:propTypes.array.isRequired,
    onSelect:propTypes.func.isRequired,
}


export default function DateSelector(props){
    const {
        show,
        onSelect,
        onBack,
    }=props;

    const now=new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setDate(1);

   const monthSequence =[now.getTime()];
    now.setMonth(now.getMonth()+1);
    monthSequence.push(now.getTime())

    now.setMonth(now.getMonth()+1);
    monthSequence.push(now.getTime());


    return (
        <div className={classnames('date-selector',{hidden:!show})}>
            <Header title="日期选择" onBack={onBack}/>
            <div className='date-selector-tables'>
                {
                    monthSequence.map(month=>{
                        return (
                            <Month 
                            key={month}
                            onSelect={onSelect}
                            startingTimeInMonth={month}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
DateSelector.propTypes={
    show:propTypes.bool.isRequired,
    onSelect:propTypes.func.isRequired,
    onBack:propTypes.func.isRequired,
}