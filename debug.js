(function(modules){
      const require = id => {
        const {factory, map} = modules[id];
        const localRequire = requireDeclarationName => require(map[requireDeclarationName]); 
        const module = {exports: {}};
        
        factory(module.exports, localRequire); 
        return module.exports; 
      } 
      require(0);
    })({0: {
        factory: (exports, require) => {
          "use strict";

var _mutationSummary = require("mutation-summary");

var mirror = {
  initialize: function initialize(rootId, children) {
    var _document$querySelect;

    var baseURL = new URL(((_document$querySelect = document.querySelector("base")) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.href) || location.pathname, location.origin);
    cast("cast.setBase", [baseURL.toString()]);
    cast("cast.initialize", [rootId, children]);
  },
  applyChanged: function applyChanged(removed, addedOrMoved, attributes, text) {
    cast("cast.applyChanged", [removed, addedOrMoved, attributes, text]);
  }
};
var mirrorClient = new _mutationSummary.TreeMirrorClient(document, mirror);

var disconnect = function disconnect() {
  return mirrorClient.disconnect();
};
        },
        map: {"mutation-summary":1}
      },1: {
        factory: (exports, require) => {
          "use strict";
// Copyright 2011 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// @ts-ignore
// @ts-ignore
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
if (MutationObserver === undefined) {
    console.error('DOM Mutation Observers are required.');
    console.error('https://developer.mozilla.org/en-US/docs/DOM/MutationObserver');
    throw Error('DOM Mutation Observers are required');
}
__exportStar(require("./ChildListChange"), exports);
__exportStar(require("./IMutationSummaryOptions"), exports);
__exportStar(require("./INumberMap"), exports);
__exportStar(require("./IQuery"), exports);
__exportStar(require("./IQueryValidator"), exports);
__exportStar(require("./IStringMap"), exports);
__exportStar(require("./Movement"), exports);
__exportStar(require("./MutationProjection"), exports);
__exportStar(require("./MutationSummary"), exports);
__exportStar(require("./NodeChange"), exports);
__exportStar(require("./NodeMap"), exports);
__exportStar(require("./Qualifier"), exports);
__exportStar(require("./Selector"), exports);
__exportStar(require("./Summary"), exports);
__exportStar(require("./TreeChanges"), exports);
__exportStar(require("./tree-mirror"), exports);
//# sourceMappingURL=index.js.map
        },
        map: {"./ChildListChange":2,"./IMutationSummaryOptions":3,"./INumberMap":4,"./IQuery":5,"./IQueryValidator":6,"./IStringMap":7,"./Movement":8,"./MutationProjection":9,"./MutationSummary":10,"./NodeChange":11,"./NodeMap":12,"./Qualifier":13,"./Selector":14,"./Summary":15,"./TreeChanges":16,"./tree-mirror":17}
      },2: {
        factory: (exports, require) => {
          "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildListChange = void 0;
var NodeMap_1 = require("./NodeMap");
var ChildListChange = /** @class */ (function () {
    function ChildListChange() {
        this.added = new NodeMap_1.NodeMap();
        this.removed = new NodeMap_1.NodeMap();
        this.maybeMoved = new NodeMap_1.NodeMap();
        this.oldPrevious = new NodeMap_1.NodeMap();
        this.moved = undefined;
    }
    return ChildListChange;
}());
exports.ChildListChange = ChildListChange;
//# sourceMappingURL=ChildListChange.js.map
        },
        map: {"./NodeMap":18}
      },3: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
        },
        map: {}
      },4: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
        },
        map: {}
      },5: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
        },
        map: {}
      },6: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
        },
        map: {}
      },7: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
        },
        map: {}
      },8: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movement = void 0;
var Movement;

(function (Movement) {
  Movement[Movement["STAYED_OUT"] = 0] = "STAYED_OUT";
  Movement[Movement["ENTERED"] = 1] = "ENTERED";
  Movement[Movement["STAYED_IN"] = 2] = "STAYED_IN";
  Movement[Movement["REPARENTED"] = 3] = "REPARENTED";
  Movement[Movement["REORDERED"] = 4] = "REORDERED";
  Movement[Movement["EXITED"] = 5] = "EXITED";
})(Movement = exports.Movement || (exports.Movement = {}));
        },
        map: {}
      },9: {
        factory: (exports, require) => {
          "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationProjection = void 0;
var TreeChanges_1 = require("./TreeChanges");
var NodeMap_1 = require("./NodeMap");
var Movement_1 = require("./Movement");
var ChildListChange_1 = require("./ChildListChange");
var MutationProjection = /** @class */ (function () {
    // TOOD(any)
    function MutationProjection(rootNode, mutations, selectors, calcReordered, calcOldPreviousSibling) {
        this.rootNode = rootNode;
        this.mutations = mutations;
        this.selectors = selectors;
        this.calcReordered = calcReordered;
        this.calcOldPreviousSibling = calcOldPreviousSibling;
        this.treeChanges = new TreeChanges_1.TreeChanges(rootNode, mutations);
        this.entered = [];
        this.exited = [];
        this.stayedIn = new NodeMap_1.NodeMap();
        this.visited = new NodeMap_1.NodeMap();
        this.childListChangeMap = undefined;
        this.characterDataOnly = undefined;
        this.matchCache = undefined;
        this.processMutations();
    }
    MutationProjection.prototype.processMutations = function () {
        if (!this.treeChanges.anyParentsChanged &&
            !this.treeChanges.anyAttributesChanged)
            return;
        var changedNodes = this.treeChanges.keys();
        for (var i = 0; i < changedNodes.length; i++) {
            this.visitNode(changedNodes[i], undefined);
        }
    };
    MutationProjection.prototype.visitNode = function (node, parentReachable) {
        if (this.visited.has(node))
            return;
        this.visited.set(node, true);
        var change = this.treeChanges.get(node);
        var reachable = parentReachable;
        // node inherits its parent's reachability change unless
        // its parentNode was mutated.
        if ((change && change.childList) || reachable == undefined)
            reachable = this.treeChanges.reachabilityChange(node);
        if (reachable === Movement_1.Movement.STAYED_OUT)
            return;
        // Cache match results for sub-patterns.
        this.matchabilityChange(node);
        if (reachable === Movement_1.Movement.ENTERED) {
            this.entered.push(node);
        }
        else if (reachable === Movement_1.Movement.EXITED) {
            this.exited.push(node);
            this.ensureHasOldPreviousSiblingIfNeeded(node);
        }
        else if (reachable === Movement_1.Movement.STAYED_IN) {
            var movement = Movement_1.Movement.STAYED_IN;
            if (change && change.childList) {
                if (change.oldParentNode !== node.parentNode) {
                    movement = Movement_1.Movement.REPARENTED;
                    this.ensureHasOldPreviousSiblingIfNeeded(node);
                }
                else if (this.calcReordered && this.wasReordered(node)) {
                    movement = Movement_1.Movement.REORDERED;
                }
            }
            this.stayedIn.set(node, movement);
        }
        if (reachable === Movement_1.Movement.STAYED_IN)
            return;
        // reachable === ENTERED || reachable === EXITED.
        for (var child = node.firstChild; child; child = child.nextSibling) {
            this.visitNode(child, reachable);
        }
    };
    MutationProjection.prototype.ensureHasOldPreviousSiblingIfNeeded = function (node) {
        if (!this.calcOldPreviousSibling)
            return;
        this.processChildlistChanges();
        var parentNode = node.parentNode;
        var nodeChange = this.treeChanges.get(node);
        if (nodeChange && nodeChange.oldParentNode)
            parentNode = nodeChange.oldParentNode;
        var change = this.childListChangeMap.get(parentNode);
        if (!change) {
            change = new ChildListChange_1.ChildListChange();
            this.childListChangeMap.set(parentNode, change);
        }
        if (!change.oldPrevious.has(node)) {
            change.oldPrevious.set(node, node.previousSibling);
        }
    };
    MutationProjection.prototype.getChanged = function (summary, selectors, characterDataOnly) {
        this.selectors = selectors;
        this.characterDataOnly = characterDataOnly;
        for (var i = 0; i < this.entered.length; i++) {
            var node = this.entered[i];
            var matchable = this.matchabilityChange(node);
            if (matchable === Movement_1.Movement.ENTERED || matchable === Movement_1.Movement.STAYED_IN)
                summary.added.push(node);
        }
        var stayedInNodes = this.stayedIn.keys();
        for (var i = 0; i < stayedInNodes.length; i++) {
            var node = stayedInNodes[i];
            var matchable = this.matchabilityChange(node);
            if (matchable === Movement_1.Movement.ENTERED) {
                summary.added.push(node);
            }
            else if (matchable === Movement_1.Movement.EXITED) {
                summary.removed.push(node);
            }
            else if (matchable === Movement_1.Movement.STAYED_IN && (summary.reparented || summary.reordered)) {
                var movement = this.stayedIn.get(node);
                if (summary.reparented && movement === Movement_1.Movement.REPARENTED)
                    summary.reparented.push(node);
                else if (summary.reordered && movement === Movement_1.Movement.REORDERED)
                    summary.reordered.push(node);
            }
        }
        for (var i = 0; i < this.exited.length; i++) {
            var node = this.exited[i];
            var matchable = this.matchabilityChange(node);
            if (matchable === Movement_1.Movement.EXITED || matchable === Movement_1.Movement.STAYED_IN)
                summary.removed.push(node);
        }
    };
    MutationProjection.prototype.getOldParentNode = function (node) {
        var change = this.treeChanges.get(node);
        if (change && change.childList)
            return change.oldParentNode ? change.oldParentNode : null;
        var reachabilityChange = this.treeChanges.reachabilityChange(node);
        if (reachabilityChange === Movement_1.Movement.STAYED_OUT || reachabilityChange === Movement_1.Movement.ENTERED)
            throw Error('getOldParentNode requested on invalid node.');
        return node.parentNode;
    };
    MutationProjection.prototype.getOldPreviousSibling = function (node) {
        var parentNode = node.parentNode;
        var nodeChange = this.treeChanges.get(node);
        if (nodeChange && nodeChange.oldParentNode)
            parentNode = nodeChange.oldParentNode;
        var change = this.childListChangeMap.get(parentNode);
        if (!change)
            throw Error('getOldPreviousSibling requested on invalid node.');
        return change.oldPrevious.get(node);
    };
    MutationProjection.prototype.getOldAttribute = function (element, attrName) {
        var change = this.treeChanges.get(element);
        if (!change || !change.attributes)
            throw Error('getOldAttribute requested on invalid node.');
        var value = change.getAttributeOldValue(attrName);
        if (value === undefined)
            throw Error('getOldAttribute requested for unchanged attribute name.');
        return value;
    };
    MutationProjection.prototype.attributeChangedNodes = function (includeAttributes) {
        if (!this.treeChanges.anyAttributesChanged)
            return {}; // No attributes mutations occurred.
        var attributeFilter;
        var caseInsensitiveFilter;
        if (includeAttributes) {
            attributeFilter = {};
            caseInsensitiveFilter = {};
            for (var i = 0; i < includeAttributes.length; i++) {
                var attrName = includeAttributes[i];
                attributeFilter[attrName] = true;
                caseInsensitiveFilter[attrName.toLowerCase()] = attrName;
            }
        }
        var result = {};
        var nodes = this.treeChanges.keys();
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var change = this.treeChanges.get(node);
            if (!change.attributes)
                continue;
            if (Movement_1.Movement.STAYED_IN !== this.treeChanges.reachabilityChange(node) ||
                Movement_1.Movement.STAYED_IN !== this.matchabilityChange(node)) {
                continue;
            }
            var element = node;
            var changedAttrNames = change.getAttributeNamesMutated();
            for (var j = 0; j < changedAttrNames.length; j++) {
                var attrName = changedAttrNames[j];
                if (attributeFilter &&
                    !attributeFilter[attrName] &&
                    !(change.isCaseInsensitive && caseInsensitiveFilter[attrName])) {
                    continue;
                }
                var oldValue = change.getAttributeOldValue(attrName);
                if (oldValue === element.getAttribute(attrName))
                    continue;
                if (caseInsensitiveFilter && change.isCaseInsensitive)
                    attrName = caseInsensitiveFilter[attrName];
                result[attrName] = result[attrName] || [];
                result[attrName].push(element);
            }
        }
        return result;
    };
    MutationProjection.prototype.getOldCharacterData = function (node) {
        var change = this.treeChanges.get(node);
        if (!change || !change.characterData)
            throw Error('getOldCharacterData requested on invalid node.');
        return change.characterDataOldValue;
    };
    MutationProjection.prototype.getCharacterDataChanged = function () {
        if (!this.treeChanges.anyCharacterDataChanged)
            return []; // No characterData mutations occurred.
        var nodes = this.treeChanges.keys();
        var result = [];
        for (var i = 0; i < nodes.length; i++) {
            var target = nodes[i];
            if (Movement_1.Movement.STAYED_IN !== this.treeChanges.reachabilityChange(target))
                continue;
            var change = this.treeChanges.get(target);
            if (!change.characterData ||
                target.textContent == change.characterDataOldValue)
                continue;
            result.push(target);
        }
        return result;
    };
    MutationProjection.prototype.computeMatchabilityChange = function (selector, el) {
        if (!this.matchCache)
            this.matchCache = [];
        if (!this.matchCache[selector.uid])
            this.matchCache[selector.uid] = new NodeMap_1.NodeMap();
        var cache = this.matchCache[selector.uid];
        var result = cache.get(el);
        if (result === undefined) {
            result = selector.matchabilityChange(el, this.treeChanges.get(el));
            cache.set(el, result);
        }
        return result;
    };
    MutationProjection.prototype.matchabilityChange = function (node) {
        var _this = this;
        // TODO(rafaelw): Include PI, CDATA?
        // Only include text nodes.
        if (this.characterDataOnly) {
            switch (node.nodeType) {
                case Node.COMMENT_NODE:
                case Node.TEXT_NODE:
                    return Movement_1.Movement.STAYED_IN;
                default:
                    return Movement_1.Movement.STAYED_OUT;
            }
        }
        // No element filter. Include all nodes.
        if (!this.selectors)
            return Movement_1.Movement.STAYED_IN;
        // Element filter. Exclude non-elements.
        if (node.nodeType !== Node.ELEMENT_NODE)
            return Movement_1.Movement.STAYED_OUT;
        var el = node;
        var matchChanges = this.selectors.map(function (selector) {
            return _this.computeMatchabilityChange(selector, el);
        });
        var accum = Movement_1.Movement.STAYED_OUT;
        var i = 0;
        while (accum !== Movement_1.Movement.STAYED_IN && i < matchChanges.length) {
            switch (matchChanges[i]) {
                case Movement_1.Movement.STAYED_IN:
                    accum = Movement_1.Movement.STAYED_IN;
                    break;
                case Movement_1.Movement.ENTERED:
                    if (accum === Movement_1.Movement.EXITED)
                        accum = Movement_1.Movement.STAYED_IN;
                    else
                        accum = Movement_1.Movement.ENTERED;
                    break;
                case Movement_1.Movement.EXITED:
                    if (accum === Movement_1.Movement.ENTERED)
                        accum = Movement_1.Movement.STAYED_IN;
                    else
                        accum = Movement_1.Movement.EXITED;
                    break;
            }
            i++;
        }
        return accum;
    };
    MutationProjection.prototype.getChildlistChange = function (el) {
        var change = this.childListChangeMap.get(el);
        if (!change) {
            change = new ChildListChange_1.ChildListChange();
            this.childListChangeMap.set(el, change);
        }
        return change;
    };
    MutationProjection.prototype.processChildlistChanges = function () {
        if (this.childListChangeMap)
            return;
        this.childListChangeMap = new NodeMap_1.NodeMap();
        var _loop_1 = function (i) {
            var mutation = this_1.mutations[i];
            if (mutation.type != 'childList')
                return "continue";
            if (this_1.treeChanges.reachabilityChange(mutation.target) !== Movement_1.Movement.STAYED_IN &&
                !this_1.calcOldPreviousSibling)
                return "continue";
            var change = this_1.getChildlistChange(mutation.target);
            var oldPrevious = mutation.previousSibling;
            var recordOldPrevious = function (node, previous) {
                if (!node ||
                    change.oldPrevious.has(node) ||
                    change.added.has(node) ||
                    change.maybeMoved.has(node))
                    return;
                if (previous &&
                    (change.added.has(previous) ||
                        change.maybeMoved.has(previous)))
                    return;
                change.oldPrevious.set(node, previous);
            };
            for (var j = 0; j < mutation.removedNodes.length; j++) {
                var node = mutation.removedNodes[j];
                recordOldPrevious(node, oldPrevious);
                if (change.added.has(node)) {
                    change.added.delete(node);
                }
                else {
                    change.removed.set(node, true);
                    change.maybeMoved.delete(node);
                }
                oldPrevious = node;
            }
            recordOldPrevious(mutation.nextSibling, oldPrevious);
            for (var j = 0; j < mutation.addedNodes.length; j++) {
                var node = mutation.addedNodes[j];
                if (change.removed.has(node)) {
                    change.removed.delete(node);
                    change.maybeMoved.set(node, true);
                }
                else {
                    change.added.set(node, true);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.mutations.length; i++) {
            _loop_1(i);
        }
    };
    MutationProjection.prototype.wasReordered = function (node) {
        if (!this.treeChanges.anyParentsChanged)
            return false;
        this.processChildlistChanges();
        var parentNode = node.parentNode;
        var nodeChange = this.treeChanges.get(node);
        if (nodeChange && nodeChange.oldParentNode)
            parentNode = nodeChange.oldParentNode;
        var change = this.childListChangeMap.get(parentNode);
        if (!change)
            return false;
        if (change.moved)
            return change.moved.get(node);
        change.moved = new NodeMap_1.NodeMap();
        var pendingMoveDecision = new NodeMap_1.NodeMap();
        function isMoved(node) {
            if (!node)
                return false;
            if (!change.maybeMoved.has(node))
                return false;
            var didMove = change.moved.get(node);
            if (didMove !== undefined)
                return didMove;
            if (pendingMoveDecision.has(node)) {
                didMove = true;
            }
            else {
                pendingMoveDecision.set(node, true);
                didMove = getPrevious(node) !== getOldPrevious(node);
            }
            if (pendingMoveDecision.has(node)) {
                pendingMoveDecision.delete(node);
                change.moved.set(node, didMove);
            }
            else {
                didMove = change.moved.get(node);
            }
            return didMove;
        }
        var oldPreviousCache = new NodeMap_1.NodeMap();
        function getOldPrevious(node) {
            var oldPrevious = oldPreviousCache.get(node);
            if (oldPrevious !== undefined)
                return oldPrevious;
            oldPrevious = change.oldPrevious.get(node);
            while (oldPrevious &&
                (change.removed.has(oldPrevious) || isMoved(oldPrevious))) {
                oldPrevious = getOldPrevious(oldPrevious);
            }
            if (oldPrevious === undefined)
                oldPrevious = node.previousSibling;
            oldPreviousCache.set(node, oldPrevious);
            return oldPrevious;
        }
        var previousCache = new NodeMap_1.NodeMap();
        function getPrevious(node) {
            if (previousCache.has(node))
                return previousCache.get(node);
            var previous = node.previousSibling;
            while (previous && (change.added.has(previous) || isMoved(previous)))
                previous = previous.previousSibling;
            previousCache.set(node, previous);
            return previous;
        }
        change.maybeMoved.keys().forEach(isMoved);
        return change.moved.get(node);
    };
    return MutationProjection;
}());
exports.MutationProjection = MutationProjection;
//# sourceMappingURL=MutationProjection.js.map
        },
        map: {"./TreeChanges":19,"./NodeMap":20,"./Movement":21,"./ChildListChange":22}
      },10: {
        factory: (exports, require) => {
          "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationSummary = void 0;
var Summary_1 = require("./Summary");
var MutationProjection_1 = require("./MutationProjection");
var MutationSummaryOptionProcessor_1 = require("./MutationSummaryOptionProcessor");
/**
 * This is the main entry point class for the Mutation Summary library. When
 * created, a MutationSummary takes care of the details of observing the DOM
 * for changes, computing the "net-effect" of what's changed and then delivers
 * these changes to the provided callback.
 *
 * @example
 * ```
 *
 * const ms = new MutationSummary({
 * callback(summaries: Summary[]) {
 *    summaries.forEach((summary: Summary) => console.log(summary));
 *  },
 *  queries: [
 *    { all: true }
 *  ]
 * });
 * ```
 */
var MutationSummary = /** @class */ (function () {
    /**
     * Creates a new MutationSummary class using the specified options.
     *
     * @param opts The options that configure how the MutationSummary
     *             instance will observe and report changes.
     */
    function MutationSummary(opts) {
        var _this = this;
        this._connected = false;
        this._options = MutationSummaryOptionProcessor_1.MutationSummaryOptionProcessor.validateOptions(opts);
        this._observerOptions = MutationSummaryOptionProcessor_1.MutationSummaryOptionProcessor.createObserverOptions(this._options.queries);
        this._root = this._options.rootNode;
        this._callback = this._options.callback;
        this._elementFilter = Array.prototype.concat.apply([], this._options.queries.map(function (query) {
            return query.elementFilter ? query.elementFilter : [];
        }));
        if (!this._elementFilter.length)
            this._elementFilter = undefined;
        this._calcReordered = this._options.queries.some(function (query) {
            return query.all;
        });
        this._queryValidators = []; // TODO(rafaelw): Shouldn't always define this.
        if (MutationSummary.createQueryValidator) {
            this._queryValidators = this._options.queries.map(function (query) {
                return MutationSummary.createQueryValidator(_this._root, query);
            });
        }
        this._observer = new MutationObserver(function (mutations) {
            _this._observerCallback(mutations);
        });
        this.reconnect();
    }
    /**
     * Starts observation using an existing `MutationSummary` which has been
     * disconnected. Note that this function is just a convenience method for
     * creating a new `MutationSummary` with the same options. The next time
     * changes are reported, they will relative to the state of the observed
     * DOM at the point that `reconnect` was called.
     */
    MutationSummary.prototype.reconnect = function () {
        if (this._connected)
            throw Error('Already connected');
        this._observer.observe(this._root, this._observerOptions);
        this._connected = true;
        this._checkpointQueryValidators();
    };
    /**
     * Immediately calculates changes and returns them as an array of summaries.
     * If there are no changes to report, returns undefined.
     */
    MutationSummary.prototype.takeSummaries = function () {
        if (!this._connected)
            throw Error('Not connected');
        var summaries = this._createSummaries(this._observer.takeRecords());
        return this._changesToReport(summaries) ? summaries : undefined;
    };
    /**
     * Discontinues observation immediately. If DOM changes are pending delivery,
     * they will be fetched and reported as the same array of summaries which
     * are handed into the callback. If there is nothing to report,
     * this function returns undefined.
     *
     * @returns A list of changes that have not yet been delivered to a callback.
     */
    MutationSummary.prototype.disconnect = function () {
        var summaries = this.takeSummaries();
        this._observer.disconnect();
        this._connected = false;
        return summaries;
    };
    MutationSummary.prototype._observerCallback = function (mutations) {
        if (!this._options.observeOwnChanges)
            this._observer.disconnect();
        var summaries = this._createSummaries(mutations);
        this._runQueryValidators(summaries);
        if (this._options.observeOwnChanges)
            this._checkpointQueryValidators();
        if (this._changesToReport(summaries))
            this._callback(summaries);
        // disconnect() may have been called during the callback.
        if (!this._options.observeOwnChanges && this._connected) {
            this._checkpointQueryValidators();
            this._observer.observe(this._root, this._observerOptions);
        }
    };
    MutationSummary.prototype._createSummaries = function (mutations) {
        if (!mutations || !mutations.length)
            return [];
        var projection = new MutationProjection_1.MutationProjection(this._root, mutations, this._elementFilter, this._calcReordered, this._options.oldPreviousSibling);
        var summaries = [];
        for (var i = 0; i < this._options.queries.length; i++) {
            summaries.push(new Summary_1.Summary(projection, this._options.queries[i]));
        }
        return summaries;
    };
    MutationSummary.prototype._checkpointQueryValidators = function () {
        this._queryValidators.forEach(function (validator) {
            if (validator)
                validator.recordPreviousState();
        });
    };
    MutationSummary.prototype._runQueryValidators = function (summaries) {
        this._queryValidators.forEach(function (validator, index) {
            if (validator)
                validator.validate(summaries[index]);
        });
    };
    MutationSummary.prototype._changesToReport = function (summaries) {
        return summaries.some(function (summary) {
            var summaryProps = ['added', 'removed', 'reordered', 'reparented',
                'valueChanged', 'characterDataChanged'];
            if (summaryProps.some(function (prop) {
                return summary[prop] && summary[prop].length;
            }))
                return true;
            if (summary.attributeChanged) {
                var attrNames = Object.keys(summary.attributeChanged);
                var attrsChanged = attrNames.some(function (attrName) {
                    return !!summary.attributeChanged[attrName].length;
                });
                if (attrsChanged)
                    return true;
            }
            return false;
        });
    };
    return MutationSummary;
}());
exports.MutationSummary = MutationSummary;
//# sourceMappingURL=MutationSummary.js.map
        },
        map: {"./Summary":23,"./MutationProjection":24,"./MutationSummaryOptionProcessor":25}
      },11: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeChange = void 0;

var NodeChange =
/** @class */
function () {
  function NodeChange(node, childList, attributes, characterData, oldParentNode, added, attributeOldValues, characterDataOldValue) {
    if (childList === void 0) {
      childList = false;
    }

    if (attributes === void 0) {
      attributes = false;
    }

    if (characterData === void 0) {
      characterData = false;
    }

    if (oldParentNode === void 0) {
      oldParentNode = null;
    }

    if (added === void 0) {
      added = false;
    }

    if (attributeOldValues === void 0) {
      attributeOldValues = null;
    }

    if (characterDataOldValue === void 0) {
      characterDataOldValue = null;
    }

    this.node = node;
    this.childList = childList;
    this.attributes = attributes;
    this.characterData = characterData;
    this.oldParentNode = oldParentNode;
    this.added = added;
    this.attributeOldValues = attributeOldValues;
    this.characterDataOldValue = characterDataOldValue;
    this.isCaseInsensitive = this.node.nodeType === Node.ELEMENT_NODE && this.node instanceof HTMLElement && this.node.ownerDocument instanceof HTMLDocument;
  }

  NodeChange.prototype.getAttributeOldValue = function (name) {
    if (!this.attributeOldValues) return undefined;
    if (this.isCaseInsensitive) name = name.toLowerCase();
    return this.attributeOldValues[name];
  };

  NodeChange.prototype.getAttributeNamesMutated = function () {
    var names = [];
    if (!this.attributeOldValues) return names;

    for (var name_1 in this.attributeOldValues) {
      if (this.attributeOldValues.hasOwnProperty(name_1)) {
        names.push(name_1);
      }
    }

    return names;
  };

  NodeChange.prototype.attributeMutated = function (name, oldValue) {
    this.attributes = true;
    this.attributeOldValues = this.attributeOldValues || {};
    if (name in this.attributeOldValues) return;
    this.attributeOldValues[name] = oldValue;
  };

  NodeChange.prototype.characterDataMutated = function (oldValue) {
    if (this.characterData) return;
    this.characterData = true;
    this.characterDataOldValue = oldValue;
  }; // Note: is it possible to receive a removal followed by a removal. This
  // can occur if the removed node is added to an non-observed node, that
  // node is added to the observed area, and then the node removed from
  // it.


  NodeChange.prototype.removedFromParent = function (parent) {
    this.childList = true;
    if (this.added || this.oldParentNode) this.added = false;else this.oldParentNode = parent;
  };

  NodeChange.prototype.insertedIntoParent = function () {
    this.childList = true;
    this.added = true;
  }; // An node's oldParent is
  //   -its present parent, if its parentNode was not changed.
  //   -null if the first thing that happened to it was an add.
  //   -the node it was removed from if the first thing that happened to it
  //      was a remove.


  NodeChange.prototype.getOldParent = function () {
    if (this.childList) {
      if (this.oldParentNode) return this.oldParentNode;
      if (this.added) return null;
    }

    return this.node.parentNode;
  };

  return NodeChange;
}();

exports.NodeChange = NodeChange;
        },
        map: {}
      },12: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeMap = void 0;
