let link = ''

function openNewTab(url: string) {
    chrome.tabs.create({ url })
}

chrome.runtime.onInstalled.addListener(() => {

    chrome.contextMenus.removeAll(() => {

        chrome.contextMenus.create({
            title: `Go to sauce`,
            id: "sauce-go",
            contexts: ["selection"],
        })

        chrome.contextMenus.create({
            title: "Save this sauce",
            id: "sauce-save",
            contexts: ["selection"]
        })

        chrome.contextMenus.onClicked.addListener((info, tab) => {
            console.log('click event')
            if (info.menuItemId === "sauce-go") {
                openNewTab(link)
            }

            if (info.menuItemId === "sauce-save") {
                chrome.storage.sync.set({ [link]: link }, () => {
                    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                        chrome.tabs.sendMessage(tabs[0].id, link)
                    })

                })

            }

        })

    })
})


chrome.runtime.onMessage.addListener((message: Message) => {
    link = message.payload
})
