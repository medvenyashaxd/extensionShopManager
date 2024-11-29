let table = document.querySelector("tbody")

let checkRows = (records) => {
    for (let record of records) {
        if (record.addedNodes.length) {
            let element = document.getElementById(record.addedNodes[0].data)
            if (element) {
                parsingWords(element)
            }
        }
    }
}

let observer = new MutationObserver(checkRows)
observer.observe(
    table,
    {
        childList: true,
        subtree: true
    }
)


function getText(elem) {
    let brandText = elem.querySelector(".brandAndName").innerText.split("\n")[1].split(" ")
    let linkedText = elem.querySelector(".btn.btn-xs.btn-outline.btn-primary").text.split(" ")
    return {
        brandText: brandText,
        linkedText: linkedText,
    }
}


function parsingWords(elem) {
    let words = getText(elem)
    let brandText = getCommonWords(words.brandText, words.linkedText)
    let linkedText = getCommonWords(words.linkedText, words.brandText)
    insertTextInElement(elem, brandText, linkedText)
}


function getCommonWords(words1, words2) {
    let commonWords = ""
    for (let word of words1) {
        if (words2.includes(word)) {
            commonWords += insertStyle(true, word)
        } else {
            commonWords += insertStyle(false, word)
        }
    }
    return commonWords
}

function insertStyle(common, word) {
    if (common) {
        return `<span style="background-color: yellow; color: #222</span> `
    } else {
        return `<span>${word}</span> `
    }
}

function insertTextInElement(elem, brandText, linkedText) {
    let brandElem = elem.querySelector(".brandAndName")
    let smallBrandContent = brandElem.querySelector("small").outerText
    brandElem.innerHTML = smallBrandContent + "<br>" + brandText

    let linkedElem = elem.querySelector(".btn.btn-xs.btn-outline.btn-primary")
    linkedElem.innerHTML = '<i class="fa fa-external-link"></i>' + linkedText
}