import ChartJS from 'chart.js/auto'
import { Line } from "react-chartjs-2"
import { useSelector } from "react-redux"
import { colorPalette, ISOtoDATETIME } from "../Chart"
import ZoomPlugin from 'chartjs-plugin-zoom'
import { useEffect } from 'react'
ChartJS.register(ZoomPlugin)

function LineChart({id}){

    let widgetData = useSelector(state=>state.WDReducer.widgetData.find(val=>val.id===id))
    let tagsData = useSelector(state=>state.TDReducer.tagsData.find(val=>val.id===id))

    useEffect(()=>{
        if(widgetData&&tagsData&&JSON.stringify(widgetData.tagRequest)===JSON.stringify(tagsData.tagRequest)){
            let card = window.document.querySelector(`.chart-widget-${id}`)
            card.classList.remove('h-100')
            card.classList.add('h-100')
            let chartArea = card.querySelector(`.chart-area`)
            chartArea.classList.remove('flex-grow-1')
            chartArea.classList.add('flex-grow-1')
        }
    },[widgetData,tagsData])

    if(tagsData&&tagsData.data&&widgetData&&widgetData.labels){
        return(
            <Line 
                data={{
                    labels : tagsData.data[0].map(val=>ISOtoDATETIME(val.timestamp)),
                    datasets : tagsData.data.map((arr,i)=>({
                        label : widgetData.labels&&widgetData.labels[i]||arr[0].tagName,
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
                options={{
                    scales : {
                        x : {
                            grid : {
                                tickLength : 0
                            },
                            ticks : {
                                font : {
                                    size : 10
                                },
                                autoSkip : true,
                                maxRotation : 0,
                                minRotation : 0,
                                padding : 3,
                                align : 'start',
                                maxTicksLimit : 10,
                                display : false
                            }
                        },
                        y : {
                            grid : {
                                tickLength : 0
                            },
                            ticks : {
                                font : {
                                    size : 10
                                },
                                padding : 3
                            }
                        }
                    },
                    plugins : {
                        legend : {
                            labels : {
                                boxWidth : ChartJS.defaults.font.size
                            }
                        },
                        zoom : {
                            zoom : {
                                wheel : {
                                    enabled : true,
                                    modifierKey : 'ctrl'
                                },
                                pinch : {
                                    enabled : true
                                },
                                drag : {
                                    enabled : true,
                                    backgroundColor : 'rgba(0,0,0,0.5)',
                                    modifierKey : 'ctrl',
                                },
                                mode : 'x'
                            },
                            pan : {
                                enabled : true,
                                mode : 'x'
                            }
                        }
                    },
                    maintainAspectRatio : false,
                    animation : false
                }}
            />
        )
    }else{
        return(
            <></>
        )
    }
}

export default LineChart