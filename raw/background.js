chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    const url = new URL(changeInfo.url);

    // 如果路径不以 "watch" 结尾，总是发送消息
    if (!url.pathname.endsWith('/watch')) {
      chrome.tabs.sendMessage(tabId, { type: 'url', url: changeInfo.url });
    }
    // 如果路径不是以 "watch" 结尾，只有当 pathname 改变时才发送消息
    else {
      const oldUrl = tab.url ? new URL(tab.url) : null;

      // 如果 oldUrl 不存在（页面首次加载）或者 v 参数改变了
      if (!oldUrl || oldUrl.searchParams.get('v') !== url.searchParams.get('v')) {
        chrome.tabs.sendMessage(tabId, { type: 'url', url: changeInfo.url });
      }
      // 如果只是查询参数变化，则不发送消息
    }
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
  chrome.tabs.sendMessage(tab.id, { type: 'contextmenu', value: info.menuItemId, url: info.linkUrl || info.pageUrl });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "cookies") {
    chrome.cookies.getAll({ url: message.origin }, (cookies) => {
      sendResponse({ cookies });
    });
    return true;
  }
});