import ChartWidget from '../chart-widget/ChartWidget'
import BoardWidget from '../board-widget/BoardWidget'

function Widget({widgetType,props}){
    if(widgetType==='ChartWidget'){
        return(
            <ChartWidget {...props}/>
        )
    }else if(widgetType==='BoardWidget'){
        return(
            <BoardWidget {...props}/>
        )
    }else{
        return(<></>)
    }
}

export default Widget