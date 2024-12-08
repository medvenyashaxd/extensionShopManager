let table = document.querySelector("tbody")

let checkRows = (records) => {
    for (let record of records) {
        if (record.addedNodes.length) {
            let element = document.getElementById(record.addedNodes[0].data)
            if (element) {
                parsingRowWords(element)
            }
        }
    }
}

let tableObserver = new MutationObserver(checkRows)
tableObserver.observe(
    table,
    {
        childList: true,
        subtree: true
    }
)

function removeBlackCharacters(str) {
    return str.replace(/"/g, "").replace(/,/g, "").replace(/;/g, "").replace(/\[/g, "").replace(/]/g, "").replace(/\(/g, "").replace(/\)/g, "").trim()
}

function getRowText(elem) {
    let brandText = removeBlackCharacters(elem.querySelector(".brandAndName").innerText)
    let linkedText = removeBlackCharacters(elem.querySelector(".btn.btn-xs.btn-outline.btn-primary").text)
    if (brandText.includes("\n")) {
        brandText = brandText.split("\n")[1]
    }
    return {
        brandText: brandText,
        linkedText: linkedText,
    }
}

function parsingRowWords(elem) {
    let words = getRowText(elem)
    let brandText = getCommonWords(words.brandText.split(" "), words.linkedText)
    let linkedText = getCommonWords(words.linkedText.split(" "), words.brandText)
    insertRowTextInElement(elem, brandText, linkedText)
}

function searchIncludesText(words1, words2){
    words1 = words1.toLowerCase()
    words2 = words2.toLowerCase()
    return words1.includes(words2)
}

function getCommonWords(words1, words2) {
    let commonWords = ""
    for (let word of words1) {
        if (searchIncludesText(words2, word)) {
            commonWords += insertStyle(true, word)
        } else {
            commonWords += insertStyle(false, word)
        }
    }
    return commonWords
}

function insertStyle(common, word) {
    if (common) {
        return `<span style="background-color: yellow; color: #222">${word}</span> `
    } else {
        return `<span>${word}</span> `
    }
}

function insertRowTextInElement(elem, brandText, linkedText) {
    let brandElem = elem.querySelector(".brandAndName")
    brandElem.querySelector("small") ? brandElem.innerHTML = `<small>${brandElem.querySelector("small").outerText}</small><br>${brandText}` : brandElem.innerHTML = brandText

    let linkedElem = elem.querySelector(".btn.btn-xs.btn-outline.btn-primary")
    linkedElem.innerHTML = '<i class="fa fa-external-link"></i> ' + linkedText
}