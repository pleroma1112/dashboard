import { Row, Col, Button, Collapse } from 'react-bootstrap'
import { FaRegChartBar, FaTable } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { SETDATA } from '../../../reducers/widgetReducer'
import boardWidgetDefaultProps from './default-widget-props/boardWidget'
import chartWidgetDefaultProps from './default-widget-props/chartWidget'

function GridWidgetOption({id, show}){

    let widgetData = useSelector(state=>state.widgetReducer.widgetData.find(val=>val.id===id))
    let dispatch = useDispatch()

    return(
        <Collapse in={show}>
            <Row>
                <Col className='d-flex flex-row justify-content-end mb-3'>
                    <Button className='mr-3 d-flex align-items-center' onClick={()=>(
                        dispatch({
                            type : SETDATA,
                            value : {...widgetData,
                                cols : widgetData.cols.concat('12'),
                                children : widgetData.children.concat({
                                    props : chartWidgetDefaultProps(), 
                                    widgetType : 'ChartWidget'
                                })
                            }
                        })
                    )}><FaRegChartBar fontSize={20}/></Button>
                    <Button className='d-flex align-items-center' onClick={()=>{
                        dispatch({
                            type : SETDATA,
                            value : {...widgetData,
                                cols : widgetData.cols.concat('12'),
                                children : widgetData.children.concat({
                                    props : boardWidgetDefaultProps(), 
                                    widgetType : 'BoardWidget'
                                })
                            }
                        })
                    }}><FaTable fontSize={20}/></Button>
                </Col>
            </Row>
        </Collapse>
    )
}

export default GridWidgetOption