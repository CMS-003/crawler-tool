import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const appended = document.querySelector('#door')
if (!appended) {
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