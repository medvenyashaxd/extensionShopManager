import searchIncludesText from './main'
import removeBlackCharacters from './main'
import insertStyle from './main'
import getCommonWords from './main'


let table = document.querySelector("tbody");

let checkRows = (records) => {
    for (let record of records) {
        if (record.addedNodes.length) {
            let element = document.getElementById(record.addedNodes[0].data);
            if (element) {
                parsingWords(element);
            }
        }
    }
}

let observer = new MutationObserver(checkRows);
observer.observe(
    table,
    {
        childList: true,
        subtree: true
    }
);

function getText(elem) {
    let brandText = removeBlackCharacters(elem.querySelector(".brandAndName").innerText);
    let linkedText = removeBlackCharacters(elem.querySelector(".btn.btn-xs.btn-outline.btn-primary").text);
    if (brandText.includes("\n")) {
        brandText = brandText.split("\n")[1]
    }
    return {
        brandText: brandText,
        linkedText: linkedText,
    }
}

function parsingWords(elem) {
    let words = getText(elem);
    let brandText = getCommonWords(words.brandText.split(" "), words.linkedText);
    let linkedText = getCommonWords(words.linkedText.split(" "), words.brandText);
    insertTextInElement(elem, brandText, linkedText);
}

function insertTextInElement(elem, brandText, linkedText) {
    let brandElem = elem.querySelector(".brandAndName");
    brandElem.querySelector("small") ? brandElem.innerHTML = `<small>${brandElem.querySelector("small").outerText}</small><br>${brandText}` : brandElem.innerHTML = brandText;

    let linkedElem = elem.querySelector(".btn.btn-xs.btn-outline.btn-primary");
    linkedElem.innerHTML = '<i class="fa fa-external-link"></i> ' + linkedText;
}