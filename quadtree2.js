/**
 * @license
 * quadtree2 - v0.6.0
 * Copyright (c) 2013-2014 p1100i
 * https://github.com/p1100i/quadtree2.js
 *
 * Compiled: 2017-01-28
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
                var j = new Error("Cannot find module '" + g + "'");
                throw j.code = "MODULE_NOT_FOUND", j;
            }
            var k = c[g] = {
                exports: {}
            };
            b[g][0].call(k.exports, function(a) {
                var c = b[g][1][a];
                return e(c ? c : a);
            }, k, k.exports, a, b, c, d);
        }
        return c[g].exports;
    }
    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
    return e;
}({
    1: [ function(a, b, c) {
        Quadtree2 = a("./src/quadtree2");
    }, {
        "./src/quadtree2": 3
    } ],
    2: [ function(a, b, c) {
        !function a(c, d, e) {
            function f(a, b) {
                return this instanceof f ? (g(a) ? (b = a[1], a = a[0]) : "object" == typeof a && a && (b = a.y, a = a.x), 
                this.x = f.clean(a || 0), void (this.y = f.clean(b || 0))) : new f(a, b);
            }
            var g = function(a) {
                return "[object Array]" === Object.prototype.toString.call(a);
            };
            f.prototype = {
                change: function(a) {
                    if ("function" == typeof a) this.observers ? this.observers.push(a) : this.observers = [ a ]; else if (this.observers && this.observers.length) for (var b = this.observers.length - 1; b >= 0; b--) this.observers[b](this, a);
                    return this;
                },
                ignore: function(a) {
                    if (this.observers) if (a) for (var b = this.observers, c = b.length; c--; ) b[c] === a && b.splice(c, 1); else this.observers = [];
                    return this;
                },
                set: function(a, b, c) {
                    if ("number" != typeof a && (c = b, b = a.y, a = a.x), this.x === a && this.y === b) return this;
                    var d = null;
                    return c !== !1 && this.observers && this.observers.length && (d = this.clone()), this.x = f.clean(a), 
                    this.y = f.clean(b), c !== !1 ? this.change(d) : void 0;
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
                add: function(a, b, c) {
                    return "number" != typeof a && (c = b, g(a) ? (b = a[1], a = a[0]) : (b = a.y, a = a.x)), a += this.x, 
                    b += this.y, c ? new this.constructor(a, b) : this.set(a, b);
                },
                subtract: function(a, b, c) {
                    return "number" != typeof a && (c = b, g(a) ? (b = a[1], a = a[0]) : (b = a.y, a = a.x)), a = this.x - a, 
                    b = this.y - b, c ? new this.constructor(a, b) : this.set(a, b);
                },
                multiply: function(a, b, c) {
                    return "number" != typeof a ? (c = b, g(a) ? (b = a[1], a = a[0]) : (b = a.y, a = a.x)) : "number" != typeof b && (c = b, 
                    b = a), a *= this.x, b *= this.y, c ? new this.constructor(a, b) : this.set(a, b);
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
                nearest: function(a) {
                    for (var b, c = Number.MAX_VALUE, d = null, e = a.length - 1; e >= 0; e--) b = this.distance(a[e]), 
                    b <= c && (c = b, d = a[e]);
                    return d;
                },
                normalize: function(a) {
                    var b = this.length(), c = b < Number.MIN_VALUE ? 0 : 1 / b;
                    return a ? new this.constructor(this.x * c, this.y * c) : this.set(this.x * c, this.y * c);
                },
                equal: function(a, b) {
                    return "number" != typeof a && (g(a) ? (b = a[1], a = a[0]) : (b = a.y, a = a.x)), f.clean(a) === this.x && f.clean(b) === this.y;
                },
                abs: function(a) {
                    var b = Math.abs(this.x), c = Math.abs(this.y);
                    return a ? new this.constructor(b, c) : this.set(b, c);
                },
                min: function(a, b) {
                    var c = this.x, d = this.y, e = a.x, f = a.y, g = c < e ? c : e, h = d < f ? d : f;
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
                lerp: function(a, b, c) {
                    return this.add(a.subtract(this, !0).multiply(b), c);
                },
                skew: function(a) {
                    return a ? new this.constructor(-this.y, this.x) : this.set(-this.y, this.x);
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
                divide: function(a, b, c) {
                    if ("number" != typeof a ? (c = b, g(a) ? (b = a[1], a = a[0]) : (b = a.y, a = a.x)) : "number" != typeof b && (c = b, 
                    b = a), 0 === a || 0 === b) throw new Error("division by zero");
                    if (isNaN(a) || isNaN(b)) throw new Error("NaN detected");
                    return c ? new this.constructor(this.x / a, this.y / b) : this.set(this.x / a, this.y / b);
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
            return f.clean = c || function(a) {
                if (isNaN(a)) throw new Error("NaN detected");
                if (!isFinite(a)) throw new Error("Infinity detected");
                return Math.round(a) === a ? a : Math.round(a * h) / h;
            }, f.inject = a, c || (f.fast = a(function(a) {
                return a;
            }), "undefined" != typeof b && "object" == typeof b.exports ? b.exports = f : window.Vec2 = window.Vec2 || f), 
            f;
        }();
    }, {} ],
    3: [ function(a, b, c) {
        var d, e = a("vec2"), f = a("./quadtree2helper"), g = a("./quadtree2inspector"), h = a("./quadtree2validator"), i = a("./quadtree2quadrant");
        d = function(a) {
            var b, c, d, j, k, l, m = this, n = "id", o = "pos", p = "rad", q = 1, r = 1, s = new h(), t = {}, u = {}, v = function() {
                var a = r;
                return r += 4, a;
            }, w = function a(b, c, d) {
                if (c.intersects(b[o], b[p])) {
                    var e, f = c.getChildren(), g = f && f.length;
                    if (g) for (e = 0; e < g; e++) a(b, f[e], d); else d[c.id_] = c;
                    return d;
                }
            }, x = function(a, b) {
                b.removeObject(a[n]), delete u[a[n]][b.id_], b.parent_ && !b.hasChildren() && I(b.parent_);
            }, y = function(a, b) {
                var c;
                void 0 === b && (b = u[a[n]]);
                for (c in b) x(a, b[c]);
            }, z = function(a, b) {
                var c = a[n];
                void 0 === u[c] && (u[c] = {}), u[c][b.id_] = b, b.addObject(c, a);
            }, A = function(a) {
                var b, c, d = a.removeObjects([], 1);
                for (b = 0; b < d.length; b++) c = d[b], delete u[c.object[n]][c.quadrant.id_];
                return d;
            }, B = function a(b, d) {
                var e, f, g, h, i;
                if (d || (d = c), d.hasChildren()) {
                    g = w(b, d, {});
                    for (f in g) a(b, g[f]);
                } else if (d.size_.x <= b[p] || d.getObjectCount() < k || d.size_.x < l.x) z(b, d); else for (d.makeChildren(v()), 
                h = A(d), h.push({
                    object: b,
                    quadrant: d
                }), e = 0; e < h.length; e++) i = h[e], a(i.object, i.quadrant);
            }, C = function(a) {
                var b = a[n];
                if (q && !b && (b = a[n] = q++), t[b]) throw new Error("usedId");
                return t[b] = a, B(a), a;
            }, D = function(a) {
                return a.forEach(C);
            }, E = function(a) {
                var b = a[n];
                y(a), delete t[b];
            }, F = function(a) {
                var b = t[a];
                return E(b);
            }, G = function(a) {
                return a.forEach(E);
            }, H = function(a) {
                var b, c, d, e, f, g = u[a[n]], h = {
                    objects: {},
                    quadrants: {}
                };
                for (c in g) for (d = g[c], d.getObjectsUp(h), e = d.children_, f = e.length, b = 0; b < f; b++) e[b].getObjectsDown(h);
                return delete h.objects[a[n]], h.objects;
            }, I = function a(b) {
                var c, d, e, f, g;
                if (!b.refactoring_) {
                    for (c = 0; c < b.children_.length; c++) if (f = b.children_[c], f.hasChildren()) return;
                    if (e = b.getObjectCountForLimit(), !(e > k)) {
                        for (b.refactoring_ = !0, c = 0; c < b.children_.length; c++) {
                            f = b.children_[c];
                            for (d in f.objects_) g = f.objects_[d], x(g, f), z(g, b);
                        }
                        b.looseChildren(), b.refactoring_ = !1, b.parent_ && a(b.parent_);
                    }
                }
            }, J = function(a) {
                var b, c, d = H(a);
                for (b in d) c = d[b], console.log(c), c[o].distance(a[o]) > c[p] + a[p] && delete d[b];
                return d;
            }, K = function(a) {
                var b, d = u[a[n]], e = w(a, c, {}), g = f.getIdsOfObjects(d), h = f.getIdsOfObjects(e), i = f.arrayDiffs(g, h), j = i[0], k = i[1];
                for (b = 0; b < k.length; b++) B(a, e[k[b]]);
                for (b = 0; b < j.length; b++) d[j[b]] && x(a, d[j[b]]);
            }, L = function(a) {
                return K(a);
            }, M = function(a) {
                var b = t[a];
                return L(b);
            }, N = function(a) {
                return a.forEach(L);
            }, O = function() {
                var b = {
                    root: c,
                    idKey: n,
                    config: a,
                    objects: t,
                    objectQuadrants: u
                };
                return d || (b.qt = m, d = new g(b), delete b.qt), d;
            }, P = function(a, b) {
                "id" === a ? (q = 0, n = b) : "pos" === a ? o = b : "rad" === a && (p = b);
            }, Q = function(a) {
                b = a.size, k = a.objectLimit || 4, j = a.levelLimit || 6, s.isVec2(b, "size"), s.isNumber(k, "objectLimit"), 
                s.isNumber(j, "levelLimit"), c = new i(new e(0, 0), b.clone(), 1), l = b.clone().divide(Math.pow(2, j));
            };
            return Q(a), this.addObject = C, this.addObjects = D, this.getCollidables = H, this.getCollidings = J, 
            this.updateObject = L, this.updateObjectById = M, this.updateObjects = N, this.removeObject = E, this.removeObjectById = F, 
            this.removeObjects = G, this.setKey = P, this.inspect = O, this;
        }, b.exports = d;
    }, {
        "./quadtree2helper": 4,
        "./quadtree2inspector": 5,
        "./quadtree2quadrant": 6,
        "./quadtree2validator": 7,
        vec2: 2
    } ],
    4: [ function(a, b, c) {
        var d = {
            fnName: function(a) {
                var b = a.toString();
                return b = b.substr("function ".length), b = b.substr(0, b.indexOf("("));
            },
            thrower: function(a, b, c) {
                var d = a;
                throw c && (d += "_" + c), b && (d += " - "), b && c && (d += c + ": "), b && (d += b), new Error(d);
            },
            getIdsOfObjects: function(a) {
                var b = [];
                for (var c in a) b.push(a[c].id_);
                return b;
            },
            compare: function(a, b) {
                return a - b;
            },
            arrayDiffs: function(a, b) {
                var c = 0, d = 0, e = [], f = [];
                for (a.sort(this.compare), b.sort(this.compare); c < a.length && d < b.length; ) a[c] !== b[d] ? a[c] < b[d] ? (e.push(a[c]), 
                c++) : (f.push(b[d]), d++) : (c++, d++);
                return c < a.length ? e.push.apply(e, a.slice(c, a.length)) : f.push.apply(f, b.slice(d, b.length)), 
                [ e, f ];
            }
        };
        b.exports = d;
    }, {} ],
    5: [ function(a, b, c) {
        var d;
        a("vec2");
        d = function(a) {
            var b, c, d, e, f, g, h = "", i = function(a) {
                return a ? Object.keys(g[a[d]]).length : 1 + c.getChildCount(!0);
            }, j = function() {
                return Object.keys(f).length;
            }, k = function(a, b) {
                return b ? b * a : a;
            }, l = function(a, b) {
                return "new Vec2(" + k(a.x, b) + ", " + k(a.y, b) + ")";
            }, m = function(a, b) {
                var c = "", d = l(a.pos, b);
                return c += "o = {\n  pos : " + d + ",\n  rad : " + k(a.rad, b) + " \n};\n\n", c += "qt.addObject(o);\n", 
                c += "os[o.id] = o;\n\n";
            }, n = function(a) {
                return "qt.removeObjectById(" + a.id + ");\n\n";
            }, o = function(a, b) {
                var c = "";
                return c += "o = os[" + a.id + "];\n", c += "o.pos.x = " + b.x + ";\n", c += "o.pos.y = " + b.y + ";\n\n";
            }, p = function(a) {
                return "qt.updateObjectById(" + a.id + ");\n\n";
            }, q = function(a) {
                var b = "os = {};\n\n", c = l(e.size, a);
                return b += "qt = new Quadtree2({\n  size         : " + c + ",\n  objectLimit  : " + e.objectLimit + ",\n  levelLimit   : " + e.levelLimit + " \n});\n\n";
            }, r = function(a) {
                var b, c, d = q(a);
                for (b in f) c = f[b], d += m(c, a);
                return d;
            }, s = function(a) {
                h += a;
            }, t = function() {
                return q() + h;
            }, u = function(a, c) {
                var d = b[a];
                b[a] = function(a) {
                    s(c(a)), d(a);
                };
            }, v = function(a) {
                b = a.qt, c = a.root, d = a.idKey, e = a.config, f = a.objects, g = a.objectQuadrants, u("addObject", m), 
                u("removeObject", n), u("updateObject", p);
            };
            v(a), this.data = a, this.addLog = s, this.getLog = t, this.getObjectCount = j, this.getQuadrantCount = i, 
            this.getRebuildingCommand = r, this.stringifyVec2ConstructorCall = l, this.stringifyAddObjectCall = m, 
            this.stringifyMoveObjectCall = o, this.stringifyUpdateObjectCall = p, this.stringifyConstructorCall = q;
        }, b.exports = d;
    }, {
        vec2: 2
    } ],
    6: [ function(a, b, c) {
        var d = function(a, b, c, d) {
            this.leftTop_ = a.clone(), this.children_ = [], this.objects_ = {}, this.objectCount_ = 0, this.id_ = c || 0, 
            this.parent_ = d, this.refactoring_ = !1, this.setSize(b);
        };
        d.prototype = {
            setSize: function(a) {
                a && (this.size_ = a, this.rad_ = a.multiply(.5, !0), this.center_ = this.leftTop_.add(this.rad_, !0), 
                this.leftBot_ = this.leftTop_.clone(), this.leftBot_.y += a.y, this.rightTop_ = this.leftTop_.clone(), 
                this.rightTop_.x += a.x, this.rightBot_ = this.leftTop_.add(a, !0), this.leftMid_ = this.center_.clone(), 
                this.leftMid_.x = this.leftTop_.x, this.topMid_ = this.center_.clone(), this.topMid_.y = this.leftTop_.y);
            },
            makeChildren: function(a) {
                return !(this.children_.length > 0) && (this.children_.push(new d(this.leftTop_, this.rad_, ++a, this), new d(this.topMid_, this.rad_, ++a, this), new d(this.leftMid_, this.rad_, ++a, this), new d(this.center_, this.rad_, ++a, this)), 
                a);
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
            removeObjects: function(a, b) {
                var c;
                a || (a = []);
                for (c in this.objects_) a.push({
                    object: this.objects_[c],
                    quadrant: this
                }), delete this.objects_[c];
                return this.objectCount_ = 0, b && 1 !== b || this.parent_ && this.parent_.removeObjects(a, 1), b && b !== -1 || this.children_.forEach(function(b) {
                    b.removeObjects(a, -1);
                }), a;
            },
            removeObject: function(a) {
                var b = this.objects_[a];
                return this.objectCount_--, delete this.objects_[a], b;
            },
            getObjectCountForLimit: function() {
                var a, b, c = {};
                for (b in this.objects_) c[b] = !0;
                for (a = 0; a < this.children_.length; a++) for (b in this.children_[a].objects_) c[b] = !0;
                return Object.keys(c).length;
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
                var c, d = a.subtract(this.center_, !0).abs();
                return !(d.x > this.rad_.x + b) && (!(d.y > this.rad_.y + b) && (d.x <= this.rad_.x || (d.y <= this.rad_.y || (c = Math.pow(d.x - this.rad_.x, 2) + Math.pow(d.y - this.rad_.y, 2), 
                c <= Math.pow(b, 2)))));
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
            getObjectsUp: function(a) {
                var b;
                if (!a.quadrants[this.id_]) {
                    a.quadrants[this.id_] = !0;
                    for (b in this.objects_) a.objects[b] = this.objects_[b];
                    this.parent_ && this.parent_.getObjectsUp(a);
                }
            },
            getObjectsDown: function(a) {
                var b;
                if (!a.quadrants[this.id_]) {
                    a.quadrants[this.id_] = !0;
                    for (b in this.objects_) a.objects[b] = this.objects_[b];
                    for (b = 0; b < this.children_.length; b++) this.children_[b].getObjectsDown(a);
                    return a;
                }
            }
        }, b.exports = d;
    }, {} ],
    7: [ function(a, b, c) {
        var d = (a("vec2"), a("./quadtree2helper")), e = function() {};
        e.prototype = {
            isNumber: function(a, b) {
                "number" != typeof a && d.thrower("NaN", "Not a Number", b);
            },
            isString: function(a, b) {
                "string" == typeof a || a instanceof String || d.thrower("NaS", "Not a String", b);
            },
            isVec2: function(a, b) {
                var c = !1;
                c = "object" != typeof a || void 0 === a.x || void 0 === a.y, c && d.thrower("NaV", "Not a Vec2", b);
            },
            isDefined: function(a, b) {
                void 0 === a && d.thrower("ND", "Not defined", b);
            },
            isObject: function(a, b) {
                "object" != typeof a && d.thrower("NaO", "Not an Object", b);
            },
            hasKey: function(a, b, c) {
                this.isDefined(a, "obj"), Object.keys(a).indexOf(b.toString()) === -1 && d.thrower("OhnK", "Object has no key", c + b);
            },
            hasNoKey: function(a, b, c) {
                this.isDefined(a, "obj"), Object.keys(a).indexOf(b.toString()) !== -1 && d.thrower("OhK", "Object has key", c + b);
            },
            fnFalse: function(a) {
                a() && d.thrower("FarT", "function already returns true", d.fnName(a));
            },
            byCallbackObject: function(a, b, c) {
                var d;
                for (d in b) void 0 !== c ? b[d](a[c[d]], c[d]) : b[d](a[d], d);
            }
        }, b.exports = e;
    }, {
        "./quadtree2helper": 4,
        vec2: 2
    } ]
}, {}, [ 1 ]);