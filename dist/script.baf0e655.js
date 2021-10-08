// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"items.json":[function(require,module,exports) {
module.exports = [{
  "id": 1,
  "name": "Ramen 1",
  "category": "🌶️",
  "priceCents": 2800,
  "imageRamen": "ramen1.png?raw=true"
}, {
  "id": 2,
  "name": "Ramen 2",
  "category": "🌶️🌶️",
  "priceCents": 2500,
  "imageRamen": "ramen2.png?raw=true"
}, {
  "id": 3,
  "name": "Ramen 3",
  "category": "🌶️🌶️🌶️",
  "priceCents": 3500,
  "imageRamen": "ramen3.png?raw=true"
}, {
  "id": 4,
  "name": "Ramen 4",
  "category": "🔥",
  "priceCents": 3500,
  "imageRamen": "ramen4.png?raw=true"
}, {
  "id": 5,
  "name": "Ramen 5",
  "category": "",
  "priceCents": 2200,
  "imageRamen": "ramen5.png?raw=true"
}, {
  "id": 6,
  "name": "Ramen 6",
  "category": "",
  "priceCents": 2000,
  "imageRamen": "ramen6.png?raw=true"
}, {
  "id": 7,
  "name": "Ramen 7",
  "category": "",
  "priceCents": 1500,
  "imageRamen": "ramen7.png?raw=true"
}, {
  "id": 8,
  "name": "Ramen 8",
  "category": "",
  "priceCents": 1200,
  "imageRamen": "ramen8.png?raw=true"
}];
},{}],"util/formatCurrency.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatCurrency;
var currencyFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "EUR"
});

function formatCurrency(amount) {
  return currencyFormatter.format(amount);
}
},{}],"util/addGlobalEventListener.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addGlobalEventListener;

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, function (e) {
    if (e.target.matches(selector)) {
      callback(e);
    }
  });
}

;
},{}],"src/shoppingCart.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToShoppingCart = addToShoppingCart;
exports.setupShoppingCart = setupShoppingCart;

var _items = _interopRequireDefault(require("../items.json"));

var _formatCurrency = _interopRequireDefault(require("../util/formatCurrency.js"));

var _addGlobalEventListener = _interopRequireDefault(require("../util/addGlobalEventListener.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shoppingCartBtn = document.querySelector("[data-shoppingCart-button]");
var shoppingCartItemsWrapper = document.querySelector("[data-shoppingCart-items-wrapper]");
var shoppingCart = [];
var imageUrl = "https://github.com/e-d-i/shoppingCart/blob/main/src/img";
var shoppingCartItemTemplate = document.querySelector("#shoppingCart-item-template");
var shoppingCartItemContainer = document.querySelector("[data-shoppingCart-item-container]");
var shoppingCartQuantity = document.querySelector("[data-shoppingCart-quantity]");
var shoppingCartTotal = document.querySelector("[data-shoppingCart-total]");
var cart = document.querySelector("[data-cart]");
var sessionStorageKey = "Shopping_Cart-cart";

function setupShoppingCart() {
  (0, _addGlobalEventListener.default)("click", "[data-remove-from-shoppingCart-button]", function (e) {
    var id = parseInt(e.target.closest("[data-item]").dataset.itemId);
    removeFromShoppingCart(id);
  });
  shoppingCart = loadShoppingCart();
  renderShoppingCart();
  shoppingCartBtn.addEventListener("click", function () {
    shoppingCartItemsWrapper.classList.toggle("invisible");
  });
}

;

function saveShoppingCart() {
  sessionStorage.setItem(sessionStorageKey, JSON.stringify(shoppingCart));
}

function loadShoppingCart() {
  var shoppingCart = sessionStorage.getItem(sessionStorageKey);
  return JSON.parse(shoppingCart) || [];
}

function addToShoppingCart(id) {
  var existingItem = shoppingCart.find(function (entry) {
    return entry.id === id;
  });

  if (existingItem) {
    existingItem.quantity++;
  } else {
    shoppingCart.push({
      id: id,
      quantity: 1
    });
  }

  renderShoppingCart();
  saveShoppingCart();
}

function removeFromShoppingCart(id) {
  var existingItem = shoppingCart.find(function (entry) {
    return entry.id === id;
  });
  if (existingItem == null) return;
  shoppingCart = shoppingCart.filter(function (entry) {
    return entry.id !== id;
  });
  renderShoppingCart();
  saveShoppingCart();
}

function renderShoppingCart() {
  if (shoppingCart.length === 0) {
    hideShoppingCart();
  } else {
    showShoppingCart();
    renderShoppingCartItems();
  }
}

function hideShoppingCart() {
  cart.classList.add("invisible");
}

function showShoppingCart() {
  cart.classList.remove("invisible");
  shoppingCartItemsWrapper.classList.add("invisible");
}

function renderShoppingCartItems() {
  shoppingCartItemContainer.innerHTML = "";
  shoppingCartQuantity.innerText = shoppingCart.length;
  var sumTotalInCents = shoppingCart.reduce(function (sum, entry) {
    var item = _items.default.find(function (i) {
      return entry.id === i.id;
    });

    return sum + item.priceCents * entry.quantity;
  }, 0);
  shoppingCartTotal.innerText = (0, _formatCurrency.default)(sumTotalInCents / 100);
  shoppingCart.forEach(function (entry) {
    var item = _items.default.find(function (i) {
      return entry.id === i.id;
    });

    var shoppingCartItem = shoppingCartItemTemplate.content.cloneNode(true);
    var container = shoppingCartItem.querySelector("[data-item]");
    container.dataset.itemId = item.id;
    var name = shoppingCartItem.querySelector("[data-name]");
    name.innerText = item.name;
    var image = shoppingCartItem.querySelector("[data-image]");
    image.src = "".concat(imageUrl, "/").concat(item.imageRamen);

    if (entry.quantity > 1) {
      var quantity = shoppingCartItem.querySelector("[data-quantity]");
      quantity.innerText = "x".concat(entry.quantity);
    }

    var price = shoppingCartItem.querySelector("[data-price]");
    price.innerText = (0, _formatCurrency.default)(item.priceCents * entry.quantity / 100);
    shoppingCartItemContainer.appendChild(shoppingCartItem);
  });
}
},{"../items.json":"items.json","../util/formatCurrency.js":"util/formatCurrency.js","../util/addGlobalEventListener.js":"util/addGlobalEventListener.js"}],"src/shop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupShop = setupShop;

