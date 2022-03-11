import { useEffect } from "react";
import { useState } from "react";
import { Card, Table, Spinner, Pagination, InputGroup, FormControl, Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import api from "../../../models/api";
import utils from "../../../models/utils";
import { SETDATA } from "../../../reducers/widgetReducer";
import { FaDownload, FaSearch } from 'react-icons/fa'
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import * as XLSX from 'xlsx/xlsx.mjs'

function BoardWidget({id,title,viewLength,pageLength,maxHeight}){

    let widgetData = useSelector(state=>state.widgetReducer.widgetData.find(val=>val.id===id))
    let dispatch = useDispatch()
    let [loaded,setLoaded] = useState(false)
    let [page,setPage] = useState(0)
    let [tableBoard,setTableBoard] = useState([])
    let [pagination,setPagination] = useState([])
    let [srchKey,setSrchKey] = useState(0)
    let [srchTxt,setSrchTxt] = useState('')

    useEffect(()=>{
        if(!widgetData){
            setLoaded(false)
            api.getBoardData("TEST").then(boardData=>{
                dispatch({type : SETDATA, value : {id,title,boardData}})
            }).then(()=>setLoaded(true))
        }
    },[widgetData])

    useEffect(()=>{
        if(widgetData){
            setLoaded(false)
            setPage(0)
            let split = utils.arr.divide(widgetData.boardData,viewLength)
            setTableBoard(split)
            setPagination(utils.arr.divide(Array.from({length : split.length},(v,i)=>i),pageLength))
            setLoaded(true)
        }
    },[widgetData,viewLength,pageLength])

    return(
        <Card className={"board-widget-"+id}>
            <Card.Header className='p-2 pr-3 pl-3 d-flex flex-row'>
                <Card.Title className="m-0 d-flex align-items-center">
                    <span className="font-weight-light">{loaded&&widgetData?widgetData.title:''}</span>
                </Card.Title>
                <div className="widget-options flex-grow-1 d-flex align-items-center justify-content-end">
                    {loaded&&widgetData?(
                        <>
                            <Form className="mr-3" onSubmit={(e)=>{
                                e.preventDefault()
                                setLoaded(false)
                                setPage(0)
                                let split = utils.arr.divide(widgetData.boardData.filter(val=>val[Object.keys(val)[srchKey]].toString().indexOf(srchTxt)>-1),viewLength)
                                setTableBoard(split)
                                setPagination(utils.arr.divide(Array.from({length : split.length},(v,i)=>i),pageLength))
                                setLoaded(true)
                            }}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <FormControl as='select' size="sm" onChange={(e)=>{
                                            setSrchKey(e.target.selectedIndex)
                                        }}>
                                            {widgetData.boardData[0]?Object.keys(widgetData.boardData[0]).map((k,i)=>(
                                                <option key={i} selected={i===srchKey}>{k}</option>
                                            )):null}
                                        </FormControl>
                                    </InputGroup.Prepend>
                                    <FormControl type="text" size="sm" value={srchTxt} onChange={(e)=>setSrchTxt(e.target.value)}/>
                                    <InputGroup.Append>
                                        <Button type="submit" className="d-flex justify-content-center align-items-center" size="sm">
                                            <FaSearch/>
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form>
                            <Form className="mr-3">
                                <Form.Control as='select' size="sm" onChange={(e)=>{
                                    setLoaded(false)
                                    setPage(0)
                                    viewLength = e.target.selectedOptions[0].label.split('개씩')[0]
                                    let split = utils.arr.divide(widgetData.boardData,viewLength)
                                    setTableBoard(split)
                                    setPagination(utils.arr.divide(Array.from({length : split.length},(v,i)=>i),pageLength))
                                    setLoaded(true)
                                }}>
                                    {[5,10,15,20,25,30].map((num,i)=>(
                                        <option key={i} selected={num==viewLength}>{num + '개씩'}</option>
                                    ))}
                                </Form.Control>
                            </Form>
                            <FaDownload className='text-muted' style={{cursor : 'pointer'}}
                                onMouseOver={(e)=>e.target.classList.remove('text-muted')} 
                                onMouseLeave={(e)=>e.target.classList.add('text-muted')}
                                onClick={()=>{
                                    let workbook = XLSX.utils.book_new()
                                    let worksheet = XLSX.utils.json_to_sheet(widgetData.boardData)
                                    XLSX.utils.book_append_sheet(workbook,worksheet,'Board Data')
                                    XLSX.writeFile(workbook,widgetData.title+'.xlsx')
                                }}
                            />
                        </>
                    ):null}
                </div>
            </Card.Header>
            <Card.Body className="p-0">
                {loaded&&widgetData?(
                    <OverlayScrollbarsComponent style={{maxHeight : maxHeight?maxHeight+'px':null}}
                        options={{
                            scrollbars : {
                                autoHide : 'leave',
                                autoHideDelay : 0
                            }
                        }}
                    >
                        <Table className="mb-0" size="sm" striped hover borderless>
                            <thead className='thead-dark border-bootom' style={{position : 'sticky', top : 0}}>
                                <tr>
                                    {widgetData.boardData[0]?Object.keys(widgetData.boardData[0]).map((val,i)=>(
                                        <th key={i}>{val}</th>
                                    )):null}
                                </tr>
                            </thead>
                            <tbody>
                                {tableBoard[page]?tableBoard[page].map((val,i)=>(
                                    <tr key={i}>
                                        {Object.values(val).map((v,j)=>(
                                            <td key={j}>{v}</td>
                                        ))}
                                    </tr>
                                )):null}
                            </tbody>
                        </Table>
                    </OverlayScrollbarsComponent>
                ):(
                    <div className='text-center d-flex flex-row justify-content-center' style={{height : 150 + 'px', backgroundColor : 'rgba(0,0,0,0.5)'}}>
                        <Spinner className='m-auto' animation='border' variant='light'/>
                    </div>
                )}
            </Card.Body>
            <Card.Footer className="d-flex justify-content-center pt-2 pb-2">
                {(loaded&&widgetData)&&tableBoard[0]&&tableBoard[0].length>0?(
                    <Pagination className="mb-0" size="sm">
                        {Math.floor(page/pageLength)>=1?(
                            <Pagination.Prev onClick={()=>{
                                setPage(pagination[Math.floor(page/pageLength)-1][pageLength-1])
                            }}/>
                        ):null}
                        {pagination[Math.floor(page/pageLength)].map((item,i)=>(
                            <Pagination.Item key={i} active={item===page} onClick={()=>{
                                setPage(item)
                            }}>
                                {item+1}
                            </Pagination.Item>
                        ))}
                        {Math.floor(page/pageLength)<pagination.length-1?(
                            <Pagination.Next onClick={()=>{
                                setPage(pagination[Math.floor(page/pageLength)+1][0])
                            }}/>
                        ):null}
                    </Pagination>
                ):null}
            </Card.Footer>
        </Card>
    )
}

export default BoardWidget