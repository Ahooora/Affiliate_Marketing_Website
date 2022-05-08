'use strict'

import { login } from "./xhr.js";

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
document.querySelector('.btn.solid').onclick = async()=>{
    let data = await login()
    if( data === 'U are logged in') {
        location.replace('/private/dashboard.html')
    }
}




// xmlhttp

// als nächsteres erstellen: