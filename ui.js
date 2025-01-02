let autoPlusManualLinksButton = document.getElementById("autoPlusManualLinks")
autoPlusManualLinksButton.onchange = () => {
    clickedStartScriptButton("autoPlusManualLinks", autoPlusManualLinksButton)
};

document.getElementById("manualLinks").onchange = function () {
    console.log(this.checked, "manualLinks");
};
document.getElementById("autoLinks").onchange = function () {
    console.log(this.checked, "autoLinks");
};
document.getElementById("checkJournalLinks").onchange = function () {
    console.log(this.checked, "checkJournalLinks");
};

function clickedStartScriptButton (script, elem) {
    elem.innerText = "Активировано"
    setTimeout(() => {elem.innerText = "Включить"}, 3000)
}