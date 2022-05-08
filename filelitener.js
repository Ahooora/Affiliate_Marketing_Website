const {watch} = require('fs')
const {fork} = require('child_process')

const path = './server.js'

let childprocess = fork(path)

watch(path,()=>{
    childprocess.kill()
    console.clear()
    childprocess = fork(path)
})