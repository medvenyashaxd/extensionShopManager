let inputProductNameText = document.querySelector('input.productModalQuery').value.replace(/"/g, "").replace(/-/g, " ").replace(/\(/g, "").replace(/\)/g, "").trim().toUpperCase().split(' ')
console.log(inputProductNameText)
let productsListHtml = document.querySelectorAll('td.issue-info')


function parsingAllTdInfo () {
    for (let htmlData of productsListHtml) {
        styledTdInfo(htmlData)
    }
}

function styledTdInfo (tdHtmlElement) {
    let productNameHtml = tdHtmlElement.querySelector('small')

    let productNameText = productNameHtml.textContent.replace(/"/g, "", ).replace(/-/g, " ").replace(/\(/g, "").replace(/\)/g, "").trim().toUpperCase().split(' ')
    console.log(productNameText)

    let commonWords = ""

    for (let word of productNameText) {
        if (inputProductNameText.includes(word)) {
           commonWords += `<span style="background-color: yellow; color: #222; font-weight: bold;">${word}</span> `
        }
        else {
            commonWords += `${word} `
        }
    }
    productNameHtml.getElementsByTagName("a")[0].innerHTML = commonWords

    console.log(commonWords)
}

parsingAllTdInfo()