/**
 * A helper class that maps from a DOM Node to an arbitrary value.
 */

var NodeMap =
/** @class */
function () {
  /**
   * Constructs a new and empty NodeMap.
   */
  function NodeMap() {
    this._nodes = [];
    this._values = [];
  }

  NodeMap._isIndex = function (s) {
    return +s === s >>> 0;
  };

  NodeMap._nodeId = function (node) {
    var id = node[NodeMap._ID_PROP];
    if (!id) id = node[NodeMap._ID_PROP] = NodeMap._NEXT_ID++;
    return id;
  };
  /**
   * Sets the value of a node within the map.
   * @param node  The node to set the value for.
   * @param value the value to associate with the node.
   */


  NodeMap.prototype.set = function (node, value) {
    var id = NodeMap._nodeId(node);

    this._nodes[id] = node;
    this._values[id] = value;
  };
  /**
   * Gets the value for the given node.
   *
   * @param node The node to get the value of.
   * @returns The value for the given node, or undefined if the node is not
   * present in the map.
   */


  NodeMap.prototype.get = function (node) {
    var id = NodeMap._nodeId(node);

    return id !== undefined ? this._values[id] : undefined;
  };
  /**
   * Determines if a given node is in the NodeMap.
   *
   * @param node The node to determine if it is in the map.
   *
   * @returns true if the Node is contained in the map, false otherwise.
   */


  NodeMap.prototype.has = function (node) {
    return NodeMap._nodeId(node) in this._nodes;
  };
  /**
   * Deletes a node from the NodeMap.
   *
   * @param node The node to delete.
   */


  NodeMap.prototype["delete"] = function (node) {
    var id = NodeMap._nodeId(node);

    delete this._nodes[id];
    this._values[id] = undefined;
  };
  /**
   * @returns an array that holds the nodes that are the keys of the map.
   */


  NodeMap.prototype.keys = function () {
    var nodes = [];

    for (var id in this._nodes) {
      if (!NodeMap._isIndex(id)) continue;
      nodes.push(this._nodes[id]);
    }

    return nodes;
  };

  NodeMap._ID_PROP = '__mutation_summary_node_map_id__';
  NodeMap._NEXT_ID = 1;
  return NodeMap;
}();

exports.NodeMap = NodeMap;
        },
        map: {}
      },13: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Qualifier = void 0;

var Qualifier =
/** @class */
function () {
  function Qualifier() {}

  Qualifier.prototype.matches = function (oldValue) {
    if (oldValue === null) return false;
    if (this.attrValue === undefined) return true;
    if (!this.contains) return this.attrValue == oldValue;
    var tokens = oldValue.split(' ');

    for (var i = 0; i < tokens.length; i++) {
      if (this.attrValue === tokens[i]) return true;
    }

    return false;
  };

  Qualifier.prototype.toString = function () {
    if (this.attrName === 'class' && this.contains) return '.' + this.attrValue;
    if (this.attrName === 'id' && !this.contains) return '#' + this.attrValue;
    if (this.contains) return '[' + this.attrName + '~=' + escapeQuotes(this.attrValue) + ']';
    if ('attrValue' in this) return '[' + this.attrName + '=' + escapeQuotes(this.attrValue) + ']'; //@ts-ignore

    return '[' + this.attrName + ']';
  };

  return Qualifier;
}();

exports.Qualifier = Qualifier;

function escapeQuotes(value) {
  return '"' + value.replace(/"/, '\\\"') + '"';
}
        },
        map: {}
      },14: {
        factory: (exports, require) => {
          "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selector = void 0;
// TODO(rafaelw): Allow ':' and '.' as valid name characters.
var Qualifier_1 = require("./Qualifier");
var Movement_1 = require("./Movement");
var validNameInitialChar = /[a-zA-Z_]+/;
var validNameNonInitialChar = /[a-zA-Z0-9_\-]+/;
var Selector = /** @class */ (function () {
    function Selector() {
        this.uid = Selector.nextUid++;
        this.qualifiers = [];
    }
    Object.defineProperty(Selector.prototype, "caseInsensitiveTagName", {
        get: function () {
            return this.tagName.toUpperCase();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Selector.prototype, "selectorString", {
        get: function () {
            return this.tagName + this.qualifiers.join('');
        },
        enumerable: false,
        configurable: true
    });
    Selector.prototype.isMatching = function (el) {
        return el[Selector.matchesSelector](this.selectorString);
    };
    Selector.prototype.wasMatching = function (el, change, isMatching) {
        if (!change || !change.attributes)
            return isMatching;
        var tagName = change.isCaseInsensitive ? this.caseInsensitiveTagName : this.tagName;
        if (tagName !== '*' && tagName !== el.tagName)
            return false;
        var attributeOldValues = [];
        var anyChanged = false;
        for (var i = 0; i < this.qualifiers.length; i++) {
            var qualifier = this.qualifiers[i];
            var oldValue = change.getAttributeOldValue(qualifier.attrName);
            attributeOldValues.push(oldValue);
            anyChanged = anyChanged || (oldValue !== undefined);
        }
        if (!anyChanged)
            return isMatching;
        for (var i = 0; i < this.qualifiers.length; i++) {
            var qualifier = this.qualifiers[i];
            var oldValue = attributeOldValues[i];
            if (oldValue === undefined)
                oldValue = el.getAttribute(qualifier.attrName);
            if (!qualifier.matches(oldValue))
                return false;
        }
        return true;
    };
    Selector.prototype.matchabilityChange = function (el, change) {
        var isMatching = this.isMatching(el);
        if (isMatching)
            return this.wasMatching(el, change, isMatching) ? Movement_1.Movement.STAYED_IN : Movement_1.Movement.ENTERED;
        else
            return this.wasMatching(el, change, isMatching) ? Movement_1.Movement.EXITED : Movement_1.Movement.STAYED_OUT;
    };
    Selector.parseSelectors = function (input) {
        var selectors = [];
        var currentSelector;
        var currentQualifier;
        function newSelector() {
            if (currentSelector) {
                if (currentQualifier) {
                    currentSelector.qualifiers.push(currentQualifier);
                    currentQualifier = undefined;
                }
                selectors.push(currentSelector);
            }
            currentSelector = new Selector();
        }
        function newQualifier() {
            if (currentQualifier)
                currentSelector.qualifiers.push(currentQualifier);
            currentQualifier = new Qualifier_1.Qualifier();
        }
        var WHITESPACE = /\s/;
        var valueQuoteChar = undefined;
        var SYNTAX_ERROR = 'Invalid or unsupported selector syntax.';
        var SELECTOR = 1;
        var TAG_NAME = 2;
        var QUALIFIER = 3;
        var QUALIFIER_NAME_FIRST_CHAR = 4;
        var QUALIFIER_NAME = 5;
        var ATTR_NAME_FIRST_CHAR = 6;
        var ATTR_NAME = 7;
        var EQUIV_OR_ATTR_QUAL_END = 8;
        var EQUAL = 9;
        var ATTR_QUAL_END = 10;
        var VALUE_FIRST_CHAR = 11;
        var VALUE = 12;
        var QUOTED_VALUE = 13;
        var SELECTOR_SEPARATOR = 14;
        var state = SELECTOR;
        var i = 0;
        while (i < input.length) {
            var c = input[i++];
            switch (state) {
                case SELECTOR:
                    if (c.match(validNameInitialChar)) {
                        newSelector();
                        currentSelector.tagName = c;
                        state = TAG_NAME;
                        break;
                    }
                    if (c == '*') {
                        newSelector();
                        currentSelector.tagName = '*';
                        state = QUALIFIER;
                        break;
                    }
                    if (c == '.') {
                        newSelector();
                        newQualifier();
                        currentSelector.tagName = '*';
                        currentQualifier.attrName = 'class';
                        currentQualifier.contains = true;
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '#') {
                        newSelector();
                        newQualifier();
                        currentSelector.tagName = '*';
                        currentQualifier.attrName = 'id';
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '[') {
                        newSelector();
                        newQualifier();
                        currentSelector.tagName = '*';
                        currentQualifier.attrName = '';
                        state = ATTR_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c.match(WHITESPACE))
                        break;
                    throw Error(SYNTAX_ERROR);
                case TAG_NAME:
                    if (c.match(validNameNonInitialChar)) {
                        currentSelector.tagName += c;
                        break;
                    }
                    if (c == '.') {
                        newQualifier();
                        currentQualifier.attrName = 'class';
                        currentQualifier.contains = true;
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '#') {
                        newQualifier();
                        currentQualifier.attrName = 'id';
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '[') {
                        newQualifier();
                        currentQualifier.attrName = '';
                        state = ATTR_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c.match(WHITESPACE)) {
                        state = SELECTOR_SEPARATOR;
                        break;
                    }
                    if (c == ',') {
                        state = SELECTOR;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case QUALIFIER:
                    if (c == '.') {
                        newQualifier();
                        currentQualifier.attrName = 'class';
                        currentQualifier.contains = true;
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '#') {
                        newQualifier();
                        currentQualifier.attrName = 'id';
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '[') {
                        newQualifier();
                        currentQualifier.attrName = '';
                        state = ATTR_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c.match(WHITESPACE)) {
                        state = SELECTOR_SEPARATOR;
                        break;
                    }
                    if (c == ',') {
                        state = SELECTOR;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case QUALIFIER_NAME_FIRST_CHAR:
                    if (c.match(validNameInitialChar)) {
                        currentQualifier.attrValue = c;
                        state = QUALIFIER_NAME;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case QUALIFIER_NAME:
                    if (c.match(validNameNonInitialChar)) {
                        currentQualifier.attrValue += c;
                        break;
                    }
                    if (c == '.') {
                        newQualifier();
                        currentQualifier.attrName = 'class';
                        currentQualifier.contains = true;
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '#') {
                        newQualifier();
                        currentQualifier.attrName = 'id';
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '[') {
                        newQualifier();
                        state = ATTR_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c.match(WHITESPACE)) {
                        state = SELECTOR_SEPARATOR;
                        break;
                    }
                    if (c == ',') {
                        state = SELECTOR;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case ATTR_NAME_FIRST_CHAR:
                    if (c.match(validNameInitialChar)) {
                        currentQualifier.attrName = c;
                        state = ATTR_NAME;
                        break;
                    }
                    if (c.match(WHITESPACE))
                        break;
                    throw Error(SYNTAX_ERROR);
                case ATTR_NAME:
                    if (c.match(validNameNonInitialChar)) {
                        currentQualifier.attrName += c;
                        break;
                    }
                    if (c.match(WHITESPACE)) {
                        state = EQUIV_OR_ATTR_QUAL_END;
                        break;
                    }
                    if (c == '~') {
                        currentQualifier.contains = true;
                        state = EQUAL;
                        break;
                    }
                    if (c == '=') {
                        currentQualifier.attrValue = '';
                        state = VALUE_FIRST_CHAR;
                        break;
                    }
                    if (c == ']') {
                        state = QUALIFIER;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case EQUIV_OR_ATTR_QUAL_END:
                    if (c == '~') {
                        currentQualifier.contains = true;
                        state = EQUAL;
                        break;
                    }
                    if (c == '=') {
                        currentQualifier.attrValue = '';
                        state = VALUE_FIRST_CHAR;
                        break;
                    }
                    if (c == ']') {
                        state = QUALIFIER;
                        break;
                    }
                    if (c.match(WHITESPACE))
                        break;
                    throw Error(SYNTAX_ERROR);
                case EQUAL:
                    if (c == '=') {
                        currentQualifier.attrValue = '';
                        state = VALUE_FIRST_CHAR;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case ATTR_QUAL_END:
                    if (c == ']') {
                        state = QUALIFIER;
                        break;
                    }
                    if (c.match(WHITESPACE))
                        break;
                    throw Error(SYNTAX_ERROR);
                case VALUE_FIRST_CHAR:
                    if (c.match(WHITESPACE))
                        break;
                    if (c == '"' || c == "'") {
                        valueQuoteChar = c;
                        state = QUOTED_VALUE;
                        break;
                    }
                    currentQualifier.attrValue += c;
                    state = VALUE;
                    break;
                case VALUE:
                    if (c.match(WHITESPACE)) {
                        state = ATTR_QUAL_END;
                        break;
                    }
                    if (c == ']') {
                        state = QUALIFIER;
                        break;
                    }
                    if (c == "'" || c == '"')
                        throw Error(SYNTAX_ERROR);
                    currentQualifier.attrValue += c;
                    break;
                case QUOTED_VALUE:
                    if (c == valueQuoteChar) {
                        state = ATTR_QUAL_END;
                        break;
                    }
                    currentQualifier.attrValue += c;
                    break;
                case SELECTOR_SEPARATOR:
                    if (c.match(WHITESPACE))
                        break;
                    if (c == ',') {
                        state = SELECTOR;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
            }
        }
        switch (state) {
            case SELECTOR:
            case TAG_NAME:
            case QUALIFIER:
            case QUALIFIER_NAME:
            case SELECTOR_SEPARATOR:
                // Valid end states.
                newSelector();
                break;
            default:
                throw Error(SYNTAX_ERROR);
        }
        if (!selectors.length)
            throw Error(SYNTAX_ERROR);
        return selectors;
    };
    Selector.nextUid = 1;
    Selector.matchesSelector = "matches";
    return Selector;
}());
exports.Selector = Selector;
//# sourceMappingURL=Selector.js.map
        },
        map: {"./Qualifier":26,"./Movement":27}
      },15: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Summary = void 0;
/**
 * Represents a set of changes made to the DOM.
 */

var Summary =
/** @class */
function () {
  /**
   * Creates a new Summary instance given a [[MutationProjection]] and the
   * [[IQuery]] that was responsible for this summary being generated.
   *
   * @param projection The projection containing the changes.
   * @param query The query that cause the summary to be created.
   */
  function Summary(projection, query) {
    var _this = this;

    this.projection = projection;
    this.added = [];
    this.removed = [];
    this.reparented = query.all || query.element || query.characterData ? [] : undefined;
    this.reordered = query.all ? [] : undefined;
    projection.getChanged(this, query.elementFilter, query.characterData);

    if (query.all || query.attribute || query.attributeList) {
      var filter = query.attribute ? [query.attribute] : query.attributeList;
      var attributeChanged = projection.attributeChangedNodes(filter);

      if (query.attribute) {
        this.valueChanged = attributeChanged[query.attribute] || [];
      } else {
        this.attributeChanged = attributeChanged;

        if (query.attributeList) {
          query.attributeList.forEach(function (attrName) {
            if (!_this.attributeChanged.hasOwnProperty(attrName)) _this.attributeChanged[attrName] = [];
          });
        }
      }
    }

    if (query.all || query.characterData) {
      var characterDataChanged = projection.getCharacterDataChanged();
      if (query.characterData) this.valueChanged = characterDataChanged;else this.characterDataChanged = characterDataChanged;
    } // TODO this seems unnecessary.


    if (this.reordered) this.getOldPreviousSibling = projection.getOldPreviousSibling.bind(projection);
  }
  /**
   * Will retrieve the previous parentNode for and node. The node must be
   * contained in the removed element array, otherwise the function throws an
   * error.
   *
   * @param node The node to get the previous parent for.
   */


  Summary.prototype.getOldParentNode = function (node) {
    return this.projection.getOldParentNode(node);
  };
  /**
   * Retrieves the previous value of an attribute for an element. The Element
   * must be contained in the valueChanged element array, otherwise the
   * function throws an error.
   *
   * @param element The element to ge the old value for.
   * @param name The name off the attribute on the element to get the old value
   * for.
   */


  Summary.prototype.getOldAttribute = function (element, name) {
    return this.projection.getOldAttribute(element, name);
  };
  /**
   * Retrieves the previous text of `node`. `node` must be  contained in the
   * `valueChanged` node array, otherwise the function throws an error.
   *
   * @param node The node to get the old character data for.
   */


  Summary.prototype.getOldCharacterData = function (node) {
    return this.projection.getOldCharacterData(node);
  };
  /**
   * Retrieves the previous previousSibling for a node. The node must be
   * contained in the reordered element array, otherwise the function throws
   * an error.
   *
   * @param node The node to get the previous sibling for.
   */


  Summary.prototype.getOldPreviousSibling = function (node) {
    return this.projection.getOldPreviousSibling(node);
  };

  return Summary;
}();

exports.Summary = Summary;
        },
        map: {}
      },16: {
        factory: (exports, require) => {
          "use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeChanges = void 0;
var NodeMap_1 = require("./NodeMap");
var NodeChange_1 = require("./NodeChange");
var Movement_1 = require("./Movement");
var TreeChanges = /** @class */ (function (_super) {
    __extends(TreeChanges, _super);
    function TreeChanges(rootNode, mutations) {
        var _this = _super.call(this) || this;
        _this.rootNode = rootNode;
        _this.reachableCache = undefined;
        _this.wasReachableCache = undefined;
        _this.anyParentsChanged = false;
        _this.anyAttributesChanged = false;
        _this.anyCharacterDataChanged = false;
        for (var m = 0; m < mutations.length; m++) {
            var mutation = mutations[m];
            switch (mutation.type) {
                case 'childList':
                    _this.anyParentsChanged = true;
                    for (var i = 0; i < mutation.removedNodes.length; i++) {
                        var node = mutation.removedNodes[i];
                        _this.getChange(node).removedFromParent(mutation.target);
                    }
                    for (var i = 0; i < mutation.addedNodes.length; i++) {
                        var node = mutation.addedNodes[i];
                        _this.getChange(node).insertedIntoParent();
                    }
                    break;
                case 'attributes': {
                    _this.anyAttributesChanged = true;
                    var change = _this.getChange(mutation.target);
                    change.attributeMutated(mutation.attributeName, mutation.oldValue);
                    break;
                }
                case 'characterData': {
                    _this.anyCharacterDataChanged = true;
                    var change = _this.getChange(mutation.target);
                    change.characterDataMutated(mutation.oldValue);
                    break;
                }
            }
        }
        return _this;
    }
    TreeChanges.prototype.getChange = function (node) {
        var change = this.get(node);
        if (!change) {
            change = new NodeChange_1.NodeChange(node);
            this.set(node, change);
        }
        return change;
    };
    TreeChanges.prototype.getOldParent = function (node) {
        var change = this.get(node);
        return change ? change.getOldParent() : node.parentNode;
    };
    TreeChanges.prototype.getIsReachable = function (node) {
        if (node === this.rootNode)
            return true;
        if (!node)
            return false;
        this.reachableCache = this.reachableCache || new NodeMap_1.NodeMap();
        var isReachable = this.reachableCache.get(node);
        if (isReachable === undefined) {
            isReachable = this.getIsReachable(node.parentNode);
            this.reachableCache.set(node, isReachable);
        }
        return isReachable;
    };
    // A node wasReachable if its oldParent wasReachable.
    TreeChanges.prototype.getWasReachable = function (node) {
        if (node === this.rootNode)
            return true;
        if (!node)
            return false;
        this.wasReachableCache = this.wasReachableCache || new NodeMap_1.NodeMap();
        var wasReachable = this.wasReachableCache.get(node);
        if (wasReachable === undefined) {
            wasReachable = this.getWasReachable(this.getOldParent(node));
            this.wasReachableCache.set(node, wasReachable);
        }
        return wasReachable;
    };
    TreeChanges.prototype.reachabilityChange = function (node) {
        if (this.getIsReachable(node)) {
            return this.getWasReachable(node) ?
                Movement_1.Movement.STAYED_IN : Movement_1.Movement.ENTERED;
        }
        return this.getWasReachable(node) ?
            Movement_1.Movement.EXITED : Movement_1.Movement.STAYED_OUT;
    };
    return TreeChanges;
}(NodeMap_1.NodeMap));
exports.TreeChanges = TreeChanges;
//# sourceMappingURL=TreeChanges.js.map
        },
        map: {"./NodeMap":28,"./NodeChange":29,"./Movement":30}
      },17: {
        factory: (exports, require) => {
          "use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./IAttributeData"), exports);
__exportStar(require("./INodeData"), exports);
__exportStar(require("./IPositionData"), exports);
__exportStar(require("./ITextData"), exports);
__exportStar(require("./TreeMirror"), exports);
__exportStar(require("./TreeMirrorClient"), exports);
//# sourceMappingURL=index.js.map
        },
        map: {"./IAttributeData":31,"./INodeData":32,"./IPositionData":33,"./ITextData":34,"./TreeMirror":35,"./TreeMirrorClient":36}
      },18: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeMap = void 0;
/**
 * A helper class that maps from a DOM Node to an arbitrary value.
 */

var NodeMap =
/** @class */
function () {
  /**
   * Constructs a new and empty NodeMap.
   */
  function NodeMap() {
    this._nodes = [];
    this._values = [];
  }

  NodeMap._isIndex = function (s) {
    return +s === s >>> 0;
  };

  NodeMap._nodeId = function (node) {
    var id = node[NodeMap._ID_PROP];
    if (!id) id = node[NodeMap._ID_PROP] = NodeMap._NEXT_ID++;
    return id;
  };
  /**
   * Sets the value of a node within the map.
   * @param node  The node to set the value for.
   * @param value the value to associate with the node.
   */


  NodeMap.prototype.set = function (node, value) {
    var id = NodeMap._nodeId(node);

    this._nodes[id] = node;
    this._values[id] = value;
  };
  /**
   * Gets the value for the given node.
   *
   * @param node The node to get the value of.
   * @returns The value for the given node, or undefined if the node is not
   * present in the map.
   */


  NodeMap.prototype.get = function (node) {
    var id = NodeMap._nodeId(node);

    return id !== undefined ? this._values[id] : undefined;
  };
  /**
   * Determines if a given node is in the NodeMap.
   *
   * @param node The node to determine if it is in the map.
   *
   * @returns true if the Node is contained in the map, false otherwise.
   */


  NodeMap.prototype.has = function (node) {
    return NodeMap._nodeId(node) in this._nodes;
  };
  /**
   * Deletes a node from the NodeMap.
   *
   * @param node The node to delete.
   */


  NodeMap.prototype["delete"] = function (node) {
    var id = NodeMap._nodeId(node);

    delete this._nodes[id];
    this._values[id] = undefined;
  };
  /**
   * @returns an array that holds the nodes that are the keys of the map.
   */


  NodeMap.prototype.keys = function () {
    var nodes = [];

    for (var id in this._nodes) {
      if (!NodeMap._isIndex(id)) continue;
      nodes.push(this._nodes[id]);
    }

    return nodes;
  };

  NodeMap._ID_PROP = '__mutation_summary_node_map_id__';
  NodeMap._NEXT_ID = 1;
  return NodeMap;
}();

exports.NodeMap = NodeMap;
        },
        map: {}
      },19: {
        factory: (exports, require) => {
          "use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeChanges = void 0;
var NodeMap_1 = require("./NodeMap");
var NodeChange_1 = require("./NodeChange");
var Movement_1 = require("./Movement");
var TreeChanges = /** @class */ (function (_super) {
    __extends(TreeChanges, _super);
    function TreeChanges(rootNode, mutations) {
        var _this = _super.call(this) || this;
        _this.rootNode = rootNode;
        _this.reachableCache = undefined;
        _this.wasReachableCache = undefined;
        _this.anyParentsChanged = false;
        _this.anyAttributesChanged = false;
        _this.anyCharacterDataChanged = false;
        for (var m = 0; m < mutations.length; m++) {
            var mutation = mutations[m];
            switch (mutation.type) {
                case 'childList':
                    _this.anyParentsChanged = true;
                    for (var i = 0; i < mutation.removedNodes.length; i++) {
                        var node = mutation.removedNodes[i];
                        _this.getChange(node).removedFromParent(mutation.target);
                    }
                    for (var i = 0; i < mutation.addedNodes.length; i++) {
                        var node = mutation.addedNodes[i];
                        _this.getChange(node).insertedIntoParent();
                    }
                    break;
                case 'attributes': {
                    _this.anyAttributesChanged = true;
                    var change = _this.getChange(mutation.target);
                    change.attributeMutated(mutation.attributeName, mutation.oldValue);
                    break;
                }
                case 'characterData': {
                    _this.anyCharacterDataChanged = true;
                    var change = _this.getChange(mutation.target);
                    change.characterDataMutated(mutation.oldValue);
                    break;
                }
            }
        }
        return _this;
    }
    TreeChanges.prototype.getChange = function (node) {
        var change = this.get(node);
        if (!change) {
            change = new NodeChange_1.NodeChange(node);
            this.set(node, change);
        }
        return change;
    };
    TreeChanges.prototype.getOldParent = function (node) {
        var change = this.get(node);
        return change ? change.getOldParent() : node.parentNode;
    };
    TreeChanges.prototype.getIsReachable = function (node) {
        if (node === this.rootNode)
            return true;
        if (!node)
            return false;
        this.reachableCache = this.reachableCache || new NodeMap_1.NodeMap();
        var isReachable = this.reachableCache.get(node);
        if (isReachable === undefined) {
            isReachable = this.getIsReachable(node.parentNode);
            this.reachableCache.set(node, isReachable);
        }
        return isReachable;
    };
    // A node wasReachable if its oldParent wasReachable.
    TreeChanges.prototype.getWasReachable = function (node) {
        if (node === this.rootNode)
            return true;
        if (!node)
            return false;
        this.wasReachableCache = this.wasReachableCache || new NodeMap_1.NodeMap();
        var wasReachable = this.wasReachableCache.get(node);
        if (wasReachable === undefined) {
            wasReachable = this.getWasReachable(this.getOldParent(node));
            this.wasReachableCache.set(node, wasReachable);
        }
        return wasReachable;
    };
    TreeChanges.prototype.reachabilityChange = function (node) {
        if (this.getIsReachable(node)) {
            return this.getWasReachable(node) ?
                Movement_1.Movement.STAYED_IN : Movement_1.Movement.ENTERED;
        }
        return this.getWasReachable(node) ?
            Movement_1.Movement.EXITED : Movement_1.Movement.STAYED_OUT;
    };
    return TreeChanges;
}(NodeMap_1.NodeMap));
exports.TreeChanges = TreeChanges;
//# sourceMappingURL=TreeChanges.js.map
        },
        map: {"./NodeMap":37,"./NodeChange":38,"./Movement":39}
      },20: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeMap = void 0;
/**
 * A helper class that maps from a DOM Node to an arbitrary value.
 */

var NodeMap =
/** @class */
function () {
  /**
   * Constructs a new and empty NodeMap.
   */
  function NodeMap() {
    this._nodes = [];
    this._values = [];
  }

  NodeMap._isIndex = function (s) {
    return +s === s >>> 0;
  };

  NodeMap._nodeId = function (node) {
    var id = node[NodeMap._ID_PROP];
    if (!id) id = node[NodeMap._ID_PROP] = NodeMap._NEXT_ID++;
    return id;
  };
  /**
   * Sets the value of a node within the map.
   * @param node  The node to set the value for.
   * @param value the value to associate with the node.
   */


  NodeMap.prototype.set = function (node, value) {
    var id = NodeMap._nodeId(node);

    this._nodes[id] = node;
    this._values[id] = value;
  };
  /**
   * Gets the value for the given node.
   *
   * @param node The node to get the value of.
   * @returns The value for the given node, or undefined if the node is not
   * present in the map.
   */


  NodeMap.prototype.get = function (node) {
    var id = NodeMap._nodeId(node);

    return id !== undefined ? this._values[id] : undefined;
  };
  /**
   * Determines if a given node is in the NodeMap.
   *
   * @param node The node to determine if it is in the map.
   *
   * @returns true if the Node is contained in the map, false otherwise.
   */


  NodeMap.prototype.has = function (node) {
    return NodeMap._nodeId(node) in this._nodes;
  };
  /**
   * Deletes a node from the NodeMap.
   *
   * @param node The node to delete.
   */


  NodeMap.prototype["delete"] = function (node) {
    var id = NodeMap._nodeId(node);

    delete this._nodes[id];
    this._values[id] = undefined;
  };
  /**
   * @returns an array that holds the nodes that are the keys of the map.
   */


  NodeMap.prototype.keys = function () {
    var nodes = [];

    for (var id in this._nodes) {
      if (!NodeMap._isIndex(id)) continue;
      nodes.push(this._nodes[id]);
    }

    return nodes;
  };

  NodeMap._ID_PROP = '__mutation_summary_node_map_id__';
  NodeMap._NEXT_ID = 1;
  return NodeMap;
}();

exports.NodeMap = NodeMap;
        },
        map: {}
      },21: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movement = void 0;
var Movement;

(function (Movement) {
  Movement[Movement["STAYED_OUT"] = 0] = "STAYED_OUT";
  Movement[Movement["ENTERED"] = 1] = "ENTERED";
  Movement[Movement["STAYED_IN"] = 2] = "STAYED_IN";
  Movement[Movement["REPARENTED"] = 3] = "REPARENTED";
  Movement[Movement["REORDERED"] = 4] = "REORDERED";
  Movement[Movement["EXITED"] = 5] = "EXITED";
})(Movement = exports.Movement || (exports.Movement = {}));
        },
        map: {}
      },22: {
        factory: (exports, require) => {
          "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildListChange = void 0;
var NodeMap_1 = require("./NodeMap");
var ChildListChange = /** @class */ (function () {
    function ChildListChange() {
        this.added = new NodeMap_1.NodeMap();
        this.removed = new NodeMap_1.NodeMap();
        this.maybeMoved = new NodeMap_1.NodeMap();
        this.oldPrevious = new NodeMap_1.NodeMap();
        this.moved = undefined;
    }
    return ChildListChange;
}());
exports.ChildListChange = ChildListChange;
//# sourceMappingURL=ChildListChange.js.map
        },
        map: {"./NodeMap":40}
      },23: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Summary = void 0;
