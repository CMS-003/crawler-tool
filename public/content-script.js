chrome.runtime.onMessage.addListener(function (request, sender, sendReponse) {
  console.log(request, 'debug')
})