/**
 * @license
 * quadtree2 - v0.0.1
 * Copyright (c) 2013-2014 burninggramma
 * https://github.com/burninggramma/quadtree2.js
 *
 * Compiled: 2014-02-13
 *
 * quadtree2 is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
!function a(b, c, d) {
    function e(g, h) {
        if (!c[g]) {
            if (!b[g]) {
                var i = "function" == typeof require && require;
                if (!h && i) return i(g, !0);
                if (f) return f(g, !0);
                throw new Error("Cannot find module '" + g + "'");
            }
            var j = c[g] = {
                exports: {}
            };
            b[g][0].call(j.exports, function(a) {
                var c = b[g][1][a];
                return e(c ? c : a);
            }, j, j.exports, a, b, c, d);
        }
        return c[g].exports;
    }
    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
    return e;
}({
    1: [ function(a) {
        Quadtree2 = a("./src/quadtree2");
    }, {
        "./src/quadtree2": 3
    } ],
    2: [ function(a, b) {
        !function c(a, d, e) {
            function f(a, b) {
                return this instanceof f ? (g(a) ? (b = a[1], a = a[0]) : "object" == typeof a && a && (b = a.y, a = a.x), 
                this.x = f.clean(a || 0), void (this.y = f.clean(b || 0))) : new f(a, b);
            }
            var g = function(a) {
                return "[object Array]" === Object.prototype.toString.call(a);
            };
            f.prototype = {
                change: function(a) {
                    if (a) this.observers ? this.observers.push(a) : this.observers = [ a ]; else if (this.observers) for (var b = this.observers.length - 1; b >= 0; b--) this.observers[b](this);
                    return this;
                },
                ignore: function(a) {
                    if (this.observers) for (var b = this.observers, c = b.length; c--; ) b[c] === a && b.splice(c, 1);
                    return this;
                },
                set: function(a, b, c) {
                    return "number" != typeof a && (c = b, b = a.y, a = a.x), this.x === a && this.y === b ? this : (this.x = f.clean(a), 
                    this.y = f.clean(b), c !== !1 ? this.change() : void 0);
                },
                zero: function() {
                    return this.set(0, 0);
                },
                clone: function() {
                    return new this.constructor(this.x, this.y);
                },
                negate: function(a) {
                    return a ? new this.constructor(-this.x, -this.y) : this.set(-this.x, -this.y);
                },
                add: function(a, b) {
                    return b ? new this.constructor(this.x + a.x, this.y + a.y) : (this.x += a.x, this.y += a.y, this.change());
                },
                subtract: function(a, b) {
                    return b ? new this.constructor(this.x - a.x, this.y - a.y) : (this.x -= a.x, this.y -= a.y, this.change());
                },
                multiply: function(a, b) {
                    var c, d;
                    return "number" != typeof a ? (c = a.x, d = a.y) : c = d = a, b ? new this.constructor(this.x * c, this.y * d) : this.set(this.x * c, this.y * d);
                },
                rotate: function(a, b, c) {
                    var d, e, f = this.x, g = this.y, h = Math.cos(a), i = Math.sin(a);
                    return b = b ? -1 : 1, d = h * f - b * i * g, e = b * i * f + h * g, c ? new this.constructor(d, e) : this.set(d, e);
                },
                length: function() {
                    var a = this.x, b = this.y;
                    return Math.sqrt(a * a + b * b);
                },
                lengthSquared: function() {
                    var a = this.x, b = this.y;
                    return a * a + b * b;
                },
                distance: function(a) {
                    var b = this.x - a.x, c = this.y - a.y;
                    return Math.sqrt(b * b + c * c);
                },
                normalize: function(a) {
                    var b = this.length(), c = b < Number.MIN_VALUE ? 0 : 1 / b;
                    return a ? new this.constructor(this.x * c, this.y * c) : this.set(this.x * c, this.y * c);
                },
                equal: function(a, b) {
                    return b === e && (b = a.y, a = a.x), f.clean(a) === this.x && f.clean(b) === this.y;
                },
                abs: function(a) {
                    var b = Math.abs(this.x), c = Math.abs(this.y);
                    return a ? new this.constructor(b, c) : this.set(b, c);
                },
                min: function(a, b) {
                    var c = this.x, d = this.y, e = a.x, f = a.y, g = e > c ? c : e, h = f > d ? d : f;
                    return b ? new this.constructor(g, h) : this.set(g, h);
                },
                max: function(a, b) {
                    var c = this.x, d = this.y, e = a.x, f = a.y, g = c > e ? c : e, h = d > f ? d : f;
                    return b ? new this.constructor(g, h) : this.set(g, h);
                },
                clamp: function(a, b, c) {
                    var d = this.min(b, !0).max(a);
                    return c ? d : this.set(d.x, d.y);
                },
                lerp: function(a, b) {
                    return this.add(a.subtract(this, !0).multiply(b), !0);
                },
                skew: function() {
                    return new this.constructor(-this.y, this.x);
                },
                dot: function(a) {
                    return f.clean(this.x * a.x + a.y * this.y);
                },
                perpDot: function(a) {
                    return f.clean(this.x * a.y - this.y * a.x);
                },
                angleTo: function(a) {
                    return Math.atan2(this.perpDot(a), this.dot(a));
                },
                divide: function(a, b) {
                    var c, d;
                    if ("number" != typeof a ? (c = a.x, d = a.y) : c = d = a, 0 === c || 0 === d) throw new Error("division by zero");
                    if (isNaN(c) || isNaN(d)) throw new Error("NaN detected");
                    return b ? new this.constructor(this.x / c, this.y / d) : this.set(this.x / c, this.y / d);
                },
                isPointOnLine: function(a, b) {
                    return (a.y - this.y) * (a.x - b.x) === (a.y - b.y) * (a.x - this.x);
                },
                toArray: function() {
                    return [ this.x, this.y ];
                },
                fromArray: function(a) {
                    return this.set(a[0], a[1]);
                },
                toJSON: function() {
                    return {
                        x: this.x,
                        y: this.y
                    };
                },
                toString: function() {
                    return "(" + this.x + ", " + this.y + ")";
                },
                constructor: f
            }, f.fromArray = function(a, b) {
                return new (b || f)(a[0], a[1]);
            }, f.precision = d || 8;
            var h = Math.pow(10, f.precision);
            return f.clean = a || function(a) {
                if (isNaN(a)) throw new Error("NaN detected");
                if (!isFinite(a)) throw new Error("Infinity detected");
                return Math.round(a) === a ? a : Math.round(a * h) / h;
            }, f.inject = c, a || (f.fast = c(function(a) {
                return a;
            }), "undefined" != typeof b && "object" == typeof b.exports ? b.exports = f : window.Vec2 = window.Vec2 || f), 
            f;
        }();
    }, {} ],
    3: [ function(a, b) {
        var c, d = a("vec2"), e = a("./quadtree2helper"), f = a("./quadtree2validator"), g = a("./quadtree2quadrant");
        c = function(a, b, c) {
            var h, i = {
                root_: new g(new d(0, 0)),
                objects_: {},
                ids_: 0,
                autoId_: !0,
                inited_: !1,
                limit_: void 0,
                size_: void 0,
                shapes_: {},
                quadrants_: {}
            }, j = new f(), k = {
                p: "pos_",
                r: "rad_",
                R: "rot_",
                id: "id_"
            }, l = {
                data: {
                    necessary: {
                        size_: j.isVec2,
                        limit_: j.isNumber
                    }
                },
                k: {
                    necessary: {
                        p: j.isVec2
                    },
                    c: {
                        necessary: {
                            r: j.isNumber
                        }
                    },
                    r: {
                        necessary: {
                            R: j.isNumber
                        }
                    }
                }
            }, m = {
                nextId: function() {
                    return ++i.ids_;
                },
                hasCollision: function(a, b) {
                    return ("c" !== m.getObjShape(a) || "c" !== m.getObjShape(b)) && e.thrower("NIY", "Collision handling does not work for rects YET!"), 
                    a[k.r] + b[k.r] > a[k.p].distance(b[k.p]);
                },
                getSmallestQuadrants: function(a, b, c, d) {
                    var e, f;
                    if (b || (b = i.root_), c || (c = {}), f = b.intersectingChildren(a[k.p], a[k.r]), f.length === b.getChildCount()) (d || b.intersects(a[k.p], a[k.r])) && (c[b.id_] = b); else for (e in f) m.getSmallestQuadrants(a, f[e], c, !0);
                    return c;
                },
                removeObjectFromQuadrants: function(a, b) {
                    var c;
                    void 0 === b && (b = i.quadrants_[a[k.id]]);
                    for (c in b) m.removeObjectFromQuadrant(a, b[c]);
                },
                removeObjectFromQuadrant: function(a, b) {
                    b.removeObject(a[k.id]), delete i.quadrants_[a[k.id]][b.id_], !b.hasChildren() && b.parent_ && m.refactorSubtree(b.parent_);
                },
                refactorSubtree: function(a) {
                    var b, c, d, e, f;
                    if (!a.refactoring_) {
                        for (b = 0; b < a.children_.length; b++) if (e = a.children_[b], e.hasChildren()) return;
                        if (d = a.getObjectCount(!0, !0), !(d > i.limit_)) {
                            for (a.refactoring_ = !0, b = 0; b < a.children_.length; b++) {
                                e = a.children_[b];
                                for (c in e.objects_) f = e.objects_[c], m.removeObjectFromQuadrant(f, e), m.addObjectToQuadrant(f, a);
                            }
                            a.looseChildren(), a.refactoring_ = !1, a.parent_ && m.refactorSubtree(a.parent_);
                        }
                    }
                },
                updateObjectQuadrants: function(a) {
                    var b, c = i.quadrants_[a[k.id]], d = m.getSmallestQuadrants(a), f = Object.keys(c), g = Object.keys(d), h = e.arrayDiffs(f, g), j = h[0], l = h[1];
                    for (b = 0; b < l.length; b++) m.populateSubtree(a, d[l[b]]);
                    for (b = 0; b < j.length; b++) c[j[b]] && m.removeObjectFromQuadrant(a, c[j[b]]);
                },
                addObjectToQuadrant: function(a, b) {
                    var c = a[k.id];
                    void 0 === i.quadrants_[c] && (i.quadrants_[c] = {}), i.quadrants_[c][b.id_] = b, b.addObject(c, a);
                },
                populateSubtree: function(a, b) {
                    var c, d, e;
                    if (b || (b = i.root_), b.hasChildren()) {
                        d = m.getSmallestQuadrants(a, b);
                        for (c in d) {
                            if (d[c] === b) return void m.addObjectToQuadrant(a, b);
                            m.populateSubtree(a, d[c]);
                        }
                    } else if (b.getObjectCount() < i.limit_) m.addObjectToQuadrant(a, b); else {
                        b.makeChildren(), e = b.removeObjects(), e[a[k.id]] = a;
                        for (c in e) m.populateSubtree(e[c], b);
                    }
                },
                getObjectCollisionsInQuadrant: function(a) {
                    var b, c, d = a.getObjects(!0), e = [], f = [];
                    for (b in d) {
                        f.push(b);
                        for (c in d) -1 === f.indexOf(c) && m.hasCollision(d[b], d[c]) && e.push([ d[b], d[c] ]);
                    }
                    return e;
                },
                init: function() {
                    j.byCallbackObject(i, l.data.necessary), i.root_.setSize(i.size_.clone()), i.inited_ = !0;
                },
                checkInit: function(a) {
                    return a && !i.inited_ && m.init(), i.inited_;
                },
                checkObjectKeys: function(a) {
                    j.isDefined(a[k.id], k.id), j.hasNoKey(i.objects_, a[k.id], k.id), j.byCallbackObject(a, l.k.necessary, k), 
                    j.byCallbackObject(a, l.k[m.getObjShape(a)].necessary, k);
                },
                setObjId: function(a) {
                    i.autoId_ && (a[k.id] = m.nextId());
                },
                setObjShape: function(a) {
                    var b = void 0 === a[k.r], c = b ? k.R : k.r;
                    j.isDefined(a[c], c), i.shapes_[a[k.id]] = b ? "r" : "c";
                },
                getObjShape: function(a) {
                    return i.shapes_[a[k.id]];
                }
            }, n = {
                getQuadrants: function() {
                    return i.root_.getChildren(!0, [ i.root_ ]);
                },
                getLeafQuadrants: function() {
                    return n.getQuadrants().filter(function(a) {
                        return !a.hasChildren();
                    });
                }
            }, o = {
                getLimit: function() {
                    return i.limit_;
                },
                setLimit: function(a) {
                    void 0 !== a && (j.isNumber(a, "limit_"), i.limit_ = a);
                },
                setObjectKey: function(a, b) {
                    j.fnFalse(m.checkInit), void 0 !== b && (j.hasKey(k, a, a), j.isString(b, a), "id" === a && (i.autoId_ = !1), 
                    k[a] = b);
                },
                getSize: function() {
                    return i.size_.clone();
                },
                setSize: function(a) {
                    void 0 !== a && (j.isVec2(a, "size_"), i.size_ = a.clone());
                },
                addObjects: function(a) {
                    a.forEach(function(a) {
                        o.addObject(a);
                    });
                },
                addObject: function(a) {
                    j.isDefined(a, "obj"), j.isObject(a, "obj"), m.checkInit(!0), m.setObjId(a), m.setObjShape(a), m.checkObjectKeys(a), 
                    m.populateSubtree(a), i.objects_[a[k.id]] = a;
                },
                removeObject: function(a) {
                    m.removeObjectFromQuadrants(i.objects_[a]), delete i.objects_[a];
                },
                updateObjects: function(a) {
                    var b;
                    for (b = 0; b < a.length; b++) m.updateObjectQuadrants(i.objects_[a[b]]);
                },
                getCollidedObjects: function() {
                    return m.checkInit(!0), m.getObjectCollisionsInQuadrant(i.root_);
                },
                getCount: function() {
                    return Object.keys(i.objects_).length;
                },
                getQuadrantCount: function() {
                    return 1 + i.root_.getChildCount(!0);
                },
                getQuadrantObjectCount: function() {
                    return i.root_.getObjectCount(!0);
                },
                debug: function(a) {
                    var b;
                    if (void 0 !== a) {
                        i.debug_ = a, m.checkInit(!0);
                        for (b in n) this[b] = n[b];
                        for (b in m) this[b] = m[b];
                    }
                    return i.debug_;
                }
            };
            for (h in o) this[h] = o[h];
            this.setSize(a), this.setLimit(b), this.setObjectKey("id", c);
        }, b.exports = c;
    }, {
        "./quadtree2helper": 4,
        "./quadtree2quadrant": 5,
        "./quadtree2validator": 6,
        vec2: 2
    } ],
    4: [ function(a, b) {
        var c = {
            fnName: function(a) {
                var b = a.toString();
                return b = b.substr("function ".length), b = b.substr(0, b.indexOf("("));
            },
            thrower: function(a, b, c) {
                var d = a;
                throw c && (d += "_" + c), b && (d += " - "), b && c && (d += c + ": "), b && (d += b), new Error(d);
            },
            compare: function(a, b) {
                return a > b;
            },
            arrayDiffs: function(a, b) {
                var c = 0, d = 0, e = [], f = [];
                for (a.sort(this.compare), b.sort(this.compare); c < a.length && d < b.length; ) a[c] !== b[d] ? a[c] < b[d] ? (e.push(a[c]), 
                c++) : (f.push(b[d]), d++) : (c++, d++);
                return c < a.length ? e.push.apply(e, a.slice(c, a.length)) : f.push.apply(f, b.slice(d, b.length)), 
                [ e, f ];
            }
        };
        b.exports = c;
    }, {} ],
    5: [ function(a, b) {
        var c = function(a, b, c, d) {
            this.leftTop_ = a.clone(), this.children_ = [], this.objects_ = {}, this.objectCount_ = 0, this.id_ = c || 0, 
            this.parent_ = d, this.refactoring_ = !1, this.setSize(b);
        };
        c.prototype = {
            setSize: function(a) {
                a && (this.size_ = a, this.rad_ = a.multiply(.5, !0), this.center_ = this.leftTop_.add(this.rad_, !0), 
                this.leftBot_ = this.leftTop_.clone(), this.leftBot_.y += a.y, this.rightTop_ = this.leftTop_.clone(), 
                this.rightTop_.x += a.x, this.rightBot_ = this.leftTop_.add(a, !0), this.leftMid_ = this.center_.clone(), 
                this.leftMid_.x = this.leftTop_.x, this.topMid_ = this.center_.clone(), this.topMid_.y = this.leftTop_.y);
            },
            makeChildren: function() {
                return this.children_.length > 0 ? !1 : (this.children_.push(new c(this.leftTop_, this.rad_, ++this.id_, this), new c(this.topMid_, this.rad_, ++this.id_, this), new c(this.leftMid_, this.rad_, ++this.id_, this), new c(this.center_, this.rad_, ++this.id_, this)), 
                !0);
            },
            looseChildren: function() {
                this.children_ = [];
            },
            addObjects: function(a) {
                var b;
                for (b in a) this.addObject(b, a[b]);
            },
            addObject: function(a, b) {
                this.objectCount_++, this.objects_[a] = b;
            },
            removeObjects: function() {
                var a = this.objects_;
                return this.objects_ = {}, this.objectCount_ = 0, a;
            },
            removeObject: function(a) {
                var b = this.objects_[a];
                return this.objectCount_--, delete this.objects_[a], b;
            },
            getObjectCount: function(a, b) {
                var c = this.objectCount_;
                return a && this.children_.forEach(function(d) {
                    c += d.getObjectCount(!b && a);
                }), c;
            },
            intersectingChildren: function(a, b) {
                return this.children_.filter(function(c) {
                    return c.intersects(a, b);
                });
            },
            intersects: function(a, b) {
                var c = a.subtract(this.center_, !0).abs();
                return c.x > this.rad_.x + b ? !1 : c.y > this.rad_.y + b ? !1 : c.x <= this.rad_.x ? !0 : c.y <= this.rad_.y ? !0 : (cornerDistSq = Math.pow(c.x, 2) + Math.pow(c.y, 2), 
                cornerDistSq <= Math.pow(b, 2));
            },
            hasChildren: function() {
                return 0 !== this.getChildCount();
            },
            getChildCount: function(a) {
                var b = this.children_.length;
                return a && this.children_.forEach(function(c) {
                    b += c.getChildCount(a);
                }), b;
            },
            getChildren: function(a, b) {
                return b || (b = []), b.push.apply(b, this.children_), a && this.children_.forEach(function(c) {
                    c.getChildren(a, b);
                }), b;
            },
            getObjects: function(a, b) {
                var c;
                b || (b = {});
                for (c in this.objects_) b[c] = this.objects_[c];
                return a && this.children_.forEach(function(c) {
                    c.getObjects(a, b);
                }), b;
            }
        }, b.exports = c;
    }, {} ],
    6: [ function(a, b) {
        var c = (a("vec2"), a("./quadtree2helper")), d = function() {};
        d.prototype = {
            isNumber: function(a, b) {
                "number" != typeof a && c.thrower("NaN", "Not a Number", b);
            },
            isString: function(a, b) {
                "string" == typeof a || a instanceof String || c.thrower("NaS", "Not a String", b);
            },
            isVec2: function(a, b) {
                var d = !1;
                d = "object" != typeof a || void 0 === a.x || void 0 === a.y, d && c.thrower("NaV", "Not a Vec2", b);
            },
            isDefined: function(a, b) {
                void 0 === a && c.thrower("ND", "Not defined", b);
            },
            isObject: function(a, b) {
                "object" != typeof a && c.thrower("NaO", "Not an Object", b);
            },
            hasKey: function(a, b, d) {
                -1 === Object.keys(a).indexOf(b.toString()) && c.thrower("OhnK", "Object has no key", d + b);
            },
            hasNoKey: function(a, b, d) {
                -1 !== Object.keys(a).indexOf(b.toString()) && c.thrower("OhK", "Object has key", d + b);
            },
            fnFalse: function(a) {
                a() && c.thrower("FarT", "function already returns true", c.fnName(a));
            },
            byCallbackObject: function(a, b, c) {
                var d;
                for (d in b) void 0 !== c ? b[d](a[c[d]], c[d]) : b[d](a[d], d);
            }
        }, b.exports = d;
    }, {
        "./quadtree2helper": 4,
        vec2: 2
    } ]
}, {}, [ 1 ]);