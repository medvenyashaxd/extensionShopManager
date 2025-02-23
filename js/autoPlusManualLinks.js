function autoPlusManualLinks() {
    function checkModalResults(records) {
        for (let record of records) {
            let nodes = record.addedNodes;
            if (nodes.length) {
                parsingAllTdInfo(nodes[0].querySelectorAll('td.issue-info'));
            }
        }
    }

    let checkRows = (records) => {
        for (let record of records) {
            if (record.addedNodes.length) {
                let element = document.getElementById(record.addedNodes[0].data);
                if (element) {
                    parsingRowWords(element);
                }
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

    function getRowText(elem) {
        let brandText = removeBlackCharacters(elem.querySelector(".brandAndName").innerText);
        let linkedText = removeBlackCharacters(elem.querySelector(".btn.btn-xs.btn-outline.btn-primary").text);
        if (brandText.includes("\n")) {
            brandText = brandText.split("\n")[1];
        }
        return {
            brandText: brandText, linkedText: linkedText,
        }
    }

    function parsingRowWords(elem) {
        let words = getRowText(elem);
        let brandText = getCommonWords(words.brandText.split(" "), words.linkedText);
        let linkedText = getCommonWords(words.linkedText.split(" "), words.brandText);
        insertRowTextInElement(elem, brandText, linkedText);
    }

    function insertRowTextInElement(elem, brandText, linkedText) {
        let brandElem = elem.querySelector(".brandAndName");
        brandElem.querySelector("small") ? brandElem.innerHTML = `<small>${brandElem.querySelector("small").outerText}</small><br>${brandText}` : brandElem.innerHTML = brandText;

        let linkedElem = elem.querySelector(".btn.btn-xs.btn-outline.btn-primary");
        linkedElem.innerHTML = '<i class="fa fa-external-link"></i> ' + linkedText;
    }

    function insertCommonWordsInTdInfo(htmlElem, commonWords) {
        htmlElem.getElementsByTagName("a")[0].innerHTML = commonWords;
    }

    let tableObserver = new MutationObserver(checkRows);
    tableObserver.observe(document.querySelector("tbody"), {
        childList: true, subtree: true
    });

    let modalObserver = new MutationObserver(checkModalResults);
    modalObserver.observe(document.querySelector(".productModalResults"), {
        childList: true,
    });
}

autoPlusManualLinks();