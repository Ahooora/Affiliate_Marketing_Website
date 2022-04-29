const express = require('express')
const server = express()
const port = 5000

console.log()

server.use(express.static('public'))

server.get('/', (req, res) => {
    res.sendFile(__dirname + 'public/index.html')
})

server.listen(port, () => console.log(`server läuft auf http://localhost:${port}`))