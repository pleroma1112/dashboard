import { Form } from 'react-bootstrap'

function SelectType({tags, type, setTags, setType}){
    return(
        <Form.Group className='mt-3'>
            <Form.Label>Chart Type</Form.Label>
            <Form.Control as='select' onChange={(e)=>{
                let label = e.target.selectedOptions[0].label
                if(label==='doughnut'||label==='pie'){
                    let timespanSec = (new Date(tags.endTime) - new Date(tags.startTime))/1000
                    setTags({...tags,stepSizeSec : timespanSec})
                }
                setType(label)
            }}>
                <option selected={type==='line'}>line</option>
                <option selected={type==='bar'}>bar</option>
                <option selected={type==='doughnut'}>doughnut</option>
                <option selected={type==='pie'}>pie</option>
                <option selected={type==='scatter'}>scatter</option>
            </Form.Control>
        </Form.Group>
    )
}

export default SelectType