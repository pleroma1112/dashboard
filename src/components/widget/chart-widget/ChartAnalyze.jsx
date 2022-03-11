import { useState, useEffect } from 'react'
import { Card, Nav, Container, Row, Col} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import utils from '../../../models/utils'

function ChartAnalyze({id,options,unitTime}){

    let widgetData = useSelector(state=>state.widgetReducer.widgetData.find(val=>val.id===id))
    let [tab,setTab] = useState(0)
    let [analyze,setAnalyze] = useState({})

    useEffect(()=>{
        let tagsValue = widgetData.tagsData.map(arr=>arr.map(tag=>tag.value))
        setAnalyze({
            sum : {
                title : '총합',
                value : tagsValue.map((arr,i)=>arr.reduce((p,c)=>p+c)*widgetData.tags.stepSizeSec/(unitTime||3600))
            },
            mean : {
                title : '평균',
                value : utils.aoa.mean(tagsValue)
            },
            variance : {
                title : '분산',
                value : utils.aoa.variance(tagsValue)
            },
            standard : {
                title : '표준편차',
                value : utils.aoa.standard(tagsValue)
            },
            max : {
                title : '최댓값',
                value : utils.aoa.max(tagsValue)
            },
            min : {
                title : '최솟값',
                value : utils.aoa.min(tagsValue)
            }
        })
    },[widgetData])

    return(
        <Card>
            <Card.Header className='pt-1 pr-3 pl-3'>
                <Nav variant='tabs'>
                    {widgetData.tags.tagNames.map((name,i)=>(
                        <Nav.Item key={i}>
                            <Nav.Link href='#' className='pt-1 pb-1 text-muted' active={tab===i} onClick={(e)=>{
                                e.preventDefault()
                                setTab(i)
                            }}>
                                {(widgetData.labels&&widgetData.labels)[i]||name}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </Card.Header>
            <Card.Body className='pr-0 pl-0 pt-2 pb-2'>
                <Container fluid>
                    <Row>
                        {Object.keys(analyze).map((k,i)=>(
                            options.find(val=>val===k)?(
                                <Col key={i} md="6" className='overflow-hidden text-truncate'>
                                    <span className="font-weight-light text-nowrap">
                                        {analyze[k].title} : <span className="text-primary">{analyze[k].value[tab]}</span>
                                    </span>
                                </Col>
                            ):null
                        ))}
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default ChartAnalyze