/**
 * Represents a set of changes made to the DOM.
 */

var Summary =
/** @class */
function () {
  /**
   * Creates a new Summary instance given a [[MutationProjection]] and the
   * [[IQuery]] that was responsible for this summary being generated.
   *
   * @param projection The projection containing the changes.
   * @param query The query that cause the summary to be created.
   */
  function Summary(projection, query) {
    var _this = this;

    this.projection = projection;
    this.added = [];
    this.removed = [];
    this.reparented = query.all || query.element || query.characterData ? [] : undefined;
    this.reordered = query.all ? [] : undefined;
    projection.getChanged(this, query.elementFilter, query.characterData);

    if (query.all || query.attribute || query.attributeList) {
      var filter = query.attribute ? [query.attribute] : query.attributeList;
      var attributeChanged = projection.attributeChangedNodes(filter);

      if (query.attribute) {
        this.valueChanged = attributeChanged[query.attribute] || [];
      } else {
        this.attributeChanged = attributeChanged;

        if (query.attributeList) {
          query.attributeList.forEach(function (attrName) {
            if (!_this.attributeChanged.hasOwnProperty(attrName)) _this.attributeChanged[attrName] = [];
          });
        }
      }
    }

    if (query.all || query.characterData) {
      var characterDataChanged = projection.getCharacterDataChanged();
      if (query.characterData) this.valueChanged = characterDataChanged;else this.characterDataChanged = characterDataChanged;
    } // TODO this seems unnecessary.


    if (this.reordered) this.getOldPreviousSibling = projection.getOldPreviousSibling.bind(projection);
  }
  /**
   * Will retrieve the previous parentNode for and node. The node must be
   * contained in the removed element array, otherwise the function throws an
   * error.
   *
   * @param node The node to get the previous parent for.
   */


  Summary.prototype.getOldParentNode = function (node) {
    return this.projection.getOldParentNode(node);
  };
  /**
   * Retrieves the previous value of an attribute for an element. The Element
   * must be contained in the valueChanged element array, otherwise the
   * function throws an error.
   *
   * @param element The element to ge the old value for.
   * @param name The name off the attribute on the element to get the old value
   * for.
   */


  Summary.prototype.getOldAttribute = function (element, name) {
    return this.projection.getOldAttribute(element, name);
  };
  /**
   * Retrieves the previous text of `node`. `node` must be  contained in the
   * `valueChanged` node array, otherwise the function throws an error.
   *
   * @param node The node to get the old character data for.
   */


  Summary.prototype.getOldCharacterData = function (node) {
    return this.projection.getOldCharacterData(node);
  };
  /**
   * Retrieves the previous previousSibling for a node. The node must be
   * contained in the reordered element array, otherwise the function throws
   * an error.
   *
   * @param node The node to get the previous sibling for.
   */


  Summary.prototype.getOldPreviousSibling = function (node) {
    return this.projection.getOldPreviousSibling(node);
  };

  return Summary;
}();

exports.Summary = Summary;
        },
        map: {}
      },24: {
        factory: (exports, require) => {
          "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationProjection = void 0;
var TreeChanges_1 = require("./TreeChanges");
var NodeMap_1 = require("./NodeMap");
var Movement_1 = require("./Movement");
var ChildListChange_1 = require("./ChildListChange");
var MutationProjection = /** @class */ (function () {
    // TOOD(any)
    function MutationProjection(rootNode, mutations, selectors, calcReordered, calcOldPreviousSibling) {
        this.rootNode = rootNode;
        this.mutations = mutations;
        this.selectors = selectors;
        this.calcReordered = calcReordered;
        this.calcOldPreviousSibling = calcOldPreviousSibling;
        this.treeChanges = new TreeChanges_1.TreeChanges(rootNode, mutations);
        this.entered = [];
        this.exited = [];
        this.stayedIn = new NodeMap_1.NodeMap();
        this.visited = new NodeMap_1.NodeMap();
        this.childListChangeMap = undefined;
        this.characterDataOnly = undefined;
        this.matchCache = undefined;
        this.processMutations();
    }
    MutationProjection.prototype.processMutations = function () {
        if (!this.treeChanges.anyParentsChanged &&
            !this.treeChanges.anyAttributesChanged)
            return;
        var changedNodes = this.treeChanges.keys();
        for (var i = 0; i < changedNodes.length; i++) {
            this.visitNode(changedNodes[i], undefined);
        }
    };
    MutationProjection.prototype.visitNode = function (node, parentReachable) {
        if (this.visited.has(node))
            return;
        this.visited.set(node, true);
        var change = this.treeChanges.get(node);
        var reachable = parentReachable;
        // node inherits its parent's reachability change unless
        // its parentNode was mutated.
        if ((change && change.childList) || reachable == undefined)
            reachable = this.treeChanges.reachabilityChange(node);
        if (reachable === Movement_1.Movement.STAYED_OUT)
            return;
        // Cache match results for sub-patterns.
        this.matchabilityChange(node);
        if (reachable === Movement_1.Movement.ENTERED) {
            this.entered.push(node);
        }
        else if (reachable === Movement_1.Movement.EXITED) {
            this.exited.push(node);
            this.ensureHasOldPreviousSiblingIfNeeded(node);
        }
        else if (reachable === Movement_1.Movement.STAYED_IN) {
            var movement = Movement_1.Movement.STAYED_IN;
            if (change && change.childList) {
                if (change.oldParentNode !== node.parentNode) {
                    movement = Movement_1.Movement.REPARENTED;
                    this.ensureHasOldPreviousSiblingIfNeeded(node);
                }
                else if (this.calcReordered && this.wasReordered(node)) {
                    movement = Movement_1.Movement.REORDERED;
                }
            }
            this.stayedIn.set(node, movement);
        }
        if (reachable === Movement_1.Movement.STAYED_IN)
            return;
        // reachable === ENTERED || reachable === EXITED.
        for (var child = node.firstChild; child; child = child.nextSibling) {
            this.visitNode(child, reachable);
        }
    };
    MutationProjection.prototype.ensureHasOldPreviousSiblingIfNeeded = function (node) {
        if (!this.calcOldPreviousSibling)
            return;
        this.processChildlistChanges();
        var parentNode = node.parentNode;
        var nodeChange = this.treeChanges.get(node);
        if (nodeChange && nodeChange.oldParentNode)
            parentNode = nodeChange.oldParentNode;
        var change = this.childListChangeMap.get(parentNode);
        if (!change) {
            change = new ChildListChange_1.ChildListChange();
            this.childListChangeMap.set(parentNode, change);
        }
        if (!change.oldPrevious.has(node)) {
            change.oldPrevious.set(node, node.previousSibling);
        }
    };
    MutationProjection.prototype.getChanged = function (summary, selectors, characterDataOnly) {
        this.selectors = selectors;
        this.characterDataOnly = characterDataOnly;
        for (var i = 0; i < this.entered.length; i++) {
            var node = this.entered[i];
            var matchable = this.matchabilityChange(node);
            if (matchable === Movement_1.Movement.ENTERED || matchable === Movement_1.Movement.STAYED_IN)
                summary.added.push(node);
        }
        var stayedInNodes = this.stayedIn.keys();
        for (var i = 0; i < stayedInNodes.length; i++) {
            var node = stayedInNodes[i];
            var matchable = this.matchabilityChange(node);
            if (matchable === Movement_1.Movement.ENTERED) {
                summary.added.push(node);
            }
            else if (matchable === Movement_1.Movement.EXITED) {
                summary.removed.push(node);
            }
            else if (matchable === Movement_1.Movement.STAYED_IN && (summary.reparented || summary.reordered)) {
                var movement = this.stayedIn.get(node);
                if (summary.reparented && movement === Movement_1.Movement.REPARENTED)
                    summary.reparented.push(node);
                else if (summary.reordered && movement === Movement_1.Movement.REORDERED)
                    summary.reordered.push(node);
            }
        }
        for (var i = 0; i < this.exited.length; i++) {
            var node = this.exited[i];
            var matchable = this.matchabilityChange(node);
            if (matchable === Movement_1.Movement.EXITED || matchable === Movement_1.Movement.STAYED_IN)
                summary.removed.push(node);
        }
    };
    MutationProjection.prototype.getOldParentNode = function (node) {
        var change = this.treeChanges.get(node);
        if (change && change.childList)
            return change.oldParentNode ? change.oldParentNode : null;
        var reachabilityChange = this.treeChanges.reachabilityChange(node);
        if (reachabilityChange === Movement_1.Movement.STAYED_OUT || reachabilityChange === Movement_1.Movement.ENTERED)
            throw Error('getOldParentNode requested on invalid node.');
        return node.parentNode;
    };
    MutationProjection.prototype.getOldPreviousSibling = function (node) {
        var parentNode = node.parentNode;
        var nodeChange = this.treeChanges.get(node);
        if (nodeChange && nodeChange.oldParentNode)
            parentNode = nodeChange.oldParentNode;
        var change = this.childListChangeMap.get(parentNode);
        if (!change)
            throw Error('getOldPreviousSibling requested on invalid node.');
        return change.oldPrevious.get(node);
    };
    MutationProjection.prototype.getOldAttribute = function (element, attrName) {
        var change = this.treeChanges.get(element);
        if (!change || !change.attributes)
            throw Error('getOldAttribute requested on invalid node.');
        var value = change.getAttributeOldValue(attrName);
        if (value === undefined)
            throw Error('getOldAttribute requested for unchanged attribute name.');
        return value;
    };
    MutationProjection.prototype.attributeChangedNodes = function (includeAttributes) {
        if (!this.treeChanges.anyAttributesChanged)
            return {}; // No attributes mutations occurred.
        var attributeFilter;
        var caseInsensitiveFilter;
        if (includeAttributes) {
            attributeFilter = {};
            caseInsensitiveFilter = {};
            for (var i = 0; i < includeAttributes.length; i++) {
                var attrName = includeAttributes[i];
                attributeFilter[attrName] = true;
                caseInsensitiveFilter[attrName.toLowerCase()] = attrName;
            }
        }
        var result = {};
        var nodes = this.treeChanges.keys();
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var change = this.treeChanges.get(node);
            if (!change.attributes)
                continue;
            if (Movement_1.Movement.STAYED_IN !== this.treeChanges.reachabilityChange(node) ||
                Movement_1.Movement.STAYED_IN !== this.matchabilityChange(node)) {
                continue;
            }
            var element = node;
            var changedAttrNames = change.getAttributeNamesMutated();
            for (var j = 0; j < changedAttrNames.length; j++) {
                var attrName = changedAttrNames[j];
                if (attributeFilter &&
                    !attributeFilter[attrName] &&
                    !(change.isCaseInsensitive && caseInsensitiveFilter[attrName])) {
                    continue;
                }
                var oldValue = change.getAttributeOldValue(attrName);
                if (oldValue === element.getAttribute(attrName))
                    continue;
                if (caseInsensitiveFilter && change.isCaseInsensitive)
                    attrName = caseInsensitiveFilter[attrName];
                result[attrName] = result[attrName] || [];
                result[attrName].push(element);
            }
        }
        return result;
    };
    MutationProjection.prototype.getOldCharacterData = function (node) {
        var change = this.treeChanges.get(node);
        if (!change || !change.characterData)
            throw Error('getOldCharacterData requested on invalid node.');
        return change.characterDataOldValue;
    };
    MutationProjection.prototype.getCharacterDataChanged = function () {
        if (!this.treeChanges.anyCharacterDataChanged)
            return []; // No characterData mutations occurred.
        var nodes = this.treeChanges.keys();
        var result = [];
        for (var i = 0; i < nodes.length; i++) {
            var target = nodes[i];
            if (Movement_1.Movement.STAYED_IN !== this.treeChanges.reachabilityChange(target))
                continue;
            var change = this.treeChanges.get(target);
            if (!change.characterData ||
                target.textContent == change.characterDataOldValue)
                continue;
            result.push(target);
        }
        return result;
    };
    MutationProjection.prototype.computeMatchabilityChange = function (selector, el) {
        if (!this.matchCache)
            this.matchCache = [];
        if (!this.matchCache[selector.uid])
            this.matchCache[selector.uid] = new NodeMap_1.NodeMap();
        var cache = this.matchCache[selector.uid];
        var result = cache.get(el);
        if (result === undefined) {
            result = selector.matchabilityChange(el, this.treeChanges.get(el));
            cache.set(el, result);
        }
        return result;
    };
    MutationProjection.prototype.matchabilityChange = function (node) {
        var _this = this;
        // TODO(rafaelw): Include PI, CDATA?
        // Only include text nodes.
        if (this.characterDataOnly) {
            switch (node.nodeType) {
                case Node.COMMENT_NODE:
                case Node.TEXT_NODE:
                    return Movement_1.Movement.STAYED_IN;
                default:
                    return Movement_1.Movement.STAYED_OUT;
            }
        }
        // No element filter. Include all nodes.
        if (!this.selectors)
            return Movement_1.Movement.STAYED_IN;
        // Element filter. Exclude non-elements.
        if (node.nodeType !== Node.ELEMENT_NODE)
            return Movement_1.Movement.STAYED_OUT;
        var el = node;
        var matchChanges = this.selectors.map(function (selector) {
            return _this.computeMatchabilityChange(selector, el);
        });
        var accum = Movement_1.Movement.STAYED_OUT;
        var i = 0;
        while (accum !== Movement_1.Movement.STAYED_IN && i < matchChanges.length) {
            switch (matchChanges[i]) {
                case Movement_1.Movement.STAYED_IN:
                    accum = Movement_1.Movement.STAYED_IN;
                    break;
                case Movement_1.Movement.ENTERED:
                    if (accum === Movement_1.Movement.EXITED)
                        accum = Movement_1.Movement.STAYED_IN;
                    else
                        accum = Movement_1.Movement.ENTERED;
                    break;
                case Movement_1.Movement.EXITED:
                    if (accum === Movement_1.Movement.ENTERED)
                        accum = Movement_1.Movement.STAYED_IN;
                    else
                        accum = Movement_1.Movement.EXITED;
                    break;
            }
            i++;
        }
        return accum;
    };
    MutationProjection.prototype.getChildlistChange = function (el) {
        var change = this.childListChangeMap.get(el);
        if (!change) {
            change = new ChildListChange_1.ChildListChange();
            this.childListChangeMap.set(el, change);
        }
        return change;
    };
    MutationProjection.prototype.processChildlistChanges = function () {
        if (this.childListChangeMap)
            return;
        this.childListChangeMap = new NodeMap_1.NodeMap();
        var _loop_1 = function (i) {
            var mutation = this_1.mutations[i];
            if (mutation.type != 'childList')
                return "continue";
            if (this_1.treeChanges.reachabilityChange(mutation.target) !== Movement_1.Movement.STAYED_IN &&
                !this_1.calcOldPreviousSibling)
                return "continue";
            var change = this_1.getChildlistChange(mutation.target);
            var oldPrevious = mutation.previousSibling;
            var recordOldPrevious = function (node, previous) {
                if (!node ||
                    change.oldPrevious.has(node) ||
                    change.added.has(node) ||
                    change.maybeMoved.has(node))
                    return;
                if (previous &&
                    (change.added.has(previous) ||
                        change.maybeMoved.has(previous)))
                    return;
                change.oldPrevious.set(node, previous);
            };
            for (var j = 0; j < mutation.removedNodes.length; j++) {
                var node = mutation.removedNodes[j];
                recordOldPrevious(node, oldPrevious);
                if (change.added.has(node)) {
                    change.added.delete(node);
                }
                else {
                    change.removed.set(node, true);
                    change.maybeMoved.delete(node);
                }
                oldPrevious = node;
            }
            recordOldPrevious(mutation.nextSibling, oldPrevious);
            for (var j = 0; j < mutation.addedNodes.length; j++) {
                var node = mutation.addedNodes[j];
                if (change.removed.has(node)) {
                    change.removed.delete(node);
                    change.maybeMoved.set(node, true);
                }
                else {
                    change.added.set(node, true);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.mutations.length; i++) {
            _loop_1(i);
        }
    };
    MutationProjection.prototype.wasReordered = function (node) {
        if (!this.treeChanges.anyParentsChanged)
            return false;
        this.processChildlistChanges();
        var parentNode = node.parentNode;
        var nodeChange = this.treeChanges.get(node);
        if (nodeChange && nodeChange.oldParentNode)
            parentNode = nodeChange.oldParentNode;
        var change = this.childListChangeMap.get(parentNode);
        if (!change)
            return false;
        if (change.moved)
            return change.moved.get(node);
        change.moved = new NodeMap_1.NodeMap();
        var pendingMoveDecision = new NodeMap_1.NodeMap();
        function isMoved(node) {
            if (!node)
                return false;
            if (!change.maybeMoved.has(node))
                return false;
            var didMove = change.moved.get(node);
            if (didMove !== undefined)
                return didMove;
            if (pendingMoveDecision.has(node)) {
                didMove = true;
            }
            else {
                pendingMoveDecision.set(node, true);
                didMove = getPrevious(node) !== getOldPrevious(node);
            }
            if (pendingMoveDecision.has(node)) {
                pendingMoveDecision.delete(node);
                change.moved.set(node, didMove);
            }
            else {
                didMove = change.moved.get(node);
            }
            return didMove;
        }
        var oldPreviousCache = new NodeMap_1.NodeMap();
        function getOldPrevious(node) {
            var oldPrevious = oldPreviousCache.get(node);
            if (oldPrevious !== undefined)
                return oldPrevious;
            oldPrevious = change.oldPrevious.get(node);
            while (oldPrevious &&
                (change.removed.has(oldPrevious) || isMoved(oldPrevious))) {
                oldPrevious = getOldPrevious(oldPrevious);
            }
            if (oldPrevious === undefined)
                oldPrevious = node.previousSibling;
            oldPreviousCache.set(node, oldPrevious);
            return oldPrevious;
        }
        var previousCache = new NodeMap_1.NodeMap();
        function getPrevious(node) {
            if (previousCache.has(node))
                return previousCache.get(node);
            var previous = node.previousSibling;
            while (previous && (change.added.has(previous) || isMoved(previous)))
                previous = previous.previousSibling;
            previousCache.set(node, previous);
            return previous;
        }
        change.maybeMoved.keys().forEach(isMoved);
        return change.moved.get(node);
    };
    return MutationProjection;
}());
exports.MutationProjection = MutationProjection;
//# sourceMappingURL=MutationProjection.js.map
        },
        map: {"./TreeChanges":41,"./NodeMap":42,"./Movement":43,"./ChildListChange":44}
      },25: {
        factory: (exports, require) => {
          "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationSummaryOptionProcessor = void 0;
var Selector_1 = require("./Selector");
var MutationSummaryOptionProcessor = /** @class */ (function () {
    function MutationSummaryOptionProcessor() {
    }
    MutationSummaryOptionProcessor.createObserverOptions = function (queries) {
        var observerOptions = {
            childList: true,
            subtree: true
        };
        var attributeFilter;
        function observeAttributes(attributes) {
            if (observerOptions.attributes && !attributeFilter)
                return; // already observing all.
            observerOptions.attributes = true;
            observerOptions.attributeOldValue = true;
            if (!attributes) {
                // observe all.
                attributeFilter = undefined;
                return;
            }
            // add to observed.
            attributeFilter = attributeFilter || {};
            attributes.forEach(function (attribute) {
                attributeFilter[attribute] = true;
                attributeFilter[attribute.toLowerCase()] = true;
            });
        }
        queries.forEach(function (query) {
            if (query.characterData) {
                observerOptions.characterData = true;
                observerOptions.characterDataOldValue = true;
                return;
            }
            if (query.all) {
                observeAttributes();
                observerOptions.characterData = true;
                observerOptions.characterDataOldValue = true;
                return;
            }
            if (query.attribute) {
                observeAttributes([query.attribute.trim()]);
                return;
            }
            var attributes = MutationSummaryOptionProcessor._elementFilterAttributes(query.elementFilter).concat(query.attributeList || []);
            if (attributes.length)
                observeAttributes(attributes);
        });
        if (attributeFilter)
            observerOptions.attributeFilter = Object.keys(attributeFilter);
        return observerOptions;
    };
    MutationSummaryOptionProcessor.validateOptions = function (options) {
        for (var prop in options) {
            if (!(prop in MutationSummaryOptionProcessor._optionKeys))
                throw Error('Invalid option: ' + prop);
        }
        if (typeof options.callback !== 'function')
            throw Error('Invalid options: callback is required and must be a function');
        if (!options.queries || !options.queries.length)
            throw Error('Invalid options: queries must contain at least one query request object.');
        var opts = {
            callback: options.callback,
            rootNode: options.rootNode || document,
            observeOwnChanges: !!options.observeOwnChanges,
            oldPreviousSibling: !!options.oldPreviousSibling,
            queries: []
        };
        for (var i = 0; i < options.queries.length; i++) {
            var request = options.queries[i];
            // all
            if (request.all) {
                if (Object.keys(request).length > 1)
                    throw Error('Invalid request option. all has no options.');
                opts.queries.push({ all: true });
                continue;
            }
            // attribute
            if ('attribute' in request) {
                var query = {
                    attribute: MutationSummaryOptionProcessor._validateAttribute(request.attribute)
                };
                query.elementFilter = Selector_1.Selector.parseSelectors('*[' + query.attribute + ']');
                if (Object.keys(request).length > 1)
                    throw Error('Invalid request option. attribute has no options.');
                opts.queries.push(query);
                continue;
            }
            // element
            if ('element' in request) {
                var requestOptionCount = Object.keys(request).length;
                var query = {
                    element: request.element,
                    elementFilter: Selector_1.Selector.parseSelectors(request.element)
                };
                if (request.hasOwnProperty('elementAttributes')) {
                    query.attributeList = MutationSummaryOptionProcessor._validateElementAttributes(request.elementAttributes);
                    requestOptionCount--;
                }
                if (requestOptionCount > 1)
                    throw Error('Invalid request option. element only allows elementAttributes option.');
                opts.queries.push(query);
                continue;
            }
            // characterData
            if (request.characterData) {
                if (Object.keys(request).length > 1)
                    throw Error('Invalid request option. characterData has no options.');
                opts.queries.push({ characterData: true });
                continue;
            }
            throw Error('Invalid request option. Unknown query request.');
        }
        return opts;
    };
    MutationSummaryOptionProcessor._validateElementAttributes = function (attribs) {
        if (!attribs.trim().length)
            throw Error('Invalid request option: elementAttributes must contain at least one attribute.');
        var lowerAttributes = {};
        var attributes = {};
        var tokens = attribs.split(/\s+/);
        for (var i = 0; i < tokens.length; i++) {
            var name_1 = tokens[i];
            if (!name_1)
                continue;
            name_1 = MutationSummaryOptionProcessor._validateAttribute(name_1);
            var nameLower = name_1.toLowerCase();
            if (lowerAttributes[nameLower])
                throw Error('Invalid request option: observing multiple case variations of the same attribute is not supported.');
            attributes[name_1] = true;
            lowerAttributes[nameLower] = true;
        }
        return Object.keys(attributes);
    };
    MutationSummaryOptionProcessor._elementFilterAttributes = function (selectors) {
        var attributes = {};
        selectors.forEach(function (selector) {
            selector.qualifiers.forEach(function (qualifier) {
                attributes[qualifier.attrName] = true;
            });
        });
        return Object.keys(attributes);
    };
    MutationSummaryOptionProcessor._validateAttribute = function (attribute) {
        if (typeof attribute != 'string')
            throw Error('Invalid request option. attribute must be a non-zero length string.');
        attribute = attribute.trim();
        if (!attribute)
            throw Error('Invalid request option. attribute must be a non-zero length string.');
        if (!attribute.match(MutationSummaryOptionProcessor._attributeFilterPattern))
            throw Error('Invalid request option. invalid attribute name: ' + attribute);
        return attribute;
    };
    MutationSummaryOptionProcessor._attributeFilterPattern = /^([a-zA-Z:_]+[a-zA-Z0-9_\-:.]*)$/;
    MutationSummaryOptionProcessor._optionKeys = {
        'callback': true,
        'queries': true,
        'rootNode': true,
        'oldPreviousSibling': true,
        'observeOwnChanges': true
    };
    return MutationSummaryOptionProcessor;
}());
exports.MutationSummaryOptionProcessor = MutationSummaryOptionProcessor;
//# sourceMappingURL=MutationSummaryOptionProcessor.js.map
        },
        map: {"./Selector":45}
      },26: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Qualifier = void 0;

var Qualifier =
/** @class */
function () {
  function Qualifier() {}

  Qualifier.prototype.matches = function (oldValue) {
    if (oldValue === null) return false;
    if (this.attrValue === undefined) return true;
    if (!this.contains) return this.attrValue == oldValue;
    var tokens = oldValue.split(' ');

    for (var i = 0; i < tokens.length; i++) {
      if (this.attrValue === tokens[i]) return true;
    }

    return false;
  };

  Qualifier.prototype.toString = function () {
    if (this.attrName === 'class' && this.contains) return '.' + this.attrValue;
    if (this.attrName === 'id' && !this.contains) return '#' + this.attrValue;
    if (this.contains) return '[' + this.attrName + '~=' + escapeQuotes(this.attrValue) + ']';
    if ('attrValue' in this) return '[' + this.attrName + '=' + escapeQuotes(this.attrValue) + ']'; //@ts-ignore

    return '[' + this.attrName + ']';
  };

  return Qualifier;
}();

exports.Qualifier = Qualifier;

function escapeQuotes(value) {
  return '"' + value.replace(/"/, '\\\"') + '"';
}
        },
        map: {}
      },27: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movement = void 0;
