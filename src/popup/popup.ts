let divContainer = document.getElementById("container")

chrome.storage.sync.get(null, (items => {
    for (const [key, value] of Object.entries(items)) {
        
        let div = document.createElement('div')
        let button = document.createElement('button')
        button.innerText = "Delete"
        let text = document.createElement('b')

        text.innerText  = value

        div.appendChild(text)
        div.appendChild(button)

        text.onclick = () => {
            chrome.tabs.create({url: value})
        }

        button.onclick = () => {
            chrome.storage.sync.remove(key, () => {
                div.remove()
            })
        }

        divContainer.appendChild(div)
            
      }
}))

