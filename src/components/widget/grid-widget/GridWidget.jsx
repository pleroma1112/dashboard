import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import { FaCog, FaAngleLeft, FaAngleRight, FaRegTimesCircle } from 'react-icons/fa'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SETDATA } from '../../../reducers/widgetReducer'
import GridWidgetOption from './GridWidgetOption'
import Widget from './Widget'

function GridWidget({id,title,grid,children}){

    let widgetData = useSelector(state=>state.widgetReducer.widgetData.find(val=>val.id===id))
    let dispatch = useDispatch()
    let [overlay,setOverlay] = useState(false)

    useEffect(()=>{
        if(!widgetData||!widgetData.cols){
            dispatch({
                type : SETDATA, 
                value : {
                    id,
                    title,
                    grid,
                    cols : Array.from({length : children?children.length:0},(v,i)=>(grid&&grid[i])||'12'),
                    children : children?children.map(child=>({props : child.props, widgetType : child.type.name})):[]
                }
            })
        }
    },[widgetData])

    return(
        <Container fluid>
            <Row>
                <Col className='p-3'>
                    <Card>
                        <Card.Header className='p-2 pr-3 pl-3 d-flex flex-row justify-content-between'>
                            <Card.Title className='m-0 font-weight-light text-nowrap text-truncate'>
                                {overlay?(
                                    <Form onSubmit={(e)=>e.preventDefault()}>
                                        <Form.Control size='sm' value={widgetData.title} onChange={(e)=>dispatch({type : SETDATA, value : {...widgetData,title : e.target.value}})}/>
                                    </Form>
                                ):(widgetData&&widgetData.title)||title}
                            </Card.Title>
                            <div className="widget-options d-flex align-items-center">
                                <FaCog className='text-muted' style={{cursor : 'pointer'}} 
                                    onMouseOver={(e)=>e.target.classList.remove('text-muted')} 
                                    onMouseLeave={(e)=>e.target.classList.add('text-muted')}
                                    onClick={()=>setOverlay(!overlay)}
                                />
                            </div>
                        </Card.Header>
                        <Card.Body className='pt-3 pb-0 pl-0 pr-0'>
                            <Container fluid>
                                <GridWidgetOption id={id} show={overlay}/>
                                <Row className='pr-2 pl-2'>
                                    {widgetData?widgetData.children.map((child,i)=>(
                                        <Col key={i} md={widgetData&&widgetData.cols[i]||'12'} className="pr-2 pl-2 mb-3">
                                            <div className='position-relative h-100'>
                                                <Widget widgetType={child.widgetType} props={child.props} />
                                                <div className={`position-absolute text-muted ${overlay?'w-100 h-100 d-flex flex-row justify-content-between align-items-center':'d-none'}`} style={{backgroundColor : 'rgba(200,200,200,0.5)', top : 0}}>
                                                    <FaAngleLeft fontSize={30} style={{cursor : 'pointer'}} 
                                                        onClick={()=>dispatch({type : SETDATA, value : {...widgetData,cols : widgetData.cols.map((val,idx)=>idx===i&&val>1?Number(val)-1:val)}})}     
                                                    />
                                                    <FaRegTimesCircle fontSize={30} style={{cursor : 'pointer'}} 
                                                        onClick={()=>dispatch({type : SETDATA, value : {...widgetData,cols : widgetData.cols.filter((val,idx)=>idx!==i),children : widgetData.children.filter((val,idx)=>idx!==i)}})}
                                                    />
                                                    <FaAngleRight fontSize={30} style={{cursor : 'pointer'}} 
                                                        onClick={()=>dispatch({type : SETDATA, value : {...widgetData,cols : widgetData.cols.map((val,idx)=>idx===i&&val<12?Number(val)+1:val)}})}  
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                    )):null}
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default GridWidget