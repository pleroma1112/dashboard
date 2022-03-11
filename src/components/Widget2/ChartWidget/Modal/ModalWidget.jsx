import { useEffect, useState } from "react"
import { Button, Form, Modal, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { SETWD } from "../../Reducers/WDReducer"
import { BAR, DOUGHTNUT, LINE, SCATTER } from "../Chart/Chart"
import AnalyzeOption from "./Options/AnalyzeOption"
import DateTimeRange from "./Options/DateTimeRange"
import TagList from "./Options/TagList"
import TagSearch from "./Options/TagSearch"

function ModalWidget({id, show, onHide}){

    let widgetData = useSelector(state=>state.WDReducer.widgetData.find(val=>val.id===id))
    let [title,setTitle] = useState('Default Title')
    let [tagNames,setTagNames] = useState([])
    let [startTime,setStartTime] = useState('')
    let [endTime,setEndTime] = useState('')
    let [stepSizeSec,setStepSizeSec] = useState(900)
    let [labels,setLabels] = useState([])
    let [type,setType] = useState('')
    let [analyze,setAnalyze] = useState({})
    let dispatch = useDispatch()

    useEffect(()=>{
        if(widgetData&&widgetData.tagRequest&&widgetData.labels&&widgetData.title){
            setTitle(widgetData.title)
            setTagNames(widgetData.tagRequest.tagNames)
            setStartTime(widgetData.tagRequest.startTime)
            setEndTime(widgetData.tagRequest.endTime)
            setStepSizeSec(widgetData.tagRequest.stepSizeSec)
            setLabels(widgetData.labels)
            setType(widgetData.type)
            setAnalyze(widgetData.analyze)
        }
    },[widgetData])

    return(
        <Modal className={`modal-widget-${id}`} size="lg" show={show} onHide={()=>{
            let confirm = window.confirm('저장하지 않고 종료하시겠습니까?')
            if(confirm){
                setTitle(widgetData.title)
                setTagNames(widgetData.tagRequest.tagNames)
                setStartTime(widgetData.tagRequest.startTime)
                setEndTime(widgetData.tagRequest.endTime)
                setStepSizeSec(widgetData.tagRequest.stepSizeSec)
                setLabels(widgetData.labels)
                setType(widgetData.type)
                setAnalyze(widgetData.analyze)
                onHide(false)
            }
        }}>
            <Modal.Header closeButton >
                <Form.Control type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </Modal.Header>
            <Modal.Body>
                <DateTimeRange id={id} startTime={startTime} endTime={endTime} onChange={range=>{
                    setStartTime(range.startTime)
                    setEndTime(range.endTime)
                }}/>
                <TagList className='mb-3' tagNames={tagNames} labels={labels} onChange={value=>{
                    setTagNames(value.tagNames)
                    setLabels(value.labels)
                }}/>
                <TagSearch className='mb-3' tagNames={tagNames} labels={labels} onChange={value=>{
                    setTagNames(value.tagNames)
                    setLabels(value.labels)
                }}/>
                <Form>
                    <Row>
                        <Col md='6' className="mb-3">
                            <Form.Label>샘플링 주기 (sec)</Form.Label>
                            <Form.Control type='number' value={stepSizeSec} onChange={(e)=>setStepSizeSec(e.target.value)} readOnly={type===DOUGHTNUT}/>
                        </Col>
                        <Col md='6' className="mb-3">
                            <Form.Label>차트 유형</Form.Label>
                            <Form.Control as='select' onChange={(e)=>{
                                setType(e.target.value)
                                if(e.target.value===DOUGHTNUT){
                                    let timespan = Number(new Date(endTime) - new Date(startTime))/1000
                                    setStepSizeSec(timespan)
                                }
                            }}>
                                <option value={LINE} selected={type===LINE}>line</option>
                                <option value={BAR} selected={type===BAR}>bar</option>
                                <option value={DOUGHTNUT} selected={type===DOUGHTNUT}>doughnut</option>
                                <option value={SCATTER} selected={type===SCATTER}>scatter</option>
                            </Form.Control>
                        </Col>
                    </Row>
                </Form>
                <AnalyzeOption analyze={analyze} onChange={value=>setAnalyze(value)}/>
            </Modal.Body>
            <Modal.Footer className="p-2">
                <Button onClick={()=>{
                    onHide(false)
                    dispatch({
                        type : SETWD, 
                        value : {...widgetData, 
                            title, 
                            tagRequest : {...widgetData.tagRequest, 
                                tagNames,
                                startTime,
                                endTime,
                                stepSizeSec : stepSizeSec<60?60:stepSizeSec
                            },
                            labels,
                            type,
                            analyze : {...analyze,unitTime : analyze.unitTime<60?60:analyze.unitTime}
                        }
                    })
                }}>저장</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalWidget