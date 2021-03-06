/**
 * by 司徒正美 Copyright 2018-05-24
 * IE9+
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.React = factory());
}(this, (function () {

var arrayPush = Array.prototype.push;

var hasOwnProperty = Object.prototype.hasOwnProperty;
function Fragment(props) {
    return props.children;
}
var gSBU = "getSnapshotBeforeUpdate";
var gDSFP = "getDerivedStateFromProps";
var hasSymbol = typeof Symbol === "function" && Symbol["for"];
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol["for"]("react.element") : 0xeac7;
var effects = [];
function resetStack(info) {
    keepLast(info.containerStack);
    keepLast(info.containerStack);
}
function keepLast(list) {
    var n = list.length;
    list.splice(0, n - 1);
}
function get(key) {
    return key._reactInternalFiber;
}
var topFibers = [];
var topNodes = [];

var emptyObject = {};
var fakeWindow = {};
function getWindow() {
    try {
        return window;
    } catch (e) {
        try {
            return global;
        } catch (e) {
            return fakeWindow;
        }
    }
}
function isMounted(instance) {
    var fiber = get(instance);
    return !!(fiber && fiber.hasMounted);
}
function toWarnDev(msg, deprecated) {
    msg = deprecated ? msg + " is deprecated" : msg;
    var process = getWindow().process;
    if (process && process.env.NODE_ENV === "development") {
        throw msg;
    }
}
function extend(obj, props) {
    for (var i in props) {
        if (hasOwnProperty.call(props, i)) {
            obj[i] = props[i];
        }
    }
    return obj;
}
function returnFalse() {
    return false;
}
function returnTrue() {
    return true;
}
var __type = Object.prototype.toString;
function noop() {}
function inherit(SubClass, SupClass) {
    function Bridge() {}
    var orig = SubClass.prototype;
    Bridge.prototype = SupClass.prototype;
    var fn = SubClass.prototype = new Bridge();
    extend(fn, orig);
    fn.constructor = SubClass;
    return fn;
}
var lowerCache = {};
function toLowerCase(s) {
    return lowerCache[s] || (lowerCache[s] = s.toLowerCase());
}

function isFn(obj) {
    return __type.call(obj) === "[object Function]";
}
var rword = /[^, ]+/g;
function oneObject(array, val) {
    if (array + "" === array) {
        array = array.match(rword) || [];
    }
    var result = {},
    value = val !== void 666 ? val : 1;
    for (var i = 0, n = array.length; i < n; i++) {
        result[array[i]] = value;
    }
    return result;
}
var rcamelize = /[-_][^-_]/g;
function camelize(target) {
    if (!target || target.indexOf("-") < 0 && target.indexOf("_") < 0) {
        return target;
    }
    var str = target.replace(rcamelize, function (match) {
        return match.charAt(1).toUpperCase();
    });
    return firstLetterLower(str);
}
function firstLetterLower(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
var numberMap = {
    "[object Boolean]": 2,
    "[object Number]": 3,
    "[object String]": 4,
    "[object Function]": 5,
    "[object Symbol]": 6,
    "[object Array]": 7
};
function typeNumber(data) {
    if (data === null) {
        return 1;
    }
    if (data === void 666) {
        return 0;
    }
    var a = numberMap[__type.call(data)];
    return a || 8;
}

function createRenderer(methods) {
    return extend(Renderer, methods);
}
var middlewares = [];
var Renderer = {
    controlledCbs: [],
    mountOrder: 1,
    macrotasks: [],
    boundaries: [],
    middleware: function middleware(obj) {
        if (obj.begin && obj.end) {
            middlewares.push(obj);
        }
    },
    fireMiddlewares: function fireMiddlewares(begin) {
        var index = begin ? middlewares.length - 1 : 0,
            delta = begin ? -1 : 1,
            method = begin ? "begin" : "end",
            obj = void 0;
        while (obj = middlewares[index]) {
            obj[method]();
            index += delta;
        }
    },
    currentOwner: null
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
var RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
};
function makeProps(type, config, props, children, len) {
    var defaultProps = void 0,
        propName = void 0;
    for (propName in config) {
        if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
        }
    }
    if (type && type.defaultProps) {
        defaultProps = type.defaultProps;
        for (propName in defaultProps) {
            if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
            }
        }
    }
    if (len === 1) {
        props.children = children[0];
    } else if (len > 1) {
        props.children = children;
    }
    return props;
}
function hasValidRef(config) {
    return config.ref !== undefined;
}
function hasValidKey(config) {
    return config.key !== undefined;
}
function createElement(type, config) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }
    var props = {},
        tag = 5,
        key = null,
        ref = null,
        argsLen = children.length;
    if (type && type.call) {
        tag = type.prototype && type.prototype.render ? 2 : 1;
    } else if (type + "" !== type) {
        toWarnDev("React.createElement: type is invalid.");
    }
    if (config != null) {
        if (hasValidRef(config)) {
            ref = config.ref;
        }
        if (hasValidKey(config)) {
            key = "" + config.key;
        }
    }
    props = makeProps(type, config || {}, props, children, argsLen);
    return ReactElement(type, tag, props, key, ref, Renderer.currentOwner);
}
function cloneElement(element, config) {
    var props = Object.assign({}, element.props);
    var type = element.type;
    var key = element.key;
    var ref = element.ref;
    var tag = element.tag;
    var owner = element._owner;
    for (var _len2 = arguments.length, children = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        children[_key2 - 2] = arguments[_key2];
    }
    var argsLen = children.length;
    if (config != null) {
        if (hasValidRef(config)) {
            ref = config.ref;
            owner = Renderer.currentOwner;
        }
        if (hasValidKey(config)) {
            key = "" + config.key;
        }
    }
    props = makeProps(type, config || {}, props, children, argsLen);
    return ReactElement(type, tag, props, key, ref, owner);
}
function createFactory(type) {
    var factory = createElement.bind(null, type);
    factory.type = type;
    return factory;
}
function ReactElement(type, tag, props, key, ref, owner) {
    var ret = {
        type: type,
        tag: tag,
        props: props
    };
    if (tag !== 6) {
        ret.$$typeof = REACT_ELEMENT_TYPE;
        ret.key = key || null;
        var refType = typeNumber(ref);
        if (refType === 2 || refType === 3 || refType === 4 || refType === 5 || refType === 8) {
            if (refType < 4) {
                ref += "";
            }
            ret.ref = ref;
        } else {
            ret.ref = null;
        }
        ret._owner = owner;
    }
    return ret;
}
function isValidElement(vnode) {
    return !!vnode && vnode.$$typeof === REACT_ELEMENT_TYPE;
}
function createVText(text) {
    return ReactElement("#text", 6, { children: text + "" });
}
function escape(key) {
    var escapeRegex = /[=:]/g;
    var escaperLookup = {
        '=': '=0',
        ':': '=2'
    };
    var escapedString = ('' + key).replace(escapeRegex, function (match) {
        return escaperLookup[match];
    });
    return '$' + escapedString;
}
var lastText = void 0;
var flattenIndex = void 0;
var flattenObject = void 0;
function flattenCb(context, child, key, childType) {
    if (child === null) {
        lastText = null;
        return;
    }
    if (childType === 3 || childType === 4) {
        if (lastText) {
            lastText.props.children += child;
            return;
        }
        lastText = child = createVText(child);
    } else {
        lastText = null;
    }
    if (!flattenObject[key]) {
        flattenObject[key] = child;
    } else {
        key = "." + flattenIndex;
        flattenObject[key] = child;
    }
    flattenIndex++;
}
function fiberizeChildren(children, fiber) {
    flattenObject = {};
    flattenIndex = 0;
    if (children !== void 666) {
        lastText = null;
        traverseAllChildren(children, "", flattenCb);
    }
    flattenIndex = 0;
    return fiber.children = flattenObject;
}
function getComponentKey(component, index) {
    if ((typeof component === "undefined" ? "undefined" : _typeof(component)) === 'object' && component !== null && component.key != null) {
        return escape(component.key);
    }
    return index.toString(36);
}
var SEPARATOR = ".";
var SUBSEPARATOR = ':';
function traverseAllChildren(children, nameSoFar, callback, bookKeeping) {
    var childType = typeNumber(children);
    var invokeCallback = false;
    switch (childType) {
        case 0:
        case 1:
        case 2:
        case 5:
        case 6:
            children = null;
            invokeCallback = true;
            break;
        case 3:
        case 4:
            invokeCallback = true;
            break;
        case 8:
            if (children.$$typeof) {
                invokeCallback = true;
            } else if (children.hasOwnProperty("toString")) {
                children = children + "";
                invokeCallback = true;
                childType = 3;
            }
            break;
    }
    if (invokeCallback) {
        callback(bookKeeping, children,
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar, childType);
        return 1;
    }
    var subtreeCount = 0;
    var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
    if (children.forEach) {
        children.forEach(function (child, i) {
            var nextName = nextNamePrefix + getComponentKey(child, i);
            subtreeCount += traverseAllChildren(child, nextName, callback, bookKeeping);
        });
        return subtreeCount;
    }
    var iteratorFn = getIteractor(children);
    if (iteratorFn) {
        iterator = iteratorFn.call(children);
        var ii = 0,
            step;
        while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getComponentKey(child, ii++);
            subtreeCount += traverseAllChildren(child, nextName, callback, bookKeeping);
        }
        return subtreeCount;
    }
    throw "React.createElement: type is invalid.";
}
var REAL_SYMBOL = hasSymbol && Symbol.iterator;
var FAKE_SYMBOL = "@@iterator";
function getIteractor(a) {
    var iteratorFn = REAL_SYMBOL && a[REAL_SYMBOL] || a[FAKE_SYMBOL];
    if (iteratorFn && iteratorFn.call) {
        return iteratorFn;
    }
}

var Children = {
    only: function only(children) {
        if (isValidElement(children)) {
            return children;
        }
        throw new Error("expect only one child");
    },
    count: function count(children) {
        if (children == null) {
            return 0;
        }
        return traverseAllChildren(children, "", noop);
    },
    map: function map(children, func, context) {
        return proxyIt(children, func, [], context);
    },
    forEach: function forEach(children, func, context) {
        return proxyIt(children, func, null, context);
    },
    toArray: function toArray$$1(children) {
        return proxyIt(children, K, []);
    }
};
function proxyIt(children, func, result, context) {
    if (children == null) {
        return [];
    }
    mapChildren(children, null, func, result, context);
    return result;
}
function K(el) {
    return el;
}
function mapChildren(children, prefix, func, result, context) {
    var keyPrefix = "";
    if (prefix != null) {
        keyPrefix = escapeUserProvidedKey(prefix) + "/";
    }
    traverseAllChildren(children, "", traverseCallback, {
        context: context,
        keyPrefix: keyPrefix,
        func: func,
        result: result,
        count: 0
    });
}
var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
    return ("" + text).replace(userProvidedKeyEscapeRegex, "$&/");
}
function traverseCallback(bookKeeping, child, childKey) {
    var result = bookKeeping.result,
        keyPrefix = bookKeeping.keyPrefix,
        func = bookKeeping.func,
        context = bookKeeping.context;
    var mappedChild = func.call(context, child, bookKeeping.count++);
    if (!result) {
        return;
    }
    if (Array.isArray(mappedChild)) {
        mapChildren(mappedChild, childKey, K, result);
    } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
            mappedChild = extend({}, mappedChild);
            mappedChild.key = keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + "/" : "") + childKey;
        }
        result.push(mappedChild);
    }
}

var check = function check() {
    return check;
};
check.isRequired = check;
var PropTypes = {
    array: check,
    bool: check,
    func: check,
    number: check,
    object: check,
    string: check,
    any: check,
    arrayOf: check,
    element: check,
    instanceOf: check,
    node: check,
    objectOf: check,
    oneOf: check,
    oneOfType: check,
    shape: check
};

var fakeObject = {
    enqueueSetState: returnFalse,
    isMounted: returnFalse
};
function Component(props, context) {
    Renderer.currentOwner = this;
    this.context = context;
    this.props = props;
    this.refs = {};
    this.updater = fakeObject;
    this.state = null;
}
Component.prototype = {
    constructor: Component,
    replaceState: function replaceState() {
        toWarnDev("replaceState", true);
    },
    isReactComponent: returnTrue,
    isMounted: function isMounted$$1() {
        toWarnDev("isMounted", true);
        return this.updater.isMounted(this);
    },
    setState: function setState(state, cb) {
        this.updater.enqueueSetState(this, state, cb);
    },
    forceUpdate: function forceUpdate(cb) {
        this.updater.enqueueSetState(this, true, cb);
    },
    render: function render() {
        throw "must implement render";
    }
};

function shallowEqual(objA, objB) {
    if (Object.is(objA, objB)) {
        return true;
    }
    if (typeNumber(objA) < 7 || typeNumber(objB) < 7) {
        return false;
    }
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
        return false;
    }
    for (var i = 0; i < keysA.length; i++) {
        if (!hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }
    return true;
}

function PureComponent(props, context) {
    Component.call(this, props, context);
}
var fn = inherit(PureComponent, Component);
fn.shouldComponentUpdate = function (nextProps, nextState) {
    var a = shallowEqual(this.props, nextProps);
    var b = shallowEqual(this.state, nextState);
    return !a || !b;
};
fn.isPureComponent = true;

function createRef() {
    return {
        current: null
    };
}
function forwardRef(fn) {
    createRef.render = fn;
    return createRef;
}

function AnuPortal(props) {
    return props.children;
}
function createPortal(children, parent) {
    var child = createElement(AnuPortal, { children: children, parent: parent });
    child.isPortal = true;
    return child;
}

var uuid = 1;
function gud() {
    return uuid++;
}
var MAX_NUMBER = 1073741823;
function createEventEmitter(value) {
    var handlers = [];
    return {
        on: function on(handler) {
            handlers.push(handler);
        },
        off: function off(handler) {
            handlers = handlers.filter(function (h) {
                return h !== handler;
            });
        },
        get: function get$$1() {
            return value;
        },
        set: function set(newValue, changedBits) {
            value = newValue;
            handlers.forEach(function (handler) {
                return handler(value, changedBits);
            });
        }
    };
}
function createContext(defaultValue, calculateChangedBits) {
    var contextProp = "__create-react-context-" + gud() + "__";
    function Provider(props, context) {
        Component.call(this, props, context);
        this.emitter = createEventEmitter(props.value);
    }
    function create(obj, value) {
        obj[contextProp] = value;
        return obj;
    }
    Provider.childContextTypes = create({}, PropTypes.object.isRequired);
    var fn = inherit(Provider, Component);
    fn.getChildContext = function () {
        return create({}, this.emitter);
    };
    fn.componentWillReceiveProps = function (nextProps) {
        if (this.props.value !== nextProps.value) {
            var oldValue = this.props.value;
            var newValue = nextProps.value;
            var changedBits = void 0;
            if (Object.is(oldValue, newValue)) {
                changedBits = 0;
            } else {
                changedBits = typeof calculateChangedBits === "function" ? calculateChangedBits(oldValue, newValue) : MAX_NUMBER;
                changedBits |= 0;
                if (changedBits !== 0) {
                    this.emitter.set(nextProps.value, changedBits);
                }
            }
        }
    };
    fn.render = function () {
        return this.props.children;
    };
    function Consumer(props, context) {
        var _this = this;
        Component.call(this, props, context);
        this.observedBits = 0;
        this.state = {
            value: this.getValue()
        };
        this.onUpdate = function (newValue, changedBits) {
            var observedBits = _this.observedBits | 0;
            if ((observedBits & changedBits) !== 0) {
                _this.setState({ value: _this.getValue() });
            }
        };
    }
    Consumer.contextTypes = create({}, PropTypes.object);
    var fn2 = inherit(Consumer, Component);
    fn2.componentWillReceiveProps = function (nextProps) {
        var observedBits = nextProps.observedBits;
        this.observedBits = observedBits === undefined || observedBits === null ? MAX_NUMBER
        : observedBits;
    };
    fn2.getValue = function () {
        if (this.context[contextProp]) {
            return this.context[contextProp].get();
        } else {
            return defaultValue;
        }
    };
    fn2.componentDidMount = function () {
        if (this.context[contextProp]) {
            this.context[contextProp].on(this.onUpdate);
        }
        var observedBits = this.props.observedBits;
        this.observedBits = observedBits === undefined || observedBits === null ? MAX_NUMBER
        : observedBits;
    };
    fn2.componentWillUnmount = function () {
        if (this.context[contextProp]) {
            this.context[contextProp].off(this.onUpdate);
        }
    };
    fn2.render = function () {
        return this.props.children(this.state.value);
    };
    return {
        Provider: Provider,
        Consumer: Consumer
    };
}

function findHostInstance(fiber) {
    if (!fiber) {
        return null;
    } else if (fiber.nodeType) {
        return fiber;
    } else if (fiber.tag > 3) {
        return fiber.stateNode;
    } else if (fiber.tag < 3) {
        return findHostInstance(fiber.stateNode);
    } else if (fiber.refs && fiber.render) {
        fiber = get(fiber);
        var childrenMap = fiber.children;
        if (childrenMap) {
            for (var i in childrenMap) {
                var dom = findHostInstance(childrenMap[i]);
                if (dom) {
                    return dom;
                }
            }
        }
    }
    return null;
}

function findDOMNode(fiber) {
    if (fiber == null) {
        return null;
    }
    if (fiber.nodeType === 1) {
        return fiber;
    }
    if (!fiber.render) {
        throw "findDOMNode:invalid type";
    }
    return findHostInstance(fiber);
}

function DOMElement(type) {
    this.nodeName = type;
    this.style = {};
    this.children = [];
}
var NAMESPACE = {
    svg: "http://www.w3.org/2000/svg",
    xmlns: "http://www.w3.org/2000/xmlns/",
    xlink: "http://www.w3.org/1999/xlink",
    math: "http://www.w3.org/1998/Math/MathML"
};
var fn$1 = DOMElement.prototype = {
    contains: Boolean
};
String("replaceChild,appendChild,removeAttributeNS,setAttributeNS,removeAttribute,setAttribute" + ",getAttribute,insertBefore,removeChild,addEventListener,removeEventListener,attachEvent" + ",detachEvent").replace(/\w+/g, function (name) {
    fn$1[name] = function () {
        toWarnDev('need implement ' + name);
    };
});
var fakeDoc = new DOMElement();
fakeDoc.createElement = fakeDoc.createElementNS = fakeDoc.createDocumentFragment = function (type) {
    return new DOMElement(type);
};
fakeDoc.createTextNode = fakeDoc.createComment = Boolean;
fakeDoc.documentElement = new DOMElement("html");
fakeDoc.body = new DOMElement("body");
fakeDoc.nodeName = "#document";
fakeDoc.textContent = "";
var win$1 = getWindow();
var inBrowser = !!win$1.alert;
if (!inBrowser) {
    win$1.document = fakeDoc;
}
var document = win$1.document;
var duplexMap = {
    color: 1,
    date: 1,
    datetime: 1,
    "datetime-local": 1,
    email: 1,
    month: 1,
    number: 1,
    password: 1,
    range: 1,
    search: 1,
    tel: 1,
    text: 1,
    time: 1,
    url: 1,
    week: 1,
    textarea: 1,
    checkbox: 2,
    radio: 2,
    "select-one": 3,
    "select-multiple": 3
};
var versions = {
    88: 7,
    80: 6,
    "00": NaN,
    "08": NaN
};
var msie = document.documentMode || versions[typeNumber(document.all) + "" + typeNumber(win$1.XMLHttpRequest)];
var modern = /NaN|undefined/.test(msie) || msie > 8;
function contains(a, b) {
    if (b) {
        while (b = b.parentNode) {
            if (b === a) {
                return true;
            }
        }
    }
    return false;
}

var rnumber = /^-?\d+(\.\d+)?$/;
function patchStyle(dom, lastStyle, nextStyle) {
    if (lastStyle === nextStyle) {
        return;
    }
    for (var name in nextStyle) {
        var val = nextStyle[name];
        if (lastStyle[name] !== val) {
            name = cssName(name, dom);
            if (val !== 0 && !val) {
                val = "";
            } else if (rnumber.test(val) && !cssNumber[name]) {
                val = val + "px";
            }
            try {
                dom.style[name] = val;
            } catch (e) {
                console.log("dom.style[" + name + "] = " + val + "throw error");
            }
        }
    }
    for (var _name in lastStyle) {
        if (!(_name in nextStyle)) {
            _name = cssName(_name, dom);
            dom.style[_name] = "";
        }
    }
}
var cssNumber = oneObject("animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom");
var prefixes = ["", "-webkit-", "-o-", "-moz-", "-ms-"];
var cssMap = oneObject("float", "cssFloat");
function cssName(name, dom) {
    if (cssMap[name]) {
        return cssMap[name];
    }
    var host = dom && dom.style || {};
    for (var i = 0, n = prefixes.length; i < n; i++) {
        var camelCase = camelize(prefixes[i] + name);
        if (camelCase in host) {
            return cssMap[name] = camelCase;
        }
    }
    return null;
}

function getSafeValue(value) {
    switch (typeNumber(value)) {
        case 2:
        case 3:
        case 8:
        case 4:
        case 0:
            return value;
        default:
            return "";
    }
}
var duplexMap$1 = {
    input: {
        init: function init(node, props) {
            var defaultValue = props.defaultValue == null ? "" : props.defaultValue;
            return node._wrapperState = {
                initialValue: getSafeValue(props.value != null ? props.value : defaultValue)
            };
        },
        mount: function mount(node, props, state) {
            if (props.hasOwnProperty("value") || props.hasOwnProperty("defaultValue")) {
                var stateValue = "" + state.initialValue;
                if (node.value === "") {
                    syncValue(node, "value", stateValue);
                }
                node.defaultValue = stateValue;
            }
            var name = node.name;
            if (name !== "") {
                node.name = "";
            }
            node.defaultChecked = !node.defaultChecked;
            node.defaultChecked = !node.defaultChecked;
            if (name !== "") {
                node.name = name;
            }
        },
        update: function update(node, props) {
            if (props.checked != null) {
                syncValue(node, "checked", !!props.checked);
            }
            var value = getSafeValue(props.value);
            if (value != null) {
                if (props.type === "number") {
                    if (value === 0 && node.value === "" ||
                    node.value != value) {
                        syncValue(node, "value", "" + value);
                    }
                } else if (node.value !== "" + value) {
                    syncValue(node, "value", "" + value);
                }
            }
            if (props.hasOwnProperty("value")) {
                setDefaultValue(node, props.type, value);
            } else if (props.hasOwnProperty("defaultValue")) {
                setDefaultValue(node, props.type, getSafeValue(props.defaultValue));
            }
            if (props.checked == null && props.defaultChecked != null) {
                node.defaultChecked = !!props.defaultChecked;
            }
        }
    },
    select: {
        init: function init(node, props) {
            var value = props.value;
            return node._wrapperState = {
                initialValue: value != null ? value : props.defaultValue,
                wasMultiple: !!props.multiple
            };
        },
        mount: function mount(node, props) {
            node.multiple = !!props.multiple;
            var value = props.value;
            if (value != null) {
                updateOptions(node, !!props.multiple, value, false);
            } else if (props.defaultValue != null) {
                updateOptions(node, !!props.multiple, props.defaultValue, true);
            }
        },
        update: function update(node, props) {
            node._wrapperState.initialValue = void 666;
            var wasMultiple = node._wrapperState.wasMultiple;
            node._wrapperState.wasMultiple = !!props.multiple;
            var value = props.value;
            if (value != null) {
                updateOptions(node, !!props.multiple, value, false);
            } else if (wasMultiple !== !!props.multiple) {
                if (props.defaultValue != null) {
                    updateOptions(node, !!props.multiple, props.defaultValue, true);
                } else {
                    updateOptions(node, !!props.multiple, props.multiple ? [] : "", false);
                }
            }
        }
    },
    textarea: {
        init: function init(node, props) {
            var initialValue = props.value;
            if (initialValue == null) {
                var defaultValue = props.defaultValue;
                var children = props.children;
                if (children != null) {
                    defaultValue = node.textContent || node.innerText;
                    node.innerHTML = "";
                }
                if (defaultValue == null) {
                    defaultValue = "";
                }
                initialValue = defaultValue;
            }
            return node._wrapperState = {
                initialValue: "" + initialValue
            };
        },
        mount: function mount(node, props, state) {
            var textContent = node.textContent;
            var stateValue = "" + state.initialValue;
            if (textContent !== stateValue) {
                syncValue(node, "value", stateValue);
            }
        },
        update: function update(node, props) {
            var value = props.value;
            if (value != null) {
                var newValue = "" + value;
                if (newValue !== node.value) {
                    syncValue(node, "value", newValue);
                }
                if (props.defaultValue == null) {
                    node.defaultValue = newValue;
                }
            }
            if (props.defaultValue != null) {
                node.defaultValue = props.defaultValue;
            }
        }
    },
    option: {
        init: function init() {},
        update: function update(node, props) {
            duplexMap$1.option.mount(node, props);
        },
        mount: function mount(node, props) {
            if (node.text !== node.textContent.trim()) {
                node.innerHTML = node.textContent;
            }
            if ("value" in props) {
                node.duplexValue = node.value = props.value;
            } else {
                node.duplexValue = node.text;
            }
        }
    }
};
function setDefaultValue(node, type, value) {
    if (
    type !== "number" || node.ownerDocument.activeElement !== node) {
        if (value == null) {
            node.defaultValue = "" + node._wrapperState.initialValue;
        } else if (node.defaultValue !== "" + value) {
            node.defaultValue = "" + value;
        }
    }
}
function updateOptions(node, multiple, propValue, setDefaultSelected) {
    var options = node.options;
    if (multiple) {
        var selectedValues = propValue;
        var selectedValue = {};
        for (var i = 0; i < selectedValues.length; i++) {
            selectedValue["$" + selectedValues[i]] = true;
        }
        for (var _i = 0; _i < options.length; _i++) {
            var selected = selectedValue.hasOwnProperty("$" + options[_i].duplexValue);
            if (options[_i].selected !== selected) {
                options[_i].selected = selected;
            }
            if (selected && setDefaultSelected) {
                options[_i].defaultSelected = true;
            }
        }
    } else {
        var _selectedValue = "" + propValue;
        var defaultSelected = null;
        for (var _i2 = 0; _i2 < options.length; _i2++) {
            if (options[_i2].duplexValue === _selectedValue) {
                options[_i2].selected = true;
                if (setDefaultSelected) {
                    options[_i2].defaultSelected = true;
                }
                return;
            }
            if (defaultSelected === null && !options[_i2].disabled) {
                defaultSelected = options[_i2];
            }
        }
        if (defaultSelected !== null) {
            defaultSelected.selected = true;
        }
    }
}
function syncValue(dom, name, value) {
    dom.__anuSetValue = true;
    dom[name] = value;
    dom.__anuSetValue = false;
}
function duplexAction(dom, fiber, nextProps, lastProps) {
    var tag = fiber.name,
        fns = duplexMap$1[tag];
    if (tag !== "option") {
        enqueueDuplex(dom);
    }
    if (lastProps == emptyObject) {
        var state = fns.init(dom, nextProps);
        fns.mount(dom, nextProps, state);
    } else {
        fns.update(dom, nextProps);
    }
}
var duplexNodes = [];
function enqueueDuplex(dom) {
    if (duplexNodes.indexOf(dom) == -1) {
        duplexNodes.push(dom);
    }
}
function fireDuplex() {
    var radioMap = {};
    if (duplexNodes.length) {
        do {
            var dom = duplexNodes.shift();
            var e = dom.__events;
            var fiber = e && e.vnode;
            if (fiber && !fiber.disposed) {
                var props = fiber.props;
                var tag = fiber.name;
                if (name === "select") {
                    var value = props.value;
                    if (value != null) {
                        updateOptions(dom, !!props.multiple, value, false);
                    }
                } else {
                    duplexMap$1[tag].update(dom, props);
                    var _name = props.name;
                    if (props.type === "radio" && _name != null && !radioMap[_name]) {
                        radioMap[_name] = 1;
                        collectNamedCousins(dom, _name);
                    }
                }
            }
        } while (duplexNodes.length);
    }
}
function collectNamedCousins(rootNode, name) {
    var queryRoot = rootNode;
    while (queryRoot.parentNode) {
        queryRoot = queryRoot.parentNode;
    }
    var group = queryRoot.getElementsByTagName("input");
    for (var i = 0; i < group.length; i++) {
        var otherNode = group[i];
        if (otherNode === rootNode || otherNode.name !== name || otherNode.type !== "radio" || otherNode.form !== rootNode.form) {
            continue;
        }
        enqueueDuplex(otherNode);
    }
}

var rform = /textarea|input|select|option/i;
var globalEvents = {};
var eventPropHooks = {};
var eventHooks = {};
var eventLowerCache = {
    onClick: "click",
    onChange: "change",
    onWheel: "wheel"
};
function eventAction(dom, name, val, lastProps, fiber) {
    var events = dom.__events || (dom.__events = {});
    events.vnode = fiber;
    var refName = toLowerCase(name.slice(2));
    if (val === false) {
        delete events[refName];
    } else {
        if (!lastProps[name]) {
            var eventName = getBrowserName(name);
            var hook = eventHooks[eventName];
            addGlobalEvent(eventName);
            if (hook) {
                hook(dom, eventName);
            }
        }
        events[refName] = val;
    }
}
var isTouch = "ontouchstart" in document;
function dispatchEvent(e, type, endpoint) {
    e = new SyntheticEvent(e);
    if (type) {
        e.type = type;
    }
    var bubble = e.type,
        terminal = endpoint || document,
        hook = eventPropHooks[e.type];
    if (hook && false === hook(e)) {
        return;
    }
    Renderer.batchedUpdates(function () {
        var paths = collectPaths(e.target, terminal, {});
        var captured = bubble + "capture";
        triggerEventFlow(paths, captured, e);
        if (!e._stopPropagation) {
            triggerEventFlow(paths.reverse(), bubble, e);
        }
    }, e);
}
var nodeID = 1;
function collectPaths(begin, end, unique) {
    var paths = [];
    var node = begin;
    while (node && node.nodeType == 1) {
        var checkChange = node;
        if (node.__events) {
            var vnode = node.__events.vnode;
            inner: while (vnode.return) {
                if (vnode.tag === 5) {
                    node = vnode.stateNode;
                    if (node === end) {
                        return paths;
                    }
                    if (!node) {
                        break inner;
                    }
                    var uid = node.uniqueID || (node.uniqueID = ++nodeID);
                    if (node.__events && !unique[uid]) {
                        unique[uid] = 1;
                        paths.push({ node: node, events: node.__events });
                    }
                }
                vnode = vnode.return;
            }
        }
        if (node === checkChange) {
            node = node.parentNode;
        }
    }
    return paths;
}
function triggerEventFlow(paths, prop, e) {
    for (var i = paths.length; i--;) {
        var path = paths[i];
        var fn = path.events[prop];
        if (isFn(fn)) {
            e.currentTarget = path.node;
            fn.call(void 666, e);
            if (e._stopPropagation) {
                break;
            }
        }
    }
}
function addGlobalEvent(name, capture) {
    if (!globalEvents[name]) {
        globalEvents[name] = true;
        addEvent(document, name, dispatchEvent, capture);
    }
}
function addEvent(el, type, fn, bool) {
    if (el.addEventListener) {
        el.addEventListener(type, fn, bool || false);
    } else if (el.attachEvent) {
        el.attachEvent("on" + type, fn);
    }
}
var rcapture = /Capture$/;
function getBrowserName(onStr) {
    var lower = eventLowerCache[onStr];
    if (lower) {
        return lower;
    }
    var camel = onStr.slice(2).replace(rcapture, "");
    lower = camel.toLowerCase();
    eventLowerCache[onStr] = lower;
    return lower;
}
function getRelatedTarget(e) {
    if (!e.timeStamp) {
        e.relatedTarget = e.type === "mouseover" ? e.fromElement : e.toElement;
    }
    return e.relatedTarget;
}
function getTarget(e) {
    return e.target || e.srcElement;
}
String("load,error").replace(/\w+/g, function (name) {
    eventHooks[name] = function (dom, type) {
        var mark = "__" + type;
        if (!dom[mark]) {
            dom[mark] = true;
            addEvent(dom, type, dispatchEvent);
        }
    };
});
String("mouseenter,mouseleave").replace(/\w+/g, function (name) {
    var mark = "__" + name;
    if (!document[mark]) {
        document[mark] = globalEvents[name] = true;
        addEvent(document, name == "mouseenter" ? "mouseover" : "mouseout", function (e) {
            var from = getTarget(e);
            var to = getRelatedTarget(e);
            var ev1 = new SyntheticEvent(e);
            ev1.target = from;
            ev1.relatedTarget = to;
            ev1.type = "mouseleave";
            var ev2 = new SyntheticEvent(e);
            ev2.target = to;
            ev2.relatedTarget = from;
            ev2.type = "mouseenter";
            if (!to || to !== from && !contains(from, to)) {
                var common = getLowestCommonAncestor(from, to);
                dispatchEvent(ev1, null, common);
                dispatchEvent(ev2, null, common);
            }
        });
    }
});
if (!document["__input"]) {
    globalEvents.input = document["__input"] = true;
    addEvent(document, "input", function (e) {
        var dom = getTarget(e);
        if (input2change.test(dom.type)) {
            dispatchEvent(e, "change");
        }
        dispatchEvent(e);
    });
}
function getLowestCommonAncestor(instA, instB) {
    var depthA = 0;
    for (var tempA = instA; tempA; tempA = tempA.parentNode) {
        depthA++;
    }
    var depthB = 0;
    for (var tempB = instB; tempB; tempB = tempB.parentNode) {
        depthB++;
    }
    while (depthA - depthB > 0) {
        instA = instA.parentNode;
        depthA--;
    }
    while (depthB - depthA > 0) {
        instB = instB.parentNode;
        depthB--;
    }
    var depth = depthA;
    while (depth--) {
        if (instA === instB) {
            return instA;
        }
        instA = instA.parentNode;
        instB = instB.parentNode;
    }
    return null;
}
var specialHandles = {};
function createHandle(name, fn) {
    return specialHandles[name] = function (e) {
        if (fn && fn(e) === false) {
            return;
        }
        dispatchEvent(e, name);
    };
}
var input2change = /text|password|search/i;
if (!document["__input"]) {
    globalEvents.input = document["__input"] = true;
    addEvent(document, "input", function (e) {
        var dom = getTarget(e);
        if (input2change.test(dom.type)) {
            dispatchEvent(e, "change");
        }
        dispatchEvent(e);
    });
}
eventPropHooks.change = function (e) {
    enqueueDuplex(e.target);
};
createHandle("doubleclick");
createHandle("scroll");
createHandle("wheel");
globalEvents.wheel = true;
globalEvents.scroll = true;
globalEvents.doubleclick = true;
if (isTouch) {
    eventHooks.click = eventHooks.clickcapture = function (dom) {
        dom.onclick = dom.onclick || noop;
    };
}
eventPropHooks.click = function (e) {
    return !e.target.disabled;
};
var fixWheelType = document.onwheel !== void 666 ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
eventHooks.wheel = function (dom) {
    addEvent(dom, fixWheelType, specialHandles.wheel);
};
eventPropHooks.wheel = function (event) {
    event.deltaX = "deltaX" in event ? event.deltaX :
    "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
    event.deltaY = "deltaY" in event ? event.deltaY :
    "wheelDeltaY" in event ? -event.wheelDeltaY :
    "wheelDelta" in event ? -event.wheelDelta : 0;
};
var focusMap = {
    focus: "focus",
    blur: "blur"
};
var innerFocus = void 0;
function blurFocus(e) {
    var dom = getTarget(e);
    var type = focusMap[e.type];
    if (Renderer.inserting) {
        if (type === "blur") {
            innerFocus = true;
            Renderer.inserting.focus();
            return;
        }
    }
    if (innerFocus) {
        innerFocus = false;
        return;
    }
    do {
        if (dom.nodeType === 1) {
            if (dom.__events && dom.__events[type]) {
                dispatchEvent(e, type);
                break;
            }
        } else {
            break;
        }
    } while (dom = dom.parentNode);
}
"blur,focus".replace(/\w+/g, function (type) {
    globalEvents[type] = true;
    if (modern) {
        var mark = "__" + type;
        if (!document[mark]) {
            document[mark] = true;
            addEvent(document, type, blurFocus, true);
        }
    } else {
        eventHooks[type] = function (dom, name) {
            addEvent(dom, focusMap[name], blurFocus);
        };
    }
});
eventHooks.scroll = function (dom, name) {
    addEvent(dom, name, specialHandles[name]);
};
eventHooks.doubleclick = function (dom, name) {
    addEvent(document, "dblclick", specialHandles[name]);
};
function SyntheticEvent(event) {
    if (event.nativeEvent) {
        return event;
    }
    for (var i in event) {
        if (!eventProto[i]) {
            this[i] = event[i];
        }
    }
    if (!this.target) {
        this.target = event.srcElement;
    }
    this.fixEvent();
    this.timeStamp = new Date() - 0;
    this.nativeEvent = event;
}
var eventProto = SyntheticEvent.prototype = {
    fixEvent: noop,
    fixHooks: noop,
    persist: noop,
    preventDefault: function preventDefault() {
        var e = this.nativeEvent || {};
        e.returnValue = this.returnValue = false;
        if (e.preventDefault) {
            e.preventDefault();
        }
    },
    stopPropagation: function stopPropagation() {
        var e = this.nativeEvent || {};
        e.cancelBubble = this._stopPropagation = true;
        if (e.stopPropagation) {
            e.stopPropagation();
        }
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
        this.stopPropagation();
        this.stopImmediate = true;
    },
    toString: function toString() {
        return "[object Event]";
    }
};
Renderer.eventSystem = {
    eventPropHooks: eventPropHooks,
    addEvent: addEvent,
    dispatchEvent: dispatchEvent,
    SyntheticEvent: SyntheticEvent
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
var isSpecialAttr = {
    style: 1,
    autoFocus: 1,
    innerHTML: 1,
    dangerouslySetInnerHTML: 1
};
var svgCache = {};
var strategyCache = {};
var svgCamelCase = {
    w: { r: 1, b: 1, t: 1 },
    e: { n: 1, t: 1, f: 1, p: 1, c: 1, m: 1, a: 2, u: 1, s: 1, v: 1 },
    o: { r: 1 },
    c: { m: 1 },
    p: { p: 1 },
    t: { s: 2, t: 1, u: 1, c: 1, d: 1, o: 1, x: 1, y: 1, l: 1 },
    l: { r: 1, m: 1, u: 1, b: -1, l: -1, s: -1 },
    r: { r: 1, u: 2, h: 1, w: 1, c: 1, e: 1 },
    h: { r: 1, a: 1, l: 1, t: 1 },
    y: { p: 1, s: 1, t: 1, c: 1 },
    g: { c: 1 },
    k: { a: -1, h: -1, r: -1, s: -1, t: -1, c: 1, u: 1 },
    m: { o: 1, l: 1, a: 1 },
    n: { c: 1, t: 1, u: 1 },
    s: { a: 3 },
    f: { x: 1, y: 1 },
    d: { e: 1, f: 1, m: 1, d: 1 },
    x: { c: 1 }
};
var specialSVGPropertyName = {
    "overline-thickness": 2,
    "underline-thickness": 2,
    "overline-position": 2,
    "underline-position": 2,
    "stroke-miterlimit": 2,
    "baseline-shift": 2,
    "clip-path": 2,
    "font-size": 2,
    "font-size-adjust": 2,
    "font-stretch": 2,
    "font-style": 2,
    "text-decoration": 2,
    "vert-origin-x": 2,
    "vert-origin-y": 2,
    "paint-order": 2,
    "fill-rule": 2,
    "color-rendering": 2,
    "marker-end": 2,
    "pointer-events": 2,
    "units-per-em": 2,
    "strikethrough-thickness": 2,
    "lighting-color": 2
};
var repeatedKey = ["et", "ep", "em", "es", "pp", "ts", "td", "to", "lr", "rr", "re", "ht", "gc"];
function createRepaceFn(split) {
    return function (match) {
        return match.slice(0, 1) + split + match.slice(1).toLowerCase();
    };
}
var rhump = /[a-z][A-Z]/;
var toHyphen = createRepaceFn("-");
var toColon = createRepaceFn(":");
function getSVGAttributeName(name) {
    if (svgCache[name]) {
        return svgCache[name];
    }
    var key = name.match(rhump);
    if (!key) {
        return svgCache[name] = name;
    }
    var _ref = [].concat(_toConsumableArray(key[0].toLowerCase())),
        prefix = _ref[0],
        postfix = _ref[1];
    var orig = name;
    if (svgCamelCase[prefix] && svgCamelCase[prefix][postfix]) {
        var count = svgCamelCase[prefix][postfix];
        if (count === -1) {
            return svgCache[orig] = {
                name: name.replace(rhump, toColon),
                ifSpecial: true
            };
        }
        if (~repeatedKey.indexOf(prefix + postfix)) {
            var dashName = name.replace(rhump, toHyphen);
            if (specialSVGPropertyName[dashName]) {
                name = dashName;
            }
        }
    } else {
        name = name.replace(rhump, toHyphen);
    }
    return svgCache[orig] = name;
}
function diffProps(dom, lastProps, nextProps, fiber) {
    var isSVG = fiber.namespaceURI === NAMESPACE.svg;
    var tag = fiber.type;
    var continueProps = skipProps;
    if (!isSVG && rform.test(fiber.type)) {
        continueProps = duplexProps;
        if (!("onChange" in nextProps)) {
            eventAction(dom, "onChange", noop, lastProps, fiber);
        }
    }
    for (var name in nextProps) {
        if (continueProps[name]) {
            continue;
        }
        var val = nextProps[name];
        if (val !== lastProps[name]) {
            var which = tag + isSVG + name;
            var action = strategyCache[which];
            if (!action) {
                action = strategyCache[which] = getPropAction(dom, name, isSVG);
            }
            actionStrategy[action](dom, name, val, lastProps, fiber);
        }
    }
    for (var _name in lastProps) {
        if (continueProps[_name]) {
            continue;
        }
        if (!nextProps.hasOwnProperty(_name)) {
            var _which = tag + isSVG + _name;
            var _action = strategyCache[_which];
            if (!_action) {
                continue;
            }
            actionStrategy[_action](dom, _name, false, lastProps, fiber);
        }
    }
    continueProps.onDuplex(dom, fiber, nextProps, lastProps);
}
function isBooleanAttr(dom, name) {
    var val = dom[name];
    return val === true || val === false;
}
function isEventName(name) {
    return (/^on[A-Z]/.test(name)
    );
}
function getPropAction(dom, name, isSVG) {
    if (isSVG && name === "className") {
        return "svgClass";
    }
    if (isSpecialAttr[name]) {
        return name;
    }
    if (isEventName(name)) {
        return "event";
    }
    if (isSVG) {
        return "svgAttr";
    }
    if (name === "width" || name === "height") {
        return "attribute";
    }
    if (isBooleanAttr(dom, name)) {
        return "booleanAttr";
    }
    return name.indexOf("data-") === 0 || dom[name] === void 666 ? "attribute" : "property";
}
var builtinStringProps = {
    className: 1,
    title: 1,
    name: 1,
    type: 1,
    alt: 1,
    lang: 1
};
var skipProps = {
    innerHTML: 1,
    children: 1,
    onDuplex: noop
};
var duplexProps = {
    onDuplex: duplexAction,
    value: 1,
    defaultValue: 1,
    checked: 1,
    innerHTML: 1,
    children: 1
};
var actionStrategy = {
    style: function style(dom, _, val, lastProps) {
        patchStyle(dom, lastProps.style || emptyObject, val || emptyObject);
    },
    autoFocus: function autoFocus(dom) {
        if (duplexMap[dom.type] < 3 || dom.contentEditable === "true") {
            dom.focus();
        }
    },
    svgClass: function svgClass(dom, name, val) {
        if (!val) {
            dom.removeAttribute("class");
        } else {
            dom.setAttribute("class", val);
        }
    },
    svgAttr: function svgAttr(dom, name, val) {
        var method = typeNumber(val) < 3 && !val ? "removeAttribute" : "setAttribute";
        var nameRes = getSVGAttributeName(name);
        if (nameRes.ifSpecial) {
            var prefix = nameRes.name.split(":")[0];
            dom[method + "NS"](NAMESPACE[prefix], nameRes.name, val || "");
        } else {
            dom[method](nameRes, val || "");
        }
    },
    booleanAttr: function booleanAttr(dom, name, val) {
        dom[name] = !!val;
        if (dom[name] === false) {
            dom.removeAttribute(name);
        } else if (dom[name] === "false") {
            dom[name] = "";
        }
    },
    attribute: function attribute(dom, name, val) {
        if (val == null || val === false) {
            return dom.removeAttribute(name);
        }
        try {
            dom.setAttribute(name, val);
        } catch (e) {
            console.warn("setAttribute error", name, val);
        }
    },
    property: function property(dom, name, val) {
        try {
            if (!val && val !== 0) {
                if (builtinStringProps[name]) {
                    dom[name] = "";
                } else {
                    dom.removeAttribute(name);
                }
            } else {
                dom[name] = val;
            }
        } catch (e) {
            try {
                dom.setAttribute(name, val);
            } catch (e) {          }
        }
    },
    event: eventAction,
    dangerouslySetInnerHTML: function dangerouslySetInnerHTML(dom, name, val, lastProps) {
        var oldhtml = lastProps[name] && lastProps[name].__html;
        var html = val && val.__html;
        html = html == null ? "" : html;
        if (html !== oldhtml) {
            dom.innerHTML = html;
        }
    }
};

function UpdateQueue() {
    return {
        pendingStates: [],
        pendingCbs: []
    };
}
function createInstance(fiber, context) {
    var updater = {
        mountOrder: Renderer.mountOrder++,
        enqueueSetState: returnFalse,
        isMounted: isMounted
    };
    var props = fiber.props,
        type = fiber.type,
        tag = fiber.tag,
        ref = fiber.ref,
        isStateless = tag === 1,
        lastOwn = Renderer.currentOwner,
        instance = {
        refs: {},
        props: props,
        context: context,
        ref: ref,
        __proto__: type.prototype
    };
    fiber.errorHook = "constructor";
    try {
        if (isStateless) {
            extend(instance, {
                __isStateless: true,
                __init: true,
                renderImpl: type,
                render: function f() {
                    var a = this.__keep;
                    if (a) {
                        delete this.__keep;
                        return a.value;
                    }
                    a = this.renderImpl(this.props, this.context);
                    if (a && a.render) {
                        delete this.__isStateless;
                        for (var i in a) {
                            instance[i == "render" ? "renderImpl" : i] = a[i];
                        }
                    } else if (this.__init) {
                        this.__keep = {
                            value: a
                        };
                    }
                    return a;
                }
            });
            Renderer.currentOwner = instance;
            if (type.render) {
                instance.render = function () {
                    return type.render(this.props, this.ref);
                };
            } else {
                instance.render();
                delete instance.__init;
            }
        } else {
            instance = new type(props, context);
            if (!(instance instanceof Component)) {
                throw type.name + " doesn't extend React.Component";
            }
        }
    } finally {
        Renderer.currentOwner = lastOwn;
        fiber.stateNode = instance;
        fiber.updateQueue = UpdateQueue();
        instance._reactInternalFiber = fiber;
        instance.updater = updater;
        instance.context = context;
        updater.enqueueSetState = Renderer.updateComponent;
        if (type[gDSFP] || instance[gSBU]) {
            instance.__useNewHooks = true;
        }
    }
    return instance;
}

function Fiber(vnode) {
    extend(this, vnode);
    var type = vnode.type;
    this.name = type.displayName || type.name || type;
    this.effectTag = 1;
}

var NOWORK = 1;
var PLACE = 2;
var CONTENT = 3;
var ATTR = 5;
var NULLREF = 7;
var DETACH = 11;
var HOOK = 13;
var REF = 17;
var CALLBACK = 19;
var CAPTURE = 23;
var effectNames = [PLACE, CONTENT, ATTR, NULLREF, HOOK, REF, DETACH, CALLBACK, CAPTURE].sort(function (a, b) {
    return a - b;
});
var effectLength = effectNames.length;

function pushError(fiber, hook, error) {
    var names = [];
    var boundary = findCatchComponent(fiber, names);
    var stack = describeError(names, hook);
    if (boundary) {
        fiber.effectTag = NOWORK;
        if (fiber.hasMounted) {
        } else {
            fiber.stateNode = {
                updater: fakeObject
            };
        }
        var values = boundary.capturedValues || (boundary.capturedValues = []);
        values.push(error, {
            componentStack: stack
        });
    } else {
        var p = fiber.return;
        for (var i in p.children) {
            if (p.children[i] == fiber) {
                fiber.type = noop;
            }
        }
        while (p) {
            p._hydrating = false;
            p = p.return;
        }
        if (!Renderer.catchError) {
            Renderer.catchStack = stack;
            Renderer.catchError = error;
        }
    }
}
function guardCallback(host, hook, args) {
    try {
        return applyCallback(host, hook, args);
    } catch (error) {
        pushError(get(host), hook, error);
    }
}
function applyCallback(host, hook, args) {
    var fiber = host._reactInternalFiber;
    fiber.errorHook = hook;
    var fn = host[hook];
    if (hook == "componentWillUnmount") {
        host[hook] = noop;
    }
    if (fn) {
        return fn.apply(host, args);
    }
    return true;
}
function describeError(names, hook) {
    var segments = ["**" + hook + "** method occur error "];
    names.forEach(function (name, i) {
        if (names[i + 1]) {
            segments.push("in " + name + " (created By " + names[i + 1] + ")");
        }
    });
    return segments.join("\n\r").trim();
}
function findCatchComponent(fiber, names) {
    var instance = void 0,
        name = void 0,
        topFiber = fiber,
        retry = void 0,
        boundary = void 0;
    while (fiber) {
        name = fiber.name;
        if (fiber.tag < 4) {
            names.push(name);
            instance = fiber.stateNode || {};
            if (instance.componentDidCatch && !boundary) {
                if (!fiber.hasCatch && topFiber !== fiber) {
                    boundary = fiber;
                } else if (fiber.hasCatch) {
                    retry = Object.assign({}, fiber);
                    retry.effectTag = DETACH;
                    retry.disposed = true;
                }
            }
        } else if (fiber.tag === 5) {
            names.push(name);
        }
        fiber = fiber.return;
        if (boundary) {
            var boundaries = Renderer.boundaries;
            boundary.hasError = true;
            boundary.effectTag *= CAPTURE;
            boundaries.unshift(boundary);
            if (retry && retry !== boundary) {
                var arr = boundary.effects || (boundary.effects = []);
                arr.push(retry);
            }
            return boundary;
        }
    }
}
function removeFormBoundaries(fiber) {
    delete fiber.hasError;
    var arr = Renderer.boundaries;
    var index = arr.indexOf(fiber);
    if (index !== -1) {
        arr.splice(index, 1);
    }
}
function detachFiber(fiber, effects$$1) {
    fiber.effectTag = DETACH;
    effects$$1.push(fiber);
    if (fiber.ref && fiber.hasMounted) {
        fiber.effectTag *= NULLREF;
    }
    fiber.disposed = true;
    for (var child = fiber.child; child; child = child.sibling) {
        detachFiber(child, effects$$1);
    }
}

function getInsertPoint(fiber) {
    var parent = fiber.parent;
    while (fiber) {
        if (fiber.stateNode === parent || fiber.isPortal) {
            return null;
        }
        var found = forward(fiber);
        if (found) {
            return found;
        }
        fiber = fiber.return;
    }
}
function setInsertPoints(children) {
    for (var i in children) {
        var child = children[i];
        if (child.disposed) {
            continue;
        }
        if (child.tag > 4) {
            var p = child.parent;
            child.forwardFiber = p.insertPoint;
            p.insertPoint = child;
        } else {
            if (child.child) {
                setInsertPoints(child.children);
            }
        }
    }
}
function forward(fiber) {
    var found;
    while (fiber.forward) {
        fiber = fiber.forward;
        if (fiber.disposed || fiber.isPortal) {
            continue;
        }
        if (fiber.tag > 3) {
            return fiber;
        }
        if (fiber.child) {
            found = downward(fiber);
            if (found) {
                return found;
            }
        }
    }
}
function downward(fiber) {
    var found;
    while (fiber.lastChild) {
        fiber = fiber.lastChild;
        if (fiber.disposed || fiber.isPortal) {
            return;
        }
        if (fiber.tag > 3) {
            return fiber;
        }
        if (fiber.forward) {
            found = forward(fiber);
            if (found) {
                return found;
            }
        }
    }
}

function updateEffects(fiber, topWork, info) {
    if (fiber.tag < 3) {
        var keepbook = Renderer.currentOwner;
        try {
            updateClassComponent(fiber, info);
        } catch (e) {
            pushError(fiber, fiber.errorHook, e);
        }
        Renderer.currentOwner = keepbook;
        if (fiber.batching) {
            delete fiber.updateFail;
            delete fiber.batching;
        }
    } else {
        updateHostComponent(fiber, info);
    }
    if (fiber.child && !fiber.updateFail) {
        return fiber.child;
    }
    var f = fiber;
    while (f) {
        var instance = f.stateNode;
        var updater = instance && instance.updater;
        if (f.shiftContainer) {
            delete f.shiftContainer;
            info.containerStack.shift();
        } else if (updater) {
            if (f.shiftContext) {
                delete f.shiftContext;
                info.contextStack.shift();
            }
            if (f.hasMounted && instance[gSBU]) {
                updater.snapshot = guardCallback(instance, gSBU, [updater.prevProps, updater.prevState]);
            }
        }
        if (instance.insertPoint) {
            instance.insertPoint = null;
        }
        if (f === topWork) {
            break;
        }
        if (f.sibling) {
            return f.sibling;
        }
        f = f.return;
    }
}
function updateHostComponent(fiber, info) {
    var props = fiber.props,
        tag = fiber.tag,
        prev = fiber.alternate;
    if (!fiber.stateNode) {
        fiber.parent = info.containerStack[0];
        fiber.stateNode = Renderer.createElement(fiber);
    }
    var children = props && props.children;
    var parent = fiber.parent;
    if (!parent.insertPoint && fiber.hasMounted) {
        fiber.forwardFiber = parent.insertPoint = getInsertPoint(fiber);
    } else {
        fiber.forwardFiber = parent.insertPoint;
    }
    parent.insertPoint = fiber;
    if (tag === 5) {
        info.containerStack.unshift(fiber.stateNode);
        fiber.shiftContainer = true;
        fiber.effectTag *= ATTR;
        if (prev) {
            fiber.children = prev.children;
        }
        diffChildren(fiber, children);
    } else {
        if (!prev || prev.props.children !== children) {
            fiber.effectTag *= CONTENT;
        }
    }
}
function mergeStates(fiber, nextProps) {
    var instance = fiber.stateNode,
        pendings = fiber.updateQueue.pendingStates,
        n = pendings.length,
        state = fiber.memoizedState || instance.state;
    if (n === 0) {
        return state;
    }
    var nextState = extend({}, state);
    var fail = true;
    for (var i = 0; i < n; i++) {
        var pending = pendings[i];
        if (pending) {
            if (isFn(pending)) {
                var a = pending.call(instance, nextState, nextProps);
                if (!a) {
                    continue;
                } else {
                    pending = a;
                }
            }
            fail = false;
            extend(nextState, pending);
        }
    }
    if (fail) {
        return state;
    } else {
        return fiber.memoizedState = nextState;
    }
}
function updateClassComponent(fiber, info) {
    var type = fiber.type,
        instance = fiber.stateNode,
        props = fiber.props;
    var contextStack = info.contextStack,
        containerStack = info.containerStack;
    if (fiber.dirty && instance && instance.unmaskedContext && contextStack[0] !== instance.unmaskedContext) {
        contextStack.unshift(instance.unmaskedContext);
    }
    var newContext = getMaskedContext(instance, type.contextTypes, contextStack);
    if (instance == null) {
        if (type === AnuPortal) {
            fiber.parent = props.parent;
        } else {
            fiber.parent = containerStack[0];
        }
        instance = createInstance(fiber, newContext);
    }
    if (fiber.hasMounted && fiber.dirty && fiber.parent) {
        fiber.parent.insertPoint = null;
    }
    instance._reactInternalFiber = fiber;
    if (type === AnuPortal) {
        containerStack.unshift(fiber.parent);
        fiber.shiftContainer = true;
    }
    var updateQueue = fiber.updateQueue;
    if (!instance.__isStateless) {
        delete fiber.updateFail;
        if (fiber.hasMounted) {
            applybeforeUpdateHooks(fiber, instance, props, newContext, contextStack);
        } else {
            applybeforeMountHooks(fiber, instance, props, newContext, contextStack);
        }
        if (fiber.memoizedState) {
            instance.state = fiber.memoizedState;
        }
    }
    instance.unmaskedContext = contextStack[0];
    fiber.batching = updateQueue.batching;
    var cbs = updateQueue.pendingCbs;
    if (cbs.length) {
        fiber.pendingCbs = cbs;
        fiber.effectTag *= CALLBACK;
    }
    instance.context = newContext;
    fiber.memoizedProps = instance.props = props;
    fiber.memoizedState = instance.state;
    if (instance.getChildContext) {
        var context = instance.getChildContext();
        context = Object.assign({}, contextStack[0], context);
        fiber.shiftContext = true;
        contextStack.unshift(context);
    }
    if (fiber.updateFail) {
        cloneChildren(fiber);
        fiber._hydrating = false;
        return;
    }
    fiber.effectTag *= HOOK;
    if (fiber.hasError) {
        return;
    }
    fiber._hydrating = true;
    Renderer.currentOwner = instance;
    var rendered = applyCallback(instance, "render", []);
    if (fiber.hasError) {
        return;
    }
    diffChildren(fiber, rendered);
}
function applybeforeMountHooks(fiber, instance, newProps) {
    fiber.setout = true;
    if (instance.__useNewHooks) {
        setStateByProps(instance, fiber, newProps, instance.state);
    } else {
        callUnsafeHook(instance, "componentWillMount", []);
    }
    delete fiber.setout;
    mergeStates(fiber, newProps);
    fiber.updateQueue = UpdateQueue();
}
function applybeforeUpdateHooks(fiber, instance, newProps, newContext, contextStack) {
    var oldProps = fiber.memoizedProps;
    var oldState = fiber.memoizedState;
    var updater = instance.updater;
    updater.prevProps = oldProps;
    updater.prevState = oldState;
    var propsChanged = oldProps !== newProps;
    var contextChanged = instance.context !== newContext;
    fiber.setout = true;
    if (!instance.__useNewHooks) {
        if (propsChanged || contextChanged) {
            var prevState = instance.state;
            callUnsafeHook(instance, "componentWillReceiveProps", [newProps, newContext]);
            if (prevState !== instance.state) {
                fiber.memoizedState = instance.state;
            }
        }
    }
    var newState = instance.state = oldState;
    var updateQueue = fiber.updateQueue;
    mergeStates(fiber, newProps);
    newState = fiber.memoizedState;
    setStateByProps(instance, fiber, newProps, newState);
    newState = fiber.memoizedState;
    delete fiber.setout;
    fiber._hydrating = true;
    if (!propsChanged && newState === oldState && contextStack.length == 1 && !updateQueue.isForced) {
        fiber.updateFail = true;
    } else {
        var args = [newProps, newState, newContext];
        fiber.updateQueue = UpdateQueue();
        if (!updateQueue.isForced && !applyCallback(instance, "shouldComponentUpdate", args)) {
            fiber.updateFail = true;
        } else if (!instance.__useNewHooks) {
            callUnsafeHook(instance, "componentWillUpdate", args);
        }
    }
}
function callUnsafeHook(a, b, c) {
    applyCallback(a, b, c);
    applyCallback(a, "UNSAFE_" + b, c);
}
function isSameNode(a, b) {
    if (a.type === b.type && a.key === b.key) {
        return true;
    }
}
function setStateByProps(instance, fiber, nextProps, prevState) {
    fiber.errorHook = gDSFP;
    var fn = fiber.type[gDSFP];
    if (fn) {
        var partialState = fn.call(null, nextProps, prevState);
        if (typeNumber(partialState) === 8) {
            fiber.memoizedState = Object.assign({}, prevState, partialState);
        }
    }
}
function cloneChildren(fiber) {
    var prev = fiber.alternate;
    if (prev && prev.child) {
        var pc = prev.children;
        var cc = fiber.children = {};
        fiber.child = prev.child;
        fiber.lastChild = prev.lastChild;
        for (var i in pc) {
            var a = pc[i];
            a.return = fiber;
            cc[i] = a;
        }
        setInsertPoints(cc);
    }
}
function getMaskedContext(instance, contextTypes, contextStack) {
    if (instance && !contextTypes) {
        return instance.context;
    }
    var context = {};
    if (!contextTypes) {
        return context;
    }
    var parentContext = contextStack[0];
    for (var key in contextTypes) {
        if (contextTypes.hasOwnProperty(key)) {
            context[key] = parentContext[key];
        }
    }
    return context;
}
function diffChildren(parentFiber, children) {
    var oldFibers = parentFiber.children;
    if (oldFibers) {
        parentFiber.oldChildren = oldFibers;
    } else {
        oldFibers = {};
    }
    var newFibers = fiberizeChildren(children, parentFiber);
    var effects$$1 = parentFiber.effects || (parentFiber.effects = []);
    var matchFibers = {};
    delete parentFiber.child;
    for (var i in oldFibers) {
        var newFiber = newFibers[i];
        var oldFiber = oldFibers[i];
        if (newFiber && newFiber.type === oldFiber.type) {
            matchFibers[i] = oldFiber;
            if (newFiber.key != null) {
                oldFiber.key = newFiber.key;
            }
            continue;
        }
        detachFiber(oldFiber, effects$$1);
    }
    var prevFiber = void 0,
        index = 0;
    for (var _i in newFibers) {
        var _newFiber = newFibers[_i];
        var _oldFiber = matchFibers[_i];
        var alternate = null;
        if (_oldFiber) {
            if (isSameNode(_oldFiber, _newFiber)) {
                alternate = new Fiber(_oldFiber);
                var oldRef = _oldFiber.ref;
                _newFiber = extend(_oldFiber, _newFiber);
                _newFiber.alternate = alternate;
                if (oldRef && oldRef !== _newFiber.ref) {
                    alternate.effectTag *= NULLREF;
                    effects$$1.push(alternate);
                }
                if (_newFiber.tag === 5) {
                    _newFiber.lastProps = alternate.props;
                }
            } else {
                detachFiber(_oldFiber, effects$$1);
            }
            _newFiber.effectTag = NOWORK;
        } else {
            _newFiber = new Fiber(_newFiber);
        }
        newFibers[_i] = _newFiber;
        if (_newFiber.tag > 3) {
            _newFiber.effectTag *= PLACE;
        }
        if (_newFiber.ref) {
            _newFiber.effectTag *= REF;
        }
        _newFiber.index = index++;
        _newFiber.return = parentFiber;
        if (prevFiber) {
            prevFiber.sibling = _newFiber;
            _newFiber.forward = prevFiber;
        } else {
            parentFiber.child = _newFiber;
            _newFiber.forward = null;
        }
        prevFiber = _newFiber;
    }
    parentFiber.lastChild = prevFiber;
    if (prevFiber) {
        prevFiber.sibling = null;
    }
}
Renderer.diffChildren = diffChildren;

function getDOMNode() {
    return this;
}
var Refs = {
    fireRef: function fireRef(fiber, dom) {
        var ref = fiber.ref;
        var owner = fiber._owner;
        try {
            var number = typeNumber(ref);
            refStrategy[number](owner, ref, dom);
        } catch (e) {
            pushError(fiber, "ref", e);
        }
    }
};
var refStrategy = {
    4: function _(owner, ref, dom) {
        if (dom === null) {
            delete owner.refs[ref];
        } else {
            if (dom.nodeType) {
                dom.getDOMNode = getDOMNode;
            }
            owner.refs[ref] = dom;
        }
    },
    5: function _(owner, ref, dom) {
        ref(dom);
    },
    8: function _(owner, ref, dom) {
        ref.current = dom;
    }
};

function collectWork(fiber, updateFail, isTop) {
    if (!fiber) {
        return [];
    }
    if (fiber.hasError) {
        removeFormBoundaries(fiber);
        disposeFibers(fiber);
        return [];
    }
    var effects$$1 = fiber.effects;
    if (effects$$1) {
        fiber.effects.forEach(disposeFiber);
        fiber.effects.length = 0;
        delete fiber.effects;
    } else {
        effects$$1 = [];
    }
    var c = fiber.children || {};
    for (var i in c) {
        var child = c[i];
        var isHost = child.tag > 3;
        if (updateFail || child.updateFail) {
            if (isHost) {
                if (!child.disposed) {
                    child.effectTag *= PLACE;
                    effects$$1.push(child);
                }
            } else {
                delete child.updateFail;
                arrayPush.apply(effects$$1, collectWork(child, true));
            }
        } else {
            arrayPush.apply(effects$$1, collectWork(child));
        }
        if (child.effectTag) {
            effects$$1.push(child);
        }
    }
    return effects$$1;
}
function disposeFibers(fiber) {
    var effects$$1 = fiber.effects;
    if (effects$$1) {
        effects$$1.forEach(disposeFiber);
        delete fiber.effects;
    }
    var c = fiber.oldChildren || emptyObject;
    for (var i in c) {
        var child = c[i];
        if (child.disposed) {
            continue;
        }
        disposeFibers(child);
        disposeFiber(child, true);
    }
    delete fiber.child;
    delete fiber.lastChild;
    delete fiber.oldChildren;
    fiber.children = {};
}
function disposeFiber(fiber, force) {
    var stateNode = fiber.stateNode,
        effectTag = fiber.effectTag;
    if (!stateNode.__isStateless && fiber.ref) {
        Refs.fireRef(fiber, null);
    }
    if (effectTag % DETACH == 0 || force === true) {
        if (fiber.tag > 3) {
            Renderer.removeElement(fiber);
        } else {
            if (fiber.hasMounted) {
                stateNode.updater.enqueueSetState = returnFalse;
                guardCallback(stateNode, "componentWillUnmount", []);
            }
        }
        delete fiber.alternate;
        delete fiber.hasMounted;
        delete fiber.stateNode;
        fiber.disposed = true;
    }
    fiber.effectTag = NOWORK;
}

function commitWork() {
    Renderer.batchedUpdates(function () {
        commitPlaceEffects(effects);
        var tasks = effects,
            task;
        while (task = tasks.shift()) {
            commitOtherEffects(task, tasks);
        }
    }, {});
    var error = Renderer.catchError;
    if (error) {
        delete Renderer.catchError;
        throw error;
    }
}
function commitPlaceEffects(tasks) {
    var ret = [];
    for (var i = 0, n = tasks.length; i < n; i++) {
        var fiber = tasks[i];
        var amount = fiber.effectTag;
        var remainder = amount / PLACE;
        var hasEffect = amount > 1;
        if (hasEffect && remainder == ~~remainder) {
            fiber.parent.insertPoint = null;
            Renderer.insertElement(fiber);
            fiber.hasMounted = true;
            fiber.effectTag = remainder;
            hasEffect = remainder > 1;
        }
        if (hasEffect) {
            ret.push(fiber);
        }
    }
    tasks.length = 0;
    arrayPush.apply(tasks, ret);
    return ret;
}
function commitOtherEffects(fiber, tasks) {
    var instance = fiber.stateNode || emptyObject;
    var amount = fiber.effectTag;
    var updater = instance.updater || fakeObject;
    for (var i = 0; i < effectLength; i++) {
        var effectNo = effectNames[i];
        if (effectNo > amount) {
            break;
        }
        if (amount % effectNo === 0) {
            amount /= effectNo;
            switch (effectNo) {
                case CONTENT:
                    Renderer.updateContext(fiber);
                    break;
                case ATTR:
                    Renderer.updateAttribute(fiber);
                    break;
                case NULLREF:
                    if (!instance.__isStateless) {
                        Refs.fireRef(fiber, null);
                    }
                    break;
                case DETACH:
                    if (fiber.tag > 3) {
                        Renderer.removeElement(fiber);
                    } else {
                        if (fiber.hasMounted) {
                            updater.enqueueSetState = returnFalse;
                            guardCallback(instance, "componentWillUnmount", []);
                        }
                    }
                    delete fiber.hasMounted;
                    delete fiber.stateNode;
                    delete fiber.alternate;
                    break;
                case HOOK:
                    if (fiber.hasMounted) {
                        guardCallback(instance, "componentDidUpdate", [updater.prevProps, updater.prevState, updater.snapshot]);
                    } else {
                        fiber.hasMounted = true;
                        guardCallback(instance, "componentDidMount", []);
                    }
                    delete fiber._hydrating;
                    if (fiber.hasError) {
                        removeFormBoundaries(fiber);
                        Renderer.diffChildren(fiber, []);
                        tasks.push.apply(tasks, fiber.effects);
                        delete fiber.effects;
                        var n = Object.assign({}, fiber);
                        fiber.effectTag = 1;
                        n.effectTag = amount;
                        tasks.push(n);
                        return;
                    }
                    break;
                case REF:
                    if (!instance.__isStateless) {
                        Refs.fireRef(fiber, instance);
                    }
                    break;
                case CALLBACK:
                    var queue = fiber.pendingCbs;
                    fiber._hydrating = true;
                    queue.forEach(function (fn) {
                        fn.call(instance);
                    });
                    delete fiber._hydrating;
                    delete fiber.pendingCbs;
                    break;
                case CAPTURE:
                    var values = fiber.capturedValues;
                    fiber.effectTag = amount;
                    fiber.hasCatch = true;
                    var a = values.shift();
                    var b = values.shift();
                    if (!values.length) {
                        delete fiber.capturedValues;
                    }
                    instance.componentDidCatch(a, b);
                    break;
            }
        }
    }
    fiber.effectTag = 1;
}

function Unbatch(props, context) {
    Component.call(this, props, context);
    this.state = {
        child: props.child
    };
}
var fn$2 = inherit(Unbatch, Component);
fn$2.render = function () {
    return this.state.child;
};

var macrotasks = Renderer.macrotasks;
var batchedtasks = [];
function render$1(vnode, root, callback) {
    var container = createContainer(root),
        immediateUpdate = false;
    if (!container.hostRoot) {
        var fiber = new Fiber({
            type: Unbatch,
            tag: 2,
            props: {},
            hasMounted: true,
            memoizedState: {},
            return: container
        });
        fiber.index = 0;
        container.child = fiber;
        var instance = createInstance(fiber, {});
        instance.updater.isMounted = isMounted;
        container.hostRoot = instance;
        immediateUpdate = true;
        Renderer.emptyElement(container);
    }
    var carrier = {};
    updateComponent(container.hostRoot, {
        child: vnode
    }, wrapCb(callback, carrier), immediateUpdate);
    return carrier.instance;
}
function wrapCb(fn, carrier) {
    return function () {
        var fiber = get(this);
        var target = fiber.child ? fiber.child.stateNode : null;
        fn && fn.call(target);
        carrier.instance = target;
    };
}
function performWork(deadline) {
    workLoop(deadline);
    var boundaries = Renderer.boundaries;
    if (boundaries.length) {
        var elem = boundaries.pop();
        macrotasks.push(elem);
    }
    topFibers.forEach(function (el) {
        var microtasks = el.microtasks;
        while (el = microtasks.shift()) {
            if (!el.disposed) {
                macrotasks.push(el);
            }
        }
    });
    if (macrotasks.length) {
        requestIdleCallback(performWork);
    }
}
var ricObj = {
    timeRemaining: function timeRemaining() {
        return 2;
    }
};
var ENOUGH_TIME = 1;
function requestIdleCallback(fn) {
    fn(ricObj);
}
Renderer.scheduleWork = function () {
    performWork(ricObj);
};
var isBatching = false;
Renderer.batchedUpdates = function (callback, event) {
    var keepbook = isBatching;
    isBatching = true;
    try {
        event && Renderer.fireMiddlewares(true);
        return callback(event);
    } finally {
        isBatching = keepbook;
        if (!isBatching) {
            var el = void 0;
            while (el = batchedtasks.shift()) {
                if (!el.disabled) {
                    macrotasks.push(el);
                }
            }
            event && Renderer.fireMiddlewares();
            Renderer.scheduleWork();
        }
    }
};
function workLoop(deadline) {
    var topWork = getNextUnitOfWork();
    if (topWork) {
        var fiber = topWork,
            info = void 0;
        if (topWork.type === Unbatch) {
            info = topWork.return;
        } else {
            var dom = getContainer(fiber);
            info = {
                containerStack: [dom],
                contextStack: [fiber.stateNode.unmaskedContext]
            };
        }
        while (fiber && !fiber.disposed && deadline.timeRemaining() > ENOUGH_TIME) {
            fiber = updateEffects(fiber, topWork, info);
        }
        arrayPush.apply(effects, collectWork(topWork, null, true));
        effects.push(topWork);
        if (macrotasks.length && deadline.timeRemaining() > ENOUGH_TIME) {
            workLoop(deadline);
        } else {
            resetStack(info);
            commitWork();
        }
    }
}
function getNextUnitOfWork(fiber) {
    fiber = macrotasks.shift();
    if (!fiber || fiber.merged) {
        return;
    }
    return fiber;
}
function mergeUpdates(fiber, state, isForced, callback) {
    var updateQueue = fiber.updateQueue;
    if (isForced) {
        updateQueue.isForced = true;
    }
    if (state) {
        updateQueue.pendingStates.push(state);
    }
    if (isFn(callback)) {
        updateQueue.pendingCbs.push(callback);
    }
}
function fiberContains(p, son) {
    while (son.return) {
        if (son.return === p) {
            return true;
        }
        son = son.return;
    }
}
function getQueue(fiber) {
    while (fiber) {
        if (fiber.microtasks) {
            return fiber.microtasks;
        }
        fiber = fiber.return;
    }
}
function pushChildQueue(fiber, queue) {
    var maps = {};
    for (var i = queue.length, el; el = queue[--i];) {
        if (fiber === el) {
            queue.splice(i, 1);
            continue;
        } else if (fiberContains(fiber, el)) {
            queue.splice(i, 1);
            continue;
        }
        maps[el.stateNode.updater.mountOrder] = true;
    }
    var enqueue = true,
        p = fiber,
        hackSCU = [];
    while (p.return) {
        p = p.return;
        var instance = p.stateNode;
        if (instance.refs && !instance.__isStateless && p.type !== Unbatch) {
            hackSCU.push(p);
            var u = instance.updater;
            if (maps[u.mountOrder]) {
                enqueue = false;
                break;
            }
        }
    }
    hackSCU.forEach(function (el) {
        el.updateQueue.batching = true;
    });
    if (enqueue) {
        queue.push(fiber);
    }
}
function updateComponent(instance, state, callback, immediateUpdate) {
    var fiber = get(instance);
    fiber.dirty = true;
    var sn = typeNumber(state);
    var isForced = state === true;
    var microtasks = getQueue(fiber);
    state = isForced ? null : sn === 5 || sn === 8 ? state : null;
    if (fiber.setout) {
        immediateUpdate = false;
    } else if (isBatching && !immediateUpdate || fiber._hydrating) {
        pushChildQueue(fiber, batchedtasks);
    } else {
        immediateUpdate = immediateUpdate || !fiber._hydrating;
        pushChildQueue(fiber, microtasks);
    }
    mergeUpdates(fiber, state, isForced, callback);
    if (immediateUpdate) {
        Renderer.scheduleWork();
    }
}
Renderer.updateComponent = updateComponent;
function validateTag(el) {
    return el && el.appendChild;
}
function createContainer(root, onlyGet, validate) {
    validate = validate || validateTag;
    if (!validate(root)) {
        throw "container is not a element";
    }
    root.anuProp = 2018;
    var useProp = root.anuProp === 2018;
    if (useProp) {
        root.anuProp = void 0;
        if (get(root)) {
            return get(root);
        }
    } else {
        var index = topNodes.indexOf(root);
        if (index !== -1) {
            return topFibers[index];
        }
    }
    if (onlyGet) {
        return null;
    }
    var container = new Fiber({
        stateNode: root,
        tag: 5,
        name: "hostRoot",
        contextStack: [{}],
        containerStack: [root],
        microtasks: [],
        type: root.nodeName || root.type
    });
    if (useProp) {
        root._reactInternalFiber = container;
    }
    topNodes.push(root);
    topFibers.push(container);
    return container;
}
function getContainer(p) {
    if (p.parent) {
        return p.parent;
    }
    while (p = p.return) {
        if (p.tag === 5) {
            return p.stateNode;
        }
    }
}

function createElement$1(vnode) {
    var p = vnode.return;
    var type = vnode.type,
        props = vnode.props,
        ns = vnode.ns;
    var text = props ? props.children : "";
    switch (type) {
        case "#text":
            var node = recyclables[type].pop();
            if (node) {
                node.nodeValue = text;
                return node;
            }
            return document.createTextNode(text);
        case "#comment":
            return document.createComment(text);
        case "svg":
            ns = NAMESPACE.svg;
            break;
        case "math":
            ns = NAMESPACE.math;
            break;
        default:
            do {
                var s = p.name == "AnuPortal" ? p.props.parent : p.tag === 5 ? p.stateNode : null;
                if (s) {
                    ns = s.namespaceURI;
                    if (p.type === "foreignObject" || ns === NAMESPACE.xhtml) {
                        ns = "";
                    }
                    break;
                }
            } while (p = p.return);
            break;
    }
    try {
        if (ns) {
            vnode.namespaceURI = ns;
            return document.createElementNS(ns, type);
        }
    } catch (e) {}
    var elem = document.createElement(type);
    var inputType = props && props.type;
    if (inputType) {
        try {
            elem = document.createElement("<" + type + " type='" + inputType + "'/>");
        } catch (err) {
        }
    }
    return elem;
}
var fragment = document.createDocumentFragment();
function _emptyElement(node) {
    var children = node.childNodes;
    for (var i = 0, child; child = children[i++];) {
        node.removeChild(child);
    }
}
var recyclables = {
    "#text": []
};
Renderer.middleware({
    begin: noop,
    end: fireDuplex
});
function _removeElement(node) {
    if (!node) {
        return;
    }
    if (node.nodeType === 1) {
        _emptyElement(node);
        if (node._reactInternalFiber) {
            var i = topFibers.indexOf(node._reactInternalFiber);
            if (i !== -1) {
                topFibers.splice(i, -1);
                topNodes.splice(i, -1);
            }
        }
        node.__events = null;
    } else if (node.nodeType === 3) {
        if (recyclables["#text"].length < 100) {
            recyclables["#text"].push(node);
        }
    }
    fragment.appendChild(node);
    fragment.removeChild(node);
}
function insertElement(fiber) {
    var dom = fiber.stateNode,
        parent = fiber.parent;
    try {
        var insertPoint = fiber.forwardFiber ? fiber.forwardFiber.stateNode : null;
        var after = insertPoint ? insertPoint.nextSibling : parent.firstChild;
        if (after == dom) {
            return;
        }
        if (after === null && dom === parent.lastChild) {
            return;
        }
        Renderer.inserting = fiber.tag === 5 && document.activeElement;
        parent.insertBefore(dom, after);
        Renderer.inserting = null;
    } catch (e) {
        throw e;
    }
}
render$1.Render = Renderer;
var DOMRenderer = createRenderer({
    render: render$1,
    updateAttribute: function updateAttribute(fiber) {
        var props = fiber.props,
            lastProps = fiber.lastProps,
            stateNode = fiber.stateNode;
        diffProps(stateNode, lastProps || emptyObject, props, fiber);
    },
    updateContext: function updateContext(fiber) {
        fiber.stateNode.nodeValue = fiber.props.children;
    },
    createElement: createElement$1,
    insertElement: insertElement,
    emptyElement: function emptyElement(fiber) {
        fiber.stateNode.innerHTML = "";
        _emptyElement(fiber.stateNode);
    },
    unstable_renderSubtreeIntoContainer: function unstable_renderSubtreeIntoContainer(instance, vnode, root, callback) {
        var container = createContainer(root),
            context = container.contextStack[0],
            fiber = get(instance),
            childContext = void 0;
        while (fiber.return) {
            var inst = fiber.stateNode;
            if (inst && inst.getChildContext) {
                childContext = inst.getChildContext();
                extend(context, childContext);
                break;
            }
            fiber = fiber.return;
        }
        if (!childContext && fiber.contextStack) {
            extend(context, fiber.contextStack[0]);
        }
        return Renderer.render(vnode, root, callback);
    },
    unmountComponentAtNode: function unmountComponentAtNode(root) {
        var container = createContainer(root, true);
        var instance = container && container.hostRoot;
        if (instance) {
            Renderer.updateComponent(instance, {
                child: null
            }, function () {
                var i = topNodes.indexOf(root);
                if (i !== -1) {
                    topNodes.splice(i, 1);
                    topFibers.splice(i, 1);
                }
                root._reactInternalFiber = null;
            }, true);
            return true;
        }
        return false;
    },
    removeElement: function removeElement(fiber) {
        var instance = fiber.stateNode;
        if (instance) {
            _removeElement(instance);
            if (instance._reactInternalFiber) {
                var j = topNodes.indexOf(instance);
                if (j !== -1) {
                    topFibers.splice(j, 1);
                    topNodes.splice(j, 1);
                }
            }
        }
    }
});

var win = getWindow();
var prevReact = win.React;
var React = void 0;
if (prevReact && prevReact.eventSystem) {
    React = prevReact;
} else {
    var render = DOMRenderer.render,
        eventSystem = DOMRenderer.eventSystem,
        unstable_renderSubtreeIntoContainer = DOMRenderer.unstable_renderSubtreeIntoContainer,
        unmountComponentAtNode = DOMRenderer.unmountComponentAtNode;
    React = win.React = win.ReactDOM = {
        eventSystem: eventSystem,
        findDOMNode: findDOMNode,
        unmountComponentAtNode: unmountComponentAtNode,
        unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
        version: "1.4.0",
        render: render,
        hydrate: render,
        unstable_batchedUpdates: DOMRenderer.batchedUpdates,
        Fragment: Fragment,
        PropTypes: PropTypes,
        Children: Children,
        createPortal: createPortal,
        createContext: createContext,
        Component: Component,
        createRef: createRef,
        forwardRef: forwardRef,
        createElement: createElement,
        cloneElement: cloneElement,
        PureComponent: PureComponent,
        isValidElement: isValidElement,
        createFactory: createFactory
    };
}
var React$1 = React;

return React$1;

})));
