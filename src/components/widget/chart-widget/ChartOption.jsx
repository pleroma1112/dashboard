import { useState } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../../models/api'
import { SETDATA } from '../../../reducers/widgetReducer'
import TimeRange from './chart-option/TimeRange'
import TagsTable from './chart-option/TagsTable'
import TagList from './chart-option/TagsList'
import StepSizeSec from './chart-option/StepSizeSec'
import SelectType from './chart-option/SelectType'
import Analyze from './chart-option/Analyze'

function ChartOption({id,show,onHide,onLoad}){

    let widgetData = useSelector(state=>state.widgetReducer.widgetData.find(val=>val.id===id))
    let dispatch = useDispatch()
    let [title,setTitle] = useState(widgetData.title)
    let [tags,setTags] = useState(widgetData.tags)
    let [labels,setLabels] = useState(widgetData.labels)
    let [type,setType] = useState(widgetData.type)
    let [srchTxt,setSrchTxt] = useState('')
    let [srchTags,setSrchTags] = useState([])
    let [options,setOptions] = useState(widgetData.options)
    let [unitTime,setUnitTime] = useState(widgetData.unitTime)

    return(
        <Modal className={'widget-modal-'+id} size='lg' show={show} onHide={()=>{
            let confirm = window.confirm('저장하지 않고 닫으시겠습니까?')
            if(confirm){
                setTitle(widgetData.title)
                setTags(widgetData.tags)
                setLabels(widgetData.labels)
                setType(widgetData.type)
                setOptions(widgetData.options)
                setUnitTime(widgetData.unitTime)
                onHide()
            }
        }}>
            <Modal.Header closeButton>
                <Form.Control type='text' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </Modal.Header>
            <Modal.Body>
                <TimeRange id={id} tags={tags} setTags={tags=>setTags(tags)}/>
                <TagsTable 
                    tags={tags} labels={labels} 
                    setTags={tags=>setTags(tags)} setLabels={labels=>setLabels(labels)}
                />
                <TagList 
                    srchTxt={srchTxt} srchTags={srchTags} tags={tags} labels={labels}
                    setSrchTxt={txt=>setSrchTxt(txt)} setSrchTags={srchTags=>setSrchTags(srchTags)}
                    setTags={tags=>setTags(tags)} setLabels={labels=>setLabels(labels)}
                />
                <Form>
                    <Row>
                        <Col md="6">
                            <StepSizeSec tags={tags} type={type} setTags={tags=>setTags(tags)}/>
                        </Col>
                        <Col md="6" className='pl-0'>
                            <SelectType 
                                tags={tags} type={type} 
                                setTags={tags=>setTags(tags)} setType={type=>setType(type)} 
                            />
                        </Col>
                    </Row>
                </Form>
                {Array.isArray(options)?(
                    <Analyze 
                        options={options} unitTime={unitTime}
                        setOptions={options=>setOptions(options)}
                        setUnitTime={unitTime=>setUnitTime(unitTime)}
                    />
                ):null}
            </Modal.Body>
            <Modal.Footer className='p-2 text-right'>
                <Button variant='primary' onClick={()=>{
                    onLoad(false)
                    let {tagNames,startTime,endTime,stepSizeSec} = tags
                    if(stepSizeSec<60) stepSizeSec = 60
                    api.getTagsData(tagNames,startTime,endTime,stepSizeSec)
                        .then(tagsData=>dispatch({type : SETDATA, value : {...widgetData,title,tags : {tagNames,startTime,endTime,stepSizeSec},labels,type,tagsData,options,unitTime : (unitTime<1?3600:unitTime)}}))
                        .then(()=>onLoad(true))
                    onHide()
                }}>저장</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChartOption