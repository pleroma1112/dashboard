import LineChart from "./chart-type/LineChart"
import BarChart from "./chart-type/BarChart"
import DoughnutChart from "./chart-type/DoughnutChart"
import PieChart from "./chart-type/PieChart"
import ScatterChart from "./chart-type/ScatterChart"

function Chart({type, tagsData, labels}){//type 별로 분배

    const colorPalette = ["#7eb0d5", "#fd7f6f", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"]

    if(type==='line'){
        return(
            <LineChart className='w-100' tagsData={tagsData} labels={labels} colorPalette={colorPalette}/>
        )
    }else if(type==='bar'){
        return(
            <BarChart tagsData={tagsData} labels={labels} colorPalette={colorPalette}/>
        )
    }else if(type==='doughnut'){
        return(
            <DoughnutChart tagsData={tagsData} labels={labels} colorPalette={colorPalette}/>
        )
    }else if(type==='pie'){
        return(
            <PieChart tagsData={tagsData} labels={labels} colorPalette={colorPalette}/>
        )
    }else if(type==='scatter'){
        return(
            <ScatterChart tagsData={tagsData} labels={labels} colorPalette={colorPalette}/>
        )
    }
    return(
        <></>
    )
}

export default Chart