import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { FaCog, FaSyncAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ChartWidget from "./ChartWidget/ChartWidget";
import { SETWD } from "./reducer/WDReducer";

function SuperCard({id,title,widgetType}){

    let widgetData = useSelector(state=>state.WDReducer.widgetData.find(val=>val.id===id))
    let dispatch = useDispatch()

    useEffect(()=>{
        if(!widgetData){
            dispatch({type : SETWD, value : {id,title,widgetType}})
        }
    },[widgetData])

    return(
        <Card className={(widgetData&&widgetData.id)||id}>
            <Card.Header className="p-2 pr-3 pl-3 mb-0 d-flex flex-row justify-content-between">
                <Card.Title className="m-0 font-weight-light text-nowrap text-truncate">
                    {title}
                </Card.Title>
                <div className="widget-options d-flex align-items-center">
                    <FaSyncAlt className="text-muted mr-3" style={{cursor : 'pointer'}}
                        onMouseOver={(e)=>e.target.classList.remove('text-muted')}
                        onMouseLeave={(e)=>e.target.classList.add('text-muted')}
                    />
                    <FaCog className="text-muted" style={{cursor : 'pointer'}}
                        onMouseOver={(e)=>e.target.classList.remove('text-muted')}
                        onMouseLeave={(e)=>e.target.classList.add('text-muted')}
                    />
                </div>
            </Card.Header>
            <Card.Body className="p-0 d-flex flex-column">
                {widgetData&&widgetData.widgetType&&widgetData.id?(
                    <Widget id={widgetData.id} widgetType={widgetData.widgetType} />
                ):null}
            </Card.Body>
        </Card>
    )
}

function Widget({id,widgetType}){
    if(widgetType==='chart'){
        return(<ChartWidget id={id}/>)
    }else if(widgetType==='board'){
        return(<></>)
    }else{
        return(<></>)
    }
}

export default SuperCard