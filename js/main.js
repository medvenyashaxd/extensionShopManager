function searchIncludesText(words, word) {
    words = words.toLowerCase().split(" ");
    word = word.toLowerCase();
    return words.includes(word)
}