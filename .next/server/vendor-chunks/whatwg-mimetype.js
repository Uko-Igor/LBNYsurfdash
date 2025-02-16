"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/whatwg-mimetype";
exports.ids = ["vendor-chunks/whatwg-mimetype"];
exports.modules = {

/***/ "(rsc)/./node_modules/whatwg-mimetype/lib/mime-type-parameters.js":
/*!******************************************************************!*\
  !*** ./node_modules/whatwg-mimetype/lib/mime-type-parameters.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst {\n  asciiLowercase,\n  solelyContainsHTTPTokenCodePoints,\n  soleyContainsHTTPQuotedStringTokenCodePoints\n} = __webpack_require__(/*! ./utils.js */ \"(rsc)/./node_modules/whatwg-mimetype/lib/utils.js\");\n\nmodule.exports = class MIMETypeParameters {\n  constructor(map) {\n    this._map = map;\n  }\n\n  get size() {\n    return this._map.size;\n  }\n\n  get(name) {\n    name = asciiLowercase(String(name));\n    return this._map.get(name);\n  }\n\n  has(name) {\n    name = asciiLowercase(String(name));\n    return this._map.has(name);\n  }\n\n  set(name, value) {\n    name = asciiLowercase(String(name));\n    value = String(value);\n\n    if (!solelyContainsHTTPTokenCodePoints(name)) {\n      throw new Error(`Invalid MIME type parameter name \"${name}\": only HTTP token code points are valid.`);\n    }\n    if (!soleyContainsHTTPQuotedStringTokenCodePoints(value)) {\n      throw new Error(`Invalid MIME type parameter value \"${value}\": only HTTP quoted-string token code points are ` +\n                      `valid.`);\n    }\n\n    return this._map.set(name, value);\n  }\n\n  clear() {\n    this._map.clear();\n  }\n\n  delete(name) {\n    name = asciiLowercase(String(name));\n    return this._map.delete(name);\n  }\n\n  forEach(callbackFn, thisArg) {\n    this._map.forEach(callbackFn, thisArg);\n  }\n\n  keys() {\n    return this._map.keys();\n  }\n\n  values() {\n    return this._map.values();\n  }\n\n  entries() {\n    return this._map.entries();\n  }\n\n  [Symbol.iterator]() {\n    return this._map[Symbol.iterator]();\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvd2hhdHdnLW1pbWV0eXBlL2xpYi9taW1lLXR5cGUtcGFyYW1ldGVycy5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxFQUFFLG1CQUFPLENBQUMscUVBQVk7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyREFBMkQsS0FBSztBQUNoRTtBQUNBO0FBQ0EsNERBQTRELE1BQU07QUFDbEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN1cmYvLi9ub2RlX21vZHVsZXMvd2hhdHdnLW1pbWV0eXBlL2xpYi9taW1lLXR5cGUtcGFyYW1ldGVycy5qcz8yZDZiIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuY29uc3Qge1xuICBhc2NpaUxvd2VyY2FzZSxcbiAgc29sZWx5Q29udGFpbnNIVFRQVG9rZW5Db2RlUG9pbnRzLFxuICBzb2xleUNvbnRhaW5zSFRUUFF1b3RlZFN0cmluZ1Rva2VuQ29kZVBvaW50c1xufSA9IHJlcXVpcmUoXCIuL3V0aWxzLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIE1JTUVUeXBlUGFyYW1ldGVycyB7XG4gIGNvbnN0cnVjdG9yKG1hcCkge1xuICAgIHRoaXMuX21hcCA9IG1hcDtcbiAgfVxuXG4gIGdldCBzaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9tYXAuc2l6ZTtcbiAgfVxuXG4gIGdldChuYW1lKSB7XG4gICAgbmFtZSA9IGFzY2lpTG93ZXJjYXNlKFN0cmluZyhuYW1lKSk7XG4gICAgcmV0dXJuIHRoaXMuX21hcC5nZXQobmFtZSk7XG4gIH1cblxuICBoYXMobmFtZSkge1xuICAgIG5hbWUgPSBhc2NpaUxvd2VyY2FzZShTdHJpbmcobmFtZSkpO1xuICAgIHJldHVybiB0aGlzLl9tYXAuaGFzKG5hbWUpO1xuICB9XG5cbiAgc2V0KG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IGFzY2lpTG93ZXJjYXNlKFN0cmluZyhuYW1lKSk7XG4gICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuXG4gICAgaWYgKCFzb2xlbHlDb250YWluc0hUVFBUb2tlbkNvZGVQb2ludHMobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBNSU1FIHR5cGUgcGFyYW1ldGVyIG5hbWUgXCIke25hbWV9XCI6IG9ubHkgSFRUUCB0b2tlbiBjb2RlIHBvaW50cyBhcmUgdmFsaWQuYCk7XG4gICAgfVxuICAgIGlmICghc29sZXlDb250YWluc0hUVFBRdW90ZWRTdHJpbmdUb2tlbkNvZGVQb2ludHModmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgTUlNRSB0eXBlIHBhcmFtZXRlciB2YWx1ZSBcIiR7dmFsdWV9XCI6IG9ubHkgSFRUUCBxdW90ZWQtc3RyaW5nIHRva2VuIGNvZGUgcG9pbnRzIGFyZSBgICtcbiAgICAgICAgICAgICAgICAgICAgICBgdmFsaWQuYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX21hcC5zZXQobmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5fbWFwLmNsZWFyKCk7XG4gIH1cblxuICBkZWxldGUobmFtZSkge1xuICAgIG5hbWUgPSBhc2NpaUxvd2VyY2FzZShTdHJpbmcobmFtZSkpO1xuICAgIHJldHVybiB0aGlzLl9tYXAuZGVsZXRlKG5hbWUpO1xuICB9XG5cbiAgZm9yRWFjaChjYWxsYmFja0ZuLCB0aGlzQXJnKSB7XG4gICAgdGhpcy5fbWFwLmZvckVhY2goY2FsbGJhY2tGbiwgdGhpc0FyZyk7XG4gIH1cblxuICBrZXlzKCkge1xuICAgIHJldHVybiB0aGlzLl9tYXAua2V5cygpO1xuICB9XG5cbiAgdmFsdWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9tYXAudmFsdWVzKCk7XG4gIH1cblxuICBlbnRyaWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9tYXAuZW50cmllcygpO1xuICB9XG5cbiAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hcFtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/whatwg-mimetype/lib/mime-type-parameters.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/whatwg-mimetype/lib/mime-type.js":
/*!*******************************************************!*\
  !*** ./node_modules/whatwg-mimetype/lib/mime-type.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst MIMETypeParameters = __webpack_require__(/*! ./mime-type-parameters.js */ \"(rsc)/./node_modules/whatwg-mimetype/lib/mime-type-parameters.js\");\nconst parse = __webpack_require__(/*! ./parser.js */ \"(rsc)/./node_modules/whatwg-mimetype/lib/parser.js\");\nconst serialize = __webpack_require__(/*! ./serializer.js */ \"(rsc)/./node_modules/whatwg-mimetype/lib/serializer.js\");\nconst {\n  asciiLowercase,\n  solelyContainsHTTPTokenCodePoints\n} = __webpack_require__(/*! ./utils.js */ \"(rsc)/./node_modules/whatwg-mimetype/lib/utils.js\");\n\nmodule.exports = class MIMEType {\n  constructor(string) {\n    string = String(string);\n    const result = parse(string);\n    if (result === null) {\n      throw new Error(`Could not parse MIME type string \"${string}\"`);\n    }\n\n    this._type = result.type;\n    this._subtype = result.subtype;\n    this._parameters = new MIMETypeParameters(result.parameters);\n  }\n\n  static parse(string) {\n    try {\n      return new this(string);\n    } catch (e) {\n      return null;\n    }\n  }\n\n  get essence() {\n    return `${this.type}/${this.subtype}`;\n  }\n\n  get type() {\n    return this._type;\n  }\n\n  set type(value) {\n    value = asciiLowercase(String(value));\n\n    if (value.length === 0) {\n      throw new Error(\"Invalid type: must be a non-empty string\");\n    }\n    if (!solelyContainsHTTPTokenCodePoints(value)) {\n      throw new Error(`Invalid type ${value}: must contain only HTTP token code points`);\n    }\n\n    this._type = value;\n  }\n\n  get subtype() {\n    return this._subtype;\n  }\n\n  set subtype(value) {\n    value = asciiLowercase(String(value));\n\n    if (value.length === 0) {\n      throw new Error(\"Invalid subtype: must be a non-empty string\");\n    }\n    if (!solelyContainsHTTPTokenCodePoints(value)) {\n      throw new Error(`Invalid subtype ${value}: must contain only HTTP token code points`);\n    }\n\n    this._subtype = value;\n  }\n\n  get parameters() {\n    return this._parameters;\n  }\n\n  toString() {\n    // The serialize function works on both \"MIME type records\" (i.e. the results of parse) and on this class, since\n    // this class's interface is identical.\n    return serialize(this);\n  }\n\n  isJavaScript({ prohibitParameters = false } = {}) {\n    switch (this._type) {\n      case \"text\": {\n        switch (this._subtype) {\n          case \"ecmascript\":\n          case \"javascript\":\n          case \"javascript1.0\":\n          case \"javascript1.1\":\n          case \"javascript1.2\":\n          case \"javascript1.3\":\n          case \"javascript1.4\":\n          case \"javascript1.5\":\n          case \"jscript\":\n          case \"livescript\":\n          case \"x-ecmascript\":\n          case \"x-javascript\": {\n            return !prohibitParameters || this._parameters.size === 0;\n          }\n          default: {\n            return false;\n          }\n        }\n      }\n      case \"application\": {\n        switch (this._subtype) {\n          case \"ecmascript\":\n          case \"javascript\":\n          case \"x-ecmascript\":\n          case \"x-javascript\": {\n            return !prohibitParameters || this._parameters.size === 0;\n          }\n          default: {\n            return false;\n          }\n        }\n      }\n      default: {\n        return false;\n      }\n    }\n  }\n  isXML() {\n    return (this._subtype === \"xml\" && (this._type === \"text\" || this._type === \"application\")) ||\n           this._subtype.endsWith(\"+xml\");\n  }\n  isHTML() {\n    return this._subtype === \"html\" && this._type === \"text\";\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvd2hhdHdnLW1pbWV0eXBlL2xpYi9taW1lLXR5cGUuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYiwyQkFBMkIsbUJBQU8sQ0FBQyxtR0FBMkI7QUFDOUQsY0FBYyxtQkFBTyxDQUFDLHVFQUFhO0FBQ25DLGtCQUFrQixtQkFBTyxDQUFDLCtFQUFpQjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxFQUFFLEVBQUUsbUJBQU8sQ0FBQyxxRUFBWTs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxPQUFPO0FBQ2xFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLFVBQVUsR0FBRyxhQUFhO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE1BQU07QUFDNUM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxNQUFNO0FBQy9DOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLDZCQUE2QixJQUFJO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3VyZi8uL25vZGVfbW9kdWxlcy93aGF0d2ctbWltZXR5cGUvbGliL21pbWUtdHlwZS5qcz80MTFjIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuY29uc3QgTUlNRVR5cGVQYXJhbWV0ZXJzID0gcmVxdWlyZShcIi4vbWltZS10eXBlLXBhcmFtZXRlcnMuanNcIik7XG5jb25zdCBwYXJzZSA9IHJlcXVpcmUoXCIuL3BhcnNlci5qc1wiKTtcbmNvbnN0IHNlcmlhbGl6ZSA9IHJlcXVpcmUoXCIuL3NlcmlhbGl6ZXIuanNcIik7XG5jb25zdCB7XG4gIGFzY2lpTG93ZXJjYXNlLFxuICBzb2xlbHlDb250YWluc0hUVFBUb2tlbkNvZGVQb2ludHNcbn0gPSByZXF1aXJlKFwiLi91dGlscy5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBNSU1FVHlwZSB7XG4gIGNvbnN0cnVjdG9yKHN0cmluZykge1xuICAgIHN0cmluZyA9IFN0cmluZyhzdHJpbmcpO1xuICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlKHN0cmluZyk7XG4gICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgcGFyc2UgTUlNRSB0eXBlIHN0cmluZyBcIiR7c3RyaW5nfVwiYCk7XG4gICAgfVxuXG4gICAgdGhpcy5fdHlwZSA9IHJlc3VsdC50eXBlO1xuICAgIHRoaXMuX3N1YnR5cGUgPSByZXN1bHQuc3VidHlwZTtcbiAgICB0aGlzLl9wYXJhbWV0ZXJzID0gbmV3IE1JTUVUeXBlUGFyYW1ldGVycyhyZXN1bHQucGFyYW1ldGVycyk7XG4gIH1cblxuICBzdGF0aWMgcGFyc2Uoc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBuZXcgdGhpcyhzdHJpbmcpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGdldCBlc3NlbmNlKCkge1xuICAgIHJldHVybiBgJHt0aGlzLnR5cGV9LyR7dGhpcy5zdWJ0eXBlfWA7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgfVxuXG4gIHNldCB0eXBlKHZhbHVlKSB7XG4gICAgdmFsdWUgPSBhc2NpaUxvd2VyY2FzZShTdHJpbmcodmFsdWUpKTtcblxuICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdHlwZTogbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmdcIik7XG4gICAgfVxuICAgIGlmICghc29sZWx5Q29udGFpbnNIVFRQVG9rZW5Db2RlUG9pbnRzKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHR5cGUgJHt2YWx1ZX06IG11c3QgY29udGFpbiBvbmx5IEhUVFAgdG9rZW4gY29kZSBwb2ludHNgKTtcbiAgICB9XG5cbiAgICB0aGlzLl90eXBlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgc3VidHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3VidHlwZTtcbiAgfVxuXG4gIHNldCBzdWJ0eXBlKHZhbHVlKSB7XG4gICAgdmFsdWUgPSBhc2NpaUxvd2VyY2FzZShTdHJpbmcodmFsdWUpKTtcblxuICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc3VidHlwZTogbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmdcIik7XG4gICAgfVxuICAgIGlmICghc29sZWx5Q29udGFpbnNIVFRQVG9rZW5Db2RlUG9pbnRzKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHN1YnR5cGUgJHt2YWx1ZX06IG11c3QgY29udGFpbiBvbmx5IEhUVFAgdG9rZW4gY29kZSBwb2ludHNgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zdWJ0eXBlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcGFyYW1ldGVycygpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyYW1ldGVycztcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIC8vIFRoZSBzZXJpYWxpemUgZnVuY3Rpb24gd29ya3Mgb24gYm90aCBcIk1JTUUgdHlwZSByZWNvcmRzXCIgKGkuZS4gdGhlIHJlc3VsdHMgb2YgcGFyc2UpIGFuZCBvbiB0aGlzIGNsYXNzLCBzaW5jZVxuICAgIC8vIHRoaXMgY2xhc3MncyBpbnRlcmZhY2UgaXMgaWRlbnRpY2FsLlxuICAgIHJldHVybiBzZXJpYWxpemUodGhpcyk7XG4gIH1cblxuICBpc0phdmFTY3JpcHQoeyBwcm9oaWJpdFBhcmFtZXRlcnMgPSBmYWxzZSB9ID0ge30pIHtcbiAgICBzd2l0Y2ggKHRoaXMuX3R5cGUpIHtcbiAgICAgIGNhc2UgXCJ0ZXh0XCI6IHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9zdWJ0eXBlKSB7XG4gICAgICAgICAgY2FzZSBcImVjbWFzY3JpcHRcIjpcbiAgICAgICAgICBjYXNlIFwiamF2YXNjcmlwdFwiOlxuICAgICAgICAgIGNhc2UgXCJqYXZhc2NyaXB0MS4wXCI6XG4gICAgICAgICAgY2FzZSBcImphdmFzY3JpcHQxLjFcIjpcbiAgICAgICAgICBjYXNlIFwiamF2YXNjcmlwdDEuMlwiOlxuICAgICAgICAgIGNhc2UgXCJqYXZhc2NyaXB0MS4zXCI6XG4gICAgICAgICAgY2FzZSBcImphdmFzY3JpcHQxLjRcIjpcbiAgICAgICAgICBjYXNlIFwiamF2YXNjcmlwdDEuNVwiOlxuICAgICAgICAgIGNhc2UgXCJqc2NyaXB0XCI6XG4gICAgICAgICAgY2FzZSBcImxpdmVzY3JpcHRcIjpcbiAgICAgICAgICBjYXNlIFwieC1lY21hc2NyaXB0XCI6XG4gICAgICAgICAgY2FzZSBcIngtamF2YXNjcmlwdFwiOiB7XG4gICAgICAgICAgICByZXR1cm4gIXByb2hpYml0UGFyYW1ldGVycyB8fCB0aGlzLl9wYXJhbWV0ZXJzLnNpemUgPT09IDA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNhc2UgXCJhcHBsaWNhdGlvblwiOiB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fc3VidHlwZSkge1xuICAgICAgICAgIGNhc2UgXCJlY21hc2NyaXB0XCI6XG4gICAgICAgICAgY2FzZSBcImphdmFzY3JpcHRcIjpcbiAgICAgICAgICBjYXNlIFwieC1lY21hc2NyaXB0XCI6XG4gICAgICAgICAgY2FzZSBcIngtamF2YXNjcmlwdFwiOiB7XG4gICAgICAgICAgICByZXR1cm4gIXByb2hpYml0UGFyYW1ldGVycyB8fCB0aGlzLl9wYXJhbWV0ZXJzLnNpemUgPT09IDA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpc1hNTCgpIHtcbiAgICByZXR1cm4gKHRoaXMuX3N1YnR5cGUgPT09IFwieG1sXCIgJiYgKHRoaXMuX3R5cGUgPT09IFwidGV4dFwiIHx8IHRoaXMuX3R5cGUgPT09IFwiYXBwbGljYXRpb25cIikpIHx8XG4gICAgICAgICAgIHRoaXMuX3N1YnR5cGUuZW5kc1dpdGgoXCIreG1sXCIpO1xuICB9XG4gIGlzSFRNTCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3VidHlwZSA9PT0gXCJodG1sXCIgJiYgdGhpcy5fdHlwZSA9PT0gXCJ0ZXh0XCI7XG4gIH1cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/whatwg-mimetype/lib/mime-type.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/whatwg-mimetype/lib/parser.js":
/*!****************************************************!*\
  !*** ./node_modules/whatwg-mimetype/lib/parser.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst {\n  removeLeadingAndTrailingHTTPWhitespace,\n  removeTrailingHTTPWhitespace,\n  isHTTPWhitespaceChar,\n  solelyContainsHTTPTokenCodePoints,\n  soleyContainsHTTPQuotedStringTokenCodePoints,\n  asciiLowercase,\n  collectAnHTTPQuotedString\n} = __webpack_require__(/*! ./utils.js */ \"(rsc)/./node_modules/whatwg-mimetype/lib/utils.js\");\n\nmodule.exports = input => {\n  input = removeLeadingAndTrailingHTTPWhitespace(input);\n\n  let position = 0;\n  let type = \"\";\n  while (position < input.length && input[position] !== \"/\") {\n    type += input[position];\n    ++position;\n  }\n\n  if (type.length === 0 || !solelyContainsHTTPTokenCodePoints(type)) {\n    return null;\n  }\n\n  if (position >= input.length) {\n    return null;\n  }\n\n  // Skips past \"/\"\n  ++position;\n\n  let subtype = \"\";\n  while (position < input.length && input[position] !== \";\") {\n    subtype += input[position];\n    ++position;\n  }\n\n  subtype = removeTrailingHTTPWhitespace(subtype);\n\n  if (subtype.length === 0 || !solelyContainsHTTPTokenCodePoints(subtype)) {\n    return null;\n  }\n\n  const mimeType = {\n    type: asciiLowercase(type),\n    subtype: asciiLowercase(subtype),\n    parameters: new Map()\n  };\n\n  while (position < input.length) {\n    // Skip past \";\"\n    ++position;\n\n    while (isHTTPWhitespaceChar(input[position])) {\n      ++position;\n    }\n\n    let parameterName = \"\";\n    while (position < input.length && input[position] !== \";\" && input[position] !== \"=\") {\n      parameterName += input[position];\n      ++position;\n    }\n    parameterName = asciiLowercase(parameterName);\n\n    if (position < input.length) {\n      if (input[position] === \";\") {\n        continue;\n      }\n\n      // Skip past \"=\"\n      ++position;\n    }\n\n    let parameterValue = null;\n    if (input[position] === \"\\\"\") {\n      [parameterValue, position] = collectAnHTTPQuotedString(input, position);\n\n      while (position < input.length && input[position] !== \";\") {\n        ++position;\n      }\n    } else {\n      parameterValue = \"\";\n      while (position < input.length && input[position] !== \";\") {\n        parameterValue += input[position];\n        ++position;\n      }\n\n      parameterValue = removeTrailingHTTPWhitespace(parameterValue);\n\n      if (parameterValue === \"\") {\n        continue;\n      }\n    }\n\n    if (parameterName.length > 0 &&\n        solelyContainsHTTPTokenCodePoints(parameterName) &&\n        soleyContainsHTTPQuotedStringTokenCodePoints(parameterValue) &&\n        !mimeType.parameters.has(parameterName)) {\n      mimeType.parameters.set(parameterName, parameterValue);\n    }\n  }\n\n  return mimeType;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvd2hhdHdnLW1pbWV0eXBlL2xpYi9wYXJzZXIuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxFQUFFLG1CQUFPLENBQUMscUVBQVk7O0FBRXhCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUI7QUFDbkI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNERBQTREO0FBQzVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw4REFBOEQ7QUFDOUQ7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLDhEQUE4RDtBQUM5RDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3VyZi8uL25vZGVfbW9kdWxlcy93aGF0d2ctbWltZXR5cGUvbGliL3BhcnNlci5qcz8zZjI2Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuY29uc3Qge1xuICByZW1vdmVMZWFkaW5nQW5kVHJhaWxpbmdIVFRQV2hpdGVzcGFjZSxcbiAgcmVtb3ZlVHJhaWxpbmdIVFRQV2hpdGVzcGFjZSxcbiAgaXNIVFRQV2hpdGVzcGFjZUNoYXIsXG4gIHNvbGVseUNvbnRhaW5zSFRUUFRva2VuQ29kZVBvaW50cyxcbiAgc29sZXlDb250YWluc0hUVFBRdW90ZWRTdHJpbmdUb2tlbkNvZGVQb2ludHMsXG4gIGFzY2lpTG93ZXJjYXNlLFxuICBjb2xsZWN0QW5IVFRQUXVvdGVkU3RyaW5nXG59ID0gcmVxdWlyZShcIi4vdXRpbHMuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXQgPT4ge1xuICBpbnB1dCA9IHJlbW92ZUxlYWRpbmdBbmRUcmFpbGluZ0hUVFBXaGl0ZXNwYWNlKGlucHV0KTtcblxuICBsZXQgcG9zaXRpb24gPSAwO1xuICBsZXQgdHlwZSA9IFwiXCI7XG4gIHdoaWxlIChwb3NpdGlvbiA8IGlucHV0Lmxlbmd0aCAmJiBpbnB1dFtwb3NpdGlvbl0gIT09IFwiL1wiKSB7XG4gICAgdHlwZSArPSBpbnB1dFtwb3NpdGlvbl07XG4gICAgKytwb3NpdGlvbjtcbiAgfVxuXG4gIGlmICh0eXBlLmxlbmd0aCA9PT0gMCB8fCAhc29sZWx5Q29udGFpbnNIVFRQVG9rZW5Db2RlUG9pbnRzKHR5cGUpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAocG9zaXRpb24gPj0gaW5wdXQubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBTa2lwcyBwYXN0IFwiL1wiXG4gICsrcG9zaXRpb247XG5cbiAgbGV0IHN1YnR5cGUgPSBcIlwiO1xuICB3aGlsZSAocG9zaXRpb24gPCBpbnB1dC5sZW5ndGggJiYgaW5wdXRbcG9zaXRpb25dICE9PSBcIjtcIikge1xuICAgIHN1YnR5cGUgKz0gaW5wdXRbcG9zaXRpb25dO1xuICAgICsrcG9zaXRpb247XG4gIH1cblxuICBzdWJ0eXBlID0gcmVtb3ZlVHJhaWxpbmdIVFRQV2hpdGVzcGFjZShzdWJ0eXBlKTtcblxuICBpZiAoc3VidHlwZS5sZW5ndGggPT09IDAgfHwgIXNvbGVseUNvbnRhaW5zSFRUUFRva2VuQ29kZVBvaW50cyhzdWJ0eXBlKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgbWltZVR5cGUgPSB7XG4gICAgdHlwZTogYXNjaWlMb3dlcmNhc2UodHlwZSksXG4gICAgc3VidHlwZTogYXNjaWlMb3dlcmNhc2Uoc3VidHlwZSksXG4gICAgcGFyYW1ldGVyczogbmV3IE1hcCgpXG4gIH07XG5cbiAgd2hpbGUgKHBvc2l0aW9uIDwgaW5wdXQubGVuZ3RoKSB7XG4gICAgLy8gU2tpcCBwYXN0IFwiO1wiXG4gICAgKytwb3NpdGlvbjtcblxuICAgIHdoaWxlIChpc0hUVFBXaGl0ZXNwYWNlQ2hhcihpbnB1dFtwb3NpdGlvbl0pKSB7XG4gICAgICArK3Bvc2l0aW9uO1xuICAgIH1cblxuICAgIGxldCBwYXJhbWV0ZXJOYW1lID0gXCJcIjtcbiAgICB3aGlsZSAocG9zaXRpb24gPCBpbnB1dC5sZW5ndGggJiYgaW5wdXRbcG9zaXRpb25dICE9PSBcIjtcIiAmJiBpbnB1dFtwb3NpdGlvbl0gIT09IFwiPVwiKSB7XG4gICAgICBwYXJhbWV0ZXJOYW1lICs9IGlucHV0W3Bvc2l0aW9uXTtcbiAgICAgICsrcG9zaXRpb247XG4gICAgfVxuICAgIHBhcmFtZXRlck5hbWUgPSBhc2NpaUxvd2VyY2FzZShwYXJhbWV0ZXJOYW1lKTtcblxuICAgIGlmIChwb3NpdGlvbiA8IGlucHV0Lmxlbmd0aCkge1xuICAgICAgaWYgKGlucHV0W3Bvc2l0aW9uXSA9PT0gXCI7XCIpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFNraXAgcGFzdCBcIj1cIlxuICAgICAgKytwb3NpdGlvbjtcbiAgICB9XG5cbiAgICBsZXQgcGFyYW1ldGVyVmFsdWUgPSBudWxsO1xuICAgIGlmIChpbnB1dFtwb3NpdGlvbl0gPT09IFwiXFxcIlwiKSB7XG4gICAgICBbcGFyYW1ldGVyVmFsdWUsIHBvc2l0aW9uXSA9IGNvbGxlY3RBbkhUVFBRdW90ZWRTdHJpbmcoaW5wdXQsIHBvc2l0aW9uKTtcblxuICAgICAgd2hpbGUgKHBvc2l0aW9uIDwgaW5wdXQubGVuZ3RoICYmIGlucHV0W3Bvc2l0aW9uXSAhPT0gXCI7XCIpIHtcbiAgICAgICAgKytwb3NpdGlvbjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1ldGVyVmFsdWUgPSBcIlwiO1xuICAgICAgd2hpbGUgKHBvc2l0aW9uIDwgaW5wdXQubGVuZ3RoICYmIGlucHV0W3Bvc2l0aW9uXSAhPT0gXCI7XCIpIHtcbiAgICAgICAgcGFyYW1ldGVyVmFsdWUgKz0gaW5wdXRbcG9zaXRpb25dO1xuICAgICAgICArK3Bvc2l0aW9uO1xuICAgICAgfVxuXG4gICAgICBwYXJhbWV0ZXJWYWx1ZSA9IHJlbW92ZVRyYWlsaW5nSFRUUFdoaXRlc3BhY2UocGFyYW1ldGVyVmFsdWUpO1xuXG4gICAgICBpZiAocGFyYW1ldGVyVmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtZXRlck5hbWUubGVuZ3RoID4gMCAmJlxuICAgICAgICBzb2xlbHlDb250YWluc0hUVFBUb2tlbkNvZGVQb2ludHMocGFyYW1ldGVyTmFtZSkgJiZcbiAgICAgICAgc29sZXlDb250YWluc0hUVFBRdW90ZWRTdHJpbmdUb2tlbkNvZGVQb2ludHMocGFyYW1ldGVyVmFsdWUpICYmXG4gICAgICAgICFtaW1lVHlwZS5wYXJhbWV0ZXJzLmhhcyhwYXJhbWV0ZXJOYW1lKSkge1xuICAgICAgbWltZVR5cGUucGFyYW1ldGVycy5zZXQocGFyYW1ldGVyTmFtZSwgcGFyYW1ldGVyVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtaW1lVHlwZTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/whatwg-mimetype/lib/parser.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/whatwg-mimetype/lib/serializer.js":
/*!********************************************************!*\
  !*** ./node_modules/whatwg-mimetype/lib/serializer.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst { solelyContainsHTTPTokenCodePoints } = __webpack_require__(/*! ./utils.js */ \"(rsc)/./node_modules/whatwg-mimetype/lib/utils.js\");\n\nmodule.exports = mimeType => {\n  let serialization = `${mimeType.type}/${mimeType.subtype}`;\n\n  if (mimeType.parameters.size === 0) {\n    return serialization;\n  }\n\n  for (let [name, value] of mimeType.parameters) {\n    serialization += \";\";\n    serialization += name;\n    serialization += \"=\";\n\n    if (!solelyContainsHTTPTokenCodePoints(value) || value.length === 0) {\n      value = value.replace(/([\"\\\\])/ug, \"\\\\$1\");\n      value = `\"${value}\"`;\n    }\n\n    serialization += value;\n  }\n\n  return serialization;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvd2hhdHdnLW1pbWV0eXBlL2xpYi9zZXJpYWxpemVyLmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsUUFBUSxvQ0FBb0MsRUFBRSxtQkFBTyxDQUFDLHFFQUFZOztBQUVsRTtBQUNBLHlCQUF5QixjQUFjLEdBQUcsaUJBQWlCOztBQUUzRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLE1BQU07QUFDeEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVzdXJmLy4vbm9kZV9tb2R1bGVzL3doYXR3Zy1taW1ldHlwZS9saWIvc2VyaWFsaXplci5qcz80ZjBhIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuY29uc3QgeyBzb2xlbHlDb250YWluc0hUVFBUb2tlbkNvZGVQb2ludHMgfSA9IHJlcXVpcmUoXCIuL3V0aWxzLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1pbWVUeXBlID0+IHtcbiAgbGV0IHNlcmlhbGl6YXRpb24gPSBgJHttaW1lVHlwZS50eXBlfS8ke21pbWVUeXBlLnN1YnR5cGV9YDtcblxuICBpZiAobWltZVR5cGUucGFyYW1ldGVycy5zaXplID09PSAwKSB7XG4gICAgcmV0dXJuIHNlcmlhbGl6YXRpb247XG4gIH1cblxuICBmb3IgKGxldCBbbmFtZSwgdmFsdWVdIG9mIG1pbWVUeXBlLnBhcmFtZXRlcnMpIHtcbiAgICBzZXJpYWxpemF0aW9uICs9IFwiO1wiO1xuICAgIHNlcmlhbGl6YXRpb24gKz0gbmFtZTtcbiAgICBzZXJpYWxpemF0aW9uICs9IFwiPVwiO1xuXG4gICAgaWYgKCFzb2xlbHlDb250YWluc0hUVFBUb2tlbkNvZGVQb2ludHModmFsdWUpIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8oW1wiXFxcXF0pL3VnLCBcIlxcXFwkMVwiKTtcbiAgICAgIHZhbHVlID0gYFwiJHt2YWx1ZX1cImA7XG4gICAgfVxuXG4gICAgc2VyaWFsaXphdGlvbiArPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBzZXJpYWxpemF0aW9uO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/whatwg-mimetype/lib/serializer.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/whatwg-mimetype/lib/utils.js":
/*!***************************************************!*\
  !*** ./node_modules/whatwg-mimetype/lib/utils.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nexports.removeLeadingAndTrailingHTTPWhitespace = string => {\n  return string.replace(/^[ \\t\\n\\r]+/u, \"\").replace(/[ \\t\\n\\r]+$/u, \"\");\n};\n\nexports.removeTrailingHTTPWhitespace = string => {\n  return string.replace(/[ \\t\\n\\r]+$/u, \"\");\n};\n\nexports.isHTTPWhitespaceChar = char => {\n  return char === \" \" || char === \"\\t\" || char === \"\\n\" || char === \"\\r\";\n};\n\nexports.solelyContainsHTTPTokenCodePoints = string => {\n  return /^[-!#$%&'*+.^_`|~A-Za-z0-9]*$/u.test(string);\n};\n\nexports.soleyContainsHTTPQuotedStringTokenCodePoints = string => {\n  return /^[\\t\\u0020-\\u007E\\u0080-\\u00FF]*$/u.test(string);\n};\n\nexports.asciiLowercase = string => {\n  return string.replace(/[A-Z]/ug, l => l.toLowerCase());\n};\n\n// This variant only implements it with the extract-value flag set.\nexports.collectAnHTTPQuotedString = (input, position) => {\n  let value = \"\";\n\n  position++;\n\n  while (true) {\n    while (position < input.length && input[position] !== \"\\\"\" && input[position] !== \"\\\\\") {\n      value += input[position];\n      ++position;\n    }\n\n    if (position >= input.length) {\n      break;\n    }\n\n    const quoteOrBackslash = input[position];\n    ++position;\n\n    if (quoteOrBackslash === \"\\\\\") {\n      if (position >= input.length) {\n        value += \"\\\\\";\n        break;\n      }\n\n      value += input[position];\n      ++position;\n    } else {\n      break;\n    }\n  }\n\n  return [value, position];\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvd2hhdHdnLW1pbWV0eXBlL2xpYi91dGlscy5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYiw4Q0FBOEM7QUFDOUM7QUFDQTs7QUFFQSxvQ0FBb0M7QUFDcEM7QUFDQTs7QUFFQSw0QkFBNEI7QUFDNUI7QUFDQTs7QUFFQSx5Q0FBeUM7QUFDekM7QUFDQTs7QUFFQSxvREFBb0Q7QUFDcEQ7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3VyZi8uL25vZGVfbW9kdWxlcy93aGF0d2ctbWltZXR5cGUvbGliL3V0aWxzLmpzPzMyZDAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMucmVtb3ZlTGVhZGluZ0FuZFRyYWlsaW5nSFRUUFdoaXRlc3BhY2UgPSBzdHJpbmcgPT4ge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL15bIFxcdFxcblxccl0rL3UsIFwiXCIpLnJlcGxhY2UoL1sgXFx0XFxuXFxyXSskL3UsIFwiXCIpO1xufTtcblxuZXhwb3J0cy5yZW1vdmVUcmFpbGluZ0hUVFBXaGl0ZXNwYWNlID0gc3RyaW5nID0+IHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bIFxcdFxcblxccl0rJC91LCBcIlwiKTtcbn07XG5cbmV4cG9ydHMuaXNIVFRQV2hpdGVzcGFjZUNoYXIgPSBjaGFyID0+IHtcbiAgcmV0dXJuIGNoYXIgPT09IFwiIFwiIHx8IGNoYXIgPT09IFwiXFx0XCIgfHwgY2hhciA9PT0gXCJcXG5cIiB8fCBjaGFyID09PSBcIlxcclwiO1xufTtcblxuZXhwb3J0cy5zb2xlbHlDb250YWluc0hUVFBUb2tlbkNvZGVQb2ludHMgPSBzdHJpbmcgPT4ge1xuICByZXR1cm4gL15bLSEjJCUmJyorLl5fYHx+QS1aYS16MC05XSokL3UudGVzdChzdHJpbmcpO1xufTtcblxuZXhwb3J0cy5zb2xleUNvbnRhaW5zSFRUUFF1b3RlZFN0cmluZ1Rva2VuQ29kZVBvaW50cyA9IHN0cmluZyA9PiB7XG4gIHJldHVybiAvXltcXHRcXHUwMDIwLVxcdTAwN0VcXHUwMDgwLVxcdTAwRkZdKiQvdS50ZXN0KHN0cmluZyk7XG59O1xuXG5leHBvcnRzLmFzY2lpTG93ZXJjYXNlID0gc3RyaW5nID0+IHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bQS1aXS91ZywgbCA9PiBsLnRvTG93ZXJDYXNlKCkpO1xufTtcblxuLy8gVGhpcyB2YXJpYW50IG9ubHkgaW1wbGVtZW50cyBpdCB3aXRoIHRoZSBleHRyYWN0LXZhbHVlIGZsYWcgc2V0LlxuZXhwb3J0cy5jb2xsZWN0QW5IVFRQUXVvdGVkU3RyaW5nID0gKGlucHV0LCBwb3NpdGlvbikgPT4ge1xuICBsZXQgdmFsdWUgPSBcIlwiO1xuXG4gIHBvc2l0aW9uKys7XG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICB3aGlsZSAocG9zaXRpb24gPCBpbnB1dC5sZW5ndGggJiYgaW5wdXRbcG9zaXRpb25dICE9PSBcIlxcXCJcIiAmJiBpbnB1dFtwb3NpdGlvbl0gIT09IFwiXFxcXFwiKSB7XG4gICAgICB2YWx1ZSArPSBpbnB1dFtwb3NpdGlvbl07XG4gICAgICArK3Bvc2l0aW9uO1xuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA+PSBpbnB1dC5sZW5ndGgpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IHF1b3RlT3JCYWNrc2xhc2ggPSBpbnB1dFtwb3NpdGlvbl07XG4gICAgKytwb3NpdGlvbjtcblxuICAgIGlmIChxdW90ZU9yQmFja3NsYXNoID09PSBcIlxcXFxcIikge1xuICAgICAgaWYgKHBvc2l0aW9uID49IGlucHV0Lmxlbmd0aCkge1xuICAgICAgICB2YWx1ZSArPSBcIlxcXFxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHZhbHVlICs9IGlucHV0W3Bvc2l0aW9uXTtcbiAgICAgICsrcG9zaXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbdmFsdWUsIHBvc2l0aW9uXTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/whatwg-mimetype/lib/utils.js\n");

/***/ })

};
;