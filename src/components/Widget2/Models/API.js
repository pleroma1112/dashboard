import axios from 'axios'

const api = {
    requestTagData : ({tagNames,startTime,endTime,stepSizeSec})=>{
        return new Promise(resolve=>{
            let url = `/api/tag?startTime=${startTime}&endTime=${endTime}&stepSizeSec=${stepSizeSec}&`
            tagNames.forEach(tagName=>{
                url += `tagNames=${tagName}&`
            })
            axios.get(url).then(result=>resolve(result.data))
        })
    },
    requestTagList : (tagName)=>{
        return new Promise(resolve=>{
            let url = `/api/tag/srch?tagName=${tagName}`
            axios.get(url).then(result=>resolve(result.data))
        })
    }   
}

export default api