let inputProductNameText = document.querySelector('input.productModalQuery').value.toUpperCase().split(' ')
let productsListHtml = document.querySelectorAll('td.issue-info')


function parsingAllTdInfo () {
    for (let htmlData of productsListHtml) {
        styledTdInfo(htmlData)
    }
}

function styledTdInfo (tdHtmlElement) {
    let count = 0
    let productNameHtml = tdHtmlElement.querySelector('small')
    let productNameText = productNameHtml.textContent.toUpperCase().split(' ')
    let commonWords = ""

    for (let word of productNameText) {
        if (inputProductNameText.includes(word)) {
           commonWords += `<span style="color: red; font-weight: bold;">${word}</span> `
        }
        else {
            commonWords += `${word} `
        }
    }

    productNameHtml.getElementsByTagName("a")[count].innerHTML = commonWords
    count++
}

parsingAllTdInfo()
