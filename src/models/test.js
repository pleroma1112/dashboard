// const patternArr = (len,pattern)=>{
//     let result = []
//     for(let i=0;i<Math.ceil(len/pattern.length);i++){
//         result = result.concat(pattern)
//     }
//     return result.slice(0,len)
// }
// const patternArr = (len,pattern)=>Array.from({length:Math.ceil(len/pattern.length)},()=>0).reduce(p=>p.concat(pattern),[]).slice(0,len)
// const match = (answer,arr)=>answer.reduce((p,c,i)=>c===arr[i]?p+=1:p,0)
// const mkarr = (len,max,min)=>Array.from({length:len},()=>Math.round(Math.random()*(max-min)+min))
// const solution = (answer)=>{
//     let supo1 = patternArr(answer.length,[1,2,3,4,5])
//     let supo2 = patternArr(answer.length,[2,1,2,3,2,4,2,5])
//     let supo3 = patternArr(answer.length,[3,3,1,1,2,2,4,4,5,5])
//     let result = [{id:1,match:match(answer,supo1)},{id:2,match:match(answer,supo2)},{id:3,match:match(answer,supo3)}]
//     let max = result.reduce((p,c)=>p.match<c.match?c:p).match
//     return result.filter(val=>val.match===max).map(val=>val.id)
// }
// console.log(solution([1,3,2,4,2]))

const pick = (arr,cnt,str="")=>arr.map(val=>cnt>1?pick(arr,cnt-1,str+val.toString()):str+val.toString()).flat().filter((val,i,arr)=>arr.indexOf(val)===i).map(val=>Number(val))
const primeNum = (num)=>Array.from({length:(num-1)},(val,i)=>num%(i+1)).slice(1).find(val=>val===0)===undefined?true:false
const solution = (numbers)=>{
    let result = []
    for(let i=1;i<numbers.length;i++){
        result = result.concat(pick(numbers.split(""),i).reduce((p,c)=>primeNum(c)?p.concat(c):p,[]))
    }
    
}
console.log(primeNum(12))
