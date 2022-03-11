import ChartJS from 'chart.js/auto'
import { Scatter } from 'react-chartjs-2'
import utils from '../../../../models/utils'
import { useState, useEffect } from 'react'

function ScatterChart({tagsData, labels, colorPalette}){

    let [norTagsData,setNorTagsData] = useState(utils.aoa.normalize(tagsData.map(arr=>arr.map(tag=>tag.value))))
    
    useEffect(()=>{
        setNorTagsData(utils.aoa.normalize(tagsData.map(arr=>arr.map(tag=>tag.value))))
    },[tagsData])

    return(
        <Scatter 
            data={{
                datasets : norTagsData.map((arr,i)=>({
                    label : (labels&&labels[i])||(tagsData[i][0].tagName),
                    data : arr.map((val,j)=>({x : norTagsData[0][j], y : val})),
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
}

export default ScatterChart