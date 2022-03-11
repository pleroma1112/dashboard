import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import api from "../../Models/API"
import { SETTD } from "../../Reducers/TDReducer"
import BarChart from "./Types/BarChart"
import DoughnutChart from "./Types/DoughnutChart"
import LineChart from "./Types/LineChart"
import ScatterChart from "./Types/ScatterChart"

export const LINE = 'chart-type-line'
export const BAR = 'chart-type-bar'
export const DOUGHTNUT = 'chart-type-doughnut'
export const SCATTER = 'chart-type-scatter'
export const colorPalette = ["#7eb0d5", "#fd7f6f", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"]
export const ISOtoDATETIME = (ISOString)=>{
    let date = new Date(ISOString)
    let Y = date.getFullYear()
    let M = date.getMonth() + 1
    let D = date.getDate()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    return `${Y}-${M}-${D} ${h}:${m}:${s}`
}
export const DefaultChartRequest = ()=>{
    let tagNames = ['I.G1.300:FC015.PV']
    let endTime = new Date().toISOString()
    let startTime = new Date(endTime)
    startTime.setDate(startTime.getDate()-1)
    startTime = startTime.toISOString()
    let stepSizeSec = 900
    return {
        tagNames,
        startTime,
        endTime,
        stepSizeSec
    }
}

function Chart({id}){

    let widgetData = useSelector(state=>state.WDReducer.widgetData.find(val=>val.id===id))
    let tagsData = useSelector(state=>state.TDReducer.tagsData.find(val=>val.id===id))
    let dispatch = useDispatch()
    let [loaded,setLoaded] = useState(tagsData?true:false)
    
    useEffect(()=>{
        if(widgetData&&widgetData.tagRequest){
            if(!tagsData||JSON.stringify(widgetData.tagRequest)!==JSON.stringify(tagsData.tagRequest)){
                setLoaded(false)
                api.requestTagData(widgetData.tagRequest).then(data=>{
                    let wrongTag = data.findIndex(arr=>arr.length===0)
                    if(wrongTag!==-1){
                        wrongTag = widgetData.tagRequest.tagNames[wrongTag]
                        window.alert(`'${wrongTag}'는 잘못된 태그명 이거나 없는 태그 입니다.`)
                    }else{
                        dispatch({type : SETTD, value : {
                            id,
                            data,
                            tagRequest : widgetData.tagRequest
                        }})
                    }
                    setLoaded(true)
                })
            }else{
                setLoaded(false)
                setTimeout(()=>setLoaded(true),300)
            }
        }
    },[widgetData&&widgetData.tagRequest,widgetData&&widgetData.reload])
    
    if(loaded){
        if(widgetData&&widgetData.type===LINE){
            return(
                <LineChart id={id}/>
            )
        }else if(widgetData&&widgetData.type===BAR){
            return(
                <BarChart id={id}/>
            )
        }else if(widgetData&&widgetData.type===DOUGHTNUT){
            return(
                <DoughnutChart id={id}/>
            )
        }else if(widgetData&&widgetData.type===SCATTER){
            return(
                <ScatterChart id={id}/>
            )
        }else{
            return(
                <></>
            )
        }
    }else{
        return(
            <div className="h-100 d-flex flex-row justify-content-center align-items-center" style={{minHeight : 150 + 'px', backgroundColor : 'rgba(0,0,0,0.5)'}}>
                <Spinner animation="border" variant="light"/>
            </div>
        )
    }
}

export default Chart