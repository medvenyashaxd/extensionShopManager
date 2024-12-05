let productModalResults = document.querySelector(".productModalResults")

let observer = new MutationObserver(getMutationRecord)

function getMutationRecord(records) {
    for (let record of records) {
        let nodes = record.addedNodes
        if (nodes.length) {
            parsingAllTdInfo(nodes[0].querySelectorAll('td.issue-info'))
        }
    }
}

function parsingAllTdInfo(productsListHtml) {
    for (let htmlData of productsListHtml) {
        styledTdInfo(htmlData)
    }
}

function searchIncludesText(words, word){
    words = words.toLowerCase().split(" ")
    word = word.toLowerCase()
    return words.includes(word)
}

function styledTdInfo(tdHtmlElement) {
    let inputProductNameText = document.querySelector('input.productModalQuery').value.replace(/"/g, "").replace(/,/g, "").replace(/;/g, "").replace(/\[/g, "").replace(/]/g, "").replace(/\(/g, "").replace(/\)/g, "").trim()
    console.log(inputProductNameText)

    let productNameHtml = tdHtmlElement.querySelector('small')

    let productNameText = productNameHtml.textContent.replace(/"/g, "").replace(/,/g, "").replace(/;/g, "").replace(/\[/g, "").replace(/]/g, "").replace(/\(/g, "").replace(/\)/g, "").trim().split(' ')
    console.log(productNameText)

    let commonWords = ""
    for (let word of productNameText) {
        if (searchIncludesText(inputProductNameText, word)) {
            commonWords += `<span style="background-color: yellow; color: #222; font-weight: bold;">${word}</span> `
        } else {
            commonWords += `<span>${word}</span> `
        }
    }
    productNameHtml.getElementsByTagName("a")[0].innerHTML = commonWords

    console.log(commonWords)
}

observer.observe(
    productModalResults,
    {
        childList: true,
    })
