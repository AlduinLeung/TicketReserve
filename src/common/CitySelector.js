import React ,{useState,useMemo,useEffect,memo}from 'react'
import './CitySelector.css';
import '../index/index.css'
import  propTypes from 'prop-types'
import classnames from 'classnames'
import { fetchCityData } from '../index/actions';



//单个城市的小组件
const CityItem=memo(function CityItem(props){
    const{
        name,onSelect
    }=props;

    return(
        <li className="city-li" onClick={()=>onSelect(name)}>
            {name}
        </li>
    )
});
CityItem.propTypes={
    name:propTypes.string.isRequired,
    onSelect:propTypes.func.isRequired,
}   


//按照字母分块的城市集合
const CitySelection=memo(function CitySelection(props){
    const {
        title,
        cities=[],
        onSelect,
    }=props;
    return(
        <ul className="city-ul">
            <li className='city-li' key='title' data-cate={title}>
                {title}
            </li>
            {
                cities.map(city=>{
                    return <CityItem 
                    key={city.name} 
                    name={city.name}
                    onSelect={onSelect}
                    />
                })
            }
        </ul>
    )
});

CitySelection.prototype={
    title:propTypes.string.isRequired,
    cities:propTypes.array,
    onSelect:propTypes.func.isRequired,
}


const alphabet=Array.from(new Array(26),(ele,index)=>{
    return String.fromCharCode(65+index);
})
const AlphaIndex=memo(function AlphaIndex(props){
    const {
        alpha,
        onClick
    }=props;
    return (
        <i className='city-index-item' onClick={()=>onClick(alpha)}>
            {alpha}
        </i>
    )
})
AlphaIndex.propTypes={
    alpha:propTypes.string.isRequired,
    onClick:propTypes.func.isRequired,
}
//城市列表
const CityList=memo(function CityList(props){
    const {
        sections,
        onSelect,
        toAlpha
    }=props;
    return(
        <div className='city-list'>
            <div className='city-cate'>
                {
                    sections.map(section=>{
                        return(
                            <CitySelection 
                            title={section.title}
                            cities={section.citys}
                            key={section.title}
                            onSelect={onSelect}
                            />
                        )
                    })
                }
            </div>
            <div className="city-index">
                {
                    alphabet.map(alpha=>{
                        return (
                            <AlphaIndex  
                            key={alpha} 
                            alpha={alpha} 
                            onClick={toAlpha}/>
                    )})
                }
            </div>
        </div>
    )
});
CityList.propTypes={
    sections:propTypes.array.isRequired,
    onSelect:propTypes.func.isRequired,
    toAlpha:propTypes.func.isRequired,
}





//搜索建议的具体条目
const SuggestItem=memo(function SuggestItem(props){
    const {
        name,onClick,
    }=props;
    return(
        <div className="city-suggest-li" onClick={()=>onClick(name)}>
            {name}
        </div>
    )
})
SuggestItem.propTypes={
    name:propTypes.string.isRequired,
    onClick:propTypes.func.isRequired,
}

//搜索建议框
const Suggest=memo(function Sugges(props){
    const {
        searchKey,
        onSelect,
    }=props;    

    const [result,setResult]=useState([]);
    useEffect(()=>{
        fetch('/rest/search?key='+encodeURIComponent(searchKey))
            .then(res=>res.json())
            .then(data=>{
                const {result,searchKey:sKey}=data;
                if(sKey===searchKey){
                    setResult(result);
                }
            })
    },[searchKey]);

    const fallBackResult=result.length?result:[{display:searchKey}];
    return(
        <div className='city-suggest'>
            <ul className='city-suggest-url'>
                {
                    result.map(item=>{
                        return(
                            <SuggestItem 
                            key={item.display}
                            name={item.display}
                            onClick={onSelect}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )

})
Suggest.propTypes={
    name:propTypes.string.isRequired,
    onSelect:propTypes.func.isRequired,
}


//整个城市的大组件
const CitySelector=memo(function CitySelector(props){
    const {
        show,
        cityData,
        isLoading,
        onBack, //由上级组件决定返回的是什么
        fetchCityData,
        onSelect
    }=props;

    // classnames('city-selector',{    //引入第三方模块，当!show条件成立时hidden会被加入到classnames中
    //     hidden:!show,    
    // });

    const [searchKey,setSearchKey]=useState('');
    const key=useMemo(()=>searchKey.trim(),[searchKey]);

    useEffect(()=>{     
        if(!show||cityData||isLoading){   //直接返回不需要进行异步
            return
        }
        fetchCityData();
    },[show,isLoading,cityData])




    const outPutCitySections=()=>{
        if(isLoading){
            return <div>loading</div>
        }
        if(cityData){
            return (
                <CityList
                sections={cityData.cityList}
                onSelect={onSelect}
                toAlpha={toAlpha}
                />
            )
        }
        return <div>Error</div>
    }

    const toAlpha=alpha=>{
        document.querySelector(`[data-cate=${alpha}]`).scrollIntoView();
    }

    return(
        <div className={classnames('city-selector',{hidden:!show})}>
            <div className='city-search'>
                    <div className='search-back' onClick={()=>onBack()}>
                        <svg width="42" height="42">
                            <polyline 
                            points='25,13 16,21 25,29'
                             stroke="#fff"
                             strokeWidth="2"
                             fill="none" 
                            />
                        </svg>
                        </div>
                        <div className="search-input-wrapper">
                            <input 
                            className="search-input"
                            type="text"
                            value={searchKey}
                            placeholder="城市、车站的中文或拼音"
                            onChange={e=>setSearchKey(e.target.value)}
                            />
                        </div>
                        <i 
                        onClick={()=>setSearchKey('')}
                        className={classnames('search-clean',{hidden:key.length===0})}
                        >
                            &#xf063;
                        </i>
            </div>
            {
                Boolean(key)&&(
                    <Suggest 
                        searchKey={key}
                        onSelect={key=>onSelect(key)}
                    />
                )
            }
            {outPutCitySections()}
        </div>
    )
});
CitySelector.propTypes={
    show:propTypes.bool.isRequired,
    cityData:propTypes.object,
    isLoading:propTypes.bool.isRequired,
    onBack:propTypes.func.isRequired,
    fetchCityData:propTypes.func.isRequired,
    onSelect:propTypes.func.isRequired,
}
export default CitySelector