var _items = _interopRequireDefault(require("../items.json"));

var _formatCurrency = _interopRequireDefault(require("../util/formatCurrency.js"));

var _addGlobalEventListener = _interopRequireDefault(require("../util/addGlobalEventListener.js"));

var _shoppingCart = require("./shoppingCart.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storeItemTemplate = document.querySelector("#store-item-template");
var storeItemContainer = document.querySelector("[data-store-container]");
var imageUrl = "https://github.com/e-d-i/shoppingCart/blob/main/src/img";

function setupShop() {
  if (storeItemContainer == null) return;
  (0, _addGlobalEventListener.default)("click", "[data-add-to-shoppingCart-button]", function (e) {
    var id = e.target.closest("[data-store-item]").dataset.itemId;
    (0, _shoppingCart.addToShoppingCart)(parseInt(id));
  });

  _items.default.forEach(renderStoreItem);
}

function renderStoreItem(item) {
  var storeItem = storeItemTemplate.content.cloneNode(true);
  var container = storeItem.querySelector("[data-store-item]");
  container.dataset.itemId = item.id;
  var name = storeItem.querySelector("[data-name]");
  name.innerText = item.name;
  var category = storeItem.querySelector("[data-category]");
  category.innerText = item.category;
  var image = storeItem.querySelector("[data-image]");
  image.src = "".concat(imageUrl, "/").concat(item.imageRamen);
  var price = storeItem.querySelector("[data-price]");
  price.innerText = (0, _formatCurrency.default)(item.priceCents / 100);
  storeItemContainer.appendChild(storeItem);
}
},{"../items.json":"items.json","../util/formatCurrency.js":"util/formatCurrency.js","../util/addGlobalEventListener.js":"util/addGlobalEventListener.js","./shoppingCart.js":"src/shoppingCart.js"}],"src/script.js":[function(require,module,exports) {
"use strict";

var _shop = require("./shop.js");

var _shoppingCart = require("./shoppingCart.js");

(0, _shop.setupShop)();
(0, _shoppingCart.setupShoppingCart)();
var purchaseBtn = document.querySelector("[data-purchase-button]");

if (purchaseBtn) {
  purchaseBtn.addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  alert("Awesome! Thank you for your purchase!");
  sessionStorage.clear();
  location.reload();
}
},{"./shop.js":"src/shop.js","./shoppingCart.js":"src/shoppingCart.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53857" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/script.js"], null)
//# sourceMappingURL=/script.baf0e655.js.map