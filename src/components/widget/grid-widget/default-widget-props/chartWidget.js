const yesterday = ()=>{
    let now = new Date()
    now.setDate(now.getDate()-1)
    return now
}

const chartWidgetDefaultProps = ()=>({
    id : Math.round(Math.random()*10000).toString(),
    title : 'NULL',
    type : 'line',
    tags : {
        tagNames : ['I.G1.300:FC015.PV'],
        startTime : yesterday().toISOString(),
        endTime : new Date().toISOString(),
        stepSizeSec : '900'
    }
})

export default chartWidgetDefaultProps