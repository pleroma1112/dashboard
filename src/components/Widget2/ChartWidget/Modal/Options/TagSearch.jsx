import { useState } from "react";
import { Card, Form, FormControl, InputGroup, Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaSearch } from 'react-icons/fa'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import api from "../../../Models/API";

function TagSearch({tagNames, labels, onChange, className}){

    let [srchTxt,setSrchTxt] = useState('')
    let [srchResult,setSrchResult] = useState([])


    return(
        <Card className={className}>
            <Card.Header className="p-2 d-flex flex-row align-items-center justify-content-between">
                <span className="font-weight-light">태그 검색</span>
                <Form className="w-50" onSubmit={(e)=>{
                    e.preventDefault()
                    api.requestTagList(srchTxt).then(data=>setSrchResult(data))
                }}>
                    <InputGroup size='sm'>
                        <FormControl type='text' placeholder="Tag/CALCTag" value={srchTxt} onChange={(e)=>setSrchTxt(e.target.value)}/>
                        <InputGroup.Append>
                            <Button type='submit' className="d-flex flex-row align-items-center">
                                <FaSearch />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </Card.Header>
            <Card.Body className="p-0 overflow-auto">
                <OverlayScrollbarsComponent style={{maxHeight : 252 + 'px'}}
                    options={{
                        scrollbars:{
                            autoHide : 'leave',
                            autoHideDelay : 0
                        }
                    }}
                >
                    <Table className="mb-0 w-100" size='sm' striped hover borderless style={{tableLayout : 'fixed'}}>
                        <colgroup>
                            <col style={{width : '80%'}} />
                            <col style={{width : '20%'}} />
                        </colgroup>
                        <thead className='thead-dark border-bootom' style={{position : 'sticky', top : 0}}>
                            <tr>
                                <th>TagName</th>
                                <th>Add</th>
                            </tr>
                        </thead>
                        <tbody>
                            {srchResult.map((val,i)=>(
                                <tr key={i}>
                                    <td className="pt-2 text-truncate" style={{cursor : 'pointer'}} onClick={()=>{
                                        navigator.clipboard.writeText(val.tagName).then(()=>window.alert('복사 되었습니다.'))
                                    }}>
                                        <OverlayTrigger
                                            placement='top'
                                            overlay={
                                                <Tooltip>
                                                    {val.tagName}
                                                </Tooltip>
                                            }
                                        >
                                            <span className='text-truncate'>{val.tagName}</span>
                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        {!tagNames.find(name=>name===val.tagName)?(
                                            <Button className="w-100" size='sm' onClick={()=>{
                                                onChange({
                                                    tagNames : tagNames.concat(val.tagName),
                                                    labels : labels.concat('')
                                                })
                                            }}>추가</Button>
                                        ):null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </OverlayScrollbarsComponent>
            </Card.Body>
        </Card>
    )
}

export default TagSearch