// let table = document.querySelector("tbody")
//
// let checkRows = (records) => {
//     for (let record of records) {
//         if (record.addedNodes.length) {
//             let element = document.getElementById(record.addedNodes[0].data)
//             if (element) {
//                 parsingWords(element)
//             }
//         }
//     }
// }
//
// let observer = new MutationObserver(checkRows)
// observer.observe(
//     table,
//     {
//         childList: true,
//         subtree: true
//     }
// )
//
function getText() {
    // let brand = element.querySelector(".brandAndName")
    // let brandText = brand.innerText.split("\n")[1]
    // // let smallBrandContent = brand.querySelector("small").outerText
    // // brand.innerHTML = smallBrandContent + "<br><span></span>"
    //
    //
    // let linked_name = element.querySelector(".btn.btn-xs.btn-outline.btn-primary").text
    // // linked_name.innerHTML = '<i class="fa fa-external-link"></i><span style="background-color: yellow;"> new text</span>'
    // return {
    //     brandText: brandText,
    //     linked_name: linked_name,
    let brandAndName = "ИНТЕРСКОЛ 862.2.2.70 Шуруповерт Интерскол ШАУ-250/36ВЭ".split(" ")
    let testName = "ИНТЕРСКОЛ ШАУ-250/36ВЭ 862.2.2.70".split(" ")
    return {
        brandText: brandAndName,
        linked_name: testName,
    }
}


function parsingWords() {
    let words = getText()
    let res1 = getCommonWords(words.brandText, words.linked_name)
    let res2 = getCommonWords(words.linked_name, words.brandText)
    console.log(res1)
    console.log(res2)
}


function getCommonWords(words1, words2) {
    let commonWords = ""
    for (let word of words1) {
        if (words2.includes(word)) {
            commonWords += styledWords(true, word)
        } else {
            commonWords += styledWords(false, word)
        }
    }
    return commonWords
}

function styledWords(common, word) {
    if (common) {
        return `<span style="background-color: yellow; color: #222; font-weight: bold;">${word}</span> `
    } else {
        return `<span>${word}</span> `
    }
}

parsingWords()