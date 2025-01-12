function searchIncludesText(words, word) {
    words = words.toLowerCase().split(" ");
    word = word.toLowerCase();
    return words.includes(word)
}

function removeBlackCharacters(str) {
    return str.replace(/"/g, "").replace(/,/g, "").replace(/;/g, "").replace(/\[/g, "").replace(/]/g, "").replace(/\(/g, "").replace(/\)/g, "").trim();
}

function insertStyle(common, word, td = false) {
    if (common) {
        return `<span style="background-color: yellow; color: #222;${td ? 'font-weight: bold;' : ''}">${word}</span> `;
    } else {
        return `<span>${word}</span> `;
    }
}

function getCommonWords(words1, words2, td = false) {
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