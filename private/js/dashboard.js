
let toggle = document.querySelector('.toggle')
let navigation = document.querySelector('.navigation')
let main = document.querySelector('.main')
let totalIncome = 0
let totalClicks = 0
let list = $('.navigation li')

toggle.onclick = function () {
    navigation.classList.toggle('active')
    main.classList.toggle('active')
}

const companyCardsElement = document.getElementsByClassName('companyCards')[0]


function $(cssSelector) {
    if(cssSelector.includes("#")) return document.getElementById(cssSelector.substring(1))

    const elements = document.querySelectorAll(cssSelector)
    if (elements.length === 1) {
        return elements[0]
    } else {
        return elements
    }

}



function printTextToHtml(cssSelector, value) {
    $(cssSelector).textContent = value
}

function activeLink() {
    list.forEach((item) =>
        item.classList.remove('hovered'))
    this.classList.add('hovered')
}

function averageIncome() {
    const result = (totalIncome / totalClicks).toFixed(2)
    console.log("result", result)
    console.log("totalIncome", totalIncome)
    console.log("totalClicks", totalClicks)
    printTextToHtml("#averageIncome", result)
}

async function httpClient(uri, method, postData) {
    try {
        const companyLinks = await axios[method](uri, postData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        return companyLinks.data
    } catch (error) {
        console.error(error)
    }
}

// "2"
async function fetchCompanieLinks() {
    const result =  await httpClient('/company-links', "get", null)
    return result
}

// "2"
async function fetchCompanies() {
    const result = await httpClient('/companies', "get", null)
    return result
}

// "2"
async function fetchTotalIncome() {
    const data = await httpClient('/total-income', "get", null)
    printTextToHtml("#totalIncome", data.totalIncomePerUser)
    return data.totalIncomePerUser
}

// "3" it is updated when we click on company
async function fetchCountClicks() {
    const data = await httpClient('/count-click', "get", null)
    printTextToHtml("#totalClicks", data.count)
    return data.count
}


// "2" because we click on div
async function generateLink(companyId) {
    const data = await httpClient('/generate-link', "post", {companyId})
    const companyInputElement = $(`#${data.companyId}`)
    
    if (companyInputElement.value) {
        window.open(data.link, "_blank")
    }
    companyInputElement.value = data.link
    companyInputElement.addEventListener("click", (event) => {
        event.stopPropagation()
    })
    await fetchCountClicks()
    await fetchTotalIncome()
}


// Start rendering companies "1"
async function renderCompanies() {
    const companyData = await fetchCompanies()
    const companyLinks = await fetchCompanieLinks()
    totalIncome = await fetchTotalIncome()
    totalClicks = await fetchCountClicks()
    averageIncome()


    let companyCardsTemplate = ''
    companyData.forEach((companyInfo) => {
        const link = companyLinks.find((cl) => cl.companyId === companyInfo._id)

        companyCardsTemplate += `
                <div onclick="generateLink('${companyInfo._id}')" class="companyLinks">
                    <div class="card">
                        <div>
                            <div class="numbers">${companyInfo.pricePerClick/100}€</div>
                            <div class="cardName">${companyInfo.name}</div>
                            <input class="link-input" id="${companyInfo._id}" type="text" value="${link?.link || ''}" />
                        </div>
                        <div class="iconBox">
                            <img class="logo" src="${companyInfo.logo}">
                        </div>
                        
                    </div>
                </div>
                `
    })
    companyCardsElement.innerHTML = companyCardsTemplate
}




list.forEach((item) =>
    item.addEventListener('mouseover', activeLink))

$('#company').onclick = function () {
    let company = $('.companyCards').style.display = 'grid'
    $('#overview').setAttribute('hidden', 'true')
}

$("#overviewtoggle").onclick = function () {
    $('.companyCards').style.display = 'none'
    $('#overview').removeAttribute('hidden')
}

fetchTotalIncome()
fetchCountClicks()
renderCompanies()
