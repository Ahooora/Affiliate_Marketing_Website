const express = require('express')
const server = express()
const port = 5000

console.log()

server.use(express.static('public'))

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})
server.post('/login',(req,res)=>{

    console.log('test:', req.body)
})

server.listen(port, () => console.log(`server läuft auf http://localhost:${port}`))

