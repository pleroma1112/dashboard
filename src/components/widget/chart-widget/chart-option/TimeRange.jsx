import { Form } from 'react-bootstrap'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import 'bootstrap-daterangepicker/daterangepicker.css'

function TimeRange({id, tags, setTags}){
    return(
        <Form.Group>
            <Form.Label>Time Range</Form.Label>
            <DateRangePicker initialSettings={{
                parentEl : '.widget-modal-'+id,
                showDropdowns : true,
                timePicker : true,
                timePicker24Hour : true,
                timePickerSeconds : true,
                startDate : new Date(tags.startTime),
                endDate : new Date(tags.endTime),
                opens : 'center',
                locale : {
                    format : 'YYYY-MM-DD hh:mm:ss A'
                }
            }} onCallback={(st,et)=>setTags({...tags,startTime : new Date(st).toISOString(),endTime : new Date(et).toISOString()})}>
                <Form.Control type='text'/>
            </DateRangePicker>
        </Form.Group>
    )
}

export default TimeRange