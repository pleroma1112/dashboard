Array.prototype.sum = function(){
    return this.reduce((p,c)=>p+c)
}
Array.prototype.avg = function(){
    return this.sum()/this.length
}
Array.prototype.dev = function(){
    return this.reduce((p,c)=>({...p,result : p.result.concat(c-p.avg)}),{result : [],avg : this.avg()}).result
}
Array.prototype.var = function(){
    return this.dev().map(val=>Math.pow(val,2)).avg()
}
Array.prototype.std = function(){
    return Math.sqrt(this.var())
}
Array.prototype.zsc = function(){
    return this.dev().reduce((p,c)=>({...p,result : p.result.concat(c/p.std)}),{result:[],std:this.std()}).result
}
Array.prototype.max = function(){
    return this.reduce((p,c)=>p<c?c:p)
}
Array.prototype.min = function(){
    return this.reduce((p,c)=>p>c?c:p)
}
Array.prototype.nor = function(){
    return this.reduce((p,c)=>({...p,result : p.result.concat((c-p.min)/(p.max-p.min))}),{result:[],max:this.max(),min:this.min()}).result
}
Array.prototype.reverseColRow = function(){
    return this.reduce((p,c)=>p.length<c.length?c:p).map((val,i)=>this.map((arr,j)=>this[j][i]))
}
Array.prototype.removeEmpty = function(){
    return this.reduce((p,c)=>!c||isNaN(c)?p:p.concat(c),[])
}
Array.prototype.swap = function(index1,index2){
    return this.map((val,i)=>i===index1?this[index2]:i===index2?this[index1]:val)
}
Array.prototype.addRandom = function(length,min=0,max=1){
    return this.concat(Array.from({length},()=>Math.random()*(max-min)+min))
}
Array.prototype.divide = function(length){
    return this.reduce((p,c,i)=>(i+1)%length===0?p.concat([this.slice(i+1-length,i+1)]):(i+1)===this.length?p.concat([this.slice(this.length-(this.length%length))]):p,[])
}
Array.prototype.convertTagData = function(tagName,stepSizeSec,startTime=new Date()){
    return this.reduce((p,c,i)=>{
        let timestamp = new Date(p.timestamp)
        timestamp.setSeconds(timestamp.getSeconds()+stepSizeSec)
        return {...p,result : p.result.concat({tagName,value:c,timestamp : timestamp.toISOString()}),timestamp}
    },{result:[],timestamp:new Date(startTime)}).result
}

let arr = []
console.log(arr.addRandom(10).convertTagData('Test.PV',60))