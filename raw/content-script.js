// Base64 字符表
const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

// UTF-8 字符串转 Uint8Array
function utf8Encode(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

// Uint8Array → 字符串
function utf8Decode(bytes) {
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

// Uint8Array → Base64
function uint8ToBase64(bytes) {
  let base64 = '';
  let i;

  for (i = 0; i < bytes.length; i += 3) {
    const [b1, b2 = 0, b3 = 0] = [bytes[i], bytes[i + 1], bytes[i + 2]];

    const triplet = (b1 << 16) | (b2 << 8) | b3;

    base64 += base64Chars[(triplet >> 18) & 63];
    base64 += base64Chars[(triplet >> 12) & 63];
    base64 += (i + 1 < bytes.length) ? base64Chars[(triplet >> 6) & 63] : '=';
    base64 += (i + 2 < bytes.length) ? base64Chars[triplet & 63] : '=';
  }

  return base64;
}

// Base64 → Uint8Array
function base64ToUint8(base64) {
  const len = base64.length;
  let bufferLength = len * 3 / 4;

  if (base64[len - 1] === '=') bufferLength--;
  if (base64[len - 2] === '=') bufferLength--;

  const bytes = new Uint8Array(bufferLength);
  let byteIndex = 0;

  for (let i = 0; i < len; i += 4) {
    const a = base64Chars.indexOf(base64[i]);
    const b = base64Chars.indexOf(base64[i + 1]);
    const c = base64Chars.indexOf(base64[i + 2]);
    const d = base64Chars.indexOf(base64[i + 3]);

    const triplet = (a << 18) | (b << 12) | ((c & 63) << 6) | (d & 63);

    if (c !== 64) bytes[byteIndex++] = (triplet >> 16) & 255;
    if (d !== 64) bytes[byteIndex++] = (triplet >> 8) & 255;
    if (d !== 64) bytes[byteIndex++] = triplet & 255;
  }

  return bytes;
}

// 公共函数：字符串 Base64 编码 / 解码
function base64Encode(str) {
  return uint8ToBase64(utf8Encode(str));
}

function base64Decode(base64) {
  return utf8Decode(base64ToUint8(base64));
}

function createElement(tag, { style = {}, ...props }) {
  const element = document.createElement(tag);
  Object.keys(style).forEach(k => {
    element.style[k] = style[k];
  });
  Object.keys(props).forEach(k => {
    if (k === 'className') {
      element.classList.add(props[k])
    } else {
      element[k] = props[k];
    }
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

const icons = {
  lock: '<svg t="1775101863769" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6423" width="32" height="32" style="width:24px;height:24px;margin: 3px 4px;" ><path d="M512 768c-17.664 0-32-14.304-32-32l0-96c0-17.696 14.336-32 32-32s32 14.304 32 32l0 96C544 753.696 529.664 768 512 768z" p-id="6424"></path><path d="M832 960 192 960c-52.928 0-96-43.072-96-96L96 512c0-52.928 43.072-96 96-96l640 0c52.928 0 96 43.072 96 96l0 352C928 916.928 884.928 960 832 960zM192 480c-17.632 0-32 14.368-32 32l0 352c0 17.664 14.368 32 32 32l640 0c17.664 0 32-14.336 32-32L864 512c0-17.632-14.336-32-32-32L192 480z" p-id="6425"></path><path d="M736 480c-17.696 0-32-14.336-32-32L704 318.016C704 209.248 601.76 128 510.336 128 416.768 128 320 198.912 320 317.568L320 448c0 17.664-14.336 32-32 32s-32-14.336-32-32L256 317.568C256 158.848 385.312 64 510.336 64 632.224 64 768 168.32 768 318.016L768 448C768 465.664 753.696 480 736 480z" p-id="6426"></path></svg>',
  unlock: '<svg t="1775101948399" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6590" width="32" height="32" style="width:24px;height:24px;margin: 3px 4px;" ><path d="M512 768c-17.664 0-32-14.304-32-32l0-96c0-17.696 14.336-32 32-32s32 14.304 32 32l0 96C544 753.696 529.664 768 512 768z" p-id="6591"></path><path d="M832 960 192 960c-52.928 0-96-43.072-96-96L96 480c0-52.928 43.072-96 96-96l640 0c52.928 0 96 43.072 96 96l0 384C928 916.928 884.928 960 832 960zM192 448c-17.632 0-32 14.368-32 32l0 384c0 17.664 14.368 32 32 32l640 0c17.664 0 32-14.336 32-32L864 480c0-17.632-14.336-32-32-32L192 448z" p-id="6592"></path><path d="M288 416c-17.664 0-32-14.336-32-32L256 319.328c0-160.064 135.392-255.744 266.304-255.744 100.672 0 198.72 59.872 244.032 148.992 8 15.744 1.728 35.008-14.016 43.04-15.776 8-35.04 1.696-43.04-14.016-34.656-68.16-109.792-113.984-186.976-113.984C422.848 127.584 320 199.296 320 319.328L320 384C320 401.664 305.664 416 288 416z" p-id="6593"></path></svg>',
  logined: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-key-icon lucide-user-round-key"><path d="M19 11v6"/><path d="M19 13h2"/><path d="M2 21a8 8 0 0 1 12.868-6.349"/><circle cx="10" cy="8" r="5"/><circle cx="19" cy="19" r="2"/></svg>',
  unlogin: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-x-icon lucide-user-round-x"><path d="M2 21a8 8 0 0 1 11.873-7"/><circle cx="10" cy="8" r="5"/><path d="m17 17 5 5"/><path d="m22 17-5 5"/></svg>',
  logout: '<svg t="1775110197451" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11125" width="32" height="32" style="width:24px;height:24px;margin:3px 0 0 4px;"><path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5-32.6 32.5-70.5 58.1-112.7 75.9-43.6 18.4-90 27.8-137.9 27.8-47.9 0-94.3-9.4-137.9-27.8-42.2-17.8-80.1-43.4-112.7-75.9-32.6-32.5-58.1-70.4-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-0.4-12.3-6.7-12.3z" p-id="11126"></path><path d="M956.9 505.7L815 393.7c-5.3-4.2-13-0.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112c4.1-3.2 4.1-9.4 0-12.6z" p-id="11127"></path></svg>',
  bell: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="width:24px;height:24px;margin: 4px 0 0 4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-icon lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>',
  belloff: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-icon lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>',
};

let white_list = [];
const CONSTANT = {
  BASE_URL: 'https://jiayou.work',
  // 边界间距
  MARGIN: 15,
  // 本身尺寸大小
  SIZE: 32,
  // 任务状态
  UNKOWNN: 'UNKOWNN',
  LOADING: 'LOADING',
  NOMATCH: 'NOMATCH',
  MATCHED: 'MATCHED',
  SYNCING: 'SYNCING',
  SUCCESS: 'SUCCESS',
  ERRORED: 'ERRORED',
  IMAGES: {
    'UNKOWNN': '<svg t="1775100463654" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25285" width="32" height="32" style="width:24px;height:24px;margin: 2px 4px;"><path d="M679.02464 547.16928l-17.17248-6.53824 14.59712-11.16672C752.52736 471.28576 796.16 387.16416 796.16 298.66496 796.16 139.62752 666.77248 10.24 507.73504 10.24S219.30496 139.62752 219.30496 298.66496c0 89.86624 44.75392 177.7408 119.71072 235.06944l14.82752 11.3408-17.52576 6.41024c-174.6176 63.88736-291.9424 236.63104-291.9424 429.84448 0 20.02944 16.83456 32.43008 32.42496 32.43008 20.02944 0 32.42496-16.83456 32.42496-32.43008 0-105.91232 40.84224-205.0816 114.9952-279.23968 74.15808-74.15808 173.33248-115.00032 279.2448-115.00032H512c105.91232 0 205.0816 40.84224 279.23968 115.00032S906.24 875.4176 906.24 981.32992c0 20.02944 16.83456 32.43008 32.43008 32.43008 20.02432 0 32.41984-16.83456 32.41984-32.43008 7.92576-190.2848-109.45024-364.59008-292.06528-434.16064z m-171.2896-29.19936c-120.92416 0-219.30496-98.37568-219.30496-219.30496S386.81088 79.36 507.73504 79.36 727.04 177.7408 727.04 298.66496c0 120.92928-98.3808 219.30496-219.30496 219.30496z" p-id="25286"></path></svg>',
    'LOADING': '<svg t="1711618051244" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3449" width="200" height="200"><g><path d="M384 128A64 64 13680 1 0 640 128 64 64 13680 1 0 384 128zM655.53 240.47A64 64 13680 1 0 911.53 240.47 64 64 13680 1 0 655.53 240.47zM832 512A32 32 13680 1 0 960 512 32 32 13680 1 0 832 512zM719.53 783.53A32 32 13680 1 0 847.53 783.53 32 32 13680 1 0 719.53 783.53zM448.002 896A32 32 13680 1 0 576.002 896 32 32 13680 1 0 448.002 896zM176.472 783.53A32 32 13680 1 0 304.472 783.53 32 32 13680 1 0 176.472 783.53zM144.472 240.47A48 48 13680 1 0 336.472 240.47 48 48 13680 1 0 144.472 240.47zM56 512A36 36 13680 1 0 200 512 36 36 13680 1 0 56 512z" p-id="3450"></path><animateTransform></g></svg>',
    'NOMATCH': '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1668675516561" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2437" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M828.704099 196.575729C744.096116 112.384034 631.648434 66.016073 512 66.016073s-232.1288 46.367961-316.736783 130.559656C110.624271 280.800108 64 392.831501 64 512c0 119.199462 46.624271 231.199892 131.232254 315.424271 84.607983 84.191695 197.088348 130.559656 316.736783 130.559656s232.1288-46.367961 316.704099-130.559656c84.67163-84.255342 131.295901-196.288456 131.263217-315.455235C959.967316 392.800538 913.375729 280.800108 828.704099 196.575729zM736.00086 544.00086 544.00086 544.00086l0 192c0 17.695686-14.336138 32.00086-32.00086 32.00086s-32.00086-14.303454-32.00086-32.00086L479.99914 544.00086 288.00086 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l192 0L480.00086 288.00086c0-17.664722 14.336138-32.00086 32.00086-32.00086s32.00086 14.336138 32.00086 32.00086l0 192 192 0c17.695686 0 32.00086 14.336138 32.00086 32.00086S753.696546 544.00086 736.00086 544.00086z" p-id="2438"></path></svg>',
    'MATCHED': '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1668737203871" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23675" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 0 1 755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l0.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8z m756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 0 1 512.1 856a342.24 342.24 0 0 1-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 0 0-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-0.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 0 0-8-8.2z" p-id="23676"></path></svg>',
    'MORE': '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1668676061297" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3140" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M223.962372 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S276.942718 607.897867 223.962372 607.897867z" p-id="3141"></path><path d="M511.913993 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S564.894339 607.897867 511.913993 607.897867z" p-id="3142"></path><path d="M800.037628 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S852.84596 607.897867 800.037628 607.897867z" p-id="3143"></path></svg>',
    'SYNCING': '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1668737203871" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23675"    xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><g><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 0 1 755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l0.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8z m756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 0 1 512.1 856a342.24 342.24 0 0 1-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 0 0-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-0.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 0 0-8-8.2z"p-id="23676"></path></g></svg>',
    'SUCCESS': '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1668675733182" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2715" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 65.983389c-245.919634 0-446.016611 200.095256-446.016611 446.016611 0 245.952318 200.064292 446.016611 446.016611 446.016611S958.016611 757.952318 958.016611 512C958.016611 266.080366 757.952318 65.983389 512 65.983389zM727.231286 438.432254 471.00766 697.439161c-0.063647 0.063647-0.192662 0.096331-0.25631 0.192662-0.096331 0.063647-0.096331 0.192662-0.192662 0.25631-2.048757 1.983389-4.575729 3.19957-6.944443 4.544765-1.183497 0.672598-2.143368 1.696116-3.392232 2.176052-3.839484 1.536138-7.904314 2.33603-11.967424 2.33603-4.095794 0-8.224271-0.799892-12.096439-2.399677-1.279828-0.543583-2.303346-1.632469-3.519527-2.303346-2.368714-1.343475-4.832039-2.528692-6.880796-4.544765-0.063647-0.063647-0.096331-0.192662-0.159978-0.25631-0.063647-0.096331-0.192662-0.096331-0.25631-0.192662l-126.016611-129.503454c-12.320065-12.672705-12.032791-32.928047 0.639914-45.248112 12.672705-12.287381 32.895364-12.063755 45.248112 0.639914l103.26354 106.112189 233.279613-235.839269c12.416396-12.576374 32.704421-12.703669 45.248112-0.25631C739.520387 405.600538 739.647682 425.85588 727.231286 438.432254z" p-id="2716"></path></svg>',
    'ERRORED': '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1668675706282" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2576" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 64c-247.00852 0-448 200.960516-448 448S264.960516 960 512 960c247.00852 0 448-200.960516 448-448S759.039484 64 512 64zM694.752211 649.984034c12.480043 12.54369 12.447359 32.768069-0.063647 45.248112-6.239161 6.208198-14.399785 9.34412-22.591372 9.34412-8.224271 0-16.415858-3.135923-22.65674-9.407768l-137.60043-138.016718-138.047682 136.576912c-6.239161 6.14455-14.368821 9.247789-22.496761 9.247789-8.255235 0-16.479505-3.168606-22.751351-9.504099-12.416396-12.576374-12.320065-32.800753 0.25631-45.248112l137.887703-136.384249-137.376804-137.824056c-12.480043-12.512727-12.447359-32.768069 0.063647-45.248112 12.512727-12.512727 32.735385-12.447359 45.248112 0.063647l137.567746 137.984034 138.047682-136.575192c12.54369-12.447359 32.831716-12.320065 45.248112 0.25631 12.447359 12.576374 12.320065 32.831716-0.25631 45.248112L557.344443 512.127295 694.752211 649.984034z" p-id="2577"></path></svg>',
  }
};
const RUNTIME = {
  menu_opend: false,
  status: CONSTANT.LOADING,
  temp: CONSTANT.LOADING,
  setStatus(s, force = true) {
    if (typeof s === 'number') {
      switch (s) {
        case 1: s = 'MATCHED'; break;
        case 2: s = 'SYNCING'; break;
        case 3: s = 'ERRORED'; break;
        case 4: s = 'SUCCESS'; break;
        case 5: s = 'SYNCING'; break;
        case 6: s = 'MORE'; break;
        default: break;
      }
    }
    if (!CONSTANT.IMAGES[s]) {
      return;
    }
    RUNTIME.temp = s;
    if (force) {
      RUNTIME.status = s;
    }
    oContainer.setAttribute('data-status', s);
    if (s === 'SYNCING' || s === 'LOADING') {
      oContainer.classList.add('spin')
    } else {
      oContainer.classList.remove('spin')
    }
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
if (RUNTIME.status === 'LOADING') {
  oContainer.classList.add('spin')
}
async function detect() {
  try {
    chrome.runtime.sendMessage({ action: "cookies", origin: window.location.origin }, function (response) {
      RUNTIME.cookies = getNetscapeCookies(response.cookies)
    });
    let url = window.location.href;
    RUNTIME.setStatus(CONSTANT.LOADING);
    const resp = await fetch(CONSTANT.BASE_URL + '/gw/download/crawl?url=' + encodeURIComponent(url), {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const body = await resp.json();
    RUNTIME.from = _get(body, 'data.rule.from', 'url');
    RUNTIME.resource_id = _get(body, 'data.record._id');
    RUNTIME.spider_id = _get(body, 'data.rule._id', '');
    if (body.code === 4) {
      // 已完成
      RUNTIME.setStatus(CONSTANT.SUCCESS);
    } else if (body.code === -1 || body.code === 3) {
      // 已废弃或请求出错
      RUNTIME.setStatus(CONSTANT.ERRORED);
    } else if (body.code === -2) {
      // 没有匹配到规则
      RUNTIME.setStatus(CONSTANT.NOMATCH)
    } else if (body.code === 1) {
      // 匹配到但没抓取
      RUNTIME.setStatus(CONSTANT.MATCHED);
    } else if (body.code === 2) {
      // 已抓取未完成 initial loading transcoding
      RUNTIME.setStatus(CONSTANT.SYNCING)
    }
    // if (window.location.href.includes('fix=1') && [2, 3, 4].includes(body.code)) {
    //   if (RUNTIME.spider_id === 'jable_movie') {
    //     const actors = [];
    //     document.querySelectorAll('.models a.model').forEach(node => { let href = node.href; let name = node.querySelector('[data-original-title]'); actors.push({ _id: href.split('/')[4], name: name.getAttribute('data-original-title') }) })
    //     fetch(CONSTANT.BASE_URL + '/gw/api/v1/public/resource/' + RUNTIME.resource_id, {
    //       method: 'PUT',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         title: document.querySelector('h4').innerText,
    //         tags: Array.from(document.querySelectorAll('.tags a')).map(node => node.innerText),
    //         actors,
    //       })
    //     }).then(() => {
    //       console.log('即将关闭')
    //       window.close();
    //     })
    //   } else if (RUNTIME.spider_id === 'hanime1_video') {
    //     const uid = document.querySelector('.video-playlist-top h4').textContent.trim();
    //     fetch(CONSTANT.BASE_URL + '/gw/api/v1/public/resource/' + RUNTIME.resource_id, {
    //       method: 'PUT',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         uid, uname: uid
    //       })
    //     }).then(() => {
    //       console.log('即将关闭')
    //       window.close();
    //     })
    //   }
    // }
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
      html: RUNTIME.from === 'html' ? base64Encode(document.documentElement.innerHTML) : undefined,
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
      events.emit('resource_change', { resource_id: RUNTIME.resource_id, resource_type: 'resource', status: CONSTANT.SYNCING })
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
    const menus = [
      { name: '提示音', icon: icons.bell, hidden: false },
      { name: '位置锁定', icon: icons.lock, hidden: false },
      { name: '退出登录', icon: icons.logout, hidden: false },
    ];
    menus.forEach(m => {
      m.node = createElement('div', { className: 'menu-item', innerHTML: m.icon });
      oContainer.appendChild(m.node);
    });
    oContainer.appendChild(oStatus);
    document.body.appendChild(oContainer);
    dealClick = function () {
      if (RUNTIME.temp === 'MORE') {
        return;
      }
      if (RUNTIME.status === CONSTANT.MATCHED) {
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
    function move(event) {
      // 盒子的位置 = 鼠标与页面之间的距离 - 鼠标与盒子之间的距离
      oContainer.style.right = window.document.documentElement.offsetWidth - (event.clientX - mouse.x) - 32 + "px";
      oContainer.style.top = event.clientY - mouse.y + "px";
      event.preventDefault();
      event.stopPropagation();
      ++mouse.moves;
    }
    oStatus.onmousedown = function (event) {
      if (event.button !== 0 || RUNTIME.status === 'MORE') {
        return;
      }
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
    oStatus.oncontextmenu = function (event) {
      // lock/unlock login/logout 
      event.preventDefault()
      event.stopPropagation()
      RUNTIME.menu_opend = !RUNTIME.menu_opend;
      oContainer.classList.toggle('open');
      const deltaX = oContainer.offsetWidth / 2;
      const deltaY = oContainer.offsetHeight / 2;

      if (!RUNTIME.menu_opend) {
        RUNTIME.setStatus(RUNTIME.status);
      } else {
        RUNTIME.setStatus('MORE', false);
      }

      menus.forEach((m, idx) => {
        const angle = -40 * idx
        const radius = 60;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;

        if (RUNTIME.menu_opend) {
          m.node.style.transform = `translate(${deltaX - x}px, ${deltaY - y}px) scale(1)`;
          m.node.style.opacity = 1;
        } else {
          m.node.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0)`;
          m.node.style.opacity = 0;
        }
      });
    }
    // 拖拽结束
    document.addEventListener('mouseup', function (event) {
      document.removeEventListener('mousemove', move)
      if (mouse) {
        if (mouse.moves === 0) {
          dealClick();
        } else {
          xy.right = (window.document.documentElement.offsetWidth - event.clientX) - 16
          xy.top = event.clientY - 16
          localStorage.setItem('crawler_position', JSON.stringify(xy))
        }
        mouse = null;
      }
    });
  };
  document.addEventListener('keydown', e => {
    if (e.key === 'F4') {
      dealClick && dealClick()
    }
  });

  // websocket 通信
  if (window.io) {
    const ws = window.io(CONSTANT.BASE_URL + '/ws', {
      path: '/ws',
      transports: ['websocket'],
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
      if (data.resource_id === RUNTIME.resource_id) {
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
  if (data.resource_type === 'resource' && data.status) {
    RUNTIME.setStatus(data.status);
  }
})

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const origin = window.location.origin;
  try {
    if (message.type === 'contextmenu') {
      switch (message.value) {
        case 'clear_host':
          await storage.remove('list')
          break;
        case 'add_host':
          if (!white_list.includes(origin)) {
            white_list.push(origin)
          }
          await storage.set('list', white_list)
          break
        case 'del_host':
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
    console.log(white_list)
    if (white_list.includes(window.location.origin)) {
      main();
      detect();
    }
  } else {
    fetch(CONSTANT.BASE_URL + '/gw/download/crawl/', {
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
