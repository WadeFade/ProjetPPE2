!function () {
    "use strict";
    var e = 0;

    function Ct(t) {
        return t.ol_uid || (t.ol_uid = ++e)
    }

    var n = function (i) {
            function t(t) {
                var e = "Assertion failed. See https://openlayers.org/en/" + "5.2.0".split("-")[0] + "/doc/errors/#" + t + " for details.";
                i.call(this, e), this.code = t, this.name = "AssertionError", this.message = e
            }

            return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
        }(Error), h = "add", l = "remove", a = "propertychange",
        E = "function" == typeof Object.assign ? Object.assign : function (t, e) {
            var i = arguments;
            if (null == t) throw new TypeError("Cannot convert undefined or null to object");
            for (var r = Object(t), n = 1, o = arguments.length; n < o; ++n) {
                var s = i[n];
                if (null != s) for (var a in s) s.hasOwnProperty(a) && (r[a] = s[a])
            }
            return r
        };

    function _(t) {
        for (var e in t) delete t[e]
    }

    function s(t) {
        var e = [];
        for (var i in t) e.push(t[i]);
        return e
    }

    function Tt(t) {
        var e;
        for (e in t) return !1;
        return !e
    }

    function u(t, e, i, r) {
        for (var n, o = 0, s = t.length; o < s; ++o) if ((n = t[o]).listener === e && n.bindTo === i) return r && (n.deleteIndex = o), n
    }

    function c(t, e) {
        var i = t.ol_lm;
        return i ? i[e] : void 0
    }

    function p(t) {
        var e = t.ol_lm;
        return e || (e = t.ol_lm = {}), e
    }

    function r(t, e) {
        var i = c(t, e);
        if (i) {
            for (var r = 0, n = i.length; r < n; ++r) t.removeEventListener(e, i[r].boundListener), _(i[r]);
            i.length = 0;
            var o = t.ol_lm;
            o && (delete o[e], 0 === Object.keys(o).length && delete t.ol_lm)
        }
    }

    function C(t, e, i, r, n) {
        var o = p(t), s = o[e];
        s || (s = o[e] = []);
        var a, h, l = u(s, i, r, !1);
        return l ? n || (l.callOnce = !1) : (l = {
            bindTo: r,
            callOnce: !!n,
            listener: i,
            target: t,
            type: e
        }, t.addEventListener(e, (h = function (t) {
            var e = a.listener, i = a.bindTo || a.target;
            return a.callOnce && g(a), e.call(i, t)
        }, (a = l).boundListener = h)), s.push(l)), l
    }

    function o(t, e, i, r) {
        return C(t, e, i, r, !0)
    }

    function d(t, e, i, r) {
        var n = c(t, e);
        if (n) {
            var o = u(n, i, r, !0);
            o && g(o)
        }
    }

    function g(t) {
        if (t && t.target) {
            t.target.removeEventListener(t.type, t.boundListener);
            var e = c(t.target, t.type);
            if (e) {
                var i = "deleteIndex" in t ? t.deleteIndex : e.indexOf(t);
                -1 !== i && e.splice(i, 1), 0 === e.length && r(t.target, t.type)
            }
            _(t)
        }
    }

    function f(t) {
        var e = p(t);
        for (var i in e) r(t, i)
    }

    var t = function () {
        this.disposed_ = !1
    };

    function y() {
        return !0
    }

    function v() {
        return !1
    }

    function L() {
    }

    t.prototype.dispose = function () {
        this.disposed_ || (this.disposed_ = !0, this.disposeInternal())
    }, t.prototype.disposeInternal = function () {
    };
    var m = function (t) {
        this.propagationStopped, this.type = t, this.target = null
    };

    function x(t) {
        t.stopPropagation()
    }

    m.prototype.preventDefault = function () {
        this.propagationStopped = !0
    }, m.prototype.stopPropagation = function () {
        this.propagationStopped = !0
    };
    var i = function (t) {
        function e() {
            t.call(this), this.pendingRemovals_ = {}, this.dispatching_ = {}, this.listeners_ = {}
        }

        return t && (e.__proto__ = t), ((e.prototype = Object.create(t && t.prototype)).constructor = e).prototype.addEventListener = function (t, e) {
            var i = this.listeners_[t];
            i || (i = this.listeners_[t] = []), -1 === i.indexOf(e) && i.push(e)
        }, e.prototype.dispatchEvent = function (t) {
            var e, i = "string" == typeof t ? new m(t) : t, r = i.type, n = (i.target = this).listeners_[r];
            if (n) {
                r in this.dispatching_ || (this.dispatching_[r] = 0, this.pendingRemovals_[r] = 0), ++this.dispatching_[r];
                for (var o = 0, s = n.length; o < s; ++o) if (!1 === n[o].call(this, i) || i.propagationStopped) {
                    e = !1;
                    break
                }
                if (--this.dispatching_[r], 0 === this.dispatching_[r]) {
                    var a = this.pendingRemovals_[r];
                    for (delete this.pendingRemovals_[r]; a--;) this.removeEventListener(r, L);
                    delete this.dispatching_[r]
                }
                return e
            }
        }, e.prototype.disposeInternal = function () {
            f(this)
        }, e.prototype.getListeners = function (t) {
            return this.listeners_[t]
        }, e.prototype.hasListener = function (t) {
            return t ? t in this.listeners_ : 0 < Object.keys(this.listeners_).length
        }, e.prototype.removeEventListener = function (t, e) {
            var i = this.listeners_[t];
            if (i) {
                var r = i.indexOf(e);
                t in this.pendingRemovals_ ? (i[r] = L, ++this.pendingRemovals_[t]) : (i.splice(r, 1), 0 === i.length && delete this.listeners_[t])
            }
        }, e
    }(t), w = {
        CHANGE: "change",
        CLEAR: "clear",
        CONTEXTMENU: "contextmenu",
        CLICK: "click",
        DBLCLICK: "dblclick",
        DRAGENTER: "dragenter",
        DRAGOVER: "dragover",
        DROP: "drop",
        ERROR: "error",
        KEYDOWN: "keydown",
        KEYPRESS: "keypress",
        LOAD: "load",
        MOUSEDOWN: "mousedown",
        MOUSEMOVE: "mousemove",
        MOUSEOUT: "mouseout",
        MOUSEUP: "mouseup",
        MOUSEWHEEL: "mousewheel",
        MSPOINTERDOWN: "MSPointerDown",
        RESIZE: "resize",
        TOUCHSTART: "touchstart",
        TOUCHMOVE: "touchmove",
        TOUCHEND: "touchend",
        WHEEL: "wheel"
    }, S = function (t) {
        function e() {
            t.call(this), this.revision_ = 0
        }

        return t && (e.__proto__ = t), ((e.prototype = Object.create(t && t.prototype)).constructor = e).prototype.changed = function () {
            ++this.revision_, this.dispatchEvent(w.CHANGE)
        }, e.prototype.getRevision = function () {
            return this.revision_
        }, e.prototype.on = function (t, e) {
            if (Array.isArray(t)) {
                for (var i = t.length, r = new Array(i), n = 0; n < i; ++n) r[n] = C(this, t[n], e);
                return r
            }
            return C(this, t, e)
        }, e.prototype.once = function (t, e) {
            if (Array.isArray(t)) {
                for (var i = t.length, r = new Array(i), n = 0; n < i; ++n) r[n] = o(this, t[n], e);
                return r
            }
            return o(this, t, e)
        }, e.prototype.un = function (t, e) {
            if (Array.isArray(t)) for (var i = 0, r = t.length; i < r; ++i) d(this, t[i], e); else d(this, t, e)
        }, e
    }(i);
    var T = function (r) {
        function t(t, e, i) {
            r.call(this, t), this.key = e, this.oldValue = i
        }

        return r && (t.__proto__ = r), (t.prototype = Object.create(r && r.prototype)).constructor = t
    }(m), R = function (e) {
        function t(t) {
            e.call(this), Ct(this), this.values_ = {}, void 0 !== t && this.setProperties(t)
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.get = function (t) {
            var e;
            return this.values_.hasOwnProperty(t) && (e = this.values_[t]), e
        }, t.prototype.getKeys = function () {
            return Object.keys(this.values_)
        }, t.prototype.getProperties = function () {
            return E({}, this.values_)
        }, t.prototype.notify = function (t, e) {
            var i;
            i = b(t), this.dispatchEvent(new T(i, t, e)), i = a, this.dispatchEvent(new T(i, t, e))
        }, t.prototype.set = function (t, e, i) {
            if (i) this.values_[t] = e; else {
                var r = this.values_[t];
                r !== (this.values_[t] = e) && this.notify(t, r)
            }
        }, t.prototype.setProperties = function (t, e) {
            for (var i in t) this.set(i, t[i], e)
        }, t.prototype.unset = function (t, e) {
            if (t in this.values_) {
                var i = this.values_[t];
                delete this.values_[t], e || this.notify(t, i)
            }
        }, t
    }(S), I = {};

    function b(t) {
        return I.hasOwnProperty(t) ? I[t] : I[t] = "change:" + t
    }

    var F = "length", P = function (i) {
        function t(t, e) {
            i.call(this, t), this.element = e
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(m), M = function (o) {
        function t(t, e) {
            o.call(this);
            var i = e || {};
            if (this.unique_ = !!i.unique, this.array_ = t || [], this.unique_) for (var r = 0, n = this.array_.length; r < n; ++r) this.assertUnique_(this.array_[r], r);
            this.updateLength_()
        }

        return o && (t.__proto__ = o), ((t.prototype = Object.create(o && o.prototype)).constructor = t).prototype.clear = function () {
            for (; 0 < this.getLength();) this.pop()
        }, t.prototype.extend = function (t) {
            for (var e = 0, i = t.length; e < i; ++e) this.push(t[e]);
            return this
        }, t.prototype.forEach = function (t) {
            for (var e = this.array_, i = 0, r = e.length; i < r; ++i) t(e[i], i, e)
        }, t.prototype.getArray = function () {
            return this.array_
        }, t.prototype.item = function (t) {
            return this.array_[t]
        }, t.prototype.getLength = function () {
            return this.get(F)
        }, t.prototype.insertAt = function (t, e) {
            this.unique_ && this.assertUnique_(e), this.array_.splice(t, 0, e), this.updateLength_(), this.dispatchEvent(new P(h, e))
        }, t.prototype.pop = function () {
            return this.removeAt(this.getLength() - 1)
        }, t.prototype.push = function (t) {
            this.unique_ && this.assertUnique_(t);
            var e = this.getLength();
            return this.insertAt(e, t), this.getLength()
        }, t.prototype.remove = function (t) {
            for (var e = this.array_, i = 0, r = e.length; i < r; ++i) if (e[i] === t) return this.removeAt(i)
        }, t.prototype.removeAt = function (t) {
            var e = this.array_[t];
            return this.array_.splice(t, 1), this.updateLength_(), this.dispatchEvent(new P(l, e)), e
        }, t.prototype.setAt = function (t, e) {
            var i = this.getLength();
            if (t < i) {
                this.unique_ && this.assertUnique_(e, t);
                var r = this.array_[t];
                this.array_[t] = e, this.dispatchEvent(new P(l, r)), this.dispatchEvent(new P(h, e))
            } else {
                for (var n = i; n < t; ++n) this.insertAt(n, void 0);
                this.insertAt(t, e)
            }
        }, t.prototype.updateLength_ = function () {
            this.set(F, this.array_.length)
        }, t.prototype.assertUnique_ = function (t, e) {
            for (var i = 0, r = this.array_.length; i < r; ++i) if (this.array_[i] === t && i !== e) throw new n(58)
        }, t
    }(R);

    function Z(t, e) {
        if (!t) throw new n(e)
    }

    var O = {BOTTOM_LEFT: "bottom-left", BOTTOM_RIGHT: "bottom-right", TOP_LEFT: "top-left", TOP_RIGHT: "top-right"},
        N = {UNKNOWN: 0, INTERSECTING: 1, ABOVE: 2, RIGHT: 4, BELOW: 8, LEFT: 16};

    function A(t) {
        for (var e = B(), i = 0, r = t.length; i < r; ++i) q(e, t[i]);
        return e
    }

    function G(t, e, i) {
        return i ? (i[0] = t[0] - e, i[1] = t[1] - e, i[2] = t[2] + e, i[3] = t[3] + e, i) : [t[0] - e, t[1] - e, t[2] + e, t[3] + e]
    }

    function k(t, e) {
        return e ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e) : t.slice()
    }

    function D(t, e, i) {
        var r, n;
        return (r = e < t[0] ? t[0] - e : t[2] < e ? e - t[2] : 0) * r + (n = i < t[1] ? t[1] - i : t[3] < i ? i - t[3] : 0) * n
    }

    function j(t, e) {
        return U(t, e[0], e[1])
    }

    function Q(t, e) {
        return t[0] <= e[0] && e[2] <= t[2] && t[1] <= e[1] && e[3] <= t[3]
    }

    function U(t, e, i) {
        return t[0] <= e && e <= t[2] && t[1] <= i && i <= t[3]
    }

    function Y(t, e) {
        var i = t[0], r = t[1], n = t[2], o = t[3], s = e[0], a = e[1], h = N.UNKNOWN;
        return s < i ? h |= N.LEFT : n < s && (h |= N.RIGHT), a < r ? h |= N.BELOW : o < a && (h |= N.ABOVE), h === N.UNKNOWN && (h = N.INTERSECTING), h
    }

    function B() {
        return [1 / 0, 1 / 0, -1 / 0, -1 / 0]
    }

    function X(t, e, i, r, n) {
        return n ? (n[0] = t, n[1] = e, n[2] = i, n[3] = r, n) : [t, e, i, r]
    }

    function z(t) {
        return X(1 / 0, 1 / 0, -1 / 0, -1 / 0, t)
    }

    function V(t, e) {
        var i = t[0], r = t[1];
        return X(i, r, i, r, e)
    }

    function W(t, e) {
        return function (t, e) {
            for (var i = 0, r = e.length; i < r; ++i) q(t, e[i]);
            return t
        }(z(e), t)
    }

    function K(t, e, i, r, n) {
        return J(z(n), t, e, i, r)
    }

    function $(t, e) {
        return t[0] == e[0] && t[2] == e[2] && t[1] == e[1] && t[3] == e[3]
    }

    function H(t, e) {
        return e[0] < t[0] && (t[0] = e[0]), e[2] > t[2] && (t[2] = e[2]), e[1] < t[1] && (t[1] = e[1]), e[3] > t[3] && (t[3] = e[3]), t
    }

    function q(t, e) {
        e[0] < t[0] && (t[0] = e[0]), e[0] > t[2] && (t[2] = e[0]), e[1] < t[1] && (t[1] = e[1]), e[1] > t[3] && (t[3] = e[1])
    }

    function J(t, e, i, r, n) {
        for (; i < r; i += n) tt(t, e[i], e[i + 1]);
        return t
    }

    function tt(t, e, i) {
        t[0] = Math.min(t[0], e), t[1] = Math.min(t[1], i), t[2] = Math.max(t[2], e), t[3] = Math.max(t[3], i)
    }

    function et(t, e, i) {
        var r;
        return (r = e.call(i, rt(t))) ? r : (r = e.call(i, nt(t))) ? r : (r = e.call(i, ut(t))) ? r : (r = e.call(i, lt(t))) || !1
    }

    function it(t) {
        var e = 0;
        return pt(t) || (e = ct(t) * at(t)), e
    }

    function rt(t) {
        return [t[0], t[1]]
    }

    function nt(t) {
        return [t[2], t[1]]
    }

    function ot(t) {
        return [(t[0] + t[2]) / 2, (t[1] + t[3]) / 2]
    }

    function st(t, e, i, r, n) {
        var o = e * r[0] / 2, s = e * r[1] / 2, a = Math.cos(i), h = Math.sin(i), l = o * a, u = o * h, c = s * a,
            p = s * h, d = t[0], f = t[1], _ = d - l + p, g = d - l - p, y = d + l - p, v = d + l + p, m = f - u - c,
            x = f - u + c, S = f + u + c, E = f + u - c;
        return X(Math.min(_, g, y, v), Math.min(m, x, S, E), Math.max(_, g, y, v), Math.max(m, x, S, E), n)
    }

    function at(t) {
        return t[3] - t[1]
    }

    function ht(t, e, i) {
        var r = i || [1 / 0, 1 / 0, -1 / 0, -1 / 0];
        return wt(t, e) ? (t[0] > e[0] ? r[0] = t[0] : r[0] = e[0], t[1] > e[1] ? r[1] = t[1] : r[1] = e[1], t[2] < e[2] ? r[2] = t[2] : r[2] = e[2], t[3] < e[3] ? r[3] = t[3] : r[3] = e[3]) : z(r), r
    }

    function lt(t) {
        return [t[0], t[3]]
    }

    function ut(t) {
        return [t[2], t[3]]
    }

    function ct(t) {
        return t[2] - t[0]
    }

    function wt(t, e) {
        return t[0] <= e[2] && t[2] >= e[0] && t[1] <= e[3] && t[3] >= e[1]
    }

    function pt(t) {
        return t[2] < t[0] || t[3] < t[1]
    }

    function dt(t, e) {
        var i = (t[2] - t[0]) / 2 * (e - 1), r = (t[3] - t[1]) / 2 * (e - 1);
        t[0] -= i, t[2] += i, t[1] -= r, t[3] += r
    }

    function ft(t, e, i) {
        var r, n, o, s = [t[0], t[1], t[0], t[3], t[2], t[1], t[2], t[3]];
        return e(s, s, 2), r = [s[0], s[2], s[4], s[6]], n = [s[1], s[3], s[5], s[7]], o = i, X(Math.min.apply(null, r), Math.min.apply(null, n), Math.max.apply(null, r), Math.max.apply(null, n), o)
    }

    function Rt(t, e, i, r, n, o) {
        for (var s = o || [], a = 0, h = e; h < i; h += r) {
            var l = t[h], u = t[h + 1];
            s[a++] = n[0] * l + n[2] * u + n[4], s[a++] = n[1] * l + n[3] * u + n[5]
        }
        return o && s.length != a && (s.length = a), s
    }

    function _t(t, e, i, r, n, o, s) {
        for (var a = s || [], h = 0, l = e; l < i; l += r) {
            a[h++] = t[l] + n, a[h++] = t[l + 1] + o;
            for (var u = l + 2; u < l + r; ++u) a[h++] = t[u]
        }
        return s && a.length != h && (a.length = h), a
    }

    function gt(t, e, i) {
        return Math.min(Math.max(t, e), i)
    }

    var yt = "cosh" in Math ? Math.cosh : function (t) {
        var e = Math.exp(t);
        return (e + 1 / e) / 2
    };

    function vt(t, e, i, r, n, o) {
        var s = n - i, a = o - r;
        if (0 !== s || 0 !== a) {
            var h = ((t - i) * s + (e - r) * a) / (s * s + a * a);
            1 < h ? (i = n, r = o) : 0 < h && (i += s * h, r += a * h)
        }
        return mt(t, e, i, r)
    }

    function mt(t, e, i, r) {
        var n = i - t, o = r - e;
        return n * n + o * o
    }

    function xt(t) {
        return 180 * t / Math.PI
    }

    function St(t) {
        return t * Math.PI / 180
    }

    function Et(t, e) {
        var i = t % e;
        return i * e < 0 ? i + e : i
    }

    function It(t, e, i) {
        return t + i * (e - t)
    }

    var Lt = {
        POINT: "Point",
        LINE_STRING: "LineString",
        LINEAR_RING: "LinearRing",
        POLYGON: "Polygon",
        MULTI_POINT: "MultiPoint",
        MULTI_LINE_STRING: "MultiLineString",
        MULTI_POLYGON: "MultiPolygon",
        GEOMETRY_COLLECTION: "GeometryCollection",
        CIRCLE: "Circle"
    }, bt = 6371008.8;

    function Ft(t, e, i) {
        var r = i || bt, n = St(t[1]), o = St(e[1]), s = (o - n) / 2, a = St(e[0] - t[0]) / 2,
            h = Math.sin(s) * Math.sin(s) + Math.sin(a) * Math.sin(a) * Math.cos(n) * Math.cos(o);
        return 2 * r * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
    }

    function Pt(t, e) {
        for (var i = 0, r = 0, n = t.length; r < n - 1; ++r) i += Ft(t[r], t[r + 1], e);
        return i
    }

    function Mt(t, e) {
        for (var i = 0, r = t.length, n = t[r - 1][0], o = t[r - 1][1], s = 0; s < r; s++) {
            var a = t[s][0], h = t[s][1];
            i += St(a - n) * (2 + Math.sin(St(o)) + Math.sin(St(h))), n = a, o = h
        }
        return i * e * e / 2
    }

    var Ot = {
        DEGREES: "degrees",
        FEET: "ft",
        METERS: "m",
        PIXELS: "pixels",
        TILE_PIXELS: "tile-pixels",
        USFEET: "us-ft"
    }, Nt = {};
    Nt[Ot.DEGREES] = 2 * Math.PI * 6370997 / 360, Nt[Ot.FEET] = .3048, Nt[Ot.METERS] = 1, Nt[Ot.USFEET] = 1200 / 3937;
    var At = function (t) {
        this.code_ = t.code, this.units_ = t.units, this.extent_ = void 0 !== t.extent ? t.extent : null, this.worldExtent_ = void 0 !== t.worldExtent ? t.worldExtent : null, this.axisOrientation_ = void 0 !== t.axisOrientation ? t.axisOrientation : "enu", this.global_ = void 0 !== t.global && t.global, this.canWrapX_ = !(!this.global_ || !this.extent_), this.getPointResolutionFunc_ = t.getPointResolution, this.defaultTileGrid_ = null, this.metersPerUnit_ = t.metersPerUnit
    };
    At.prototype.canWrapX = function () {
        return this.canWrapX_
    }, At.prototype.getCode = function () {
        return this.code_
    }, At.prototype.getExtent = function () {
        return this.extent_
    }, At.prototype.getUnits = function () {
        return this.units_
    }, At.prototype.getMetersPerUnit = function () {
        return this.metersPerUnit_ || Nt[this.units_]
    }, At.prototype.getWorldExtent = function () {
        return this.worldExtent_
    }, At.prototype.getAxisOrientation = function () {
        return this.axisOrientation_
    }, At.prototype.isGlobal = function () {
        return this.global_
    }, At.prototype.setGlobal = function (t) {
        this.global_ = t, this.canWrapX_ = !(!t || !this.extent_)
    }, At.prototype.getDefaultTileGrid = function () {
        return this.defaultTileGrid_
    }, At.prototype.setDefaultTileGrid = function (t) {
        this.defaultTileGrid_ = t
    }, At.prototype.setExtent = function (t) {
        this.extent_ = t, this.canWrapX_ = !(!this.global_ || !t)
    }, At.prototype.setWorldExtent = function (t) {
        this.worldExtent_ = t
    }, At.prototype.setGetPointResolution = function (t) {
        this.getPointResolutionFunc_ = t
    }, At.prototype.getPointResolutionFunc = function () {
        return this.getPointResolutionFunc_
    };
    var Gt = 6378137, kt = Math.PI * Gt, Dt = [-kt, -kt, kt, kt], jt = [-180, -85, 180, 85], Ut = function (e) {
            function t(t) {
                e.call(this, {
                    code: t,
                    units: Ot.METERS,
                    extent: Dt,
                    global: !0,
                    worldExtent: jt,
                    getPointResolution: function (t, e) {
                        return t / yt(e[1] / Gt)
                    }
                })
            }

            return e && (t.__proto__ = e), (t.prototype = Object.create(e && e.prototype)).constructor = t
        }(At),
        Yt = [new Ut("EPSG:3857"), new Ut("EPSG:102100"), new Ut("EPSG:102113"), new Ut("EPSG:900913"), new Ut("urn:ogc:def:crs:EPSG:6.18:3:3857"), new Ut("urn:ogc:def:crs:EPSG::3857"), new Ut("http://www.opengis.net/gml/srs/epsg.xml#3857")];

    function Bt(t, e, i) {
        var r = t.length, n = 1 < i ? i : 2, o = e;
        void 0 === o && (o = 2 < n ? t.slice() : new Array(r));
        for (var s = kt, a = 0; a < r; a += n) {
            o[a] = s * t[a] / 180;
            var h = Gt * Math.log(Math.tan(Math.PI * (t[a + 1] + 90) / 360));
            s < h ? h = s : h < -s && (h = -s), o[a + 1] = h
        }
        return o
    }

    function Xt(t, e, i) {
        var r = t.length, n = 1 < i ? i : 2, o = e;
        void 0 === o && (o = 2 < n ? t.slice() : new Array(r));
        for (var s = 0; s < r; s += n) o[s] = 180 * t[s] / kt, o[s + 1] = 360 * Math.atan(Math.exp(t[s + 1] / Gt)) / Math.PI - 90;
        return o
    }

    var zt = [-180, -90, 180, 90], Vt = 6378137 * Math.PI / 180, Wt = function (i) {
            function t(t, e) {
                i.call(this, {
                    code: t,
                    units: Ot.DEGREES,
                    extent: zt,
                    axisOrientation: e,
                    global: !0,
                    metersPerUnit: Vt,
                    worldExtent: zt
                })
            }

            return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
        }(At),
        Kt = [new Wt("CRS:84"), new Wt("EPSG:4326", "neu"), new Wt("urn:ogc:def:crs:EPSG::4326", "neu"), new Wt("urn:ogc:def:crs:EPSG:6.6:4326", "neu"), new Wt("urn:ogc:def:crs:OGC:1.3:CRS84"), new Wt("urn:ogc:def:crs:OGC:2:84"), new Wt("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"), new Wt("urn:x-ogc:def:crs:EPSG:4326", "neu")],
        Ht = {};
    var Zt, qt, Jt, Qt = {};

    function $t(t, e, i) {
        var r = t.getCode(), n = e.getCode();
        r in Qt || (Qt[r] = {}), Qt[r][n] = i
    }

    function te(t, e) {
        var i;
        return t in Qt && e in Qt[t] && (i = Qt[t][e]), i
    }

    function ee(t, e, i) {
        var r;
        if (void 0 !== e) {
            for (var n = 0, o = t.length; n < o; ++n) e[n] = t[n];
            r = e
        } else r = t.slice();
        return r
    }

    function ie(t, e, i) {
        if (void 0 !== e && t !== e) {
            for (var r = 0, n = t.length; r < n; ++r) e[r] = t[r];
            t = e
        }
        return t
    }

    function re(t) {
        var e, i;
        e = t.getCode(), i = t, Ht[e] = i, $t(t, t, ee)
    }

    function ne(t) {
        var e = null;
        if (t instanceof At) e = t; else if ("string" == typeof t) {
            e = Ht[t] || null
        }
        return e
    }

    function oe(t, e, i, r) {
        var n, o = (t = ne(t)).getPointResolutionFunc();
        if (o) n = o(e, i); else if (t.getUnits() == Ot.DEGREES && !r || r == Ot.DEGREES) n = e; else {
            var s = ce(t, ne("EPSG:4326")),
                a = [i[0] - e / 2, i[1], i[0] + e / 2, i[1], i[0], i[1] - e / 2, i[0], i[1] + e / 2];
            n = (Ft((a = s(a, a, 2)).slice(0, 2), a.slice(2, 4)) + Ft(a.slice(4, 6), a.slice(6, 8))) / 2;
            var h = r ? Nt[r] : t.getMetersPerUnit();
            void 0 !== h && (n /= h)
        }
        return n
    }

    function se(t) {
        t.forEach(re), t.forEach(function (e) {
            t.forEach(function (t) {
                e !== t && $t(e, t, ee)
            })
        })
    }

    function ae(t, e) {
        return t ? "string" == typeof t ? ne(t) : t : ne(e)
    }

    function he(l) {
        return function (t, e, i) {
            for (var r = t.length, n = void 0 !== i ? i : 2, o = void 0 !== e ? e : new Array(r), s = 0; s < r; s += n) {
                var a = l([t[s], t[s + 1]]);
                o[s] = a[0], o[s + 1] = a[1];
                for (var h = n - 1; 2 <= h; --h) o[s + h] = t[s + h]
            }
            return o
        }
    }

    function le(t, e, i, r) {
        var n = ne(t), o = ne(e);
        $t(n, o, he(i)), $t(o, n, he(r))
    }

    function ue(t, e) {
        if (t === e) return !0;
        var i = t.getUnits() === e.getUnits();
        return t.getCode() === e.getCode() ? i : ce(t, e) === ee && i
    }

    function ce(t, e) {
        var i = te(t.getCode(), e.getCode());
        return i || (i = ie), i
    }

    function pe(t, e) {
        return ce(ne(t), ne(e))
    }

    function de(t, e, i) {
        return pe(e, i)(t, void 0, t.length)
    }

    function fe(t, e, i) {
        return ft(t, pe(e, i))
    }

    se(Yt), se(Kt), Zt = Yt, qt = Bt, Jt = Xt, Kt.forEach(function (e) {
        Zt.forEach(function (t) {
            $t(e, t, qt), $t(t, e, Jt)
        })
    });
    var _e = new Array(6);

    function ge(t) {
        return ve(t, 1, 0, 0, 1, 0, 0)
    }

    function ye(t, e) {
        var i = t[0], r = t[1], n = t[2], o = t[3], s = t[4], a = t[5], h = e[0], l = e[1], u = e[2], c = e[3],
            p = e[4], d = e[5];
        return t[0] = i * h + n * l, t[1] = r * h + o * l, t[2] = i * u + n * c, t[3] = r * u + o * c, t[4] = i * p + n * d + s, t[5] = r * p + o * d + a, t
    }

    function ve(t, e, i, r, n, o, s) {
        return t[0] = e, t[1] = i, t[2] = r, t[3] = n, t[4] = o, t[5] = s, t
    }

    function me(t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
    }

    function xe(t, e) {
        var i = e[0], r = e[1];
        return e[0] = t[0] * i + t[2] * r + t[4], e[1] = t[1] * i + t[3] * r + t[5], e
    }

    function Se(t, e) {
        var i = Math.cos(e), r = Math.sin(e);
        return ye(t, ve(_e, i, r, -r, i, 0, 0))
    }

    function Ee(t, e, i) {
        return ye(t, ve(_e, e, 0, 0, i, 0, 0))
    }

    function Ce(t, e, i) {
        return ye(t, ve(_e, 1, 0, 0, 1, e, i))
    }

    function Te(t, e, i, r, n, o, s, a) {
        var h = Math.sin(o), l = Math.cos(o);
        return t[0] = r * l, t[1] = n * h, t[2] = -r * h, t[3] = n * l, t[4] = s * r * l - a * r * h + e, t[5] = s * n * h + a * n * l + i, t
    }

    function we(t) {
        var e, i = (e = t)[0] * e[3] - e[1] * e[2];
        Z(0 !== i, 32);
        var r = t[0], n = t[1], o = t[2], s = t[3], a = t[4], h = t[5];
        return t[0] = s / i, t[1] = -n / i, t[2] = -o / i, t[3] = r / i, t[4] = (o * h - s * a) / i, t[5] = -(r * h - n * a) / i, t
    }

    var Re = [1, 0, 0, 1, 0, 0], Ie = function (t) {
        function e() {
            t.call(this), this.extent_ = [1 / 0, 1 / 0, -1 / 0, -1 / 0], this.extentRevision_ = -1, this.simplifiedGeometryCache = {}, this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = 0
        }

        return t && (e.__proto__ = t), ((e.prototype = Object.create(t && t.prototype)).constructor = e).prototype.clone = function () {
        }, e.prototype.closestPointXY = function (t, e, i, r) {
        }, e.prototype.getClosestPoint = function (t, e) {
            var i = e || [NaN, NaN];
            return this.closestPointXY(t[0], t[1], i, 1 / 0), i
        }, e.prototype.intersectsCoordinate = function (t) {
            return this.containsXY(t[0], t[1])
        }, e.prototype.computeExtent = function (t) {
        }, e.prototype.getExtent = function (t) {
            return this.extentRevision_ != this.getRevision() && (this.extent_ = this.computeExtent(this.extent_), this.extentRevision_ = this.getRevision()), e = this.extent_, (i = t) ? (i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3], i) : e;
            var e, i
        }, e.prototype.rotate = function (t, e) {
        }, e.prototype.scale = function (t, e, i) {
        }, e.prototype.simplify = function (t) {
            return this.getSimplifiedGeometry(t * t)
        }, e.prototype.getSimplifiedGeometry = function (t) {
        }, e.prototype.getType = function () {
        }, e.prototype.applyTransform = function (t) {
        }, e.prototype.intersectsExtent = function (t) {
        }, e.prototype.translate = function (t, e) {
        }, e.prototype.transform = function (s, a) {
            var t = (s = ne(s)).getUnits() == Ot.TILE_PIXELS ? function (t, e, i) {
                var r = s.getExtent(), n = s.getWorldExtent(), o = at(n) / at(r);
                return Te(Re, n[0], n[3], o, -o, 0, 0, 0), Rt(t, 0, t.length, i, Re, e), pe(s, a)(t, e, i)
            } : pe(s, a);
            return this.applyTransform(t), this
        }, e
    }(R);
    Ie.prototype.containsXY = v;
    var Le = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i, be = /^([a-z]*)$/i;

    function Fe(t) {
        return "string" == typeof t ? t : Ge(t)
    }

    var Pe, Me, Oe = (Pe = {}, Me = 0, function (t) {
        var e;
        if (Pe.hasOwnProperty(t)) e = Pe[t]; else {
            if (1024 <= Me) {
                var i = 0;
                for (var r in Pe) 0 == (3 & i++) && (delete Pe[r], --Me)
            }
            e = function (t) {
                var e, i, r, n, o;
                if (be.exec(t) && (t = function (t) {
                    var e = document.createElement("div");
                    if (e.style.color = t, "" !== e.style.color) {
                        document.body.appendChild(e);
                        var i = getComputedStyle(e).color;
                        return document.body.removeChild(e), i
                    }
                    return ""
                }(t)), Le.exec(t)) {
                    var s, a = t.length - 1;
                    s = a <= 4 ? 1 : 2;
                    var h = 4 === a || 8 === a;
                    e = parseInt(t.substr(1 + 0 * s, s), 16), i = parseInt(t.substr(1 + 1 * s, s), 16), r = parseInt(t.substr(1 + 2 * s, s), 16), n = h ? parseInt(t.substr(1 + 3 * s, s), 16) : 255, 1 == s && (e = (e << 4) + e, i = (i << 4) + i, r = (r << 4) + r, h && (n = (n << 4) + n)), o = [e, i, r, n / 255]
                } else 0 == t.indexOf("rgba(") ? Ae(o = t.slice(5, -1).split(",").map(Number)) : 0 == t.indexOf("rgb(") ? ((o = t.slice(4, -1).split(",").map(Number)).push(1), Ae(o)) : Z(!1, 14);
                return o
            }(t), Pe[t] = e, ++Me
        }
        return e
    });

    function Ne(t) {
        return Array.isArray(t) ? t : Oe(t)
    }

    function Ae(t) {
        return t[0] = gt(t[0] + .5 | 0, 0, 255), t[1] = gt(t[1] + .5 | 0, 0, 255), t[2] = gt(t[2] + .5 | 0, 0, 255), t[3] = gt(t[3], 0, 1), t
    }

    function Ge(t) {
        var e = t[0];
        e != (0 | e) && (e = e + .5 | 0);
        var i = t[1];
        i != (0 | i) && (i = i + .5 | 0);
        var r = t[2];
        return r != (0 | r) && (r = r + .5 | 0), "rgba(" + e + "," + i + "," + r + "," + (void 0 === t[3] ? 1 : t[3]) + ")"
    }

    function ke(t) {
        return "string" == typeof (e = t) || e instanceof CanvasPattern || e instanceof CanvasGradient ? t : Ge(t);
        var e
    }

    function De(t, e) {
        var i = document.createElement("canvas");
        return t && (i.width = t), e && (i.height = e), i.getContext("2d")
    }

    function je(t, e) {
        var i = e.parentNode;
        i && i.replaceChild(t, e)
    }

    function Ue(t) {
        return t && t.parentNode ? t.parentNode.removeChild(t) : null
    }

    function Ye(t) {
        for (; t.lastChild;) t.removeChild(t.lastChild)
    }

    var Be, Xe, ze = 34962, Ve = 5126, We = 10242, Ke = 10243, He = 3553, Ze = 33071, qe = 36160,
        Je = ["experimental-webgl", "webgl", "webkit-3d", "moz-webgl"];

    function Qe(t, e) {
        for (var i = Je.length, r = 0; r < i; ++r) try {
            var n = t.getContext(Je[r], e);
            if (n) return n
        } catch (t) {
        }
        return null
    }

    if ("undefined" != typeof window && "WebGLRenderingContext" in window) try {
        var $e = Qe(document.createElement("canvas"), {failIfMajorPerformanceCaveat: !0});
        $e && (Be = $e.getParameter($e.MAX_TEXTURE_SIZE), Xe = $e.getSupportedExtensions())
    } catch (t) {
    }
    var ti, ei, ii = "undefined" != typeof navigator ? navigator.userAgent.toLowerCase() : "",
        ri = -1 !== ii.indexOf("firefox"), ni = -1 !== ii.indexOf("safari") && -1 == ii.indexOf("chrom"),
        oi = -1 !== ii.indexOf("webkit") && -1 == ii.indexOf("edge"), si = -1 !== ii.indexOf("macintosh"),
        ai = window.devicePixelRatio || 1, hi = function () {
            var t = !1;
            try {
                t = !!document.createElement("canvas").getContext("2d").setLineDash
            } catch (t) {
            }
            return t
        }(), li = "geolocation" in navigator, ui = "ontouchstart" in window, ci = "PointerEvent" in window,
        pi = !!navigator.msPointerEnabled, di = {IDLE: 0, LOADING: 1, LOADED: 2, ERROR: 3}, fi = "ol-hidden",
        _i = "ol-unselectable", gi = "ol-control", yi = "ol-collapsed", vi = (ei = {}, function (t) {
            if (ti || (ti = document.createElement("div").style), !(t in ei)) {
                ti.font = t;
                var e = ti.fontFamily;
                if (ti.font = "", !e) return null;
                ei[t] = e.split(/,\s?/)
            }
            return ei[t]
        }), mi = function (e) {
            function t(t) {
                e.call(this), this.highWaterMark = void 0 !== t ? t : 2048, this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null
            }

            return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.canExpireCache = function () {
                return this.getCount() > this.highWaterMark
            }, t.prototype.clear = function () {
                this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null, this.dispatchEvent(w.CLEAR)
            }, t.prototype.containsKey = function (t) {
                return this.entries_.hasOwnProperty(t)
            }, t.prototype.forEach = function (t, e) {
                for (var i = this.oldest_; i;) t.call(e, i.value_, i.key_, this), i = i.newer
            }, t.prototype.get = function (t) {
                var e = this.entries_[t];
                return Z(void 0 !== e, 15), e === this.newest_ ? e.value_ : (e === this.oldest_ ? (this.oldest_ = this.oldest_.newer, this.oldest_.older = null) : (e.newer.older = e.older, e.older.newer = e.newer), e.newer = null, e.older = this.newest_, this.newest_.newer = e, (this.newest_ = e).value_)
            }, t.prototype.remove = function (t) {
                var e = this.entries_[t];
                return Z(void 0 !== e, 15), e === this.newest_ ? (this.newest_ = e.older, this.newest_ && (this.newest_.newer = null)) : e === this.oldest_ ? (this.oldest_ = e.newer, this.oldest_ && (this.oldest_.older = null)) : (e.newer.older = e.older, e.older.newer = e.newer), delete this.entries_[t], --this.count_, e.value_
            }, t.prototype.getCount = function () {
                return this.count_
            }, t.prototype.getKeys = function () {
                var t, e = new Array(this.count_), i = 0;
                for (t = this.newest_; t; t = t.older) e[i++] = t.key_;
                return e
            }, t.prototype.getValues = function () {
                var t, e = new Array(this.count_), i = 0;
                for (t = this.newest_; t; t = t.older) e[i++] = t.value_;
                return e
            }, t.prototype.peekLast = function () {
                return this.oldest_.value_
            }, t.prototype.peekLastKey = function () {
                return this.oldest_.key_
            }, t.prototype.peekFirstKey = function () {
                return this.newest_.key_
            }, t.prototype.pop = function () {
                var t = this.oldest_;
                return delete this.entries_[t.key_], t.newer && (t.newer.older = null), this.oldest_ = t.newer, this.oldest_ || (this.newest_ = null), --this.count_, t.value_
            }, t.prototype.replace = function (t, e) {
                this.get(t), this.entries_[t].value_ = e
            }, t.prototype.set = function (t, e) {
                Z(!(t in this.entries_), 16);
                var i = {key_: t, newer: null, older: this.newest_, value_: e};
                this.newest_ ? this.newest_.newer = i : this.oldest_ = i, this.newest_ = i, this.entries_[t] = i, ++this.count_
            }, t.prototype.setSize = function (t) {
                this.highWaterMark = t
            }, t.prototype.prune = function () {
                for (; this.canExpireCache();) this.pop()
            }, t
        }(i), xi = "10px sans-serif", Si = [0, 0, 0, 1], Ei = "round", Ci = [], Ti = "round", wi = [0, 0, 0, 1],
        Ri = "center", Ii = [0, 0, 0, 0], Li = new mi, bi = {}, Fi = null, Pi = {}, Mi = function () {
            var o, h, s = 60, a = bi, l = "32px ", u = ["monospace", "serif"], c = u.length, p = "wmytzilWMYTZIL@#/&?$%10";

            function d(t) {
                for (var e = Oi(), i = 100; i <= 700; i += 300) {
                    for (var r = i + " ", n = !0, o = 0; o < c; ++o) {
                        var s = u[o];
                        if (e.font = r + l + s, h = e.measureText(p).width, t != s) {
                            e.font = r + l + t + "," + s;
                            var a = e.measureText(p).width;
                            n = n && a != h
                        }
                    }
                    if (n) return !0
                }
                return !1
            }

            function f() {
                var t = !0;
                for (var e in a) a[e] < s && (d(e) ? (a[e] = s, _(Pi), Fi = null, Li.clear()) : (++a[e], t = !1));
                t && (clearInterval(o), o = void 0)
            }

            return function (t) {
                var e = vi(t);
                if (e) for (var i = 0, r = e.length; i < r; ++i) {
                    var n = e[i];
                    n in a || (a[n] = s, d(n) || void (a[n] = 0) === o && (o = setInterval(f, 32)))
                }
            }
        }();

    function Oi() {
        return Fi || (Fi = De(1, 1)), Fi
    }

    var Ni, Ai, Gi = (Ai = Pi, function (t) {
        var e = Ai[t];
        return null == e && (Ni || ((Ni = document.createElement("span")).textContent = "M", Ni.style.margin = Ni.style.padding = "0 !important", Ni.style.position = "absolute !important", Ni.style.left = "-99999px !important"), Ni.style.font = t, document.body.appendChild(Ni), e = Ai[t] = Ni.offsetHeight, document.body.removeChild(Ni)), e
    });

    function ki(t, e) {
        var i = Oi();
        return t != i.font && (i.font = t), i.measureText(e).width
    }

    function Di(t, e, i, r) {
        0 !== e && (t.translate(i, r), t.rotate(e), t.translate(-i, -r))
    }

    var ji = [1, 0, 0, 1, 0, 0];

    function Ui(t, e, i, r, n, o, s, a, h, l, u) {
        var c;
        1 != i && (c = t.globalAlpha, t.globalAlpha = c * i), e && t.setTransform.apply(t, e), t.drawImage(r, n, o, s, a, h, l, s * u, a * u), c && (t.globalAlpha = c), e && t.setTransform.apply(t, ji)
    }

    var Yi = function (t) {
        this.opacity_ = t.opacity, this.rotateWithView_ = t.rotateWithView, this.rotation_ = t.rotation, this.scale_ = t.scale
    };
    Yi.prototype.getOpacity = function () {
        return this.opacity_
    }, Yi.prototype.getRotateWithView = function () {
        return this.rotateWithView_
    }, Yi.prototype.getRotation = function () {
        return this.rotation_
    }, Yi.prototype.getScale = function () {
        return this.scale_
    }, Yi.prototype.getSnapToPixel = function () {
        return !1
    }, Yi.prototype.getAnchor = function () {
    }, Yi.prototype.getImage = function (t) {
    }, Yi.prototype.getHitDetectionImage = function (t) {
    }, Yi.prototype.getImageState = function () {
    }, Yi.prototype.getImageSize = function () {
    }, Yi.prototype.getHitDetectionImageSize = function () {
    }, Yi.prototype.getOrigin = function () {
    }, Yi.prototype.getSize = function () {
    }, Yi.prototype.setOpacity = function (t) {
        this.opacity_ = t
    }, Yi.prototype.setRotateWithView = function (t) {
        this.rotateWithView_ = t
    }, Yi.prototype.setRotation = function (t) {
        this.rotation_ = t
    }, Yi.prototype.setScale = function (t) {
        this.scale_ = t
    }, Yi.prototype.setSnapToPixel = function (t) {
    }, Yi.prototype.listenImageChange = function (t, e) {
    }, Yi.prototype.load = function () {
    }, Yi.prototype.unlistenImageChange = function (t, e) {
    };
    var Bi = function (i) {
        function e(t) {
            var e = void 0 !== t.rotateWithView && t.rotateWithView;
            i.call(this, {
                opacity: 1,
                rotateWithView: e,
                rotation: void 0 !== t.rotation ? t.rotation : 0,
                scale: 1
            }), this.checksums_ = null, this.canvas_ = null, this.hitDetectionCanvas_ = null, this.fill_ = void 0 !== t.fill ? t.fill : null, this.origin_ = [0, 0], this.points_ = t.points, this.radius_ = void 0 !== t.radius ? t.radius : t.radius1, this.radius2_ = t.radius2, this.angle_ = void 0 !== t.angle ? t.angle : 0, this.stroke_ = void 0 !== t.stroke ? t.stroke : null, this.anchor_ = null, this.size_ = null, this.imageSize_ = null, this.hitDetectionImageSize_ = null, this.atlasManager_ = t.atlasManager, this.render_(this.atlasManager_)
        }

        return i && (e.__proto__ = i), ((e.prototype = Object.create(i && i.prototype)).constructor = e).prototype.clone = function () {
            var t = new e({
                fill: this.getFill() ? this.getFill().clone() : void 0,
                points: this.getPoints(),
                radius: this.getRadius(),
                radius2: this.getRadius2(),
                angle: this.getAngle(),
                stroke: this.getStroke() ? this.getStroke().clone() : void 0,
                rotation: this.getRotation(),
                rotateWithView: this.getRotateWithView(),
                atlasManager: this.atlasManager_
            });
            return t.setOpacity(this.getOpacity()), t.setScale(this.getScale()), t
        }, e.prototype.getAnchor = function () {
            return this.anchor_
        }, e.prototype.getAngle = function () {
            return this.angle_
        }, e.prototype.getFill = function () {
            return this.fill_
        }, e.prototype.getHitDetectionImage = function (t) {
            return this.hitDetectionCanvas_
        }, e.prototype.getImage = function (t) {
            return this.canvas_
        }, e.prototype.getImageSize = function () {
            return this.imageSize_
        }, e.prototype.getHitDetectionImageSize = function () {
            return this.hitDetectionImageSize_
        }, e.prototype.getImageState = function () {
            return di.LOADED
        }, e.prototype.getOrigin = function () {
            return this.origin_
        }, e.prototype.getPoints = function () {
            return this.points_
        }, e.prototype.getRadius = function () {
            return this.radius_
        }, e.prototype.getRadius2 = function () {
            return this.radius2_
        }, e.prototype.getSize = function () {
            return this.size_
        }, e.prototype.getStroke = function () {
            return this.stroke_
        }, e.prototype.listenImageChange = function (t, e) {
        }, e.prototype.load = function () {
        }, e.prototype.unlistenImageChange = function (t, e) {
        }, e.prototype.render_ = function (t) {
            var e, i, r = "", n = "", o = 0, s = null, a = 0, h = 0;
            this.stroke_ && (null === (i = this.stroke_.getColor()) && (i = wi), i = ke(i), void 0 === (h = this.stroke_.getWidth()) && (h = 1), s = this.stroke_.getLineDash(), a = this.stroke_.getLineDashOffset(), hi || (s = null, a = 0), void 0 === (n = this.stroke_.getLineJoin()) && (n = Ti), void 0 === (r = this.stroke_.getLineCap()) && (r = Ei), void 0 === (o = this.stroke_.getMiterLimit()) && (o = 10));
            var l = 2 * (this.radius_ + h) + 1, u = {
                strokeStyle: i,
                strokeWidth: h,
                size: l,
                lineCap: r,
                lineDash: s,
                lineDashOffset: a,
                lineJoin: n,
                miterLimit: o
            };
            if (void 0 === t) {
                var c = De(l, l);
                this.canvas_ = c.canvas, e = l = this.canvas_.width, this.draw_(u, c, 0, 0), this.createHitDetectionCanvas_(u)
            } else {
                l = Math.round(l);
                var p, d = !this.fill_;
                d && (p = this.drawHitDetectionCanvas_.bind(this, u));
                var f = this.getChecksum(), _ = t.add(f, l, l, this.draw_.bind(this, u), p);
                this.canvas_ = _.image, this.origin_ = [_.offsetX, _.offsetY], e = _.image.width, d ? (this.hitDetectionCanvas_ = _.hitImage, this.hitDetectionImageSize_ = [_.hitImage.width, _.hitImage.height]) : (this.hitDetectionCanvas_ = this.canvas_, this.hitDetectionImageSize_ = [e, e])
            }
            this.anchor_ = [l / 2, l / 2], this.size_ = [l, l], this.imageSize_ = [e, e]
        }, e.prototype.draw_ = function (t, e, i, r) {
            var n, o, s;
            e.setTransform(1, 0, 0, 1, 0, 0), e.translate(i, r), e.beginPath();
            var a = this.points_;
            if (a === 1 / 0) e.arc(t.size / 2, t.size / 2, this.radius_, 0, 2 * Math.PI, !0); else {
                var h = void 0 !== this.radius2_ ? this.radius2_ : this.radius_;
                for (h !== this.radius_ && (a *= 2), n = 0; n <= a; n++) o = 2 * n * Math.PI / a - Math.PI / 2 + this.angle_, s = n % 2 == 0 ? this.radius_ : h, e.lineTo(t.size / 2 + s * Math.cos(o), t.size / 2 + s * Math.sin(o))
            }
            if (this.fill_) {
                var l = this.fill_.getColor();
                null === l && (l = Si), e.fillStyle = ke(l), e.fill()
            }
            this.stroke_ && (e.strokeStyle = t.strokeStyle, e.lineWidth = t.strokeWidth, t.lineDash && (e.setLineDash(t.lineDash), e.lineDashOffset = t.lineDashOffset), e.lineCap = t.lineCap, e.lineJoin = t.lineJoin, e.miterLimit = t.miterLimit, e.stroke()), e.closePath()
        }, e.prototype.createHitDetectionCanvas_ = function (t) {
            if (this.hitDetectionImageSize_ = [t.size, t.size], this.fill_) this.hitDetectionCanvas_ = this.canvas_; else {
                var e = De(t.size, t.size);
                this.hitDetectionCanvas_ = e.canvas, this.drawHitDetectionCanvas_(t, e, 0, 0)
            }
        }, e.prototype.drawHitDetectionCanvas_ = function (t, e, i, r) {
            e.setTransform(1, 0, 0, 1, 0, 0), e.translate(i, r), e.beginPath();
            var n = this.points_;
            if (n === 1 / 0) e.arc(t.size / 2, t.size / 2, this.radius_, 0, 2 * Math.PI, !0); else {
                var o, s, a, h = void 0 !== this.radius2_ ? this.radius2_ : this.radius_;
                for (h !== this.radius_ && (n *= 2), o = 0; o <= n; o++) a = 2 * o * Math.PI / n - Math.PI / 2 + this.angle_, s = o % 2 == 0 ? this.radius_ : h, e.lineTo(t.size / 2 + s * Math.cos(a), t.size / 2 + s * Math.sin(a))
            }
            e.fillStyle = Si, e.fill(), this.stroke_ && (e.strokeStyle = t.strokeStyle, e.lineWidth = t.strokeWidth, t.lineDash && (e.setLineDash(t.lineDash), e.lineDashOffset = t.lineDashOffset), e.stroke()), e.closePath()
        }, e.prototype.getChecksum = function () {
            var t = this.stroke_ ? this.stroke_.getChecksum() : "-", e = this.fill_ ? this.fill_.getChecksum() : "-";
            if (!this.checksums_ || t != this.checksums_[1] || e != this.checksums_[2] || this.radius_ != this.checksums_[3] || this.radius2_ != this.checksums_[4] || this.angle_ != this.checksums_[5] || this.points_ != this.checksums_[6]) {
                var i = "r" + t + e + (void 0 !== this.radius_ ? this.radius_.toString() : "-") + (void 0 !== this.radius2_ ? this.radius2_.toString() : "-") + (void 0 !== this.angle_ ? this.angle_.toString() : "-") + (void 0 !== this.points_ ? this.points_.toString() : "-");
                this.checksums_ = [i, t, e, this.radius_, this.radius2_, this.angle_, this.points_]
            }
            return this.checksums_[0]
        }, e
    }(Yi), Xi = function (i) {
        function e(t) {
            var e = t || {};
            i.call(this, {
                points: 1 / 0,
                fill: e.fill,
                radius: e.radius,
                stroke: e.stroke,
                atlasManager: e.atlasManager
            })
        }

        return i && (e.__proto__ = i), ((e.prototype = Object.create(i && i.prototype)).constructor = e).prototype.clone = function () {
            var t = new e({
                fill: this.getFill() ? this.getFill().clone() : void 0,
                stroke: this.getStroke() ? this.getStroke().clone() : void 0,
                radius: this.getRadius(),
                atlasManager: this.atlasManager_
            });
            return t.setOpacity(this.getOpacity()), t.setScale(this.getScale()), t
        }, e.prototype.setRadius = function (t) {
            this.radius_ = t, this.render_(this.atlasManager_)
        }, e
    }(Bi), zi = function (t) {
        var e = t || {};
        this.color_ = void 0 !== e.color ? e.color : null, this.checksum_ = void 0
    };
    zi.prototype.clone = function () {
        var t = this.getColor();
        return new zi({color: t && t.slice ? t.slice() : t || void 0})
    }, zi.prototype.getColor = function () {
        return this.color_
    }, zi.prototype.setColor = function (t) {
        this.color_ = t, this.checksum_ = void 0
    }, zi.prototype.getChecksum = function () {
        return void 0 === this.checksum_ && (this.color_ instanceof CanvasPattern || this.color_ instanceof CanvasGradient ? this.checksum_ = Ct(this.color_).toString() : this.checksum_ = "f" + (this.color_ ? Fe(this.color_) : "-")), this.checksum_
    };
    var Vi = function (t) {
        var e = t || {};
        this.color_ = void 0 !== e.color ? e.color : null, this.lineCap_ = e.lineCap, this.lineDash_ = void 0 !== e.lineDash ? e.lineDash : null, this.lineDashOffset_ = e.lineDashOffset, this.lineJoin_ = e.lineJoin, this.miterLimit_ = e.miterLimit, this.width_ = e.width, this.checksum_ = void 0
    };
    Vi.prototype.clone = function () {
        var t = this.getColor();
        return new Vi({
            color: t && t.slice ? t.slice() : t || void 0,
            lineCap: this.getLineCap(),
            lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0,
            lineDashOffset: this.getLineDashOffset(),
            lineJoin: this.getLineJoin(),
            miterLimit: this.getMiterLimit(),
            width: this.getWidth()
        })
    }, Vi.prototype.getColor = function () {
        return this.color_
    }, Vi.prototype.getLineCap = function () {
        return this.lineCap_
    }, Vi.prototype.getLineDash = function () {
        return this.lineDash_
    }, Vi.prototype.getLineDashOffset = function () {
        return this.lineDashOffset_
    }, Vi.prototype.getLineJoin = function () {
        return this.lineJoin_
    }, Vi.prototype.getMiterLimit = function () {
        return this.miterLimit_
    }, Vi.prototype.getWidth = function () {
        return this.width_
    }, Vi.prototype.setColor = function (t) {
        this.color_ = t, this.checksum_ = void 0
    }, Vi.prototype.setLineCap = function (t) {
        this.lineCap_ = t, this.checksum_ = void 0
    }, Vi.prototype.setLineDash = function (t) {
        this.lineDash_ = t, this.checksum_ = void 0
    }, Vi.prototype.setLineDashOffset = function (t) {
        this.lineDashOffset_ = t, this.checksum_ = void 0
    }, Vi.prototype.setLineJoin = function (t) {
        this.lineJoin_ = t, this.checksum_ = void 0
    }, Vi.prototype.setMiterLimit = function (t) {
        this.miterLimit_ = t, this.checksum_ = void 0
    }, Vi.prototype.setWidth = function (t) {
        this.width_ = t, this.checksum_ = void 0
    }, Vi.prototype.getChecksum = function () {
        return void 0 === this.checksum_ && (this.checksum_ = "s", this.color_ ? "string" == typeof this.color_ ? this.checksum_ += this.color_ : this.checksum_ += Ct(this.color_).toString() : this.checksum_ += "-", this.checksum_ += "," + (void 0 !== this.lineCap_ ? this.lineCap_.toString() : "-") + "," + (this.lineDash_ ? this.lineDash_.toString() : "-") + "," + (void 0 !== this.lineDashOffset_ ? this.lineDashOffset_ : "-") + "," + (void 0 !== this.lineJoin_ ? this.lineJoin_ : "-") + "," + (void 0 !== this.miterLimit_ ? this.miterLimit_.toString() : "-") + "," + (void 0 !== this.width_ ? this.width_.toString() : "-")), this.checksum_
    };
    var Wi = function (t) {
        var e = t || {};
        this.geometry_ = null, this.geometryFunction_ = qi, void 0 !== e.geometry && this.setGeometry(e.geometry), this.fill_ = void 0 !== e.fill ? e.fill : null, this.image_ = void 0 !== e.image ? e.image : null, this.renderer_ = void 0 !== e.renderer ? e.renderer : null, this.stroke_ = void 0 !== e.stroke ? e.stroke : null, this.text_ = void 0 !== e.text ? e.text : null, this.zIndex_ = e.zIndex
    };
    Wi.prototype.clone = function () {
        var t = this.getGeometry();
        return t && t.clone && (t = t.clone()), new Wi({
            geometry: t,
            fill: this.getFill() ? this.getFill().clone() : void 0,
            image: this.getImage() ? this.getImage().clone() : void 0,
            stroke: this.getStroke() ? this.getStroke().clone() : void 0,
            text: this.getText() ? this.getText().clone() : void 0,
            zIndex: this.getZIndex()
        })
    }, Wi.prototype.getRenderer = function () {
        return this.renderer_
    }, Wi.prototype.setRenderer = function (t) {
        this.renderer_ = t
    }, Wi.prototype.getGeometry = function () {
        return this.geometry_
    }, Wi.prototype.getGeometryFunction = function () {
        return this.geometryFunction_
    }, Wi.prototype.getFill = function () {
        return this.fill_
    }, Wi.prototype.setFill = function (t) {
        this.fill_ = t
    }, Wi.prototype.getImage = function () {
        return this.image_
    }, Wi.prototype.setImage = function (t) {
        this.image_ = t
    }, Wi.prototype.getStroke = function () {
        return this.stroke_
    }, Wi.prototype.setStroke = function (t) {
        this.stroke_ = t
    }, Wi.prototype.getText = function () {
        return this.text_
    }, Wi.prototype.setText = function (t) {
        this.text_ = t
    }, Wi.prototype.getZIndex = function () {
        return this.zIndex_
    }, Wi.prototype.setGeometry = function (e) {
        "function" == typeof e ? this.geometryFunction_ = e : "string" == typeof e ? this.geometryFunction_ = function (t) {
            return t.get(e)
        } : e ? void 0 !== e && (this.geometryFunction_ = function () {
            return e
        }) : this.geometryFunction_ = qi, this.geometry_ = e
    }, Wi.prototype.setZIndex = function (t) {
        this.zIndex_ = t
    };
    var Ki = null;

    function Hi(t, e) {
        if (!Ki) {
            var i = new zi({color: "rgba(255,255,255,0.4)"}), r = new Vi({color: "#3399CC", width: 1.25});
            Ki = [new Wi({image: new Xi({fill: i, stroke: r, radius: 5}), fill: i, stroke: r})]
        }
        return Ki
    }

    function Zi() {
        var t = {}, e = [255, 255, 255, 1], i = [0, 153, 255, 1];
        return t[Lt.POLYGON] = [new Wi({fill: new zi({color: [255, 255, 255, .5]})})], t[Lt.MULTI_POLYGON] = t[Lt.POLYGON], t[Lt.LINE_STRING] = [new Wi({
            stroke: new Vi({
                color: e,
                width: 5
            })
        }), new Wi({
            stroke: new Vi({
                color: i,
                width: 3
            })
        })], t[Lt.MULTI_LINE_STRING] = t[Lt.LINE_STRING], t[Lt.CIRCLE] = t[Lt.POLYGON].concat(t[Lt.LINE_STRING]), t[Lt.POINT] = [new Wi({
            image: new Xi({
                radius: 6,
                fill: new zi({color: i}),
                stroke: new Vi({color: e, width: 1.5})
            }), zIndex: 1 / 0
        })], t[Lt.MULTI_POINT] = t[Lt.POINT], t[Lt.GEOMETRY_COLLECTION] = t[Lt.POLYGON].concat(t[Lt.LINE_STRING], t[Lt.POINT]), t
    }

    function qi(t) {
        return t.getGeometry()
    }

    var Ji = function (r) {
        function n(t) {
            if (r.call(this), this.id_ = void 0, this.geometryName_ = "geometry", this.style_ = null, this.styleFunction_ = void 0, this.geometryChangeKey_ = null, C(this, b(this.geometryName_), this.handleGeometryChanged_, this), void 0 !== t) if (t instanceof Ie || !t) {
                var e = t;
                this.setGeometry(e)
            } else {
                var i = t;
                this.setProperties(i)
            }
        }

        return r && (n.__proto__ = r), ((n.prototype = Object.create(r && r.prototype)).constructor = n).prototype.clone = function () {
            var t = new n(this.getProperties());
            t.setGeometryName(this.getGeometryName());
            var e = this.getGeometry();
            e && t.setGeometry(e.clone());
            var i = this.getStyle();
            return i && t.setStyle(i), t
        }, n.prototype.getGeometry = function () {
            return this.get(this.geometryName_)
        }, n.prototype.getId = function () {
            return this.id_
        }, n.prototype.getGeometryName = function () {
            return this.geometryName_
        }, n.prototype.getStyle = function () {
            return this.style_
        }, n.prototype.getStyleFunction = function () {
            return this.styleFunction_
        }, n.prototype.handleGeometryChange_ = function () {
            this.changed()
        }, n.prototype.handleGeometryChanged_ = function () {
            this.geometryChangeKey_ && (g(this.geometryChangeKey_), this.geometryChangeKey_ = null);
            var t = this.getGeometry();
            t && (this.geometryChangeKey_ = C(t, w.CHANGE, this.handleGeometryChange_, this)), this.changed()
        }, n.prototype.setGeometry = function (t) {
            this.set(this.geometryName_, t)
        }, n.prototype.setStyle = function (t) {
            this.style_ = t, this.styleFunction_ = t ? function (t) {
                {
                    return "function" == typeof t ? t : (Array.isArray(t) ? e = t : (Z(t instanceof Wi, 41), e = [t]), function () {
                        return e
                    });
                    var e
                }
            }(t) : void 0, this.changed()
        }, n.prototype.setId = function (t) {
            this.id_ = t, this.changed()
        }, n.prototype.setGeometryName = function (t) {
            d(this, b(this.geometryName_), this.handleGeometryChanged_, this), this.geometryName_ = t, C(this, b(this.geometryName_), this.handleGeometryChanged_, this), this.handleGeometryChanged_()
        }, n
    }(R);
    var Qi = "accuracy", $i = "accuracyGeometry", tr = "altitude", er = "altitudeAccuracy", ir = "heading",
        rr = "position", nr = "projection", or = "speed", sr = "tracking", ar = "trackingOptions";

    function hr(t, e) {
        return e < t ? 1 : t < e ? -1 : 0
    }

    function lr(t, e) {
        return 0 <= t.indexOf(e)
    }

    function ur(t, e, i) {
        var r, n = t.length;
        if (t[0] <= e) return 0;
        if (e <= t[n - 1]) return n - 1;
        if (0 < i) {
            for (r = 1; r < n; ++r) if (t[r] < e) return r - 1
        } else if (i < 0) {
            for (r = 1; r < n; ++r) if (t[r] <= e) return r
        } else for (r = 1; r < n; ++r) {
            if (t[r] == e) return r;
            if (t[r] < e) return t[r - 1] - e < e - t[r] ? r - 1 : r
        }
        return n - 1
    }

    function cr(t, e, i) {
        for (; e < i;) {
            var r = t[e];
            t[e] = t[i], t[i] = r, ++e, --i
        }
    }

    function pr(t, e) {
        for (var i = Array.isArray(e) ? e : [e], r = i.length, n = 0; n < r; n++) t[t.length] = i[n]
    }

    function dr(t, e) {
        for (var i, r = t.length >>> 0, n = 0; n < r; n++) if (e(i = t[n], n, t)) return i;
        return null
    }

    function fr(t, e) {
        var i = t.length;
        if (i !== e.length) return !1;
        for (var r = 0; r < i; r++) if (t[r] !== e[r]) return !1;
        return !0
    }

    function _r(t, i) {
        var e, r = t.length, n = Array(t.length);
        for (e = 0; e < r; e++) n[e] = {index: e, value: t[e]};
        for (n.sort(function (t, e) {
            return i(t.value, e.value) || t.index - e.index
        }), e = 0; e < t.length; e++) t[e] = n[e].value
    }

    function gr(i, r) {
        var n;
        return !i.every(function (t, e) {
            return !r(t, n = e, i)
        }) ? n : -1
    }

    var yr = {XY: "XY", XYZ: "XYZ", XYM: "XYM", XYZM: "XYZM"}, vr = function (t) {
        function e() {
            t.call(this), this.layout = yr.XY, this.stride = 2, this.flatCoordinates = null
        }

        return t && (e.__proto__ = t), ((e.prototype = Object.create(t && t.prototype)).constructor = e).prototype.computeExtent = function (t) {
            return K(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t)
        }, e.prototype.getCoordinates = function () {
        }, e.prototype.getFirstCoordinate = function () {
            return this.flatCoordinates.slice(0, this.stride)
        }, e.prototype.getFlatCoordinates = function () {
            return this.flatCoordinates
        }, e.prototype.getLastCoordinate = function () {
            return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride)
        }, e.prototype.getLayout = function () {
            return this.layout
        }, e.prototype.getSimplifiedGeometry = function (t) {
            if (this.simplifiedGeometryRevision != this.getRevision() && (_(this.simplifiedGeometryCache), this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = this.getRevision()), t < 0 || 0 !== this.simplifiedGeometryMaxMinSquaredTolerance && t <= this.simplifiedGeometryMaxMinSquaredTolerance) return this;
            var e = t.toString();
            if (this.simplifiedGeometryCache.hasOwnProperty(e)) return this.simplifiedGeometryCache[e];
            var i = this.getSimplifiedGeometryInternal(t);
            return i.getFlatCoordinates().length < this.flatCoordinates.length ? this.simplifiedGeometryCache[e] = i : (this.simplifiedGeometryMaxMinSquaredTolerance = t, this)
        }, e.prototype.getSimplifiedGeometryInternal = function (t) {
            return this
        }, e.prototype.getStride = function () {
            return this.stride
        }, e.prototype.setFlatCoordinates = function (t, e) {
            this.stride = mr(t), this.layout = t, this.flatCoordinates = e
        }, e.prototype.setCoordinates = function (t, e) {
        }, e.prototype.setLayout = function (t, e, i) {
            var r;
            if (t) r = mr(t); else {
                for (var n = 0; n < i; ++n) {
                    if (0 === e.length) return this.layout = yr.XY, void (this.stride = 2);
                    e = e[0]
                }
                t = function (t) {
                    var e;
                    2 == t ? e = yr.XY : 3 == t ? e = yr.XYZ : 4 == t && (e = yr.XYZM);
                    return e
                }(r = e.length)
            }
            this.layout = t, this.stride = r
        }, e.prototype.applyTransform = function (t) {
            this.flatCoordinates && (t(this.flatCoordinates, this.flatCoordinates, this.stride), this.changed())
        }, e.prototype.rotate = function (t, e) {
            var i = this.getFlatCoordinates();
            if (i) {
                var r = this.getStride();
                !function (t, e, i, r, n, o, s) {
                    for (var a = s || [], h = Math.cos(n), l = Math.sin(n), u = o[0], c = o[1], p = 0, d = e; d < i; d += r) {
                        var f = t[d] - u, _ = t[d + 1] - c;
                        a[p++] = u + f * h - _ * l, a[p++] = c + f * l + _ * h;
                        for (var g = d + 2; g < d + r; ++g) a[p++] = t[g]
                    }
                    s && a.length != p && (a.length = p)
                }(i, 0, i.length, r, t, e, i), this.changed()
            }
        }, e.prototype.scale = function (t, e, i) {
            var r = e;
            void 0 === r && (r = t);
            var n = i;
            n || (n = ot(this.getExtent()));
            var o = this.getFlatCoordinates();
            if (o) {
                var s = this.getStride();
                !function (t, e, i, r, n, o, s, a) {
                    for (var h = a || [], l = s[0], u = s[1], c = 0, p = e; p < i; p += r) {
                        var d = t[p] - l, f = t[p + 1] - u;
                        h[c++] = l + n * d, h[c++] = u + o * f;
                        for (var _ = p + 2; _ < p + r; ++_) h[c++] = t[_]
                    }
                    a && h.length != c && (h.length = c)
                }(o, 0, o.length, s, t, r, n, o), this.changed()
            }
        }, e.prototype.translate = function (t, e) {
            var i = this.getFlatCoordinates();
            if (i) {
                var r = this.getStride();
                _t(i, 0, i.length, r, t, e, i), this.changed()
            }
        }, e
    }(Ie);

    function mr(t) {
        var e;
        return t == yr.XY ? e = 2 : t == yr.XYZ || t == yr.XYM ? e = 3 : t == yr.XYZM && (e = 4), e
    }

    function xr(t, e, i, r) {
        for (var n = 0, o = t[i - r], s = t[i - r + 1]; e < i; e += r) {
            var a = t[e], h = t[e + 1];
            n += s * a - o * h, o = a, s = h
        }
        return n / 2
    }

    function Sr(t, e, i, r) {
        for (var n = 0, o = 0, s = i.length; o < s; ++o) {
            var a = i[o];
            n += xr(t, e, a, r), e = a
        }
        return n
    }

    function Er(t, e, i, r, n, o, s) {
        var a, h = t[e], l = t[e + 1], u = t[i] - h, c = t[i + 1] - l;
        if (0 === u && 0 === c) a = e; else {
            var p = ((n - h) * u + (o - l) * c) / (u * u + c * c);
            if (1 < p) a = i; else {
                if (0 < p) {
                    for (var d = 0; d < r; ++d) s[d] = It(t[e + d], t[i + d], p);
                    return void (s.length = r)
                }
                a = e
            }
        }
        for (var f = 0; f < r; ++f) s[f] = t[a + f];
        s.length = r
    }

    function Cr(t, e, i, r, n) {
        var o = t[e], s = t[e + 1];
        for (e += r; e < i; e += r) {
            var a = t[e], h = t[e + 1], l = mt(o, s, a, h);
            n < l && (n = l), o = a, s = h
        }
        return n
    }

    function Tr(t, e, i, r, n) {
        for (var o = 0, s = i.length; o < s; ++o) {
            var a = i[o];
            n = Cr(t, e, a, r, n), e = a
        }
        return n
    }

    function wr(t, e, i, r, n, o, s, a, h, l, u) {
        if (e == i) return l;
        var c, p;
        if (0 === n) {
            if ((p = mt(s, a, t[e], t[e + 1])) < l) {
                for (c = 0; c < r; ++c) h[c] = t[e + c];
                return h.length = r, p
            }
            return l
        }
        for (var d = u || [NaN, NaN], f = e + r; f < i;) if (Er(t, f - r, f, r, s, a, d), (p = mt(s, a, d[0], d[1])) < l) {
            for (l = p, c = 0; c < r; ++c) h[c] = d[c];
            f += h.length = r
        } else f += r * Math.max((Math.sqrt(p) - Math.sqrt(l)) / n | 0, 1);
        if (o && (Er(t, i - r, e, r, s, a, d), (p = mt(s, a, d[0], d[1])) < l)) {
            for (l = p, c = 0; c < r; ++c) h[c] = d[c];
            h.length = r
        }
        return l
    }

    function Rr(t, e, i, r, n, o, s, a, h, l, u) {
        for (var c = u || [NaN, NaN], p = 0, d = i.length; p < d; ++p) {
            var f = i[p];
            l = wr(t, e, f, r, n, o, s, a, h, l, c), e = f
        }
        return l
    }

    function Ir(t, e, i, r) {
        for (var n = 0, o = i.length; n < o; ++n) t[e++] = i[n];
        return e
    }

    function Lr(t, e, i, r) {
        for (var n = 0, o = i.length; n < o; ++n) for (var s = i[n], a = 0; a < r; ++a) t[e++] = s[a];
        return e
    }

    function br(t, e, i, r, n) {
        for (var o = n || [], s = 0, a = 0, h = i.length; a < h; ++a) {
            var l = Lr(t, e, i[a], r);
            e = o[s++] = l
        }
        return o.length = s, o
    }

    function Fr(t, e, i, r, n) {
        for (var o = void 0 !== n ? n : [], s = 0, a = e; a < i; a += r) o[s++] = t.slice(a, a + r);
        return o.length = s, o
    }

    function Pr(t, e, i, r, n) {
        for (var o = void 0 !== n ? n : [], s = 0, a = 0, h = i.length; a < h; ++a) {
            var l = i[a];
            o[s++] = Fr(t, e, l, r, o[s]), e = l
        }
        return o.length = s, o
    }

    function Mr(t, e, i, r, n) {
        for (var o = void 0 !== n ? n : [], s = 0, a = 0, h = i.length; a < h; ++a) {
            var l = i[a];
            o[s++] = Pr(t, e, l, r, o[s]), e = l[l.length - 1]
        }
        return o.length = s, o
    }

    function Or(t, e, i, r, n, o, s) {
        var a = (i - e) / r;
        if (a < 3) {
            for (; e < i; e += r) o[s++] = t[e], o[s++] = t[e + 1];
            return s
        }
        var h = new Array(a);
        h[0] = 1, h[a - 1] = 1;
        for (var l = [e, i - r], u = 0; 0 < l.length;) {
            for (var c = l.pop(), p = l.pop(), d = 0, f = t[p], _ = t[p + 1], g = t[c], y = t[c + 1], v = p + r; v < c; v += r) {
                var m = vt(t[v], t[v + 1], f, _, g, y);
                d < m && (u = v, d = m)
            }
            n < d && (h[(u - e) / r] = 1, p + r < u && l.push(p, u), u + r < c && l.push(u, c))
        }
        for (var x = 0; x < a; ++x) h[x] && (o[s++] = t[e + x * r], o[s++] = t[e + x * r + 1]);
        return s
    }

    function Nr(t, e) {
        return e * Math.round(t / e)
    }

    function Ar(t, e, i, r, n, o, s) {
        if (e == i) return s;
        var a, h, l = Nr(t[e], n), u = Nr(t[e + 1], n);
        e += r, o[s++] = l, o[s++] = u;
        do {
            if (a = Nr(t[e], n), h = Nr(t[e + 1], n), (e += r) == i) return o[s++] = a, o[s++] = h, s
        } while (a == l && h == u);
        for (; e < i;) {
            var c = Nr(t[e], n), p = Nr(t[e + 1], n);
            if (e += r, c != a || p != h) {
                var d = a - l, f = h - u, _ = c - l, g = p - u;
                d * g == f * _ && (d < 0 && _ < d || d == _ || 0 < d && d < _) && (f < 0 && g < f || f == g || 0 < f && f < g) || (l = o[s++] = a, u = o[s++] = h), a = c, h = p
            }
        }
        return o[s++] = a, o[s++] = h, s
    }

    function Gr(t, e, i, r, n, o, s, a) {
        for (var h = 0, l = i.length; h < l; ++h) {
            var u = i[h];
            s = Ar(t, e, u, r, n, o, s), a.push(s), e = u
        }
        return s
    }

    vr.prototype.containsXY = v;
    var kr = function (i) {
        function r(t, e) {
            i.call(this), this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, void 0 === e || Array.isArray(t[0]) ? this.setCoordinates(t, e) : this.setFlatCoordinates(e, t)
        }

        return i && (r.__proto__ = i), ((r.prototype = Object.create(i && i.prototype)).constructor = r).prototype.clone = function () {
            return new r(this.flatCoordinates.slice(), this.layout)
        }, r.prototype.closestPointXY = function (t, e, i, r) {
            return r < D(this.getExtent(), t, e) ? r : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(Cr(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0)), this.maxDeltaRevision_ = this.getRevision()), wr(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, !0, t, e, i, r))
        }, r.prototype.getArea = function () {
            return xr(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride)
        }, r.prototype.getCoordinates = function () {
            return Fr(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride)
        }, r.prototype.getSimplifiedGeometryInternal = function (t) {
            var e = [];
            return e.length = Or(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t, e, 0), new r(e, yr.XY)
        }, r.prototype.getType = function () {
            return Lt.LINEAR_RING
        }, r.prototype.intersectsExtent = function (t) {
        }, r.prototype.setCoordinates = function (t, e) {
            this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Lr(this.flatCoordinates, 0, t, this.stride), this.changed()
        }, r
    }(vr), Dr = function (i) {
        function t(t, e) {
            i.call(this), this.setCoordinates(t, e)
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.clone = function () {
            return new t(this.flatCoordinates.slice(), this.layout)
        }, t.prototype.closestPointXY = function (t, e, i, r) {
            var n = this.flatCoordinates, o = mt(t, e, n[0], n[1]);
            if (o < r) {
                for (var s = this.stride, a = 0; a < s; ++a) i[a] = n[a];
                return i.length = s, o
            }
            return r
        }, t.prototype.getCoordinates = function () {
            return this.flatCoordinates ? this.flatCoordinates.slice() : []
        }, t.prototype.computeExtent = function (t) {
            return V(this.flatCoordinates, t)
        }, t.prototype.getType = function () {
            return Lt.POINT
        }, t.prototype.intersectsExtent = function (t) {
            return U(t, this.flatCoordinates[0], this.flatCoordinates[1])
        }, t.prototype.setCoordinates = function (t, e) {
            this.setLayout(e, t, 0), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Ir(this.flatCoordinates, 0, t, this.stride), this.changed()
        }, t
    }(vr);

    function jr(e, i, r, n, t) {
        return !et(t, function (t) {
            return !Ur(e, i, r, n, t[0], t[1])
        })
    }

    function Ur(t, e, i, r, n, o) {
        for (var s = 0, a = t[i - r], h = t[i - r + 1]; e < i; e += r) {
            var l = t[e], u = t[e + 1];
            h <= o ? o < u && 0 < (l - a) * (o - h) - (n - a) * (u - h) && s++ : u <= o && (l - a) * (o - h) - (n - a) * (u - h) < 0 && s--, a = l, h = u
        }
        return 0 !== s
    }

    function Yr(t, e, i, r, n, o) {
        if (0 === i.length) return !1;
        if (!Ur(t, e, i[0], r, n, o)) return !1;
        for (var s = 1, a = i.length; s < a; ++s) if (Ur(t, i[s - 1], i[s], r, n, o)) return !1;
        return !0
    }

    function Br(t, e, i, r, n, o, s) {
        for (var a, h, l, u, c, p, d, f = n[o + 1], _ = [], g = 0, y = i.length; g < y; ++g) {
            var v = i[g];
            for (u = t[v - r], p = t[v - r + 1], a = e; a < v; a += r) c = t[a], d = t[a + 1], (f <= p && d <= f || p <= f && f <= d) && (l = (f - p) / (d - p) * (c - u) + u, _.push(l)), u = c, p = d
        }
        var m = NaN, x = -1 / 0;
        for (_.sort(hr), u = _[0], a = 1, h = _.length; a < h; ++a) {
            c = _[a];
            var S = Math.abs(c - u);
            x < S && Yr(t, e, i, r, l = (u + c) / 2, f) && (m = l, x = S), u = c
        }
        return isNaN(m) && (m = n[o]), s ? (s.push(m, f, x), s) : [m, f, x]
    }

    function Xr(t, e, i, r, n) {
        for (var o = [], s = 0, a = i.length; s < a; ++s) {
            var h = i[s];
            o = Br(t, e, h, r, n, 2 * s, o), e = h[h.length - 1]
        }
        return o
    }

    function zr(t, e, i, r, n, o) {
        for (var s, a = [t[e], t[e + 1]], h = []; e + r < i; e += r) {
            if (h[0] = t[e + r], h[1] = t[e + r + 1], s = n.call(o, a, h)) return s;
            a[0] = h[0], a[1] = h[1]
        }
        return !1
    }

    function Vr(t, e, i, r, n) {
        var o = J([1 / 0, 1 / 0, -1 / 0, -1 / 0], t, e, i, r);
        return !!wt(n, o) && (!!Q(n, o) || (o[0] >= n[0] && o[2] <= n[2] || (o[1] >= n[1] && o[3] <= n[3] || zr(t, e, i, r, function (t, e) {
            return function (t, e, i) {
                var r = !1, n = Y(t, e), o = Y(t, i);
                if (n === N.INTERSECTING || o === N.INTERSECTING) r = !0; else {
                    var s, a, h = t[0], l = t[1], u = t[2], c = t[3], p = e[0], d = e[1], f = i[0], _ = i[1],
                        g = (_ - d) / (f - p);
                    o & N.ABOVE && !(n & N.ABOVE) && (r = h <= (s = f - (_ - c) / g) && s <= u), r || !(o & N.RIGHT) || n & N.RIGHT || (r = l <= (a = _ - (f - u) * g) && a <= c), r || !(o & N.BELOW) || n & N.BELOW || (r = h <= (s = f - (_ - l) / g) && s <= u), r || !(o & N.LEFT) || n & N.LEFT || (r = l <= (a = _ - (f - h) * g) && a <= c)
                }
                return r
            }(n, t, e)
        }))))
    }

    function Wr(t, e, i, r, n) {
        if (o = t, s = e, a = i[0], !(Vr(o, s, a, h = r, l = n) || Ur(o, s, a, h, l[0], l[1]) || Ur(o, s, a, h, l[0], l[3]) || Ur(o, s, a, h, l[2], l[1]) || Ur(o, s, a, h, l[2], l[3]))) return !1;
        var o, s, a, h, l;
        if (1 === i.length) return !0;
        for (var u = 1, c = i.length; u < c; ++u) if (jr(t, i[u - 1], i[u], r, n)) return !1;
        return !0
    }

    function Kr(t, e, i, r) {
        for (; e < i - r;) {
            for (var n = 0; n < r; ++n) {
                var o = t[e + n];
                t[e + n] = t[i - r + n], t[i - r + n] = o
            }
            e += r, i -= r
        }
    }

    function Hr(t, e, i, r) {
        for (var n = 0, o = t[i - r], s = t[i - r + 1]; e < i; e += r) {
            var a = t[e], h = t[e + 1];
            n += (a - o) * (h + s), o = a, s = h
        }
        return 0 < n
    }

    function Zr(t, e, i, r, n) {
        for (var o = void 0 !== n && n, s = 0, a = i.length; s < a; ++s) {
            var h = i[s], l = Hr(t, e, h, r);
            if (0 === s) {
                if (o && l || !o && !l) return !1
            } else if (o && !l || !o && l) return !1;
            e = h
        }
        return !0
    }

    function qr(t, e, i, r, n) {
        for (var o = void 0 !== n && n, s = 0, a = i.length; s < a; ++s) {
            var h = i[s], l = Hr(t, e, h, r);
            (0 === s ? o && l || !o && !l : o && !l || !o && l) && Kr(t, e, h, r), e = h
        }
        return e
    }

    function Jr(t, e, i, r, n) {
        for (var o = 0, s = i.length; o < s; ++o) e = qr(t, e, i[o], r, n);
        return e
    }

    var Qr = function (r) {
        function n(t, e, i) {
            r.call(this), this.ends_ = [], this.flatInteriorPointRevision_ = -1, this.flatInteriorPoint_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, void 0 !== e && i ? (this.setFlatCoordinates(e, t), this.ends_ = i) : this.setCoordinates(t, e)
        }

        return r && (n.__proto__ = r), ((n.prototype = Object.create(r && r.prototype)).constructor = n).prototype.appendLinearRing = function (t) {
            this.flatCoordinates ? pr(this.flatCoordinates, t.getFlatCoordinates()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed()
        }, n.prototype.clone = function () {
            return new n(this.flatCoordinates.slice(), this.layout, this.ends_.slice())
        }, n.prototype.closestPointXY = function (t, e, i, r) {
            return r < D(this.getExtent(), t, e) ? r : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(Tr(this.flatCoordinates, 0, this.ends_, this.stride, 0)), this.maxDeltaRevision_ = this.getRevision()), Rr(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, !0, t, e, i, r))
        }, n.prototype.containsXY = function (t, e) {
            return Yr(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t, e)
        }, n.prototype.getArea = function () {
            return Sr(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride)
        }, n.prototype.getCoordinates = function (t) {
            var e;
            return void 0 !== t ? qr(e = this.getOrientedFlatCoordinates().slice(), 0, this.ends_, this.stride, t) : e = this.flatCoordinates, Pr(e, 0, this.ends_, this.stride)
        }, n.prototype.getEnds = function () {
            return this.ends_
        }, n.prototype.getFlatInteriorPoint = function () {
            if (this.flatInteriorPointRevision_ != this.getRevision()) {
                var t = ot(this.getExtent());
                this.flatInteriorPoint_ = Br(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t, 0), this.flatInteriorPointRevision_ = this.getRevision()
            }
            return this.flatInteriorPoint_
        }, n.prototype.getInteriorPoint = function () {
            return new Dr(this.getFlatInteriorPoint(), yr.XYM)
        }, n.prototype.getLinearRingCount = function () {
            return this.ends_.length
        }, n.prototype.getLinearRing = function (t) {
            return t < 0 || this.ends_.length <= t ? null : new kr(this.flatCoordinates.slice(0 === t ? 0 : this.ends_[t - 1], this.ends_[t]), this.layout)
        }, n.prototype.getLinearRings = function () {
            for (var t = this.layout, e = this.flatCoordinates, i = this.ends_, r = [], n = 0, o = 0, s = i.length; o < s; ++o) {
                var a = i[o], h = new kr(e.slice(n, a), t);
                r.push(h), n = a
            }
            return r
        }, n.prototype.getOrientedFlatCoordinates = function () {
            if (this.orientedRevision_ != this.getRevision()) {
                var t = this.flatCoordinates;
                Zr(t, 0, this.ends_, this.stride) ? this.orientedFlatCoordinates_ = t : (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = qr(this.orientedFlatCoordinates_, 0, this.ends_, this.stride)), this.orientedRevision_ = this.getRevision()
            }
            return this.orientedFlatCoordinates_
        }, n.prototype.getSimplifiedGeometryInternal = function (t) {
            var e = [], i = [];
            return e.length = Gr(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(t), e, 0, i), new n(e, yr.XY, i)
        }, n.prototype.getType = function () {
            return Lt.POLYGON
        }, n.prototype.intersectsExtent = function (t) {
            return Wr(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t)
        }, n.prototype.setCoordinates = function (t, e) {
            this.setLayout(e, t, 2), this.flatCoordinates || (this.flatCoordinates = []);
            var i = br(this.flatCoordinates, 0, t, this.stride, this.ends_);
            this.flatCoordinates.length = 0 === i.length ? 0 : i[i.length - 1], this.changed()
        }, n
    }(vr);

    function $r(t, e, i, r) {
        for (var n, o, s, a, h, l, u, c, p = i || 32, d = [], f = 0; f < p; ++f) pr(d, (n = t, o = e, s = 2 * Math.PI * f / p, void 0, a = r || bt, h = St(n[1]), l = St(n[0]), u = o / a, c = Math.asin(Math.sin(h) * Math.cos(u) + Math.cos(h) * Math.sin(u) * Math.cos(s)), [xt(l + Math.atan2(Math.sin(s) * Math.sin(u) * Math.cos(h), Math.cos(u) - Math.sin(h) * Math.sin(c))), xt(c)]));
        return d.push(d[0], d[1]), new Qr(d, yr.XY, [d.length])
    }

    function tn(t) {
        var e = t[0], i = t[1], r = t[2], n = t[3], o = [e, i, e, n, r, n, r, i, e, i];
        return new Qr(o, yr.XY, [o.length])
    }

    function en(t, e, i) {
        for (var r = e || 32, n = t.getStride(), o = t.getLayout(), s = t.getCenter(), a = n * (r + 1), h = new Array(a), l = 0; l < a; l += n) {
            h[l] = 0, h[l + 1] = 0;
            for (var u = 2; u < n; u++) h[l + u] = s[u]
        }
        var c = [h.length], p = new Qr(h, o, c);
        return rn(p, s, t.getRadius(), i), p
    }

    function rn(t, e, i, r) {
        for (var n = t.getFlatCoordinates(), o = t.getStride(), s = n.length / o - 1, a = r || 0, h = 0; h <= s; ++h) {
            var l = h * o, u = a + 2 * Et(h, s) * Math.PI / s;
            n[l] = e[0] + i * Math.cos(u), n[l + 1] = e[1] + i * Math.sin(u)
        }
        t.changed()
    }

    var nn = function (i) {
        function t(t) {
            i.call(this);
            var e = t || {};
            this.position_ = null, this.transform_ = ie, this.watchId_ = void 0, C(this, b(nr), this.handleProjectionChanged_, this), C(this, b(sr), this.handleTrackingChanged_, this), void 0 !== e.projection && this.setProjection(e.projection), void 0 !== e.trackingOptions && this.setTrackingOptions(e.trackingOptions), this.setTracking(void 0 !== e.tracking && e.tracking)
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.disposeInternal = function () {
            this.setTracking(!1), i.prototype.disposeInternal.call(this)
        }, t.prototype.handleProjectionChanged_ = function () {
            var t = this.getProjection();
            t && (this.transform_ = ce(ne("EPSG:4326"), t), this.position_ && this.set(rr, this.transform_(this.position_)))
        }, t.prototype.handleTrackingChanged_ = function () {
            if (li) {
                var t = this.getTracking();
                t && void 0 === this.watchId_ ? this.watchId_ = navigator.geolocation.watchPosition(this.positionChange_.bind(this), this.positionError_.bind(this), this.getTrackingOptions()) : t || void 0 === this.watchId_ || (navigator.geolocation.clearWatch(this.watchId_), this.watchId_ = void 0)
            }
        }, t.prototype.positionChange_ = function (t) {
            var e = t.coords;
            this.set(Qi, e.accuracy), this.set(tr, null === e.altitude ? void 0 : e.altitude), this.set(er, null === e.altitudeAccuracy ? void 0 : e.altitudeAccuracy), this.set(ir, null === e.heading ? void 0 : St(e.heading)), this.position_ ? (this.position_[0] = e.longitude, this.position_[1] = e.latitude) : this.position_ = [e.longitude, e.latitude];
            var i = this.transform_(this.position_);
            this.set(rr, i), this.set(or, null === e.speed ? void 0 : e.speed);
            var r = $r(this.position_, e.accuracy);
            r.applyTransform(this.transform_), this.set($i, r), this.changed()
        }, t.prototype.positionError_ = function (t) {
            t.type = w.ERROR, this.setTracking(!1), this.dispatchEvent(t)
        }, t.prototype.getAccuracy = function () {
            return this.get(Qi)
        }, t.prototype.getAccuracyGeometry = function () {
            return this.get($i) || null
        }, t.prototype.getAltitude = function () {
            return this.get(tr)
        }, t.prototype.getAltitudeAccuracy = function () {
            return this.get(er)
        }, t.prototype.getHeading = function () {
            return this.get(ir)
        }, t.prototype.getPosition = function () {
            return this.get(rr)
        }, t.prototype.getProjection = function () {
            return this.get(nr)
        }, t.prototype.getSpeed = function () {
            return this.get(or)
        }, t.prototype.getTracking = function () {
            return this.get(sr)
        }, t.prototype.getTrackingOptions = function () {
            return this.get(ar)
        }, t.prototype.setProjection = function (t) {
            this.set(nr, ne(t))
        }, t.prototype.setTracking = function (t) {
            this.set(sr, t)
        }, t.prototype.setTrackingOptions = function (t) {
            this.set(ar, t)
        }, t
    }(R);

    function on(t, e, i) {
        var r = void 0 !== i ? t.toFixed(i) : "" + t, n = r.indexOf(".");
        return e < (n = -1 === n ? r.length : n) ? r : new Array(1 + e - n).join("0") + r
    }

    function sn(t, e) {
        for (var i = ("" + t).split("."), r = ("" + e).split("."), n = 0; n < Math.max(i.length, r.length); n++) {
            var o = parseInt(i[n] || "0", 10), s = parseInt(r[n] || "0", 10);
            if (s < o) return 1;
            if (o < s) return -1
        }
        return 0
    }

    function an(t, e) {
        return t[0] += e[0], t[1] += e[1], t
    }

    function hn(t, e) {
        var i, r, n = t[0], o = t[1], s = e[0], a = e[1], h = s[0], l = s[1], u = a[0], c = a[1], p = u - h, d = c - l,
            f = 0 === p && 0 === d ? 0 : (p * (n - h) + d * (o - l)) / (p * p + d * d || 0);
        return f <= 0 ? (i = h, r = l) : 1 <= f ? (i = u, r = c) : (i = h + f * p, r = l + f * d), [i, r]
    }

    function ln(t, e, i) {
        var r = Et(e + 180, 360) - 180, n = Math.abs(3600 * r), o = i || 0, s = Math.pow(10, o),
            a = Math.floor(n / 3600), h = Math.floor((n - 3600 * a) / 60), l = n - 3600 * a - 60 * h;
        return 60 <= (l = Math.ceil(l * s) / s) && (l = 0, h += 1), 60 <= h && (h = 0, a += 1), a + "° " + on(h, 2) + "′ " + on(l, 2, o) + "″" + (0 == r ? "" : " " + t.charAt(r < 0 ? 1 : 0))
    }

    function un(t, e, i) {
        return t ? e.replace("{x}", t[0].toFixed(i)).replace("{y}", t[1].toFixed(i)) : ""
    }

    function cn(t, e) {
        for (var i = !0, r = t.length - 1; 0 <= r; --r) if (t[r] != e[r]) {
            i = !1;
            break
        }
        return i
    }

    function pn(t, e) {
        var i = Math.cos(e), r = Math.sin(e), n = t[0] * i - t[1] * r, o = t[1] * i + t[0] * r;
        return t[0] = n, t[1] = o, t
    }

    function dn(t, e) {
        return t[0] *= e, t[1] *= e, t
    }

    function fn(t, e) {
        var i = t[0] - e[0], r = t[1] - e[1];
        return i * i + r * r
    }

    function _n(t, e) {
        return Math.sqrt(fn(t, e))
    }

    function gn(t, e) {
        return fn(t, hn(t, e))
    }

    function yn(t, e) {
        return un(t, "{x}, {y}", e)
    }

    function vn(t, e, i, r, n, o) {
        var s = NaN, a = NaN, h = (i - e) / r;
        if (1 === h) s = t[e], a = t[e + 1]; else if (2 == h) s = (1 - n) * t[e] + n * t[e + r], a = (1 - n) * t[e + 1] + n * t[e + r + 1]; else if (0 !== h) {
            for (var l = t[e], u = t[e + 1], c = 0, p = [0], d = e + r; d < i; d += r) {
                var f = t[d], _ = t[d + 1];
                c += Math.sqrt((f - l) * (f - l) + (_ - u) * (_ - u)), p.push(c), l = f, u = _
            }
            var g = n * c, y = function (t, e, i) {
                for (var r, n, o = i || hr, s = 0, a = t.length, h = !1; s < a;) (n = +o(t[r = s + (a - s >> 1)], e)) < 0 ? s = r + 1 : (a = r, h = !n);
                return h ? s : ~s
            }(p, g);
            if (y < 0) {
                var v = (g - p[-y - 2]) / (p[-y - 1] - p[-y - 2]), m = e + (-y - 2) * r;
                s = It(t[m], t[m + r], v), a = It(t[m + 1], t[m + r + 1], v)
            } else s = t[e + y * r], a = t[e + y * r + 1]
        }
        return o ? (o[0] = s, o[1] = a, o) : [s, a]
    }

    function mn(t, e, i, r, n, o) {
        if (i == e) return null;
        var s;
        if (n < t[e + r - 1]) return o ? ((s = t.slice(e, e + r))[r - 1] = n, s) : null;
        if (t[i - 1] < n) return o ? ((s = t.slice(i - r, i))[r - 1] = n, s) : null;
        if (n == t[e + r - 1]) return t.slice(e, e + r);
        for (var a = e / r, h = i / r; a < h;) {
            var l = a + h >> 1;
            n < t[(l + 1) * r - 1] ? h = l : a = l + 1
        }
        var u = t[a * r - 1];
        if (n == u) return t.slice((a - 1) * r, (a - 1) * r + r);
        var c = (n - u) / (t[(a + 1) * r - 1] - u);
        s = [];
        for (var p = 0; p < r - 1; ++p) s.push(It(t[(a - 1) * r + p], t[a * r + p], c));
        return s.push(n), s
    }

    function xn(t, e, i, r) {
        for (var n = t[e], o = t[e + 1], s = 0, a = e + r; a < i; a += r) {
            var h = t[a], l = t[a + 1];
            s += Math.sqrt((h - n) * (h - n) + (l - o) * (l - o)), n = h, o = l
        }
        return s
    }

    var Sn = function (i) {
        function r(t, e) {
            i.call(this), this.flatMidpoint_ = null, this.flatMidpointRevision_ = -1, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, void 0 === e || Array.isArray(t[0]) ? this.setCoordinates(t, e) : this.setFlatCoordinates(e, t)
        }

        return i && (r.__proto__ = i), ((r.prototype = Object.create(i && i.prototype)).constructor = r).prototype.appendCoordinate = function (t) {
            this.flatCoordinates ? pr(this.flatCoordinates, t) : this.flatCoordinates = t.slice(), this.changed()
        }, r.prototype.clone = function () {
            return new r(this.flatCoordinates.slice(), this.layout)
        }, r.prototype.closestPointXY = function (t, e, i, r) {
            return r < D(this.getExtent(), t, e) ? r : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(Cr(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0)), this.maxDeltaRevision_ = this.getRevision()), wr(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, !1, t, e, i, r))
        }, r.prototype.forEachSegment = function (t) {
            return zr(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t)
        }, r.prototype.getCoordinateAtM = function (t, e) {
            if (this.layout != yr.XYM && this.layout != yr.XYZM) return null;
            var i = void 0 !== e && e;
            return mn(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t, i)
        }, r.prototype.getCoordinates = function () {
            return Fr(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride)
        }, r.prototype.getCoordinateAt = function (t, e) {
            return vn(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t, e)
        }, r.prototype.getLength = function () {
            return xn(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride)
        }, r.prototype.getFlatMidpoint = function () {
            return this.flatMidpointRevision_ != this.getRevision() && (this.flatMidpoint_ = this.getCoordinateAt(.5, this.flatMidpoint_), this.flatMidpointRevision_ = this.getRevision()), this.flatMidpoint_
        }, r.prototype.getSimplifiedGeometryInternal = function (t) {
            var e = [];
            return e.length = Or(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t, e, 0), new r(e, yr.XY)
        }, r.prototype.getType = function () {
            return Lt.LINE_STRING
        }, r.prototype.intersectsExtent = function (t) {
            return Vr(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t)
        }, r.prototype.setCoordinates = function (t, e) {
            this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Lr(this.flatCoordinates, 0, t, this.stride), this.changed()
        }, r
    }(vr);

    function En(t, e, i) {
        for (var r, n, o, s, a, h, l = [], u = t(0), c = t(1), p = e(u), d = e(c), f = [c, u], _ = [d, p], g = [1, 0], y = {}, v = 1e5; 0 < --v && 0 < g.length;) o = g.pop(), u = f.pop(), p = _.pop(), (h = o.toString()) in y || (l.push(p[0], p[1]), y[h] = !0), s = g.pop(), c = f.pop(), d = _.pop(), vt((n = e(r = t(a = (o + s) / 2)))[0], n[1], p[0], p[1], d[0], d[1]) < i ? (l.push(d[0], d[1]), y[h = s.toString()] = !0) : (g.push(s, a, a, o), _.push(d, n, n, p), f.push(c, r, r, u));
        return l
    }

    var Cn = "postcompose", Tn = "precompose", wn = "render", Rn = "rendercomplete", In = "point", Ln = "line",
        bn = function (t) {
            var e = t || {};
            this.font_ = e.font, this.rotation_ = e.rotation, this.rotateWithView_ = e.rotateWithView, this.scale_ = e.scale, this.text_ = e.text, this.textAlign_ = e.textAlign, this.textBaseline_ = e.textBaseline, this.fill_ = void 0 !== e.fill ? e.fill : new zi({color: "#333"}), this.maxAngle_ = void 0 !== e.maxAngle ? e.maxAngle : Math.PI / 4, this.placement_ = void 0 !== e.placement ? e.placement : In, this.overflow_ = !!e.overflow, this.stroke_ = void 0 !== e.stroke ? e.stroke : null, this.offsetX_ = void 0 !== e.offsetX ? e.offsetX : 0, this.offsetY_ = void 0 !== e.offsetY ? e.offsetY : 0, this.backgroundFill_ = e.backgroundFill ? e.backgroundFill : null, this.backgroundStroke_ = e.backgroundStroke ? e.backgroundStroke : null, this.padding_ = void 0 === e.padding ? null : e.padding
        };
    bn.prototype.clone = function () {
        return new bn({
            font: this.getFont(),
            placement: this.getPlacement(),
            maxAngle: this.getMaxAngle(),
            overflow: this.getOverflow(),
            rotation: this.getRotation(),
            rotateWithView: this.getRotateWithView(),
            scale: this.getScale(),
            text: this.getText(),
            textAlign: this.getTextAlign(),
            textBaseline: this.getTextBaseline(),
            fill: this.getFill() ? this.getFill().clone() : void 0,
            stroke: this.getStroke() ? this.getStroke().clone() : void 0,
            offsetX: this.getOffsetX(),
            offsetY: this.getOffsetY(),
            backgroundFill: this.getBackgroundFill() ? this.getBackgroundFill().clone() : void 0,
            backgroundStroke: this.getBackgroundStroke() ? this.getBackgroundStroke().clone() : void 0
        })
    }, bn.prototype.getOverflow = function () {
        return this.overflow_
    }, bn.prototype.getFont = function () {
        return this.font_
    }, bn.prototype.getMaxAngle = function () {
        return this.maxAngle_
    }, bn.prototype.getPlacement = function () {
        return this.placement_
    }, bn.prototype.getOffsetX = function () {
        return this.offsetX_
    }, bn.prototype.getOffsetY = function () {
        return this.offsetY_
    }, bn.prototype.getFill = function () {
        return this.fill_
    }, bn.prototype.getRotateWithView = function () {
        return this.rotateWithView_
    }, bn.prototype.getRotation = function () {
        return this.rotation_
    }, bn.prototype.getScale = function () {
        return this.scale_
    }, bn.prototype.getStroke = function () {
        return this.stroke_
    }, bn.prototype.getText = function () {
        return this.text_
    }, bn.prototype.getTextAlign = function () {
        return this.textAlign_
    }, bn.prototype.getTextBaseline = function () {
        return this.textBaseline_
    }, bn.prototype.getBackgroundFill = function () {
        return this.backgroundFill_
    }, bn.prototype.getBackgroundStroke = function () {
        return this.backgroundStroke_
    }, bn.prototype.getPadding = function () {
        return this.padding_
    }, bn.prototype.setOverflow = function (t) {
        this.overflow_ = t
    }, bn.prototype.setFont = function (t) {
        this.font_ = t
    }, bn.prototype.setMaxAngle = function (t) {
        this.maxAngle_ = t
    }, bn.prototype.setOffsetX = function (t) {
        this.offsetX_ = t
    }, bn.prototype.setOffsetY = function (t) {
        this.offsetY_ = t
    }, bn.prototype.setPlacement = function (t) {
        this.placement_ = t
    }, bn.prototype.setFill = function (t) {
        this.fill_ = t
    }, bn.prototype.setRotation = function (t) {
        this.rotation_ = t
    }, bn.prototype.setScale = function (t) {
        this.scale_ = t
    }, bn.prototype.setStroke = function (t) {
        this.stroke_ = t
    }, bn.prototype.setText = function (t) {
        this.text_ = t
    }, bn.prototype.setTextAlign = function (t) {
        this.textAlign_ = t
    }, bn.prototype.setTextBaseline = function (t) {
        this.textBaseline_ = t
    }, bn.prototype.setBackgroundFill = function (t) {
        this.backgroundFill_ = t
    }, bn.prototype.setBackgroundStroke = function (t) {
        this.backgroundStroke_ = t
    }, bn.prototype.setPadding = function (t) {
        this.padding_ = t
    };
    var Fn = new Vi({color: "rgba(0,0,0,0.2)"}),
        Pn = [90, 45, 30, 20, 10, 5, 2, 1, .5, .2, .1, .05, .01, .005, .002, .001], Mn = function (t) {
            var e = t || {};
            this.map_ = null, this.postcomposeListenerKey_ = null, this.projection_ = null, this.maxLat_ = 1 / 0, this.maxLon_ = 1 / 0, this.minLat_ = -1 / 0, this.minLon_ = -1 / 0, this.maxLatP_ = 1 / 0, this.maxLonP_ = 1 / 0, this.minLatP_ = -1 / 0, this.minLonP_ = -1 / 0, this.targetSize_ = void 0 !== e.targetSize ? e.targetSize : 100, this.maxLines_ = void 0 !== e.maxLines ? e.maxLines : 100, this.meridians_ = [], this.parallels_ = [], this.strokeStyle_ = void 0 !== e.strokeStyle ? e.strokeStyle : Fn, this.fromLonLatTransform_ = void 0, this.toLonLatTransform_ = void 0, this.projectionCenterLonLat_ = null, this.meridiansLabels_ = null, this.parallelsLabels_ = null, 1 == e.showLabels && (this.lonLabelFormatter_ = null == e.lonLabelFormatter ? ln.bind(this, "EW") : e.lonLabelFormatter, this.latLabelFormatter_ = null == e.latLabelFormatter ? ln.bind(this, "NS") : e.latLabelFormatter, this.lonLabelPosition_ = null == e.lonLabelPosition ? 0 : e.lonLabelPosition, this.latLabelPosition_ = null == e.latLabelPosition ? 1 : e.latLabelPosition, this.lonLabelStyle_ = void 0 !== e.lonLabelStyle ? e.lonLabelStyle : new bn({
                font: "12px Calibri,sans-serif",
                textBaseline: "bottom",
                fill: new zi({color: "rgba(0,0,0,1)"}),
                stroke: new Vi({color: "rgba(255,255,255,1)", width: 3})
            }), this.latLabelStyle_ = void 0 !== e.latLabelStyle ? e.latLabelStyle : new bn({
                font: "12px Calibri,sans-serif",
                textAlign: "end",
                fill: new zi({color: "rgba(0,0,0,1)"}),
                stroke: new Vi({color: "rgba(255,255,255,1)", width: 3})
            }), this.meridiansLabels_ = [], this.parallelsLabels_ = []), this.setMap(void 0 !== e.map ? e.map : null)
        };
    Mn.prototype.addMeridian_ = function (t, e, i, r, n, o) {
        var s = this.getMeridian_(t, e, i, r, o);
        if (wt(s.getExtent(), n)) {
            if (this.meridiansLabels_) {
                var a = this.getMeridianPoint_(s, n, o);
                this.meridiansLabels_[o] = {geom: a, text: this.lonLabelFormatter_(t)}
            }
            this.meridians_[o++] = s
        }
        return o
    }, Mn.prototype.getMeridianPoint_ = function (t, e, i) {
        var r, n = t.getFlatCoordinates(), o = Math.max(e[1], n[1]), s = Math.min(e[3], n[n.length - 1]),
            a = gt(e[1] + Math.abs(e[1] - e[3]) * this.lonLabelPosition_, o, s), h = [n[0], a];
        return i in this.meridiansLabels_ ? (r = this.meridiansLabels_[i].geom).setCoordinates(h) : r = new Dr(h), r
    }, Mn.prototype.addParallel_ = function (t, e, i, r, n, o) {
        var s = this.getParallel_(t, e, i, r, o);
        if (wt(s.getExtent(), n)) {
            if (this.parallelsLabels_) {
                var a = this.getParallelPoint_(s, n, o);
                this.parallelsLabels_[o] = {geom: a, text: this.latLabelFormatter_(t)}
            }
            this.parallels_[o++] = s
        }
        return o
    }, Mn.prototype.getParallelPoint_ = function (t, e, i) {
        var r, n = t.getFlatCoordinates(), o = Math.max(e[0], n[0]), s = Math.min(e[2], n[n.length - 2]),
            a = [gt(e[0] + Math.abs(e[0] - e[2]) * this.latLabelPosition_, o, s), n[1]];
        return i in this.parallelsLabels_ ? (r = this.parallelsLabels_[i].geom).setCoordinates(a) : r = new Dr(a), r
    }, Mn.prototype.createGraticule_ = function (t, e, i, r) {
        var n = this.getInterval_(i);
        if (-1 == n) return this.meridians_.length = this.parallels_.length = 0, this.meridiansLabels_ && (this.meridiansLabels_.length = 0), void (this.parallelsLabels_ && (this.parallelsLabels_.length = 0));
        var o, s, a, h, l = this.toLonLatTransform_(e), u = l[0], c = l[1], p = this.maxLines_,
            d = [Math.max(t[0], this.minLonP_), Math.max(t[1], this.minLatP_), Math.min(t[2], this.maxLonP_), Math.min(t[3], this.maxLatP_)],
            f = (d = fe(d, this.projection_, "EPSG:4326"))[3], _ = d[2], g = d[1], y = d[0];
        for (h = gt(u = Math.floor(u / n) * n, this.minLon_, this.maxLon_), s = this.addMeridian_(h, g, f, r, t, 0), o = 0; h != this.minLon_ && o++ < p;) h = Math.max(h - n, this.minLon_), s = this.addMeridian_(h, g, f, r, t, s);
        for (h = gt(u, this.minLon_, this.maxLon_), o = 0; h != this.maxLon_ && o++ < p;) h = Math.min(h + n, this.maxLon_), s = this.addMeridian_(h, g, f, r, t, s);
        for (this.meridians_.length = s, this.meridiansLabels_ && (this.meridiansLabels_.length = s), a = gt(c = Math.floor(c / n) * n, this.minLat_, this.maxLat_), s = this.addParallel_(a, y, _, r, t, 0), o = 0; a != this.minLat_ && o++ < p;) a = Math.max(a - n, this.minLat_), s = this.addParallel_(a, y, _, r, t, s);
        for (a = gt(c, this.minLat_, this.maxLat_), o = 0; a != this.maxLat_ && o++ < p;) a = Math.min(a + n, this.maxLat_), s = this.addParallel_(a, y, _, r, t, s);
        this.parallels_.length = s, this.parallelsLabels_ && (this.parallelsLabels_.length = s)
    }, Mn.prototype.getInterval_ = function (t) {
        for (var e = this.projectionCenterLonLat_[0], i = this.projectionCenterLonLat_[1], r = -1, n = Math.pow(this.targetSize_ * t, 2), o = [], s = [], a = 0, h = Pn.length; a < h; ++a) {
            var l = Pn[a] / 2;
            if (o[0] = e - l, o[1] = i - l, s[0] = e + l, s[1] = i + l, this.fromLonLatTransform_(o, o), this.fromLonLatTransform_(s, s), Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2) <= n) break;
            r = Pn[a]
        }
        return r
    }, Mn.prototype.getMap = function () {
        return this.map_
    }, Mn.prototype.getMeridian_ = function (t, e, i, r, n) {
        var o, s, a, h, l, u = (o = t, s = e, a = i, h = this.projection_, l = r, En(function (t) {
            return [o, s + (a - s) * t]
        }, pe(ne("EPSG:4326"), h), l)), c = this.meridians_[n];
        return c ? (c.setFlatCoordinates(yr.XY, u), c.changed()) : c = this.meridians_[n] = new Sn(u, yr.XY), c
    }, Mn.prototype.getMeridians = function () {
        return this.meridians_
    }, Mn.prototype.getParallel_ = function (t, e, i, r, n) {
        var o, s, a, h, l, u = (o = t, s = e, a = i, h = this.projection_, l = r, En(function (t) {
            return [s + (a - s) * t, o]
        }, pe(ne("EPSG:4326"), h), l)), c = this.parallels_[n];
        return c ? (c.setFlatCoordinates(yr.XY, u), c.changed()) : c = new Sn(u, yr.XY), c
    }, Mn.prototype.getParallels = function () {
        return this.parallels_
    }, Mn.prototype.handlePostCompose_ = function (t) {
        var e, i, r, n, o = t.vectorContext, s = t.frameState, a = s.extent, h = s.viewState, l = h.center,
            u = h.projection, c = h.resolution, p = s.pixelRatio, d = c * c / (4 * p * p);
        for ((!this.projection_ || !ue(this.projection_, u)) && this.updateProjectionInfo_(u), this.createGraticule_(a, l, c, d), o.setFillStrokeStyle(null, this.strokeStyle_), e = 0, i = this.meridians_.length; e < i; ++e) r = this.meridians_[e], o.drawGeometry(r);
        for (e = 0, i = this.parallels_.length; e < i; ++e) r = this.parallels_[e], o.drawGeometry(r);
        if (this.meridiansLabels_) for (e = 0, i = this.meridiansLabels_.length; e < i; ++e) n = this.meridiansLabels_[e], this.lonLabelStyle_.setText(n.text), o.setTextStyle(this.lonLabelStyle_), o.drawGeometry(n.geom);
        if (this.parallelsLabels_) for (e = 0, i = this.parallelsLabels_.length; e < i; ++e) n = this.parallelsLabels_[e], this.latLabelStyle_.setText(n.text), o.setTextStyle(this.latLabelStyle_), o.drawGeometry(n.geom)
    }, Mn.prototype.updateProjectionInfo_ = function (t) {
        var e = ne("EPSG:4326"), i = t.getWorldExtent(), r = fe(i, e, t);
        this.maxLat_ = i[3], this.maxLon_ = i[2], this.minLat_ = i[1], this.minLon_ = i[0], this.maxLatP_ = r[3], this.maxLonP_ = r[2], this.minLatP_ = r[1], this.minLonP_ = r[0], this.fromLonLatTransform_ = pe(e, t), this.toLonLatTransform_ = pe(t, e), this.projectionCenterLonLat_ = this.toLonLatTransform_(ot(t.getExtent())), this.projection_ = t
    }, Mn.prototype.setMap = function (t) {
        this.map_ && (g(this.postcomposeListenerKey_), this.postcomposeListenerKey_ = null, this.map_.render()), t && (this.postcomposeListenerKey_ = C(t, Cn, this.handlePostCompose_, this), t.render()), this.map_ = t
    };
    var On = function (n) {
        function t(t, e, i, r) {
            n.call(this), this.extent = t, this.pixelRatio_ = i, this.resolution = e, this.state = r
        }

        return n && (t.__proto__ = n), ((t.prototype = Object.create(n && n.prototype)).constructor = t).prototype.changed = function () {
            this.dispatchEvent(w.CHANGE)
        }, t.prototype.getExtent = function () {
            return this.extent
        }, t.prototype.getImage = function () {
        }, t.prototype.getPixelRatio = function () {
            return this.pixelRatio_
        }, t.prototype.getResolution = function () {
            return this.resolution
        }, t.prototype.getState = function () {
            return this.state
        }, t.prototype.load = function () {
        }, t
    }(i), Nn = function (s) {
        function t(t, e, i, r, n, o) {
            s.call(this, t, e, i, di.IDLE), this.src_ = r, this.image_ = new Image, null !== n && (this.image_.crossOrigin = n), this.imageListenerKeys_ = null, this.state = di.IDLE, this.imageLoadFunction_ = o
        }

        return s && (t.__proto__ = s), ((t.prototype = Object.create(s && s.prototype)).constructor = t).prototype.getImage = function () {
            return this.image_
        }, t.prototype.handleImageError_ = function () {
            this.state = di.ERROR, this.unlistenImage_(), this.changed()
        }, t.prototype.handleImageLoad_ = function () {
            void 0 === this.resolution && (this.resolution = at(this.extent) / this.image_.height), this.state = di.LOADED, this.unlistenImage_(), this.changed()
        }, t.prototype.load = function () {
            this.state != di.IDLE && this.state != di.ERROR || (this.state = di.LOADING, this.changed(), this.imageListenerKeys_ = [o(this.image_, w.ERROR, this.handleImageError_, this), o(this.image_, w.LOAD, this.handleImageLoad_, this)], this.imageLoadFunction_(this, this.src_))
        }, t.prototype.setImage = function (t) {
            this.image_ = t
        }, t.prototype.unlistenImage_ = function () {
            this.imageListenerKeys_.forEach(g), this.imageListenerKeys_ = null
        }, t
    }(On), An = 0, Gn = 1, kn = 2, Dn = 3, jn = 4, Un = 5;

    function Yn(t) {
        return Math.pow(t, 3)
    }

    function Bn(t) {
        return 1 - Yn(1 - t)
    }

    function Xn(t) {
        return 3 * t * t - 2 * t * t * t
    }

    function zn(t) {
        return t
    }

    var Vn = function (n) {
        function t(t, e, i) {
            n.call(this);
            var r = i || {};
            this.tileCoord = t, this.state = e, this.interimTile = null, this.key = "", this.transition_ = void 0 === r.transition ? 250 : r.transition, this.transitionStarts_ = {}
        }

        return n && (t.__proto__ = n), ((t.prototype = Object.create(n && n.prototype)).constructor = t).prototype.changed = function () {
            this.dispatchEvent(w.CHANGE)
        }, t.prototype.getKey = function () {
            return this.key + "/" + this.tileCoord
        }, t.prototype.getInterimTile = function () {
            if (!this.interimTile) return this;
            var t = this.interimTile;
            do {
                if (t.getState() == kn) return t;
                t = t.interimTile
            } while (t);
            return this
        }, t.prototype.refreshInterimChain = function () {
            if (this.interimTile) {
                var t = this.interimTile, e = this;
                do {
                    if (t.getState() == kn) {
                        t.interimTile = null;
                        break
                    }
                    t.getState() == Gn ? e = t : t.getState() == An ? e.interimTile = t.interimTile : e = t, t = e.interimTile
                } while (t)
            }
        }, t.prototype.getTileCoord = function () {
            return this.tileCoord
        }, t.prototype.getState = function () {
            return this.state
        }, t.prototype.setState = function (t) {
            this.state = t, this.changed()
        }, t.prototype.load = function () {
        }, t.prototype.getAlpha = function (t, e) {
            if (!this.transition_) return 1;
            var i = this.transitionStarts_[t];
            if (i) {
                if (-1 === i) return 1
            } else i = e, this.transitionStarts_[t] = i;
            var r = e - i + 1e3 / 60;
            return r >= this.transition_ ? 1 : Yn(r / this.transition_)
        }, t.prototype.inTransition = function (t) {
            return !!this.transition_ && -1 !== this.transitionStarts_[t]
        }, t.prototype.endTransition = function (t) {
            this.transition_ && (this.transitionStarts_[t] = -1)
        }, t
    }(i), Wn = function (s) {
        function t(t, e, i, r, n, o) {
            s.call(this, t, e, o), this.crossOrigin_ = r, this.src_ = i, this.image_ = new Image, null !== r && (this.image_.crossOrigin = r), this.imageListenerKeys_ = null, this.tileLoadFunction_ = n
        }

        return s && (t.__proto__ = s), ((t.prototype = Object.create(s && s.prototype)).constructor = t).prototype.disposeInternal = function () {
            this.state == Gn && (this.unlistenImage_(), this.image_ = Kn()), this.interimTile && this.interimTile.dispose(), this.state = Un, this.changed(), s.prototype.disposeInternal.call(this)
        }, t.prototype.getImage = function () {
            return this.image_
        }, t.prototype.getKey = function () {
            return this.src_
        }, t.prototype.handleImageError_ = function () {
            this.state = Dn, this.unlistenImage_(), this.image_ = Kn(), this.changed()
        }, t.prototype.handleImageLoad_ = function () {
            this.image_.naturalWidth && this.image_.naturalHeight ? this.state = kn : this.state = jn, this.unlistenImage_(), this.changed()
        }, t.prototype.load = function () {
            this.state == Dn && (this.state = An, this.image_ = new Image, null !== this.crossOrigin_ && (this.image_.crossOrigin = this.crossOrigin_)), this.state == An && (this.state = Gn, this.changed(), this.imageListenerKeys_ = [o(this.image_, w.ERROR, this.handleImageError_, this), o(this.image_, w.LOAD, this.handleImageLoad_, this)], this.tileLoadFunction_(this, this.src_))
        }, t.prototype.unlistenImage_ = function () {
            this.imageListenerKeys_.forEach(g), this.imageListenerKeys_ = null
        }, t
    }(Vn);

    function Kn() {
        var t = De(1, 1);
        return t.fillStyle = "rgba(0,0,0,0)", t.fillRect(0, 0, 1, 1), t.canvas
    }

    var Hn = function (t, e, i) {
        this.decay_ = t, this.minVelocity_ = e, this.delay_ = i, this.points_ = [], this.angle_ = 0, this.initialVelocity_ = 0
    };
    Hn.prototype.begin = function () {
        this.points_.length = 0, this.angle_ = 0, this.initialVelocity_ = 0
    }, Hn.prototype.update = function (t, e) {
        this.points_.push(t, e, Date.now())
    }, Hn.prototype.end = function () {
        if (this.points_.length < 6) return !1;
        var t = Date.now() - this.delay_, e = this.points_.length - 3;
        if (this.points_[e + 2] < t) return !1;
        for (var i = e - 3; 0 < i && this.points_[i + 2] > t;) i -= 3;
        var r = this.points_[e + 2] - this.points_[i + 2];
        if (r < 1e3 / 60) return !1;
        var n = this.points_[e] - this.points_[i], o = this.points_[e + 1] - this.points_[i + 1];
        return this.angle_ = Math.atan2(o, n), this.initialVelocity_ = Math.sqrt(n * n + o * o) / r, this.initialVelocity_ > this.minVelocity_
    }, Hn.prototype.getDistance = function () {
        return (this.minVelocity_ - this.initialVelocity_) / this.decay_
    }, Hn.prototype.getAngle = function () {
        return this.angle_
    };
    var Zn = function (r) {
            function t(t, e, i) {
                r.call(this, t), this.map = e, this.frameState = void 0 !== i ? i : null
            }

            return r && (t.__proto__ = r), (t.prototype = Object.create(r && r.prototype)).constructor = t
        }(m), qn = function (o) {
            function t(t, e, i, r, n) {
                o.call(this, t, e, n), this.originalEvent = i, this.pixel = e.getEventPixel(i), this.coordinate = e.getCoordinateFromPixel(this.pixel), this.dragging = void 0 !== r && r
            }

            return o && (t.__proto__ = o), ((t.prototype = Object.create(o && o.prototype)).constructor = t).prototype.preventDefault = function () {
                o.prototype.preventDefault.call(this), this.originalEvent.preventDefault()
            }, t.prototype.stopPropagation = function () {
                o.prototype.stopPropagation.call(this), this.originalEvent.stopPropagation()
            }, t
        }(Zn), Jn = {
            SINGLECLICK: "singleclick",
            CLICK: w.CLICK,
            DBLCLICK: w.DBLCLICK,
            POINTERDRAG: "pointerdrag",
            POINTERMOVE: "pointermove",
            POINTERDOWN: "pointerdown",
            POINTERUP: "pointerup",
            POINTEROVER: "pointerover",
            POINTEROUT: "pointerout",
            POINTERENTER: "pointerenter",
            POINTERLEAVE: "pointerleave",
            POINTERCANCEL: "pointercancel"
        }, Qn = function (o) {
            function t(t, e, i, r, n) {
                o.call(this, t, e, i.originalEvent, r, n), this.pointerEvent = i
            }

            return o && (t.__proto__ = o), (t.prototype = Object.create(o && o.prototype)).constructor = t
        }(qn), $n = "pointermove", to = "pointerdown", eo = "pointerup", io = "pointerover", ro = "pointerout",
        no = "pointerenter", oo = "pointerleave", so = "pointercancel", ao = function (t, e) {
            this.dispatcher = t, this.mapping_ = e
        };
    ao.prototype.getEvents = function () {
        return Object.keys(this.mapping_)
    }, ao.prototype.getHandlerForEvent = function (t) {
        return this.mapping_[t]
    };
    var ho = 1, lo = "mouse";

    function uo(t) {
        if (!this.isEventSimulatedFromTouch_(t)) {
            ho.toString() in this.pointerMap && this.cancel(t);
            var e = yo(t, this.dispatcher);
            this.pointerMap[ho.toString()] = t, this.dispatcher.down(e, t)
        }
    }

    function co(t) {
        if (!this.isEventSimulatedFromTouch_(t)) {
            var e = yo(t, this.dispatcher);
            this.dispatcher.move(e, t)
        }
    }

    function po(t) {
        if (!this.isEventSimulatedFromTouch_(t)) {
            var e = this.pointerMap[ho.toString()];
            if (e && e.button === t.button) {
                var i = yo(t, this.dispatcher);
                this.dispatcher.up(i, t), this.cleanupMouse()
            }
        }
    }

    function fo(t) {
        if (!this.isEventSimulatedFromTouch_(t)) {
            var e = yo(t, this.dispatcher);
            this.dispatcher.enterOver(e, t)
        }
    }

    function _o(t) {
        if (!this.isEventSimulatedFromTouch_(t)) {
            var e = yo(t, this.dispatcher);
            this.dispatcher.leaveOut(e, t)
        }
    }

    var go = function (i) {
        function t(t) {
            var e = {mousedown: uo, mousemove: co, mouseup: po, mouseover: fo, mouseout: _o};
            i.call(this, t, e), this.pointerMap = t.pointerMap, this.lastTouches = []
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.isEventSimulatedFromTouch_ = function (t) {
            for (var e = this.lastTouches, i = t.clientX, r = t.clientY, n = 0, o = e.length, s = void 0; n < o && (s = e[n]); n++) {
                var a = Math.abs(i - s[0]), h = Math.abs(r - s[1]);
                if (a <= 25 && h <= 25) return !0
            }
            return !1
        }, t.prototype.cancel = function (t) {
            var e = yo(t, this.dispatcher);
            this.dispatcher.cancel(e, t), this.cleanupMouse()
        }, t.prototype.cleanupMouse = function () {
            delete this.pointerMap[ho.toString()]
        }, t
    }(ao);

    function yo(t, e) {
        var i = e.cloneEvent(t, t), r = i.preventDefault;
        return i.preventDefault = function () {
            t.preventDefault(), r()
        }, i.pointerId = ho, i.isPrimary = !0, i.pointerType = lo, i
    }

    var vo = ["", "unavailable", "touch", "pen", "mouse"];

    function mo(t) {
        this.pointerMap[t.pointerId.toString()] = t;
        var e = this.prepareEvent_(t);
        this.dispatcher.down(e, t)
    }

    function xo(t) {
        var e = this.prepareEvent_(t);
        this.dispatcher.move(e, t)
    }

    function So(t) {
        var e = this.prepareEvent_(t);
        this.dispatcher.up(e, t), this.cleanup(t.pointerId)
    }

    function Eo(t) {
        var e = this.prepareEvent_(t);
        this.dispatcher.leaveOut(e, t)
    }

    function Co(t) {
        var e = this.prepareEvent_(t);
        this.dispatcher.enterOver(e, t)
    }

    function To(t) {
        var e = this.prepareEvent_(t);
        this.dispatcher.cancel(e, t), this.cleanup(t.pointerId)
    }

    function wo(t) {
        var e = this.dispatcher.makeEvent("lostpointercapture", t, t);
        this.dispatcher.dispatchEvent(e)
    }

    function Ro(t) {
        var e = this.dispatcher.makeEvent("gotpointercapture", t, t);
        this.dispatcher.dispatchEvent(e)
    }

    var Io = function (i) {
        function t(t) {
            var e = {
                MSPointerDown: mo,
                MSPointerMove: xo,
                MSPointerUp: So,
                MSPointerOut: Eo,
                MSPointerOver: Co,
                MSPointerCancel: To,
                MSGotPointerCapture: Ro,
                MSLostPointerCapture: wo
            };
            i.call(this, t, e), this.pointerMap = t.pointerMap
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.prepareEvent_ = function (t) {
            var e = t;
            return "number" == typeof t.pointerType && ((e = this.dispatcher.cloneEvent(t, t)).pointerType = vo[t.pointerType]), e
        }, t.prototype.cleanup = function (t) {
            delete this.pointerMap[t.toString()]
        }, t
    }(ao);

    function Lo(t) {
        this.dispatcher.fireNativeEvent(t)
    }

    function bo(t) {
        this.dispatcher.fireNativeEvent(t)
    }

    function Fo(t) {
        this.dispatcher.fireNativeEvent(t)
    }

    function Po(t) {
        this.dispatcher.fireNativeEvent(t)
    }

    function Mo(t) {
        this.dispatcher.fireNativeEvent(t)
    }

    function Oo(t) {
        this.dispatcher.fireNativeEvent(t)
    }

    function No(t) {
        this.dispatcher.fireNativeEvent(t)
    }

    function Ao(t) {
        this.dispatcher.fireNativeEvent(t)
    }

    var Go = function (i) {
        function t(t) {
            var e = {
                pointerdown: Lo,
                pointermove: bo,
                pointerup: Fo,
                pointerout: Po,
                pointerover: Mo,
                pointercancel: Oo,
                gotpointercapture: Ao,
                lostpointercapture: No
            };
            i.call(this, t, e)
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(ao), ko = !1, Do = function (n) {
        function t(t, e, i) {
            n.call(this, t), this.originalEvent = e;
            var r = i || {};
            this.buttons = this.getButtons_(r), this.pressure = this.getPressure_(r, this.buttons), this.bubbles = "bubbles" in r && r.bubbles, this.cancelable = "cancelable" in r && r.cancelable, this.view = "view" in r ? r.view : null, this.detail = "detail" in r ? r.detail : null, this.screenX = "screenX" in r ? r.screenX : 0, this.screenY = "screenY" in r ? r.screenY : 0, this.clientX = "clientX" in r ? r.clientX : 0, this.clientY = "clientY" in r ? r.clientY : 0, this.ctrlKey = "ctrlKey" in r && r.ctrlKey, this.altKey = "altKey" in r && r.altKey, this.shiftKey = "shiftKey" in r && r.shiftKey, this.metaKey = "metaKey" in r && r.metaKey, this.button = "button" in r ? r.button : 0, this.relatedTarget = "relatedTarget" in r ? r.relatedTarget : null, this.pointerId = "pointerId" in r ? r.pointerId : 0, this.width = "width" in r ? r.width : 0, this.height = "height" in r ? r.height : 0, this.tiltX = "tiltX" in r ? r.tiltX : 0, this.tiltY = "tiltY" in r ? r.tiltY : 0, this.pointerType = "pointerType" in r ? r.pointerType : "", this.hwTimestamp = "hwTimestamp" in r ? r.hwTimestamp : 0, this.isPrimary = "isPrimary" in r && r.isPrimary, e.preventDefault && (this.preventDefault = function () {
                e.preventDefault()
            })
        }

        return n && (t.__proto__ = n), ((t.prototype = Object.create(n && n.prototype)).constructor = t).prototype.getButtons_ = function (t) {
            var e;
            if (t.buttons || ko) e = t.buttons; else switch (t.which) {
                case 1:
                    e = 1;
                    break;
                case 2:
                    e = 4;
                    break;
                case 3:
                    e = 2;
                    break;
                default:
                    e = 0
            }
            return e
        }, t.prototype.getPressure_ = function (t, e) {
            return t.pressure ? t.pressure : e ? .5 : 0
        }, t
    }(m);
    !function () {
        try {
            var t = new MouseEvent("click", {buttons: 1});
            ko = 1 === t.buttons
        } catch (t) {
        }
    }();

    function jo(t) {
        this.vacuumTouches_(t), this.setPrimaryTouch_(t.changedTouches[0]), this.dedupSynthMouse_(t), this.clickCount_++, this.processTouches_(t, this.overDown_)
    }

    function Uo(t) {
        this.processTouches_(t, this.moveOverOut_)
    }

    function Yo(t) {
        this.dedupSynthMouse_(t), this.processTouches_(t, this.upOut_)
    }

    function Bo(t) {
        this.processTouches_(t, this.cancelOut_)
    }

    var Xo = function (r) {
            function t(t, e) {
                var i = {touchstart: jo, touchmove: Uo, touchend: Yo, touchcancel: Bo};
                r.call(this, t, i), this.pointerMap = t.pointerMap, this.mouseSource = e, this.firstTouchId_ = void 0, this.clickCount_ = 0, this.resetId_ = void 0, this.dedupTimeout_ = 2500
            }

            return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype.isPrimaryTouch_ = function (t) {
                return this.firstTouchId_ === t.identifier
            }, t.prototype.setPrimaryTouch_ = function (t) {
                var e = Object.keys(this.pointerMap).length;
                (0 === e || 1 === e && ho.toString() in this.pointerMap) && (this.firstTouchId_ = t.identifier, this.cancelResetClickCount_())
            }, t.prototype.removePrimaryPointer_ = function (t) {
                t.isPrimary && (this.firstTouchId_ = void 0, this.resetClickCount_())
            }, t.prototype.resetClickCount_ = function () {
                this.resetId_ = setTimeout(this.resetClickCountHandler_.bind(this), 200)
            }, t.prototype.resetClickCountHandler_ = function () {
                this.clickCount_ = 0, this.resetId_ = void 0
            }, t.prototype.cancelResetClickCount_ = function () {
                void 0 !== this.resetId_ && clearTimeout(this.resetId_)
            }, t.prototype.touchToPointer_ = function (t, e) {
                var i = this.dispatcher.cloneEvent(t, e);
                return i.pointerId = e.identifier + 2, i.bubbles = !0, i.cancelable = !0, i.detail = this.clickCount_, i.button = 0, i.buttons = 1, i.width = e.webkitRadiusX || e.radiusX || 0, i.height = e.webkitRadiusY || e.radiusY || 0, i.pressure = e.webkitForce || e.force || .5, i.isPrimary = this.isPrimaryTouch_(e), i.pointerType = "touch", i.clientX = e.clientX, i.clientY = e.clientY, i.screenX = e.screenX, i.screenY = e.screenY, i
            }, t.prototype.processTouches_ = function (t, e) {
                var i = Array.prototype.slice.call(t.changedTouches), r = i.length;

                function n() {
                    t.preventDefault()
                }

                for (var o = 0; o < r; ++o) {
                    var s = this.touchToPointer_(t, i[o]);
                    s.preventDefault = n, e.call(this, t, s)
                }
            }, t.prototype.findTouch_ = function (t, e) {
                for (var i = t.length, r = 0; r < i; r++) {
                    if (t[r].identifier === e) return !0
                }
                return !1
            }, t.prototype.vacuumTouches_ = function (t) {
                var e = t.touches, i = Object.keys(this.pointerMap), r = i.length;
                if (r >= e.length) {
                    for (var n = [], o = 0; o < r; ++o) {
                        var s = i[o], a = this.pointerMap[s];
                        s == ho || this.findTouch_(e, s - 2) || n.push(a.out)
                    }
                    for (var h = 0; h < n.length; ++h) this.cancelOut_(t, n[h])
                }
            }, t.prototype.overDown_ = function (t, e) {
                this.pointerMap[e.pointerId] = {
                    target: e.target,
                    out: e,
                    outTarget: e.target
                }, this.dispatcher.over(e, t), this.dispatcher.enter(e, t), this.dispatcher.down(e, t)
            }, t.prototype.moveOverOut_ = function (t, e) {
                var i = e, r = this.pointerMap[i.pointerId];
                if (r) {
                    var n = r.out, o = r.outTarget;
                    this.dispatcher.move(i, t), n && o !== i.target && (n.relatedTarget = i.target, i.relatedTarget = o, n.target = o, i.target ? (this.dispatcher.leaveOut(n, t), this.dispatcher.enterOver(i, t)) : (i.target = o, i.relatedTarget = null, this.cancelOut_(t, i))), r.out = i, r.outTarget = i.target
                }
            }, t.prototype.upOut_ = function (t, e) {
                this.dispatcher.up(e, t), this.dispatcher.out(e, t), this.dispatcher.leave(e, t), this.cleanUpPointer_(e)
            }, t.prototype.cancelOut_ = function (t, e) {
                this.dispatcher.cancel(e, t), this.dispatcher.out(e, t), this.dispatcher.leave(e, t), this.cleanUpPointer_(e)
            }, t.prototype.cleanUpPointer_ = function (t) {
                delete this.pointerMap[t.pointerId], this.removePrimaryPointer_(t)
            }, t.prototype.dedupSynthMouse_ = function (t) {
                var r = this.mouseSource.lastTouches, e = t.changedTouches[0];
                if (this.isPrimaryTouch_(e)) {
                    var n = [e.clientX, e.clientY];
                    r.push(n), setTimeout(function () {
                        var t, e, i;
                        e = n, i = (t = r).indexOf(e), -1 < i && t.splice(i, 1)
                    }, this.dedupTimeout_)
                }
            }, t
        }(ao),
        zo = [["bubbles", !1], ["cancelable", !1], ["view", null], ["detail", null], ["screenX", 0], ["screenY", 0], ["clientX", 0], ["clientY", 0], ["ctrlKey", !1], ["altKey", !1], ["shiftKey", !1], ["metaKey", !1], ["button", 0], ["relatedTarget", null], ["buttons", 0], ["pointerId", 0], ["width", 0], ["height", 0], ["pressure", 0], ["tiltX", 0], ["tiltY", 0], ["pointerType", ""], ["hwTimestamp", 0], ["isPrimary", !1], ["type", ""], ["target", null], ["currentTarget", null], ["which", 0]],
        Vo = function (e) {
            function t(t) {
                e.call(this), this.element_ = t, this.pointerMap = {}, this.eventMap_ = {}, this.eventSourceList_ = [], this.registerSources()
            }

            return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.registerSources = function () {
                if (ci) this.registerSource("native", new Go(this)); else if (pi) this.registerSource("ms", new Io(this)); else {
                    var t = new go(this);
                    this.registerSource("mouse", t), ui && this.registerSource("touch", new Xo(this, t))
                }
                this.register_()
            }, t.prototype.registerSource = function (t, e) {
                var i = e, r = i.getEvents();
                r && (r.forEach(function (t) {
                    var e = i.getHandlerForEvent(t);
                    e && (this.eventMap_[t] = e.bind(i))
                }.bind(this)), this.eventSourceList_.push(i))
            }, t.prototype.register_ = function () {
                for (var t = this.eventSourceList_.length, e = 0; e < t; e++) {
                    var i = this.eventSourceList_[e];
                    this.addEvents_(i.getEvents())
                }
            }, t.prototype.unregister_ = function () {
                for (var t = this.eventSourceList_.length, e = 0; e < t; e++) {
                    var i = this.eventSourceList_[e];
                    this.removeEvents_(i.getEvents())
                }
            }, t.prototype.eventHandler_ = function (t) {
                var e = t.type, i = this.eventMap_[e];
                i && i(t)
            }, t.prototype.addEvents_ = function (t) {
                t.forEach(function (t) {
                    C(this.element_, t, this.eventHandler_, this)
                }.bind(this))
            }, t.prototype.removeEvents_ = function (t) {
                t.forEach(function (t) {
                    d(this.element_, t, this.eventHandler_, this)
                }.bind(this))
            }, t.prototype.cloneEvent = function (t, e) {
                for (var i = {}, r = 0, n = zo.length; r < n; r++) {
                    var o = zo[r][0];
                    i[o] = t[o] || e[o] || zo[r][1]
                }
                return i
            }, t.prototype.down = function (t, e) {
                this.fireEvent(to, t, e)
            }, t.prototype.move = function (t, e) {
                this.fireEvent($n, t, e)
            }, t.prototype.up = function (t, e) {
                this.fireEvent(eo, t, e)
            }, t.prototype.enter = function (t, e) {
                t.bubbles = !1, this.fireEvent(no, t, e)
            }, t.prototype.leave = function (t, e) {
                t.bubbles = !1, this.fireEvent(oo, t, e)
            }, t.prototype.over = function (t, e) {
                t.bubbles = !0, this.fireEvent(io, t, e)
            }, t.prototype.out = function (t, e) {
                t.bubbles = !0, this.fireEvent(ro, t, e)
            }, t.prototype.cancel = function (t, e) {
                this.fireEvent(so, t, e)
            }, t.prototype.leaveOut = function (t, e) {
                this.out(t, e), this.contains_(t.target, t.relatedTarget) || this.leave(t, e)
            }, t.prototype.enterOver = function (t, e) {
                this.over(t, e), this.contains_(t.target, t.relatedTarget) || this.enter(t, e)
            }, t.prototype.contains_ = function (t, e) {
                return !(!t || !e) && t.contains(e)
            }, t.prototype.makeEvent = function (t, e, i) {
                return new Do(t, i, e)
            }, t.prototype.fireEvent = function (t, e, i) {
                var r = this.makeEvent(t, e, i);
                this.dispatchEvent(r)
            }, t.prototype.fireNativeEvent = function (t) {
                var e = this.makeEvent(t.type, t, t);
                this.dispatchEvent(e)
            }, t.prototype.wrapMouseEvent = function (t, e) {
                return this.makeEvent(t, go.prepareEvent(e, this), e)
            }, t.prototype.disposeInternal = function () {
                this.unregister_(), e.prototype.disposeInternal.call(this)
            }, t
        }(i), Wo = function (r) {
            function t(t, e) {
                r.call(this), this.map_ = t, this.clickTimeoutId_ = 0, this.dragging_ = !1, this.dragListenerKeys_ = [], this.moveTolerance_ = e ? e * ai : ai, this.down_ = null;
                var i = this.map_.getViewport();
                this.activePointers_ = 0, this.trackedTouches_ = {}, this.pointerEventHandler_ = new Vo(i), this.documentPointerEventHandler_ = null, this.pointerdownListenerKey_ = C(this.pointerEventHandler_, to, this.handlePointerDown_, this), this.relayedListenerKey_ = C(this.pointerEventHandler_, $n, this.relayEvent_, this)
            }

            return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype.emulateClick_ = function (e) {
                var t = new Qn(Jn.CLICK, this.map_, e);
                this.dispatchEvent(t), 0 !== this.clickTimeoutId_ ? (clearTimeout(this.clickTimeoutId_), this.clickTimeoutId_ = 0, t = new Qn(Jn.DBLCLICK, this.map_, e), this.dispatchEvent(t)) : this.clickTimeoutId_ = setTimeout(function () {
                    this.clickTimeoutId_ = 0;
                    var t = new Qn(Jn.SINGLECLICK, this.map_, e);
                    this.dispatchEvent(t)
                }.bind(this), 250)
            }, t.prototype.updateActivePointers_ = function (t) {
                var e = t;
                e.type == Jn.POINTERUP || e.type == Jn.POINTERCANCEL ? delete this.trackedTouches_[e.pointerId] : e.type == Jn.POINTERDOWN && (this.trackedTouches_[e.pointerId] = !0), this.activePointers_ = Object.keys(this.trackedTouches_).length
            }, t.prototype.handlePointerUp_ = function (t) {
                this.updateActivePointers_(t);
                var e = new Qn(Jn.POINTERUP, this.map_, t);
                this.dispatchEvent(e), e.propagationStopped || this.dragging_ || !this.isMouseActionButton_(t) || this.emulateClick_(this.down_), 0 === this.activePointers_ && (this.dragListenerKeys_.forEach(g), this.dragListenerKeys_.length = 0, this.dragging_ = !1, this.down_ = null, this.documentPointerEventHandler_.dispose(), this.documentPointerEventHandler_ = null)
            }, t.prototype.isMouseActionButton_ = function (t) {
                return 0 === t.button
            }, t.prototype.handlePointerDown_ = function (t) {
                this.updateActivePointers_(t);
                var e = new Qn(Jn.POINTERDOWN, this.map_, t);
                this.dispatchEvent(e), this.down_ = t, 0 === this.dragListenerKeys_.length && (this.documentPointerEventHandler_ = new Vo(document), this.dragListenerKeys_.push(C(this.documentPointerEventHandler_, Jn.POINTERMOVE, this.handlePointerMove_, this), C(this.documentPointerEventHandler_, Jn.POINTERUP, this.handlePointerUp_, this), C(this.pointerEventHandler_, Jn.POINTERCANCEL, this.handlePointerUp_, this)))
            }, t.prototype.handlePointerMove_ = function (t) {
                if (this.isMoving_(t)) {
                    this.dragging_ = !0;
                    var e = new Qn(Jn.POINTERDRAG, this.map_, t, this.dragging_);
                    this.dispatchEvent(e)
                }
                t.preventDefault()
            }, t.prototype.relayEvent_ = function (t) {
                var e = !(!this.down_ || !this.isMoving_(t));
                this.dispatchEvent(new Qn(t.type, this.map_, t, e))
            }, t.prototype.isMoving_ = function (t) {
                return this.dragging_ || Math.abs(t.clientX - this.down_.clientX) > this.moveTolerance_ || Math.abs(t.clientY - this.down_.clientY) > this.moveTolerance_
            }, t.prototype.disposeInternal = function () {
                this.relayedListenerKey_ && (g(this.relayedListenerKey_), this.relayedListenerKey_ = null), this.pointerdownListenerKey_ && (g(this.pointerdownListenerKey_), this.pointerdownListenerKey_ = null), this.dragListenerKeys_.forEach(g), this.dragListenerKeys_.length = 0, this.documentPointerEventHandler_ && (this.documentPointerEventHandler_.dispose(), this.documentPointerEventHandler_ = null), this.pointerEventHandler_ && (this.pointerEventHandler_.dispose(), this.pointerEventHandler_ = null), r.prototype.disposeInternal.call(this)
            }, t
        }(i), Ko = {POSTRENDER: "postrender", MOVESTART: "movestart", MOVEEND: "moveend"},
        Ho = {LAYERGROUP: "layergroup", SIZE: "size", TARGET: "target", VIEW: "view"}, Zo = function (t, e) {
            this.priorityFunction_ = t, this.keyFunction_ = e, this.elements_ = [], this.priorities_ = [], this.queuedElements_ = {}
        };
    Zo.prototype.clear = function () {
        this.elements_.length = 0, this.priorities_.length = 0, _(this.queuedElements_)
    }, Zo.prototype.dequeue = function () {
        var t = this.elements_, e = this.priorities_, i = t[0];
        1 == t.length ? (t.length = 0, e.length = 0) : (t[0] = t.pop(), e[0] = e.pop(), this.siftUp_(0));
        var r = this.keyFunction_(i);
        return delete this.queuedElements_[r], i
    }, Zo.prototype.enqueue = function (t) {
        Z(!(this.keyFunction_(t) in this.queuedElements_), 31);
        var e = this.priorityFunction_(t);
        return e != 1 / 0 && (this.elements_.push(t), this.priorities_.push(e), this.queuedElements_[this.keyFunction_(t)] = !0, this.siftDown_(0, this.elements_.length - 1), !0)
    }, Zo.prototype.getCount = function () {
        return this.elements_.length
    }, Zo.prototype.getLeftChildIndex_ = function (t) {
        return 2 * t + 1
    }, Zo.prototype.getRightChildIndex_ = function (t) {
        return 2 * t + 2
    }, Zo.prototype.getParentIndex_ = function (t) {
        return t - 1 >> 1
    }, Zo.prototype.heapify_ = function () {
        var t;
        for (t = (this.elements_.length >> 1) - 1; 0 <= t; t--) this.siftUp_(t)
    }, Zo.prototype.isEmpty = function () {
        return 0 === this.elements_.length
    }, Zo.prototype.isKeyQueued = function (t) {
        return t in this.queuedElements_
    }, Zo.prototype.isQueued = function (t) {
        return this.isKeyQueued(this.keyFunction_(t))
    }, Zo.prototype.siftUp_ = function (t) {
        for (var e = this.elements_, i = this.priorities_, r = e.length, n = e[t], o = i[t], s = t; t < r >> 1;) {
            var a = this.getLeftChildIndex_(t), h = this.getRightChildIndex_(t), l = h < r && i[h] < i[a] ? h : a;
            e[t] = e[l], i[t] = i[l], t = l
        }
        e[t] = n, i[t] = o, this.siftDown_(s, t)
    }, Zo.prototype.siftDown_ = function (t, e) {
        for (var i = this.elements_, r = this.priorities_, n = i[e], o = r[e]; t < e;) {
            var s = this.getParentIndex_(e);
            if (!(r[s] > o)) break;
            i[e] = i[s], r[e] = r[s], e = s
        }
        i[e] = n, r[e] = o
    }, Zo.prototype.reprioritize = function () {
        var t, e, i, r = this.priorityFunction_, n = this.elements_, o = this.priorities_, s = 0, a = n.length;
        for (e = 0; e < a; ++e) (i = r(t = n[e])) == 1 / 0 ? delete this.queuedElements_[this.keyFunction_(t)] : (o[s] = i, n[s++] = t);
        n.length = s, o.length = s, this.heapify_()
    };
    var qo = function (i) {
        function t(e, t) {
            i.call(this, function (t) {
                return e.apply(null, t)
            }, function (t) {
                return t[0].getKey()
            }), this.tileChangeCallback_ = t, this.tilesLoading_ = 0, this.tilesLoadingKeys_ = {}
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.enqueue = function (t) {
            var e = i.prototype.enqueue.call(this, t);
            e && C(t[0], w.CHANGE, this.handleTileChange, this);
            return e
        }, t.prototype.getTilesLoading = function () {
            return this.tilesLoading_
        }, t.prototype.handleTileChange = function (t) {
            var e = t.target, i = e.getState();
            if (i === kn || i === Dn || i === jn || i === Un) {
                d(e, w.CHANGE, this.handleTileChange, this);
                var r = e.getKey();
                r in this.tilesLoadingKeys_ && (delete this.tilesLoadingKeys_[r], --this.tilesLoading_), this.tileChangeCallback_()
            }
        }, t.prototype.loadMoreTiles = function (t, e) {
            for (var i, r, n, o = 0, s = !1; this.tilesLoading_ < t && o < e && 0 < this.getCount();) n = (r = this.dequeue()[0]).getKey(), (i = r.getState()) === Un ? s = !0 : i !== An || n in this.tilesLoadingKeys_ || (this.tilesLoadingKeys_[n] = !0, ++this.tilesLoading_, ++o, r.load());
            0 === o && s && this.tileChangeCallback_()
        }, t
    }(Zo), Jo = 42, Qo = 256;

    function $o(t) {
        return t
    }

    function ts(t, e) {
        return void 0 !== t ? 0 : void 0
    }

    function es(t, e) {
        return void 0 !== t ? t + e : void 0
    }

    var is = {ANIMATING: 0, INTERACTING: 1}, rs = "center", ns = "resolution", os = "rotation", ss = function (i) {
        function t(t) {
            i.call(this);
            var e = E({}, t);
            this.hints_ = [0, 0], this.animations_ = [], this.updateAnimationKey_, this.updateAnimations_ = this.updateAnimations_.bind(this), this.projection_ = ae(e.projection, "EPSG:3857"), this.applyOptions_(e)
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.applyOptions_ = function (t) {
            var e = {};
            e[rs] = void 0 !== t.center ? t.center : null;
            var i = function (t) {
                var e, i, r, n = void 0 !== t.minZoom ? t.minZoom : 0, o = void 0 !== t.maxZoom ? t.maxZoom : 28,
                    s = void 0 !== t.zoomFactor ? t.zoomFactor : 2;
                if (void 0 !== t.resolutions) {
                    var a = t.resolutions;
                    i = a[n], r = void 0 !== a[o] ? a[o] : a[a.length - 1], g = a, e = function (t, e, i) {
                        if (void 0 !== t) {
                            var r = ur(g, t, i);
                            r = gt(r + e, 0, g.length - 1);
                            var n = Math.floor(r);
                            if (r != n && n < g.length - 1) {
                                var o = g[n] / g[n + 1];
                                return g[n] / Math.pow(o, r - n)
                            }
                            return g[n]
                        }
                    }
                } else {
                    var h = ae(t.projection, "EPSG:3857"), l = h.getExtent(),
                        u = l ? Math.max(ct(l), at(l)) : 360 * Nt[Ot.DEGREES] / h.getMetersPerUnit(),
                        c = u / Qo / Math.pow(2, 0), p = c / Math.pow(2, 28);
                    void 0 !== (i = t.maxResolution) ? n = 0 : i = c / Math.pow(s, n), void 0 === (r = t.minResolution) && (r = void 0 !== t.maxZoom ? void 0 !== t.maxResolution ? i / Math.pow(s, o) : c / Math.pow(s, o) : p), o = n + Math.floor(Math.log(i / r) / Math.log(s)), r = i / Math.pow(s, o - n), d = s, f = i, _ = o - n, e = function (t, e, i) {
                        if (void 0 !== t) {
                            var r = -i / 2 + .5, n = Math.floor(Math.log(f / t) / Math.log(d) + r),
                                o = Math.max(n + e, 0);
                            return void 0 !== _ && (o = Math.min(o, _)), f / Math.pow(d, o)
                        }
                    }
                }
                var d, f, _;
                var g;
                return {constraint: e, maxResolution: i, minResolution: r, minZoom: n, zoomFactor: s}
            }(t);
            this.maxResolution_ = i.maxResolution, this.minResolution_ = i.minResolution, this.zoomFactor_ = i.zoomFactor, this.resolutions_ = t.resolutions, this.minZoom_ = i.minZoom;
            var r, n, o = void 0 !== (r = t).extent ? (n = r.extent, function (t) {
                return t ? [gt(t[0], n[0], n[2]), gt(t[1], n[1], n[3])] : void 0
            }) : $o, s = i.constraint, a = function (t) {
                {
                    if (void 0 === t.enableRotation || t.enableRotation) {
                        var e = t.constrainRotation;
                        return void 0 === e || !0 === e ? (o = n || St(5), function (t, e) {
                            return void 0 !== t ? Math.abs(t + e) <= o ? 0 : t + e : void 0
                        }) : !1 === e ? es : "number" == typeof e ? (i = e, r = 2 * Math.PI / i, function (t, e) {
                            return void 0 !== t ? t = Math.floor((t + e) / r + .5) * r : void 0
                        }) : es
                    }
                    return ts
                }
                var i, r;
                var n, o
            }(t);
            this.constraints_ = {
                center: o,
                resolution: s,
                rotation: a
            }, void 0 !== t.resolution ? e[ns] = t.resolution : void 0 !== t.zoom && (e[ns] = this.constrainResolution(this.maxResolution_, t.zoom - this.minZoom_), this.resolutions_ && (e[ns] = gt(Number(this.getResolution() || e[ns]), this.minResolution_, this.maxResolution_))), e[os] = void 0 !== t.rotation ? t.rotation : 0, this.setProperties(e), this.options_ = t
        }, t.prototype.getUpdatedOptions_ = function (t) {
            var e = E({}, this.options_);
            return void 0 !== e.resolution ? e.resolution = this.getResolution() : e.zoom = this.getZoom(), e.center = this.getCenter(), e.rotation = this.getRotation(), E({}, e, t)
        }, t.prototype.animate = function (t) {
            var e, i = arguments, r = arguments.length;
            if (1 < r && "function" == typeof arguments[r - 1] && (e = arguments[r - 1], --r), !this.isDef()) {
                var n = arguments[r - 1];
                return n.center && this.setCenter(n.center), void 0 !== n.zoom && this.setZoom(n.zoom), void 0 !== n.rotation && this.setRotation(n.rotation), void (e && as(e, !0))
            }
            for (var o = Date.now(), s = this.getCenter().slice(), a = this.getResolution(), h = this.getRotation(), l = [], u = 0; u < r; ++u) {
                var c = i[u], p = {
                    start: o,
                    complete: !1,
                    anchor: c.anchor,
                    duration: void 0 !== c.duration ? c.duration : 1e3,
                    easing: c.easing || Xn
                };
                if (c.center && (p.sourceCenter = s, p.targetCenter = c.center, s = p.targetCenter), void 0 !== c.zoom ? (p.sourceResolution = a, p.targetResolution = this.constrainResolution(this.maxResolution_, c.zoom - this.minZoom_, 0), a = p.targetResolution) : c.resolution && (p.sourceResolution = a, p.targetResolution = c.resolution, a = p.targetResolution), void 0 !== c.rotation) {
                    p.sourceRotation = h;
                    var d = Et(c.rotation - h + Math.PI, 2 * Math.PI) - Math.PI;
                    p.targetRotation = h + d, h = p.targetRotation
                }
                p.callback = e, hs(p) ? p.complete = !0 : o += p.duration, l.push(p)
            }
            this.animations_.push(l), this.setHint(is.ANIMATING, 1), this.updateAnimations_()
        }, t.prototype.getAnimating = function () {
            return 0 < this.hints_[is.ANIMATING]
        }, t.prototype.getInteracting = function () {
            return 0 < this.hints_[is.INTERACTING]
        }, t.prototype.cancelAnimations = function () {
            this.setHint(is.ANIMATING, -this.hints_[is.ANIMATING]);
            for (var t = 0, e = this.animations_.length; t < e; ++t) {
                var i = this.animations_[t];
                i[0].callback && as(i[0].callback, !1)
            }
            this.animations_.length = 0
        }, t.prototype.updateAnimations_ = function () {
            var t = this;
            if (void 0 !== this.updateAnimationKey_ && (cancelAnimationFrame(this.updateAnimationKey_), this.updateAnimationKey_ = void 0), this.getAnimating()) {
                for (var e = Date.now(), i = !1, r = this.animations_.length - 1; 0 <= r; --r) {
                    for (var n = t.animations_[r], o = !0, s = 0, a = n.length; s < a; ++s) {
                        var h = n[s];
                        if (!h.complete) {
                            var l = e - h.start, u = 0 < h.duration ? l / h.duration : 1;
                            1 <= u ? (h.complete = !0, u = 1) : o = !1;
                            var c = h.easing(u);
                            if (h.sourceCenter) {
                                var p = h.sourceCenter[0], d = h.sourceCenter[1], f = p + c * (h.targetCenter[0] - p),
                                    _ = d + c * (h.targetCenter[1] - d);
                                t.set(rs, [f, _])
                            }
                            if (h.sourceResolution && h.targetResolution) {
                                var g = 1 === c ? h.targetResolution : h.sourceResolution + c * (h.targetResolution - h.sourceResolution);
                                h.anchor && t.set(rs, t.calculateCenterZoom(g, h.anchor)), t.set(ns, g)
                            }
                            if (void 0 !== h.sourceRotation && void 0 !== h.targetRotation) {
                                var y = 1 === c ? Et(h.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : h.sourceRotation + c * (h.targetRotation - h.sourceRotation);
                                h.anchor && t.set(rs, t.calculateCenterRotate(y, h.anchor)), t.set(os, y)
                            }
                            if (i = !0, !h.complete) break
                        }
                    }
                    if (o) {
                        t.animations_[r] = null, t.setHint(is.ANIMATING, -1);
                        var v = n[0].callback;
                        v && as(v, !0)
                    }
                }
                this.animations_ = this.animations_.filter(Boolean), i && void 0 === this.updateAnimationKey_ && (this.updateAnimationKey_ = requestAnimationFrame(this.updateAnimations_))
            }
        }, t.prototype.calculateCenterRotate = function (t, e) {
            var i, r = this.getCenter();
            return void 0 !== r && (pn(i = [r[0] - e[0], r[1] - e[1]], t - this.getRotation()), an(i, e)), i
        }, t.prototype.calculateCenterZoom = function (t, e) {
            var i, r = this.getCenter(), n = this.getResolution();
            void 0 !== r && void 0 !== n && (i = [e[0] - t * (e[0] - r[0]) / n, e[1] - t * (e[1] - r[1]) / n]);
            return i
        }, t.prototype.getSizeFromViewport_ = function () {
            var t = [100, 100], e = '.ol-viewport[data-view="' + Ct(this) + '"]', i = document.querySelector(e);
            if (i) {
                var r = getComputedStyle(i);
                t[0] = parseInt(r.width, 10), t[1] = parseInt(r.height, 10)
            }
            return t
        }, t.prototype.constrainCenter = function (t) {
            return this.constraints_.center(t)
        }, t.prototype.constrainResolution = function (t, e, i) {
            var r = e || 0, n = i || 0;
            return this.constraints_.resolution(t, r, n)
        }, t.prototype.constrainRotation = function (t, e) {
            var i = e || 0;
            return this.constraints_.rotation(t, i)
        }, t.prototype.getCenter = function () {
            return this.get(rs)
        }, t.prototype.getConstraints = function () {
            return this.constraints_
        }, t.prototype.getHints = function (t) {
            return void 0 !== t ? (t[0] = this.hints_[0], t[1] = this.hints_[1], t) : this.hints_.slice()
        }, t.prototype.calculateExtent = function (t) {
            var e = t || this.getSizeFromViewport_(), i = this.getCenter();
            Z(i, 1);
            var r = this.getResolution();
            Z(void 0 !== r, 2);
            var n = this.getRotation();
            return Z(void 0 !== n, 3), st(i, r, n, e)
        }, t.prototype.getMaxResolution = function () {
            return this.maxResolution_
        }, t.prototype.getMinResolution = function () {
            return this.minResolution_
        }, t.prototype.getMaxZoom = function () {
            return this.getZoomForResolution(this.minResolution_)
        }, t.prototype.setMaxZoom = function (t) {
            this.applyOptions_(this.getUpdatedOptions_({maxZoom: t}))
        }, t.prototype.getMinZoom = function () {
            return this.getZoomForResolution(this.maxResolution_)
        }, t.prototype.setMinZoom = function (t) {
            this.applyOptions_(this.getUpdatedOptions_({minZoom: t}))
        }, t.prototype.getProjection = function () {
            return this.projection_
        }, t.prototype.getResolution = function () {
            return this.get(ns)
        }, t.prototype.getResolutions = function () {
            return this.resolutions_
        }, t.prototype.getResolutionForExtent = function (t, e) {
            var i = e || this.getSizeFromViewport_(), r = ct(t) / i[0], n = at(t) / i[1];
            return Math.max(r, n)
        }, t.prototype.getResolutionForValueFunction = function (t) {
            var e = t || 2, i = this.maxResolution_, r = this.minResolution_, n = Math.log(i / r) / Math.log(e);
            return function (t) {
                return i / Math.pow(e, t * n)
            }
        }, t.prototype.getRotation = function () {
            return this.get(os)
        }, t.prototype.getValueForResolutionFunction = function (t) {
            var e = t || 2, i = this.maxResolution_, r = this.minResolution_, n = Math.log(i / r) / Math.log(e);
            return function (t) {
                return Math.log(i / t) / Math.log(e) / n
            }
        }, t.prototype.getState = function (t) {
            var e = this.getCenter(), i = this.getProjection(), r = this.getResolution(), n = r / t,
                o = this.getRotation();
            return {
                center: [Math.round(e[0] / n) * n, Math.round(e[1] / n) * n],
                projection: void 0 !== i ? i : null,
                resolution: r,
                rotation: o,
                zoom: this.getZoom()
            }
        }, t.prototype.getZoom = function () {
            var t, e = this.getResolution();
            return void 0 !== e && (t = this.getZoomForResolution(e)), t
        }, t.prototype.getZoomForResolution = function (t) {
            var e, i, r = this.minZoom_ || 0;
            if (this.resolutions_) {
                var n = ur(this.resolutions_, t, 1);
                r = n, e = this.resolutions_[n], i = n == this.resolutions_.length - 1 ? 2 : e / this.resolutions_[n + 1]
            } else e = this.maxResolution_, i = this.zoomFactor_;
            return r + Math.log(e / t) / Math.log(i)
        }, t.prototype.getResolutionForZoom = function (t) {
            return this.constrainResolution(this.maxResolution_, t - this.minZoom_, 0)
        }, t.prototype.fit = function (t, e) {
            var i, r = e || {}, n = r.size;
            n || (n = this.getSizeFromViewport_()), t instanceof vr ? t.getType() === Lt.CIRCLE ? (i = tn(t = t.getExtent())).rotate(this.getRotation(), ot(t)) : i = t : (Z(Array.isArray(t), 24), Z(!pt(t), 25), i = tn(t));
            var o, s = void 0 !== r.padding ? r.padding : [0, 0, 0, 0],
                a = void 0 === r.constrainResolution || r.constrainResolution, h = void 0 !== r.nearest && r.nearest;
            o = void 0 !== r.minResolution ? r.minResolution : void 0 !== r.maxZoom ? this.constrainResolution(this.maxResolution_, r.maxZoom - this.minZoom_, 0) : 0;
            for (var l = i.getFlatCoordinates(), u = this.getRotation(), c = Math.cos(-u), p = Math.sin(-u), d = 1 / 0, f = 1 / 0, _ = -1 / 0, g = -1 / 0, y = i.getStride(), v = 0, m = l.length; v < m; v += y) {
                var x = l[v] * c - l[v + 1] * p, S = l[v] * p + l[v + 1] * c;
                d = Math.min(d, x), f = Math.min(f, S), _ = Math.max(_, x), g = Math.max(g, S)
            }
            var E = this.getResolutionForExtent([d, f, _, g], [n[0] - s[1] - s[3], n[1] - s[0] - s[2]]);
            if (E = isNaN(E) ? o : Math.max(E, o), a) {
                var C = this.constrainResolution(E, 0, 0);
                !h && C < E && (C = this.constrainResolution(C, -1, 0)), E = C
            }
            p = -p;
            var T = (d + _) / 2, w = (f + g) / 2,
                R = [(T += (s[1] - s[3]) / 2 * E) * c - (w += (s[0] - s[2]) / 2 * E) * p, w * c + T * p],
                I = r.callback ? r.callback : L;
            void 0 !== r.duration ? this.animate({
                resolution: E,
                center: R,
                duration: r.duration,
                easing: r.easing
            }, I) : (this.setResolution(E), this.setCenter(R), as(I, !0))
        }, t.prototype.centerOn = function (t, e, i) {
            var r = this.getRotation(), n = Math.cos(-r), o = Math.sin(-r), s = t[0] * n - t[1] * o,
                a = t[1] * n + t[0] * o, h = this.getResolution(),
                l = (s += (e[0] / 2 - i[0]) * h) * n - (a += (i[1] - e[1] / 2) * h) * (o = -o), u = a * n + s * o;
            this.setCenter([l, u])
        }, t.prototype.isDef = function () {
            return !!this.getCenter() && void 0 !== this.getResolution()
        }, t.prototype.rotate = function (t, e) {
            if (void 0 !== e) {
                var i = this.calculateCenterRotate(t, e);
                this.setCenter(i)
            }
            this.setRotation(t)
        }, t.prototype.setCenter = function (t) {
            this.set(rs, t), this.getAnimating() && this.cancelAnimations()
        }, t.prototype.setHint = function (t, e) {
            return this.hints_[t] += e, this.changed(), this.hints_[t]
        }, t.prototype.setResolution = function (t) {
            this.set(ns, t), this.getAnimating() && this.cancelAnimations()
        }, t.prototype.setRotation = function (t) {
            this.set(os, t), this.getAnimating() && this.cancelAnimations()
        }, t.prototype.setZoom = function (t) {
            this.setResolution(this.getResolutionForZoom(t))
        }, t
    }(R);

    function as(t, e) {
        setTimeout(function () {
            t(e)
        }, 0)
    }

    function hs(t) {
        return !(t.sourceCenter && t.targetCenter && !cn(t.sourceCenter, t.targetCenter)) && (t.sourceResolution === t.targetResolution && t.sourceRotation === t.targetRotation)
    }

    var ls = "opacity", us = "visible", cs = "extent", ps = "zIndex", ds = "maxResolution", fs = "minResolution",
        _s = "source", gs = function (i) {
            function t(t) {
                i.call(this);
                var e = E({}, t);
                e[ls] = void 0 !== t.opacity ? t.opacity : 1, e[us] = void 0 === t.visible || t.visible, e[ps] = t.zIndex, e[ds] = void 0 !== t.maxResolution ? t.maxResolution : 1 / 0, e[fs] = void 0 !== t.minResolution ? t.minResolution : 0, this.setProperties(e), this.state_ = {
                    layer: this,
                    managed: !0
                }, this.type
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.getType = function () {
                return this.type
            }, t.prototype.getLayerState = function () {
                return this.state_.opacity = gt(this.getOpacity(), 0, 1), this.state_.sourceState = this.getSourceState(), this.state_.visible = this.getVisible(), this.state_.extent = this.getExtent(), this.state_.zIndex = this.getZIndex() || 0, this.state_.maxResolution = this.getMaxResolution(), this.state_.minResolution = Math.max(this.getMinResolution(), 0), this.state_
            }, t.prototype.getLayersArray = function (t) {
            }, t.prototype.getLayerStatesArray = function (t) {
            }, t.prototype.getExtent = function () {
                return this.get(cs)
            }, t.prototype.getMaxResolution = function () {
                return this.get(ds)
            }, t.prototype.getMinResolution = function () {
                return this.get(fs)
            }, t.prototype.getOpacity = function () {
                return this.get(ls)
            }, t.prototype.getSourceState = function () {
            }, t.prototype.getVisible = function () {
                return this.get(us)
            }, t.prototype.getZIndex = function () {
                return this.get(ps)
            }, t.prototype.setExtent = function (t) {
                this.set(cs, t)
            }, t.prototype.setMaxResolution = function (t) {
                this.set(ds, t)
            }, t.prototype.setMinResolution = function (t) {
                this.set(fs, t)
            }, t.prototype.setOpacity = function (t) {
                this.set(ls, t)
            }, t.prototype.setVisible = function (t) {
                this.set(us, t)
            }, t.prototype.setZIndex = function (t) {
                this.set(ps, t)
            }, t
        }(R), ys = "undefined", vs = "loading", ms = "ready", xs = "error", Ss = "layers", Es = function (n) {
            function t(t) {
                var e = t || {}, i = E({}, e);
                delete i.layers;
                var r = e.layers;
                n.call(this, i), this.layersListenerKeys_ = [], this.listenerKeys_ = {}, C(this, b(Ss), this.handleLayersChanged_, this), r ? Array.isArray(r) ? r = new M(r.slice(), {unique: !0}) : (Z(r instanceof M, 43), r = r) : r = new M(void 0, {unique: !0}), this.setLayers(r)
            }

            return n && (t.__proto__ = n), ((t.prototype = Object.create(n && n.prototype)).constructor = t).prototype.handleLayerChange_ = function () {
                this.changed()
            }, t.prototype.handleLayersChanged_ = function () {
                this.layersListenerKeys_.forEach(g), this.layersListenerKeys_.length = 0;
                var t = this.getLayers();
                for (var e in this.layersListenerKeys_.push(C(t, h, this.handleLayersAdd_, this), C(t, l, this.handleLayersRemove_, this)), this.listenerKeys_) this.listenerKeys_[e].forEach(g);
                _(this.listenerKeys_);
                for (var i = t.getArray(), r = 0, n = i.length; r < n; r++) {
                    var o = i[r];
                    this.listenerKeys_[Ct(o).toString()] = [C(o, a, this.handleLayerChange_, this), C(o, w.CHANGE, this.handleLayerChange_, this)]
                }
                this.changed()
            }, t.prototype.handleLayersAdd_ = function (t) {
                var e = t.element, i = Ct(e).toString();
                this.listenerKeys_[i] = [C(e, a, this.handleLayerChange_, this), C(e, w.CHANGE, this.handleLayerChange_, this)], this.changed()
            }, t.prototype.handleLayersRemove_ = function (t) {
                var e = Ct(t.element).toString();
                this.listenerKeys_[e].forEach(g), delete this.listenerKeys_[e], this.changed()
            }, t.prototype.getLayers = function () {
                return this.get(Ss)
            }, t.prototype.setLayers = function (t) {
                this.set(Ss, t)
            }, t.prototype.getLayersArray = function (t) {
                var e = void 0 !== t ? t : [];
                return this.getLayers().forEach(function (t) {
                    t.getLayersArray(e)
                }), e
            }, t.prototype.getLayerStatesArray = function (t) {
                var e = void 0 !== t ? t : [], i = e.length;
                this.getLayers().forEach(function (t) {
                    t.getLayerStatesArray(e)
                });
                for (var r = this.getLayerState(), n = i, o = e.length; n < o; n++) {
                    var s = e[n];
                    s.opacity *= r.opacity, s.visible = s.visible && r.visible, s.maxResolution = Math.min(s.maxResolution, r.maxResolution), s.minResolution = Math.max(s.minResolution, r.minResolution), void 0 !== r.extent && (void 0 !== s.extent ? s.extent = ht(s.extent, r.extent) : s.extent = r.extent)
                }
                return e
            }, t.prototype.getSourceState = function () {
                return ms
            }, t
        }(gs);

    function Cs(t, e, i) {
        return void 0 === i && (i = [0, 0]), i[0] = t[0] + 2 * e, i[1] = t[1] + 2 * e, i
    }

    function Ts(t, e, i) {
        return void 0 === i && (i = [0, 0]), i[0] = t[0] * e + .5 | 0, i[1] = t[1] * e + .5 | 0, i
    }

    function ws(t, e) {
        return Array.isArray(t) ? t : (void 0 === e ? e = [t, t] : e[0] = e[1] = t, e)
    }

    var Rs = function (s) {
        function t(t) {
            s.call(this);
            var e = function (t) {
                var e = null;
                void 0 !== t.keyboardEventTarget && (e = "string" == typeof t.keyboardEventTarget ? document.getElementById(t.keyboardEventTarget) : t.keyboardEventTarget);
                var i, r, n, o = {}, s = t.layers instanceof Es ? t.layers : new Es({layers: t.layers});
                o[Ho.LAYERGROUP] = s, o[Ho.TARGET] = t.target, o[Ho.VIEW] = void 0 !== t.view ? t.view : new ss, void 0 !== t.controls && (Array.isArray(t.controls) ? i = new M(t.controls.slice()) : (Z(t.controls instanceof M, 47), i = t.controls));
                void 0 !== t.interactions && (Array.isArray(t.interactions) ? r = new M(t.interactions.slice()) : (Z(t.interactions instanceof M, 48), r = t.interactions));
                void 0 !== t.overlays ? Array.isArray(t.overlays) ? n = new M(t.overlays.slice()) : (Z(t.overlays instanceof M, 49), n = t.overlays) : n = new M;
                return {controls: i, interactions: r, keyboardEventTarget: e, overlays: n, values: o}
            }(t);
            this.maxTilesLoading_ = void 0 !== t.maxTilesLoading ? t.maxTilesLoading : 16, this.loadTilesWhileAnimating_ = void 0 !== t.loadTilesWhileAnimating && t.loadTilesWhileAnimating, this.loadTilesWhileInteracting_ = void 0 !== t.loadTilesWhileInteracting && t.loadTilesWhileInteracting, this.pixelRatio_ = void 0 !== t.pixelRatio ? t.pixelRatio : ai, this.animationDelayKey_, this.animationDelay_ = function () {
                this.animationDelayKey_ = void 0, this.renderFrame_.call(this, Date.now())
            }.bind(this), this.coordinateToPixelTransform_ = [1, 0, 0, 1, 0, 0], this.pixelToCoordinateTransform_ = [1, 0, 0, 1, 0, 0], this.frameIndex_ = 0, this.frameState_ = null, this.previousExtent_ = null, this.viewPropertyListenerKey_ = null, this.viewChangeListenerKey_ = null, this.layerGroupPropertyListenerKeys_ = null, this.viewport_ = document.createElement("div"), this.viewport_.className = "ol-viewport" + (ui ? " ol-touch" : ""), this.viewport_.style.position = "relative", this.viewport_.style.overflow = "hidden", this.viewport_.style.width = "100%", this.viewport_.style.height = "100%", this.viewport_.style.msTouchAction = "none", this.viewport_.style.touchAction = "none", this.overlayContainer_ = document.createElement("div"), this.overlayContainer_.className = "ol-overlaycontainer", this.viewport_.appendChild(this.overlayContainer_), this.overlayContainerStopEvent_ = document.createElement("div"), this.overlayContainerStopEvent_.className = "ol-overlaycontainer-stopevent";
            for (var i = [w.CLICK, w.DBLCLICK, w.MOUSEDOWN, w.TOUCHSTART, w.MSPOINTERDOWN, Jn.POINTERDOWN, w.MOUSEWHEEL, w.WHEEL], r = 0, n = i.length; r < n; ++r) C(this.overlayContainerStopEvent_, i[r], x);
            for (var o in this.viewport_.appendChild(this.overlayContainerStopEvent_), this.mapBrowserEventHandler_ = new Wo(this, t.moveTolerance), Jn) C(this.mapBrowserEventHandler_, Jn[o], this.handleMapBrowserEvent, this);
            this.keyboardEventTarget_ = e.keyboardEventTarget, this.keyHandlerKeys_ = null, C(this.viewport_, w.CONTEXTMENU, this.handleBrowserEvent, this), C(this.viewport_, w.WHEEL, this.handleBrowserEvent, this), C(this.viewport_, w.MOUSEWHEEL, this.handleBrowserEvent, this), this.controls = e.controls || new M, this.interactions = e.interactions || new M, this.overlays_ = e.overlays, this.overlayIdIndex_ = {}, this.renderer_ = this.createRenderer(), this.handleResize_, this.focus_ = null, this.postRenderFunctions_ = [], this.tileQueue_ = new qo(this.getTilePriority.bind(this), this.handleTileChange_.bind(this)), this.skippedFeatureUids_ = {}, C(this, b(Ho.LAYERGROUP), this.handleLayerGroupChanged_, this), C(this, b(Ho.VIEW), this.handleViewChanged_, this), C(this, b(Ho.SIZE), this.handleSizeChanged_, this), C(this, b(Ho.TARGET), this.handleTargetChanged_, this), this.setProperties(e.values), this.controls.forEach(function (t) {
                t.setMap(this)
            }.bind(this)), C(this.controls, h, function (t) {
                t.element.setMap(this)
            }, this), C(this.controls, l, function (t) {
                t.element.setMap(null)
            }, this), this.interactions.forEach(function (t) {
                t.setMap(this)
            }.bind(this)), C(this.interactions, h, function (t) {
                t.element.setMap(this)
            }, this), C(this.interactions, l, function (t) {
                t.element.setMap(null)
            }, this), this.overlays_.forEach(this.addOverlayInternal_.bind(this)), C(this.overlays_, h, function (t) {
                this.addOverlayInternal_(t.element)
            }, this), C(this.overlays_, l, function (t) {
                var e = t.element.getId();
                void 0 !== e && delete this.overlayIdIndex_[e.toString()], t.element.setMap(null)
            }, this)
        }

        return s && (t.__proto__ = s), ((t.prototype = Object.create(s && s.prototype)).constructor = t).prototype.createRenderer = function () {
            throw new Error("Use a map type that has a createRenderer method")
        }, t.prototype.addControl = function (t) {
            this.getControls().push(t)
        }, t.prototype.addInteraction = function (t) {
            this.getInteractions().push(t)
        }, t.prototype.addLayer = function (t) {
            this.getLayerGroup().getLayers().push(t)
        }, t.prototype.addOverlay = function (t) {
            this.getOverlays().push(t)
        }, t.prototype.addOverlayInternal_ = function (t) {
            var e = t.getId();
            void 0 !== e && (this.overlayIdIndex_[e.toString()] = t), t.setMap(this)
        }, t.prototype.disposeInternal = function () {
            this.mapBrowserEventHandler_.dispose(), d(this.viewport_, w.CONTEXTMENU, this.handleBrowserEvent, this), d(this.viewport_, w.WHEEL, this.handleBrowserEvent, this), d(this.viewport_, w.MOUSEWHEEL, this.handleBrowserEvent, this), void 0 !== this.handleResize_ && (removeEventListener(w.RESIZE, this.handleResize_, !1), this.handleResize_ = void 0), this.animationDelayKey_ && (cancelAnimationFrame(this.animationDelayKey_), this.animationDelayKey_ = void 0), this.setTarget(null), s.prototype.disposeInternal.call(this)
        }, t.prototype.forEachFeatureAtPixel = function (t, e, i) {
            if (this.frameState_) {
                var r = this.getCoordinateFromPixel(t),
                    n = void 0 !== (i = void 0 !== i ? i : {}).hitTolerance ? i.hitTolerance * this.frameState_.pixelRatio : 0,
                    o = void 0 !== i.layerFilter ? i.layerFilter : y;
                return this.renderer_.forEachFeatureAtCoordinate(r, this.frameState_, n, e, null, o, null)
            }
        }, t.prototype.getFeaturesAtPixel = function (t, e) {
            var i = null;
            return this.forEachFeatureAtPixel(t, function (t) {
                i || (i = []), i.push(t)
            }, e), i
        }, t.prototype.forEachLayerAtPixel = function (t, e, i) {
            if (this.frameState_) {
                var r = i || {}, n = void 0 !== r.hitTolerance ? i.hitTolerance * this.frameState_.pixelRatio : 0,
                    o = r.layerFilter || y;
                return this.renderer_.forEachLayerAtPixel(t, this.frameState_, n, e, null, o, null)
            }
        }, t.prototype.hasFeatureAtPixel = function (t, e) {
            if (!this.frameState_) return !1;
            var i = this.getCoordinateFromPixel(t),
                r = void 0 !== (e = void 0 !== e ? e : {}).layerFilter ? e.layerFilter : y,
                n = void 0 !== e.hitTolerance ? e.hitTolerance * this.frameState_.pixelRatio : 0;
            return this.renderer_.hasFeatureAtCoordinate(i, this.frameState_, n, r, null)
        }, t.prototype.getEventCoordinate = function (t) {
            return this.getCoordinateFromPixel(this.getEventPixel(t))
        }, t.prototype.getEventPixel = function (t) {
            var e = this.viewport_.getBoundingClientRect(), i = t.changedTouches ? t.changedTouches[0] : t;
            return [i.clientX - e.left, i.clientY - e.top]
        }, t.prototype.getTarget = function () {
            return this.get(Ho.TARGET)
        }, t.prototype.getTargetElement = function () {
            var t = this.getTarget();
            return void 0 !== t ? "string" == typeof t ? document.getElementById(t) : t : null
        }, t.prototype.getCoordinateFromPixel = function (t) {
            var e = this.frameState_;
            return e ? xe(e.pixelToCoordinateTransform, t.slice()) : null
        }, t.prototype.getControls = function () {
            return this.controls
        }, t.prototype.getOverlays = function () {
            return this.overlays_
        }, t.prototype.getOverlayById = function (t) {
            var e = this.overlayIdIndex_[t.toString()];
            return void 0 !== e ? e : null
        }, t.prototype.getInteractions = function () {
            return this.interactions
        }, t.prototype.getLayerGroup = function () {
            return this.get(Ho.LAYERGROUP)
        }, t.prototype.getLayers = function () {
            return this.getLayerGroup().getLayers()
        }, t.prototype.getPixelFromCoordinate = function (t) {
            var e = this.frameState_;
            return e ? xe(e.coordinateToPixelTransform, t.slice(0, 2)) : null
        }, t.prototype.getRenderer = function () {
            return this.renderer_
        }, t.prototype.getSize = function () {
            return this.get(Ho.SIZE)
        }, t.prototype.getView = function () {
            return this.get(Ho.VIEW)
        }, t.prototype.getViewport = function () {
            return this.viewport_
        }, t.prototype.getOverlayContainer = function () {
            return this.overlayContainer_
        }, t.prototype.getOverlayContainerStopEvent = function () {
            return this.overlayContainerStopEvent_
        }, t.prototype.getTilePriority = function (t, e, i, r) {
            var n = this.frameState_;
            if (!(n && e in n.wantedTiles)) return 1 / 0;
            if (!n.wantedTiles[e][t.getKey()]) return 1 / 0;
            var o = i[0] - n.focus[0], s = i[1] - n.focus[1];
            return 65536 * Math.log(r) + Math.sqrt(o * o + s * s) / r
        }, t.prototype.handleBrowserEvent = function (t, e) {
            var i = e || t.type, r = new qn(i, this, t);
            this.handleMapBrowserEvent(r)
        }, t.prototype.handleMapBrowserEvent = function (t) {
            if (this.frameState_) {
                this.focus_ = t.coordinate, t.frameState = this.frameState_;
                var e = this.getInteractions().getArray();
                if (!1 !== this.dispatchEvent(t)) for (var i = e.length - 1; 0 <= i; i--) {
                    var r = e[i];
                    if (r.getActive()) if (!r.handleEvent(t)) break
                }
            }
        }, t.prototype.handlePostRender = function () {
            var t = this.frameState_, e = this.tileQueue_;
            if (!e.isEmpty()) {
                var i = this.maxTilesLoading_, r = i;
                if (t) {
                    var n = t.viewHints;
                    n[is.ANIMATING] && (i = this.loadTilesWhileAnimating_ ? 8 : 0, r = 2), n[is.INTERACTING] && (i = this.loadTilesWhileInteracting_ ? 8 : 0, r = 2)
                }
                e.getTilesLoading() < i && (e.reprioritize(), e.loadMoreTiles(i, r))
            }
            !t || !this.hasListener(Ko.RENDERCOMPLETE) || t.animate || this.tileQueue_.getTilesLoading() || function t(e) {
                for (var i = 0, r = e.length; i < r; ++i) {
                    var n = e[i];
                    if (n instanceof Es) return t(n.getLayers().getArray());
                    var o = e[i].getSource();
                    if (o && o.loading) return !0
                }
                return !1
            }(this.getLayers().getArray()) || this.renderer_.dispatchRenderEvent(Rn, t);
            for (var o = this.postRenderFunctions_, s = 0, a = o.length; s < a; ++s) o[s](this, t);
            o.length = 0
        }, t.prototype.handleSizeChanged_ = function () {
            this.render()
        }, t.prototype.handleTargetChanged_ = function () {
            var t;
            if (this.getTarget() && (t = this.getTargetElement()), this.keyHandlerKeys_) {
                for (var e = 0, i = this.keyHandlerKeys_.length; e < i; ++e) g(this.keyHandlerKeys_[e]);
                this.keyHandlerKeys_ = null
            }
            if (t) {
                t.appendChild(this.viewport_);
                var r = this.keyboardEventTarget_ ? this.keyboardEventTarget_ : t;
                this.keyHandlerKeys_ = [C(r, w.KEYDOWN, this.handleBrowserEvent, this), C(r, w.KEYPRESS, this.handleBrowserEvent, this)], this.handleResize_ || (this.handleResize_ = this.updateSize.bind(this), addEventListener(w.RESIZE, this.handleResize_, !1))
            } else this.renderer_.removeLayerRenderers(), Ue(this.viewport_), void 0 !== this.handleResize_ && (removeEventListener(w.RESIZE, this.handleResize_, !1), this.handleResize_ = void 0);
            this.updateSize()
        }, t.prototype.handleTileChange_ = function () {
            this.render()
        }, t.prototype.handleViewPropertyChanged_ = function () {
            this.render()
        }, t.prototype.handleViewChanged_ = function () {
            this.viewPropertyListenerKey_ && (g(this.viewPropertyListenerKey_), this.viewPropertyListenerKey_ = null), this.viewChangeListenerKey_ && (g(this.viewChangeListenerKey_), this.viewChangeListenerKey_ = null);
            var t = this.getView();
            t && (this.viewport_.setAttribute("data-view", Ct(t)), this.viewPropertyListenerKey_ = C(t, a, this.handleViewPropertyChanged_, this), this.viewChangeListenerKey_ = C(t, w.CHANGE, this.handleViewPropertyChanged_, this)), this.render()
        }, t.prototype.handleLayerGroupChanged_ = function () {
            this.layerGroupPropertyListenerKeys_ && (this.layerGroupPropertyListenerKeys_.forEach(g), this.layerGroupPropertyListenerKeys_ = null);
            var t = this.getLayerGroup();
            t && (this.layerGroupPropertyListenerKeys_ = [C(t, a, this.render, this), C(t, w.CHANGE, this.render, this)]), this.render()
        }, t.prototype.isRendered = function () {
            return !!this.frameState_
        }, t.prototype.renderSync = function () {
            this.animationDelayKey_ && cancelAnimationFrame(this.animationDelayKey_), this.animationDelay_()
        }, t.prototype.render = function () {
            void 0 === this.animationDelayKey_ && (this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_))
        }, t.prototype.removeControl = function (t) {
            return this.getControls().remove(t)
        }, t.prototype.removeInteraction = function (t) {
            return this.getInteractions().remove(t)
        }, t.prototype.removeLayer = function (t) {
            return this.getLayerGroup().getLayers().remove(t)
        }, t.prototype.removeOverlay = function (t) {
            return this.getOverlays().remove(t)
        }, t.prototype.renderFrame_ = function (t) {
            var e, i, r = this.getSize(), n = this.getView(), o = [1 / 0, 1 / 0, -1 / 0, -1 / 0], s = this.frameState_,
                a = null;
            if (void 0 !== r && (0 < (i = r)[0] && 0 < i[1]) && n && n.isDef()) {
                for (var h = n.getHints(this.frameState_ ? this.frameState_.viewHints : void 0), l = this.getLayerGroup().getLayerStatesArray(), u = {}, c = 0, p = l.length; c < p; ++c) u[Ct(l[c].layer)] = l[c];
                e = n.getState(this.pixelRatio_), a = {
                    animate: !1,
                    coordinateToPixelTransform: this.coordinateToPixelTransform_,
                    extent: o,
                    focus: this.focus_ ? this.focus_ : e.center,
                    index: this.frameIndex_++,
                    layerStates: u,
                    layerStatesArray: l,
                    pixelRatio: this.pixelRatio_,
                    pixelToCoordinateTransform: this.pixelToCoordinateTransform_,
                    postRenderFunctions: [],
                    size: r,
                    skippedFeatureUids: this.skippedFeatureUids_,
                    tileQueue: this.tileQueue_,
                    time: t,
                    usedTiles: {},
                    viewState: e,
                    viewHints: h,
                    wantedTiles: {}
                }
            }
            if (a && (a.extent = st(e.center, e.resolution, e.rotation, a.size, o)), this.frameState_ = a, this.renderer_.renderFrame(a), a) {
                if (a.animate && this.render(), Array.prototype.push.apply(this.postRenderFunctions_, a.postRenderFunctions), s) (!this.previousExtent_ || !pt(this.previousExtent_) && !$(a.extent, this.previousExtent_)) && (this.dispatchEvent(new Zn(Ko.MOVESTART, this, s)), this.previousExtent_ = z(this.previousExtent_));
                this.previousExtent_ && !a.viewHints[is.ANIMATING] && !a.viewHints[is.INTERACTING] && !$(a.extent, this.previousExtent_) && (this.dispatchEvent(new Zn(Ko.MOVEEND, this, a)), k(a.extent, this.previousExtent_))
            }
            this.dispatchEvent(new Zn(Ko.POSTRENDER, this, a)), setTimeout(this.handlePostRender.bind(this), 0)
        }, t.prototype.setLayerGroup = function (t) {
            this.set(Ho.LAYERGROUP, t)
        }, t.prototype.setSize = function (t) {
            this.set(Ho.SIZE, t)
        }, t.prototype.setTarget = function (t) {
            this.set(Ho.TARGET, t)
        }, t.prototype.setView = function (t) {
            this.set(Ho.VIEW, t)
        }, t.prototype.skipFeature = function (t) {
            var e = Ct(t).toString();
            this.skippedFeatureUids_[e] = !0, this.render()
        }, t.prototype.updateSize = function () {
            var t = this.getTargetElement();
            if (t) {
                var e = getComputedStyle(t);
                this.setSize([t.offsetWidth - parseFloat(e.borderLeftWidth) - parseFloat(e.paddingLeft) - parseFloat(e.paddingRight) - parseFloat(e.borderRightWidth), t.offsetHeight - parseFloat(e.borderTopWidth) - parseFloat(e.paddingTop) - parseFloat(e.paddingBottom) - parseFloat(e.borderBottomWidth)])
            } else this.setSize(void 0)
        }, t.prototype.unskipFeature = function (t) {
            var e = Ct(t).toString();
            delete this.skippedFeatureUids_[e], this.render()
        }, t
    }(R);
    var Is = function (e) {
        function t(t) {
            e.call(this), this.element = t.element ? t.element : null, this.target_ = null, this.map_ = null, this.listenerKeys = [], this.render = t.render ? t.render : L, t.target && this.setTarget(t.target)
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.disposeInternal = function () {
            Ue(this.element), e.prototype.disposeInternal.call(this)
        }, t.prototype.getMap = function () {
            return this.map_
        }, t.prototype.setMap = function (t) {
            this.map_ && Ue(this.element);
            for (var e = 0, i = this.listenerKeys.length; e < i; ++e) g(this.listenerKeys[e]);
            (this.listenerKeys.length = 0, this.map_ = t, this.map_) && ((this.target_ ? this.target_ : t.getOverlayContainerStopEvent()).appendChild(this.element), this.render !== L && this.listenerKeys.push(C(t, Ko.POSTRENDER, this.render, this)), t.render())
        }, t.prototype.setTarget = function (t) {
            this.target_ = "string" == typeof t ? document.getElementById(t) : t
        }, t
    }(R), Ls = function (r) {
        function t(t) {
            var e = E({}, t);
            delete e.source, r.call(this, e), this.mapPrecomposeKey_ = null, this.mapRenderKey_ = null, this.sourceChangeKey_ = null, t.map && this.setMap(t.map), C(this, b(_s), this.handleSourcePropertyChange_, this);
            var i = t.source ? t.source : null;
            this.setSource(i)
        }

        return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype.getLayersArray = function (t) {
            var e = t || [];
            return e.push(this), e
        }, t.prototype.getLayerStatesArray = function (t) {
            var e = t || [];
            return e.push(this.getLayerState()), e
        }, t.prototype.getSource = function () {
            return this.get(_s) || null
        }, t.prototype.getSourceState = function () {
            var t = this.getSource();
            return t ? t.getState() : ys
        }, t.prototype.handleSourceChange_ = function () {
            this.changed()
        }, t.prototype.handleSourcePropertyChange_ = function () {
            this.sourceChangeKey_ && (g(this.sourceChangeKey_), this.sourceChangeKey_ = null);
            var t = this.getSource();
            t && (this.sourceChangeKey_ = C(t, w.CHANGE, this.handleSourceChange_, this)), this.changed()
        }, t.prototype.setMap = function (t) {
            this.mapPrecomposeKey_ && (g(this.mapPrecomposeKey_), this.mapPrecomposeKey_ = null), t || this.changed(), this.mapRenderKey_ && (g(this.mapRenderKey_), this.mapRenderKey_ = null), t && (this.mapPrecomposeKey_ = C(t, Tn, function (t) {
                var e = this.getLayerState();
                e.managed = !1, void 0 === this.getZIndex() && (e.zIndex = 1 / 0), t.frameState.layerStatesArray.push(e), t.frameState.layerStates[Ct(this)] = e
            }, this), this.mapRenderKey_ = C(this, w.CHANGE, t.render, t), this.changed())
        }, t.prototype.setSource = function (t) {
            this.set(_s, t)
        }, t
    }(gs);

    function bs(t, e) {
        return t.visible && e >= t.minResolution && e < t.maxResolution
    }

    var Fs = function (u) {
        function t(t) {
            var e = t || {};
            u.call(this, {
                element: document.createElement("div"),
                render: e.render || Ps,
                target: e.target
            }), this.ulElement_ = document.createElement("ul"), this.collapsed_ = void 0 === e.collapsed || e.collapsed, this.collapsible_ = void 0 === e.collapsible || e.collapsible, this.collapsible_ || (this.collapsed_ = !1);
            var i = void 0 !== e.className ? e.className : "ol-attribution",
                r = void 0 !== e.tipLabel ? e.tipLabel : "Attributions",
                n = void 0 !== e.collapseLabel ? e.collapseLabel : "»";
            "string" == typeof n ? (this.collapseLabel_ = document.createElement("span"), this.collapseLabel_.textContent = n) : this.collapseLabel_ = n;
            var o = void 0 !== e.label ? e.label : "i";
            "string" == typeof o ? (this.label_ = document.createElement("span"), this.label_.textContent = o) : this.label_ = o;
            var s = this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_,
                a = document.createElement("button");
            a.setAttribute("type", "button"), a.title = r, a.appendChild(s), C(a, w.CLICK, this.handleClick_, this);
            var h = i + " " + _i + " " + gi + (this.collapsed_ && this.collapsible_ ? " " + yi : "") + (this.collapsible_ ? "" : " ol-uncollapsible"),
                l = this.element;
            l.className = h, l.appendChild(this.ulElement_), l.appendChild(a), this.renderedAttributions_ = [], this.renderedVisible_ = !0
        }

        return u && (t.__proto__ = u), ((t.prototype = Object.create(u && u.prototype)).constructor = t).prototype.getSourceAttributions_ = function (t) {
            for (var e = {}, i = [], r = t.layerStatesArray, n = t.viewState.resolution, o = 0, s = r.length; o < s; ++o) {
                var a = r[o];
                if (bs(a, n)) {
                    var h = a.layer.getSource();
                    if (h) {
                        var l = h.getAttributions();
                        if (l) {
                            var u = l(t);
                            if (u) if (Array.isArray(u)) for (var c = 0, p = u.length; c < p; ++c) u[c] in e || (i.push(u[c]), e[u[c]] = !0); else u in e || (i.push(u), e[u] = !0)
                        }
                    }
                }
            }
            return i
        }, t.prototype.updateElement_ = function (t) {
            if (t) {
                var e = this.getSourceAttributions_(t), i = 0 < e.length;
                if (this.renderedVisible_ != i && (this.element.style.display = i ? "" : "none", this.renderedVisible_ = i), !fr(e, this.renderedAttributions_)) {
                    Ye(this.ulElement_);
                    for (var r = 0, n = e.length; r < n; ++r) {
                        var o = document.createElement("li");
                        o.innerHTML = e[r], this.ulElement_.appendChild(o)
                    }
                    this.renderedAttributions_ = e
                }
            } else this.renderedVisible_ && (this.element.style.display = "none", this.renderedVisible_ = !1)
        }, t.prototype.handleClick_ = function (t) {
            t.preventDefault(), this.handleToggle_()
        }, t.prototype.handleToggle_ = function () {
            this.element.classList.toggle(yi), this.collapsed_ ? je(this.collapseLabel_, this.label_) : je(this.label_, this.collapseLabel_), this.collapsed_ = !this.collapsed_
        }, t.prototype.getCollapsible = function () {
            return this.collapsible_
        }, t.prototype.setCollapsible = function (t) {
            this.collapsible_ !== t && (this.collapsible_ = t, this.element.classList.toggle("ol-uncollapsible"), !t && this.collapsed_ && this.handleToggle_())
        }, t.prototype.setCollapsed = function (t) {
            this.collapsible_ && this.collapsed_ !== t && this.handleToggle_()
        }, t.prototype.getCollapsed = function () {
            return this.collapsed_
        }, t
    }(Is);

    function Ps(t) {
        this.updateElement_(t.frameState)
    }

    var Ms = function (h) {
        function t(t) {
            var e = t || {};
            h.call(this, {element: document.createElement("div"), render: e.render || Os, target: e.target});
            var i = void 0 !== e.className ? e.className : "ol-rotate", r = void 0 !== e.label ? e.label : "⇧";
            this.label_ = null, "string" == typeof r ? (this.label_ = document.createElement("span"), this.label_.className = "ol-compass", this.label_.textContent = r) : (this.label_ = r, this.label_.classList.add("ol-compass"));
            var n = e.tipLabel ? e.tipLabel : "Reset rotation", o = document.createElement("button");
            o.className = i + "-reset", o.setAttribute("type", "button"), o.title = n, o.appendChild(this.label_), C(o, w.CLICK, this.handleClick_, this);
            var s = i + " " + _i + " " + gi, a = this.element;
            a.className = s, a.appendChild(o), this.callResetNorth_ = e.resetNorth ? e.resetNorth : void 0, this.duration_ = void 0 !== e.duration ? e.duration : 250, this.autoHide_ = void 0 === e.autoHide || e.autoHide, this.rotation_ = void 0, this.autoHide_ && this.element.classList.add(fi)
        }

        return h && (t.__proto__ = h), ((t.prototype = Object.create(h && h.prototype)).constructor = t).prototype.handleClick_ = function (t) {
            t.preventDefault(), void 0 !== this.callResetNorth_ ? this.callResetNorth_() : this.resetNorth_()
        }, t.prototype.resetNorth_ = function () {
            var t = this.getMap().getView();
            t && void 0 !== t.getRotation() && (0 < this.duration_ ? t.animate({
                rotation: 0,
                duration: this.duration_,
                easing: Bn
            }) : t.setRotation(0))
        }, t
    }(Is);

    function Os(t) {
        var e = t.frameState;
        if (e) {
            var i = e.viewState.rotation;
            if (i != this.rotation_) {
                var r = "rotate(" + i + "rad)";
                if (this.autoHide_) {
                    var n = this.element.classList.contains(fi);
                    n || 0 !== i ? n && 0 !== i && this.element.classList.remove(fi) : this.element.classList.add(fi)
                }
                this.label_.style.msTransform = r, this.label_.style.webkitTransform = r, this.label_.style.transform = r
            }
            this.rotation_ = i
        }
    }

    var Ns = function (p) {
        function t(t) {
            var e = t || {};
            p.call(this, {element: document.createElement("div"), target: e.target});
            var i = void 0 !== e.className ? e.className : "ol-zoom", r = void 0 !== e.delta ? e.delta : 1,
                n = void 0 !== e.zoomInLabel ? e.zoomInLabel : "+",
                o = void 0 !== e.zoomOutLabel ? e.zoomOutLabel : "−",
                s = void 0 !== e.zoomInTipLabel ? e.zoomInTipLabel : "Zoom in",
                a = void 0 !== e.zoomOutTipLabel ? e.zoomOutTipLabel : "Zoom out", h = document.createElement("button");
            h.className = i + "-in", h.setAttribute("type", "button"), h.title = s, h.appendChild("string" == typeof n ? document.createTextNode(n) : n), C(h, w.CLICK, this.handleClick_.bind(this, r));
            var l = document.createElement("button");
            l.className = i + "-out", l.setAttribute("type", "button"), l.title = a, l.appendChild("string" == typeof o ? document.createTextNode(o) : o), C(l, w.CLICK, this.handleClick_.bind(this, -r));
            var u = i + " " + _i + " " + gi, c = this.element;
            c.className = u, c.appendChild(h), c.appendChild(l), this.duration_ = void 0 !== e.duration ? e.duration : 250
        }

        return p && (t.__proto__ = p), ((t.prototype = Object.create(p && p.prototype)).constructor = t).prototype.handleClick_ = function (t, e) {
            e.preventDefault(), this.zoomByDelta_(t)
        }, t.prototype.zoomByDelta_ = function (t) {
            var e = this.getMap().getView();
            if (e) {
                var i = e.getResolution();
                if (i) {
                    var r = e.constrainResolution(i, t);
                    0 < this.duration_ ? (e.getAnimating() && e.cancelAnimations(), e.animate({
                        resolution: r,
                        duration: this.duration_,
                        easing: Bn
                    })) : e.setResolution(r)
                }
            }
        }, t
    }(Is);

    function As(t) {
        var e = t || {}, i = new M;
        return (void 0 === e.zoom || e.zoom) && i.push(new Ns(e.zoomOptions)), (void 0 === e.rotate || e.rotate) && i.push(new Ms(e.rotateOptions)), (void 0 === e.attribution || e.attribution) && i.push(new Fs(e.attributionOptions)), i
    }

    var Gs = "active", ks = function (e) {
        function t(t) {
            e.call(this), this.map_ = null, this.setActive(!0), this.handleEvent = t.handleEvent
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.getActive = function () {
            return this.get(Gs)
        }, t.prototype.getMap = function () {
            return this.map_
        }, t.prototype.setActive = function (t) {
            this.set(Gs, t)
        }, t.prototype.setMap = function (t) {
            this.map_ = t
        }, t
    }(R);

    function Ds(t, e, i, r) {
        js(t, e = t.constrainRotation(e, 0), i, r)
    }

    function js(t, e, i, r) {
        if (void 0 !== e) {
            var n = t.getRotation(), o = t.getCenter();
            void 0 !== n && o && 0 < r ? t.animate({rotation: e, anchor: i, duration: r, easing: Bn}) : t.rotate(e, i)
        }
    }

    function Us(t, e, i, r, n) {
        Bs(t, e = t.constrainResolution(e, 0, n), i, r)
    }

    function Ys(t, e, i, r) {
        var n = t.getResolution(), o = t.constrainResolution(n, e, 0);
        if (void 0 !== o) {
            var s = t.getResolutions();
            o = gt(o, t.getMinResolution() || s[s.length - 1], t.getMaxResolution() || s[0])
        }
        if (i && void 0 !== o && o !== n) {
            var a = t.getCenter(), h = t.calculateCenterZoom(o, i);
            h = t.constrainCenter(h), i = [(o * a[0] - n * h[0]) / (o - n), (o * a[1] - n * h[1]) / (o - n)]
        }
        Bs(t, o, i, r)
    }

    function Bs(t, e, i, r) {
        if (e) {
            var n = t.getResolution(), o = t.getCenter();
            if (void 0 !== n && o && e !== n && r) t.animate({
                resolution: e,
                anchor: i,
                duration: r,
                easing: Bn
            }); else {
                if (i) {
                    var s = t.calculateCenterZoom(e, i);
                    t.setCenter(s)
                }
                t.setResolution(e)
            }
        }
    }

    var Xs = function (i) {
        function t(t) {
            i.call(this, {handleEvent: zs});
            var e = t || {};
            this.delta_ = e.delta ? e.delta : 1, this.duration_ = void 0 !== e.duration ? e.duration : 250
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(ks);

    function zs(t) {
        var e = !1, i = t.originalEvent;
        if (t.type == Jn.DBLCLICK) {
            var r = t.map, n = t.coordinate, o = i.shiftKey ? -this.delta_ : this.delta_;
            Ys(r.getView(), o, n, this.duration_), t.preventDefault(), e = !0
        }
        return !e
    }

    var Vs = function (t) {
        var e = t.originalEvent;
        return e.altKey && !(e.metaKey || e.ctrlKey) && !e.shiftKey
    }, Ws = function (t) {
        var e = t.originalEvent;
        return e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey
    }, Ks = function (t) {
        return t.target.getTargetElement() === document.activeElement
    }, Hs = y, Zs = function (t) {
        var e = t.originalEvent;
        return 0 == e.button && !(oi && si && e.ctrlKey)
    }, qs = v, Js = function (t) {
        return "pointermove" == t.type
    }, Qs = function (t) {
        return t.type == Jn.SINGLECLICK
    }, $s = function (t) {
        var e = t.originalEvent;
        return !e.altKey && !(e.metaKey || e.ctrlKey) && !e.shiftKey
    }, ta = function (t) {
        var e = t.originalEvent;
        return !e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey
    }, ea = function (t) {
        var e = t.originalEvent.target.tagName;
        return "INPUT" !== e && "SELECT" !== e && "TEXTAREA" !== e
    }, ia = function (t) {
        return Z(t.pointerEvent, 56), "mouse" == t.pointerEvent.pointerType
    }, ra = function (t) {
        var e = t.pointerEvent;
        return e.isPrimary && 0 === e.button
    }, na = L, oa = v, sa = v, aa = L, ha = function (i) {
        function t(t) {
            var e = t || {};
            i.call(this, {handleEvent: e.handleEvent || ua}), this.handleDownEvent_ = e.handleDownEvent ? e.handleDownEvent : sa, this.handleDragEvent_ = e.handleDragEvent ? e.handleDragEvent : na, this.handleMoveEvent_ = e.handleMoveEvent ? e.handleMoveEvent : aa, this.handleUpEvent_ = e.handleUpEvent ? e.handleUpEvent : oa, this.handlingDownUpSequence = !1, this.stopDown = e.stopDown ? e.stopDown : ca, this.trackedPointers_ = {}, this.targetPointers = []
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.updateTrackedPointers_ = function (t) {
            if ((r = t.type) === Jn.POINTERDOWN || r === Jn.POINTERDRAG || r === Jn.POINTERUP) {
                var e = t.pointerEvent, i = e.pointerId.toString();
                t.type == Jn.POINTERUP ? delete this.trackedPointers_[i] : t.type == Jn.POINTERDOWN ? this.trackedPointers_[i] = e : i in this.trackedPointers_ && (this.trackedPointers_[i] = e), this.targetPointers = s(this.trackedPointers_)
            }
            var r
        }, t
    }(ks);

    function la(t) {
        for (var e = t.length, i = 0, r = 0, n = 0; n < e; n++) i += t[n].clientX, r += t[n].clientY;
        return [i / e, r / e]
    }

    function ua(t) {
        if (!(t instanceof Qn)) return !0;
        var e = !1;
        if (this.updateTrackedPointers_(t), this.handlingDownUpSequence) {
            if (t.type == Jn.POINTERDRAG) this.handleDragEvent_(t); else if (t.type == Jn.POINTERUP) {
                var i = this.handleUpEvent_(t);
                this.handlingDownUpSequence = i && 0 < this.targetPointers.length
            }
        } else if (t.type == Jn.POINTERDOWN) {
            var r = this.handleDownEvent_(t);
            r && t.preventDefault(), this.handlingDownUpSequence = r, e = this.stopDown(r)
        } else t.type == Jn.POINTERMOVE && this.handleMoveEvent_(t);
        return !e
    }

    function ca(t) {
        return t
    }

    var pa = function (i) {
        function t(t) {
            i.call(this, {handleDownEvent: _a, handleDragEvent: da, handleUpEvent: fa, stopDown: v});
            var e = t || {};
            this.kinetic_ = e.kinetic, this.lastCentroid = null, this.lastPointersCount_, this.panning_ = !1, this.condition_ = e.condition ? e.condition : $s, this.noKinetic_ = !1
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(ha);

    function da(t) {
        this.panning_ || (this.panning_ = !0, this.getMap().getView().setHint(is.INTERACTING, 1));
        var e = this.targetPointers, i = la(e);
        if (e.length == this.lastPointersCount_) {
            if (this.kinetic_ && this.kinetic_.update(i[0], i[1]), this.lastCentroid) {
                var r = this.lastCentroid[0] - i[0], n = i[1] - this.lastCentroid[1], o = t.map.getView(), s = [r, n];
                dn(s, o.getResolution()), pn(s, o.getRotation()), an(s, o.getCenter()), s = o.constrainCenter(s), o.setCenter(s)
            }
        } else this.kinetic_ && this.kinetic_.begin();
        this.lastCentroid = i, this.lastPointersCount_ = e.length
    }

    function fa(t) {
        var e = t.map, i = e.getView();
        if (0 === this.targetPointers.length) {
            if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
                var r = this.kinetic_.getDistance(), n = this.kinetic_.getAngle(), o = i.getCenter(),
                    s = e.getPixelFromCoordinate(o),
                    a = e.getCoordinateFromPixel([s[0] - r * Math.cos(n), s[1] - r * Math.sin(n)]);
                i.animate({center: i.constrainCenter(a), duration: 500, easing: Bn})
            }
            return this.panning_ && (this.panning_ = !1, i.setHint(is.INTERACTING, -1)), !1
        }
        return this.kinetic_ && this.kinetic_.begin(), !(this.lastCentroid = null)
    }

    function _a(t) {
        if (0 < this.targetPointers.length && this.condition_(t)) {
            var e = t.map.getView();
            return this.lastCentroid = null, e.getAnimating() && e.setCenter(t.frameState.viewState.center), this.kinetic_ && this.kinetic_.begin(), this.noKinetic_ = 1 < this.targetPointers.length, !0
        }
        return !1
    }

    var ga = function (i) {
        function t(t) {
            var e = t || {};
            i.call(this, {
                handleDownEvent: ma,
                handleDragEvent: ya,
                handleUpEvent: va,
                stopDown: v
            }), this.condition_ = e.condition ? e.condition : Ws, this.lastAngle_ = void 0, this.duration_ = void 0 !== e.duration ? e.duration : 250
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(ha);

    function ya(t) {
        if (ia(t)) {
            var e = t.map, i = e.getView();
            if (i.getConstraints().rotation !== ts) {
                var r = e.getSize(), n = t.pixel, o = Math.atan2(r[1] / 2 - n[1], n[0] - r[0] / 2);
                if (void 0 !== this.lastAngle_) {
                    var s = o - this.lastAngle_;
                    js(i, i.getRotation() - s)
                }
                this.lastAngle_ = o
            }
        }
    }

    function va(t) {
        if (!ia(t)) return !0;
        var e = t.map.getView();
        return e.setHint(is.INTERACTING, -1), Ds(e, e.getRotation(), void 0, this.duration_), !1
    }

    function ma(t) {
        return !!ia(t) && (!(!Zs(t) || !this.condition_(t)) && (t.map.getView().setHint(is.INTERACTING, 1), !(this.lastAngle_ = void 0)))
    }

    var xa = function (e) {
        function t(t) {
            e.call(this), this.geometry_ = null, this.element_ = document.createElement("div"), this.element_.style.position = "absolute", this.element_.className = "ol-box " + t, this.map_ = null, this.startPixel_ = null, this.endPixel_ = null
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.disposeInternal = function () {
            this.setMap(null)
        }, t.prototype.render_ = function () {
            var t = this.startPixel_, e = this.endPixel_, i = this.element_.style;
            i.left = Math.min(t[0], e[0]) + "px", i.top = Math.min(t[1], e[1]) + "px", i.width = Math.abs(e[0] - t[0]) + "px", i.height = Math.abs(e[1] - t[1]) + "px"
        }, t.prototype.setMap = function (t) {
            if (this.map_) {
                this.map_.getOverlayContainer().removeChild(this.element_);
                var e = this.element_.style;
                e.left = e.top = e.width = e.height = "inherit"
            }
            this.map_ = t, this.map_ && this.map_.getOverlayContainer().appendChild(this.element_)
        }, t.prototype.setPixels = function (t, e) {
            this.startPixel_ = t, this.endPixel_ = e, this.createOrUpdateGeometry(), this.render_()
        }, t.prototype.createOrUpdateGeometry = function () {
            var t = this.startPixel_, e = this.endPixel_,
                i = [t, [t[0], e[1]], e, [e[0], t[1]]].map(this.map_.getCoordinateFromPixel, this.map_);
            i[4] = i[0].slice(), this.geometry_ ? this.geometry_.setCoordinates([i]) : this.geometry_ = new Qr([i])
        }, t.prototype.getGeometry = function () {
            return this.geometry_
        }, t
    }(t), Sa = {BOXSTART: "boxstart", BOXDRAG: "boxdrag", BOXEND: "boxend"}, Ea = function (r) {
        function t(t, e, i) {
            r.call(this, t), this.coordinate = e, this.mapBrowserEvent = i
        }

        return r && (t.__proto__ = r), (t.prototype = Object.create(r && r.prototype)).constructor = t
    }(m), Ca = function (i) {
        function t(t) {
            i.call(this, {handleDownEvent: Ia, handleDragEvent: wa, handleUpEvent: Ra});
            var e = t || {};
            this.box_ = new xa(e.className || "ol-dragbox"), this.minArea_ = void 0 !== e.minArea ? e.minArea : 64, this.onBoxEnd_ = e.onBoxEnd ? e.onBoxEnd : L, this.startPixel_ = null, this.condition_ = e.condition ? e.condition : Hs, this.boxEndCondition_ = e.boxEndCondition ? e.boxEndCondition : Ta
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.getGeometry = function () {
            return this.box_.getGeometry()
        }, t
    }(ha);

    function Ta(t, e, i) {
        var r = i[0] - e[0], n = i[1] - e[1];
        return r * r + n * n >= this.minArea_
    }

    function wa(t) {
        ia(t) && (this.box_.setPixels(this.startPixel_, t.pixel), this.dispatchEvent(new Ea(Sa.BOXDRAG, t.coordinate, t)))
    }

    function Ra(t) {
        return !ia(t) || (this.box_.setMap(null), this.boxEndCondition_(t, this.startPixel_, t.pixel) && (this.onBoxEnd_(t), this.dispatchEvent(new Ea(Sa.BOXEND, t.coordinate, t))), !1)
    }

    function Ia(t) {
        return !!ia(t) && (!(!Zs(t) || !this.condition_(t)) && (this.startPixel_ = t.pixel, this.box_.setMap(t.map), this.box_.setPixels(this.startPixel_, this.startPixel_), this.dispatchEvent(new Ea(Sa.BOXSTART, t.coordinate, t)), !0))
    }

    var La = function (r) {
        function t(t) {
            var e = t || {}, i = e.condition ? e.condition : ta;
            r.call(this, {
                condition: i,
                className: e.className || "ol-dragzoom",
                onBoxEnd: ba
            }), this.duration_ = void 0 !== e.duration ? e.duration : 200, this.out_ = void 0 !== e.out && e.out
        }

        return r && (t.__proto__ = r), (t.prototype = Object.create(r && r.prototype)).constructor = t
    }(Ca);

    function ba() {
        var t = this.getMap(), e = t.getView(), i = t.getSize(), r = this.getGeometry().getExtent();
        if (this.out_) {
            var n = e.calculateExtent(i), o = W([t.getPixelFromCoordinate(rt(r)), t.getPixelFromCoordinate(ut(r))]);
            dt(n, 1 / e.getResolutionForExtent(o, i)), r = n
        }
        var s = e.constrainResolution(e.getResolutionForExtent(r, i)), a = ot(r);
        a = e.constrainCenter(a), e.animate({resolution: s, center: a, duration: this.duration_, easing: Bn})
    }

    var Fa = {LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40}, Pa = function (i) {
        function t(t) {
            i.call(this, {handleEvent: Ma});
            var e = t || {};
            this.defaultCondition_ = function (t) {
                return $s(t) && ea(t)
            }, this.condition_ = void 0 !== e.condition ? e.condition : this.defaultCondition_, this.duration_ = void 0 !== e.duration ? e.duration : 100, this.pixelDelta_ = void 0 !== e.pixelDelta ? e.pixelDelta : 128
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(ks);

    function Ma(t) {
        var e = !1;
        if (t.type == w.KEYDOWN) {
            var i = t.originalEvent.keyCode;
            if (this.condition_(t) && (i == Fa.DOWN || i == Fa.LEFT || i == Fa.RIGHT || i == Fa.UP)) {
                var r = t.map.getView(), n = r.getResolution() * this.pixelDelta_, o = 0, s = 0;
                i == Fa.DOWN ? s = -n : i == Fa.LEFT ? o = -n : i == Fa.RIGHT ? o = n : s = n;
                var a = [o, s];
                pn(a, r.getRotation()), function (t, e, i) {
                    var r = t.getCenter();
                    if (r) {
                        var n = t.constrainCenter([r[0] + e[0], r[1] + e[1]]);
                        i ? t.animate({duration: i, easing: zn, center: n}) : t.setCenter(n)
                    }
                }(r, a, this.duration_), t.preventDefault(), e = !0
            }
        }
        return !e
    }

    var Oa = function (i) {
        function t(t) {
            i.call(this, {handleEvent: Na});
            var e = t || {};
            this.condition_ = e.condition ? e.condition : ea, this.delta_ = e.delta ? e.delta : 1, this.duration_ = void 0 !== e.duration ? e.duration : 100
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(ks);

    function Na(t) {
        var e = !1;
        if (t.type == w.KEYDOWN || t.type == w.KEYPRESS) {
            var i = t.originalEvent.charCode;
            if (this.condition_(t) && (i == "+".charCodeAt(0) || i == "-".charCodeAt(0))) {
                var r = t.map, n = i == "+".charCodeAt(0) ? this.delta_ : -this.delta_;
                Ys(r.getView(), n, void 0, this.duration_), t.preventDefault(), e = !0
            }
        }
        return !e
    }

    var Aa = {TRACKPAD: "trackpad", WHEEL: "wheel"}, Ga = function (i) {
        function t(t) {
            i.call(this, {handleEvent: ka});
            var e = t || {};
            this.delta_ = 0, this.duration_ = void 0 !== e.duration ? e.duration : 250, this.timeout_ = void 0 !== e.timeout ? e.timeout : 80, this.useAnchor_ = void 0 === e.useAnchor || e.useAnchor, this.constrainResolution_ = e.constrainResolution || !1, this.condition_ = e.condition ? e.condition : Hs, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_ = void 0, this.mode_ = void 0, this.trackpadEventGap_ = 400, this.trackpadTimeoutId_ = void 0, this.trackpadDeltaPerZoom_ = 300, this.trackpadZoomBuffer_ = 1.5
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.decrementInteractingHint_ = function () {
            this.trackpadTimeoutId_ = void 0, this.getMap().getView().setHint(is.INTERACTING, -1)
        }, t.prototype.handleWheelZoom_ = function (t) {
            var e = t.getView();
            e.getAnimating() && e.cancelAnimations();
            Ys(e, -gt(this.delta_, -1, 1), this.lastAnchor_, this.duration_), this.mode_ = void 0, this.delta_ = 0, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_ = void 0
        }, t.prototype.setMouseAnchor = function (t) {
            (this.useAnchor_ = t) || (this.lastAnchor_ = null)
        }, t
    }(ks);

    function ka(t) {
        if (!this.condition_(t)) return !0;
        var e = t.type;
        if (e !== w.WHEEL && e !== w.MOUSEWHEEL) return !0;
        t.preventDefault();
        var i, r = t.map, n = t.originalEvent;
        if (this.useAnchor_ && (this.lastAnchor_ = t.coordinate), t.type == w.WHEEL ? (i = n.deltaY, ri && n.deltaMode === WheelEvent.DOM_DELTA_PIXEL && (i /= ai), n.deltaMode === WheelEvent.DOM_DELTA_LINE && (i *= 40)) : t.type == w.MOUSEWHEEL && (i = -n.wheelDeltaY, ni && (i /= 3)), 0 === i) return !1;
        var o = Date.now();
        if (void 0 === this.startTime_ && (this.startTime_ = o), (!this.mode_ || o - this.startTime_ > this.trackpadEventGap_) && (this.mode_ = Math.abs(i) < 4 ? Aa.TRACKPAD : Aa.WHEEL), this.mode_ === Aa.TRACKPAD) {
            var s = r.getView();
            this.trackpadTimeoutId_ ? clearTimeout(this.trackpadTimeoutId_) : s.setHint(is.INTERACTING, 1), this.trackpadTimeoutId_ = setTimeout(this.decrementInteractingHint_.bind(this), this.trackpadEventGap_);
            var a = s.getResolution() * Math.pow(2, i / this.trackpadDeltaPerZoom_), h = s.getMinResolution(),
                l = s.getMaxResolution(), u = 0;
            if (a < h ? (a = Math.max(a, h / this.trackpadZoomBuffer_), u = 1) : l < a && (a = Math.min(a, l * this.trackpadZoomBuffer_), u = -1), this.lastAnchor_) {
                var c = s.calculateCenterZoom(a, this.lastAnchor_);
                s.setCenter(s.constrainCenter(c))
            }
            return s.setResolution(a), 0 === u && this.constrainResolution_ && s.animate({
                resolution: s.constrainResolution(a, 0 < i ? -1 : 1),
                easing: Bn,
                anchor: this.lastAnchor_,
                duration: this.duration_
            }), 0 < u ? s.animate({
                resolution: h,
                easing: Bn,
                anchor: this.lastAnchor_,
                duration: 500
            }) : u < 0 && s.animate({
                resolution: l,
                easing: Bn,
                anchor: this.lastAnchor_,
                duration: 500
            }), this.startTime_ = o, !1
        }
        this.delta_ += i;
        var p = Math.max(this.timeout_ - (o - this.startTime_), 0);
        return clearTimeout(this.timeoutId_), this.timeoutId_ = setTimeout(this.handleWheelZoom_.bind(this, r), p), !1
    }

    var Da = function (i) {
        function t(t) {
            i.call(this, {handleDownEvent: Ya, handleDragEvent: ja, handleUpEvent: Ua, stopDown: v});
            var e = t || {};
            this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.threshold_ = void 0 !== e.threshold ? e.threshold : .3, this.duration_ = void 0 !== e.duration ? e.duration : 250
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(ha);

    function ja(t) {
        var e = 0, i = this.targetPointers[0], r = this.targetPointers[1],
            n = Math.atan2(r.clientY - i.clientY, r.clientX - i.clientX);
        if (void 0 !== this.lastAngle_) {
            var o = n - this.lastAngle_;
            this.rotationDelta_ += o, !this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_ && (this.rotating_ = !0), e = o
        }
        this.lastAngle_ = n;
        var s = t.map, a = s.getView();
        if (a.getConstraints().rotation !== ts) {
            var h = s.getViewport().getBoundingClientRect(), l = la(this.targetPointers);
            if (l[0] -= h.left, l[1] -= h.top, this.anchor_ = s.getCoordinateFromPixel(l), this.rotating_) {
                var u = a.getRotation();
                s.render(), js(a, u + e, this.anchor_)
            }
        }
    }

    function Ua(t) {
        if (this.targetPointers.length < 2) {
            var e = t.map.getView();
            if (e.setHint(is.INTERACTING, -1), this.rotating_) Ds(e, e.getRotation(), this.anchor_, this.duration_);
            return !1
        }
        return !0
    }

    function Ya(t) {
        if (2 <= this.targetPointers.length) {
            var e = t.map;
            return this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.handlingDownUpSequence || e.getView().setHint(is.INTERACTING, 1), !0
        }
        return !1
    }

    var Ba = function (i) {
        function t(t) {
            i.call(this, {handleDownEvent: Va, handleDragEvent: Xa, handleUpEvent: za, stopDown: v});
            var e = t || {};
            this.constrainResolution_ = e.constrainResolution || !1, this.anchor_ = null, this.duration_ = void 0 !== e.duration ? e.duration : 400, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(ha);

    function Xa(t) {
        var e = 1, i = this.targetPointers[0], r = this.targetPointers[1], n = i.clientX - r.clientX,
            o = i.clientY - r.clientY, s = Math.sqrt(n * n + o * o);
        void 0 !== this.lastDistance_ && (e = this.lastDistance_ / s), this.lastDistance_ = s;
        var a = t.map, h = a.getView(), l = h.getResolution(), u = h.getMaxResolution(), c = h.getMinResolution(),
            p = l * e;
        u < p ? (e = u / l, p = u) : p < c && (e = c / l, p = c), 1 != e && (this.lastScaleDelta_ = e);
        var d = a.getViewport().getBoundingClientRect(), f = la(this.targetPointers);
        f[0] -= d.left, f[1] -= d.top, this.anchor_ = a.getCoordinateFromPixel(f), a.render(), Bs(h, p, this.anchor_)
    }

    function za(t) {
        if (this.targetPointers.length < 2) {
            var e = t.map.getView();
            e.setHint(is.INTERACTING, -1);
            var i = e.getResolution();
            if (this.constrainResolution_ || i < e.getMinResolution() || i > e.getMaxResolution()) {
                var r = this.lastScaleDelta_ - 1;
                Us(e, i, this.anchor_, this.duration_, r)
            }
            return !1
        }
        return !0
    }

    function Va(t) {
        if (2 <= this.targetPointers.length) {
            var e = t.map;
            return this.anchor_ = null, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1, this.handlingDownUpSequence || e.getView().setHint(is.INTERACTING, 1), !0
        }
        return !1
    }

    var Wa = "addfeatures", Ka = function (n) {
        function t(t, e, i, r) {
            n.call(this, t), this.features = i, this.file = e, this.projection = r
        }

        return n && (t.__proto__ = n), (t.prototype = Object.create(n && n.prototype)).constructor = t
    }(m), Ha = function (i) {
        function t(t) {
            var e = t || {};
            i.call(this, {handleEvent: y}), this.formatConstructors_ = e.formatConstructors ? e.formatConstructors : [], this.projection_ = e.projection ? ne(e.projection) : null, this.dropListenKeys_ = null, this.source_ = e.source || null, this.target = e.target ? e.target : null
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.handleResult_ = function (t, e) {
            var i = e.target.result, r = this.getMap(), n = this.projection_;
            n || (n = r.getView().getProjection());
            for (var o = this.formatConstructors_, s = [], a = 0, h = o.length; a < h; ++a) {
                var l = new o[a];
                if ((s = this.tryReadFeatures_(l, i, {featureProjection: n})) && 0 < s.length) break
            }
            this.source_ && (this.source_.clear(), this.source_.addFeatures(s)), this.dispatchEvent(new Ka(Wa, t, s, n))
        }, t.prototype.registerListeners_ = function () {
            var t = this.getMap();
            if (t) {
                var e = this.target ? this.target : t.getViewport();
                this.dropListenKeys_ = [C(e, w.DROP, Za, this), C(e, w.DRAGENTER, qa, this), C(e, w.DRAGOVER, qa, this), C(e, w.DROP, qa, this)]
            }
        }, t.prototype.setActive = function (t) {
            i.prototype.setActive.call(this, t), t ? this.registerListeners_() : this.unregisterListeners_()
        }, t.prototype.setMap = function (t) {
            this.unregisterListeners_(), i.prototype.setMap.call(this, t), this.getActive() && this.registerListeners_()
        }, t.prototype.tryReadFeatures_ = function (t, e, i) {
            try {
                return t.readFeatures(e, i)
            } catch (t) {
                return null
            }
        }, t.prototype.unregisterListeners_ = function () {
            this.dropListenKeys_ && (this.dropListenKeys_.forEach(g), this.dropListenKeys_ = null)
        }, t
    }(ks);

    function Za(t) {
        for (var e = t.dataTransfer.files, i = 0, r = e.length; i < r; ++i) {
            var n = e.item(i), o = new FileReader;
            o.addEventListener(w.LOAD, this.handleResult_.bind(this, n)), o.readAsText(n)
        }
    }

    function qa(t) {
        t.stopPropagation(), t.preventDefault(), t.dataTransfer.dropEffect = "copy"
    }

    var Ja = function (i) {
        function t(t) {
            var e = t || {};
            i.call(this, {
                handleDownEvent: th,
                handleDragEvent: Qa,
                handleUpEvent: $a
            }), this.condition_ = e.condition ? e.condition : ta, this.lastAngle_ = void 0, this.lastMagnitude_ = void 0, this.lastScaleDelta_ = 0, this.duration_ = void 0 !== e.duration ? e.duration : 400
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(ha);

    function Qa(t) {
        if (ia(t)) {
            var e = t.map, i = e.getSize(), r = t.pixel, n = r[0] - i[0] / 2, o = i[1] / 2 - r[1], s = Math.atan2(o, n),
                a = Math.sqrt(n * n + o * o), h = e.getView();
            if (h.getConstraints().rotation !== ts && void 0 !== this.lastAngle_) {
                var l = s - this.lastAngle_;
                js(h, h.getRotation() - l)
            }
            if (this.lastAngle_ = s, void 0 !== this.lastMagnitude_) Bs(h, this.lastMagnitude_ * (h.getResolution() / a));
            void 0 !== this.lastMagnitude_ && (this.lastScaleDelta_ = this.lastMagnitude_ / a), this.lastMagnitude_ = a
        }
    }

    function $a(t) {
        if (!ia(t)) return !0;
        var e = t.map.getView();
        e.setHint(is.INTERACTING, -1);
        var i = this.lastScaleDelta_ - 1;
        return Ds(e, e.getRotation()), Us(e, e.getResolution(), void 0, this.duration_, i), this.lastScaleDelta_ = 0, !1
    }

    function th(t) {
        return !!ia(t) && (!!this.condition_(t) && (t.map.getView().setHint(is.INTERACTING, 1), this.lastAngle_ = void 0, !(this.lastMagnitude_ = void 0)))
    }

    var eh = function (n) {
        function t(t, e, i) {
            if (n.call(this), void 0 !== i && void 0 === e) this.setFlatCoordinates(i, t); else {
                var r = e || 0;
                this.setCenterAndRadius(t, r, i)
            }
        }

        return n && (t.__proto__ = n), ((t.prototype = Object.create(n && n.prototype)).constructor = t).prototype.clone = function () {
            return new t(this.flatCoordinates.slice(), void 0, this.layout)
        }, t.prototype.closestPointXY = function (t, e, i, r) {
            var n = this.flatCoordinates, o = t - n[0], s = e - n[1], a = o * o + s * s;
            if (a < r) {
                if (0 === a) for (var h = 0; h < this.stride; ++h) i[h] = n[h]; else {
                    var l = this.getRadius() / Math.sqrt(a);
                    i[0] = n[0] + l * o, i[1] = n[1] + l * s;
                    for (var u = 2; u < this.stride; ++u) i[u] = n[u]
                }
                return i.length = this.stride, a
            }
            return r
        }, t.prototype.containsXY = function (t, e) {
            var i = this.flatCoordinates, r = t - i[0], n = e - i[1];
            return r * r + n * n <= this.getRadiusSquared_()
        }, t.prototype.getCenter = function () {
            return this.flatCoordinates.slice(0, this.stride)
        }, t.prototype.computeExtent = function (t) {
            var e = this.flatCoordinates, i = e[this.stride] - e[0];
            return X(e[0] - i, e[1] - i, e[0] + i, e[1] + i, t)
        }, t.prototype.getRadius = function () {
            return Math.sqrt(this.getRadiusSquared_())
        }, t.prototype.getRadiusSquared_ = function () {
            var t = this.flatCoordinates[this.stride] - this.flatCoordinates[0],
                e = this.flatCoordinates[this.stride + 1] - this.flatCoordinates[1];
            return t * t + e * e
        }, t.prototype.getType = function () {
            return Lt.CIRCLE
        }, t.prototype.intersectsExtent = function (t) {
            if (wt(t, this.getExtent())) {
                var e = this.getCenter();
                return t[0] <= e[0] && t[2] >= e[0] || (t[1] <= e[1] && t[3] >= e[1] || et(t, this.intersectsCoordinate, this))
            }
            return !1
        }, t.prototype.setCenter = function (t) {
            var e = this.stride, i = this.flatCoordinates[e] - this.flatCoordinates[0], r = t.slice();
            r[e] = r[0] + i;
            for (var n = 1; n < e; ++n) r[e + n] = t[n];
            this.setFlatCoordinates(this.layout, r), this.changed()
        }, t.prototype.setCenterAndRadius = function (t, e, i) {
            this.setLayout(i, t, 0), this.flatCoordinates || (this.flatCoordinates = []);
            var r = this.flatCoordinates, n = Ir(r, 0, t, this.stride);
            r[n++] = r[0] + e;
            for (var o = 1, s = this.stride; o < s; ++o) r[n++] = r[o];
            r.length = n, this.changed()
        }, t.prototype.getCoordinates = function () {
        }, t.prototype.setCoordinates = function (t, e) {
        }, t.prototype.setRadius = function (t) {
            this.flatCoordinates[this.stride] = this.flatCoordinates[0] + t, this.changed()
        }, t
    }(vr);
    eh.prototype.transform;
    var ih = function (l) {
        function r(t, e, i) {
            if (l.call(this), this.ends_ = [], this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, Array.isArray(t[0])) this.setCoordinates(t, e); else if (void 0 !== e && i) this.setFlatCoordinates(e, t), this.ends_ = i; else {
                for (var r = this.getLayout(), n = [], o = [], s = 0, a = t.length; s < a; ++s) {
                    var h = t[s];
                    0 === s && (r = h.getLayout()), pr(n, h.getFlatCoordinates()), o.push(n.length)
                }
                this.setFlatCoordinates(r, n), this.ends_ = o
            }
        }

        return l && (r.__proto__ = l), ((r.prototype = Object.create(l && l.prototype)).constructor = r).prototype.appendLineString = function (t) {
            this.flatCoordinates ? pr(this.flatCoordinates, t.getFlatCoordinates().slice()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed()
        }, r.prototype.clone = function () {
            return new r(this.flatCoordinates.slice(), this.layout, this.ends_.slice())
        }, r.prototype.closestPointXY = function (t, e, i, r) {
            return r < D(this.getExtent(), t, e) ? r : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(Tr(this.flatCoordinates, 0, this.ends_, this.stride, 0)), this.maxDeltaRevision_ = this.getRevision()), Rr(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, !1, t, e, i, r))
        }, r.prototype.getCoordinateAtM = function (t, e, i) {
            if (this.layout != yr.XYM && this.layout != yr.XYZM || 0 === this.flatCoordinates.length) return null;
            var r = void 0 !== e && e, n = void 0 !== i && i;
            return function (t, e, i, r, n, o, s) {
                if (s) return mn(t, e, i[i.length - 1], r, n, o);
                var a;
                if (n < t[r - 1]) return o ? ((a = t.slice(0, r))[r - 1] = n, a) : null;
                if (t[t.length - 1] < n) return o ? ((a = t.slice(t.length - r))[r - 1] = n, a) : null;
                for (var h = 0, l = i.length; h < l; ++h) {
                    var u = i[h];
                    if (e != u) {
                        if (n < t[e + r - 1]) return null;
                        if (n <= t[u - 1]) return mn(t, e, u, r, n, !1);
                        e = u
                    }
                }
                return null
            }(this.flatCoordinates, 0, this.ends_, this.stride, t, r, n)
        }, r.prototype.getCoordinates = function () {
            return Pr(this.flatCoordinates, 0, this.ends_, this.stride)
        }, r.prototype.getEnds = function () {
            return this.ends_
        }, r.prototype.getLineString = function (t) {
            return t < 0 || this.ends_.length <= t ? null : new Sn(this.flatCoordinates.slice(0 === t ? 0 : this.ends_[t - 1], this.ends_[t]), this.layout)
        }, r.prototype.getLineStrings = function () {
            for (var t = this.flatCoordinates, e = this.ends_, i = this.layout, r = [], n = 0, o = 0, s = e.length; o < s; ++o) {
                var a = e[o], h = new Sn(t.slice(n, a), i);
                r.push(h), n = a
            }
            return r
        }, r.prototype.getFlatMidpoints = function () {
            for (var t = [], e = this.flatCoordinates, i = 0, r = this.ends_, n = this.stride, o = 0, s = r.length; o < s; ++o) {
                var a = r[o];
                pr(t, vn(e, i, a, n, .5)), i = a
            }
            return t
        }, r.prototype.getSimplifiedGeometryInternal = function (t) {
            var e = [], i = [];
            return e.length = function (t, e, i, r, n, o, s, a) {
                for (var h = 0, l = i.length; h < l; ++h) {
                    var u = i[h];
                    s = Or(t, e, u, r, n, o, s), a.push(s), e = u
                }
                return s
            }(this.flatCoordinates, 0, this.ends_, this.stride, t, e, 0, i), new r(e, yr.XY, i)
        }, r.prototype.getType = function () {
            return Lt.MULTI_LINE_STRING
        }, r.prototype.intersectsExtent = function (t) {
            return function (t, e, i, r, n) {
                for (var o = 0, s = i.length; o < s; ++o) {
                    if (Vr(t, e, i[o], r, n)) return !0;
                    e = i[o]
                }
                return !1
            }(this.flatCoordinates, 0, this.ends_, this.stride, t)
        }, r.prototype.setCoordinates = function (t, e) {
            this.setLayout(e, t, 2), this.flatCoordinates || (this.flatCoordinates = []);
            var i = br(this.flatCoordinates, 0, t, this.stride, this.ends_);
            this.flatCoordinates.length = 0 === i.length ? 0 : i[i.length - 1], this.changed()
        }, r
    }(vr), rh = function (i) {
        function t(t, e) {
            i.call(this), e && !Array.isArray(t[0]) ? this.setFlatCoordinates(e, t) : this.setCoordinates(t, e)
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.appendPoint = function (t) {
            this.flatCoordinates ? pr(this.flatCoordinates, t.getFlatCoordinates()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.changed()
        }, t.prototype.clone = function () {
            return new t(this.flatCoordinates.slice(), this.layout)
        }, t.prototype.closestPointXY = function (t, e, i, r) {
            if (r < D(this.getExtent(), t, e)) return r;
            for (var n = this.flatCoordinates, o = this.stride, s = 0, a = n.length; s < a; s += o) {
                var h = mt(t, e, n[s], n[s + 1]);
                if (h < r) {
                    r = h;
                    for (var l = 0; l < o; ++l) i[l] = n[s + l];
                    i.length = o
                }
            }
            return r
        }, t.prototype.getCoordinates = function () {
            return Fr(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride)
        }, t.prototype.getPoint = function (t) {
            var e = this.flatCoordinates ? this.flatCoordinates.length / this.stride : 0;
            return t < 0 || e <= t ? null : new Dr(this.flatCoordinates.slice(t * this.stride, (t + 1) * this.stride), this.layout)
        }, t.prototype.getPoints = function () {
            for (var t = this.flatCoordinates, e = this.layout, i = this.stride, r = [], n = 0, o = t.length; n < o; n += i) {
                var s = new Dr(t.slice(n, n + i), e);
                r.push(s)
            }
            return r
        }, t.prototype.getType = function () {
            return Lt.MULTI_POINT
        }, t.prototype.intersectsExtent = function (t) {
            for (var e = this.flatCoordinates, i = this.stride, r = 0, n = e.length; r < n; r += i) {
                if (U(t, e[r], e[r + 1])) return !0
            }
            return !1
        }, t.prototype.setCoordinates = function (t, e) {
            this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Lr(this.flatCoordinates, 0, t, this.stride), this.changed()
        }, t
    }(vr);

    function nh(t, e, i, r) {
        for (var n = [], o = [1 / 0, 1 / 0, -1 / 0, -1 / 0], s = 0, a = i.length; s < a; ++s) {
            var h = i[s];
            o = K(t, e, h[0], r), n.push((o[0] + o[2]) / 2, (o[1] + o[3]) / 2), e = h[h.length - 1]
        }
        return n
    }

    var oh = function (d) {
            function r(t, e, i) {
                if (d.call(this), this.endss_ = [], this.flatInteriorPointsRevision_ = -1, this.flatInteriorPoints_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, !i && !Array.isArray(t[0])) {
                    for (var r = this.getLayout(), n = [], o = [], s = 0, a = t.length; s < a; ++s) {
                        var h = t[s];
                        0 === s && (r = h.getLayout());
                        for (var l = n.length, u = h.getEnds(), c = 0, p = u.length; c < p; ++c) u[c] += l;
                        pr(n, h.getFlatCoordinates()), o.push(u)
                    }
                    e = r, t = n, i = o
                }
                void 0 !== e && i ? (this.setFlatCoordinates(e, t), this.endss_ = i) : this.setCoordinates(t, e)
            }

            return d && (r.__proto__ = d), ((r.prototype = Object.create(d && d.prototype)).constructor = r).prototype.appendPolygon = function (t) {
                var e;
                if (this.flatCoordinates) {
                    var i = this.flatCoordinates.length;
                    pr(this.flatCoordinates, t.getFlatCoordinates());
                    for (var r = 0, n = (e = t.getEnds().slice()).length; r < n; ++r) e[r] += i
                } else this.flatCoordinates = t.getFlatCoordinates().slice(), e = t.getEnds().slice(), this.endss_.push();
                this.endss_.push(e), this.changed()
            }, r.prototype.clone = function () {
                for (var t = this.endss_.length, e = new Array(t), i = 0; i < t; ++i) e[i] = this.endss_[i].slice();
                return new r(this.flatCoordinates.slice(), this.layout, e)
            }, r.prototype.closestPointXY = function (t, e, i, r) {
                return r < D(this.getExtent(), t, e) ? r : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(function (t, e, i, r, n) {
                    for (var o = 0, s = i.length; o < s; ++o) {
                        var a = i[o];
                        n = Tr(t, e, a, r, n), e = a[a.length - 1]
                    }
                    return n
                }(this.flatCoordinates, 0, this.endss_, this.stride, 0)), this.maxDeltaRevision_ = this.getRevision()), function (t, e, i, r, n, o, s, a, h, l, u) {
                    for (var c = u || [NaN, NaN], p = 0, d = i.length; p < d; ++p) {
                        var f = i[p];
                        l = Rr(t, e, f, r, n, o, s, a, h, l, c), e = f[f.length - 1]
                    }
                    return l
                }(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, this.maxDelta_, !0, t, e, i, r))
            }, r.prototype.containsXY = function (t, e) {
                return function (t, e, i, r, n, o) {
                    if (0 === i.length) return !1;
                    for (var s = 0, a = i.length; s < a; ++s) {
                        var h = i[s];
                        if (Yr(t, e, h, r, n, o)) return !0;
                        e = h[h.length - 1]
                    }
                    return !1
                }(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, t, e)
            }, r.prototype.getArea = function () {
                return function (t, e, i, r) {
                    for (var n = 0, o = 0, s = i.length; o < s; ++o) {
                        var a = i[o];
                        n += Sr(t, e, a, r), e = a[a.length - 1]
                    }
                    return n
                }(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride)
            }, r.prototype.getCoordinates = function (t) {
                var e;
                return void 0 !== t ? Jr(e = this.getOrientedFlatCoordinates().slice(), 0, this.endss_, this.stride, t) : e = this.flatCoordinates, Mr(e, 0, this.endss_, this.stride)
            }, r.prototype.getEndss = function () {
                return this.endss_
            }, r.prototype.getFlatInteriorPoints = function () {
                if (this.flatInteriorPointsRevision_ != this.getRevision()) {
                    var t = nh(this.flatCoordinates, 0, this.endss_, this.stride);
                    this.flatInteriorPoints_ = Xr(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, t), this.flatInteriorPointsRevision_ = this.getRevision()
                }
                return this.flatInteriorPoints_
            }, r.prototype.getInteriorPoints = function () {
                return new rh(this.getFlatInteriorPoints().slice(), yr.XYM)
            }, r.prototype.getOrientedFlatCoordinates = function () {
                if (this.orientedRevision_ != this.getRevision()) {
                    var t = this.flatCoordinates;
                    !function (t, e, i, r, n) {
                        for (var o = 0, s = i.length; o < s; ++o) if (!Zr(t, e, i[o], r, n)) return !1;
                        return !0
                    }(t, 0, this.endss_, this.stride) ? (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = Jr(this.orientedFlatCoordinates_, 0, this.endss_, this.stride)) : this.orientedFlatCoordinates_ = t, this.orientedRevision_ = this.getRevision()
                }
                return this.orientedFlatCoordinates_
            }, r.prototype.getSimplifiedGeometryInternal = function (t) {
                var e = [], i = [];
                return e.length = function (t, e, i, r, n, o, s, a) {
                    for (var h = 0, l = i.length; h < l; ++h) {
                        var u = i[h], c = [];
                        s = Gr(t, e, u, r, n, o, s, c), a.push(c), e = u[u.length - 1]
                    }
                    return s
                }(this.flatCoordinates, 0, this.endss_, this.stride, Math.sqrt(t), e, 0, i), new r(e, yr.XY, i)
            }, r.prototype.getPolygon = function (t) {
                if (t < 0 || this.endss_.length <= t) return null;
                var e;
                if (0 === t) e = 0; else {
                    var i = this.endss_[t - 1];
                    e = i[i.length - 1]
                }
                var r = this.endss_[t].slice(), n = r[r.length - 1];
                if (0 !== e) for (var o = 0, s = r.length; o < s; ++o) r[o] -= e;
                return new Qr(this.flatCoordinates.slice(e, n), this.layout, r)
            }, r.prototype.getPolygons = function () {
                for (var t = this.layout, e = this.flatCoordinates, i = this.endss_, r = [], n = 0, o = 0, s = i.length; o < s; ++o) {
                    var a = i[o].slice(), h = a[a.length - 1];
                    if (0 !== n) for (var l = 0, u = a.length; l < u; ++l) a[l] -= n;
                    var c = new Qr(e.slice(n, h), t, a);
                    r.push(c), n = h
                }
                return r
            }, r.prototype.getType = function () {
                return Lt.MULTI_POLYGON
            }, r.prototype.intersectsExtent = function (t) {
                return function (t, e, i, r, n) {
                    for (var o = 0, s = i.length; o < s; ++o) {
                        var a = i[o];
                        if (Wr(t, e, a, r, n)) return !0;
                        e = a[a.length - 1]
                    }
                    return !1
                }(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, t)
            }, r.prototype.setCoordinates = function (t, e) {
                this.setLayout(e, t, 3), this.flatCoordinates || (this.flatCoordinates = []);
                var i = function (t, e, i, r, n) {
                    for (var o = n || [], s = 0, a = 0, h = i.length; a < h; ++a) {
                        var l = br(t, e, i[a], r, o[s]);
                        e = (o[s++] = l)[l.length - 1]
                    }
                    return o.length = s, o
                }(this.flatCoordinates, 0, t, this.stride, this.endss_);
                if (0 === i.length) this.flatCoordinates.length = 0; else {
                    var r = i[i.length - 1];
                    this.flatCoordinates.length = 0 === r.length ? 0 : r[r.length - 1]
                }
                this.changed()
            }, r
        }(vr), sh = {IMAGE: "IMAGE", TILE: "TILE", VECTOR_TILE: "VECTOR_TILE", VECTOR: "VECTOR"}, ah = "image",
        hh = "vector", lh = "renderOrder", uh = function (r) {
            function t(t) {
                var e = t || {}, i = E({}, e);
                delete i.style, delete i.renderBuffer, delete i.updateWhileAnimating, delete i.updateWhileInteracting, r.call(this, i), this.declutter_ = void 0 !== e.declutter && e.declutter, this.renderBuffer_ = void 0 !== e.renderBuffer ? e.renderBuffer : 100, this.style_ = null, this.styleFunction_ = void 0, this.setStyle(e.style), this.updateWhileAnimating_ = void 0 !== e.updateWhileAnimating && e.updateWhileAnimating, this.updateWhileInteracting_ = void 0 !== e.updateWhileInteracting && e.updateWhileInteracting, this.renderMode_ = e.renderMode || hh, this.type = sh.VECTOR
            }

            return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype.getDeclutter = function () {
                return this.declutter_
            }, t.prototype.setDeclutter = function (t) {
                this.declutter_ = t
            }, t.prototype.getRenderBuffer = function () {
                return this.renderBuffer_
            }, t.prototype.getRenderOrder = function () {
                return this.get(lh)
            }, t.prototype.getStyle = function () {
                return this.style_
            }, t.prototype.getStyleFunction = function () {
                return this.styleFunction_
            }, t.prototype.getUpdateWhileAnimating = function () {
                return this.updateWhileAnimating_
            }, t.prototype.getUpdateWhileInteracting = function () {
                return this.updateWhileInteracting_
            }, t.prototype.setRenderOrder = function (t) {
                this.set(lh, t)
            }, t.prototype.setStyle = function (t) {
                var e, i, r;
                this.style_ = void 0 !== t ? t : Hi, this.styleFunction_ = null === t ? void 0 : ("function" == typeof (e = this.style_) ? i = e : (Array.isArray(e) ? r = e : (Z(e instanceof Wi, 41), r = [e]), i = function () {
                    return r
                }), i), this.changed()
            }, t.prototype.getRenderMode = function () {
                return this.renderMode_
            }, t
        }(Ls);
    uh.prototype.getSource;
    var ch = {ARRAY_BUFFER: "arraybuffer", JSON: "json", TEXT: "text", XML: "xml"};

    function ph(i, o, s, a) {
        return function (t, e, r) {
            var n = new XMLHttpRequest;
            n.open("GET", "function" == typeof i ? i(t, e, r) : i, !0), o.getType() == ch.ARRAY_BUFFER && (n.responseType = "arraybuffer"), n.onload = function (t) {
                if (!n.status || 200 <= n.status && n.status < 300) {
                    var e, i = o.getType();
                    i == ch.JSON || i == ch.TEXT ? e = n.responseText : i == ch.XML ? (e = n.responseXML) || (e = (new DOMParser).parseFromString(n.responseText, "application/xml")) : i == ch.ARRAY_BUFFER && (e = n.response), e ? s.call(this, o.readFeatures(e, {featureProjection: r}), o.readProjection(e), o.getLastExtent()) : a.call(this)
                } else a.call(this)
            }.bind(this), n.onerror = function () {
                a.call(this)
            }.bind(this), n.send()
        }
    }

    function dh(t, e) {
        return ph(t, e, function (t, e) {
            this.addFeatures(t)
        }, L)
    }

    function fh(t, e) {
        return [[-1 / 0, -1 / 0, 1 / 0, 1 / 0]]
    }

    var _h = function (e) {
        function t(t) {
            e.call(this), this.projection_ = ne(t.projection), this.attributions_ = this.adaptAttributions_(t.attributions), this.loading = !1, this.state_ = void 0 !== t.state ? t.state : ms, this.wrapX_ = void 0 !== t.wrapX && t.wrapX
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.adaptAttributions_ = function (e) {
            return e ? Array.isArray(e) ? function (t) {
                return e
            } : "function" == typeof e ? e : function (t) {
                return [e]
            } : null
        }, t.prototype.getAttributions = function () {
            return this.attributions_
        }, t.prototype.getProjection = function () {
            return this.projection_
        }, t.prototype.getResolutions = function () {
        }, t.prototype.getState = function () {
            return this.state_
        }, t.prototype.getWrapX = function () {
            return this.wrapX_
        }, t.prototype.refresh = function () {
            this.changed()
        }, t.prototype.setAttributions = function (t) {
            this.attributions_ = this.adaptAttributions_(t), this.changed()
        }, t.prototype.setState = function (t) {
            this.state_ = t, this.changed()
        }, t
    }(R);
    _h.prototype.forEachFeatureAtCoordinate = L;
    var gh = "addfeature", yh = "changefeature", vh = "clear", mh = "removefeature";
    "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
    var xh, Sh = (function (t, e) {
        t.exports = function () {
            function g(t, e, i) {
                var r = t[e];
                t[e] = t[i], t[i] = r
            }

            function o(t, e) {
                return t < e ? -1 : e < t ? 1 : 0
            }

            return function (t, e, i, r, n) {
                !function t(e, i, r, n, o) {
                    for (; r < n;) {
                        if (600 < n - r) {
                            var s = n - r + 1, a = i - r + 1, h = Math.log(s), l = .5 * Math.exp(2 * h / 3),
                                u = .5 * Math.sqrt(h * l * (s - l) / s) * (a - s / 2 < 0 ? -1 : 1),
                                c = Math.max(r, Math.floor(i - a * l / s + u)),
                                p = Math.min(n, Math.floor(i + (s - a) * l / s + u));
                            t(e, i, c, p, o)
                        }
                        var d = e[i], f = r, _ = n;
                        for (g(e, r, i), 0 < o(e[n], d) && g(e, r, n); f < _;) {
                            for (g(e, f, _), f++, _--; o(e[f], d) < 0;) f++;
                            for (; 0 < o(e[_], d);) _--
                        }
                        0 === o(e[r], d) ? g(e, r, _) : g(e, ++_, n), _ <= i && (r = _ + 1), i <= _ && (n = _ - 1)
                    }
                }(t, e, i || 0, r || t.length - 1, n || o)
            }
        }()
    }(xh = {exports: {}}, xh.exports), xh.exports), Eh = Th, Ch = Th;

    function Th(t, e) {
        if (!(this instanceof Th)) return new Th(t, e);
        this._maxEntries = Math.max(4, t || 9), this._minEntries = Math.max(2, Math.ceil(.4 * this._maxEntries)), e && this._initFormat(e), this.clear()
    }

    function wh(t, e, i) {
        if (!i) return e.indexOf(t);
        for (var r = 0; r < e.length; r++) if (i(t, e[r])) return r;
        return -1
    }

    function Rh(t, e) {
        Ih(t, 0, t.children.length, e, t)
    }

    function Ih(t, e, i, r, n) {
        n || (n = Ah(null)), n.minX = 1 / 0, n.minY = 1 / 0, n.maxX = -1 / 0, n.maxY = -1 / 0;
        for (var o, s = e; s < i; s++) o = t.children[s], Lh(n, t.leaf ? r(o) : o);
        return n
    }

    function Lh(t, e) {
        return t.minX = Math.min(t.minX, e.minX), t.minY = Math.min(t.minY, e.minY), t.maxX = Math.max(t.maxX, e.maxX), t.maxY = Math.max(t.maxY, e.maxY), t
    }

    function bh(t, e) {
        return t.minX - e.minX
    }

    function Fh(t, e) {
        return t.minY - e.minY
    }

    function Ph(t) {
        return (t.maxX - t.minX) * (t.maxY - t.minY)
    }

    function Mh(t) {
        return t.maxX - t.minX + (t.maxY - t.minY)
    }

    function Oh(t, e) {
        return t.minX <= e.minX && t.minY <= e.minY && e.maxX <= t.maxX && e.maxY <= t.maxY
    }

    function Nh(t, e) {
        return e.minX <= t.maxX && e.minY <= t.maxY && e.maxX >= t.minX && e.maxY >= t.minY
    }

    function Ah(t) {
        return {children: t, height: 1, leaf: !0, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0}
    }

    function Gh(t, e, i, r, n) {
        for (var o, s = [e, i]; s.length;) (i = s.pop()) - (e = s.pop()) <= r || (o = e + Math.ceil((i - e) / r / 2) * r, Sh(t, o, e, i, n), s.push(e, o, o, i))
    }

    Th.prototype = {
        all: function () {
            return this._all(this.data, [])
        }, search: function (t) {
            var e = this.data, i = [], r = this.toBBox;
            if (!Nh(t, e)) return i;
            for (var n, o, s, a, h = []; e;) {
                for (n = 0, o = e.children.length; n < o; n++) s = e.children[n], Nh(t, a = e.leaf ? r(s) : s) && (e.leaf ? i.push(s) : Oh(t, a) ? this._all(s, i) : h.push(s));
                e = h.pop()
            }
            return i
        }, collides: function (t) {
            var e = this.data, i = this.toBBox;
            if (!Nh(t, e)) return !1;
            for (var r, n, o, s, a = []; e;) {
                for (r = 0, n = e.children.length; r < n; r++) if (o = e.children[r], Nh(t, s = e.leaf ? i(o) : o)) {
                    if (e.leaf || Oh(t, s)) return !0;
                    a.push(o)
                }
                e = a.pop()
            }
            return !1
        }, load: function (t) {
            if (!t || !t.length) return this;
            if (t.length < this._minEntries) {
                for (var e = 0, i = t.length; e < i; e++) this.insert(t[e]);
                return this
            }
            var r = this._build(t.slice(), 0, t.length - 1, 0);
            if (this.data.children.length) if (this.data.height === r.height) this._splitRoot(this.data, r); else {
                if (this.data.height < r.height) {
                    var n = this.data;
                    this.data = r, r = n
                }
                this._insert(r, this.data.height - r.height - 1, !0)
            } else this.data = r;
            return this
        }, insert: function (t) {
            return t && this._insert(t, this.data.height - 1), this
        }, clear: function () {
            return this.data = Ah([]), this
        }, remove: function (t, e) {
            if (!t) return this;
            for (var i, r, n, o, s = this.data, a = this.toBBox(t), h = [], l = []; s || h.length;) {
                if (s || (s = h.pop(), r = h[h.length - 1], i = l.pop(), o = !0), s.leaf && -1 !== (n = wh(t, s.children, e))) return s.children.splice(n, 1), h.push(s), this._condense(h), this;
                o || s.leaf || !Oh(s, a) ? r ? (i++, s = r.children[i], o = !1) : s = null : (h.push(s), l.push(i), i = 0, s = (r = s).children[0])
            }
            return this
        }, toBBox: function (t) {
            return t
        }, compareMinX: bh, compareMinY: Fh, toJSON: function () {
            return this.data
        }, fromJSON: function (t) {
            return this.data = t, this
        }, _all: function (t, e) {
            for (var i = []; t;) t.leaf ? e.push.apply(e, t.children) : i.push.apply(i, t.children), t = i.pop();
            return e
        }, _build: function (t, e, i, r) {
            var n, o = i - e + 1, s = this._maxEntries;
            if (o <= s) return Rh(n = Ah(t.slice(e, i + 1)), this.toBBox), n;
            r || (r = Math.ceil(Math.log(o) / Math.log(s)), s = Math.ceil(o / Math.pow(s, r - 1))), (n = Ah([])).leaf = !1, n.height = r;
            var a, h, l, u, c = Math.ceil(o / s), p = c * Math.ceil(Math.sqrt(s));
            for (Gh(t, e, i, p, this.compareMinX), a = e; a <= i; a += p) for (Gh(t, a, l = Math.min(a + p - 1, i), c, this.compareMinY), h = a; h <= l; h += c) u = Math.min(h + c - 1, l), n.children.push(this._build(t, h, u, r - 1));
            return Rh(n, this.toBBox), n
        }, _chooseSubtree: function (t, e, i, r) {
            for (var n, o, s, a, h, l, u, c, p, d; r.push(e), !e.leaf && r.length - 1 !== i;) {
                for (u = c = 1 / 0, n = 0, o = e.children.length; n < o; n++) h = Ph(s = e.children[n]), p = t, d = s, (l = (Math.max(d.maxX, p.maxX) - Math.min(d.minX, p.minX)) * (Math.max(d.maxY, p.maxY) - Math.min(d.minY, p.minY)) - h) < c ? (c = l, u = h < u ? h : u, a = s) : l === c && h < u && (u = h, a = s);
                e = a || e.children[0]
            }
            return e
        }, _insert: function (t, e, i) {
            var r = this.toBBox, n = i ? t : r(t), o = [], s = this._chooseSubtree(n, this.data, e, o);
            for (s.children.push(t), Lh(s, n); 0 <= e && o[e].children.length > this._maxEntries;) this._split(o, e), e--;
            this._adjustParentBBoxes(n, o, e)
        }, _split: function (t, e) {
            var i = t[e], r = i.children.length, n = this._minEntries;
            this._chooseSplitAxis(i, n, r);
            var o = this._chooseSplitIndex(i, n, r), s = Ah(i.children.splice(o, i.children.length - o));
            s.height = i.height, s.leaf = i.leaf, Rh(i, this.toBBox), Rh(s, this.toBBox), e ? t[e - 1].children.push(s) : this._splitRoot(i, s)
        }, _splitRoot: function (t, e) {
            this.data = Ah([t, e]), this.data.height = t.height + 1, this.data.leaf = !1, Rh(this.data, this.toBBox)
        }, _chooseSplitIndex: function (t, e, i) {
            var r, n, o, s, a, h, l, u, c, p, d, f, _, g;
            for (h = l = 1 / 0, r = e; r <= i - e; r++) n = Ih(t, 0, r, this.toBBox), o = Ih(t, r, i, this.toBBox), c = n, p = o, void 0, d = Math.max(c.minX, p.minX), f = Math.max(c.minY, p.minY), _ = Math.min(c.maxX, p.maxX), g = Math.min(c.maxY, p.maxY), s = Math.max(0, _ - d) * Math.max(0, g - f), a = Ph(n) + Ph(o), s < h ? (h = s, u = r, l = a < l ? a : l) : s === h && a < l && (l = a, u = r);
            return u
        }, _chooseSplitAxis: function (t, e, i) {
            var r = t.leaf ? this.compareMinX : bh, n = t.leaf ? this.compareMinY : Fh;
            this._allDistMargin(t, e, i, r) < this._allDistMargin(t, e, i, n) && t.children.sort(r)
        }, _allDistMargin: function (t, e, i, r) {
            t.children.sort(r);
            var n, o, s = this.toBBox, a = Ih(t, 0, e, s), h = Ih(t, i - e, i, s), l = Mh(a) + Mh(h);
            for (n = e; n < i - e; n++) o = t.children[n], Lh(a, t.leaf ? s(o) : o), l += Mh(a);
            for (n = i - e - 1; e <= n; n--) o = t.children[n], Lh(h, t.leaf ? s(o) : o), l += Mh(h);
            return l
        }, _adjustParentBBoxes: function (t, e, i) {
            for (var r = i; 0 <= r; r--) Lh(e[r], t)
        }, _condense: function (t) {
            for (var e, i = t.length - 1; 0 <= i; i--) 0 === t[i].children.length ? 0 < i ? (e = t[i - 1].children).splice(e.indexOf(t[i]), 1) : this.clear() : Rh(t[i], this.toBBox)
        }, _initFormat: function (t) {
            var e = ["return a", " - b", ";"];
            this.compareMinX = new Function("a", "b", e.join(t[0])), this.compareMinY = new Function("a", "b", e.join(t[1])), this.toBBox = new Function("a", "return {minX: a" + t[0] + ", minY: a" + t[1] + ", maxX: a" + t[2] + ", maxY: a" + t[3] + "};")
        }
    }, Eh.default = Ch;
    var kh = function (t) {
        this.rbush_ = Eh(t, void 0), this.items_ = {}
    };
    kh.prototype.insert = function (t, e) {
        var i = {minX: t[0], minY: t[1], maxX: t[2], maxY: t[3], value: e};
        this.rbush_.insert(i), this.items_[Ct(e)] = i
    }, kh.prototype.load = function (t, e) {
        for (var i = new Array(e.length), r = 0, n = e.length; r < n; r++) {
            var o = t[r], s = e[r], a = {minX: o[0], minY: o[1], maxX: o[2], maxY: o[3], value: s};
            i[r] = a, this.items_[Ct(s)] = a
        }
        this.rbush_.load(i)
    }, kh.prototype.remove = function (t) {
        var e = Ct(t), i = this.items_[e];
        return delete this.items_[e], null !== this.rbush_.remove(i)
    }, kh.prototype.update = function (t, e) {
        var i = this.items_[Ct(e)];
        $([i.minX, i.minY, i.maxX, i.maxY], t) || (this.remove(e), this.insert(t, e))
    }, kh.prototype.getAll = function () {
        return this.rbush_.all().map(function (t) {
            return t.value
        })
    }, kh.prototype.getInExtent = function (t) {
        var e = {minX: t[0], minY: t[1], maxX: t[2], maxY: t[3]};
        return this.rbush_.search(e).map(function (t) {
            return t.value
        })
    }, kh.prototype.forEach = function (t, e) {
        return this.forEach_(this.getAll(), t, e)
    }, kh.prototype.forEachInExtent = function (t, e, i) {
        return this.forEach_(this.getInExtent(t), e, i)
    }, kh.prototype.forEach_ = function (t, e, i) {
        for (var r, n = 0, o = t.length; n < o; n++) if (r = e.call(i, t[n])) return r;
        return r
    }, kh.prototype.isEmpty = function () {
        return Tt(this.items_)
    }, kh.prototype.clear = function () {
        this.rbush_.clear(), this.items_ = {}
    }, kh.prototype.getExtent = function (t) {
        var e = this.rbush_.data;
        return X(e.minX, e.minY, e.maxX, e.maxY, t)
    }, kh.prototype.concat = function (t) {
        for (var e in this.rbush_.load(t.rbush_.all()), t.items_) this.items_[0 | e] = t.items_[0 | e]
    };
    var Dh = function (i) {
            function t(t, e) {
                i.call(this, t), this.feature = e
            }

            return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
        }(m), jh = function (o) {
            function t(t) {
                var e = t || {};
                o.call(this, {
                    attributions: e.attributions,
                    projection: void 0,
                    state: ms,
                    wrapX: void 0 === e.wrapX || e.wrapX
                }), this.loader_ = L, this.format_ = e.format, this.overlaps_ = null == e.overlaps || e.overlaps, this.url_ = e.url, void 0 !== e.loader ? this.loader_ = e.loader : void 0 !== this.url_ && (Z(this.format_, 7), this.loader_ = dh(this.url_, this.format_)), this.strategy_ = void 0 !== e.strategy ? e.strategy : fh;
                var i, r, n = void 0 === e.useSpatialIndex || e.useSpatialIndex;
                this.featuresRtree_ = n ? new kh : null, this.loadedExtentsRtree_ = new kh, this.nullGeometryFeatures_ = {}, this.idIndex_ = {}, this.undefIdIndex_ = {}, this.featureChangeKeys_ = {}, this.featuresCollection_ = null, e.features instanceof M ? r = (i = e.features).getArray() : Array.isArray(e.features) && (r = e.features), n || void 0 !== i || (i = new M(r)), void 0 !== r && this.addFeaturesInternal(r), void 0 !== i && this.bindFeaturesCollection_(i)
            }

            return o && (t.__proto__ = o), ((t.prototype = Object.create(o && o.prototype)).constructor = t).prototype.addFeature = function (t) {
                this.addFeatureInternal(t), this.changed()
            }, t.prototype.addFeatureInternal = function (t) {
                var e = Ct(t).toString();
                if (this.addToIndex_(e, t)) {
                    this.setupChangeEvents_(e, t);
                    var i = t.getGeometry();
                    if (i) {
                        var r = i.getExtent();
                        this.featuresRtree_ && this.featuresRtree_.insert(r, t)
                    } else this.nullGeometryFeatures_[e] = t;
                    this.dispatchEvent(new Dh(gh, t))
                }
            }, t.prototype.setupChangeEvents_ = function (t, e) {
                this.featureChangeKeys_[t] = [C(e, w.CHANGE, this.handleFeatureChange_, this), C(e, a, this.handleFeatureChange_, this)]
            }, t.prototype.addToIndex_ = function (t, e) {
                var i = !0, r = e.getId();
                return void 0 !== r ? r.toString() in this.idIndex_ ? i = !1 : this.idIndex_[r.toString()] = e : (Z(!(t in this.undefIdIndex_), 30), this.undefIdIndex_[t] = e), i
            }, t.prototype.addFeatures = function (t) {
                this.addFeaturesInternal(t), this.changed()
            }, t.prototype.addFeaturesInternal = function (t) {
                for (var e = [], i = [], r = [], n = 0, o = t.length; n < o; n++) {
                    var s = t[n], a = Ct(s).toString();
                    this.addToIndex_(a, s) && i.push(s)
                }
                for (var h = 0, l = i.length; h < l; h++) {
                    var u = i[h], c = Ct(u).toString();
                    this.setupChangeEvents_(c, u);
                    var p = u.getGeometry();
                    if (p) {
                        var d = p.getExtent();
                        e.push(d), r.push(u)
                    } else this.nullGeometryFeatures_[c] = u
                }
                this.featuresRtree_ && this.featuresRtree_.load(e, r);
                for (var f = 0, _ = i.length; f < _; f++) this.dispatchEvent(new Dh(gh, i[f]))
            }, t.prototype.bindFeaturesCollection_ = function (e) {
                var i = !1;
                C(this, gh, function (t) {
                    i || (i = !0, e.push(t.feature), i = !1)
                }), C(this, mh, function (t) {
                    i || (i = !0, e.remove(t.feature), i = !1)
                }), C(e, h, function (t) {
                    i || (i = !0, this.addFeature(t.element), i = !1)
                }, this), C(e, l, function (t) {
                    i || (i = !0, this.removeFeature(t.element), i = !1)
                }, this), this.featuresCollection_ = e
            }, t.prototype.clear = function (t) {
                if (t) {
                    for (var e in this.featureChangeKeys_) {
                        this.featureChangeKeys_[e].forEach(g)
                    }
                    this.featuresCollection_ || (this.featureChangeKeys_ = {}, this.idIndex_ = {}, this.undefIdIndex_ = {})
                } else if (this.featuresRtree_) for (var i in this.featuresRtree_.forEach(this.removeFeatureInternal, this), this.nullGeometryFeatures_) this.removeFeatureInternal(this.nullGeometryFeatures_[i]);
                this.featuresCollection_ && this.featuresCollection_.clear(), this.featuresRtree_ && this.featuresRtree_.clear(), this.loadedExtentsRtree_.clear(), this.nullGeometryFeatures_ = {};
                var r = new Dh(vh);
                this.dispatchEvent(r), this.changed()
            }, t.prototype.forEachFeature = function (t) {
                return this.featuresRtree_ ? this.featuresRtree_.forEach(t) : this.featuresCollection_ ? this.featuresCollection_.forEach(t) : void 0
            }, t.prototype.forEachFeatureAtCoordinateDirect = function (e, i) {
                var t = [e[0], e[1], e[0], e[1]];
                return this.forEachFeatureInExtent(t, function (t) {
                    return t.getGeometry().intersectsCoordinate(e) ? i(t) : void 0
                })
            }, t.prototype.forEachFeatureInExtent = function (t, e) {
                return this.featuresRtree_ ? this.featuresRtree_.forEachInExtent(t, e) : this.featuresCollection_ ? this.featuresCollection_.forEach(e) : void 0
            }, t.prototype.forEachFeatureIntersectingExtent = function (i, r) {
                return this.forEachFeatureInExtent(i, function (t) {
                    if (t.getGeometry().intersectsExtent(i)) {
                        var e = r(t);
                        if (e) return e
                    }
                })
            }, t.prototype.getFeaturesCollection = function () {
                return this.featuresCollection_
            }, t.prototype.getFeatures = function () {
                var t;
                return this.featuresCollection_ ? t = this.featuresCollection_.getArray() : this.featuresRtree_ && (t = this.featuresRtree_.getAll(), Tt(this.nullGeometryFeatures_) || pr(t, s(this.nullGeometryFeatures_))), t
            }, t.prototype.getFeaturesAtCoordinate = function (t) {
                var e = [];
                return this.forEachFeatureAtCoordinateDirect(t, function (t) {
                    e.push(t)
                }), e
            }, t.prototype.getFeaturesInExtent = function (t) {
                return this.featuresRtree_.getInExtent(t)
            }, t.prototype.getClosestFeatureToCoordinate = function (t, e) {
                var n = t[0], o = t[1], s = null, a = [NaN, NaN], h = 1 / 0, l = [-1 / 0, -1 / 0, 1 / 0, 1 / 0], u = e || y;
                return this.featuresRtree_.forEachInExtent(l, function (t) {
                    if (u(t)) {
                        var e = t.getGeometry(), i = h;
                        if ((h = e.closestPointXY(n, o, a, h)) < i) {
                            s = t;
                            var r = Math.sqrt(h);
                            l[0] = n - r, l[1] = o - r, l[2] = n + r, l[3] = o + r
                        }
                    }
                }), s
            }, t.prototype.getExtent = function (t) {
                return this.featuresRtree_.getExtent(t)
            }, t.prototype.getFeatureById = function (t) {
                var e = this.idIndex_[t.toString()];
                return void 0 !== e ? e : null
            }, t.prototype.getFormat = function () {
                return this.format_
            }, t.prototype.getOverlaps = function () {
                return this.overlaps_
            }, t.prototype.getResolutions = function () {
            }, t.prototype.getUrl = function () {
                return this.url_
            }, t.prototype.handleFeatureChange_ = function (t) {
                var e = t.target, i = Ct(e).toString(), r = e.getGeometry();
                if (r) {
                    var n = r.getExtent();
                    i in this.nullGeometryFeatures_ ? (delete this.nullGeometryFeatures_[i], this.featuresRtree_ && this.featuresRtree_.insert(n, e)) : this.featuresRtree_ && this.featuresRtree_.update(n, e)
                } else i in this.nullGeometryFeatures_ || (this.featuresRtree_ && this.featuresRtree_.remove(e), this.nullGeometryFeatures_[i] = e);
                var o = e.getId();
                if (void 0 !== o) {
                    var s = o.toString();
                    i in this.undefIdIndex_ ? (delete this.undefIdIndex_[i], this.idIndex_[s] = e) : this.idIndex_[s] !== e && (this.removeFromIdIndex_(e), this.idIndex_[s] = e)
                } else i in this.undefIdIndex_ || (this.removeFromIdIndex_(e), this.undefIdIndex_[i] = e);
                this.changed(), this.dispatchEvent(new Dh(yh, e))
            }, t.prototype.hasFeature = function (t) {
                var e = t.getId();
                return void 0 !== e ? e in this.idIndex_ : Ct(t).toString() in this.undefIdIndex_
            }, t.prototype.isEmpty = function () {
                return this.featuresRtree_.isEmpty() && Tt(this.nullGeometryFeatures_)
            }, t.prototype.loadFeatures = function (t, r, n) {
                var o = this, s = this.loadedExtentsRtree_, a = this.strategy_(t, r);
                this.loading = !1;
                for (var e = function (t, e) {
                    var i = a[t];
                    s.forEachInExtent(i, function (t) {
                        return Q(t.extent, i)
                    }) || (o.loader_.call(o, i, r, n), s.insert(i, {extent: i.slice()}), o.loading = !0)
                }, i = 0, h = a.length; i < h; ++i) e(i)
            }, t.prototype.removeLoadedExtent = function (e) {
                var i, t = this.loadedExtentsRtree_;
                t.forEachInExtent(e, function (t) {
                    if ($(t.extent, e)) return i = t, !0
                }), i && t.remove(i)
            }, t.prototype.removeFeature = function (t) {
                var e = Ct(t).toString();
                e in this.nullGeometryFeatures_ ? delete this.nullGeometryFeatures_[e] : this.featuresRtree_ && this.featuresRtree_.remove(t), this.removeFeatureInternal(t), this.changed()
            }, t.prototype.removeFeatureInternal = function (t) {
                var e = Ct(t).toString();
                this.featureChangeKeys_[e].forEach(g), delete this.featureChangeKeys_[e];
                var i = t.getId();
                void 0 !== i ? delete this.idIndex_[i.toString()] : delete this.undefIdIndex_[e], this.dispatchEvent(new Dh(mh, t))
            }, t.prototype.removeFromIdIndex_ = function (t) {
                var e = !1;
                for (var i in this.idIndex_) if (this.idIndex_[i] === t) {
                    delete this.idIndex_[i], e = !0;
                    break
                }
                return e
            }, t.prototype.setLoader = function (t) {
                this.loader_ = t
            }, t
        }(_h), Uh = {POINT: "Point", LINE_STRING: "LineString", POLYGON: "Polygon", CIRCLE: "Circle"}, Yh = "drawstart",
        Bh = "drawend", Xh = function (i) {
            function t(t, e) {
                i.call(this, t), this.feature = e
            }

            return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
        }(m), zh = function (o) {
            function t(t) {
                o.call(this, {
                    handleDownEvent: Wh,
                    handleEvent: Vh,
                    handleUpEvent: Kh,
                    stopDown: v
                }), this.shouldHandle_ = !1, this.downPx_ = null, this.downTimeout_, this.lastDragTime_, this.freehand_ = !1, this.source_ = t.source ? t.source : null, this.features_ = t.features ? t.features : null, this.snapTolerance_ = t.snapTolerance ? t.snapTolerance : 12, this.type_ = t.type, this.mode_ = function (t) {
                    var e;
                    t === Lt.POINT || t === Lt.MULTI_POINT ? e = Uh.POINT : t === Lt.LINE_STRING || t === Lt.MULTI_LINE_STRING ? e = Uh.LINE_STRING : t === Lt.POLYGON || t === Lt.MULTI_POLYGON ? e = Uh.POLYGON : t === Lt.CIRCLE && (e = Uh.CIRCLE);
                    return e
                }(this.type_), this.stopClick_ = !!t.stopClick, this.minPoints_ = t.minPoints ? t.minPoints : this.mode_ === Uh.POLYGON ? 3 : 2, this.maxPoints_ = t.maxPoints ? t.maxPoints : 1 / 0, this.finishCondition_ = t.finishCondition ? t.finishCondition : y;
                var i, e = t.geometryFunction;
                if (!e) if (this.type_ === Lt.CIRCLE) e = function (t, e) {
                    var i = e || new eh([NaN, NaN]), r = fn(t[0], t[1]);
                    return i.setCenterAndRadius(t[0], Math.sqrt(r)), i
                }; else {
                    var r, n = this.mode_;
                    n === Uh.POINT ? r = Dr : n === Uh.LINE_STRING ? r = Sn : n === Uh.POLYGON && (r = Qr), e = function (t, e) {
                        var i = e;
                        return i ? n === Uh.POLYGON ? t[0].length ? i.setCoordinates([t[0].concat([t[0][0]])]) : i.setCoordinates([]) : i.setCoordinates(t) : i = new r(t), i
                    }
                }
                this.geometryFunction_ = e, this.dragVertexDelay_ = void 0 !== t.dragVertexDelay ? t.dragVertexDelay : 500, this.finishCoordinate_ = null, this.sketchFeature_ = null, this.sketchPoint_ = null, this.sketchCoords_ = null, this.sketchLine_ = null, this.sketchLineCoords_ = null, this.squaredClickTolerance_ = t.clickTolerance ? t.clickTolerance * t.clickTolerance : 36, this.overlay_ = new uh({
                    source: new jh({
                        useSpatialIndex: !1,
                        wrapX: !!t.wrapX && t.wrapX
                    }), style: t.style ? t.style : (i = Zi(), function (t, e) {
                        return i[t.getGeometry().getType()]
                    }), updateWhileInteracting: !0
                }), this.geometryName_ = t.geometryName, this.condition_ = t.condition ? t.condition : $s, this.freehandCondition_, t.freehand ? this.freehandCondition_ = Hs : this.freehandCondition_ = t.freehandCondition ? t.freehandCondition : ta, C(this, b(Gs), this.updateState_, this)
            }

            return o && (t.__proto__ = o), ((t.prototype = Object.create(o && o.prototype)).constructor = t).prototype.setMap = function (t) {
                o.prototype.setMap.call(this, t), this.updateState_()
            }, t.prototype.getOverlay = function () {
                return this.overlay_
            }, t.prototype.handlePointerMove_ = function (t) {
                if (this.downPx_ && (!this.freehand_ && this.shouldHandle_ || this.freehand_ && !this.shouldHandle_)) {
                    var e = this.downPx_, i = t.pixel, r = e[0] - i[0], n = e[1] - i[1], o = r * r + n * n;
                    if (this.shouldHandle_ = this.freehand_ ? o > this.squaredClickTolerance_ : o <= this.squaredClickTolerance_, !this.shouldHandle_) return !0
                }
                return this.finishCoordinate_ ? this.modifyDrawing_(t) : this.createOrUpdateSketchPoint_(t), !0
            }, t.prototype.atFinish_ = function (t) {
                var e = !1;
                if (this.sketchFeature_) {
                    var i = !1, r = [this.finishCoordinate_];
                    if (this.mode_ === Uh.LINE_STRING ? i = this.sketchCoords_.length > this.minPoints_ : this.mode_ === Uh.POLYGON && (i = this.sketchCoords_[0].length > this.minPoints_, r = [this.sketchCoords_[0][0], this.sketchCoords_[0][this.sketchCoords_[0].length - 2]]), i) for (var n = t.map, o = 0, s = r.length; o < s; o++) {
                        var a = r[o], h = n.getPixelFromCoordinate(a), l = t.pixel, u = l[0] - h[0], c = l[1] - h[1],
                            p = this.freehand_ ? 1 : this.snapTolerance_;
                        if (e = Math.sqrt(u * u + c * c) <= p) {
                            this.finishCoordinate_ = a;
                            break
                        }
                    }
                }
                return e
            }, t.prototype.createOrUpdateSketchPoint_ = function (t) {
                var e = t.coordinate.slice();
                this.sketchPoint_ ? this.sketchPoint_.getGeometry().setCoordinates(e) : (this.sketchPoint_ = new Ji(new Dr(e)), this.updateSketchFeatures_())
            }, t.prototype.startDrawing_ = function (t) {
                var e = t.coordinate;
                this.finishCoordinate_ = e, this.mode_ === Uh.POINT ? this.sketchCoords_ = e.slice() : this.mode_ === Uh.POLYGON ? (this.sketchCoords_ = [[e.slice(), e.slice()]], this.sketchLineCoords_ = this.sketchCoords_[0]) : this.sketchCoords_ = [e.slice(), e.slice()], this.sketchLineCoords_ && (this.sketchLine_ = new Ji(new Sn(this.sketchLineCoords_)));
                var i = this.geometryFunction_(this.sketchCoords_);
                this.sketchFeature_ = new Ji, this.geometryName_ && this.sketchFeature_.setGeometryName(this.geometryName_), this.sketchFeature_.setGeometry(i), this.updateSketchFeatures_(), this.dispatchEvent(new Xh(Yh, this.sketchFeature_))
            }, t.prototype.modifyDrawing_ = function (t) {
                var e, i, r, n = t.coordinate, o = this.sketchFeature_.getGeometry();
                (this.mode_ === Uh.POINT ? i = this.sketchCoords_ : this.mode_ === Uh.POLYGON ? (i = (e = this.sketchCoords_[0])[e.length - 1], this.atFinish_(t) && (n = this.finishCoordinate_.slice())) : i = (e = this.sketchCoords_)[e.length - 1], i[0] = n[0], i[1] = n[1], this.geometryFunction_(this.sketchCoords_, o), this.sketchPoint_) && this.sketchPoint_.getGeometry().setCoordinates(n);
                if (o instanceof Qr && this.mode_ !== Uh.POLYGON) {
                    this.sketchLine_ || (this.sketchLine_ = new Ji);
                    var s = o.getLinearRing(0);
                    (r = this.sketchLine_.getGeometry()) ? (r.setFlatCoordinates(s.getLayout(), s.getFlatCoordinates()), r.changed()) : (r = new Sn(s.getFlatCoordinates(), s.getLayout()), this.sketchLine_.setGeometry(r))
                } else this.sketchLineCoords_ && (r = this.sketchLine_.getGeometry()).setCoordinates(this.sketchLineCoords_);
                this.updateSketchFeatures_()
            }, t.prototype.addToDrawing_ = function (t) {
                var e, i, r = t.coordinate, n = this.sketchFeature_.getGeometry();
                this.mode_ === Uh.LINE_STRING ? (this.finishCoordinate_ = r.slice(), (i = this.sketchCoords_).length >= this.maxPoints_ && (this.freehand_ ? i.pop() : e = !0), i.push(r.slice()), this.geometryFunction_(i, n)) : this.mode_ === Uh.POLYGON && ((i = this.sketchCoords_[0]).length >= this.maxPoints_ && (this.freehand_ ? i.pop() : e = !0), i.push(r.slice()), e && (this.finishCoordinate_ = i[0]), this.geometryFunction_(this.sketchCoords_, n)), this.updateSketchFeatures_(), e && this.finishDrawing()
            }, t.prototype.removeLastPoint = function () {
                if (this.sketchFeature_) {
                    var t, e = this.sketchFeature_.getGeometry();
                    this.mode_ === Uh.LINE_STRING ? ((t = this.sketchCoords_).splice(-2, 1), this.geometryFunction_(t, e), 2 <= t.length && (this.finishCoordinate_ = t[t.length - 2].slice())) : this.mode_ === Uh.POLYGON && ((t = this.sketchCoords_[0]).splice(-2, 1), this.sketchLine_.getGeometry().setCoordinates(t), this.geometryFunction_(this.sketchCoords_, e)), 0 === t.length && (this.finishCoordinate_ = null), this.updateSketchFeatures_()
                }
            }, t.prototype.finishDrawing = function () {
                var t = this.abortDrawing_();
                if (t) {
                    var e = this.sketchCoords_, i = t.getGeometry();
                    this.mode_ === Uh.LINE_STRING ? (e.pop(), this.geometryFunction_(e, i)) : this.mode_ === Uh.POLYGON && (e[0].pop(), this.geometryFunction_(e, i), e = i.getCoordinates()), this.type_ === Lt.MULTI_POINT ? t.setGeometry(new rh([e])) : this.type_ === Lt.MULTI_LINE_STRING ? t.setGeometry(new ih([e])) : this.type_ === Lt.MULTI_POLYGON && t.setGeometry(new oh([e])), this.dispatchEvent(new Xh(Bh, t)), this.features_ && this.features_.push(t), this.source_ && this.source_.addFeature(t)
                }
            }, t.prototype.abortDrawing_ = function () {
                this.finishCoordinate_ = null;
                var t = this.sketchFeature_;
                return t && (this.sketchFeature_ = null, this.sketchPoint_ = null, this.sketchLine_ = null, this.overlay_.getSource().clear(!0)), t
            }, t.prototype.extend = function (t) {
                var e = t.getGeometry();
                this.sketchFeature_ = t, this.sketchCoords_ = e.getCoordinates();
                var i = this.sketchCoords_[this.sketchCoords_.length - 1];
                this.finishCoordinate_ = i.slice(), this.sketchCoords_.push(i.slice()), this.updateSketchFeatures_(), this.dispatchEvent(new Xh(Yh, this.sketchFeature_))
            }, t.prototype.updateSketchFeatures_ = function () {
                var t = [];
                this.sketchFeature_ && t.push(this.sketchFeature_), this.sketchLine_ && t.push(this.sketchLine_), this.sketchPoint_ && t.push(this.sketchPoint_);
                var e = this.overlay_.getSource();
                e.clear(!0), e.addFeatures(t)
            }, t.prototype.updateState_ = function () {
                var t = this.getMap(), e = this.getActive();
                t && e || this.abortDrawing_(), this.overlay_.setMap(e ? t : null)
            }, t
        }(ha);

    function Vh(t) {
        t.originalEvent.type === w.CONTEXTMENU && t.preventDefault(), this.freehand_ = this.mode_ !== Uh.POINT && this.freehandCondition_(t);
        var e = t.type === Jn.POINTERMOVE, i = !0;
        this.lastDragTime_ && t.type === Jn.POINTERDRAG && (Date.now() - this.lastDragTime_ >= this.dragVertexDelay_ ? (this.downPx_ = t.pixel, this.shouldHandle_ = !this.freehand_, e = !0) : this.lastDragTime_ = void 0, this.shouldHandle_ && this.downTimeout_ && (clearTimeout(this.downTimeout_), this.downTimeout_ = void 0));
        return this.freehand_ && t.type === Jn.POINTERDRAG && null !== this.sketchFeature_ ? (this.addToDrawing_(t), i = !1) : this.freehand_ && t.type === Jn.POINTERDOWN ? i = !1 : e ? (i = t.type === Jn.POINTERMOVE) && this.freehand_ ? i = this.handlePointerMove_(t) : (t.pointerEvent.pointerType == lo || t.type === Jn.POINTERDRAG && !this.downTimeout_) && this.handlePointerMove_(t) : t.type === Jn.DBLCLICK && (i = !1), ua.call(this, t) && i
    }

    function Wh(t) {
        return this.shouldHandle_ = !this.freehand_, this.freehand_ ? (this.downPx_ = t.pixel, this.finishCoordinate_ || this.startDrawing_(t), !0) : !!this.condition_(t) && (this.lastDragTime_ = Date.now(), this.downTimeout_ = setTimeout(function () {
            this.handlePointerMove_(new Qn(Jn.POINTERMOVE, t.map, t.pointerEvent, t.frameState))
        }.bind(this), this.dragVertexDelay_), this.downPx_ = t.pixel, !0)
    }

    function Kh(t) {
        var e = !0;
        this.downTimeout_ && (clearTimeout(this.downTimeout_), this.downTimeout_ = void 0), this.handlePointerMove_(t);
        var i = this.mode_ === Uh.CIRCLE;
        return this.shouldHandle_ ? (this.finishCoordinate_ ? this.freehand_ || i ? this.finishDrawing() : this.atFinish_(t) ? this.finishCondition_(t) && this.finishDrawing() : this.addToDrawing_(t) : (this.startDrawing_(t), this.mode_ === Uh.POINT && this.finishDrawing()), e = !1) : this.freehand_ && (this.finishCoordinate_ = null, this.abortDrawing_()), !e && this.stopClick_ && t.stopPropagation(), e
    }

    var Hh = "extentchanged", Zh = function (e) {
        function t(t) {
            e.call(this, Hh), this.extent = t
        }

        return e && (t.__proto__ = e), (t.prototype = Object.create(e && e.prototype)).constructor = t
    }(m), qh = function (n) {
        function t(t) {
            n.call(this, {handleDownEvent: Qh, handleDragEvent: $h, handleEvent: Jh, handleUpEvent: tl});
            var i, r, e = t || {};
            this.extent_ = null, this.pointerHandler_ = null, this.pixelTolerance_ = void 0 !== e.pixelTolerance ? e.pixelTolerance : 10, this.snappedToVertex_ = !1, this.extentFeature_ = null, this.vertexFeature_ = null, t || (t = {}), this.extentOverlay_ = new uh({
                source: new jh({
                    useSpatialIndex: !1,
                    wrapX: !!t.wrapX
                }), style: t.boxStyle ? t.boxStyle : (i = Zi(), function (t, e) {
                    return i[Lt.POLYGON]
                }), updateWhileAnimating: !0, updateWhileInteracting: !0
            }), this.vertexOverlay_ = new uh({
                source: new jh({useSpatialIndex: !1, wrapX: !!t.wrapX}),
                style: t.pointerStyle ? t.pointerStyle : (r = Zi(), function (t, e) {
                    return r[Lt.POINT]
                }),
                updateWhileAnimating: !0,
                updateWhileInteracting: !0
            }), t.extent && this.setExtent(t.extent)
        }

        return n && (t.__proto__ = n), ((t.prototype = Object.create(n && n.prototype)).constructor = t).prototype.snapToVertex_ = function (t, e) {
            var i, r = e.getCoordinateFromPixel(t), n = this.getExtent();
            if (n) {
                var o = [[[(i = n)[0], i[1]], [i[0], i[3]]], [[i[0], i[3]], [i[2], i[3]]], [[i[2], i[3]], [i[2], i[1]]], [[i[2], i[1]], [i[0], i[1]]]];
                o.sort(function (t, e) {
                    return gn(r, t) - gn(r, e)
                });
                var s = o[0], a = hn(r, s), h = e.getPixelFromCoordinate(a);
                if (_n(t, h) <= this.pixelTolerance_) {
                    var l = e.getPixelFromCoordinate(s[0]), u = e.getPixelFromCoordinate(s[1]), c = fn(h, l),
                        p = fn(h, u), d = Math.sqrt(Math.min(c, p));
                    return this.snappedToVertex_ = d <= this.pixelTolerance_, this.snappedToVertex_ && (a = p < c ? s[1] : s[0]), a
                }
            }
            return null
        }, t.prototype.handlePointerMove_ = function (t) {
            var e = t.pixel, i = t.map, r = this.snapToVertex_(e, i);
            r || (r = i.getCoordinateFromPixel(e)), this.createOrUpdatePointerFeature_(r)
        }, t.prototype.createOrUpdateExtentFeature_ = function (t) {
            var e = this.extentFeature_;
            return e ? t ? e.setGeometry(tn(t)) : e.setGeometry(void 0) : (e = new Ji(t ? tn(t) : {}), this.extentFeature_ = e, this.extentOverlay_.getSource().addFeature(e)), e
        }, t.prototype.createOrUpdatePointerFeature_ = function (t) {
            var e = this.vertexFeature_;
            e ? e.getGeometry().setCoordinates(t) : (e = new Ji(new Dr(t)), this.vertexFeature_ = e, this.vertexOverlay_.getSource().addFeature(e));
            return e
        }, t.prototype.setMap = function (t) {
            this.extentOverlay_.setMap(t), this.vertexOverlay_.setMap(t), n.prototype.setMap.call(this, t)
        }, t.prototype.getExtent = function () {
            return this.extent_
        }, t.prototype.setExtent = function (t) {
            this.extent_ = t || null, this.createOrUpdateExtentFeature_(t), this.dispatchEvent(new Zh(this.extent_))
        }, t
    }(ha);

    function Jh(t) {
        return !(t instanceof Qn) || (t.type != Jn.POINTERMOVE || this.handlingDownUpSequence || this.handlePointerMove_(t), ua.call(this, t), !1)
    }

    function Qh(t) {
        var e = t.pixel, i = t.map, r = this.getExtent(), n = this.snapToVertex_(e, i), o = function (t) {
            var e = null, i = null;
            return t[0] == r[0] ? e = r[2] : t[0] == r[2] && (e = r[0]), t[1] == r[1] ? i = r[3] : t[1] == r[3] && (i = r[1]), null !== e && null !== i ? [e, i] : null
        };
        if (n && r) {
            var s = n[0] == r[0] || n[0] == r[2] ? n[0] : null, a = n[1] == r[1] || n[1] == r[3] ? n[1] : null;
            null !== s && null !== a ? this.pointerHandler_ = el(o(n)) : null !== s ? this.pointerHandler_ = il(o([s, r[1]]), o([s, r[3]])) : null !== a && (this.pointerHandler_ = il(o([r[0], a]), o([r[2], a])))
        } else n = i.getCoordinateFromPixel(e), this.setExtent([n[0], n[1], n[0], n[1]]), this.pointerHandler_ = el(n);
        return !0
    }

    function $h(t) {
        if (this.pointerHandler_) {
            var e = t.coordinate;
            this.setExtent(this.pointerHandler_(e)), this.createOrUpdatePointerFeature_(e)
        }
        return !0
    }

    function tl(t) {
        this.pointerHandler_ = null;
        var e = this.getExtent();
        return e && 0 !== it(e) || this.setExtent(null), !1
    }

    function el(e) {
        return function (t) {
            return A([e, t])
        }
    }

    function il(e, i) {
        return e[0] == i[0] ? function (t) {
            return A([e, [t[0], i[1]]])
        } : e[1] == i[1] ? function (t) {
            return A([e, [i[0], t[1]]])
        } : null
    }

    var rl = 0, nl = 1, ol = {MODIFYSTART: "modifystart", MODIFYEND: "modifyend"}, sl = function (r) {
        function t(t, e, i) {
            r.call(this, t), this.features = e, this.mapBrowserEvent = i
        }

        return r && (t.__proto__ = r), (t.prototype = Object.create(r && r.prototype)).constructor = t
    }(m), al = function (r) {
        function t(t) {
            var i, e;
            if (r.call(this, {
                handleDownEvent: ll,
                handleDragEvent: ul,
                handleEvent: pl,
                handleUpEvent: cl
            }), this.condition_ = t.condition ? t.condition : ra, this.defaultDeleteCondition_ = function (t) {
                return Vs(t) && Qs(t)
            }, this.deleteCondition_ = t.deleteCondition ? t.deleteCondition : this.defaultDeleteCondition_, this.insertVertexCondition_ = t.insertVertexCondition ? t.insertVertexCondition : Hs, this.vertexFeature_ = null, this.vertexSegments_ = null, this.lastPixel_ = [0, 0], this.ignoreNextSingleClick_ = !1, this.modified_ = !1, this.rBush_ = new kh, this.pixelTolerance_ = void 0 !== t.pixelTolerance ? t.pixelTolerance : 10, this.snappedToVertex_ = !1, this.changingFeature_ = !1, this.dragSegments_ = [], this.overlay_ = new uh({
                source: new jh({
                    useSpatialIndex: !1,
                    wrapX: !!t.wrapX
                }), style: t.style ? t.style : (i = Zi(), function (t, e) {
                    return i[Lt.POINT]
                }), updateWhileAnimating: !0, updateWhileInteracting: !0
            }), this.SEGMENT_WRITERS_ = {
                Point: this.writePointGeometry_,
                LineString: this.writeLineStringGeometry_,
                LinearRing: this.writeLineStringGeometry_,
                Polygon: this.writePolygonGeometry_,
                MultiPoint: this.writeMultiPointGeometry_,
                MultiLineString: this.writeMultiLineStringGeometry_,
                MultiPolygon: this.writeMultiPolygonGeometry_,
                Circle: this.writeCircleGeometry_,
                GeometryCollection: this.writeGeometryCollectionGeometry_
            }, this.source_ = null, t.source ? (this.source_ = t.source, e = new M(this.source_.getFeatures()), C(this.source_, gh, this.handleSourceAdd_, this), C(this.source_, mh, this.handleSourceRemove_, this)) : e = t.features, !e) throw new Error("The modify interaction requires features or a source");
            this.features_ = e, this.features_.forEach(this.addFeature_.bind(this)), C(this.features_, h, this.handleFeatureAdd_, this), C(this.features_, l, this.handleFeatureRemove_, this), this.lastPointerEvent_ = null
        }

        return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype.addFeature_ = function (t) {
            var e = t.getGeometry();
            e && e.getType() in this.SEGMENT_WRITERS_ && this.SEGMENT_WRITERS_[e.getType()].call(this, t, e);
            var i = this.getMap();
            i && i.isRendered() && this.getActive() && this.handlePointerAtPixel_(this.lastPixel_, i), C(t, w.CHANGE, this.handleFeatureChange_, this)
        }, t.prototype.willModifyFeatures_ = function (t) {
            this.modified_ || (this.modified_ = !0, this.dispatchEvent(new sl(ol.MODIFYSTART, this.features_, t)))
        }, t.prototype.removeFeature_ = function (t) {
            this.removeFeatureSegmentData_(t), this.vertexFeature_ && 0 === this.features_.getLength() && (this.overlay_.getSource().removeFeature(this.vertexFeature_), this.vertexFeature_ = null), d(t, w.CHANGE, this.handleFeatureChange_, this)
        }, t.prototype.removeFeatureSegmentData_ = function (e) {
            var t = this.rBush_, i = [];
            t.forEach(function (t) {
                e === t.feature && i.push(t)
            });
            for (var r = i.length - 1; 0 <= r; --r) t.remove(i[r])
        }, t.prototype.setActive = function (t) {
            this.vertexFeature_ && !t && (this.overlay_.getSource().removeFeature(this.vertexFeature_), this.vertexFeature_ = null), r.prototype.setActive.call(this, t)
        }, t.prototype.setMap = function (t) {
            this.overlay_.setMap(t), r.prototype.setMap.call(this, t)
        }, t.prototype.getOverlay = function () {
            return this.overlay_
        }, t.prototype.handleSourceAdd_ = function (t) {
            t.feature && this.features_.push(t.feature)
        }, t.prototype.handleSourceRemove_ = function (t) {
            t.feature && this.features_.remove(t.feature)
        }, t.prototype.handleFeatureAdd_ = function (t) {
            this.addFeature_(t.element)
        }, t.prototype.handleFeatureChange_ = function (t) {
            if (!this.changingFeature_) {
                var e = t.target;
                this.removeFeature_(e), this.addFeature_(e)
            }
        }, t.prototype.handleFeatureRemove_ = function (t) {
            var e = t.element;
            this.removeFeature_(e)
        }, t.prototype.writePointGeometry_ = function (t, e) {
            var i = e.getCoordinates(), r = {feature: t, geometry: e, segment: [i, i]};
            this.rBush_.insert(e.getExtent(), r)
        }, t.prototype.writeMultiPointGeometry_ = function (t, e) {
            for (var i = e.getCoordinates(), r = 0, n = i.length; r < n; ++r) {
                var o = i[r], s = {feature: t, geometry: e, depth: [r], index: r, segment: [o, o]};
                this.rBush_.insert(e.getExtent(), s)
            }
        }, t.prototype.writeLineStringGeometry_ = function (t, e) {
            for (var i = e.getCoordinates(), r = 0, n = i.length - 1; r < n; ++r) {
                var o = i.slice(r, r + 2), s = {feature: t, geometry: e, index: r, segment: o};
                this.rBush_.insert(A(o), s)
            }
        }, t.prototype.writeMultiLineStringGeometry_ = function (t, e) {
            for (var i = e.getCoordinates(), r = 0, n = i.length; r < n; ++r) for (var o = i[r], s = 0, a = o.length - 1; s < a; ++s) {
                var h = o.slice(s, s + 2), l = {feature: t, geometry: e, depth: [r], index: s, segment: h};
                this.rBush_.insert(A(h), l)
            }
        }, t.prototype.writePolygonGeometry_ = function (t, e) {
            for (var i = e.getCoordinates(), r = 0, n = i.length; r < n; ++r) for (var o = i[r], s = 0, a = o.length - 1; s < a; ++s) {
                var h = o.slice(s, s + 2), l = {feature: t, geometry: e, depth: [r], index: s, segment: h};
                this.rBush_.insert(A(h), l)
            }
        }, t.prototype.writeMultiPolygonGeometry_ = function (t, e) {
            for (var i = e.getCoordinates(), r = 0, n = i.length; r < n; ++r) for (var o = i[r], s = 0, a = o.length; s < a; ++s) for (var h = o[s], l = 0, u = h.length - 1; l < u; ++l) {
                var c = h.slice(l, l + 2), p = {feature: t, geometry: e, depth: [s, r], index: l, segment: c};
                this.rBush_.insert(A(c), p)
            }
        }, t.prototype.writeCircleGeometry_ = function (t, e) {
            var i = e.getCenter(), r = {feature: t, geometry: e, index: rl, segment: [i, i]},
                n = {feature: t, geometry: e, index: nl, segment: [i, i]}, o = [r, n];
            r.featureSegments = n.featureSegments = o, this.rBush_.insert(V(i), r), this.rBush_.insert(e.getExtent(), n)
        }, t.prototype.writeGeometryCollectionGeometry_ = function (t, e) {
            for (var i = e.getGeometriesArray(), r = 0; r < i.length; ++r) this.SEGMENT_WRITERS_[i[r].getType()].call(this, t, i[r])
        }, t.prototype.createOrUpdateVertexFeature_ = function (t) {
            var e = this.vertexFeature_;
            e ? e.getGeometry().setCoordinates(t) : (e = new Ji(new Dr(t)), this.vertexFeature_ = e, this.overlay_.getSource().addFeature(e));
            return e
        }, t.prototype.handlePointerMove_ = function (t) {
            this.lastPixel_ = t.pixel, this.handlePointerAtPixel_(t.pixel, t.map)
        }, t.prototype.handlePointerAtPixel_ = function (t, e) {
            var i = e.getCoordinateFromPixel(t), r = G(V(i), e.getView().getResolution() * this.pixelTolerance_),
                n = this.rBush_.getInExtent(r);
            if (0 < n.length) {
                n.sort(function (t, e) {
                    return dl(i, t) - dl(i, e)
                });
                var o = n[0], s = o.segment, a = fl(i, o), h = e.getPixelFromCoordinate(a), l = _n(t, h);
                if (l <= this.pixelTolerance_) {
                    var u = {};
                    if (o.geometry.getType() === Lt.CIRCLE && o.index === nl) this.snappedToVertex_ = !0, this.createOrUpdateVertexFeature_(a); else {
                        var c = e.getPixelFromCoordinate(s[0]), p = e.getPixelFromCoordinate(s[1]), d = fn(h, c),
                            f = fn(h, p);
                        l = Math.sqrt(Math.min(d, f)), this.snappedToVertex_ = l <= this.pixelTolerance_, this.snappedToVertex_ && (a = f < d ? s[1] : s[0]), this.createOrUpdateVertexFeature_(a);
                        for (var _ = 1, g = n.length; _ < g; ++_) {
                            var y = n[_].segment;
                            if (!(cn(s[0], y[0]) && cn(s[1], y[1]) || cn(s[0], y[1]) && cn(s[1], y[0]))) break;
                            u[Ct(y)] = !0
                        }
                    }
                    return u[Ct(s)] = !0, void (this.vertexSegments_ = u)
                }
            }
            this.vertexFeature_ && (this.overlay_.getSource().removeFeature(this.vertexFeature_), this.vertexFeature_ = null)
        }, t.prototype.insertVertex_ = function (t, e) {
            for (var i, r = t.segment, n = t.feature, o = t.geometry, s = t.depth, a = t.index; e.length < o.getStride();) e.push(0);
            switch (o.getType()) {
                case Lt.MULTI_LINE_STRING:
                case Lt.POLYGON:
                    (i = o.getCoordinates())[s[0]].splice(a + 1, 0, e);
                    break;
                case Lt.MULTI_POLYGON:
                    (i = o.getCoordinates())[s[1]][s[0]].splice(a + 1, 0, e);
                    break;
                case Lt.LINE_STRING:
                    (i = o.getCoordinates()).splice(a + 1, 0, e);
                    break;
                default:
                    return
            }
            this.setGeometryCoordinates_(o, i);
            var h = this.rBush_;
            h.remove(t), this.updateSegmentIndices_(o, a, s, 1);
            var l = {segment: [r[0], e], feature: n, geometry: o, depth: s, index: a};
            h.insert(A(l.segment), l), this.dragSegments_.push([l, 1]);
            var u = {segment: [e, r[1]], feature: n, geometry: o, depth: s, index: a + 1};
            h.insert(A(u.segment), u), this.dragSegments_.push([u, 0]), this.ignoreNextSingleClick_ = !0
        }, t.prototype.removePoint = function () {
            if (this.lastPointerEvent_ && this.lastPointerEvent_.type != Jn.POINTERDRAG) {
                var t = this.lastPointerEvent_;
                return this.willModifyFeatures_(t), this.removeVertex_(), this.dispatchEvent(new sl(ol.MODIFYEND, this.features_, t)), !(this.modified_ = !1)
            }
            return !1
        }, t.prototype.removeVertex_ = function () {
            var t, e, i, r, n, o, s, a, h, l, u, c = this.dragSegments_, p = {}, d = !1;
            for (n = c.length - 1; 0 <= n; --n) u = Ct((l = (i = c[n])[0]).feature), l.depth && (u += "-" + l.depth.join("-")), u in p || (p[u] = {}), 0 === i[1] ? (p[u].right = l, p[u].index = l.index) : 1 == i[1] && (p[u].left = l, p[u].index = l.index + 1);
            for (u in p) {
                switch (h = p[u].right, s = p[u].left, (a = (o = p[u].index) - 1) < 0 && (a = 0), t = e = (r = (l = void 0 !== s ? s : h).geometry).getCoordinates(), d = !1, r.getType()) {
                    case Lt.MULTI_LINE_STRING:
                        2 < e[l.depth[0]].length && (e[l.depth[0]].splice(o, 1), d = !0);
                        break;
                    case Lt.LINE_STRING:
                        2 < e.length && (e.splice(o, 1), d = !0);
                        break;
                    case Lt.MULTI_POLYGON:
                        t = t[l.depth[1]];
                    case Lt.POLYGON:
                        4 < (t = t[l.depth[0]]).length && (o == t.length - 1 && (o = 0), t.splice(o, 1), d = !0, 0 === o && (t.pop(), t.push(t[0]), a = t.length - 1))
                }
                if (d) {
                    this.setGeometryCoordinates_(r, e);
                    var f = [];
                    if (void 0 !== s && (this.rBush_.remove(s), f.push(s.segment[0])), void 0 !== h && (this.rBush_.remove(h), f.push(h.segment[1])), void 0 !== s && void 0 !== h) {
                        var _ = {depth: l.depth, feature: l.feature, geometry: l.geometry, index: a, segment: f};
                        this.rBush_.insert(A(_.segment), _)
                    }
                    this.updateSegmentIndices_(r, o, l.depth, -1), this.vertexFeature_ && (this.overlay_.getSource().removeFeature(this.vertexFeature_), this.vertexFeature_ = null), c.length = 0
                }
            }
            return d
        }, t.prototype.setGeometryCoordinates_ = function (t, e) {
            this.changingFeature_ = !0, t.setCoordinates(e), this.changingFeature_ = !1
        }, t.prototype.updateSegmentIndices_ = function (e, i, r, n) {
            this.rBush_.forEachInExtent(e.getExtent(), function (t) {
                t.geometry === e && (void 0 === r || void 0 === t.depth || fr(t.depth, r)) && t.index > i && (t.index += n)
            })
        }, t
    }(ha);

    function hl(t, e) {
        return t.index - e.index
    }

    function ll(t) {
        if (!this.condition_(t)) return !1;
        this.handlePointerAtPixel_(t.pixel, t.map);
        var e = t.map.getCoordinateFromPixel(t.pixel);
        this.dragSegments_.length = 0, this.modified_ = !1;
        var i = this.vertexFeature_;
        if (i) {
            var r = [], n = i.getGeometry().getCoordinates(), o = A([n]), s = this.rBush_.getInExtent(o), a = {};
            s.sort(hl);
            for (var h = 0, l = s.length; h < l; ++h) {
                var u = s[h], c = u.segment, p = Ct(u.feature), d = u.depth;
                if (d && (p += "-" + d.join("-")), a[p] || (a[p] = new Array(2)), u.geometry.getType() === Lt.CIRCLE && u.index === nl) cn(fl(e, u), n) && !a[p][0] && (this.dragSegments_.push([u, 0]), a[p][0] = u); else if (cn(c[0], n) && !a[p][0]) this.dragSegments_.push([u, 0]), a[p][0] = u; else if (cn(c[1], n) && !a[p][1]) {
                    if ((u.geometry.getType() === Lt.LINE_STRING || u.geometry.getType() === Lt.MULTI_LINE_STRING) && a[p][0] && 0 === a[p][0].index) continue;
                    this.dragSegments_.push([u, 1]), a[p][1] = u
                } else this.insertVertexCondition_(t) && Ct(c) in this.vertexSegments_ && !a[p][0] && !a[p][1] && r.push([u, n])
            }
            r.length && this.willModifyFeatures_(t);
            for (var f = r.length - 1; 0 <= f; --f) this.insertVertex_.apply(this, r[f])
        }
        return !!this.vertexFeature_
    }

    function ul(t) {
        this.ignoreNextSingleClick_ = !1, this.willModifyFeatures_(t);
        for (var e = t.coordinate, i = 0, r = this.dragSegments_.length; i < r; ++i) {
            for (var n = this.dragSegments_[i], o = n[0], s = o.depth, a = o.geometry, h = void 0, l = o.segment, u = n[1]; e.length < a.getStride();) e.push(l[u][e.length]);
            switch (a.getType()) {
                case Lt.POINT:
                    h = e, l[0] = l[1] = e;
                    break;
                case Lt.MULTI_POINT:
                    (h = a.getCoordinates())[o.index] = e, l[0] = l[1] = e;
                    break;
                case Lt.LINE_STRING:
                    (h = a.getCoordinates())[o.index + u] = e, l[u] = e;
                    break;
                case Lt.MULTI_LINE_STRING:
                case Lt.POLYGON:
                    (h = a.getCoordinates())[s[0]][o.index + u] = e, l[u] = e;
                    break;
                case Lt.MULTI_POLYGON:
                    (h = a.getCoordinates())[s[1]][s[0]][o.index + u] = e, l[u] = e;
                    break;
                case Lt.CIRCLE:
                    l[0] = l[1] = e, o.index === rl ? (this.changingFeature_ = !0, a.setCenter(e)) : (this.changingFeature_ = !0, a.setRadius(_n(a.getCenter(), e))), this.changingFeature_ = !1
            }
            h && this.setGeometryCoordinates_(a, h)
        }
        this.createOrUpdateVertexFeature_(e)
    }

    function cl(t) {
        for (var e = this.dragSegments_.length - 1; 0 <= e; --e) {
            var i = this.dragSegments_[e][0], r = i.geometry;
            if (r.getType() === Lt.CIRCLE) {
                var n = r.getCenter(), o = i.featureSegments[0], s = i.featureSegments[1];
                o.segment[0] = o.segment[1] = n, s.segment[0] = s.segment[1] = n, this.rBush_.update(V(n), o), this.rBush_.update(r.getExtent(), s)
            } else this.rBush_.update(A(i.segment), i)
        }
        return this.modified_ && (this.dispatchEvent(new sl(ol.MODIFYEND, this.features_, t)), this.modified_ = !1), !1
    }

    function pl(t) {
        return !(t instanceof Qn) || ((this.lastPointerEvent_ = t).map.getView().getInteracting() || t.type != Jn.POINTERMOVE || this.handlingDownUpSequence || this.handlePointerMove_(t), this.vertexFeature_ && this.deleteCondition_(t) && (e = !(t.type != Jn.SINGLECLICK || !this.ignoreNextSingleClick_) || this.removePoint()), t.type == Jn.SINGLECLICK && (this.ignoreNextSingleClick_ = !1), ua.call(this, t) && !e);
        var e
    }

    function dl(t, e) {
        var i = e.geometry;
        if (i.getType() === Lt.CIRCLE) {
            var r = i;
            if (e.index === nl) {
                var n = fn(r.getCenter(), t), o = Math.sqrt(n) - r.getRadius();
                return o * o
            }
        }
        return gn(t, e.segment)
    }

    function fl(t, e) {
        var i = e.geometry;
        return i.getType() === Lt.CIRCLE && e.index === nl ? i.getClosestPoint(t) : hn(t, e.segment)
    }

    var _l = {SELECT: "select"}, gl = function (n) {
        function t(t, e, i, r) {
            n.call(this, t), this.selected = e, this.deselected = i, this.mapBrowserEvent = r
        }

        return n && (t.__proto__ = n), (t.prototype = Object.create(n && n.prototype)).constructor = t
    }(m), yl = function (a) {
        function t(t) {
            a.call(this, {handleEvent: vl});
            var e = t || {};
            this.condition_ = e.condition ? e.condition : Qs, this.addCondition_ = e.addCondition ? e.addCondition : qs, this.removeCondition_ = e.removeCondition ? e.removeCondition : qs, this.toggleCondition_ = e.toggleCondition ? e.toggleCondition : ta, this.multi_ = !!e.multi && e.multi, this.filter_ = e.filter ? e.filter : y, this.hitTolerance_ = e.hitTolerance ? e.hitTolerance : 0;
            var i, r, n = new uh({
                source: new jh({useSpatialIndex: !1, features: e.features, wrapX: e.wrapX}),
                style: e.style ? e.style : (i = Zi(), pr(i[Lt.POLYGON], i[Lt.LINE_STRING]), pr(i[Lt.GEOMETRY_COLLECTION], i[Lt.LINE_STRING]), function (t, e) {
                    return t.getGeometry() ? i[t.getGeometry().getType()] : null
                }),
                updateWhileAnimating: !0,
                updateWhileInteracting: !0
            });
            if (this.featureOverlay_ = n, e.layers) if ("function" == typeof e.layers) r = e.layers; else {
                var o = e.layers;
                r = function (t) {
                    return lr(o, t)
                }
            } else r = y;
            this.layerFilter_ = r, this.featureLayerAssociation_ = {};
            var s = this.featureOverlay_.getSource().getFeaturesCollection();
            C(s, h, this.addFeature_, this), C(s, l, this.removeFeature_, this)
        }

        return a && (t.__proto__ = a), ((t.prototype = Object.create(a && a.prototype)).constructor = t).prototype.addFeatureLayerAssociation_ = function (t, e) {
            var i = Ct(t);
            this.featureLayerAssociation_[i] = e
        }, t.prototype.getFeatures = function () {
            return this.featureOverlay_.getSource().getFeaturesCollection()
        }, t.prototype.getHitTolerance = function () {
            return this.hitTolerance_
        }, t.prototype.getLayer = function (t) {
            var e = Ct(t);
            return this.featureLayerAssociation_[e]
        }, t.prototype.getOverlay = function () {
            return this.featureOverlay_
        }, t.prototype.setHitTolerance = function (t) {
            this.hitTolerance_ = t
        }, t.prototype.setMap = function (t) {
            var e = this.getMap(), i = this.featureOverlay_.getSource().getFeaturesCollection();
            e && i.forEach(e.unskipFeature.bind(e)), a.prototype.setMap.call(this, t), this.featureOverlay_.setMap(t), t && i.forEach(t.skipFeature.bind(t))
        }, t.prototype.addFeature_ = function (t) {
            var e = this.getMap();
            e && e.skipFeature(t.element)
        }, t.prototype.removeFeature_ = function (t) {
            var e = this.getMap();
            e && e.unskipFeature(t.element)
        }, t.prototype.removeFeatureLayerAssociation_ = function (t) {
            var e = Ct(t);
            delete this.featureLayerAssociation_[e]
        }, t
    }(ks);

    function vl(t) {
        if (!this.condition_(t)) return !0;
        var i = this.addCondition_(t), r = this.removeCondition_(t), n = this.toggleCondition_(t), e = !i && !r && !n,
            o = t.map, s = this.featureOverlay_.getSource().getFeaturesCollection(), a = [], h = [];
        if (e) {
            _(this.featureLayerAssociation_), o.forEachFeatureAtPixel(t.pixel, function (t, e) {
                if (this.filter_(t, e)) return h.push(t), this.addFeatureLayerAssociation_(t, e), !this.multi_
            }.bind(this), {layerFilter: this.layerFilter_, hitTolerance: this.hitTolerance_});
            for (var l = s.getLength() - 1; 0 <= l; --l) {
                var u = s.item(l), c = h.indexOf(u);
                -1 < c ? h.splice(c, 1) : (s.remove(u), a.push(u))
            }
            0 !== h.length && s.extend(h)
        } else {
            o.forEachFeatureAtPixel(t.pixel, function (t, e) {
                if (this.filter_(t, e)) return !i && !n || lr(s.getArray(), t) ? (r || n) && lr(s.getArray(), t) && (a.push(t), this.removeFeatureLayerAssociation_(t)) : (h.push(t), this.addFeatureLayerAssociation_(t, e)), !this.multi_
            }.bind(this), {layerFilter: this.layerFilter_, hitTolerance: this.hitTolerance_});
            for (var p = a.length - 1; 0 <= p; --p) s.remove(a[p]);
            s.extend(h)
        }
        return (0 < h.length || 0 < a.length) && this.dispatchEvent(new gl(_l.SELECT, h, a, t)), Js(t)
    }

    var ml = function (n) {
        function t(t) {
            n.call(this, {handleEvent: xl, handleDownEvent: y, handleUpEvent: Sl, stopDown: v});
            var e = t || {};
            this.source_ = e.source ? e.source : null, this.vertex_ = void 0 === e.vertex || e.vertex, this.edge_ = void 0 === e.edge || e.edge, this.features_ = e.features ? e.features : null, this.featuresListenerKeys_ = [], this.featureChangeListenerKeys_ = {}, this.indexedFeaturesExtents_ = {}, this.pendingFeatures_ = {}, this.pixelCoordinate_ = null, this.pixelTolerance_ = void 0 !== e.pixelTolerance ? e.pixelTolerance : 10, this.sortByDistance_ = function (t, e) {
                var i = gn(this.pixelCoordinate_, t.segment), r = gn(this.pixelCoordinate_, e.segment);
                return i - r
            }.bind(this), this.rBush_ = new kh, this.SEGMENT_WRITERS_ = {
                Point: this.writePointGeometry_,
                LineString: this.writeLineStringGeometry_,
                LinearRing: this.writeLineStringGeometry_,
                Polygon: this.writePolygonGeometry_,
                MultiPoint: this.writeMultiPointGeometry_,
                MultiLineString: this.writeMultiLineStringGeometry_,
                MultiPolygon: this.writeMultiPolygonGeometry_,
                GeometryCollection: this.writeGeometryCollectionGeometry_,
                Circle: this.writeCircleGeometry_
            }
        }

        return n && (t.__proto__ = n), ((t.prototype = Object.create(n && n.prototype)).constructor = t).prototype.addFeature = function (t, e) {
            var i = void 0 === e || e, r = Ct(t), n = t.getGeometry();
            if (n) {
                var o = this.SEGMENT_WRITERS_[n.getType()];
                o && (this.indexedFeaturesExtents_[r] = n.getExtent([1 / 0, 1 / 0, -1 / 0, -1 / 0]), o.call(this, t, n))
            }
            i && (this.featureChangeListenerKeys_[r] = C(t, w.CHANGE, this.handleFeatureChange_, this))
        }, t.prototype.forEachFeatureAdd_ = function (t) {
            this.addFeature(t)
        }, t.prototype.forEachFeatureRemove_ = function (t) {
            this.removeFeature(t)
        }, t.prototype.getFeatures_ = function () {
            var t;
            return this.features_ ? t = this.features_ : this.source_ && (t = this.source_.getFeatures()), t
        }, t.prototype.handleFeatureAdd_ = function (t) {
            var e;
            t instanceof Dh ? e = t.feature : t instanceof P && (e = t.element), this.addFeature(e)
        }, t.prototype.handleFeatureRemove_ = function (t) {
            var e;
            t instanceof Dh ? e = t.feature : t instanceof P && (e = t.element), this.removeFeature(e)
        }, t.prototype.handleFeatureChange_ = function (t) {
            var e = t.target;
            if (this.handlingDownUpSequence) {
                var i = Ct(e);
                i in this.pendingFeatures_ || (this.pendingFeatures_[i] = e)
            } else this.updateFeature_(e)
        }, t.prototype.removeFeature = function (e, t) {
            var i = void 0 === t || t, r = Ct(e), n = this.indexedFeaturesExtents_[r];
            if (n) {
                var o = this.rBush_, s = [];
                o.forEachInExtent(n, function (t) {
                    e === t.feature && s.push(t)
                });
                for (var a = s.length - 1; 0 <= a; --a) o.remove(s[a])
            }
            i && (g(this.featureChangeListenerKeys_[r]), delete this.featureChangeListenerKeys_[r])
        }, t.prototype.setMap = function (t) {
            var e = this.getMap(), i = this.featuresListenerKeys_, r = this.getFeatures_();
            e && (i.forEach(g), i.length = 0, r.forEach(this.forEachFeatureRemove_.bind(this))), n.prototype.setMap.call(this, t), t && (this.features_ ? i.push(C(this.features_, h, this.handleFeatureAdd_, this), C(this.features_, l, this.handleFeatureRemove_, this)) : this.source_ && i.push(C(this.source_, gh, this.handleFeatureAdd_, this), C(this.source_, mh, this.handleFeatureRemove_, this)), r.forEach(this.forEachFeatureAdd_.bind(this)))
        }, t.prototype.snapTo = function (t, e, i) {
            var r = A([i.getCoordinateFromPixel([t[0] - this.pixelTolerance_, t[1] + this.pixelTolerance_]), i.getCoordinateFromPixel([t[0] + this.pixelTolerance_, t[1] - this.pixelTolerance_])]),
                n = this.rBush_.getInExtent(r);
            this.vertex_ && !this.edge_ && (n = n.filter(function (t) {
                return t.feature.getGeometry().getType() !== Lt.CIRCLE
            }));
            var o, s, a, h, l = !1, u = null, c = null;
            if (0 < n.length) {
                this.pixelCoordinate_ = e, n.sort(this.sortByDistance_);
                var p = n[0].segment, d = n[0].feature.getGeometry().getType() === Lt.CIRCLE;
                this.vertex_ && !this.edge_ ? (o = i.getPixelFromCoordinate(p[0]), s = i.getPixelFromCoordinate(p[1]), a = fn(t, o), h = fn(t, s), Math.sqrt(Math.min(a, h)) <= this.pixelTolerance_ && (l = !0, u = h < a ? p[1] : p[0], c = i.getPixelFromCoordinate(u))) : this.edge_ && (u = d ? function (t, e) {
                    var i = e.getRadius(), r = e.getCenter(), n = r[0], o = r[1], s = t[0] - n, a = t[1] - o;
                    0 === s && 0 === a && (s = 1);
                    var h = Math.sqrt(s * s + a * a);
                    return [n + i * s / h, o + i * a / h]
                }(e, n[0].feature.getGeometry()) : hn(e, p), _n(t, c = i.getPixelFromCoordinate(u)) <= this.pixelTolerance_ && (l = !0, this.vertex_ && !d && (o = i.getPixelFromCoordinate(p[0]), s = i.getPixelFromCoordinate(p[1]), a = fn(c, o), h = fn(c, s), Math.sqrt(Math.min(a, h)) <= this.pixelTolerance_ && (u = h < a ? p[1] : p[0], c = i.getPixelFromCoordinate(u))))), l && (c = [Math.round(c[0]), Math.round(c[1])])
            }
            return {snapped: l, vertex: u, vertexPixel: c}
        }, t.prototype.updateFeature_ = function (t) {
            this.removeFeature(t, !1), this.addFeature(t, !1)
        }, t.prototype.writeCircleGeometry_ = function (t, e) {
            for (var i = en(e).getCoordinates()[0], r = 0, n = i.length - 1; r < n; ++r) {
                var o = i.slice(r, r + 2), s = {feature: t, segment: o};
                this.rBush_.insert(A(o), s)
            }
        }, t.prototype.writeGeometryCollectionGeometry_ = function (t, e) {
            for (var i = e.getGeometriesArray(), r = 0; r < i.length; ++r) {
                var n = this.SEGMENT_WRITERS_[i[r].getType()];
                n && n.call(this, t, i[r])
            }
        }, t.prototype.writeLineStringGeometry_ = function (t, e) {
            for (var i = e.getCoordinates(), r = 0, n = i.length - 1; r < n; ++r) {
                var o = i.slice(r, r + 2), s = {feature: t, segment: o};
                this.rBush_.insert(A(o), s)
            }
        }, t.prototype.writeMultiLineStringGeometry_ = function (t, e) {
            for (var i = e.getCoordinates(), r = 0, n = i.length; r < n; ++r) for (var o = i[r], s = 0, a = o.length - 1; s < a; ++s) {
                var h = o.slice(s, s + 2), l = {feature: t, segment: h};
                this.rBush_.insert(A(h), l)
            }
        }, t.prototype.writeMultiPointGeometry_ = function (t, e) {
            for (var i = e.getCoordinates(), r = 0, n = i.length; r < n; ++r) {
                var o = i[r], s = {feature: t, segment: [o, o]};
                this.rBush_.insert(e.getExtent(), s)
            }
        }, t.prototype.writeMultiPolygonGeometry_ = function (t, e) {
            for (var i = e.getCoordinates(), r = 0, n = i.length; r < n; ++r) for (var o = i[r], s = 0, a = o.length; s < a; ++s) for (var h = o[s], l = 0, u = h.length - 1; l < u; ++l) {
                var c = h.slice(l, l + 2), p = {feature: t, segment: c};
                this.rBush_.insert(A(c), p)
            }
        }, t.prototype.writePointGeometry_ = function (t, e) {
            var i = e.getCoordinates(), r = {feature: t, segment: [i, i]};
            this.rBush_.insert(e.getExtent(), r)
        }, t.prototype.writePolygonGeometry_ = function (t, e) {
            for (var i = e.getCoordinates(), r = 0, n = i.length; r < n; ++r) for (var o = i[r], s = 0, a = o.length - 1; s < a; ++s) {
                var h = o.slice(s, s + 2), l = {feature: t, segment: h};
                this.rBush_.insert(A(h), l)
            }
        }, t
    }(ha);

    function xl(t) {
        var e = this.snapTo(t.pixel, t.coordinate, t.map);
        return e.snapped && (t.coordinate = e.vertex.slice(0, 2), t.pixel = e.vertexPixel), ua.call(this, t)
    }

    function Sl(t) {
        var e = s(this.pendingFeatures_);
        return e.length && (e.forEach(this.updateFeature_.bind(this)), this.pendingFeatures_ = {}), !1
    }

    var El = {TRANSLATESTART: "translatestart", TRANSLATING: "translating", TRANSLATEEND: "translateend"},
        Cl = function (r) {
            function t(t, e, i) {
                r.call(this, t), this.features = e, this.coordinate = i
            }

            return r && (t.__proto__ = r), (t.prototype = Object.create(r && r.prototype)).constructor = t
        }(m), Tl = function (n) {
            function t(t) {
                n.call(this, {handleDownEvent: wl, handleDragEvent: Il, handleMoveEvent: Ll, handleUpEvent: Rl});
                var e, i = t || {};
                if (this.lastCoordinate_ = null, this.features_ = void 0 !== i.features ? i.features : null, i.layers) if ("function" == typeof i.layers) e = i.layers; else {
                    var r = i.layers;
                    e = function (t) {
                        return lr(r, t)
                    }
                } else e = y;
                this.layerFilter_ = e, this.hitTolerance_ = i.hitTolerance ? i.hitTolerance : 0, this.lastFeature_ = null, C(this, b(Gs), this.handleActiveChanged_, this)
            }

            return n && (t.__proto__ = n), ((t.prototype = Object.create(n && n.prototype)).constructor = t).prototype.featuresAtPixel_ = function (t, e) {
                return e.forEachFeatureAtPixel(t, function (t) {
                    if (!this.features_ || lr(this.features_.getArray(), t)) return t
                }.bind(this), {layerFilter: this.layerFilter_, hitTolerance: this.hitTolerance_})
            }, t.prototype.getHitTolerance = function () {
                return this.hitTolerance_
            }, t.prototype.setHitTolerance = function (t) {
                this.hitTolerance_ = t
            }, t.prototype.setMap = function (t) {
                var e = this.getMap();
                n.prototype.setMap.call(this, t), this.updateState_(e)
            }, t.prototype.handleActiveChanged_ = function () {
                this.updateState_(null)
            }, t.prototype.updateState_ = function (t) {
                var e = this.getMap(), i = this.getActive();
                e && i || (e = e || t) && e.getViewport().classList.remove("ol-grab", "ol-grabbing")
            }, t
        }(ha);

    function wl(t) {
        if (this.lastFeature_ = this.featuresAtPixel_(t.pixel, t.map), !this.lastCoordinate_ && this.lastFeature_) {
            this.lastCoordinate_ = t.coordinate, Ll.call(this, t);
            var e = this.features_ || new M([this.lastFeature_]);
            return this.dispatchEvent(new Cl(El.TRANSLATESTART, e, t.coordinate)), !0
        }
        return !1
    }

    function Rl(t) {
        if (this.lastCoordinate_) {
            this.lastCoordinate_ = null, Ll.call(this, t);
            var e = this.features_ || new M([this.lastFeature_]);
            return this.dispatchEvent(new Cl(El.TRANSLATEEND, e, t.coordinate)), !0
        }
        return !1
    }

    function Il(t) {
        if (this.lastCoordinate_) {
            var e = t.coordinate, i = e[0] - this.lastCoordinate_[0], r = e[1] - this.lastCoordinate_[1],
                n = this.features_ || new M([this.lastFeature_]);
            n.forEach(function (t) {
                var e = t.getGeometry();
                e.translate(i, r), t.setGeometry(e)
            }), this.lastCoordinate_ = e, this.dispatchEvent(new Cl(El.TRANSLATING, n, e))
        }
    }

    function Ll(t) {
        var e = t.map.getViewport();
        this.featuresAtPixel_(t.pixel, t.map) ? (e.classList.remove(this.lastCoordinate_ ? "ol-grab" : "ol-grabbing"), e.classList.add(this.lastCoordinate_ ? "ol-grabbing" : "ol-grab")) : e.classList.remove("ol-grab", "ol-grabbing")
    }

    function bl(t) {
        var e = t || {}, i = new M, r = new Hn(-.005, .05, 100);
        return (void 0 === e.altShiftDragRotate || e.altShiftDragRotate) && i.push(new ga), (void 0 === e.doubleClickZoom || e.doubleClickZoom) && i.push(new Xs({
            delta: e.zoomDelta,
            duration: e.zoomDuration
        })), (void 0 === e.dragPan || e.dragPan) && i.push(new pa({
            condition: e.onFocusOnly ? Ks : void 0,
            kinetic: r
        })), (void 0 === e.pinchRotate || e.pinchRotate) && i.push(new Da), (void 0 === e.pinchZoom || e.pinchZoom) && i.push(new Ba({
            constrainResolution: e.constrainResolution,
            duration: e.zoomDuration
        })), (void 0 === e.keyboard || e.keyboard) && (i.push(new Pa), i.push(new Oa({
            delta: e.zoomDelta,
            duration: e.zoomDuration
        }))), (void 0 === e.mouseWheelZoom || e.mouseWheelZoom) && i.push(new Ga({
            condition: e.onFocusOnly ? Ks : void 0,
            constrainResolution: e.constrainResolution,
            duration: e.zoomDuration
        })), (void 0 === e.shiftDragZoom || e.shiftDragZoom) && i.push(new La({duration: e.zoomDuration})), i
    }

    var Fl = function (s) {
        function t(t, e, i, r, n) {
            var o = void 0 !== n ? di.IDLE : di.LOADED;
            s.call(this, t, e, i, o), this.loader_ = void 0 !== n ? n : null, this.canvas_ = r, this.error_ = null
        }

        return s && (t.__proto__ = s), ((t.prototype = Object.create(s && s.prototype)).constructor = t).prototype.getError = function () {
            return this.error_
        }, t.prototype.handleLoad_ = function (t) {
            t ? (this.error_ = t, this.state = di.ERROR) : this.state = di.LOADED, this.changed()
        }, t.prototype.load = function () {
            this.state == di.IDLE && (this.state = di.LOADING, this.changed(), this.loader_(this.handleLoad_.bind(this)))
        }, t.prototype.getImage = function () {
            return this.canvas_
        }, t
    }(On), Pl = function (o) {
        function t(t, e, i, r, n) {
            o.call(this, t), this.vectorContext = e, this.frameState = i, this.context = r, this.glContext = n
        }

        return o && (t.__proto__ = o), (t.prototype = Object.create(o && o.prototype)).constructor = t
    }(m), Ml = function () {
    };
    Ml.prototype.drawCustom = function (t, e, i) {
    }, Ml.prototype.drawGeometry = function (t) {
    }, Ml.prototype.setStyle = function (t) {
    }, Ml.prototype.drawCircle = function (t, e) {
    }, Ml.prototype.drawFeature = function (t, e) {
    }, Ml.prototype.drawGeometryCollection = function (t, e) {
    }, Ml.prototype.drawLineString = function (t, e) {
    }, Ml.prototype.drawMultiLineString = function (t, e) {
    }, Ml.prototype.drawMultiPoint = function (t, e) {
    }, Ml.prototype.drawMultiPolygon = function (t, e) {
    }, Ml.prototype.drawPoint = function (t, e) {
    }, Ml.prototype.drawPolygon = function (t, e) {
    }, Ml.prototype.drawText = function (t, e) {
    }, Ml.prototype.setFillStrokeStyle = function (t, e) {
    }, Ml.prototype.setImageStyle = function (t, e) {
    }, Ml.prototype.setTextStyle = function (t, e) {
    };
    var Ol = function (o) {
        function t(t, e, i, r, n) {
            o.call(this), this.context_ = t, this.pixelRatio_ = e, this.extent_ = i, this.transform_ = r, this.viewRotation_ = n, this.contextFillState_ = null, this.contextStrokeState_ = null, this.contextTextState_ = null, this.fillState_ = null, this.strokeState_ = null, this.image_ = null, this.imageAnchorX_ = 0, this.imageAnchorY_ = 0, this.imageHeight_ = 0, this.imageOpacity_ = 0, this.imageOriginX_ = 0, this.imageOriginY_ = 0, this.imageRotateWithView_ = !1, this.imageRotation_ = 0, this.imageScale_ = 0, this.imageWidth_ = 0, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = !1, this.textRotation_ = 0, this.textScale_ = 0, this.textFillState_ = null, this.textStrokeState_ = null, this.textState_ = null, this.pixelCoordinates_ = [], this.tmpLocalTransform_ = [1, 0, 0, 1, 0, 0]
        }

        return o && (t.__proto__ = o), ((t.prototype = Object.create(o && o.prototype)).constructor = t).prototype.drawImages_ = function (t, e, i, r) {
            var n = this;
            if (this.image_) {
                var o = Rt(t, e, i, 2, this.transform_, this.pixelCoordinates_), s = this.context_,
                    a = this.tmpLocalTransform_, h = s.globalAlpha;
                1 != this.imageOpacity_ && (s.globalAlpha = h * this.imageOpacity_);
                var l = this.imageRotation_;
                this.imageRotateWithView_ && (l += this.viewRotation_);
                for (var u = 0, c = o.length; u < c; u += 2) {
                    var p = o[u] - n.imageAnchorX_, d = o[u + 1] - n.imageAnchorY_;
                    if (0 !== l || 1 != n.imageScale_) {
                        var f = p + n.imageAnchorX_, _ = d + n.imageAnchorY_;
                        Te(a, f, _, n.imageScale_, n.imageScale_, l, -f, -_), s.setTransform.apply(s, a)
                    }
                    s.drawImage(n.image_, n.imageOriginX_, n.imageOriginY_, n.imageWidth_, n.imageHeight_, p, d, n.imageWidth_, n.imageHeight_)
                }
                0 === l && 1 == this.imageScale_ || s.setTransform(1, 0, 0, 1, 0, 0), 1 != this.imageOpacity_ && (s.globalAlpha = h)
            }
        }, t.prototype.drawText_ = function (t, e, i, r) {
            var n = this;
            if (this.textState_ && "" !== this.text_) {
                this.textFillState_ && this.setContextFillState_(this.textFillState_), this.textStrokeState_ && this.setContextStrokeState_(this.textStrokeState_), this.setContextTextState_(this.textState_);
                var o = Rt(t, e, i, r, this.transform_, this.pixelCoordinates_), s = this.context_,
                    a = this.textRotation_;
                for (this.textRotateWithView_ && (a += this.viewRotation_); e < i; e += r) {
                    var h = o[e] + n.textOffsetX_, l = o[e + 1] + n.textOffsetY_;
                    if (0 !== a || 1 != n.textScale_) {
                        var u = Te(n.tmpLocalTransform_, h, l, n.textScale_, n.textScale_, a, -h, -l);
                        s.setTransform.apply(s, u)
                    }
                    n.textStrokeState_ && s.strokeText(n.text_, h, l), n.textFillState_ && s.fillText(n.text_, h, l)
                }
                0 === a && 1 == this.textScale_ || s.setTransform(1, 0, 0, 1, 0, 0)
            }
        }, t.prototype.moveToLineTo_ = function (t, e, i, r, n) {
            var o = this.context_, s = Rt(t, e, i, r, this.transform_, this.pixelCoordinates_);
            o.moveTo(s[0], s[1]);
            var a = s.length;
            n && (a -= 2);
            for (var h = 2; h < a; h += 2) o.lineTo(s[h], s[h + 1]);
            return n && o.closePath(), i
        }, t.prototype.drawRings_ = function (t, e, i, r) {
            for (var n = 0, o = i.length; n < o; ++n) e = this.moveToLineTo_(t, e, i[n], r, !0);
            return e
        }, t.prototype.drawCircle = function (t) {
            if (wt(this.extent_, t.getExtent())) {
                if (this.fillState_ || this.strokeState_) {
                    this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
                    var e = function (t, e, i) {
                            var r = t.getFlatCoordinates();
                            if (r) {
                                var n = t.getStride();
                                return Rt(r, 0, r.length, n, e, i)
                            }
                            return null
                        }(t, this.transform_, this.pixelCoordinates_), i = e[2] - e[0], r = e[3] - e[1],
                        n = Math.sqrt(i * i + r * r), o = this.context_;
                    o.beginPath(), o.arc(e[0], e[1], n, 0, 2 * Math.PI), this.fillState_ && o.fill(), this.strokeState_ && o.stroke()
                }
                "" !== this.text_ && this.drawText_(t.getCenter(), 0, 2, 2)
            }
        }, t.prototype.setStyle = function (t) {
            this.setFillStrokeStyle(t.getFill(), t.getStroke()), this.setImageStyle(t.getImage()), this.setTextStyle(t.getText())
        }, t.prototype.drawGeometry = function (t) {
            switch (t.getType()) {
                case Lt.POINT:
                    this.drawPoint(t);
                    break;
                case Lt.LINE_STRING:
                    this.drawLineString(t);
                    break;
                case Lt.POLYGON:
                    this.drawPolygon(t);
                    break;
                case Lt.MULTI_POINT:
                    this.drawMultiPoint(t);
                    break;
                case Lt.MULTI_LINE_STRING:
                    this.drawMultiLineString(t);
                    break;
                case Lt.MULTI_POLYGON:
                    this.drawMultiPolygon(t);
                    break;
                case Lt.GEOMETRY_COLLECTION:
                    this.drawGeometryCollection(t);
                    break;
                case Lt.CIRCLE:
                    this.drawCircle(t)
            }
        }, t.prototype.drawFeature = function (t, e) {
            var i = e.getGeometryFunction()(t);
            i && wt(this.extent_, i.getExtent()) && (this.setStyle(e), this.drawGeometry(i))
        }, t.prototype.drawGeometryCollection = function (t) {
            for (var e = t.getGeometriesArray(), i = 0, r = e.length; i < r; ++i) this.drawGeometry(e[i])
        }, t.prototype.drawPoint = function (t) {
            var e = t.getFlatCoordinates(), i = t.getStride();
            this.image_ && this.drawImages_(e, 0, e.length, i), "" !== this.text_ && this.drawText_(e, 0, e.length, i)
        }, t.prototype.drawMultiPoint = function (t) {
            var e = t.getFlatCoordinates(), i = t.getStride();
            this.image_ && this.drawImages_(e, 0, e.length, i), "" !== this.text_ && this.drawText_(e, 0, e.length, i)
        }, t.prototype.drawLineString = function (t) {
            if (wt(this.extent_, t.getExtent())) {
                if (this.strokeState_) {
                    this.setContextStrokeState_(this.strokeState_);
                    var e = this.context_, i = t.getFlatCoordinates();
                    e.beginPath(), this.moveToLineTo_(i, 0, i.length, t.getStride(), !1), e.stroke()
                }
                if ("" !== this.text_) {
                    var r = t.getFlatMidpoint();
                    this.drawText_(r, 0, 2, 2)
                }
            }
        }, t.prototype.drawMultiLineString = function (t) {
            var e = t.getExtent();
            if (wt(this.extent_, e)) {
                if (this.strokeState_) {
                    this.setContextStrokeState_(this.strokeState_);
                    var i = this.context_, r = t.getFlatCoordinates(), n = 0, o = t.getEnds(), s = t.getStride();
                    i.beginPath();
                    for (var a = 0, h = o.length; a < h; ++a) n = this.moveToLineTo_(r, n, o[a], s, !1);
                    i.stroke()
                }
                if ("" !== this.text_) {
                    var l = t.getFlatMidpoints();
                    this.drawText_(l, 0, l.length, 2)
                }
            }
        }, t.prototype.drawPolygon = function (t) {
            if (wt(this.extent_, t.getExtent())) {
                if (this.strokeState_ || this.fillState_) {
                    this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
                    var e = this.context_;
                    e.beginPath(), this.drawRings_(t.getOrientedFlatCoordinates(), 0, t.getEnds(), t.getStride()), this.fillState_ && e.fill(), this.strokeState_ && e.stroke()
                }
                if ("" !== this.text_) {
                    var i = t.getFlatInteriorPoint();
                    this.drawText_(i, 0, 2, 2)
                }
            }
        }, t.prototype.drawMultiPolygon = function (t) {
            if (wt(this.extent_, t.getExtent())) {
                if (this.strokeState_ || this.fillState_) {
                    this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
                    var e = this.context_, i = t.getOrientedFlatCoordinates(), r = 0, n = t.getEndss(),
                        o = t.getStride();
                    e.beginPath();
                    for (var s = 0, a = n.length; s < a; ++s) {
                        var h = n[s];
                        r = this.drawRings_(i, r, h, o)
                    }
                    this.fillState_ && e.fill(), this.strokeState_ && e.stroke()
                }
                if ("" !== this.text_) {
                    var l = t.getFlatInteriorPoints();
                    this.drawText_(l, 0, l.length, 2)
                }
            }
        }, t.prototype.setContextFillState_ = function (t) {
            var e = this.context_, i = this.contextFillState_;
            i ? i.fillStyle != t.fillStyle && (i.fillStyle = e.fillStyle = t.fillStyle) : (e.fillStyle = t.fillStyle, this.contextFillState_ = {fillStyle: t.fillStyle})
        }, t.prototype.setContextStrokeState_ = function (t) {
            var e = this.context_, i = this.contextStrokeState_;
            i ? (i.lineCap != t.lineCap && (i.lineCap = e.lineCap = t.lineCap), hi && (fr(i.lineDash, t.lineDash) || e.setLineDash(i.lineDash = t.lineDash), i.lineDashOffset != t.lineDashOffset && (i.lineDashOffset = e.lineDashOffset = t.lineDashOffset)), i.lineJoin != t.lineJoin && (i.lineJoin = e.lineJoin = t.lineJoin), i.lineWidth != t.lineWidth && (i.lineWidth = e.lineWidth = t.lineWidth), i.miterLimit != t.miterLimit && (i.miterLimit = e.miterLimit = t.miterLimit), i.strokeStyle != t.strokeStyle && (i.strokeStyle = e.strokeStyle = t.strokeStyle)) : (e.lineCap = t.lineCap, hi && (e.setLineDash(t.lineDash), e.lineDashOffset = t.lineDashOffset), e.lineJoin = t.lineJoin, e.lineWidth = t.lineWidth, e.miterLimit = t.miterLimit, e.strokeStyle = t.strokeStyle, this.contextStrokeState_ = {
                lineCap: t.lineCap,
                lineDash: t.lineDash,
                lineDashOffset: t.lineDashOffset,
                lineJoin: t.lineJoin,
                lineWidth: t.lineWidth,
                miterLimit: t.miterLimit,
                strokeStyle: t.strokeStyle
            })
        }, t.prototype.setContextTextState_ = function (t) {
            var e = this.context_, i = this.contextTextState_, r = t.textAlign ? t.textAlign : Ri;
            i ? (i.font != t.font && (i.font = e.font = t.font), i.textAlign != r && (i.textAlign = e.textAlign = r), i.textBaseline != t.textBaseline && (i.textBaseline = e.textBaseline = t.textBaseline)) : (e.font = t.font, e.textAlign = r, e.textBaseline = t.textBaseline, this.contextTextState_ = {
                font: t.font,
                textAlign: r,
                textBaseline: t.textBaseline
            })
        }, t.prototype.setFillStrokeStyle = function (t, e) {
            if (t) {
                var i = t.getColor();
                this.fillState_ = {fillStyle: ke(i || Si)}
            } else this.fillState_ = null;
            if (e) {
                var r = e.getColor(), n = e.getLineCap(), o = e.getLineDash(), s = e.getLineDashOffset(),
                    a = e.getLineJoin(), h = e.getWidth(), l = e.getMiterLimit();
                this.strokeState_ = {
                    lineCap: void 0 !== n ? n : Ei,
                    lineDash: o || Ci,
                    lineDashOffset: s || 0,
                    lineJoin: void 0 !== a ? a : Ti,
                    lineWidth: this.pixelRatio_ * (void 0 !== h ? h : 1),
                    miterLimit: void 0 !== l ? l : 10,
                    strokeStyle: ke(r || wi)
                }
            } else this.strokeState_ = null
        }, t.prototype.setImageStyle = function (t) {
            if (t) {
                var e = t.getAnchor(), i = t.getImage(1), r = t.getOrigin(), n = t.getSize();
                this.imageAnchorX_ = e[0], this.imageAnchorY_ = e[1], this.imageHeight_ = n[1], this.image_ = i, this.imageOpacity_ = t.getOpacity(), this.imageOriginX_ = r[0], this.imageOriginY_ = r[1], this.imageRotateWithView_ = t.getRotateWithView(), this.imageRotation_ = t.getRotation(), this.imageScale_ = t.getScale() * this.pixelRatio_, this.imageWidth_ = n[0]
            } else this.image_ = null
        }, t.prototype.setTextStyle = function (t) {
            if (t) {
                var e = t.getFill();
                if (e) {
                    var i = e.getColor();
                    this.textFillState_ = {fillStyle: ke(i || Si)}
                } else this.textFillState_ = null;
                var r = t.getStroke();
                if (r) {
                    var n = r.getColor(), o = r.getLineCap(), s = r.getLineDash(), a = r.getLineDashOffset(),
                        h = r.getLineJoin(), l = r.getWidth(), u = r.getMiterLimit();
                    this.textStrokeState_ = {
                        lineCap: void 0 !== o ? o : Ei,
                        lineDash: s || Ci,
                        lineDashOffset: a || 0,
                        lineJoin: void 0 !== h ? h : Ti,
                        lineWidth: void 0 !== l ? l : 1,
                        miterLimit: void 0 !== u ? u : 10,
                        strokeStyle: ke(n || wi)
                    }
                } else this.textStrokeState_ = null;
                var c = t.getFont(), p = t.getOffsetX(), d = t.getOffsetY(), f = t.getRotateWithView(),
                    _ = t.getRotation(), g = t.getScale(), y = t.getText(), v = t.getTextAlign(),
                    m = t.getTextBaseline();
                this.textState_ = {
                    font: void 0 !== c ? c : xi,
                    textAlign: void 0 !== v ? v : Ri,
                    textBaseline: void 0 !== m ? m : "middle"
                }, this.text_ = void 0 !== y ? y : "", this.textOffsetX_ = void 0 !== p ? this.pixelRatio_ * p : 0, this.textOffsetY_ = void 0 !== d ? this.pixelRatio_ * d : 0, this.textRotateWithView_ = void 0 !== f && f, this.textRotation_ = void 0 !== _ ? _ : 0, this.textScale_ = this.pixelRatio_ * (void 0 !== g ? g : 1)
            } else this.text_ = ""
        }, t
    }(Ml), Nl = function () {
        this.cache_ = {}, this.cacheSize_ = 0, this.maxCacheSize_ = 32
    };

    function Al(t, e, i) {
        return e + ":" + t + ":" + (i ? Fe(i) : "null")
    }

    Nl.prototype.clear = function () {
        this.cache_ = {}, this.cacheSize_ = 0
    }, Nl.prototype.expire = function () {
        if (this.cacheSize_ > this.maxCacheSize_) {
            var t = 0;
            for (var e in this.cache_) {
                var i = this.cache_[e];
                0 != (3 & t++) || i.hasListener() || (delete this.cache_[e], --this.cacheSize_)
            }
        }
    }, Nl.prototype.get = function (t, e, i) {
        var r = Al(t, e, i);
        return r in this.cache_ ? this.cache_[r] : null
    }, Nl.prototype.set = function (t, e, i, r) {
        var n = Al(t, e, i);
        this.cache_[n] = r, ++this.cacheSize_
    }, Nl.prototype.setSize = function (t) {
        this.maxCacheSize_ = t, this.expire()
    };
    var Gl = new Nl, kl = function (e) {
        function t(t) {
            e.call(this), this.map_ = t, this.layerRenderers_ = {}, this.layerRendererListeners_ = {}, this.layerRendererConstructors_ = []
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.registerLayerRenderers = function (t) {
            this.layerRendererConstructors_.push.apply(this.layerRendererConstructors_, t)
        }, t.prototype.getLayerRendererConstructors = function () {
            return this.layerRendererConstructors_
        }, t.prototype.calculateMatrices2D = function (t) {
            var e = t.viewState, i = t.coordinateToPixelTransform, r = t.pixelToCoordinateTransform;
            Te(i, t.size[0] / 2, t.size[1] / 2, 1 / e.resolution, -1 / e.resolution, -e.rotation, -e.center[0], -e.center[1]), we(me(r, i))
        }, t.prototype.removeLayerRenderers = function () {
            for (var t in this.layerRenderers_) this.removeLayerRendererByKey_(t).dispose()
        }, t.prototype.forEachFeatureAtCoordinate = function (t, n, e, o, s, i, r) {
            var a, h = n.viewState, l = h.resolution;

            function u(t, e) {
                var i = Ct(t).toString(), r = n.layerStates[Ct(e)].managed;
                if (!(i in n.skippedFeatureUids) || r) return o.call(s, t, r ? e : null)
            }

            var c = h.projection, p = t;
            if (c.canWrapX()) {
                var d = c.getExtent(), f = ct(d), _ = t[0];
                if (_ < d[0] || _ > d[2]) p = [_ + f * Math.ceil((d[0] - _) / f), t[1]]
            }
            var g, y = n.layerStatesArray;
            for (g = y.length - 1; 0 <= g; --g) {
                var v = y[g], m = v.layer;
                if (bs(v, l) && i.call(r, m)) {
                    var x = this.getLayerRenderer(m);
                    if (m.getSource() && (a = x.forEachFeatureAtCoordinate(m.getSource().getWrapX() ? p : t, n, e, u, s)), a) return a
                }
            }
        }, t.prototype.forEachLayerAtPixel = function (t, e, i, r, n, o, s) {
        }, t.prototype.hasFeatureAtCoordinate = function (t, e, i, r, n) {
            return void 0 !== this.forEachFeatureAtCoordinate(t, e, i, y, this, r, n)
        }, t.prototype.getLayerRenderer = function (t) {
            var e = Ct(t).toString();
            if (e in this.layerRenderers_) return this.layerRenderers_[e];
            for (var i, r = 0, n = this.layerRendererConstructors_.length; r < n; ++r) {
                var o = this.layerRendererConstructors_[r];
                if (o.handles(t)) {
                    i = o.create(this, t);
                    break
                }
            }
            if (!i) throw new Error("Unable to create renderer for layer: " + t.getType());
            return this.layerRenderers_[e] = i, this.layerRendererListeners_[e] = C(i, w.CHANGE, this.handleLayerRendererChange_, this), i
        }, t.prototype.getLayerRendererByKey = function (t) {
            return this.layerRenderers_[t]
        }, t.prototype.getLayerRenderers = function () {
            return this.layerRenderers_
        }, t.prototype.getMap = function () {
            return this.map_
        }, t.prototype.handleLayerRendererChange_ = function () {
            this.map_.render()
        }, t.prototype.removeLayerRendererByKey_ = function (t) {
            var e = this.layerRenderers_[t];
            return delete this.layerRenderers_[t], g(this.layerRendererListeners_[t]), delete this.layerRendererListeners_[t], e
        }, t.prototype.removeUnusedLayerRenderers_ = function (t, e) {
            for (var i in this.layerRenderers_) e && i in e.layerStates || this.removeLayerRendererByKey_(i).dispose()
        }, t.prototype.scheduleExpireIconCache = function (t) {
            t.postRenderFunctions.push(Dl)
        }, t.prototype.scheduleRemoveUnusedLayerRenderers = function (t) {
            for (var e in this.layerRenderers_) if (!(e in t.layerStates)) return void t.postRenderFunctions.push(this.removeUnusedLayerRenderers_.bind(this))
        }, t
    }(t);

    function Dl(t, e) {
        Gl.expire()
    }

    function jl(t, e) {
        return t.zIndex - e.zIndex
    }

    kl.prototype.renderFrame = L, kl.prototype.dispatchRenderEvent = L;
    var Ul = [], Yl = function (n) {
        function t(t) {
            n.call(this, t);
            var e = t.getViewport();
            this.context_ = De(), this.canvas_ = this.context_.canvas, this.canvas_.style.width = "100%", this.canvas_.style.height = "100%", this.canvas_.style.display = "block", this.canvas_.className = _i, e.insertBefore(this.canvas_, e.childNodes[0] || null), this.renderedVisible_ = !0, this.transform_ = [1, 0, 0, 1, 0, 0]
        }

        return n && (t.__proto__ = n), ((t.prototype = Object.create(n && n.prototype)).constructor = t).prototype.dispatchRenderEvent = function (t, e) {
            var i = this.getMap(), r = this.context_;
            if (i.hasListener(t)) {
                var n = e.extent, o = e.pixelRatio, s = e.viewState.rotation, a = this.getTransform(e),
                    h = new Ol(r, o, n, a, s), l = new Pl(t, h, e, r, null);
                i.dispatchEvent(l)
            }
        }, t.prototype.getTransform = function (t) {
            var e = t.viewState, i = this.canvas_.width / 2, r = this.canvas_.height / 2,
                n = t.pixelRatio / e.resolution, o = -n, s = -e.rotation, a = -e.center[0], h = -e.center[1];
            return Te(this.transform_, i, r, n, o, s, a, h)
        }, t.prototype.renderFrame = function (t) {
            if (t) {
                var e = this.context_, i = t.pixelRatio, r = Math.round(t.size[0] * i), n = Math.round(t.size[1] * i);
                this.canvas_.width != r || this.canvas_.height != n ? (this.canvas_.width = r, this.canvas_.height = n) : e.clearRect(0, 0, r, n);
                var o = t.viewState.rotation;
                this.calculateMatrices2D(t), this.dispatchRenderEvent(Tn, t);
                var s = t.layerStatesArray;
                _r(s, jl), o && (e.save(), Di(e, o, r / 2, n / 2));
                var a, h, l, u, c, p = t.viewState.resolution;
                for (a = 0, h = s.length; a < h; ++a) l = (c = s[a]).layer, u = this.getLayerRenderer(l), bs(c, p) && c.sourceState == ms && u.prepareFrame(t, c) && u.composeFrame(t, c, e);
                o && e.restore(), this.dispatchRenderEvent(Cn, t), this.renderedVisible_ || (this.canvas_.style.display = "", this.renderedVisible_ = !0), this.scheduleRemoveUnusedLayerRenderers(t), this.scheduleExpireIconCache(t)
            } else this.renderedVisible_ && (this.canvas_.style.display = "none", this.renderedVisible_ = !1)
        }, t.prototype.forEachLayerAtPixel = function (t, e, i, r, n, o, s) {
            var a, h, l = e.viewState.resolution, u = e.layerStatesArray, c = u.length,
                p = xe(e.pixelToCoordinateTransform, t.slice());
            for (h = c - 1; 0 <= h; --h) {
                var d = u[h], f = d.layer;
                if (bs(d, l) && o.call(s, f)) if (a = this.getLayerRenderer(f).forEachLayerAtCoordinate(p, e, i, r, n)) return a
            }
        }, t.prototype.registerLayerRenderers = function (t) {
            n.prototype.registerLayerRenderers.call(this, t);
            for (var e = 0, i = t.length; e < i; ++e) {
                var r = t[e];
                lr(Ul, r) || Ul.push(r)
            }
        }, t
    }(kl), Bl = function (e) {
        function t(t) {
            e.call(this), this.layer_ = t
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.createLoadedTileFinder = function (i, r, n) {
            return function (e, t) {
                return i.forEachLoadedTile(r, e, t, function (t) {
                    n[e] || (n[e] = {}), n[e][t.tileCoord.toString()] = t
                })
            }
        }, t.prototype.getLayer = function () {
            return this.layer_
        }, t.prototype.handleImageChange_ = function (t) {
            t.target.getState() === di.LOADED && this.renderIfReadyAndVisible()
        }, t.prototype.loadImage = function (t) {
            var e = t.getState();
            return e != di.LOADED && e != di.ERROR && C(t, w.CHANGE, this.handleImageChange_, this), e == di.IDLE && (t.load(), e = t.getState()), e == di.LOADED
        }, t.prototype.renderIfReadyAndVisible = function () {
            var t = this.getLayer();
            t.getVisible() && t.getSourceState() == ms && this.changed()
        }, t.prototype.scheduleExpireCache = function (t, e) {
            if (e.canExpireCache()) {
                var i = function (t, e, i) {
                    var r = Ct(t).toString();
                    r in i.usedTiles && t.expireCache(i.viewState.projection, i.usedTiles[r])
                }.bind(null, e);
                t.postRenderFunctions.push(i)
            }
        }, t.prototype.updateUsedTiles = function (t, e, i, r) {
            var n = Ct(e).toString(), o = i.toString();
            n in t ? o in t[n] ? t[n][o].extend(r) : t[n][o] = r : (t[n] = {}, t[n][o] = r)
        }, t.prototype.manageTilePyramid = function (t, e, i, r, n, o, s, a, h, l) {
            var u = Ct(e).toString();
            u in t.wantedTiles || (t.wantedTiles[u] = {});
            var c, p, d, f, _, g, y = t.wantedTiles[u], v = t.tileQueue;
            for (g = i.getMinZoom(); g <= s; ++g) for (p = i.getTileRangeForExtentAndZ(o, g, p), d = i.getResolution(g), f = p.minX; f <= p.maxX; ++f) for (_ = p.minY; _ <= p.maxY; ++_) s - g <= a ? ((c = e.getTile(g, f, _, r, n)).getState() == An && (y[c.getKey()] = !0, v.isKeyQueued(c.getKey()) || v.enqueue([c, u, i.getTileCoordCenter(c.tileCoord), d])), void 0 !== h && h.call(l, c)) : e.useTile(g, f, _, n)
        }, t
    }(S);
    Bl.prototype.forEachFeatureAtCoordinate = L, Bl.prototype.hasFeatureAtCoordinate = v;
    var Xl = function (e) {
        function t(t) {
            e.call(this, t), this.renderedResolution, this.transform_ = [1, 0, 0, 1, 0, 0]
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.clip = function (t, e, i) {
            var r = e.pixelRatio, n = e.size[0] * r, o = e.size[1] * r, s = e.viewState.rotation, a = lt(i), h = ut(i),
                l = nt(i), u = rt(i);
            xe(e.coordinateToPixelTransform, a), xe(e.coordinateToPixelTransform, h), xe(e.coordinateToPixelTransform, l), xe(e.coordinateToPixelTransform, u), t.save(), Di(t, -s, n / 2, o / 2), t.beginPath(), t.moveTo(a[0] * r, a[1] * r), t.lineTo(h[0] * r, h[1] * r), t.lineTo(l[0] * r, l[1] * r), t.lineTo(u[0] * r, u[1] * r), t.clip(), Di(t, s, n / 2, o / 2)
        }, t.prototype.dispatchComposeEvent_ = function (t, e, i, r) {
            var n = this.getLayer();
            if (n.hasListener(t)) {
                var o = i.size[0] * i.pixelRatio, s = i.size[1] * i.pixelRatio, a = i.viewState.rotation;
                Di(e, -a, o / 2, s / 2);
                var h = void 0 !== r ? r : this.getTransform(i, 0),
                    l = new Ol(e, i.pixelRatio, i.extent, h, i.viewState.rotation), u = new Pl(t, l, i, e, null);
                n.dispatchEvent(u), Di(e, a, o / 2, s / 2)
            }
        }, t.prototype.forEachLayerAtCoordinate = function (t, e, i, r, n) {
            return this.forEachFeatureAtCoordinate(t, e, i, y, this) ? r.call(n, this.getLayer(), null) : void 0
        }, t.prototype.postCompose = function (t, e, i, r) {
            this.dispatchComposeEvent_(Cn, t, e, r)
        }, t.prototype.preCompose = function (t, e, i) {
            this.dispatchComposeEvent_(Tn, t, e, i)
        }, t.prototype.dispatchRenderEvent = function (t, e, i) {
            this.dispatchComposeEvent_(wn, t, e, i)
        }, t.prototype.getTransform = function (t, e) {
            var i = t.viewState, r = t.pixelRatio, n = r * t.size[0] / 2, o = r * t.size[1] / 2, s = r / i.resolution,
                a = -s, h = -i.rotation, l = -i.center[0] + e, u = -i.center[1];
            return Te(this.transform_, n, o, s, a, h, l, u)
        }, t.prototype.composeFrame = function (t, e, i) {
        }, t.prototype.prepareFrame = function (t, e) {
        }, t
    }(Bl), zl = function (a) {
        function t(t) {
            a.call(this, t), this.coordinateToCanvasPixelTransform = [1, 0, 0, 1, 0, 0], this.hitCanvasContext_ = null
        }

        return a && (t.__proto__ = a), ((t.prototype = Object.create(a && a.prototype)).constructor = t).prototype.composeFrame = function (t, e, i) {
            this.preCompose(i, t);
            var r = this.getImage();
            if (r) {
                var n = e.extent, o = void 0 !== n && !Q(n, t.extent) && wt(n, t.extent);
                o && this.clip(i, t, n);
                var s = this.getImageTransform(), a = i.globalAlpha;
                i.globalAlpha = e.opacity;
                var h = s[4], l = s[5], u = r.width * s[0], c = r.height * s[3];
                i.drawImage(r, 0, 0, +r.width, +r.height, Math.round(h), Math.round(l), Math.round(u), Math.round(c)), i.globalAlpha = a, o && i.restore()
            }
            this.postCompose(i, t, e)
        }, t.prototype.getImage = function () {
        }, t.prototype.getImageTransform = function () {
        }, t.prototype.forEachFeatureAtCoordinate = function (t, e, i, r, n) {
            var o = this.getLayer(), s = o.getSource(), a = e.viewState.resolution, h = e.viewState.rotation,
                l = e.skippedFeatureUids;
            return s.forEachFeatureAtCoordinate(t, a, h, i, l, function (t) {
                return r.call(n, t, o)
            })
        }, t.prototype.forEachLayerAtCoordinate = function (t, e, i, r, n) {
            if (this.getImage()) {
                if (this.getLayer().getSource().forEachFeatureAtCoordinate !== L) return a.prototype.forEachLayerAtCoordinate.call(this, arguments);
                var o = xe(this.coordinateToCanvasPixelTransform, t.slice());
                dn(o, e.viewState.resolution / this.renderedResolution), this.hitCanvasContext_ || (this.hitCanvasContext_ = De(1, 1)), this.hitCanvasContext_.clearRect(0, 0, 1, 1), this.hitCanvasContext_.drawImage(this.getImage(), o[0], o[1], 1, 1, 0, 0, 1, 1);
                var s = this.hitCanvasContext_.getImageData(0, 0, 1, 1).data;
                return 0 < s[3] ? r.call(n, this.getLayer(), s) : void 0
            }
        }, t
    }(Xl), Vl = function (o) {
        function n(t) {
            if (o.call(this, t), this.image_ = null, this.imageTransform_ = [1, 0, 0, 1, 0, 0], this.skippedFeatures_ = [], this.vectorRenderer_ = null, t.getType() === sh.VECTOR) for (var e = 0, i = Ul.length; e < i; ++e) {
                var r = Ul[e];
                if (r !== n && r.handles(t)) {
                    this.vectorRenderer_ = new r(t);
                    break
                }
            }
        }

        return o && (n.__proto__ = o), ((n.prototype = Object.create(o && o.prototype)).constructor = n).prototype.disposeInternal = function () {
            this.vectorRenderer_ && this.vectorRenderer_.dispose(), o.prototype.disposeInternal.call(this)
        }, n.prototype.getImage = function () {
            return this.image_ ? this.image_.getImage() : null
        }, n.prototype.getImageTransform = function () {
            return this.imageTransform_
        }, n.prototype.prepareFrame = function (t, e) {
            var i, r = t.pixelRatio, n = t.size, o = t.viewState, s = o.center, a = o.resolution,
                h = this.getLayer().getSource(), l = t.viewHints, u = this.vectorRenderer_, c = t.extent;
            if (u || void 0 === e.extent || (c = ht(c, e.extent)), !l[is.ANIMATING] && !l[is.INTERACTING] && !pt(c)) {
                var p = o.projection, d = this.skippedFeatures_;
                if (u) {
                    var f = u.context,
                        _ = E({}, t, {size: [ct(c) / a, at(c) / a], viewState: E({}, t.viewState, {rotation: 0})}),
                        g = Object.keys(_.skippedFeatureUids).sort();
                    i = new Fl(c, a, r, f.canvas, function (t) {
                        !u.prepareFrame(_, e) || !u.replayGroupChanged && fr(d, g) || (f.canvas.width = _.size[0] * r, f.canvas.height = _.size[1] * r, u.compose(f, _, e), d = g, t())
                    })
                } else i = h.getImage(c, a, r, p);
                i && this.loadImage(i) && (this.image_ = i, this.skippedFeatures_ = d)
            }
            if (this.image_) {
                var y = (i = this.image_).getExtent(), v = i.getResolution(), m = i.getPixelRatio(),
                    x = r * v / (a * m),
                    S = Te(this.imageTransform_, r * n[0] / 2, r * n[1] / 2, x, x, 0, m * (y[0] - s[0]) / v, m * (s[1] - y[3]) / v);
                Te(this.coordinateToCanvasPixelTransform, r * n[0] / 2 - S[4], r * n[1] / 2 - S[5], r / a, -r / a, 0, -s[0], -s[1]), this.renderedResolution = v * r / m
            }
            return !!this.image_
        }, n.prototype.forEachFeatureAtCoordinate = function (t, e, i, r, n) {
            return this.vectorRenderer_ ? this.vectorRenderer_.forEachFeatureAtCoordinate(t, e, i, r, n) : o.prototype.forEachFeatureAtCoordinate.call(this, t, e, i, r, n)
        }, n
    }(zl);
    Vl.handles = function (t) {
        return t.getType() === sh.IMAGE || t.getType() === sh.VECTOR && t.getRenderMode() === ah
    }, Vl.create = function (t, e) {
        return new Vl(e)
    };
    var Wl = function (t, e, i, r) {
        this.minX = t, this.maxX = e, this.minY = i, this.maxY = r
    };

    function Kl(t, e, i, r, n) {
        return void 0 !== n ? (n.minX = t, n.maxX = e, n.minY = i, n.maxY = r, n) : new Wl(t, e, i, r)
    }

    Wl.prototype.contains = function (t) {
        return this.containsXY(t[1], t[2])
    }, Wl.prototype.containsTileRange = function (t) {
        return this.minX <= t.minX && t.maxX <= this.maxX && this.minY <= t.minY && t.maxY <= this.maxY
    }, Wl.prototype.containsXY = function (t, e) {
        return this.minX <= t && t <= this.maxX && this.minY <= e && e <= this.maxY
    }, Wl.prototype.equals = function (t) {
        return this.minX == t.minX && this.minY == t.minY && this.maxX == t.maxX && this.maxY == t.maxY
    }, Wl.prototype.extend = function (t) {
        t.minX < this.minX && (this.minX = t.minX), t.maxX > this.maxX && (this.maxX = t.maxX), t.minY < this.minY && (this.minY = t.minY), t.maxY > this.maxY && (this.maxY = t.maxY)
    }, Wl.prototype.getHeight = function () {
        return this.maxY - this.minY + 1
    }, Wl.prototype.getSize = function () {
        return [this.getWidth(), this.getHeight()]
    }, Wl.prototype.getWidth = function () {
        return this.maxX - this.minX + 1
    }, Wl.prototype.intersects = function (t) {
        return this.minX <= t.maxX && this.maxX >= t.minX && this.minY <= t.maxY && this.maxY >= t.minY
    };
    var Hl = function (i) {
        function t(t, e) {
            i.call(this, t), this.context = e ? null : De(), this.oversampling_, this.renderedExtent_ = null, this.renderedRevision, this.renderedTiles = [], this.newTiles_ = !1, this.tmpExtent = [1 / 0, 1 / 0, -1 / 0, -1 / 0], this.tmpTileRange_ = new Wl(0, 0, 0, 0), this.imageTransform_ = [1, 0, 0, 1, 0, 0], this.zDirection = 0
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.isDrawableTile_ = function (t) {
            var e = t.getState(), i = this.getLayer().getUseInterimTilesOnError();
            return e == kn || e == jn || e == Dn && !i
        }, t.prototype.getTile = function (t, e, i, r, n) {
            var o = this.getLayer(), s = o.getSource().getTile(t, e, i, r, n);
            return s.getState() == Dn && (o.getUseInterimTilesOnError() ? 0 < o.getPreload() && (this.newTiles_ = !0) : s.setState(kn)), this.isDrawableTile_(s) || (s = s.getInterimTile()), s
        }, t.prototype.prepareFrame = function (t, e) {
            var i = t.pixelRatio, r = t.size, n = t.viewState, o = n.projection, s = n.resolution, a = n.center,
                h = this.getLayer(), l = h.getSource(), u = l.getRevision(), c = l.getTileGridForProjection(o),
                p = c.getZForResolution(s, this.zDirection), d = c.getResolution(p), f = Math.round(s / d) || 1,
                _ = t.extent;
            if (void 0 !== e.extent && (_ = ht(_, e.extent)), pt(_)) return !1;
            var g = c.getTileRangeForExtentAndZ(_, p), y = c.getTileRangeExtent(p, g), v = l.getTilePixelRatio(i),
                m = {};
            m[p] = {};
            var x, S, E, C = this.createLoadedTileFinder(l, o, m), T = t.viewHints,
                w = T[is.ANIMATING] || T[is.INTERACTING], R = this.tmpExtent, I = this.tmpTileRange_;
            for (this.newTiles_ = !1, S = g.minX; S <= g.maxX; ++S) for (E = g.minY; E <= g.maxY; ++E) if (!(16 < Date.now() - t.time && w)) {
                if (x = this.getTile(p, S, E, i, o), this.isDrawableTile_(x)) {
                    var L = Ct(this);
                    if (x.getState() == kn) {
                        var b = (m[p][x.tileCoord.toString()] = x).inTransition(L);
                        this.newTiles_ || !b && -1 !== this.renderedTiles.indexOf(x) || (this.newTiles_ = !0)
                    }
                    if (1 === x.getAlpha(L, t.time)) continue
                }
                var F = c.getTileCoordChildTileRange(x.tileCoord, I, R), P = !1;
                F && (P = C(p + 1, F)), P || c.forEachTileCoordParentTileRange(x.tileCoord, C, null, I, R)
            }
            var M = d * i / v * f;
            if (!(this.renderedResolution && 16 < Date.now() - t.time && w) && (this.newTiles_ || !this.renderedExtent_ || !Q(this.renderedExtent_, _) || this.renderedRevision != u || f != this.oversampling_ || !w && M != this.renderedResolution)) {
                var O = this.context;
                if (O) {
                    var N = l.getTilePixelSize(p, i, o), A = Math.round(g.getWidth() * N[0] / f),
                        G = Math.round(g.getHeight() * N[1] / f), k = O.canvas;
                    k.width != A || k.height != G ? (this.oversampling_ = f, k.width = A, k.height = G) : (this.renderedExtent_ && !$(y, this.renderedExtent_) && O.clearRect(0, 0, A, G), f = this.oversampling_)
                }
                this.renderedTiles.length = 0;
                var D, j, U, Y, B, X, z, V, W, K, H = Object.keys(m).map(Number);
                for (H.sort(function (t, e) {
                    return t === p ? 1 : e === p ? -1 : e < t ? 1 : t < e ? -1 : 0
                }), Y = 0, B = H.length; Y < B; ++Y) for (var Z in U = H[Y], j = l.getTilePixelSize(U, i, o), D = c.getResolution(U) / d, z = v * l.getGutterForProjection(o), V = m[U]) x = V[Z], S = ((X = c.getTileCoordExtent(x.getTileCoord(), R))[0] - y[0]) / d * v / f, E = (y[3] - X[3]) / d * v / f, W = j[0] * D / f, K = j[1] * D / f, this.drawTileImage(x, t, e, S, E, W, K, z, p === U), this.renderedTiles.push(x);
                this.renderedRevision = u, this.renderedResolution = d * i / v * f, this.renderedExtent_ = y
            }
            var q = this.renderedResolution / s,
                J = Te(this.imageTransform_, i * r[0] / 2, i * r[1] / 2, q, q, 0, (this.renderedExtent_[0] - a[0]) / this.renderedResolution * i, (a[1] - this.renderedExtent_[3]) / this.renderedResolution * i);
            return Te(this.coordinateToCanvasPixelTransform, i * r[0] / 2 - J[4], i * r[1] / 2 - J[5], i / s, -i / s, 0, -a[0], -a[1]), this.updateUsedTiles(t.usedTiles, l, p, g), this.manageTilePyramid(t, l, c, i, o, _, p, h.getPreload()), this.scheduleExpireCache(t, l), 0 < this.renderedTiles.length
        }, t.prototype.drawTileImage = function (t, e, i, r, n, o, s, a, h) {
            var l = t.getImage(this.getLayer());
            if (l) {
                var u = Ct(this), c = h ? t.getAlpha(u, e.time) : 1;
                1 !== c || this.getLayer().getSource().getOpaque(e.viewState.projection) || this.context.clearRect(r, n, o, s);
                var p = c !== this.context.globalAlpha;
                p && (this.context.save(), this.context.globalAlpha = c), this.context.drawImage(l, a, a, l.width - 2 * a, l.height - 2 * a, r, n, o, s), p && this.context.restore(), 1 !== c ? e.animate = !0 : h && t.endTransition(u)
            }
        }, t.prototype.getImage = function () {
            var t = this.context;
            return t ? t.canvas : null
        }, t.prototype.getImageTransform = function () {
            return this.imageTransform_
        }, t
    }(zl);
    Hl.handles = function (t) {
        return t.getType() === sh.TILE
    }, Hl.create = function (t, e) {
        return new Hl(e)
    }, Hl.prototype.getLayer;
    var Zl = function () {
    };
    Zl.prototype.getReplay = function (t, e) {
    }, Zl.prototype.isEmpty = function () {
    };
    var ql = {
        CIRCLE: "Circle",
        DEFAULT: "Default",
        IMAGE: "Image",
        LINE_STRING: "LineString",
        POLYGON: "Polygon",
        TEXT: "Text"
    };

    function Jl(t, e, i, r, n, o, s, a) {
        for (var h, l, u, c = [], p = t[e] > t[i - r], d = n.length, f = t[e], _ = t[e + 1], g = t[e += r], y = t[e + 1], v = 0, m = Math.sqrt(Math.pow(g - f, 2) + Math.pow(y - _, 2)), x = "", S = 0, E = 0; E < d; ++E) {
            l = p ? d - E - 1 : E;
            var C = n.charAt(l), T = o(x = p ? C + x : x + C) - S;
            S += T;
            for (var w = s + T / 2; e < i - r && v + m < w;) f = g, _ = y, g = t[e += r], y = t[e + 1], v += m, m = Math.sqrt(Math.pow(g - f, 2) + Math.pow(y - _, 2));
            var R = w - v, I = Math.atan2(y - _, g - f);
            if (p && (I += 0 < I ? -Math.PI : Math.PI), void 0 !== u) {
                var L = I - u;
                if (L += L > Math.PI ? -2 * Math.PI : L < -Math.PI ? 2 * Math.PI : 0, Math.abs(L) > a) return null
            }
            var b = R / m, F = It(f, g, b), P = It(_, y, b);
            u == I ? (p && (h[0] = F, h[1] = P, h[2] = T / 2), h[4] = x) : (h = [F, P, (S = T) / 2, I, x = C], p ? c.unshift(h) : c.push(h), u = I), s += T
        }
        return c
    }

    var Ql = 0, $l = 1, tu = 2, eu = 3, iu = 4, ru = 5, nu = 6, ou = 7, su = 8, au = 9, hu = 10, lu = 11, uu = 12,
        cu = [su], pu = [uu], du = [$l], fu = [eu],
        _u = [ql.POLYGON, ql.CIRCLE, ql.LINE_STRING, ql.IMAGE, ql.TEXT, ql.DEFAULT], gu = {
            left: 0,
            end: 0,
            center: .5,
            right: 1,
            start: 1,
            top: 0,
            middle: .5,
            hanging: .2,
            alphabetic: .8,
            ideographic: .8,
            bottom: 1
        }, yu = [1 / 0, 1 / 0, -1 / 0, -1 / 0], vu = [1, 0, 0, 1, 0, 0], mu = function (s) {
            function t(t, e, i, r, n, o) {
                s.call(this), this.declutterTree = o, this.tolerance = t, this.maxExtent = e, this.overlaps = n, this.pixelRatio = r, this.maxLineWidth = 0, this.resolution = i, this.alignFill_, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_ = null, this.bufferedMaxExtent_ = null, this.instructions = [], this.coordinates = [], this.coordinateCache_ = {}, this.renderedTransform_ = [1, 0, 0, 1, 0, 0], this.hitDetectionInstructions = [], this.pixelCoordinates_ = null, this.state = {}, this.viewRotation_ = 0
            }

            return s && (t.__proto__ = s), ((t.prototype = Object.create(s && s.prototype)).constructor = t).prototype.replayTextBackground_ = function (t, e, i, r, n, o, s) {
                t.beginPath(), t.moveTo.apply(t, e), t.lineTo.apply(t, i), t.lineTo.apply(t, r), t.lineTo.apply(t, n), t.lineTo.apply(t, e), o && (this.alignFill_ = o[2], this.fill_(t)), s && (this.setStrokeStyle_(t, s), t.stroke())
            }, t.prototype.replayImage_ = function (t, e, i, r, n, o, s, a, h, l, u, c, p, d, f, _, g, y) {
                var v = g || y;
                e -= n *= p, i -= o *= p;
                var m, x, S, E, C = f + l > r.width ? r.width - l : f, T = a + u > r.height ? r.height - u : a,
                    w = _[3] + C * p + _[1], R = _[0] + T * p + _[2], I = e - _[3], L = i - _[0];
                (v || 0 !== c) && (m = [I, L], x = [I + w, L], S = [I + w, L + R], E = [I, L + R]);
                var b = null;
                if (0 !== c) {
                    var F = e + n, P = i + o;
                    b = Te(vu, F, P, 1, 1, c, -F, -P), z(yu), q(yu, xe(vu, m)), q(yu, xe(vu, x)), q(yu, xe(vu, S)), q(yu, xe(vu, E))
                } else X(I, L, I + w, L + R, yu);
                var M = t.canvas, O = y ? y[2] * p / 2 : 0,
                    N = yu[0] - O <= M.width && 0 <= yu[2] + O && yu[1] - O <= M.height && 0 <= yu[3] + O;
                if (d && (e = Math.round(e), i = Math.round(i)), s) {
                    if (!N && 1 == s[4]) return;
                    H(s, yu);
                    var A = N ? [t, b ? b.slice(0) : null, h, r, l, u, C, T, e, i, p] : null;
                    A && v && A.push(g, y, m, x, S, E), s.push(A)
                } else N && (v && this.replayTextBackground_(t, m, x, S, E, g, y), Ui(t, b, h, r, l, u, C, T, e, i, p))
            }, t.prototype.applyPixelRatio = function (t) {
                var e = this.pixelRatio;
                return 1 == e ? t : t.map(function (t) {
                    return t * e
                })
            }, t.prototype.appendFlatCoordinates = function (t, e, i, r, n, o) {
                var s = this.coordinates.length, a = this.getBufferedMaxExtent();
                o && (e += r);
                var h, l, u, c = [t[e], t[e + 1]], p = [NaN, NaN], d = !0;
                for (h = e + r; h < i; h += r) p[0] = t[h], p[1] = t[h + 1], (u = Y(a, p)) !== l ? (d && (this.coordinates[s++] = c[0], this.coordinates[s++] = c[1]), this.coordinates[s++] = p[0], this.coordinates[s++] = p[1], d = !1) : u === N.INTERSECTING ? (this.coordinates[s++] = p[0], this.coordinates[s++] = p[1], d = !1) : d = !0, c[0] = p[0], c[1] = p[1], l = u;
                return (n && d || h === e + r) && (this.coordinates[s++] = c[0], this.coordinates[s++] = c[1]), s
            }, t.prototype.drawCustomCoordinates_ = function (t, e, i, r, n) {
                for (var o = 0, s = i.length; o < s; ++o) {
                    var a = i[o], h = this.appendFlatCoordinates(t, e, a, r, !1, !1);
                    n.push(h), e = a
                }
                return e
            }, t.prototype.drawCustom = function (t, e, i) {
                this.beginGeometry(t, e);
                var r, n, o, s, a, h = t.getType(), l = t.getStride(), u = this.coordinates.length;
                if (h == Lt.MULTI_POLYGON) {
                    r = (t = t).getOrientedFlatCoordinates(), s = [];
                    for (var c = t.getEndss(), p = a = 0, d = c.length; p < d; ++p) {
                        var f = [];
                        a = this.drawCustomCoordinates_(r, a, c[p], l, f), s.push(f)
                    }
                    this.instructions.push([iu, u, s, t, i, Mr])
                } else h == Lt.POLYGON || h == Lt.MULTI_LINE_STRING ? (o = [], r = h == Lt.POLYGON ? t.getOrientedFlatCoordinates() : t.getFlatCoordinates(), a = this.drawCustomCoordinates_(r, 0, t.getEnds(), l, o), this.instructions.push([iu, u, o, t, i, Pr])) : h == Lt.LINE_STRING || h == Lt.MULTI_POINT ? (r = t.getFlatCoordinates(), n = this.appendFlatCoordinates(r, 0, r.length, l, !1, !1), this.instructions.push([iu, u, n, t, i, Fr])) : h == Lt.POINT && (r = t.getFlatCoordinates(), this.coordinates.push(r[0], r[1]), n = this.coordinates.length, this.instructions.push([iu, u, n, t, i]));
                this.endGeometry(t, e)
            }, t.prototype.beginGeometry = function (t, e) {
                this.beginGeometryInstruction1_ = [Ql, e, 0], this.instructions.push(this.beginGeometryInstruction1_), this.beginGeometryInstruction2_ = [Ql, e, 0], this.hitDetectionInstructions.push(this.beginGeometryInstruction2_)
            }, t.prototype.fill_ = function (t) {
                if (this.alignFill_) {
                    var e = xe(this.renderedTransform_, [0, 0]), i = 512 * this.pixelRatio;
                    t.translate(e[0] % i, e[1] % i), t.rotate(this.viewRotation_)
                }
                t.fill(), this.alignFill_ && t.setTransform.apply(t, ji)
            }, t.prototype.setStrokeStyle_ = function (t, e) {
                t.strokeStyle = e[1], t.lineWidth = e[2], t.lineCap = e[3], t.lineJoin = e[4], t.miterLimit = e[5], hi && (t.lineDashOffset = e[7], t.setLineDash(e[6]))
            }, t.prototype.renderDeclutter_ = function (t, e) {
                if (t && 5 < t.length) {
                    var i = t[4];
                    if (1 == i || i == t.length - 5) {
                        var r = {minX: t[0], minY: t[1], maxX: t[2], maxY: t[3], value: e};
                        if (!this.declutterTree.collides(r)) {
                            this.declutterTree.insert(r);
                            for (var n = 5, o = t.length; n < o; ++n) {
                                var s = t[n];
                                s && (11 < s.length && this.replayTextBackground_(s[0], s[13], s[14], s[15], s[16], s[11], s[12]), Ui.apply(void 0, s))
                            }
                        }
                        t.length = 5, z(t)
                    }
                }
            }, t.prototype.replay_ = function (t, e, i, r, n, o, s) {
                var a, h = this;
                this.pixelCoordinates_ && fr(e, this.renderedTransform_) ? a = this.pixelCoordinates_ : (this.pixelCoordinates_ || (this.pixelCoordinates_ = []), a = Rt(this.coordinates, 0, this.coordinates.length, 2, e, this.pixelCoordinates_), me(this.renderedTransform_, e));
                for (var l, u, c, p, d, f, _, g, y, v, m, x, S = !Tt(i), E = 0, C = r.length, T = 0, w = 0, R = 0, I = null, L = null, b = this.coordinateCache_, F = this.viewRotation_, P = {
                    context: t,
                    pixelRatio: this.pixelRatio,
                    resolution: this.resolution,
                    rotation: F
                }, M = this.instructions != r || this.overlaps ? 0 : 200; E < C;) {
                    var O = r[E];
                    switch (O[0]) {
                        case Ql:
                            v = O[1], S && i[Ct(v).toString()] || !v.getGeometry() ? E = O[2] : void 0 === s || wt(s, v.getGeometry().getExtent()) ? ++E : E = O[2] + 1;
                            break;
                        case $l:
                            M < w && (h.fill_(t), w = 0), M < R && (t.stroke(), R = 0), w || R || (t.beginPath(), p = d = NaN), ++E;
                            break;
                        case tu:
                            var N = a[T = O[1]], A = a[T + 1], G = a[T + 2] - N, k = a[T + 3] - A,
                                D = Math.sqrt(G * G + k * k);
                            t.moveTo(N + D, A), t.arc(N, A, D, 0, 2 * Math.PI, !0), ++E;
                            break;
                        case eu:
                            t.closePath(), ++E;
                            break;
                        case iu:
                            T = O[1], l = O[2];
                            var j = O[3], U = O[4], Y = 6 == O.length ? O[5] : void 0;
                            P.geometry = j, P.feature = v, E in b || (b[E] = []);
                            var B = b[E];
                            Y ? Y(a, T, l, 2, B) : (B[0] = a[T], B[1] = a[T + 1], B.length = 2), U(B, P), ++E;
                            break;
                        case nu:
                            T = O[1], l = O[2], y = O[3], u = O[4], c = O[5], g = o ? null : O[6];
                            var X = O[7], z = O[8], V = O[9], W = O[10], K = O[11], H = O[12], Z = O[13], q = O[14],
                                J = void 0, Q = void 0, $ = void 0;
                            for (16 < O.length ? (J = O[15], Q = O[16], $ = O[17]) : (J = Ii, Q = $ = !1), K && (H += F); T < l; T += 2) h.replayImage_(t, a[T], a[T + 1], y, u, c, g, X, z, V, W, H, Z, n, q, J, Q ? I : null, $ ? L : null);
                            h.renderDeclutter_(g, v), ++E;
                            break;
                        case ru:
                            var tt = O[1], et = O[2], it = O[3];
                            g = o ? null : O[4];
                            var rt = O[5], nt = O[6], ot = O[7], st = O[8], at = O[9], ht = O[10], lt = O[11], ut = O[12],
                                ct = O[13], pt = O[14], dt = xn(a, tt, et, 2), ft = st(ut);
                            if (rt || ft <= dt) {
                                var _t = h.textStates[ct].textAlign, gt = Jl(a, tt, et, 2, ut, st, (dt - ft) * gu[_t], ot);
                                if (gt) {
                                    var yt = void 0, vt = void 0, mt = void 0, xt = void 0, St = void 0;
                                    if (ht) for (yt = 0, vt = gt.length; yt < vt; ++yt) mt = (St = gt[yt])[4], xt = h.getImage(mt, ct, "", ht), u = St[2] + lt, c = it * xt.height + 2 * (.5 - it) * lt - at, h.replayImage_(t, St[0], St[1], xt, u, c, g, xt.height, 1, 0, 0, St[3], pt, !1, xt.width, Ii, null, null);
                                    if (nt) for (yt = 0, vt = gt.length; yt < vt; ++yt) mt = (St = gt[yt])[4], xt = h.getImage(mt, ct, nt, ""), u = St[2], c = it * xt.height - at, h.replayImage_(t, St[0], St[1], xt, u, c, g, xt.height, 1, 0, 0, St[3], pt, !1, xt.width, Ii, null, null)
                                }
                            }
                            h.renderDeclutter_(g, v), ++E;
                            break;
                        case ou:
                            if (void 0 !== o) {
                                var Et = o(v = O[1]);
                                if (Et) return Et
                            }
                            ++E;
                            break;
                        case su:
                            M ? w++ : h.fill_(t), ++E;
                            break;
                        case au:
                            for (T = O[1], l = O[2], m = a[T], _ = (x = a[T + 1]) + .5 | 0, (f = m + .5 | 0) === p && _ === d || (t.moveTo(m, x), p = f, d = _), T += 2; T < l; T += 2) f = (m = a[T]) + .5 | 0, _ = (x = a[T + 1]) + .5 | 0, T != l - 2 && f === p && _ === d || (t.lineTo(m, x), p = f, d = _);
                            ++E;
                            break;
                        case hu:
                            I = O, h.alignFill_ = O[2], w && (h.fill_(t), w = 0, R && (t.stroke(), R = 0)), t.fillStyle = O[1], ++E;
                            break;
                        case lu:
                            L = O, R && (t.stroke(), R = 0), h.setStrokeStyle_(t, O), ++E;
                            break;
                        case uu:
                            M ? R++ : t.stroke(), ++E;
                            break;
                        default:
                            ++E
                    }
                }
                w && this.fill_(t), R && t.stroke()
            }, t.prototype.replay = function (t, e, i, r, n) {
                this.viewRotation_ = i, this.replay_(t, e, r, this.instructions, n, void 0, void 0)
            }, t.prototype.replayHitDetection = function (t, e, i, r, n, o) {
                return this.viewRotation_ = i, this.replay_(t, e, r, this.hitDetectionInstructions, !0, n, o)
            }, t.prototype.reverseHitDetectionInstructions = function () {
                var t, e = this.hitDetectionInstructions;
                e.reverse();
                var i, r, n = e.length, o = -1;
                for (t = 0; t < n; ++t) (r = (i = e[t])[0]) == ou ? o = t : r == Ql && (i[2] = t, cr(this.hitDetectionInstructions, o, t), o = -1)
            }, t.prototype.setFillStrokeStyle = function (t, e) {
                var i = this.state;
                if (t) {
                    var r = t.getColor();
                    i.fillStyle = ke(r || Si)
                } else i.fillStyle = void 0;
                if (e) {
                    var n = e.getColor();
                    i.strokeStyle = ke(n || wi);
                    var o = e.getLineCap();
                    i.lineCap = void 0 !== o ? o : Ei;
                    var s = e.getLineDash();
                    i.lineDash = s ? s.slice() : Ci;
                    var a = e.getLineDashOffset();
                    i.lineDashOffset = a || 0;
                    var h = e.getLineJoin();
                    i.lineJoin = void 0 !== h ? h : Ti;
                    var l = e.getWidth();
                    i.lineWidth = void 0 !== l ? l : 1;
                    var u = e.getMiterLimit();
                    i.miterLimit = void 0 !== u ? u : 10, i.lineWidth > this.maxLineWidth && (this.maxLineWidth = i.lineWidth, this.bufferedMaxExtent_ = null)
                } else i.strokeStyle = void 0, i.lineCap = void 0, i.lineDash = null, i.lineDashOffset = void 0, i.lineJoin = void 0, i.lineWidth = void 0, i.miterLimit = void 0
            }, t.prototype.createFill = function (t, e) {
                var i = t.fillStyle, r = [hu, i];
                return "string" != typeof i && r.push(!0), r
            }, t.prototype.applyStroke = function (t) {
                this.instructions.push(this.createStroke(t))
            }, t.prototype.createStroke = function (t) {
                return [lu, t.strokeStyle, t.lineWidth * this.pixelRatio, t.lineCap, t.lineJoin, t.miterLimit, this.applyPixelRatio(t.lineDash), t.lineDashOffset * this.pixelRatio]
            }, t.prototype.updateFillStyle = function (t, e, i) {
                var r = t.fillStyle;
                "string" == typeof r && t.currentFillStyle == r || (void 0 !== r && this.instructions.push(e.call(this, t, i)), t.currentFillStyle = r)
            }, t.prototype.updateStrokeStyle = function (t, e) {
                var i = t.strokeStyle, r = t.lineCap, n = t.lineDash, o = t.lineDashOffset, s = t.lineJoin, a = t.lineWidth,
                    h = t.miterLimit;
                (t.currentStrokeStyle != i || t.currentLineCap != r || n != t.currentLineDash && !fr(t.currentLineDash, n) || t.currentLineDashOffset != o || t.currentLineJoin != s || t.currentLineWidth != a || t.currentMiterLimit != h) && (void 0 !== i && e.call(this, t), t.currentStrokeStyle = i, t.currentLineCap = r, t.currentLineDash = n, t.currentLineDashOffset = o, t.currentLineJoin = s, t.currentLineWidth = a, t.currentMiterLimit = h)
            }, t.prototype.endGeometry = function (t, e) {
                this.beginGeometryInstruction1_[2] = this.instructions.length, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length, this.beginGeometryInstruction2_ = null;
                var i = [ou, e];
                this.instructions.push(i), this.hitDetectionInstructions.push(i)
            }, t.prototype.getBufferedMaxExtent = function () {
                if (!this.bufferedMaxExtent_ && (this.bufferedMaxExtent_ = k(this.maxExtent), 0 < this.maxLineWidth)) {
                    var t = this.resolution * (this.maxLineWidth + 1) / 2;
                    G(this.bufferedMaxExtent_, t, this.bufferedMaxExtent_)
                }
                return this.bufferedMaxExtent_
            }, t
        }(Ml);
    mu.prototype.finish = L;
    var xu = function (s) {
        function t(t, e, i, r, n, o) {
            s.call(this, t, e, i, r, n, o), this.declutterGroup_ = null, this.hitDetectionImage_ = null, this.image_ = null, this.anchorX_ = void 0, this.anchorY_ = void 0, this.height_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.scale_ = void 0, this.width_ = void 0
        }

        return s && (t.__proto__ = s), ((t.prototype = Object.create(s && s.prototype)).constructor = t).prototype.drawCoordinates_ = function (t, e, i, r) {
            return this.appendFlatCoordinates(t, e, i, r, !1, !1)
        }, t.prototype.drawPoint = function (t, e) {
            if (this.image_) {
                this.beginGeometry(t, e);
                var i = t.getFlatCoordinates(), r = t.getStride(), n = this.coordinates.length,
                    o = this.drawCoordinates_(i, 0, i.length, r);
                this.instructions.push([nu, n, o, this.image_, this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_ * this.pixelRatio, this.width_]), this.hitDetectionInstructions.push([nu, n, o, this.hitDetectionImage_, this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_, this.width_]), this.endGeometry(t, e)
            }
        }, t.prototype.drawMultiPoint = function (t, e) {
            if (this.image_) {
                this.beginGeometry(t, e);
                var i = t.getFlatCoordinates(), r = t.getStride(), n = this.coordinates.length,
                    o = this.drawCoordinates_(i, 0, i.length, r);
                this.instructions.push([nu, n, o, this.image_, this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_ * this.pixelRatio, this.width_]), this.hitDetectionInstructions.push([nu, n, o, this.hitDetectionImage_, this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_, this.width_]), this.endGeometry(t, e)
            }
        }, t.prototype.finish = function () {
            this.reverseHitDetectionInstructions(), this.anchorX_ = void 0, this.anchorY_ = void 0, this.hitDetectionImage_ = null, this.image_ = null, this.height_ = void 0, this.scale_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.width_ = void 0
        }, t.prototype.setImageStyle = function (t, e) {
            var i = t.getAnchor(), r = t.getSize(), n = t.getHitDetectionImage(1), o = t.getImage(1), s = t.getOrigin();
            this.anchorX_ = i[0], this.anchorY_ = i[1], this.declutterGroup_ = e, this.hitDetectionImage_ = n, this.image_ = o, this.height_ = r[1], this.opacity_ = t.getOpacity(), this.originX_ = s[0], this.originY_ = s[1], this.rotateWithView_ = t.getRotateWithView(), this.rotation_ = t.getRotation(), this.scale_ = t.getScale(), this.width_ = r[0]
        }, t
    }(mu), Su = function (s) {
        function t(t, e, i, r, n, o) {
            s.call(this, t, e, i, r, n, o)
        }

        return s && (t.__proto__ = s), ((t.prototype = Object.create(s && s.prototype)).constructor = t).prototype.drawFlatCoordinates_ = function (t, e, i, r) {
            var n = this.coordinates.length, o = this.appendFlatCoordinates(t, e, i, r, !1, !1), s = [au, n, o];
            return this.instructions.push(s), this.hitDetectionInstructions.push(s), i
        }, t.prototype.drawLineString = function (t, e) {
            var i = this.state, r = i.strokeStyle, n = i.lineWidth;
            if (void 0 !== r && void 0 !== n) {
                this.updateStrokeStyle(i, this.applyStroke), this.beginGeometry(t, e), this.hitDetectionInstructions.push([lu, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset], du);
                var o = t.getFlatCoordinates(), s = t.getStride();
                this.drawFlatCoordinates_(o, 0, o.length, s), this.hitDetectionInstructions.push(pu), this.endGeometry(t, e)
            }
        }, t.prototype.drawMultiLineString = function (t, e) {
            var i = this.state, r = i.strokeStyle, n = i.lineWidth;
            if (void 0 !== r && void 0 !== n) {
                this.updateStrokeStyle(i, this.applyStroke), this.beginGeometry(t, e), this.hitDetectionInstructions.push([lu, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset], du);
                for (var o = t.getEnds(), s = t.getFlatCoordinates(), a = t.getStride(), h = 0, l = 0, u = o.length; l < u; ++l) h = this.drawFlatCoordinates_(s, h, o[l], a);
                this.hitDetectionInstructions.push(pu), this.endGeometry(t, e)
            }
        }, t.prototype.finish = function () {
            var t = this.state;
            null != t.lastStroke && t.lastStroke != this.coordinates.length && this.instructions.push(pu), this.reverseHitDetectionInstructions(), this.state = null
        }, t.prototype.applyStroke = function (t) {
            null != t.lastStroke && t.lastStroke != this.coordinates.length && (this.instructions.push(pu), t.lastStroke = this.coordinates.length), t.lastStroke = 0, s.prototype.applyStroke.call(this, t), this.instructions.push(du)
        }, t
    }(mu), Eu = function (s) {
        function t(t, e, i, r, n, o) {
            s.call(this, t, e, i, r, n, o)
        }

        return s && (t.__proto__ = s), ((t.prototype = Object.create(s && s.prototype)).constructor = t).prototype.drawFlatCoordinatess_ = function (t, e, i, r) {
            var n = this.state, o = void 0 !== n.fillStyle, s = null != n.strokeStyle, a = i.length;
            this.instructions.push(du), this.hitDetectionInstructions.push(du);
            for (var h = 0; h < a; ++h) {
                var l = i[h], u = this.coordinates.length, c = this.appendFlatCoordinates(t, e, l, r, !0, !s),
                    p = [au, u, c];
                this.instructions.push(p), this.hitDetectionInstructions.push(p), s && (this.instructions.push(fu), this.hitDetectionInstructions.push(fu)), e = l
            }
            return o && (this.instructions.push(cu), this.hitDetectionInstructions.push(cu)), s && (this.instructions.push(pu), this.hitDetectionInstructions.push(pu)), e
        }, t.prototype.drawCircle = function (t, e) {
            var i = this.state, r = i.fillStyle, n = i.strokeStyle;
            if (void 0 !== r || void 0 !== n) {
                this.setFillStrokeStyles_(t), this.beginGeometry(t, e), void 0 !== i.fillStyle && this.hitDetectionInstructions.push([hu, Fe(Si)]), void 0 !== i.strokeStyle && this.hitDetectionInstructions.push([lu, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset]);
                var o = t.getFlatCoordinates(), s = t.getStride(), a = this.coordinates.length;
                this.appendFlatCoordinates(o, 0, o.length, s, !1, !1);
                var h = [tu, a];
                this.instructions.push(du, h), this.hitDetectionInstructions.push(du, h), this.hitDetectionInstructions.push(cu), void 0 !== i.fillStyle && this.instructions.push(cu), void 0 !== i.strokeStyle && (this.instructions.push(pu), this.hitDetectionInstructions.push(pu)), this.endGeometry(t, e)
            }
        }, t.prototype.drawPolygon = function (t, e) {
            var i = this.state, r = i.fillStyle, n = i.strokeStyle;
            if (void 0 !== r || void 0 !== n) {
                this.setFillStrokeStyles_(t), this.beginGeometry(t, e), void 0 !== i.fillStyle && this.hitDetectionInstructions.push([hu, Fe(Si)]), void 0 !== i.strokeStyle && this.hitDetectionInstructions.push([lu, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset]);
                var o = t.getEnds(), s = t.getOrientedFlatCoordinates(), a = t.getStride();
                this.drawFlatCoordinatess_(s, 0, o, a), this.endGeometry(t, e)
            }
        }, t.prototype.drawMultiPolygon = function (t, e) {
            var i = this.state, r = i.fillStyle, n = i.strokeStyle;
            if (void 0 !== r || void 0 !== n) {
                this.setFillStrokeStyles_(t), this.beginGeometry(t, e), void 0 !== i.fillStyle && this.hitDetectionInstructions.push([hu, Fe(Si)]), void 0 !== i.strokeStyle && this.hitDetectionInstructions.push([lu, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset]);
                for (var o = t.getEndss(), s = t.getOrientedFlatCoordinates(), a = t.getStride(), h = 0, l = 0, u = o.length; l < u; ++l) h = this.drawFlatCoordinatess_(s, h, o[l], a);
                this.endGeometry(t, e)
            }
        }, t.prototype.finish = function () {
            this.reverseHitDetectionInstructions(), this.state = null;
            var t = this.tolerance;
            if (0 !== t) for (var e = this.coordinates, i = 0, r = e.length; i < r; ++i) e[i] = Nr(e[i], t)
        }, t.prototype.setFillStrokeStyles_ = function (t) {
            var e = this.state;
            void 0 !== e.fillStyle && this.updateFillStyle(e, this.createFill, t), void 0 !== e.strokeStyle && this.updateStrokeStyle(e, this.applyStroke)
        }, t
    }(mu);

    function Cu(t, e, i, r, n) {
        var o, s, a, h, l, u, c, p, d, f = i, _ = i, g = 0, y = 0, v = i;
        for (o = i; o < r; o += n) {
            var m = e[o], x = e[o + 1];
            void 0 !== h && (p = m - h, d = x - l, a = Math.sqrt(p * p + d * d), void 0 !== u && (y += s, t < Math.acos((u * p + c * d) / (s * a)) && (g < y && (g = y, f = v, _ = o), y = 0, v = o - n)), s = a, u = p, c = d), h = m, l = x
        }
        return g < (y += a) ? [v, o] : [f, _]
    }

    var Tu = {
        Circle: Eu, Default: mu, Image: xu, LineString: Su, Polygon: Eu, Text: function (s) {
            function t(t, e, i, r, n, o) {
                s.call(this, t, e, i, r, n, o), this.declutterGroup_, this.labels_ = null, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = void 0, this.textRotation_ = 0, this.textFillState_ = null, this.fillStates = {}, this.textStrokeState_ = null, this.strokeStates = {}, this.textState_ = {}, this.textStates = {}, this.textKey_ = "", this.fillKey_ = "", this.strokeKey_ = "", this.widths_ = {}, Li.prune()
            }

            return s && (t.__proto__ = s), ((t.prototype = Object.create(s && s.prototype)).constructor = t).prototype.drawText = function (t, e) {
                var i = this.textFillState_, r = this.textStrokeState_, n = this.textState_;
                if ("" !== this.text_ && n && (i || r)) {
                    var o, s, a = this.coordinates.length, h = t.getType(), l = null, u = 2, c = 2;
                    if (n.placement === Ln) {
                        if (!wt(this.getBufferedMaxExtent(), t.getExtent())) return;
                        var p;
                        if (l = t.getFlatCoordinates(), c = t.getStride(), h == Lt.LINE_STRING) p = [l.length]; else if (h == Lt.MULTI_LINE_STRING) p = t.getEnds(); else if (h == Lt.POLYGON) p = t.getEnds().slice(0, 1); else if (h == Lt.MULTI_POLYGON) {
                            var d = t.getEndss();
                            for (p = [], o = 0, s = d.length; o < s; ++o) p.push(d[o][0])
                        }
                        this.beginGeometry(t, e);
                        for (var f, _ = n.textAlign, g = 0, y = 0, v = p.length; y < v; ++y) {
                            if (null == _) {
                                var m = Cu(n.maxAngle, l, g, p[y], c);
                                g = m[0], f = m[1]
                            } else f = p[y];
                            for (o = g; o < f; o += c) this.coordinates.push(l[o], l[o + 1]);
                            u = this.coordinates.length, g = p[y], this.drawChars_(a, u, this.declutterGroup_), a = u
                        }
                        this.endGeometry(t, e)
                    } else {
                        var x = this.getImage(this.text_, this.textKey_, this.fillKey_, this.strokeKey_),
                            S = x.width / this.pixelRatio;
                        switch (h) {
                            case Lt.POINT:
                            case Lt.MULTI_POINT:
                                u = (l = t.getFlatCoordinates()).length;
                                break;
                            case Lt.LINE_STRING:
                                l = t.getFlatMidpoint();
                                break;
                            case Lt.CIRCLE:
                                l = t.getCenter();
                                break;
                            case Lt.MULTI_LINE_STRING:
                                u = (l = t.getFlatMidpoints()).length;
                                break;
                            case Lt.POLYGON:
                                if (l = t.getFlatInteriorPoint(), !n.overflow && l[2] / this.resolution < S) return;
                                c = 3;
                                break;
                            case Lt.MULTI_POLYGON:
                                var E = t.getFlatInteriorPoints();
                                for (l = [], o = 0, s = E.length; o < s; o += 3) (n.overflow || E[o + 2] / this.resolution >= S) && l.push(E[o], E[o + 1]);
                                if (0 == (u = l.length)) return
                        }
                        u = this.appendFlatCoordinates(l, 0, u, c, !1, !1), (n.backgroundFill || n.backgroundStroke) && (this.setFillStrokeStyle(n.backgroundFill, n.backgroundStroke), n.backgroundFill && (this.updateFillStyle(this.state, this.createFill, t), this.hitDetectionInstructions.push(this.createFill(this.state, t))), n.backgroundStroke && (this.updateStrokeStyle(this.state, this.applyStroke), this.hitDetectionInstructions.push(this.createStroke(this.state)))), this.beginGeometry(t, e), this.drawTextImage_(x, a, u), this.endGeometry(t, e)
                    }
                }
            }, t.prototype.getImage = function (t, e, i, r) {
                var n, o = r + e + t + i + this.pixelRatio;
                if (!Li.containsKey(o)) {
                    var s = r ? this.strokeStates[r] || this.textStrokeState_ : null,
                        a = i ? this.fillStates[i] || this.textFillState_ : null,
                        h = this.textStates[e] || this.textState_, l = this.pixelRatio, u = h.scale * l,
                        c = gu[h.textAlign || Ri], p = r && s.lineWidth ? s.lineWidth : 0, d = t.split("\n"),
                        f = d.length, _ = [], g = function (t, e, i) {
                            for (var r = e.length, n = 0, o = 0; o < r; ++o) {
                                var s = ki(t, e[o]);
                                n = Math.max(n, s), i.push(s)
                            }
                            return n
                        }(h.font, d, _), y = Gi(h.font), v = y * f, m = g + p,
                        x = De(Math.ceil(m * u), Math.ceil((v + p) * u));
                    n = x.canvas, Li.set(o, n), 1 != u && x.scale(u, u), x.font = h.font, r && (x.strokeStyle = s.strokeStyle, x.lineWidth = p, x.lineCap = s.lineCap, x.lineJoin = s.lineJoin, x.miterLimit = s.miterLimit, hi && s.lineDash.length && (x.setLineDash(s.lineDash), x.lineDashOffset = s.lineDashOffset)), i && (x.fillStyle = a.fillStyle), x.textBaseline = "middle", x.textAlign = "center";
                    var S, E = .5 - c, C = c * n.width / u + E * p;
                    if (r) for (S = 0; S < f; ++S) x.strokeText(d[S], C + E * _[S], .5 * (p + y) + S * y);
                    if (i) for (S = 0; S < f; ++S) x.fillText(d[S], C + E * _[S], .5 * (p + y) + S * y)
                }
                return Li.get(o)
            }, t.prototype.drawTextImage_ = function (t, e, i) {
                var r = this.textState_, n = this.textStrokeState_, o = this.pixelRatio, s = gu[r.textAlign || Ri],
                    a = gu[r.textBaseline], h = n && n.lineWidth ? n.lineWidth : 0,
                    l = s * t.width / o + 2 * (.5 - s) * h, u = a * t.height / o + 2 * (.5 - a) * h;
                this.instructions.push([nu, e, i, t, (l - this.textOffsetX_) * o, (u - this.textOffsetY_) * o, this.declutterGroup_, t.height, 1, 0, 0, this.textRotateWithView_, this.textRotation_, 1, t.width, r.padding == Ii ? Ii : r.padding.map(function (t) {
                    return t * o
                }), !!r.backgroundFill, !!r.backgroundStroke]), this.hitDetectionInstructions.push([nu, e, i, t, (l - this.textOffsetX_) * o, (u - this.textOffsetY_) * o, this.declutterGroup_, t.height, 1, 0, 0, this.textRotateWithView_, this.textRotation_, 1 / o, t.width, r.padding, !!r.backgroundFill, !!r.backgroundStroke])
            }, t.prototype.drawChars_ = function (t, e, i) {
                var r = this.textStrokeState_, n = this.textState_, o = this.textFillState_, s = this.strokeKey_;
                r && (s in this.strokeStates || (this.strokeStates[s] = {
                    strokeStyle: r.strokeStyle,
                    lineCap: r.lineCap,
                    lineDashOffset: r.lineDashOffset,
                    lineWidth: r.lineWidth,
                    lineJoin: r.lineJoin,
                    miterLimit: r.miterLimit,
                    lineDash: r.lineDash
                }));
                var a = this.textKey_;
                this.textKey_ in this.textStates || (this.textStates[this.textKey_] = {
                    font: n.font,
                    textAlign: n.textAlign || Ri,
                    scale: n.scale
                });
                var h = this.fillKey_;
                o && (h in this.fillStates || (this.fillStates[h] = {fillStyle: o.fillStyle}));
                var l = this.pixelRatio, u = gu[n.textBaseline], c = this.textOffsetY_ * l, p = this.text_, d = n.font,
                    f = n.scale, _ = r ? r.lineWidth * f / 2 : 0, g = this.widths_[d];
                g || (this.widths_[d] = g = {}), this.instructions.push([ru, t, e, u, i, n.overflow, h, n.maxAngle, function (t) {
                    var e = g[t];
                    return e || (e = g[t] = ki(d, t)), e * f * l
                }, c, s, _ * l, p, a, 1]), this.hitDetectionInstructions.push([ru, t, e, u, i, n.overflow, h, n.maxAngle, function (t) {
                    var e = g[t];
                    return e || (e = g[t] = ki(d, t)), e * f
                }, c, s, _, p, a, 1 / l])
            }, t.prototype.setTextStyle = function (t, e) {
                var i, r, n;
                if (t) {
                    this.declutterGroup_ = e;
                    var o = t.getFill();
                    o ? ((r = this.textFillState_) || (r = this.textFillState_ = {}), r.fillStyle = ke(o.getColor() || Si)) : r = this.textFillState_ = null;
                    var s = t.getStroke();
                    if (s) {
                        (n = this.textStrokeState_) || (n = this.textStrokeState_ = {});
                        var a = s.getLineDash(), h = s.getLineDashOffset(), l = s.getWidth(), u = s.getMiterLimit();
                        n.lineCap = s.getLineCap() || Ei, n.lineDash = a ? a.slice() : Ci, n.lineDashOffset = void 0 === h ? 0 : h, n.lineJoin = s.getLineJoin() || Ti, n.lineWidth = void 0 === l ? 1 : l, n.miterLimit = void 0 === u ? 10 : u, n.strokeStyle = ke(s.getColor() || wi)
                    } else n = this.textStrokeState_ = null;
                    i = this.textState_;
                    var c = t.getFont() || xi;
                    Mi(c);
                    var p = t.getScale();
                    i.overflow = t.getOverflow(), i.font = c, i.maxAngle = t.getMaxAngle(), i.placement = t.getPlacement(), i.textAlign = t.getTextAlign(), i.textBaseline = t.getTextBaseline() || "middle", i.backgroundFill = t.getBackgroundFill(), i.backgroundStroke = t.getBackgroundStroke(), i.padding = t.getPadding() || Ii, i.scale = void 0 === p ? 1 : p;
                    var d = t.getOffsetX(), f = t.getOffsetY(), _ = t.getRotateWithView(), g = t.getRotation();
                    this.text_ = t.getText() || "", this.textOffsetX_ = void 0 === d ? 0 : d, this.textOffsetY_ = void 0 === f ? 0 : f, this.textRotateWithView_ = void 0 !== _ && _, this.textRotation_ = void 0 === g ? 0 : g, this.strokeKey_ = n ? ("string" == typeof n.strokeStyle ? n.strokeStyle : Ct(n.strokeStyle)) + n.lineCap + n.lineDashOffset + "|" + n.lineWidth + n.lineJoin + n.miterLimit + "[" + n.lineDash.join() + "]" : "", this.textKey_ = i.font + i.scale + (i.textAlign || "?"), this.fillKey_ = r ? "string" == typeof r.fillStyle ? r.fillStyle : "|" + Ct(r.fillStyle) : ""
                } else this.text_ = ""
            }, t
        }(mu)
    }, wu = function (a) {
        function t(t, e, i, r, n, o, s) {
            a.call(this), this.declutterTree_ = o, this.declutterGroup_ = null, this.tolerance_ = t, this.maxExtent_ = e, this.overlaps_ = n, this.pixelRatio_ = r, this.resolution_ = i, this.renderBuffer_ = s, this.replaysByZIndex_ = {}, this.hitDetectionContext_ = De(1, 1), this.hitDetectionTransform_ = [1, 0, 0, 1, 0, 0]
        }

        return a && (t.__proto__ = a), ((t.prototype = Object.create(a && a.prototype)).constructor = t).prototype.addDeclutter = function (t) {
            var e = null;
            return this.declutterTree_ && (t ? (e = this.declutterGroup_)[4]++ : (e = this.declutterGroup_ = [1 / 0, 1 / 0, -1 / 0, -1 / 0]).push(1)), e
        }, t.prototype.clip = function (t, e) {
            var i = this.getClipCoords(e);
            t.beginPath(), t.moveTo(i[0], i[1]), t.lineTo(i[2], i[3]), t.lineTo(i[4], i[5]), t.lineTo(i[6], i[7]), t.clip()
        }, t.prototype.hasReplays = function (t) {
            for (var e in this.replaysByZIndex_) for (var i = this.replaysByZIndex_[e], r = 0, n = t.length; r < n; ++r) if (t[r] in i) return !0;
            return !1
        }, t.prototype.finish = function () {
            for (var t in this.replaysByZIndex_) {
                var e = this.replaysByZIndex_[t];
                for (var i in e) e[i].finish()
            }
        }, t.prototype.forEachFeatureAtCoordinate = function (t, e, i, r, n, o, s) {
            var a, h = 2 * (r = Math.round(r)) + 1,
                l = Te(this.hitDetectionTransform_, r + .5, r + .5, 1 / e, -1 / e, -i, -t[0], -t[1]),
                u = this.hitDetectionContext_;
            u.canvas.width !== h || u.canvas.height !== h ? (u.canvas.width = h, u.canvas.height = h) : u.clearRect(0, 0, h, h), void 0 !== this.renderBuffer_ && (q(a = [1 / 0, 1 / 0, -1 / 0, -1 / 0], t), G(a, e * (this.renderBuffer_ + r), a));
            var c, p, d = function (t) {
                if (void 0 !== Ru[t]) return Ru[t];
                for (var e = 2 * t + 1, i = new Array(e), r = 0; r < e; r++) i[r] = new Array(e);
                var n = t, o = 0, s = 0;
                for (; o <= n;) Iu(i, t + n, t + o), Iu(i, t + o, t + n), Iu(i, t - o, t + n), Iu(i, t - n, t + o), Iu(i, t - n, t - o), Iu(i, t - o, t - n), Iu(i, t + o, t - n), Iu(i, t + n, t - o), 0 < 2 * ((s += 1 + 2 * ++o) - n) + 1 && (s += 1 - 2 * (n -= 1));
                return Ru[t] = i
            }(r);

            function f(t) {
                for (var e = u.getImageData(0, 0, h, h).data, i = 0; i < h; i++) for (var r = 0; r < h; r++) if (d[i][r] && 0 < e[4 * (r * h + i) + 3]) {
                    var n = void 0;
                    return (!c || p != ql.IMAGE && p != ql.TEXT || -1 !== c.indexOf(t)) && (n = o(t)), n || void u.clearRect(0, 0, h, h)
                }
            }

            this.declutterTree_ && (c = this.declutterTree_.all().map(function (t) {
                return t.value
            }));
            var _, g, y, v, m, x = Object.keys(this.replaysByZIndex_).map(Number);
            for (x.sort(hr), _ = x.length - 1; 0 <= _; --_) {
                var S = x[_].toString();
                for (y = this.replaysByZIndex_[S], g = _u.length - 1; 0 <= g; --g) if (void 0 !== (v = y[p = _u[g]])) if (!s || p != ql.IMAGE && p != ql.TEXT) {
                    if (m = v.replayHitDetection(u, l, i, n, f, a)) return m
                } else {
                    var E = s[S];
                    E ? E.push(v, l.slice(0)) : s[S] = [v, l.slice(0)]
                }
            }
        }, t.prototype.getClipCoords = function (t) {
            var e = this.maxExtent_, i = e[0], r = e[1], n = e[2], o = e[3], s = [i, r, i, o, n, o, n, r];
            return Rt(s, 0, 8, 2, t, s), s
        }, t.prototype.getReplay = function (t, e) {
            var i = void 0 !== t ? t.toString() : "0", r = this.replaysByZIndex_[i];
            void 0 === r && (r = {}, this.replaysByZIndex_[i] = r);
            var n = r[e];
            void 0 === n && (n = new Tu[e](this.tolerance_, this.maxExtent_, this.resolution_, this.pixelRatio_, this.overlaps_, this.declutterTree_), r[e] = n);
            return n
        }, t.prototype.getReplays = function () {
            return this.replaysByZIndex_
        }, t.prototype.isEmpty = function () {
            return Tt(this.replaysByZIndex_)
        }, t.prototype.replay = function (t, e, i, r, n, o, s) {
            var a = Object.keys(this.replaysByZIndex_).map(Number);
            a.sort(hr), t.save(), this.clip(t, e);
            var h, l, u, c, p, d, f = o || _u;
            for (h = 0, l = a.length; h < l; ++h) {
                var _ = a[h].toString();
                for (p = this.replaysByZIndex_[_], u = 0, c = f.length; u < c; ++u) {
                    var g = f[u];
                    if (d = p[g], void 0 !== d) if (!s || g != ql.IMAGE && g != ql.TEXT) d.replay(t, e, i, r, n); else {
                        var y = s[_];
                        y ? y.push(d, e.slice(0)) : s[_] = [d, e.slice(0)]
                    }
                }
            }
            t.restore()
        }, t
    }(Zl), Ru = {0: [[!0]]};

    function Iu(t, e, i) {
        var r, n = Math.floor(t.length / 2);
        if (n <= e) for (r = n; r < e; r++) t[r][i] = !0; else if (e < n) for (r = e + 1; r < n; r++) t[r][i] = !0
    }

    var Lu = .5, bu = {
        Point: function (t, e, i, r) {
            var n = i.getImage();
            if (n) {
                if (n.getImageState() != di.LOADED) return;
                var o = t.getReplay(i.getZIndex(), ql.IMAGE);
                o.setImageStyle(n, t.addDeclutter(!1)), o.drawPoint(e, r)
            }
            var s = i.getText();
            if (s) {
                var a = t.getReplay(i.getZIndex(), ql.TEXT);
                a.setTextStyle(s, t.addDeclutter(!!n)), a.drawText(e, r)
            }
        }, LineString: function (t, e, i, r) {
            var n = i.getStroke();
            if (n) {
                var o = t.getReplay(i.getZIndex(), ql.LINE_STRING);
                o.setFillStrokeStyle(null, n), o.drawLineString(e, r)
            }
            var s = i.getText();
            if (s) {
                var a = t.getReplay(i.getZIndex(), ql.TEXT);
                a.setTextStyle(s, t.addDeclutter(!1)), a.drawText(e, r)
            }
        }, Polygon: function (t, e, i, r) {
            var n = i.getFill(), o = i.getStroke();
            if (n || o) {
                var s = t.getReplay(i.getZIndex(), ql.POLYGON);
                s.setFillStrokeStyle(n, o), s.drawPolygon(e, r)
            }
            var a = i.getText();
            if (a) {
                var h = t.getReplay(i.getZIndex(), ql.TEXT);
                h.setTextStyle(a, t.addDeclutter(!1)), h.drawText(e, r)
            }
        }, MultiPoint: function (t, e, i, r) {
            var n = i.getImage();
            if (n) {
                if (n.getImageState() != di.LOADED) return;
                var o = t.getReplay(i.getZIndex(), ql.IMAGE);
                o.setImageStyle(n, t.addDeclutter(!1)), o.drawMultiPoint(e, r)
            }
            var s = i.getText();
            if (s) {
                var a = t.getReplay(i.getZIndex(), ql.TEXT);
                a.setTextStyle(s, t.addDeclutter(!!n)), a.drawText(e, r)
            }
        }, MultiLineString: function (t, e, i, r) {
            var n = i.getStroke();
            if (n) {
                var o = t.getReplay(i.getZIndex(), ql.LINE_STRING);
                o.setFillStrokeStyle(null, n), o.drawMultiLineString(e, r)
            }
            var s = i.getText();
            if (s) {
                var a = t.getReplay(i.getZIndex(), ql.TEXT);
                a.setTextStyle(s, t.addDeclutter(!1)), a.drawText(e, r)
            }
        }, MultiPolygon: function (t, e, i, r) {
            var n = i.getFill(), o = i.getStroke();
            if (o || n) {
                var s = t.getReplay(i.getZIndex(), ql.POLYGON);
                s.setFillStrokeStyle(n, o), s.drawMultiPolygon(e, r)
            }
            var a = i.getText();
            if (a) {
                var h = t.getReplay(i.getZIndex(), ql.TEXT);
                h.setTextStyle(a, t.addDeclutter(!1)), h.drawText(e, r)
            }
        }, GeometryCollection: function (t, e, i, r) {
            var n, o, s = e.getGeometriesArray();
            for (n = 0, o = s.length; n < o; ++n) {
                var a = bu[s[n].getType()];
                a(t, s[n], i, r)
            }
        }, Circle: function (t, e, i, r) {
            var n = i.getFill(), o = i.getStroke();
            if (n || o) {
                var s = t.getReplay(i.getZIndex(), ql.CIRCLE);
                s.setFillStrokeStyle(n, o), s.drawCircle(e, r)
            }
            var a = i.getText();
            if (a) {
                var h = t.getReplay(i.getZIndex(), ql.TEXT);
                h.setTextStyle(a, t.addDeclutter(!1)), h.drawText(e, r)
            }
        }
    };

    function Fu(t, e) {
        return Ct(t) - Ct(e)
    }

    function Pu(t, e) {
        var i = Mu(t, e);
        return i * i
    }

    function Mu(t, e) {
        return Lu * t / e
    }

    function Ou(t, e, i, r, n, o) {
        var s = !1, a = i.getImage();
        if (a) {
            var h = a.getImageState();
            h == di.LOADED || h == di.ERROR ? a.unlistenImageChange(n, o) : (h == di.IDLE && a.load(), h = a.getImageState(), a.listenImageChange(n, o), s = !0)
        }
        return function (t, e, i, r) {
            var n = i.getGeometryFunction()(e);
            if (!n) return;
            var o = n.getSimplifiedGeometry(r);
            if (i.getRenderer()) !function t(e, i, r, n) {
                if (i.getType() == Lt.GEOMETRY_COLLECTION) {
                    for (var o = i.getGeometries(), s = 0, a = o.length; s < a; ++s) t(e, o[s], r, n);
                    return
                }
                var h = e.getReplay(r.getZIndex(), ql.DEFAULT);
                h.drawCustom(i, n, r.getRenderer())
            }(t, o, i, e); else {
                var s = bu[o.getType()];
                s(t, o, i, e)
            }
        }(t, e, i, r), s
    }

    var Nu = function (e) {
        function t(t) {
            e.call(this, t), this.declutterTree_ = t.getDeclutter() ? Eh(9, void 0) : null, this.dirty_ = !1, this.renderedRevision_ = -1, this.renderedResolution_ = NaN, this.renderedExtent_ = [1 / 0, 1 / 0, -1 / 0, -1 / 0], this.renderedRenderOrder_ = null, this.replayGroup_ = null, this.replayGroupChanged = !0, this.context = De(), C(Li, w.CLEAR, this.handleFontsChanged_, this)
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.disposeInternal = function () {
            d(Li, w.CLEAR, this.handleFontsChanged_, this), e.prototype.disposeInternal.call(this)
        }, t.prototype.compose = function (t, e, i) {
            var r = e.extent, n = e.pixelRatio, o = i.managed ? e.skippedFeatureUids : {}, s = e.viewState,
                a = s.projection, h = s.rotation, l = a.getExtent(), u = this.getLayer().getSource(),
                c = this.getTransform(e, 0), p = i.extent, d = void 0 !== p;
            d && this.clip(t, e, p);
            var f = this.replayGroup_;
            if (f && !f.isEmpty()) {
                this.declutterTree_ && this.declutterTree_.clear();
                var _, g = this.getLayer(), y = 0, v = 0, m = 1 !== i.opacity, x = g.hasListener(wn);
                if (m || x) {
                    var S = t.canvas.width, E = t.canvas.height;
                    if (h) {
                        var C = Math.round(Math.sqrt(S * S + E * E));
                        y = (C - S) / 2, v = (C - E) / 2, S = E = C
                    }
                    this.context.canvas.width = S, this.context.canvas.height = E, _ = this.context
                } else _ = t;
                var T = _.globalAlpha;
                m || (_.globalAlpha = i.opacity), _ != t && _.translate(y, v);
                var w = e.viewHints, R = !(w[is.ANIMATING] || w[is.INTERACTING]), I = e.size[0] * n, L = e.size[1] * n;
                if (Di(_, -h, I / 2, L / 2), f.replay(_, c, h, o, R), u.getWrapX() && a.canWrapX() && !Q(l, r)) {
                    for (var b, F = r[0], P = ct(l), M = 0; F < l[0];) b = P * --M, c = this.getTransform(e, b), f.replay(_, c, h, o, R), F += P;
                    for (M = 0, F = r[2]; F > l[2];) b = P * ++M, c = this.getTransform(e, b), f.replay(_, c, h, o, R), F -= P
                }
                if (Di(_, h, I / 2, L / 2), x && this.dispatchRenderEvent(_, e, c), _ != t) {
                    if (m) {
                        var O = t.globalAlpha;
                        t.globalAlpha = i.opacity, t.drawImage(_.canvas, -y, -v), t.globalAlpha = O
                    } else t.drawImage(_.canvas, -y, -v);
                    _.translate(-y, -v)
                }
                m || (_.globalAlpha = T)
            }
            d && t.restore()
        }, t.prototype.composeFrame = function (t, e, i) {
            var r = this.getTransform(t, 0);
            this.preCompose(i, t, r), this.compose(i, t, e), this.postCompose(i, t, e, r)
        }, t.prototype.forEachFeatureAtCoordinate = function (t, e, i, r, n) {
            if (this.replayGroup_) {
                var o = e.viewState.resolution, s = e.viewState.rotation, a = this.getLayer(), h = {};
                return this.replayGroup_.forEachFeatureAtCoordinate(t, o, s, i, {}, function (t) {
                    var e = Ct(t).toString();
                    if (!(e in h)) return h[e] = !0, r.call(n, t, a)
                }, null)
            }
        }, t.prototype.handleFontsChanged_ = function (t) {
            var e = this.getLayer();
            e.getVisible() && this.replayGroup_ && e.changed()
        }, t.prototype.handleStyleImageChange_ = function (t) {
            this.renderIfReadyAndVisible()
        }, t.prototype.prepareFrame = function (t, e) {
            var n = this.getLayer(), i = n.getSource(), r = t.viewHints[is.ANIMATING], o = t.viewHints[is.INTERACTING],
                s = n.getUpdateWhileAnimating(), a = n.getUpdateWhileInteracting();
            if (!this.dirty_ && !s && r || !a && o) return !0;
            var h = t.extent, l = t.viewState, u = l.projection, c = l.resolution, p = t.pixelRatio,
                d = n.getRevision(), f = n.getRenderBuffer(), _ = n.getRenderOrder();
            void 0 === _ && (_ = Fu);
            var g = G(h, f * c), y = l.projection.getExtent();
            if (i.getWrapX() && l.projection.canWrapX() && !Q(y, t.extent)) {
                var v = ct(y), m = Math.max(ct(g) / 2, v);
                g[0] = y[0] - m, g[2] = y[2] + m
            }
            if (!this.dirty_ && this.renderedResolution_ == c && this.renderedRevision_ == d && this.renderedRenderOrder_ == _ && Q(this.renderedExtent_, g)) return !(this.replayGroupChanged = !1);
            this.replayGroup_ = null, this.dirty_ = !1;
            var x = new wu(Mu(c, p), g, c, p, i.getOverlaps(), this.declutterTree_, n.getRenderBuffer());
            i.loadFeatures(g, c, u);
            var S = function (t) {
                var e, i = t.getStyleFunction() || n.getStyleFunction();
                if (i && (e = i(t, c)), e) {
                    var r = this.renderFeature(t, c, p, e, x);
                    this.dirty_ = this.dirty_ || r
                }
            }.bind(this);
            if (_) {
                var E = [];
                i.forEachFeatureInExtent(g, function (t) {
                    E.push(t)
                }, this), E.sort(_);
                for (var C = 0, T = E.length; C < T; ++C) S(E[C])
            } else i.forEachFeatureInExtent(g, S, this);
            return x.finish(), this.renderedResolution_ = c, this.renderedRevision_ = d, this.renderedRenderOrder_ = _, this.renderedExtent_ = g, this.replayGroup_ = x, this.replayGroupChanged = !0
        }, t.prototype.renderFeature = function (t, e, i, r, n) {
            if (!r) return !1;
            var o = !1;
            if (Array.isArray(r)) for (var s = 0, a = r.length; s < a; ++s) o = Ou(n, t, r[s], Pu(e, i), this.handleStyleImageChange_, this) || o; else o = Ou(n, t, r, Pu(e, i), this.handleStyleImageChange_, this);
            return o
        }, t
    }(Xl);
    Nu.handles = function (t) {
        return t.getType() === sh.VECTOR
    }, Nu.create = function (t, e) {
        return new Nu(e)
    };
    var Au = "image", Gu = "hybrid", ku = "vector",
        Du = {image: [ql.POLYGON, ql.CIRCLE, ql.LINE_STRING, ql.IMAGE, ql.TEXT], hybrid: [ql.POLYGON, ql.LINE_STRING]},
        ju = {image: [ql.DEFAULT], hybrid: [ql.IMAGE, ql.TEXT, ql.DEFAULT], vector: _u}, Uu = function (O) {
            function t(t) {
                O.call(this, t, !0), this.declutterTree_ = t.getDeclutter() ? Eh(9, void 0) : null, this.dirty_ = !1, this.renderedLayerRevision_, this.tmpTransform_ = [1, 0, 0, 1, 0, 0], this.zDirection = t.getRenderMode() == ku ? 1 : 0, C(Li, w.CLEAR, this.handleFontsChanged_, this)
            }

            return O && (t.__proto__ = O), ((t.prototype = Object.create(O && O.prototype)).constructor = t).prototype.disposeInternal = function () {
                d(Li, w.CLEAR, this.handleFontsChanged_, this), O.prototype.disposeInternal.call(this)
            }, t.prototype.getTile = function (t, e, i, r, n) {
                var o = O.prototype.getTile.call(this, t, e, i, r, n);
                return o.getState() === kn && (this.createReplayGroup_(o, r, n), this.context && this.renderTileImage_(o, r, n)), o
            }, t.prototype.prepareFrame = function (t, e) {
                var i = this.getLayer(), r = i.getRevision();
                if (this.renderedLayerRevision_ != r) {
                    this.renderedTiles.length = 0;
                    var n = i.getRenderMode();
                    this.context || n == ku || (this.context = De()), this.context && n == ku && (this.context = null)
                }
                return this.renderedLayerRevision_ = r, O.prototype.prepareFrame.call(this, t, e)
            }, t.prototype.createReplayGroup_ = function (y, v, m) {
                var x = this, S = this.getLayer(), t = S.getRevision(), E = S.getRenderOrder() || null,
                    C = y.getReplayState(S);
                if (C.dirty || C.renderedRevision != t || C.renderedRenderOrder != E) {
                    for (var T = S.getSource(), w = T.getTileGrid(), R = T.getTileGridForProjection(m).getResolution(y.tileCoord[0]), I = y.extent, e = function (t, e) {
                        var i = y.getTile(y.tileKeys[t]);
                        if (i.getState() == kn) {
                            var r = i.tileCoord, n = w.getTileCoordExtent(r), o = ht(I, n),
                                s = $(n, o) ? null : G(o, S.getRenderBuffer() * R, x.tmpExtent), a = i.getProjection(),
                                h = !1;
                            ue(m, a) || (h = !0, i.setProjection(m)), C.dirty = !1;
                            var l = new wu(0, o, R, v, T.getOverlaps(), x.declutterTree_, S.getRenderBuffer()),
                                u = Pu(R, v), c = function (t) {
                                    var e, i = t.getStyleFunction() || S.getStyleFunction();
                                    if (i && (e = i(t, R)), e) {
                                        var r = this.renderFeature(t, u, e, l);
                                        this.dirty_ = this.dirty_ || r, C.dirty = C.dirty || r
                                    }
                                }, p = i.getFeatures();
                            E && E !== C.renderedRenderOrder && p.sort(E);
                            for (var d = 0, f = p.length; d < f; ++d) {
                                var _ = p[d];
                                h && (a.getUnits() == Ot.TILE_PIXELS && (a.setWorldExtent(n), a.setExtent(i.getExtent())), _.getGeometry().transform(a, m)), s && !wt(s, _.getGeometry().getExtent()) || c.call(x, _)
                            }
                            for (var g in l.finish(), l.getReplays()) ;
                            i.setReplayGroup(S, y.tileCoord.toString(), l)
                        }
                    }, i = 0, r = y.tileKeys.length; i < r; ++i) e(i);
                    C.renderedRevision = t, C.renderedRenderOrder = E
                }
            }, t.prototype.forEachFeatureAtCoordinate = function (t, e, i, r, n) {
                var o = e.viewState.resolution, s = e.viewState.rotation;
                i = null == i ? 0 : i;
                var a, h, l, u, c, p = this.getLayer(), d = {}, f = this.renderedTiles;
                for (l = 0, u = f.length; l < u; ++l) {
                    var _ = f[l];
                    if (j(a = G(_.extent, i * o, a), t)) for (var g = 0, y = _.tileKeys.length; g < y; ++g) {
                        var v = _.getTile(_.tileKeys[g]);
                        v.getState() == kn && (c = v.getReplayGroup(p, _.tileCoord.toString()), h = h || c.forEachFeatureAtCoordinate(t, o, s, i, {}, function (t) {
                            var e = Ct(t).toString();
                            if (!(e in d)) return d[e] = !0, r.call(n, t, p)
                        }, null))
                    }
                }
                return h
            }, t.prototype.getReplayTransform_ = function (t, e) {
                var i = this.getLayer().getSource().getTileGrid(), r = t.tileCoord, n = i.getResolution(r[0]),
                    o = e.viewState, s = e.pixelRatio, a = o.resolution / s, h = i.getTileCoordExtent(r, this.tmpExtent),
                    l = o.center, u = lt(h), c = e.size, p = Math.round(s * c[0] / 2), d = Math.round(s * c[1] / 2);
                return Te(this.tmpTransform_, p, d, n / a, n / a, o.rotation, (u[0] - l[0]) / n, (l[1] - u[1]) / n)
            }, t.prototype.handleFontsChanged_ = function (t) {
                var e = this.getLayer();
                e.getVisible() && void 0 !== this.renderedLayerRevision_ && e.changed()
            }, t.prototype.handleStyleImageChange_ = function (t) {
                this.renderIfReadyAndVisible()
            }, t.prototype.postCompose = function (t, e, i) {
                var r = this.getLayer(), n = r.getRenderMode();
                if (n != Au) {
                    var o, s, a = r.getDeclutter() ? {} : null, h = r.getSource(), l = ju[n], u = e.pixelRatio,
                        c = e.viewState.rotation, p = e.size;
                    c && Di(t, -c, o = Math.round(u * p[0] / 2), s = Math.round(u * p[1] / 2)), a && this.declutterTree_.clear();
                    for (var d = e.viewHints, f = !(d[is.ANIMATING] || d[is.INTERACTING]), _ = this.renderedTiles, g = h.getTileGridForProjection(e.viewState.projection), y = [], v = [], m = _.length - 1; 0 <= m; --m) {
                        var x = _[m];
                        if (x.getState() != Un) for (var S = x.tileCoord, E = g.getTileCoordExtent(S, this.tmpExtent)[0] - x.extent[0], C = void 0, T = 0, w = x.tileKeys.length; T < w; ++T) {
                            var R = x.getTile(x.tileKeys[T]);
                            if (R.getState() == kn) {
                                var I = R.getReplayGroup(r, S.toString());
                                if (I && I.hasReplays(l)) {
                                    C || (C = this.getTransform(e, E));
                                    var L = R.tileCoord[0], b = I.getClipCoords(C);
                                    t.save(), t.globalAlpha = i.opacity;
                                    for (var F = 0, P = y.length; F < P; ++F) {
                                        var M = y[F];
                                        L < v[F] && (t.beginPath(), t.moveTo(b[0], b[1]), t.lineTo(b[2], b[3]), t.lineTo(b[4], b[5]), t.lineTo(b[6], b[7]), t.moveTo(M[6], M[7]), t.lineTo(M[4], M[5]), t.lineTo(M[2], M[3]), t.lineTo(M[0], M[1]), t.clip())
                                    }
                                    I.replay(t, C, c, {}, f, l, a), t.restore(), y.push(b), v.push(L)
                                }
                            }
                        }
                    }
                    a && function (t, e, i, r) {
                        for (var n = Object.keys(t).map(Number).sort(hr), o = {}, s = 0, a = n.length; s < a; ++s) for (var h = t[n[s].toString()], l = 0, u = h.length; l < u;) {
                            var c = h[l++], p = h[l++];
                            c.replay(e, p, i, o, r)
                        }
                    }(a, t, c, f), c && Di(t, c, o, s)
                }
                O.prototype.postCompose.call(this, t, e, i)
            }, t.prototype.renderFeature = function (t, e, i, r) {
                if (!i) return !1;
                var n = !1;
                if (Array.isArray(i)) for (var o = 0, s = i.length; o < s; ++o) n = Ou(r, t, i[o], e, this.handleStyleImageChange_, this) || n; else n = Ou(r, t, i, e, this.handleStyleImageChange_, this);
                return n
            }, t.prototype.renderTileImage_ = function (t, e, i) {
                var r = this.getLayer(), n = t.getReplayState(r), o = r.getRevision(), s = Du[r.getRenderMode()];
                if (s && n.renderedTileRevision !== o) {
                    n.renderedTileRevision = o;
                    var a = t.wrappedTileCoord, h = a[0], l = r.getSource(), u = l.getTileGridForProjection(i),
                        c = u.getResolution(h), p = t.getContext(r), d = l.getTilePixelSize(h, e, i);
                    p.canvas.width = d[0], p.canvas.height = d[1];
                    for (var f = u.getTileCoordExtent(a, this.tmpExtent), _ = 0, g = t.tileKeys.length; _ < g; ++_) {
                        var y = t.getTile(t.tileKeys[_]);
                        if (y.getState() == kn) {
                            var v = e / c, m = ge(this.tmpTransform_);
                            Ee(m, v, -v), Ce(m, -f[0], -f[3]), y.getReplayGroup(r, t.tileCoord.toString()).replay(p, m, 0, {}, !0, s)
                        }
                    }
                }
            }, t
        }(Hl);
    Uu.handles = function (t) {
        return t.getType() === sh.VECTOR_TILE
    }, Uu.create = function (t, e) {
        return new Uu(e)
    };
    var Yu, Bu = function (e) {
            function t(t) {
                (t = E({}, t)).controls || (t.controls = As()), t.interactions || (t.interactions = bl()), e.call(this, t)
            }

            return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.createRenderer = function () {
                var t = new Yl(this);
                return t.registerLayerRenderers([Vl, Hl, Nu, Uu]), t
            }, t
        }(Rs), Xu = "bottom-left", zu = "bottom-center", Vu = "bottom-right", Wu = "center-left", Ku = "center-center",
        Hu = "center-right", Zu = "top-left", qu = "top-center", Ju = "top-right", Qu = "element", $u = "map",
        tc = "offset", ec = "position", ic = "positioning", rc = function (e) {
            function t(t) {
                e.call(this), this.options = t, this.id = t.id, this.insertFirst = void 0 === t.insertFirst || t.insertFirst, this.stopEvent = void 0 === t.stopEvent || t.stopEvent, this.element = document.createElement("div"), this.element.className = void 0 !== t.className ? t.className : "ol-overlay-container ol-selectable", this.element.style.position = "absolute", this.autoPan = void 0 !== t.autoPan && t.autoPan, this.autoPanAnimation = t.autoPanAnimation || {}, this.autoPanMargin = void 0 !== t.autoPanMargin ? t.autoPanMargin : 20, this.rendered = {
                    bottom_: "",
                    left_: "",
                    right_: "",
                    top_: "",
                    visible: !0
                }, this.mapPostrenderListenerKey = null, C(this, b(Qu), this.handleElementChanged, this), C(this, b($u), this.handleMapChanged, this), C(this, b(tc), this.handleOffsetChanged, this), C(this, b(ec), this.handlePositionChanged, this), C(this, b(ic), this.handlePositioningChanged, this), void 0 !== t.element && this.setElement(t.element), this.setOffset(void 0 !== t.offset ? t.offset : [0, 0]), this.setPositioning(void 0 !== t.positioning ? t.positioning : Zu), void 0 !== t.position && this.setPosition(t.position)
            }

            return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.getElement = function () {
                return this.get(Qu)
            }, t.prototype.getId = function () {
                return this.id
            }, t.prototype.getMap = function () {
                return this.get($u)
            }, t.prototype.getOffset = function () {
                return this.get(tc)
            }, t.prototype.getPosition = function () {
                return this.get(ec)
            }, t.prototype.getPositioning = function () {
                return this.get(ic)
            }, t.prototype.handleElementChanged = function () {
                Ye(this.element);
                var t = this.getElement();
                t && this.element.appendChild(t)
            }, t.prototype.handleMapChanged = function () {
                this.mapPostrenderListenerKey && (Ue(this.element), g(this.mapPostrenderListenerKey), this.mapPostrenderListenerKey = null);
                var t = this.getMap();
                if (t) {
                    this.mapPostrenderListenerKey = C(t, Ko.POSTRENDER, this.render, this), this.updatePixelPosition();
                    var e = this.stopEvent ? t.getOverlayContainerStopEvent() : t.getOverlayContainer();
                    this.insertFirst ? e.insertBefore(this.element, e.childNodes[0] || null) : e.appendChild(this.element)
                }
            }, t.prototype.render = function () {
                this.updatePixelPosition()
            }, t.prototype.handleOffsetChanged = function () {
                this.updatePixelPosition()
            }, t.prototype.handlePositionChanged = function () {
                this.updatePixelPosition(), this.get(ec) && this.autoPan && this.panIntoView()
            }, t.prototype.handlePositioningChanged = function () {
                this.updatePixelPosition()
            }, t.prototype.setElement = function (t) {
                this.set(Qu, t)
            }, t.prototype.setMap = function (t) {
                this.set($u, t)
            }, t.prototype.setOffset = function (t) {
                this.set(tc, t)
            }, t.prototype.setPosition = function (t) {
                this.set(ec, t)
            }, t.prototype.panIntoView = function () {
                var t = this.getMap();
                if (t && t.getTargetElement()) {
                    var e, i, r, n, o, s, a = this.getRect(t.getTargetElement(), t.getSize()), h = this.getElement(),
                        l = this.getRect(h, [(n = h, o = n.offsetWidth, s = getComputedStyle(n), o += parseInt(s.marginLeft, 10) + parseInt(s.marginRight, 10)), (e = h, i = e.offsetHeight, r = getComputedStyle(e), i += parseInt(r.marginTop, 10) + parseInt(r.marginBottom, 10))]),
                        u = this.autoPanMargin;
                    if (!Q(a, l)) {
                        var c = l[0] - a[0], p = a[2] - l[2], d = l[1] - a[1], f = a[3] - l[3], _ = [0, 0];
                        if (c < 0 ? _[0] = c - u : p < 0 && (_[0] = Math.abs(p) + u), d < 0 ? _[1] = d - u : f < 0 && (_[1] = Math.abs(f) + u), 0 !== _[0] || 0 !== _[1]) {
                            var g = t.getView().getCenter(), y = t.getPixelFromCoordinate(g),
                                v = [y[0] + _[0], y[1] + _[1]];
                            t.getView().animate({
                                center: t.getCoordinateFromPixel(v),
                                duration: this.autoPanAnimation.duration,
                                easing: this.autoPanAnimation.easing
                            })
                        }
                    }
                }
            }, t.prototype.getRect = function (t, e) {
                var i = t.getBoundingClientRect(), r = i.left + window.pageXOffset, n = i.top + window.pageYOffset;
                return [r, n, r + e[0], n + e[1]]
            }, t.prototype.setPositioning = function (t) {
                this.set(ic, t)
            }, t.prototype.setVisible = function (t) {
                this.rendered.visible !== t && (this.element.style.display = t ? "" : "none", this.rendered.visible = t)
            }, t.prototype.updatePixelPosition = function () {
                var t = this.getMap(), e = this.getPosition();
                if (t && t.isRendered() && e) {
                    var i = t.getPixelFromCoordinate(e), r = t.getSize();
                    this.updateRenderedPosition(i, r)
                } else this.setVisible(!1)
            }, t.prototype.updateRenderedPosition = function (t, e) {
                var i = this.element.style, r = this.getOffset(), n = this.getPositioning();
                this.setVisible(!0);
                var o = r[0], s = r[1];
                if (n == Vu || n == Hu || n == Ju) {
                    "" !== this.rendered.left_ && (this.rendered.left_ = i.left = "");
                    var a = Math.round(e[0] - t[0] - o) + "px";
                    this.rendered.right_ != a && (this.rendered.right_ = i.right = a)
                } else {
                    "" !== this.rendered.right_ && (this.rendered.right_ = i.right = ""), n != zu && n != Ku && n != qu || (o -= this.element.offsetWidth / 2);
                    var h = Math.round(t[0] + o) + "px";
                    this.rendered.left_ != h && (this.rendered.left_ = i.left = h)
                }
                if (n == Xu || n == zu || n == Vu) {
                    "" !== this.rendered.top_ && (this.rendered.top_ = i.top = "");
                    var l = Math.round(e[1] - t[1] - s) + "px";
                    this.rendered.bottom_ != l && (this.rendered.bottom_ = i.bottom = l)
                } else {
                    "" !== this.rendered.bottom_ && (this.rendered.bottom_ = i.bottom = ""), n != Wu && n != Ku && n != Hu || (s -= this.element.offsetHeight / 2);
                    var u = Math.round(t[1] + s) + "px";
                    this.rendered.top_ != u && (this.rendered.top_ = i.top = u)
                }
            }, t.prototype.getOptions = function () {
                return this.options
            }, t
        }(R), nc = [0, 0, 4096, 4096], oc = function (s) {
            function t(t, e, i, r, n, o) {
                s.call(this, t, e, o), this.consumers = 0, this.extent_ = null, this.format_ = r, this.features_ = null, this.loader_, this.projection_ = null, this.replayGroups_ = {}, this.tileLoadFunction_ = n, this.url_ = i
            }

            return s && (t.__proto__ = s), ((t.prototype = Object.create(s && s.prototype)).constructor = t).prototype.disposeInternal = function () {
                this.features_ = null, this.replayGroups_ = {}, this.state = Un, this.changed(), s.prototype.disposeInternal.call(this)
            }, t.prototype.getExtent = function () {
                return this.extent_ || nc
            }, t.prototype.getFormat = function () {
                return this.format_
            }, t.prototype.getFeatures = function () {
                return this.features_
            }, t.prototype.getKey = function () {
                return this.url_
            }, t.prototype.getProjection = function () {
                return this.projection_
            }, t.prototype.getReplayGroup = function (t, e) {
                return this.replayGroups_[Ct(t) + "," + e]
            }, t.prototype.load = function () {
                this.state == An && (this.setState(Gn), this.tileLoadFunction_(this, this.url_), this.loader_(null, NaN, null))
            }, t.prototype.onLoad = function (t, e, i) {
                this.setProjection(e), this.setFeatures(t), this.setExtent(i)
            }, t.prototype.onError = function () {
                this.setState(Dn)
            }, t.prototype.setExtent = function (t) {
                this.extent_ = t
            }, t.prototype.setFeatures = function (t) {
                this.features_ = t, this.setState(kn)
            }, t.prototype.setProjection = function (t) {
                this.projection_ = t
            }, t.prototype.setReplayGroup = function (t, e, i) {
                this.replayGroups_[Ct(t) + "," + e] = i
            }, t.prototype.setLoader = function (t) {
                this.loader_ = t
            }, t
        }(Vn), sc = function () {
            if (!Yu) {
                var t = document.body;
                t.webkitRequestFullscreen ? Yu = "webkitfullscreenchange" : t.mozRequestFullScreen ? Yu = "mozfullscreenchange" : t.msRequestFullscreen ? Yu = "MSFullscreenChange" : t.requestFullscreen && (Yu = "fullscreenchange")
            }
            return Yu
        }, ac = function (h) {
            function t(t) {
                var e = t || {};
                h.call(this, {
                    element: document.createElement("div"),
                    target: e.target
                }), this.cssClassName_ = void 0 !== e.className ? e.className : "ol-full-screen";
                var i = void 0 !== e.label ? e.label : "⤢";
                this.labelNode_ = "string" == typeof i ? document.createTextNode(i) : i;
                var r = void 0 !== e.labelActive ? e.labelActive : "×";
                this.labelActiveNode_ = "string" == typeof r ? document.createTextNode(r) : r;
                var n = e.tipLabel ? e.tipLabel : "Toggle full-screen", o = document.createElement("button");
                o.className = this.cssClassName_ + "-" + lc(), o.setAttribute("type", "button"), o.title = n, o.appendChild(this.labelNode_), C(o, w.CLICK, this.handleClick_, this);
                var s = this.cssClassName_ + " " + _i + " " + gi + " " + (hc() ? "" : "ol-unsupported"), a = this.element;
                a.className = s, a.appendChild(o), this.keys_ = void 0 !== e.keys && e.keys, this.source_ = e.source
            }

            return h && (t.__proto__ = h), ((t.prototype = Object.create(h && h.prototype)).constructor = t).prototype.handleClick_ = function (t) {
                t.preventDefault(), this.handleFullScreen_()
            }, t.prototype.handleFullScreen_ = function () {
                if (hc()) {
                    var t, e, i = this.getMap();
                    if (i) if (lc()) document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen(); else t = this.source_ ? "string" == typeof this.source_ ? document.getElementById(this.source_) : this.source_ : i.getTargetElement(), this.keys_ ? (e = t).mozRequestFullScreenWithKeys ? e.mozRequestFullScreenWithKeys() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : uc(e) : uc(t)
                }
            }, t.prototype.handleFullScreenChange_ = function () {
                var t = this.element.firstElementChild, e = this.getMap();
                lc() ? (t.className = this.cssClassName_ + "-true", je(this.labelActiveNode_, this.labelNode_)) : (t.className = this.cssClassName_ + "-false", je(this.labelNode_, this.labelActiveNode_)), e && e.updateSize()
            }, t.prototype.setMap = function (t) {
                h.prototype.setMap.call(this, t), t && this.listenerKeys.push(C(document, sc(), this.handleFullScreenChange_, this))
            }, t
        }(Is);

    function hc() {
        var t = document.body;
        return !!(t.webkitRequestFullscreen || t.mozRequestFullScreen && document.mozFullScreenEnabled || t.msRequestFullscreen && document.msFullscreenEnabled || t.requestFullscreen && document.fullscreenEnabled)
    }

    function lc() {
        return !!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement)
    }

    function uc(t) {
        t.requestFullscreen ? t.requestFullscreen() : t.msRequestFullscreen ? t.msRequestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen && t.webkitRequestFullscreen()
    }

    var cc = function (y) {
        function t(t) {
            var e = t || {};
            y.call(this, {
                element: document.createElement("div"),
                render: e.render || pc,
                target: e.target
            }), this.collapsed_ = void 0 === e.collapsed || e.collapsed, this.collapsible_ = void 0 === e.collapsible || e.collapsible, this.collapsible_ || (this.collapsed_ = !1);
            var i = void 0 !== e.className ? e.className : "ol-overviewmap",
                r = void 0 !== e.tipLabel ? e.tipLabel : "Overview map",
                n = void 0 !== e.collapseLabel ? e.collapseLabel : "«";
            "string" == typeof n ? (this.collapseLabel_ = document.createElement("span"), this.collapseLabel_.textContent = n) : this.collapseLabel_ = n;
            var o = void 0 !== e.label ? e.label : "»";
            "string" == typeof o ? (this.label_ = document.createElement("span"), this.label_.textContent = o) : this.label_ = o;
            var s = this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_,
                a = document.createElement("button");
            a.setAttribute("type", "button"), a.title = r, a.appendChild(s), C(a, w.CLICK, this.handleClick_, this), this.ovmapDiv_ = document.createElement("div"), this.ovmapDiv_.className = "ol-overviewmap-map", this.ovmap_ = new Bu({
                controls: new M,
                interactions: new M,
                view: e.view
            });
            var h = this.ovmap_;
            e.layers && e.layers.forEach(function (t) {
                h.addLayer(t)
            }.bind(this));
            var l = document.createElement("div");
            l.className = "ol-overviewmap-box", l.style.boxSizing = "border-box", this.boxOverlay_ = new rc({
                position: [0, 0],
                positioning: Xu,
                element: l
            }), this.ovmap_.addOverlay(this.boxOverlay_);
            var u = i + " " + _i + " " + gi + (this.collapsed_ && this.collapsible_ ? " " + yi : "") + (this.collapsible_ ? "" : " ol-uncollapsible"),
                c = this.element;
            c.className = u, c.appendChild(this.ovmapDiv_), c.appendChild(a);
            var p = this, d = this.boxOverlay_, f = this.boxOverlay_.getElement(), _ = function (t) {
                var e, i = h.getEventCoordinate({
                    clientX: (e = t).clientX - f.offsetWidth / 2,
                    clientY: e.clientY + f.offsetHeight / 2
                });
                d.setPosition(i)
            }, g = function (t) {
                var e = h.getEventCoordinate(t);
                p.getMap().getView().setCenter(e), window.removeEventListener("mousemove", _), window.removeEventListener("mouseup", g)
            };
            f.addEventListener("mousedown", function () {
                window.addEventListener("mousemove", _), window.addEventListener("mouseup", g)
            })
        }

        return y && (t.__proto__ = y), ((t.prototype = Object.create(y && y.prototype)).constructor = t).prototype.setMap = function (t) {
            var e = this.getMap();
            if (t !== e) {
                if (e) {
                    var i = e.getView();
                    i && this.unbindView_(i), this.ovmap_.setTarget(null)
                }
                if (y.prototype.setMap.call(this, t), t) {
                    this.ovmap_.setTarget(this.ovmapDiv_), this.listenerKeys.push(C(t, a, this.handleMapPropertyChange_, this)), 0 === this.ovmap_.getLayers().getLength() && this.ovmap_.setLayerGroup(t.getLayerGroup());
                    var r = t.getView();
                    r && (this.bindView_(r), r.isDef() && (this.ovmap_.updateSize(), this.resetExtent_()))
                }
            }
        }, t.prototype.handleMapPropertyChange_ = function (t) {
            if (t.key === Ho.VIEW) {
                var e = t.oldValue;
                e && this.unbindView_(e);
                var i = this.getMap().getView();
                this.bindView_(i)
            }
        }, t.prototype.bindView_ = function (t) {
            C(t, b(os), this.handleRotationChanged_, this)
        }, t.prototype.unbindView_ = function (t) {
            d(t, b(os), this.handleRotationChanged_, this)
        }, t.prototype.handleRotationChanged_ = function () {
            this.ovmap_.getView().setRotation(this.getMap().getView().getRotation())
        }, t.prototype.validateExtent_ = function () {
            var t = this.getMap(), e = this.ovmap_;
            if (t.isRendered() && e.isRendered()) {
                var i = t.getSize(), r = t.getView().calculateExtent(i), n = e.getSize(),
                    o = e.getView().calculateExtent(n), s = e.getPixelFromCoordinate(lt(r)),
                    a = e.getPixelFromCoordinate(nt(r)), h = Math.abs(s[0] - a[0]), l = Math.abs(s[1] - a[1]), u = n[0],
                    c = n[1];
                h < .1 * u || l < .1 * c || .75 * u < h || .75 * c < l ? this.resetExtent_() : Q(o, r) || this.recenter_()
            }
        }, t.prototype.resetExtent_ = function () {
            var t = this.getMap(), e = this.ovmap_, i = t.getSize(), r = t.getView().calculateExtent(i),
                n = e.getView(), o = Math.log(7.5) / Math.LN2;
            dt(r, 1 / (.1 * Math.pow(2, o / 2))), n.fit(r)
        }, t.prototype.recenter_ = function () {
            var t = this.getMap(), e = this.ovmap_, i = t.getView();
            e.getView().setCenter(i.getCenter())
        }, t.prototype.updateBox_ = function () {
            var t = this.getMap(), e = this.ovmap_;
            if (t.isRendered() && e.isRendered()) {
                var i = t.getSize(), r = t.getView(), n = e.getView(), o = r.getRotation(), s = this.boxOverlay_,
                    a = this.boxOverlay_.getElement(), h = r.calculateExtent(i), l = n.getResolution(), u = rt(h),
                    c = ut(h), p = this.calculateCoordinateRotate_(o, u);
                s.setPosition(p), a && (a.style.width = Math.abs((u[0] - c[0]) / l) + "px", a.style.height = Math.abs((c[1] - u[1]) / l) + "px")
            }
        }, t.prototype.calculateCoordinateRotate_ = function (t, e) {
            var i, r = this.getMap().getView().getCenter();
            return r && (pn(i = [e[0] - r[0], e[1] - r[1]], t), an(i, r)), i
        }, t.prototype.handleClick_ = function (t) {
            t.preventDefault(), this.handleToggle_()
        }, t.prototype.handleToggle_ = function () {
            this.element.classList.toggle(yi), this.collapsed_ ? je(this.collapseLabel_, this.label_) : je(this.label_, this.collapseLabel_), this.collapsed_ = !this.collapsed_;
            var t = this.ovmap_;
            this.collapsed_ || t.isRendered() || (t.updateSize(), this.resetExtent_(), o(t, Ko.POSTRENDER, function (t) {
                this.updateBox_()
            }, this))
        }, t.prototype.getCollapsible = function () {
            return this.collapsible_
        }, t.prototype.setCollapsible = function (t) {
            this.collapsible_ !== t && (this.collapsible_ = t, this.element.classList.toggle("ol-uncollapsible"), !t && this.collapsed_ && this.handleToggle_())
        }, t.prototype.setCollapsed = function (t) {
            this.collapsible_ && this.collapsed_ !== t && this.handleToggle_()
        }, t.prototype.getCollapsed = function () {
            return this.collapsed_
        }, t.prototype.getOverviewMap = function () {
            return this.ovmap_
        }, t
    }(Is);

    function pc(t) {
        this.validateExtent_(), this.updateBox_()
    }

    var dc = "units", fc = "degrees", _c = "imperial", gc = "nautical", yc = "metric", vc = "us", mc = [1, 2, 5],
        xc = function (r) {
            function t(t) {
                var e = t || {}, i = void 0 !== e.className ? e.className : "ol-scale-line";
                r.call(this, {
                    element: document.createElement("div"),
                    render: e.render || Sc,
                    target: e.target
                }), this.innerElement_ = document.createElement("div"), this.innerElement_.className = i + "-inner", this.element.className = i + " " + _i, this.element.appendChild(this.innerElement_), this.viewState_ = null, this.minWidth_ = void 0 !== e.minWidth ? e.minWidth : 64, this.renderedVisible_ = !1, this.renderedWidth_ = void 0, this.renderedHTML_ = "", C(this, b(dc), this.handleUnitsChanged_, this), this.setUnits(e.units || yc)
            }

            return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype.getUnits = function () {
                return this.get(dc)
            }, t.prototype.handleUnitsChanged_ = function () {
                this.updateElement_()
            }, t.prototype.setUnits = function (t) {
                this.set(dc, t)
            }, t.prototype.updateElement_ = function () {
                var t = this.viewState_;
                if (t) {
                    var e = t.center, i = t.projection, r = this.getUnits(), n = r == fc ? Ot.DEGREES : Ot.METERS,
                        o = oe(i, t.resolution, e, n);
                    i.getUnits() != Ot.DEGREES && i.getMetersPerUnit() && n == Ot.METERS && (o *= i.getMetersPerUnit());
                    var s = this.minWidth_ * o, a = "";
                    if (r == fc) {
                        var h = Nt[Ot.DEGREES];
                        i.getUnits() == Ot.DEGREES ? s *= h : o /= h, s < h / 60 ? (a = "″", o *= 3600) : s < h ? (a = "′", o *= 60) : a = "°"
                    } else r == _c ? s < .9144 ? (a = "in", o /= .0254) : s < 1609.344 ? (a = "ft", o /= .3048) : (a = "mi", o /= 1609.344) : r == gc ? (o /= 1852, a = "nm") : r == yc ? s < .001 ? (a = "μm", o *= 1e6) : s < 1 ? (a = "mm", o *= 1e3) : s < 1e3 ? a = "m" : (a = "km", o /= 1e3) : r == vc ? s < .9144 ? (a = "in", o *= 39.37) : s < 1609.344 ? (a = "ft", o /= .30480061) : (a = "mi", o /= 1609.3472) : Z(!1, 33);
                    for (var l, u, c = 3 * Math.floor(Math.log(this.minWidth_ * o) / Math.log(10)); ;) {
                        if (l = mc[(c % 3 + 3) % 3] * Math.pow(10, Math.floor(c / 3)), u = Math.round(l / o), isNaN(u)) return this.element.style.display = "none", void (this.renderedVisible_ = !1);
                        if (u >= this.minWidth_) break;
                        ++c
                    }
                    var p = l + " " + a;
                    this.renderedHTML_ != p && (this.innerElement_.innerHTML = p, this.renderedHTML_ = p), this.renderedWidth_ != u && (this.innerElement_.style.width = u + "px", this.renderedWidth_ = u), this.renderedVisible_ || (this.element.style.display = "", this.renderedVisible_ = !0)
                } else this.renderedVisible_ && (this.element.style.display = "none", this.renderedVisible_ = !1)
            }, t
        }(Is);

    function Sc(t) {
        var e = t.frameState;
        this.viewState_ = e ? e.viewState : null, this.updateElement_()
    }

    var Ec = 0, Cc = 1, Tc = function (o) {
        function t(t) {
            var e = t || {};
            o.call(this, {
                element: document.createElement("div"),
                render: e.render || wc
            }), this.currentResolution_ = void 0, this.direction_ = Ec, this.dragging_, this.heightLimit_ = 0, this.widthLimit_ = 0, this.previousX_, this.previousY_, this.thumbSize_ = null, this.sliderInitialized_ = !1, this.duration_ = void 0 !== e.duration ? e.duration : 200;
            var i = void 0 !== e.className ? e.className : "ol-zoomslider", r = document.createElement("button");
            r.setAttribute("type", "button"), r.className = i + "-thumb " + _i;
            var n = this.element;
            n.className = i + " " + _i + " " + gi, n.appendChild(r), this.dragger_ = new Vo(n), C(this.dragger_, to, this.handleDraggerStart_, this), C(this.dragger_, $n, this.handleDraggerDrag_, this), C(this.dragger_, eo, this.handleDraggerEnd_, this), C(n, w.CLICK, this.handleContainerClick_, this), C(r, w.CLICK, x)
        }

        return o && (t.__proto__ = o), ((t.prototype = Object.create(o && o.prototype)).constructor = t).prototype.disposeInternal = function () {
            this.dragger_.dispose(), o.prototype.disposeInternal.call(this)
        }, t.prototype.setMap = function (t) {
            o.prototype.setMap.call(this, t), t && t.render()
        }, t.prototype.initSlider_ = function () {
            var t = this.element, e = t.offsetWidth, i = t.offsetHeight, r = t.firstElementChild,
                n = getComputedStyle(r), o = r.offsetWidth + parseFloat(n.marginRight) + parseFloat(n.marginLeft),
                s = r.offsetHeight + parseFloat(n.marginTop) + parseFloat(n.marginBottom);
            this.thumbSize_ = [o, s], i < e ? (this.direction_ = Cc, this.widthLimit_ = e - o) : (this.direction_ = Ec, this.heightLimit_ = i - s), this.sliderInitialized_ = !0
        }, t.prototype.handleContainerClick_ = function (t) {
            var e = this.getMap().getView(),
                i = this.getRelativePosition_(t.offsetX - this.thumbSize_[0] / 2, t.offsetY - this.thumbSize_[1] / 2),
                r = this.getResolutionForPosition_(i);
            e.animate({resolution: e.constrainResolution(r), duration: this.duration_, easing: Bn})
        }, t.prototype.handleDraggerStart_ = function (t) {
            this.dragging_ || t.originalEvent.target !== this.element.firstElementChild || (this.getMap().getView().setHint(is.INTERACTING, 1), this.previousX_ = t.clientX, this.previousY_ = t.clientY, this.dragging_ = !0)
        }, t.prototype.handleDraggerDrag_ = function (t) {
            if (this.dragging_) {
                var e = this.element.firstElementChild, i = t.clientX - this.previousX_ + parseInt(e.style.left, 10),
                    r = t.clientY - this.previousY_ + parseInt(e.style.top, 10), n = this.getRelativePosition_(i, r);
                this.currentResolution_ = this.getResolutionForPosition_(n), this.getMap().getView().setResolution(this.currentResolution_), this.setThumbPosition_(this.currentResolution_), this.previousX_ = t.clientX, this.previousY_ = t.clientY
            }
        }, t.prototype.handleDraggerEnd_ = function (t) {
            if (this.dragging_) {
                var e = this.getMap().getView();
                e.setHint(is.INTERACTING, -1), e.animate({
                    resolution: e.constrainResolution(this.currentResolution_),
                    duration: this.duration_,
                    easing: Bn
                }), this.dragging_ = !1, this.previousX_ = void 0, this.previousY_ = void 0
            }
        }, t.prototype.setThumbPosition_ = function (t) {
            var e = this.getPositionForResolution_(t), i = this.element.firstElementChild;
            this.direction_ == Cc ? i.style.left = this.widthLimit_ * e + "px" : i.style.top = this.heightLimit_ * e + "px"
        }, t.prototype.getRelativePosition_ = function (t, e) {
            return gt(this.direction_ === Cc ? t / this.widthLimit_ : e / this.heightLimit_, 0, 1)
        }, t.prototype.getResolutionForPosition_ = function (t) {
            return this.getMap().getView().getResolutionForValueFunction()(1 - t)
        }, t.prototype.getPositionForResolution_ = function (t) {
            return 1 - this.getMap().getView().getValueForResolutionFunction()(t)
        }, t
    }(Is);

    function wc(t) {
        if (t.frameState) {
            this.sliderInitialized_ || this.initSlider_();
            var e = t.frameState.viewState.resolution;
            e !== this.currentResolution_ && (this.currentResolution_ = e, this.setThumbPosition_(e))
        }
    }

    var Rc = function (h) {
        function t(t) {
            var e = t || {};
            h.call(this, {
                element: document.createElement("div"),
                target: e.target
            }), this.extent = e.extent ? e.extent : null;
            var i = void 0 !== e.className ? e.className : "ol-zoom-extent", r = void 0 !== e.label ? e.label : "E",
                n = void 0 !== e.tipLabel ? e.tipLabel : "Fit to extent", o = document.createElement("button");
            o.setAttribute("type", "button"), o.title = n, o.appendChild("string" == typeof r ? document.createTextNode(r) : r), C(o, w.CLICK, this.handleClick_, this);
            var s = i + " " + _i + " " + gi, a = this.element;
            a.className = s, a.appendChild(o)
        }

        return h && (t.__proto__ = h), ((t.prototype = Object.create(h && h.prototype)).constructor = t).prototype.handleClick_ = function (t) {
            t.preventDefault(), this.handleZoomToExtent()
        }, t.prototype.handleZoomToExtent = function () {
            var t = this.getMap().getView(), e = this.extent ? this.extent : t.getProjection().getExtent();
            t.fit(e)
        }, t
    }(Is), Ic = function (t) {
        this.source_ = t
    };
    Ic.prototype.getType = function () {
    }, Ic.prototype.getSource = function () {
        return this.source_
    }, Ic.prototype.isAnimated = v;
    var Lc = function (e) {
            function t(t) {
                e.call(this, t)
            }

            return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.getType = function () {
                return 35632
            }, t
        }(Ic), bc = function (e) {
            function t(t) {
                e.call(this, t)
            }

            return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.getType = function () {
                return 35633
            }, t
        }(Ic),
        Fc = new Lc("precision mediump float;\nvarying vec2 v_center;\nvarying vec2 v_offset;\nvarying float v_halfWidth;\nvarying float v_pixelRatio;\n\n\n\nuniform float u_opacity;\nuniform vec4 u_fillColor;\nuniform vec4 u_strokeColor;\nuniform vec2 u_size;\n\nvoid main(void) {\n  vec2 windowCenter = vec2((v_center.x + 1.0) / 2.0 * u_size.x * v_pixelRatio,\n      (v_center.y + 1.0) / 2.0 * u_size.y * v_pixelRatio);\n  vec2 windowOffset = vec2((v_offset.x + 1.0) / 2.0 * u_size.x * v_pixelRatio,\n      (v_offset.y + 1.0) / 2.0 * u_size.y * v_pixelRatio);\n  float radius = length(windowCenter - windowOffset);\n  float dist = length(windowCenter - gl_FragCoord.xy);\n  if (dist > radius + v_halfWidth) {\n    if (u_strokeColor.a == 0.0) {\n      gl_FragColor = u_fillColor;\n    } else {\n      gl_FragColor = u_strokeColor;\n    }\n    gl_FragColor.a = gl_FragColor.a - (dist - (radius + v_halfWidth));\n  } else if (u_fillColor.a == 0.0) {\n    // Hooray, no fill, just stroke. We can use real antialiasing.\n    gl_FragColor = u_strokeColor;\n    if (dist < radius - v_halfWidth) {\n      gl_FragColor.a = gl_FragColor.a - (radius - v_halfWidth - dist);\n    }\n  } else {\n    gl_FragColor = u_fillColor;\n    float strokeDist = radius - v_halfWidth;\n    float antialias = 2.0 * v_pixelRatio;\n    if (dist > strokeDist) {\n      gl_FragColor = u_strokeColor;\n    } else if (dist >= strokeDist - antialias) {\n      float step = smoothstep(strokeDist - antialias, strokeDist, dist);\n      gl_FragColor = mix(u_fillColor, u_strokeColor, step);\n    }\n  }\n  gl_FragColor.a = gl_FragColor.a * u_opacity;\n  if (gl_FragColor.a <= 0.0) {\n    discard;\n  }\n}\n"),
        Pc = new bc("varying vec2 v_center;\nvarying vec2 v_offset;\nvarying float v_halfWidth;\nvarying float v_pixelRatio;\n\n\nattribute vec2 a_position;\nattribute float a_instruction;\nattribute float a_radius;\n\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_offsetScaleMatrix;\nuniform mat4 u_offsetRotateMatrix;\nuniform float u_lineWidth;\nuniform float u_pixelRatio;\n\nvoid main(void) {\n  mat4 offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;\n  v_center = vec4(u_projectionMatrix * vec4(a_position, 0.0, 1.0)).xy;\n  v_pixelRatio = u_pixelRatio;\n  float lineWidth = u_lineWidth * u_pixelRatio;\n  v_halfWidth = lineWidth / 2.0;\n  if (lineWidth == 0.0) {\n    lineWidth = 2.0 * u_pixelRatio;\n  }\n  vec2 offset;\n  // Radius with anitaliasing (roughly).\n  float radius = a_radius + 3.0 * u_pixelRatio;\n  // Until we get gl_VertexID in WebGL, we store an instruction.\n  if (a_instruction == 0.0) {\n    // Offsetting the edges of the triangle by lineWidth / 2 is necessary, however\n    // we should also leave some space for the antialiasing, thus we offset by lineWidth.\n    offset = vec2(-1.0, 1.0);\n  } else if (a_instruction == 1.0) {\n    offset = vec2(-1.0, -1.0);\n  } else if (a_instruction == 2.0) {\n    offset = vec2(1.0, -1.0);\n  } else {\n    offset = vec2(1.0, 1.0);\n  }\n\n  gl_Position = u_projectionMatrix * vec4(a_position + offset * radius, 0.0, 1.0) +\n      offsetMatrix * vec4(offset * lineWidth, 0.0, 0.0);\n  v_offset = vec4(u_projectionMatrix * vec4(a_position.x + a_radius, a_position.y,\n      0.0, 1.0)).xy;\n\n  if (distance(v_center, v_offset) > 20000.0) {\n    gl_Position = vec4(v_center, 0.0, 1.0);\n  }\n}\n\n\n"),
        Mc = function (t, e) {
            this.u_projectionMatrix = t.getUniformLocation(e, "u_projectionMatrix"), this.u_offsetScaleMatrix = t.getUniformLocation(e, "u_offsetScaleMatrix"), this.u_offsetRotateMatrix = t.getUniformLocation(e, "u_offsetRotateMatrix"), this.u_lineWidth = t.getUniformLocation(e, "u_lineWidth"), this.u_pixelRatio = t.getUniformLocation(e, "u_pixelRatio"), this.u_opacity = t.getUniformLocation(e, "u_opacity"), this.u_fillColor = t.getUniformLocation(e, "u_fillColor"), this.u_strokeColor = t.getUniformLocation(e, "u_strokeColor"), this.u_size = t.getUniformLocation(e, "u_size"), this.a_position = t.getAttribLocation(e, "a_position"), this.a_instruction = t.getAttribLocation(e, "a_instruction"), this.a_radius = t.getAttribLocation(e, "a_radius")
        };

    function Oc(t, e) {
        return t[0] = e[0], t[1] = e[1], t[4] = e[2], t[5] = e[3], t[12] = e[4], t[13] = e[5], t
    }

    var Nc = function (i) {
            function t(t, e) {
                i.call(this), this.tolerance = t, this.maxExtent = e, this.origin = ot(e), this.projectionMatrix_ = [1, 0, 0, 1, 0, 0], this.offsetRotateMatrix_ = [1, 0, 0, 1, 0, 0], this.offsetScaleMatrix_ = [1, 0, 0, 1, 0, 0], this.tmpMat4_ = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.indices = [], this.indicesBuffer = null, this.startIndices = [], this.startIndicesFeature = [], this.vertices = [], this.verticesBuffer = null, this.lineStringReplay = void 0
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.getDeleteResourcesFunction = function (t) {
            }, t.prototype.finish = function (t) {
            }, t.prototype.setUpProgram = function (t, e, i, r) {
            }, t.prototype.shutDownProgram = function (t, e) {
            }, t.prototype.drawReplay = function (t, e, i, r) {
            }, t.prototype.drawHitDetectionReplayOneByOne = function (t, e, i, r, n) {
            }, t.prototype.drawHitDetectionReplay = function (t, e, i, r, n, o) {
                return n ? this.drawHitDetectionReplayOneByOne(t, e, i, r, o) : this.drawHitDetectionReplayAll(t, e, i, r)
            }, t.prototype.drawHitDetectionReplayAll = function (t, e, i, r) {
                t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawReplay(t, e, i, !0);
                var n = r(null);
                return n || void 0
            }, t.prototype.replay = function (t, e, i, r, n, o, s, a, h, l, u) {
                var c, p, d, f, _, g, y, v, m = t.getGL();
                this.lineStringReplay && (c = m.isEnabled(m.STENCIL_TEST), p = m.getParameter(m.STENCIL_FUNC), d = m.getParameter(m.STENCIL_VALUE_MASK), f = m.getParameter(m.STENCIL_REF), _ = m.getParameter(m.STENCIL_WRITEMASK), g = m.getParameter(m.STENCIL_FAIL), y = m.getParameter(m.STENCIL_PASS_DEPTH_PASS), v = m.getParameter(m.STENCIL_PASS_DEPTH_FAIL), m.enable(m.STENCIL_TEST), m.clear(m.STENCIL_BUFFER_BIT), m.stencilMask(255), m.stencilFunc(m.ALWAYS, 1, 255), m.stencilOp(m.KEEP, m.KEEP, m.REPLACE), this.lineStringReplay.replay(t, e, i, r, n, o, s, a, h, l, u), m.stencilMask(0), m.stencilFunc(m.NOTEQUAL, 1, 255)), t.bindBuffer(ze, this.verticesBuffer), t.bindBuffer(34963, this.indicesBuffer);
                var x = this.setUpProgram(m, t, n, o), S = ge(this.projectionMatrix_);
                Ee(S, 2 / (i * n[0]), 2 / (i * n[1])), Se(S, -r), Ce(S, -(e[0] - this.origin[0]), -(e[1] - this.origin[1]));
                var E = ge(this.offsetScaleMatrix_);
                Ee(E, 2 / n[0], 2 / n[1]);
                var C, T = ge(this.offsetRotateMatrix_);
                return 0 !== r && Se(T, -r), m.uniformMatrix4fv(x.u_projectionMatrix, !1, Oc(this.tmpMat4_, S)), m.uniformMatrix4fv(x.u_offsetScaleMatrix, !1, Oc(this.tmpMat4_, E)), m.uniformMatrix4fv(x.u_offsetRotateMatrix, !1, Oc(this.tmpMat4_, T)), m.uniform1f(x.u_opacity, s), void 0 === h ? this.drawReplay(m, t, a, !1) : C = this.drawHitDetectionReplay(m, t, a, h, l, u), this.shutDownProgram(m, x), this.lineStringReplay && (c || m.disable(m.STENCIL_TEST), m.clear(m.STENCIL_BUFFER_BIT), m.stencilFunc(p, f, d), m.stencilMask(_), m.stencilOp(g, v, y)), C
            }, t.prototype.drawElements = function (t, e, i, r) {
                var n = e.hasOESElementIndexUint ? 5125 : 5123, o = r - i, s = i * (e.hasOESElementIndexUint ? 4 : 2);
                t.drawElements(4, o, n, s)
            }, t
        }(Ml), Ac = [0, 0, 0, 1], Gc = [], kc = [0, 0, 0, 1], Dc = Number.EPSILON || 2220446049250313e-31,
        jc = function (t, e, i, r, n, o) {
            var s = (i - t) * (o - e) - (n - t) * (r - e);
            return s <= Dc && -Dc <= s ? void 0 : 0 < s
        }, Uc = 35044, Yc = function (t, e) {
            this.arr_ = void 0 !== t ? t : [], this.usage_ = void 0 !== e ? e : Uc
        };
    Yc.prototype.getArray = function () {
        return this.arr_
    }, Yc.prototype.getUsage = function () {
        return this.usage_
    };
    var Bc = function (i) {
            function t(t, e) {
                i.call(this, t, e), this.defaultLocations_ = null, this.styles_ = [], this.styleIndices_ = [], this.radius_ = 0, this.state_ = {
                    fillColor: null,
                    strokeColor: null,
                    lineDash: null,
                    lineDashOffset: void 0,
                    lineWidth: void 0,
                    changed: !1
                }
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.drawCoordinates_ = function (t, e, i, r) {
                var n, o, s = this, a = this.vertices.length, h = this.indices.length, l = a / 4;
                for (n = e, o = i; n < o; n += r) s.vertices[a++] = t[n], s.vertices[a++] = t[n + 1], s.vertices[a++] = 0, s.vertices[a++] = s.radius_, s.vertices[a++] = t[n], s.vertices[a++] = t[n + 1], s.vertices[a++] = 1, s.vertices[a++] = s.radius_, s.vertices[a++] = t[n], s.vertices[a++] = t[n + 1], s.vertices[a++] = 2, s.vertices[a++] = s.radius_, s.vertices[a++] = t[n], s.vertices[a++] = t[n + 1], s.vertices[a++] = 3, s.vertices[a++] = s.radius_, s.indices[h++] = l, s.indices[h++] = l + 1, s.indices[h++] = l + 2, s.indices[h++] = l + 2, s.indices[h++] = l + 3, s.indices[h++] = l, l += 4
            }, t.prototype.drawCircle = function (t, e) {
                var i = t.getRadius(), r = t.getStride();
                if (i) {
                    this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e), this.state_.changed && (this.styleIndices_.push(this.indices.length), this.state_.changed = !1), this.radius_ = i;
                    var n = t.getFlatCoordinates();
                    n = _t(n, 0, 2, r, -this.origin[0], -this.origin[1]), this.drawCoordinates_(n, 0, 2, r)
                } else if (this.state_.changed && (this.styles_.pop(), this.styles_.length)) {
                    var o = this.styles_[this.styles_.length - 1];
                    this.state_.fillColor = o[0], this.state_.strokeColor = o[1], this.state_.lineWidth = o[2], this.state_.changed = !1
                }
            }, t.prototype.finish = function (t) {
                this.verticesBuffer = new Yc(this.vertices), this.indicesBuffer = new Yc(this.indices), this.startIndices.push(this.indices.length), 0 === this.styleIndices_.length && 0 < this.styles_.length && (this.styles_ = []), this.vertices = null, this.indices = null
            }, t.prototype.getDeleteResourcesFunction = function (t) {
                var e = this.verticesBuffer, i = this.indicesBuffer;
                return function () {
                    t.deleteBuffer(e), t.deleteBuffer(i)
                }
            }, t.prototype.setUpProgram = function (t, e, i, r) {
                var n, o = e.getProgram(Fc, Pc);
                return this.defaultLocations_ ? n = this.defaultLocations_ : (n = new Mc(t, o), this.defaultLocations_ = n), e.useProgram(o), t.enableVertexAttribArray(n.a_position), t.vertexAttribPointer(n.a_position, 2, Ve, !1, 16, 0), t.enableVertexAttribArray(n.a_instruction), t.vertexAttribPointer(n.a_instruction, 1, Ve, !1, 16, 8), t.enableVertexAttribArray(n.a_radius), t.vertexAttribPointer(n.a_radius, 1, Ve, !1, 16, 12), t.uniform2fv(n.u_size, i), t.uniform1f(n.u_pixelRatio, r), n
            }, t.prototype.shutDownProgram = function (t, e) {
                t.disableVertexAttribArray(e.a_position), t.disableVertexAttribArray(e.a_instruction), t.disableVertexAttribArray(e.a_radius)
            }, t.prototype.drawReplay = function (t, e, i, r) {
                var n, o, s, a;
                if (Tt(i)) for (s = this.startIndices[this.startIndices.length - 1], n = this.styleIndices_.length - 1; 0 <= n; --n) o = this.styleIndices_[n], a = this.styles_[n], this.setFillStyle_(t, a[0]), this.setStrokeStyle_(t, a[1], a[2]), this.drawElements(t, e, o, s), s = o; else this.drawReplaySkipping_(t, e, i)
            }, t.prototype.drawHitDetectionReplayOneByOne = function (t, e, i, r, n) {
                var o, s, a, h, l, u, c;
                for (c = this.startIndices.length - 2, a = this.startIndices[c + 1], o = this.styleIndices_.length - 1; 0 <= o; --o) for (h = this.styles_[o], this.setFillStyle_(t, h[0]), this.setStrokeStyle_(t, h[1], h[2]), l = this.styleIndices_[o]; 0 <= c && this.startIndices[c] >= l;) {
                    if (s = this.startIndices[c], void 0 === i[Ct(u = this.startIndicesFeature[c]).toString()] && u.getGeometry() && (void 0 === n || wt(n, u.getGeometry().getExtent()))) {
                        t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawElements(t, e, s, a);
                        var p = r(u);
                        if (p) return p
                    }
                    c--, a = s
                }
            }, t.prototype.drawReplaySkipping_ = function (t, e, i) {
                var r, n, o, s, a, h, l;
                for (h = this.startIndices.length - 2, o = n = this.startIndices[h + 1], r = this.styleIndices_.length - 1; 0 <= r; --r) {
                    for (s = this.styles_[r], this.setFillStyle_(t, s[0]), this.setStrokeStyle_(t, s[1], s[2]), a = this.styleIndices_[r]; 0 <= h && this.startIndices[h] >= a;) l = this.startIndices[h], i[Ct(this.startIndicesFeature[h]).toString()] && (n !== o && this.drawElements(t, e, n, o), o = l), h--, n = l;
                    n !== o && this.drawElements(t, e, n, o), n = o = a
                }
            }, t.prototype.setFillStyle_ = function (t, e) {
                t.uniform4fv(this.defaultLocations_.u_fillColor, e)
            }, t.prototype.setStrokeStyle_ = function (t, e, i) {
                t.uniform4fv(this.defaultLocations_.u_strokeColor, e), t.uniform1f(this.defaultLocations_.u_lineWidth, i)
            }, t.prototype.setFillStrokeStyle = function (t, e) {
                var i, r;
                if (e) {
                    var n = e.getLineDash();
                    this.state_.lineDash = n || Gc;
                    var o = e.getLineDashOffset();
                    this.state_.lineDashOffset = o || 0, i = (i = e.getColor()) instanceof CanvasGradient || i instanceof CanvasPattern ? kc : Ne(i).map(function (t, e) {
                        return 3 != e ? t / 255 : t
                    }) || kc, r = void 0 !== (r = e.getWidth()) ? r : 1
                } else i = [0, 0, 0, 0], r = 0;
                var s = t ? t.getColor() : [0, 0, 0, 0];
                s = s instanceof CanvasGradient || s instanceof CanvasPattern ? Ac : Ne(s).map(function (t, e) {
                    return 3 != e ? t / 255 : t
                }) || Ac, this.state_.strokeColor && fr(this.state_.strokeColor, i) && this.state_.fillColor && fr(this.state_.fillColor, s) && this.state_.lineWidth === r || (this.state_.changed = !0, this.state_.fillColor = s, this.state_.strokeColor = i, this.state_.lineWidth = r, this.styles_.push([s, i, r]))
            }, t
        }(Nc),
        Xc = new Lc("precision mediump float;\nvarying vec2 v_texCoord;\nvarying float v_opacity;\n\nuniform float u_opacity;\nuniform sampler2D u_image;\n\nvoid main(void) {\n  vec4 texColor = texture2D(u_image, v_texCoord);\n  gl_FragColor.rgb = texColor.rgb;\n  float alpha = texColor.a * v_opacity * u_opacity;\n  if (alpha == 0.0) {\n    discard;\n  }\n  gl_FragColor.a = alpha;\n}\n"),
        zc = new bc("varying vec2 v_texCoord;\nvarying float v_opacity;\n\nattribute vec2 a_position;\nattribute vec2 a_texCoord;\nattribute vec2 a_offsets;\nattribute float a_opacity;\nattribute float a_rotateWithView;\n\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_offsetScaleMatrix;\nuniform mat4 u_offsetRotateMatrix;\n\nvoid main(void) {\n  mat4 offsetMatrix = u_offsetScaleMatrix;\n  if (a_rotateWithView == 1.0) {\n    offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;\n  }\n  vec4 offsets = offsetMatrix * vec4(a_offsets, 0.0, 0.0);\n  gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0) + offsets;\n  v_texCoord = a_texCoord;\n  v_opacity = a_opacity;\n}\n\n\n"),
        Vc = function (t, e) {
            this.u_projectionMatrix = t.getUniformLocation(e, "u_projectionMatrix"), this.u_offsetScaleMatrix = t.getUniformLocation(e, "u_offsetScaleMatrix"), this.u_offsetRotateMatrix = t.getUniformLocation(e, "u_offsetRotateMatrix"), this.u_opacity = t.getUniformLocation(e, "u_opacity"), this.u_image = t.getUniformLocation(e, "u_image"), this.a_position = t.getAttribLocation(e, "a_position"), this.a_texCoord = t.getAttribLocation(e, "a_texCoord"), this.a_offsets = t.getAttribLocation(e, "a_offsets"), this.a_opacity = t.getAttribLocation(e, "a_opacity"), this.a_rotateWithView = t.getAttribLocation(e, "a_rotateWithView")
        }, Wc = "webglcontextlost", Kc = "webglcontextrestored", Hc = function (i) {
            function t(t, e) {
                i.call(this), this.canvas_ = t, this.gl_ = e, this.bufferCache_ = {}, this.shaderCache_ = {}, this.programCache_ = {}, this.currentProgram_ = null, this.hitDetectionFramebuffer_ = null, this.hitDetectionTexture_ = null, this.hitDetectionRenderbuffer_ = null, this.hasOESElementIndexUint = lr(Xe, "OES_element_index_uint"), this.hasOESElementIndexUint && e.getExtension("OES_element_index_uint"), C(this.canvas_, Wc, this.handleWebGLContextLost, this), C(this.canvas_, Kc, this.handleWebGLContextRestored, this)
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.bindBuffer = function (t, e) {
                var i = this.getGL(), r = e.getArray(), n = String(Ct(e));
                if (n in this.bufferCache_) {
                    var o = this.bufferCache_[n];
                    i.bindBuffer(t, o.buffer)
                } else {
                    var s, a = i.createBuffer();
                    i.bindBuffer(t, a), t == ze ? s = new Float32Array(r) : 34963 == t && (s = this.hasOESElementIndexUint ? new Uint32Array(r) : new Uint16Array(r)), i.bufferData(t, s, e.getUsage()), this.bufferCache_[n] = {
                        buf: e,
                        buffer: a
                    }
                }
            }, t.prototype.deleteBuffer = function (t) {
                var e = this.getGL(), i = String(Ct(t)), r = this.bufferCache_[i];
                e.isContextLost() || e.deleteBuffer(r.buffer), delete this.bufferCache_[i]
            }, t.prototype.disposeInternal = function () {
                f(this.canvas_);
                var t = this.getGL();
                if (!t.isContextLost()) {
                    for (var e in this.bufferCache_) t.deleteBuffer(this.bufferCache_[e].buffer);
                    for (var i in this.programCache_) t.deleteProgram(this.programCache_[i]);
                    for (var r in this.shaderCache_) t.deleteShader(this.shaderCache_[r]);
                    t.deleteFramebuffer(this.hitDetectionFramebuffer_), t.deleteRenderbuffer(this.hitDetectionRenderbuffer_), t.deleteTexture(this.hitDetectionTexture_)
                }
            }, t.prototype.getCanvas = function () {
                return this.canvas_
            }, t.prototype.getGL = function () {
                return this.gl_
            }, t.prototype.getHitDetectionFramebuffer = function () {
                return this.hitDetectionFramebuffer_ || this.initHitDetectionFramebuffer_(), this.hitDetectionFramebuffer_
            }, t.prototype.getShader = function (t) {
                var e = String(Ct(t));
                if (e in this.shaderCache_) return this.shaderCache_[e];
                var i = this.getGL(), r = i.createShader(t.getType());
                return i.shaderSource(r, t.getSource()), i.compileShader(r), this.shaderCache_[e] = r
            }, t.prototype.getProgram = function (t, e) {
                var i = Ct(t) + "/" + Ct(e);
                if (i in this.programCache_) return this.programCache_[i];
                var r = this.getGL(), n = r.createProgram();
                return r.attachShader(n, this.getShader(t)), r.attachShader(n, this.getShader(e)), r.linkProgram(n), this.programCache_[i] = n
            }, t.prototype.handleWebGLContextLost = function () {
                _(this.bufferCache_), _(this.shaderCache_), _(this.programCache_), this.currentProgram_ = null, this.hitDetectionFramebuffer_ = null, this.hitDetectionTexture_ = null, this.hitDetectionRenderbuffer_ = null
            }, t.prototype.handleWebGLContextRestored = function () {
            }, t.prototype.initHitDetectionFramebuffer_ = function () {
                var t = this.gl_, e = t.createFramebuffer();
                t.bindFramebuffer(t.FRAMEBUFFER, e);
                var i = qc(t, 1, 1), r = t.createRenderbuffer();
                t.bindRenderbuffer(t.RENDERBUFFER, r), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, 1, 1), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, i, 0), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, r), t.bindTexture(t.TEXTURE_2D, null), t.bindRenderbuffer(t.RENDERBUFFER, null), t.bindFramebuffer(t.FRAMEBUFFER, null), this.hitDetectionFramebuffer_ = e, this.hitDetectionTexture_ = i, this.hitDetectionRenderbuffer_ = r
            }, t.prototype.useProgram = function (t) {
                return t != this.currentProgram_ && (this.getGL().useProgram(t), this.currentProgram_ = t, !0)
            }, t
        }(t);

    function Zc(t, e, i) {
        var r = t.createTexture();
        return t.bindTexture(t.TEXTURE_2D, r), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), void 0 !== e && t.texParameteri(He, We, e), void 0 !== i && t.texParameteri(He, Ke, i), r
    }

    function qc(t, e, i, r, n) {
        var o = Zc(t, r, n);
        return t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, e, i, 0, t.RGBA, t.UNSIGNED_BYTE, null), o
    }

    function Jc(t, e, i, r) {
        var n = Zc(t, i, r);
        return t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e), n
    }

    var Qc = function (i) {
        function t(t, e) {
            i.call(this, t, e), this.anchorX = void 0, this.anchorY = void 0, this.groupIndices = [], this.hitDetectionGroupIndices = [], this.height = void 0, this.imageHeight = void 0, this.imageWidth = void 0, this.defaultLocations = null, this.opacity = void 0, this.originX = void 0, this.originY = void 0, this.rotateWithView = void 0, this.rotation = void 0, this.scale = void 0, this.width = void 0
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.getDeleteResourcesFunction = function (i) {
            var r = this.verticesBuffer, n = this.indicesBuffer, o = this.getTextures(!0), s = i.getGL();
            return function () {
                var t, e;
                if (!s.isContextLost()) for (t = 0, e = o.length; t < e; ++t) s.deleteTexture(o[t]);
                i.deleteBuffer(r), i.deleteBuffer(n)
            }
        }, t.prototype.drawCoordinates = function (t, e, i, r) {
            var n, o, s, a, h, l, u = this, c = this.anchorX, p = this.anchorY, d = this.height, f = this.imageHeight,
                _ = this.imageWidth, g = this.opacity, y = this.originX, v = this.originY,
                m = this.rotateWithView ? 1 : 0, x = -this.rotation, S = this.scale, E = this.width, C = Math.cos(x),
                T = Math.sin(x), w = this.indices.length, R = this.vertices.length;
            for (n = e; n < i; n += r) h = t[n] - u.origin[0], l = t[n + 1] - u.origin[1], o = R / 8, s = -S * c, a = -S * (d - p), u.vertices[R++] = h, u.vertices[R++] = l, u.vertices[R++] = s * C - a * T, u.vertices[R++] = s * T + a * C, u.vertices[R++] = y / _, u.vertices[R++] = (v + d) / f, u.vertices[R++] = g, u.vertices[R++] = m, s = S * (E - c), a = -S * (d - p), u.vertices[R++] = h, u.vertices[R++] = l, u.vertices[R++] = s * C - a * T, u.vertices[R++] = s * T + a * C, u.vertices[R++] = (y + E) / _, u.vertices[R++] = (v + d) / f, u.vertices[R++] = g, u.vertices[R++] = m, s = S * (E - c), a = S * p, u.vertices[R++] = h, u.vertices[R++] = l, u.vertices[R++] = s * C - a * T, u.vertices[R++] = s * T + a * C, u.vertices[R++] = (y + E) / _, u.vertices[R++] = v / f, u.vertices[R++] = g, u.vertices[R++] = m, s = -S * c, a = S * p, u.vertices[R++] = h, u.vertices[R++] = l, u.vertices[R++] = s * C - a * T, u.vertices[R++] = s * T + a * C, u.vertices[R++] = y / _, u.vertices[R++] = v / f, u.vertices[R++] = g, u.vertices[R++] = m, u.indices[w++] = o, u.indices[w++] = o + 1, u.indices[w++] = o + 2, u.indices[w++] = o, u.indices[w++] = o + 2, u.indices[w++] = o + 3;
            return R
        }, t.prototype.createTextures = function (t, e, i, r) {
            var n, o, s, a, h = e.length;
            for (a = 0; a < h; ++a) (s = Ct(o = e[a]).toString()) in i ? n = i[s] : (n = Jc(r, o, Ze, Ze), i[s] = n), t[a] = n
        }, t.prototype.setUpProgram = function (t, e, i, r) {
            var n, o = e.getProgram(Xc, zc);
            return this.defaultLocations ? n = this.defaultLocations : (n = new Vc(t, o), this.defaultLocations = n), e.useProgram(o), t.enableVertexAttribArray(n.a_position), t.vertexAttribPointer(n.a_position, 2, Ve, !1, 32, 0), t.enableVertexAttribArray(n.a_offsets), t.vertexAttribPointer(n.a_offsets, 2, Ve, !1, 32, 8), t.enableVertexAttribArray(n.a_texCoord), t.vertexAttribPointer(n.a_texCoord, 2, Ve, !1, 32, 16), t.enableVertexAttribArray(n.a_opacity), t.vertexAttribPointer(n.a_opacity, 1, Ve, !1, 32, 24), t.enableVertexAttribArray(n.a_rotateWithView), t.vertexAttribPointer(n.a_rotateWithView, 1, Ve, !1, 32, 28), n
        }, t.prototype.shutDownProgram = function (t, e) {
            t.disableVertexAttribArray(e.a_position), t.disableVertexAttribArray(e.a_offsets), t.disableVertexAttribArray(e.a_texCoord), t.disableVertexAttribArray(e.a_opacity), t.disableVertexAttribArray(e.a_rotateWithView)
        }, t.prototype.drawReplay = function (t, e, i, r) {
            var n, o, s, a = r ? this.getHitDetectionTextures() : this.getTextures(),
                h = r ? this.hitDetectionGroupIndices : this.groupIndices;
            if (Tt(i)) for (n = 0, o = a.length, s = 0; n < o; ++n) {
                t.bindTexture(He, a[n]);
                var l = h[n];
                this.drawElements(t, e, s, l), s = l
            } else this.drawReplaySkipping(t, e, i, a, h)
        }, t.prototype.drawReplaySkipping = function (t, e, i, r, n) {
            var o, s, a = 0;
            for (o = 0, s = r.length; o < s; ++o) {
                t.bindTexture(He, r[o]);
                for (var h = 0 < o ? n[o - 1] : 0, l = n[o], u = h, c = h; a < this.startIndices.length && this.startIndices[a] <= l;) {
                    void 0 !== i[Ct(this.startIndicesFeature[a]).toString()] ? (u !== c && this.drawElements(t, e, u, c), c = u = a === this.startIndices.length - 1 ? l : this.startIndices[a + 1]) : c = a === this.startIndices.length - 1 ? l : this.startIndices[a + 1], a++
                }
                u !== c && this.drawElements(t, e, u, c)
            }
        }, t.prototype.drawHitDetectionReplayOneByOne = function (t, e, i, r, n) {
            var o, s, a, h, l, u = this.startIndices.length - 1, c = this.getHitDetectionTextures();
            for (o = c.length - 1; 0 <= o; --o) for (t.bindTexture(He, c[o]), s = 0 < o ? this.hitDetectionGroupIndices[o - 1] : 0, h = this.hitDetectionGroupIndices[o]; 0 <= u && this.startIndices[u] >= s;) {
                if (a = this.startIndices[u], void 0 === i[Ct(l = this.startIndicesFeature[u]).toString()] && l.getGeometry() && (void 0 === n || wt(n, l.getGeometry().getExtent()))) {
                    t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawElements(t, e, a, h);
                    var p = r(l);
                    if (p) return p
                }
                h = a, u--
            }
        }, t.prototype.finish = function (t) {
            this.anchorX = void 0, this.anchorY = void 0, this.height = void 0, this.imageHeight = void 0, this.imageWidth = void 0, this.indices = null, this.opacity = void 0, this.originX = void 0, this.originY = void 0, this.rotateWithView = void 0, this.rotation = void 0, this.scale = void 0, this.vertices = null, this.width = void 0
        }, t.prototype.getTextures = function (t) {
        }, t.prototype.getHitDetectionTextures = function () {
        }, t
    }(Nc), $c = function (n) {
        function t(t, e) {
            n.call(this, t, e), this.images_ = [], this.hitDetectionImages_ = [], this.textures_ = [], this.hitDetectionTextures_ = []
        }

        return n && (t.__proto__ = n), ((t.prototype = Object.create(n && n.prototype)).constructor = t).prototype.drawMultiPoint = function (t, e) {
            this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e);
            var i = t.getFlatCoordinates(), r = t.getStride();
            this.drawCoordinates(i, 0, i.length, r)
        }, t.prototype.drawPoint = function (t, e) {
            this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e);
            var i = t.getFlatCoordinates(), r = t.getStride();
            this.drawCoordinates(i, 0, i.length, r)
        }, t.prototype.finish = function (t) {
            var e = t.getGL();
            this.groupIndices.push(this.indices.length), this.hitDetectionGroupIndices.push(this.indices.length), this.verticesBuffer = new Yc(this.vertices);
            var i = this.indices;
            this.indicesBuffer = new Yc(i);
            var r = {};
            this.createTextures(this.textures_, this.images_, r, e), this.createTextures(this.hitDetectionTextures_, this.hitDetectionImages_, r, e), this.images_ = null, this.hitDetectionImages_ = null, n.prototype.finish.call(this, t)
        }, t.prototype.setImageStyle = function (t) {
            var e = t.getAnchor(), i = t.getImage(1), r = t.getImageSize(), n = t.getHitDetectionImage(1),
                o = t.getOpacity(), s = t.getOrigin(), a = t.getRotateWithView(), h = t.getRotation(), l = t.getSize(),
                u = t.getScale();
            0 === this.images_.length ? this.images_.push(i) : Ct(this.images_[this.images_.length - 1]) != Ct(i) && (this.groupIndices.push(this.indices.length), this.images_.push(i)), 0 === this.hitDetectionImages_.length ? this.hitDetectionImages_.push(n) : Ct(this.hitDetectionImages_[this.hitDetectionImages_.length - 1]) != Ct(n) && (this.hitDetectionGroupIndices.push(this.indices.length), this.hitDetectionImages_.push(n)), this.anchorX = e[0], this.anchorY = e[1], this.height = l[1], this.imageHeight = r[1], this.imageWidth = r[0], this.opacity = o, this.originX = s[0], this.originY = s[1], this.rotation = h, this.rotateWithView = a, this.scale = u, this.width = l[0]
        }, t.prototype.getTextures = function (t) {
            return t ? this.textures_.concat(this.hitDetectionTextures_) : this.textures_
        }, t.prototype.getHitDetectionTextures = function () {
            return this.hitDetectionTextures_
        }, t
    }(Qc);

    function tp(t, e, i, r) {
        var n = i - r;
        return t[e] === t[n] && t[e + 1] === t[n + 1] && 3 < (i - e) / r && !!xr(t, e, i, r)
    }

    var ep = new Lc("precision mediump float;\nvarying float v_round;\nvarying vec2 v_roundVertex;\nvarying float v_halfWidth;\n\n\n\nuniform float u_opacity;\nuniform vec4 u_color;\nuniform vec2 u_size;\nuniform float u_pixelRatio;\n\nvoid main(void) {\n  if (v_round > 0.0) {\n    vec2 windowCoords = vec2((v_roundVertex.x + 1.0) / 2.0 * u_size.x * u_pixelRatio,\n        (v_roundVertex.y + 1.0) / 2.0 * u_size.y * u_pixelRatio);\n    if (length(windowCoords - gl_FragCoord.xy) > v_halfWidth * u_pixelRatio) {\n      discard;\n    }\n  }\n  gl_FragColor = u_color;\n  float alpha = u_color.a * u_opacity;\n  if (alpha == 0.0) {\n    discard;\n  }\n  gl_FragColor.a = alpha;\n}\n"),
        ip = new bc("varying float v_round;\nvarying vec2 v_roundVertex;\nvarying float v_halfWidth;\n\n\nattribute vec2 a_lastPos;\nattribute vec2 a_position;\nattribute vec2 a_nextPos;\nattribute float a_direction;\n\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_offsetScaleMatrix;\nuniform mat4 u_offsetRotateMatrix;\nuniform float u_lineWidth;\nuniform float u_miterLimit;\n\nbool nearlyEquals(in float value, in float ref) {\n  float epsilon = 0.000000000001;\n  return value >= ref - epsilon && value <= ref + epsilon;\n}\n\nvoid alongNormal(out vec2 offset, in vec2 nextP, in float turnDir, in float direction) {\n  vec2 dirVect = nextP - a_position;\n  vec2 normal = normalize(vec2(-turnDir * dirVect.y, turnDir * dirVect.x));\n  offset = u_lineWidth / 2.0 * normal * direction;\n}\n\nvoid miterUp(out vec2 offset, out float round, in bool isRound, in float direction) {\n  float halfWidth = u_lineWidth / 2.0;\n  vec2 tangent = normalize(normalize(a_nextPos - a_position) + normalize(a_position - a_lastPos));\n  vec2 normal = vec2(-tangent.y, tangent.x);\n  vec2 dirVect = a_nextPos - a_position;\n  vec2 tmpNormal = normalize(vec2(-dirVect.y, dirVect.x));\n  float miterLength = abs(halfWidth / dot(normal, tmpNormal));\n  offset = normal * direction * miterLength;\n  round = 0.0;\n  if (isRound) {\n    round = 1.0;\n  } else if (miterLength > u_miterLimit + u_lineWidth) {\n    offset = halfWidth * tmpNormal * direction;\n  }\n}\n\nbool miterDown(out vec2 offset, in vec4 projPos, in mat4 offsetMatrix, in float direction) {\n  bool degenerate = false;\n  vec2 tangent = normalize(normalize(a_nextPos - a_position) + normalize(a_position - a_lastPos));\n  vec2 normal = vec2(-tangent.y, tangent.x);\n  vec2 dirVect = a_lastPos - a_position;\n  vec2 tmpNormal = normalize(vec2(-dirVect.y, dirVect.x));\n  vec2 longOffset, shortOffset, longVertex;\n  vec4 shortProjVertex;\n  float halfWidth = u_lineWidth / 2.0;\n  if (length(a_nextPos - a_position) > length(a_lastPos - a_position)) {\n    longOffset = tmpNormal * direction * halfWidth;\n    shortOffset = normalize(vec2(dirVect.y, -dirVect.x)) * direction * halfWidth;\n    longVertex = a_nextPos;\n    shortProjVertex = u_projectionMatrix * vec4(a_lastPos, 0.0, 1.0);\n  } else {\n    shortOffset = tmpNormal * direction * halfWidth;\n    longOffset = normalize(vec2(dirVect.y, -dirVect.x)) * direction * halfWidth;\n    longVertex = a_lastPos;\n    shortProjVertex = u_projectionMatrix * vec4(a_nextPos, 0.0, 1.0);\n  }\n  //Intersection algorithm based on theory by Paul Bourke (http://paulbourke.net/geometry/pointlineplane/).\n  vec4 p1 = u_projectionMatrix * vec4(longVertex, 0.0, 1.0) + offsetMatrix * vec4(longOffset, 0.0, 0.0);\n  vec4 p2 = projPos + offsetMatrix * vec4(longOffset, 0.0, 0.0);\n  vec4 p3 = shortProjVertex + offsetMatrix * vec4(-shortOffset, 0.0, 0.0);\n  vec4 p4 = shortProjVertex + offsetMatrix * vec4(shortOffset, 0.0, 0.0);\n  float denom = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);\n  float firstU = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denom;\n  float secondU = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denom;\n  float epsilon = 0.000000000001;\n  if (firstU > epsilon && firstU < 1.0 - epsilon && secondU > epsilon && secondU < 1.0 - epsilon) {\n    shortProjVertex.x = p1.x + firstU * (p2.x - p1.x);\n    shortProjVertex.y = p1.y + firstU * (p2.y - p1.y);\n    offset = shortProjVertex.xy;\n    degenerate = true;\n  } else {\n    float miterLength = abs(halfWidth / dot(normal, tmpNormal));\n    offset = normal * direction * miterLength;\n  }\n  return degenerate;\n}\n\nvoid squareCap(out vec2 offset, out float round, in bool isRound, in vec2 nextP,\n    in float turnDir, in float direction) {\n  round = 0.0;\n  vec2 dirVect = a_position - nextP;\n  vec2 firstNormal = normalize(dirVect);\n  vec2 secondNormal = vec2(turnDir * firstNormal.y * direction, -turnDir * firstNormal.x * direction);\n  vec2 hypotenuse = normalize(firstNormal - secondNormal);\n  vec2 normal = vec2(turnDir * hypotenuse.y * direction, -turnDir * hypotenuse.x * direction);\n  float length = sqrt(v_halfWidth * v_halfWidth * 2.0);\n  offset = normal * length;\n  if (isRound) {\n    round = 1.0;\n  }\n}\n\nvoid main(void) {\n  bool degenerate = false;\n  float direction = float(sign(a_direction));\n  mat4 offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;\n  vec2 offset;\n  vec4 projPos = u_projectionMatrix * vec4(a_position, 0.0, 1.0);\n  bool round = nearlyEquals(mod(a_direction, 2.0), 0.0);\n\n  v_round = 0.0;\n  v_halfWidth = u_lineWidth / 2.0;\n  v_roundVertex = projPos.xy;\n\n  if (nearlyEquals(mod(a_direction, 3.0), 0.0) || nearlyEquals(mod(a_direction, 17.0), 0.0)) {\n    alongNormal(offset, a_nextPos, 1.0, direction);\n  } else if (nearlyEquals(mod(a_direction, 5.0), 0.0) || nearlyEquals(mod(a_direction, 13.0), 0.0)) {\n    alongNormal(offset, a_lastPos, -1.0, direction);\n  } else if (nearlyEquals(mod(a_direction, 23.0), 0.0)) {\n    miterUp(offset, v_round, round, direction);\n  } else if (nearlyEquals(mod(a_direction, 19.0), 0.0)) {\n    degenerate = miterDown(offset, projPos, offsetMatrix, direction);\n  } else if (nearlyEquals(mod(a_direction, 7.0), 0.0)) {\n    squareCap(offset, v_round, round, a_nextPos, 1.0, direction);\n  } else if (nearlyEquals(mod(a_direction, 11.0), 0.0)) {\n    squareCap(offset, v_round, round, a_lastPos, -1.0, direction);\n  }\n  if (!degenerate) {\n    vec4 offsets = offsetMatrix * vec4(offset, 0.0, 0.0);\n    gl_Position = projPos + offsets;\n  } else {\n    gl_Position = vec4(offset, 0.0, 1.0);\n  }\n}\n\n\n"),
        rp = function (t, e) {
            this.u_projectionMatrix = t.getUniformLocation(e, "u_projectionMatrix"), this.u_offsetScaleMatrix = t.getUniformLocation(e, "u_offsetScaleMatrix"), this.u_offsetRotateMatrix = t.getUniformLocation(e, "u_offsetRotateMatrix"), this.u_lineWidth = t.getUniformLocation(e, "u_lineWidth"), this.u_miterLimit = t.getUniformLocation(e, "u_miterLimit"), this.u_opacity = t.getUniformLocation(e, "u_opacity"), this.u_color = t.getUniformLocation(e, "u_color"), this.u_size = t.getUniformLocation(e, "u_size"), this.u_pixelRatio = t.getUniformLocation(e, "u_pixelRatio"), this.a_lastPos = t.getAttribLocation(e, "a_lastPos"), this.a_position = t.getAttribLocation(e, "a_position"), this.a_nextPos = t.getAttribLocation(e, "a_nextPos"), this.a_direction = t.getAttribLocation(e, "a_direction")
        }, np = 3, op = 5, sp = 7, ap = 11, hp = 13, lp = 17, up = 19, cp = 23, pp = function (i) {
            function t(t, e) {
                i.call(this, t, e), this.defaultLocations_ = null, this.styles_ = [], this.styleIndices_ = [], this.state_ = {
                    strokeColor: null,
                    lineCap: void 0,
                    lineDash: null,
                    lineDashOffset: void 0,
                    lineJoin: void 0,
                    lineWidth: void 0,
                    miterLimit: void 0,
                    changed: !1
                }
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.drawCoordinates_ = function (t, e, i, r) {
                var n, o, s, a, h, l, u, c, p = this, d = this.vertices.length, f = this.indices.length,
                    _ = "bevel" === this.state_.lineJoin ? 0 : "miter" === this.state_.lineJoin ? 1 : 2,
                    g = "butt" === this.state_.lineCap ? 0 : "square" === this.state_.lineCap ? 1 : 2, y = tp(t, e, i, r),
                    v = f, m = 1;
                for (n = e, o = i; n < o; n += r) {
                    if (h = d / 7, l = u, u = c || [t[n], t[n + 1]], n === e) {
                        if (c = [t[n + r], t[n + r + 1]], i - e == 2 * r && fr(u, c)) break;
                        if (!y) {
                            g && (d = p.addVertices_([0, 0], u, c, m * sp * g, d), d = p.addVertices_([0, 0], u, c, -m * sp * g, d), p.indices[f++] = h + 2, p.indices[f++] = h, p.indices[f++] = h + 1, p.indices[f++] = h + 1, p.indices[f++] = h + 3, p.indices[f++] = h + 2), d = p.addVertices_([0, 0], u, c, m * np * (g || 1), d), v = (d = p.addVertices_([0, 0], u, c, -m * np * (g || 1), d)) / 7 - 1;
                            continue
                        }
                        l = [t[i - 2 * r], t[i - 2 * r + 1]], s = c
                    } else {
                        if (n === i - r) {
                            if (y) {
                                c = s;
                                break
                            }
                            l = l || [0, 0], d = p.addVertices_(l, u, [0, 0], m * op * (g || 1), d), d = p.addVertices_(l, u, [0, 0], -m * op * (g || 1), d), p.indices[f++] = h, p.indices[f++] = v - 1, p.indices[f++] = v, p.indices[f++] = v, p.indices[f++] = h + 1, p.indices[f++] = h, g && (d = p.addVertices_(l, u, [0, 0], m * ap * g, d), d = p.addVertices_(l, u, [0, 0], -m * ap * g, d), p.indices[f++] = h + 2, p.indices[f++] = h, p.indices[f++] = h + 1, p.indices[f++] = h + 1, p.indices[f++] = h + 3, p.indices[f++] = h + 2);
                            break
                        }
                        c = [t[n + r], t[n + r + 1]]
                    }
                    a = jc(l[0], l[1], u[0], u[1], c[0], c[1]) ? -1 : 1, d = p.addVertices_(l, u, c, a * hp * (_ || 1), d), d = p.addVertices_(l, u, c, a * lp * (_ || 1), d), d = p.addVertices_(l, u, c, -a * up * (_ || 1), d), e < n && (p.indices[f++] = h, p.indices[f++] = v - 1, p.indices[f++] = v, p.indices[f++] = h + 2, p.indices[f++] = h, p.indices[f++] = 0 < m * a ? v : v - 1), p.indices[f++] = h, p.indices[f++] = h + 2, p.indices[f++] = h + 1, v = h + 2, m = a, _ && (d = p.addVertices_(l, u, c, a * cp * _, d), p.indices[f++] = h + 1, p.indices[f++] = h + 3, p.indices[f++] = h)
                }
                y && (h = h || d / 7, a = Hr([l[0], l[1], u[0], u[1], c[0], c[1]], 0, 6, 2) ? 1 : -1, d = this.addVertices_(l, u, c, a * hp * (_ || 1), d), d = this.addVertices_(l, u, c, -a * up * (_ || 1), d), this.indices[f++] = h, this.indices[f++] = v - 1, this.indices[f++] = v, this.indices[f++] = h + 1, this.indices[f++] = h, this.indices[f++] = 0 < m * a ? v : v - 1)
            }, t.prototype.addVertices_ = function (t, e, i, r, n) {
                return this.vertices[n++] = t[0], this.vertices[n++] = t[1], this.vertices[n++] = e[0], this.vertices[n++] = e[1], this.vertices[n++] = i[0], this.vertices[n++] = i[1], this.vertices[n++] = r, n
            }, t.prototype.isValid_ = function (t, e, i, r) {
                var n = i - e;
                return !(n < 2 * r) && (n !== 2 * r || !fr([t[e], t[e + 1]], [t[e + r], t[e + r + 1]]))
            }, t.prototype.drawLineString = function (t, e) {
                var i = t.getFlatCoordinates(), r = t.getStride();
                this.isValid_(i, 0, i.length, r) && (i = _t(i, 0, i.length, r, -this.origin[0], -this.origin[1]), this.state_.changed && (this.styleIndices_.push(this.indices.length), this.state_.changed = !1), this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e), this.drawCoordinates_(i, 0, i.length, r))
            }, t.prototype.drawMultiLineString = function (t, e) {
                var i = this.indices.length, r = t.getEnds();
                r.unshift(0);
                var n, o, s = t.getFlatCoordinates(), a = t.getStride();
                if (1 < r.length) for (n = 1, o = r.length; n < o; ++n) if (this.isValid_(s, r[n - 1], r[n], a)) {
                    var h = _t(s, r[n - 1], r[n], a, -this.origin[0], -this.origin[1]);
                    this.drawCoordinates_(h, 0, h.length, a)
                }
                this.indices.length > i && (this.startIndices.push(i), this.startIndicesFeature.push(e), this.state_.changed && (this.styleIndices_.push(i), this.state_.changed = !1))
            }, t.prototype.drawPolygonCoordinates = function (t, e, i) {
                var r, n;
                if (tp(t, 0, t.length, i) || (t.push(t[0]), t.push(t[1])), this.drawCoordinates_(t, 0, t.length, i), e.length) for (r = 0, n = e.length; r < n; ++r) tp(e[r], 0, e[r].length, i) || (e[r].push(e[r][0]), e[r].push(e[r][1])), this.drawCoordinates_(e[r], 0, e[r].length, i)
            }, t.prototype.setPolygonStyle = function (t, e) {
                var i = void 0 === e ? this.indices.length : e;
                this.startIndices.push(i), this.startIndicesFeature.push(t), this.state_.changed && (this.styleIndices_.push(i), this.state_.changed = !1)
            }, t.prototype.getCurrentIndex = function () {
                return this.indices.length
            }, t.prototype.finish = function (t) {
                this.verticesBuffer = new Yc(this.vertices), this.indicesBuffer = new Yc(this.indices), this.startIndices.push(this.indices.length), 0 === this.styleIndices_.length && 0 < this.styles_.length && (this.styles_ = []), this.vertices = null, this.indices = null
            }, t.prototype.getDeleteResourcesFunction = function (t) {
                var e = this.verticesBuffer, i = this.indicesBuffer;
                return function () {
                    t.deleteBuffer(e), t.deleteBuffer(i)
                }
            }, t.prototype.setUpProgram = function (t, e, i, r) {
                var n, o = e.getProgram(ep, ip);
                return this.defaultLocations_ ? n = this.defaultLocations_ : (n = new rp(t, o), this.defaultLocations_ = n), e.useProgram(o), t.enableVertexAttribArray(n.a_lastPos), t.vertexAttribPointer(n.a_lastPos, 2, Ve, !1, 28, 0), t.enableVertexAttribArray(n.a_position), t.vertexAttribPointer(n.a_position, 2, Ve, !1, 28, 8), t.enableVertexAttribArray(n.a_nextPos), t.vertexAttribPointer(n.a_nextPos, 2, Ve, !1, 28, 16), t.enableVertexAttribArray(n.a_direction), t.vertexAttribPointer(n.a_direction, 1, Ve, !1, 28, 24), t.uniform2fv(n.u_size, i), t.uniform1f(n.u_pixelRatio, r), n
            }, t.prototype.shutDownProgram = function (t, e) {
                t.disableVertexAttribArray(e.a_lastPos), t.disableVertexAttribArray(e.a_position), t.disableVertexAttribArray(e.a_nextPos), t.disableVertexAttribArray(e.a_direction)
            }, t.prototype.drawReplay = function (t, e, i, r) {
                var n, o, s, a, h = t.getParameter(t.DEPTH_FUNC), l = t.getParameter(t.DEPTH_WRITEMASK);
                if (r || (t.enable(t.DEPTH_TEST), t.depthMask(!0), t.depthFunc(t.NOTEQUAL)), Tt(i)) for (s = this.startIndices[this.startIndices.length - 1], n = this.styleIndices_.length - 1; 0 <= n; --n) o = this.styleIndices_[n], a = this.styles_[n], this.setStrokeStyle_(t, a[0], a[1], a[2]), this.drawElements(t, e, o, s), t.clear(t.DEPTH_BUFFER_BIT), s = o; else this.drawReplaySkipping_(t, e, i);
                r || (t.disable(t.DEPTH_TEST), t.clear(t.DEPTH_BUFFER_BIT), t.depthMask(l), t.depthFunc(h))
            }, t.prototype.drawReplaySkipping_ = function (t, e, i) {
                var r, n, o, s, a, h, l;
                for (h = this.startIndices.length - 2, o = n = this.startIndices[h + 1], r = this.styleIndices_.length - 1; 0 <= r; --r) {
                    for (s = this.styles_[r], this.setStrokeStyle_(t, s[0], s[1], s[2]), a = this.styleIndices_[r]; 0 <= h && this.startIndices[h] >= a;) l = this.startIndices[h], i[Ct(this.startIndicesFeature[h]).toString()] && (n !== o && (this.drawElements(t, e, n, o), t.clear(t.DEPTH_BUFFER_BIT)), o = l), h--, n = l;
                    n !== o && (this.drawElements(t, e, n, o), t.clear(t.DEPTH_BUFFER_BIT)), n = o = a
                }
            }, t.prototype.drawHitDetectionReplayOneByOne = function (t, e, i, r, n) {
                var o, s, a, h, l, u, c;
                for (c = this.startIndices.length - 2, a = this.startIndices[c + 1], o = this.styleIndices_.length - 1; 0 <= o; --o) for (h = this.styles_[o], this.setStrokeStyle_(t, h[0], h[1], h[2]), l = this.styleIndices_[o]; 0 <= c && this.startIndices[c] >= l;) {
                    if (s = this.startIndices[c], void 0 === i[Ct(u = this.startIndicesFeature[c]).toString()] && u.getGeometry() && (void 0 === n || wt(n, u.getGeometry().getExtent()))) {
                        t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawElements(t, e, s, a);
                        var p = r(u);
                        if (p) return p
                    }
                    c--, a = s
                }
            }, t.prototype.setStrokeStyle_ = function (t, e, i, r) {
                t.uniform4fv(this.defaultLocations_.u_color, e), t.uniform1f(this.defaultLocations_.u_lineWidth, i), t.uniform1f(this.defaultLocations_.u_miterLimit, r)
            }, t.prototype.setFillStrokeStyle = function (t, e) {
                var i = e.getLineCap();
                this.state_.lineCap = void 0 !== i ? i : "round";
                var r = e.getLineDash();
                this.state_.lineDash = r || Gc;
                var n = e.getLineDashOffset();
                this.state_.lineDashOffset = n || 0;
                var o = e.getLineJoin();
                this.state_.lineJoin = void 0 !== o ? o : "round";
                var s = e.getColor();
                s = s instanceof CanvasGradient || s instanceof CanvasPattern ? kc : Ne(s).map(function (t, e) {
                    return 3 != e ? t / 255 : t
                }) || kc;
                var a = e.getWidth();
                a = void 0 !== a ? a : 1;
                var h = e.getMiterLimit();
                h = void 0 !== h ? h : 10, this.state_.strokeColor && fr(this.state_.strokeColor, s) && this.state_.lineWidth === a && this.state_.miterLimit === h || (this.state_.changed = !0, this.state_.strokeColor = s, this.state_.lineWidth = a, this.state_.miterLimit = h, this.styles_.push([s, a, h]))
            }, t
        }(Nc),
        dp = new Lc("precision mediump float;\n\n\n\nuniform vec4 u_color;\nuniform float u_opacity;\n\nvoid main(void) {\n  gl_FragColor = u_color;\n  float alpha = u_color.a * u_opacity;\n  if (alpha == 0.0) {\n    discard;\n  }\n  gl_FragColor.a = alpha;\n}\n"),
        fp = new bc("\n\nattribute vec2 a_position;\n\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_offsetScaleMatrix;\nuniform mat4 u_offsetRotateMatrix;\n\nvoid main(void) {\n  gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0);\n}\n\n\n"),
        _p = function (t, e) {
            this.u_projectionMatrix = t.getUniformLocation(e, "u_projectionMatrix"), this.u_offsetScaleMatrix = t.getUniformLocation(e, "u_offsetScaleMatrix"), this.u_offsetRotateMatrix = t.getUniformLocation(e, "u_offsetRotateMatrix"), this.u_color = t.getUniformLocation(e, "u_color"), this.u_opacity = t.getUniformLocation(e, "u_opacity"), this.a_position = t.getAttribLocation(e, "a_position")
        }, gp = function (t) {
            this.first_, this.last_, this.head_, this.circular_ = void 0 === t || t, this.length_ = 0
        };
    gp.prototype.insertItem = function (t) {
        var e = {prev: void 0, next: void 0, data: t}, i = this.head_;
        if (i) {
            var r = i.next;
            e.prev = i, e.next = r, i.next = e, r && (r.prev = e), i === this.last_ && (this.last_ = e)
        } else this.first_ = e, this.last_ = e, this.circular_ && ((e.next = e).prev = e);
        this.head_ = e, this.length_++
    }, gp.prototype.removeItem = function () {
        var t = this.head_;
        if (t) {
            var e = t.next, i = t.prev;
            e && (e.prev = i), i && (i.next = e), this.head_ = e || i, this.first_ === this.last_ ? (this.head_ = void 0, this.first_ = void 0, this.last_ = void 0) : this.first_ === t ? this.first_ = this.head_ : this.last_ === t && (this.last_ = i ? this.head_.prev : this.head_), this.length_--
        }
    }, gp.prototype.firstItem = function () {
        if (this.head_ = this.first_, this.head_) return this.head_.data
    }, gp.prototype.lastItem = function () {
        if (this.head_ = this.last_, this.head_) return this.head_.data
    }, gp.prototype.nextItem = function () {
        if (this.head_ && this.head_.next) return this.head_ = this.head_.next, this.head_.data
    }, gp.prototype.getNextItem = function () {
        if (this.head_ && this.head_.next) return this.head_.next.data
    }, gp.prototype.prevItem = function () {
        if (this.head_ && this.head_.prev) return this.head_ = this.head_.prev, this.head_.data
    }, gp.prototype.getPrevItem = function () {
        if (this.head_ && this.head_.prev) return this.head_.prev.data
    }, gp.prototype.getCurrItem = function () {
        if (this.head_) return this.head_.data
    }, gp.prototype.setFirstItem = function () {
        this.circular_ && this.head_ && (this.first_ = this.head_, this.last_ = this.head_.prev)
    }, gp.prototype.concat = function (t) {
        if (t.head_) {
            if (this.head_) {
                var e = this.head_.next;
                this.head_.next = t.first_, t.first_.prev = this.head_, e.prev = t.last_, t.last_.next = e, this.length_ += t.length_
            } else this.head_ = t.head_, this.first_ = t.first_, this.last_ = t.last_, this.length_ = t.length_;
            t.head_ = void 0, t.first_ = void 0, t.last_ = void 0, t.length_ = 0
        }
    }, gp.prototype.getLength = function () {
        return this.length_
    };
    var yp = function (i) {
        function t(t, e) {
            i.call(this, t, e), this.lineStringReplay = new pp(t, e), this.defaultLocations_ = null, this.styles_ = [], this.styleIndices_ = [], this.state_ = {
                fillColor: null,
                changed: !1
            }
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.drawCoordinates_ = function (t, e, i) {
            var r = new gp, n = new kh;
            this.processFlatCoordinates_(t, i, r, n, !0);
            var o = this.getMaxCoords_(r);
            if (e.length) {
                var s, a, h = [];
                for (s = 0, a = e.length; s < a; ++s) {
                    var l = {list: new gp, maxCoords: void 0, rtree: new kh};
                    h.push(l), this.processFlatCoordinates_(e[s], i, l.list, l.rtree, !1), this.classifyPoints_(l.list, l.rtree, !0), l.maxCoords = this.getMaxCoords_(l.list)
                }
                for (h.sort(function (t, e) {
                    return e.maxCoords[0] === t.maxCoords[0] ? t.maxCoords[1] - e.maxCoords[1] : e.maxCoords[0] - t.maxCoords[0]
                }), s = 0; s < h.length; ++s) {
                    var u = h[s].list, c = u.firstItem(), p = c, d = void 0;
                    do {
                        if (this.getIntersections_(p, n).length) {
                            d = !0;
                            break
                        }
                        p = u.nextItem()
                    } while (c !== p);
                    d || this.bridgeHole_(u, h[s].maxCoords[0], r, o[0], n) && (n.concat(h[s].rtree), this.classifyPoints_(r, n, !1))
                }
            } else this.classifyPoints_(r, n, !1);
            this.triangulate_(r, n)
        }, t.prototype.processFlatCoordinates_ = function (t, e, i, r, n) {
            var o, s, a, h, l, u = Hr(t, 0, t.length, e), c = this.vertices.length / 2, p = [], d = [];
            if (n === u) {
                for (h = a = this.createPoint_(t[0], t[1], c++), o = e, s = t.length; o < s; o += e) l = this.createPoint_(t[o], t[o + 1], c++), d.push(this.insertItem_(h, l, i)), p.push([Math.min(h.x, l.x), Math.min(h.y, l.y), Math.max(h.x, l.x), Math.max(h.y, l.y)]), h = l;
                d.push(this.insertItem_(l, a, i)), p.push([Math.min(h.x, l.x), Math.min(h.y, l.y), Math.max(h.x, l.x), Math.max(h.y, l.y)])
            } else {
                var f = t.length - e;
                for (h = a = this.createPoint_(t[f], t[f + 1], c++), o = f - e, s = 0; s <= o; o -= e) l = this.createPoint_(t[o], t[o + 1], c++), d.push(this.insertItem_(h, l, i)), p.push([Math.min(h.x, l.x), Math.min(h.y, l.y), Math.max(h.x, l.x), Math.max(h.y, l.y)]), h = l;
                d.push(this.insertItem_(l, a, i)), p.push([Math.min(h.x, l.x), Math.min(h.y, l.y), Math.max(h.x, l.x), Math.max(h.y, l.y)])
            }
            r.load(p, d)
        }, t.prototype.getMaxCoords_ = function (t) {
            for (var e = t.firstItem(), i = e, r = [i.p0.x, i.p0.y]; (i = t.nextItem()).p0.x > r[0] && (r = [i.p0.x, i.p0.y]), i !== e;) ;
            return r
        }, t.prototype.classifyPoints_ = function (t, e, i) {
            var r = t.firstItem(), n = r, o = t.nextItem(), s = !1;
            do {
                var a = i ? jc(o.p1.x, o.p1.y, n.p1.x, n.p1.y, n.p0.x, n.p0.y) : jc(n.p0.x, n.p0.y, n.p1.x, n.p1.y, o.p1.x, o.p1.y);
                void 0 === a ? (this.removeItem_(n, o, t, e), s = !0, o === r && (r = t.getNextItem()), o = n, t.prevItem()) : n.p1.reflex !== a && (n.p1.reflex = a, s = !0), n = o, o = t.nextItem()
            } while (n !== r);
            return s
        }, t.prototype.bridgeHole_ = function (t, e, i, r, n) {
            for (var o = t.firstItem(); o.p1.x !== e;) o = t.nextItem();
            var s, a, h, l, u = o.p1, c = {x: r, y: u.y, i: -1}, p = 1 / 0,
                d = this.getIntersections_({p0: u, p1: c}, n, !0);
            for (s = 0, a = d.length; s < a; ++s) {
                var f = d[s], _ = this.calculateIntersection_(u, c, f.p0, f.p1, !0), g = Math.abs(u.x - _[0]);
                g < p && void 0 !== jc(u.x, u.y, f.p0.x, f.p0.y, f.p1.x, f.p1.y) && (p = g, l = {
                    x: _[0],
                    y: _[1],
                    i: -1
                }, o = f)
            }
            if (p === 1 / 0) return !1;
            if (h = o.p1, 0 < p) {
                var y = this.getPointsInTriangle_(u, l, o.p1, n);
                if (y.length) {
                    var v = 1 / 0;
                    for (s = 0, a = y.length; s < a; ++s) {
                        var m = y[s], x = Math.atan2(u.y - m.y, c.x - m.x);
                        (x < v || x === v && m.x < h.x) && (v = x, h = m)
                    }
                }
            }
            for (o = i.firstItem(); o.p1.x !== h.x || o.p1.y !== h.y;) o = i.nextItem();
            var S = {x: u.x, y: u.y, i: u.i, reflex: void 0}, E = {x: o.p1.x, y: o.p1.y, i: o.p1.i, reflex: void 0};
            return t.getNextItem().p0 = S, this.insertItem_(u, o.p1, t, n), this.insertItem_(E, S, t, n), o.p1 = E, t.setFirstItem(), i.concat(t), !0
        }, t.prototype.triangulate_ = function (t, e) {
            for (var i = this, r = !1, n = this.isSimple_(t, e); 3 < t.getLength();) if (n) {
                if (!i.clipEars_(t, e, n, r) && !i.classifyPoints_(t, e, r) && !i.resolveSelfIntersections_(t, e, !0)) break
            } else if (!i.clipEars_(t, e, n, r) && !i.classifyPoints_(t, e, r) && !i.resolveSelfIntersections_(t, e)) {
                if (!(n = i.isSimple_(t, e))) {
                    i.splitPolygon_(t, e);
                    break
                }
                r = !i.isClockwise_(t), i.classifyPoints_(t, e, r)
            }
            if (3 === t.getLength()) {
                var o = this.indices.length;
                this.indices[o++] = t.getPrevItem().p0.i, this.indices[o++] = t.getCurrItem().p0.i, this.indices[o++] = t.getNextItem().p0.i
            }
        }, t.prototype.clipEars_ = function (t, e, i, r) {
            var n, o, s, a = this.indices.length, h = t.firstItem(), l = t.getPrevItem(), u = h, c = t.nextItem(),
                p = t.getNextItem(), d = !1;
            do {
                if (n = u.p0, o = u.p1, s = c.p1, !1 === o.reflex) {
                    var f = void 0;
                    f = i ? 0 === this.getPointsInTriangle_(n, o, s, e, !0).length : r ? this.diagonalIsInside_(p.p1, s, o, n, l.p0) : this.diagonalIsInside_(l.p0, n, o, s, p.p1), (i || 0 === this.getIntersections_({
                        p0: n,
                        p1: s
                    }, e).length) && f && (i || !1 === n.reflex || !1 === s.reflex || Hr([l.p0.x, l.p0.y, n.x, n.y, o.x, o.y, s.x, s.y, p.p1.x, p.p1.y], 0, 10, 2) === !r) && (this.indices[a++] = n.i, this.indices[a++] = o.i, this.indices[a++] = s.i, this.removeItem_(u, c, t, e), c === h && (h = p), d = !0)
                }
                l = t.getPrevItem(), u = t.getCurrItem(), c = t.nextItem(), p = t.getNextItem()
            } while (u !== h && 3 < t.getLength());
            return d
        }, t.prototype.resolveSelfIntersections_ = function (t, e, i) {
            var r = t.firstItem();
            t.nextItem();
            var n = r, o = t.nextItem(), s = !1;
            do {
                var a = this.calculateIntersection_(n.p0, n.p1, o.p0, o.p1, i);
                if (a) {
                    var h = !1, l = this.vertices.length, u = this.indices.length, c = l / 2, p = t.prevItem();
                    t.removeItem(), e.remove(p), h = p === r;
                    var d = void 0;
                    if (i ? (a[0] === n.p0.x && a[1] === n.p0.y ? (t.prevItem(), d = n.p0, o.p0 = d, e.remove(n), h = h || n === r) : (d = o.p1, n.p1 = d, e.remove(o), h = h || o === r), t.removeItem()) : (d = this.createPoint_(a[0], a[1], c), n.p1 = d, o.p0 = d, e.update([Math.min(n.p0.x, n.p1.x), Math.min(n.p0.y, n.p1.y), Math.max(n.p0.x, n.p1.x), Math.max(n.p0.y, n.p1.y)], n), e.update([Math.min(o.p0.x, o.p1.x), Math.min(o.p0.y, o.p1.y), Math.max(o.p0.x, o.p1.x), Math.max(o.p0.y, o.p1.y)], o)), this.indices[u++] = p.p0.i, this.indices[u++] = p.p1.i, this.indices[u++] = d.i, s = !0, h) break
                }
                n = t.getPrevItem(), o = t.nextItem()
            } while (n !== r);
            return s
        }, t.prototype.isSimple_ = function (t, e) {
            var i = t.firstItem(), r = i;
            do {
                if (this.getIntersections_(r, e).length) return !1;
                r = t.nextItem()
            } while (r !== i);
            return !0
        }, t.prototype.isClockwise_ = function (t) {
            for (var e = 2 * t.getLength(), i = new Array(e), r = t.firstItem(), n = r, o = 0; i[o++] = n.p0.x, i[o++] = n.p0.y, (n = t.nextItem()) !== r;) ;
            return Hr(i, 0, e, 2)
        }, t.prototype.splitPolygon_ = function (t, e) {
            var i = this, r = t.firstItem(), n = r;
            do {
                var o = i.getIntersections_(n, e);
                if (o.length) {
                    var s = o[0], a = i.vertices.length / 2, h = i.calculateIntersection_(n.p0, n.p1, s.p0, s.p1),
                        l = i.createPoint_(h[0], h[1], a), u = new gp, c = new kh;
                    i.insertItem_(l, n.p1, u, c), n.p1 = l, e.update([Math.min(n.p0.x, l.x), Math.min(n.p0.y, l.y), Math.max(n.p0.x, l.x), Math.max(n.p0.y, l.y)], n);
                    for (var p = t.nextItem(); p !== s;) i.insertItem_(p.p0, p.p1, u, c), e.remove(p), t.removeItem(), p = t.getCurrItem();
                    i.insertItem_(s.p0, l, u, c), s.p0 = l, e.update([Math.min(s.p1.x, l.x), Math.min(s.p1.y, l.y), Math.max(s.p1.x, l.x), Math.max(s.p1.y, l.y)], s), i.classifyPoints_(t, e, !1), i.triangulate_(t, e), i.classifyPoints_(u, c, !1), i.triangulate_(u, c);
                    break
                }
                n = t.nextItem()
            } while (n !== r)
        }, t.prototype.createPoint_ = function (t, e, i) {
            var r = this.vertices.length;
            return {x: this.vertices[r++] = t, y: this.vertices[r++] = e, i: i, reflex: void 0}
        }, t.prototype.insertItem_ = function (t, e, i, r) {
            var n = {p0: t, p1: e};
            return i.insertItem(n), r && r.insert([Math.min(t.x, e.x), Math.min(t.y, e.y), Math.max(t.x, e.x), Math.max(t.y, e.y)], n), n
        }, t.prototype.removeItem_ = function (t, e, i, r) {
            i.getCurrItem() === e && (i.removeItem(), t.p1 = e.p1, r.remove(e), r.update([Math.min(t.p0.x, t.p1.x), Math.min(t.p0.y, t.p1.y), Math.max(t.p0.x, t.p1.x), Math.max(t.p0.y, t.p1.y)], t))
        }, t.prototype.getPointsInTriangle_ = function (t, e, i, r, n) {
            for (var o = [], s = r.getInExtent([Math.min(t.x, e.x, i.x), Math.min(t.y, e.y, i.y), Math.max(t.x, e.x, i.x), Math.max(t.y, e.y, i.y)]), a = 0, h = s.length; a < h; ++a) for (var l in s[a]) {
                var u = s[a][l];
                "object" != typeof u || n && !u.reflex || u.x === t.x && u.y === t.y || u.x === e.x && u.y === e.y || u.x === i.x && u.y === i.y || -1 !== o.indexOf(u) || !Ur([t.x, t.y, e.x, e.y, i.x, i.y], 0, 6, 2, u.x, u.y) || o.push(u)
            }
            return o
        }, t.prototype.getIntersections_ = function (t, e, i) {
            for (var r = t.p0, n = t.p1, o = e.getInExtent([Math.min(r.x, n.x), Math.min(r.y, n.y), Math.max(r.x, n.x), Math.max(r.y, n.y)]), s = [], a = 0, h = o.length; a < h; ++a) {
                var l = o[a];
                t !== l && (i || l.p0 !== n || l.p1 !== r) && this.calculateIntersection_(r, n, l.p0, l.p1, i) && s.push(l)
            }
            return s
        }, t.prototype.calculateIntersection_ = function (t, e, i, r, n) {
            var o = (r.y - i.y) * (e.x - t.x) - (r.x - i.x) * (e.y - t.y);
            if (0 !== o) {
                var s = ((r.x - i.x) * (t.y - i.y) - (r.y - i.y) * (t.x - i.x)) / o,
                    a = ((e.x - t.x) * (t.y - i.y) - (e.y - t.y) * (t.x - i.x)) / o;
                if (!n && Dc < s && s < 1 - Dc && Dc < a && a < 1 - Dc || n && 0 <= s && s <= 1 && 0 <= a && a <= 1) return [t.x + s * (e.x - t.x), t.y + s * (e.y - t.y)]
            }
        }, t.prototype.diagonalIsInside_ = function (t, e, i, r, n) {
            if (void 0 === e.reflex || void 0 === r.reflex) return !1;
            var o = (i.x - r.x) * (e.y - r.y) > (i.y - r.y) * (e.x - r.x),
                s = (n.x - r.x) * (e.y - r.y) < (n.y - r.y) * (e.x - r.x),
                a = (t.x - e.x) * (r.y - e.y) > (t.y - e.y) * (r.x - e.x),
                h = (i.x - e.x) * (r.y - e.y) < (i.y - e.y) * (r.x - e.x), l = r.reflex ? s || o : s && o,
                u = e.reflex ? h || a : h && a;
            return l && u
        }, t.prototype.drawMultiPolygon = function (t, e) {
            var i, r, n, o, s = t.getEndss(), a = t.getStride(), h = this.indices.length,
                l = this.lineStringReplay.getCurrentIndex(), u = t.getFlatCoordinates(), c = 0;
            for (i = 0, r = s.length; i < r; ++i) {
                var p = s[i];
                if (0 < p.length) {
                    var d = _t(u, c, p[0], a, -this.origin[0], -this.origin[1]);
                    if (d.length) {
                        var f = [], _ = void 0;
                        for (n = 1, o = p.length; n < o; ++n) p[n] !== p[n - 1] && (_ = _t(u, p[n - 1], p[n], a, -this.origin[0], -this.origin[1]), f.push(_));
                        this.lineStringReplay.drawPolygonCoordinates(d, f, a), this.drawCoordinates_(d, f, a)
                    }
                }
                c = p[p.length - 1]
            }
            this.indices.length > h && (this.startIndices.push(h), this.startIndicesFeature.push(e), this.state_.changed && (this.styleIndices_.push(h), this.state_.changed = !1)), this.lineStringReplay.getCurrentIndex() > l && this.lineStringReplay.setPolygonStyle(e, l)
        }, t.prototype.drawPolygon = function (t, e) {
            var i = t.getEnds(), r = t.getStride();
            if (0 < i.length) {
                var n = t.getFlatCoordinates().map(Number), o = _t(n, 0, i[0], r, -this.origin[0], -this.origin[1]);
                if (o.length) {
                    var s, a, h, l = [];
                    for (s = 1, a = i.length; s < a; ++s) i[s] !== i[s - 1] && (h = _t(n, i[s - 1], i[s], r, -this.origin[0], -this.origin[1]), l.push(h));
                    this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e), this.state_.changed && (this.styleIndices_.push(this.indices.length), this.state_.changed = !1), this.lineStringReplay.setPolygonStyle(e), this.lineStringReplay.drawPolygonCoordinates(o, l, r), this.drawCoordinates_(o, l, r)
                }
            }
        }, t.prototype.finish = function (t) {
            this.verticesBuffer = new Yc(this.vertices), this.indicesBuffer = new Yc(this.indices), this.startIndices.push(this.indices.length), this.lineStringReplay.finish(t), 0 === this.styleIndices_.length && 0 < this.styles_.length && (this.styles_ = []), this.vertices = null, this.indices = null
        }, t.prototype.getDeleteResourcesFunction = function (t) {
            var e = this.verticesBuffer, i = this.indicesBuffer,
                r = this.lineStringReplay.getDeleteResourcesFunction(t);
            return function () {
                t.deleteBuffer(e), t.deleteBuffer(i), r()
            }
        }, t.prototype.setUpProgram = function (t, e, i, r) {
            var n, o = e.getProgram(dp, fp);
            return this.defaultLocations_ ? n = this.defaultLocations_ : (n = new _p(t, o), this.defaultLocations_ = n), e.useProgram(o), t.enableVertexAttribArray(n.a_position), t.vertexAttribPointer(n.a_position, 2, Ve, !1, 8, 0), n
        }, t.prototype.shutDownProgram = function (t, e) {
            t.disableVertexAttribArray(e.a_position)
        }, t.prototype.drawReplay = function (t, e, i, r) {
            var n, o, s, a, h = t.getParameter(t.DEPTH_FUNC), l = t.getParameter(t.DEPTH_WRITEMASK);
            if (r || (t.enable(t.DEPTH_TEST), t.depthMask(!0), t.depthFunc(t.NOTEQUAL)), Tt(i)) for (s = this.startIndices[this.startIndices.length - 1], n = this.styleIndices_.length - 1; 0 <= n; --n) o = this.styleIndices_[n], a = this.styles_[n], this.setFillStyle_(t, a), this.drawElements(t, e, o, s), s = o; else this.drawReplaySkipping_(t, e, i);
            r || (t.disable(t.DEPTH_TEST), t.clear(t.DEPTH_BUFFER_BIT), t.depthMask(l), t.depthFunc(h))
        }, t.prototype.drawHitDetectionReplayOneByOne = function (t, e, i, r, n) {
            var o, s, a, h, l, u, c;
            for (c = this.startIndices.length - 2, a = this.startIndices[c + 1], o = this.styleIndices_.length - 1; 0 <= o; --o) for (h = this.styles_[o], this.setFillStyle_(t, h), l = this.styleIndices_[o]; 0 <= c && this.startIndices[c] >= l;) {
                if (s = this.startIndices[c], void 0 === i[Ct(u = this.startIndicesFeature[c]).toString()] && u.getGeometry() && (void 0 === n || wt(n, u.getGeometry().getExtent()))) {
                    t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawElements(t, e, s, a);
                    var p = r(u);
                    if (p) return p
                }
                c--, a = s
            }
        }, t.prototype.drawReplaySkipping_ = function (t, e, i) {
            var r, n, o, s, a, h, l;
            for (h = this.startIndices.length - 2, o = n = this.startIndices[h + 1], r = this.styleIndices_.length - 1; 0 <= r; --r) {
                for (s = this.styles_[r], this.setFillStyle_(t, s), a = this.styleIndices_[r]; 0 <= h && this.startIndices[h] >= a;) l = this.startIndices[h], i[Ct(this.startIndicesFeature[h]).toString()] && (n !== o && (this.drawElements(t, e, n, o), t.clear(t.DEPTH_BUFFER_BIT)), o = l), h--, n = l;
                n !== o && (this.drawElements(t, e, n, o), t.clear(t.DEPTH_BUFFER_BIT)), n = o = a
            }
        }, t.prototype.setFillStyle_ = function (t, e) {
            t.uniform4fv(this.defaultLocations_.u_color, e)
        }, t.prototype.setFillStrokeStyle = function (t, e) {
            var i = t ? t.getColor() : [0, 0, 0, 0];
            if (i = i instanceof CanvasGradient || i instanceof CanvasPattern ? Ac : Ne(i).map(function (t, e) {
                return 3 != e ? t / 255 : t
            }) || Ac, this.state_.fillColor && fr(i, this.state_.fillColor) || (this.state_.fillColor = i, this.state_.changed = !0, this.styles_.push(i)), e) this.lineStringReplay.setFillStrokeStyle(null, e); else {
                var r = new Vi({color: [0, 0, 0, 0], lineWidth: 0});
                this.lineStringReplay.setFillStrokeStyle(null, r)
            }
        }, t
    }(Nc), vp = function (t, e) {
        this.space_ = e, this.emptyBlocks_ = [{
            x: 0,
            y: 0,
            width: t,
            height: t
        }], this.entries_ = {}, this.context_ = De(t, t), this.canvas_ = this.context_.canvas
    };
    vp.prototype.get = function (t) {
        return this.entries_[t] || null
    }, vp.prototype.add = function (t, e, i, r, n) {
        for (var o = this, s = 0, a = this.emptyBlocks_.length; s < a; ++s) {
            var h = o.emptyBlocks_[s];
            if (h.width >= e + o.space_ && h.height >= i + o.space_) {
                var l = {offsetX: h.x + o.space_, offsetY: h.y + o.space_, image: o.canvas_};
                return o.entries_[t] = l, r.call(n, o.context_, h.x + o.space_, h.y + o.space_), o.split_(s, h, e + o.space_, i + o.space_), l
            }
        }
        return null
    }, vp.prototype.split_ = function (t, e, i, r) {
        var n, o, s = e.width - i;
        e.height - r < s ? (n = {x: e.x + i, y: e.y, width: e.width - i, height: e.height}, o = {
            x: e.x,
            y: e.y + r,
            width: i,
            height: e.height - r
        }) : (n = {x: e.x + i, y: e.y, width: e.width - i, height: r}, o = {
            x: e.x,
            y: e.y + r,
            width: e.width,
            height: e.height - r
        }), this.updateBlocks_(t, n, o)
    }, vp.prototype.updateBlocks_ = function (t, e, i) {
        var r = [t, 1];
        0 < e.width && 0 < e.height && r.push(e), 0 < i.width && 0 < i.height && r.push(i), this.emptyBlocks_.splice.apply(this.emptyBlocks_, r)
    };
    var mp = function (t) {
        var e = t || {};
        this.currentSize_ = void 0 !== e.initialSize ? e.initialSize : 256, this.maxSize_ = void 0 !== e.maxSize ? e.maxSize : void 0 !== Be ? Be : 2048, this.space_ = void 0 !== e.space ? e.space : 1, this.atlases_ = [new vp(this.currentSize_, this.space_)], this.currentHitSize_ = this.currentSize_, this.hitAtlases_ = [new vp(this.currentHitSize_, this.space_)]
    };
    mp.prototype.getInfo = function (t) {
        var e = this.getInfo_(this.atlases_, t);
        if (!e) return null;
        var i = this.getInfo_(this.hitAtlases_, t);
        return this.mergeInfos_(e, i)
    }, mp.prototype.getInfo_ = function (t, e) {
        for (var i = 0, r = t.length; i < r; ++i) {
            var n = t[i].get(e);
            if (n) return n
        }
        return null
    }, mp.prototype.mergeInfos_ = function (t, e) {
        return {offsetX: t.offsetX, offsetY: t.offsetY, image: t.image, hitImage: e.image}
    }, mp.prototype.add = function (t, e, i, r, n, o) {
        if (e + this.space_ > this.maxSize_ || i + this.space_ > this.maxSize_) return null;
        var s = this.add_(!1, t, e, i, r, o);
        if (!s) return null;
        var a = void 0 !== n ? n : L, h = this.add_(!0, t, e, i, a, o);
        return this.mergeInfos_(s, h)
    }, mp.prototype.add_ = function (t, e, i, r, n, o) {
        var s, a, h, l, u = t ? this.hitAtlases_ : this.atlases_;
        for (h = 0, l = u.length; h < l; ++h) {
            if (a = (s = u[h]).add(e, i, r, n, o)) return a;
            if (!a && h === l - 1) {
                var c = void 0;
                t ? (c = Math.min(2 * this.currentHitSize_, this.maxSize_), this.currentHitSize_ = c) : (c = Math.min(2 * this.currentSize_, this.maxSize_), this.currentSize_ = c), s = new vp(c, this.space_), u.push(s), ++l
            }
        }
        return null
    };
    var xp = function (i) {
            function t(t, e) {
                i.call(this, t, e), this.images_ = [], this.textures_ = [], this.measureCanvas_ = De(0, 0).canvas, this.state_ = {
                    strokeColor: null,
                    lineCap: void 0,
                    lineDash: null,
                    lineDashOffset: void 0,
                    lineJoin: void 0,
                    lineWidth: 0,
                    miterLimit: void 0,
                    fillColor: null,
                    font: void 0,
                    scale: void 0
                }, this.text_ = "", this.textAlign_ = void 0, this.textBaseline_ = void 0, this.offsetX_ = void 0, this.offsetY_ = void 0, this.atlases_ = {}, this.currAtlas_ = void 0, this.scale = 1, this.opacity = 1
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.drawText = function (t, e) {
                var i = this;
                if (this.text_) {
                    var r = null, n = 2, o = 2;
                    switch (t.getType()) {
                        case Lt.POINT:
                        case Lt.MULTI_POINT:
                            n = (r = t.getFlatCoordinates()).length, o = t.getStride();
                            break;
                        case Lt.CIRCLE:
                            r = t.getCenter();
                            break;
                        case Lt.LINE_STRING:
                            r = t.getFlatMidpoint();
                            break;
                        case Lt.MULTI_LINE_STRING:
                            n = (r = t.getFlatMidpoints()).length;
                            break;
                        case Lt.POLYGON:
                            r = t.getFlatInteriorPoint();
                            break;
                        case Lt.MULTI_POLYGON:
                            n = (r = t.getFlatInteriorPoints()).length
                    }
                    this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e);
                    var s, a, h, l, u, c, p, d, f = this.currAtlas_, _ = this.text_.split("\n"), g = this.getTextSize_(_),
                        y = Math.round(g[0] * this.textAlign_ - this.offsetX_),
                        v = Math.round(g[1] * this.textBaseline_ - this.offsetY_),
                        m = this.state_.lineWidth / 2 * this.state_.scale;
                    for (s = 0, a = _.length; s < a; ++s) for (u = 0, c = f.height * s, h = 0, l = (p = _[s].split("")).length; h < l; ++h) {
                        if (d = f.atlas.getInfo(p[h])) {
                            var x = d.image;
                            if (i.anchorX = y - u, i.anchorY = v - c, i.originX = 0 === h ? d.offsetX - m : d.offsetX, i.originY = d.offsetY, i.height = f.height, i.width = 0 === h || h === p.length - 1 ? f.width[p[h]] + m : f.width[p[h]], i.imageHeight = x.height, i.imageWidth = x.width, 0 === i.images_.length) i.images_.push(x); else Ct(i.images_[i.images_.length - 1]) != Ct(x) && (i.groupIndices.push(i.indices.length), i.images_.push(x));
                            i.drawText_(r, 0, n, o)
                        }
                        u += i.width
                    }
                }
            }, t.prototype.getTextSize_ = function (t) {
                var o = this, s = this.currAtlas_, e = t.length * s.height;
                return [t.map(function (t) {
                    for (var e = 0, i = 0, r = t.length; i < r; ++i) {
                        var n = t[i];
                        s.width[n] || o.addCharToAtlas_(n), e += s.width[n] ? s.width[n] : 0
                    }
                    return e
                }).reduce(function (t, e) {
                    return Math.max(t, e)
                }), e]
            }, t.prototype.drawText_ = function (t, e, i, r) {
                for (var n = e, o = i; n < o; n += r) this.drawCoordinates(t, e, i, r)
            }, t.prototype.addCharToAtlas_ = function (r) {
                if (1 === r.length) {
                    var t = this.currAtlas_, n = this.state_, e = this.measureCanvas_.getContext("2d");
                    e.font = n.font;
                    var i = Math.ceil(e.measureText(r).width * n.scale);
                    t.atlas.add(r, i, t.height, function (t, e, i) {
                        t.font = n.font, t.fillStyle = n.fillColor, t.strokeStyle = n.strokeColor, t.lineWidth = n.lineWidth, t.lineCap = n.lineCap, t.lineJoin = n.lineJoin, t.miterLimit = n.miterLimit, t.textAlign = "left", t.textBaseline = "top", hi && n.lineDash && (t.setLineDash(n.lineDash), t.lineDashOffset = n.lineDashOffset), 1 !== n.scale && t.setTransform(n.scale, 0, 0, n.scale, 0, 0), n.strokeColor && t.strokeText(r, e, i), n.fillColor && t.fillText(r, e, i)
                    }) && (t.width[r] = i)
                }
            }, t.prototype.finish = function (t) {
                var e = t.getGL();
                this.groupIndices.push(this.indices.length), this.hitDetectionGroupIndices = this.groupIndices, this.verticesBuffer = new Yc(this.vertices), this.indicesBuffer = new Yc(this.indices);
                this.createTextures(this.textures_, this.images_, {}, e), this.state_ = {
                    strokeColor: null,
                    lineCap: void 0,
                    lineDash: null,
                    lineDashOffset: void 0,
                    lineJoin: void 0,
                    lineWidth: 0,
                    miterLimit: void 0,
                    fillColor: null,
                    font: void 0,
                    scale: void 0
                }, this.text_ = "", this.textAlign_ = void 0, this.textBaseline_ = void 0, this.offsetX_ = void 0, this.offsetY_ = void 0, this.images_ = null, this.atlases_ = {}, this.currAtlas_ = void 0, i.prototype.finish.call(this, t)
            }, t.prototype.setTextStyle = function (t) {
                var e = this.state_, i = t.getFill(), r = t.getStroke();
                if (t && t.getText() && (i || r)) {
                    if (i) {
                        var n = i.getColor();
                        e.fillColor = ke(n || Ac)
                    } else e.fillColor = null;
                    if (r) {
                        var o = r.getColor();
                        e.strokeColor = ke(o || kc), e.lineWidth = r.getWidth() || 1, e.lineCap = r.getLineCap() || "round", e.lineDashOffset = r.getLineDashOffset() || 0, e.lineJoin = r.getLineJoin() || "round", e.miterLimit = r.getMiterLimit() || 10;
                        var s = r.getLineDash();
                        e.lineDash = s ? s.slice() : Gc
                    } else e.strokeColor = null, e.lineWidth = 0;
                    e.font = t.getFont() || "10px sans-serif", e.scale = t.getScale() || 1, this.text_ = t.getText();
                    var a = gu[t.getTextAlign()], h = gu[t.getTextBaseline()];
                    this.textAlign_ = void 0 === a ? .5 : a, this.textBaseline_ = void 0 === h ? .5 : h, this.offsetX_ = t.getOffsetX() || 0, this.offsetY_ = t.getOffsetY() || 0, this.rotateWithView = !!t.getRotateWithView(), this.rotation = t.getRotation() || 0, this.currAtlas_ = this.getAtlas_(e)
                } else this.text_ = ""
            }, t.prototype.getAtlas_ = function (t) {
                var e = [];
                for (var i in t) (t[i] || 0 === t[i]) && (Array.isArray(t[i]) ? e = e.concat(t[i]) : e.push(t[i]));
                var r = this.calculateHash_(e);
                if (!this.atlases_[r]) {
                    var n = this.measureCanvas_.getContext("2d");
                    n.font = t.font;
                    var o = Math.ceil((1.5 * n.measureText("M").width + t.lineWidth / 2) * t.scale);
                    this.atlases_[r] = {atlas: new mp({space: t.lineWidth + 1}), width: {}, height: o}
                }
                return this.atlases_[r]
            }, t.prototype.calculateHash_ = function (t) {
                for (var e = "", i = 0, r = t.length; i < r; ++i) e += t[i];
                return e
            }, t.prototype.getTextures = function (t) {
                return this.textures_
            }, t.prototype.getHitDetectionTextures = function () {
                return this.textures_
            }, t
        }(Qc), Sp = [1, 1], Ep = {Circle: Bc, Image: $c, LineString: pp, Polygon: yp, Text: xp}, Cp = function (r) {
            function t(t, e, i) {
                r.call(this), this.maxExtent_ = e, this.tolerance_ = t, this.renderBuffer_ = i, this.replaysByZIndex_ = {}
            }

            return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype.addDeclutter = function (t, e) {
            }, t.prototype.getDeleteResourcesFunction = function (t) {
                var e, n = [];
                for (e in this.replaysByZIndex_) {
                    var i = this.replaysByZIndex_[e];
                    for (var r in i) n.push(i[r].getDeleteResourcesFunction(t))
                }
                return function () {
                    for (var t, e = arguments, i = n.length, r = 0; r < i; r++) t = n[r].apply(this, e);
                    return t
                }
            }, t.prototype.finish = function (t) {
                var e;
                for (e in this.replaysByZIndex_) {
                    var i = this.replaysByZIndex_[e];
                    for (var r in i) i[r].finish(t)
                }
            }, t.prototype.getReplay = function (t, e) {
                var i = void 0 !== t ? t.toString() : "0", r = this.replaysByZIndex_[i];
                void 0 === r && (r = {}, this.replaysByZIndex_[i] = r);
                var n = r[e];
                void 0 === n && (n = new Ep[e](this.tolerance_, this.maxExtent_), r[e] = n);
                return n
            }, t.prototype.isEmpty = function () {
                return Tt(this.replaysByZIndex_)
            }, t.prototype.replay = function (t, e, i, r, n, o, s, a) {
                var h, l, u, c, p, d, f = Object.keys(this.replaysByZIndex_).map(Number);
                for (f.sort(hr), h = 0, l = f.length; h < l; ++h) for (p = this.replaysByZIndex_[f[h].toString()], u = 0, c = _u.length; u < c; ++u) d = p[_u[u]], void 0 !== d && d.replay(t, e, i, r, n, o, s, a, void 0, !1)
            }, t.prototype.replayHitDetection_ = function (t, e, i, r, n, o, s, a, h, l, u) {
                var c, p, d, f, _, g, y = Object.keys(this.replaysByZIndex_).map(Number);
                for (y.sort(function (t, e) {
                    return e - t
                }), c = 0, p = y.length; c < p; ++c) for (f = this.replaysByZIndex_[y[c].toString()], d = _u.length - 1; 0 <= d; --d) if (void 0 !== (_ = f[_u[d]]) && (g = _.replay(t, e, i, r, n, o, s, a, h, l, u))) return g
            }, t.prototype.forEachFeatureAtCoordinate = function (t, e, i, r, n, o, s, a, h, l) {
                var u, c = e.getGL();
                return c.bindFramebuffer(c.FRAMEBUFFER, e.getHitDetectionFramebuffer()), void 0 !== this.renderBuffer_ && (u = G(V(t), r * this.renderBuffer_)), this.replayHitDetection_(e, t, r, n, Sp, s, a, h, function (t) {
                    var e = new Uint8Array(4);
                    if (c.readPixels(0, 0, 1, 1, c.RGBA, c.UNSIGNED_BYTE, e), 0 < e[3]) {
                        var i = l(t);
                        if (i) return i
                    }
                }, !0, u)
            }, t.prototype.hasFeatureAtCoordinate = function (t, e, i, r, n, o, s, a, h) {
                var l = e.getGL();
                return l.bindFramebuffer(l.FRAMEBUFFER, e.getHitDetectionFramebuffer()), void 0 !== this.replayHitDetection_(e, t, r, n, Sp, s, a, h, function (t) {
                    var e = new Uint8Array(4);
                    return l.readPixels(0, 0, 1, 1, l.RGBA, l.UNSIGNED_BYTE, e), 0 < e[3]
                }, !1)
            }, t
        }(Zl), Tp = function (a) {
            function t(t, e, i, r, n, o, s) {
                a.call(this), this.context_ = t, this.center_ = e, this.extent_ = o, this.pixelRatio_ = s, this.size_ = n, this.rotation_ = r, this.resolution_ = i, this.imageStyle_ = null, this.fillStyle_ = null, this.strokeStyle_ = null, this.textStyle_ = null
            }

            return a && (t.__proto__ = a), ((t.prototype = Object.create(a && a.prototype)).constructor = t).prototype.drawText_ = function (t, e) {
                var i = this.context_, r = t.getReplay(0, ql.TEXT);
                r.setTextStyle(this.textStyle_), r.drawText(e, null), r.finish(i);
                r.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), r.getDeleteResourcesFunction(i)()
            }, t.prototype.setStyle = function (t) {
                this.setFillStrokeStyle(t.getFill(), t.getStroke()), this.setImageStyle(t.getImage()), this.setTextStyle(t.getText())
            }, t.prototype.drawGeometry = function (t) {
                switch (t.getType()) {
                    case Lt.POINT:
                        this.drawPoint(t, null);
                        break;
                    case Lt.LINE_STRING:
                        this.drawLineString(t, null);
                        break;
                    case Lt.POLYGON:
                        this.drawPolygon(t, null);
                        break;
                    case Lt.MULTI_POINT:
                        this.drawMultiPoint(t, null);
                        break;
                    case Lt.MULTI_LINE_STRING:
                        this.drawMultiLineString(t, null);
                        break;
                    case Lt.MULTI_POLYGON:
                        this.drawMultiPolygon(t, null);
                        break;
                    case Lt.GEOMETRY_COLLECTION:
                        this.drawGeometryCollection(t, null);
                        break;
                    case Lt.CIRCLE:
                        this.drawCircle(t, null)
                }
            }, t.prototype.drawFeature = function (t, e) {
                var i = e.getGeometryFunction()(t);
                i && wt(this.extent_, i.getExtent()) && (this.setStyle(e), this.drawGeometry(i))
            }, t.prototype.drawGeometryCollection = function (t, e) {
                var i, r, n = t.getGeometriesArray();
                for (i = 0, r = n.length; i < r; ++i) this.drawGeometry(n[i])
            }, t.prototype.drawPoint = function (t, e) {
                var i = this.context_, r = new Cp(1, this.extent_), n = r.getReplay(0, ql.IMAGE);
                n.setImageStyle(this.imageStyle_), n.drawPoint(t, e), n.finish(i);
                n.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(r, t)
            }, t.prototype.drawMultiPoint = function (t, e) {
                var i = this.context_, r = new Cp(1, this.extent_), n = r.getReplay(0, ql.IMAGE);
                n.setImageStyle(this.imageStyle_), n.drawMultiPoint(t, e), n.finish(i);
                n.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(r, t)
            }, t.prototype.drawLineString = function (t, e) {
                var i = this.context_, r = new Cp(1, this.extent_), n = r.getReplay(0, ql.LINE_STRING);
                n.setFillStrokeStyle(null, this.strokeStyle_), n.drawLineString(t, e), n.finish(i);
                n.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(r, t)
            }, t.prototype.drawMultiLineString = function (t, e) {
                var i = this.context_, r = new Cp(1, this.extent_), n = r.getReplay(0, ql.LINE_STRING);
                n.setFillStrokeStyle(null, this.strokeStyle_), n.drawMultiLineString(t, e), n.finish(i);
                n.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(r, t)
            }, t.prototype.drawPolygon = function (t, e) {
                var i = this.context_, r = new Cp(1, this.extent_), n = r.getReplay(0, ql.POLYGON);
                n.setFillStrokeStyle(this.fillStyle_, this.strokeStyle_), n.drawPolygon(t, e), n.finish(i);
                n.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(r, t)
            }, t.prototype.drawMultiPolygon = function (t, e) {
                var i = this.context_, r = new Cp(1, this.extent_), n = r.getReplay(0, ql.POLYGON);
                n.setFillStrokeStyle(this.fillStyle_, this.strokeStyle_), n.drawMultiPolygon(t, e), n.finish(i);
                n.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(r, t)
            }, t.prototype.drawCircle = function (t, e) {
                var i = this.context_, r = new Cp(1, this.extent_), n = r.getReplay(0, ql.CIRCLE);
                n.setFillStrokeStyle(this.fillStyle_, this.strokeStyle_), n.drawCircle(t, e), n.finish(i);
                n.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(r, t)
            }, t.prototype.setImageStyle = function (t) {
                this.imageStyle_ = t
            }, t.prototype.setFillStrokeStyle = function (t, e) {
                this.fillStyle_ = t, this.strokeStyle_ = e
            }, t.prototype.setTextStyle = function (t) {
                this.textStyle_ = t
            }, t
        }(Ml),
        wp = new Lc("precision mediump float;\nvarying vec2 v_texCoord;\n\n\nuniform float u_opacity;\nuniform sampler2D u_texture;\n\nvoid main(void) {\n  vec4 texColor = texture2D(u_texture, v_texCoord);\n  gl_FragColor.rgb = texColor.rgb;\n  gl_FragColor.a = texColor.a * u_opacity;\n}\n"),
        Rp = new bc("varying vec2 v_texCoord;\n\n\nattribute vec2 a_position;\nattribute vec2 a_texCoord;\n\nuniform mat4 u_texCoordMatrix;\nuniform mat4 u_projectionMatrix;\n\nvoid main(void) {\n  gl_Position = u_projectionMatrix * vec4(a_position, 0., 1.);\n  v_texCoord = (u_texCoordMatrix * vec4(a_texCoord, 0., 1.)).st;\n}\n\n\n"),
        Ip = function (t, e) {
            this.u_texCoordMatrix = t.getUniformLocation(e, "u_texCoordMatrix"), this.u_projectionMatrix = t.getUniformLocation(e, "u_projectionMatrix"), this.u_opacity = t.getUniformLocation(e, "u_opacity"), this.u_texture = t.getUniformLocation(e, "u_texture"), this.a_position = t.getAttribLocation(e, "a_position"), this.a_texCoord = t.getAttribLocation(e, "a_texCoord")
        }, Lp = function (i) {
            function t(t, e) {
                i.call(this, e), this.mapRenderer = t, this.arrayBuffer_ = new Yc([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1]), this.texture = null, this.framebuffer = null, this.framebufferDimension = void 0, this.texCoordMatrix = [1, 0, 0, 1, 0, 0], this.projectionMatrix = [1, 0, 0, 1, 0, 0], this.tmpMat4_ = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.defaultLocations_ = null
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.bindFramebuffer = function (t, e) {
                var i = this.mapRenderer.getGL();
                if (void 0 === this.framebufferDimension || this.framebufferDimension != e) {
                    var r = function (t, e, i) {
                        t.isContextLost() || (t.deleteFramebuffer(e), t.deleteTexture(i))
                    }.bind(null, i, this.framebuffer, this.texture);
                    t.postRenderFunctions.push(r);
                    var n = qc(i, e, e), o = i.createFramebuffer();
                    i.bindFramebuffer(qe, o), i.framebufferTexture2D(qe, 36064, He, n, 0), this.texture = n, this.framebuffer = o, this.framebufferDimension = e
                } else i.bindFramebuffer(qe, this.framebuffer)
            }, t.prototype.composeFrame = function (t, e, i) {
                this.dispatchComposeEvent_(Tn, i, t), i.bindBuffer(ze, this.arrayBuffer_);
                var r, n = i.getGL(), o = i.getProgram(wp, Rp);
                this.defaultLocations_ ? r = this.defaultLocations_ : (r = new Ip(n, o), this.defaultLocations_ = r), i.useProgram(o) && (n.enableVertexAttribArray(r.a_position), n.vertexAttribPointer(r.a_position, 2, Ve, !1, 16, 0), n.enableVertexAttribArray(r.a_texCoord), n.vertexAttribPointer(r.a_texCoord, 2, Ve, !1, 16, 8), n.uniform1i(r.u_texture, 0)), n.uniformMatrix4fv(r.u_texCoordMatrix, !1, Oc(this.tmpMat4_, this.getTexCoordMatrix())), n.uniformMatrix4fv(r.u_projectionMatrix, !1, Oc(this.tmpMat4_, this.getProjectionMatrix())), n.uniform1f(r.u_opacity, e.opacity), n.bindTexture(He, this.getTexture()), n.drawArrays(5, 0, 4), this.dispatchComposeEvent_(Cn, i, t)
            }, t.prototype.dispatchComposeEvent_ = function (t, e, i) {
                var r = this.getLayer();
                if (r.hasListener(t)) {
                    var n = i.viewState, o = n.resolution, s = i.pixelRatio, a = i.extent, h = n.center, l = n.rotation,
                        u = i.size, c = new Tp(e, h, o, l, u, a, s), p = new Pl(t, c, i, null, e);
                    r.dispatchEvent(p)
                }
            }, t.prototype.getTexCoordMatrix = function () {
                return this.texCoordMatrix
            }, t.prototype.getTexture = function () {
                return this.texture
            }, t.prototype.getProjectionMatrix = function () {
                return this.projectionMatrix
            }, t.prototype.handleWebGLContextLost = function () {
                this.texture = null, this.framebuffer = null, this.framebufferDimension = void 0
            }, t.prototype.prepareFrame = function (t, e, i) {
            }, t.prototype.forEachLayerAtPixel = function (t, e, i, r) {
            }, t
        }(Bl), bp = function (i) {
            function t(t, e) {
                i.call(this, t, e), this.image_ = null, this.hitCanvasContext_ = null, this.hitTransformationMatrix_ = null
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.createTexture_ = function (t) {
                var e = t.getImage();
                return Jc(this.mapRenderer.getGL(), e, Ze, Ze)
            }, t.prototype.forEachFeatureAtCoordinate = function (t, e, i, r, n) {
                var o = this.getLayer(), s = o.getSource(), a = e.viewState.resolution, h = e.viewState.rotation,
                    l = e.skippedFeatureUids;
                return s.forEachFeatureAtCoordinate(t, a, h, i, l, function (t) {
                    return r.call(n, t, o)
                })
            }, t.prototype.prepareFrame = function (t, e, i) {
                var r = this.mapRenderer.getGL(), n = t.pixelRatio, o = t.viewState, s = o.center, a = o.resolution,
                    h = o.rotation, l = this.image_, u = this.texture, c = this.getLayer().getSource(), p = t.viewHints,
                    d = t.extent;
                if (void 0 !== e.extent && (d = ht(d, e.extent)), !p[is.ANIMATING] && !p[is.INTERACTING] && !pt(d)) {
                    var f = o.projection, _ = c.getImage(d, a, n, f);
                    if (_) if (this.loadImage(_) && (l = _, u = this.createTexture_(_), this.texture)) {
                        var g = function (t, e) {
                            t.isContextLost() || t.deleteTexture(e)
                        }.bind(null, r, this.texture);
                        t.postRenderFunctions.push(g)
                    }
                }
                if (l) {
                    var y = this.mapRenderer.getContext().getCanvas();
                    this.updateProjectionMatrix_(y.width, y.height, n, s, a, h, l.getExtent()), this.hitTransformationMatrix_ = null;
                    var v = this.texCoordMatrix;
                    ge(v), Ee(v, 1, -1), Ce(v, 0, -1), this.image_ = l, this.texture = u
                }
                return !!l
            }, t.prototype.updateProjectionMatrix_ = function (t, e, i, r, n, o, s) {
                var a = t * n, h = e * n, l = this.projectionMatrix;
                ge(l), Ee(l, 2 * i / a, 2 * i / h), Se(l, -o), Ce(l, s[0] - r[0], s[1] - r[1]), Ee(l, (s[2] - s[0]) / 2, (s[3] - s[1]) / 2), Ce(l, 1, 1)
            }, t.prototype.hasFeatureAtCoordinate = function (t, e) {
                return void 0 !== this.forEachFeatureAtCoordinate(t, e, 0, y, this)
            }, t.prototype.forEachLayerAtPixel = function (t, e, i, r) {
                if (this.image_ && this.image_.getImage()) {
                    if (this.getLayer().getSource().forEachFeatureAtCoordinate !== L) {
                        var n = xe(e.pixelToCoordinateTransform, t.slice());
                        return this.forEachFeatureAtCoordinate(n, e, 0, y, this) ? i.call(r, this.getLayer(), null) : void 0
                    }
                    var o = [this.image_.getImage().width, this.image_.getImage().height];
                    this.hitTransformationMatrix_ || (this.hitTransformationMatrix_ = this.getHitTransformationMatrix_(e.size, o));
                    var s = xe(this.hitTransformationMatrix_, t.slice());
                    if (!(s[0] < 0 || s[0] > o[0] || s[1] < 0 || s[1] > o[1])) {
                        this.hitCanvasContext_ || (this.hitCanvasContext_ = De(1, 1)), this.hitCanvasContext_.clearRect(0, 0, 1, 1), this.hitCanvasContext_.drawImage(this.image_.getImage(), s[0], s[1], 1, 1, 0, 0, 1, 1);
                        var a = this.hitCanvasContext_.getImageData(0, 0, 1, 1).data;
                        return 0 < a[3] ? i.call(r, this.getLayer(), a) : void 0
                    }
                }
            }, t.prototype.getHitTransformationMatrix_ = function (t, e) {
                var i = [1, 0, 0, 1, 0, 0];
                Ce(i, -1, -1), Ee(i, 2 / t[0], 2 / t[1]), Ce(i, 0, t[1]), Ee(i, 1, -1);
                var r = we(this.projectionMatrix.slice()), n = [1, 0, 0, 1, 0, 0];
                return Ce(n, 0, e[1]), Ee(n, 1, -1), Ee(n, e[0] / 2, e[1] / 2), Ce(n, 1, 1), ye(n, r), ye(n, i), n
            }, t
        }(Lp);
    bp.handles = function (t) {
        return t.getType() === sh.IMAGE
    }, bp.create = function (t, e) {
        return new bp(t, e)
    };
    var Fp = function (i) {
            function t(t) {
                i.call(this, t);
                var e = t.getViewport();
                this.canvas_ = document.createElement("canvas"), this.canvas_.style.width = "100%", this.canvas_.style.height = "100%", this.canvas_.style.display = "block", this.canvas_.className = _i, e.insertBefore(this.canvas_, e.childNodes[0] || null), this.clipTileCanvasWidth_ = 0, this.clipTileCanvasHeight_ = 0, this.clipTileContext_ = De(), this.renderedVisible_ = !0, this.gl_ = Qe(this.canvas_, {
                    antialias: !0,
                    depth: !0,
                    failIfMajorPerformanceCaveat: !0,
                    preserveDrawingBuffer: !1,
                    stencil: !0
                }), this.context_ = new Hc(this.canvas_, this.gl_), C(this.canvas_, Wc, this.handleWebGLContextLost, this), C(this.canvas_, Kc, this.handleWebGLContextRestored, this), this.textureCache_ = new mi, this.focus_ = null, this.tileTextureQueue_ = new Zo(function (t) {
                    var e = t[1], i = t[2], r = e[0] - this.focus_[0], n = e[1] - this.focus_[1];
                    return 65536 * Math.log(i) + Math.sqrt(r * r + n * n) / i
                }.bind(this), function (t) {
                    return t[0].getKey()
                }), this.loadNextTileTexture_ = function (t, e) {
                    if (!this.tileTextureQueue_.isEmpty()) {
                        this.tileTextureQueue_.reprioritize();
                        var i = this.tileTextureQueue_.dequeue(), r = i[0], n = i[3], o = i[4];
                        this.bindTileTexture(r, n, o, 9729, 9729)
                    }
                    return !1
                }.bind(this), this.textureCacheFrameMarkerCount_ = 0, this.initializeGL_()
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.bindTileTexture = function (t, e, i, r, n) {
                var o = this.getGL(), s = t.getKey();
                if (this.textureCache_.containsKey(s)) {
                    var a = this.textureCache_.get(s);
                    o.bindTexture(He, a.texture), a.magFilter != r && (o.texParameteri(He, 10240, r), a.magFilter = r), a.minFilter != n && (o.texParameteri(He, 10241, n), a.minFilter = n)
                } else {
                    var h = o.createTexture();
                    if (o.bindTexture(He, h), 0 < i) {
                        var l = this.clipTileContext_.canvas, u = this.clipTileContext_;
                        this.clipTileCanvasWidth_ !== e[0] || this.clipTileCanvasHeight_ !== e[1] ? (l.width = e[0], l.height = e[1], this.clipTileCanvasWidth_ = e[0], this.clipTileCanvasHeight_ = e[1]) : u.clearRect(0, 0, e[0], e[1]), u.drawImage(t.getImage(), i, i, e[0], e[1], 0, 0, e[0], e[1]), o.texImage2D(He, 0, 6408, 6408, 5121, l)
                    } else o.texImage2D(He, 0, 6408, 6408, 5121, t.getImage());
                    o.texParameteri(He, 10240, r), o.texParameteri(He, 10241, n), o.texParameteri(He, We, Ze), o.texParameteri(He, Ke, Ze), this.textureCache_.set(s, {
                        texture: h,
                        magFilter: r,
                        minFilter: n
                    })
                }
            }, t.prototype.dispatchRenderEvent = function (t, e) {
                var i = this.getMap();
                if (i.hasListener(t)) {
                    var r = this.context_, n = e.extent, o = e.size, s = e.viewState, a = e.pixelRatio, h = s.resolution,
                        l = s.center, u = s.rotation, c = new Tp(r, l, h, u, o, n, a), p = new Pl(t, c, e, null, r);
                    i.dispatchEvent(p)
                }
            }, t.prototype.disposeInternal = function () {
                var e = this.getGL();
                e.isContextLost() || this.textureCache_.forEach(function (t) {
                    t && e.deleteTexture(t.texture)
                }), this.context_.dispose(), i.prototype.disposeInternal.call(this)
            }, t.prototype.expireCache_ = function (t, e) {
                for (var i, r = this.getGL(); 1024 < this.textureCache_.getCount() - this.textureCacheFrameMarkerCount_;) {
                    if (i = this.textureCache_.peekLast()) r.deleteTexture(i.texture); else {
                        if (+this.textureCache_.peekLastKey() == e.index) break;
                        --this.textureCacheFrameMarkerCount_
                    }
                    this.textureCache_.pop()
                }
            }, t.prototype.getContext = function () {
                return this.context_
            }, t.prototype.getGL = function () {
                return this.gl_
            }, t.prototype.getTileTextureQueue = function () {
                return this.tileTextureQueue_
            }, t.prototype.handleWebGLContextLost = function (t) {
                t.preventDefault(), this.textureCache_.clear(), this.textureCacheFrameMarkerCount_ = 0;
                var e = this.getLayerRenderers();
                for (var i in e) {
                    e[i].handleWebGLContextLost()
                }
            }, t.prototype.handleWebGLContextRestored = function () {
                this.initializeGL_(), this.getMap().render()
            }, t.prototype.initializeGL_ = function () {
                var t = this.gl_;
                t.activeTexture(33984), t.blendFuncSeparate(770, 771, 1, 771), t.disable(2884), t.disable(2929), t.disable(3089), t.disable(2960)
            }, t.prototype.isTileTextureLoaded = function (t) {
                return this.textureCache_.containsKey(t.getKey())
            }, t.prototype.renderFrame = function (t) {
                var e = this.getContext(), i = this.getGL();
                if (i.isContextLost()) return !1;
                if (!t) return this.renderedVisible_ && (this.canvas_.style.display = "none", this.renderedVisible_ = !1), !1;
                this.focus_ = t.focus, this.textureCache_.set((-t.index).toString(), null), ++this.textureCacheFrameMarkerCount_, this.dispatchRenderEvent(Tn, t);
                var r = [], n = t.layerStatesArray;
                _r(n, jl);
                var o, s, a, h = t.viewState.resolution;
                for (o = 0, s = n.length; o < s; ++o) bs(a = n[o], h) && a.sourceState == ms && this.getLayerRenderer(a.layer).prepareFrame(t, a, e) && r.push(a);
                var l = t.size[0] * t.pixelRatio, u = t.size[1] * t.pixelRatio;
                for (this.canvas_.width == l && this.canvas_.height == u || (this.canvas_.width = l, this.canvas_.height = u), i.bindFramebuffer(qe, null), i.clearColor(0, 0, 0, 0), i.clear(16384), i.enable(3042), i.viewport(0, 0, this.canvas_.width, this.canvas_.height), o = 0, s = r.length; o < s; ++o) a = r[o], this.getLayerRenderer(a.layer).composeFrame(t, a, e);
                this.renderedVisible_ || (this.canvas_.style.display = "", this.renderedVisible_ = !0), this.calculateMatrices2D(t), 1024 < this.textureCache_.getCount() - this.textureCacheFrameMarkerCount_ && t.postRenderFunctions.push(this.expireCache_.bind(this)), this.tileTextureQueue_.isEmpty() || (t.postRenderFunctions.push(this.loadNextTileTexture_), t.animate = !0), this.dispatchRenderEvent(Cn, t), this.scheduleRemoveUnusedLayerRenderers(t), this.scheduleExpireIconCache(t)
            }, t.prototype.forEachFeatureAtCoordinate = function (t, e, i, r, n, o, s) {
                var a;
                if (this.getGL().isContextLost()) return !1;
                var h, l = e.viewState, u = e.layerStatesArray;
                for (h = u.length - 1; 0 <= h; --h) {
                    var c = u[h], p = c.layer;
                    if (bs(c, l.resolution) && o.call(s, p)) if (a = this.getLayerRenderer(p).forEachFeatureAtCoordinate(t, e, i, r, n)) return a
                }
            }, t.prototype.hasFeatureAtCoordinate = function (t, e, i, r, n) {
                var o = !1;
                if (this.getGL().isContextLost()) return !1;
                var s, a = e.viewState, h = e.layerStatesArray;
                for (s = h.length - 1; 0 <= s; --s) {
                    var l = h[s], u = l.layer;
                    if (bs(l, a.resolution) && r.call(n, u)) if (o = this.getLayerRenderer(u).hasFeatureAtCoordinate(t, e)) return !0
                }
                return o
            }, t.prototype.forEachLayerAtPixel = function (t, e, i, r, n, o, s) {
                if (this.getGL().isContextLost()) return !1;
                var a, h, l = e.viewState, u = e.layerStatesArray;
                for (h = u.length - 1; 0 <= h; --h) {
                    var c = u[h], p = c.layer;
                    if (bs(c, l.resolution) && o.call(n, p)) if (a = this.getLayerRenderer(p).forEachLayerAtPixel(t, e, r, n)) return a
                }
            }, t
        }(kl),
        Pp = new Lc("precision mediump float;\nvarying vec2 v_texCoord;\n\n\nuniform sampler2D u_texture;\n\nvoid main(void) {\n  gl_FragColor = texture2D(u_texture, v_texCoord);\n}\n"),
        Mp = new bc("varying vec2 v_texCoord;\n\n\nattribute vec2 a_position;\nattribute vec2 a_texCoord;\nuniform vec4 u_tileOffset;\n\nvoid main(void) {\n  gl_Position = vec4(a_position * u_tileOffset.xy + u_tileOffset.zw, 0., 1.);\n  v_texCoord = a_texCoord;\n}\n\n\n"),
        Op = function (t, e) {
            this.u_tileOffset = t.getUniformLocation(e, "u_tileOffset"), this.u_texture = t.getUniformLocation(e, "u_texture"), this.a_position = t.getAttribLocation(e, "a_position"), this.a_texCoord = t.getAttribLocation(e, "a_texCoord")
        }, Np = function (i) {
            function t(t, e) {
                i.call(this, t, e), this.fragmentShader_ = Pp, this.vertexShader_ = Mp, this.locations_ = null, this.renderArrayBuffer_ = new Yc([0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0]), this.renderedTileRange_ = null, this.renderedFramebufferExtent_ = null, this.renderedRevision_ = -1, this.tmpSize_ = [0, 0]
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.disposeInternal = function () {
                this.mapRenderer.getContext().deleteBuffer(this.renderArrayBuffer_), i.prototype.disposeInternal.call(this)
            }, t.prototype.createLoadedTileFinder = function (e, r, n) {
                var o = this.mapRenderer;
                return function (i, t) {
                    return e.forEachLoadedTile(r, i, t, function (t) {
                        var e = o.isTileTextureLoaded(t);
                        return e && (n[i] || (n[i] = {}), n[i][t.tileCoord.toString()] = t), e
                    })
                }
            }, t.prototype.handleWebGLContextLost = function () {
                i.prototype.handleWebGLContextLost.call(this), this.locations_ = null
            }, t.prototype.prepareFrame = function (t, e, i) {
                var r, n, o = this.mapRenderer, s = i.getGL(), a = t.viewState, h = a.projection, l = this.getLayer(),
                    u = l.getSource(), c = u.getTileGridForProjection(h), p = c.getZForResolution(a.resolution),
                    d = c.getResolution(p), f = u.getTilePixelSize(p, t.pixelRatio, h),
                    _ = f[0] / ws(c.getTileSize(p), this.tmpSize_)[0], g = d / _,
                    y = u.getTilePixelRatio(_) * u.getGutterForProjection(h), v = a.center, m = t.extent,
                    x = c.getTileRangeForExtentAndZ(m, p);
                if (this.renderedTileRange_ && this.renderedTileRange_.equals(x) && this.renderedRevision_ == u.getRevision()) r = this.renderedFramebufferExtent_; else {
                    var S = x.getSize(), E = Math.max(S[0] * f[0], S[1] * f[1]),
                        C = (Z(0 < (n = E), 29), Math.pow(2, Math.ceil(Math.log(n) / Math.LN2))), T = g * C,
                        w = c.getOrigin(p), R = w[0] + x.minX * f[0] * g, I = w[1] + x.minY * f[1] * g;
                    r = [R, I, R + T, I + T], this.bindFramebuffer(t, C), s.viewport(0, 0, C, C), s.clearColor(0, 0, 0, 0), s.clear(16384), s.disable(3042);
                    var L = i.getProgram(this.fragmentShader_, this.vertexShader_);
                    i.useProgram(L), this.locations_ || (this.locations_ = new Op(s, L)), i.bindBuffer(ze, this.renderArrayBuffer_), s.enableVertexAttribArray(this.locations_.a_position), s.vertexAttribPointer(this.locations_.a_position, 2, Ve, !1, 16, 0), s.enableVertexAttribArray(this.locations_.a_texCoord), s.vertexAttribPointer(this.locations_.a_texCoord, 2, Ve, !1, 16, 8), s.uniform1i(this.locations_.u_texture, 0);
                    var b = {};
                    b[p] = {};
                    var F, P, M, O, N, A, G = this.createLoadedTileFinder(u, h, b), k = l.getUseInterimTilesOnError(),
                        D = !0, j = [1 / 0, 1 / 0, -1 / 0, -1 / 0], U = new Wl(0, 0, 0, 0);
                    for (O = x.minX; O <= x.maxX; ++O) for (N = x.minY; N <= x.maxY; ++N) if (P = u.getTile(p, O, N, _, h), void 0 === e.extent || wt(A = c.getTileCoordExtent(P.tileCoord, j), e.extent)) {
                        if ((M = P.getState()) == kn || M == jn || M == Dn && !k || (P = P.getInterimTile()), (M = P.getState()) == kn) {
                            if (o.isTileTextureLoaded(P)) {
                                b[p][P.tileCoord.toString()] = P;
                                continue
                            }
                        } else if (M == jn || M == Dn && !k) continue;
                        D = !1, c.forEachTileCoordParentTileRange(P.tileCoord, G, null, U, j) || (F = c.getTileCoordChildTileRange(P.tileCoord, U, j)) && G(p + 1, F)
                    }
                    var Y = Object.keys(b).map(Number);
                    Y.sort(hr);
                    for (var B = new Float32Array(4), X = 0, z = Y.length; X < z; ++X) {
                        var V = b[Y[X]];
                        for (var W in V) P = V[W], A = c.getTileCoordExtent(P.tileCoord, j), B[0] = 2 * (A[2] - A[0]) / T, B[1] = 2 * (A[3] - A[1]) / T, B[2] = 2 * (A[0] - r[0]) / T - 1, B[3] = 2 * (A[1] - r[1]) / T - 1, s.uniform4fv(this.locations_.u_tileOffset, B), o.bindTileTexture(P, f, y * _, 9729, 9729), s.drawArrays(5, 0, 4)
                    }
                    D ? (this.renderedTileRange_ = x, this.renderedFramebufferExtent_ = r, this.renderedRevision_ = u.getRevision()) : (this.renderedTileRange_ = null, this.renderedFramebufferExtent_ = null, this.renderedRevision_ = -1, t.animate = !0)
                }
                this.updateUsedTiles(t.usedTiles, u, p, x);
                var K = o.getTileTextureQueue();
                this.manageTilePyramid(t, u, c, _, h, m, p, l.getPreload(), function (t) {
                    t.getState() != kn || o.isTileTextureLoaded(t) || K.isKeyQueued(t.getKey()) || K.enqueue([t, c.getTileCoordCenter(t.tileCoord), c.getResolution(t.tileCoord[0]), f, y * _])
                }, this), this.scheduleExpireCache(t, u);
                var H = this.texCoordMatrix;
                return ge(H), Ce(H, (Math.round(v[0] / d) * d - r[0]) / (r[2] - r[0]), (Math.round(v[1] / d) * d - r[1]) / (r[3] - r[1])), 0 !== a.rotation && Se(H, a.rotation), Ee(H, t.size[0] * a.resolution / (r[2] - r[0]), t.size[1] * a.resolution / (r[3] - r[1])), Ce(H, -.5, -.5), !0
            }, t.prototype.forEachLayerAtPixel = function (t, e, i, r) {
                if (this.framebuffer) {
                    var n = [t[0] / e.size[0], (e.size[1] - t[1]) / e.size[1]], o = xe(this.texCoordMatrix, n.slice()),
                        s = [o[0] * this.framebufferDimension, o[1] * this.framebufferDimension],
                        a = this.mapRenderer.getContext().getGL();
                    a.bindFramebuffer(a.FRAMEBUFFER, this.framebuffer);
                    var h = new Uint8Array(4);
                    return a.readPixels(s[0], s[1], 1, 1, a.RGBA, a.UNSIGNED_BYTE, h), 0 < h[3] ? i.call(r, this.getLayer(), h) : void 0
                }
            }, t
        }(Lp);
    Np.handles = function (t) {
        return t.getType() === sh.TILE
    }, Np.create = function (t, e) {
        return new Np(t, e)
    };
    var Ap = function (i) {
        function t(t, e) {
            i.call(this, t, e), this.dirty_ = !1, this.renderedRevision_ = -1, this.renderedResolution_ = NaN, this.renderedExtent_ = [1 / 0, 1 / 0, -1 / 0, -1 / 0], this.renderedRenderOrder_ = null, this.replayGroup_ = null, this.layerState_ = null
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.composeFrame = function (t, e, i) {
            this.layerState_ = e;
            var r = t.viewState, n = this.replayGroup_, o = t.size, s = t.pixelRatio, a = this.mapRenderer.getGL();
            n && !n.isEmpty() && (a.enable(a.SCISSOR_TEST), a.scissor(0, 0, o[0] * s, o[1] * s), n.replay(i, r.center, r.resolution, r.rotation, o, s, e.opacity, e.managed ? t.skippedFeatureUids : {}), a.disable(a.SCISSOR_TEST))
        }, t.prototype.disposeInternal = function () {
            var t = this.replayGroup_;
            if (t) {
                var e = this.mapRenderer.getContext();
                t.getDeleteResourcesFunction(e)(), this.replayGroup_ = null
            }
            i.prototype.disposeInternal.call(this)
        }, t.prototype.forEachFeatureAtCoordinate = function (t, e, i, r, n) {
            if (this.replayGroup_ && this.layerState_) {
                var o = this.mapRenderer.getContext(), s = e.viewState, a = this.getLayer(), h = this.layerState_,
                    l = {};
                return this.replayGroup_.forEachFeatureAtCoordinate(t, o, s.center, s.resolution, s.rotation, e.size, e.pixelRatio, h.opacity, {}, function (t) {
                    var e = Ct(t).toString();
                    if (!(e in l)) return l[e] = !0, r.call(n, t, a)
                })
            }
        }, t.prototype.hasFeatureAtCoordinate = function (t, e) {
            if (this.replayGroup_ && this.layerState_) {
                var i = this.mapRenderer.getContext(), r = e.viewState, n = this.layerState_;
                return this.replayGroup_.hasFeatureAtCoordinate(t, i, r.center, r.resolution, r.rotation, e.size, e.pixelRatio, n.opacity, e.skippedFeatureUids)
            }
            return !1
        }, t.prototype.forEachLayerAtPixel = function (t, e, i, r) {
            var n = xe(e.pixelToCoordinateTransform, t.slice());
            return this.hasFeatureAtCoordinate(n, e) ? i.call(r, this.getLayer(), null) : void 0
        }, t.prototype.handleStyleImageChange_ = function (t) {
            this.renderIfReadyAndVisible()
        }, t.prototype.prepareFrame = function (t, e, i) {
            var n = this.getLayer(), r = n.getSource(), o = t.viewHints[is.ANIMATING], s = t.viewHints[is.INTERACTING],
                a = n.getUpdateWhileAnimating(), h = n.getUpdateWhileInteracting();
            if (!this.dirty_ && !a && o || !h && s) return !0;
            var l = t.extent, u = t.viewState, c = u.projection, p = u.resolution, d = t.pixelRatio,
                f = n.getRevision(), _ = n.getRenderBuffer(), g = n.getRenderOrder();
            void 0 === g && (g = Fu);
            var y = G(l, _ * p);
            if (!this.dirty_ && this.renderedResolution_ == p && this.renderedRevision_ == f && this.renderedRenderOrder_ == g && Q(this.renderedExtent_, y)) return !0;
            this.replayGroup_ && t.postRenderFunctions.push(this.replayGroup_.getDeleteResourcesFunction(i)), this.dirty_ = !1;
            var v = new Cp(Mu(p, d), y, n.getRenderBuffer());
            r.loadFeatures(y, p, c);
            var m = function (t) {
                var e, i = t.getStyleFunction() || n.getStyleFunction();
                if (i && (e = i(t, p)), e) {
                    var r = this.renderFeature(t, p, d, e, v);
                    this.dirty_ = this.dirty_ || r
                }
            };
            if (g) {
                var x = [];
                r.forEachFeatureInExtent(y, function (t) {
                    x.push(t)
                }, this), x.sort(g), x.forEach(m.bind(this))
            } else r.forEachFeatureInExtent(y, m, this);
            return v.finish(i), this.renderedResolution_ = p, this.renderedRevision_ = f, this.renderedRenderOrder_ = g, this.renderedExtent_ = y, this.replayGroup_ = v, !0
        }, t.prototype.renderFeature = function (t, e, i, r, n) {
            if (!r) return !1;
            var o = !1;
            if (Array.isArray(r)) for (var s = r.length - 1; 0 <= s; --s) o = Ou(n, t, r[s], Pu(e, i), this.handleStyleImageChange_, this) || o; else o = Ou(n, t, r, Pu(e, i), this.handleStyleImageChange_, this) || o;
            return o
        }, t
    }(Lp);
    Ap.handles = function (t) {
        return t.getType() === sh.VECTOR
    }, Ap.create = function (t, e) {
        return new Ap(t, e)
    };
    var Gp = function (e) {
        function t(t) {
            (t = E({}, t)).controls || (t.controls = As()), t.interactions || (t.interactions = bl()), e.call(this, t)
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.createRenderer = function () {
            var t = new Fp(this);
            return t.registerLayerRenderers([bp, Np, Ap]), t
        }, t
    }(Rs), kp = "projection", Dp = "coordinateFormat", jp = function (r) {
        function t(t) {
            var e = t || {}, i = document.createElement("div");
            i.className = void 0 !== e.className ? e.className : "ol-mouse-position", r.call(this, {
                element: i,
                render: e.render || Up,
                target: e.target
            }), C(this, b(kp), this.handleProjectionChanged_, this), e.coordinateFormat && this.setCoordinateFormat(e.coordinateFormat), e.projection && this.setProjection(e.projection), this.undefinedHTML_ = "undefinedHTML" in e ? e.undefinedHTML : "&#160;", this.renderOnMouseOut_ = !!this.undefinedHTML_, this.renderedHTML_ = i.innerHTML, this.mapProjection_ = null, this.transform_ = null, this.lastMouseMovePixel_ = null
        }

        return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype.handleProjectionChanged_ = function () {
            this.transform_ = null
        }, t.prototype.getCoordinateFormat = function () {
            return this.get(Dp)
        }, t.prototype.getProjection = function () {
            return this.get(kp)
        }, t.prototype.handleMouseMove = function (t) {
            var e = this.getMap();
            this.lastMouseMovePixel_ = e.getEventPixel(t), this.updateHTML_(this.lastMouseMovePixel_)
        }, t.prototype.handleMouseOut = function (t) {
            this.updateHTML_(null), this.lastMouseMovePixel_ = null
        }, t.prototype.setMap = function (t) {
            if (r.prototype.setMap.call(this, t), t) {
                var e = t.getViewport();
                this.listenerKeys.push(C(e, w.MOUSEMOVE, this.handleMouseMove, this)), this.renderOnMouseOut_ && this.listenerKeys.push(C(e, w.MOUSEOUT, this.handleMouseOut, this))
            }
        }, t.prototype.setCoordinateFormat = function (t) {
            this.set(Dp, t)
        }, t.prototype.setProjection = function (t) {
            this.set(kp, ne(t))
        }, t.prototype.updateHTML_ = function (t) {
            var e = this.undefinedHTML_;
            if (t && this.mapProjection_) {
                if (!this.transform_) {
                    var i = this.getProjection();
                    this.transform_ = i ? ce(this.mapProjection_, i) : ie
                }
                var r = this.getMap().getCoordinateFromPixel(t);
                if (r) {
                    this.transform_(r, r);
                    var n = this.getCoordinateFormat();
                    e = n ? n(r) : r.toString()
                }
            }
            this.renderedHTML_ && e === this.renderedHTML_ || (this.element.innerHTML = e, this.renderedHTML_ = e)
        }, t
    }(Is);

    function Up(t) {
        var e = t.frameState;
        e ? this.mapProjection_ != e.viewState.projection && (this.mapProjection_ = e.viewState.projection, this.transform_ = null) : this.mapProjection_ = null, this.updateHTML_(this.lastMouseMovePixel_)
    }

    var Yp = function () {
        this.dataProjection = null, this.defaultFeatureProjection = null
    };

    function Bp(t, e, i) {
        var r, n = i ? ne(i.featureProjection) : null, o = i ? ne(i.dataProjection) : null;
        if (r = n && o && !ue(n, o) ? t instanceof Ie ? (e ? t.clone() : t).transform(e ? n : o, e ? o : n) : fe(t, o, n) : t, e && i && void 0 !== i.decimals) {
            var s = Math.pow(10, i.decimals);
            r === t && (r = r.clone()), r.applyTransform(function (t) {
                for (var e = 0, i = t.length; e < i; ++e) t[e] = Math.round(t[e] * s) / s;
                return t
            })
        }
        return r
    }

    Yp.prototype.getReadOptions = function (t, e) {
        var i;
        return e && (i = {
            dataProjection: e.dataProjection ? e.dataProjection : this.readProjection(t),
            featureProjection: e.featureProjection
        }), this.adaptOptions(i)
    }, Yp.prototype.adaptOptions = function (t) {
        return E({dataProjection: this.dataProjection, featureProjection: this.defaultFeatureProjection}, t)
    }, Yp.prototype.getLastExtent = function () {
        return null
    }, Yp.prototype.getType = function () {
    }, Yp.prototype.readFeature = function (t, e) {
    }, Yp.prototype.readFeatures = function (t, e) {
    }, Yp.prototype.readGeometry = function (t, e) {
    }, Yp.prototype.readProjection = function (t) {
    }, Yp.prototype.writeFeature = function (t, e) {
    }, Yp.prototype.writeFeatures = function (t, e) {
    }, Yp.prototype.writeGeometry = function (t, e) {
    };
    var Xp = function (t) {
        function e() {
            t.call(this)
        }

        return t && (e.__proto__ = t), ((e.prototype = Object.create(t && t.prototype)).constructor = e).prototype.getType = function () {
            return ch.JSON
        }, e.prototype.readFeature = function (t, e) {
            return this.readFeatureFromObject(zp(t), this.getReadOptions(t, e))
        }, e.prototype.readFeatures = function (t, e) {
            return this.readFeaturesFromObject(zp(t), this.getReadOptions(t, e))
        }, e.prototype.readFeatureFromObject = function (t, e) {
        }, e.prototype.readFeaturesFromObject = function (t, e) {
        }, e.prototype.readGeometry = function (t, e) {
            return this.readGeometryFromObject(zp(t), this.getReadOptions(t, e))
        }, e.prototype.readGeometryFromObject = function (t, e) {
        }, e.prototype.readProjection = function (t) {
            return this.readProjectionFromObject(zp(t))
        }, e.prototype.readProjectionFromObject = function (t) {
        }, e.prototype.writeFeature = function (t, e) {
            return JSON.stringify(this.writeFeatureObject(t, e))
        }, e.prototype.writeFeatureObject = function (t, e) {
        }, e.prototype.writeFeatures = function (t, e) {
            return JSON.stringify(this.writeFeaturesObject(t, e))
        }, e.prototype.writeFeaturesObject = function (t, e) {
        }, e.prototype.writeGeometry = function (t, e) {
            return JSON.stringify(this.writeGeometryObject(t, e))
        }, e.prototype.writeGeometryObject = function (t, e) {
        }, e
    }(Yp);

    function zp(t) {
        if ("string" == typeof t) {
            var e = JSON.parse(t);
            return e || null
        }
        return null !== t ? t : null
    }

    var Vp = {};
    Vp[Lt.POINT] = function (t) {
        var e;
        e = void 0 !== t.m && void 0 !== t.z ? new Dr([t.x, t.y, t.z, t.m], yr.XYZM) : void 0 !== t.z ? new Dr([t.x, t.y, t.z], yr.XYZ) : void 0 !== t.m ? new Dr([t.x, t.y, t.m], yr.XYM) : new Dr([t.x, t.y]);
        return e
    }, Vp[Lt.LINE_STRING] = function (t) {
        var e = Zp(t);
        return new Sn(t.paths[0], e)
    }, Vp[Lt.POLYGON] = function (t) {
        var e = Zp(t);
        return new Qr(t.rings, e)
    }, Vp[Lt.MULTI_POINT] = function (t) {
        var e = Zp(t);
        return new rh(t.points, e)
    }, Vp[Lt.MULTI_LINE_STRING] = function (t) {
        var e = Zp(t);
        return new ih(t.paths, e)
    }, Vp[Lt.MULTI_POLYGON] = function (t) {
        var e = Zp(t);
        return new oh(t.rings, e)
    };
    var Wp = {};
    Wp[Lt.POINT] = function (t, e) {
        var i, r = t.getCoordinates(), n = t.getLayout();
        n === yr.XYZ ? i = {x: r[0], y: r[1], z: r[2]} : n === yr.XYM ? i = {
            x: r[0],
            y: r[1],
            m: r[2]
        } : n === yr.XYZM ? i = {x: r[0], y: r[1], z: r[2], m: r[3]} : n === yr.XY ? i = {x: r[0], y: r[1]} : Z(!1, 34);
        return i
    }, Wp[Lt.LINE_STRING] = function (t, e) {
        var i = qp(t);
        return {hasZ: i.hasZ, hasM: i.hasM, paths: [t.getCoordinates()]}
    }, Wp[Lt.POLYGON] = function (t, e) {
        var i = qp(t);
        return {hasZ: i.hasZ, hasM: i.hasM, rings: t.getCoordinates(!1)}
    }, Wp[Lt.MULTI_POINT] = function (t, e) {
        var i = qp(t);
        return {hasZ: i.hasZ, hasM: i.hasM, points: t.getCoordinates()}
    }, Wp[Lt.MULTI_LINE_STRING] = function (t, e) {
        var i = qp(t);
        return {hasZ: i.hasZ, hasM: i.hasM, paths: t.getCoordinates()}
    }, Wp[Lt.MULTI_POLYGON] = function (t, e) {
        for (var i = qp(t), r = t.getCoordinates(!1), n = [], o = 0; o < r.length; o++) for (var s = r[o].length - 1; 0 <= s; s--) n.push(r[o][s]);
        return {hasZ: i.hasZ, hasM: i.hasM, rings: n}
    };
    var Kp = function (i) {
        function t(t) {
            var e = t || {};
            i.call(this), this.geometryName_ = e.geometryName
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.readFeatureFromObject = function (t, e) {
            var i = t, r = Hp(i.geometry, e), n = new Ji;
            return this.geometryName_ && n.setGeometryName(this.geometryName_), n.setGeometry(r), e && e.idField && i.attributes[e.idField] && n.setId(i.attributes[e.idField]), i.attributes && n.setProperties(i.attributes), n
        }, t.prototype.readFeaturesFromObject = function (t, e) {
            var i = e || {};
            if (t.features) {
                var r = [], n = t.features;
                i.idField = t.objectIdFieldName;
                for (var o = 0, s = n.length; o < s; ++o) r.push(this.readFeatureFromObject(n[o], i));
                return r
            }
            return [this.readFeatureFromObject(t, i)]
        }, t.prototype.readGeometryFromObject = function (t, e) {
            return Hp(t, e)
        }, t.prototype.readProjectionFromObject = function (t) {
            var e = t;
            return e.spatialReference && e.spatialReference.wkid ? ne("EPSG:" + e.spatialReference.wkid) : null
        }, t.prototype.writeGeometryObject = function (t, e) {
            return Jp(t, this.adaptOptions(e))
        }, t.prototype.writeFeatureObject = function (t, e) {
            e = this.adaptOptions(e);
            var i = {}, r = t.getGeometry();
            r && (i.geometry = Jp(r, e), e && e.featureProjection && (i.geometry.spatialReference = {wkid: ne(e.featureProjection).getCode().split(":").pop()}));
            var n = t.getProperties();
            return delete n[t.getGeometryName()], Tt(n) ? i.attributes = {} : i.attributes = n, i
        }, t.prototype.writeFeaturesObject = function (t, e) {
            e = this.adaptOptions(e);
            for (var i = [], r = 0, n = t.length; r < n; ++r) i.push(this.writeFeatureObject(t[r], e));
            return {features: i}
        }, t
    }(Xp);

    function Hp(t, e) {
        if (!t) return null;
        var i;
        if ("number" == typeof t.x && "number" == typeof t.y) i = Lt.POINT; else if (t.points) i = Lt.MULTI_POINT; else if (t.paths) i = 1 === t.paths.length ? Lt.LINE_STRING : Lt.MULTI_LINE_STRING; else if (t.rings) {
            var r = Zp(t), n = function (t, e) {
                var i, r, n = [], o = [], s = [];
                for (i = 0, r = t.length; i < r; ++i) {
                    n.length = 0, Lr(n, 0, t[i], e.length);
                    var a = Hr(n, 0, n.length, e.length);
                    a ? o.push([t[i]]) : s.push(t[i])
                }
                for (; s.length;) {
                    var h = s.shift(), l = !1;
                    for (i = o.length - 1; 0 <= i; i--) {
                        var u = o[i][0], c = Q(new kr(u).getExtent(), new kr(h).getExtent());
                        if (c) {
                            o[i].push(h), l = !0;
                            break
                        }
                    }
                    l || o.push([h.reverse()])
                }
                return o
            }(t.rings, r);
            t = E({}, t), 1 === n.length ? (i = Lt.POLYGON, t.rings = n[0]) : (i = Lt.MULTI_POLYGON, t.rings = n)
        }
        return Bp((0, Vp[i])(t), !1, e)
    }

    function Zp(t) {
        var e = yr.XY;
        return !0 === t.hasZ && !0 === t.hasM ? e = yr.XYZM : !0 === t.hasZ ? e = yr.XYZ : !0 === t.hasM && (e = yr.XYM), e
    }

    function qp(t) {
        var e = t.getLayout();
        return {hasZ: e === yr.XYZ || e === yr.XYZM, hasM: e === yr.XYM || e === yr.XYZM}
    }

    function Jp(t, e) {
        return (0, Wp[t.getType()])(Bp(t, !0, e), e)
    }

    var Qp = document.implementation.createDocument("", "", null), $p = "http://www.w3.org/2001/XMLSchema-instance";

    function td(t, e) {
        return Qp.createElementNS(t, e)
    }

    function ed(t, e) {
        return function t(e, i, r) {
            if (e.nodeType == Node.CDATA_SECTION_NODE || e.nodeType == Node.TEXT_NODE) i ? r.push(String(e.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : r.push(e.nodeValue); else {
                var n;
                for (n = e.firstChild; n; n = n.nextSibling) t(n, i, r)
            }
            return r
        }(t, e, []).join("")
    }

    function id(t) {
        return t instanceof Document
    }

    function rd(t) {
        return t instanceof Node
    }

    function nd(t) {
        return (new DOMParser).parseFromString(t, "application/xml")
    }

    function od(r, n) {
        return function (t, e) {
            var i = r.call(void 0 !== n ? n : this, t, e);
            void 0 !== i && pr(e[e.length - 1], i)
        }
    }

    function sd(r, n) {
        return function (t, e) {
            var i = r.call(void 0 !== n ? n : this, t, e);
            void 0 !== i && e[e.length - 1].push(i)
        }
    }

    function ad(r, n) {
        return function (t, e) {
            var i = r.call(void 0 !== n ? n : this, t, e);
            void 0 !== i && (e[e.length - 1] = i)
        }
    }

    function hd(o, s, a) {
        return function (t, e) {
            var i = o.call(void 0 !== a ? a : this, t, e);
            if (void 0 !== i) {
                var r = e[e.length - 1], n = void 0 !== s ? s : t.localName;
                (n in r ? r[n] : r[n] = []).push(i)
            }
        }
    }

    function ld(r, n, o) {
        return function (t, e) {
            var i = r.call(void 0 !== o ? o : this, t, e);
            void 0 !== i && (e[e.length - 1][void 0 !== n ? n : t.localName] = i)
        }
    }

    function ud(r, n) {
        return function (t, e, i) {
            r.call(void 0 !== n ? n : this, t, e, i), i[i.length - 1].node.appendChild(t)
        }
    }

    function cd(n, t) {
        var o, s;
        return function (t, e, i) {
            if (void 0 === o) {
                o = {};
                var r = {};
                r[t.localName] = n, o[t.namespaceURI] = r, s = pd(t.localName)
            }
            vd(o, s, e, i)
        }
    }

    function pd(t, o) {
        var s = t;
        return function (t, e, i) {
            var r = e[e.length - 1].node, n = s;
            return void 0 === n && (n = i), td(void 0 !== o ? o : r.namespaceURI, n)
        }
    }

    var dd = pd();

    function fd(t, e) {
        for (var i = e.length, r = new Array(i), n = 0; n < i; ++n) r[n] = t[e[n]];
        return r
    }

    function _d(t, e, i) {
        var r, n, o = void 0 !== i ? i : {};
        for (r = 0, n = t.length; r < n; ++r) o[t[r]] = e;
        return o
    }

    function gd(t, e, i, r) {
        var n;
        for (n = e.firstElementChild; n; n = n.nextElementSibling) {
            var o = t[n.namespaceURI];
            if (void 0 !== o) {
                var s = o[n.localName];
                void 0 !== s && s.call(r, n, i)
            }
        }
    }

    function yd(t, e, i, r, n) {
        return r.push(t), gd(e, i, r, n), r.pop()
    }

    function vd(t, e, i, r, n, o) {
        for (var s, a, h = (void 0 !== n ? n : i).length, l = 0; l < h; ++l) void 0 !== (s = i[l]) && void 0 !== (a = e.call(void 0 !== o ? o : this, s, r, void 0 !== n ? n[l] : void 0)) && t[a.namespaceURI][a.localName].call(o, a, s, r)
    }

    function md(t, e, i, r, n, o, s) {
        return n.push(t), vd(e, i, r, n, o, s), n.pop()
    }

    var xd = function (t) {
        function e() {
            t.call(this), this.xmlSerializer_ = new XMLSerializer
        }

        return t && (e.__proto__ = t), ((e.prototype = Object.create(t && t.prototype)).constructor = e).prototype.getType = function () {
            return ch.XML
        }, e.prototype.readFeature = function (t, e) {
            if (id(t)) return this.readFeatureFromDocument(t, e);
            if (rd(t)) return this.readFeatureFromNode(t, e);
            if ("string" == typeof t) {
                var i = nd(t);
                return this.readFeatureFromDocument(i, e)
            }
            return null
        }, e.prototype.readFeatureFromDocument = function (t, e) {
            var i = this.readFeaturesFromDocument(t, e);
            return 0 < i.length ? i[0] : null
        }, e.prototype.readFeatureFromNode = function (t, e) {
            return null
        }, e.prototype.readFeatures = function (t, e) {
            if (id(t)) return this.readFeaturesFromDocument(t, e);
            if (rd(t)) return this.readFeaturesFromNode(t, e);
            if ("string" == typeof t) {
                var i = nd(t);
                return this.readFeaturesFromDocument(i, e)
            }
            return []
        }, e.prototype.readFeaturesFromDocument = function (t, e) {
            for (var i = [], r = t.firstChild; r; r = r.nextSibling) r.nodeType == Node.ELEMENT_NODE && pr(i, this.readFeaturesFromNode(r, e));
            return i
        }, e.prototype.readFeaturesFromNode = function (t, e) {
        }, e.prototype.readGeometry = function (t, e) {
            if (id(t)) return this.readGeometryFromDocument(t, e);
            if (rd(t)) return this.readGeometryFromNode(t, e);
            if ("string" == typeof t) {
                var i = nd(t);
                return this.readGeometryFromDocument(i, e)
            }
            return null
        }, e.prototype.readGeometryFromDocument = function (t, e) {
            return null
        }, e.prototype.readGeometryFromNode = function (t, e) {
            return null
        }, e.prototype.readProjection = function (t) {
            if (id(t)) return this.readProjectionFromDocument(t);
            if (rd(t)) return this.readProjectionFromNode(t);
            if ("string" == typeof t) {
                var e = nd(t);
                return this.readProjectionFromDocument(e)
            }
            return null
        }, e.prototype.readProjectionFromDocument = function (t) {
            return this.dataProjection
        }, e.prototype.readProjectionFromNode = function (t) {
            return this.dataProjection
        }, e.prototype.writeFeature = function (t, e) {
            var i = this.writeFeatureNode(t, e);
            return this.xmlSerializer_.serializeToString(i)
        }, e.prototype.writeFeatureNode = function (t, e) {
            return null
        }, e.prototype.writeFeatures = function (t, e) {
            var i = this.writeFeaturesNode(t, e);
            return this.xmlSerializer_.serializeToString(i)
        }, e.prototype.writeFeaturesNode = function (t, e) {
            return null
        }, e.prototype.writeGeometry = function (t, e) {
            var i = this.writeGeometryNode(t, e);
            return this.xmlSerializer_.serializeToString(i)
        }, e.prototype.writeGeometryNode = function (t, e) {
            return null
        }, e
    }(Yp), Sd = "http://www.opengis.net/gml", Ed = /^[\s\xa0]*$/, Cd = function (i) {
        function t(t) {
            i.call(this);
            var e = t || {};
            this.featureType = e.featureType, this.featureNS = e.featureNS, this.srsName = e.srsName, this.schemaLocation = "", this.FEATURE_COLLECTION_PARSERS = {}, this.FEATURE_COLLECTION_PARSERS[Sd] = {
                featureMember: ad(this.readFeaturesInternal),
                featureMembers: ad(this.readFeaturesInternal)
            }
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.readFeaturesInternal = function (t, e) {
            var i = t.localName, r = null;
            if ("FeatureCollection" == i) r = "http://www.opengis.net/wfs" === t.namespaceURI ? yd([], this.FEATURE_COLLECTION_PARSERS, t, e, this) : yd(null, this.FEATURE_COLLECTION_PARSERS, t, e, this); else if ("featureMembers" == i || "featureMember" == i) {
                var n = e[0], o = n.featureType, s = n.featureNS;
                if (!o && t.childNodes) {
                    o = [], s = {};
                    for (var a = 0, h = t.childNodes.length; a < h; ++a) {
                        var l = t.childNodes[a];
                        if (1 === l.nodeType) {
                            var u = l.nodeName.split(":").pop();
                            if (-1 === o.indexOf(u)) {
                                var c = "", p = 0, d = l.namespaceURI;
                                for (var f in s) {
                                    if (s[f] === d) {
                                        c = f;
                                        break
                                    }
                                    ++p
                                }
                                c || (s[c = "p" + p] = d), o.push(c + ":" + u)
                            }
                        }
                    }
                    "featureMember" != i && (n.featureType = o, n.featureNS = s)
                }
                if ("string" == typeof s) {
                    var _ = s;
                    (s = {}).p0 = _
                }
                var g = {}, y = Array.isArray(o) ? o : [o];
                for (var v in s) {
                    for (var m = {}, x = 0, S = y.length; x < S; ++x) {
                        (-1 === y[x].indexOf(":") ? "p0" : y[x].split(":")[0]) === v && (m[y[x].split(":").pop()] = "featureMembers" == i ? sd(this.readFeatureElement, this) : ad(this.readFeatureElement, this))
                    }
                    g[s[v]] = m
                }
                r = yd("featureMember" == i ? void 0 : [], g, t, e)
            }
            return null === r && (r = []), r
        }, t.prototype.readGeometryElement = function (t, e) {
            var i = e[0];
            i.srsName = t.firstElementChild.getAttribute("srsName"), i.srsDimension = t.firstElementChild.getAttribute("srsDimension");
            var r = yd(null, this.GEOMETRY_PARSERS_, t, e, this);
            return r ? Bp(r, !1, i) : void 0
        }, t.prototype.readFeatureElement = function (t, e) {
            var i, r, n, o, s = t.getAttribute("fid") || (r = Sd, n = "id", t.getAttributeNS(r, n) || ""), a = {};
            for (i = t.firstElementChild; i; i = i.nextElementSibling) {
                var h = i.localName;
                if (0 === i.childNodes.length || 1 === i.childNodes.length && (3 === i.firstChild.nodeType || 4 === i.firstChild.nodeType)) {
                    var l = ed(i, !1);
                    Ed.test(l) && (l = void 0), a[h] = l
                } else "boundedBy" !== h && (o = h), a[h] = this.readGeometryElement(i, e)
            }
            var u = new Ji(a);
            return o && u.setGeometryName(o), s && u.setId(s), u
        }, t.prototype.readPoint = function (t, e) {
            var i = this.readFlatCoordinatesFromNode_(t, e);
            if (i) return new Dr(i, yr.XYZ)
        }, t.prototype.readMultiPoint = function (t, e) {
            var i = yd([], this.MULTIPOINT_PARSERS_, t, e, this);
            return i ? new rh(i) : void 0
        }, t.prototype.readMultiLineString = function (t, e) {
            var i = yd([], this.MULTILINESTRING_PARSERS_, t, e, this);
            if (i) return new ih(i)
        }, t.prototype.readMultiPolygon = function (t, e) {
            var i = yd([], this.MULTIPOLYGON_PARSERS_, t, e, this);
            if (i) return new oh(i)
        }, t.prototype.pointMemberParser_ = function (t, e) {
            gd(this.POINTMEMBER_PARSERS_, t, e, this)
        }, t.prototype.lineStringMemberParser_ = function (t, e) {
            gd(this.LINESTRINGMEMBER_PARSERS_, t, e, this)
        }, t.prototype.polygonMemberParser_ = function (t, e) {
            gd(this.POLYGONMEMBER_PARSERS_, t, e, this)
        }, t.prototype.readLineString = function (t, e) {
            var i = this.readFlatCoordinatesFromNode_(t, e);
            return i ? new Sn(i, yr.XYZ) : void 0
        }, t.prototype.readFlatLinearRing_ = function (t, e) {
            var i = yd(null, this.GEOMETRY_FLAT_COORDINATES_PARSERS_, t, e, this);
            return i || void 0
        }, t.prototype.readLinearRing = function (t, e) {
            var i = this.readFlatCoordinatesFromNode_(t, e);
            if (i) return new kr(i, yr.XYZ)
        }, t.prototype.readPolygon = function (t, e) {
            var i = yd([null], this.FLAT_LINEAR_RINGS_PARSERS_, t, e, this);
            if (i && i[0]) {
                var r, n, o = i[0], s = [o.length];
                for (r = 1, n = i.length; r < n; ++r) pr(o, i[r]), s.push(o.length);
                return new Qr(o, yr.XYZ, s)
            }
        }, t.prototype.readFlatCoordinatesFromNode_ = function (t, e) {
            return yd(null, this.GEOMETRY_FLAT_COORDINATES_PARSERS_, t, e, this)
        }, t.prototype.readGeometryFromNode = function (t, e) {
            var i = this.readGeometryElement(t, [this.getReadOptions(t, e || {})]);
            return i || null
        }, t.prototype.readFeaturesFromNode = function (t, e) {
            var i = {featureType: this.featureType, featureNS: this.featureNS};
            return e && E(i, this.getReadOptions(t, e)), this.readFeaturesInternal(t, [i]) || []
        }, t.prototype.readProjectionFromNode = function (t) {
            return ne(this.srsName ? this.srsName : t.firstElementChild.getAttribute("srsName"))
        }, t
    }(xd);

    function Td(t) {
        return wd(ed(t, !1))
    }

    function wd(t) {
        var e = /^\s*(true|1)|(false|0)\s*$/.exec(t);
        return e ? void 0 !== e[1] || !1 : void 0
    }

    function Rd(t) {
        var e = ed(t, !1), i = Date.parse(e);
        return isNaN(i) ? void 0 : i / 1e3
    }

    function Id(t) {
        return Ld(ed(t, !1))
    }

    function Ld(t) {
        var e = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(t);
        return e ? parseFloat(e[1]) : void 0
    }

    function bd(t) {
        return Fd(ed(t, !1))
    }

    function Fd(t) {
        var e = /^\s*(\d+)\s*$/.exec(t);
        return e ? parseInt(e[1], 10) : void 0
    }

    function Pd(t) {
        return ed(t, !1).trim()
    }

    function Md(t, e) {
        Ad(t, e ? "1" : "0")
    }

    function Od(t, e) {
        var i = e.toPrecision();
        t.appendChild(Qp.createTextNode(i))
    }

    function Nd(t, e) {
        var i = e.toString();
        t.appendChild(Qp.createTextNode(i))
    }

    function Ad(t, e) {
        t.appendChild(Qp.createTextNode(e))
    }

    Cd.prototype.MULTIPOINT_PARSERS_ = {
        "http://www.opengis.net/gml": {
            pointMember: sd(Cd.prototype.pointMemberParser_),
            pointMembers: sd(Cd.prototype.pointMemberParser_)
        }
    }, Cd.prototype.MULTILINESTRING_PARSERS_ = {
        "http://www.opengis.net/gml": {
            lineStringMember: sd(Cd.prototype.lineStringMemberParser_),
            lineStringMembers: sd(Cd.prototype.lineStringMemberParser_)
        }
    }, Cd.prototype.MULTIPOLYGON_PARSERS_ = {
        "http://www.opengis.net/gml": {
            polygonMember: sd(Cd.prototype.polygonMemberParser_),
            polygonMembers: sd(Cd.prototype.polygonMemberParser_)
        }
    }, Cd.prototype.POINTMEMBER_PARSERS_ = {"http://www.opengis.net/gml": {Point: sd(Cd.prototype.readFlatCoordinatesFromNode_)}}, Cd.prototype.LINESTRINGMEMBER_PARSERS_ = {"http://www.opengis.net/gml": {LineString: sd(Cd.prototype.readLineString)}}, Cd.prototype.POLYGONMEMBER_PARSERS_ = {"http://www.opengis.net/gml": {Polygon: sd(Cd.prototype.readPolygon)}}, Cd.prototype.RING_PARSERS = {"http://www.opengis.net/gml": {LinearRing: ad(Cd.prototype.readFlatLinearRing_)}};
    var Gd = Sd + " http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd", kd = {
        MultiLineString: "lineStringMember",
        MultiCurve: "curveMember",
        MultiPolygon: "polygonMember",
        MultiSurface: "surfaceMember"
    }, Dd = function (i) {
        function t(t) {
            var e = t || {};
            i.call(this, e), this.surface_ = void 0 !== e.surface && e.surface, this.curve_ = void 0 !== e.curve && e.curve, this.multiCurve_ = void 0 === e.multiCurve || e.multiCurve, this.multiSurface_ = void 0 === e.multiSurface || e.multiSurface, this.schemaLocation = e.schemaLocation ? e.schemaLocation : Gd, this.hasZ = void 0 !== e.hasZ && e.hasZ
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.readMultiCurve_ = function (t, e) {
            var i = yd([], this.MULTICURVE_PARSERS_, t, e, this);
            return i ? new ih(i) : void 0
        }, t.prototype.readMultiSurface_ = function (t, e) {
            var i = yd([], this.MULTISURFACE_PARSERS_, t, e, this);
            if (i) return new oh(i)
        }, t.prototype.curveMemberParser_ = function (t, e) {
            gd(this.CURVEMEMBER_PARSERS_, t, e, this)
        }, t.prototype.surfaceMemberParser_ = function (t, e) {
            gd(this.SURFACEMEMBER_PARSERS_, t, e, this)
        }, t.prototype.readPatch_ = function (t, e) {
            return yd([null], this.PATCHES_PARSERS_, t, e, this)
        }, t.prototype.readSegment_ = function (t, e) {
            return yd([null], this.SEGMENTS_PARSERS_, t, e, this)
        }, t.prototype.readPolygonPatch_ = function (t, e) {
            return yd([null], this.FLAT_LINEAR_RINGS_PARSERS_, t, e, this)
        }, t.prototype.readLineStringSegment_ = function (t, e) {
            return yd([null], this.GEOMETRY_FLAT_COORDINATES_PARSERS_, t, e, this)
        }, t.prototype.interiorParser_ = function (t, e) {
            var i = yd(void 0, this.RING_PARSERS, t, e, this);
            i && e[e.length - 1].push(i)
        }, t.prototype.exteriorParser_ = function (t, e) {
            var i = yd(void 0, this.RING_PARSERS, t, e, this);
            i && (e[e.length - 1][0] = i)
        }, t.prototype.readSurface_ = function (t, e) {
            var i = yd([null], this.SURFACE_PARSERS_, t, e, this);
            if (i && i[0]) {
                var r, n, o = i[0], s = [o.length];
                for (r = 1, n = i.length; r < n; ++r) pr(o, i[r]), s.push(o.length);
                return new Qr(o, yr.XYZ, s)
            }
        }, t.prototype.readCurve_ = function (t, e) {
            var i = yd([null], this.CURVE_PARSERS_, t, e, this);
            return i ? new Sn(i, yr.XYZ) : void 0
        }, t.prototype.readEnvelope_ = function (t, e) {
            var i = yd([null], this.ENVELOPE_PARSERS_, t, e, this);
            return X(i[1][0], i[1][1], i[2][0], i[2][1])
        }, t.prototype.readFlatPos_ = function (t, e) {
            for (var i, r = ed(t, !1), n = /^\s*([+\-]?\d*\.?\d+(?:[eE][+\-]?\d+)?)\s*/, o = []; i = n.exec(r);) o.push(parseFloat(i[1])), r = r.substr(i[0].length);
            if ("" === r) {
                var s, a, h = e[0].srsName, l = "enu";
                if (h) l = ne(h).getAxisOrientation();
                if ("neu" === l) for (s = 0, a = o.length; s < a; s += 3) {
                    var u = o[s], c = o[s + 1];
                    o[s] = c, o[s + 1] = u
                }
                var p = o.length;
                if (2 == p && o.push(0), 0 !== p) return o
            }
        }, t.prototype.readFlatPosList_ = function (t, e) {
            var i = ed(t, !1).replace(/^\s*|\s*$/g, ""), r = e[0], n = r.srsName, o = r.srsDimension, s = "enu";
            n && (s = ne(n).getAxisOrientation());
            var a, h, l, u = i.split(/\s+/), c = 2;
            t.getAttribute("srsDimension") ? c = Fd(t.getAttribute("srsDimension")) : t.getAttribute("dimension") ? c = Fd(t.getAttribute("dimension")) : t.parentNode.getAttribute("srsDimension") ? c = Fd(t.parentNode.getAttribute("srsDimension")) : o && (c = Fd(o));
            for (var p = [], d = 0, f = u.length; d < f; d += c) a = parseFloat(u[d]), h = parseFloat(u[d + 1]), l = 3 === c ? parseFloat(u[d + 2]) : 0, "en" === s.substr(0, 2) ? p.push(a, h, l) : p.push(h, a, l);
            return p
        }, t.prototype.writePos_ = function (t, e, i) {
            var r = i[i.length - 1], n = r.hasZ, o = n ? 3 : 2;
            t.setAttribute("srsDimension", o);
            var s = r.srsName, a = "enu";
            s && (a = ne(s).getAxisOrientation());
            var h, l = e.getCoordinates();
            (h = "en" === a.substr(0, 2) ? l[0] + " " + l[1] : l[1] + " " + l[0], n) && (h += " " + (l[2] || 0));
            Ad(t, h)
        }, t.prototype.getCoords_ = function (t, e, i) {
            var r = "enu";
            e && (r = ne(e).getAxisOrientation());
            var n = "en" === r.substr(0, 2) ? t[0] + " " + t[1] : t[1] + " " + t[0];
            i && (n += " " + (t[2] || 0));
            return n
        }, t.prototype.writePosList_ = function (t, e, i) {
            var r = i[i.length - 1], n = r.hasZ, o = n ? 3 : 2;
            t.setAttribute("srsDimension", o);
            for (var s, a = r.srsName, h = e.getCoordinates(), l = h.length, u = new Array(l), c = 0; c < l; ++c) s = h[c], u[c] = this.getCoords_(s, a, n);
            Ad(t, u.join(" "))
        }, t.prototype.writePoint_ = function (t, e, i) {
            var r = i[i.length - 1].srsName;
            r && t.setAttribute("srsName", r);
            var n = td(t.namespaceURI, "pos");
            t.appendChild(n), this.writePos_(n, e, i)
        }, t.prototype.writeEnvelope = function (t, e, i) {
            var r = i[i.length - 1].srsName;
            r && t.setAttribute("srsName", r);
            var n = [e[0] + " " + e[1], e[2] + " " + e[3]];
            md({node: t}, this.ENVELOPE_SERIALIZERS_, dd, n, i, ["lowerCorner", "upperCorner"], this)
        }, t.prototype.writeLinearRing_ = function (t, e, i) {
            var r = i[i.length - 1].srsName;
            r && t.setAttribute("srsName", r);
            var n = td(t.namespaceURI, "posList");
            t.appendChild(n), this.writePosList_(n, e, i)
        }, t.prototype.RING_NODE_FACTORY_ = function (t, e, i) {
            var r = e[e.length - 1], n = r.node, o = r.exteriorWritten;
            return void 0 === o && (r.exteriorWritten = !0), td(n.namespaceURI, void 0 !== o ? "interior" : "exterior")
        }, t.prototype.writeSurfaceOrPolygon_ = function (t, e, i) {
            var r = i[i.length - 1], n = r.hasZ, o = r.srsName;
            if ("PolygonPatch" !== t.nodeName && o && t.setAttribute("srsName", o), "Polygon" === t.nodeName || "PolygonPatch" === t.nodeName) {
                var s = e.getLinearRings();
                md({node: t, hasZ: n, srsName: o}, this.RING_SERIALIZERS_, this.RING_NODE_FACTORY_, s, i, void 0, this)
            } else if ("Surface" === t.nodeName) {
                var a = td(t.namespaceURI, "patches");
                t.appendChild(a), this.writeSurfacePatches_(a, e, i)
            }
        }, t.prototype.writeCurveOrLineString_ = function (t, e, i) {
            var r = i[i.length - 1].srsName;
            if ("LineStringSegment" !== t.nodeName && r && t.setAttribute("srsName", r), "LineString" === t.nodeName || "LineStringSegment" === t.nodeName) {
                var n = td(t.namespaceURI, "posList");
                t.appendChild(n), this.writePosList_(n, e, i)
            } else if ("Curve" === t.nodeName) {
                var o = td(t.namespaceURI, "segments");
                t.appendChild(o), this.writeCurveSegments_(o, e, i)
            }
        }, t.prototype.writeMultiSurfaceOrPolygon_ = function (t, e, i) {
            var r = i[i.length - 1], n = r.hasZ, o = r.srsName, s = r.surface;
            o && t.setAttribute("srsName", o);
            var a = e.getPolygons();
            md({
                node: t,
                hasZ: n,
                srsName: o,
                surface: s
            }, this.SURFACEORPOLYGONMEMBER_SERIALIZERS_, this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_, a, i, void 0, this)
        }, t.prototype.writeMultiPoint_ = function (t, e, i) {
            var r = i[i.length - 1], n = r.srsName, o = r.hasZ;
            n && t.setAttribute("srsName", n);
            var s = e.getPoints();
            md({node: t, hasZ: o, srsName: n}, this.POINTMEMBER_SERIALIZERS_, pd("pointMember"), s, i, void 0, this)
        }, t.prototype.writeMultiCurveOrLineString_ = function (t, e, i) {
            var r = i[i.length - 1], n = r.hasZ, o = r.srsName, s = r.curve;
            o && t.setAttribute("srsName", o);
            var a = e.getLineStrings();
            md({
                node: t,
                hasZ: n,
                srsName: o,
                curve: s
            }, this.LINESTRINGORCURVEMEMBER_SERIALIZERS_, this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_, a, i, void 0, this)
        }, t.prototype.writeRing_ = function (t, e, i) {
            var r = td(t.namespaceURI, "LinearRing");
            t.appendChild(r), this.writeLinearRing_(r, e, i)
        }, t.prototype.writeSurfaceOrPolygonMember_ = function (t, e, i) {
            var r = this.GEOMETRY_NODE_FACTORY_(e, i);
            r && (t.appendChild(r), this.writeSurfaceOrPolygon_(r, e, i))
        }, t.prototype.writePointMember_ = function (t, e, i) {
            var r = td(t.namespaceURI, "Point");
            t.appendChild(r), this.writePoint_(r, e, i)
        }, t.prototype.writeLineStringOrCurveMember_ = function (t, e, i) {
            var r = this.GEOMETRY_NODE_FACTORY_(e, i);
            r && (t.appendChild(r), this.writeCurveOrLineString_(r, e, i))
        }, t.prototype.writeSurfacePatches_ = function (t, e, i) {
            var r = td(t.namespaceURI, "PolygonPatch");
            t.appendChild(r), this.writeSurfaceOrPolygon_(r, e, i)
        }, t.prototype.writeCurveSegments_ = function (t, e, i) {
            var r = td(t.namespaceURI, "LineStringSegment");
            t.appendChild(r), this.writeCurveOrLineString_(r, e, i)
        }, t.prototype.writeGeometryElement = function (t, e, i) {
            var r, n = i[i.length - 1], o = E({}, n);
            o.node = t, r = Array.isArray(e) ? n.dataProjection ? fe(e, n.featureProjection, n.dataProjection) : e : Bp(e, !0, n), md(o, this.GEOMETRY_SERIALIZERS_, this.GEOMETRY_NODE_FACTORY_, [r], i, void 0, this)
        }, t.prototype.writeFeatureElement = function (t, e, i) {
            var r = e.getId();
            r && t.setAttribute("fid", r);
            var n = i[i.length - 1], o = n.featureNS, s = e.getGeometryName();
            n.serializers || (n.serializers = {}, n.serializers[o] = {});
            var a = e.getProperties(), h = [], l = [];
            for (var u in a) {
                var c = a[u];
                null !== c && (h.push(u), l.push(c), u == s || c instanceof Ie ? u in n.serializers[o] || (n.serializers[o][u] = ud(this.writeGeometryElement, this)) : u in n.serializers[o] || (n.serializers[o][u] = ud(Ad)))
            }
            var p = E({}, n);
            p.node = t, md(p, n.serializers, pd(void 0, o), l, i, h)
        }, t.prototype.writeFeatureMembers_ = function (t, e, i) {
            var r = i[i.length - 1], n = r.featureType, o = r.featureNS, s = {};
            s[o] = {}, s[o][n] = ud(this.writeFeatureElement, this);
            var a = E({}, r);
            a.node = t, md(a, s, pd(n, o), e, i)
        }, t.prototype.MULTIGEOMETRY_MEMBER_NODE_FACTORY_ = function (t, e, i) {
            var r = e[e.length - 1].node;
            return td("http://www.opengis.net/gml", kd[r.nodeName])
        }, t.prototype.GEOMETRY_NODE_FACTORY_ = function (t, e, i) {
            var r, n = e[e.length - 1], o = n.multiSurface, s = n.surface, a = n.curve, h = n.multiCurve;
            return Array.isArray(t) ? r = "Envelope" : "MultiPolygon" === (r = t.getType()) && !0 === o ? r = "MultiSurface" : "Polygon" === r && !0 === s ? r = "Surface" : "LineString" === r && !0 === a ? r = "Curve" : "MultiLineString" === r && !0 === h && (r = "MultiCurve"), td("http://www.opengis.net/gml", r)
        }, t.prototype.writeGeometryNode = function (t, e) {
            e = this.adaptOptions(e);
            var i = td("http://www.opengis.net/gml", "geom"), r = {
                node: i,
                hasZ: this.hasZ,
                srsName: this.srsName,
                curve: this.curve_,
                surface: this.surface_,
                multiSurface: this.multiSurface_,
                multiCurve: this.multiCurve_
            };
            return e && E(r, e), this.writeGeometryElement(i, t, [r]), i
        }, t.prototype.writeFeaturesNode = function (t, e) {
            e = this.adaptOptions(e);
            var i = td("http://www.opengis.net/gml", "featureMembers");
            i.setAttributeNS($p, "xsi:schemaLocation", this.schemaLocation);
            var r = {
                srsName: this.srsName,
                hasZ: this.hasZ,
                curve: this.curve_,
                surface: this.surface_,
                multiSurface: this.multiSurface_,
                multiCurve: this.multiCurve_,
                featureNS: this.featureNS,
                featureType: this.featureType
            };
            return e && E(r, e), this.writeFeatureMembers_(i, t, [r]), i
        }, t
    }(Cd);
    Dd.prototype.GEOMETRY_FLAT_COORDINATES_PARSERS_ = {
        "http://www.opengis.net/gml": {
            pos: ad(Dd.prototype.readFlatPos_),
            posList: ad(Dd.prototype.readFlatPosList_)
        }
    }, Dd.prototype.FLAT_LINEAR_RINGS_PARSERS_ = {
        "http://www.opengis.net/gml": {
            interior: Dd.prototype.interiorParser_,
            exterior: Dd.prototype.exteriorParser_
        }
    }, Dd.prototype.GEOMETRY_PARSERS_ = {
        "http://www.opengis.net/gml": {
            Point: ad(Cd.prototype.readPoint),
            MultiPoint: ad(Cd.prototype.readMultiPoint),
            LineString: ad(Cd.prototype.readLineString),
            MultiLineString: ad(Cd.prototype.readMultiLineString),
            LinearRing: ad(Cd.prototype.readLinearRing),
            Polygon: ad(Cd.prototype.readPolygon),
            MultiPolygon: ad(Cd.prototype.readMultiPolygon),
            Surface: ad(Dd.prototype.readSurface_),
            MultiSurface: ad(Dd.prototype.readMultiSurface_),
            Curve: ad(Dd.prototype.readCurve_),
            MultiCurve: ad(Dd.prototype.readMultiCurve_),
            Envelope: ad(Dd.prototype.readEnvelope_)
        }
    }, Dd.prototype.MULTICURVE_PARSERS_ = {
        "http://www.opengis.net/gml": {
            curveMember: sd(Dd.prototype.curveMemberParser_),
            curveMembers: sd(Dd.prototype.curveMemberParser_)
        }
    }, Dd.prototype.MULTISURFACE_PARSERS_ = {
        "http://www.opengis.net/gml": {
            surfaceMember: sd(Dd.prototype.surfaceMemberParser_),
            surfaceMembers: sd(Dd.prototype.surfaceMemberParser_)
        }
    }, Dd.prototype.CURVEMEMBER_PARSERS_ = {
        "http://www.opengis.net/gml": {
            LineString: sd(Cd.prototype.readLineString),
            Curve: sd(Dd.prototype.readCurve_)
        }
    }, Dd.prototype.SURFACEMEMBER_PARSERS_ = {
        "http://www.opengis.net/gml": {
            Polygon: sd(Cd.prototype.readPolygon),
            Surface: sd(Dd.prototype.readSurface_)
        }
    }, Dd.prototype.SURFACE_PARSERS_ = {"http://www.opengis.net/gml": {patches: ad(Dd.prototype.readPatch_)}}, Dd.prototype.CURVE_PARSERS_ = {"http://www.opengis.net/gml": {segments: ad(Dd.prototype.readSegment_)}}, Dd.prototype.ENVELOPE_PARSERS_ = {
        "http://www.opengis.net/gml": {
            lowerCorner: sd(Dd.prototype.readFlatPosList_),
            upperCorner: sd(Dd.prototype.readFlatPosList_)
        }
    }, Dd.prototype.PATCHES_PARSERS_ = {"http://www.opengis.net/gml": {PolygonPatch: ad(Dd.prototype.readPolygonPatch_)}}, Dd.prototype.SEGMENTS_PARSERS_ = {"http://www.opengis.net/gml": {LineStringSegment: ad(Dd.prototype.readLineStringSegment_)}}, Dd.prototype.writeFeatures, Dd.prototype.RING_SERIALIZERS_ = {
        "http://www.opengis.net/gml": {
            exterior: ud(Dd.prototype.writeRing_),
            interior: ud(Dd.prototype.writeRing_)
        }
    }, Dd.prototype.ENVELOPE_SERIALIZERS_ = {
        "http://www.opengis.net/gml": {
            lowerCorner: ud(Ad),
            upperCorner: ud(Ad)
        }
    }, Dd.prototype.SURFACEORPOLYGONMEMBER_SERIALIZERS_ = {
        "http://www.opengis.net/gml": {
            surfaceMember: ud(Dd.prototype.writeSurfaceOrPolygonMember_),
            polygonMember: ud(Dd.prototype.writeSurfaceOrPolygonMember_)
        }
    }, Dd.prototype.POINTMEMBER_SERIALIZERS_ = {"http://www.opengis.net/gml": {pointMember: ud(Dd.prototype.writePointMember_)}}, Dd.prototype.LINESTRINGORCURVEMEMBER_SERIALIZERS_ = {
        "http://www.opengis.net/gml": {
            lineStringMember: ud(Dd.prototype.writeLineStringOrCurveMember_),
            curveMember: ud(Dd.prototype.writeLineStringOrCurveMember_)
        }
    }, Dd.prototype.GEOMETRY_SERIALIZERS_ = {
        "http://www.opengis.net/gml": {
            Curve: ud(Dd.prototype.writeCurveOrLineString_),
            MultiCurve: ud(Dd.prototype.writeMultiCurveOrLineString_),
            Point: ud(Dd.prototype.writePoint_),
            MultiPoint: ud(Dd.prototype.writeMultiPoint_),
            LineString: ud(Dd.prototype.writeCurveOrLineString_),
            MultiLineString: ud(Dd.prototype.writeMultiCurveOrLineString_),
            LinearRing: ud(Dd.prototype.writeLinearRing_),
            Polygon: ud(Dd.prototype.writeSurfaceOrPolygon_),
            MultiPolygon: ud(Dd.prototype.writeMultiSurfaceOrPolygon_),
            Surface: ud(Dd.prototype.writeSurfaceOrPolygon_),
            MultiSurface: ud(Dd.prototype.writeMultiSurfaceOrPolygon_),
            Envelope: ud(Dd.prototype.writeEnvelope)
        }
    };
    var jd = Dd;
    jd.prototype.writeFeatures, jd.prototype.writeFeaturesNode;
    var Ud = Sd + " http://schemas.opengis.net/gml/2.1.2/feature.xsd", Yd = {
        MultiLineString: "lineStringMember",
        MultiCurve: "curveMember",
        MultiPolygon: "polygonMember",
        MultiSurface: "surfaceMember"
    }, Bd = function (i) {
        function t(t) {
            var e = t || {};
            i.call(this, e), this.FEATURE_COLLECTION_PARSERS[Sd].featureMember = sd(this.readFeaturesInternal), this.schemaLocation = e.schemaLocation ? e.schemaLocation : Ud
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.readFlatCoordinates_ = function (t, e) {
            var i = ed(t, !1).replace(/^\s*|\s*$/g, ""), r = e[0].srsName, n = "enu";
            if (r) {
                var o = ne(r);
                o && (n = o.getAxisOrientation())
            }
            for (var s = i.trim().split(/\s+/), a = [], h = 0, l = s.length; h < l; h++) {
                var u = s[h].split(/,+/), c = parseFloat(u[0]), p = parseFloat(u[1]),
                    d = 3 === u.length ? parseFloat(u[2]) : 0;
                "en" === n.substr(0, 2) ? a.push(c, p, d) : a.push(p, c, d)
            }
            return a
        }, t.prototype.readBox_ = function (t, e) {
            var i = yd([null], this.BOX_PARSERS_, t, e, this);
            return X(i[1][0], i[1][1], i[1][3], i[1][4])
        }, t.prototype.innerBoundaryIsParser_ = function (t, e) {
            var i = yd(void 0, this.RING_PARSERS, t, e, this);
            i && e[e.length - 1].push(i)
        }, t.prototype.outerBoundaryIsParser_ = function (t, e) {
            var i = yd(void 0, this.RING_PARSERS, t, e, this);
            i && (e[e.length - 1][0] = i)
        }, t.prototype.GEOMETRY_NODE_FACTORY_ = function (t, e, i) {
            var r, n = e[e.length - 1], o = n.multiSurface, s = n.surface, a = n.multiCurve;
            return Array.isArray(t) ? r = "Envelope" : "MultiPolygon" === (r = t.getType()) && !0 === o ? r = "MultiSurface" : "Polygon" === r && !0 === s ? r = "Surface" : "MultiLineString" === r && !0 === a && (r = "MultiCurve"), td("http://www.opengis.net/gml", r)
        }, t.prototype.writeFeatureElement = function (t, e, i) {
            var r = e.getId();
            r && t.setAttribute("fid", r);
            var n = i[i.length - 1], o = n.featureNS, s = e.getGeometryName();
            n.serializers || (n.serializers = {}, n.serializers[o] = {});
            var a = e.getProperties(), h = [], l = [];
            for (var u in a) {
                var c = a[u];
                null !== c && (h.push(u), l.push(c), u == s || c instanceof Ie ? u in n.serializers[o] || (n.serializers[o][u] = ud(this.writeGeometryElement, this)) : u in n.serializers[o] || (n.serializers[o][u] = ud(Ad)))
            }
            var p = E({}, n);
            p.node = t, md(p, n.serializers, pd(void 0, o), l, i, h)
        }, t.prototype.writeCurveOrLineString_ = function (t, e, i) {
            var r = i[i.length - 1].srsName;
            if ("LineStringSegment" !== t.nodeName && r && t.setAttribute("srsName", r), "LineString" === t.nodeName || "LineStringSegment" === t.nodeName) {
                var n = this.createCoordinatesNode_(t.namespaceURI);
                t.appendChild(n), this.writeCoordinates_(n, e, i)
            } else if ("Curve" === t.nodeName) {
                var o = td(t.namespaceURI, "segments");
                t.appendChild(o), this.writeCurveSegments_(o, e, i)
            }
        }, t.prototype.writeLineStringOrCurveMember_ = function (t, e, i) {
            var r = this.GEOMETRY_NODE_FACTORY_(e, i);
            r && (t.appendChild(r), this.writeCurveOrLineString_(r, e, i))
        }, t.prototype.writeMultiCurveOrLineString_ = function (t, e, i) {
            var r = i[i.length - 1], n = r.hasZ, o = r.srsName, s = r.curve;
            o && t.setAttribute("srsName", o);
            var a = e.getLineStrings();
            md({
                node: t,
                hasZ: n,
                srsName: o,
                curve: s
            }, this.LINESTRINGORCURVEMEMBER_SERIALIZERS_, this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_, a, i, void 0, this)
        }, t.prototype.writeGeometryElement = function (t, e, i) {
            var r, n = i[i.length - 1], o = E({}, n);
            o.node = t, r = Array.isArray(e) ? n.dataProjection ? fe(e, n.featureProjection, n.dataProjection) : e : Bp(e, !0, n), md(o, this.GEOMETRY_SERIALIZERS_, this.GEOMETRY_NODE_FACTORY_, [r], i, void 0, this)
        }, t.prototype.createCoordinatesNode_ = function (t) {
            var e = td(t, "coordinates");
            return e.setAttribute("decimal", "."), e.setAttribute("cs", ","), e.setAttribute("ts", " "), e
        }, t.prototype.writeCoordinates_ = function (t, e, i) {
            for (var r = i[i.length - 1], n = r.hasZ, o = r.srsName, s = e.getCoordinates(), a = s.length, h = new Array(a), l = 0; l < a; ++l) {
                var u = s[l];
                h[l] = this.getCoords_(u, o, n)
            }
            Ad(t, h.join(" "))
        }, t.prototype.writeCurveSegments_ = function (t, e, i) {
            var r = td(t.namespaceURI, "LineStringSegment");
            t.appendChild(r), this.writeCurveOrLineString_(r, e, i)
        }, t.prototype.writeSurfaceOrPolygon_ = function (t, e, i) {
            var r = i[i.length - 1], n = r.hasZ, o = r.srsName;
            if ("PolygonPatch" !== t.nodeName && o && t.setAttribute("srsName", o), "Polygon" === t.nodeName || "PolygonPatch" === t.nodeName) {
                var s = e.getLinearRings();
                md({node: t, hasZ: n, srsName: o}, this.RING_SERIALIZERS_, this.RING_NODE_FACTORY_, s, i, void 0, this)
            } else if ("Surface" === t.nodeName) {
                var a = td(t.namespaceURI, "patches");
                t.appendChild(a), this.writeSurfacePatches_(a, e, i)
            }
        }, t.prototype.RING_NODE_FACTORY_ = function (t, e, i) {
            var r = e[e.length - 1], n = r.node, o = r.exteriorWritten;
            return void 0 === o && (r.exteriorWritten = !0), td(n.namespaceURI, void 0 !== o ? "innerBoundaryIs" : "outerBoundaryIs")
        }, t.prototype.writeSurfacePatches_ = function (t, e, i) {
            var r = td(t.namespaceURI, "PolygonPatch");
            t.appendChild(r), this.writeSurfaceOrPolygon_(r, e, i)
        }, t.prototype.writeRing_ = function (t, e, i) {
            var r = td(t.namespaceURI, "LinearRing");
            t.appendChild(r), this.writeLinearRing_(r, e, i)
        }, t.prototype.getCoords_ = function (t, e, i) {
            var r = "enu";
            e && (r = ne(e).getAxisOrientation());
            var n = "en" === r.substr(0, 2) ? t[0] + "," + t[1] : t[1] + "," + t[0];
            i && (n += "," + (t[2] || 0));
            return n
        }, t.prototype.writePoint_ = function (t, e, i) {
            var r = i[i.length - 1], n = r.hasZ, o = r.srsName;
            o && t.setAttribute("srsName", o);
            var s = this.createCoordinatesNode_(t.namespaceURI);
            t.appendChild(s);
            var a = e.getCoordinates();
            Ad(s, this.getCoords_(a, o, n))
        }, t.prototype.writeMultiPoint_ = function (t, e, i) {
            var r = i[i.length - 1], n = r.hasZ, o = r.srsName;
            o && t.setAttribute("srsName", o);
            var s = e.getPoints();
            md({node: t, hasZ: n, srsName: o}, this.POINTMEMBER_SERIALIZERS_, pd("pointMember"), s, i, void 0, this)
        }, t.prototype.writePointMember_ = function (t, e, i) {
            var r = td(t.namespaceURI, "Point");
            t.appendChild(r), this.writePoint_(r, e, i)
        }, t.prototype.writeLinearRing_ = function (t, e, i) {
            var r = i[i.length - 1].srsName;
            r && t.setAttribute("srsName", r);
            var n = this.createCoordinatesNode_(t.namespaceURI);
            t.appendChild(n), this.writeCoordinates_(n, e, i)
        }, t.prototype.writeMultiSurfaceOrPolygon_ = function (t, e, i) {
            var r = i[i.length - 1], n = r.hasZ, o = r.srsName, s = r.surface;
            o && t.setAttribute("srsName", o);
            var a = e.getPolygons();
            md({
                node: t,
                hasZ: n,
                srsName: o,
                surface: s
            }, this.SURFACEORPOLYGONMEMBER_SERIALIZERS_, this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_, a, i, void 0, this)
        }, t.prototype.writeSurfaceOrPolygonMember_ = function (t, e, i) {
            var r = this.GEOMETRY_NODE_FACTORY_(e, i);
            r && (t.appendChild(r), this.writeSurfaceOrPolygon_(r, e, i))
        }, t.prototype.writeEnvelope = function (t, e, i) {
            var r = i[i.length - 1].srsName;
            r && t.setAttribute("srsName", r);
            var n = [e[0] + " " + e[1], e[2] + " " + e[3]];
            md({node: t}, this.ENVELOPE_SERIALIZERS_, dd, n, i, ["lowerCorner", "upperCorner"], this)
        }, t.prototype.MULTIGEOMETRY_MEMBER_NODE_FACTORY_ = function (t, e, i) {
            var r = e[e.length - 1].node;
            return td("http://www.opengis.net/gml", Yd[r.nodeName])
        }, t
    }(Cd);
    Bd.prototype.GEOMETRY_FLAT_COORDINATES_PARSERS_ = {"http://www.opengis.net/gml": {coordinates: ad(Bd.prototype.readFlatCoordinates_)}}, Bd.prototype.FLAT_LINEAR_RINGS_PARSERS_ = {
        "http://www.opengis.net/gml": {
            innerBoundaryIs: Bd.prototype.innerBoundaryIsParser_,
            outerBoundaryIs: Bd.prototype.outerBoundaryIsParser_
        }
    }, Bd.prototype.BOX_PARSERS_ = {"http://www.opengis.net/gml": {coordinates: sd(Bd.prototype.readFlatCoordinates_)}}, Bd.prototype.GEOMETRY_PARSERS_ = {
        "http://www.opengis.net/gml": {
            Point: ad(Cd.prototype.readPoint),
            MultiPoint: ad(Cd.prototype.readMultiPoint),
            LineString: ad(Cd.prototype.readLineString),
            MultiLineString: ad(Cd.prototype.readMultiLineString),
            LinearRing: ad(Cd.prototype.readLinearRing),
            Polygon: ad(Cd.prototype.readPolygon),
            MultiPolygon: ad(Cd.prototype.readMultiPolygon),
            Box: ad(Bd.prototype.readBox_)
        }
    }, Bd.prototype.GEOMETRY_SERIALIZERS_ = {
        "http://www.opengis.net/gml": {
            Curve: ud(Bd.prototype.writeCurveOrLineString_),
            MultiCurve: ud(Bd.prototype.writeMultiCurveOrLineString_),
            Point: ud(Bd.prototype.writePoint_),
            MultiPoint: ud(Bd.prototype.writeMultiPoint_),
            LineString: ud(Bd.prototype.writeCurveOrLineString_),
            MultiLineString: ud(Bd.prototype.writeMultiCurveOrLineString_),
            LinearRing: ud(Bd.prototype.writeLinearRing_),
            Polygon: ud(Bd.prototype.writeSurfaceOrPolygon_),
            MultiPolygon: ud(Bd.prototype.writeMultiSurfaceOrPolygon_),
            Surface: ud(Bd.prototype.writeSurfaceOrPolygon_),
            MultiSurface: ud(Bd.prototype.writeMultiSurfaceOrPolygon_),
            Envelope: ud(Bd.prototype.writeEnvelope)
        }
    }, Bd.prototype.LINESTRINGORCURVEMEMBER_SERIALIZERS_ = {
        "http://www.opengis.net/gml": {
            lineStringMember: ud(Bd.prototype.writeLineStringOrCurveMember_),
            curveMember: ud(Bd.prototype.writeLineStringOrCurveMember_)
        }
    }, Bd.prototype.RING_SERIALIZERS_ = {
        "http://www.opengis.net/gml": {
            outerBoundaryIs: ud(Bd.prototype.writeRing_),
            innerBoundaryIs: ud(Bd.prototype.writeRing_)
        }
    }, Bd.prototype.POINTMEMBER_SERIALIZERS_ = {"http://www.opengis.net/gml": {pointMember: ud(Bd.prototype.writePointMember_)}}, Bd.prototype.SURFACEORPOLYGONMEMBER_SERIALIZERS_ = {
        "http://www.opengis.net/gml": {
            surfaceMember: ud(Bd.prototype.writeSurfaceOrPolygonMember_),
            polygonMember: ud(Bd.prototype.writeSurfaceOrPolygonMember_)
        }
    }, Bd.prototype.ENVELOPE_SERIALIZERS_ = {"http://www.opengis.net/gml": {lowerCorner: ud(Ad), upperCorner: ud(Ad)}};
    var Xd = [null, "http://www.topografix.com/GPX/1/0", "http://www.topografix.com/GPX/1/1"],
        zd = {rte: mf, trk: xf, wpt: Sf}, Vd = _d(Xd, {rte: sd(mf), trk: sd(xf), wpt: sd(Sf)}),
        Wd = _d(Xd, {text: ld(Pd, "linkText"), type: ld(Pd, "linkType")}), Kd = _d(Xd, {
            rte: ud(function (t, e, i) {
                var r = i[0], n = e.getProperties(), o = {node: t, properties: n}, s = e.getGeometry();
                s && (s = Bp(s, !0, r), o.geometryLayout = s.getLayout(), n.rtept = s.getCoordinates());
                var a = i[i.length - 1].node, h = nf[a.namespaceURI], l = fd(n, h);
                md(o, of, dd, l, i, h)
            }), trk: ud(function (t, e, i) {
                var r = i[0], n = e.getProperties(), o = {node: t, properties: n}, s = e.getGeometry();
                s && (s = Bp(s, !0, r), n.trkseg = s.getLineStrings());
                var a = i[i.length - 1].node, h = af[a.namespaceURI], l = fd(n, h);
                md(o, hf, dd, l, i, h)
            }), wpt: ud(function (t, e, i) {
                var r = i[0], n = i[i.length - 1];
                n.properties = e.getProperties();
                var o = e.getGeometry();
                o && (o = Bp(o, !0, r), n.geometryLayout = o.getLayout(), Cf(t, o.getCoordinates(), i))
            })
        }), Hd = function (i) {
            function t(t) {
                i.call(this);
                var e = t || {};
                this.dataProjection = ne("EPSG:4326"), this.readExtensions_ = e.readExtensions
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.handleReadExtensions_ = function (t) {
                t || (t = []);
                for (var e = 0, i = t.length; e < i; ++e) {
                    var r = t[e];
                    if (this.readExtensions_) {
                        var n = r.get("extensionsNode_") || null;
                        this.readExtensions_(r, n)
                    }
                    r.set("extensionsNode_", void 0)
                }
            }, t.prototype.readFeatureFromNode = function (t, e) {
                if (!lr(Xd, t.namespaceURI)) return null;
                var i = zd[t.localName];
                if (!i) return null;
                var r = i(t, [this.getReadOptions(t, e)]);
                return r ? (this.handleReadExtensions_([r]), r) : null
            }, t.prototype.readFeaturesFromNode = function (t, e) {
                if (!lr(Xd, t.namespaceURI)) return [];
                if ("gpx" == t.localName) {
                    var i = yd([], Vd, t, [this.getReadOptions(t, e)]);
                    return i ? (this.handleReadExtensions_(i), i) : []
                }
                return []
            }, t.prototype.writeFeaturesNode = function (t, e) {
                e = this.adaptOptions(e);
                var i = td("http://www.topografix.com/GPX/1/1", "gpx");
                return i.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xsi", $p), i.setAttributeNS($p, "xsi:schemaLocation", "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd"), i.setAttribute("version", "1.1"), i.setAttribute("creator", "OpenLayers"), md({node: i}, Kd, ff, t, [e]), i
            }, t
        }(xd), Zd = _d(Xd, {
            name: ld(Pd),
            cmt: ld(Pd),
            desc: ld(Pd),
            src: ld(Pd),
            link: yf,
            number: ld(bd),
            extensions: vf,
            type: ld(Pd),
            rtept: function (t, e) {
                var i = yd({}, qd, t, e);
                if (i) {
                    var r = e[e.length - 1], n = r.flatCoordinates, o = r.layoutOptions;
                    _f(n, o, t, i)
                }
            }
        }), qd = _d(Xd, {ele: ld(Id), time: ld(Rd)}), Jd = _d(Xd, {
            name: ld(Pd),
            cmt: ld(Pd),
            desc: ld(Pd),
            src: ld(Pd),
            link: yf,
            number: ld(bd),
            type: ld(Pd),
            extensions: vf,
            trkseg: function (t, e) {
                var i = e[e.length - 1];
                gd(Qd, t, e);
                var r = i.flatCoordinates;
                i.ends.push(r.length)
            }
        }), Qd = _d(Xd, {
            trkpt: function (t, e) {
                var i = yd({}, $d, t, e);
                if (i) {
                    var r = e[e.length - 1], n = r.flatCoordinates, o = r.layoutOptions;
                    _f(n, o, t, i)
                }
            }
        }), $d = _d(Xd, {ele: ld(Id), time: ld(Rd)}), tf = _d(Xd, {
            ele: ld(Id),
            time: ld(Rd),
            magvar: ld(Id),
            geoidheight: ld(Id),
            name: ld(Pd),
            cmt: ld(Pd),
            desc: ld(Pd),
            src: ld(Pd),
            link: yf,
            sym: ld(Pd),
            type: ld(Pd),
            fix: ld(Pd),
            sat: ld(bd),
            hdop: ld(Id),
            vdop: ld(Id),
            pdop: ld(Id),
            ageofdgpsdata: ld(Id),
            dgpsid: ld(bd),
            extensions: vf
        }), ef = ["text", "type"], rf = _d(Xd, {text: ud(Ad), type: ud(Ad)}),
        nf = _d(Xd, ["name", "cmt", "desc", "src", "link", "number", "type", "rtept"]), of = _d(Xd, {
            name: ud(Ad),
            cmt: ud(Ad),
            desc: ud(Ad),
            src: ud(Ad),
            link: ud(Ef),
            number: ud(Nd),
            type: ud(Ad),
            rtept: cd(ud(Cf))
        }), sf = _d(Xd, ["ele", "time"]), af = _d(Xd, ["name", "cmt", "desc", "src", "link", "number", "type", "trkseg"]),
        hf = _d(Xd, {
            name: ud(Ad),
            cmt: ud(Ad),
            desc: ud(Ad),
            src: ud(Ad),
            link: ud(Ef),
            number: ud(Nd),
            type: ud(Ad),
            trkseg: cd(ud(function (t, e, i) {
                md({node: t, geometryLayout: e.getLayout(), properties: {}}, uf, lf, e.getCoordinates(), i)
            }))
        }), lf = pd("trkpt"), uf = _d(Xd, {trkpt: ud(Cf)}),
        cf = _d(Xd, ["ele", "time", "magvar", "geoidheight", "name", "cmt", "desc", "src", "link", "sym", "type", "fix", "sat", "hdop", "vdop", "pdop", "ageofdgpsdata", "dgpsid"]),
        pf = _d(Xd, {
            ele: ud(Od),
            time: ud(function (t, e) {
                var i = new Date(1e3 * e),
                    r = i.getUTCFullYear() + "-" + on(i.getUTCMonth() + 1, 2) + "-" + on(i.getUTCDate(), 2) + "T" + on(i.getUTCHours(), 2) + ":" + on(i.getUTCMinutes(), 2) + ":" + on(i.getUTCSeconds(), 2) + "Z";
                t.appendChild(Qp.createTextNode(r))
            }),
            magvar: ud(Od),
            geoidheight: ud(Od),
            name: ud(Ad),
            cmt: ud(Ad),
            desc: ud(Ad),
            src: ud(Ad),
            link: ud(Ef),
            sym: ud(Ad),
            type: ud(Ad),
            fix: ud(Ad),
            sat: ud(Nd),
            hdop: ud(Od),
            vdop: ud(Od),
            pdop: ud(Od),
            ageofdgpsdata: ud(Od),
            dgpsid: ud(Nd)
        }), df = {Point: "wpt", LineString: "rte", MultiLineString: "trk"};

    function ff(t, e, i) {
        var r = t.getGeometry();
        if (r) {
            var n = df[r.getType()];
            if (n) return td(e[e.length - 1].node.namespaceURI, n)
        }
    }

    function _f(t, e, i, r) {
        return t.push(parseFloat(i.getAttribute("lon")), parseFloat(i.getAttribute("lat"))), "ele" in r ? (t.push(r.ele), delete r.ele, e.hasZ = !0) : t.push(0), "time" in r ? (t.push(r.time), delete r.time, e.hasM = !0) : t.push(0), t
    }

    function gf(t, e, i) {
        var r = yr.XY, n = 2;
        if (t.hasZ && t.hasM ? (r = yr.XYZM, n = 4) : t.hasZ ? (r = yr.XYZ, n = 3) : t.hasM && (r = yr.XYM, n = 3), 4 !== n) {
            for (var o = 0, s = e.length / 4; o < s; o++) e[o * n] = e[4 * o], e[o * n + 1] = e[4 * o + 1], t.hasZ && (e[o * n + 2] = e[4 * o + 2]), t.hasM && (e[o * n + 2] = e[4 * o + 3]);
            if (e.length = e.length / 4 * n, i) for (var a = 0, h = i.length; a < h; a++) i[a] = i[a] / 4 * n
        }
        return r
    }

    function yf(t, e) {
        var i = e[e.length - 1], r = t.getAttribute("href");
        null !== r && (i.link = r), gd(Wd, t, e)
    }

    function vf(t, e) {
        e[e.length - 1].extensionsNode_ = t
    }

    function mf(t, e) {
        var i = e[0], r = yd({flatCoordinates: [], layoutOptions: {}}, Zd, t, e);
        if (r) {
            var n = r.flatCoordinates;
            delete r.flatCoordinates;
            var o = r.layoutOptions;
            delete r.layoutOptions;
            var s = gf(o, n), a = new Sn(n, s);
            Bp(a, !1, i);
            var h = new Ji(a);
            return h.setProperties(r), h
        }
    }

    function xf(t, e) {
        var i = e[0], r = yd({flatCoordinates: [], ends: [], layoutOptions: {}}, Jd, t, e);
        if (r) {
            var n = r.flatCoordinates;
            delete r.flatCoordinates;
            var o = r.ends;
            delete r.ends;
            var s = r.layoutOptions;
            delete r.layoutOptions;
            var a = gf(s, n, o), h = new ih(n, a, o);
            Bp(h, !1, i);
            var l = new Ji(h);
            return l.setProperties(r), l
        }
    }

    function Sf(t, e) {
        var i = e[0], r = yd({}, tf, t, e);
        if (r) {
            var n = {}, o = _f([], n, t, r), s = gf(n, o), a = new Dr(o, s);
            Bp(a, !1, i);
            var h = new Ji(a);
            return h.setProperties(r), h
        }
    }

    function Ef(t, e, i) {
        t.setAttribute("href", e);
        var r = i[i.length - 1].properties, n = [r.linkText, r.linkType];
        md({node: t}, rf, dd, n, i, ef)
    }

    function Cf(t, e, i) {
        var r = i[i.length - 1], n = r.node.namespaceURI, o = r.properties;
        switch (t.setAttributeNS(null, "lat", e[1]), t.setAttributeNS(null, "lon", e[0]), r.geometryLayout) {
            case yr.XYZM:
                0 !== e[3] && (o.time = e[3]);
            case yr.XYZ:
                0 !== e[2] && (o.ele = e[2]);
                break;
            case yr.XYM:
                0 !== e[2] && (o.time = e[2])
        }
        var s = "rtept" == t.nodeName ? sf[n] : cf[n], a = fd(o, s);
        md({node: t, properties: o}, pf, dd, a, i, s)
    }

    var Tf = function (e) {
        function u(t) {
            e.call(this), this.geometries_ = t || null, this.listenGeometriesChange_()
        }

        return e && (u.__proto__ = e), ((u.prototype = Object.create(e && e.prototype)).constructor = u).prototype.unlistenGeometriesChange_ = function () {
            if (this.geometries_) for (var t = 0, e = this.geometries_.length; t < e; ++t) d(this.geometries_[t], w.CHANGE, this.changed, this)
        }, u.prototype.listenGeometriesChange_ = function () {
            if (this.geometries_) for (var t = 0, e = this.geometries_.length; t < e; ++t) C(this.geometries_[t], w.CHANGE, this.changed, this)
        }, u.prototype.clone = function () {
            var t = new u(null);
            return t.setGeometries(this.geometries_), t
        }, u.prototype.closestPointXY = function (t, e, i, r) {
            if (r < D(this.getExtent(), t, e)) return r;
            for (var n = this.geometries_, o = 0, s = n.length; o < s; ++o) r = n[o].closestPointXY(t, e, i, r);
            return r
        }, u.prototype.containsXY = function (t, e) {
            for (var i = this.geometries_, r = 0, n = i.length; r < n; ++r) if (i[r].containsXY(t, e)) return !0;
            return !1
        }, u.prototype.computeExtent = function (t) {
            z(t);
            for (var e = this.geometries_, i = 0, r = e.length; i < r; ++i) H(t, e[i].getExtent());
            return t
        }, u.prototype.getGeometries = function () {
            return wf(this.geometries_)
        }, u.prototype.getGeometriesArray = function () {
            return this.geometries_
        }, u.prototype.getSimplifiedGeometry = function (t) {
            if (this.simplifiedGeometryRevision != this.getRevision() && (_(this.simplifiedGeometryCache), this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = this.getRevision()), t < 0 || 0 !== this.simplifiedGeometryMaxMinSquaredTolerance && t < this.simplifiedGeometryMaxMinSquaredTolerance) return this;
            var e = t.toString();
            if (this.simplifiedGeometryCache.hasOwnProperty(e)) return this.simplifiedGeometryCache[e];
            for (var i = [], r = this.geometries_, n = !1, o = 0, s = r.length; o < s; ++o) {
                var a = r[o], h = a.getSimplifiedGeometry(t);
                i.push(h), h !== a && (n = !0)
            }
            if (n) {
                var l = new u(null);
                return l.setGeometriesArray(i), this.simplifiedGeometryCache[e] = l
            }
            return this.simplifiedGeometryMaxMinSquaredTolerance = t, this
        }, u.prototype.getType = function () {
            return Lt.GEOMETRY_COLLECTION
        }, u.prototype.intersectsExtent = function (t) {
            for (var e = this.geometries_, i = 0, r = e.length; i < r; ++i) if (e[i].intersectsExtent(t)) return !0;
            return !1
        }, u.prototype.isEmpty = function () {
            return 0 === this.geometries_.length
        }, u.prototype.rotate = function (t, e) {
            for (var i = this.geometries_, r = 0, n = i.length; r < n; ++r) i[r].rotate(t, e);
            this.changed()
        }, u.prototype.scale = function (t, e, i) {
            var r = i;
            r || (r = ot(this.getExtent()));
            for (var n = this.geometries_, o = 0, s = n.length; o < s; ++o) n[o].scale(t, e, r);
            this.changed()
        }, u.prototype.setGeometries = function (t) {
            this.setGeometriesArray(wf(t))
        }, u.prototype.setGeometriesArray = function (t) {
            this.unlistenGeometriesChange_(), this.geometries_ = t, this.listenGeometriesChange_(), this.changed()
        }, u.prototype.applyTransform = function (t) {
            for (var e = this.geometries_, i = 0, r = e.length; i < r; ++i) e[i].applyTransform(t);
            this.changed()
        }, u.prototype.translate = function (t, e) {
            for (var i = this.geometries_, r = 0, n = i.length; r < n; ++r) i[r].translate(t, e);
            this.changed()
        }, u.prototype.disposeInternal = function () {
            this.unlistenGeometriesChange_(), e.prototype.disposeInternal.call(this)
        }, u
    }(Ie);

    function wf(t) {
        for (var e = [], i = 0, r = t.length; i < r; ++i) e.push(t[i].clone());
        return e
    }

    var Rf = function (i) {
        function t(t) {
            var e = t || {};
            i.call(this), this.dataProjection = ne(e.dataProjection ? e.dataProjection : "EPSG:4326"), e.featureProjection && (this.defaultFeatureProjection = ne(e.featureProjection)), this.geometryName_ = e.geometryName, this.extractGeometryName_ = e.extractGeometryName
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.readFeatureFromObject = function (t, e) {
            var i = null, r = bf((i = "Feature" === t.type ? t : {type: "Feature", geometry: t}).geometry, e),
                n = new Ji;
            return this.geometryName_ ? n.setGeometryName(this.geometryName_) : this.extractGeometryName_ && void 0 !== i.geometry_name && n.setGeometryName(i.geometry_name), n.setGeometry(r), void 0 !== i.id && n.setId(i.id), i.properties && n.setProperties(i.properties), n
        }, t.prototype.readFeaturesFromObject = function (t, e) {
            var i = null;
            if ("FeatureCollection" === t.type) {
                i = [];
                for (var r = t.features, n = 0, o = r.length; n < o; ++n) i.push(this.readFeatureFromObject(r[n], e))
            } else i = [this.readFeatureFromObject(t, e)];
            return i
        }, t.prototype.readGeometryFromObject = function (t, e) {
            return bf(t, e)
        }, t.prototype.readProjectionFromObject = function (t) {
            var e, i = t.crs;
            return i ? "name" == i.type ? e = ne(i.properties.name) : Z(!1, 36) : e = this.dataProjection, e
        }, t.prototype.writeFeatureObject = function (t, e) {
            e = this.adaptOptions(e);
            var i = {type: "Feature"}, r = t.getId();
            void 0 !== r && (i.id = r);
            var n = t.getGeometry();
            i.geometry = n ? Ff(n, e) : null;
            var o = t.getProperties();
            return delete o[t.getGeometryName()], Tt(o) ? i.properties = null : i.properties = o, i
        }, t.prototype.writeFeaturesObject = function (t, e) {
            e = this.adaptOptions(e);
            for (var i = [], r = 0, n = t.length; r < n; ++r) i.push(this.writeFeatureObject(t[r], e));
            return {type: "FeatureCollection", features: i}
        }, t.prototype.writeGeometryObject = function (t, e) {
            return Ff(t, this.adaptOptions(e))
        }, t
    }(Xp), If = {
        Point: function (t) {
            return new Dr(t.coordinates)
        }, LineString: function (t) {
            return new Sn(t.coordinates)
        }, Polygon: function (t) {
            return new Qr(t.coordinates)
        }, MultiPoint: function (t) {
            return new rh(t.coordinates)
        }, MultiLineString: function (t) {
            return new ih(t.coordinates)
        }, MultiPolygon: function (t) {
            return new oh(t.coordinates)
        }, GeometryCollection: function (t, e) {
            var i = t.geometries.map(function (t) {
                return bf(t, e)
            });
            return new Tf(i)
        }
    }, Lf = {
        Point: function (t, e) {
            return {type: "Point", coordinates: t.getCoordinates()}
        }, LineString: function (t, e) {
            return {type: "LineString", coordinates: t.getCoordinates()}
        }, Polygon: function (t, e) {
            var i;
            e && (i = e.rightHanded);
            return {type: "Polygon", coordinates: t.getCoordinates(i)}
        }, MultiPoint: function (t, e) {
            return {type: "MultiPoint", coordinates: t.getCoordinates()}
        }, MultiLineString: function (t, e) {
            return {type: "MultiLineString", coordinates: t.getCoordinates()}
        }, MultiPolygon: function (t, e) {
            var i;
            e && (i = e.rightHanded);
            return {type: "MultiPolygon", coordinates: t.getCoordinates(i)}
        }, GeometryCollection: function (t, i) {
            return {
                type: "GeometryCollection", geometries: t.getGeometriesArray().map(function (t) {
                    var e = E({}, i);
                    return delete e.featureProjection, Ff(t, e)
                })
            }
        }, Circle: function (t) {
            return {type: "GeometryCollection", geometries: []}
        }
    };

    function bf(t, e) {
        return t ? Bp((0, If[t.type])(t), !1, e) : null
    }

    function Ff(t, e) {
        return (0, Lf[t.getType()])(Bp(t, !0, e), e)
    }

    var Pf = function (t) {
        function e() {
            t.call(this)
        }

        return t && (e.__proto__ = t), ((e.prototype = Object.create(t && t.prototype)).constructor = e).prototype.getType = function () {
            return ch.TEXT
        }, e.prototype.readFeature = function (t, e) {
            return this.readFeatureFromText(Mf(t), this.adaptOptions(e))
        }, e.prototype.readFeatureFromText = function (t, e) {
        }, e.prototype.readFeatures = function (t, e) {
            return this.readFeaturesFromText(Mf(t), this.adaptOptions(e))
        }, e.prototype.readFeaturesFromText = function (t, e) {
        }, e.prototype.readGeometry = function (t, e) {
            return this.readGeometryFromText(Mf(t), this.adaptOptions(e))
        }, e.prototype.readGeometryFromText = function (t, e) {
        }, e.prototype.readProjection = function (t) {
            return this.readProjectionFromText(Mf(t))
        }, e.prototype.readProjectionFromText = function (t) {
            return this.dataProjection
        }, e.prototype.writeFeature = function (t, e) {
            return this.writeFeatureText(t, this.adaptOptions(e))
        }, e.prototype.writeFeatureText = function (t, e) {
        }, e.prototype.writeFeatures = function (t, e) {
            return this.writeFeaturesText(t, this.adaptOptions(e))
        }, e.prototype.writeFeaturesText = function (t, e) {
        }, e.prototype.writeGeometry = function (t, e) {
            return this.writeGeometryText(t, this.adaptOptions(e))
        }, e.prototype.writeGeometryText = function (t, e) {
        }, e
    }(Yp);

    function Mf(t) {
        return "string" == typeof t ? t : ""
    }

    var Of = "barometric", Nf = "gps", Af = "none",
        Gf = /^B(\d{2})(\d{2})(\d{2})(\d{2})(\d{5})([NS])(\d{3})(\d{5})([EW])([AV])(\d{5})(\d{5})/,
        kf = /^H.([A-Z]{3}).*?:(.*)/, Df = /^HFDTE(\d{2})(\d{2})(\d{2})/, jf = /\r\n|\r|\n/, Uf = function (i) {
            function t(t) {
                i.call(this);
                var e = t || {};
                this.dataProjection = ne("EPSG:4326"), this.altitudeMode_ = e.altitudeMode ? e.altitudeMode : Af
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.readFeatureFromText = function (t, e) {
                var i, r, n = this.altitudeMode_, o = t.split(jf), s = {}, a = [], h = 2e3, l = 0, u = 1, c = -1;
                for (i = 0, r = o.length; i < r; ++i) {
                    var p = o[i], d = void 0;
                    if ("B" == p.charAt(0)) {
                        if (d = Gf.exec(p)) {
                            var f = parseInt(d[1], 10), _ = parseInt(d[2], 10), g = parseInt(d[3], 10),
                                y = parseInt(d[4], 10) + parseInt(d[5], 10) / 6e4;
                            "S" == d[6] && (y = -y);
                            var v = parseInt(d[7], 10) + parseInt(d[8], 10) / 6e4;
                            if ("W" == d[9] && (v = -v), a.push(v, y), n != Af) {
                                var m = void 0;
                                m = n == Nf ? parseInt(d[11], 10) : n == Of ? parseInt(d[12], 10) : 0, a.push(m)
                            }
                            var x = Date.UTC(h, l, u, f, _, g);
                            x < c && (x = Date.UTC(h, l, u + 1, f, _, g)), a.push(x / 1e3), c = x
                        }
                    } else "H" == p.charAt(0) && ((d = Df.exec(p)) ? (u = parseInt(d[1], 10), l = parseInt(d[2], 10) - 1, h = 2e3 + parseInt(d[3], 10)) : (d = kf.exec(p)) && (s[d[1]] = d[2].trim()))
                }
                if (0 === a.length) return null;
                var S = n == Af ? yr.XYM : yr.XYZM, E = new Sn(a, S), C = new Ji(Bp(E, !1, e));
                return C.setProperties(s), C
            }, t.prototype.readFeaturesFromText = function (t, e) {
                var i = this.readFeatureFromText(t, e);
                return i ? [i] : []
            }, t
        }(Pf), Yf = {FRACTION: "fraction", PIXELS: "pixels"}, Bf = function (s) {
            function t(t, e, i, r, n, o) {
                s.call(this), this.hitDetectionImage_ = null, this.image_ = t || new Image, null !== r && (this.image_.crossOrigin = r), this.canvas_ = o ? document.createElement("canvas") : null, this.color_ = o, this.imageListenerKeys_ = null, this.imageState_ = n, this.size_ = i, this.src_ = e, this.tainting_ = !1, this.imageState_ == di.LOADED && this.determineTainting_()
            }

            return s && (t.__proto__ = s), ((t.prototype = Object.create(s && s.prototype)).constructor = t).prototype.determineTainting_ = function () {
                var t = De(1, 1);
                try {
                    t.drawImage(this.image_, 0, 0), t.getImageData(0, 0, 1, 1)
                } catch (t) {
                    this.tainting_ = !0
                }
            }, t.prototype.dispatchChangeEvent_ = function () {
                this.dispatchEvent(w.CHANGE)
            }, t.prototype.handleImageError_ = function () {
                this.imageState_ = di.ERROR, this.unlistenImage_(), this.dispatchChangeEvent_()
            }, t.prototype.handleImageLoad_ = function () {
                this.imageState_ = di.LOADED, this.size_ && (this.image_.width = this.size_[0], this.image_.height = this.size_[1]), this.size_ = [this.image_.width, this.image_.height], this.unlistenImage_(), this.determineTainting_(), this.replaceColor_(), this.dispatchChangeEvent_()
            }, t.prototype.getImage = function (t) {
                return this.canvas_ ? this.canvas_ : this.image_
            }, t.prototype.getImageState = function () {
                return this.imageState_
            }, t.prototype.getHitDetectionImage = function (t) {
                if (!this.hitDetectionImage_) if (this.tainting_) {
                    var e = this.size_[0], i = this.size_[1], r = De(e, i);
                    r.fillRect(0, 0, e, i), this.hitDetectionImage_ = r.canvas
                } else this.hitDetectionImage_ = this.image_;
                return this.hitDetectionImage_
            }, t.prototype.getSize = function () {
                return this.size_
            }, t.prototype.getSrc = function () {
                return this.src_
            }, t.prototype.load = function () {
                if (this.imageState_ == di.IDLE) {
                    this.imageState_ = di.LOADING, this.imageListenerKeys_ = [o(this.image_, w.ERROR, this.handleImageError_, this), o(this.image_, w.LOAD, this.handleImageLoad_, this)];
                    try {
                        this.image_.src = this.src_
                    } catch (t) {
                        this.handleImageError_()
                    }
                }
            }, t.prototype.replaceColor_ = function () {
                if (!this.tainting_ && null !== this.color_) {
                    this.canvas_.width = this.image_.width, this.canvas_.height = this.image_.height;
                    var t = this.canvas_.getContext("2d");
                    t.drawImage(this.image_, 0, 0);
                    for (var e = t.getImageData(0, 0, this.image_.width, this.image_.height), i = e.data, r = this.color_[0] / 255, n = this.color_[1] / 255, o = this.color_[2] / 255, s = 0, a = i.length; s < a; s += 4) i[s] *= r, i[s + 1] *= n, i[s + 2] *= o;
                    t.putImageData(e, 0, 0)
                }
            }, t.prototype.unlistenImage_ = function () {
                this.imageListenerKeys_.forEach(g), this.imageListenerKeys_ = null
            }, t
        }(i);
    var Xf, zf, Vf, Wf, Kf, Hf, Zf, qf, Jf,
        Qf = {BOTTOM_LEFT: "bottom-left", BOTTOM_RIGHT: "bottom-right", TOP_LEFT: "top-left", TOP_RIGHT: "top-right"},
        $f = function (y) {
            function t(t) {
                var e = t || {}, i = void 0 !== e.opacity ? e.opacity : 1, r = void 0 !== e.rotation ? e.rotation : 0,
                    n = void 0 !== e.scale ? e.scale : 1, o = void 0 !== e.rotateWithView && e.rotateWithView;
                y.call(this, {
                    opacity: i,
                    rotation: r,
                    scale: n,
                    rotateWithView: o
                }), this.anchor_ = void 0 !== e.anchor ? e.anchor : [.5, .5], this.normalizedAnchor_ = null, this.anchorOrigin_ = void 0 !== e.anchorOrigin ? e.anchorOrigin : Qf.TOP_LEFT, this.anchorXUnits_ = void 0 !== e.anchorXUnits ? e.anchorXUnits : Yf.FRACTION, this.anchorYUnits_ = void 0 !== e.anchorYUnits ? e.anchorYUnits : Yf.FRACTION, this.crossOrigin_ = void 0 !== e.crossOrigin ? e.crossOrigin : null;
                var s = void 0 !== e.img ? e.img : null, a = void 0 !== e.imgSize ? e.imgSize : null, h = e.src;
                Z(!(void 0 !== h && s), 4), Z(!s || s && a, 5), void 0 !== h && 0 !== h.length || !s || (h = s.src || Ct(s).toString()), Z(void 0 !== h && 0 < h.length, 6);
                var l, u, c, p, d, f, _, g = void 0 !== e.src ? di.IDLE : di.LOADED;
                this.color_ = void 0 !== e.color ? Ne(e.color) : null, this.iconImage_ = (l = s, u = h, c = a, p = this.crossOrigin_, d = g, f = this.color_, (_ = Gl.get(u, p, f)) || (_ = new Bf(l, u, c, p, d, f), Gl.set(u, p, f, _)), _), this.offset_ = void 0 !== e.offset ? e.offset : [0, 0], this.offsetOrigin_ = void 0 !== e.offsetOrigin ? e.offsetOrigin : Qf.TOP_LEFT, this.origin_ = null, this.size_ = void 0 !== e.size ? e.size : null
            }

            return y && (t.__proto__ = y), ((t.prototype = Object.create(y && y.prototype)).constructor = t).prototype.clone = function () {
                return new t({
                    anchor: this.anchor_.slice(),
                    anchorOrigin: this.anchorOrigin_,
                    anchorXUnits: this.anchorXUnits_,
                    anchorYUnits: this.anchorYUnits_,
                    crossOrigin: this.crossOrigin_,
                    color: this.color_ && this.color_.slice ? this.color_.slice() : this.color_ || void 0,
                    src: this.getSrc(),
                    offset: this.offset_.slice(),
                    offsetOrigin: this.offsetOrigin_,
                    size: null !== this.size_ ? this.size_.slice() : void 0,
                    opacity: this.getOpacity(),
                    scale: this.getScale(),
                    rotation: this.getRotation(),
                    rotateWithView: this.getRotateWithView()
                })
            }, t.prototype.getAnchor = function () {
                if (this.normalizedAnchor_) return this.normalizedAnchor_;
                var t = this.anchor_, e = this.getSize();
                if (this.anchorXUnits_ == Yf.FRACTION || this.anchorYUnits_ == Yf.FRACTION) {
                    if (!e) return null;
                    t = this.anchor_.slice(), this.anchorXUnits_ == Yf.FRACTION && (t[0] *= e[0]), this.anchorYUnits_ == Yf.FRACTION && (t[1] *= e[1])
                }
                if (this.anchorOrigin_ != Qf.TOP_LEFT) {
                    if (!e) return null;
                    t === this.anchor_ && (t = this.anchor_.slice()), this.anchorOrigin_ != Qf.TOP_RIGHT && this.anchorOrigin_ != Qf.BOTTOM_RIGHT || (t[0] = -t[0] + e[0]), this.anchorOrigin_ != Qf.BOTTOM_LEFT && this.anchorOrigin_ != Qf.BOTTOM_RIGHT || (t[1] = -t[1] + e[1])
                }
                return this.normalizedAnchor_ = t, this.normalizedAnchor_
            }, t.prototype.setAnchor = function (t) {
                this.anchor_ = t, this.normalizedAnchor_ = null
            }, t.prototype.getColor = function () {
                return this.color_
            }, t.prototype.getImage = function (t) {
                return this.iconImage_.getImage(t)
            }, t.prototype.getImageSize = function () {
                return this.iconImage_.getSize()
            }, t.prototype.getHitDetectionImageSize = function () {
                return this.getImageSize()
            }, t.prototype.getImageState = function () {
                return this.iconImage_.getImageState()
            }, t.prototype.getHitDetectionImage = function (t) {
                return this.iconImage_.getHitDetectionImage(t)
            }, t.prototype.getOrigin = function () {
                if (this.origin_) return this.origin_;
                var t = this.offset_;
                if (this.offsetOrigin_ != Qf.TOP_LEFT) {
                    var e = this.getSize(), i = this.iconImage_.getSize();
                    if (!e || !i) return null;
                    t = t.slice(), this.offsetOrigin_ != Qf.TOP_RIGHT && this.offsetOrigin_ != Qf.BOTTOM_RIGHT || (t[0] = i[0] - e[0] - t[0]), this.offsetOrigin_ != Qf.BOTTOM_LEFT && this.offsetOrigin_ != Qf.BOTTOM_RIGHT || (t[1] = i[1] - e[1] - t[1])
                }
                return this.origin_ = t, this.origin_
            }, t.prototype.getSrc = function () {
                return this.iconImage_.getSrc()
            }, t.prototype.getSize = function () {
                return this.size_ ? this.size_ : this.iconImage_.getSize()
            }, t.prototype.listenImageChange = function (t, e) {
                return C(this.iconImage_, w.CHANGE, t, e)
            }, t.prototype.load = function () {
                this.iconImage_.load()
            }, t.prototype.unlistenImageChange = function (t, e) {
                d(this.iconImage_, w.CHANGE, t, e)
            }, t
        }(Yi), t_ = ["http://www.google.com/kml/ext/2.2"],
        e_ = [null, "http://earth.google.com/kml/2.0", "http://earth.google.com/kml/2.1", "http://earth.google.com/kml/2.2", "http://www.opengis.net/kml/2.2"],
        i_ = {fraction: Yf.FRACTION, pixels: Yf.PIXELS, insetPixels: Yf.PIXELS}, r_ = _d(e_, {
            ExtendedData: H_,
            Region: Z_,
            MultiGeometry: ld(j_, "geometry"),
            LineString: ld(G_, "geometry"),
            LinearRing: ld(k_, "geometry"),
            Point: ld(U_, "geometry"),
            Polygon: ld(B_, "geometry"),
            Style: ld(z_),
            StyleMap: function (t, e) {
                var i = E_(t, e);
                if (!i) return;
                var r = e[e.length - 1];
                Array.isArray(i) ? r.Style = i : "string" == typeof i ? r.styleUrl = i : Z(!1, 38)
            },
            address: ld(Pd),
            description: ld(Pd),
            name: ld(Pd),
            open: ld(Td),
            phoneNumber: ld(Pd),
            styleUrl: ld(m_),
            visibility: ld(Td)
        }, _d(t_, {
            MultiTrack: ld(function (t, e) {
                var i = yd([], b_, t, e);
                if (!i) return;
                return new ih(i)
            }, "geometry"), Track: ld(P_, "geometry")
        })), n_ = _d(e_, {
            ExtendedData: H_, Region: Z_, Link: function (t, e) {
                gd(o_, t, e)
            }, address: ld(Pd), description: ld(Pd), name: ld(Pd), open: ld(Td), phoneNumber: ld(Pd), visibility: ld(Td)
        }), o_ = _d(e_, {href: ld(m_)}), s_ = _d(e_, {
            LatLonAltBox: function (t, e) {
                var i = yd({}, Q_, t, e);
                if (!i) return;
                var r = e[e.length - 1],
                    n = [parseFloat(i.west), parseFloat(i.south), parseFloat(i.east), parseFloat(i.north)];
                r.extent = n, r.altitudeMode = i.altitudeMode, r.minAltitude = parseFloat(i.minAltitude), r.maxAltitude = parseFloat(i.maxAltitude)
            }, Lod: function (t, e) {
                var i = yd({}, $_, t, e);
                if (!i) return;
                var r = e[e.length - 1];
                r.minLodPixels = parseFloat(i.minLodPixels), r.maxLodPixels = parseFloat(i.maxLodPixels), r.minFadeExtent = parseFloat(i.minFadeExtent), r.maxFadeExtent = parseFloat(i.maxFadeExtent)
            }
        }), a_ = _d(e_, ["Document", "Placemark"]), h_ = _d(e_, {
            Document: ud(function (t, e, i) {
                md({node: t}, ng, og, e, i, void 0, this)
            }), Placemark: ud(bg)
        }), l_ = null, u_ = null, c_ = null, p_ = null, d_ = null, f_ = null;
    var __ = function (i) {
        function t(t) {
            i.call(this);
            var e = t || {};
            f_ || (l_ = new zi({color: Xf = [255, 255, 255, 1]}), zf = [20, 2], Vf = Yf.PIXELS, Wf = Yf.PIXELS, Kf = [64, 64], Hf = "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png", Zf = .5, u_ = new $f({
                anchor: zf,
                anchorOrigin: Qf.BOTTOM_LEFT,
                anchorXUnits: Vf,
                anchorYUnits: Wf,
                crossOrigin: "anonymous",
                rotation: 0,
                scale: Zf,
                size: Kf,
                src: Hf
            }), qf = "NO_IMAGE", c_ = new Vi({color: Xf, width: 1}), Jf = new Vi({
                color: [51, 51, 51, 1],
                width: 2
            }), p_ = new bn({font: "bold 16px Helvetica", fill: l_, stroke: Jf, scale: .8}), d_ = new Wi({
                fill: l_,
                image: u_,
                text: p_,
                stroke: c_,
                zIndex: 0
            }), f_ = [d_]), this.dataProjection = ne("EPSG:4326"), this.defaultStyle_ = e.defaultStyle ? e.defaultStyle : f_, this.extractStyles_ = void 0 === e.extractStyles || e.extractStyles, this.writeStyles_ = void 0 === e.writeStyles || e.writeStyles, this.sharedStyles_ = {}, this.showPointNames_ = void 0 === e.showPointNames || e.showPointNames
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.readDocumentOrFolder_ = function (t, e) {
            var i = yd([], _d(e_, {
                Document: od(this.readDocumentOrFolder_, this),
                Folder: od(this.readDocumentOrFolder_, this),
                Placemark: sd(this.readPlacemark_, this),
                Style: this.readSharedStyle_.bind(this),
                StyleMap: this.readSharedStyleMap_.bind(this)
            }), t, e, this);
            return i || void 0
        }, t.prototype.readPlacemark_ = function (t, e) {
            var i = yd({geometry: null}, r_, t, e);
            if (i) {
                var r = new Ji, n = t.getAttribute("id");
                null !== n && r.setId(n);
                var a, h, l, u, c, o = e[0], s = i.geometry;
                if (s && Bp(s, !1, o), r.setGeometry(s), delete i.geometry, this.extractStyles_) {
                    var p = i.Style, d = i.styleUrl,
                        f = (a = p, h = d, l = this.defaultStyle_, u = this.sharedStyles_, c = this.showPointNames_, function (t, e) {
                            var i, r = c, n = "";
                            if (r) {
                                var o = t.getGeometry();
                                o && (r = o.getType() === Lt.POINT)
                            }
                            if (r && (n = t.get("name"), r = r && n), a) return r ? (i = g_(a[0], n), a.concat(i)) : a;
                            if (h) {
                                var s = function t(e, i, r) {
                                    return Array.isArray(e) ? e : "string" == typeof e ? (!(e in r) && "#" + e in r && (e = "#" + e), t(r[e], i, r)) : i
                                }(h, l, u);
                                return r ? (i = g_(s[0], n), s.concat(i)) : s
                            }
                            return r ? (i = g_(l[0], n), l.concat(i)) : l
                        });
                    r.setStyle(f)
                }
                return delete i.Style, r.setProperties(i), r
            }
        }, t.prototype.readSharedStyle_ = function (t, e) {
            var i = t.getAttribute("id");
            if (null !== i) {
                var r = z_(t, e);
                if (r) {
                    var n, o = t.baseURI;
                    if (o && "about:blank" != o || (o = window.location.href), o) n = new URL("#" + i, o).href; else n = "#" + i;
                    this.sharedStyles_[n] = r
                }
            }
        }, t.prototype.readSharedStyleMap_ = function (t, e) {
            var i = t.getAttribute("id");
            if (null !== i) {
                var r = E_(t, e);
                if (r) {
                    var n, o = t.baseURI;
                    if (o && "about:blank" != o || (o = window.location.href), o) n = new URL("#" + i, o).href; else n = "#" + i;
                    this.sharedStyles_[n] = r
                }
            }
        }, t.prototype.readFeatureFromNode = function (t, e) {
            if (!lr(e_, t.namespaceURI)) return null;
            var i = this.readPlacemark_(t, [this.getReadOptions(t, e)]);
            return i || null
        }, t.prototype.readFeaturesFromNode = function (t, e) {
            var i;
            if (!lr(e_, t.namespaceURI)) return [];
            var r = t.localName;
            if ("Document" == r || "Folder" == r) return (i = this.readDocumentOrFolder_(t, [this.getReadOptions(t, e)])) || [];
            if ("Placemark" == r) {
                var n = this.readPlacemark_(t, [this.getReadOptions(t, e)]);
                return n ? [n] : []
            }
            if ("kml" == r) {
                i = [];
                for (var o = t.firstElementChild; o; o = o.nextElementSibling) {
                    var s = this.readFeaturesFromNode(o, e);
                    s && pr(i, s)
                }
                return i
            }
            return []
        }, t.prototype.readName = function (t) {
            if (id(t)) return this.readNameFromDocument(t);
            if (rd(t)) return this.readNameFromNode(t);
            if ("string" == typeof t) {
                var e = nd(t);
                return this.readNameFromDocument(e)
            }
        }, t.prototype.readNameFromDocument = function (t) {
            for (var e = t.firstChild; e; e = e.nextSibling) if (e.nodeType == Node.ELEMENT_NODE) {
                var i = this.readNameFromNode(e);
                if (i) return i
            }
        }, t.prototype.readNameFromNode = function (t) {
            for (var e = t.firstElementChild; e; e = e.nextElementSibling) if (lr(e_, e.namespaceURI) && "name" == e.localName) return Pd(e);
            for (var i = t.firstElementChild; i; i = i.nextElementSibling) {
                var r = i.localName;
                if (lr(e_, i.namespaceURI) && ("Document" == r || "Folder" == r || "Placemark" == r || "kml" == r)) {
                    var n = this.readNameFromNode(i);
                    if (n) return n
                }
            }
        }, t.prototype.readNetworkLinks = function (t) {
            var e = [];
            if (id(t)) pr(e, this.readNetworkLinksFromDocument(t)); else if (rd(t)) pr(e, this.readNetworkLinksFromNode(t)); else if ("string" == typeof t) {
                var i = nd(t);
                pr(e, this.readNetworkLinksFromDocument(i))
            }
            return e
        }, t.prototype.readNetworkLinksFromDocument = function (t) {
            for (var e = [], i = t.firstChild; i; i = i.nextSibling) i.nodeType == Node.ELEMENT_NODE && pr(e, this.readNetworkLinksFromNode(i));
            return e
        }, t.prototype.readNetworkLinksFromNode = function (t) {
            for (var e = [], i = t.firstElementChild; i; i = i.nextElementSibling) if (lr(e_, i.namespaceURI) && "NetworkLink" == i.localName) {
                var r = yd({}, n_, i, []);
                e.push(r)
            }
            for (var n = t.firstElementChild; n; n = n.nextElementSibling) {
                var o = n.localName;
                !lr(e_, n.namespaceURI) || "Document" != o && "Folder" != o && "kml" != o || pr(e, this.readNetworkLinksFromNode(n))
            }
            return e
        }, t.prototype.readRegion = function (t) {
            var e = [];
            if (id(t)) pr(e, this.readRegionFromDocument(t)); else if (rd(t)) pr(e, this.readRegionFromNode(t)); else if ("string" == typeof t) {
                var i = nd(t);
                pr(e, this.readRegionFromDocument(i))
            }
            return e
        }, t.prototype.readRegionFromDocument = function (t) {
            for (var e = [], i = t.firstChild; i; i = i.nextSibling) i.nodeType == Node.ELEMENT_NODE && pr(e, this.readRegionFromNode(i));
            return e
        }, t.prototype.readRegionFromNode = function (t) {
            for (var e = [], i = t.firstElementChild; i; i = i.nextElementSibling) if (lr(e_, i.namespaceURI) && "Region" == i.localName) {
                var r = yd({}, s_, i, []);
                e.push(r)
            }
            for (var n = t.firstElementChild; n; n = n.nextElementSibling) {
                var o = n.localName;
                !lr(e_, n.namespaceURI) || "Document" != o && "Folder" != o && "kml" != o || pr(e, this.readRegionFromNode(n))
            }
            return e
        }, t.prototype.writeFeaturesNode = function (t, e) {
            e = this.adaptOptions(e);
            var i = td(e_[4], "kml"), r = "http://www.w3.org/2000/xmlns/";
            i.setAttributeNS(r, "xmlns:gx", t_[0]), i.setAttributeNS(r, "xmlns:xsi", $p), i.setAttributeNS($p, "xsi:schemaLocation", "http://www.opengis.net/kml/2.2 https://developers.google.com/kml/schema/kml22gx.xsd");
            var n = {node: i}, o = {};
            1 < t.length ? o.Document = t : 1 == t.length && (o.Placemark = t[0]);
            var s = a_[i.namespaceURI], a = fd(o, s);
            return md(n, h_, dd, a, [e], s, this), i
        }, t
    }(xd);

    function g_(t, e) {
        var i = null, r = [0, 0], n = "start";
        if (t.getImage()) {
            var o = t.getImage().getImageSize();
            if (null === o && (o = Kf), 2 == o.length) {
                var s = t.getImage().getScale();
                r[0] = s * o[0] / 2, r[1] = -s * o[1] / 2, n = "left"
            }
        }
        if (null !== t.getText()) {
            var a = t.getText();
            (i = a.clone()).setFont(a.getFont() || p_.getFont()), i.setScale(a.getScale() || p_.getScale()), i.setFill(a.getFill() || p_.getFill()), i.setStroke(a.getStroke() || Jf)
        } else i = p_.clone();
        return i.setText(e), i.setOffsetX(r[0]), i.setOffsetY(r[1]), i.setTextAlign(n), new Wi({text: i})
    }

    function y_(t) {
        var e = ed(t, !1), i = /^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(e);
        if (i) {
            var r = i[1];
            return [parseInt(r.substr(6, 2), 16), parseInt(r.substr(4, 2), 16), parseInt(r.substr(2, 2), 16), parseInt(r.substr(0, 2), 16) / 255]
        }
    }

    function v_(t) {
        for (var e, i = ed(t, !1), r = [], n = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?))?\s*/i; e = n.exec(i);) {
            var o = parseFloat(e[1]), s = parseFloat(e[2]), a = e[3] ? parseFloat(e[3]) : 0;
            r.push(o, s, a), i = i.substr(e[0].length)
        }
        if ("" === i) return r
    }

    function m_(t) {
        var e = ed(t, !1).trim(), i = t.baseURI;
        return i && "about:blank" != i || (i = window.location.href), i ? new URL(e, i).href : e
    }

    function x_(t) {
        return Id(t)
    }

    var S_ = _d(e_, {
        Pair: function (t, e) {
            var i = yd({}, q_, t, e);
            if (!i) return;
            var r = i.key;
            if (r && "normal" == r) {
                var n = i.styleUrl;
                n && (e[e.length - 1] = n);
                var o = i.Style;
                o && (e[e.length - 1] = o)
            }
        }
    });

    function E_(t, e) {
        return yd(void 0, S_, t, e)
    }

    var C_ = _d(e_, {
        Icon: ld(function (t, e) {
            var i = yd({}, M_, t, e);
            return i || null
        }), heading: ld(Id), hotSpot: ld(function (t) {
            var e, i = t.getAttribute("xunits"), r = t.getAttribute("yunits");
            return e = "insetPixels" !== i ? "insetPixels" !== r ? Qf.BOTTOM_LEFT : Qf.TOP_LEFT : "insetPixels" !== r ? Qf.BOTTOM_RIGHT : Qf.TOP_RIGHT, {
                x: parseFloat(t.getAttribute("x")),
                xunits: i_[i],
                y: parseFloat(t.getAttribute("y")),
                yunits: i_[r],
                origin: e
            }
        }), scale: ld(x_)
    });
    var T_ = _d(e_, {color: ld(y_), scale: ld(x_)});
    var w_ = _d(e_, {color: ld(y_), width: ld(Id)});
    var R_ = _d(e_, {color: ld(y_), fill: ld(Td), outline: ld(Td)});
    var I_ = _d(e_, {coordinates: ad(v_)});

    function L_(t, e) {
        return yd(null, I_, t, e)
    }

    var b_ = _d(t_, {Track: sd(P_)});
    var F_ = _d(e_, {
        when: function (t, e) {
            var i = e[e.length - 1].whens, r = ed(t, !1), n = Date.parse(r);
            i.push(isNaN(n) ? 0 : n)
        }
    }, _d(t_, {
        coord: function (t, e) {
            var i = e[e.length - 1].flatCoordinates, r = ed(t, !1),
                n = /^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(r);
            if (n) {
                var o = parseFloat(n[1]), s = parseFloat(n[2]), a = parseFloat(n[3]);
                i.push(o, s, a, 0)
            } else i.push(0, 0, 0, 0)
        }
    }));

    function P_(t, e) {
        var i = yd({flatCoordinates: [], whens: []}, F_, t, e);
        if (i) {
            for (var r = i.flatCoordinates, n = i.whens, o = 0, s = Math.min(r.length, n.length); o < s; ++o) r[4 * o + 3] = n[o];
            return new Sn(r, yr.XYZM)
        }
    }

    var M_ = _d(e_, {href: ld(m_)}, _d(t_, {x: ld(Id), y: ld(Id), w: ld(Id), h: ld(Id)}));
    var O_ = _d(e_, {coordinates: ad(v_)});

    function N_(t, e) {
        return yd(null, O_, t, e)
    }

    var A_ = _d(e_, {extrude: ld(Td), tessellate: ld(Td), altitudeMode: ld(Pd)});

    function G_(t, e) {
        var i = yd({}, A_, t, e), r = N_(t, e);
        if (r) {
            var n = new Sn(r, yr.XYZ);
            return n.setProperties(i), n
        }
    }

    function k_(t, e) {
        var i = yd({}, A_, t, e), r = N_(t, e);
        if (r) {
            var n = new Qr(r, yr.XYZ, [r.length]);
            return n.setProperties(i), n
        }
    }

    var D_ = _d(e_, {LineString: sd(G_), LinearRing: sd(k_), MultiGeometry: sd(j_), Point: sd(U_), Polygon: sd(B_)});

    function j_(t, e) {
        var i, r = yd([], D_, t, e);
        if (!r) return null;
        if (0 === r.length) return new Tf(r);
        for (var n, o, s = !0, a = r[0].getType(), h = 1, l = r.length; h < l; ++h) if (r[h].getType() != a) {
            s = !1;
            break
        }
        if (s) if (a == Lt.POINT) {
            var u = r[0];
            n = u.getLayout(), o = u.getFlatCoordinates();
            for (var c = 1, p = r.length; c < p; ++c) pr(o, r[c].getFlatCoordinates());
            V_(i = new rh(o, n), r)
        } else a == Lt.LINE_STRING ? V_(i = new ih(r), r) : a == Lt.POLYGON ? V_(i = new oh(r), r) : a == Lt.GEOMETRY_COLLECTION ? i = new Tf(r) : Z(!1, 37); else i = new Tf(r);
        return i
    }

    function U_(t, e) {
        var i = yd({}, A_, t, e), r = N_(t, e);
        if (r) {
            var n = new Dr(r, yr.XYZ);
            return n.setProperties(i), n
        }
    }

    var Y_ = _d(e_, {
        innerBoundaryIs: function (t, e) {
            var i = yd(void 0, tg, t, e);
            if (i) {
                var r = e[e.length - 1];
                r.push(i)
            }
        }, outerBoundaryIs: function (t, e) {
            var i = yd(void 0, eg, t, e);
            if (i) {
                var r = e[e.length - 1];
                r[0] = i
            }
        }
    });

    function B_(t, e) {
        var i = yd({}, A_, t, e), r = yd([null], Y_, t, e);
        if (r && r[0]) {
            for (var n = r[0], o = [n.length], s = 1, a = r.length; s < a; ++s) pr(n, r[s]), o.push(n.length);
            var h = new Qr(n, yr.XYZ, o);
            return h.setProperties(i), h
        }
    }

    var X_ = _d(e_, {
        IconStyle: function (t, e) {
            var i = yd({}, C_, t, e);
            if (i) {
                var r, n, o, s, a = e[e.length - 1], h = "Icon" in i ? i.Icon : {},
                    l = !("Icon" in i) || 0 < Object.keys(h).length, u = h.href;
                u ? r = u : l && (r = Hf);
                var c, p = Qf.BOTTOM_LEFT, d = i.hotSpot;
                d ? (n = [d.x, d.y], o = d.xunits, s = d.yunits, p = d.origin) : r === Hf ? (n = zf, o = Vf, s = Wf) : /^http:\/\/maps\.(?:google|gstatic)\.com\//.test(r) && (n = [.5, 0], o = Yf.FRACTION, s = Yf.FRACTION);
                var f, _ = h.x, g = h.y;
                void 0 !== _ && void 0 !== g && (c = [_, g]);
                var y, v = h.w, m = h.h;
                void 0 !== v && void 0 !== m && (f = [v, m]);
                var x = i.heading;
                void 0 !== x && (y = St(x));
                var S = i.scale;
                if (l) {
                    r == Hf && (f = Kf, void 0 === S && (S = Zf));
                    var E = new $f({
                        anchor: n,
                        anchorOrigin: p,
                        anchorXUnits: o,
                        anchorYUnits: s,
                        crossOrigin: "anonymous",
                        offset: c,
                        offsetOrigin: Qf.BOTTOM_LEFT,
                        rotation: y,
                        scale: S,
                        size: f,
                        src: r
                    });
                    a.imageStyle = E
                } else a.imageStyle = qf
            }
        }, LabelStyle: function (t, e) {
            var i = yd({}, T_, t, e);
            if (i) {
                var r = e[e.length - 1],
                    n = new bn({fill: new zi({color: "color" in i ? i.color : Xf}), scale: i.scale});
                r.textStyle = n
            }
        }, LineStyle: function (t, e) {
            var i = yd({}, w_, t, e);
            if (i) {
                var r = e[e.length - 1],
                    n = new Vi({color: "color" in i ? i.color : Xf, width: "width" in i ? i.width : 1});
                r.strokeStyle = n
            }
        }, PolyStyle: function (t, e) {
            var i = yd({}, R_, t, e);
            if (i) {
                var r = e[e.length - 1], n = new zi({color: "color" in i ? i.color : Xf});
                r.fillStyle = n;
                var o = i.fill;
                void 0 !== o && (r.fill = o);
                var s = i.outline;
                void 0 !== s && (r.outline = s)
            }
        }
    });

    function z_(t, e) {
        var i = yd({}, X_, t, e);
        if (!i) return null;
        var r = "fillStyle" in i ? i.fillStyle : l_, n = i.fill;
        void 0 === n || n || (r = null);
        var o = "imageStyle" in i ? i.imageStyle : u_;
        o == qf && (o = void 0);
        var s = "textStyle" in i ? i.textStyle : p_, a = "strokeStyle" in i ? i.strokeStyle : c_, h = i.outline;
        return void 0 === h || h || (a = null), [new Wi({fill: r, image: o, stroke: a, text: s, zIndex: void 0})]
    }

    function V_(t, e) {
        var i, r, n, o = e.length, s = new Array(e.length), a = new Array(e.length), h = new Array(e.length);
        i = r = n = !1;
        for (var l = 0; l < o; ++l) {
            var u = e[l];
            s[l] = u.get("extrude"), a[l] = u.get("tessellate"), h[l] = u.get("altitudeMode"), i = i || void 0 !== s[l], r = r || void 0 !== a[l], n = n || h[l]
        }
        i && t.set("extrude", s), r && t.set("tessellate", a), n && t.set("altitudeMode", h)
    }

    var W_ = _d(e_, {displayName: ld(Pd), value: ld(Pd)});
    var K_ = _d(e_, {
        Data: function (t, e) {
            var i = t.getAttribute("name");
            gd(W_, t, e);
            var r = e[e.length - 1];
            null !== i ? r[i] = r.value : null !== r.displayName && (r[r.displayName] = r.value), delete r.value
        }, SchemaData: function (t, e) {
            gd(J_, t, e)
        }
    });

    function H_(t, e) {
        gd(K_, t, e)
    }

    function Z_(t, e) {
        gd(s_, t, e)
    }

    var q_ = _d(e_, {Style: ld(z_), key: ld(Pd), styleUrl: ld(m_)});
    var J_ = _d(e_, {
        SimpleData: function (t, e) {
            var i = t.getAttribute("name");
            if (null !== i) {
                var r = Pd(t), n = e[e.length - 1];
                n[i] = r
            }
        }
    });
    var Q_ = _d(e_, {
        altitudeMode: ld(Pd),
        minAltitude: ld(Id),
        maxAltitude: ld(Id),
        north: ld(Id),
        south: ld(Id),
        east: ld(Id),
        west: ld(Id)
    });
    var $_ = _d(e_, {minLodPixels: ld(Id), maxLodPixels: ld(Id), minFadeExtent: ld(Id), maxFadeExtent: ld(Id)});
    var tg = _d(e_, {LinearRing: ad(L_)});
    var eg = _d(e_, {LinearRing: ad(L_)});

    function ig(t, e) {
        for (var i = Ne(e), r = [255 * (4 == i.length ? i[3] : 1), i[2], i[1], i[0]], n = 0; n < 4; ++n) {
            var o = parseInt(r[n], 10).toString(16);
            r[n] = 1 == o.length ? "0" + o : o
        }
        Ad(t, r.join(""))
    }

    var rg = _d(e_, {
        Data: ud(function (t, e, i) {
            t.setAttribute("name", e.name);
            var r = {node: t}, n = e.value;
            "object" == typeof n ? (null !== n && n.displayName && md(r, rg, dd, [n.displayName], i, ["displayName"]), null !== n && n.value && md(r, rg, dd, [n.value], i, ["value"])) : md(r, rg, dd, [n], i, ["value"])
        }), value: ud(function (t, e) {
            Ad(t, e)
        }), displayName: ud(function (t, e) {
            i = t, r = e, i.appendChild(Qp.createCDATASection(r));
            var i, r
        })
    });
    var ng = _d(e_, {Placemark: ud(bg)}), og = function (t, e, i) {
        return td(e[e.length - 1].node.namespaceURI, "Placemark")
    };
    var sg = pd("Data");
    var ag = _d(e_, ["href"], _d(t_, ["x", "y", "w", "h"])),
        hg = _d(e_, {href: ud(Ad)}, _d(t_, {x: ud(Od), y: ud(Od), w: ud(Od), h: ud(Od)})), lg = function (t, e, i) {
            return td(t_[0], "gx:" + i)
        };
    var ug = _d(e_, ["scale", "heading", "Icon", "hotSpot"]), cg = _d(e_, {
        Icon: ud(function (t, e, i) {
            var r = {node: t}, n = i[i.length - 1].node, o = ag[n.namespaceURI], s = fd(e, o);
            md(r, hg, dd, s, i, o), s = fd(e, o = ag[t_[0]]), md(r, hg, lg, s, i, o)
        }), heading: ud(Od), hotSpot: ud(function (t, e) {
            t.setAttribute("x", e.x), t.setAttribute("y", e.y), t.setAttribute("xunits", e.xunits), t.setAttribute("yunits", e.yunits)
        }), scale: ud(jg)
    });
    var pg = _d(e_, ["color", "scale"]), dg = _d(e_, {color: ud(ig), scale: ud(jg)});
    var fg = _d(e_, ["color", "width"]), _g = _d(e_, {color: ud(ig), width: ud(Od)});
    var gg = {
            Point: "Point",
            LineString: "LineString",
            LinearRing: "LinearRing",
            Polygon: "Polygon",
            MultiPoint: "MultiGeometry",
            MultiLineString: "MultiGeometry",
            MultiPolygon: "MultiGeometry",
            GeometryCollection: "MultiGeometry"
        }, yg = function (t, e, i) {
            if (t) return td(e[e.length - 1].node.namespaceURI, gg[t.getType()])
        }, vg = pd("Point"), mg = pd("LineString"), xg = pd("LinearRing"), Sg = pd("Polygon"),
        Eg = _d(e_, {LineString: ud(Mg), Point: ud(Mg), Polygon: ud(Gg), GeometryCollection: ud(Cg)});

    function Cg(t, e, i) {
        var r, n, o = {node: t}, s = e.getType();
        s == Lt.GEOMETRY_COLLECTION ? (r = e.getGeometries(), n = yg) : s == Lt.MULTI_POINT ? (r = e.getPoints(), n = vg) : s == Lt.MULTI_LINE_STRING ? (r = e.getLineStrings(), n = mg) : s == Lt.MULTI_POLYGON ? (r = e.getPolygons(), n = Sg) : Z(!1, 39), md(o, Eg, n, r, i)
    }

    var Tg = _d(e_, {LinearRing: ud(Mg)});

    function wg(t, e, i) {
        md({node: t}, Tg, xg, [e], i)
    }

    var Rg = _d(e_, {
            ExtendedData: ud(function (t, e, i) {
                for (var r = {node: t}, n = e.names, o = e.values, s = n.length, a = 0; a < s; a++) md(r, rg, sg, [{
                    name: n[a],
                    value: o[a]
                }], i)
            }),
            MultiGeometry: ud(Cg),
            LineString: ud(Mg),
            LinearRing: ud(Mg),
            Point: ud(Mg),
            Polygon: ud(Gg),
            Style: ud(function (t, e, i) {
                var r = {node: t}, n = {}, o = e.getFill(), s = e.getStroke(), a = e.getImage(), h = e.getText();
                a instanceof $f && (n.IconStyle = a);
                h && (n.LabelStyle = h);
                s && (n.LineStyle = s);
                o && (n.PolyStyle = o);
                var l = i[i.length - 1].node, u = Ug[l.namespaceURI], c = fd(n, u);
                md(r, Yg, dd, c, i, u)
            }),
            address: ud(Ad),
            description: ud(Ad),
            name: ud(Ad),
            open: ud(Md),
            phoneNumber: ud(Ad),
            styleUrl: ud(Ad),
            visibility: ud(Md)
        }), Ig = _d(e_, ["name", "open", "visibility", "address", "phoneNumber", "description", "styleUrl", "Style"]),
        Lg = pd("ExtendedData");

    function bg(t, e, i) {
        var r = {node: t};
        e.getId() && t.setAttribute("id", e.getId());
        var n = e.getProperties(),
            o = {address: 1, description: 1, name: 1, open: 1, phoneNumber: 1, styleUrl: 1, visibility: 1};
        o[e.getGeometryName()] = 1;
        var s = Object.keys(n || {}).sort().filter(function (t) {
            return !o[t]
        });
        if (0 < s.length) {
            var a = fd(n, s);
            md(r, Rg, Lg, [{names: s, values: a}], i)
        }
        var h = e.getStyleFunction();
        if (h) {
            var l = h(e, 0);
            if (l) {
                var u = Array.isArray(l) ? l[0] : l;
                this.writeStyles_ && (n.Style = u);
                var c = u.getText();
                c && (n.name = c.getText())
            }
        }
        var p = i[i.length - 1].node, d = Ig[p.namespaceURI], f = fd(n, d);
        md(r, Rg, dd, f, i, d);
        var _ = i[0], g = e.getGeometry();
        g && (g = Bp(g, !0, _)), md(r, Rg, yg, [g], i)
    }

    var Fg = _d(e_, ["extrude", "tessellate", "altitudeMode", "coordinates"]), Pg = _d(e_, {
        extrude: ud(Md), tessellate: ud(Md), altitudeMode: ud(Ad), coordinates: ud(function (t, e, i) {
            var r, n = i[i.length - 1], o = n.layout, s = n.stride;
            o == yr.XY || o == yr.XYM ? r = 2 : o == yr.XYZ || o == yr.XYZM ? r = 3 : Z(!1, 34);
            var a = e.length, h = "";
            if (0 < a) {
                h += e[0];
                for (var l = 1; l < r; ++l) h += "," + e[l];
                for (var u = s; u < a; u += s) {
                    h += " " + e[u];
                    for (var c = 1; c < r; ++c) h += "," + e[u + c]
                }
            }
            Ad(t, h)
        })
    });

    function Mg(t, e, i) {
        var r = e.getFlatCoordinates(), n = {node: t};
        n.layout = e.getLayout(), n.stride = e.getStride();
        var o = e.getProperties();
        o.coordinates = r;
        var s = i[i.length - 1].node, a = Fg[s.namespaceURI], h = fd(o, a);
        md(n, Pg, dd, h, i, a)
    }

    var Og = _d(e_, {outerBoundaryIs: ud(wg), innerBoundaryIs: ud(wg)}), Ng = pd("innerBoundaryIs"),
        Ag = pd("outerBoundaryIs");

    function Gg(t, e, i) {
        var r = e.getLinearRings(), n = r.shift(), o = {node: t};
        md(o, Og, Ng, r, i), md(o, Og, Ag, [n], i)
    }

    var kg = _d(e_, {color: ud(ig)}), Dg = pd("color");

    function jg(t, e) {
        Od(t, Math.round(1e6 * e) / 1e6)
    }

    var Ug = _d(e_, ["IconStyle", "LabelStyle", "LineStyle", "PolyStyle"]), Yg = _d(e_, {
        IconStyle: ud(function (t, e, i) {
            var r = {node: t}, n = {}, o = e.getSrc(), s = e.getSize(), a = e.getImageSize(), h = {href: o};
            if (s) {
                h.w = s[0], h.h = s[1];
                var l = e.getAnchor(), u = e.getOrigin();
                if (u && a && 0 !== u[0] && u[1] !== s[1] && (h.x = u[0], h.y = a[1] - (u[1] + s[1])), l && (l[0] !== s[0] / 2 || l[1] !== s[1] / 2)) {
                    var c = {x: l[0], xunits: Yf.PIXELS, y: s[1] - l[1], yunits: Yf.PIXELS};
                    n.hotSpot = c
                }
            }
            n.Icon = h;
            var p = e.getScale();
            1 !== p && (n.scale = p);
            var d = e.getRotation();
            0 !== d && (n.heading = d);
            var f = i[i.length - 1].node, _ = ug[f.namespaceURI], g = fd(n, _);
            md(r, cg, dd, g, i, _)
        }), LabelStyle: ud(function (t, e, i) {
            var r = {node: t}, n = {}, o = e.getFill();
            o && (n.color = o.getColor());
            var s = e.getScale();
            s && 1 !== s && (n.scale = s);
            var a = i[i.length - 1].node, h = pg[a.namespaceURI], l = fd(n, h);
            md(r, dg, dd, l, i, h)
        }), LineStyle: ud(function (t, e, i) {
            var r = {node: t}, n = {color: e.getColor(), width: e.getWidth()}, o = i[i.length - 1].node,
                s = fg[o.namespaceURI], a = fd(n, s);
            md(r, _g, dd, a, i, s)
        }), PolyStyle: ud(function (t, e, i) {
            md({node: t}, kg, Dg, [e.getColor()], i)
        })
    });
    var Bg = function (t, e, i, r, n) {
        var o, s, a = 8 * n - r - 1, h = (1 << a) - 1, l = h >> 1, u = -7, c = i ? n - 1 : 0, p = i ? -1 : 1,
            d = t[e + c];
        for (c += p, o = d & (1 << -u) - 1, d >>= -u, u += a; 0 < u; o = 256 * o + t[e + c], c += p, u -= 8) ;
        for (s = o & (1 << -u) - 1, o >>= -u, u += r; 0 < u; s = 256 * s + t[e + c], c += p, u -= 8) ;
        if (0 === o) o = 1 - l; else {
            if (o === h) return s ? NaN : 1 / 0 * (d ? -1 : 1);
            s += Math.pow(2, r), o -= l
        }
        return (d ? -1 : 1) * s * Math.pow(2, o - r)
    }, Xg = function (t, e, i, r, n, o) {
        var s, a, h, l = 8 * o - n - 1, u = (1 << l) - 1, c = u >> 1,
            p = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = r ? 0 : o - 1, f = r ? 1 : -1,
            _ = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
        for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = u) : (s = Math.floor(Math.log(e) / Math.LN2), e * (h = Math.pow(2, -s)) < 1 && (s--, h *= 2), 2 <= (e += 1 <= s + c ? p / h : p * Math.pow(2, 1 - c)) * h && (s++, h /= 2), u <= s + c ? (a = 0, s = u) : 1 <= s + c ? (a = (e * h - 1) * Math.pow(2, n), s += c) : (a = e * Math.pow(2, c - 1) * Math.pow(2, n), s = 0)); 8 <= n; t[i + d] = 255 & a, d += f, a /= 256, n -= 8) ;
        for (s = s << n | a, l += n; 0 < l; t[i + d] = 255 & s, d += f, s /= 256, l -= 8) ;
        t[i + d - f] |= 128 * _
    }, zg = Vg;

    function Vg(t) {
        this.buf = ArrayBuffer.isView && ArrayBuffer.isView(t) ? t : new Uint8Array(t || 0), this.pos = 0, this.type = 0, this.length = this.buf.length
    }

    Vg.Varint = 0, Vg.Fixed64 = 1, Vg.Bytes = 2, Vg.Fixed32 = 5;
    var Wg = 4294967296, Kg = 1 / Wg;

    function Hg(t) {
        return t.type === Vg.Bytes ? t.readVarint() + t.pos : t.pos + 1
    }

    function Zg(t, e, i) {
        return i ? 4294967296 * e + (t >>> 0) : 4294967296 * (e >>> 0) + (t >>> 0)
    }

    function qg(t, e, i) {
        var r = e <= 16383 ? 1 : e <= 2097151 ? 2 : e <= 268435455 ? 3 : Math.ceil(Math.log(e) / (7 * Math.LN2));
        i.realloc(r);
        for (var n = i.pos - 1; t <= n; n--) i.buf[n + r] = i.buf[n]
    }

    function Jg(t, e) {
        for (var i = 0; i < t.length; i++) e.writeVarint(t[i])
    }

    function Qg(t, e) {
        for (var i = 0; i < t.length; i++) e.writeSVarint(t[i])
    }

    function $g(t, e) {
        for (var i = 0; i < t.length; i++) e.writeFloat(t[i])
    }

    function ty(t, e) {
        for (var i = 0; i < t.length; i++) e.writeDouble(t[i])
    }

    function ey(t, e) {
        for (var i = 0; i < t.length; i++) e.writeBoolean(t[i])
    }

    function iy(t, e) {
        for (var i = 0; i < t.length; i++) e.writeFixed32(t[i])
    }

    function ry(t, e) {
        for (var i = 0; i < t.length; i++) e.writeSFixed32(t[i])
    }

    function ny(t, e) {
        for (var i = 0; i < t.length; i++) e.writeFixed64(t[i])
    }

    function oy(t, e) {
        for (var i = 0; i < t.length; i++) e.writeSFixed64(t[i])
    }

    function sy(t, e) {
        return (t[e] | t[e + 1] << 8 | t[e + 2] << 16) + 16777216 * t[e + 3]
    }

    function ay(t, e, i) {
        t[i] = e, t[i + 1] = e >>> 8, t[i + 2] = e >>> 16, t[i + 3] = e >>> 24
    }

    function hy(t, e) {
        return (t[e] | t[e + 1] << 8 | t[e + 2] << 16) + (t[e + 3] << 24)
    }

    Vg.prototype = {
        destroy: function () {
            this.buf = null
        }, readFields: function (t, e, i) {
            for (i = i || this.length; this.pos < i;) {
                var r = this.readVarint(), n = r >> 3, o = this.pos;
                this.type = 7 & r, t(n, e, this), this.pos === o && this.skip(r)
            }
            return e
        }, readMessage: function (t, e) {
            return this.readFields(t, e, this.readVarint() + this.pos)
        }, readFixed32: function () {
            var t = sy(this.buf, this.pos);
            return this.pos += 4, t
        }, readSFixed32: function () {
            var t = hy(this.buf, this.pos);
            return this.pos += 4, t
        }, readFixed64: function () {
            var t = sy(this.buf, this.pos) + sy(this.buf, this.pos + 4) * Wg;
            return this.pos += 8, t
        }, readSFixed64: function () {
            var t = sy(this.buf, this.pos) + hy(this.buf, this.pos + 4) * Wg;
            return this.pos += 8, t
        }, readFloat: function () {
            var t = Bg(this.buf, this.pos, !0, 23, 4);
            return this.pos += 4, t
        }, readDouble: function () {
            var t = Bg(this.buf, this.pos, !0, 52, 8);
            return this.pos += 8, t
        }, readVarint: function (t) {
            var e, i, r = this.buf;
            return e = 127 & (i = r[this.pos++]), i < 128 ? e : (e |= (127 & (i = r[this.pos++])) << 7, i < 128 ? e : (e |= (127 & (i = r[this.pos++])) << 14, i < 128 ? e : (e |= (127 & (i = r[this.pos++])) << 21, i < 128 ? e : function (t, e, i) {
                var r, n, o = i.buf;
                if (n = o[i.pos++], r = (112 & n) >> 4, n < 128) return Zg(t, r, e);
                if (n = o[i.pos++], r |= (127 & n) << 3, n < 128) return Zg(t, r, e);
                if (n = o[i.pos++], r |= (127 & n) << 10, n < 128) return Zg(t, r, e);
                if (n = o[i.pos++], r |= (127 & n) << 17, n < 128) return Zg(t, r, e);
                if (n = o[i.pos++], r |= (127 & n) << 24, n < 128) return Zg(t, r, e);
                if (n = o[i.pos++], r |= (1 & n) << 31, n < 128) return Zg(t, r, e);
                throw new Error("Expected varint not more than 10 bytes")
            }(e |= (15 & (i = r[this.pos])) << 28, t, this))))
        }, readVarint64: function () {
            return this.readVarint(!0)
        }, readSVarint: function () {
            var t = this.readVarint();
            return t % 2 == 1 ? (t + 1) / -2 : t / 2
        }, readBoolean: function () {
            return Boolean(this.readVarint())
        }, readString: function () {
            var t = this.readVarint() + this.pos, e = function (t, e, i) {
                var r = "", n = e;
                for (; n < i;) {
                    var o, s, a, h = t[n], l = null, u = 239 < h ? 4 : 223 < h ? 3 : 191 < h ? 2 : 1;
                    if (i < n + u) break;
                    1 === u ? h < 128 && (l = h) : 2 === u ? 128 == (192 & (o = t[n + 1])) && (l = (31 & h) << 6 | 63 & o) <= 127 && (l = null) : 3 === u ? (o = t[n + 1], s = t[n + 2], 128 == (192 & o) && 128 == (192 & s) && ((l = (15 & h) << 12 | (63 & o) << 6 | 63 & s) <= 2047 || 55296 <= l && l <= 57343) && (l = null)) : 4 === u && (o = t[n + 1], s = t[n + 2], a = t[n + 3], 128 == (192 & o) && 128 == (192 & s) && 128 == (192 & a) && ((l = (15 & h) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & a) <= 65535 || 1114112 <= l) && (l = null)), null === l ? (l = 65533, u = 1) : 65535 < l && (l -= 65536, r += String.fromCharCode(l >>> 10 & 1023 | 55296), l = 56320 | 1023 & l), r += String.fromCharCode(l), n += u
                }
                return r
            }(this.buf, this.pos, t);
            return this.pos = t, e
        }, readBytes: function () {
            var t = this.readVarint() + this.pos, e = this.buf.subarray(this.pos, t);
            return this.pos = t, e
        }, readPackedVarint: function (t, e) {
            var i = Hg(this);
            for (t = t || []; this.pos < i;) t.push(this.readVarint(e));
            return t
        }, readPackedSVarint: function (t) {
            var e = Hg(this);
            for (t = t || []; this.pos < e;) t.push(this.readSVarint());
            return t
        }, readPackedBoolean: function (t) {
            var e = Hg(this);
            for (t = t || []; this.pos < e;) t.push(this.readBoolean());
            return t
        }, readPackedFloat: function (t) {
            var e = Hg(this);
            for (t = t || []; this.pos < e;) t.push(this.readFloat());
            return t
        }, readPackedDouble: function (t) {
            var e = Hg(this);
            for (t = t || []; this.pos < e;) t.push(this.readDouble());
            return t
        }, readPackedFixed32: function (t) {
            var e = Hg(this);
            for (t = t || []; this.pos < e;) t.push(this.readFixed32());
            return t
        }, readPackedSFixed32: function (t) {
            var e = Hg(this);
            for (t = t || []; this.pos < e;) t.push(this.readSFixed32());
            return t
        }, readPackedFixed64: function (t) {
            var e = Hg(this);
            for (t = t || []; this.pos < e;) t.push(this.readFixed64());
            return t
        }, readPackedSFixed64: function (t) {
            var e = Hg(this);
            for (t = t || []; this.pos < e;) t.push(this.readSFixed64());
            return t
        }, skip: function (t) {
            var e = 7 & t;
            if (e === Vg.Varint) for (; 127 < this.buf[this.pos++];) ; else if (e === Vg.Bytes) this.pos = this.readVarint() + this.pos; else if (e === Vg.Fixed32) this.pos += 4; else {
                if (e !== Vg.Fixed64) throw new Error("Unimplemented type: " + e);
                this.pos += 8
            }
        }, writeTag: function (t, e) {
            this.writeVarint(t << 3 | e)
        }, realloc: function (t) {
            for (var e = this.length || 16; e < this.pos + t;) e *= 2;
            if (e !== this.length) {
                var i = new Uint8Array(e);
                i.set(this.buf), this.buf = i, this.length = e
            }
        }, finish: function () {
            return this.length = this.pos, this.pos = 0, this.buf.subarray(0, this.length)
        }, writeFixed32: function (t) {
            this.realloc(4), ay(this.buf, t, this.pos), this.pos += 4
        }, writeSFixed32: function (t) {
            this.realloc(4), ay(this.buf, t, this.pos), this.pos += 4
        }, writeFixed64: function (t) {
            this.realloc(8), ay(this.buf, -1 & t, this.pos), ay(this.buf, Math.floor(t * Kg), this.pos + 4), this.pos += 8
        }, writeSFixed64: function (t) {
            this.realloc(8), ay(this.buf, -1 & t, this.pos), ay(this.buf, Math.floor(t * Kg), this.pos + 4), this.pos += 8
        }, writeVarint: function (t) {
            268435455 < (t = +t || 0) || t < 0 ? function (t, e) {
                var i, r;
                0 <= t ? (i = t % 4294967296 | 0, r = t / 4294967296 | 0) : (r = ~(-t / 4294967296), 4294967295 ^ (i = ~(-t % 4294967296)) ? i = i + 1 | 0 : r = r + 1 | (i = 0));
                if (0x10000000000000000 <= t || t < -0x10000000000000000) throw new Error("Given varint doesn't fit into 10 bytes");
                e.realloc(10), n = i, o = e, o.buf[o.pos++] = 127 & n | 128, n >>>= 7, o.buf[o.pos++] = 127 & n | 128, n >>>= 7, o.buf[o.pos++] = 127 & n | 128, n >>>= 7, o.buf[o.pos++] = 127 & n | 128, n >>>= 7, o.buf[o.pos] = 127 & n, function (t, e) {
                    var i = (7 & t) << 4;
                    if (e.buf[e.pos++] |= i | ((t >>>= 3) ? 128 : 0), !t) return;
                    if (e.buf[e.pos++] = 127 & t | ((t >>>= 7) ? 128 : 0), !t) return;
                    if (e.buf[e.pos++] = 127 & t | ((t >>>= 7) ? 128 : 0), !t) return;
                    if (e.buf[e.pos++] = 127 & t | ((t >>>= 7) ? 128 : 0), !t) return;
                    if (e.buf[e.pos++] = 127 & t | ((t >>>= 7) ? 128 : 0), !t) return;
                    e.buf[e.pos++] = 127 & t
                }(r, e);
                var n, o
            }(t, this) : (this.realloc(4), this.buf[this.pos++] = 127 & t | (127 < t ? 128 : 0), t <= 127 || (this.buf[this.pos++] = 127 & (t >>>= 7) | (127 < t ? 128 : 0), t <= 127 || (this.buf[this.pos++] = 127 & (t >>>= 7) | (127 < t ? 128 : 0), t <= 127 || (this.buf[this.pos++] = t >>> 7 & 127))))
        }, writeSVarint: function (t) {
            this.writeVarint(t < 0 ? 2 * -t - 1 : 2 * t)
        }, writeBoolean: function (t) {
            this.writeVarint(Boolean(t))
        }, writeString: function (t) {
            t = String(t), this.realloc(4 * t.length), this.pos++;
            var e = this.pos;
            this.pos = function (t, e, i) {
                for (var r, n, o = 0; o < e.length; o++) {
                    if (55295 < (r = e.charCodeAt(o)) && r < 57344) {
                        if (!n) {
                            56319 < r || o + 1 === e.length ? (t[i++] = 239, t[i++] = 191, t[i++] = 189) : n = r;
                            continue
                        }
                        if (r < 56320) {
                            t[i++] = 239, t[i++] = 191, t[i++] = 189, n = r;
                            continue
                        }
                        r = n - 55296 << 10 | r - 56320 | 65536, n = null
                    } else n && (t[i++] = 239, t[i++] = 191, t[i++] = 189, n = null);
                    r < 128 ? t[i++] = r : (r < 2048 ? t[i++] = r >> 6 | 192 : (r < 65536 ? t[i++] = r >> 12 | 224 : (t[i++] = r >> 18 | 240, t[i++] = r >> 12 & 63 | 128), t[i++] = r >> 6 & 63 | 128), t[i++] = 63 & r | 128)
                }
                return i
            }(this.buf, t, this.pos);
            var i = this.pos - e;
            128 <= i && qg(e, i, this), this.pos = e - 1, this.writeVarint(i), this.pos += i
        }, writeFloat: function (t) {
            this.realloc(4), Xg(this.buf, t, this.pos, !0, 23, 4), this.pos += 4
        }, writeDouble: function (t) {
            this.realloc(8), Xg(this.buf, t, this.pos, !0, 52, 8), this.pos += 8
        }, writeBytes: function (t) {
            var e = t.length;
            this.writeVarint(e), this.realloc(e);
            for (var i = 0; i < e; i++) this.buf[this.pos++] = t[i]
        }, writeRawMessage: function (t, e) {
            this.pos++;
            var i = this.pos;
            t(e, this);
            var r = this.pos - i;
            128 <= r && qg(i, r, this), this.pos = i - 1, this.writeVarint(r), this.pos += r
        }, writeMessage: function (t, e, i) {
            this.writeTag(t, Vg.Bytes), this.writeRawMessage(e, i)
        }, writePackedVarint: function (t, e) {
            this.writeMessage(t, Jg, e)
        }, writePackedSVarint: function (t, e) {
            this.writeMessage(t, Qg, e)
        }, writePackedBoolean: function (t, e) {
            this.writeMessage(t, ey, e)
        }, writePackedFloat: function (t, e) {
            this.writeMessage(t, $g, e)
        }, writePackedDouble: function (t, e) {
            this.writeMessage(t, ty, e)
        }, writePackedFixed32: function (t, e) {
            this.writeMessage(t, iy, e)
        }, writePackedSFixed32: function (t, e) {
            this.writeMessage(t, ry, e)
        }, writePackedFixed64: function (t, e) {
            this.writeMessage(t, ny, e)
        }, writePackedSFixed64: function (t, e) {
            this.writeMessage(t, oy, e)
        }, writeBytesField: function (t, e) {
            this.writeTag(t, Vg.Bytes), this.writeBytes(e)
        }, writeFixed32Field: function (t, e) {
            this.writeTag(t, Vg.Fixed32), this.writeFixed32(e)
        }, writeSFixed32Field: function (t, e) {
            this.writeTag(t, Vg.Fixed32), this.writeSFixed32(e)
        }, writeFixed64Field: function (t, e) {
            this.writeTag(t, Vg.Fixed64), this.writeFixed64(e)
        }, writeSFixed64Field: function (t, e) {
            this.writeTag(t, Vg.Fixed64), this.writeSFixed64(e)
        }, writeVarintField: function (t, e) {
            this.writeTag(t, Vg.Varint), this.writeVarint(e)
        }, writeSVarintField: function (t, e) {
            this.writeTag(t, Vg.Varint), this.writeSVarint(e)
        }, writeStringField: function (t, e) {
            this.writeTag(t, Vg.Bytes), this.writeString(e)
        }, writeFloatField: function (t, e) {
            this.writeTag(t, Vg.Fixed32), this.writeFloat(e)
        }, writeDoubleField: function (t, e) {
            this.writeTag(t, Vg.Fixed64), this.writeDouble(e)
        }, writeBooleanField: function (t, e) {
            this.writeVarintField(t, Boolean(e))
        }
    };
    var ly = [1, 0, 0, 1, 0, 0], uy = function (t, e, i, r, n) {
        this.extent_, this.id_ = n, this.type_ = t, this.flatCoordinates_ = e, this.flatInteriorPoints_ = null, this.flatMidpoints_ = null, this.ends_ = i, this.properties_ = r
    };
    uy.prototype.get = function (t) {
        return this.properties_[t]
    }, uy.prototype.getExtent = function () {
        return this.extent_ || (this.extent_ = this.type_ === Lt.POINT ? V(this.flatCoordinates_) : K(this.flatCoordinates_, 0, this.flatCoordinates_.length, 2)), this.extent_
    }, uy.prototype.getFlatInteriorPoint = function () {
        if (!this.flatInteriorPoints_) {
            var t = ot(this.getExtent());
            this.flatInteriorPoints_ = Br(this.flatCoordinates_, 0, this.ends_, 2, t, 0)
        }
        return this.flatInteriorPoints_
    }, uy.prototype.getFlatInteriorPoints = function () {
        if (!this.flatInteriorPoints_) {
            var t = nh(this.flatCoordinates_, 0, this.ends_, 2);
            this.flatInteriorPoints_ = Xr(this.flatCoordinates_, 0, this.ends_, 2, t)
        }
        return this.flatInteriorPoints_
    }, uy.prototype.getFlatMidpoint = function () {
        return this.flatMidpoints_ || (this.flatMidpoints_ = vn(this.flatCoordinates_, 0, this.flatCoordinates_.length, 2, .5)), this.flatMidpoints_
    }, uy.prototype.getFlatMidpoints = function () {
        if (!this.flatMidpoints_) {
            this.flatMidpoints_ = [];
            for (var t = this.flatCoordinates_, e = 0, i = this.ends_, r = 0, n = i.length; r < n; ++r) {
                var o = i[r], s = vn(t, e, o, 2, .5);
                pr(this.flatMidpoints_, s), e = o
            }
        }
        return this.flatMidpoints_
    }, uy.prototype.getId = function () {
        return this.id_
    }, uy.prototype.getOrientedFlatCoordinates = function () {
        return this.flatCoordinates_
    }, uy.prototype.getGeometry = function () {
        return this
    }, uy.prototype.getProperties = function () {
        return this.properties_
    }, uy.prototype.getStride = function () {
        return 2
    }, uy.prototype.getType = function () {
        return this.type_
    }, uy.prototype.transform = function (t, e) {
        var i = (t = ne(t)).getExtent(), r = t.getWorldExtent(), n = at(r) / at(i);
        Te(ly, r[0], r[3], n, -n, 0, 0, 0), Rt(this.flatCoordinates_, 0, this.flatCoordinates_.length, 2, ly, this.flatCoordinates_)
    }, uy.prototype.getEnds = uy.prototype.getEndss = function () {
        return this.ends_
    }, uy.prototype.getFlatCoordinates = uy.prototype.getOrientedFlatCoordinates, uy.prototype.getSimplifiedGeometry = uy.prototype.getGeometry, uy.prototype.getStyleFunction = L;
    var cy = function (i) {
        function t(t) {
            i.call(this);
            var e = t || {};
            this.dataProjection = new At({
                code: "",
                units: Ot.TILE_PIXELS
            }), this.featureClass_ = e.featureClass ? e.featureClass : uy, this.geometryName_ = e.geometryName, this.layerName_ = e.layerName ? e.layerName : "layer", this.layers_ = e.layers ? e.layers : null, this.extent_ = null
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.readRawGeometry_ = function (t, e, i, r) {
            t.pos = e.geometry;
            for (var n = t.readVarint() + t.pos, o = 1, s = 0, a = 0, h = 0, l = 0, u = 0; t.pos < n;) {
                if (!s) {
                    var c = t.readVarint();
                    o = 7 & c, s = c >> 3
                }
                s--, 1 === o || 2 === o ? (a += t.readSVarint(), h += t.readSVarint(), 1 === o && u < l && (r.push(l), u = l), i.push(a, h), l += 2) : 7 === o ? u < l && (i.push(i[u], i[u + 1]), l += 2) : Z(!1, 59)
            }
            u < l && (r.push(l), u = l)
        }, t.prototype.createFeature_ = function (t, e, i) {
            var r, n = e.type;
            if (0 === n) return null;
            var o = e.id, s = e.properties;
            s[this.layerName_] = e.layer.name;
            var a = [], h = [];
            this.readRawGeometry_(t, e, a, h);
            var l = function (t, e) {
                var i;
                1 === t ? i = 1 === e ? Lt.POINT : Lt.MULTI_POINT : 2 === t ? i = 1 === e ? Lt.LINE_STRING : Lt.MULTI_LINE_STRING : 3 === t && (i = Lt.POLYGON);
                return i
            }(n, h.length);
            if (this.featureClass_ === uy) r = new this.featureClass_(l, a, h, s, o); else {
                var u;
                if (l == Lt.POLYGON) {
                    for (var c = [], p = 0, d = 0, f = 0, _ = h.length; f < _; ++f) {
                        var g = h[f];
                        Hr(a, p, g, 2) || (c.push(h.slice(d, f)), d = f), p = g
                    }
                    u = 1 < c.length ? new oh(a, yr.XY, c) : new Qr(a, yr.XY, h)
                } else u = l === Lt.POINT ? new Dr(a, yr.XY) : l === Lt.LINE_STRING ? new Sn(a, yr.XY) : l === Lt.POLYGON ? new Qr(a, yr.XY, h) : l === Lt.MULTI_POINT ? new rh(a, yr.XY) : l === Lt.MULTI_LINE_STRING ? new ih(a, yr.XY, h) : null;
                r = new this.featureClass_, this.geometryName_ && r.setGeometryName(this.geometryName_);
                var y = Bp(u, !1, this.adaptOptions(i));
                r.setGeometry(y), r.setId(o), r.setProperties(s)
            }
            return r
        }, t.prototype.getLastExtent = function () {
            return this.extent_
        }, t.prototype.getType = function () {
            return ch.ARRAY_BUFFER
        }, t.prototype.readFeatures = function (t, e) {
            var i = this.layers_, r = new zg(t), n = r.readFields(py, {}), o = [];
            for (var s in n) if (!i || -1 != i.indexOf(s)) {
                for (var a = n[s], h = 0, l = a.length; h < l; ++h) {
                    var u = _y(r, a, h);
                    o.push(this.createFeature_(r, u))
                }
                this.extent_ = a ? [0, 0, a.extent, a.extent] : null
            }
            return o
        }, t.prototype.readProjection = function (t) {
            return this.dataProjection
        }, t.prototype.setLayers = function (t) {
            this.layers_ = t
        }, t
    }(Yp);

    function py(t, e, i) {
        if (3 === t) {
            var r = {keys: [], values: [], features: []}, n = i.readVarint() + i.pos;
            i.readFields(dy, r, n), r.length = r.features.length, r.length && (e[r.name] = r)
        }
    }

    function dy(t, e, i) {
        if (15 === t) e.version = i.readVarint(); else if (1 === t) e.name = i.readString(); else if (5 === t) e.extent = i.readVarint(); else if (2 === t) e.features.push(i.pos); else if (3 === t) e.keys.push(i.readString()); else if (4 === t) {
            for (var r = null, n = i.readVarint() + i.pos; i.pos < n;) r = 1 === (t = i.readVarint() >> 3) ? i.readString() : 2 === t ? i.readFloat() : 3 === t ? i.readDouble() : 4 === t ? i.readVarint64() : 5 === t ? i.readVarint() : 6 === t ? i.readSVarint() : 7 === t ? i.readBoolean() : null;
            e.values.push(r)
        }
    }

    function fy(t, e, i) {
        if (1 == t) e.id = i.readVarint(); else if (2 == t) for (var r = i.readVarint() + i.pos; i.pos < r;) {
            var n = e.layer.keys[i.readVarint()], o = e.layer.values[i.readVarint()];
            e.properties[n] = o
        } else 3 == t ? e.type = i.readVarint() : 4 == t && (e.geometry = i.pos)
    }

    function _y(t, e, i) {
        t.pos = e.features[i];
        var r = t.readVarint() + t.pos, n = {layer: e, type: 0, properties: {}};
        return t.readFields(fy, n, r), n
    }

    var gy = [null], yy = _d(gy, {
        nd: function (t, e) {
            e[e.length - 1].ndrefs.push(t.getAttribute("ref"))
        }, tag: Sy
    }), vy = _d(gy, {
        node: function (t, e) {
            var i = e[0], r = e[e.length - 1], n = t.getAttribute("id"),
                o = [parseFloat(t.getAttribute("lon")), parseFloat(t.getAttribute("lat"))];
            r.nodes[n] = o;
            var s = yd({tags: {}}, xy, t, e);
            if (!Tt(s.tags)) {
                var a = new Dr(o);
                Bp(a, !1, i);
                var h = new Ji(a);
                h.setId(n), h.setProperties(s.tags), r.features.push(h)
            }
        }, way: function (t, e) {
            var i = yd({id: t.getAttribute("id"), ndrefs: [], tags: {}}, yy, t, e);
            e[e.length - 1].ways.push(i)
        }
    }), my = function (t) {
        function e() {
            t.call(this), this.dataProjection = ne("EPSG:4326")
        }

        return t && (e.__proto__ = t), ((e.prototype = Object.create(t && t.prototype)).constructor = e).prototype.readFeaturesFromNode = function (t, e) {
            var i = this.getReadOptions(t, e);
            if ("osm" == t.localName) {
                for (var r = yd({nodes: {}, ways: [], features: []}, vy, t, [i]), n = 0; n < r.ways.length; n++) {
                    for (var o = r.ways[n], s = [], a = 0, h = o.ndrefs.length; a < h; a++) {
                        pr(s, r.nodes[o.ndrefs[a]])
                    }
                    var l = void 0;
                    Bp(l = o.ndrefs[0] == o.ndrefs[o.ndrefs.length - 1] ? new Qr(s, yr.XY, [s.length]) : new Sn(s, yr.XY), !1, i);
                    var u = new Ji(l);
                    u.setId(o.id), u.setProperties(o.tags), r.features.push(u)
                }
                if (r.features) return r.features
            }
            return []
        }, e
    }(xd), xy = _d(gy, {tag: Sy});

    function Sy(t, e) {
        e[e.length - 1].tags[t.getAttribute("k")] = t.getAttribute("v")
    }

    function Ey(t, e, i, r, n, o) {
        var s, a;
        void 0 !== n ? (s = n, a = void 0 !== o ? o : 0) : (s = [], a = 0);
        for (var h = e; h < i;) {
            var l = t[h++];
            s[a++] = t[h++], s[a++] = l;
            for (var u = 2; u < r; ++u) s[a++] = t[h++]
        }
        return s.length = a, s
    }

    var Cy = function (i) {
        function t(t) {
            i.call(this);
            var e = t || {};
            this.dataProjection = ne("EPSG:4326"), this.factor_ = e.factor ? e.factor : 1e5, this.geometryLayout_ = e.geometryLayout ? e.geometryLayout : yr.XY
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.readFeatureFromText = function (t, e) {
            var i = this.readGeometryFromText(t, e);
            return new Ji(i)
        }, t.prototype.readFeaturesFromText = function (t, e) {
            return [this.readFeatureFromText(t, e)]
        }, t.prototype.readGeometryFromText = function (t, e) {
            var i = mr(this.geometryLayout_), r = wy(t, i, this.factor_);
            Ey(r, 0, r.length, i, r);
            var n = Fr(r, 0, r.length, i);
            return Bp(new Sn(n, this.geometryLayout_), !1, this.adaptOptions(e))
        }, t.prototype.writeFeatureText = function (t, e) {
            var i = t.getGeometry();
            return i ? this.writeGeometryText(i, e) : (Z(!1, 40), "")
        }, t.prototype.writeFeaturesText = function (t, e) {
            return this.writeFeatureText(t[0], e)
        }, t.prototype.writeGeometryText = function (t, e) {
            var i = (t = Bp(t, !0, this.adaptOptions(e))).getFlatCoordinates(), r = t.getStride();
            return Ey(i, 0, i.length, r, i), Ty(i, r, this.factor_)
        }, t
    }(Pf);

    function Ty(t, e, i) {
        var r, n = i || 1e5, o = new Array(e);
        for (r = 0; r < e; ++r) o[r] = 0;
        for (var s = 0, a = t.length; s < a;) for (r = 0; r < e; ++r, ++s) {
            var h = t[s], l = h - o[r];
            o[r] = h, t[s] = l
        }
        return Ry(t, n)
    }

    function wy(t, e, i) {
        var r, n = i || 1e5, o = new Array(e);
        for (r = 0; r < e; ++r) o[r] = 0;
        for (var s = Iy(t, n), a = 0, h = s.length; a < h;) for (r = 0; r < e; ++r, ++a) o[r] += s[a], s[a] = o[r];
        return s
    }

    function Ry(t, e) {
        for (var i = e || 1e5, r = 0, n = t.length; r < n; ++r) t[r] = Math.round(t[r] * i);
        return function (t) {
            for (var e = 0, i = t.length; e < i; ++e) {
                var r = t[e];
                t[e] = r < 0 ? ~(r << 1) : r << 1
            }
            return function (t) {
                for (var e = "", i = 0, r = t.length; i < r; ++i) e += Ly(t[i]);
                return e
            }(t)
        }(t)
    }

    function Iy(t, e) {
        for (var i = e || 1e5, r = function (t) {
            for (var e = function (t) {
                for (var e = [], i = 0, r = 0, n = 0, o = t.length; n < o; ++n) {
                    var s = t.charCodeAt(n) - 63;
                    i |= (31 & s) << r, s < 32 ? (e.push(i), r = i = 0) : r += 5
                }
                return e
            }(t), i = 0, r = e.length; i < r; ++i) {
                var n = e[i];
                e[i] = 1 & n ? ~(n >> 1) : n >> 1
            }
            return e
        }(t), n = 0, o = r.length; n < o; ++n) r[n] /= i;
        return r
    }

    function Ly(t) {
        for (var e, i = ""; 32 <= t;) e = 63 + (32 | 31 & t), i += String.fromCharCode(e), t >>= 5;
        return e = t + 63, i += String.fromCharCode(e)
    }

    var by = function (i) {
        function t(t) {
            i.call(this);
            var e = t || {};
            this.layerName_ = e.layerName, this.layers_ = e.layers ? e.layers : null, this.dataProjection = ne(e.dataProjection ? e.dataProjection : "EPSG:4326")
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.readFeaturesFromObject = function (t, e) {
            if ("Topology" == t.type) {
                var i, r = t, n = null, o = null;
                r.transform && (n = (i = r.transform).scale, o = i.translate);
                var s = r.arcs;
                i && function (t, e, i) {
                    for (var r = 0, n = t.length; r < n; ++r) Ny(t[r], e, i)
                }(s, n, o);
                var a, h = [], l = r.objects, u = this.layerName_;
                for (var c in l) this.layers_ && -1 == this.layers_.indexOf(c) || ("GeometryCollection" === l[c].type ? (a = l[c], h.push.apply(h, My(a, s, n, o, u, c, e))) : (a = l[c], h.push(Oy(a, s, n, o, u, c, e))));
                return h
            }
            return []
        }, t.prototype.readProjectionFromObject = function (t) {
            return this.dataProjection
        }, t
    }(Xp), Fy = {
        Point: function (t, e, i) {
            var r = t.coordinates;
            e && i && Ay(r, e, i);
            return new Dr(r)
        }, LineString: function (t, e) {
            var i = Py(t.arcs, e);
            return new Sn(i)
        }, Polygon: function (t, e) {
            for (var i = [], r = 0, n = t.arcs.length; r < n; ++r) i[r] = Py(t.arcs[r], e);
            return new Qr(i)
        }, MultiPoint: function (t, e, i) {
            var r = t.coordinates;
            if (e && i) for (var n = 0, o = r.length; n < o; ++n) Ay(r[n], e, i);
            return new rh(r)
        }, MultiLineString: function (t, e) {
            for (var i = [], r = 0, n = t.arcs.length; r < n; ++r) i[r] = Py(t.arcs[r], e);
            return new ih(i)
        }, MultiPolygon: function (t, e) {
            for (var i = [], r = 0, n = t.arcs.length; r < n; ++r) {
                for (var o = t.arcs[r], s = [], a = 0, h = o.length; a < h; ++a) s[a] = Py(o[a], e);
                i[r] = s
            }
            return new oh(i)
        }
    };

    function Py(t, e) {
        for (var i, r, n = [], o = 0, s = t.length; o < s; ++o) i = t[o], 0 < o && n.pop(), r = 0 <= i ? e[i] : e[~i].slice().reverse(), n.push.apply(n, r);
        for (var a = 0, h = n.length; a < h; ++a) n[a] = n[a].slice();
        return n
    }

    function My(t, e, i, r, n, o, s) {
        for (var a = t.geometries, h = [], l = 0, u = a.length; l < u; ++l) h[l] = Oy(a[l], e, i, r, n, o, s);
        return h
    }

    function Oy(t, e, i, r, n, o, s) {
        var a, h = t.type, l = Fy[h];
        a = "Point" === h || "MultiPoint" === h ? l(t, i, r) : l(t, e);
        var u = new Ji;
        u.setGeometry(Bp(a, !1, s)), void 0 !== t.id && u.setId(t.id);
        var c = t.properties;
        return n && (c || (c = {}), c[n] = o), c && u.setProperties(c), u
    }

    function Ny(t, e, i) {
        for (var r = 0, n = 0, o = 0, s = t.length; o < s; ++o) {
            var a = t[o];
            r += a[0], n += a[1], a[0] = r, a[1] = n, Ay(a, e, i)
        }
    }

    function Ay(t, e, i) {
        t[0] = t[0] * e[0] + i[0], t[1] = t[1] * e[1] + i[1]
    }

    var Gy = function (t) {
        this.tagName_ = t
    };
    Gy.prototype.getTagName = function () {
        return this.tagName_
    };
    var ky = function (i) {
        function t(t, e) {
            i.call(this, t), this.conditions = Array.prototype.slice.call(arguments, 1), Z(2 <= this.conditions.length, 57)
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(Gy), Dy = function (i) {
        function t(t) {
            var e = ["And"].concat(Array.prototype.slice.call(arguments));
            i.apply(this, e)
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(ky), jy = function (r) {
        function t(t, e, i) {
            r.call(this, "BBOX"), this.geometryName = t, this.extent = e, this.srsName = i
        }

        return r && (t.__proto__ = r), (t.prototype = Object.create(r && r.prototype)).constructor = t
    }(Gy), Uy = function (n) {
        function t(t, e, i, r) {
            n.call(this, t), this.geometryName = e || "the_geom", this.geometry = i, this.srsName = r
        }

        return n && (t.__proto__ = n), (t.prototype = Object.create(n && n.prototype)).constructor = t
    }(Gy), Yy = function (r) {
        function t(t, e, i) {
            r.call(this, "Contains", t, e, i)
        }

        return r && (t.__proto__ = r), (t.prototype = Object.create(r && r.prototype)).constructor = t
    }(Uy), By = function (i) {
        function t(t, e) {
            i.call(this, t), this.propertyName = e
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(Gy), Xy = function (r) {
        function t(t, e, i) {
            r.call(this, "During", t), this.begin = e, this.end = i
        }

        return r && (t.__proto__ = r), (t.prototype = Object.create(r && r.prototype)).constructor = t
    }(By), zy = function (n) {
        function t(t, e, i, r) {
            n.call(this, t, e), this.expression = i, this.matchCase = r
        }

        return n && (t.__proto__ = n), (t.prototype = Object.create(n && n.prototype)).constructor = t
    }(By), Vy = function (r) {
        function t(t, e, i) {
            r.call(this, "PropertyIsEqualTo", t, e, i)
        }

        return r && (t.__proto__ = r), (t.prototype = Object.create(r && r.prototype)).constructor = t
    }(zy), Wy = function (i) {
        function t(t, e) {
            i.call(this, "PropertyIsGreaterThan", t, e)
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(zy), Ky = function (i) {
        function t(t, e) {
            i.call(this, "PropertyIsGreaterThanOrEqualTo", t, e)
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(zy), Hy = function (r) {
        function t(t, e, i) {
            r.call(this, "Intersects", t, e, i)
        }

        return r && (t.__proto__ = r), (t.prototype = Object.create(r && r.prototype)).constructor = t
    }(Uy), Zy = function (r) {
        function t(t, e, i) {
            r.call(this, "PropertyIsBetween", t), this.lowerBoundary = e, this.upperBoundary = i
        }

        return r && (t.__proto__ = r), (t.prototype = Object.create(r && r.prototype)).constructor = t
    }(By), qy = function (s) {
        function t(t, e, i, r, n, o) {
            s.call(this, "PropertyIsLike", t), this.pattern = e, this.wildCard = void 0 !== i ? i : "*", this.singleChar = void 0 !== r ? r : ".", this.escapeChar = void 0 !== n ? n : "!", this.matchCase = o
        }

        return s && (t.__proto__ = s), (t.prototype = Object.create(s && s.prototype)).constructor = t
    }(By), Jy = function (e) {
        function t(t) {
            e.call(this, "PropertyIsNull", t)
        }

        return e && (t.__proto__ = e), (t.prototype = Object.create(e && e.prototype)).constructor = t
    }(By), Qy = function (i) {
        function t(t, e) {
            i.call(this, "PropertyIsLessThan", t, e)
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(zy), $y = function (i) {
        function t(t, e) {
            i.call(this, "PropertyIsLessThanOrEqualTo", t, e)
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(zy), tv = function (e) {
        function t(t) {
            e.call(this, "Not"), this.condition = t
        }

        return e && (t.__proto__ = e), (t.prototype = Object.create(e && e.prototype)).constructor = t
    }(Gy), ev = function (r) {
        function t(t, e, i) {
            r.call(this, "PropertyIsNotEqualTo", t, e, i)
        }

        return r && (t.__proto__ = r), (t.prototype = Object.create(r && r.prototype)).constructor = t
    }(zy), iv = function (i) {
        function t(t) {
            var e = ["Or"].concat(Array.prototype.slice.call(arguments));
            i.apply(this, e)
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(ky), rv = function (r) {
        function t(t, e, i) {
            r.call(this, "Within", t, e, i)
        }

        return r && (t.__proto__ = r), (t.prototype = Object.create(r && r.prototype)).constructor = t
    }(Uy);

    function nv(t) {
        var e = [null].concat(Array.prototype.slice.call(arguments));
        return new (Function.prototype.bind.apply(Dy, e))
    }

    function ov(t, e, i) {
        return new jy(t, e, i)
    }

    var sv = {"http://www.opengis.net/gml": {boundedBy: ld(Cd.prototype.readGeometryElement, "bounds")}},
        av = {"http://www.opengis.net/wfs": {totalInserted: ld(bd), totalUpdated: ld(bd), totalDeleted: ld(bd)}}, hv = {
            "http://www.opengis.net/wfs": {
                TransactionSummary: ld(function (t, e) {
                    return yd({}, av, t, e)
                }, "transactionSummary"), InsertResults: ld(function (t, e) {
                    return yd([], vv, t, e)
                }, "insertIds")
            }
        }, lv = {"http://www.opengis.net/wfs": {PropertyName: ud(Ad)}}, uv = {
            "http://www.opengis.net/wfs": {
                Insert: ud(function (t, e, i) {
                    var r = i[i.length - 1], n = r.featureType, o = r.featureNS, s = r.gmlVersion, a = td(o, n);
                    t.appendChild(a), 2 === s ? Bd.prototype.writeFeatureElement(a, e, i) : Dd.prototype.writeFeatureElement(a, e, i)
                }), Update: ud(function (t, e, i) {
                    var r = i[i.length - 1];
                    Z(void 0 !== e.getId(), 27);
                    var n = r.featureType, o = r.featurePrefix, s = r.featureNS, a = xv(o, n), h = e.getGeometryName();
                    t.setAttribute("typeName", a), t.setAttributeNS(pv, "xmlns:" + o, s);
                    var l = e.getId();
                    if (void 0 !== l) {
                        for (var u = e.getKeys(), c = [], p = 0, d = u.length; p < d; p++) {
                            var f = e.get(u[p]);
                            if (void 0 !== f) {
                                var _ = u[p];
                                f instanceof Ie && (_ = h), c.push({name: _, value: f})
                            }
                        }
                        md({
                            gmlVersion: r.gmlVersion,
                            node: t,
                            hasZ: r.hasZ,
                            srsName: r.srsName
                        }, uv, pd("Property"), c, i), mv(t, l, i)
                    }
                }), Delete: ud(function (t, e, i) {
                    var r = i[i.length - 1];
                    Z(void 0 !== e.getId(), 26);
                    var n = r.featureType, o = r.featurePrefix, s = r.featureNS, a = xv(o, n);
                    t.setAttribute("typeName", a), t.setAttributeNS(pv, "xmlns:" + o, s);
                    var h = e.getId();
                    void 0 !== h && mv(t, h, i)
                }), Property: ud(function (t, e, i) {
                    var r = td(fv, "Name"), n = i[i.length - 1].gmlVersion;
                    if (t.appendChild(r), Ad(r, e.name), void 0 !== e.value && null !== e.value) {
                        var o = td(fv, "Value");
                        t.appendChild(o), e.value instanceof Ie ? 2 === n ? Bd.prototype.writeGeometryElement(o, e.value, i) : Dd.prototype.writeGeometryElement(o, e.value, i) : Ad(o, e.value)
                    }
                }), Native: ud(function (t, e, i) {
                    e.vendorId && t.setAttribute("vendorId", e.vendorId);
                    void 0 !== e.safeToIgnore && t.setAttribute("safeToIgnore", e.safeToIgnore);
                    void 0 !== e.value && Ad(t, e.value)
                })
            }
        }, cv = "feature", pv = "http://www.w3.org/2000/xmlns/", dv = "http://www.opengis.net/ogc",
        fv = "http://www.opengis.net/wfs", _v = {
            "1.1.0": "http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd",
            "1.0.0": "http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd"
        }, gv = function (i) {
            function t(t) {
                i.call(this);
                var e = t || {};
                this.featureType_ = e.featureType, this.featureNS_ = e.featureNS, this.gmlFormat_ = e.gmlFormat ? e.gmlFormat : new Dd, this.schemaLocation_ = e.schemaLocation ? e.schemaLocation : _v["1.1.0"]
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.getFeatureType = function () {
                return this.featureType_
            }, t.prototype.setFeatureType = function (t) {
                this.featureType_ = t
            }, t.prototype.readFeaturesFromNode = function (t, e) {
                var i = {featureType: this.featureType_, featureNS: this.featureNS_};
                E(i, this.getReadOptions(t, e || {}));
                var r = [i];
                this.gmlFormat_.FEATURE_COLLECTION_PARSERS[Sd].featureMember = sd(Cd.prototype.readFeaturesInternal);
                var n = yd([], this.gmlFormat_.FEATURE_COLLECTION_PARSERS, t, r, this.gmlFormat_);
                return n || (n = []), n
            }, t.prototype.readTransactionResponse = function (t) {
                if (id(t)) return this.readTransactionResponseFromDocument(t);
                if (rd(t)) return this.readTransactionResponseFromNode(t);
                if ("string" == typeof t) {
                    var e = nd(t);
                    return this.readTransactionResponseFromDocument(e)
                }
            }, t.prototype.readFeatureCollectionMetadata = function (t) {
                if (id(t)) return this.readFeatureCollectionMetadataFromDocument(t);
                if (rd(t)) return this.readFeatureCollectionMetadataFromNode(t);
                if ("string" == typeof t) {
                    var e = nd(t);
                    return this.readFeatureCollectionMetadataFromDocument(e)
                }
            }, t.prototype.readFeatureCollectionMetadataFromDocument = function (t) {
                for (var e = t.firstChild; e; e = e.nextSibling) if (e.nodeType == Node.ELEMENT_NODE) return this.readFeatureCollectionMetadataFromNode(e)
            }, t.prototype.readFeatureCollectionMetadataFromNode = function (t) {
                var e = {}, i = Fd(t.getAttribute("numberOfFeatures"));
                return e.numberOfFeatures = i, yd(e, sv, t, [], this.gmlFormat_)
            }, t.prototype.readTransactionResponseFromDocument = function (t) {
                for (var e = t.firstChild; e; e = e.nextSibling) if (e.nodeType == Node.ELEMENT_NODE) return this.readTransactionResponseFromNode(e)
            }, t.prototype.readTransactionResponseFromNode = function (t) {
                return yd({}, hv, t, [])
            }, t.prototype.writeGetFeature = function (t) {
                var e, i = td(fv, "GetFeature");
                if (i.setAttribute("service", "WFS"), i.setAttribute("version", "1.1.0"), t && (t.handle && i.setAttribute("handle", t.handle), t.outputFormat && i.setAttribute("outputFormat", t.outputFormat), void 0 !== t.maxFeatures && i.setAttribute("maxFeatures", t.maxFeatures), t.resultType && i.setAttribute("resultType", t.resultType), void 0 !== t.startIndex && i.setAttribute("startIndex", t.startIndex), void 0 !== t.count && i.setAttribute("count", t.count), e = t.filter, t.bbox)) {
                    Z(t.geometryName, 12);
                    var r = ov(t.geometryName, t.bbox, t.srsName);
                    e = e ? nv(e, r) : r
                }
                i.setAttributeNS($p, "xsi:schemaLocation", this.schemaLocation_);
                var n, o, s, a, h, l = {
                    node: i,
                    srsName: t.srsName,
                    featureNS: t.featureNS ? t.featureNS : this.featureNS_,
                    featurePrefix: t.featurePrefix,
                    geometryName: t.geometryName,
                    filter: e,
                    propertyNames: t.propertyNames ? t.propertyNames : []
                };
                return Z(Array.isArray(t.featureTypes), 11), n = i, o = t.featureTypes, a = (s = [l])[s.length - 1], (h = E({}, a)).node = n, md(h, Sv, pd("Query"), o, s), i
            }, t.prototype.writeTransaction = function (t, e, i, r) {
                var n, o, s = [], a = td(fv, "Transaction"), h = r.version ? r.version : "1.1.0", l = "1.0.0" === h ? 2 : 3;
                a.setAttribute("service", "WFS"), a.setAttribute("version", h), r && (n = r.gmlOptions ? r.gmlOptions : {}, r.handle && a.setAttribute("handle", r.handle));
                var u = _v[h];
                a.setAttributeNS($p, "xsi:schemaLocation", u);
                var c = r.featurePrefix ? r.featurePrefix : cv;
                return t && (o = {
                    node: a,
                    featureNS: r.featureNS,
                    featureType: r.featureType,
                    featurePrefix: c,
                    gmlVersion: l,
                    hasZ: r.hasZ,
                    srsName: r.srsName
                }, E(o, n), md(o, uv, pd("Insert"), t, s)), e && (o = {
                    node: a,
                    featureNS: r.featureNS,
                    featureType: r.featureType,
                    featurePrefix: c,
                    gmlVersion: l,
                    hasZ: r.hasZ,
                    srsName: r.srsName
                }, E(o, n), md(o, uv, pd("Update"), e, s)), i && md({
                    node: a,
                    featureNS: r.featureNS,
                    featureType: r.featureType,
                    featurePrefix: c,
                    gmlVersion: l,
                    srsName: r.srsName
                }, uv, pd("Delete"), i, s), r.nativeElements && md({
                    node: a,
                    featureNS: r.featureNS,
                    featureType: r.featureType,
                    featurePrefix: c,
                    gmlVersion: l,
                    srsName: r.srsName
                }, uv, pd("Native"), r.nativeElements, s), a
            }, t.prototype.readProjectionFromDocument = function (t) {
                for (var e = t.firstChild; e; e = e.nextSibling) if (e.nodeType == Node.ELEMENT_NODE) return this.readProjectionFromNode(e);
                return null
            }, t.prototype.readProjectionFromNode = function (t) {
                if (t.firstElementChild && t.firstElementChild.firstElementChild) for (var e = (t = t.firstElementChild.firstElementChild).firstElementChild; e; e = e.nextElementSibling) if (0 !== e.childNodes.length && (1 !== e.childNodes.length || 3 !== e.firstChild.nodeType)) {
                    var i = [{}];
                    return this.gmlFormat_.readGeometryElement(e, i), ne(i.pop().srsName)
                }
                return null
            }, t
        }(xd);
    var yv = {
        "http://www.opengis.net/ogc": {
            FeatureId: sd(function (t, e) {
                return t.getAttribute("fid")
            })
        }
    };
    var vv = {
        "http://www.opengis.net/wfs": {
            Feature: function (t, e) {
                gd(yv, t, e)
            }
        }
    };

    function mv(t, e, i) {
        var r = td(dv, "Filter"), n = td(dv, "FeatureId");
        r.appendChild(n), n.setAttribute("fid", e), t.appendChild(r)
    }

    function xv(t, e) {
        var i = (t = t || cv) + ":";
        return 0 === e.indexOf(i) ? e : i + e
    }

    var Sv = {
        "http://www.opengis.net/wfs": {
            Query: ud(function (t, e, i) {
                var r, n = i[i.length - 1], o = n.featurePrefix, s = n.featureNS, a = n.propertyNames, h = n.srsName;
                r = o ? xv(o, e) : e;
                t.setAttribute("typeName", r), h && t.setAttribute("srsName", h);
                s && t.setAttributeNS(pv, "xmlns:" + o, s);
                var l = E({}, n);
                l.node = t, md(l, lv, pd("PropertyName"), a, i);
                var u = n.filter;
                if (u) {
                    var c = td(dv, "Filter");
                    t.appendChild(c), Ev(c, u, i)
                }
            })
        }, "http://www.opengis.net/ogc": {
            During: ud(function (t, e, i) {
                var r = td("http://www.opengis.net/fes", "ValueReference");
                Ad(r, e.propertyName), t.appendChild(r);
                var n = td(Sd, "TimePeriod");
                t.appendChild(n);
                var o = td(Sd, "begin");
                n.appendChild(o), Lv(o, e.begin);
                var s = td(Sd, "end");
                n.appendChild(s), Lv(s, e.end)
            }),
            And: ud(Cv),
            Or: ud(Cv),
            Not: ud(function (t, e, i) {
                var r = {node: t}, n = e.condition;
                md(r, Sv, pd(n.getTagName()), [n], i)
            }),
            BBOX: ud(function (t, e, i) {
                i[i.length - 1].srsName = e.srsName, Rv(t, e.geometryName), Dd.prototype.writeGeometryElement(t, e.extent, i)
            }),
            Contains: ud(function (t, e, i) {
                i[i.length - 1].srsName = e.srsName, Rv(t, e.geometryName), Dd.prototype.writeGeometryElement(t, e.geometry, i)
            }),
            Intersects: ud(function (t, e, i) {
                i[i.length - 1].srsName = e.srsName, Rv(t, e.geometryName), Dd.prototype.writeGeometryElement(t, e.geometry, i)
            }),
            Within: ud(function (t, e, i) {
                i[i.length - 1].srsName = e.srsName, Rv(t, e.geometryName), Dd.prototype.writeGeometryElement(t, e.geometry, i)
            }),
            PropertyIsEqualTo: ud(Tv),
            PropertyIsNotEqualTo: ud(Tv),
            PropertyIsLessThan: ud(Tv),
            PropertyIsLessThanOrEqualTo: ud(Tv),
            PropertyIsGreaterThan: ud(Tv),
            PropertyIsGreaterThanOrEqualTo: ud(Tv),
            PropertyIsNull: ud(function (t, e, i) {
                Rv(t, e.propertyName)
            }),
            PropertyIsBetween: ud(function (t, e, i) {
                Rv(t, e.propertyName);
                var r = td(dv, "LowerBoundary");
                t.appendChild(r), Iv(r, "" + e.lowerBoundary);
                var n = td(dv, "UpperBoundary");
                t.appendChild(n), Iv(n, "" + e.upperBoundary)
            }),
            PropertyIsLike: ud(function (t, e, i) {
                t.setAttribute("wildCard", e.wildCard), t.setAttribute("singleChar", e.singleChar), t.setAttribute("escapeChar", e.escapeChar), void 0 !== e.matchCase && t.setAttribute("matchCase", e.matchCase.toString());
                Rv(t, e.propertyName), Iv(t, "" + e.pattern)
            })
        }
    };

    function Ev(t, e, i) {
        md({node: t}, Sv, pd(e.getTagName()), [e], i)
    }

    function Cv(t, e, i) {
        for (var r = {node: t}, n = e.conditions, o = 0, s = n.length; o < s; ++o) {
            var a = n[o];
            md(r, Sv, pd(a.getTagName()), [a], i)
        }
    }

    function Tv(t, e, i) {
        void 0 !== e.matchCase && t.setAttribute("matchCase", e.matchCase.toString()), Rv(t, e.propertyName), Iv(t, "" + e.expression)
    }

    function wv(t, e, i) {
        var r = td(dv, t);
        Ad(r, i), e.appendChild(r)
    }

    function Rv(t, e) {
        wv("PropertyName", t, e)
    }

    function Iv(t, e) {
        wv("Literal", t, e)
    }

    function Lv(t, e) {
        var i = td(Sd, "TimeInstant");
        t.appendChild(i);
        var r = td(Sd, "timePosition");
        i.appendChild(r), Ad(r, e)
    }

    var bv = {POINT: Dr, LINESTRING: Sn, POLYGON: Qr, MULTIPOINT: rh, MULTILINESTRING: ih, MULTIPOLYGON: oh},
        Fv = "EMPTY", Pv = "Z", Mv = "M", Ov = 1, Nv = 2, Av = 3, Gv = 4, kv = 5, Dv = 6, jv = {};
    for (var Uv in Lt) jv[Uv] = Lt[Uv].toUpperCase();
    var Yv = function (t) {
        this.wkt = t, this.index_ = -1
    };
    Yv.prototype.isAlpha_ = function (t) {
        return "a" <= t && t <= "z" || "A" <= t && t <= "Z"
    }, Yv.prototype.isNumeric_ = function (t, e) {
        return "0" <= t && t <= "9" || "." == t && !(void 0 !== e && e)
    }, Yv.prototype.isWhiteSpace_ = function (t) {
        return " " == t || "\t" == t || "\r" == t || "\n" == t
    }, Yv.prototype.nextChar_ = function () {
        return this.wkt.charAt(++this.index_)
    }, Yv.prototype.nextToken = function () {
        var t = this.nextChar_(), e = {position: this.index_, value: t};
        if ("(" == t) e.type = Nv; else if ("," == t) e.type = kv; else if (")" == t) e.type = Av; else if (this.isNumeric_(t) || "-" == t) e.type = Gv, e.value = this.readNumber_(); else if (this.isAlpha_(t)) e.type = Ov, e.value = this.readText_(); else {
            if (this.isWhiteSpace_(t)) return this.nextToken();
            if ("" !== t) throw new Error("Unexpected character: " + t);
            e.type = Dv
        }
        return e
    }, Yv.prototype.readNumber_ = function () {
        for (var t, e = this.index_, i = !1, r = !1; "." == t ? i = !0 : "e" != t && "E" != t || (r = !0), t = this.nextChar_(), this.isNumeric_(t, i) || !r && ("e" == t || "E" == t) || r && ("-" == t || "+" == t);) ;
        return parseFloat(this.wkt.substring(e, this.index_--))
    }, Yv.prototype.readText_ = function () {
        for (var t, e = this.index_; t = this.nextChar_(), this.isAlpha_(t);) ;
        return this.wkt.substring(e, this.index_--).toUpperCase()
    };
    var Bv = function (t) {
        this.lexer_ = t, this.token_, this.layout_ = yr.XY
    };
    Bv.prototype.consume_ = function () {
        this.token_ = this.lexer_.nextToken()
    }, Bv.prototype.isTokenType = function (t) {
        return this.token_.type == t
    }, Bv.prototype.match = function (t) {
        var e = this.isTokenType(t);
        return e && this.consume_(), e
    }, Bv.prototype.parse = function () {
        return this.consume_(), this.parseGeometry_()
    }, Bv.prototype.parseGeometryLayout_ = function () {
        var t = yr.XY, e = this.token_;
        if (this.isTokenType(Ov)) {
            var i = e.value;
            i === Pv ? t = yr.XYZ : i === Mv ? t = yr.XYM : "ZM" === i && (t = yr.XYZM), t !== yr.XY && this.consume_()
        }
        return t
    }, Bv.prototype.parseGeometryCollectionText_ = function () {
        if (this.match(Nv)) {
            for (var t = []; t.push(this.parseGeometry_()), this.match(kv);) ;
            if (this.match(Av)) return t
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_())
    }, Bv.prototype.parsePointText_ = function () {
        if (this.match(Nv)) {
            var t = this.parsePoint_();
            if (this.match(Av)) return t
        } else if (this.isEmptyGeometry_()) return null;
        throw new Error(this.formatErrorMessage_())
    }, Bv.prototype.parseLineStringText_ = function () {
        if (this.match(Nv)) {
            var t = this.parsePointList_();
            if (this.match(Av)) return t
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_())
    }, Bv.prototype.parsePolygonText_ = function () {
        if (this.match(Nv)) {
            var t = this.parseLineStringTextList_();
            if (this.match(Av)) return t
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_())
    }, Bv.prototype.parseMultiPointText_ = function () {
        var t;
        if (this.match(Nv)) {
            if (t = this.token_.type == Nv ? this.parsePointTextList_() : this.parsePointList_(), this.match(Av)) return t
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_())
    }, Bv.prototype.parseMultiLineStringText_ = function () {
        if (this.match(Nv)) {
            var t = this.parseLineStringTextList_();
            if (this.match(Av)) return t
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_())
    }, Bv.prototype.parseMultiPolygonText_ = function () {
        if (this.match(Nv)) {
            var t = this.parsePolygonTextList_();
            if (this.match(Av)) return t
        } else if (this.isEmptyGeometry_()) return [];
        throw new Error(this.formatErrorMessage_())
    }, Bv.prototype.parsePoint_ = function () {
        for (var t = [], e = this.layout_.length, i = 0; i < e; ++i) {
            var r = this.token_;
            if (!this.match(Gv)) break;
            t.push(r.value)
        }
        if (t.length == e) return t;
        throw new Error(this.formatErrorMessage_())
    }, Bv.prototype.parsePointList_ = function () {
        for (var t = [this.parsePoint_()]; this.match(kv);) t.push(this.parsePoint_());
        return t
    }, Bv.prototype.parsePointTextList_ = function () {
        for (var t = [this.parsePointText_()]; this.match(kv);) t.push(this.parsePointText_());
        return t
    }, Bv.prototype.parseLineStringTextList_ = function () {
        for (var t = [this.parseLineStringText_()]; this.match(kv);) t.push(this.parseLineStringText_());
        return t
    }, Bv.prototype.parsePolygonTextList_ = function () {
        for (var t = [this.parsePolygonText_()]; this.match(kv);) t.push(this.parsePolygonText_());
        return t
    }, Bv.prototype.isEmptyGeometry_ = function () {
        var t = this.isTokenType(Ov) && this.token_.value == Fv;
        return t && this.consume_(), t
    }, Bv.prototype.formatErrorMessage_ = function () {
        return "Unexpected `" + this.token_.value + "` at position " + this.token_.position + " in `" + this.lexer_.wkt + "`"
    }, Bv.prototype.parseGeometry_ = function () {
        var t = this.token_;
        if (this.match(Ov)) {
            var e = t.value;
            if (this.layout_ = this.parseGeometryLayout_(), "GEOMETRYCOLLECTION" == e) {
                var i = this.parseGeometryCollectionText_();
                return new Tf(i)
            }
            var r, n = bv[e];
            if (!n) throw new Error("Invalid geometry type: " + e);
            switch (e) {
                case"POINT":
                    r = this.parsePointText_();
                    break;
                case"LINESTRING":
                    r = this.parseLineStringText_();
                    break;
                case"POLYGON":
                    r = this.parsePolygonText_();
                    break;
                case"MULTIPOINT":
                    r = this.parseMultiPointText_();
                    break;
                case"MULTILINESTRING":
                    r = this.parseMultiLineStringText_();
                    break;
                case"MULTIPOLYGON":
                    r = this.parseMultiPolygonText_();
                    break;
                default:
                    throw new Error("Invalid geometry type: " + e)
            }
            return r || (r = n === bv.POINT ? [NaN, NaN] : []), new n(r, this.layout_)
        }
        throw new Error(this.formatErrorMessage_())
    };
    var Xv = function (i) {
        function t(t) {
            i.call(this);
            var e = t || {};
            this.splitCollection_ = void 0 !== e.splitCollection && e.splitCollection
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.parse_ = function (t) {
            var e = new Yv(t);
            return new Bv(e).parse()
        }, t.prototype.readFeatureFromText = function (t, e) {
            var i = this.readGeometryFromText(t, e);
            if (i) {
                var r = new Ji;
                return r.setGeometry(i), r
            }
            return null
        }, t.prototype.readFeaturesFromText = function (t, e) {
            for (var i = [], r = this.readGeometryFromText(t, e), n = [], o = 0, s = (i = this.splitCollection_ && r.getType() == Lt.GEOMETRY_COLLECTION ? r.getGeometriesArray() : [r]).length; o < s; ++o) {
                var a = new Ji;
                a.setGeometry(i[o]), n.push(a)
            }
            return n
        }, t.prototype.readGeometryFromText = function (t, e) {
            var i = this.parse_(t);
            return i ? Bp(i, !1, e) : null
        }, t.prototype.writeFeatureText = function (t, e) {
            var i = t.getGeometry();
            return i ? this.writeGeometryText(i, e) : ""
        }, t.prototype.writeFeaturesText = function (t, e) {
            if (1 == t.length) return this.writeFeatureText(t[0], e);
            for (var i = [], r = 0, n = t.length; r < n; ++r) i.push(t[r].getGeometry());
            var o = new Tf(i);
            return this.writeGeometryText(o, e)
        }, t.prototype.writeGeometryText = function (t, e) {
            return Hv(Bp(t, !0, e))
        }, t
    }(Pf);

    function zv(t) {
        var e = t.getCoordinates();
        return 0 === e.length ? "" : e.join(" ")
    }

    function Vv(t) {
        for (var e = t.getCoordinates(), i = [], r = 0, n = e.length; r < n; ++r) i.push(e[r].join(" "));
        return i.join(",")
    }

    function Wv(t) {
        for (var e = [], i = t.getLinearRings(), r = 0, n = i.length; r < n; ++r) e.push("(" + Vv(i[r]) + ")");
        return e.join(",")
    }

    var Kv = {
        Point: zv, LineString: Vv, Polygon: Wv, MultiPoint: function (t) {
            for (var e = [], i = t.getPoints(), r = 0, n = i.length; r < n; ++r) e.push("(" + zv(i[r]) + ")");
            return e.join(",")
        }, MultiLineString: function (t) {
            for (var e = [], i = t.getLineStrings(), r = 0, n = i.length; r < n; ++r) e.push("(" + Vv(i[r]) + ")");
            return e.join(",")
        }, MultiPolygon: function (t) {
            for (var e = [], i = t.getPolygons(), r = 0, n = i.length; r < n; ++r) e.push("(" + Wv(i[r]) + ")");
            return e.join(",")
        }, GeometryCollection: function (t) {
            for (var e = [], i = t.getGeometries(), r = 0, n = i.length; r < n; ++r) e.push(Hv(i[r]));
            return e.join(",")
        }
    };

    function Hv(t) {
        var e, i, r = t.getType(), n = (0, Kv[r])(t);
        if (r = r.toUpperCase(), t instanceof vr) {
            var o = (e = t.getLayout(), i = "", e !== yr.XYZ && e !== yr.XYZM || (i += Pv), e !== yr.XYM && e !== yr.XYZM || (i += Mv), i);
            0 < o.length && (r += " " + o)
        }
        return 0 === n.length ? r + " " + Fv : r + "(" + n + ")"
    }

    var Zv = "http://www.w3.org/1999/xlink";

    function qv(t) {
        return t.getAttributeNS(Zv, "href")
    }

    var Jv = function () {
    };
    Jv.prototype.read = function (t) {
        if (id(t)) return this.readFromDocument(t);
        if (rd(t)) return this.readFromNode(t);
        if ("string" == typeof t) {
            var e = nd(t);
            return this.readFromDocument(e)
        }
        return null
    }, Jv.prototype.readFromDocument = function (t) {
    }, Jv.prototype.readFromNode = function (t) {
    };
    var Qv = [null, "http://www.opengis.net/wms"], $v = _d(Qv, {
        Service: ld(function (t, e) {
            return yd({}, im, t, e)
        }), Capability: ld(function (t, e) {
            return yd({}, tm, t, e)
        })
    }), tm = _d(Qv, {
        Request: ld(function (t, e) {
            return yd({}, um, t, e)
        }), Exception: ld(function (t, e) {
            return yd([], sm, t, e)
        }), Layer: ld(function (t, e) {
            return yd({}, am, t, e)
        })
    }), em = function (t) {
        function e() {
            t.call(this), this.version = void 0
        }

        return t && (e.__proto__ = t), ((e.prototype = Object.create(t && t.prototype)).constructor = e).prototype.readFromDocument = function (t) {
            for (var e = t.firstChild; e; e = e.nextSibling) if (e.nodeType == Node.ELEMENT_NODE) return this.readFromNode(e);
            return null
        }, e.prototype.readFromNode = function (t) {
            this.version = t.getAttribute("version").trim();
            var e = yd({version: this.version}, $v, t, []);
            return e || null
        }, e
    }(Jv), im = _d(Qv, {
        Name: ld(Pd),
        Title: ld(Pd),
        Abstract: ld(Pd),
        KeywordList: ld(xm),
        OnlineResource: ld(qv),
        ContactInformation: ld(function (t, e) {
            return yd({}, rm, t, e)
        }),
        Fees: ld(Pd),
        AccessConstraints: ld(Pd),
        LayerLimit: ld(bd),
        MaxWidth: ld(bd),
        MaxHeight: ld(bd)
    }), rm = _d(Qv, {
        ContactPersonPrimary: ld(function (t, e) {
            return yd({}, nm, t, e)
        }), ContactPosition: ld(Pd), ContactAddress: ld(function (t, e) {
            return yd({}, om, t, e)
        }), ContactVoiceTelephone: ld(Pd), ContactFacsimileTelephone: ld(Pd), ContactElectronicMailAddress: ld(Pd)
    }), nm = _d(Qv, {ContactPerson: ld(Pd), ContactOrganization: ld(Pd)}), om = _d(Qv, {
        AddressType: ld(Pd),
        Address: ld(Pd),
        City: ld(Pd),
        StateOrProvince: ld(Pd),
        PostCode: ld(Pd),
        Country: ld(Pd)
    }), sm = _d(Qv, {Format: sd(Pd)}), am = _d(Qv, {
        Name: ld(Pd),
        Title: ld(Pd),
        Abstract: ld(Pd),
        KeywordList: ld(xm),
        CRS: hd(Pd),
        EX_GeographicBoundingBox: ld(function (t, e) {
            var i = yd({}, lm, t, e);
            if (!i) return;
            var r = i.westBoundLongitude, n = i.southBoundLatitude, o = i.eastBoundLongitude, s = i.northBoundLatitude;
            if (void 0 === r || void 0 === n || void 0 === o || void 0 === s) return;
            return [r, n, o, s]
        }),
        BoundingBox: hd(function (t, e) {
            var i = [Ld(t.getAttribute("minx")), Ld(t.getAttribute("miny")), Ld(t.getAttribute("maxx")), Ld(t.getAttribute("maxy"))],
                r = [Ld(t.getAttribute("resx")), Ld(t.getAttribute("resy"))];
            return {crs: t.getAttribute("CRS"), extent: i, res: r}
        }),
        Dimension: hd(function (t, e) {
            return {
                name: t.getAttribute("name"),
                units: t.getAttribute("units"),
                unitSymbol: t.getAttribute("unitSymbol"),
                default: t.getAttribute("default"),
                multipleValues: wd(t.getAttribute("multipleValues")),
                nearestValue: wd(t.getAttribute("nearestValue")),
                current: wd(t.getAttribute("current")),
                values: Pd(t)
            }
        }),
        Attribution: ld(function (t, e) {
            return yd({}, hm, t, e)
        }),
        AuthorityURL: hd(function (t, e) {
            var i = ym(t, e);
            if (i) return i.name = t.getAttribute("name"), i;
            return
        }),
        Identifier: hd(Pd),
        MetadataURL: hd(function (t, e) {
            var i = ym(t, e);
            if (i) return i.type = t.getAttribute("type"), i;
            return
        }),
        DataURL: hd(ym),
        FeatureListURL: hd(ym),
        Style: hd(function (t, e) {
            return yd({}, fm, t, e)
        }),
        MinScaleDenominator: ld(Id),
        MaxScaleDenominator: ld(Id),
        Layer: hd(function (t, e) {
            var i = e[e.length - 1], r = yd({}, am, t, e);
            if (!r) return;
            var n = wd(t.getAttribute("queryable"));
            void 0 === n && (n = i.queryable);
            r.queryable = void 0 !== n && n;
            var o = Fd(t.getAttribute("cascaded"));
            void 0 === o && (o = i.cascaded);
            r.cascaded = o;
            var s = wd(t.getAttribute("opaque"));
            void 0 === s && (s = i.opaque);
            r.opaque = void 0 !== s && s;
            var a = wd(t.getAttribute("noSubsets"));
            void 0 === a && (a = i.noSubsets);
            r.noSubsets = void 0 !== a && a;
            var h = Ld(t.getAttribute("fixedWidth"));
            h || (h = i.fixedWidth);
            r.fixedWidth = h;
            var l = Ld(t.getAttribute("fixedHeight"));
            l || (l = i.fixedHeight);
            r.fixedHeight = l, ["Style", "CRS", "AuthorityURL"].forEach(function (t) {
                if (t in i) {
                    var e = r[t] || [];
                    r[t] = e.concat(i[t])
                }
            });
            return ["EX_GeographicBoundingBox", "BoundingBox", "Dimension", "Attribution", "MinScaleDenominator", "MaxScaleDenominator"].forEach(function (t) {
                if (!(t in r)) {
                    var e = i[t];
                    r[t] = e
                }
            }), r
        })
    }), hm = _d(Qv, {Title: ld(Pd), OnlineResource: ld(qv), LogoURL: ld(mm)}), lm = _d(Qv, {
        westBoundLongitude: ld(Id),
        eastBoundLongitude: ld(Id),
        southBoundLatitude: ld(Id),
        northBoundLatitude: ld(Id)
    }), um = _d(Qv, {GetCapabilities: ld(vm), GetMap: ld(vm), GetFeatureInfo: ld(vm)}), cm = _d(Qv, {
        Format: hd(Pd), DCPType: hd(function (t, e) {
            return yd({}, pm, t, e)
        })
    }), pm = _d(Qv, {
        HTTP: ld(function (t, e) {
            return yd({}, dm, t, e)
        })
    }), dm = _d(Qv, {Get: ld(ym), Post: ld(ym)}), fm = _d(Qv, {
        Name: ld(Pd),
        Title: ld(Pd),
        Abstract: ld(Pd),
        LegendURL: hd(mm),
        StyleSheetURL: ld(ym),
        StyleURL: ld(ym)
    }), _m = _d(Qv, {Format: ld(Pd), OnlineResource: ld(qv)}), gm = _d(Qv, {Keyword: sd(Pd)});

    function ym(t, e) {
        return yd({}, _m, t, e)
    }

    function vm(t, e) {
        return yd({}, cm, t, e)
    }

    function mm(t, e) {
        var i = ym(t, e);
        if (i) {
            var r = [Fd(t.getAttribute("width")), Fd(t.getAttribute("height"))];
            return i.size = r, i
        }
    }

    function xm(t, e) {
        return yd([], gm, t, e)
    }

    var Sm = function (i) {
        function t(t) {
            i.call(this);
            var e = t || {};
            this.featureNS_ = "http://mapserver.gis.umn.edu/mapserver", this.gmlFormat_ = new Bd, this.layers_ = e.layers ? e.layers : null
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.getLayers = function () {
            return this.layers_
        }, t.prototype.setLayers = function (t) {
            this.layers_ = t
        }, t.prototype.readFeatures_ = function (t, e) {
            t.setAttribute("namespaceURI", this.featureNS_);
            var i = t.localName, r = [];
            if (0 === t.childNodes.length) return r;
            if ("msGMLOutput" == i) for (var n = 0, o = t.childNodes.length; n < o; n++) {
                var s = t.childNodes[n];
                if (s.nodeType === Node.ELEMENT_NODE) {
                    var a = e[0], h = s.localName.replace("_layer", "");
                    if (!this.layers_ || lr(this.layers_, h)) {
                        var l = h + "_feature";
                        a.featureType = l, a.featureNS = this.featureNS_;
                        var u = {};
                        u[l] = sd(this.gmlFormat_.readFeatureElement, this.gmlFormat_);
                        var c = _d([a.featureNS, null], u);
                        s.setAttribute("namespaceURI", this.featureNS_);
                        var p = yd([], c, s, e, this.gmlFormat_);
                        p && pr(r, p)
                    }
                }
            }
            if ("FeatureCollection" == i) {
                var d = yd([], this.gmlFormat_.FEATURE_COLLECTION_PARSERS, t, [{}], this.gmlFormat_);
                d && (r = d)
            }
            return r
        }, t.prototype.readFeaturesFromNode = function (t, e) {
            var i = {};
            return e && E(i, this.getReadOptions(t, e)), this.readFeatures_(t, [i])
        }, t
    }(xd), Em = [null, "http://www.opengis.net/ows/1.1"], Cm = _d(Em, {
        ServiceIdentification: ld(function (t, e) {
            return yd({}, Gm, t, e)
        }), ServiceProvider: ld(function (t, e) {
            return yd({}, km, t, e)
        }), OperationsMetadata: ld(function (t, e) {
            return yd({}, Mm, t, e)
        })
    }), Tm = function (t) {
        function e() {
            t.call(this)
        }

        return t && (e.__proto__ = t), ((e.prototype = Object.create(t && t.prototype)).constructor = e).prototype.readFromDocument = function (t) {
            for (var e = t.firstChild; e; e = e.nextSibling) if (e.nodeType == Node.ELEMENT_NODE) return this.readFromNode(e);
            return null
        }, e.prototype.readFromNode = function (t) {
            var e = yd({}, Cm, t, []);
            return e || null
        }, e
    }(Jv), wm = _d(Em, {
        DeliveryPoint: ld(Pd),
        City: ld(Pd),
        AdministrativeArea: ld(Pd),
        PostalCode: ld(Pd),
        Country: ld(Pd),
        ElectronicMailAddress: ld(Pd)
    }), Rm = _d(Em, {
        Value: hd(function (t, e) {
            return Pd(t)
        })
    }), Im = _d(Em, {
        AllowedValues: ld(function (t, e) {
            return yd({}, Rm, t, e)
        })
    }), Lm = _d(Em, {
        Phone: ld(function (t, e) {
            return yd({}, Om, t, e)
        }), Address: ld(function (t, e) {
            return yd({}, wm, t, e)
        })
    }), bm = _d(Em, {
        HTTP: ld(function (t, e) {
            return yd({}, Fm, t, e)
        })
    }), Fm = _d(Em, {
        Get: hd(function (t, e) {
            var i = qv(t);
            if (!i) return;
            return yd({href: i}, Nm, t, e)
        }), Post: void 0
    }), Pm = _d(Em, {
        DCP: ld(function (t, e) {
            return yd({}, bm, t, e)
        })
    }), Mm = _d(Em, {
        Operation: function (t, e) {
            var i = t.getAttribute("name"), r = yd({}, Pm, t, e);
            if (!r) return;
            e[e.length - 1][i] = r
        }
    }), Om = _d(Em, {Voice: ld(Pd), Facsimile: ld(Pd)}), Nm = _d(Em, {
        Constraint: hd(function (t, e) {
            var i = t.getAttribute("name");
            if (!i) return;
            return yd({name: i}, Im, t, e)
        })
    }), Am = _d(Em, {
        IndividualName: ld(Pd), PositionName: ld(Pd), ContactInfo: ld(function (t, e) {
            return yd({}, Lm, t, e)
        })
    }), Gm = _d(Em, {
        Abstract: ld(Pd),
        AccessConstraints: ld(Pd),
        Fees: ld(Pd),
        Title: ld(Pd),
        ServiceTypeVersion: ld(Pd),
        ServiceType: ld(Pd)
    }), km = _d(Em, {
        ProviderName: ld(Pd), ProviderSite: ld(qv), ServiceContact: ld(function (t, e) {
            return yd({}, Am, t, e)
        })
    });
    var Dm = [null, "http://www.opengis.net/wmts/1.0"], jm = [null, "http://www.opengis.net/ows/1.1"], Um = _d(Dm, {
            Contents: ld(function (t, e) {
                return yd({}, Bm, t, e)
            })
        }), Ym = function (t) {
            function e() {
                t.call(this), this.owsParser_ = new Tm
            }

            return t && (e.__proto__ = t), ((e.prototype = Object.create(t && t.prototype)).constructor = e).prototype.readFromDocument = function (t) {
                for (var e = t.firstChild; e; e = e.nextSibling) if (e.nodeType == Node.ELEMENT_NODE) return this.readFromNode(e);
                return null
            }, e.prototype.readFromNode = function (t) {
                var e = t.getAttribute("version").trim(), i = this.owsParser_.readFromNode(t);
                return i ? (i.version = e, (i = yd(i, Um, t, [])) || null) : null
            }, e
        }(Jv), Bm = _d(Dm, {
            Layer: hd(function (t, e) {
                return yd({}, Xm, t, e)
            }), TileMatrixSet: hd(function (t, e) {
                return yd({}, qm, t, e)
            })
        }), Xm = _d(Dm, {
            Style: hd(function (t, e) {
                var i = yd({}, zm, t, e);
                if (!i) return;
                var r = "true" === t.getAttribute("isDefault");
                return i.isDefault = r, i
            }), Format: hd(Pd), TileMatrixSetLink: hd(function (t, e) {
                return yd({}, Vm, t, e)
            }), Dimension: hd(function (t, e) {
                return yd({}, Hm, t, e)
            }), ResourceURL: hd(function (t, e) {
                var i = t.getAttribute("format"), r = t.getAttribute("template"), n = t.getAttribute("resourceType"),
                    o = {};
                i && (o.format = i);
                r && (o.template = r);
                n && (o.resourceType = n);
                return o
            })
        }, _d(jm, {
            Title: ld(Pd), Abstract: ld(Pd), WGS84BoundingBox: ld(function (t, e) {
                var i = yd([], Zm, t, e);
                if (2 != i.length) return;
                return A(i)
            }), Identifier: ld(Pd)
        })), zm = _d(Dm, {
            LegendURL: hd(function (t, e) {
                var i = {};
                return i.format = t.getAttribute("format"), i.href = qv(t), i
            })
        }, _d(jm, {Title: ld(Pd), Identifier: ld(Pd)})), Vm = _d(Dm, {
            TileMatrixSet: ld(Pd), TileMatrixSetLimits: ld(function (t, e) {
                return yd([], Wm, t, e)
            })
        }), Wm = _d(Dm, {
            TileMatrixLimits: sd(function (t, e) {
                return yd({}, Km, t, e)
            })
        }), Km = _d(Dm, {
            TileMatrix: ld(Pd),
            MinTileRow: ld(bd),
            MaxTileRow: ld(bd),
            MinTileCol: ld(bd),
            MaxTileCol: ld(bd)
        }), Hm = _d(Dm, {Default: ld(Pd), Value: hd(Pd)}, _d(jm, {Identifier: ld(Pd)})),
        Zm = _d(jm, {LowerCorner: sd(Qm), UpperCorner: sd(Qm)}), qm = _d(Dm, {
            WellKnownScaleSet: ld(Pd), TileMatrix: hd(function (t, e) {
                return yd({}, Jm, t, e)
            })
        }, _d(jm, {SupportedCRS: ld(Pd), Identifier: ld(Pd)})), Jm = _d(Dm, {
            TopLeftCorner: ld(Qm),
            ScaleDenominator: ld(Id),
            TileWidth: ld(bd),
            TileHeight: ld(bd),
            MatrixWidth: ld(bd),
            MatrixHeight: ld(bd)
        }, _d(jm, {Identifier: ld(Pd)}));

    function Qm(t, e) {
        var i = Pd(t).split(/\s+/);
        if (i && 2 == i.length) {
            var r = +i[0], n = +i[1];
            if (!isNaN(r) && !isNaN(n)) return [r, n]
        }
    }

    var $m = "blur", tx = "gradient", ex = "radius", ix = ["#00f", "#0ff", "#0f0", "#ff0", "#f00"], rx = function (n) {
        function t(t) {
            var e = t || {}, i = E({}, e);
            delete i.gradient, delete i.radius, delete i.blur, delete i.shadow, delete i.weight, n.call(this, i), this.gradient_ = null, this.shadow_ = void 0 !== e.shadow ? e.shadow : 250, this.circleImage_ = void 0, this.styleCache_ = null, C(this, b(tx), this.handleGradientChanged_, this), this.setGradient(e.gradient ? e.gradient : ix), this.setBlur(void 0 !== e.blur ? e.blur : 15), this.setRadius(void 0 !== e.radius ? e.radius : 8), C(this, b($m), this.handleStyleChanged_, this), C(this, b(ex), this.handleStyleChanged_, this), this.handleStyleChanged_();
            var s, r = e.weight ? e.weight : "weight";
            s = "string" == typeof r ? function (t) {
                return t.get(r)
            } : r, this.setStyle(function (t, e) {
                var i = s(t), r = void 0 !== i ? gt(i, 0, 1) : 1, n = 255 * r | 0, o = this.styleCache_[n];
                return o || (o = [new Wi({
                    image: new $f({
                        opacity: r,
                        src: this.circleImage_
                    })
                })], this.styleCache_[n] = o), o
            }.bind(this)), this.setRenderOrder(null), C(this, wn, this.handleRender_, this)
        }

        return n && (t.__proto__ = n), ((t.prototype = Object.create(n && n.prototype)).constructor = t).prototype.createCircle_ = function () {
            var t = this.getRadius(), e = this.getBlur(), i = t + e + 1, r = 2 * i, n = De(r, r);
            n.shadowOffsetX = n.shadowOffsetY = this.shadow_, n.shadowBlur = e, n.shadowColor = "#000", n.beginPath();
            var o = i - this.shadow_;
            return n.arc(o, o, t, 0, 2 * Math.PI, !0), n.fill(), n.canvas.toDataURL()
        }, t.prototype.getBlur = function () {
            return this.get($m)
        }, t.prototype.getGradient = function () {
            return this.get(tx)
        }, t.prototype.getRadius = function () {
            return this.get(ex)
        }, t.prototype.handleGradientChanged_ = function () {
            this.gradient_ = function (t) {
                for (var e = De(1, 256), i = e.createLinearGradient(0, 0, 1, 256), r = 1 / (t.length - 1), n = 0, o = t.length; n < o; ++n) i.addColorStop(n * r, t[n]);
                return e.fillStyle = i, e.fillRect(0, 0, 1, 256), e.getImageData(0, 0, 1, 256).data
            }(this.getGradient())
        }, t.prototype.handleStyleChanged_ = function () {
            this.circleImage_ = this.createCircle_(), this.styleCache_ = new Array(256), this.changed()
        }, t.prototype.handleRender_ = function (t) {
            for (var e = t.context, i = e.canvas, r = e.getImageData(0, 0, i.width, i.height), n = r.data, o = 0, s = n.length; o < s; o += 4) {
                var a = 4 * n[o + 3];
                a && (n[o] = this.gradient_[a], n[o + 1] = this.gradient_[a + 1], n[o + 2] = this.gradient_[a + 2])
            }
            e.putImageData(r, 0, 0)
        }, t.prototype.setBlur = function (t) {
            this.set($m, t)
        }, t.prototype.setGradient = function (t) {
            this.set(tx, t)
        }, t.prototype.setRadius = function (t) {
            this.set(ex, t)
        }, t
    }(uh);
    var nx = function (i) {
        function t(t) {
            var e = t || {};
            i.call(this, e), this.type = sh.IMAGE
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(Ls);
    nx.prototype.getSource;
    var ox = "preload", sx = "useInterimTilesOnError", ax = function (r) {
        function t(t) {
            var e = t || {}, i = E({}, e);
            delete i.preload, delete i.useInterimTilesOnError, r.call(this, i), this.setPreload(void 0 !== e.preload ? e.preload : 0), this.setUseInterimTilesOnError(void 0 === e.useInterimTilesOnError || e.useInterimTilesOnError), this.type = sh.TILE
        }

        return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype.getPreload = function () {
            return this.get(ox)
        }, t.prototype.setPreload = function (t) {
            this.set(ox, t)
        }, t.prototype.getUseInterimTilesOnError = function () {
            return this.get(sx)
        }, t.prototype.setUseInterimTilesOnError = function (t) {
            this.set(sx, t)
        }, t
    }(Ls);
    ax.prototype.getSource;
    var hx = function (n) {
        function t(t) {
            var e = t || {}, i = e.renderMode || Gu;
            Z(null == i || i == Au || i == Gu || i == ku, 28), e.declutter && i == Au && (i = Gu), e.renderMode = i;
            var r = E({}, e);
            delete r.preload, delete r.useInterimTilesOnError, n.call(this, r), this.setPreload(e.preload ? e.preload : 0), this.setUseInterimTilesOnError(void 0 === e.useInterimTilesOnError || e.useInterimTilesOnError), this.type = sh.VECTOR_TILE
        }

        return n && (t.__proto__ = n), ((t.prototype = Object.create(n && n.prototype)).constructor = t).prototype.getPreload = function () {
            return this.get(ox)
        }, t.prototype.getUseInterimTilesOnError = function () {
            return this.get(sx)
        }, t.prototype.setPreload = function (t) {
            this.set(ox, t)
        }, t.prototype.setUseInterimTilesOnError = function (t) {
            this.set(sx, t)
        }, t
    }(uh);

    function lx(t, e, i, r) {
        return void 0 !== r ? (r[0] = t, r[1] = e, r[2] = i, r) : [t, e, i]
    }

    function ux(t, e, i) {
        return t + "/" + e + "/" + i
    }

    function cx(t) {
        return ux(t[0], t[1], t[2])
    }

    function px(t) {
        return (t[1] << t[0]) + t[2]
    }

    function dx(r, n) {
        var o = /\{z\}/g, s = /\{x\}/g, a = /\{y\}/g, h = /\{-y\}/g;
        return function (i, t, e) {
            return i ? r.replace(o, i[0].toString()).replace(s, i[1].toString()).replace(a, function () {
                return (-i[2] - 1).toString()
            }).replace(h, function () {
                var t = i[0], e = n.getFullTileRange(t);
                return Z(e, 55), (e.getHeight() + i[2]).toString()
            }) : void 0
        }
    }

    function fx(t, e) {
        for (var i = t.length, r = new Array(i), n = 0; n < i; ++n) r[n] = dx(t[n], e);
        return _x(r)
    }

    function _x(n) {
        return 1 === n.length ? n[0] : function (t, e, i) {
            if (t) {
                var r = Et(px(t), n.length);
                return n[r](t, e, i)
            }
        }
    }

    function gx(t, e, i) {
    }

    function yx(t) {
        var e = [], i = /\{([a-z])-([a-z])\}/.exec(t);
        if (i) {
            var r, n = i[1].charCodeAt(0), o = i[2].charCodeAt(0);
            for (r = n; r <= o; ++r) e.push(t.replace(i[0], String.fromCharCode(r)));
            return e
        }
        if (i = i = /\{(\d+)-(\d+)\}/.exec(t)) {
            for (var s = parseInt(i[2], 10), a = parseInt(i[1], 10); a <= s; a++) e.push(t.replace(i[0], a.toString()));
            return e
        }
        return e.push(t), e
    }

    function vx(t, e, i, r) {
        var n = document.createElement("script"), o = "olc_" + Ct(e);

        function s() {
            delete window[o], n.parentNode.removeChild(n)
        }

        n.async = !0, n.src = t + (-1 == t.indexOf("?") ? "?" : "&") + (r || "callback") + "=" + o;
        var a = setTimeout(function () {
            s(), i && i()
        }, 1e4);
        window[o] = function (t) {
            clearTimeout(a), s(), e(t)
        }, document.getElementsByTagName("head")[0].appendChild(n)
    }

    hx.prototype.getSource;
    var mx = function (e) {
        function t(t) {
            e.call(this, t)
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.expireCache = function (t) {
            for (; this.canExpireCache();) {
                var e = this.peekLast(), i = e.tileCoord[0].toString();
                if (i in t && t[i].contains(e.tileCoord)) break;
                this.pop().dispose()
            }
        }, t.prototype.pruneExceptNewestZ = function () {
            if (0 !== this.getCount()) {
                var t = this.peekFirstKey(), e = t.split("/").map(Number)[0];
                this.forEach(function (t) {
                    t.tileCoord[0] !== e && (this.remove(cx(t.tileCoord)), t.dispose())
                }, this)
            }
        }, t
    }(mi);

    function xx(t, e, i, r) {
        var n = de(i, e, t), o = oe(e, r, i), s = e.getMetersPerUnit();
        void 0 !== s && (o *= s);
        var a = t.getMetersPerUnit();
        void 0 !== a && (o /= a);
        var h = t.getExtent();
        if (!h || j(h, n)) {
            var l = oe(t, o, n) / o;
            isFinite(l) && 0 < l && (o /= l)
        }
        return o
    }

    function Sx(t, e, i, r) {
        var n = i - t, o = r - e, s = Math.sqrt(n * n + o * o);
        return [Math.round(i + n / s), Math.round(r + o / s)]
    }

    function Ex(t, e, w, R, i, I, r, n, o, a, s) {
        var L = De(Math.round(w * t), Math.round(w * e));
        if (0 === o.length) return L.canvas;
        L.scale(w, w);
        var b = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
        o.forEach(function (t, e, i) {
            H(b, t.extent)
        });
        var h = ct(b), l = at(b), F = De(Math.round(w * h / R), Math.round(w * l / R)), u = w / R;
        o.forEach(function (t, e, i) {
            var r = t.extent[0] - b[0], n = -(t.extent[3] - b[3]), o = ct(t.extent), s = at(t.extent);
            F.drawImage(t.image, a, a, t.image.width - 2 * a, t.image.height - 2 * a, r * u, n * u, o * u, s * u)
        });
        var P = lt(r);
        return n.getTriangles().forEach(function (t, e, i) {
            var r = t.source, n = t.target, o = r[0][0], s = r[0][1], a = r[1][0], h = r[1][1], l = r[2][0],
                u = r[2][1], c = (n[0][0] - P[0]) / I, p = -(n[0][1] - P[1]) / I, d = (n[1][0] - P[0]) / I,
                f = -(n[1][1] - P[1]) / I, _ = (n[2][0] - P[0]) / I, g = -(n[2][1] - P[1]) / I, y = o, v = s,
                m = function (t) {
                    for (var e = t.length, i = 0; i < e; i++) {
                        for (var r = i, n = Math.abs(t[i][i]), o = i + 1; o < e; o++) {
                            var s = Math.abs(t[o][i]);
                            n < s && (n = s, r = o)
                        }
                        if (0 === n) return null;
                        var a = t[r];
                        t[r] = t[i], t[i] = a;
                        for (var h = i + 1; h < e; h++) for (var l = -t[h][i] / t[i][i], u = i; u < e + 1; u++) i == u ? t[h][u] = 0 : t[h][u] += l * t[i][u]
                    }
                    for (var c = new Array(e), p = e - 1; 0 <= p; p--) {
                        c[p] = t[p][e] / t[p][p];
                        for (var d = p - 1; 0 <= d; d--) t[d][e] -= t[d][p] * c[p]
                    }
                    return c
                }([[a -= y, h -= v, s = o = 0, 0, d - c], [l -= y, u -= v, 0, 0, _ - c], [0, 0, a, h, f - p], [0, 0, l, u, g - p]]);
            if (m) {
                L.save(), L.beginPath();
                var x = (c + d + _) / 3, S = (p + f + g) / 3, E = Sx(x, S, c, p), C = Sx(x, S, d, f),
                    T = Sx(x, S, _, g);
                L.moveTo(C[0], C[1]), L.lineTo(E[0], E[1]), L.lineTo(T[0], T[1]), L.clip(), L.transform(m[0], m[2], m[1], m[3], c, p), L.translate(b[0] - y, b[3] - v), L.scale(R / w, -R / w), L.drawImage(F.canvas, 0, 0), L.restore()
            }
        }), s && (L.save(), L.strokeStyle = "black", L.lineWidth = 1, n.getTriangles().forEach(function (t, e, i) {
            var r = t.target, n = (r[0][0] - P[0]) / I, o = -(r[0][1] - P[1]) / I, s = (r[1][0] - P[0]) / I,
                a = -(r[1][1] - P[1]) / I, h = (r[2][0] - P[0]) / I, l = -(r[2][1] - P[1]) / I;
            L.beginPath(), L.moveTo(s, a), L.lineTo(n, o), L.lineTo(h, l), L.closePath(), L.stroke()
        }), L.restore()), L.canvas
    }

    var Cx = function (t, e, i, r, n) {
        this.sourceProj_ = t, this.targetProj_ = e;
        var o = {}, s = pe(this.targetProj_, this.sourceProj_);
        this.transformInv_ = function (t) {
            var e = t[0] + "/" + t[1];
            return o[e] || (o[e] = s(t)), o[e]
        }, this.maxSourceExtent_ = r, this.errorThresholdSquared_ = n * n, this.triangles_ = [], this.wrapsXInSource_ = !1, this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!r && !!this.sourceProj_.getExtent() && ct(r) == ct(this.sourceProj_.getExtent()), this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? ct(this.sourceProj_.getExtent()) : null, this.targetWorldWidth_ = this.targetProj_.getExtent() ? ct(this.targetProj_.getExtent()) : null;
        var a = lt(i), h = ut(i), l = nt(i), u = rt(i), c = this.transformInv_(a), p = this.transformInv_(h),
            d = this.transformInv_(l), f = this.transformInv_(u);
        if (this.addQuad_(a, h, l, u, c, p, d, f, 10), this.wrapsXInSource_) {
            var _ = 1 / 0;
            this.triangles_.forEach(function (t, e, i) {
                _ = Math.min(_, t.source[0][0], t.source[1][0], t.source[2][0])
            }), this.triangles_.forEach(function (t) {
                if (Math.max(t.source[0][0], t.source[1][0], t.source[2][0]) - _ > this.sourceWorldWidth_ / 2) {
                    var e = [[t.source[0][0], t.source[0][1]], [t.source[1][0], t.source[1][1]], [t.source[2][0], t.source[2][1]]];
                    e[0][0] - _ > this.sourceWorldWidth_ / 2 && (e[0][0] -= this.sourceWorldWidth_), e[1][0] - _ > this.sourceWorldWidth_ / 2 && (e[1][0] -= this.sourceWorldWidth_), e[2][0] - _ > this.sourceWorldWidth_ / 2 && (e[2][0] -= this.sourceWorldWidth_);
                    var i = Math.min(e[0][0], e[1][0], e[2][0]);
                    Math.max(e[0][0], e[1][0], e[2][0]) - i < this.sourceWorldWidth_ / 2 && (t.source = e)
                }
            }.bind(this))
        }
        o = {}
    };
    Cx.prototype.addTriangle_ = function (t, e, i, r, n, o) {
        this.triangles_.push({source: [r, n, o], target: [t, e, i]})
    }, Cx.prototype.addQuad_ = function (t, e, i, r, n, o, s, a, h) {
        var l = A([n, o, s, a]), u = this.sourceWorldWidth_ ? ct(l) / this.sourceWorldWidth_ : null,
            c = this.sourceWorldWidth_, p = this.sourceProj_.canWrapX() && .5 < u && u < 1, d = !1;
        if (0 < h) {
            if (this.targetProj_.isGlobal() && this.targetWorldWidth_) d |= .25 < ct(A([t, e, i, r])) / this.targetWorldWidth_;
            !p && this.sourceProj_.isGlobal() && u && (d |= .25 < u)
        }
        if (d || !this.maxSourceExtent_ || wt(l, this.maxSourceExtent_)) {
            if (!(d || isFinite(n[0]) && isFinite(n[1]) && isFinite(o[0]) && isFinite(o[1]) && isFinite(s[0]) && isFinite(s[1]) && isFinite(a[0]) && isFinite(a[1]))) {
                if (!(0 < h)) return;
                d = !0
            }
            if (0 < h) {
                if (!d) {
                    var f, _ = [(t[0] + i[0]) / 2, (t[1] + i[1]) / 2], g = this.transformInv_(_);
                    if (p) f = (Et(n[0], c) + Et(s[0], c)) / 2 - Et(g[0], c); else f = (n[0] + s[0]) / 2 - g[0];
                    var y = (n[1] + s[1]) / 2 - g[1];
                    d = f * f + y * y > this.errorThresholdSquared_
                }
                if (d) {
                    if (Math.abs(t[0] - i[0]) <= Math.abs(t[1] - i[1])) {
                        var v = [(e[0] + i[0]) / 2, (e[1] + i[1]) / 2], m = this.transformInv_(v),
                            x = [(r[0] + t[0]) / 2, (r[1] + t[1]) / 2], S = this.transformInv_(x);
                        this.addQuad_(t, e, v, x, n, o, m, S, h - 1), this.addQuad_(x, v, i, r, S, m, s, a, h - 1)
                    } else {
                        var E = [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2], C = this.transformInv_(E),
                            T = [(i[0] + r[0]) / 2, (i[1] + r[1]) / 2], w = this.transformInv_(T);
                        this.addQuad_(t, E, T, r, n, C, w, a, h - 1), this.addQuad_(E, e, i, T, C, o, s, w, h - 1)
                    }
                    return
                }
            }
            if (p) {
                if (!this.canWrapXInSource_) return;
                this.wrapsXInSource_ = !0
            }
            this.addTriangle_(t, i, r, n, s, a), this.addTriangle_(t, e, i, n, o, s)
        }
    }, Cx.prototype.calculateSourceExtent = function () {
        var n = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
        return this.triangles_.forEach(function (t, e, i) {
            var r = t.source;
            q(n, r[0]), q(n, r[1]), q(n, r[2])
        }), n
    }, Cx.prototype.getTriangles = function () {
        return this.triangles_
    };
    var Tx = function (T) {
        function t(t, e, i, r, n, o, s, a, h, l, u) {
            T.call(this, n, An), this.renderEdges_ = void 0 !== u && u, this.pixelRatio_ = s, this.gutter_ = a, this.canvas_ = null, this.sourceTileGrid_ = e, this.targetTileGrid_ = r, this.wrappedTileCoord_ = o || n, this.sourceTiles_ = [], this.sourcesListenerKeys_ = null, this.sourceZ_ = 0;
            var c = r.getTileCoordExtent(this.wrappedTileCoord_), p = this.targetTileGrid_.getExtent(),
                d = this.sourceTileGrid_.getExtent(), f = p ? ht(c, p) : c;
            if (0 !== it(f)) {
                var _ = t.getExtent();
                _ && (d = d ? ht(d, _) : _);
                var g = r.getResolution(this.wrappedTileCoord_[0]), y = xx(t, i, ot(f), g);
                if (!isFinite(y) || y <= 0) this.state = jn; else {
                    var v = void 0 !== l ? l : .5;
                    if (this.triangulation_ = new Cx(t, i, f, d, y * v), 0 !== this.triangulation_.getTriangles().length) {
                        this.sourceZ_ = e.getZForResolution(y);
                        var m = this.triangulation_.calculateSourceExtent();
                        if (d && (t.canWrapX() ? (m[1] = gt(m[1], d[1], d[3]), m[3] = gt(m[3], d[1], d[3])) : m = ht(m, d)), it(m)) {
                            for (var x = e.getTileRangeForExtentAndZ(m, this.sourceZ_), S = x.minX; S <= x.maxX; S++) for (var E = x.minY; E <= x.maxY; E++) {
                                var C = h(this.sourceZ_, S, E, s);
                                C && this.sourceTiles_.push(C)
                            }
                            0 === this.sourceTiles_.length && (this.state = jn)
                        } else this.state = jn
                    } else this.state = jn
                }
            } else this.state = jn
        }

        return T && (t.__proto__ = T), ((t.prototype = Object.create(T && T.prototype)).constructor = t).prototype.disposeInternal = function () {
            this.state == Gn && this.unlistenSources_(), T.prototype.disposeInternal.call(this)
        }, t.prototype.getImage = function () {
            return this.canvas_
        }, t.prototype.reproject_ = function () {
            var r = [];
            if (this.sourceTiles_.forEach(function (t, e, i) {
                t && t.getState() == kn && r.push({
                    extent: this.sourceTileGrid_.getTileCoordExtent(t.tileCoord),
                    image: t.getImage()
                })
            }.bind(this)), (this.sourceTiles_.length = 0) === r.length) this.state = Dn; else {
                var t = this.wrappedTileCoord_[0], e = this.targetTileGrid_.getTileSize(t),
                    i = "number" == typeof e ? e : e[0], n = "number" == typeof e ? e : e[1],
                    o = this.targetTileGrid_.getResolution(t), s = this.sourceTileGrid_.getResolution(this.sourceZ_),
                    a = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
                this.canvas_ = Ex(i, n, this.pixelRatio_, s, this.sourceTileGrid_.getExtent(), o, a, this.triangulation_, r, this.gutter_, this.renderEdges_), this.state = kn
            }
            this.changed()
        }, t.prototype.load = function () {
            if (this.state == An) {
                this.state = Gn, this.changed();
                var o = 0;
                this.sourcesListenerKeys_ = [], this.sourceTiles_.forEach(function (i, t, e) {
                    var r = i.getState();
                    if (r == An || r == Gn) {
                        o++;
                        var n = C(i, w.CHANGE, function (t) {
                            var e = i.getState();
                            e != kn && e != Dn && e != jn || (g(n), 0 === --o && (this.unlistenSources_(), this.reproject_()))
                        }, this);
                        this.sourcesListenerKeys_.push(n)
                    }
                }.bind(this)), this.sourceTiles_.forEach(function (t, e, i) {
                    t.getState() == An && t.load()
                }), 0 === o && setTimeout(this.reproject_.bind(this), 0)
            }
        }, t.prototype.unlistenSources_ = function () {
            this.sourcesListenerKeys_.forEach(g), this.sourcesListenerKeys_ = null
        }, t
    }(Vn), wx = [0, 0, 0], Rx = function (t) {
        var r, n, o, e;
        if (this.minZoom = void 0 !== t.minZoom ? t.minZoom : 0, this.resolutions_ = t.resolutions, Z((r = this.resolutions_, n = !0, o = function (t, e) {
            return e - t
        } || hr, r.every(function (t, e) {
            if (0 === e) return !0;
            var i = o(r[e - 1], t);
            return !(0 < i || n && 0 === i)
        })), 17), !t.origins) for (var i = 0, s = this.resolutions_.length - 1; i < s; ++i) if (e) {
            if (this.resolutions_[i] / this.resolutions_[i + 1] !== e) {
                e = void 0;
                break
            }
        } else e = this.resolutions_[i] / this.resolutions_[i + 1];
        this.zoomFactor_ = e, this.maxZoom = this.resolutions_.length - 1, this.origin_ = void 0 !== t.origin ? t.origin : null, this.origins_ = null, void 0 !== t.origins && (this.origins_ = t.origins, Z(this.origins_.length == this.resolutions_.length, 20));
        var a = t.extent;
        void 0 === a || this.origin_ || this.origins_ || (this.origin_ = lt(a)), Z(!this.origin_ && this.origins_ || this.origin_ && !this.origins_, 18), this.tileSizes_ = null, void 0 !== t.tileSizes && (this.tileSizes_ = t.tileSizes, Z(this.tileSizes_.length == this.resolutions_.length, 19)), this.tileSize_ = void 0 !== t.tileSize ? t.tileSize : this.tileSizes_ ? null : Qo, Z(!this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_, 22), this.extent_ = void 0 !== a ? a : null, this.fullTileRanges_ = null, this.tmpSize_ = [0, 0], void 0 !== t.sizes ? this.fullTileRanges_ = t.sizes.map(function (t, e) {
            return new Wl(Math.min(0, t[0]), Math.max(t[0] - 1, -1), Math.min(0, t[1]), Math.max(t[1] - 1, -1))
        }, this) : a && this.calculateTileRanges_(a)
    };

    function Ix(t) {
        var e = t.getDefaultTileGrid();
        return e || (e = Px(t), t.setDefaultTileGrid(e)), e
    }

    function Lx(t, e, i, r) {
        var n, o, s, a = void 0 !== r ? r : O.TOP_LEFT, h = Fx(t, e, i);
        return new Rx({
            extent: t,
            origin: (n = t, o = a, o === O.BOTTOM_LEFT ? s = rt(n) : o === O.BOTTOM_RIGHT ? s = nt(n) : o === O.TOP_LEFT ? s = lt(n) : o === O.TOP_RIGHT ? s = ut(n) : Z(!1, 13), s),
            resolutions: h,
            tileSize: i
        })
    }

    function bx(t) {
        var e = {};
        return E(e, void 0 !== t ? t : {}), void 0 === e.extent && (e.extent = ne("EPSG:3857").getExtent()), e.resolutions = Fx(e.extent, e.maxZoom, e.tileSize), delete e.maxZoom, new Rx(e)
    }

    function Fx(t, e, i) {
        for (var r = void 0 !== e ? e : Jo, n = at(t), o = ct(t), s = ws(void 0 !== i ? i : Qo), a = Math.max(o / s[0], n / s[1]), h = r + 1, l = new Array(h), u = 0; u < h; ++u) l[u] = a / Math.pow(2, u);
        return l
    }

    function Px(t, e, i, r) {
        return Lx(Mx(t), e, i, r)
    }

    function Mx(t) {
        var e = (t = ne(t)).getExtent();
        if (!e) {
            var i = 180 * Nt[Ot.DEGREES] / t.getMetersPerUnit();
            e = X(-i, -i, i, i)
        }
        return e
    }

    Rx.prototype.forEachTileCoord = function (t, e, i) {
        for (var r = this.getTileRangeForExtentAndZ(t, e), n = r.minX, o = r.maxX; n <= o; ++n) for (var s = r.minY, a = r.maxY; s <= a; ++s) i([e, n, s])
    }, Rx.prototype.forEachTileCoordParentTileRange = function (t, e, i, r, n) {
        var o, s, a, h = null, l = t[0] - 1;
        for (2 === this.zoomFactor_ ? (s = t[1], a = t[2]) : h = this.getTileCoordExtent(t, n); l >= this.minZoom;) {
            if (o = 2 === this.zoomFactor_ ? Kl(s = Math.floor(s / 2), s, a = Math.floor(a / 2), a, r) : this.getTileRangeForExtentAndZ(h, l, r), e.call(i, l, o)) return !0;
            --l
        }
        return !1
    }, Rx.prototype.getExtent = function () {
        return this.extent_
    }, Rx.prototype.getMaxZoom = function () {
        return this.maxZoom
    }, Rx.prototype.getMinZoom = function () {
        return this.minZoom
    }, Rx.prototype.getOrigin = function (t) {
        return this.origin_ ? this.origin_ : this.origins_[t]
    }, Rx.prototype.getResolution = function (t) {
        return this.resolutions_[t]
    }, Rx.prototype.getResolutions = function () {
        return this.resolutions_
    }, Rx.prototype.getTileCoordChildTileRange = function (t, e, i) {
        if (t[0] < this.maxZoom) {
            if (2 === this.zoomFactor_) {
                var r = 2 * t[1], n = 2 * t[2];
                return Kl(r, r + 1, n, n + 1, e)
            }
            var o = this.getTileCoordExtent(t, i);
            return this.getTileRangeForExtentAndZ(o, t[0] + 1, e)
        }
        return null
    }, Rx.prototype.getTileRangeExtent = function (t, e, i) {
        var r = this.getOrigin(t), n = this.getResolution(t), o = ws(this.getTileSize(t), this.tmpSize_),
            s = r[0] + e.minX * o[0] * n, a = r[0] + (e.maxX + 1) * o[0] * n;
        return X(s, r[1] + e.minY * o[1] * n, a, r[1] + (e.maxY + 1) * o[1] * n, i)
    }, Rx.prototype.getTileRangeForExtentAndZ = function (t, e, i) {
        var r = wx;
        this.getTileCoordForXYAndZ_(t[0], t[1], e, !1, r);
        var n = r[1], o = r[2];
        return this.getTileCoordForXYAndZ_(t[2], t[3], e, !0, r), Kl(n, r[1], o, r[2], i)
    }, Rx.prototype.getTileCoordCenter = function (t) {
        var e = this.getOrigin(t[0]), i = this.getResolution(t[0]), r = ws(this.getTileSize(t[0]), this.tmpSize_);
        return [e[0] + (t[1] + .5) * r[0] * i, e[1] + (t[2] + .5) * r[1] * i]
    }, Rx.prototype.getTileCoordExtent = function (t, e) {
        var i = this.getOrigin(t[0]), r = this.getResolution(t[0]), n = ws(this.getTileSize(t[0]), this.tmpSize_),
            o = i[0] + t[1] * n[0] * r, s = i[1] + t[2] * n[1] * r;
        return X(o, s, o + n[0] * r, s + n[1] * r, e)
    }, Rx.prototype.getTileCoordForCoordAndResolution = function (t, e, i) {
        return this.getTileCoordForXYAndResolution_(t[0], t[1], e, !1, i)
    }, Rx.prototype.getTileCoordForXYAndResolution_ = function (t, e, i, r, n) {
        var o = this.getZForResolution(i), s = i / this.getResolution(o), a = this.getOrigin(o),
            h = ws(this.getTileSize(o), this.tmpSize_), l = r ? .5 : 0, u = r ? 0 : .5,
            c = Math.floor((t - a[0]) / i + l), p = Math.floor((e - a[1]) / i + u), d = s * c / h[0], f = s * p / h[1];
        return r ? (d = Math.ceil(d) - 1, f = Math.ceil(f) - 1) : (d = Math.floor(d), f = Math.floor(f)), lx(o, d, f, n)
    }, Rx.prototype.getTileCoordForXYAndZ_ = function (t, e, i, r, n) {
        var o = this.getOrigin(i), s = this.getResolution(i), a = ws(this.getTileSize(i), this.tmpSize_),
            h = r ? .5 : 0, l = r ? 0 : .5, u = Math.floor((t - o[0]) / s + h), c = Math.floor((e - o[1]) / s + l),
            p = u / a[0], d = c / a[1];
        return r ? (p = Math.ceil(p) - 1, d = Math.ceil(d) - 1) : (p = Math.floor(p), d = Math.floor(d)), lx(i, p, d, n)
    }, Rx.prototype.getTileCoordForCoordAndZ = function (t, e, i) {
        return this.getTileCoordForXYAndZ_(t[0], t[1], e, !1, i)
    }, Rx.prototype.getTileCoordResolution = function (t) {
        return this.resolutions_[t[0]]
    }, Rx.prototype.getTileSize = function (t) {
        return this.tileSize_ ? this.tileSize_ : this.tileSizes_[t]
    }, Rx.prototype.getFullTileRange = function (t) {
        return this.fullTileRanges_ ? this.fullTileRanges_[t] : null
    }, Rx.prototype.getZForResolution = function (t, e) {
        return gt(ur(this.resolutions_, t, e || 0), this.minZoom, this.maxZoom)
    }, Rx.prototype.calculateTileRanges_ = function (t) {
        for (var e = this.resolutions_.length, i = new Array(e), r = this.minZoom; r < e; ++r) i[r] = this.getTileRangeForExtentAndZ(t, r);
        this.fullTileRanges_ = i
    };
    var Ox = function (e) {
        function t(t) {
            e.call(this, {
                attributions: t.attributions,
                extent: t.extent,
                projection: t.projection,
                state: t.state,
                wrapX: t.wrapX
            }), this.opaque_ = void 0 !== t.opaque && t.opaque, this.tilePixelRatio_ = void 0 !== t.tilePixelRatio ? t.tilePixelRatio : 1, this.tileGrid = void 0 !== t.tileGrid ? t.tileGrid : null, this.tileCache = new mx(t.cacheSize), this.tmpSize = [0, 0], this.key_ = "", this.tileOptions = {transition: t.transition}
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.canExpireCache = function () {
            return this.tileCache.canExpireCache()
        }, t.prototype.expireCache = function (t, e) {
            var i = this.getTileCacheForProjection(t);
            i && i.expireCache(e)
        }, t.prototype.forEachLoadedTile = function (t, e, i, r) {
            var n = this.getTileCacheForProjection(t);
            if (!n) return !1;
            for (var o, s, a, h = !0, l = i.minX; l <= i.maxX; ++l) for (var u = i.minY; u <= i.maxY; ++u) s = ux(e, l, u), a = !1, n.containsKey(s) && (a = (o = n.get(s)).getState() === kn) && (a = !1 !== r(o)), a || (h = !1);
            return h
        }, t.prototype.getGutterForProjection = function (t) {
            return 0
        }, t.prototype.getKey = function () {
            return this.key_
        }, t.prototype.setKey = function (t) {
            this.key_ !== t && (this.key_ = t, this.changed())
        }, t.prototype.getOpaque = function (t) {
            return this.opaque_
        }, t.prototype.getResolutions = function () {
            return this.tileGrid.getResolutions()
        }, t.prototype.getTile = function (t, e, i, r, n) {
        }, t.prototype.getTileGrid = function () {
            return this.tileGrid
        }, t.prototype.getTileGridForProjection = function (t) {
            return this.tileGrid ? this.tileGrid : Ix(t)
        }, t.prototype.getTileCacheForProjection = function (t) {
            var e = this.getProjection();
            return e && !ue(e, t) ? null : this.tileCache
        }, t.prototype.getTilePixelRatio = function (t) {
            return this.tilePixelRatio_
        }, t.prototype.getTilePixelSize = function (t, e, i) {
            var r = this.getTileGridForProjection(i), n = this.getTilePixelRatio(e),
                o = ws(r.getTileSize(t), this.tmpSize);
            return 1 == n ? o : Ts(o, n, this.tmpSize)
        }, t.prototype.getTileCoordForTileUrlFunction = function (t, e) {
            var i = void 0 !== e ? e : this.getProjection(), r = this.getTileGridForProjection(i);
            return this.getWrapX() && i.isGlobal() && (t = function (t, e, i) {
                var r = e[0], n = t.getTileCoordCenter(e), o = Mx(i);
                if (j(o, n)) return e;
                var s = ct(o), a = Math.ceil((o[0] - n[0]) / s);
                return n[0] += s * a, t.getTileCoordForCoordAndZ(n, r)
            }(r, t, i)), function (t, e) {
                var i = t[0], r = t[1], n = t[2];
                if (e.getMinZoom() > i || i > e.getMaxZoom()) return !1;
                var o, s = e.getExtent();
                return !(o = s ? e.getTileRangeForExtentAndZ(s, i) : e.getFullTileRange(i)) || o.containsXY(r, n)
            }(t, r) ? t : null
        }, t.prototype.refresh = function () {
            this.tileCache.clear(), this.changed()
        }, t
    }(_h);
    Ox.prototype.useTile = L;
    var Nx = function (i) {
        function t(t, e) {
            i.call(this, t), this.tile = e
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(m), Ax = "tileloadstart", Gx = "tileloadend", kx = "tileloaderror", Dx = function (e) {
        function t(t) {
            e.call(this, {
                attributions: t.attributions,
                cacheSize: t.cacheSize,
                extent: t.extent,
                opaque: t.opaque,
                projection: t.projection,
                state: t.state,
                tileGrid: t.tileGrid,
                tilePixelRatio: t.tilePixelRatio,
                wrapX: t.wrapX,
                transition: t.transition
            }), this.tileLoadFunction = t.tileLoadFunction, this.tileUrlFunction = this.fixedTileUrlFunction ? this.fixedTileUrlFunction.bind(this) : gx, this.urls = null, t.urls ? this.setUrls(t.urls) : t.url && this.setUrl(t.url), t.tileUrlFunction && this.setTileUrlFunction(t.tileUrlFunction), this.tileLoadingKeys_ = {}
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.getTileLoadFunction = function () {
            return this.tileLoadFunction
        }, t.prototype.getTileUrlFunction = function () {
            return this.tileUrlFunction
        }, t.prototype.getUrls = function () {
            return this.urls
        }, t.prototype.handleTileChange = function (t) {
            var e, i = t.target, r = Ct(i), n = i.getState();
            n == Gn ? (this.tileLoadingKeys_[r] = !0, e = Ax) : r in this.tileLoadingKeys_ && (delete this.tileLoadingKeys_[r], e = n == Dn ? kx : n == kn || n == Un ? Gx : void 0), null != e && this.dispatchEvent(new Nx(e, i))
        }, t.prototype.setTileLoadFunction = function (t) {
            this.tileCache.clear(), this.tileLoadFunction = t, this.changed()
        }, t.prototype.setTileUrlFunction = function (t, e) {
            this.tileUrlFunction = t, this.tileCache.pruneExceptNewestZ(), void 0 !== e ? this.setKey(e) : this.changed()
        }, t.prototype.setUrl = function (t) {
            var e = this.urls = yx(t);
            this.setTileUrlFunction(this.fixedTileUrlFunction ? this.fixedTileUrlFunction.bind(this) : fx(e, this.tileGrid), t)
        }, t.prototype.setUrls = function (t) {
            var e = (this.urls = t).join("\n");
            this.setTileUrlFunction(this.fixedTileUrlFunction ? this.fixedTileUrlFunction.bind(this) : fx(t, this.tileGrid), e)
        }, t.prototype.useTile = function (t, e, i) {
            var r = ux(t, e, i);
            this.tileCache.containsKey(r) && this.tileCache.get(r)
        }, t
    }(Ox);
    Dx.prototype.fixedTileUrlFunction;
    var jx = function (e) {
        function t(t) {
            e.call(this, {
                attributions: t.attributions,
                cacheSize: t.cacheSize,
                extent: t.extent,
                opaque: t.opaque,
                projection: t.projection,
                state: t.state,
                tileGrid: t.tileGrid,
                tileLoadFunction: t.tileLoadFunction ? t.tileLoadFunction : Ux,
                tilePixelRatio: t.tilePixelRatio,
                tileUrlFunction: t.tileUrlFunction,
                url: t.url,
                urls: t.urls,
                wrapX: t.wrapX,
                transition: t.transition
            }), this.crossOrigin = void 0 !== t.crossOrigin ? t.crossOrigin : null, this.tileClass = void 0 !== t.tileClass ? t.tileClass : Wn, this.tileCacheForProjection = {}, this.tileGridForProjection = {}, this.reprojectionErrorThreshold_ = t.reprojectionErrorThreshold, this.renderReprojectionEdges_ = !1
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.canExpireCache = function () {
            if (this.tileCache.canExpireCache()) return !0;
            for (var t in this.tileCacheForProjection) if (this.tileCacheForProjection[t].canExpireCache()) return !0;
            return !1
        }, t.prototype.expireCache = function (t, e) {
            var i = this.getTileCacheForProjection(t);
            for (var r in this.tileCache.expireCache(this.tileCache == i ? e : {}), this.tileCacheForProjection) {
                var n = this.tileCacheForProjection[r];
                n.expireCache(n == i ? e : {})
            }
        }, t.prototype.getGutterForProjection = function (t) {
            return this.getProjection() && t && !ue(this.getProjection(), t) ? 0 : this.getGutter()
        }, t.prototype.getGutter = function () {
            return 0
        }, t.prototype.getOpaque = function (t) {
            return !(this.getProjection() && t && !ue(this.getProjection(), t)) && e.prototype.getOpaque.call(this, t)
        }, t.prototype.getTileGridForProjection = function (t) {
            var e = this.getProjection();
            if (!this.tileGrid || e && !ue(e, t)) {
                var i = Ct(t).toString();
                return i in this.tileGridForProjection || (this.tileGridForProjection[i] = Ix(t)), this.tileGridForProjection[i]
            }
            return this.tileGrid
        }, t.prototype.getTileCacheForProjection = function (t) {
            var e = this.getProjection();
            if (!e || ue(e, t)) return this.tileCache;
            var i = Ct(t).toString();
            return i in this.tileCacheForProjection || (this.tileCacheForProjection[i] = new mx(this.tileCache.highWaterMark)), this.tileCacheForProjection[i]
        }, t.prototype.createTile_ = function (t, e, i, r, n, o) {
            var s = [t, e, i], a = this.getTileCoordForTileUrlFunction(s, n),
                h = a ? this.tileUrlFunction(a, r, n) : void 0,
                l = new this.tileClass(s, void 0 !== h ? An : jn, void 0 !== h ? h : "", this.crossOrigin, this.tileLoadFunction, this.tileOptions);
            return l.key = o, C(l, w.CHANGE, this.handleTileChange, this), l
        }, t.prototype.getTile = function (t, e, i, r, n) {
            var o = this.getProjection();
            if (o && n && !ue(o, n)) {
                var s, a = this.getTileCacheForProjection(n), h = [t, e, i], l = cx(h);
                a.containsKey(l) && (s = a.get(l));
                var u = this.getKey();
                if (s && s.key == u) return s;
                var c = this.getTileGridForProjection(o), p = this.getTileGridForProjection(n),
                    d = this.getTileCoordForTileUrlFunction(h, n),
                    f = new Tx(o, c, n, p, h, d, this.getTilePixelRatio(r), this.getGutter(), function (t, e, i, r) {
                        return this.getTileInternal(t, e, i, r, o)
                    }.bind(this), this.reprojectionErrorThreshold_, this.renderReprojectionEdges_);
                return f.key = u, s ? (f.interimTile = s, f.refreshInterimChain(), a.replace(l, f)) : a.set(l, f), f
            }
            return this.getTileInternal(t, e, i, r, o || n)
        }, t.prototype.getTileInternal = function (t, e, i, r, n) {
            var o = null, s = ux(t, e, i), a = this.getKey();
            if (this.tileCache.containsKey(s)) {
                if ((o = this.tileCache.get(s)).key != a) {
                    var h = o;
                    o = this.createTile_(t, e, i, r, n, a), h.getState() == An ? o.interimTile = h.interimTile : o.interimTile = h, o.refreshInterimChain(), this.tileCache.replace(s, o)
                }
            } else o = this.createTile_(t, e, i, r, n, a), this.tileCache.set(s, o);
            return o
        }, t.prototype.setRenderReprojectionEdges = function (t) {
            if (this.renderReprojectionEdges_ != t) {
                for (var e in this.renderReprojectionEdges_ = t, this.tileCacheForProjection) this.tileCacheForProjection[e].clear();
                this.changed()
            }
        }, t.prototype.setTileGridForProjection = function (t, e) {
            var i = ne(t);
            if (i) {
                var r = Ct(i).toString();
                r in this.tileGridForProjection || (this.tileGridForProjection[r] = e)
            }
        }, t
    }(Dx);

    function Ux(t, e) {
        t.getImage().src = e
    }

    var Yx = function (i) {
        function t(t) {
            var e = void 0 !== t.hidpi && t.hidpi;
            i.call(this, {
                cacheSize: t.cacheSize,
                crossOrigin: "anonymous",
                opaque: !0,
                projection: ne("EPSG:3857"),
                reprojectionErrorThreshold: t.reprojectionErrorThreshold,
                state: vs,
                tileLoadFunction: t.tileLoadFunction,
                tilePixelRatio: e ? 2 : 1,
                wrapX: void 0 === t.wrapX || t.wrapX,
                transition: t.transition
            }), this.hidpi_ = e, this.culture_ = void 0 !== t.culture ? t.culture : "en-us", this.maxZoom_ = void 0 !== t.maxZoom ? t.maxZoom : -1, this.apiKey_ = t.key, this.imagerySet_ = t.imagerySet, vx("https://dev.virtualearth.net/REST/v1/Imagery/Metadata/" + this.imagerySet_ + "?uriScheme=https&include=ImageryProviders&key=" + this.apiKey_ + "&c=" + this.culture_, this.handleImageryMetadataResponse.bind(this), void 0, "jsonp")
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.getApiKey = function () {
            return this.apiKey_
        }, t.prototype.getImagerySet = function () {
            return this.imagerySet_
        }, t.prototype.handleImageryMetadataResponse = function (t) {
            if (200 == t.statusCode && "OK" == t.statusDescription && "ValidCredentials" == t.authenticationResultCode && 1 == t.resourceSets.length && 1 == t.resourceSets[0].resources.length) {
                var e = t.resourceSets[0].resources[0], i = -1 == this.maxZoom_ ? e.zoomMax : this.maxZoom_,
                    r = Mx(this.getProjection()),
                    n = e.imageWidth == e.imageHeight ? e.imageWidth : [e.imageWidth, e.imageHeight],
                    o = bx({extent: r, minZoom: e.zoomMin, maxZoom: i, tileSize: n / (this.hidpi_ ? 2 : 1)});
                this.tileGrid = o;
                var s = this.culture_, a = this.hidpi_;
                if (this.tileUrlFunction = _x(e.imageUrlSubdomains.map(function (t) {
                    var n = [0, 0, 0], o = e.imageUrl.replace("{subdomain}", t).replace("{culture}", s);
                    return function (t, e, i) {
                        if (t) {
                            lx(t[0], t[1], -t[2] - 1, n);
                            var r = o;
                            return a && (r += "&dpi=d1&device=mobile"), r.replace("{quadkey}", function (t) {
                                var e, i, r = t[0], n = new Array(r), o = 1 << r - 1;
                                for (e = 0; e < r; ++e) i = 48, t[1] & o && (i += 1), t[2] & o && (i += 2), n[e] = String.fromCharCode(i), o >>= 1;
                                return n.join("")
                            }(n))
                        }
                    }
                })), e.imageryProviders) {
                    var u = ce(ne("EPSG:4326"), this.getProjection());
                    this.setAttributions(function (a) {
                        var h = [], l = a.viewState.zoom;
                        return e.imageryProviders.map(function (t) {
                            for (var e = !1, i = t.coverageAreas, r = 0, n = i.length; r < n; ++r) {
                                var o = i[r];
                                if (l >= o.zoomMin && l <= o.zoomMax) {
                                    var s = o.bbox;
                                    if (wt(ft([s[1], s[0], s[3], s[2]], u), a.extent)) {
                                        e = !0;
                                        break
                                    }
                                }
                            }
                            e && h.push(t.attribution)
                        }), h.push('<a class="ol-attribution-bing-tos" href="https://www.microsoft.com/maps/product/terms.html">Terms of Use</a>'), h
                    })
                }
                this.setState(ms)
            } else this.setState(xs)
        }, t
    }(jx), Bx = function (n) {
        function t(t) {
            var e = t || {}, i = void 0 !== e.projection ? e.projection : "EPSG:3857",
                r = void 0 !== e.tileGrid ? e.tileGrid : bx({
                    extent: Mx(i),
                    maxZoom: e.maxZoom,
                    minZoom: e.minZoom,
                    tileSize: e.tileSize
                });
            n.call(this, {
                attributions: e.attributions,
                cacheSize: e.cacheSize,
                crossOrigin: e.crossOrigin,
                opaque: e.opaque,
                projection: i,
                reprojectionErrorThreshold: e.reprojectionErrorThreshold,
                tileGrid: r,
                tileLoadFunction: e.tileLoadFunction,
                tilePixelRatio: e.tilePixelRatio,
                tileUrlFunction: e.tileUrlFunction,
                url: e.url,
                urls: e.urls,
                wrapX: void 0 === e.wrapX || e.wrapX,
                transition: e.transition
            })
        }

        return n && (t.__proto__ = n), (t.prototype = Object.create(n && n.prototype)).constructor = t
    }(jx), Xx = function (e) {
        function t(t) {
            e.call(this, {
                attributions: t.attributions,
                cacheSize: t.cacheSize,
                crossOrigin: t.crossOrigin,
                maxZoom: void 0 !== t.maxZoom ? t.maxZoom : 18,
                minZoom: t.minZoom,
                projection: t.projection,
                state: vs,
                wrapX: t.wrapX
            }), this.account_ = t.account, this.mapId_ = t.map || "", this.config_ = t.config || {}, this.templateCache_ = {}, this.initializeMap_()
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.getConfig = function () {
            return this.config_
        }, t.prototype.updateConfig = function (t) {
            E(this.config_, t), this.initializeMap_()
        }, t.prototype.setConfig = function (t) {
            this.config_ = t || {}, this.initializeMap_()
        }, t.prototype.initializeMap_ = function () {
            var t = JSON.stringify(this.config_);
            if (this.templateCache_[t]) this.applyTemplate_(this.templateCache_[t]); else {
                var e = "https://" + this.account_ + ".carto.com/api/v1/map";
                this.mapId_ && (e += "/named/" + this.mapId_);
                var i = new XMLHttpRequest;
                i.addEventListener("load", this.handleInitResponse_.bind(this, t)), i.addEventListener("error", this.handleInitError_.bind(this)), i.open("POST", e), i.setRequestHeader("Content-type", "application/json"), i.send(JSON.stringify(this.config_))
            }
        }, t.prototype.handleInitResponse_ = function (t, e) {
            var i = e.target;
            if (!i.status || 200 <= i.status && i.status < 300) {
                var r;
                try {
                    r = JSON.parse(i.responseText)
                } catch (t) {
                    return void this.setState(xs)
                }
                this.applyTemplate_(r), this.templateCache_[t] = r, this.setState(ms)
            } else this.setState(xs)
        }, t.prototype.handleInitError_ = function (t) {
            this.setState(xs)
        }, t.prototype.applyTemplate_ = function (t) {
            var e = "https://" + t.cdn_url.https + "/" + this.account_ + "/api/v1/map/" + t.layergroupid + "/{z}/{x}/{y}.png";
            this.setUrl(e)
        }, t
    }(Bx), zx = function (e) {
        function t(t) {
            e.call(this, {
                attributions: t.attributions,
                extent: t.extent,
                projection: t.projection,
                wrapX: t.wrapX
            }), this.resolution = void 0, this.distance = void 0 !== t.distance ? t.distance : 20, this.features = [], this.geometryFunction = t.geometryFunction || function (t) {
                var e = t.getGeometry();
                return Z(e instanceof Dr, 10), e
            }, this.source = t.source, C(this.source, w.CHANGE, this.refresh, this)
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.getDistance = function () {
            return this.distance
        }, t.prototype.getSource = function () {
            return this.source
        }, t.prototype.loadFeatures = function (t, e, i) {
            this.source.loadFeatures(t, e, i), e !== this.resolution && (this.clear(), this.resolution = e, this.cluster(), this.addFeatures(this.features))
        }, t.prototype.setDistance = function (t) {
            this.distance = t, this.refresh()
        }, t.prototype.refresh = function () {
            this.clear(), this.cluster(), this.addFeatures(this.features), e.prototype.refresh.call(this)
        }, t.prototype.cluster = function () {
            if (void 0 !== this.resolution) for (var t = [1 / (this.features.length = 0), 1 / 0, -1 / 0, -1 / 0], e = this.distance * this.resolution, i = this.source.getFeatures(), r = {}, n = 0, o = i.length; n < o; n++) {
                var s = i[n];
                if (!(Ct(s).toString() in r)) {
                    var a = this.geometryFunction(s);
                    if (a) {
                        V(a.getCoordinates(), t), G(t, e, t);
                        var h = this.source.getFeaturesInExtent(t);
                        h = h.filter(function (t) {
                            var e = Ct(t).toString();
                            return !(e in r) && (r[e] = !0)
                        }), this.features.push(this.createCluster(h))
                    }
                }
            }
        }, t.prototype.createCluster = function (t) {
            for (var e = [0, 0], i = t.length - 1; 0 <= i; --i) {
                var r = this.geometryFunction(t[i]);
                r ? an(e, r.getCoordinates()) : t.splice(i, 1)
            }
            dn(e, 1 / t.length);
            var n = new Ji(new Dr(e));
            return n.set("features", t), n
        }, t
    }(jh), Vx = function (f) {
        function t(t, e, i, r, n, o) {
            var s = t.getExtent(), a = e.getExtent(), h = a ? ht(i, a) : i, l = xx(t, e, ot(h), r),
                u = new Cx(t, e, h, s, .5 * l), c = o(u.calculateSourceExtent(), l, n), p = di.LOADED;
            c && (p = di.IDLE);
            var d = c ? c.getPixelRatio() : 1;
            f.call(this, i, r, d, p), this.targetProj_ = e, this.maxSourceExtent_ = s, this.triangulation_ = u, this.targetResolution_ = r, this.targetExtent_ = i, this.sourceImage_ = c, this.sourcePixelRatio_ = d, this.canvas_ = null, this.sourceListenerKey_ = null
        }

        return f && (t.__proto__ = f), ((t.prototype = Object.create(f && f.prototype)).constructor = t).prototype.disposeInternal = function () {
            this.state == di.LOADING && this.unlistenSource_(), f.prototype.disposeInternal.call(this)
        }, t.prototype.getImage = function () {
            return this.canvas_
        }, t.prototype.getProjection = function () {
            return this.targetProj_
        }, t.prototype.reproject_ = function () {
            var t = this.sourceImage_.getState();
            if (t == di.LOADED) {
                var e = ct(this.targetExtent_) / this.targetResolution_,
                    i = at(this.targetExtent_) / this.targetResolution_;
                this.canvas_ = Ex(e, i, this.sourcePixelRatio_, this.sourceImage_.getResolution(), this.maxSourceExtent_, this.targetResolution_, this.targetExtent_, this.triangulation_, [{
                    extent: this.sourceImage_.getExtent(),
                    image: this.sourceImage_.getImage()
                }], 0)
            }
            this.state = t, this.changed()
        }, t.prototype.load = function () {
            if (this.state == di.IDLE) {
                this.state = di.LOADING, this.changed();
                var t = this.sourceImage_.getState();
                t == di.LOADED || t == di.ERROR ? this.reproject_() : (this.sourceListenerKey_ = C(this.sourceImage_, w.CHANGE, function (t) {
                    var e = this.sourceImage_.getState();
                    e != di.LOADED && e != di.ERROR || (this.unlistenSource_(), this.reproject_())
                }, this), this.sourceImage_.load())
            }
        }, t.prototype.unlistenSource_ = function () {
            g(this.sourceListenerKey_), this.sourceListenerKey_ = null
        }, t
    }(On), Wx = "imageloadstart", Kx = "imageloadend", Hx = "imageloaderror", Zx = function (i) {
        function t(t, e) {
            i.call(this, t), this.image = e
        }

        return i && (t.__proto__ = i), (t.prototype = Object.create(i && i.prototype)).constructor = t
    }(m), qx = function (e) {
        function t(t) {
            e.call(this, {
                attributions: t.attributions,
                extent: t.extent,
                projection: t.projection,
                state: t.state
            }), this.resolutions_ = void 0 !== t.resolutions ? t.resolutions : null, this.reprojectedImage_ = null, this.reprojectedRevision_ = 0
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.getResolutions = function () {
            return this.resolutions_
        }, t.prototype.findNearestResolution = function (t) {
            if (this.resolutions_) {
                var e = ur(this.resolutions_, t, 0);
                t = this.resolutions_[e]
            }
            return t
        }, t.prototype.getImage = function (t, e, i, r) {
            var n = this.getProjection();
            if (n && r && !ue(n, r)) {
                if (this.reprojectedImage_) {
                    if (this.reprojectedRevision_ == this.getRevision() && ue(this.reprojectedImage_.getProjection(), r) && this.reprojectedImage_.getResolution() == e && $(this.reprojectedImage_.getExtent(), t)) return this.reprojectedImage_;
                    this.reprojectedImage_.dispose(), this.reprojectedImage_ = null
                }
                return this.reprojectedImage_ = new Vx(n, r, t, e, i, function (t, e, i) {
                    return this.getImageInternal(t, e, i, n)
                }.bind(this)), this.reprojectedRevision_ = this.getRevision(), this.reprojectedImage_
            }
            return n && (r = n), this.getImageInternal(t, e, i, r)
        }, t.prototype.getImageInternal = function (t, e, i, r) {
        }, t.prototype.handleImageChange = function (t) {
            var e = t.target;
            switch (e.getState()) {
                case di.LOADING:
                    this.loading = !0, this.dispatchEvent(new Zx(Wx, e));
                    break;
                case di.LOADED:
                    this.loading = !1, this.dispatchEvent(new Zx(Kx, e));
                    break;
                case di.ERROR:
                    this.loading = !1, this.dispatchEvent(new Zx(Hx, e))
            }
        }, t
    }(_h);

    function Jx(t, e) {
        t.getImage().src = e
    }

    function Qx(t, e) {
        var i = [];
        Object.keys(e).forEach(function (t) {
            null !== e[t] && void 0 !== e[t] && i.push(t + "=" + encodeURIComponent(e[t]))
        });
        var r = i.join("&");
        return (t = -1 === (t = t.replace(/[?&]$/, "")).indexOf("?") ? t + "?" : t + "&") + r
    }

    var $x = function (i) {
        function t(t) {
            var e = t || {};
            i.call(this, {
                attributions: e.attributions,
                projection: e.projection,
                resolutions: e.resolutions
            }), this.crossOrigin_ = void 0 !== e.crossOrigin ? e.crossOrigin : null, this.hidpi_ = void 0 === e.hidpi || e.hidpi, this.url_ = e.url, this.imageLoadFunction_ = void 0 !== e.imageLoadFunction ? e.imageLoadFunction : Jx, this.params_ = e.params || {}, this.image_ = null, this.imageSize_ = [0, 0], this.renderedRevision_ = 0, this.ratio_ = void 0 !== e.ratio ? e.ratio : 1.5
        }

        return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.getParams = function () {
            return this.params_
        }, t.prototype.getImageInternal = function (t, e, i, r) {
            if (void 0 === this.url_) return null;
            e = this.findNearestResolution(e), i = this.hidpi_ ? i : 1;
            var n = this.image_;
            if (n && this.renderedRevision_ == this.getRevision() && n.getResolution() == e && n.getPixelRatio() == i && Q(n.getExtent(), t)) return n;
            var o = {F: "image", FORMAT: "PNG32", TRANSPARENT: !0};
            E(o, this.params_);
            var s = ((t = t.slice())[0] + t[2]) / 2, a = (t[1] + t[3]) / 2;
            if (1 != this.ratio_) {
                var h = this.ratio_ * ct(t) / 2, l = this.ratio_ * at(t) / 2;
                t[0] = s - h, t[1] = a - l, t[2] = s + h, t[3] = a + l
            }
            var u = e / i, c = Math.ceil(ct(t) / u), p = Math.ceil(at(t) / u);
            t[0] = s - u * c / 2, t[2] = s + u * c / 2, t[1] = a - u * p / 2, t[3] = a + u * p / 2, this.imageSize_[0] = c, this.imageSize_[1] = p;
            var d = this.getRequestUrl_(t, this.imageSize_, i, r, o);
            return this.image_ = new Nn(t, e, i, d, this.crossOrigin_, this.imageLoadFunction_), this.renderedRevision_ = this.getRevision(), C(this.image_, w.CHANGE, this.handleImageChange, this), this.image_
        }, t.prototype.getImageLoadFunction = function () {
            return this.imageLoadFunction_
        }, t.prototype.getRequestUrl_ = function (t, e, i, r, n) {
            var o = r.getCode().split(":").pop();
            n.SIZE = e[0] + "," + e[1], n.BBOX = t.join(","), n.BBOXSR = o, n.IMAGESR = o, n.DPI = Math.round(90 * i);
            var s = this.url_,
                a = s.replace(/MapServer\/?$/, "MapServer/export").replace(/ImageServer\/?$/, "ImageServer/exportImage");
            return a == s && Z(!1, 50), Qx(a, n)
        }, t.prototype.getUrl = function () {
            return this.url_
        }, t.prototype.setImageLoadFunction = function (t) {
            this.image_ = null, this.imageLoadFunction_ = t, this.changed()
        }, t.prototype.setUrl = function (t) {
            t != this.url_ && (this.url_ = t, this.image_ = null, this.changed())
        }, t.prototype.updateParams = function (t) {
            E(this.params_, t), this.image_ = null, this.changed()
        }, t
    }(qx), tS = function (e) {
        function t(t) {
            e.call(this, {
                attributions: t.attributions,
                projection: t.projection,
                resolutions: t.resolutions,
                state: t.state
            }), this.canvasFunction_ = t.canvasFunction, this.canvas_ = null, this.renderedRevision_ = 0, this.ratio_ = void 0 !== t.ratio ? t.ratio : 1.5
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.getImageInternal = function (t, e, i, r) {
            e = this.findNearestResolution(e);
            var n = this.canvas_;
            if (n && this.renderedRevision_ == this.getRevision() && n.getResolution() == e && n.getPixelRatio() == i && Q(n.getExtent(), t)) return n;
            dt(t = t.slice(), this.ratio_);
            var o = [ct(t) / e * i, at(t) / e * i], s = this.canvasFunction_(t, e, i, o, r);
            return s && (n = new Fl(t, e, i, s)), this.canvas_ = n, this.renderedRevision_ = this.getRevision(), n
        }, t
    }(qx), eS = function (e) {
        function t(t) {
            e.call(this, {
                projection: t.projection,
                resolutions: t.resolutions
            }), this.crossOrigin_ = void 0 !== t.crossOrigin ? t.crossOrigin : null, this.displayDpi_ = void 0 !== t.displayDpi ? t.displayDpi : 96, this.params_ = t.params || {}, this.url_ = t.url, this.imageLoadFunction_ = void 0 !== t.imageLoadFunction ? t.imageLoadFunction : Jx, this.hidpi_ = void 0 === t.hidpi || t.hidpi, this.metersPerUnit_ = void 0 !== t.metersPerUnit ? t.metersPerUnit : 1, this.ratio_ = void 0 !== t.ratio ? t.ratio : 1, this.useOverlay_ = void 0 !== t.useOverlay && t.useOverlay, this.image_ = null, this.renderedRevision_ = 0
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.getParams = function () {
            return this.params_
        }, t.prototype.getImageInternal = function (t, e, i, r) {
            e = this.findNearestResolution(e), i = this.hidpi_ ? i : 1;
            var n = this.image_;
            if (n && this.renderedRevision_ == this.getRevision() && n.getResolution() == e && n.getPixelRatio() == i && Q(n.getExtent(), t)) return n;
            1 != this.ratio_ && dt(t = t.slice(), this.ratio_);
            var o = [ct(t) / e * i, at(t) / e * i];
            if (void 0 !== this.url_) {
                var s = this.getUrl(this.url_, this.params_, t, o, r);
                C(n = new Nn(t, e, i, s, this.crossOrigin_, this.imageLoadFunction_), w.CHANGE, this.handleImageChange, this)
            } else n = null;
            return this.image_ = n, this.renderedRevision_ = this.getRevision(), n
        }, t.prototype.getImageLoadFunction = function () {
            return this.imageLoadFunction_
        }, t.prototype.updateParams = function (t) {
            E(this.params_, t), this.changed()
        }, t.prototype.getUrl = function (t, e, i, r, n) {
            var o, s, a, h, l, u, c, p, d,
                f = (o = i, s = r, a = this.metersPerUnit_, h = this.displayDpi_, l = ct(o), u = at(o), c = s[0], p = s[1], d = .0254 / h, c * u < p * l ? l * a / (c * d) : u * a / (p * d)),
                _ = ot(i), g = {
                    OPERATION: this.useOverlay_ ? "GETDYNAMICMAPOVERLAYIMAGE" : "GETMAPIMAGE",
                    VERSION: "2.0.0",
                    LOCALE: "en",
                    CLIENTAGENT: "ol/source/ImageMapGuide source",
                    CLIP: "1",
                    SETDISPLAYDPI: this.displayDpi_,
                    SETDISPLAYWIDTH: Math.round(r[0]),
                    SETDISPLAYHEIGHT: Math.round(r[1]),
                    SETVIEWSCALE: f,
                    SETVIEWCENTERX: _[0],
                    SETVIEWCENTERY: _[1]
                };
            return E(g, e), Qx(t, g)
        }, t.prototype.setImageLoadFunction = function (t) {
            this.image_ = null, this.imageLoadFunction_ = t, this.changed()
        }, t
    }(qx);
    var iS = function (l) {
            function t(t) {
                var e = void 0 !== t.crossOrigin ? t.crossOrigin : null,
                    i = void 0 !== t.imageLoadFunction ? t.imageLoadFunction : Jx;
                l.call(this, {
                    attributions: t.attributions,
                    projection: ne(t.projection)
                }), this.url_ = t.url, this.imageExtent_ = t.imageExtent, this.image_ = new Nn(this.imageExtent_, void 0, 1, this.url_, e, i), this.imageSize_ = t.imageSize ? t.imageSize : null, C(this.image_, w.CHANGE, this.handleImageChange, this)
            }

            return l && (t.__proto__ = l), ((t.prototype = Object.create(l && l.prototype)).constructor = t).prototype.getImageExtent = function () {
                return this.imageExtent_
            }, t.prototype.getImageInternal = function (t, e, i, r) {
                return wt(t, this.image_.getExtent()) ? this.image_ : null
            }, t.prototype.getUrl = function () {
                return this.url_
            }, t.prototype.handleImageChange = function (t) {
                if (this.image_.getState() == di.LOADED) {
                    var e, i, r = this.image_.getExtent(), n = this.image_.getImage();
                    this.imageSize_ ? (e = this.imageSize_[0], i = this.imageSize_[1]) : (e = n.width, i = n.height);
                    var o = at(r) / i, s = Math.ceil(ct(r) / o);
                    if (s != e) {
                        var a = De(s, i), h = a.canvas;
                        a.drawImage(n, 0, 0, e, i, 0, 0, h.width, h.height), this.image_.setImage(h)
                    }
                }
                l.prototype.handleImageChange.call(this, t)
            }, t
        }(qx), rS = "1.3.0", nS = "carmentaserver", oS = "geoserver", sS = "mapserver", aS = "qgis", hS = [101, 101],
        lS = function (i) {
            function t(t) {
                var e = t || {};
                i.call(this, {
                    attributions: e.attributions,
                    projection: e.projection,
                    resolutions: e.resolutions
                }), this.crossOrigin_ = void 0 !== e.crossOrigin ? e.crossOrigin : null, this.url_ = e.url, this.imageLoadFunction_ = void 0 !== e.imageLoadFunction ? e.imageLoadFunction : Jx, this.params_ = e.params || {}, this.v13_ = !0, this.updateV13_(), this.serverType_ = e.serverType, this.hidpi_ = void 0 === e.hidpi || e.hidpi, this.image_ = null, this.imageSize_ = [0, 0], this.renderedRevision_ = 0, this.ratio_ = void 0 !== e.ratio ? e.ratio : 1.5
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.getGetFeatureInfoUrl = function (t, e, i, r) {
                if (void 0 !== this.url_) {
                    var n = ne(i), o = this.getProjection();
                    o && o !== n && (e = xx(o, n, t, e), t = de(t, n, o));
                    var s = st(t, e, 0, hS), a = {
                        SERVICE: "WMS",
                        VERSION: rS,
                        REQUEST: "GetFeatureInfo",
                        FORMAT: "image/png",
                        TRANSPARENT: !0,
                        QUERY_LAYERS: this.params_.LAYERS
                    };
                    E(a, this.params_, r);
                    var h = Math.floor((t[0] - s[0]) / e), l = Math.floor((s[3] - t[1]) / e);
                    return a[this.v13_ ? "I" : "X"] = h, a[this.v13_ ? "J" : "Y"] = l, this.getRequestUrl_(s, hS, 1, o || n, a)
                }
            }, t.prototype.getParams = function () {
                return this.params_
            }, t.prototype.getImageInternal = function (t, e, i, r) {
                if (void 0 === this.url_) return null;
                e = this.findNearestResolution(e), 1 == i || this.hidpi_ && void 0 !== this.serverType_ || (i = 1);
                var n = e / i, o = ot(t), s = st(o, n, 0, [Math.ceil(ct(t) / n), Math.ceil(at(t) / n)]),
                    a = st(o, n, 0, [Math.ceil(this.ratio_ * ct(t) / n), Math.ceil(this.ratio_ * at(t) / n)]),
                    h = this.image_;
                if (h && this.renderedRevision_ == this.getRevision() && h.getResolution() == e && h.getPixelRatio() == i && Q(h.getExtent(), s)) return h;
                var l = {SERVICE: "WMS", VERSION: rS, REQUEST: "GetMap", FORMAT: "image/png", TRANSPARENT: !0};
                E(l, this.params_), this.imageSize_[0] = Math.round(ct(a) / n), this.imageSize_[1] = Math.round(at(a) / n);
                var u = this.getRequestUrl_(a, this.imageSize_, i, r, l);
                return this.image_ = new Nn(a, e, i, u, this.crossOrigin_, this.imageLoadFunction_), this.renderedRevision_ = this.getRevision(), C(this.image_, w.CHANGE, this.handleImageChange, this), this.image_
            }, t.prototype.getImageLoadFunction = function () {
                return this.imageLoadFunction_
            }, t.prototype.getRequestUrl_ = function (t, e, i, r, n) {
                if (Z(void 0 !== this.url_, 9), n[this.v13_ ? "CRS" : "SRS"] = r.getCode(), "STYLES" in this.params_ || (n.STYLES = ""), 1 != i) switch (this.serverType_) {
                    case oS:
                        var o = 90 * i + .5 | 0;
                        "FORMAT_OPTIONS" in n ? n.FORMAT_OPTIONS += ";dpi:" + o : n.FORMAT_OPTIONS = "dpi:" + o;
                        break;
                    case sS:
                        n.MAP_RESOLUTION = 90 * i;
                        break;
                    case nS:
                    case aS:
                        n.DPI = 90 * i;
                        break;
                    default:
                        Z(!1, 8)
                }
                n.WIDTH = e[0], n.HEIGHT = e[1];
                var s, a = r.getAxisOrientation();
                return s = this.v13_ && "ne" == a.substr(0, 2) ? [t[1], t[0], t[3], t[2]] : t, n.BBOX = s.join(","), Qx(this.url_, n)
            }, t.prototype.getUrl = function () {
                return this.url_
            }, t.prototype.setImageLoadFunction = function (t) {
                this.image_ = null, this.imageLoadFunction_ = t, this.changed()
            }, t.prototype.setUrl = function (t) {
                t != this.url_ && (this.url_ = t, this.image_ = null, this.changed())
            }, t.prototype.updateParams = function (t) {
                E(this.params_, t), this.updateV13_(), this.image_ = null, this.changed()
            }, t.prototype.updateV13_ = function () {
                var t = this.params_.VERSION || rS;
                this.v13_ = 0 <= sn(t, "1.3")
            }, t
        }(qx), uS = '&#169; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.',
        cS = function (o) {
            function t(t) {
                var e, i = t || {};
                e = void 0 !== i.attributions ? i.attributions : [uS];
                var r = void 0 !== i.crossOrigin ? i.crossOrigin : "anonymous",
                    n = void 0 !== i.url ? i.url : "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png";
                o.call(this, {
                    attributions: e,
                    cacheSize: i.cacheSize,
                    crossOrigin: r,
                    opaque: void 0 === i.opaque || i.opaque,
                    maxZoom: void 0 !== i.maxZoom ? i.maxZoom : 19,
                    reprojectionErrorThreshold: i.reprojectionErrorThreshold,
                    tileLoadFunction: i.tileLoadFunction,
                    url: n,
                    wrapX: i.wrapX
                })
            }

            return o && (t.__proto__ = o), (t.prototype = Object.create(o && o.prototype)).constructor = t
        }(Bx), pS = !0;
    try {
        new ImageData(10, 10)
    } catch (t) {
        pS = !1
    }
    var dS = document.createElement("canvas").getContext("2d");
    var fS = {
        newImageData: function (t, e, i) {
            if (pS) return new ImageData(t, e, i);
            var r = dS.createImageData(e, i);
            return r.data.set(t), r
        }
    }.newImageData;

    function _S(x) {
        var S = !0;
        try {
            new ImageData(10, 10)
        } catch (t) {
            S = !1
        }
        return function (t) {
            var e, i, r, n, o, s = t.buffers, a = t.meta, h = t.imageOps, l = t.width, u = t.height, c = s.length,
                p = s[0].byteLength;
            if (h) {
                var d = new Array(c);
                for (i = 0; i < c; ++i) d[i] = (r = new Uint8ClampedArray(s[i]), n = l, o = u, S ? new ImageData(r, n, o) : {
                    data: r,
                    width: n,
                    height: o
                });
                e = x(d, a).data
            } else {
                e = new Uint8ClampedArray(p);
                var f = new Array(c), _ = new Array(c);
                for (i = 0; i < c; ++i) f[i] = new Uint8ClampedArray(s[i]), _[i] = [0, 0, 0, 0];
                for (var g = 0; g < p; g += 4) {
                    for (var y = 0; y < c; ++y) {
                        var v = f[y];
                        _[y][0] = v[g], _[y][1] = v[g + 1], _[y][2] = v[g + 2], _[y][3] = v[g + 3]
                    }
                    var m = x(_, a);
                    e[g] = m[0], e[g + 1] = m[1], e[g + 2] = m[2], e[g + 3] = m[3]
                }
            }
            return e.buffer
        }
    }

    function gS(e, t) {
        var i = Object.keys(e.lib || {}).map(function (t) {
                return "var " + t + " = " + e.lib[t].toString() + ";"
            }).concat(["var __minion__ = (" + _S.toString() + ")(", e.operation.toString(), ");", 'self.addEventListener("message", function(event) {', "  var buffer = __minion__(event.data);", "  self.postMessage({buffer: buffer, meta: event.data.meta}, [buffer]);", "});"]),
            r = new Blob(i, {type: "text/javascript"}), n = URL.createObjectURL(r), o = new Worker(n);
        return o.addEventListener("message", t), o
    }

    function yS(t) {
        var e;
        this._imageOps = !!t.imageOps;
        var i, r, n, o = [];
        if (e = 0 === t.threads ? 0 : this._imageOps ? 1 : t.threads || 1) for (var s = 0; s < e; ++s) o[s] = gS(t, this._onWorkerMessage.bind(this, s)); else o[0] = (i = t, r = this._onWorkerMessage.bind(this, 0), n = _S(i.operation), {
            postMessage: function (t) {
                setTimeout(function () {
                    r({data: {buffer: n(t), meta: t.meta}})
                }, 0)
            }
        });
        this._workers = o, this._queue = [], this._maxQueueLength = t.queue || 1 / 0, this._running = 0, this._dataLookup = {}, this._job = null
    }

    yS.prototype.process = function (t, e, i) {
        this._enqueue({inputs: t, meta: e, callback: i}), this._dispatch()
    }, yS.prototype.destroy = function () {
        for (var t in this) this[t] = null;
        this._destroyed = !0
    }, yS.prototype._enqueue = function (t) {
        for (this._queue.push(t); this._queue.length > this._maxQueueLength;) this._queue.shift().callback(null, null)
    }, yS.prototype._dispatch = function () {
        if (0 === this._running && 0 < this._queue.length) {
            var t = this._job = this._queue.shift(), e = t.inputs[0].width, i = t.inputs[0].height,
                r = t.inputs.map(function (t) {
                    return t.data.buffer
                }), n = this._workers.length;
            if (1 === (this._running = n)) this._workers[0].postMessage({
                buffers: r,
                meta: t.meta,
                imageOps: this._imageOps,
                width: e,
                height: i
            }, r); else for (var o = t.inputs[0].data.length, s = 4 * Math.ceil(o / 4 / n), a = 0; a < n; ++a) {
                for (var h = a * s, l = [], u = 0, c = r.length; u < c; ++u) l.push(r[a].slice(h, h + s));
                this._workers[a].postMessage({
                    buffers: l,
                    meta: t.meta,
                    imageOps: this._imageOps,
                    width: e,
                    height: i
                }, l)
            }
        }
    }, yS.prototype._onWorkerMessage = function (t, e) {
        this._destroyed || (this._dataLookup[t] = e.data, --this._running, 0 === this._running && this._resolveJob())
    }, yS.prototype._resolveJob = function () {
        var t, e, i = this._job, r = this._workers.length;
        if (1 === r) t = new Uint8ClampedArray(this._dataLookup[0].buffer), e = this._dataLookup[0].meta; else {
            var n = i.inputs[0].data.length;
            t = new Uint8ClampedArray(n), e = new Array(n);
            for (var o = 4 * Math.ceil(n / 4 / r), s = 0; s < r; ++s) {
                var a = this._dataLookup[s].buffer, h = s * o;
                t.set(new Uint8ClampedArray(a), h), e[s] = this._dataLookup[s].meta
            }
        }
        this._job = null, this._dataLookup = {}, i.callback(null, fS(t, i.inputs[0].width, i.inputs[0].height), e), this._dispatch()
    };
    var vS = yS, mS = "beforeoperations", xS = "afteroperations", SS = "pixel", ES = "image", CS = function (r) {
        function t(t, e, i) {
            r.call(this, t), this.extent = e.extent, this.resolution = e.viewState.resolution / e.pixelRatio, this.data = i
        }

        return r && (t.__proto__ = r), (t.prototype = Object.create(r && r.prototype)).constructor = t
    }(m), TS = function (a) {
        function t(t) {
            a.call(this, {}), this.worker_ = null, this.operationType_ = void 0 !== t.operationType ? t.operationType : SS, this.threads_ = void 0 !== t.threads ? t.threads : 1, this.renderers_ = function (t) {
                for (var e = t.length, i = new Array(e), r = 0; r < e; ++r) i[r] = IS(t[r]);
                return i
            }(t.sources);
            for (var e = 0, i = this.renderers_.length; e < i; ++e) C(this.renderers_[e], w.CHANGE, this.changed, this);
            this.tileQueue_ = new qo(function () {
                return 1
            }, this.changed.bind(this));
            for (var r = this.renderers_.map(function (t) {
                return t.getLayer().getLayerState()
            }), n = {}, o = 0, s = r.length; o < s; ++o) n[Ct(r[o].layer)] = r[o];
            this.requestedFrameState_, this.renderedImageCanvas_ = null, this.renderedRevision_, this.frameState_ = {
                animate: !1,
                coordinateToPixelTransform: [1, 0, 0, 1, 0, 0],
                extent: null,
                focus: null,
                index: 0,
                layerStates: n,
                layerStatesArray: r,
                pixelRatio: 1,
                pixelToCoordinateTransform: [1, 0, 0, 1, 0, 0],
                postRenderFunctions: [],
                size: [0, 0],
                skippedFeatureUids: {},
                tileQueue: this.tileQueue_,
                time: Date.now(),
                usedTiles: {},
                viewState: {rotation: 0},
                viewHints: [],
                wantedTiles: {}
            }, void 0 !== t.operation && this.setOperation(t.operation, t.lib)
        }

        return a && (t.__proto__ = a), ((t.prototype = Object.create(a && a.prototype)).constructor = t).prototype.setOperation = function (t, e) {
            this.worker_ = new vS({
                operation: t,
                imageOps: this.operationType_ === ES,
                queue: 1,
                lib: e,
                threads: this.threads_
            }), this.changed()
        }, t.prototype.updateFrameState_ = function (t, e, i) {
            var r = E({}, this.frameState_);
            r.viewState = E({}, r.viewState);
            var n = ot(t);
            r.extent = t.slice(), r.focus = n, r.size[0] = Math.round(ct(t) / e), r.size[1] = Math.round(at(t) / e), r.time = Date.now(), r.animate = !1;
            var o = r.viewState;
            return o.center = n, o.projection = i, o.resolution = e, r
        }, t.prototype.allSourcesReady_ = function () {
            for (var t = !0, e = 0, i = this.renderers_.length; e < i; ++e) if (this.renderers_[e].getLayer().getSource().getState() !== ms) {
                t = !1;
                break
            }
            return t
        }, t.prototype.getImage = function (t, e, i, r) {
            if (!this.allSourcesReady_()) return null;
            var n = this.updateFrameState_(t, e, r);
            if (this.requestedFrameState_ = n, this.renderedImageCanvas_) {
                var o = this.renderedImageCanvas_.getResolution(), s = this.renderedImageCanvas_.getExtent();
                e === o && $(t, s) || (this.renderedImageCanvas_ = null)
            }
            return this.renderedImageCanvas_ && this.getRevision() === this.renderedRevision_ || this.processSources_(), n.tileQueue.loadMoreTiles(16, 16), n.animate && requestAnimationFrame(this.changed.bind(this)), this.renderedImageCanvas_
        }, t.prototype.processSources_ = function () {
            for (var t = this.requestedFrameState_, e = this.renderers_.length, i = new Array(e), r = 0; r < e; ++r) {
                var n = RS(this.renderers_[r], t, t.layerStatesArray[r]);
                if (!n) return;
                i[r] = n
            }
            var o = {};
            this.dispatchEvent(new CS(mS, t, o)), this.worker_.process(i, o, this.onWorkerComplete_.bind(this, t))
        }, t.prototype.onWorkerComplete_ = function (t, e, i, r) {
            if (!e && i) {
                var n = t.extent, o = t.viewState.resolution;
                if (o === this.requestedFrameState_.viewState.resolution && $(n, this.requestedFrameState_.extent)) {
                    var s;
                    if (this.renderedImageCanvas_) s = this.renderedImageCanvas_.getImage().getContext("2d"); else s = De(Math.round(ct(n) / o), Math.round(at(n) / o)), this.renderedImageCanvas_ = new Fl(n, o, 1, s.canvas);
                    s.putImageData(i, 0, 0), this.changed(), this.renderedRevision_ = this.getRevision(), this.dispatchEvent(new CS(xS, t, r))
                }
            }
        }, t.prototype.getImageInternal = function () {
            return null
        }, t
    }(qx), wS = null;

    function RS(t, e, i) {
        if (!t.prepareFrame(e, i)) return null;
        var r = e.size[0], n = e.size[1];
        if (wS) {
            var o = wS.canvas;
            o.width !== r || o.height !== n ? wS = De(r, n) : wS.clearRect(0, 0, r, n)
        } else wS = De(r, n);
        return t.composeFrame(e, i, wS), wS.getImageData(0, 0, r, n)
    }

    function IS(t) {
        var e, i, r = null;
        return t instanceof Ox ? (i = new ax({source: t}), r = new Hl(i)) : t instanceof qx ? (e = new nx({source: t}), r = new Vl(e)) : t instanceof ax ? r = new Hl(t) : t instanceof Ls && (t.getType() == sh.IMAGE || t.getType() == sh.VECTOR) && (r = new Vl(t)), r
    }

    var LS = ['Map tiles by <a href="https://stamen.com/">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.', uS],
        bS = {
            terrain: {extension: "jpg", opaque: !0},
            "terrain-background": {extension: "jpg", opaque: !0},
            "terrain-labels": {extension: "png", opaque: !1},
            "terrain-lines": {extension: "png", opaque: !1},
            "toner-background": {extension: "png", opaque: !0},
            toner: {extension: "png", opaque: !0},
            "toner-hybrid": {extension: "png", opaque: !1},
            "toner-labels": {extension: "png", opaque: !1},
            "toner-lines": {extension: "png", opaque: !1},
            "toner-lite": {extension: "png", opaque: !0},
            watercolor: {extension: "jpg", opaque: !0}
        }, FS = {
            terrain: {minZoom: 4, maxZoom: 18},
            toner: {minZoom: 0, maxZoom: 20},
            watercolor: {minZoom: 1, maxZoom: 16}
        }, PS = function (s) {
            function t(t) {
                var e = t.layer.indexOf("-"), i = -1 == e ? t.layer : t.layer.slice(0, e), r = FS[i], n = bS[t.layer],
                    o = void 0 !== t.url ? t.url : "https://stamen-tiles-{a-d}.a.ssl.fastly.net/" + t.layer + "/{z}/{x}/{y}." + n.extension;
                s.call(this, {
                    attributions: LS,
                    cacheSize: t.cacheSize,
                    crossOrigin: "anonymous",
                    maxZoom: null != t.maxZoom ? t.maxZoom : r.maxZoom,
                    minZoom: null != t.minZoom ? t.minZoom : r.minZoom,
                    opaque: n.opaque,
                    reprojectionErrorThreshold: t.reprojectionErrorThreshold,
                    tileLoadFunction: t.tileLoadFunction,
                    url: o,
                    wrapX: t.wrapX
                })
            }

            return s && (t.__proto__ = s), (t.prototype = Object.create(s && s.prototype)).constructor = t
        }(Bx), MS = function (i) {
            function t(t) {
                var e = t || {};
                i.call(this, {
                    attributions: e.attributions,
                    cacheSize: e.cacheSize,
                    crossOrigin: e.crossOrigin,
                    projection: e.projection,
                    reprojectionErrorThreshold: e.reprojectionErrorThreshold,
                    tileGrid: e.tileGrid,
                    tileLoadFunction: e.tileLoadFunction,
                    url: e.url,
                    urls: e.urls,
                    wrapX: void 0 === e.wrapX || e.wrapX,
                    transition: e.transition
                }), this.params_ = e.params || {}, this.tmpExtent_ = [1 / 0, 1 / 0, -1 / 0, -1 / 0], this.setKey(this.getKeyForParams_())
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.getKeyForParams_ = function () {
                var t = 0, e = [];
                for (var i in this.params_) e[t++] = i + "-" + this.params_[i];
                return e.join("/")
            }, t.prototype.getParams = function () {
                return this.params_
            }, t.prototype.getRequestUrl_ = function (t, e, i, r, n, o) {
                var s = this.urls;
                if (s) {
                    var a, h = n.getCode().split(":").pop();
                    if (o.SIZE = e[0] + "," + e[1], o.BBOX = i.join(","), o.BBOXSR = h, o.IMAGESR = h, o.DPI = Math.round(o.DPI ? o.DPI * r : 90 * r), 1 == s.length) a = s[0]; else a = s[Et(px(t), s.length)];
                    return Qx(a.replace(/MapServer\/?$/, "MapServer/export").replace(/ImageServer\/?$/, "ImageServer/exportImage"), o)
                }
            }, t.prototype.getTilePixelRatio = function (t) {
                return t
            }, t.prototype.fixedTileUrlFunction = function (t, e, i) {
                var r = this.getTileGrid();
                if (r || (r = this.getTileGridForProjection(i)), !(r.getResolutions().length <= t[0])) {
                    var n = r.getTileCoordExtent(t, this.tmpExtent_), o = ws(r.getTileSize(t[0]), this.tmpSize);
                    1 != e && (o = Ts(o, e, this.tmpSize));
                    var s = {F: "image", FORMAT: "PNG32", TRANSPARENT: !0};
                    return E(s, this.params_), this.getRequestUrl_(t, o, n, e, i, s)
                }
            }, t.prototype.updateParams = function (t) {
                E(this.params_, t), this.setKey(this.getKeyForParams_())
            }, t
        }(jx), OS = function (r) {
            function t(t, e, i) {
                r.call(this, t, kn), this.tileSize_ = e, this.text_ = i, this.canvas_ = null
            }

            return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype.getImage = function () {
                if (this.canvas_) return this.canvas_;
                var t = this.tileSize_, e = De(t[0], t[1]);
                return e.strokeStyle = "black", e.strokeRect(.5, .5, t[0] + .5, t[1] + .5), e.fillStyle = "black", e.textAlign = "center", e.textBaseline = "middle", e.font = "24px sans-serif", e.fillText(this.text_, t[0] / 2, t[1] / 2), this.canvas_ = e.canvas, e.canvas
            }, t.prototype.load = function () {
            }, t
        }(Vn), NS = function (e) {
            function t(t) {
                e.call(this, {
                    opaque: !1,
                    projection: t.projection,
                    tileGrid: t.tileGrid,
                    wrapX: void 0 === t.wrapX || t.wrapX
                })
            }

            return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.getTile = function (t, e, i) {
                var r = ux(t, e, i);
                if (this.tileCache.containsKey(r)) return this.tileCache.get(r);
                var n = ws(this.tileGrid.getTileSize(t)), o = [t, e, i], s = this.getTileCoordForTileUrlFunction(o),
                    a = s ? this.getTileCoordForTileUrlFunction(s).toString() : "", h = new OS(o, n, a);
                return this.tileCache.set(r, h), h
            }, t
        }(Ox), AS = function (i) {
            function t(t) {
                if (i.call(this, {
                    attributions: t.attributions,
                    cacheSize: t.cacheSize,
                    crossOrigin: t.crossOrigin,
                    projection: ne("EPSG:3857"),
                    reprojectionErrorThreshold: t.reprojectionErrorThreshold,
                    state: vs,
                    tileLoadFunction: t.tileLoadFunction,
                    wrapX: void 0 === t.wrapX || t.wrapX,
                    transition: t.transition
                }), this.tileJSON_ = null, t.url) if (t.jsonp) vx(t.url, this.handleTileJSONResponse.bind(this), this.handleTileJSONError.bind(this)); else {
                    var e = new XMLHttpRequest;
                    e.addEventListener("load", this.onXHRLoad_.bind(this)), e.addEventListener("error", this.onXHRError_.bind(this)), e.open("GET", t.url), e.send()
                } else t.tileJSON ? this.handleTileJSONResponse(t.tileJSON) : Z(!1, 51)
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.onXHRLoad_ = function (t) {
                var e = t.target;
                if (!e.status || 200 <= e.status && e.status < 300) {
                    var i;
                    try {
                        i = JSON.parse(e.responseText)
                    } catch (t) {
                        return void this.handleTileJSONError()
                    }
                    this.handleTileJSONResponse(i)
                } else this.handleTileJSONError()
            }, t.prototype.onXHRError_ = function (t) {
                this.handleTileJSONError()
            }, t.prototype.getTileJSON = function () {
                return this.tileJSON_
            }, t.prototype.handleTileJSONResponse = function (e) {
                var t, i = ne("EPSG:4326"), r = this.getProjection();
                if (void 0 !== e.bounds) {
                    var n = ce(i, r);
                    t = ft(e.bounds, n)
                }
                var o = e.minzoom || 0, s = e.maxzoom || 22, a = bx({extent: Mx(r), maxZoom: s, minZoom: o});
                if (this.tileGrid = a, this.tileUrlFunction = fx(e.tiles, a), void 0 !== e.attribution && !this.getAttributions()) {
                    var h = void 0 !== t ? t : i.getExtent();
                    this.setAttributions(function (t) {
                        return wt(h, t.extent) ? [e.attribution] : null
                    })
                }
                this.tileJSON_ = e, this.setState(ms)
            }, t.prototype.handleTileJSONError = function () {
                this.setState(xs)
            }, t
        }(jx), GS = function (n) {
            function t(t) {
                var e = t || {}, i = e.params || {}, r = !("TRANSPARENT" in i) || i.TRANSPARENT;
                n.call(this, {
                    attributions: e.attributions,
                    cacheSize: e.cacheSize,
                    crossOrigin: e.crossOrigin,
                    opaque: !r,
                    projection: e.projection,
                    reprojectionErrorThreshold: e.reprojectionErrorThreshold,
                    tileClass: e.tileClass,
                    tileGrid: e.tileGrid,
                    tileLoadFunction: e.tileLoadFunction,
                    url: e.url,
                    urls: e.urls,
                    wrapX: void 0 === e.wrapX || e.wrapX,
                    transition: e.transition
                }), this.gutter_ = void 0 !== e.gutter ? e.gutter : 0, this.params_ = i, this.v13_ = !0, this.serverType_ = e.serverType, this.hidpi_ = void 0 === e.hidpi || e.hidpi, this.tmpExtent_ = [1 / 0, 1 / 0, -1 / 0, -1 / 0], this.updateV13_(), this.setKey(this.getKeyForParams_())
            }

            return n && (t.__proto__ = n), ((t.prototype = Object.create(n && n.prototype)).constructor = t).prototype.getGetFeatureInfoUrl = function (t, e, i, r) {
                var n = ne(i), o = this.getProjection(), s = this.getTileGrid();
                s || (s = this.getTileGridForProjection(n));
                var a = s.getTileCoordForCoordAndResolution(t, e);
                if (!(s.getResolutions().length <= a[0])) {
                    var h = s.getResolution(a[0]), l = s.getTileCoordExtent(a, this.tmpExtent_),
                        u = ws(s.getTileSize(a[0]), this.tmpSize), c = this.gutter_;
                    0 !== c && (u = Cs(u, c, this.tmpSize), l = G(l, h * c, l)), o && o !== n && (h = xx(o, n, t, h), l = fe(l, n, o), t = de(t, n, o));
                    var p = {
                        SERVICE: "WMS",
                        VERSION: rS,
                        REQUEST: "GetFeatureInfo",
                        FORMAT: "image/png",
                        TRANSPARENT: !0,
                        QUERY_LAYERS: this.params_.LAYERS
                    };
                    E(p, this.params_, r);
                    var d = Math.floor((t[0] - l[0]) / h), f = Math.floor((l[3] - t[1]) / h);
                    return p[this.v13_ ? "I" : "X"] = d, p[this.v13_ ? "J" : "Y"] = f, this.getRequestUrl_(a, u, l, 1, o || n, p)
                }
            }, t.prototype.getGutter = function () {
                return this.gutter_
            }, t.prototype.getParams = function () {
                return this.params_
            }, t.prototype.getRequestUrl_ = function (t, e, i, r, n, o) {
                var s = this.urls;
                if (s) {
                    if (o.WIDTH = e[0], o.HEIGHT = e[1], o[this.v13_ ? "CRS" : "SRS"] = n.getCode(), "STYLES" in this.params_ || (o.STYLES = ""), 1 != r) switch (this.serverType_) {
                        case oS:
                            var a = 90 * r + .5 | 0;
                            "FORMAT_OPTIONS" in o ? o.FORMAT_OPTIONS += ";dpi:" + a : o.FORMAT_OPTIONS = "dpi:" + a;
                            break;
                        case sS:
                            o.MAP_RESOLUTION = 90 * r;
                            break;
                        case nS:
                        case aS:
                            o.DPI = 90 * r;
                            break;
                        default:
                            Z(!1, 52)
                    }
                    var h, l, u = n.getAxisOrientation(), c = i;
                    if (this.v13_ && "ne" == u.substr(0, 2)) h = i[0], c[0] = i[1], c[1] = h, h = i[2], c[2] = i[3], c[3] = h;
                    if (o.BBOX = c.join(","), 1 == s.length) l = s[0]; else l = s[Et(px(t), s.length)];
                    return Qx(l, o)
                }
            }, t.prototype.getTilePixelRatio = function (t) {
                return this.hidpi_ && void 0 !== this.serverType_ ? t : 1
            }, t.prototype.getKeyForParams_ = function () {
                var t = 0, e = [];
                for (var i in this.params_) e[t++] = i + "-" + this.params_[i];
                return e.join("/")
            }, t.prototype.fixedTileUrlFunction = function (t, e, i) {
                var r = this.getTileGrid();
                if (r || (r = this.getTileGridForProjection(i)), !(r.getResolutions().length <= t[0])) {
                    1 == e || this.hidpi_ && void 0 !== this.serverType_ || (e = 1);
                    var n = r.getResolution(t[0]), o = r.getTileCoordExtent(t, this.tmpExtent_),
                        s = ws(r.getTileSize(t[0]), this.tmpSize), a = this.gutter_;
                    0 !== a && (s = Cs(s, a, this.tmpSize), o = G(o, n * a, o)), 1 != e && (s = Ts(s, e, this.tmpSize));
                    var h = {SERVICE: "WMS", VERSION: rS, REQUEST: "GetMap", FORMAT: "image/png", TRANSPARENT: !0};
                    return E(h, this.params_), this.getRequestUrl_(t, s, o, e, i, h)
                }
            }, t.prototype.updateParams = function (t) {
                E(this.params_, t), this.updateV13_(), this.setKey(this.getKeyForParams_())
            }, t.prototype.updateV13_ = function () {
                var t = this.params_.VERSION || rS;
                this.v13_ = 0 <= sn(t, "1.3")
            }, t
        }(jx), kS = function (s) {
            function t(t, e, i, r, n, o) {
                s.call(this, t, e), this.src_ = i, this.extent_ = r, this.preemptive_ = n, this.grid_ = null, this.keys_ = null, this.data_ = null, this.jsonp_ = o
            }

            return s && (t.__proto__ = s), ((t.prototype = Object.create(s && s.prototype)).constructor = t).prototype.getImage = function () {
                return null
            }, t.prototype.getData = function (t) {
                if (!this.grid_ || !this.keys_) return null;
                var e = (t[0] - this.extent_[0]) / (this.extent_[2] - this.extent_[0]),
                    i = (t[1] - this.extent_[1]) / (this.extent_[3] - this.extent_[1]),
                    r = this.grid_[Math.floor((1 - i) * this.grid_.length)];
                if ("string" != typeof r) return null;
                var n = r.charCodeAt(Math.floor(e * r.length));
                93 <= n && n--, 35 <= n && n--;
                var o = null;
                if ((n -= 32) in this.keys_) {
                    var s = this.keys_[n];
                    o = this.data_ && s in this.data_ ? this.data_[s] : s
                }
                return o
            }, t.prototype.forDataAtCoordinate = function (e, i, r, t) {
                this.state == An && !0 === t ? (o(this, w.CHANGE, function (t) {
                    i.call(r, this.getData(e))
                }, this), this.loadInternal_()) : !0 === t ? setTimeout(function () {
                    i.call(r, this.getData(e))
                }.bind(this), 0) : i.call(r, this.getData(e))
            }, t.prototype.getKey = function () {
                return this.src_
            }, t.prototype.handleError_ = function () {
                this.state = Dn, this.changed()
            }, t.prototype.handleLoad_ = function (t) {
                this.grid_ = t.grid, this.keys_ = t.keys, this.data_ = t.data, this.state = jn, this.changed()
            }, t.prototype.loadInternal_ = function () {
                if (this.state == An) if (this.state = Gn, this.jsonp_) vx(this.src_, this.handleLoad_.bind(this), this.handleError_.bind(this)); else {
                    var t = new XMLHttpRequest;
                    t.addEventListener("load", this.onXHRLoad_.bind(this)), t.addEventListener("error", this.onXHRError_.bind(this)), t.open("GET", this.src_), t.send()
                }
            }, t.prototype.onXHRLoad_ = function (t) {
                var e = t.target;
                if (!e.status || 200 <= e.status && e.status < 300) {
                    var i;
                    try {
                        i = JSON.parse(e.responseText)
                    } catch (t) {
                        return void this.handleError_()
                    }
                    this.handleLoad_(i)
                } else this.handleError_()
            }, t.prototype.onXHRError_ = function (t) {
                this.handleError_()
            }, t.prototype.load = function () {
                this.preemptive_ && this.loadInternal_()
            }, t
        }(Vn), DS = function (i) {
            function t(t) {
                if (i.call(this, {
                    projection: ne("EPSG:3857"),
                    state: vs
                }), this.preemptive_ = void 0 === t.preemptive || t.preemptive, this.tileUrlFunction_ = gx, this.template_ = void 0, this.jsonp_ = t.jsonp || !1, t.url) if (this.jsonp_) vx(t.url, this.handleTileJSONResponse.bind(this), this.handleTileJSONError.bind(this)); else {
                    var e = new XMLHttpRequest;
                    e.addEventListener("load", this.onXHRLoad_.bind(this)), e.addEventListener("error", this.onXHRError_.bind(this)), e.open("GET", t.url), e.send()
                } else t.tileJSON ? this.handleTileJSONResponse(t.tileJSON) : Z(!1, 51)
            }

            return i && (t.__proto__ = i), ((t.prototype = Object.create(i && i.prototype)).constructor = t).prototype.onXHRLoad_ = function (t) {
                var e = t.target;
                if (!e.status || 200 <= e.status && e.status < 300) {
                    var i;
                    try {
                        i = JSON.parse(e.responseText)
                    } catch (t) {
                        return void this.handleTileJSONError()
                    }
                    this.handleTileJSONResponse(i)
                } else this.handleTileJSONError()
            }, t.prototype.onXHRError_ = function (t) {
                this.handleTileJSONError()
            }, t.prototype.getTemplate = function () {
                return this.template_
            }, t.prototype.forDataAtCoordinateAndResolution = function (t, e, i, r) {
                if (this.tileGrid) {
                    var n = this.tileGrid.getTileCoordForCoordAndResolution(t, e);
                    this.getTile(n[0], n[1], n[2], 1, this.getProjection()).forDataAtCoordinate(t, i, null, r)
                } else !0 === r ? setTimeout(function () {
                    i(null)
                }, 0) : i(null)
            }, t.prototype.handleTileJSONError = function () {
                this.setState(xs)
            }, t.prototype.handleTileJSONResponse = function (e) {
                var t, i = ne("EPSG:4326"), r = this.getProjection();
                if (void 0 !== e.bounds) {
                    var n = ce(i, r);
                    t = ft(e.bounds, n)
                }
                var o = e.minzoom || 0, s = e.maxzoom || 22, a = bx({extent: Mx(r), maxZoom: s, minZoom: o});
                this.tileGrid = a, this.template_ = e.template;
                var h = e.grids;
                if (h) {
                    if (this.tileUrlFunction_ = fx(h, a), void 0 !== e.attribution) {
                        var l = void 0 !== t ? t : i.getExtent();
                        this.setAttributions(function (t) {
                            return wt(l, t.extent) ? [e.attribution] : null
                        })
                    }
                    this.setState(ms)
                } else this.setState(xs)
            }, t.prototype.getTile = function (t, e, i, r, n) {
                var o = ux(t, e, i);
                if (this.tileCache.containsKey(o)) return this.tileCache.get(o);
                var s = [t, e, i], a = this.getTileCoordForTileUrlFunction(s, n), h = this.tileUrlFunction_(a, r, n),
                    l = new kS(s, void 0 !== h ? An : jn, void 0 !== h ? h : "", this.tileGrid.getTileCoordExtent(s), this.preemptive_, this.jsonp_);
                return this.tileCache.set(o, l), l
            }, t.prototype.useTile = function (t, e, i) {
                var r = ux(t, e, i);
                this.tileCache.containsKey(r) && this.tileCache.get(r)
            }, t
        }(Ox), jS = function (S) {
            function E(t, e, i, s, a, r, h, l, n, u, c, p, d, f, o) {
                if (S.call(this, t, e, {transition: 0}), this.context_ = {}, this.loader_, this.replayState_ = {}, this.sourceTiles_ = u, this.tileKeys = [], this.extent = null, this.sourceRevision_ = i, this.wrappedTileCoord = r, this.loadListenerKeys_ = [], this.sourceTileListenerKeys_ = [], r) {
                    var _ = this.extent = n.getTileCoordExtent(r), g = n.getResolution(o), y = l.getZForResolution(g),
                        v = o != t[0], m = 0;
                    if (l.forEachTileCoord(_, y, function (t) {
                        var e = ht(_, l.getTileCoordExtent(t)), i = l.getExtent();
                        if (i && (e = ht(e, i, e)), .5 <= ct(e) / g && .5 <= at(e) / g) {
                            ++m;
                            var r = t.toString(), n = u[r];
                            if (!n && !v) {
                                var o = h(t, c, p);
                                n = u[r] = new d(t, null == o ? jn : An, null == o ? "" : o, s, a), this.sourceTileListenerKeys_.push(C(n, w.CHANGE, f))
                            }
                            !n || v && n.getState() != kn || (n.consumers++, this.tileKeys.push(r))
                        }
                    }.bind(this)), v && m == this.tileKeys.length && this.finishLoading_(), o <= t[0] && this.state != kn) for (; o > n.getMinZoom();) {
                        var x = new E(t, e, i, s, a, r, h, l, n, u, c, p, d, L, --o);
                        if (x.state == kn) {
                            this.interimTile = x;
                            break
                        }
                    }
                }
            }

            return S && (E.__proto__ = S), ((E.prototype = Object.create(S && S.prototype)).constructor = E).prototype.disposeInternal = function () {
                this.state = Un, this.changed(), this.interimTile && this.interimTile.dispose();
                for (var t = 0, e = this.tileKeys.length; t < e; ++t) {
                    var i = this.tileKeys[t], r = this.getTile(i);
                    r.consumers--, 0 == r.consumers && (delete this.sourceTiles_[i], r.dispose())
                }
                this.tileKeys.length = 0, this.sourceTiles_ = null, this.loadListenerKeys_.forEach(g), this.loadListenerKeys_.length = 0, this.sourceTileListenerKeys_.forEach(g), this.sourceTileListenerKeys_.length = 0, S.prototype.disposeInternal.call(this)
            }, E.prototype.getContext = function (t) {
                var e = Ct(t).toString();
                return e in this.context_ || (this.context_[e] = De()), this.context_[e]
            }, E.prototype.getImage = function (t) {
                return -1 == this.getReplayState(t).renderedTileRevision ? null : this.getContext(t).canvas
            }, E.prototype.getReplayState = function (t) {
                var e = Ct(t).toString();
                return e in this.replayState_ || (this.replayState_[e] = {
                    dirty: !1,
                    renderedRenderOrder: null,
                    renderedRevision: -1,
                    renderedTileRevision: -1
                }), this.replayState_[e]
            }, E.prototype.getKey = function () {
                return this.tileKeys.join("/") + "-" + this.sourceRevision_
            }, E.prototype.getTile = function (t) {
                return this.sourceTiles_[t]
            }, E.prototype.load = function () {
                var n = 0, o = {};
                this.state == An && this.setState(Gn), this.state == Gn && this.tileKeys.forEach(function (t) {
                    var r = this.getTile(t);
                    if (r.state == An && (r.setLoader(this.loader_), r.load()), r.state == Gn) {
                        var e = C(r, w.CHANGE, function (t) {
                            var e = r.getState();
                            if (e == kn || e == Dn) {
                                var i = Ct(r);
                                e == Dn ? o[i] = !0 : (--n, delete o[i]), n - Object.keys(o).length == 0 && this.finishLoading_()
                            }
                        }.bind(this));
                        this.loadListenerKeys_.push(e), ++n
                    }
                }.bind(this)), n - Object.keys(o).length == 0 && setTimeout(this.finishLoading_.bind(this), 0)
            }, E.prototype.finishLoading_ = function () {
                for (var t = this.tileKeys.length, e = 0, i = t - 1; 0 <= i; --i) {
                    var r = this.getTile(this.tileKeys[i]).getState();
                    r != kn && --t, r == jn && ++e
                }
                t == this.tileKeys.length ? (this.loadListenerKeys_.forEach(g), this.loadListenerKeys_.length = 0, this.setState(kn)) : this.setState(e == this.tileKeys.length ? jn : Dn)
            }, E
        }(Vn);

    function US(t, e) {
        var i = ph(e, t.getFormat(), t.onLoad.bind(t), t.onError.bind(t));
        t.setLoader(i)
    }

    var YS = function (n) {
        function t(t) {
            var e = t.projection || "EPSG:3857", i = t.extent || Mx(e), r = t.tileGrid || bx({
                extent: i,
                maxZoom: t.maxZoom || 22,
                minZoom: t.minZoom,
                tileSize: t.tileSize || 512
            });
            n.call(this, {
                attributions: t.attributions,
                cacheSize: void 0 !== t.cacheSize ? t.cacheSize : 128,
                extent: i,
                opaque: !1,
                projection: e,
                state: t.state,
                tileGrid: r,
                tileLoadFunction: t.tileLoadFunction ? t.tileLoadFunction : US,
                tileUrlFunction: t.tileUrlFunction,
                url: t.url,
                urls: t.urls,
                wrapX: void 0 === t.wrapX || t.wrapX,
                transition: t.transition
            }), this.format_ = t.format ? t.format : null, this.sourceTiles_ = {}, this.overlaps_ = null == t.overlaps || t.overlaps, this.tileClass = t.tileClass ? t.tileClass : oc, this.tileGrids_ = {}
        }

        return n && (t.__proto__ = n), ((t.prototype = Object.create(n && n.prototype)).constructor = t).prototype.getOverlaps = function () {
            return this.overlaps_
        }, t.prototype.clear = function () {
            this.tileCache.clear(), this.sourceTiles_ = {}
        }, t.prototype.getTile = function (t, e, i, r, n) {
            var o = ux(t, e, i);
            if (this.tileCache.containsKey(o)) return this.tileCache.get(o);
            var s = [t, e, i], a = this.getTileCoordForTileUrlFunction(s, n),
                h = new jS(s, null !== a ? An : jn, this.getRevision(), this.format_, this.tileLoadFunction, a, this.tileUrlFunction, this.tileGrid, this.getTileGridForProjection(n), this.sourceTiles_, r, n, this.tileClass, this.handleTileChange.bind(this), s[0]);
            return this.tileCache.set(o, h), h
        }, t.prototype.getTileGridForProjection = function (t) {
            var e = t.getCode(), i = this.tileGrids_[e];
            if (!i) {
                var r = this.tileGrid;
                i = this.tileGrids_[e] = Px(t, void 0, r ? r.getTileSize(r.getMinZoom()) : void 0)
            }
            return i
        }, t.prototype.getTilePixelRatio = function (t) {
            return t
        }, t.prototype.getTilePixelSize = function (t, e, i) {
            var r = ws(this.getTileGridForProjection(i).getTileSize(t), this.tmpSize);
            return [Math.round(r[0] * e), Math.round(r[1] * e)]
        }, t
    }(Dx), BS = {KVP: "KVP", REST: "REST"}, XS = function (e) {
        function t(t) {
            e.call(this, {
                extent: t.extent,
                origin: t.origin,
                origins: t.origins,
                resolutions: t.resolutions,
                tileSize: t.tileSize,
                tileSizes: t.tileSizes,
                sizes: t.sizes
            }), this.matrixIds_ = t.matrixIds
        }

        return e && (t.__proto__ = e), ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.getMatrixId = function (t) {
            return this.matrixIds_[t]
        }, t.prototype.getMatrixIds = function () {
            return this.matrixIds_
        }, t
    }(Rx);

    function zS(n, t, e) {
        var o = [], s = [], a = [], h = [], l = [], u = void 0 !== e ? e : [], c = "TileMatrix", p = "Identifier",
            d = "ScaleDenominator", f = "TopLeftCorner", i = n.SupportedCRS,
            r = ne(i.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, "$1:$3")) || ne(i), _ = r.getMetersPerUnit(),
            g = "ne" == r.getAxisOrientation().substr(0, 2);
        return n[c].sort(function (t, e) {
            return e[d] - t[d]
        }), n[c].forEach(function (e) {
            if (!(0 < u.length) || dr(u, function (t) {
                return e[p] == t[c] || -1 === e[p].indexOf(":") && n[p] + ":" + e[p] === t[c]
            })) {
                s.push(e[p]);
                var t = 28e-5 * e[d] / _, i = e.TileWidth, r = e.TileHeight;
                g ? a.push([e[f][1], e[f][0]]) : a.push(e[f]), o.push(t), h.push(i == r ? i : [i, r]), l.push([e.MatrixWidth, -e.MatrixHeight])
            }
        }), new XS({extent: t, origins: a, resolutions: o, matrixIds: s, tileSizes: h, sizes: l})
    }

    var VS = function (n) {
        function t(t) {
            var e = void 0 !== t.requestEncoding ? t.requestEncoding : BS.KVP, i = t.tileGrid, r = t.urls;
            void 0 === r && void 0 !== t.url && (r = yx(t.url)), n.call(this, {
                attributions: t.attributions,
                cacheSize: t.cacheSize,
                crossOrigin: t.crossOrigin,
                projection: t.projection,
                reprojectionErrorThreshold: t.reprojectionErrorThreshold,
                tileClass: t.tileClass,
                tileGrid: i,
                tileLoadFunction: t.tileLoadFunction,
                tilePixelRatio: t.tilePixelRatio,
                tileUrlFunction: gx,
                urls: r,
                wrapX: void 0 !== t.wrapX && t.wrapX,
                transition: t.transition
            }), this.version_ = void 0 !== t.version ? t.version : "1.0.0", this.format_ = void 0 !== t.format ? t.format : "image/jpeg", this.dimensions_ = void 0 !== t.dimensions ? t.dimensions : {}, this.layer_ = t.layer, this.matrixSet_ = t.matrixSet, this.style_ = t.style, this.requestEncoding_ = e, this.setKey(this.getKeyForDimensions_()), r && 0 < r.length && (this.tileUrlFunction = _x(r.map(WS.bind(this))))
        }

        return n && (t.__proto__ = n), ((t.prototype = Object.create(n && n.prototype)).constructor = t).prototype.setUrls = function (t) {
            var e = (this.urls = t).join("\n");
            this.setTileUrlFunction(this.fixedTileUrlFunction ? this.fixedTileUrlFunction.bind(this) : _x(t.map(WS.bind(this))), e)
        }, t.prototype.getDimensions = function () {
            return this.dimensions_
        }, t.prototype.getFormat = function () {
            return this.format_
        }, t.prototype.getLayer = function () {
            return this.layer_
        }, t.prototype.getMatrixSet = function () {
            return this.matrixSet_
        }, t.prototype.getRequestEncoding = function () {
            return this.requestEncoding_
        }, t.prototype.getStyle = function () {
            return this.style_
        }, t.prototype.getVersion = function () {
            return this.version_
        }, t.prototype.getKeyForDimensions_ = function () {
            var t = 0, e = [];
            for (var i in this.dimensions_) e[t++] = i + "-" + this.dimensions_[i];
            return e.join("/")
        }, t.prototype.updateDimensions = function (t) {
            E(this.dimensions_, t), this.setKey(this.getKeyForDimensions_())
        }, t
    }(jx);

    function WS(o) {
        var s = this.requestEncoding_, i = {layer: this.layer_, style: this.style_, tilematrixset: this.matrixSet_};
        s == BS.KVP && E(i, {
            Service: "WMTS",
            Request: "GetTile",
            Version: this.version_,
            Format: this.format_
        }), o = s == BS.KVP ? Qx(o, i) : o.replace(/\{(\w+?)\}/g, function (t, e) {
            return e.toLowerCase() in i ? i[e.toLowerCase()] : t
        });
        var a = this.tileGrid, h = this.dimensions_;
        return function (t, e, i) {
            if (t) {
                var r = {TileMatrix: a.getMatrixId(t[0]), TileCol: t[1], TileRow: -t[2] - 1};
                E(r, h);
                var n = o;
                return n = s == BS.KVP ? Qx(n, r) : n.replace(/\{(\w+?)\}/g, function (t, e) {
                    return r[e]
                })
            }
        }
    }

    var KS = "default", HS = "truncated", ZS = function (a) {
        function t(t, e, i, r, n, o, s) {
            a.call(this, e, i, r, n, o, s), this.zoomifyImage_ = null, this.tileSize_ = ws(t.getTileSize(e[0]))
        }

        return a && (t.__proto__ = a), ((t.prototype = Object.create(a && a.prototype)).constructor = t).prototype.getImage = function () {
            if (this.zoomifyImage_) return this.zoomifyImage_;
            var t = a.prototype.getImage.call(this);
            if (this.state == kn) {
                var e = this.tileSize_;
                if (t.width == e[0] && t.height == e[1]) return this.zoomifyImage_ = t;
                var i = De(e[0], e[1]);
                return i.drawImage(t, 0, 0), this.zoomifyImage_ = i.canvas, i.canvas
            }
            return t
        }, t
    }(Wn), qS = function (x) {
        function t(t) {
            var e = t || {}, i = e.size, r = void 0 !== e.tierSizeCalculation ? e.tierSizeCalculation : KS, n = i[0],
                o = i[1], s = e.extent || [0, -i[1], i[0], 0], u = [], a = e.tileSize || Qo, h = a;
            switch (r) {
                case KS:
                    for (; h < n || h < o;) u.push([Math.ceil(n / h), Math.ceil(o / h)]), h += h;
                    break;
                case HS:
                    for (var l = n, c = o; h < l || h < c;) u.push([Math.ceil(l / h), Math.ceil(c / h)]), l >>= 1, c >>= 1;
                    break;
                default:
                    Z(!1, 53)
            }
            u.push([1, 1]), u.reverse();
            for (var p = [1], d = [0], f = 1, _ = u.length; f < _; f++) p.push(1 << f), d.push(u[f - 1][0] * u[f - 1][1] + d[f - 1]);
            p.reverse();
            var g = new Rx({tileSize: a, extent: s, origin: lt(s), resolutions: p}), y = e.url;
            y && -1 == y.indexOf("{TileGroup}") && -1 == y.indexOf("{tileIndex}") && (y += "{TileGroup}/{z}-{x}-{y}.jpg");
            var v = _x(yx(y).map(function (l) {
                return function (t, e, i) {
                    if (t) {
                        var r = t[0], n = t[1], o = -t[2] - 1, s = n + o * u[r][0], a = g.getTileSize(r),
                            h = {z: r, x: n, y: o, tileIndex: s, TileGroup: "TileGroup" + ((s + d[r]) / a | 0)};
                        return l.replace(/\{(\w+?)\}/g, function (t, e) {
                            return h[e]
                        })
                    }
                }
            })), m = ZS.bind(null, g);
            x.call(this, {
                attributions: e.attributions,
                cacheSize: e.cacheSize,
                crossOrigin: e.crossOrigin,
                projection: e.projection,
                reprojectionErrorThreshold: e.reprojectionErrorThreshold,
                tileClass: m,
                tileGrid: g,
                tileUrlFunction: v,
                transition: e.transition
            })
        }

        return x && (t.__proto__ = x), (t.prototype = Object.create(x && x.prototype)).constructor = t
    }(jx);
    var JS = window.ol = {};
    JS.array = {}, JS.color = {}, JS.colorlike = {}, JS.control = {}, JS.coordinate = {}, JS.easing = {}, JS.events = {}, JS.events.condition = {}, JS.extent = {}, JS.featureloader = {}, JS.format = {}, JS.format.filter = {}, JS.geom = {}, JS.has = {}, JS.interaction = {}, JS.layer = {}, JS.loadingstrategy = {}, JS.proj = {}, JS.proj.Units = {}, JS.proj.proj4 = {}, JS.render = {}, JS.render.canvas = {}, JS.renderer = {}, JS.renderer.canvas = {}, JS.renderer.webgl = {}, JS.size = {}, JS.source = {}, JS.sphere = {}, JS.style = {}, JS.style.IconImageCache = {}, JS.tilegrid = {}, JS.util = {}, JS.xml = {}, JS.Collection = M, JS.Feature = Ji, JS.Geolocation = nn, JS.Graticule = Mn, JS.Kinetic = Hn, JS.Map = Bu, JS.Object = R, JS.Observable = S, JS.Observable.unByKey = function (t) {
        if (Array.isArray(t)) for (var e = 0, i = t.length; e < i; ++e) g(t[e]); else g(t)
    }, JS.Overlay = rc, JS.PluggableMap = Rs, JS.View = ss, JS.WebGLMap = Gp, JS.array.stableSort = _r, JS.color.asArray = Ne, JS.color.asString = Fe, JS.colorlike.asColorLike = ke, JS.control.Attribution = Fs, JS.control.Attribution.render = Ps, JS.control.Control = Is, JS.control.FullScreen = ac, JS.control.MousePosition = jp, JS.control.MousePosition.render = Up, JS.control.OverviewMap = cc, JS.control.OverviewMap.render = pc, JS.control.Rotate = Ms, JS.control.Rotate.render = Os, JS.control.ScaleLine = xc, JS.control.ScaleLine.render = Sc, JS.control.Zoom = Ns, JS.control.ZoomSlider = Tc, JS.control.ZoomSlider.render = wc, JS.control.ZoomToExtent = Rc, JS.control.defaults = As, JS.coordinate.add = an, JS.coordinate.createStringXY = function (e) {
        return function (t) {
            return yn(t, e)
        }
    }, JS.coordinate.format = un, JS.coordinate.rotate = pn, JS.coordinate.toStringHDMS = function (t, e) {
        return t ? ln("NS", t[1], e) + " " + ln("EW", t[0], e) : ""
    }, JS.coordinate.toStringXY = yn, JS.easing.easeIn = Yn, JS.easing.easeOut = Bn, JS.easing.inAndOut = Xn, JS.easing.linear = zn, JS.easing.upAndDown = function (t) {
        return t < .5 ? Xn(2 * t) : 1 - Xn(2 * (t - .5))
    }, JS.events.condition.altKeyOnly = Vs, JS.events.condition.altShiftKeysOnly = Ws, JS.events.condition.always = Hs, JS.events.condition.click = function (t) {
        return t.type == Jn.CLICK
    }, JS.events.condition.doubleClick = function (t) {
        return t.type == Jn.DBLCLICK
    }, JS.events.condition.focus = Ks, JS.events.condition.mouseOnly = ia, JS.events.condition.never = qs, JS.events.condition.noModifierKeys = $s, JS.events.condition.platformModifierKeyOnly = function (t) {
        var e = t.originalEvent;
        return !e.altKey && (si ? e.metaKey : e.ctrlKey) && !e.shiftKey
    }, JS.events.condition.pointerMove = Js, JS.events.condition.primaryAction = ra, JS.events.condition.shiftKeyOnly = ta, JS.events.condition.singleClick = Qs, JS.events.condition.targetNotEditable = ea, JS.extent.applyTransform = ft, JS.extent.boundingExtent = A, JS.extent.buffer = G, JS.extent.containsCoordinate = j, JS.extent.containsExtent = Q, JS.extent.containsXY = U, JS.extent.createEmpty = B, JS.extent.equals = $,JS.extent.extend = H,JS.extent.getArea = it,JS.extent.getBottomLeft = rt,JS.extent.getBottomRight = nt,JS.extent.getCenter = ot,JS.extent.getHeight = at,JS.extent.getIntersection = ht,JS.extent.getSize = function (t) {
        return [t[2] - t[0], t[3] - t[1]]
    },JS.extent.getTopLeft = lt,JS.extent.getTopRight = ut,JS.extent.getWidth = ct,JS.extent.intersects = wt,JS.extent.isEmpty = pt,JS.featureloader.xhr = dh,JS.format.EsriJSON = Kp,JS.format.Feature = Yp,JS.format.GML = jd,JS.format.GML2 = Bd,JS.format.GML3 = Dd,JS.format.GPX = Hd,JS.format.GeoJSON = Rf,JS.format.IGC = Uf,JS.format.KML = __,JS.format.MVT = cy,JS.format.OSMXML = my,JS.format.Polyline = Cy,JS.format.Polyline.decodeDeltas = wy,JS.format.Polyline.decodeFloats = Iy,JS.format.Polyline.encodeDeltas = Ty,JS.format.Polyline.encodeFloats = Ry,JS.format.TopoJSON = by,JS.format.WFS = gv,JS.format.WFS.writeFilter = function (t) {
        var e = td(dv, "Filter");
        return Ev(e, t, []), e
    },JS.format.WKT = Xv,JS.format.WMSCapabilities = em,JS.format.WMSGetFeatureInfo = Sm,JS.format.WMTSCapabilities = Ym,JS.format.filter.Bbox = jy,JS.format.filter.Contains = Yy,JS.format.filter.During = Xy,JS.format.filter.EqualTo = Vy,JS.format.filter.GreaterThan = Wy,JS.format.filter.GreaterThanOrEqualTo = Ky,JS.format.filter.Intersects = Hy,JS.format.filter.IsBetween = Zy,JS.format.filter.IsLike = qy,JS.format.filter.IsNull = Jy,JS.format.filter.LessThan = Qy,JS.format.filter.LessThanOrEqualTo = $y,JS.format.filter.Not = tv,JS.format.filter.NotEqualTo = ev,JS.format.filter.Or = iv,JS.format.filter.Within = rv,JS.format.filter.and = nv,JS.format.filter.bbox = ov,JS.format.filter.between = function (t, e, i) {
        return new Zy(t, e, i)
    },JS.format.filter.contains = function (t, e, i) {
        return new Yy(t, e, i)
    },JS.format.filter.during = function (t, e, i) {
        return new Xy(t, e, i)
    },JS.format.filter.equalTo = function (t, e, i) {
        return new Vy(t, e, i)
    },JS.format.filter.greaterThan = function (t, e) {
        return new Wy(t, e)
    },JS.format.filter.greaterThanOrEqualTo = function (t, e) {
        return new Ky(t, e)
    },JS.format.filter.intersects = function (t, e, i) {
        return new Hy(t, e, i)
    },JS.format.filter.isNull = function (t) {
        return new Jy(t)
    },JS.format.filter.lessThan = function (t, e) {
        return new Qy(t, e)
    },JS.format.filter.lessThanOrEqualTo = function (t, e) {
        return new $y(t, e)
    },JS.format.filter.like = function (t, e, i, r, n, o) {
        return new qy(t, e, i, r, n, o)
    },JS.format.filter.not = function (t) {
        return new tv(t)
    },JS.format.filter.notEqualTo = function (t, e, i) {
        return new ev(t, e, i)
    },JS.format.filter.or = function (t) {
        var e = [null].concat(Array.prototype.slice.call(arguments));
        return new (Function.prototype.bind.apply(iv, e))
    },JS.format.filter.within = function (t, e, i) {
        return new rv(t, e, i)
    },JS.geom.Circle = eh,JS.geom.Geometry = Ie,JS.geom.GeometryCollection = Tf,JS.geom.LineString = Sn,JS.geom.LinearRing = kr,JS.geom.MultiLineString = ih,JS.geom.MultiPoint = rh,JS.geom.MultiPolygon = oh,JS.geom.Point = Dr,JS.geom.Polygon = Qr,JS.geom.Polygon.circular = $r,JS.geom.Polygon.fromCircle = en,JS.geom.Polygon.fromExtent = tn,JS.geom.SimpleGeometry = vr,JS.has.DEVICE_PIXEL_RATIO = ai,JS.has.GEOLOCATION = li,JS.has.TOUCH = ui,JS.inherits = function (t, e) {
        t.prototype = Object.create(e.prototype), t.prototype.constructor = t
    },JS.interaction.DoubleClickZoom = Xs,JS.interaction.DragAndDrop = Ha,JS.interaction.DragBox = Ca,JS.interaction.DragPan = pa,JS.interaction.DragRotate = ga,JS.interaction.DragRotateAndZoom = Ja,JS.interaction.DragZoom = La,JS.interaction.Draw = zh,JS.interaction.Draw.createBox = function () {
        return function (t, e) {
            var i = A(t), r = [[rt(i), nt(i), ut(i), lt(i), rt(i)]], n = e;
            return n ? n.setCoordinates(r) : n = new Qr(r), n
        }
    },JS.interaction.Draw.createRegularPolygon = function (l, u) {
        return function (t, e) {
            var i = t[0], r = t[1], n = Math.sqrt(fn(i, r)), o = e || en(new eh(i), l), s = u;
            if (!u) {
                var a = r[0] - i[0], h = r[1] - i[1];
                s = Math.atan(h / a) - (a < 0 ? Math.PI : 0)
            }
            return rn(o, i, n, s), o
        }
    },JS.interaction.Draw.handleEvent = Vh,JS.interaction.Extent = qh,JS.interaction.Interaction = ks,JS.interaction.KeyboardPan = Pa,JS.interaction.KeyboardZoom = Oa,JS.interaction.Modify = al,JS.interaction.MouseWheelZoom = Ga,JS.interaction.PinchRotate = Da,JS.interaction.PinchZoom = Ba,JS.interaction.Pointer = ha,JS.interaction.Pointer.handleEvent = ua,JS.interaction.Select = yl,JS.interaction.Snap = ml,JS.interaction.Translate = Tl,JS.interaction.defaults = bl,JS.layer.Base = gs,JS.layer.Group = Es,JS.layer.Heatmap = rx,JS.layer.Image = nx,JS.layer.Tile = ax,JS.layer.Vector = uh,JS.layer.VectorTile = hx,JS.loadingstrategy.all = fh,JS.loadingstrategy.bbox = function (t, e) {
        return [t]
    },JS.loadingstrategy.tile = function (s) {
        return function (t, e) {
            var i = s.getZForResolution(e), r = s.getTileRangeForExtentAndZ(t, i), n = [], o = [i, 0, 0];
            for (o[1] = r.minX; o[1] <= r.maxX; ++o[1]) for (o[2] = r.minY; o[2] <= r.maxY; ++o[2]) n.push(s.getTileCoordExtent(o));
            return n
        }
    },JS.proj.Projection = At,JS.proj.Units.METERS_PER_UNIT = Nt,JS.proj.addCoordinateTransforms = le,JS.proj.addEquivalentProjections = se,JS.proj.addProjection = re,JS.proj.equivalent = ue,JS.proj.fromLonLat = function (t, e) {
        return de(t, "EPSG:4326", void 0 !== e ? e : "EPSG:3857")
    },JS.proj.get = ne,JS.proj.getPointResolution = oe,JS.proj.getTransform = pe,JS.proj.proj4.register = function (t) {
        var e, i, r = Object.keys(t.defs), n = r.length;
        for (e = 0; e < n; ++e) {
            var o = r[e];
            if (!ne(o)) {
                var s = t.defs(o);
                re(new At({code: o, axisOrientation: s.axis, metersPerUnit: s.to_meter, units: s.units}))
            }
        }
        for (e = 0; e < n; ++e) {
            var a = r[e], h = ne(a);
            for (i = 0; i < n; ++i) {
                var l = r[i], u = ne(l);
                if (!te(a, l)) if (t.defs[a] === t.defs[l]) se([h, u]); else {
                    var c = t(a, l);
                    le(h, u, c.forward, c.inverse)
                }
            }
        }
    },JS.proj.toLonLat = function (t, e) {
        var i = de(t, void 0 !== e ? e : "EPSG:3857", "EPSG:4326"), r = i[0];
        return (r < -180 || 180 < r) && (i[0] = Et(r + 180, 360) - 180), i
    },JS.proj.transform = de,JS.proj.transformExtent = fe,JS.render.VectorContext = Ml,JS.render.canvas.labelCache = Li,JS.render.toContext = function (t, e) {
        var i = t.canvas, r = e || {}, n = r.pixelRatio || ai, o = r.size;
        o && (i.width = o[0] * n, i.height = o[1] * n, i.style.width = o[0] + "px", i.style.height = o[1] + "px");
        var s = [0, 0, i.width, i.height], a = Ee([1, 0, 0, 1, 0, 0], n, n);
        return new Ol(t, n, s, a, 0)
    },JS.renderer.canvas.ImageLayer = Vl,JS.renderer.canvas.Map = Yl,JS.renderer.canvas.TileLayer = Hl,JS.renderer.canvas.VectorLayer = Nu,JS.renderer.canvas.VectorTileLayer = Uu,JS.renderer.webgl.ImageLayer = bp,JS.renderer.webgl.Map = Fp,JS.renderer.webgl.TileLayer = Np,JS.renderer.webgl.VectorLayer = Ap,JS.size.toSize = ws,JS.source.BingMaps = Yx,JS.source.CartoDB = Xx,JS.source.Cluster = zx,JS.source.Image = qx,JS.source.ImageArcGISRest = $x,JS.source.ImageCanvas = tS,JS.source.ImageMapGuide = eS,JS.source.ImageStatic = iS,JS.source.ImageWMS = lS,JS.source.OSM = cS,JS.source.OSM.ATTRIBUTION = uS,JS.source.Raster = TS,JS.source.Source = _h,JS.source.Stamen = PS,JS.source.Tile = Ox,JS.source.TileArcGISRest = MS,JS.source.TileDebug = NS,JS.source.TileImage = jx,JS.source.TileJSON = AS,JS.source.TileWMS = GS,JS.source.UTFGrid = DS,JS.source.Vector = jh,JS.source.VectorTile = YS,JS.source.WMTS = VS,JS.source.WMTS.optionsFromCapabilities = function (t, s) {
        var e = dr(t.Contents.Layer, function (t, e, i) {
            return t.Identifier == s.layer
        });
        if (null === e) return null;
        var i, a = t.Contents.TileMatrixSet;
        (i = 1 < e.TileMatrixSetLink.length ? gr(e.TileMatrixSetLink, "projection" in s ? function (e, t, i) {
            var r = dr(a, function (t) {
                    return t.Identifier == e.TileMatrixSet
                }).SupportedCRS, n = ne(r.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, "$1:$3")) || ne(r),
                o = ne(s.projection);
            return n && o ? ue(n, o) : r == s.projection
        } : function (t, e, i) {
            return t.TileMatrixSet == s.matrixSet
        }) : 0) < 0 && (i = 0);
        var r = e.TileMatrixSetLink[i].TileMatrixSet, n = e.TileMatrixSetLink[i].TileMatrixSetLimits, o = e.Format[0];
        "format" in s && (o = s.format), (i = gr(e.Style, function (t, e, i) {
            return "style" in s ? t.Title == s.style : t.isDefault
        })) < 0 && (i = 0);
        var h = e.Style[i].Identifier, l = {};
        "Dimension" in e && e.Dimension.forEach(function (t, e, i) {
            var r = t.Identifier, n = t.Default;
            void 0 === n && (n = t.Value[0]), l[r] = n
        });
        var u, c = dr(t.Contents.TileMatrixSet, function (t, e, i) {
            return t.Identifier == r
        }), p = c.SupportedCRS;
        if (p && (u = ne(p.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, "$1:$3")) || ne(p)), "projection" in s) {
            var d = ne(s.projection);
            d && (u && !ue(d, u) || (u = d))
        }
        var f, _, g = e.WGS84BoundingBox;
        if (void 0 !== g) {
            var y = ne("EPSG:4326").getExtent();
            _ = g[0] == y[0] && g[2] == y[2], f = fe(g, "EPSG:4326", u);
            var v = u.getExtent();
            v && (Q(v, f) || (f = void 0))
        }
        var m = zS(c, f, n), x = [], S = s.requestEncoding;
        if (S = void 0 !== S ? S : "", "OperationsMetadata" in t && "GetTile" in t.OperationsMetadata) for (var E = t.OperationsMetadata.GetTile.DCP.HTTP.Get, C = 0, T = E.length; C < T; ++C) if (E[C].Constraint) {
            var w = dr(E[C].Constraint, function (t) {
                return "GetEncoding" == t.name
            }).AllowedValues.Value;
            if ("" === S && (S = w[0]), S !== BS.KVP) break;
            lr(w, BS.KVP) && x.push(E[C].href)
        } else E[C].href && (S = BS.KVP, x.push(E[C].href));
        return 0 === x.length && (S = BS.REST, e.ResourceURL.forEach(function (t) {
            "tile" === t.resourceType && (o = t.format, x.push(t.template))
        })), {
            urls: x,
            layer: s.layer,
            matrixSet: r,
            format: o,
            projection: u,
            requestEncoding: S,
            tileGrid: m,
            style: h,
            dimensions: l,
            wrapX: _,
            crossOrigin: s.crossOrigin
        }
    },JS.source.XYZ = Bx,JS.source.Zoomify = qS,JS.sphere.getArea = function t(e, i) {
        var r = i || {}, n = r.radius || bt, o = r.projection || "EPSG:3857", s = e.getType();
        s !== Lt.GEOMETRY_COLLECTION && (e = e.clone().transform(o, "EPSG:4326"));
        var a, h, l, u, c, p, d = 0;
        switch (s) {
            case Lt.POINT:
            case Lt.MULTI_POINT:
            case Lt.LINE_STRING:
            case Lt.MULTI_LINE_STRING:
            case Lt.LINEAR_RING:
                break;
            case Lt.POLYGON:
                for (a = e.getCoordinates(), d = Math.abs(Mt(a[0], n)), l = 1, u = a.length; l < u; ++l) d -= Math.abs(Mt(a[l], n));
                break;
            case Lt.MULTI_POLYGON:
                for (l = 0, u = (a = e.getCoordinates()).length; l < u; ++l) for (h = a[l], d += Math.abs(Mt(h[0], n)), c = 1, p = h.length; c < p; ++c) d -= Math.abs(Mt(h[c], n));
                break;
            case Lt.GEOMETRY_COLLECTION:
                var f = e.getGeometries();
                for (l = 0, u = f.length; l < u; ++l) d += t(f[l], i);
                break;
            default:
                throw new Error("Unsupported geometry type: " + s)
        }
        return d
    },JS.sphere.getDistance = Ft,JS.sphere.getLength = function t(e, i) {
        var r = i || {}, n = r.radius || bt, o = r.projection || "EPSG:3857", s = e.getType();
        s !== Lt.GEOMETRY_COLLECTION && (e = e.clone().transform(o, "EPSG:4326"));
        var a, h, l, u, c, p, d = 0;
        switch (s) {
            case Lt.POINT:
            case Lt.MULTI_POINT:
                break;
            case Lt.LINE_STRING:
            case Lt.LINEAR_RING:
                d = Pt(a = e.getCoordinates(), n);
                break;
            case Lt.MULTI_LINE_STRING:
            case Lt.POLYGON:
                for (l = 0, u = (a = e.getCoordinates()).length; l < u; ++l) d += Pt(a[l], n);
                break;
            case Lt.MULTI_POLYGON:
                for (l = 0, u = (a = e.getCoordinates()).length; l < u; ++l) for (c = 0, p = (h = a[l]).length; c < p; ++c) d += Pt(h[c], n);
                break;
            case Lt.GEOMETRY_COLLECTION:
                var f = e.getGeometries();
                for (l = 0, u = f.length; l < u; ++l) d += t(f[l], i);
                break;
            default:
                throw new Error("Unsupported geometry type: " + s)
        }
        return d
    },JS.style.AtlasManager = mp,JS.style.Circle = Xi,JS.style.Fill = zi,JS.style.Icon = $f,JS.style.IconImageCache.shared = Gl,JS.style.Image = Yi,JS.style.RegularShape = Bi,JS.style.Stroke = Vi,JS.style.Style = Wi,JS.style.Text = bn,JS.tilegrid.TileGrid = Rx,JS.tilegrid.WMTS = XS,JS.tilegrid.WMTS.createFromCapabilitiesMatrixSet = zS,JS.tilegrid.createXYZ = bx,JS.util.getUid = Ct,JS.xml.getAllTextContent = ed,JS.xml.parse = nd
}();
//# sourceMappingURL=ol.js.map
