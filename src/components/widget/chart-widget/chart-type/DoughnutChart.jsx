import ChartJS from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'

function DoughnutChart({tagsData, labels, colorPalette}){
    return(
        <Doughnut
            data={{
                labels : tagsData.map((arr,i)=>(labels&&labels[i])||arr[0].tagName),
                datasets : [{
                    data : tagsData.map(arr=>arr[0].value),
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
}

export default DoughnutChart