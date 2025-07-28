function createElement(tag, { style = {}, ...props }) {
  const element = document.createElement(tag);
  Object.keys(style).forEach(k => {
    element.style[k] = style[k];
  });
  Object.keys(props).forEach(k => {
    element[k] = props[k];
  });
  return element;
}
function _get(obj, path, defaultValue) {
  if (!obj || !path) {
    return defaultValue;
  }

  const keys = path.split('.');
  let result = obj;

  for (let key of keys) {
    result = result[key];
    if (result === undefined || result === null) {
      return defaultValue;
    }
  }

  return result !== undefined ? result : defaultValue;
}
function getNetscapeCookies(cookies) {
  const lines = cookies.map(cookie => {
    const domain = cookie.domain.startsWith('.') ? cookie.domain : '.' + cookie.domain;
    const flag = cookie.domain.startsWith('.') ? 'TRUE' : 'FALSE';
    const path = cookie.path || '/';
    const secure = cookie.secure ? 'TRUE' : 'FALSE';
    const expiration = cookie.expirationDate ? Math.floor(cookie.expirationDate) : 1893456000; // fallback: 2030
    return `${domain}\t${flag}\t${path}\t${secure}\t${expiration}\t${cookie.name}\t${cookie.value}`;
  });

  const header = "# Netscape HTTP Cookie File\n";
  return header + lines.join('\n');
}
let white_list = [];
const CONSTANT = {
  BASE_URL: 'https://192.168.0.124',
  // 边界间距
  MARGIN: 15,
  // 本身尺寸大小
  SIZE: 32,
  // 任务状态
  LOADING: 'LOADING',
  NOMATCH: 'NOMATCH',
  MATCHED: 'MATCHED',
  SYNCING: 'SYNCING',
  SUCCESS: 'SUCCESS',
  ERRORED: 'ERRORED',
  IMAGES: {
    'LOADING': '<svg t="1711618051244" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3449" width="200" height="200"><g><animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 512 512" to="360 512 512" dur="2s" repeatCount="indefinite" /><path d="M384 128A64 64 13680 1 0 640 128 64 64 13680 1 0 384 128zM655.53 240.47A64 64 13680 1 0 911.53 240.47 64 64 13680 1 0 655.53 240.47zM832 512A32 32 13680 1 0 960 512 32 32 13680 1 0 832 512zM719.53 783.53A32 32 13680 1 0 847.53 783.53 32 32 13680 1 0 719.53 783.53zM448.002 896A32 32 13680 1 0 576.002 896 32 32 13680 1 0 448.002 896zM176.472 783.53A32 32 13680 1 0 304.472 783.53 32 32 13680 1 0 176.472 783.53zM144.472 240.47A48 48 13680 1 0 336.472 240.47 48 48 13680 1 0 144.472 240.47zM56 512A36 36 13680 1 0 200 512 36 36 13680 1 0 56 512z" fill="#000000" p-id="3450"></path><animateTransform></g></svg>',
    'NOMATCH': '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1668675516561" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2437" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M828.704099 196.575729C744.096116 112.384034 631.648434 66.016073 512 66.016073s-232.1288 46.367961-316.736783 130.559656C110.624271 280.800108 64 392.831501 64 512c0 119.199462 46.624271 231.199892 131.232254 315.424271 84.607983 84.191695 197.088348 130.559656 316.736783 130.559656s232.1288-46.367961 316.704099-130.559656c84.67163-84.255342 131.295901-196.288456 131.263217-315.455235C959.967316 392.800538 913.375729 280.800108 828.704099 196.575729zM736.00086 544.00086 544.00086 544.00086l0 192c0 17.695686-14.336138 32.00086-32.00086 32.00086s-32.00086-14.303454-32.00086-32.00086L479.99914 544.00086 288.00086 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l192 0L480.00086 288.00086c0-17.664722 14.336138-32.00086 32.00086-32.00086s32.00086 14.336138 32.00086 32.00086l0 192 192 0c17.695686 0 32.00086 14.336138 32.00086 32.00086S753.696546 544.00086 736.00086 544.00086z" p-id="2438"></path></svg>',
    'MATCHED': '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1668737203871" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23675" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 0 1 755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l0.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8z m756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 0 1 512.1 856a342.24 342.24 0 0 1-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 0 0-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-0.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 0 0-8-8.2z" p-id="23676"></path></svg>',
    'MORE': '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1668676061297" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3140" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M223.962372 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S276.942718 607.897867 223.962372 607.897867z" p-id="3141"></path><path d="M511.913993 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S564.894339 607.897867 511.913993 607.897867z" p-id="3142"></path><path d="M800.037628 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S852.84596 607.897867 800.037628 607.897867z" p-id="3143"></path></svg>',
    'SYNCING': '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1668737203871" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23675"    xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><g><!-- 动画元素：无限旋转 --><animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 512 512" to="360 512 512" dur="1.5s" repeatCount="indefinite" /> <!-- 原始路径 --><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 0 1 755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l0.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8z m756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 0 1 512.1 856a342.24 342.24 0 0 1-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 0 0-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-0.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 0 0-8-8.2z"p-id="23676"></path></g></svg>',
    'SUCCESS': '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1668675733182" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2715" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 65.983389c-245.919634 0-446.016611 200.095256-446.016611 446.016611 0 245.952318 200.064292 446.016611 446.016611 446.016611S958.016611 757.952318 958.016611 512C958.016611 266.080366 757.952318 65.983389 512 65.983389zM727.231286 438.432254 471.00766 697.439161c-0.063647 0.063647-0.192662 0.096331-0.25631 0.192662-0.096331 0.063647-0.096331 0.192662-0.192662 0.25631-2.048757 1.983389-4.575729 3.19957-6.944443 4.544765-1.183497 0.672598-2.143368 1.696116-3.392232 2.176052-3.839484 1.536138-7.904314 2.33603-11.967424 2.33603-4.095794 0-8.224271-0.799892-12.096439-2.399677-1.279828-0.543583-2.303346-1.632469-3.519527-2.303346-2.368714-1.343475-4.832039-2.528692-6.880796-4.544765-0.063647-0.063647-0.096331-0.192662-0.159978-0.25631-0.063647-0.096331-0.192662-0.096331-0.25631-0.192662l-126.016611-129.503454c-12.320065-12.672705-12.032791-32.928047 0.639914-45.248112 12.672705-12.287381 32.895364-12.063755 45.248112 0.639914l103.26354 106.112189 233.279613-235.839269c12.416396-12.576374 32.704421-12.703669 45.248112-0.25631C739.520387 405.600538 739.647682 425.85588 727.231286 438.432254z" p-id="2716"></path></svg>',
    'ERRORED': '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1668675706282" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2576" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 64c-247.00852 0-448 200.960516-448 448S264.960516 960 512 960c247.00852 0 448-200.960516 448-448S759.039484 64 512 64zM694.752211 649.984034c12.480043 12.54369 12.447359 32.768069-0.063647 45.248112-6.239161 6.208198-14.399785 9.34412-22.591372 9.34412-8.224271 0-16.415858-3.135923-22.65674-9.407768l-137.60043-138.016718-138.047682 136.576912c-6.239161 6.14455-14.368821 9.247789-22.496761 9.247789-8.255235 0-16.479505-3.168606-22.751351-9.504099-12.416396-12.576374-12.320065-32.800753 0.25631-45.248112l137.887703-136.384249-137.376804-137.824056c-12.480043-12.512727-12.447359-32.768069 0.063647-45.248112 12.512727-12.512727 32.735385-12.447359 45.248112 0.063647l137.567746 137.984034 138.047682-136.575192c12.54369-12.447359 32.831716-12.320065 45.248112 0.25631 12.447359 12.576374 12.320065 32.831716-0.25631 45.248112L557.344443 512.127295 694.752211 649.984034z" p-id="2577"></path></svg>',
  }
};
const RUNTIME = {
  status: CONSTANT.LOADING,
  setStatus(s) {
    if (s === RUNTIME.status || !CONSTANT.IMAGES[s]) {
      return;
    }
    RUNTIME.status = s;
    oContainer.setAttribute('data-status', s);
    oStatus.innerHTML = CONSTANT.IMAGES[s];
  },
  // 检测url或patch后的数据
  resource_id: '',
  spider_id: '',
  from: 'url',
  script: '',
  cookies: '',
}
window.__RUNTIME = RUNTIME;
const oContainer = createElement('div', {
  id: 'crawler-tool',
  className: 'crawler-tool',
  style: {
    width: '32px', height: '32px', 'z-index': 999999999
  }
});
const oStatus = createElement('span', { style: {}, innerHTML: CONSTANT.IMAGES[RUNTIME.status] })

