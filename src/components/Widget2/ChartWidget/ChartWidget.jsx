import * as XLSX from 'xlsx'
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaCog, FaDownload, FaSyncAlt } from 'react-icons/fa'
import { useEffect, useState } from "react";
import { SETWD } from "../Reducers/WDReducer";
import Chart, { DefaultChartRequest, ISOtoDATETIME, LINE } from "./Chart/Chart";
import ModalWidget from "./Modal/ModalWidget";
import Analyze, { analyzeUtils, getAnalyzeData } from "./Analyze/Analyze";
import TimeSpan from "./TimeSpan/TimeSpan";

function ChartWidget({id}){

    let widgetData = useSelector(state=>state.WDReducer.widgetData.find(val=>val.id===id))
    let tagsData = useSelector(state=>state.TDReducer.tagsData.find(val=>val.id===id))
    let dispatch = useDispatch()
    let [show,setShow] = useState(false)

    useEffect(()=>{
        if(!widgetData){
            dispatch({type : SETWD, value : {
                id,
                title : 'Default Title',
                type : LINE,
                tagRequest : DefaultChartRequest(),
                labels : [''],
                analyze : {
                    sum : false,
                    avg : false,
                    var : false,
                    std : false,
                    max : false,
                    min : false,
                    unitTime : 3600
                },
                reload : true
            }})
        }
    },[])

    return(
        <Card className={`chart-widget-${id}`}>
            <Card.Header className='p-2 pr-3 pl-3 d-flex flex-row justify-content-between'>
                <Card.Title className='m-0 font-weight-light text-nowrap text-truncate'>
                    {widgetData&&widgetData.title||''}
                </Card.Title>
                <div className="widget-options d-flex align-items-center">
                    <FaSyncAlt className='text-muted mr-3' style={{cursor : 'pointer'}} 
                        onMouseOver={(e)=>e.target.classList.remove('text-muted')} 
                        onMouseLeave={(e)=>e.target.classList.add('text-muted')}
                        onClick={()=>dispatch({type : SETWD, value : {...widgetData,reload : !widgetData.reload}})}
                    />
                    <a className={'text-dark d-flex flex-row align-items-center' + ` chart-widget-img-${id}`}>
                        <FaDownload className='text-muted mr-3' style={{cursor : 'pointer'}} 
                            onMouseOver={(e)=>e.target.classList.remove('text-muted')} 
                            onMouseLeave={(e)=>e.target.classList.add('text-muted')}
                            onClick={()=>{
                                let data = tagsData.data[0].map((tag,i)=>tagsData.data.map((tagData,j)=>tagsData.data[j][i]))
                                let jsonData = data.map(data=>{
                                    let obj = {
                                        timestamp : ISOtoDATETIME(data[0].timestamp)
                                    }
                                    data.forEach((tag,i)=>{
                                        obj[tag.tagName] = tag.value
                                    })
                                    return obj
                                });
                                (async ()=>{
                                    let keys = ['sum','avg','var','std','max','min']
                                    let aoa = []
                                    for(let i=0;i<keys.length;i++){
                                        aoa.push(await getAnalyzeData(tagsData.data,analyzeUtils[keys[i]]))
                                        if(keys[i]==='sum') aoa[i] = aoa[i].map(val=>val*widgetData.tagRequest.stepSizeSec/widgetData.analyze.unitTime)
                                    }
                                    aoa = aoa[0].map((v,i)=>aoa.map((o,j)=>aoa[j][i]))
                                    aoa = aoa.map((arr,i)=>{
                                        let result = {
                                            tagName : widgetData.tagRequest.tagNames[i]
                                        }
                                        keys.map((k,j)=>{
                                            result[k] = arr[j]
                                        })
                                        return result
                                    })
                                    return aoa
                                })().then(result=>{
                                    let workbook = XLSX.utils.book_new()
                                    let tagDataWorksheet = XLSX.utils.json_to_sheet(jsonData)
                                    let analyzeDataWorksheet = XLSX.utils.json_to_sheet(result)
                                    XLSX.utils.book_append_sheet(workbook,tagDataWorksheet,'태그')
                                    XLSX.utils.book_append_sheet(workbook,analyzeDataWorksheet,'통계')
                                    XLSX.writeFile(workbook,`${widgetData.title}.xlsx`)
                                })
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
                </div>
            </Card.Header>
            <Card.Body className='p-0 d-flex flex-column'>
                <div className="chart-area">
                    <Chart id={id} />
                </div>
                <div className="timespan-area">
                    <TimeSpan startTime={widgetData&&widgetData.tagRequest.startTime} endTime={widgetData&&widgetData.tagRequest.endTime} />
                </div>
                <div className="analyze-area">
                    <Analyze id={id}/>
                </div>
            </Card.Body>
            <div className="modal-area">
                <ModalWidget id={id} show={show} onHide={val=>setShow(val)}/>
            </div>
        </Card>
    )
}

export default ChartWidget