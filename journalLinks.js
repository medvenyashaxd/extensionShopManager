let table = document.querySelector("tbody")

function checkLinks() {
    let productNames = document.querySelectorAll('td[aria-describedby="links_table_productName"]');
    let linkedProductNames = document.querySelectorAll('td[aria-describedby="links_table_linkedProductName"]');
    parsingLinks(productNames, linkedProductNames);
    parsingLinks(linkedProductNames, productNames);
}

function parsingLinks(links1, links2) {
    for (let i = 0; i < links1.length; i++) {
        let commonWords = getCommonWords(links1[i].innerText.split(" "), links2[i].innerText);
        insertCommonWordsInTdInfo(links1[i], commonWords);
    }
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

function searchIncludesText(words, word) {
    words = words.toLowerCase().split(" ");
    word = word.toLowerCase();
    return words.includes(word)
}

function insertStyle(common, word, td) {
    if (common) {
        return `<span style="background-color: yellow; color: #222;${td ? 'font-weight: bold;' : ''}">${word}</span> `;
    } else {
        return `<span>${word}</span> `;
    }
}

function insertCommonWordsInTdInfo(htmlElem, commonWords) {
    if (htmlElem.getElementsByTagName("a")[0]) {
        htmlElem.getElementsByTagName("a")[0].innerHTML = htmlElem.getElementsByTagName("a")[0].innerHTML + " " + commonWords;
    } else {
        htmlElem.innerHTML = commonWords;
    }
}

checkLinks();


let tableObserver = new MutationObserver(checkLinks);
tableObserver.observe(
    table,
    {
        childList: true,
    }
);