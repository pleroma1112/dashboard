import { Card, Button, Form, Table, InputGroup, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap'
import api from '../../../../models/api'
import { FaSearch } from 'react-icons/fa'
import {OverlayScrollbarsComponent} from 'overlayscrollbars-react'

function TagList({srchTxt, srchTags, tags, labels, setSrchTxt, setSrchTags, setTags, setLabels}){
    return(
        <Card className='mt-3'>
            <Card.Header className='p-2 d-flex flex-row justify-content-between align-items-center'>
                <span className="font-weight-light mr-3">Search</span>
                <Form className='flex-grow-1' onSubmit={(e)=>{
                    e.preventDefault()
                    api.getTagList(srchTxt).then(tagList=>setSrchTags(tagList.map(tag=>tag.tagName)))
                }}>
                    <InputGroup size='sm'>
                        <FormControl size='sm' type='text' placeholder='Tag Seach...' value={srchTxt} onChange={(e)=>setSrchTxt(e.target.value)}/>
                        <InputGroup.Append>
                            <Button type='submit' className='d-flex justify-content-center align-items-center' size='sm' variant='primary'>
                                <FaSearch/>
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
                            <col style={{width : '80%'}}/>
                            <col style={{width : '20%'}}/>
                        </colgroup>
                        <thead className='thead-dark border-bootom' style={{position : 'sticky', top : 0}}>
                            <tr>
                                <th>TagName</th>
                                <th>Add</th>
                            </tr>
                        </thead>
                        <tbody>
                            {srchTags.map((val,i)=>(
                                <tr key={i}>
                                    <td className='pt-2 text-truncate' style={{cursor : 'pointer'}} onClick={()=>{
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
                                        {tags.tagNames.find(name=>name===val)?null:(
                                            <Button className='w-100' size='sm' variant='primary' onClick={()=>{
                                                setTags({...tags,tagNames : tags.tagNames.concat(val)})
                                                setLabels(labels.concat(''))
                                            }}>추가</Button>
                                        )}
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

export default TagList