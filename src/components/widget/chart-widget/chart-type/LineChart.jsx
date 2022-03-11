import ChartJS from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import utils from '../../../../models/utils'
import ZoomPlugin from 'chartjs-plugin-zoom'
ChartJS.register(ZoomPlugin)

function LineChart({tagsData, labels, colorPalette}){

    return(
        <Line 
            data={{
                labels : tagsData[0].map(val=>utils.ISOtoDateTime(val.timestamp)),
                datasets : tagsData.map((arr,i)=>({
                    label : (labels&&labels[i])||arr[0].tagName,
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
}

export default LineChart