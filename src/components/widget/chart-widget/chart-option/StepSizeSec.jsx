import { Form } from 'react-bootstrap'

function StepSizeSec({tags, type, setTags}){
    return(
        <Form.Group className='mt-3'>
            <Form.Label>Step Size (sec)</Form.Label>
            <Form.Control type='number' readOnly={type==='doughnut'||type==='pie'} value={tags.stepSizeSec} onChange={(e)=>setTags({...tags,stepSizeSec : e.target.value})}/>
        </Form.Group>
    )
}

export default StepSizeSec