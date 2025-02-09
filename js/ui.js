let autoPlusManualLinksButton = document.getElementById("autoPlusManualLinks");
autoPlusManualLinksButton.onclick = () => {
    clickedStartScriptButton("autoPlusManualLinks", autoPlusManualLinksButton);
};

let manualLinksButton = document.getElementById("manualLinks");
manualLinksButton.onclick = () => {
    clickedStartScriptButton("manualLinks", manualLinksButton);
};

let autoLinksButton = document.getElementById("autoLinks");
autoLinksButton.onclick = () => {
    clickedStartScriptButton("autoLinks", autoLinksButton);
};

let checkJournalLinksButton = document.getElementById("checkJournalLinks");
checkJournalLinksButton.onclick = () => {
    clickedStartScriptButton("journalLinks", checkJournalLinksButton);
};

function runScript(script) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tab = tabs[0];
        if (tab) {
            chrome.scripting.executeScript(
                {
                    target: {tabId: tab.id},
                    files: ["./js/common.js", "./js/" + script + ".js"]
                }
            );
        }
    });
}

function clickedStartScriptButton(script, button) {
    button.innerText = "Включено";
    setTimeout(() => {
        button.innerText = "Включить"
    }, 2000);
    runScript(script);
}