chrome.contextMenus.create({
  id: 'bypass',
  title: 'Bypass phiếu khảo sát',
  contexts: ['all'],
  documentUrlPatterns: ['https://sv.iuh.edu.vn/*'],
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'bypass') {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['bypass.js'],
    })
  }
})