async function detect() {
  try {
    chrome.runtime.sendMessage({ action: "cookies", origin: window.location.origin }, function (response) {
      RUNTIME.cookies = getNetscapeCookies(response.cookies)
    });
    let url = window.location.href;
    RUNTIME.setStatus(CONSTANT.LOADING);
    const resp = await fetch(CONSTANT.BASE_URL + '/gw/api/v1/public/crawl?url=' + encodeURIComponent(url), {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const body = await resp.json();
    RUNTIME.from = _get(body, 'data.rule.from', 'url');
    RUNTIME.resource_id = _get(body, 'data.record._id');
    RUNTIME.spider_id = _get(body, 'data.rule._id', '');
    if (body.code === 1002) {
      RUNTIME.setStatus(CONSTANT.SUCCESS);
    } else if (body.code === -1 || body.code === 1004) {
      RUNTIME.setStatus(CONSTANT.ERRORED);
    } else if (body.code === 1000) {
      RUNTIME.setStatus(CONSTANT.NOMATCH)
    } else if (body.code === 1001) {
      RUNTIME.setStatus(CONSTANT.MATCHED);
    } else if (body.code === 1003) {
      RUNTIME.setStatus(CONSTANT.SYNCING)
    }
  } catch (e) {
    RUNTIME.setStatus(CONSTANT.ERRORED)
  }
}

async function grab() {
  const resp = await fetch(CONSTANT.BASE_URL + '/gw/api/v1/public/crawl/' + RUNTIME.spider_id, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: window.location.href,
      cookies: RUNTIME.cookies,
      html: RUNTIME.from === 'html' ? document.documentElement.innerHTML : undefined,
    })
  });
  if (resp.status !== 200) {
    return CONSTANT.ERRORED
  } else {
    const body = await resp.json();
    if (body.code === -1) {
      alert(body.message)
      return CONSTANT.ERRORED
    } else if (body.code === 0) {
      RUNTIME.resource_id = body.data._id;
      return CONSTANT.SYNCING
    }
  }
}

