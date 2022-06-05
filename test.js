const bcrypt = require('bcryptjs')

let salt
let hash

// bcrypt.genSalt(10, (err, salt) => {
//     console.log('salt=',salt)
//     bcrypt.hash('password', salt, (err, hash) => {
//         console.log('hash=',hash)
//         if(err) {
//             console.log(err)
//         }
//     })
// })

// bcrypt.hash('password', '$2a$10$zS/VcFteQ77ikpZmYK6T..', (err, hash) => {
//     console.log('hash=',hash)
//     if(err) {
//         console.log(err)
//     }
// })

bcrypt.compare('passwrd','$2a$10$zS/VcFteQ77ikpZmYK6T..VyxiMbsrohsVaU5Idc.nIxuVBt0jPpW', (err, match) => {
    console.log(match)
} )


//salt= $2a$10$zS/VcFteQ77ikpZmYK6T..
//hash= $2a$10$zS/VcFteQ77ikpZmYK6T..VyxiMbsrohsVaU5Idc.nIxuVBt0jPpW