var Movement;

(function (Movement) {
  Movement[Movement["STAYED_OUT"] = 0] = "STAYED_OUT";
  Movement[Movement["ENTERED"] = 1] = "ENTERED";
  Movement[Movement["STAYED_IN"] = 2] = "STAYED_IN";
  Movement[Movement["REPARENTED"] = 3] = "REPARENTED";
  Movement[Movement["REORDERED"] = 4] = "REORDERED";
  Movement[Movement["EXITED"] = 5] = "EXITED";
})(Movement = exports.Movement || (exports.Movement = {}));
        },
        map: {}
      },28: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeMap = void 0;
/**
 * A helper class that maps from a DOM Node to an arbitrary value.
 */

var NodeMap =
/** @class */
function () {
  /**
   * Constructs a new and empty NodeMap.
   */
  function NodeMap() {
    this._nodes = [];
    this._values = [];
  }

  NodeMap._isIndex = function (s) {
    return +s === s >>> 0;
  };

  NodeMap._nodeId = function (node) {
    var id = node[NodeMap._ID_PROP];
    if (!id) id = node[NodeMap._ID_PROP] = NodeMap._NEXT_ID++;
    return id;
  };
  /**
   * Sets the value of a node within the map.
   * @param node  The node to set the value for.
   * @param value the value to associate with the node.
   */


  NodeMap.prototype.set = function (node, value) {
    var id = NodeMap._nodeId(node);

    this._nodes[id] = node;
    this._values[id] = value;
  };
  /**
   * Gets the value for the given node.
   *
   * @param node The node to get the value of.
   * @returns The value for the given node, or undefined if the node is not
   * present in the map.
   */


  NodeMap.prototype.get = function (node) {
    var id = NodeMap._nodeId(node);

    return id !== undefined ? this._values[id] : undefined;
  };
  /**
   * Determines if a given node is in the NodeMap.
   *
   * @param node The node to determine if it is in the map.
   *
   * @returns true if the Node is contained in the map, false otherwise.
   */


  NodeMap.prototype.has = function (node) {
    return NodeMap._nodeId(node) in this._nodes;
  };
  /**
   * Deletes a node from the NodeMap.
   *
   * @param node The node to delete.
   */


  NodeMap.prototype["delete"] = function (node) {
    var id = NodeMap._nodeId(node);

    delete this._nodes[id];
    this._values[id] = undefined;
  };
  /**
   * @returns an array that holds the nodes that are the keys of the map.
   */


  NodeMap.prototype.keys = function () {
    var nodes = [];

    for (var id in this._nodes) {
      if (!NodeMap._isIndex(id)) continue;
      nodes.push(this._nodes[id]);
    }

    return nodes;
  };

  NodeMap._ID_PROP = '__mutation_summary_node_map_id__';
  NodeMap._NEXT_ID = 1;
  return NodeMap;
}();

exports.NodeMap = NodeMap;
        },
        map: {}
      },29: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeChange = void 0;

var NodeChange =
/** @class */
function () {
  function NodeChange(node, childList, attributes, characterData, oldParentNode, added, attributeOldValues, characterDataOldValue) {
    if (childList === void 0) {
      childList = false;
    }

    if (attributes === void 0) {
      attributes = false;
    }

    if (characterData === void 0) {
      characterData = false;
    }

    if (oldParentNode === void 0) {
      oldParentNode = null;
    }

    if (added === void 0) {
      added = false;
    }

    if (attributeOldValues === void 0) {
      attributeOldValues = null;
    }

    if (characterDataOldValue === void 0) {
      characterDataOldValue = null;
    }

    this.node = node;
    this.childList = childList;
    this.attributes = attributes;
    this.characterData = characterData;
    this.oldParentNode = oldParentNode;
    this.added = added;
    this.attributeOldValues = attributeOldValues;
    this.characterDataOldValue = characterDataOldValue;
    this.isCaseInsensitive = this.node.nodeType === Node.ELEMENT_NODE && this.node instanceof HTMLElement && this.node.ownerDocument instanceof HTMLDocument;
  }

  NodeChange.prototype.getAttributeOldValue = function (name) {
    if (!this.attributeOldValues) return undefined;
    if (this.isCaseInsensitive) name = name.toLowerCase();
    return this.attributeOldValues[name];
  };

  NodeChange.prototype.getAttributeNamesMutated = function () {
    var names = [];
    if (!this.attributeOldValues) return names;

    for (var name_1 in this.attributeOldValues) {
      if (this.attributeOldValues.hasOwnProperty(name_1)) {
        names.push(name_1);
      }
    }

    return names;
  };

  NodeChange.prototype.attributeMutated = function (name, oldValue) {
    this.attributes = true;
    this.attributeOldValues = this.attributeOldValues || {};
    if (name in this.attributeOldValues) return;
    this.attributeOldValues[name] = oldValue;
  };

  NodeChange.prototype.characterDataMutated = function (oldValue) {
    if (this.characterData) return;
    this.characterData = true;
    this.characterDataOldValue = oldValue;
  }; // Note: is it possible to receive a removal followed by a removal. This
  // can occur if the removed node is added to an non-observed node, that
  // node is added to the observed area, and then the node removed from
  // it.


  NodeChange.prototype.removedFromParent = function (parent) {
    this.childList = true;
    if (this.added || this.oldParentNode) this.added = false;else this.oldParentNode = parent;
  };

  NodeChange.prototype.insertedIntoParent = function () {
    this.childList = true;
    this.added = true;
  }; // An node's oldParent is
  //   -its present parent, if its parentNode was not changed.
  //   -null if the first thing that happened to it was an add.
  //   -the node it was removed from if the first thing that happened to it
  //      was a remove.


  NodeChange.prototype.getOldParent = function () {
    if (this.childList) {
      if (this.oldParentNode) return this.oldParentNode;
      if (this.added) return null;
    }

    return this.node.parentNode;
  };

  return NodeChange;
}();

exports.NodeChange = NodeChange;
        },
        map: {}
      },30: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movement = void 0;
var Movement;

(function (Movement) {
  Movement[Movement["STAYED_OUT"] = 0] = "STAYED_OUT";
  Movement[Movement["ENTERED"] = 1] = "ENTERED";
  Movement[Movement["STAYED_IN"] = 2] = "STAYED_IN";
  Movement[Movement["REPARENTED"] = 3] = "REPARENTED";
  Movement[Movement["REORDERED"] = 4] = "REORDERED";
  Movement[Movement["EXITED"] = 5] = "EXITED";
})(Movement = exports.Movement || (exports.Movement = {}));
        },
        map: {}
      },31: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
        },
        map: {}
      },32: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
        },
        map: {}
      },33: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
        },
        map: {}
      },34: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
        },
        map: {}
      },35: {
        factory: (exports, require) => {
          "use strict"; // Copyright 2013 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeMirror = void 0;

var TreeMirror =
/** @class */
function () {
  function TreeMirror(root, delegate) {
    this.root = root;
    this.delegate = delegate;
    this.idMap = {};
  }

  TreeMirror.prototype.initialize = function (rootId, children) {
    this.idMap[rootId] = this.root;

    for (var i = 0; i < children.length; i++) {
      this.deserializeNode(children[i], this.root);
    }
  };

  TreeMirror.prototype.applyChanged = function (removed, addedOrMoved, attributes, text) {
    var _this = this; // NOTE: Applying the changes can result in an attempting to add a child
    // to a parent which is presently an ancestor of the parent. This can occur
    // based on random ordering of moves. The way we handle this is to first
    // remove all changed nodes from their parents, then apply.


    addedOrMoved.forEach(function (data) {
      var node = _this.deserializeNode(data);

      _this.deserializeNode(data.parentNode);

      _this.deserializeNode(data.previousSibling);

      if (node.parentNode) node.parentNode.removeChild(node);
    });
    removed.forEach(function (data) {
      var node = _this.deserializeNode(data);

      if (node.parentNode) node.parentNode.removeChild(node);
    });
    addedOrMoved.forEach(function (data) {
      var node = _this.deserializeNode(data);

      var parent = _this.deserializeNode(data.parentNode);

      var previous = _this.deserializeNode(data.previousSibling);

      parent.insertBefore(node, previous ? previous.nextSibling : parent.firstChild);
    });
    attributes.forEach(function (data) {
      var node = _this.deserializeNode(data);

      Object.keys(data.attributes).forEach(function (attrName) {
        var newVal = data.attributes[attrName];

        if (newVal === null) {
          node.removeAttribute(attrName);
        } else {
          if (!_this.delegate || !_this.delegate.setAttribute || !_this.delegate.setAttribute(node, attrName, newVal)) {
            node.setAttribute(attrName, newVal);
          }
        }
      });
    });
    text.forEach(function (data) {
      var node = _this.deserializeNode(data);

      node.textContent = data.textContent;
    });
    removed.forEach(function (node) {
      delete _this.idMap[node.id];
    });
  };

  TreeMirror.prototype.deserializeNode = function (nodeData, parent) {
    var _this = this;

    if (nodeData === null) return null;
    var node = this.idMap[nodeData.id];
    if (node) return node;
    var doc = this.root.ownerDocument;
    if (doc === null) doc = this.root;

    switch (nodeData.nodeType) {
      case Node.COMMENT_NODE:
        node = doc.createComment(nodeData.textContent);
        break;

      case Node.TEXT_NODE:
        node = doc.createTextNode(nodeData.textContent);
        break;

      case Node.DOCUMENT_TYPE_NODE:
        node = doc.implementation.createDocumentType(nodeData.name, nodeData.publicId, nodeData.systemId);
        break;

      case Node.ELEMENT_NODE:
        if (this.delegate && this.delegate.createElement) node = this.delegate.createElement(nodeData.tagName);
        if (!node) node = doc.createElement(nodeData.tagName);
        Object.keys(nodeData.attributes).forEach(function (name) {
          if (!_this.delegate || !_this.delegate.setAttribute || !_this.delegate.setAttribute(node, name, nodeData.attributes[name])) {
            node.setAttribute(name, nodeData.attributes[name]);
          }
        });
        break;

      default:
        throw "Unsupported node type: " + nodeData.nodeType;
    }

    this.idMap[nodeData.id] = node;
    if (parent) parent.appendChild(node);

    if (nodeData.childNodes) {
      for (var i = 0; i < nodeData.childNodes.length; i++) {
        this.deserializeNode(nodeData.childNodes[i], node);
      }
    }

    return node;
  };

  return TreeMirror;
}();

exports.TreeMirror = TreeMirror;
        },
        map: {}
      },36: {
        factory: (exports, require) => {
          "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeMirrorClient = void 0;
var MutationSummary_1 = require("../MutationSummary");
var NodeMap_1 = require("../NodeMap");
var TreeMirrorClient = /** @class */ (function () {
    function TreeMirrorClient(target, mirror, testingQueries) {
        var _this = this;
        this.target = target;
        this.mirror = mirror;
        this.nextId = 1;
        this.knownNodes = new NodeMap_1.NodeMap();
        var rootId = this.serializeNode(target).id;
        var children = [];
        for (var child = target.firstChild; child; child = child.nextSibling)
            children.push(this.serializeNode(child, true));
        this.mirror.initialize(rootId, children);
        var queries = [{ all: true }];
        if (testingQueries)
            queries = queries.concat(testingQueries);
        this.mutationSummary = new MutationSummary_1.MutationSummary({
            rootNode: target,
            callback: function (summaries) {
                _this.applyChanged(summaries);
            },
            queries: queries
        });
    }
    TreeMirrorClient.prototype.disconnect = function () {
        if (this.mutationSummary) {
            this.mutationSummary.disconnect();
            this.mutationSummary = undefined;
        }
    };
    TreeMirrorClient.prototype.rememberNode = function (node) {
        var id = this.nextId++;
        this.knownNodes.set(node, id);
        return id;
    };
    TreeMirrorClient.prototype.forgetNode = function (node) {
        this.knownNodes.delete(node);
    };
    TreeMirrorClient.prototype.serializeNode = function (node, recursive) {
        if (node === null)
            return null;
        var id = this.knownNodes.get(node);
        if (id !== undefined) {
            return { id: id };
        }
        var data = {
            nodeType: node.nodeType,
            id: this.rememberNode(node)
        };
        switch (data.nodeType) {
            case Node.DOCUMENT_TYPE_NODE:
                var docType = node;
                data.name = docType.name;
                data.publicId = docType.publicId;
                data.systemId = docType.systemId;
                break;
            case Node.COMMENT_NODE:
            case Node.TEXT_NODE:
                data.textContent = node.textContent;
                break;
            case Node.ELEMENT_NODE:
                var elm = node;
                data.tagName = elm.tagName;
                data.attributes = {};
                for (var i = 0; i < elm.attributes.length; i++) {
                    var attr = elm.attributes[i];
                    data.attributes[attr.name] = attr.value;
                }
                if (recursive && elm.childNodes.length) {
                    data.childNodes = [];
                    for (var child = elm.firstChild; child; child = child.nextSibling)
                        data.childNodes.push(this.serializeNode(child, true));
                }
                break;
        }
        return data;
    };
    TreeMirrorClient.prototype.serializeAddedAndMoved = function (added, reparented, reordered) {
        var _this = this;
        var all = added.concat(reparented).concat(reordered);
        var parentMap = new NodeMap_1.NodeMap();
        all.forEach(function (node) {
            var parent = node.parentNode;
            var children = parentMap.get(parent);
            if (!children) {
                children = new NodeMap_1.NodeMap();
                parentMap.set(parent, children);
            }
            children.set(node, true);
        });
        var moved = [];
        parentMap.keys().forEach(function (parent) {
            var children = parentMap.get(parent);
            var keys = children.keys();
            while (keys.length) {
                var node = keys[0];
                while (node.previousSibling && children.has(node.previousSibling))
                    node = node.previousSibling;
                while (node && children.has(node)) {
                    var data = _this.serializeNode(node);
                    data.previousSibling = _this.serializeNode(node.previousSibling);
                    data.parentNode = _this.serializeNode(node.parentNode);
                    moved.push(data);
                    children.delete(node);
                    node = node.nextSibling;
                }
                keys = children.keys();
            }
        });
        return moved;
    };
    TreeMirrorClient.prototype.serializeAttributeChanges = function (attributeChanged) {
        var _this = this;
        var map = new NodeMap_1.NodeMap();
        Object.keys(attributeChanged).forEach(function (attrName) {
            attributeChanged[attrName].forEach(function (element) {
                var record = map.get(element);
                if (!record) {
                    record = _this.serializeNode(element);
                    record.attributes = {};
                    map.set(element, record);
                }
                record.attributes[attrName] = element.getAttribute(attrName);
            });
        });
        return map.keys().map(function (node) {
            return map.get(node);
        });
    };
    TreeMirrorClient.prototype.applyChanged = function (summaries) {
        var _this = this;
        var summary = summaries[0];
        var removed = summary.removed.map(function (node) {
            return _this.serializeNode(node);
        });
        var moved = this.serializeAddedAndMoved(summary.added, summary.reparented, summary.reordered);
        var attributes = this.serializeAttributeChanges(summary.attributeChanged);
        var text = summary.characterDataChanged.map(function (node) {
            var data = _this.serializeNode(node);
            data.textContent = node.textContent;
            return data;
        });
        this.mirror.applyChanged(removed, moved, attributes, text);
        summary.removed.forEach(function (node) {
            _this.forgetNode(node);
        });
    };
    return TreeMirrorClient;
}());
exports.TreeMirrorClient = TreeMirrorClient;
//# sourceMappingURL=TreeMirrorClient.js.map
        },
        map: {"../MutationSummary":46,"../NodeMap":47}
      },37: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeMap = void 0;