function main() {
  let dealClick = null;
  // 插入文档和拖拽
  if (!document.getElementById('crawler-tool')) {
    let xy = { right: 16, top: 16 };
    try {
      const info = localStorage.getItem('crawler_position');
      const pos = info ? JSON.parse(info) : xy;
      oContainer.style.right = pos.right + 'px'
      oContainer.style.top = pos.top + 'px'
    } catch (e) {

    }
    // 开始拖拽
    let mouse = null;
    oContainer.appendChild(oStatus);
    document.body.appendChild(oContainer);
    dealClick = function () {
      const moves = mouse ? mouse.moves : 1;
      mouse = null;
      if (moves > 1) {
        return;
      }
      if (RUNTIME.status === CONSTANT.NOMATCH) {
        window.open(CONSTANT.BASE_URL + '/manager', '_blank')
      } else if (RUNTIME.status === CONSTANT.MATCHED) {
        RUNTIME.setStatus(CONSTANT.LOADING)
        grab().then(status => {
          status && RUNTIME.setStatus(status);
        }).catch(e => {
          RUNTIME.setStatus(CONSTANT.ERRORED)
        })
      } else if (RUNTIME.status === CONSTANT.ERRORED) {
        detect()
      }
    }
    oContainer.addEventListener('click', dealClick);
    function move(event) {
      // 盒子的位置 = 鼠标与页面之间的距离 - 鼠标与盒子之间的距离
      oContainer.style.right = window.document.documentElement.offsetWidth - (event.clientX - mouse.x) - 32 + "px";
      oContainer.style.top = event.clientY - mouse.y + "px";
      event.preventDefault();
      event.stopPropagation();
      ++mouse.moves;
    }
    oContainer.onmousedown = function (event) {
      // 记录鼠标与盒子之间的距离
      mouse = {
        x: event.offsetX,
        y: event.offsetY,
        moves: 0,
      }
      event.preventDefault();
      event.stopPropagation();
      document.addEventListener('mousemove', move);
    }
    // 拖拽结束
    document.addEventListener('mouseup', function (event) {
      document.removeEventListener('mousemove', move)
      xy.right = (window.document.documentElement.offsetWidth - event.clientX) - 16
      xy.top = event.clientY - 16
      localStorage.setItem('crawler_position', JSON.stringify(xy))
    });
  };
  document.addEventListener('keydown', e => {
    if (e.key === 'F4') {
      dealClick && dealClick()
    }
  });

  // websocket 通信
  if (window.io) {
    const ws = window.io(CONSTANT.BASE_URL, {
      path: '/ws',
      reconnectionAttempts: 3
    });

    ws.open();
    // 连接成功
    ws.on("connect", () => {
      console.log(ws.id, '监听客户端连接成功-connect');
    })
    // 断开连接
    ws.on("disconnect", (reason) => {
      console.log("断开连接-disconnect", reason);
    })
    // 错误
    ws.on("error", (err) => {
      console.log("错误-error", err);
    })
    // 连接错误
    ws.on("connect_error", (err) => {
      console.log("连接错误-connect_error", err);
    });
    // 连接超时
    ws.on("connect_timeout", (data) => {
      console.log("连接超时-connect_timeout", data);
    });
    ws.on('message', data => {
      console.log(data, 'ws')
      if (data.type && data.resource_id === RUNTIME.resource_id) {
        events.emit(data.type, data);
      }
    });
  }
}

