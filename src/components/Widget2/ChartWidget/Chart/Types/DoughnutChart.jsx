import ChartJS from 'chart.js/auto'
import { useEffect } from "react"
import { Doughnut } from "react-chartjs-2"
import { useSelector } from "react-redux"
import { colorPalette } from '../Chart'

function DoughnutChart({id}){

    let widgetData = useSelector(state=>state.WDReducer.widgetData.find(val=>val.id===id))
    let tagsData = useSelector(state=>state.TDReducer.tagsData.find(val=>val.id===id))

    useEffect(()=>{
        if(widgetData&&tagsData&&JSON.stringify(widgetData.tagRequest)===JSON.stringify(tagsData.tagRequest)){
            let card = window.document.querySelector(`.chart-widget-${id}`)
            card.classList.remove('h-100')
            let chartArea = card.querySelector(`.chart-area`)
            chartArea.classList.remove('flex-grow-1')
        }
    },[widgetData,tagsData])

    if(tagsData&&tagsData.data&&widgetData&&widgetData.labels){
        return(
            <Doughnut 
                data={{
                    labels : tagsData.data.map((arr,i)=>(widgetData.labels&&widgetData.labels[i])||arr[0].tagName),
                    datasets : [{
                        data : tagsData.data.map(arr=>arr[0].value),
                        backgroundColor : colorPalette,
                        hoverOffset : 4
                    }]
                }}
                options={{
                    plugins : {
                        legend : {
                            labels : {
                                boxWidth : ChartJS.defaults.font.size
                            },
                            position : 'bottom'
                        }
                    },
                    animation : false
                }}
            />
        )
    }else{
        return(<></>)
    }
}

export default DoughnutChart