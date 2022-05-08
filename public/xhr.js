
const login = ()=>{
    console.log('ich sende daten')        
    const xhr = new XMLHttpRequest()

    const user= 'mmusterman'
    const password = 'test'

    xhr.open('POST', 'http://localhost:5000/login')
    xhr.setRequestHeader('Content-Type','application/json')
    xhr.withCredentials = true;

    xhr.send(JSON.stringify({username: user, password: password}))


    xhr.onload = ()=>{

        console.log('das bekomme ich zurück',xhr.response)

}}

export {login}

