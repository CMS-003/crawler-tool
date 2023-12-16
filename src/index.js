import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

document.ready = function (callback) {
  ///兼容FF,Google
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
      callback();
    }, false)
  }
  //兼容IE
  else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState == "complete") {
        callback();
      }
    })
  }
  else if (document.lastChild == document.body) {
    callback();
  }
}

const appended = document.querySelector('#door')
if (!appended) {
  setTimeout(() => {
    const files = window.performance.getEntries('resource');
    files.forEach(file => {
      if (file.initiatorType === 'xmlhttprequest' && file.name.includes('.m3u8')) {
        console.log(file.name);
      }
    })
  }, 1000);
  const door = document.createElement('div');
  door.id = "door";
  document.body.append(door)
  const root = ReactDOM.createRoot(document.getElementById('door'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}