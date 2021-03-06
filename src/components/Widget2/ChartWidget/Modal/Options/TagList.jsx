import { useState } from "react";
import { Card, Form, Table, Button, InputGroup, FormControl, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaPlus } from 'react-icons/fa'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

function TagList({tagNames, labels, onChange, className}){

    let [manualInput,setManualInput] = useState('')

    return(
        <Card className={className}>
            <Card.Header className='p-2 d-flex flex-row justify-content-between align-items-center'>
                <span className="font-weight-light">차트</span>
                <Form className="w-50">
                    <InputGroup size="sm">
                        <FormControl size='sm' type="text" placeholder='Tag/CALCTag' value={manualInput} onChange={(e)=>setManualInput(e.target.value)}/>
                        <InputGroup.Append>
                            <Button size='sm' className='d-flex align-items-center' onClick={()=>{
                                onChange({
                                    tagNames : tagNames.concat(manualInput),
                                    labels : labels.concat('')
                                })
                            }}>
                                <FaPlus />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </Card.Header>
            <Card.Body className='p-0 overflow-auto' style={{maxHeight : 252 + 'px'}}>
                <OverlayScrollbarsComponent style={{maxHeight : 252 + 'px'}}
                    options={{
                        scrollbars:{
                            autoHide : 'leave',
                            autoHideDelay : 0
                        }
                    }}
                >
                    <Table className='m-0 w-100' size='sm' striped hover borderless style={{tableLayout : 'fixed'}}>
                        <colgroup>
                            <col style={{width : '50%'}} />
                            <col style={{width : '30%'}} />
                            <col style={{width : '20%'}} />
                        </colgroup>
                        <thead className='thead-dark border-bootom' style={{position : 'sticky', top : 0}}>
                            <tr>
                                <th>TagName</th>
                                <th>Label</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tagNames.map((val,i)=>(
                                <tr key={i}>
                                    <td className="pt-2 text-truncate" style={{cursor : 'pointer'}} onClick={()=>{
                                        navigator.clipboard.writeText(val).then(()=>window.alert('복사 되었습니다.'))
                                    }}>
                                        <OverlayTrigger
                                            placement='top'
                                            overlay={
                                                <Tooltip>
                                                    {val}
                                                </Tooltip>
                                            }
                                        >
                                            <span className='text-truncate'>{val}</span>
                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        <Form>
                                            <Form.Control type='text' size='sm' value={labels[i]} onChange={(e)=>{
                                                onChange({
                                                    tagNames : tagNames,
                                                    labels : labels.map((val,idx)=>idx===i?e.target.value:val)
                                                })
                                            }}/>
                                        </Form>
                                    </td>
                                    <td><Button className='w-100' variant="danger" size='sm' onClick={()=>{
                                        if(tagNames.length===1){
                                            window.alert('최소 1개의 태그는 필요합니다.')
                                        }else{
                                            onChange({
                                                tagNames : tagNames.reduce((p,c,idx)=>idx===i?p:p.concat(c),[]),
                                                labels : labels.reduce((p,c,idx)=>idx===i?p:p.concat(c),[])
                                            })
                                        }
                                    }}>삭제</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </OverlayScrollbarsComponent>
            </Card.Body>
        </Card>
    )
}

export default TagList