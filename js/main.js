function searchIncludesText(words, word) {
    words = words.toLowerCase().split(" ");
    word = word.toLowerCase();
    return words.includes(word)
}

function removeBlackCharacters(str) {
    return str.replace(/"/g, "").replace(/,/g, "").replace(/;/g, "").replace(/\[/g, "").replace(/]/g, "").replace(/\(/g, "").replace(/\)/g, "").trim();
}

function insertStyle(common, word, td) {
    if (common) {
        return `<span style="background-color: yellow; color: #222;${td ? 'font-weight: bold;' : ''}">${word}</span> `;
    } else {
        return `<span>${word}</span> `;
    }
}