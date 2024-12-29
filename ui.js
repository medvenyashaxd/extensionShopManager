let autoPlusManualLinksStatus = document.getElementById("autoPlusManualLinks");
let manualLinksStatus = document.getElementById("manualLinks");
let autoLinksStatus = document.getElementById("autoLinks");
let checkJournalLinksStatus = document.getElementById("checkJournalLinks")

function loadCheckboxState() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        let tab_id = tabs[0].id;
        chrome.storage.session.get([tab_id.toString()], (result) => {
            let state = result[tab_id] || {};
            autoPlusManualLinksStatus.checked = state.autoPlusManualLinks || false;
            manualLinksStatus.checked = state.manualLinks || false;
            autoLinksStatus.checked = state.autoLinks || false;
            checkJournalLinksStatus.checked = state.checkJournalLinks || false;
        });
    });
}

function saveCheckboxState(scriptName, status) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        let tab_id = tabs[0].id;
        let state = {
            autoPlusManualLinks: autoPlusManualLinksStatus.checked,
            manualLinks: manualLinksStatus.checked,
            autoLinks: autoLinksStatus.checked,
            checkJournalLinks: checkJournalLinksStatus.checked,
        };
        chrome.storage.session.set({[tab_id.toString()]: state});
        enableOrDisableScript(scriptName, state, tab_id)
    });
}

function testDisableObs() {
    tableObserver.disconnect()
    modalObserver.disconnect()
}

function testRunObs () {
    let tableObserver = new MutationObserver(checkRows)
tableObserver.observe(
    table,
    {
        childList: true,
        subtree: true
    }
)

let modalObserver = new MutationObserver(checkModalResults)
modalObserver.observe(
    productModalResults,
    {
        childList: true,
    }
)
}

function enableOrDisableScript(scriptName, state, tab) {
    if (scriptName === "autoPlusManualLinks" && state.autoPlusManualLinks) {
        alert("запуск autoPlusManualLinks")
        chrome.scripting.executeScript(
            {
                target: {tabId: tab, allFrames: false},
                files: ["manual + auto.js"],
            },
        );
    } else {
        alert("отключение autoPlusManualLinks")
        chrome.scripting.executeScript(
            {
                target: {tabId: tab, allFrames: false},
                func: testDisableObs,
            }
        )
    }
}

loadCheckboxState();

autoPlusManualLinksStatus.onchange = () => {
    saveCheckboxState("autoPlusManualLinks");
}
manualLinksStatus.onchange = saveCheckboxState;
autoLinksStatus.onchange = saveCheckboxState;
checkJournalLinksStatus.onchange = saveCheckboxState;
