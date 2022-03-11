import ChartJS from 'chart.js/auto'
import { useEffect, useState } from "react"
import { Scatter } from "react-chartjs-2"
import { useSelector } from "react-redux"
import { analyzeUtils } from '../../Analyze/Analyze'
import { colorPalette } from "../Chart"

function ScatterChart({id}){
    
    let widgetData = useSelector(state=>state.WDReducer.widgetData.find(val=>val.id===id))
    let tagsData = useSelector(state=>state.TDReducer.tagsData.find(val=>val.id===id))
    let [nomalizeData,setNormalizeData] = useState([])

    useEffect(()=>{
        if(widgetData&&tagsData&&JSON.stringify(widgetData.tagRequest)===JSON.stringify(tagsData.tagRequest)){
            let card = window.document.querySelector(`.chart-widget-${id}`)
            card.classList.remove('h-100')
            card.classList.add('h-100')
            let chartArea = card.querySelector(`.chart-area`)
            chartArea.classList.remove('flex-grow-1')
            chartArea.classList.add('flex-grow-1');
            (async ()=>{
                let result = []
                for(let i=0;i<tagsData.data.length;i++){
                    result.push(await analyzeUtils.nor(tagsData.data[i]))
                }
                setNormalizeData(result)
            })()
        }
    },[widgetData,tagsData])

    if(tagsData&&tagsData.data&&widgetData&&widgetData.labels&&nomalizeData.length>0){
        return(
            <Scatter 
                data={{
                    datasets : nomalizeData.map((arr,i)=>({
                        label : widgetData.labels&&widgetData.labels[i]||(tagsData.data[i][0].tagName),
                        data : arr.map((val,j)=>({x : nomalizeData[0][j], y : val})),
                        backgroundColor : colorPalette[i]
                    }))
                }}
                options={{
                    scales : {
                        x : {
                            type: 'linear',
                            position: 'bottom',
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
                                padding : 10,
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
                                }
                            }
                        }
                    },
                    plugins : {
                        legend : {
                            labels : {
                                boxWidth : ChartJS.defaults.font.size
                            }
                        }
                    },
                    maintainAspectRatio : false,
                    animation : false
                }}
            />
        )
    }else{
        return(<></>)
    }
}

export default ScatterChart