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

let tableObserver = new MutationObserver(checkRows);
tableObserver.observe(
    document.querySelector("tbody"),
    {
        childList: true,
        subtree: true
    }
);