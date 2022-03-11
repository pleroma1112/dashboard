import { Line } from "react-chartjs-2"
import { useSelector } from "react-redux"
import utils from "../../../models/utils"

function ChartType({tagsData,chartType}){
    if(chartType==='line'){
        return(
            <LineChart tagsData={tagsData}/>
        )
    }else if(chartType==='bar'){
        return(<></>)
    }else if(chartType==='doughnut'){
        return(<></>)
    }else if(chartType==='scatter'){
        return(<></>)
    }else{
        return(<></>)
    }
}

function LineChart({tagsData}){
    const colorPalette = ["#7eb0d5", "#fd7f6f", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"]
    return(
        <Line 
            data={{
                labels : tagsData[0].map(val=>utils.ISOtoDateTime(val.timestamp)),
                datasets : tagsData.map((arr,i)=>({
                    label : arr[0].tagName,
                    data : arr.map(val=>val.value),
                    fill : false,
                    backgroundColor : colorPalette[i],
                    borderColor : colorPalette[i],
                    borderWidth : 1,
                    pointRadius : 0,
                    potinHoverRadius : 5,
                    pointHitRadius : 10
                }))
            }}
        />
    )
}

export default ChartType