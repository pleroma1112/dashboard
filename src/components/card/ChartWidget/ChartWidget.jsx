import { useState } from "react"
import { useEffect } from "react"
import { Button } from "react-bootstrap"
import { Line } from "react-chartjs-2"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import api from "../../../models/api"
import { SETTD } from "../reducer/TDReducer"
import { SETWD } from "../reducer/WDReducer"
import ChartType from "./ChartType"

function ChartWidget({id}){

    let widgetData = useSelector(state=>state.WDReducer.widgetData.find(val=>val.id===id))
    let tagsData = useSelector(state=>state.TDReducer.tagsData.find(val=>val.id===id))
    let dispatch = useDispatch()

    useEffect(()=>{
        if(widgetData&&widgetData.tagsRequest){
            let WDTQ = JSON.stringify(widgetData.tagsRequest)
            let TDTQ = JSON.stringify((tagsData&&tagsData.tagsRequest)||null)
            if(WDTQ!==TDTQ){
                let {tagNames, startTime, endTime, stepSizeSec} = widgetData.tagsRequest
                api.getTagsData(tagNames, startTime, endTime, stepSizeSec).then(data=>{
                    dispatch({type : SETTD, value : {id,data,tagsRequest : widgetData.tagsRequest}})
                })
            }
        }else{
            dispatch({type : SETWD, value : {...widgetData,tagsRequest : defaultRequest(),chartType : 'line'}})
        }
    },[widgetData])

    return(
        <div className="chart-area">
            {widgetData&&widgetData.id&&widgetData.chartType&&tagsData?(
                <ChartType tagsData={tagsData.data} chartType={widgetData.chartType}/>
            ):null}
            <Button onClick={()=>{
                dispatch({type : SETWD, value : {...widgetData,tagsRequest : {
                    tagNames : ['test.pv'],
                    startTime : new Date('2022-02-01 00:00:00').toISOString(),
                    endTime : new Date('2022-02-02 00:00:00').toISOString(),
                    stepSizeSec : '60'
                }}})
            }}>change</Button>
        </div>
    )
}

const defaultRequest = ()=>{
    let now = new Date().toISOString()
    let yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate()-1)
    yesterday = yesterday.toISOString()
    return {
        tagNames : ['I.G1.300:FC015.PV'],
        startTime : yesterday,
        endTime : now,
        stepSizeSec : '900'
    }
}

export default ChartWidget