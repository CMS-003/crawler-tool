import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react'
import { useEffectOnce } from 'react-use'
import Draggable from 'react-draggable';
import _ from 'lodash'
import ws from './utils/ws'
import event from './utils/event'
import constant from './constant'

if (ws) {
  ws.on('message', data => {
    if (typeof data === 'object' && data.type === 'crawler') {
      event.emit('crawler', data);
    }
  })
}

const whilte_hosts = ['localhost', '127.0.0.1'];

let rule_id = '';
let r = constant.MARGIN;
let booted = false;

// 2/3 同一个图，但3会旋转
function SVG({ status }) {
  if (status === constant.S_LOADING) {
    return <svg t="1668678519444" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8890" xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m0 128a298.666667 298.666667 0 1 0 0 597.333334 298.666667 298.666667 0 0 0 0-597.333334z" fill="#000000" fill-opacity=".05" p-id="8891"></path><path d="M813.696 813.696c166.613333-166.613333 166.613333-436.778667 0-603.392-166.613333-166.613333-436.778667-166.613333-603.392 0A64 64 0 0 0 300.8 300.8a298.666667 298.666667 0 1 1 422.4 422.4 64 64 0 0 0 90.496 90.496z" fill="#000000" p-id="8892"></path></svg>;
  } else if (status === constant.S_NOMATCH) {
    return <svg t="1668675516561" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2437" xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M828.704099 196.575729C744.096116 112.384034 631.648434 66.016073 512 66.016073s-232.1288 46.367961-316.736783 130.559656C110.624271 280.800108 64 392.831501 64 512c0 119.199462 46.624271 231.199892 131.232254 315.424271 84.607983 84.191695 197.088348 130.559656 316.736783 130.559656s232.1288-46.367961 316.704099-130.559656c84.67163-84.255342 131.295901-196.288456 131.263217-315.455235C959.967316 392.800538 913.375729 280.800108 828.704099 196.575729zM736.00086 544.00086 544.00086 544.00086l0 192c0 17.695686-14.336138 32.00086-32.00086 32.00086s-32.00086-14.303454-32.00086-32.00086L479.99914 544.00086 288.00086 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l192 0L480.00086 288.00086c0-17.664722 14.336138-32.00086 32.00086-32.00086s32.00086 14.336138 32.00086 32.00086l0 192 192 0c17.695686 0 32.00086 14.336138 32.00086 32.00086S753.696546 544.00086 736.00086 544.00086z" p-id="2438"></path></svg>
  } else if (status === constant.S_MATCHED) {
    return <svg t="1668737203871" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23675" xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 0 1 755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l0.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8z m756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 0 1 512.1 856a342.24 342.24 0 0 1-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 0 0-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-0.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 0 0-8-8.2z" p-id="23676"></path></svg>;
  } else if (status === constant.S_SYNCING) {
    return <svg t="1668737203871" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23675" xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 0 1 755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l0.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8z m756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 0 1 512.1 856a342.24 342.24 0 0 1-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 0 0-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-0.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 0 0-8-8.2z" p-id="23676"></path></svg>
  } else if (status === constant.S_SUCCESS) {
    return <svg t="1668675733182" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2715" xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 65.983389c-245.919634 0-446.016611 200.095256-446.016611 446.016611 0 245.952318 200.064292 446.016611 446.016611 446.016611S958.016611 757.952318 958.016611 512C958.016611 266.080366 757.952318 65.983389 512 65.983389zM727.231286 438.432254 471.00766 697.439161c-0.063647 0.063647-0.192662 0.096331-0.25631 0.192662-0.096331 0.063647-0.096331 0.192662-0.192662 0.25631-2.048757 1.983389-4.575729 3.19957-6.944443 4.544765-1.183497 0.672598-2.143368 1.696116-3.392232 2.176052-3.839484 1.536138-7.904314 2.33603-11.967424 2.33603-4.095794 0-8.224271-0.799892-12.096439-2.399677-1.279828-0.543583-2.303346-1.632469-3.519527-2.303346-2.368714-1.343475-4.832039-2.528692-6.880796-4.544765-0.063647-0.063647-0.096331-0.192662-0.159978-0.25631-0.063647-0.096331-0.192662-0.096331-0.25631-0.192662l-126.016611-129.503454c-12.320065-12.672705-12.032791-32.928047 0.639914-45.248112 12.672705-12.287381 32.895364-12.063755 45.248112 0.639914l103.26354 106.112189 233.279613-235.839269c12.416396-12.576374 32.704421-12.703669 45.248112-0.25631C739.520387 405.600538 739.647682 425.85588 727.231286 438.432254z" p-id="2716"></path></svg>
  } else if (status === constant.S_FAIL) {
    return <svg t="1668675706282" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2576" xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 64c-247.00852 0-448 200.960516-448 448S264.960516 960 512 960c247.00852 0 448-200.960516 448-448S759.039484 64 512 64zM694.752211 649.984034c12.480043 12.54369 12.447359 32.768069-0.063647 45.248112-6.239161 6.208198-14.399785 9.34412-22.591372 9.34412-8.224271 0-16.415858-3.135923-22.65674-9.407768l-137.60043-138.016718-138.047682 136.576912c-6.239161 6.14455-14.368821 9.247789-22.496761 9.247789-8.255235 0-16.479505-3.168606-22.751351-9.504099-12.416396-12.576374-12.320065-32.800753 0.25631-45.248112l137.887703-136.384249-137.376804-137.824056c-12.480043-12.512727-12.447359-32.768069 0.063647-45.248112 12.512727-12.512727 32.735385-12.447359 45.248112 0.063647l137.567746 137.984034 138.047682-136.575192c12.54369-12.447359 32.831716-12.320065 45.248112 0.25631 12.447359 12.576374 12.320065 32.831716-0.25631 45.248112L557.344443 512.127295 694.752211 649.984034z" p-id="2577"></path></svg>
  }

}
function Tool({ status, loading }) {
  return <span className={loading || status === constant.S_SYNCING ? 'spin' : ''}>
    {loading ? <SVG status={constant.S_LOADING} /> : <SVG status={status} />}
  </span>
}

