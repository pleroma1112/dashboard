const utils = {
    arr : {
        random : (len)=>Array.from({length : len},()=>Math.random()),
        mean : (arr)=>arr.reduce((p,c)=>p+c)/arr.length,
        deviation : (arr)=>arr.reduce((p,c)=>({...p,array:p.array.concat(c-p.mean)}),{array:[],mean:utils.arr.mean(arr)}).array,
        variance : (arr)=>utils.arr.deviation(arr).map(val=>Math.pow(val,2)).reduce((p,c)=>p+c)/arr.length,
        standard : (arr)=>Math.sqrt(utils.arr.variance(arr)),
        zScore : (arr)=>utils.arr.deviation(arr).reduce((p,c)=>({...p,array:p.array.concat(c/p.standard)}),{array:[],standard:utils.arr.standard(arr)}).array,
        max : (arr)=>arr.reduce((p,c)=>p<c?c:p),
        min : (arr)=>arr.reduce((p,c)=>p>c?c:p),
        normalize : (arr)=>arr.reduce((p,c)=>({...p,array:p.array.concat((c-p.min)/(p.max-p.min))}),{array:[],max:utils.arr.max(arr),min:utils.arr.min(arr)}).array,
        rmEmpty : (arr)=>arr.reduce((p,c)=>c!=null?p.concat(c):p,[]),
        divide : (arr,len)=>arr.reduce((p,c,i)=>(i+1)%len===0?p.concat([arr.slice(i+1-len,i+1)]):(i+1)===arr.length?p.concat([arr.slice((i+1)-(i+1)%len)]):p,[])
    },
    aoa : {
        random : (row,col)=>utils.arr.random(row).map(val=>utils.arr.random(col)),
        mean : (aoa)=>aoa.map(arr=>utils.arr.mean(arr)),
        deviation : (aoa)=>aoa.map(arr=>utils.arr.deviation(arr)),
        variance : (aoa)=>aoa.map(arr=>utils.arr.variance(arr)),
        standard : (aoa)=>aoa.map(arr=>utils.arr.standard(arr)),
        zScore : (aoa)=>aoa.map(arr=>utils.arr.zScore(arr)),
        max : (aoa)=>aoa.map(arr=>utils.arr.max(arr)),
        min : (aoa)=>aoa.map(arr=>utils.arr.min(arr)),
        normalize : (aoa)=>aoa.map(arr=>utils.arr.normalize(arr)),
        reverse : (aoa)=>aoa.reduce((p,c)=>p.length<c.length?c:p).map((val,i)=>aoa.map((arr,j)=>aoa[j][i])),
        rmEmpty : (aoa)=>aoa.reduce((p,c)=>c!=null&&c.length>0?p.concat([c]):p,[]).map(arr=>utils.arr.rmEmpty(arr))
    },
    copy : (obj)=>(typeof obj === 'object' && obj != null?Object.keys(obj).reduce((p,c)=>{
        p[c] = (typeof obj[c] === 'object' && obj[c] != null?utils.copy(obj[c]):obj[c])
        return p
    },Array.isArray(obj)?[]:{}):obj),
    tagDataSample : (len)=>utils.arr.random(len).reduce((p,c,i)=>{
        p.array[i] = {}
        p.array[i].tagName = 'I.SAM.TEST.PV'
        p.array[i].value = c
        p.array[i].timestamp = new Date(p.timestamp)
        p.array[i].timestamp.setMinutes(p.array[i].timestamp.getMinutes()+i)
        p.array[i].timestamp = p.array[i].timestamp.toISOString()
        return p
    },{array:[],timestamp:new Date()}).array,
    ISOtoDateTime : (ISOString)=>{
        let date = new Date(ISOString)
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        let h = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        return `${Y}-${M}-${D} ${h}:${m}:${s}`
    }
}

export default utils