/**
 * A helper class that maps from a DOM Node to an arbitrary value.
 */

var NodeMap =
/** @class */
function () {
  /**
   * Constructs a new and empty NodeMap.
   */
  function NodeMap() {
    this._nodes = [];
    this._values = [];
  }

  NodeMap._isIndex = function (s) {
    return +s === s >>> 0;
  };

  NodeMap._nodeId = function (node) {
    var id = node[NodeMap._ID_PROP];
    if (!id) id = node[NodeMap._ID_PROP] = NodeMap._NEXT_ID++;
    return id;
  };
  /**
   * Sets the value of a node within the map.
   * @param node  The node to set the value for.
   * @param value the value to associate with the node.
   */


  NodeMap.prototype.set = function (node, value) {
    var id = NodeMap._nodeId(node);

    this._nodes[id] = node;
    this._values[id] = value;
  };
  /**
   * Gets the value for the given node.
   *
   * @param node The node to get the value of.
   * @returns The value for the given node, or undefined if the node is not
   * present in the map.
   */


  NodeMap.prototype.get = function (node) {
    var id = NodeMap._nodeId(node);

    return id !== undefined ? this._values[id] : undefined;
  };
  /**
   * Determines if a given node is in the NodeMap.
   *
   * @param node The node to determine if it is in the map.
   *
   * @returns true if the Node is contained in the map, false otherwise.
   */


  NodeMap.prototype.has = function (node) {
    return NodeMap._nodeId(node) in this._nodes;
  };
  /**
   * Deletes a node from the NodeMap.
   *
   * @param node The node to delete.
   */


  NodeMap.prototype["delete"] = function (node) {
    var id = NodeMap._nodeId(node);

    delete this._nodes[id];
    this._values[id] = undefined;
  };
  /**
   * @returns an array that holds the nodes that are the keys of the map.
   */


  NodeMap.prototype.keys = function () {
    var nodes = [];

    for (var id in this._nodes) {
      if (!NodeMap._isIndex(id)) continue;
      nodes.push(this._nodes[id]);
    }

    return nodes;
  };

  NodeMap._ID_PROP = '__mutation_summary_node_map_id__';
  NodeMap._NEXT_ID = 1;
  return NodeMap;
}();

exports.NodeMap = NodeMap;
        },
        map: {}
      },38: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeChange = void 0;

var NodeChange =
/** @class */
function () {
  function NodeChange(node, childList, attributes, characterData, oldParentNode, added, attributeOldValues, characterDataOldValue) {
    if (childList === void 0) {
      childList = false;
    }

    if (attributes === void 0) {
      attributes = false;
    }

    if (characterData === void 0) {
      characterData = false;
    }

    if (oldParentNode === void 0) {
      oldParentNode = null;
    }

    if (added === void 0) {
      added = false;
    }

    if (attributeOldValues === void 0) {
      attributeOldValues = null;
    }

    if (characterDataOldValue === void 0) {
      characterDataOldValue = null;
    }

    this.node = node;
    this.childList = childList;
    this.attributes = attributes;
    this.characterData = characterData;
    this.oldParentNode = oldParentNode;
    this.added = added;
    this.attributeOldValues = attributeOldValues;
    this.characterDataOldValue = characterDataOldValue;
    this.isCaseInsensitive = this.node.nodeType === Node.ELEMENT_NODE && this.node instanceof HTMLElement && this.node.ownerDocument instanceof HTMLDocument;
  }

  NodeChange.prototype.getAttributeOldValue = function (name) {
    if (!this.attributeOldValues) return undefined;
    if (this.isCaseInsensitive) name = name.toLowerCase();
    return this.attributeOldValues[name];
  };

  NodeChange.prototype.getAttributeNamesMutated = function () {
    var names = [];
    if (!this.attributeOldValues) return names;

    for (var name_1 in this.attributeOldValues) {
      if (this.attributeOldValues.hasOwnProperty(name_1)) {
        names.push(name_1);
      }
    }

    return names;
  };

  NodeChange.prototype.attributeMutated = function (name, oldValue) {
    this.attributes = true;
    this.attributeOldValues = this.attributeOldValues || {};
    if (name in this.attributeOldValues) return;
    this.attributeOldValues[name] = oldValue;
  };

  NodeChange.prototype.characterDataMutated = function (oldValue) {
    if (this.characterData) return;
    this.characterData = true;
    this.characterDataOldValue = oldValue;
  }; // Note: is it possible to receive a removal followed by a removal. This
  // can occur if the removed node is added to an non-observed node, that
  // node is added to the observed area, and then the node removed from
  // it.


  NodeChange.prototype.removedFromParent = function (parent) {
    this.childList = true;
    if (this.added || this.oldParentNode) this.added = false;else this.oldParentNode = parent;
  };

  NodeChange.prototype.insertedIntoParent = function () {
    this.childList = true;
    this.added = true;
  }; // An node's oldParent is
  //   -its present parent, if its parentNode was not changed.
  //   -null if the first thing that happened to it was an add.
  //   -the node it was removed from if the first thing that happened to it
  //      was a remove.


  NodeChange.prototype.getOldParent = function () {
    if (this.childList) {
      if (this.oldParentNode) return this.oldParentNode;
      if (this.added) return null;
    }

    return this.node.parentNode;
  };

  return NodeChange;
}();

exports.NodeChange = NodeChange;
        },
        map: {}
      },39: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movement = void 0;
var Movement;

(function (Movement) {
  Movement[Movement["STAYED_OUT"] = 0] = "STAYED_OUT";
  Movement[Movement["ENTERED"] = 1] = "ENTERED";
  Movement[Movement["STAYED_IN"] = 2] = "STAYED_IN";
  Movement[Movement["REPARENTED"] = 3] = "REPARENTED";
  Movement[Movement["REORDERED"] = 4] = "REORDERED";
  Movement[Movement["EXITED"] = 5] = "EXITED";
})(Movement = exports.Movement || (exports.Movement = {}));
        },
        map: {}
      },40: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeMap = void 0;
/**
 * A helper class that maps from a DOM Node to an arbitrary value.
 */

var NodeMap =
/** @class */
function () {
  /**
   * Constructs a new and empty NodeMap.
   */
  function NodeMap() {
    this._nodes = [];
    this._values = [];
  }

  NodeMap._isIndex = function (s) {
    return +s === s >>> 0;
  };

  NodeMap._nodeId = function (node) {
    var id = node[NodeMap._ID_PROP];
    if (!id) id = node[NodeMap._ID_PROP] = NodeMap._NEXT_ID++;
    return id;
  };
  /**
   * Sets the value of a node within the map.
   * @param node  The node to set the value for.
   * @param value the value to associate with the node.
   */


  NodeMap.prototype.set = function (node, value) {
    var id = NodeMap._nodeId(node);

    this._nodes[id] = node;
    this._values[id] = value;
  };
  /**
   * Gets the value for the given node.
   *
   * @param node The node to get the value of.
   * @returns The value for the given node, or undefined if the node is not
   * present in the map.
   */


  NodeMap.prototype.get = function (node) {
    var id = NodeMap._nodeId(node);

    return id !== undefined ? this._values[id] : undefined;
  };
  /**
   * Determines if a given node is in the NodeMap.
   *
   * @param node The node to determine if it is in the map.
   *
   * @returns true if the Node is contained in the map, false otherwise.
   */


  NodeMap.prototype.has = function (node) {
    return NodeMap._nodeId(node) in this._nodes;
  };
  /**
   * Deletes a node from the NodeMap.
   *
   * @param node The node to delete.
   */


  NodeMap.prototype["delete"] = function (node) {
    var id = NodeMap._nodeId(node);

    delete this._nodes[id];
    this._values[id] = undefined;
  };
  /**
   * @returns an array that holds the nodes that are the keys of the map.
   */


  NodeMap.prototype.keys = function () {
    var nodes = [];

    for (var id in this._nodes) {
      if (!NodeMap._isIndex(id)) continue;
      nodes.push(this._nodes[id]);
    }

    return nodes;
  };

  NodeMap._ID_PROP = '__mutation_summary_node_map_id__';
  NodeMap._NEXT_ID = 1;
  return NodeMap;
}();

exports.NodeMap = NodeMap;
        },
        map: {}
      },41: {
        factory: (exports, require) => {
          "use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeChanges = void 0;
var NodeMap_1 = require("./NodeMap");
var NodeChange_1 = require("./NodeChange");
var Movement_1 = require("./Movement");
var TreeChanges = /** @class */ (function (_super) {
    __extends(TreeChanges, _super);
    function TreeChanges(rootNode, mutations) {
        var _this = _super.call(this) || this;
        _this.rootNode = rootNode;
        _this.reachableCache = undefined;
        _this.wasReachableCache = undefined;
        _this.anyParentsChanged = false;
        _this.anyAttributesChanged = false;
        _this.anyCharacterDataChanged = false;
        for (var m = 0; m < mutations.length; m++) {
            var mutation = mutations[m];
            switch (mutation.type) {
                case 'childList':
                    _this.anyParentsChanged = true;
                    for (var i = 0; i < mutation.removedNodes.length; i++) {
                        var node = mutation.removedNodes[i];
                        _this.getChange(node).removedFromParent(mutation.target);
                    }
                    for (var i = 0; i < mutation.addedNodes.length; i++) {
                        var node = mutation.addedNodes[i];
                        _this.getChange(node).insertedIntoParent();
                    }
                    break;
                case 'attributes': {
                    _this.anyAttributesChanged = true;
                    var change = _this.getChange(mutation.target);
                    change.attributeMutated(mutation.attributeName, mutation.oldValue);
                    break;
                }
                case 'characterData': {
                    _this.anyCharacterDataChanged = true;
                    var change = _this.getChange(mutation.target);
                    change.characterDataMutated(mutation.oldValue);
                    break;
                }
            }
        }
        return _this;
    }
    TreeChanges.prototype.getChange = function (node) {
        var change = this.get(node);
        if (!change) {
            change = new NodeChange_1.NodeChange(node);
            this.set(node, change);
        }
        return change;
    };
    TreeChanges.prototype.getOldParent = function (node) {
        var change = this.get(node);
        return change ? change.getOldParent() : node.parentNode;
    };
    TreeChanges.prototype.getIsReachable = function (node) {
        if (node === this.rootNode)
            return true;
        if (!node)
            return false;
        this.reachableCache = this.reachableCache || new NodeMap_1.NodeMap();
        var isReachable = this.reachableCache.get(node);
        if (isReachable === undefined) {
            isReachable = this.getIsReachable(node.parentNode);
            this.reachableCache.set(node, isReachable);
        }
        return isReachable;
    };
    // A node wasReachable if its oldParent wasReachable.
    TreeChanges.prototype.getWasReachable = function (node) {
        if (node === this.rootNode)
            return true;
        if (!node)
            return false;
        this.wasReachableCache = this.wasReachableCache || new NodeMap_1.NodeMap();
        var wasReachable = this.wasReachableCache.get(node);
        if (wasReachable === undefined) {
            wasReachable = this.getWasReachable(this.getOldParent(node));
            this.wasReachableCache.set(node, wasReachable);
        }
        return wasReachable;
    };
    TreeChanges.prototype.reachabilityChange = function (node) {
        if (this.getIsReachable(node)) {
            return this.getWasReachable(node) ?
                Movement_1.Movement.STAYED_IN : Movement_1.Movement.ENTERED;
        }
        return this.getWasReachable(node) ?
            Movement_1.Movement.EXITED : Movement_1.Movement.STAYED_OUT;
    };
    return TreeChanges;
}(NodeMap_1.NodeMap));
exports.TreeChanges = TreeChanges;
//# sourceMappingURL=TreeChanges.js.map
        },
        map: {"./NodeMap":48,"./NodeChange":49,"./Movement":50}
      },42: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeMap = void 0;
/**
 * A helper class that maps from a DOM Node to an arbitrary value.
 */

var NodeMap =
/** @class */
function () {
  /**
   * Constructs a new and empty NodeMap.
   */
  function NodeMap() {
    this._nodes = [];
    this._values = [];
  }

  NodeMap._isIndex = function (s) {
    return +s === s >>> 0;
  };

  NodeMap._nodeId = function (node) {
    var id = node[NodeMap._ID_PROP];
    if (!id) id = node[NodeMap._ID_PROP] = NodeMap._NEXT_ID++;
    return id;
  };
  /**
   * Sets the value of a node within the map.
   * @param node  The node to set the value for.
   * @param value the value to associate with the node.
   */


  NodeMap.prototype.set = function (node, value) {
    var id = NodeMap._nodeId(node);

    this._nodes[id] = node;
    this._values[id] = value;
  };
  /**
   * Gets the value for the given node.
   *
   * @param node The node to get the value of.
   * @returns The value for the given node, or undefined if the node is not
   * present in the map.
   */


  NodeMap.prototype.get = function (node) {
    var id = NodeMap._nodeId(node);

    return id !== undefined ? this._values[id] : undefined;
  };
  /**
   * Determines if a given node is in the NodeMap.
   *
   * @param node The node to determine if it is in the map.
   *
   * @returns true if the Node is contained in the map, false otherwise.
   */


  NodeMap.prototype.has = function (node) {
    return NodeMap._nodeId(node) in this._nodes;
  };
  /**
   * Deletes a node from the NodeMap.
   *
   * @param node The node to delete.
   */


  NodeMap.prototype["delete"] = function (node) {
    var id = NodeMap._nodeId(node);

    delete this._nodes[id];
    this._values[id] = undefined;
  };
  /**
   * @returns an array that holds the nodes that are the keys of the map.
   */


  NodeMap.prototype.keys = function () {
    var nodes = [];

    for (var id in this._nodes) {
      if (!NodeMap._isIndex(id)) continue;
      nodes.push(this._nodes[id]);
    }

    return nodes;
  };

  NodeMap._ID_PROP = '__mutation_summary_node_map_id__';
  NodeMap._NEXT_ID = 1;
  return NodeMap;
}();

exports.NodeMap = NodeMap;
        },
        map: {}
      },43: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movement = void 0;
var Movement;

