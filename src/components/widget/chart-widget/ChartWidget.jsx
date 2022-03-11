import * as XLSX from 'xlsx/xlsx.mjs'
import { useState, useEffect } from 'react'
import { Card, FormControl, InputGroup, Spinner, Form} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../../models/api'
import { SETDATA } from '../../../reducers/widgetReducer'
import { FaCog, FaDownload, FaSyncAlt, FaRegClock } from 'react-icons/fa'
import ChartOption from './ChartOption'
import Chart from './Chart'
import utils from '../../../models/utils'
import ChartAnalyze from './ChartAnalyze'

function ChartWidget({id, title, type, height, tags, labels, options, unitTime, children, className}){//ajax 요청
    
    let widgetData = useSelector(state=>state.widgetReducer.widgetData.find(val=>val.id===id))
    let dispatch = useDispatch()
    let [loaded,setLoaded] = useState(widgetData?true:false)
    let [show,setShow] = useState(false)

    useEffect(()=>{
        if(!widgetData||!widgetData.tagsData){
            setLoaded(false)
            labels = tags.tagNames.map((val,i)=>(labels&&labels[i])||'')
            let {tagNames,startTime,endTime,stepSizeSec} = tags
            if(stepSizeSec<60) stepSizeSec = 60
            if(type==='doughtnut'||type==='pie') stepSizeSec = (new Date(endTime) - new Date(startTime))/1000
            api.getTagsData(tagNames,startTime,endTime,stepSizeSec)
                .then(tagsData=>dispatch({type : SETDATA, value : {id,title,type,tags,labels,tagsData,options : options||[],unitTime : unitTime||3600}}))
                .then(()=>setLoaded(true))
        }
    },[widgetData])

    useEffect(()=>{
        let chartArea = document.querySelector('.chart-widget-'+id+' .chart-area')
        if(loaded){
            if(!height) chartArea.classList.add('flex-grow-1')
        }else{
            chartArea.classList.remove('flex-grow-1')
        }
    },[loaded])

    return(
        <Card className={`chart-widget-${id} shadow-sm ${widgetData&&(widgetData.type==='line'||widgetData.type==='bar'||widgetData.type==='scatter')?'h-100':''} `+className}>
            <Card.Header className='p-2 pr-3 pl-3 d-flex flex-row justify-content-between'>
                <Card.Title className='m-0 font-weight-light text-nowrap text-truncate'>
                    {loaded&&widgetData?widgetData.title:''}
                </Card.Title>
                <div className="widget-options d-flex align-items-center">
                    {loaded&&widgetData?(
                        <>
                            <FaSyncAlt className='text-muted mr-3' style={{cursor : 'pointer'}} 
                                onMouseOver={(e)=>e.target.classList.remove('text-muted')} 
                                onMouseLeave={(e)=>e.target.classList.add('text-muted')}
                                onClick={()=>{
                                    setLoaded(false)
                                    setTimeout(()=>setLoaded(true),300)
                                }}
                            />
                            <a className={`chart-widget-img-${id} mr-3 d-flex align-items-center text-dark`}>
                                <FaDownload className='text-muted' style={{cursor : 'pointer'}}
                                    onMouseOver={(e)=>e.target.classList.remove('text-muted')} 
                                    onMouseLeave={(e)=>e.target.classList.add('text-muted')}
                                    onClick={()=>{
                                        let workbook = XLSX.utils.book_new()
                                        let tagsDataSheet = XLSX.utils.json_to_sheet(utils.aoa.reverse(widgetData.tagsData).map(arr=>arr.reduce((p,c)=>{
                                            p.timestamp = arr[0].timestamp
                                            p[c.tagName] = c.value
                                            return p
                                        },{})))
                                        let analyzeSheet = XLSX.utils.json_to_sheet(widgetData.tagsData.map(arr=>({
                                            tagName : arr[0].tagName,
                                            sum : arr.map(tag=>tag.value).reduce((p,c)=>p+c)*widgetData.tags.stepSizeSec/(widgetData.unitTime||3600),
                                            mean : utils.arr.mean(arr.map(tag=>tag.value)),
                                            variance : utils.arr.variance(arr.map(tag=>tag.value)),
                                            standard_deviation : utils.arr.standard(arr.map(tag=>tag.value)),
                                            max : utils.arr.max(arr.map(tag=>tag.value)),
                                            min : utils.arr.min(arr.map(tag=>tag.value))
                                        })))
                                        XLSX.utils.book_append_sheet(workbook,tagsDataSheet,'tagsData')
                                        XLSX.utils.book_append_sheet(workbook,analyzeSheet,'analyze')
                                        XLSX.writeFile(workbook,widgetData.title+'.xlsx')
                                        let canvas = document.querySelector(`.chart-widget-${id} canvas`).toDataURL('image/png')
                                        let anchor = document.querySelector(`.chart-widget-img-${id}`)
                                        anchor.href = canvas
                                        anchor.download = widgetData.title + '.png'
                                    }}
                                />
                            </a>
                            <FaCog className='text-muted' style={{cursor : 'pointer'}} 
                                onMouseOver={(e)=>e.target.classList.remove('text-muted')} 
                                onMouseLeave={(e)=>e.target.classList.add('text-muted')}
                                onClick={()=>setShow(true)}
                            />
                        </>
                    ):null}
                </div>
            </Card.Header>
            <Card.Body className='p-0 d-flex flex-column'>
                <div className='chart-area' style={{height : height?height+'px':null}}>
                    {loaded&&widgetData?(
                        <Chart
                            type={widgetData.type}
                            tagsData={widgetData.tagsData}
                            labels={widgetData.labels}
                        />
                    ):(
                        <div className='text-center d-flex flex-row justify-content-center' style={{height : 150 + 'px', backgroundColor : 'rgba(0,0,0,0.5)'}}>
                            <Spinner className='m-auto' animation='border' variant='light'/>
                        </div>
                    )}
                </div>
                {(loaded&&widgetData)&&(widgetData.type==='line'||widgetData.type==='bar')?(
                    <div className="d-flex flex-row justify-content-between align-items-center font-weight-light mb-2">
                        <Form className='ml-3'>
                            <InputGroup size='sm'>
                                <InputGroup.Prepend>
                                    <InputGroup.Text className='bg-info text-light'>
                                        <FaRegClock/>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl value={utils.ISOtoDateTime(widgetData.tags.startTime)} readOnly disabled/>
                            </InputGroup>
                        </Form>
                        <Form className='mr-3'>
                            <InputGroup size='sm'>
                                <InputGroup.Prepend>
                                    <InputGroup.Text className='bg-info text-light'>
                                        <FaRegClock/>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl value={utils.ISOtoDateTime(widgetData.tags.endTime)} readOnly disabled/>
                            </InputGroup>
                        </Form>
                    </div>
                ):null}
                <div className="bottom-area">
                    {(loaded&&widgetData)&&Array.isArray(widgetData.options)&&widgetData.options.length>0?(
                        <div className="pl-3 pr-3 pb-3">
                            <ChartAnalyze 
                                id={id}
                                options={widgetData.options}
                                unitTime={widgetData.unitTime}
                            />
                        </div>
                    ):null}
                    {children}
                </div>
            </Card.Body>
            {loaded&&widgetData?(
                <ChartOption id={id} show={show} onHide={()=>setShow(false)} onLoad={(value)=>setLoaded(value)}/>
            ):null}
        </Card>
    )
}

export default ChartWidget