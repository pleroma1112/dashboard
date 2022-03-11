import { useState } from 'react'
import { Button, Card, Collapse } from 'react-bootstrap'
import { FaCog } from 'react-icons/fa'
import { useEffect } from 'react'

function PostWidget({id,title}){

    let [show,setShow] = useState(false)
    let [init,setInit] = useState(false)

    useEffect(()=>{
        if(show&&!init){
            window.nhn.husky.EZCreator.createInIFrame({
                oAppRef: window.oEditors,
                elPlaceHolder: id,
                sSkinURI: "/se2/SmartEditor2Skin.html",
                fCreator: "createSEditor2"
            });
            setInit(true)
        }
    },[show])

    return(
        <Card>
            <Card.Header className='p-2 pr-3 pl-3 d-flex flex-row justify-content-between'>
                <Card.Title className="mb-0 font-weight-light">{title}</Card.Title>
                <div className="widget-options d-flex flex-row align-items-center">
                    <FaCog className='text-muted' style={{cursor : 'pointer'}}
                        onMouseOver={(e)=>e.target.classList.remove('text-muted')}
                        onMouseLeave={(e)=>e.target.classList.add('text-muted')}
                        onClick={()=>setShow(!show)}
                    />
                </div>
            </Card.Header>
            <Card.Body className='p-0'>
                <Collapse in={show}>
                    <div className="smarteditor2" style={{marginBottom : '-6px'}}>
                        <textarea id={id} rows='15' style={{width : `calc(100% - 1px)`}}/>
                    </div>
                </Collapse>
            </Card.Body>
            <Card.Footer className='d-flex flex-row justify-content-end p-2'>
                <Button onClick={()=>{
                    window.oEditors.getById[id].exec("UPDATE_CONTENTS_FIELD", [])
                    console.log(document.getElementById(id).value)
                }}>Save</Button>
            </Card.Footer>
        </Card>
    )
}

export default PostWidget