(function (Movement) {
  Movement[Movement["STAYED_OUT"] = 0] = "STAYED_OUT";
  Movement[Movement["ENTERED"] = 1] = "ENTERED";
  Movement[Movement["STAYED_IN"] = 2] = "STAYED_IN";
  Movement[Movement["REPARENTED"] = 3] = "REPARENTED";
  Movement[Movement["REORDERED"] = 4] = "REORDERED";
  Movement[Movement["EXITED"] = 5] = "EXITED";
})(Movement = exports.Movement || (exports.Movement = {}));
        },
        map: {}
      },44: {
        factory: (exports, require) => {
          "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildListChange = void 0;
var NodeMap_1 = require("./NodeMap");
var ChildListChange = /** @class */ (function () {
    function ChildListChange() {
        this.added = new NodeMap_1.NodeMap();
        this.removed = new NodeMap_1.NodeMap();
        this.maybeMoved = new NodeMap_1.NodeMap();
        this.oldPrevious = new NodeMap_1.NodeMap();
        this.moved = undefined;
    }
    return ChildListChange;
}());
exports.ChildListChange = ChildListChange;
//# sourceMappingURL=ChildListChange.js.map
        },
        map: {"./NodeMap":51}
      },45: {
        factory: (exports, require) => {
          "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selector = void 0;
// TODO(rafaelw): Allow ':' and '.' as valid name characters.
var Qualifier_1 = require("./Qualifier");
var Movement_1 = require("./Movement");
var validNameInitialChar = /[a-zA-Z_]+/;
var validNameNonInitialChar = /[a-zA-Z0-9_\-]+/;
var Selector = /** @class */ (function () {
    function Selector() {
        this.uid = Selector.nextUid++;
        this.qualifiers = [];
    }
    Object.defineProperty(Selector.prototype, "caseInsensitiveTagName", {
        get: function () {
            return this.tagName.toUpperCase();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Selector.prototype, "selectorString", {
        get: function () {
            return this.tagName + this.qualifiers.join('');
        },
        enumerable: false,
        configurable: true
    });
    Selector.prototype.isMatching = function (el) {
        return el[Selector.matchesSelector](this.selectorString);
    };
    Selector.prototype.wasMatching = function (el, change, isMatching) {
        if (!change || !change.attributes)
            return isMatching;
        var tagName = change.isCaseInsensitive ? this.caseInsensitiveTagName : this.tagName;
        if (tagName !== '*' && tagName !== el.tagName)
            return false;
        var attributeOldValues = [];
        var anyChanged = false;
        for (var i = 0; i < this.qualifiers.length; i++) {
            var qualifier = this.qualifiers[i];
            var oldValue = change.getAttributeOldValue(qualifier.attrName);
            attributeOldValues.push(oldValue);
            anyChanged = anyChanged || (oldValue !== undefined);
        }
        if (!anyChanged)
            return isMatching;
        for (var i = 0; i < this.qualifiers.length; i++) {
            var qualifier = this.qualifiers[i];
            var oldValue = attributeOldValues[i];
            if (oldValue === undefined)
                oldValue = el.getAttribute(qualifier.attrName);
            if (!qualifier.matches(oldValue))
                return false;
        }
        return true;
    };
    Selector.prototype.matchabilityChange = function (el, change) {
        var isMatching = this.isMatching(el);
        if (isMatching)
            return this.wasMatching(el, change, isMatching) ? Movement_1.Movement.STAYED_IN : Movement_1.Movement.ENTERED;
        else
            return this.wasMatching(el, change, isMatching) ? Movement_1.Movement.EXITED : Movement_1.Movement.STAYED_OUT;
    };
    Selector.parseSelectors = function (input) {
        var selectors = [];
        var currentSelector;
        var currentQualifier;
        function newSelector() {
            if (currentSelector) {
                if (currentQualifier) {
                    currentSelector.qualifiers.push(currentQualifier);
                    currentQualifier = undefined;
                }
                selectors.push(currentSelector);
            }
            currentSelector = new Selector();
        }
        function newQualifier() {
            if (currentQualifier)
                currentSelector.qualifiers.push(currentQualifier);
            currentQualifier = new Qualifier_1.Qualifier();
        }
        var WHITESPACE = /\s/;
        var valueQuoteChar = undefined;
        var SYNTAX_ERROR = 'Invalid or unsupported selector syntax.';
        var SELECTOR = 1;
        var TAG_NAME = 2;
        var QUALIFIER = 3;
        var QUALIFIER_NAME_FIRST_CHAR = 4;
        var QUALIFIER_NAME = 5;
        var ATTR_NAME_FIRST_CHAR = 6;
        var ATTR_NAME = 7;
        var EQUIV_OR_ATTR_QUAL_END = 8;
        var EQUAL = 9;
        var ATTR_QUAL_END = 10;
        var VALUE_FIRST_CHAR = 11;
        var VALUE = 12;
        var QUOTED_VALUE = 13;
        var SELECTOR_SEPARATOR = 14;
        var state = SELECTOR;
        var i = 0;
        while (i < input.length) {
            var c = input[i++];
            switch (state) {
                case SELECTOR:
                    if (c.match(validNameInitialChar)) {
                        newSelector();
                        currentSelector.tagName = c;
                        state = TAG_NAME;
                        break;
                    }
                    if (c == '*') {
                        newSelector();
                        currentSelector.tagName = '*';
                        state = QUALIFIER;
                        break;
                    }
                    if (c == '.') {
                        newSelector();
                        newQualifier();
                        currentSelector.tagName = '*';
                        currentQualifier.attrName = 'class';
                        currentQualifier.contains = true;
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '#') {
                        newSelector();
                        newQualifier();
                        currentSelector.tagName = '*';
                        currentQualifier.attrName = 'id';
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '[') {
                        newSelector();
                        newQualifier();
                        currentSelector.tagName = '*';
                        currentQualifier.attrName = '';
                        state = ATTR_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c.match(WHITESPACE))
                        break;
                    throw Error(SYNTAX_ERROR);
                case TAG_NAME:
                    if (c.match(validNameNonInitialChar)) {
                        currentSelector.tagName += c;
                        break;
                    }
                    if (c == '.') {
                        newQualifier();
                        currentQualifier.attrName = 'class';
                        currentQualifier.contains = true;
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '#') {
                        newQualifier();
                        currentQualifier.attrName = 'id';
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '[') {
                        newQualifier();
                        currentQualifier.attrName = '';
                        state = ATTR_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c.match(WHITESPACE)) {
                        state = SELECTOR_SEPARATOR;
                        break;
                    }
                    if (c == ',') {
                        state = SELECTOR;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case QUALIFIER:
                    if (c == '.') {
                        newQualifier();
                        currentQualifier.attrName = 'class';
                        currentQualifier.contains = true;
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '#') {
                        newQualifier();
                        currentQualifier.attrName = 'id';
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '[') {
                        newQualifier();
                        currentQualifier.attrName = '';
                        state = ATTR_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c.match(WHITESPACE)) {
                        state = SELECTOR_SEPARATOR;
                        break;
                    }
                    if (c == ',') {
                        state = SELECTOR;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case QUALIFIER_NAME_FIRST_CHAR:
                    if (c.match(validNameInitialChar)) {
                        currentQualifier.attrValue = c;
                        state = QUALIFIER_NAME;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case QUALIFIER_NAME:
                    if (c.match(validNameNonInitialChar)) {
                        currentQualifier.attrValue += c;
                        break;
                    }
                    if (c == '.') {
                        newQualifier();
                        currentQualifier.attrName = 'class';
                        currentQualifier.contains = true;
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '#') {
                        newQualifier();
                        currentQualifier.attrName = 'id';
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '[') {
                        newQualifier();
                        state = ATTR_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c.match(WHITESPACE)) {
                        state = SELECTOR_SEPARATOR;
                        break;
                    }
                    if (c == ',') {
                        state = SELECTOR;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case ATTR_NAME_FIRST_CHAR:
                    if (c.match(validNameInitialChar)) {
                        currentQualifier.attrName = c;
                        state = ATTR_NAME;
                        break;
                    }
                    if (c.match(WHITESPACE))
                        break;
                    throw Error(SYNTAX_ERROR);
                case ATTR_NAME:
                    if (c.match(validNameNonInitialChar)) {
                        currentQualifier.attrName += c;
                        break;
                    }
                    if (c.match(WHITESPACE)) {
                        state = EQUIV_OR_ATTR_QUAL_END;
                        break;
                    }
                    if (c == '~') {
                        currentQualifier.contains = true;
                        state = EQUAL;
                        break;
                    }
                    if (c == '=') {
                        currentQualifier.attrValue = '';
                        state = VALUE_FIRST_CHAR;
                        break;
                    }
                    if (c == ']') {
                        state = QUALIFIER;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case EQUIV_OR_ATTR_QUAL_END:
                    if (c == '~') {
                        currentQualifier.contains = true;
                        state = EQUAL;
                        break;
                    }
                    if (c == '=') {
                        currentQualifier.attrValue = '';
                        state = VALUE_FIRST_CHAR;
                        break;
                    }
                    if (c == ']') {
                        state = QUALIFIER;
                        break;
                    }
                    if (c.match(WHITESPACE))
                        break;
                    throw Error(SYNTAX_ERROR);
                case EQUAL:
                    if (c == '=') {
                        currentQualifier.attrValue = '';
                        state = VALUE_FIRST_CHAR;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case ATTR_QUAL_END:
                    if (c == ']') {
                        state = QUALIFIER;
                        break;
                    }
                    if (c.match(WHITESPACE))
                        break;
                    throw Error(SYNTAX_ERROR);
                case VALUE_FIRST_CHAR:
                    if (c.match(WHITESPACE))
                        break;
                    if (c == '"' || c == "'") {
                        valueQuoteChar = c;
                        state = QUOTED_VALUE;
                        break;
                    }
                    currentQualifier.attrValue += c;
                    state = VALUE;
                    break;
                case VALUE:
                    if (c.match(WHITESPACE)) {
                        state = ATTR_QUAL_END;
                        break;
                    }
                    if (c == ']') {
                        state = QUALIFIER;
                        break;
                    }
                    if (c == "'" || c == '"')
                        throw Error(SYNTAX_ERROR);
                    currentQualifier.attrValue += c;
                    break;
                case QUOTED_VALUE:
                    if (c == valueQuoteChar) {
                        state = ATTR_QUAL_END;
                        break;
                    }
                    currentQualifier.attrValue += c;
                    break;
                case SELECTOR_SEPARATOR:
                    if (c.match(WHITESPACE))
                        break;
                    if (c == ',') {
                        state = SELECTOR;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
            }
        }
        switch (state) {
            case SELECTOR:
            case TAG_NAME:
            case QUALIFIER:
            case QUALIFIER_NAME:
            case SELECTOR_SEPARATOR:
                // Valid end states.
                newSelector();
                break;
            default:
                throw Error(SYNTAX_ERROR);
        }
        if (!selectors.length)
            throw Error(SYNTAX_ERROR);
        return selectors;
    };
    Selector.nextUid = 1;
    Selector.matchesSelector = "matches";
    return Selector;
}());
exports.Selector = Selector;
//# sourceMappingURL=Selector.js.map
        },
        map: {"./Qualifier":52,"./Movement":53}
      },46: {
        factory: (exports, require) => {
          "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationSummary = void 0;
var Summary_1 = require("./Summary");
var MutationProjection_1 = require("./MutationProjection");
var MutationSummaryOptionProcessor_1 = require("./MutationSummaryOptionProcessor");
/**
 * This is the main entry point class for the Mutation Summary library. When
 * created, a MutationSummary takes care of the details of observing the DOM
 * for changes, computing the "net-effect" of what's changed and then delivers
 * these changes to the provided callback.
 *
 * @example
 * ```
 *
 * const ms = new MutationSummary({
 * callback(summaries: Summary[]) {
 *    summaries.forEach((summary: Summary) => console.log(summary));
 *  },
 *  queries: [
 *    { all: true }
 *  ]
 * });
 * ```
 */
var MutationSummary = /** @class */ (function () {
    /**
     * Creates a new MutationSummary class using the specified options.
     *
     * @param opts The options that configure how the MutationSummary
     *             instance will observe and report changes.
     */
    function MutationSummary(opts) {
        var _this = this;
        this._connected = false;
        this._options = MutationSummaryOptionProcessor_1.MutationSummaryOptionProcessor.validateOptions(opts);
        this._observerOptions = MutationSummaryOptionProcessor_1.MutationSummaryOptionProcessor.createObserverOptions(this._options.queries);
        this._root = this._options.rootNode;
        this._callback = this._options.callback;
        this._elementFilter = Array.prototype.concat.apply([], this._options.queries.map(function (query) {
            return query.elementFilter ? query.elementFilter : [];
        }));
        if (!this._elementFilter.length)
            this._elementFilter = undefined;
        this._calcReordered = this._options.queries.some(function (query) {
            return query.all;
        });
        this._queryValidators = []; // TODO(rafaelw): Shouldn't always define this.
        if (MutationSummary.createQueryValidator) {
            this._queryValidators = this._options.queries.map(function (query) {
                return MutationSummary.createQueryValidator(_this._root, query);
            });
        }
        this._observer = new MutationObserver(function (mutations) {
            _this._observerCallback(mutations);
        });
        this.reconnect();
    }
    /**
     * Starts observation using an existing `MutationSummary` which has been
     * disconnected. Note that this function is just a convenience method for
     * creating a new `MutationSummary` with the same options. The next time
     * changes are reported, they will relative to the state of the observed
     * DOM at the point that `reconnect` was called.
     */
    MutationSummary.prototype.reconnect = function () {
        if (this._connected)
            throw Error('Already connected');
        this._observer.observe(this._root, this._observerOptions);
        this._connected = true;
        this._checkpointQueryValidators();
    };
    /**
     * Immediately calculates changes and returns them as an array of summaries.
     * If there are no changes to report, returns undefined.
     */
    MutationSummary.prototype.takeSummaries = function () {
        if (!this._connected)
            throw Error('Not connected');
        var summaries = this._createSummaries(this._observer.takeRecords());
        return this._changesToReport(summaries) ? summaries : undefined;
    };
    /**
     * Discontinues observation immediately. If DOM changes are pending delivery,
     * they will be fetched and reported as the same array of summaries which
     * are handed into the callback. If there is nothing to report,
     * this function returns undefined.
     *
     * @returns A list of changes that have not yet been delivered to a callback.
     */
    MutationSummary.prototype.disconnect = function () {
        var summaries = this.takeSummaries();
        this._observer.disconnect();
        this._connected = false;
        return summaries;
    };
    MutationSummary.prototype._observerCallback = function (mutations) {
        if (!this._options.observeOwnChanges)
            this._observer.disconnect();
        var summaries = this._createSummaries(mutations);
        this._runQueryValidators(summaries);
        if (this._options.observeOwnChanges)
            this._checkpointQueryValidators();
        if (this._changesToReport(summaries))
            this._callback(summaries);
        // disconnect() may have been called during the callback.
        if (!this._options.observeOwnChanges && this._connected) {
            this._checkpointQueryValidators();
            this._observer.observe(this._root, this._observerOptions);
        }
    };
    MutationSummary.prototype._createSummaries = function (mutations) {
        if (!mutations || !mutations.length)
            return [];
        var projection = new MutationProjection_1.MutationProjection(this._root, mutations, this._elementFilter, this._calcReordered, this._options.oldPreviousSibling);
        var summaries = [];
        for (var i = 0; i < this._options.queries.length; i++) {
            summaries.push(new Summary_1.Summary(projection, this._options.queries[i]));
        }
        return summaries;
    };
    MutationSummary.prototype._checkpointQueryValidators = function () {
        this._queryValidators.forEach(function (validator) {
            if (validator)
                validator.recordPreviousState();
        });
    };
    MutationSummary.prototype._runQueryValidators = function (summaries) {
        this._queryValidators.forEach(function (validator, index) {
            if (validator)
                validator.validate(summaries[index]);
        });
    };
    MutationSummary.prototype._changesToReport = function (summaries) {
        return summaries.some(function (summary) {
            var summaryProps = ['added', 'removed', 'reordered', 'reparented',
                'valueChanged', 'characterDataChanged'];
            if (summaryProps.some(function (prop) {
                return summary[prop] && summary[prop].length;
            }))
                return true;
            if (summary.attributeChanged) {
                var attrNames = Object.keys(summary.attributeChanged);
                var attrsChanged = attrNames.some(function (attrName) {
                    return !!summary.attributeChanged[attrName].length;
                });
                if (attrsChanged)
                    return true;
            }
            return false;
        });
    };
    return MutationSummary;
}());
exports.MutationSummary = MutationSummary;
//# sourceMappingURL=MutationSummary.js.map
        },
        map: {"./Summary":54,"./MutationProjection":55,"./MutationSummaryOptionProcessor":56}
      },47: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeMap = void 0;
/**
 * A helper class that maps from a DOM Node to an arbitrary value.
 */

var NodeMap =
/** @class */
function () {
  /**
   * Constructs a new and empty NodeMap.
   */
  function NodeMap() {
    this._nodes = [];
    this._values = [];
  }

  NodeMap._isIndex = function (s) {
    return +s === s >>> 0;
  };

  NodeMap._nodeId = function (node) {
    var id = node[NodeMap._ID_PROP];
    if (!id) id = node[NodeMap._ID_PROP] = NodeMap._NEXT_ID++;
    return id;
  };
  /**
   * Sets the value of a node within the map.
   * @param node  The node to set the value for.
   * @param value the value to associate with the node.
   */


  NodeMap.prototype.set = function (node, value) {
    var id = NodeMap._nodeId(node);

    this._nodes[id] = node;
    this._values[id] = value;
  };
  /**
   * Gets the value for the given node.
   *
   * @param node The node to get the value of.
   * @returns The value for the given node, or undefined if the node is not
   * present in the map.
   */


  NodeMap.prototype.get = function (node) {
    var id = NodeMap._nodeId(node);

    return id !== undefined ? this._values[id] : undefined;
  };
  /**
   * Determines if a given node is in the NodeMap.
   *
   * @param node The node to determine if it is in the map.
   *
   * @returns true if the Node is contained in the map, false otherwise.
   */


  NodeMap.prototype.has = function (node) {
    return NodeMap._nodeId(node) in this._nodes;
  };
  /**
   * Deletes a node from the NodeMap.
   *
   * @param node The node to delete.
   */


  NodeMap.prototype["delete"] = function (node) {
    var id = NodeMap._nodeId(node);

    delete this._nodes[id];
    this._values[id] = undefined;
  };
  /**
   * @returns an array that holds the nodes that are the keys of the map.
   */


  NodeMap.prototype.keys = function () {
    var nodes = [];

    for (var id in this._nodes) {
      if (!NodeMap._isIndex(id)) continue;
      nodes.push(this._nodes[id]);
    }

    return nodes;
  };

  NodeMap._ID_PROP = '__mutation_summary_node_map_id__';
  NodeMap._NEXT_ID = 1;
  return NodeMap;
}();

exports.NodeMap = NodeMap;
        },
        map: {}
      },48: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeMap = void 0;
/**
 * A helper class that maps from a DOM Node to an arbitrary value.
 */

var NodeMap =
/** @class */
function () {
  /**
   * Constructs a new and empty NodeMap.
   */
  function NodeMap() {
    this._nodes = [];
    this._values = [];
  }

  NodeMap._isIndex = function (s) {
    return +s === s >>> 0;
  };

  NodeMap._nodeId = function (node) {
    var id = node[NodeMap._ID_PROP];
    if (!id) id = node[NodeMap._ID_PROP] = NodeMap._NEXT_ID++;
    return id;
  };
  /**
   * Sets the value of a node within the map.
   * @param node  The node to set the value for.
   * @param value the value to associate with the node.
   */


  NodeMap.prototype.set = function (node, value) {
    var id = NodeMap._nodeId(node);

    this._nodes[id] = node;
    this._values[id] = value;
  };
  /**
   * Gets the value for the given node.
   *
   * @param node The node to get the value of.
   * @returns The value for the given node, or undefined if the node is not
   * present in the map.
   */


  NodeMap.prototype.get = function (node) {
    var id = NodeMap._nodeId(node);

    return id !== undefined ? this._values[id] : undefined;
  };
  /**
   * Determines if a given node is in the NodeMap.
   *
   * @param node The node to determine if it is in the map.
   *
   * @returns true if the Node is contained in the map, false otherwise.
   */


  NodeMap.prototype.has = function (node) {
    return NodeMap._nodeId(node) in this._nodes;
  };
  /**
   * Deletes a node from the NodeMap.
   *
   * @param node The node to delete.
   */


  NodeMap.prototype["delete"] = function (node) {
    var id = NodeMap._nodeId(node);

    delete this._nodes[id];
    this._values[id] = undefined;
  };
  /**
   * @returns an array that holds the nodes that are the keys of the map.
   */


  NodeMap.prototype.keys = function () {
    var nodes = [];

    for (var id in this._nodes) {
      if (!NodeMap._isIndex(id)) continue;
      nodes.push(this._nodes[id]);
    }

    return nodes;
  };

  NodeMap._ID_PROP = '__mutation_summary_node_map_id__';
  NodeMap._NEXT_ID = 1;
  return NodeMap;
}();

exports.NodeMap = NodeMap;
        },
        map: {}
      },49: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeChange = void 0;

var NodeChange =
/** @class */
function () {
  function NodeChange(node, childList, attributes, characterData, oldParentNode, added, attributeOldValues, characterDataOldValue) {
    if (childList === void 0) {
      childList = false;
    }

    if (attributes === void 0) {
      attributes = false;
    }

    if (characterData === void 0) {
      characterData = false;
    }

    if (oldParentNode === void 0) {
      oldParentNode = null;
    }

    if (added === void 0) {
      added = false;
    }

    if (attributeOldValues === void 0) {
      attributeOldValues = null;
    }

    if (characterDataOldValue === void 0) {
      characterDataOldValue = null;
    }

    this.node = node;
    this.childList = childList;
    this.attributes = attributes;
    this.characterData = characterData;
    this.oldParentNode = oldParentNode;
    this.added = added;
    this.attributeOldValues = attributeOldValues;
    this.characterDataOldValue = characterDataOldValue;
    this.isCaseInsensitive = this.node.nodeType === Node.ELEMENT_NODE && this.node instanceof HTMLElement && this.node.ownerDocument instanceof HTMLDocument;
  }

  NodeChange.prototype.getAttributeOldValue = function (name) {
    if (!this.attributeOldValues) return undefined;
    if (this.isCaseInsensitive) name = name.toLowerCase();
    return this.attributeOldValues[name];
  };

  NodeChange.prototype.getAttributeNamesMutated = function () {
    var names = [];
    if (!this.attributeOldValues) return names;

    for (var name_1 in this.attributeOldValues) {
      if (this.attributeOldValues.hasOwnProperty(name_1)) {
        names.push(name_1);
      }
    }

    return names;
  };

  NodeChange.prototype.attributeMutated = function (name, oldValue) {
    this.attributes = true;
    this.attributeOldValues = this.attributeOldValues || {};
    if (name in this.attributeOldValues) return;
    this.attributeOldValues[name] = oldValue;
  };

  NodeChange.prototype.characterDataMutated = function (oldValue) {
    if (this.characterData) return;
    this.characterData = true;
    this.characterDataOldValue = oldValue;
  }; // Note: is it possible to receive a removal followed by a removal. This
  // can occur if the removed node is added to an non-observed node, that
  // node is added to the observed area, and then the node removed from
  // it.


  NodeChange.prototype.removedFromParent = function (parent) {
    this.childList = true;
    if (this.added || this.oldParentNode) this.added = false;else this.oldParentNode = parent;
  };

  NodeChange.prototype.insertedIntoParent = function () {
    this.childList = true;
    this.added = true;
  }; // An node's oldParent is
  //   -its present parent, if its parentNode was not changed.
  //   -null if the first thing that happened to it was an add.
  //   -the node it was removed from if the first thing that happened to it
  //      was a remove.


  NodeChange.prototype.getOldParent = function () {
    if (this.childList) {
      if (this.oldParentNode) return this.oldParentNode;
      if (this.added) return null;
    }

    return this.node.parentNode;
  };

  return NodeChange;
}();

exports.NodeChange = NodeChange;
        },
        map: {}
      },50: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movement = void 0;
var Movement;

(function (Movement) {
  Movement[Movement["STAYED_OUT"] = 0] = "STAYED_OUT";
  Movement[Movement["ENTERED"] = 1] = "ENTERED";
  Movement[Movement["STAYED_IN"] = 2] = "STAYED_IN";
  Movement[Movement["REPARENTED"] = 3] = "REPARENTED";
  Movement[Movement["REORDERED"] = 4] = "REORDERED";
  Movement[Movement["EXITED"] = 5] = "EXITED";
})(Movement = exports.Movement || (exports.Movement = {}));
        },
        map: {}
      },51: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeMap = void 0;
/**
 * A helper class that maps from a DOM Node to an arbitrary value.
 */

var NodeMap =
/** @class */
function () {
  /**
   * Constructs a new and empty NodeMap.
   */
  function NodeMap() {
    this._nodes = [];
    this._values = [];
  }

  NodeMap._isIndex = function (s) {
    return +s === s >>> 0;
  };

  NodeMap._nodeId = function (node) {
    var id = node[NodeMap._ID_PROP];
    if (!id) id = node[NodeMap._ID_PROP] = NodeMap._NEXT_ID++;
    return id;
  };
  /**
   * Sets the value of a node within the map.
   * @param node  The node to set the value for.
   * @param value the value to associate with the node.
   */


  NodeMap.prototype.set = function (node, value) {
    var id = NodeMap._nodeId(node);

    this._nodes[id] = node;
    this._values[id] = value;
  };
  /**
   * Gets the value for the given node.
   *
   * @param node The node to get the value of.
   * @returns The value for the given node, or undefined if the node is not
   * present in the map.
   */


  NodeMap.prototype.get = function (node) {
    var id = NodeMap._nodeId(node);

    return id !== undefined ? this._values[id] : undefined;
  };
  /**
   * Determines if a given node is in the NodeMap.
   *
   * @param node The node to determine if it is in the map.
   *
   * @returns true if the Node is contained in the map, false otherwise.
   */


  NodeMap.prototype.has = function (node) {
    return NodeMap._nodeId(node) in this._nodes;
  };
  /**
   * Deletes a node from the NodeMap.
   *
   * @param node The node to delete.
   */


  NodeMap.prototype["delete"] = function (node) {
    var id = NodeMap._nodeId(node);

    delete this._nodes[id];
    this._values[id] = undefined;
  };
  /**
   * @returns an array that holds the nodes that are the keys of the map.
   */


  NodeMap.prototype.keys = function () {
    var nodes = [];

    for (var id in this._nodes) {
      if (!NodeMap._isIndex(id)) continue;
      nodes.push(this._nodes[id]);
    }

    return nodes;
  };

  NodeMap._ID_PROP = '__mutation_summary_node_map_id__';
  NodeMap._NEXT_ID = 1;
  return NodeMap;
}();

exports.NodeMap = NodeMap;
        },
        map: {}
      },52: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Qualifier = void 0;

var Qualifier =
/** @class */
function () {
  function Qualifier() {}

  Qualifier.prototype.matches = function (oldValue) {
    if (oldValue === null) return false;
    if (this.attrValue === undefined) return true;
    if (!this.contains) return this.attrValue == oldValue;
    var tokens = oldValue.split(' ');

    for (var i = 0; i < tokens.length; i++) {
      if (this.attrValue === tokens[i]) return true;
    }

    return false;
  };

  Qualifier.prototype.toString = function () {
    if (this.attrName === 'class' && this.contains) return '.' + this.attrValue;
    if (this.attrName === 'id' && !this.contains) return '#' + this.attrValue;
    if (this.contains) return '[' + this.attrName + '~=' + escapeQuotes(this.attrValue) + ']';
    if ('attrValue' in this) return '[' + this.attrName + '=' + escapeQuotes(this.attrValue) + ']'; //@ts-ignore

    return '[' + this.attrName + ']';
  };

  return Qualifier;
}();

exports.Qualifier = Qualifier;

function escapeQuotes(value) {
  return '"' + value.replace(/"/, '\\\"') + '"';
}
        },
        map: {}
      },53: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movement = void 0;
var Movement;

(function (Movement) {
  Movement[Movement["STAYED_OUT"] = 0] = "STAYED_OUT";
  Movement[Movement["ENTERED"] = 1] = "ENTERED";
  Movement[Movement["STAYED_IN"] = 2] = "STAYED_IN";
  Movement[Movement["REPARENTED"] = 3] = "REPARENTED";
  Movement[Movement["REORDERED"] = 4] = "REORDERED";
  Movement[Movement["EXITED"] = 5] = "EXITED";
})(Movement = exports.Movement || (exports.Movement = {}));
        },
        map: {}
      },54: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Summary = void 0;
/**
 * Represents a set of changes made to the DOM.
 */

var Summary =
/** @class */
function () {
  /**
   * Creates a new Summary instance given a [[MutationProjection]] and the
   * [[IQuery]] that was responsible for this summary being generated.
   *
   * @param projection The projection containing the changes.
   * @param query The query that cause the summary to be created.
   */
  function Summary(projection, query) {
    var _this = this;

    this.projection = projection;
    this.added = [];
    this.removed = [];
    this.reparented = query.all || query.element || query.characterData ? [] : undefined;
    this.reordered = query.all ? [] : undefined;
    projection.getChanged(this, query.elementFilter, query.characterData);

    if (query.all || query.attribute || query.attributeList) {
      var filter = query.attribute ? [query.attribute] : query.attributeList;
      var attributeChanged = projection.attributeChangedNodes(filter);

      if (query.attribute) {
        this.valueChanged = attributeChanged[query.attribute] || [];
      } else {
        this.attributeChanged = attributeChanged;

        if (query.attributeList) {
          query.attributeList.forEach(function (attrName) {
            if (!_this.attributeChanged.hasOwnProperty(attrName)) _this.attributeChanged[attrName] = [];
          });
        }
      }
    }

    if (query.all || query.characterData) {
      var characterDataChanged = projection.getCharacterDataChanged();
      if (query.characterData) this.valueChanged = characterDataChanged;else this.characterDataChanged = characterDataChanged;
    } // TODO this seems unnecessary.


    if (this.reordered) this.getOldPreviousSibling = projection.getOldPreviousSibling.bind(projection);
  }
  /**
   * Will retrieve the previous parentNode for and node. The node must be
   * contained in the removed element array, otherwise the function throws an
   * error.
   *
   * @param node The node to get the previous parent for.
   */


  Summary.prototype.getOldParentNode = function (node) {
    return this.projection.getOldParentNode(node);
  };
  /**
   * Retrieves the previous value of an attribute for an element. The Element
   * must be contained in the valueChanged element array, otherwise the
   * function throws an error.
   *
   * @param element The element to ge the old value for.
   * @param name The name off the attribute on the element to get the old value
   * for.
   */


  Summary.prototype.getOldAttribute = function (element, name) {
    return this.projection.getOldAttribute(element, name);
  };
  /**
   * Retrieves the previous text of `node`. `node` must be  contained in the
   * `valueChanged` node array, otherwise the function throws an error.
   *
   * @param node The node to get the old character data for.
   */


  Summary.prototype.getOldCharacterData = function (node) {
    return this.projection.getOldCharacterData(node);
  };
  /**
   * Retrieves the previous previousSibling for a node. The node must be
   * contained in the reordered element array, otherwise the function throws
   * an error.
   *
   * @param node The node to get the previous sibling for.
   */


  Summary.prototype.getOldPreviousSibling = function (node) {
    return this.projection.getOldPreviousSibling(node);
  };

  return Summary;
}();

