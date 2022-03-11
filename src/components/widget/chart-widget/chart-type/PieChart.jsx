import ChartJS from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'

function PieChart({tagsData, labels, colorPalette}){
    return(
        <Pie 
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
                        }
                    }
                },
                maintainAspectRatio : false,
                animation : false
            }}
        />
    )
}

export default PieChart