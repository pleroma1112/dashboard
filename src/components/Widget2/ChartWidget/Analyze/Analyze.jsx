import { useEffect, useState } from "react";
import { Card, Nav, Container, Row, Col, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

export const analyzeUtils = {
    sum : (tagDataArray)=>{
        return new Promise(resolve=>resolve(tagDataArray.map(tag=>tag.value).reduce((p,c)=>p+c)))
    },
    avg : (tagDataArray)=>{
        return new Promise(resolve=>{
            analyzeUtils.sum(tagDataArray).then(result=>resolve(result/tagDataArray.length))
        })
    },
    var : (tagDataArray)=>{
        return new Promise(resolve=>{
            analyzeUtils.avg(tagDataArray).then(avg=>{
                resolve(tagDataArray.map(tag=>tag.value).reduce((p,c)=>({...p,devi : p.devi.concat(c-p.avg)}),{devi:[],avg}).devi.map(val=>Math.pow(val,2)).reduce((p,c)=>p+c)/tagDataArray.length)
            })
        })
    },
    std : (tagDataArray)=>{
        return new Promise(resolve=>{
            analyzeUtils.var(tagDataArray).then(vari=>{
                resolve(Math.sqrt(vari))
            })
        })
    },
    max : (tagDataArray)=>{
        return new Promise(resolve=>resolve(tagDataArray.map(tag=>tag.value).reduce((p,c)=>p<c?c:p)))
    },
    min : (tagDataArray)=>{
        return new Promise(resolve=>resolve(tagDataArray.map(tag=>tag.value).reduce((p,c)=>p>c?c:p)))
    },
    nor : (tagDataArray)=>{
        return new Promise(resolve=>{
            analyzeUtils.max(tagDataArray).then(max=>{
                analyzeUtils.min(tagDataArray).then(min=>{
                    resolve(tagDataArray.map(tag=>(tag.value-min)/(max-min)))
                })
            })
        })
    }
}

export async function getAnalyzeData(data,analyzeFn){
    let result = []
    for(let i=0;i<data.length;i++){
        result.push(await analyzeFn(data[i]))
    }
    return result
}

function Analyze({id}){

    let widgetData = useSelector(state=>state.WDReducer.widgetData.find(val=>val.id===id))
    let tagsData = useSelector(state=>state.TDReducer.tagsData.find(val=>val.id===id))
    let [analyzeData,setAnalyzeData] = useState({
        sum : [],
        avg : [],
        var : [],
        std : [],
        max : [],
        min : []
    })
    let [tab,setTab] = useState(0)
    let [loaded,setLoaded] = useState(false)

    useEffect(()=>{
        setTab(0)
    },[widgetData])

    useEffect(()=>{
        if(widgetData&&widgetData.analyze&&tagsData&&tagsData.data&&JSON.stringify(widgetData.tagRequest)===JSON.stringify(tagsData.tagRequest)){
            setLoaded(false);
            (async ()=>{
                let keys = Object.keys(widgetData.analyze)
                let copy = {...analyzeData}
                for(let i=0;i<keys.length;i++){
                    if(widgetData.analyze[keys[i]]&&keys[i]!=='unitTime'){
                        let result = await getAnalyzeData(tagsData.data,analyzeUtils[keys[i]])
                        if(keys[i]==='sum') result = result.map(val=>val*widgetData.tagRequest.stepSizeSec/widgetData.analyze.unitTime)
                        copy[keys[i]] = result
                    }
                }
                setAnalyzeData(copy)
                setLoaded(true);
            })()
        }else{
            setLoaded(false);
        }
    },[widgetData&&widgetData.analyze,tagsData])
    
    if(widgetData&&widgetData.analyze&&Object.values(widgetData.analyze).find(val=>val===true)&&tagsData&&tagsData.data){
        return(
            loaded?(
                <Card className="ml-3 mr-3 mb-3">
                    <Card.Header className='pt-1 pr-3 pl-3'>
                        <Nav variant="tabs">
                            {widgetData.tagRequest.tagNames.map((val,i)=>(
                                <Nav.Item key={i}>
                                    <Nav.Link href='#' className="pt-1 pb-1 text-muted" active={tab===i} onClick={(e)=>{
                                        e.preventDefault()
                                        setTab(i)
                                    }}>
                                        {widgetData.labels[i]||val}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Card.Header>
                    <Card.Body className="p-0 pt-2 pb-2">
                        <Container fluid>
                            <Row>
                                {widgetData.analyze.sum?(
                                    <Col md='6' className='overflow-hidden text-truncate'>
                                        총합 : <span className="text-primary">{analyzeData.sum[tab]}</span>
                                    </Col>
                                ):null}
                                {widgetData.analyze.avg?(
                                    <Col md='6' className='overflow-hidden text-truncate'>
                                        평균 : <span className="text-primary">{analyzeData.avg[tab]}</span>
                                    </Col>
                                ):null}
                                {widgetData.analyze.var?(
                                    <Col md='6' className='overflow-hidden text-truncate'>
                                        분산 : <span className="text-primary">{analyzeData.var[tab]}</span>
                                    </Col>
                                ):null}
                                {widgetData.analyze.std?(
                                    <Col md='6' className='overflow-hidden text-truncate'>
                                        표준편차 : <span className="text-primary">{analyzeData.std[tab]}</span>
                                    </Col>
                                ):null}
                                {widgetData.analyze.max?(
                                    <Col md='6' className='overflow-hidden text-truncate'>
                                        최댓값 : <span className="text-primary">{analyzeData.max[tab]}</span>
                                    </Col>
                                ):null}
                                {widgetData.analyze.min?(
                                    <Col md='6' className='overflow-hidden text-truncate'>
                                        최솟값 : <span className="text-primary">{analyzeData.min[tab]}</span>
                                    </Col>
                                ):null}
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            ):(
                <div className="d-flex flex-row justify-content-center align-items-center" style={{height : 144 + 'px', backgroundColor : 'rgba(0,0,0,0.5)'}}>
                    <Spinner animation="border" variant="light"/>
                </div>
            )
        )
    }else{
        return(<></>)
    }
}

export default Analyze