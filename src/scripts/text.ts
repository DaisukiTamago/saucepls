console.log('eh o scriptaskkk ?')

function removeWhiteSpaces(text: string): string {
    return text.replace(/ /g, '')
}

let toastDiv = document.createElement('div')
toastDiv.id = "snackbar"
document.body.appendChild(toastDiv)

function isValidURL(text: string): boolean {

    // if(text.('http') || text.includes('https')){
    //     return true
    // } else {
    //     return false
    // }

    return true
}

window.onmouseup = () => {
    let selectedNode = window.getSelection()
    let selectedText = selectedNode.toString()

    if (selectedText) {
        selectedText = removeWhiteSpaces(selectedText)
        const messageToBackgroundScript: Message = { payload: selectedText, type: 'onTextSelected' }
        chrome.runtime.sendMessage(messageToBackgroundScript)
    }
}

chrome.runtime.onMessage.addListener((message) => {

    toastDiv.className = "show"
    toastDiv.textContent = "Sauce Saved: " + message

    setTimeout(() => {
        toastDiv.className = ""
    }, 3000)
})