exports.Summary = Summary;
        },
        map: {}
      },55: {
        factory: (exports, require) => {
          "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationProjection = void 0;
var TreeChanges_1 = require("./TreeChanges");
var NodeMap_1 = require("./NodeMap");
var Movement_1 = require("./Movement");
var ChildListChange_1 = require("./ChildListChange");
var MutationProjection = /** @class */ (function () {
    // TOOD(any)
    function MutationProjection(rootNode, mutations, selectors, calcReordered, calcOldPreviousSibling) {
        this.rootNode = rootNode;
        this.mutations = mutations;
        this.selectors = selectors;
        this.calcReordered = calcReordered;
        this.calcOldPreviousSibling = calcOldPreviousSibling;
        this.treeChanges = new TreeChanges_1.TreeChanges(rootNode, mutations);
        this.entered = [];
        this.exited = [];
        this.stayedIn = new NodeMap_1.NodeMap();
        this.visited = new NodeMap_1.NodeMap();
        this.childListChangeMap = undefined;
        this.characterDataOnly = undefined;
        this.matchCache = undefined;
        this.processMutations();
    }
    MutationProjection.prototype.processMutations = function () {
        if (!this.treeChanges.anyParentsChanged &&
            !this.treeChanges.anyAttributesChanged)
            return;
        var changedNodes = this.treeChanges.keys();
        for (var i = 0; i < changedNodes.length; i++) {
            this.visitNode(changedNodes[i], undefined);
        }
    };
    MutationProjection.prototype.visitNode = function (node, parentReachable) {
        if (this.visited.has(node))
            return;
        this.visited.set(node, true);
        var change = this.treeChanges.get(node);
        var reachable = parentReachable;
        // node inherits its parent's reachability change unless
        // its parentNode was mutated.
        if ((change && change.childList) || reachable == undefined)
            reachable = this.treeChanges.reachabilityChange(node);
        if (reachable === Movement_1.Movement.STAYED_OUT)
            return;
        // Cache match results for sub-patterns.
        this.matchabilityChange(node);
        if (reachable === Movement_1.Movement.ENTERED) {
            this.entered.push(node);
        }
        else if (reachable === Movement_1.Movement.EXITED) {
            this.exited.push(node);
            this.ensureHasOldPreviousSiblingIfNeeded(node);
        }
        else if (reachable === Movement_1.Movement.STAYED_IN) {
            var movement = Movement_1.Movement.STAYED_IN;
            if (change && change.childList) {
                if (change.oldParentNode !== node.parentNode) {
                    movement = Movement_1.Movement.REPARENTED;
                    this.ensureHasOldPreviousSiblingIfNeeded(node);
                }
                else if (this.calcReordered && this.wasReordered(node)) {
                    movement = Movement_1.Movement.REORDERED;
                }
            }
            this.stayedIn.set(node, movement);
        }
        if (reachable === Movement_1.Movement.STAYED_IN)
            return;
        // reachable === ENTERED || reachable === EXITED.
        for (var child = node.firstChild; child; child = child.nextSibling) {
            this.visitNode(child, reachable);
        }
    };
    MutationProjection.prototype.ensureHasOldPreviousSiblingIfNeeded = function (node) {
        if (!this.calcOldPreviousSibling)
            return;
        this.processChildlistChanges();
        var parentNode = node.parentNode;
        var nodeChange = this.treeChanges.get(node);
        if (nodeChange && nodeChange.oldParentNode)
            parentNode = nodeChange.oldParentNode;
        var change = this.childListChangeMap.get(parentNode);
        if (!change) {
            change = new ChildListChange_1.ChildListChange();
            this.childListChangeMap.set(parentNode, change);
        }
        if (!change.oldPrevious.has(node)) {
            change.oldPrevious.set(node, node.previousSibling);
        }
    };
    MutationProjection.prototype.getChanged = function (summary, selectors, characterDataOnly) {
        this.selectors = selectors;
        this.characterDataOnly = characterDataOnly;
        for (var i = 0; i < this.entered.length; i++) {
            var node = this.entered[i];
            var matchable = this.matchabilityChange(node);
            if (matchable === Movement_1.Movement.ENTERED || matchable === Movement_1.Movement.STAYED_IN)
                summary.added.push(node);
        }
        var stayedInNodes = this.stayedIn.keys();
        for (var i = 0; i < stayedInNodes.length; i++) {
            var node = stayedInNodes[i];
            var matchable = this.matchabilityChange(node);
            if (matchable === Movement_1.Movement.ENTERED) {
                summary.added.push(node);
            }
            else if (matchable === Movement_1.Movement.EXITED) {
                summary.removed.push(node);
            }
            else if (matchable === Movement_1.Movement.STAYED_IN && (summary.reparented || summary.reordered)) {
                var movement = this.stayedIn.get(node);
                if (summary.reparented && movement === Movement_1.Movement.REPARENTED)
                    summary.reparented.push(node);
                else if (summary.reordered && movement === Movement_1.Movement.REORDERED)
                    summary.reordered.push(node);
            }
        }
        for (var i = 0; i < this.exited.length; i++) {
            var node = this.exited[i];
            var matchable = this.matchabilityChange(node);
            if (matchable === Movement_1.Movement.EXITED || matchable === Movement_1.Movement.STAYED_IN)
                summary.removed.push(node);
        }
    };
    MutationProjection.prototype.getOldParentNode = function (node) {
        var change = this.treeChanges.get(node);
        if (change && change.childList)
            return change.oldParentNode ? change.oldParentNode : null;
        var reachabilityChange = this.treeChanges.reachabilityChange(node);
        if (reachabilityChange === Movement_1.Movement.STAYED_OUT || reachabilityChange === Movement_1.Movement.ENTERED)
            throw Error('getOldParentNode requested on invalid node.');
        return node.parentNode;
    };
    MutationProjection.prototype.getOldPreviousSibling = function (node) {
        var parentNode = node.parentNode;
        var nodeChange = this.treeChanges.get(node);
        if (nodeChange && nodeChange.oldParentNode)
            parentNode = nodeChange.oldParentNode;
        var change = this.childListChangeMap.get(parentNode);
        if (!change)
            throw Error('getOldPreviousSibling requested on invalid node.');
        return change.oldPrevious.get(node);
    };
    MutationProjection.prototype.getOldAttribute = function (element, attrName) {
        var change = this.treeChanges.get(element);
        if (!change || !change.attributes)
            throw Error('getOldAttribute requested on invalid node.');
        var value = change.getAttributeOldValue(attrName);
        if (value === undefined)
            throw Error('getOldAttribute requested for unchanged attribute name.');
        return value;
    };
    MutationProjection.prototype.attributeChangedNodes = function (includeAttributes) {
        if (!this.treeChanges.anyAttributesChanged)
            return {}; // No attributes mutations occurred.
        var attributeFilter;
        var caseInsensitiveFilter;
        if (includeAttributes) {
            attributeFilter = {};
            caseInsensitiveFilter = {};
            for (var i = 0; i < includeAttributes.length; i++) {
                var attrName = includeAttributes[i];
                attributeFilter[attrName] = true;
                caseInsensitiveFilter[attrName.toLowerCase()] = attrName;
            }
        }
        var result = {};
        var nodes = this.treeChanges.keys();
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var change = this.treeChanges.get(node);
            if (!change.attributes)
                continue;
            if (Movement_1.Movement.STAYED_IN !== this.treeChanges.reachabilityChange(node) ||
                Movement_1.Movement.STAYED_IN !== this.matchabilityChange(node)) {
                continue;
            }
            var element = node;
            var changedAttrNames = change.getAttributeNamesMutated();
            for (var j = 0; j < changedAttrNames.length; j++) {
                var attrName = changedAttrNames[j];
                if (attributeFilter &&
                    !attributeFilter[attrName] &&
                    !(change.isCaseInsensitive && caseInsensitiveFilter[attrName])) {
                    continue;
                }
                var oldValue = change.getAttributeOldValue(attrName);
                if (oldValue === element.getAttribute(attrName))
                    continue;
                if (caseInsensitiveFilter && change.isCaseInsensitive)
                    attrName = caseInsensitiveFilter[attrName];
                result[attrName] = result[attrName] || [];
                result[attrName].push(element);
            }
        }
        return result;
    };
    MutationProjection.prototype.getOldCharacterData = function (node) {
        var change = this.treeChanges.get(node);
        if (!change || !change.characterData)
            throw Error('getOldCharacterData requested on invalid node.');
        return change.characterDataOldValue;
    };
    MutationProjection.prototype.getCharacterDataChanged = function () {
        if (!this.treeChanges.anyCharacterDataChanged)
            return []; // No characterData mutations occurred.
        var nodes = this.treeChanges.keys();
        var result = [];
        for (var i = 0; i < nodes.length; i++) {
            var target = nodes[i];
            if (Movement_1.Movement.STAYED_IN !== this.treeChanges.reachabilityChange(target))
                continue;
            var change = this.treeChanges.get(target);
            if (!change.characterData ||
                target.textContent == change.characterDataOldValue)
                continue;
            result.push(target);
        }
        return result;
    };
    MutationProjection.prototype.computeMatchabilityChange = function (selector, el) {
        if (!this.matchCache)
            this.matchCache = [];
        if (!this.matchCache[selector.uid])
            this.matchCache[selector.uid] = new NodeMap_1.NodeMap();
        var cache = this.matchCache[selector.uid];
        var result = cache.get(el);
        if (result === undefined) {
            result = selector.matchabilityChange(el, this.treeChanges.get(el));
            cache.set(el, result);
        }
        return result;
    };
    MutationProjection.prototype.matchabilityChange = function (node) {
        var _this = this;
        // TODO(rafaelw): Include PI, CDATA?
        // Only include text nodes.
        if (this.characterDataOnly) {
            switch (node.nodeType) {
                case Node.COMMENT_NODE:
                case Node.TEXT_NODE:
                    return Movement_1.Movement.STAYED_IN;
                default:
                    return Movement_1.Movement.STAYED_OUT;
            }
        }
        // No element filter. Include all nodes.
        if (!this.selectors)
            return Movement_1.Movement.STAYED_IN;
        // Element filter. Exclude non-elements.
        if (node.nodeType !== Node.ELEMENT_NODE)
            return Movement_1.Movement.STAYED_OUT;
        var el = node;
        var matchChanges = this.selectors.map(function (selector) {
            return _this.computeMatchabilityChange(selector, el);
        });
        var accum = Movement_1.Movement.STAYED_OUT;
        var i = 0;
        while (accum !== Movement_1.Movement.STAYED_IN && i < matchChanges.length) {
            switch (matchChanges[i]) {
                case Movement_1.Movement.STAYED_IN:
                    accum = Movement_1.Movement.STAYED_IN;
                    break;
                case Movement_1.Movement.ENTERED:
                    if (accum === Movement_1.Movement.EXITED)
                        accum = Movement_1.Movement.STAYED_IN;
                    else
                        accum = Movement_1.Movement.ENTERED;
                    break;
                case Movement_1.Movement.EXITED:
                    if (accum === Movement_1.Movement.ENTERED)
                        accum = Movement_1.Movement.STAYED_IN;
                    else
                        accum = Movement_1.Movement.EXITED;
                    break;
            }
            i++;
        }
        return accum;
    };
    MutationProjection.prototype.getChildlistChange = function (el) {
        var change = this.childListChangeMap.get(el);
        if (!change) {
            change = new ChildListChange_1.ChildListChange();
            this.childListChangeMap.set(el, change);
        }
        return change;
    };
    MutationProjection.prototype.processChildlistChanges = function () {
        if (this.childListChangeMap)
            return;
        this.childListChangeMap = new NodeMap_1.NodeMap();
        var _loop_1 = function (i) {
            var mutation = this_1.mutations[i];
            if (mutation.type != 'childList')
                return "continue";
            if (this_1.treeChanges.reachabilityChange(mutation.target) !== Movement_1.Movement.STAYED_IN &&
                !this_1.calcOldPreviousSibling)
                return "continue";
            var change = this_1.getChildlistChange(mutation.target);
            var oldPrevious = mutation.previousSibling;
            var recordOldPrevious = function (node, previous) {
                if (!node ||
                    change.oldPrevious.has(node) ||
                    change.added.has(node) ||
                    change.maybeMoved.has(node))
                    return;
                if (previous &&
                    (change.added.has(previous) ||
                        change.maybeMoved.has(previous)))
                    return;
                change.oldPrevious.set(node, previous);
            };
            for (var j = 0; j < mutation.removedNodes.length; j++) {
                var node = mutation.removedNodes[j];
                recordOldPrevious(node, oldPrevious);
                if (change.added.has(node)) {
                    change.added.delete(node);
                }
                else {
                    change.removed.set(node, true);
                    change.maybeMoved.delete(node);
                }
                oldPrevious = node;
            }
            recordOldPrevious(mutation.nextSibling, oldPrevious);
            for (var j = 0; j < mutation.addedNodes.length; j++) {
                var node = mutation.addedNodes[j];
                if (change.removed.has(node)) {
                    change.removed.delete(node);
                    change.maybeMoved.set(node, true);
                }
                else {
                    change.added.set(node, true);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.mutations.length; i++) {
            _loop_1(i);
        }
    };
    MutationProjection.prototype.wasReordered = function (node) {
        if (!this.treeChanges.anyParentsChanged)
            return false;
        this.processChildlistChanges();
        var parentNode = node.parentNode;
        var nodeChange = this.treeChanges.get(node);
        if (nodeChange && nodeChange.oldParentNode)
            parentNode = nodeChange.oldParentNode;
        var change = this.childListChangeMap.get(parentNode);
        if (!change)
            return false;
        if (change.moved)
            return change.moved.get(node);
        change.moved = new NodeMap_1.NodeMap();
        var pendingMoveDecision = new NodeMap_1.NodeMap();
        function isMoved(node) {
            if (!node)
                return false;
            if (!change.maybeMoved.has(node))
                return false;
            var didMove = change.moved.get(node);
            if (didMove !== undefined)
                return didMove;
            if (pendingMoveDecision.has(node)) {
                didMove = true;
            }
            else {
                pendingMoveDecision.set(node, true);
                didMove = getPrevious(node) !== getOldPrevious(node);
            }
            if (pendingMoveDecision.has(node)) {
                pendingMoveDecision.delete(node);
                change.moved.set(node, didMove);
            }
            else {
                didMove = change.moved.get(node);
            }
            return didMove;
        }
        var oldPreviousCache = new NodeMap_1.NodeMap();
        function getOldPrevious(node) {
            var oldPrevious = oldPreviousCache.get(node);
            if (oldPrevious !== undefined)
                return oldPrevious;
            oldPrevious = change.oldPrevious.get(node);
            while (oldPrevious &&
                (change.removed.has(oldPrevious) || isMoved(oldPrevious))) {
                oldPrevious = getOldPrevious(oldPrevious);
            }
            if (oldPrevious === undefined)
                oldPrevious = node.previousSibling;
            oldPreviousCache.set(node, oldPrevious);
            return oldPrevious;
        }
        var previousCache = new NodeMap_1.NodeMap();
        function getPrevious(node) {
            if (previousCache.has(node))
                return previousCache.get(node);
            var previous = node.previousSibling;
            while (previous && (change.added.has(previous) || isMoved(previous)))
                previous = previous.previousSibling;
            previousCache.set(node, previous);
            return previous;
        }
        change.maybeMoved.keys().forEach(isMoved);
        return change.moved.get(node);
    };
    return MutationProjection;
}());
exports.MutationProjection = MutationProjection;
//# sourceMappingURL=MutationProjection.js.map
        },
        map: {"./TreeChanges":57,"./NodeMap":58,"./Movement":59,"./ChildListChange":60}
      },56: {
        factory: (exports, require) => {
          "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationSummaryOptionProcessor = void 0;
var Selector_1 = require("./Selector");
var MutationSummaryOptionProcessor = /** @class */ (function () {
    function MutationSummaryOptionProcessor() {
    }
    MutationSummaryOptionProcessor.createObserverOptions = function (queries) {
        var observerOptions = {
            childList: true,
            subtree: true
        };
        var attributeFilter;
        function observeAttributes(attributes) {
            if (observerOptions.attributes && !attributeFilter)
                return; // already observing all.
            observerOptions.attributes = true;
            observerOptions.attributeOldValue = true;
            if (!attributes) {
                // observe all.
                attributeFilter = undefined;
                return;
            }
            // add to observed.
            attributeFilter = attributeFilter || {};
            attributes.forEach(function (attribute) {
                attributeFilter[attribute] = true;
                attributeFilter[attribute.toLowerCase()] = true;
            });
        }
        queries.forEach(function (query) {
            if (query.characterData) {
                observerOptions.characterData = true;
                observerOptions.characterDataOldValue = true;
                return;
            }
            if (query.all) {
                observeAttributes();
                observerOptions.characterData = true;
                observerOptions.characterDataOldValue = true;
                return;
            }
            if (query.attribute) {
                observeAttributes([query.attribute.trim()]);
                return;
            }
            var attributes = MutationSummaryOptionProcessor._elementFilterAttributes(query.elementFilter).concat(query.attributeList || []);
            if (attributes.length)
                observeAttributes(attributes);
        });
        if (attributeFilter)
            observerOptions.attributeFilter = Object.keys(attributeFilter);
        return observerOptions;
    };
    MutationSummaryOptionProcessor.validateOptions = function (options) {
        for (var prop in options) {
            if (!(prop in MutationSummaryOptionProcessor._optionKeys))
                throw Error('Invalid option: ' + prop);
        }
        if (typeof options.callback !== 'function')
            throw Error('Invalid options: callback is required and must be a function');
        if (!options.queries || !options.queries.length)
            throw Error('Invalid options: queries must contain at least one query request object.');
        var opts = {
            callback: options.callback,
            rootNode: options.rootNode || document,
            observeOwnChanges: !!options.observeOwnChanges,
            oldPreviousSibling: !!options.oldPreviousSibling,
            queries: []
        };
        for (var i = 0; i < options.queries.length; i++) {
            var request = options.queries[i];
            // all
            if (request.all) {
                if (Object.keys(request).length > 1)
                    throw Error('Invalid request option. all has no options.');
                opts.queries.push({ all: true });
                continue;
            }
            // attribute
            if ('attribute' in request) {
                var query = {
                    attribute: MutationSummaryOptionProcessor._validateAttribute(request.attribute)
                };
                query.elementFilter = Selector_1.Selector.parseSelectors('*[' + query.attribute + ']');
                if (Object.keys(request).length > 1)
                    throw Error('Invalid request option. attribute has no options.');
                opts.queries.push(query);
                continue;
            }
            // element
            if ('element' in request) {
                var requestOptionCount = Object.keys(request).length;
                var query = {
                    element: request.element,
                    elementFilter: Selector_1.Selector.parseSelectors(request.element)
                };
                if (request.hasOwnProperty('elementAttributes')) {
                    query.attributeList = MutationSummaryOptionProcessor._validateElementAttributes(request.elementAttributes);
                    requestOptionCount--;
                }
                if (requestOptionCount > 1)
                    throw Error('Invalid request option. element only allows elementAttributes option.');
                opts.queries.push(query);
                continue;
            }
            // characterData
            if (request.characterData) {
                if (Object.keys(request).length > 1)
                    throw Error('Invalid request option. characterData has no options.');
                opts.queries.push({ characterData: true });
                continue;
            }
            throw Error('Invalid request option. Unknown query request.');
        }
        return opts;
    };
    MutationSummaryOptionProcessor._validateElementAttributes = function (attribs) {
        if (!attribs.trim().length)
            throw Error('Invalid request option: elementAttributes must contain at least one attribute.');
        var lowerAttributes = {};
        var attributes = {};
        var tokens = attribs.split(/\s+/);
        for (var i = 0; i < tokens.length; i++) {
            var name_1 = tokens[i];
            if (!name_1)
                continue;
            name_1 = MutationSummaryOptionProcessor._validateAttribute(name_1);
            var nameLower = name_1.toLowerCase();
            if (lowerAttributes[nameLower])
                throw Error('Invalid request option: observing multiple case variations of the same attribute is not supported.');
            attributes[name_1] = true;
            lowerAttributes[nameLower] = true;
        }
        return Object.keys(attributes);
    };
    MutationSummaryOptionProcessor._elementFilterAttributes = function (selectors) {
        var attributes = {};
        selectors.forEach(function (selector) {
            selector.qualifiers.forEach(function (qualifier) {
                attributes[qualifier.attrName] = true;
            });
        });
        return Object.keys(attributes);
    };
    MutationSummaryOptionProcessor._validateAttribute = function (attribute) {
        if (typeof attribute != 'string')
            throw Error('Invalid request option. attribute must be a non-zero length string.');
        attribute = attribute.trim();
        if (!attribute)
            throw Error('Invalid request option. attribute must be a non-zero length string.');
        if (!attribute.match(MutationSummaryOptionProcessor._attributeFilterPattern))
            throw Error('Invalid request option. invalid attribute name: ' + attribute);
        return attribute;
    };
    MutationSummaryOptionProcessor._attributeFilterPattern = /^([a-zA-Z:_]+[a-zA-Z0-9_\-:.]*)$/;
    MutationSummaryOptionProcessor._optionKeys = {
        'callback': true,
        'queries': true,
        'rootNode': true,
        'oldPreviousSibling': true,
        'observeOwnChanges': true
    };
    return MutationSummaryOptionProcessor;
}());
exports.MutationSummaryOptionProcessor = MutationSummaryOptionProcessor;
//# sourceMappingURL=MutationSummaryOptionProcessor.js.map
        },
        map: {"./Selector":61}
      },57: {
        factory: (exports, require) => {
          "use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeChanges = void 0;
var NodeMap_1 = require("./NodeMap");
var NodeChange_1 = require("./NodeChange");
var Movement_1 = require("./Movement");
var TreeChanges = /** @class */ (function (_super) {
    __extends(TreeChanges, _super);
    function TreeChanges(rootNode, mutations) {
        var _this = _super.call(this) || this;
        _this.rootNode = rootNode;
        _this.reachableCache = undefined;
        _this.wasReachableCache = undefined;
        _this.anyParentsChanged = false;
        _this.anyAttributesChanged = false;
        _this.anyCharacterDataChanged = false;
        for (var m = 0; m < mutations.length; m++) {
            var mutation = mutations[m];
            switch (mutation.type) {
                case 'childList':
                    _this.anyParentsChanged = true;
                    for (var i = 0; i < mutation.removedNodes.length; i++) {
                        var node = mutation.removedNodes[i];
                        _this.getChange(node).removedFromParent(mutation.target);
                    }
                    for (var i = 0; i < mutation.addedNodes.length; i++) {
                        var node = mutation.addedNodes[i];
                        _this.getChange(node).insertedIntoParent();
                    }
                    break;
                case 'attributes': {
                    _this.anyAttributesChanged = true;
                    var change = _this.getChange(mutation.target);
                    change.attributeMutated(mutation.attributeName, mutation.oldValue);
                    break;
                }
                case 'characterData': {
                    _this.anyCharacterDataChanged = true;
                    var change = _this.getChange(mutation.target);
                    change.characterDataMutated(mutation.oldValue);
                    break;
                }
            }
        }
        return _this;
    }
    TreeChanges.prototype.getChange = function (node) {
        var change = this.get(node);
        if (!change) {
            change = new NodeChange_1.NodeChange(node);
            this.set(node, change);
        }
        return change;
    };
    TreeChanges.prototype.getOldParent = function (node) {
        var change = this.get(node);
        return change ? change.getOldParent() : node.parentNode;
    };
    TreeChanges.prototype.getIsReachable = function (node) {
        if (node === this.rootNode)
            return true;
        if (!node)
            return false;
        this.reachableCache = this.reachableCache || new NodeMap_1.NodeMap();
        var isReachable = this.reachableCache.get(node);
        if (isReachable === undefined) {
            isReachable = this.getIsReachable(node.parentNode);
            this.reachableCache.set(node, isReachable);
        }
        return isReachable;
    };
    // A node wasReachable if its oldParent wasReachable.
    TreeChanges.prototype.getWasReachable = function (node) {
        if (node === this.rootNode)
            return true;
        if (!node)
            return false;
        this.wasReachableCache = this.wasReachableCache || new NodeMap_1.NodeMap();
        var wasReachable = this.wasReachableCache.get(node);
        if (wasReachable === undefined) {
            wasReachable = this.getWasReachable(this.getOldParent(node));
            this.wasReachableCache.set(node, wasReachable);
        }
        return wasReachable;
    };
    TreeChanges.prototype.reachabilityChange = function (node) {
        if (this.getIsReachable(node)) {
            return this.getWasReachable(node) ?
                Movement_1.Movement.STAYED_IN : Movement_1.Movement.ENTERED;
        }
        return this.getWasReachable(node) ?
            Movement_1.Movement.EXITED : Movement_1.Movement.STAYED_OUT;
    };
    return TreeChanges;
}(NodeMap_1.NodeMap));
exports.TreeChanges = TreeChanges;
//# sourceMappingURL=TreeChanges.js.map
        },
        map: {"./NodeMap":62,"./NodeChange":63,"./Movement":64}
      },58: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeMap = void 0;
/**
 * A helper class that maps from a DOM Node to an arbitrary value.
 */

var NodeMap =
/** @class */
function () {
  /**
   * Constructs a new and empty NodeMap.
   */
  function NodeMap() {
    this._nodes = [];
    this._values = [];
  }

  NodeMap._isIndex = function (s) {
    return +s === s >>> 0;
  };

  NodeMap._nodeId = function (node) {
    var id = node[NodeMap._ID_PROP];
    if (!id) id = node[NodeMap._ID_PROP] = NodeMap._NEXT_ID++;
    return id;
  };
  /**
   * Sets the value of a node within the map.
   * @param node  The node to set the value for.
   * @param value the value to associate with the node.
   */


  NodeMap.prototype.set = function (node, value) {
    var id = NodeMap._nodeId(node);

    this._nodes[id] = node;
    this._values[id] = value;
  };
  /**
   * Gets the value for the given node.
   *
   * @param node The node to get the value of.
   * @returns The value for the given node, or undefined if the node is not
   * present in the map.
   */


  NodeMap.prototype.get = function (node) {
    var id = NodeMap._nodeId(node);

    return id !== undefined ? this._values[id] : undefined;
  };
  /**
   * Determines if a given node is in the NodeMap.
   *
   * @param node The node to determine if it is in the map.
   *
   * @returns true if the Node is contained in the map, false otherwise.
   */


  NodeMap.prototype.has = function (node) {
    return NodeMap._nodeId(node) in this._nodes;
  };
  /**
   * Deletes a node from the NodeMap.
   *
   * @param node The node to delete.
   */


  NodeMap.prototype["delete"] = function (node) {
    var id = NodeMap._nodeId(node);

    delete this._nodes[id];
    this._values[id] = undefined;
  };
  /**
   * @returns an array that holds the nodes that are the keys of the map.
   */


  NodeMap.prototype.keys = function () {
    var nodes = [];

    for (var id in this._nodes) {
      if (!NodeMap._isIndex(id)) continue;
      nodes.push(this._nodes[id]);
    }

    return nodes;
  };

  NodeMap._ID_PROP = '__mutation_summary_node_map_id__';
  NodeMap._NEXT_ID = 1;
  return NodeMap;
}();

exports.NodeMap = NodeMap;
        },
        map: {}
      },59: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movement = void 0;
