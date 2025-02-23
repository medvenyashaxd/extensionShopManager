function journalLinks() {
    function checkLinks() {
        parsingLinks(document.querySelectorAll('td[aria-describedby="links_table_productName"]'), document.querySelectorAll('td[aria-describedby="links_table_linkedProductName"]'));
        parsingLinks(document.querySelectorAll('td[aria-describedby="links_table_linkedProductName"]'), document.querySelectorAll('td[aria-describedby="links_table_productName"]'),);
    }

    function parsingLinks(links1, links2) {
        for (let i = 0; i < links1.length; i++) {
            let commonWords = getCommonWords(links1[i].innerText.split(" "), links2[i].innerText);
            insertCommonWordsInTdInfo(links1[i], commonWords);
        }
    }

    function insertCommonWordsInTdInfo(htmlElem, commonWords) {
        if (htmlElem.getElementsByTagName("a")[0]) {
            htmlElem.innerHTML = htmlElem.getElementsByTagName("a")[0].outerHTML + " " + commonWords;
        } else {
            htmlElem.innerHTML = commonWords;
        }
    }

    checkLinks();

    let tableObserver = new MutationObserver(checkLinks);
    tableObserver.observe(document.querySelector("tbody"), {
        childList: true,
    });
}

journalLinks();