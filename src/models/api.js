const ajax = (method,url,data)=>{
    return new Promise(resolve=>{
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState===XMLHttpRequest.DONE&&xhr.status===200){
                resolve(JSON.parse(xhr.responseText))
            }
        }
        xhr.open(method,url)
        xhr.setRequestHeader('Content-Type','application/json')
        xhr.send(JSON.stringify(data))
    })
}

const api = {
    login : (id,password)=>{
        return new Promise(resolve=>{
            let url = `/api/auth`
            ajax('POST',url,{id,password}).then(result=>resolve(result))
        })
        // request data example = {
        //     id : 'web-admin',
        //     password : '04010401'
        // }
        // response data example = {
        //     auth : true || false
        //     msg : undefined || 'error msg'
        // }
    },
    logout : ()=>{
        return new Promise(resolve=>{
            let url = `/api/auth`
            ajax('GET',url).then(result=>resolve(result))
        })
    },
    authCheck : ()=>{
        return new Promise(resolve=>{
            let url = `/api/auth/check`
            ajax('GET',url).then(result=>resolve(result))
        })
        // response data example = { auth : true || false }
    },
    getTagsData : (tagNames,startTime,endTime,stepSizeSec)=>{
        return new Promise(resolve=>{
            let url = `/api/tag?startTime=${startTime}&endTime=${endTime}&stepSizeSec=${stepSizeSec}&`
            tagNames.forEach((tagName,i)=>{
                url += `tagNames=${tagName}&`
            })
            ajax('GET',url).then(tagsData=>resolve(tagsData))
        })
        // request data example = {
        //     tagNames : ['I.SAM.TEST1.PV','I.SAM.TEST2.PV'],
        //     startTime : ISO Date String,
        //     endTime : ISO Date String,
        //     stepSizeSec : 900
        // }
        // response data example = [
        //     [
        //         {
        //             tagName : 'I.SAM.TEST1.PV',
        //             value : 0.141592,
        //             timestamp : ISO Date String
        //         },
        //         {
        //             tagName : 'I.SAM.TEST1.PV',
        //             value : 0.591562,
        //             timestamp : ISO Date String
        //         },
        //     ],
        //     [
        //         {
        //             tagName : 'I.SAM.TEST2.PV',
        //             value : 0.239847,
        //             timestamp : ISO Date String
        //         },
        //         {
        //             tagName : 'I.SAM.TEST2.PV',
        //             value : 0.982658,
        //             timestamp : ISO Date String
        //         },
        //     ],
        // ]
    },
    getTagList : (tagName)=>{
        return new Promise(resolve=>{
            let url = `/api/tag/srch?tagName=${tagName}`
            ajax('GET',url).then(tagNames=>resolve(tagNames))
        })
        // request data example = 'TEST'
        // response data example = ['I.SAM.TEST1.PV','I.SAM.TEST2.PV','I.SAM.TEST3.PV']
    },
    getBoardData : (boardId)=>{
        return new Promise(resolve=>{
            let url = `/api/board?boardId=${boardId}`
            ajax('GET',url).then(boardData=>resolve(boardData))
        })
        // request data example = 'TESTBOARD'
        // response data example = [
        //     {
        //         postId : 0,
        //         postTitle : '0.345987',
        //         postWriter : 'web-admin'
        //     },
        //     {
        //         postId : 1,
        //         postTitle : '0.208786',
        //         postWriter : 'user'
        //     },
        //     {
        //         postId : 2,
        //         postTitle : '0.9237487',
        //         postWriter : 'web-admin'
        //     },
        // ]
    }
}

export default api