import searchIncludesText from './main'
import removeBlackCharacters from './main'
import insertStyle from './main'
import getCommonWords from './main'
import productModalResults from './main'

function checkModalResults(records) {
    for (let record of records) {
        let nodes = record.addedNodes;
        if (nodes.length) {
            parsingAllTdInfo(nodes[0].querySelectorAll('td.issue-info'));
        }
    }
}

function parsingAllTdInfo(productsListHtml) {
    let inputProductNameText = removeBlackCharacters(document.querySelector('input.productModalQuery').value);
    for (let htmlElem of productsListHtml) {
        let smallElem = htmlElem.querySelector('small');
        let productNameText = removeBlackCharacters(smallElem.textContent);
        insertCommonWordsInTdInfo(smallElem, getCommonWords(productNameText.split(" "), inputProductNameText, true));
    }
}

function insertCommonWordsInTdInfo(htmlElem, commonWords) {
    htmlElem.getElementsByTagName("a")[0].innerHTML = commonWords;
}

let modalObserver = new MutationObserver(checkModalResults);
modalObserver.observe(
    productModalResults,
    {
        childList: true,
    });