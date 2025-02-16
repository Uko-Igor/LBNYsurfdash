"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/whatwg-encoding";
exports.ids = ["vendor-chunks/whatwg-encoding"];
exports.modules = {

/***/ "(rsc)/./node_modules/whatwg-encoding/lib/whatwg-encoding.js":
/*!*************************************************************!*\
  !*** ./node_modules/whatwg-encoding/lib/whatwg-encoding.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nconst iconvLite = __webpack_require__(/*! iconv-lite */ \"(rsc)/./node_modules/iconv-lite/lib/index.js\");\nconst supportedNames = __webpack_require__(/*! ./supported-names.json */ \"(rsc)/./node_modules/whatwg-encoding/lib/supported-names.json\");\nconst labelsToNames = __webpack_require__(/*! ./labels-to-names.json */ \"(rsc)/./node_modules/whatwg-encoding/lib/labels-to-names.json\");\n\nconst supportedNamesSet = new Set(supportedNames);\n\n// https://encoding.spec.whatwg.org/#concept-encoding-get\nexports.labelToName = label => {\n  label = String(label).trim().toLowerCase();\n\n  return labelsToNames[label] || null;\n};\n\n// https://encoding.spec.whatwg.org/#decode\nexports.decode = (uint8Array, fallbackEncodingName) => {\n  let encoding = fallbackEncodingName;\n  if (!exports.isSupported(encoding)) {\n    throw new RangeError(`\"${encoding}\" is not a supported encoding name`);\n  }\n\n  const bomEncoding = exports.getBOMEncoding(uint8Array);\n  if (bomEncoding !== null) {\n    encoding = bomEncoding;\n    // iconv-lite will strip BOMs for us, so no need to do the extra byte removal that the spec does.\n    // Note that we won't end up in the x-user-defined case when there's a bomEncoding.\n  }\n\n  if (encoding === \"x-user-defined\") {\n    // https://encoding.spec.whatwg.org/#x-user-defined-decoder\n    let result = \"\";\n    for (const byte of uint8Array) {\n      if (byte <= 0x7F) {\n        result += String.fromCodePoint(byte);\n      } else {\n        result += String.fromCodePoint(0xF780 + byte - 0x80);\n      }\n    }\n    return result;\n  }\n\n  return iconvLite.decode(uint8Array, encoding);\n};\n\n// https://github.com/whatwg/html/issues/1910#issuecomment-254017369\nexports.getBOMEncoding = uint8Array => {\n  if (uint8Array[0] === 0xFE && uint8Array[1] === 0xFF) {\n    return \"UTF-16BE\";\n  } else if (uint8Array[0] === 0xFF && uint8Array[1] === 0xFE) {\n    return \"UTF-16LE\";\n  } else if (uint8Array[0] === 0xEF && uint8Array[1] === 0xBB && uint8Array[2] === 0xBF) {\n    return \"UTF-8\";\n  }\n\n  return null;\n};\n\nexports.isSupported = name => {\n  return supportedNamesSet.has(String(name));\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvd2hhdHdnLWVuY29kaW5nL2xpYi93aGF0d2ctZW5jb2RpbmcuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYixrQkFBa0IsbUJBQU8sQ0FBQyxnRUFBWTtBQUN0Qyx1QkFBdUIsbUJBQU8sQ0FBQyw2RkFBd0I7QUFDdkQsc0JBQXNCLG1CQUFPLENBQUMsNkZBQXdCOztBQUV0RDs7QUFFQTtBQUNBLG1CQUFtQjtBQUNuQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSw2QkFBNkIsU0FBUztBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUI7QUFDbkI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3VyZi8uL25vZGVfbW9kdWxlcy93aGF0d2ctZW5jb2RpbmcvbGliL3doYXR3Zy1lbmNvZGluZy5qcz9mZjhmIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuY29uc3QgaWNvbnZMaXRlID0gcmVxdWlyZShcImljb252LWxpdGVcIik7XG5jb25zdCBzdXBwb3J0ZWROYW1lcyA9IHJlcXVpcmUoXCIuL3N1cHBvcnRlZC1uYW1lcy5qc29uXCIpO1xuY29uc3QgbGFiZWxzVG9OYW1lcyA9IHJlcXVpcmUoXCIuL2xhYmVscy10by1uYW1lcy5qc29uXCIpO1xuXG5jb25zdCBzdXBwb3J0ZWROYW1lc1NldCA9IG5ldyBTZXQoc3VwcG9ydGVkTmFtZXMpO1xuXG4vLyBodHRwczovL2VuY29kaW5nLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1lbmNvZGluZy1nZXRcbmV4cG9ydHMubGFiZWxUb05hbWUgPSBsYWJlbCA9PiB7XG4gIGxhYmVsID0gU3RyaW5nKGxhYmVsKS50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICByZXR1cm4gbGFiZWxzVG9OYW1lc1tsYWJlbF0gfHwgbnVsbDtcbn07XG5cbi8vIGh0dHBzOi8vZW5jb2Rpbmcuc3BlYy53aGF0d2cub3JnLyNkZWNvZGVcbmV4cG9ydHMuZGVjb2RlID0gKHVpbnQ4QXJyYXksIGZhbGxiYWNrRW5jb2RpbmdOYW1lKSA9PiB7XG4gIGxldCBlbmNvZGluZyA9IGZhbGxiYWNrRW5jb2RpbmdOYW1lO1xuICBpZiAoIWV4cG9ydHMuaXNTdXBwb3J0ZWQoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYFwiJHtlbmNvZGluZ31cIiBpcyBub3QgYSBzdXBwb3J0ZWQgZW5jb2RpbmcgbmFtZWApO1xuICB9XG5cbiAgY29uc3QgYm9tRW5jb2RpbmcgPSBleHBvcnRzLmdldEJPTUVuY29kaW5nKHVpbnQ4QXJyYXkpO1xuICBpZiAoYm9tRW5jb2RpbmcgIT09IG51bGwpIHtcbiAgICBlbmNvZGluZyA9IGJvbUVuY29kaW5nO1xuICAgIC8vIGljb252LWxpdGUgd2lsbCBzdHJpcCBCT01zIGZvciB1cywgc28gbm8gbmVlZCB0byBkbyB0aGUgZXh0cmEgYnl0ZSByZW1vdmFsIHRoYXQgdGhlIHNwZWMgZG9lcy5cbiAgICAvLyBOb3RlIHRoYXQgd2Ugd29uJ3QgZW5kIHVwIGluIHRoZSB4LXVzZXItZGVmaW5lZCBjYXNlIHdoZW4gdGhlcmUncyBhIGJvbUVuY29kaW5nLlxuICB9XG5cbiAgaWYgKGVuY29kaW5nID09PSBcIngtdXNlci1kZWZpbmVkXCIpIHtcbiAgICAvLyBodHRwczovL2VuY29kaW5nLnNwZWMud2hhdHdnLm9yZy8jeC11c2VyLWRlZmluZWQtZGVjb2RlclxuICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgIGZvciAoY29uc3QgYnl0ZSBvZiB1aW50OEFycmF5KSB7XG4gICAgICBpZiAoYnl0ZSA8PSAweDdGKSB7XG4gICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNvZGVQb2ludChieXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNvZGVQb2ludCgweEY3ODAgKyBieXRlIC0gMHg4MCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZXR1cm4gaWNvbnZMaXRlLmRlY29kZSh1aW50OEFycmF5LCBlbmNvZGluZyk7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vd2hhdHdnL2h0bWwvaXNzdWVzLzE5MTAjaXNzdWVjb21tZW50LTI1NDAxNzM2OVxuZXhwb3J0cy5nZXRCT01FbmNvZGluZyA9IHVpbnQ4QXJyYXkgPT4ge1xuICBpZiAodWludDhBcnJheVswXSA9PT0gMHhGRSAmJiB1aW50OEFycmF5WzFdID09PSAweEZGKSB7XG4gICAgcmV0dXJuIFwiVVRGLTE2QkVcIjtcbiAgfSBlbHNlIGlmICh1aW50OEFycmF5WzBdID09PSAweEZGICYmIHVpbnQ4QXJyYXlbMV0gPT09IDB4RkUpIHtcbiAgICByZXR1cm4gXCJVVEYtMTZMRVwiO1xuICB9IGVsc2UgaWYgKHVpbnQ4QXJyYXlbMF0gPT09IDB4RUYgJiYgdWludDhBcnJheVsxXSA9PT0gMHhCQiAmJiB1aW50OEFycmF5WzJdID09PSAweEJGKSB7XG4gICAgcmV0dXJuIFwiVVRGLThcIjtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0cy5pc1N1cHBvcnRlZCA9IG5hbWUgPT4ge1xuICByZXR1cm4gc3VwcG9ydGVkTmFtZXNTZXQuaGFzKFN0cmluZyhuYW1lKSk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/whatwg-encoding/lib/whatwg-encoding.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/whatwg-encoding/lib/labels-to-names.json":
/*!***************************************************************!*\
  !*** ./node_modules/whatwg-encoding/lib/labels-to-names.json ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"866":"IBM866","unicode-1-1-utf-8":"UTF-8","unicode11utf8":"UTF-8","unicode20utf8":"UTF-8","utf-8":"UTF-8","utf8":"UTF-8","x-unicode20utf8":"UTF-8","cp866":"IBM866","csibm866":"IBM866","ibm866":"IBM866","csisolatin2":"ISO-8859-2","iso-8859-2":"ISO-8859-2","iso-ir-101":"ISO-8859-2","iso8859-2":"ISO-8859-2","iso88592":"ISO-8859-2","iso_8859-2":"ISO-8859-2","iso_8859-2:1987":"ISO-8859-2","l2":"ISO-8859-2","latin2":"ISO-8859-2","csisolatin3":"ISO-8859-3","iso-8859-3":"ISO-8859-3","iso-ir-109":"ISO-8859-3","iso8859-3":"ISO-8859-3","iso88593":"ISO-8859-3","iso_8859-3":"ISO-8859-3","iso_8859-3:1988":"ISO-8859-3","l3":"ISO-8859-3","latin3":"ISO-8859-3","csisolatin4":"ISO-8859-4","iso-8859-4":"ISO-8859-4","iso-ir-110":"ISO-8859-4","iso8859-4":"ISO-8859-4","iso88594":"ISO-8859-4","iso_8859-4":"ISO-8859-4","iso_8859-4:1988":"ISO-8859-4","l4":"ISO-8859-4","latin4":"ISO-8859-4","csisolatincyrillic":"ISO-8859-5","cyrillic":"ISO-8859-5","iso-8859-5":"ISO-8859-5","iso-ir-144":"ISO-8859-5","iso8859-5":"ISO-8859-5","iso88595":"ISO-8859-5","iso_8859-5":"ISO-8859-5","iso_8859-5:1988":"ISO-8859-5","arabic":"ISO-8859-6","asmo-708":"ISO-8859-6","csiso88596e":"ISO-8859-6","csiso88596i":"ISO-8859-6","csisolatinarabic":"ISO-8859-6","ecma-114":"ISO-8859-6","iso-8859-6":"ISO-8859-6","iso-8859-6-e":"ISO-8859-6","iso-8859-6-i":"ISO-8859-6","iso-ir-127":"ISO-8859-6","iso8859-6":"ISO-8859-6","iso88596":"ISO-8859-6","iso_8859-6":"ISO-8859-6","iso_8859-6:1987":"ISO-8859-6","csisolatingreek":"ISO-8859-7","ecma-118":"ISO-8859-7","elot_928":"ISO-8859-7","greek":"ISO-8859-7","greek8":"ISO-8859-7","iso-8859-7":"ISO-8859-7","iso-ir-126":"ISO-8859-7","iso8859-7":"ISO-8859-7","iso88597":"ISO-8859-7","iso_8859-7":"ISO-8859-7","iso_8859-7:1987":"ISO-8859-7","sun_eu_greek":"ISO-8859-7","csiso88598e":"ISO-8859-8","csisolatinhebrew":"ISO-8859-8","hebrew":"ISO-8859-8","iso-8859-8":"ISO-8859-8","iso-8859-8-e":"ISO-8859-8","iso-ir-138":"ISO-8859-8","iso8859-8":"ISO-8859-8","iso88598":"ISO-8859-8","iso_8859-8":"ISO-8859-8","iso_8859-8:1988":"ISO-8859-8","visual":"ISO-8859-8","csisolatin6":"ISO-8859-10","iso-8859-10":"ISO-8859-10","iso-ir-157":"ISO-8859-10","iso8859-10":"ISO-8859-10","iso885910":"ISO-8859-10","l6":"ISO-8859-10","latin6":"ISO-8859-10","iso-8859-13":"ISO-8859-13","iso8859-13":"ISO-8859-13","iso885913":"ISO-8859-13","iso-8859-14":"ISO-8859-14","iso8859-14":"ISO-8859-14","iso885914":"ISO-8859-14","csisolatin9":"ISO-8859-15","iso-8859-15":"ISO-8859-15","iso8859-15":"ISO-8859-15","iso885915":"ISO-8859-15","iso_8859-15":"ISO-8859-15","l9":"ISO-8859-15","iso-8859-16":"ISO-8859-16","cskoi8r":"KOI8-R","koi":"KOI8-R","koi8":"KOI8-R","koi8-r":"KOI8-R","koi8_r":"KOI8-R","koi8-ru":"KOI8-U","koi8-u":"KOI8-U","csmacintosh":"macintosh","mac":"macintosh","macintosh":"macintosh","x-mac-roman":"macintosh","dos-874":"windows-874","iso-8859-11":"windows-874","iso8859-11":"windows-874","iso885911":"windows-874","tis-620":"windows-874","windows-874":"windows-874","cp1250":"windows-1250","windows-1250":"windows-1250","x-cp1250":"windows-1250","cp1251":"windows-1251","windows-1251":"windows-1251","x-cp1251":"windows-1251","ansi_x3.4-1968":"windows-1252","ascii":"windows-1252","cp1252":"windows-1252","cp819":"windows-1252","csisolatin1":"windows-1252","ibm819":"windows-1252","iso-8859-1":"windows-1252","iso-ir-100":"windows-1252","iso8859-1":"windows-1252","iso88591":"windows-1252","iso_8859-1":"windows-1252","iso_8859-1:1987":"windows-1252","l1":"windows-1252","latin1":"windows-1252","us-ascii":"windows-1252","windows-1252":"windows-1252","x-cp1252":"windows-1252","cp1253":"windows-1253","windows-1253":"windows-1253","x-cp1253":"windows-1253","cp1254":"windows-1254","csisolatin5":"windows-1254","iso-8859-9":"windows-1254","iso-ir-148":"windows-1254","iso8859-9":"windows-1254","iso88599":"windows-1254","iso_8859-9":"windows-1254","iso_8859-9:1989":"windows-1254","l5":"windows-1254","latin5":"windows-1254","windows-1254":"windows-1254","x-cp1254":"windows-1254","cp1255":"windows-1255","windows-1255":"windows-1255","x-cp1255":"windows-1255","cp1256":"windows-1256","windows-1256":"windows-1256","x-cp1256":"windows-1256","cp1257":"windows-1257","windows-1257":"windows-1257","x-cp1257":"windows-1257","cp1258":"windows-1258","windows-1258":"windows-1258","x-cp1258":"windows-1258","chinese":"GBK","csgb2312":"GBK","csiso58gb231280":"GBK","gb2312":"GBK","gb_2312":"GBK","gb_2312-80":"GBK","gbk":"GBK","iso-ir-58":"GBK","x-gbk":"GBK","gb18030":"gb18030","big5":"Big5","big5-hkscs":"Big5","cn-big5":"Big5","csbig5":"Big5","x-x-big5":"Big5","cseucpkdfmtjapanese":"EUC-JP","euc-jp":"EUC-JP","x-euc-jp":"EUC-JP","csshiftjis":"Shift_JIS","ms932":"Shift_JIS","ms_kanji":"Shift_JIS","shift-jis":"Shift_JIS","shift_jis":"Shift_JIS","sjis":"Shift_JIS","windows-31j":"Shift_JIS","x-sjis":"Shift_JIS","cseuckr":"EUC-KR","csksc56011987":"EUC-KR","euc-kr":"EUC-KR","iso-ir-149":"EUC-KR","korean":"EUC-KR","ks_c_5601-1987":"EUC-KR","ks_c_5601-1989":"EUC-KR","ksc5601":"EUC-KR","ksc_5601":"EUC-KR","windows-949":"EUC-KR","unicodefffe":"UTF-16BE","utf-16be":"UTF-16BE","csunicode":"UTF-16LE","iso-10646-ucs-2":"UTF-16LE","ucs-2":"UTF-16LE","unicode":"UTF-16LE","unicodefeff":"UTF-16LE","utf-16":"UTF-16LE","utf-16le":"UTF-16LE","x-user-defined":"x-user-defined"}');

/***/ }),

/***/ "(rsc)/./node_modules/whatwg-encoding/lib/supported-names.json":
/*!***************************************************************!*\
  !*** ./node_modules/whatwg-encoding/lib/supported-names.json ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('["UTF-8","IBM866","ISO-8859-2","ISO-8859-3","ISO-8859-4","ISO-8859-5","ISO-8859-6","ISO-8859-7","ISO-8859-8","ISO-8859-10","ISO-8859-13","ISO-8859-14","ISO-8859-15","ISO-8859-16","KOI8-R","KOI8-U","macintosh","windows-874","windows-1250","windows-1251","windows-1252","windows-1253","windows-1254","windows-1255","windows-1256","windows-1257","windows-1258","GBK","gb18030","Big5","EUC-JP","Shift_JIS","EUC-KR","UTF-16BE","UTF-16LE","x-user-defined"]');

/***/ })

};
;