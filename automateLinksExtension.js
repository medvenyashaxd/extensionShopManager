let table = document.querySelector("tbody")

let checkRows = (records) => {
    for (let record of records) {
        if (record.addedNodes.length) {
            let element = document.getElementById(record.addedNodes[0].data)
            if (element) {
                console.log(element)
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

function getText(element) {
    let brand = element.querySelector(".brandAndName")
    let smallBrandContent = brand.querySelector("small").outerText
    let brandText = brand.innerText.split("\n")[1]
    brand.innerHTML = smallBrandContent + "<br><span></span>"

    let linked_name = element.querySelector(".btn.btn-xs.btn-outline.btn-primary").text
    linked_name.innerHTML = '<i class="fa fa-external-link"></i><span style="background-color: yellow;"> new text</span>'
}

let brandAndName = "ИНТЕРСКОЛ 862.2.2.70 Шуруповерт Интерскол ШАУ-250/36ВЭ".split(" ")
let testName = "ИНТЕРСКОЛ ШАУ-250/36ВЭ 862.2.2.70".split(" ")

function parsingWords(words1, words2) {
    let commonWords = ""
    for (let word of words1) {
        if (words2.includes(word)) {
            commonWords += `<span style="background-color: yellow; color: #222; font-weight: bold;">${word}</span> `
        } else {
            commonWords += `<span>${word}</span> `
        }
    }
    return commonWords
}

console.log(parsingWords(brandAndName, testName))