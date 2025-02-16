"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/parse5-htmlparser2-tree-adapter";
exports.ids = ["vendor-chunks/parse5-htmlparser2-tree-adapter"];
exports.modules = {

/***/ "(rsc)/./node_modules/parse5-htmlparser2-tree-adapter/dist/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/parse5-htmlparser2-tree-adapter/dist/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   adapter: () => (/* binding */ adapter),\n/* harmony export */   serializeDoctypeContent: () => (/* binding */ serializeDoctypeContent)\n/* harmony export */ });\n/* harmony import */ var parse5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parse5 */ \"(rsc)/./node_modules/parse5/dist/index.js\");\n/* harmony import */ var domhandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! domhandler */ \"(rsc)/./node_modules/domhandler/lib/esm/index.js\");\n\n\nfunction enquoteDoctypeId(id) {\n    const quote = id.includes('\"') ? \"'\" : '\"';\n    return quote + id + quote;\n}\n/** @internal */\nfunction serializeDoctypeContent(name, publicId, systemId) {\n    let str = '!DOCTYPE ';\n    if (name) {\n        str += name;\n    }\n    if (publicId) {\n        str += ` PUBLIC ${enquoteDoctypeId(publicId)}`;\n    }\n    else if (systemId) {\n        str += ' SYSTEM';\n    }\n    if (systemId) {\n        str += ` ${enquoteDoctypeId(systemId)}`;\n    }\n    return str;\n}\nconst adapter = {\n    // Re-exports from domhandler\n    isCommentNode: domhandler__WEBPACK_IMPORTED_MODULE_1__.isComment,\n    isElementNode: domhandler__WEBPACK_IMPORTED_MODULE_1__.isTag,\n    isTextNode: domhandler__WEBPACK_IMPORTED_MODULE_1__.isText,\n    //Node construction\n    createDocument() {\n        const node = new domhandler__WEBPACK_IMPORTED_MODULE_1__.Document([]);\n        node['x-mode'] = parse5__WEBPACK_IMPORTED_MODULE_0__.html.DOCUMENT_MODE.NO_QUIRKS;\n        return node;\n    },\n    createDocumentFragment() {\n        return new domhandler__WEBPACK_IMPORTED_MODULE_1__.Document([]);\n    },\n    createElement(tagName, namespaceURI, attrs) {\n        const attribs = Object.create(null);\n        const attribsNamespace = Object.create(null);\n        const attribsPrefix = Object.create(null);\n        for (let i = 0; i < attrs.length; i++) {\n            const attrName = attrs[i].name;\n            attribs[attrName] = attrs[i].value;\n            attribsNamespace[attrName] = attrs[i].namespace;\n            attribsPrefix[attrName] = attrs[i].prefix;\n        }\n        const node = new domhandler__WEBPACK_IMPORTED_MODULE_1__.Element(tagName, attribs, []);\n        node.namespace = namespaceURI;\n        node['x-attribsNamespace'] = attribsNamespace;\n        node['x-attribsPrefix'] = attribsPrefix;\n        return node;\n    },\n    createCommentNode(data) {\n        return new domhandler__WEBPACK_IMPORTED_MODULE_1__.Comment(data);\n    },\n    createTextNode(value) {\n        return new domhandler__WEBPACK_IMPORTED_MODULE_1__.Text(value);\n    },\n    //Tree mutation\n    appendChild(parentNode, newNode) {\n        const prev = parentNode.children[parentNode.children.length - 1];\n        if (prev) {\n            prev.next = newNode;\n            newNode.prev = prev;\n        }\n        parentNode.children.push(newNode);\n        newNode.parent = parentNode;\n    },\n    insertBefore(parentNode, newNode, referenceNode) {\n        const insertionIdx = parentNode.children.indexOf(referenceNode);\n        const { prev } = referenceNode;\n        if (prev) {\n            prev.next = newNode;\n            newNode.prev = prev;\n        }\n        referenceNode.prev = newNode;\n        newNode.next = referenceNode;\n        parentNode.children.splice(insertionIdx, 0, newNode);\n        newNode.parent = parentNode;\n    },\n    setTemplateContent(templateElement, contentElement) {\n        adapter.appendChild(templateElement, contentElement);\n    },\n    getTemplateContent(templateElement) {\n        return templateElement.children[0];\n    },\n    setDocumentType(document, name, publicId, systemId) {\n        const data = serializeDoctypeContent(name, publicId, systemId);\n        let doctypeNode = document.children.find((node) => (0,domhandler__WEBPACK_IMPORTED_MODULE_1__.isDirective)(node) && node.name === '!doctype');\n        if (doctypeNode) {\n            doctypeNode.data = data !== null && data !== void 0 ? data : null;\n        }\n        else {\n            doctypeNode = new domhandler__WEBPACK_IMPORTED_MODULE_1__.ProcessingInstruction('!doctype', data);\n            adapter.appendChild(document, doctypeNode);\n        }\n        doctypeNode['x-name'] = name;\n        doctypeNode['x-publicId'] = publicId;\n        doctypeNode['x-systemId'] = systemId;\n    },\n    setDocumentMode(document, mode) {\n        document['x-mode'] = mode;\n    },\n    getDocumentMode(document) {\n        return document['x-mode'];\n    },\n    detachNode(node) {\n        if (node.parent) {\n            const idx = node.parent.children.indexOf(node);\n            const { prev, next } = node;\n            node.prev = null;\n            node.next = null;\n            if (prev) {\n                prev.next = next;\n            }\n            if (next) {\n                next.prev = prev;\n            }\n            node.parent.children.splice(idx, 1);\n            node.parent = null;\n        }\n    },\n    insertText(parentNode, text) {\n        const lastChild = parentNode.children[parentNode.children.length - 1];\n        if (lastChild && (0,domhandler__WEBPACK_IMPORTED_MODULE_1__.isText)(lastChild)) {\n            lastChild.data += text;\n        }\n        else {\n            adapter.appendChild(parentNode, adapter.createTextNode(text));\n        }\n    },\n    insertTextBefore(parentNode, text, referenceNode) {\n        const prevNode = parentNode.children[parentNode.children.indexOf(referenceNode) - 1];\n        if (prevNode && (0,domhandler__WEBPACK_IMPORTED_MODULE_1__.isText)(prevNode)) {\n            prevNode.data += text;\n        }\n        else {\n            adapter.insertBefore(parentNode, adapter.createTextNode(text), referenceNode);\n        }\n    },\n    adoptAttributes(recipient, attrs) {\n        for (let i = 0; i < attrs.length; i++) {\n            const attrName = attrs[i].name;\n            if (recipient.attribs[attrName] === undefined) {\n                recipient.attribs[attrName] = attrs[i].value;\n                recipient['x-attribsNamespace'][attrName] = attrs[i].namespace;\n                recipient['x-attribsPrefix'][attrName] = attrs[i].prefix;\n            }\n        }\n    },\n    //Tree traversing\n    getFirstChild(node) {\n        return node.children[0];\n    },\n    getChildNodes(node) {\n        return node.children;\n    },\n    getParentNode(node) {\n        return node.parent;\n    },\n    getAttrList(element) {\n        return element.attributes;\n    },\n    //Node data\n    getTagName(element) {\n        return element.name;\n    },\n    getNamespaceURI(element) {\n        return element.namespace;\n    },\n    getTextNodeContent(textNode) {\n        return textNode.data;\n    },\n    getCommentNodeContent(commentNode) {\n        return commentNode.data;\n    },\n    getDocumentTypeNodeName(doctypeNode) {\n        var _a;\n        return (_a = doctypeNode['x-name']) !== null && _a !== void 0 ? _a : '';\n    },\n    getDocumentTypeNodePublicId(doctypeNode) {\n        var _a;\n        return (_a = doctypeNode['x-publicId']) !== null && _a !== void 0 ? _a : '';\n    },\n    getDocumentTypeNodeSystemId(doctypeNode) {\n        var _a;\n        return (_a = doctypeNode['x-systemId']) !== null && _a !== void 0 ? _a : '';\n    },\n    //Node types\n    isDocumentTypeNode(node) {\n        return (0,domhandler__WEBPACK_IMPORTED_MODULE_1__.isDirective)(node) && node.name === '!doctype';\n    },\n    // Source code location\n    setNodeSourceCodeLocation(node, location) {\n        if (location) {\n            node.startIndex = location.startOffset;\n            node.endIndex = location.endOffset;\n        }\n        node.sourceCodeLocation = location;\n    },\n    getNodeSourceCodeLocation(node) {\n        return node.sourceCodeLocation;\n    },\n    updateNodeSourceCodeLocation(node, endLocation) {\n        if (endLocation.endOffset != null)\n            node.endIndex = endLocation.endOffset;\n        node.sourceCodeLocation = {\n            ...node.sourceCodeLocation,\n            ...endLocation,\n        };\n    },\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvcGFyc2U1LWh0bWxwYXJzZXIyLXRyZWUtYWRhcHRlci9kaXN0L2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBOEI7QUFDK0Y7QUFDN0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiwyQkFBMkI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLG1CQUFtQixpREFBUztBQUM1QixtQkFBbUIsNkNBQUs7QUFDeEIsZ0JBQWdCLDhDQUFNO0FBQ3RCO0FBQ0E7QUFDQSx5QkFBeUIsZ0RBQVE7QUFDakMseUJBQXlCLHNEQUFrQjtBQUMzQztBQUNBLEtBQUs7QUFDTDtBQUNBLG1CQUFtQixnREFBUTtBQUMzQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0JBQWtCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsK0NBQU87QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxtQkFBbUIsK0NBQU87QUFDMUIsS0FBSztBQUNMO0FBQ0EsbUJBQW1CLDRDQUFJO0FBQ3ZCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwyREFBMkQsdURBQVc7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsNkRBQXFCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHlCQUF5QixrREFBTTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSx3QkFBd0Isa0RBQU07QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsZUFBZSx1REFBVztBQUMxQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3VyZi8uL25vZGVfbW9kdWxlcy9wYXJzZTUtaHRtbHBhcnNlcjItdHJlZS1hZGFwdGVyL2Rpc3QvaW5kZXguanM/YzMzNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBodG1sIH0gZnJvbSAncGFyc2U1JztcbmltcG9ydCB7IEVsZW1lbnQsIERvY3VtZW50LCBQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24sIENvbW1lbnQsIFRleHQsIGlzRGlyZWN0aXZlLCBpc1RleHQsIGlzQ29tbWVudCwgaXNUYWcsIH0gZnJvbSAnZG9taGFuZGxlcic7XG5mdW5jdGlvbiBlbnF1b3RlRG9jdHlwZUlkKGlkKSB7XG4gICAgY29uc3QgcXVvdGUgPSBpZC5pbmNsdWRlcygnXCInKSA/IFwiJ1wiIDogJ1wiJztcbiAgICByZXR1cm4gcXVvdGUgKyBpZCArIHF1b3RlO1xufVxuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZURvY3R5cGVDb250ZW50KG5hbWUsIHB1YmxpY0lkLCBzeXN0ZW1JZCkge1xuICAgIGxldCBzdHIgPSAnIURPQ1RZUEUgJztcbiAgICBpZiAobmFtZSkge1xuICAgICAgICBzdHIgKz0gbmFtZTtcbiAgICB9XG4gICAgaWYgKHB1YmxpY0lkKSB7XG4gICAgICAgIHN0ciArPSBgIFBVQkxJQyAke2VucXVvdGVEb2N0eXBlSWQocHVibGljSWQpfWA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHN5c3RlbUlkKSB7XG4gICAgICAgIHN0ciArPSAnIFNZU1RFTSc7XG4gICAgfVxuICAgIGlmIChzeXN0ZW1JZCkge1xuICAgICAgICBzdHIgKz0gYCAke2VucXVvdGVEb2N0eXBlSWQoc3lzdGVtSWQpfWA7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5leHBvcnQgY29uc3QgYWRhcHRlciA9IHtcbiAgICAvLyBSZS1leHBvcnRzIGZyb20gZG9taGFuZGxlclxuICAgIGlzQ29tbWVudE5vZGU6IGlzQ29tbWVudCxcbiAgICBpc0VsZW1lbnROb2RlOiBpc1RhZyxcbiAgICBpc1RleHROb2RlOiBpc1RleHQsXG4gICAgLy9Ob2RlIGNvbnN0cnVjdGlvblxuICAgIGNyZWF0ZURvY3VtZW50KCkge1xuICAgICAgICBjb25zdCBub2RlID0gbmV3IERvY3VtZW50KFtdKTtcbiAgICAgICAgbm9kZVsneC1tb2RlJ10gPSBodG1sLkRPQ1VNRU5UX01PREUuTk9fUVVJUktTO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuICAgIGNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRG9jdW1lbnQoW10pO1xuICAgIH0sXG4gICAgY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBuYW1lc3BhY2VVUkksIGF0dHJzKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBjb25zdCBhdHRyaWJzTmFtZXNwYWNlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgY29uc3QgYXR0cmlic1ByZWZpeCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0cnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJOYW1lID0gYXR0cnNbaV0ubmFtZTtcbiAgICAgICAgICAgIGF0dHJpYnNbYXR0ck5hbWVdID0gYXR0cnNbaV0udmFsdWU7XG4gICAgICAgICAgICBhdHRyaWJzTmFtZXNwYWNlW2F0dHJOYW1lXSA9IGF0dHJzW2ldLm5hbWVzcGFjZTtcbiAgICAgICAgICAgIGF0dHJpYnNQcmVmaXhbYXR0ck5hbWVdID0gYXR0cnNbaV0ucHJlZml4O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vZGUgPSBuZXcgRWxlbWVudCh0YWdOYW1lLCBhdHRyaWJzLCBbXSk7XG4gICAgICAgIG5vZGUubmFtZXNwYWNlID0gbmFtZXNwYWNlVVJJO1xuICAgICAgICBub2RlWyd4LWF0dHJpYnNOYW1lc3BhY2UnXSA9IGF0dHJpYnNOYW1lc3BhY2U7XG4gICAgICAgIG5vZGVbJ3gtYXR0cmlic1ByZWZpeCddID0gYXR0cmlic1ByZWZpeDtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcbiAgICBjcmVhdGVDb21tZW50Tm9kZShkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29tbWVudChkYXRhKTtcbiAgICB9LFxuICAgIGNyZWF0ZVRleHROb2RlKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGV4dCh2YWx1ZSk7XG4gICAgfSxcbiAgICAvL1RyZWUgbXV0YXRpb25cbiAgICBhcHBlbmRDaGlsZChwYXJlbnROb2RlLCBuZXdOb2RlKSB7XG4gICAgICAgIGNvbnN0IHByZXYgPSBwYXJlbnROb2RlLmNoaWxkcmVuW3BhcmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICBwcmV2Lm5leHQgPSBuZXdOb2RlO1xuICAgICAgICAgICAgbmV3Tm9kZS5wcmV2ID0gcHJldjtcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnROb2RlLmNoaWxkcmVuLnB1c2gobmV3Tm9kZSk7XG4gICAgICAgIG5ld05vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICB9LFxuICAgIGluc2VydEJlZm9yZShwYXJlbnROb2RlLCBuZXdOb2RlLCByZWZlcmVuY2VOb2RlKSB7XG4gICAgICAgIGNvbnN0IGluc2VydGlvbklkeCA9IHBhcmVudE5vZGUuY2hpbGRyZW4uaW5kZXhPZihyZWZlcmVuY2VOb2RlKTtcbiAgICAgICAgY29uc3QgeyBwcmV2IH0gPSByZWZlcmVuY2VOb2RlO1xuICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgcHJldi5uZXh0ID0gbmV3Tm9kZTtcbiAgICAgICAgICAgIG5ld05vZGUucHJldiA9IHByZXY7XG4gICAgICAgIH1cbiAgICAgICAgcmVmZXJlbmNlTm9kZS5wcmV2ID0gbmV3Tm9kZTtcbiAgICAgICAgbmV3Tm9kZS5uZXh0ID0gcmVmZXJlbmNlTm9kZTtcbiAgICAgICAgcGFyZW50Tm9kZS5jaGlsZHJlbi5zcGxpY2UoaW5zZXJ0aW9uSWR4LCAwLCBuZXdOb2RlKTtcbiAgICAgICAgbmV3Tm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgIH0sXG4gICAgc2V0VGVtcGxhdGVDb250ZW50KHRlbXBsYXRlRWxlbWVudCwgY29udGVudEVsZW1lbnQpIHtcbiAgICAgICAgYWRhcHRlci5hcHBlbmRDaGlsZCh0ZW1wbGF0ZUVsZW1lbnQsIGNvbnRlbnRFbGVtZW50KTtcbiAgICB9LFxuICAgIGdldFRlbXBsYXRlQ29udGVudCh0ZW1wbGF0ZUVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICB9LFxuICAgIHNldERvY3VtZW50VHlwZShkb2N1bWVudCwgbmFtZSwgcHVibGljSWQsIHN5c3RlbUlkKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBzZXJpYWxpemVEb2N0eXBlQ29udGVudChuYW1lLCBwdWJsaWNJZCwgc3lzdGVtSWQpO1xuICAgICAgICBsZXQgZG9jdHlwZU5vZGUgPSBkb2N1bWVudC5jaGlsZHJlbi5maW5kKChub2RlKSA9PiBpc0RpcmVjdGl2ZShub2RlKSAmJiBub2RlLm5hbWUgPT09ICchZG9jdHlwZScpO1xuICAgICAgICBpZiAoZG9jdHlwZU5vZGUpIHtcbiAgICAgICAgICAgIGRvY3R5cGVOb2RlLmRhdGEgPSBkYXRhICE9PSBudWxsICYmIGRhdGEgIT09IHZvaWQgMCA/IGRhdGEgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9jdHlwZU5vZGUgPSBuZXcgUHJvY2Vzc2luZ0luc3RydWN0aW9uKCchZG9jdHlwZScsIGRhdGEpO1xuICAgICAgICAgICAgYWRhcHRlci5hcHBlbmRDaGlsZChkb2N1bWVudCwgZG9jdHlwZU5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3R5cGVOb2RlWyd4LW5hbWUnXSA9IG5hbWU7XG4gICAgICAgIGRvY3R5cGVOb2RlWyd4LXB1YmxpY0lkJ10gPSBwdWJsaWNJZDtcbiAgICAgICAgZG9jdHlwZU5vZGVbJ3gtc3lzdGVtSWQnXSA9IHN5c3RlbUlkO1xuICAgIH0sXG4gICAgc2V0RG9jdW1lbnRNb2RlKGRvY3VtZW50LCBtb2RlKSB7XG4gICAgICAgIGRvY3VtZW50Wyd4LW1vZGUnXSA9IG1vZGU7XG4gICAgfSxcbiAgICBnZXREb2N1bWVudE1vZGUoZG9jdW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50Wyd4LW1vZGUnXTtcbiAgICB9LFxuICAgIGRldGFjaE5vZGUobm9kZSkge1xuICAgICAgICBpZiAobm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IG5vZGUucGFyZW50LmNoaWxkcmVuLmluZGV4T2Yobm9kZSk7XG4gICAgICAgICAgICBjb25zdCB7IHByZXYsIG5leHQgfSA9IG5vZGU7XG4gICAgICAgICAgICBub2RlLnByZXYgPSBudWxsO1xuICAgICAgICAgICAgbm9kZS5uZXh0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICAgICAgcHJldi5uZXh0ID0gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgICAgICAgbmV4dC5wcmV2ID0gcHJldjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUucGFyZW50LmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBpbnNlcnRUZXh0KHBhcmVudE5vZGUsIHRleHQpIHtcbiAgICAgICAgY29uc3QgbGFzdENoaWxkID0gcGFyZW50Tm9kZS5jaGlsZHJlbltwYXJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAobGFzdENoaWxkICYmIGlzVGV4dChsYXN0Q2hpbGQpKSB7XG4gICAgICAgICAgICBsYXN0Q2hpbGQuZGF0YSArPSB0ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWRhcHRlci5hcHBlbmRDaGlsZChwYXJlbnROb2RlLCBhZGFwdGVyLmNyZWF0ZVRleHROb2RlKHRleHQpKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaW5zZXJ0VGV4dEJlZm9yZShwYXJlbnROb2RlLCB0ZXh0LCByZWZlcmVuY2VOb2RlKSB7XG4gICAgICAgIGNvbnN0IHByZXZOb2RlID0gcGFyZW50Tm9kZS5jaGlsZHJlbltwYXJlbnROb2RlLmNoaWxkcmVuLmluZGV4T2YocmVmZXJlbmNlTm9kZSkgLSAxXTtcbiAgICAgICAgaWYgKHByZXZOb2RlICYmIGlzVGV4dChwcmV2Tm9kZSkpIHtcbiAgICAgICAgICAgIHByZXZOb2RlLmRhdGEgKz0gdGV4dDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFkYXB0ZXIuaW5zZXJ0QmVmb3JlKHBhcmVudE5vZGUsIGFkYXB0ZXIuY3JlYXRlVGV4dE5vZGUodGV4dCksIHJlZmVyZW5jZU5vZGUpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhZG9wdEF0dHJpYnV0ZXMocmVjaXBpZW50LCBhdHRycykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhdHRyTmFtZSA9IGF0dHJzW2ldLm5hbWU7XG4gICAgICAgICAgICBpZiAocmVjaXBpZW50LmF0dHJpYnNbYXR0ck5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZWNpcGllbnQuYXR0cmlic1thdHRyTmFtZV0gPSBhdHRyc1tpXS52YWx1ZTtcbiAgICAgICAgICAgICAgICByZWNpcGllbnRbJ3gtYXR0cmlic05hbWVzcGFjZSddW2F0dHJOYW1lXSA9IGF0dHJzW2ldLm5hbWVzcGFjZTtcbiAgICAgICAgICAgICAgICByZWNpcGllbnRbJ3gtYXR0cmlic1ByZWZpeCddW2F0dHJOYW1lXSA9IGF0dHJzW2ldLnByZWZpeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy9UcmVlIHRyYXZlcnNpbmdcbiAgICBnZXRGaXJzdENoaWxkKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUuY2hpbGRyZW5bMF07XG4gICAgfSxcbiAgICBnZXRDaGlsZE5vZGVzKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUuY2hpbGRyZW47XG4gICAgfSxcbiAgICBnZXRQYXJlbnROb2RlKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUucGFyZW50O1xuICAgIH0sXG4gICAgZ2V0QXR0ckxpc3QoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5hdHRyaWJ1dGVzO1xuICAgIH0sXG4gICAgLy9Ob2RlIGRhdGFcbiAgICBnZXRUYWdOYW1lKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQubmFtZTtcbiAgICB9LFxuICAgIGdldE5hbWVzcGFjZVVSSShlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Lm5hbWVzcGFjZTtcbiAgICB9LFxuICAgIGdldFRleHROb2RlQ29udGVudCh0ZXh0Tm9kZSkge1xuICAgICAgICByZXR1cm4gdGV4dE5vZGUuZGF0YTtcbiAgICB9LFxuICAgIGdldENvbW1lbnROb2RlQ29udGVudChjb21tZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gY29tbWVudE5vZGUuZGF0YTtcbiAgICB9LFxuICAgIGdldERvY3VtZW50VHlwZU5vZGVOYW1lKGRvY3R5cGVOb2RlKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IGRvY3R5cGVOb2RlWyd4LW5hbWUnXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyc7XG4gICAgfSxcbiAgICBnZXREb2N1bWVudFR5cGVOb2RlUHVibGljSWQoZG9jdHlwZU5vZGUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKF9hID0gZG9jdHlwZU5vZGVbJ3gtcHVibGljSWQnXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyc7XG4gICAgfSxcbiAgICBnZXREb2N1bWVudFR5cGVOb2RlU3lzdGVtSWQoZG9jdHlwZU5vZGUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKF9hID0gZG9jdHlwZU5vZGVbJ3gtc3lzdGVtSWQnXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyc7XG4gICAgfSxcbiAgICAvL05vZGUgdHlwZXNcbiAgICBpc0RvY3VtZW50VHlwZU5vZGUobm9kZSkge1xuICAgICAgICByZXR1cm4gaXNEaXJlY3RpdmUobm9kZSkgJiYgbm9kZS5uYW1lID09PSAnIWRvY3R5cGUnO1xuICAgIH0sXG4gICAgLy8gU291cmNlIGNvZGUgbG9jYXRpb25cbiAgICBzZXROb2RlU291cmNlQ29kZUxvY2F0aW9uKG5vZGUsIGxvY2F0aW9uKSB7XG4gICAgICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgICAgICAgbm9kZS5zdGFydEluZGV4ID0gbG9jYXRpb24uc3RhcnRPZmZzZXQ7XG4gICAgICAgICAgICBub2RlLmVuZEluZGV4ID0gbG9jYXRpb24uZW5kT2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIG5vZGUuc291cmNlQ29kZUxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgfSxcbiAgICBnZXROb2RlU291cmNlQ29kZUxvY2F0aW9uKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUuc291cmNlQ29kZUxvY2F0aW9uO1xuICAgIH0sXG4gICAgdXBkYXRlTm9kZVNvdXJjZUNvZGVMb2NhdGlvbihub2RlLCBlbmRMb2NhdGlvbikge1xuICAgICAgICBpZiAoZW5kTG9jYXRpb24uZW5kT2Zmc2V0ICE9IG51bGwpXG4gICAgICAgICAgICBub2RlLmVuZEluZGV4ID0gZW5kTG9jYXRpb24uZW5kT2Zmc2V0O1xuICAgICAgICBub2RlLnNvdXJjZUNvZGVMb2NhdGlvbiA9IHtcbiAgICAgICAgICAgIC4uLm5vZGUuc291cmNlQ29kZUxvY2F0aW9uLFxuICAgICAgICAgICAgLi4uZW5kTG9jYXRpb24sXG4gICAgICAgIH07XG4gICAgfSxcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/parse5-htmlparser2-tree-adapter/dist/index.js\n");

/***/ })

};
;