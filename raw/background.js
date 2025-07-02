chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, { type: 'url', url: changeInfo.url });
  }
});
// 创建右键菜单
chrome.contextMenus.create({
  id: "clear_host",
  title: "清空白名单",
  contexts: ["all"]
});
chrome.contextMenus.create({
  id: "add_host",
  title: "加入白名单",
  contexts: ["all"]
});
chrome.contextMenus.create({
  id: "del_host",
  title: "删除白名单",
  contexts: ["all"]
});
chrome.contextMenus.create({
  id: "patch_url",
  title: "抓取数据",
  contexts: ["link"]
});

// 监听右键菜单点击事件
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  // info: menuItemId,parentMenuItemId,mediaType,linkUrl,srcUrl,pageUrl,frameUrl,selectionText,editable
  chrome.tabs.sendMessage(tab.id, { type: 'contextmenu', value: info.menuItemId, url: info.linkUrl || '' });
});