const storage = {
  get(key) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([key], (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(typeof result === 'object' ? result[key] : result);
        }
      });
    });
  },

  set(key, value) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [key]: value }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(true);
        }
      });
    });
  },

  remove(key) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove([key], () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(true);
        }
      });
    });
  },

  clear() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.clear(() => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(true);
        }
      });
    });
  }
};

// 自定义事件
const events = {
  events: {},
  emit: (event, data) => {
    const e = new CustomEvent(event, { detail: data })
    document.dispatchEvent(e);
  },
  on: (event, fn) => {
    if (!events.events[event]) {
      events.events[event] = [fn]
    } else {
      events.events[event].push(fn);
    }
    document.addEventListener(event, fn);
  },
}
events.on('resource_change', (e) => {
  const data = e.detail;
  if (data.status) {
    RUNTIME.setStatus(data.status);
  }
})

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log("收到消息：", message);
  const origin = window.location.origin;
  try {
    if (message.type === 'contextmenu') {
      switch (message.value) {
        case 'clear_list':
          await storage.remove('list')
          break;
        case 'add_list':
          if (!white_list.includes(origin)) {
            white_list.push(origin)
          }
          await storage.set('list', white_list)
          break
        case 'del_list':
          if (white_list.includes(origin)) {
            white_list = white_list.filter(name => name !== origin);
            await storage.set('list', white_list)
          }
          break;
        default: break;
      }
    } else if (message.type === 'url') {
      if (white_list.includes(new URL(message.url).origin)) {
        detect(message.url);
      }
    }
  } catch (e) {
    console.error('执行失败', e)
  }
  // 必须有这个
  return true;
});

storage.get('list').then(list => {
  if (list instanceof Array) {
    white_list = list;
    if (white_list.includes(window.location.origin)) {
      main();
      detect();
    }
  } else {
    fetch(CONSTANT.BASE_URL + '/gw/api/v1/public/crawl/', {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    }).then(async (resp) => {
      if (resp.status === 200) {
        white_list = await resp.json()
        storage.set('list', white_list)
        if (white_list.includes(window.location.origin)) {
          main();
          detect();
        }
      }
    }).catch(() => {
      console.log('更新白名单失败');
    });
  }
})