function App() {
  const boxRef = useRef(null)
  // 解决初始化位置的问题
  const [inited, setInited] = useState(0)
  // 判断点击还是拖动
  const [dragged, setDragged] = useState(0);
  // 1 nomatch 2 init 3 running 4 success 5 fail
  const [status, setStatus] = useState(constant.S_LOADING);
  // 请求中判断
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    x0: 0, y0: 0,
    x: constant.MARGIN,
    y: constant.MARGIN,
    w: document.documentElement.clientWidth - constant.SIZE - constant.MARGIN,
    h: document.documentElement.clientHeight - constant.SIZE - constant.MARGIN,
  });
  const updateStatus = useCallback(async () => {
    if (status === constant.S_LOADING) {
      // 请求中不处理点击事件
    } else if (status === constant.S_NOMATCH) {
      window.open('http://localhost:8097/admin/home/rule2-manage', '_blank')
    } else if (status === constant.S_MATCHED) {
      setStatus(constant.S_SYNCING)
      const resp = await fetch('http://127.0.0.1:8097/v2/admin/rule/' + rule_id, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin: window.location.href })
      });
      console.log(resp.status, resp.body)
    } else if (status === constant.S_SYNCING) {
      console.log('syncing')
    } else if (status === constant.S_SUCCESS) {
      console.log('retry')
    } else if (status === constant.S_FAIL) {
      matchCrawler(window.location.href)
    }
  });
  const matchCrawler = useCallback(async (uri) => {
    setLoading(true)
    try {
      let url = window.location.host === 'www.youtube.com' ? 'https://www.youtube.com/watch?v=' + new URL(uri).searchParams.get('v') : uri;
      const resp = await fetch('http://127.0.0.1:8097/v1/public/crawler?origin=' + encodeURIComponent(url), { method: "GET", headers: { 'Content-Type': 'application/json' } });
      if (resp.status === 404) {
        return console.log(404)
      }
      const data = await resp.json();
      console.log(data, 'rule')
      if (data.code === 0) {
        setStatus(constant.S_SUCCESS);
      } else if (data.code === -1) {
        setStatus(constant.S_FAIL);
      } else if (data.code === 11) {
        setStatus(constant.S_NOMATCH)
      } else if (data.code === 12) {
        rule_id = data.data.id;
        setStatus(constant.S_MATCHED);
      } else if (data.code === 13) {
        setStatus(constant.S_SYNCING)
      }
    } catch (e) {
      setStatus(constant.S_FAIL)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    // resize 位置不变
    window.addEventListener('resize', _.debounce(() => {
      data.w = document.documentElement.clientWidth - constant.SIZE - constant.MARGIN
      data.h = document.documentElement.clientHeight - constant.SIZE - constant.MARGIN
      data.x = data.w - r;
      if (boxRef.current) {
        const style = `transform: translate(${Math.max(constant.MARGIN, data.x)}px, ${Math.max(constant.MARGIN, data.y)}px);`;
        boxRef.current.style = style
      }
    }, 200))
  })
  useEffectOnce(() => {
    if (!booted) {
      var _wr = function (type) {
        var orig = window.history[type];
        return function () {
          var e = new Event(type);
          e.arguments = arguments;
          window.dispatchEvent(e);
          // 注意事件监听在url变更方法调用之前 也就是在事件监听的回调函数中获取的页面链接为跳转前的链接
          var rv = orig.apply(this, arguments);
          return rv;
        };
      };
      window.history.pushState = _wr('pushState');
      window.addEventListener('pushState', function (e) {
        var path = e && e.arguments.length > 2 && e.arguments[2];
        var url = /^http/.test(path) ? path : (window.location.protocol + '//' + window.location.host + path);
        console.log('old:' + window.location.href, 'new:' + url);
        matchCrawler(url);
      });

      event.on('crawler', function (d) {
        console.log(d, 'ws')
        setStatus(constant.S_SUCCESS)
      })
      booted = true
      const d = localStorage.getItem('position')
      if (d) {
        try {
          const j = JSON.parse(d);
          r = j.r || constant.MARGIN
          data.y = j.y || constant.MARGIN
        } catch (e) {

        }
      }
      data.x = data.w - r;
      setData(data);
      if (!whilte_hosts.includes(window.location.host) || window !== window.parent) {
        matchCrawler(window.location.href).then(() => {
          setInited(1);
        })
      }
    }
  }, []);

  return (
    inited ?
      <Draggable
        defaultPosition={{ x: data.x, y: data.y }}
        bounds={{ left: constant.MARGIN, top: constant.MARGIN, right: data.w, bottom: data.h }}
        position={{ x: data.x, y: data.y }}
        handle='.drag-handler'
        onStart={(e) => {
          let p = e.target, i = 0;
          while (p.tagName !== 'DIV') {
            p = p.parentNode;
            if (++i > 5 || p.tagName === 'BODY') {
              return;
            }
          }
          const m = new window.WebKitCSSMatrix(window.getComputedStyle(p).transform);
          data.x0 = e.clientX - m.e;
          data.y0 = e.clientY - m.f;
          setDragged(0)
        }}
        onDrag={(e) => {
          data.x = Math.max(Math.min(data.w, e.clientX - data.x0), constant.MARGIN)
          data.y = Math.max(Math.min(data.h, e.clientY - data.y0), constant.MARGIN)
          setDragged(1)
        }}
        onStop={(e) => {
          r = data.w - data.x;
          localStorage.setItem('position', JSON.stringify({ r, y: data.y }))
          if (!dragged) {
            updateStatus()
          }
          setDragged(0)
        }}
      >
        <div className="crawler-tool drag-handler" ref={ref => boxRef.current = ref}>
          <Tool status={status} loading={loading} key={data.x} />
        </div>
      </Draggable> : null
  );
}

export default App;
