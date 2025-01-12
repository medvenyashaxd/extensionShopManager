let productModalResults = document.querySelector(".productModalResults");

let modalObserver = new MutationObserver(checkModalResults);

function checkModalResults(records) {
    for (let record of records) {
        let nodes = record.addedNodes;
        if (nodes.length) {
            parsingAllTdInfo(nodes[0].querySelectorAll('td.issue-info'));
        }
    }
}

function removeBlackCharacters(str) {
    return str.replace(/"/g, "").replace(/,/g, "").replace(/;/g, "").replace(/\[/g, "").replace(/]/g, "").replace(/\(/g, "").replace(/\)/g, "").trim();
}

function parsingAllTdInfo(productsListHtml) {
    let inputProductNameText = removeBlackCharacters(document.querySelector('input.productModalQuery').value);
    for (let htmlElem of productsListHtml) {
        let smallElem = htmlElem.querySelector('small');
        let productNameText = removeBlackCharacters(smallElem.textContent);
        insertCommonWordsInTdInfo(smallElem, getCommonWords(productNameText.split(" "), inputProductNameText, true));
    }
}

function searchIncludesText(words, word) {
    words = words.toLowerCase().split(" ");
    word = word.toLowerCase();
    return words.includes(word)
}

function insertCommonWordsInTdInfo(htmlElem, commonWords) {
    htmlElem.getElementsByTagName("a")[0].innerHTML = commonWords;
}

function getCommonWords(words1, words2, td) {
    let commonWords = "";
    for (let word of words1) {
        if (searchIncludesText(words2, word)) {
            commonWords += insertStyle(true, word, td);
        } else {
            commonWords += insertStyle(false, word, td);
        }
    }
    return commonWords
}

function insertStyle(common, word, td) {
    if (common) {
        return `<span style="background-color: yellow; color: #222;${td ? 'font-weight: bold;' : ''}">${word}</span> `;
    } else {
        return `<span>${word}</span> `;
    }
}

modalObserver.observe(
    productModalResults,
    {
        childList: true,
    });