var Movement;

(function (Movement) {
  Movement[Movement["STAYED_OUT"] = 0] = "STAYED_OUT";
  Movement[Movement["ENTERED"] = 1] = "ENTERED";
  Movement[Movement["STAYED_IN"] = 2] = "STAYED_IN";
  Movement[Movement["REPARENTED"] = 3] = "REPARENTED";
  Movement[Movement["REORDERED"] = 4] = "REORDERED";
  Movement[Movement["EXITED"] = 5] = "EXITED";
})(Movement = exports.Movement || (exports.Movement = {}));
        },
        map: {}
      },60: {
        factory: (exports, require) => {
          "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildListChange = void 0;
var NodeMap_1 = require("./NodeMap");
var ChildListChange = /** @class */ (function () {
    function ChildListChange() {
        this.added = new NodeMap_1.NodeMap();
        this.removed = new NodeMap_1.NodeMap();
        this.maybeMoved = new NodeMap_1.NodeMap();
        this.oldPrevious = new NodeMap_1.NodeMap();
        this.moved = undefined;
    }
    return ChildListChange;
}());
exports.ChildListChange = ChildListChange;
//# sourceMappingURL=ChildListChange.js.map
        },
        map: {"./NodeMap":65}
      },61: {
        factory: (exports, require) => {
          "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selector = void 0;
// TODO(rafaelw): Allow ':' and '.' as valid name characters.
var Qualifier_1 = require("./Qualifier");
var Movement_1 = require("./Movement");
var validNameInitialChar = /[a-zA-Z_]+/;
var validNameNonInitialChar = /[a-zA-Z0-9_\-]+/;
var Selector = /** @class */ (function () {
    function Selector() {
        this.uid = Selector.nextUid++;
        this.qualifiers = [];
    }
    Object.defineProperty(Selector.prototype, "caseInsensitiveTagName", {
        get: function () {
            return this.tagName.toUpperCase();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Selector.prototype, "selectorString", {
        get: function () {
            return this.tagName + this.qualifiers.join('');
        },
        enumerable: false,
        configurable: true
    });
    Selector.prototype.isMatching = function (el) {
        return el[Selector.matchesSelector](this.selectorString);
    };
    Selector.prototype.wasMatching = function (el, change, isMatching) {
        if (!change || !change.attributes)
            return isMatching;
        var tagName = change.isCaseInsensitive ? this.caseInsensitiveTagName : this.tagName;
        if (tagName !== '*' && tagName !== el.tagName)
            return false;
        var attributeOldValues = [];
        var anyChanged = false;
        for (var i = 0; i < this.qualifiers.length; i++) {
            var qualifier = this.qualifiers[i];
            var oldValue = change.getAttributeOldValue(qualifier.attrName);
            attributeOldValues.push(oldValue);
            anyChanged = anyChanged || (oldValue !== undefined);
        }
        if (!anyChanged)
            return isMatching;
        for (var i = 0; i < this.qualifiers.length; i++) {
            var qualifier = this.qualifiers[i];
            var oldValue = attributeOldValues[i];
            if (oldValue === undefined)
                oldValue = el.getAttribute(qualifier.attrName);
            if (!qualifier.matches(oldValue))
                return false;
        }
        return true;
    };
    Selector.prototype.matchabilityChange = function (el, change) {
        var isMatching = this.isMatching(el);
        if (isMatching)
            return this.wasMatching(el, change, isMatching) ? Movement_1.Movement.STAYED_IN : Movement_1.Movement.ENTERED;
        else
            return this.wasMatching(el, change, isMatching) ? Movement_1.Movement.EXITED : Movement_1.Movement.STAYED_OUT;
    };
    Selector.parseSelectors = function (input) {
        var selectors = [];
        var currentSelector;
        var currentQualifier;
        function newSelector() {
            if (currentSelector) {
                if (currentQualifier) {
                    currentSelector.qualifiers.push(currentQualifier);
                    currentQualifier = undefined;
                }
                selectors.push(currentSelector);
            }
            currentSelector = new Selector();
        }
        function newQualifier() {
            if (currentQualifier)
                currentSelector.qualifiers.push(currentQualifier);
            currentQualifier = new Qualifier_1.Qualifier();
        }
        var WHITESPACE = /\s/;
        var valueQuoteChar = undefined;
        var SYNTAX_ERROR = 'Invalid or unsupported selector syntax.';
        var SELECTOR = 1;
        var TAG_NAME = 2;
        var QUALIFIER = 3;
        var QUALIFIER_NAME_FIRST_CHAR = 4;
        var QUALIFIER_NAME = 5;
        var ATTR_NAME_FIRST_CHAR = 6;
        var ATTR_NAME = 7;
        var EQUIV_OR_ATTR_QUAL_END = 8;
        var EQUAL = 9;
        var ATTR_QUAL_END = 10;
        var VALUE_FIRST_CHAR = 11;
        var VALUE = 12;
        var QUOTED_VALUE = 13;
        var SELECTOR_SEPARATOR = 14;
        var state = SELECTOR;
        var i = 0;
        while (i < input.length) {
            var c = input[i++];
            switch (state) {
                case SELECTOR:
                    if (c.match(validNameInitialChar)) {
                        newSelector();
                        currentSelector.tagName = c;
                        state = TAG_NAME;
                        break;
                    }
                    if (c == '*') {
                        newSelector();
                        currentSelector.tagName = '*';
                        state = QUALIFIER;
                        break;
                    }
                    if (c == '.') {
                        newSelector();
                        newQualifier();
                        currentSelector.tagName = '*';
                        currentQualifier.attrName = 'class';
                        currentQualifier.contains = true;
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '#') {
                        newSelector();
                        newQualifier();
                        currentSelector.tagName = '*';
                        currentQualifier.attrName = 'id';
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '[') {
                        newSelector();
                        newQualifier();
                        currentSelector.tagName = '*';
                        currentQualifier.attrName = '';
                        state = ATTR_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c.match(WHITESPACE))
                        break;
                    throw Error(SYNTAX_ERROR);
                case TAG_NAME:
                    if (c.match(validNameNonInitialChar)) {
                        currentSelector.tagName += c;
                        break;
                    }
                    if (c == '.') {
                        newQualifier();
                        currentQualifier.attrName = 'class';
                        currentQualifier.contains = true;
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '#') {
                        newQualifier();
                        currentQualifier.attrName = 'id';
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '[') {
                        newQualifier();
                        currentQualifier.attrName = '';
                        state = ATTR_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c.match(WHITESPACE)) {
                        state = SELECTOR_SEPARATOR;
                        break;
                    }
                    if (c == ',') {
                        state = SELECTOR;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case QUALIFIER:
                    if (c == '.') {
                        newQualifier();
                        currentQualifier.attrName = 'class';
                        currentQualifier.contains = true;
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '#') {
                        newQualifier();
                        currentQualifier.attrName = 'id';
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '[') {
                        newQualifier();
                        currentQualifier.attrName = '';
                        state = ATTR_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c.match(WHITESPACE)) {
                        state = SELECTOR_SEPARATOR;
                        break;
                    }
                    if (c == ',') {
                        state = SELECTOR;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case QUALIFIER_NAME_FIRST_CHAR:
                    if (c.match(validNameInitialChar)) {
                        currentQualifier.attrValue = c;
                        state = QUALIFIER_NAME;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case QUALIFIER_NAME:
                    if (c.match(validNameNonInitialChar)) {
                        currentQualifier.attrValue += c;
                        break;
                    }
                    if (c == '.') {
                        newQualifier();
                        currentQualifier.attrName = 'class';
                        currentQualifier.contains = true;
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '#') {
                        newQualifier();
                        currentQualifier.attrName = 'id';
                        state = QUALIFIER_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c == '[') {
                        newQualifier();
                        state = ATTR_NAME_FIRST_CHAR;
                        break;
                    }
                    if (c.match(WHITESPACE)) {
                        state = SELECTOR_SEPARATOR;
                        break;
                    }
                    if (c == ',') {
                        state = SELECTOR;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case ATTR_NAME_FIRST_CHAR:
                    if (c.match(validNameInitialChar)) {
                        currentQualifier.attrName = c;
                        state = ATTR_NAME;
                        break;
                    }
                    if (c.match(WHITESPACE))
                        break;
                    throw Error(SYNTAX_ERROR);
                case ATTR_NAME:
                    if (c.match(validNameNonInitialChar)) {
                        currentQualifier.attrName += c;
                        break;
                    }
                    if (c.match(WHITESPACE)) {
                        state = EQUIV_OR_ATTR_QUAL_END;
                        break;
                    }
                    if (c == '~') {
                        currentQualifier.contains = true;
                        state = EQUAL;
                        break;
                    }
                    if (c == '=') {
                        currentQualifier.attrValue = '';
                        state = VALUE_FIRST_CHAR;
                        break;
                    }
                    if (c == ']') {
                        state = QUALIFIER;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case EQUIV_OR_ATTR_QUAL_END:
                    if (c == '~') {
                        currentQualifier.contains = true;
                        state = EQUAL;
                        break;
                    }
                    if (c == '=') {
                        currentQualifier.attrValue = '';
                        state = VALUE_FIRST_CHAR;
                        break;
                    }
                    if (c == ']') {
                        state = QUALIFIER;
                        break;
                    }
                    if (c.match(WHITESPACE))
                        break;
                    throw Error(SYNTAX_ERROR);
                case EQUAL:
                    if (c == '=') {
                        currentQualifier.attrValue = '';
                        state = VALUE_FIRST_CHAR;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
                case ATTR_QUAL_END:
                    if (c == ']') {
                        state = QUALIFIER;
                        break;
                    }
                    if (c.match(WHITESPACE))
                        break;
                    throw Error(SYNTAX_ERROR);
                case VALUE_FIRST_CHAR:
                    if (c.match(WHITESPACE))
                        break;
                    if (c == '"' || c == "'") {
                        valueQuoteChar = c;
                        state = QUOTED_VALUE;
                        break;
                    }
                    currentQualifier.attrValue += c;
                    state = VALUE;
                    break;
                case VALUE:
                    if (c.match(WHITESPACE)) {
                        state = ATTR_QUAL_END;
                        break;
                    }
                    if (c == ']') {
                        state = QUALIFIER;
                        break;
                    }
                    if (c == "'" || c == '"')
                        throw Error(SYNTAX_ERROR);
                    currentQualifier.attrValue += c;
                    break;
                case QUOTED_VALUE:
                    if (c == valueQuoteChar) {
                        state = ATTR_QUAL_END;
                        break;
                    }
                    currentQualifier.attrValue += c;
                    break;
                case SELECTOR_SEPARATOR:
                    if (c.match(WHITESPACE))
                        break;
                    if (c == ',') {
                        state = SELECTOR;
                        break;
                    }
                    throw Error(SYNTAX_ERROR);
            }
        }
        switch (state) {
            case SELECTOR:
            case TAG_NAME:
            case QUALIFIER:
            case QUALIFIER_NAME:
            case SELECTOR_SEPARATOR:
                // Valid end states.
                newSelector();
                break;
            default:
                throw Error(SYNTAX_ERROR);
        }
        if (!selectors.length)
            throw Error(SYNTAX_ERROR);
        return selectors;
    };
    Selector.nextUid = 1;
    Selector.matchesSelector = "matches";
    return Selector;
}());
exports.Selector = Selector;
//# sourceMappingURL=Selector.js.map
        },
        map: {"./Qualifier":66,"./Movement":67}
      },62: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeMap = void 0;
/**
 * A helper class that maps from a DOM Node to an arbitrary value.
 */

var NodeMap =
/** @class */
function () {
  /**
   * Constructs a new and empty NodeMap.
   */
  function NodeMap() {
    this._nodes = [];
    this._values = [];
  }

  NodeMap._isIndex = function (s) {
    return +s === s >>> 0;
  };

  NodeMap._nodeId = function (node) {
    var id = node[NodeMap._ID_PROP];
    if (!id) id = node[NodeMap._ID_PROP] = NodeMap._NEXT_ID++;
    return id;
  };
  /**
   * Sets the value of a node within the map.
   * @param node  The node to set the value for.
   * @param value the value to associate with the node.
   */


  NodeMap.prototype.set = function (node, value) {
    var id = NodeMap._nodeId(node);

    this._nodes[id] = node;
    this._values[id] = value;
  };
  /**
   * Gets the value for the given node.
   *
   * @param node The node to get the value of.
   * @returns The value for the given node, or undefined if the node is not
   * present in the map.
   */


  NodeMap.prototype.get = function (node) {
    var id = NodeMap._nodeId(node);

    return id !== undefined ? this._values[id] : undefined;
  };
  /**
   * Determines if a given node is in the NodeMap.
   *
   * @param node The node to determine if it is in the map.
   *
   * @returns true if the Node is contained in the map, false otherwise.
   */


  NodeMap.prototype.has = function (node) {
    return NodeMap._nodeId(node) in this._nodes;
  };
  /**
   * Deletes a node from the NodeMap.
   *
   * @param node The node to delete.
   */


  NodeMap.prototype["delete"] = function (node) {
    var id = NodeMap._nodeId(node);

    delete this._nodes[id];
    this._values[id] = undefined;
  };
  /**
   * @returns an array that holds the nodes that are the keys of the map.
   */


  NodeMap.prototype.keys = function () {
    var nodes = [];

    for (var id in this._nodes) {
      if (!NodeMap._isIndex(id)) continue;
      nodes.push(this._nodes[id]);
    }

    return nodes;
  };

  NodeMap._ID_PROP = '__mutation_summary_node_map_id__';
  NodeMap._NEXT_ID = 1;
  return NodeMap;
}();

exports.NodeMap = NodeMap;
        },
        map: {}
      },63: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeChange = void 0;

var NodeChange =
/** @class */
function () {
  function NodeChange(node, childList, attributes, characterData, oldParentNode, added, attributeOldValues, characterDataOldValue) {
    if (childList === void 0) {
      childList = false;
    }

    if (attributes === void 0) {
      attributes = false;
    }

    if (characterData === void 0) {
      characterData = false;
    }

    if (oldParentNode === void 0) {
      oldParentNode = null;
    }

    if (added === void 0) {
      added = false;
    }

    if (attributeOldValues === void 0) {
      attributeOldValues = null;
    }

    if (characterDataOldValue === void 0) {
      characterDataOldValue = null;
    }

    this.node = node;
    this.childList = childList;
    this.attributes = attributes;
    this.characterData = characterData;
    this.oldParentNode = oldParentNode;
    this.added = added;
    this.attributeOldValues = attributeOldValues;
    this.characterDataOldValue = characterDataOldValue;
    this.isCaseInsensitive = this.node.nodeType === Node.ELEMENT_NODE && this.node instanceof HTMLElement && this.node.ownerDocument instanceof HTMLDocument;
  }

  NodeChange.prototype.getAttributeOldValue = function (name) {
    if (!this.attributeOldValues) return undefined;
    if (this.isCaseInsensitive) name = name.toLowerCase();
    return this.attributeOldValues[name];
  };

  NodeChange.prototype.getAttributeNamesMutated = function () {
    var names = [];
    if (!this.attributeOldValues) return names;

    for (var name_1 in this.attributeOldValues) {
      if (this.attributeOldValues.hasOwnProperty(name_1)) {
        names.push(name_1);
      }
    }

    return names;
  };

  NodeChange.prototype.attributeMutated = function (name, oldValue) {
    this.attributes = true;
    this.attributeOldValues = this.attributeOldValues || {};
    if (name in this.attributeOldValues) return;
    this.attributeOldValues[name] = oldValue;
  };

  NodeChange.prototype.characterDataMutated = function (oldValue) {
    if (this.characterData) return;
    this.characterData = true;
    this.characterDataOldValue = oldValue;
  }; // Note: is it possible to receive a removal followed by a removal. This
  // can occur if the removed node is added to an non-observed node, that
  // node is added to the observed area, and then the node removed from
  // it.


  NodeChange.prototype.removedFromParent = function (parent) {
    this.childList = true;
    if (this.added || this.oldParentNode) this.added = false;else this.oldParentNode = parent;
  };

  NodeChange.prototype.insertedIntoParent = function () {
    this.childList = true;
    this.added = true;
  }; // An node's oldParent is
  //   -its present parent, if its parentNode was not changed.
  //   -null if the first thing that happened to it was an add.
  //   -the node it was removed from if the first thing that happened to it
  //      was a remove.


  NodeChange.prototype.getOldParent = function () {
    if (this.childList) {
      if (this.oldParentNode) return this.oldParentNode;
      if (this.added) return null;
    }

    return this.node.parentNode;
  };

  return NodeChange;
}();

exports.NodeChange = NodeChange;
        },
        map: {}
      },64: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movement = void 0;
var Movement;

(function (Movement) {
  Movement[Movement["STAYED_OUT"] = 0] = "STAYED_OUT";
  Movement[Movement["ENTERED"] = 1] = "ENTERED";
  Movement[Movement["STAYED_IN"] = 2] = "STAYED_IN";
  Movement[Movement["REPARENTED"] = 3] = "REPARENTED";
  Movement[Movement["REORDERED"] = 4] = "REORDERED";
  Movement[Movement["EXITED"] = 5] = "EXITED";
})(Movement = exports.Movement || (exports.Movement = {}));
        },
        map: {}
      },65: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeMap = void 0;
/**
 * A helper class that maps from a DOM Node to an arbitrary value.
 */

var NodeMap =
/** @class */
function () {
  /**
   * Constructs a new and empty NodeMap.
   */
  function NodeMap() {
    this._nodes = [];
    this._values = [];
  }

  NodeMap._isIndex = function (s) {
    return +s === s >>> 0;
  };

  NodeMap._nodeId = function (node) {
    var id = node[NodeMap._ID_PROP];
    if (!id) id = node[NodeMap._ID_PROP] = NodeMap._NEXT_ID++;
    return id;
  };
  /**
   * Sets the value of a node within the map.
   * @param node  The node to set the value for.
   * @param value the value to associate with the node.
   */


  NodeMap.prototype.set = function (node, value) {
    var id = NodeMap._nodeId(node);

    this._nodes[id] = node;
    this._values[id] = value;
  };
  /**
   * Gets the value for the given node.
   *
   * @param node The node to get the value of.
   * @returns The value for the given node, or undefined if the node is not
   * present in the map.
   */


  NodeMap.prototype.get = function (node) {
    var id = NodeMap._nodeId(node);

    return id !== undefined ? this._values[id] : undefined;
  };
  /**
   * Determines if a given node is in the NodeMap.
   *
   * @param node The node to determine if it is in the map.
   *
   * @returns true if the Node is contained in the map, false otherwise.
   */


  NodeMap.prototype.has = function (node) {
    return NodeMap._nodeId(node) in this._nodes;
  };
  /**
   * Deletes a node from the NodeMap.
   *
   * @param node The node to delete.
   */


  NodeMap.prototype["delete"] = function (node) {
    var id = NodeMap._nodeId(node);

    delete this._nodes[id];
    this._values[id] = undefined;
  };
  /**
   * @returns an array that holds the nodes that are the keys of the map.
   */


  NodeMap.prototype.keys = function () {
    var nodes = [];

    for (var id in this._nodes) {
      if (!NodeMap._isIndex(id)) continue;
      nodes.push(this._nodes[id]);
    }

    return nodes;
  };

  NodeMap._ID_PROP = '__mutation_summary_node_map_id__';
  NodeMap._NEXT_ID = 1;
  return NodeMap;
}();

exports.NodeMap = NodeMap;
        },
        map: {}
      },66: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Qualifier = void 0;

var Qualifier =
/** @class */
function () {
  function Qualifier() {}

  Qualifier.prototype.matches = function (oldValue) {
    if (oldValue === null) return false;
    if (this.attrValue === undefined) return true;
    if (!this.contains) return this.attrValue == oldValue;
    var tokens = oldValue.split(' ');

    for (var i = 0; i < tokens.length; i++) {
      if (this.attrValue === tokens[i]) return true;
    }

    return false;
  };

  Qualifier.prototype.toString = function () {
    if (this.attrName === 'class' && this.contains) return '.' + this.attrValue;
    if (this.attrName === 'id' && !this.contains) return '#' + this.attrValue;
    if (this.contains) return '[' + this.attrName + '~=' + escapeQuotes(this.attrValue) + ']';
    if ('attrValue' in this) return '[' + this.attrName + '=' + escapeQuotes(this.attrValue) + ']'; //@ts-ignore

    return '[' + this.attrName + ']';
  };

  return Qualifier;
}();

exports.Qualifier = Qualifier;

function escapeQuotes(value) {
  return '"' + value.replace(/"/, '\\\"') + '"';
}
        },
        map: {}
      },67: {
        factory: (exports, require) => {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movement = void 0;
var Movement;

(function (Movement) {
  Movement[Movement["STAYED_OUT"] = 0] = "STAYED_OUT";
  Movement[Movement["ENTERED"] = 1] = "ENTERED";
  Movement[Movement["STAYED_IN"] = 2] = "STAYED_IN";
  Movement[Movement["REPARENTED"] = 3] = "REPARENTED";
  Movement[Movement["REORDERED"] = 4] = "REORDERED";
  Movement[Movement["EXITED"] = 5] = "EXITED";
})(Movement = exports.Movement || (exports.Movement = {}));
        },
        map: {}
      }})
    