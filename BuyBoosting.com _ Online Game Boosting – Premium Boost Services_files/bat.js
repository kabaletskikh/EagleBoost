/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var m, aa = function (a) {
    var b = 0;
    return function () {
        return b < a.length ? {
            done: !1,
            value: a[b++]
        } : {
            done: !0
        }
    }
},
    ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    },
    ca = function (a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("Cannot find global object");
    },
    da = ca(this),
    n = function (a, b) {
        if (b) a: {
            var c = da;
            a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                if (!(e in c)) break a;
                c = c[e]
            }
            a = a[a.length - 1];
            d = c[a];
            b = b(d);
            b != d && null != b && ba(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    };
n("Symbol", function (a) {
    if (a) return a;
    var b = function (f, g) {
        this.ve = f;
        ba(this, "description", {
            configurable: !0,
            writable: !0,
            value: g
        })
    };
    b.prototype.toString = function () {
        return this.ve
    };
    var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
        d = 0,
        e = function (f) {
            if (this instanceof e) throw new TypeError("Symbol is not a constructor");
            return new b(c + (f || "") + "_" + d++, f)
        };
    return e
});
n("Symbol.iterator", function (a) {
    if (a) return a;
    a = Symbol("Symbol.iterator");
    for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
        var d = da[b[c]];
        "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function () {
                return ea(aa(this))
            }
        })
    }
    return a
});
var ea = function (a) {
    a = {
        next: a
    };
    a[Symbol.iterator] = function () {
        return this
    };
    return a
},
    t = function (a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return b ? b.call(a) : {
            next: aa(a)
        }
    },
    fa = function (a) {
        for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
        return c
    },
    ha = "function" == typeof Object.create ? Object.create : function (a) {
        var b = function () {};
        b.prototype = a;
        return new b
    },
    ia;
if ("function" == typeof Object.setPrototypeOf) ia = Object.setPrototypeOf;
else {
    var ja;
    a: {
        var ka = {
            a: !0
        },
            la = {};
        try {
            la.__proto__ = ka;
            ja = la.a;
            break a
        } catch (a) {}
        ja = !1
    }
    ia = ja ?
    function (a, b) {
        a.__proto__ = b;
        if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
        return a
    } : null
}
var ma = ia,
    v = function (a, b) {
        a.prototype = ha(b.prototype);
        a.prototype.constructor = a;
        if (ma) ma(a, b);
        else for (var c in b) if ("prototype" != c) if (Object.defineProperties) {
            var d = Object.getOwnPropertyDescriptor(b, c);
            d && Object.defineProperty(a, c, d)
        } else a[c] = b[c];
        a.ja = b.prototype
    },
    na = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
n("WeakMap", function (a) {
    function b() {}

    function c(k) {
        var l = typeof k;
        return "object" === l && null !== k || "function" === l
    }

    function d(k) {
        if (!na(k, f)) {
            var l = new b;
            ba(k, f, {
                value: l
            })
        }
    }

    function e(k) {
        var l = Object[k];
        l && (Object[k] = function (r) {
            if (r instanceof b) return r;
            Object.isExtensible(r) && d(r);
            return l(r)
        })
    }
    if (function () {
        if (!a || !Object.seal) return !1;
        try {
            var k = Object.seal({}),
                l = Object.seal({}),
                r = new a([
                    [k, 2],
                    [l, 3]
                ]);
            if (2 != r.get(k) || 3 != r.get(l)) return !1;
            r.delete(k);
            r.set(l, 4);
            return !r.has(k) && 4 == r.get(l)
        } catch (q) {
            return !1
        }
    }()) return a;
    var f = "$jscomp_hidden_" + Math.random();
    e("freeze");
    e("preventExtensions");
    e("seal");
    var g = 0,
        h = function (k) {
            this.Wa = (g += Math.random() + 1).toString();
            if (k) {
                k = t(k);
                for (var l; !(l = k.next()).done;) l = l.value,
                this.set(l[0], l[1])
            }
        };
    h.prototype.set = function (k, l) {
        if (!c(k)) throw Error("Invalid WeakMap key");
        d(k);
        if (!na(k, f)) throw Error("WeakMap key fail: " + k);
        k[f][this.Wa] = l;
        return this
    };
    h.prototype.get = function (k) {
        return c(k) && na(k, f) ? k[f][this.Wa] : void 0
    };
    h.prototype.has = function (k) {
        return c(k) && na(k, f) && na(k[f], this.Wa)
    };
    h.prototype.delete = function (k) {
        return c(k) && na(k, f) && na(k[f], this.Wa) ? delete k[f][this.Wa] : !1
    };
    return h
});
n("Map", function (a) {
    if (function () {
        if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
        try {
            var h = Object.seal({
                x: 4
            }),
                k = new a(t([
                    [h, "s"]
                ]));
            if ("s" != k.get(h) || 1 != k.size || k.get({
                x: 4
            }) || k.set({
                x: 4
            }, "t") != k || 2 != k.size) return !1;
            var l = k.entries(),
                r = l.next();
            if (r.done || r.value[0] != h || "s" != r.value[1]) return !1;
            r = l.next();
            return r.done || 4 != r.value[0].x || "t" != r.value[1] || !l.next().done ? !1 : !0
        } catch (q) {
            return !1
        }
    }()) return a;
    var b = new WeakMap,
        c = function (h) {
            this.Qa = {};
            this.da =
            f();
            this.size = 0;
            if (h) {
                h = t(h);
                for (var k; !(k = h.next()).done;) k = k.value,
                this.set(k[0], k[1])
            }
        };
    c.prototype.set = function (h, k) {
        h = 0 === h ? 0 : h;
        var l = d(this, h);
        l.list || (l.list = this.Qa[l.id] = []);
        l.D ? l.D.value = k : (l.D = {
            next: this.da,
            ea: this.da.ea,
            head: this.da,
            key: h,
            value: k
        }, l.list.push(l.D), this.da.ea.next = l.D, this.da.ea = l.D, this.size++);
        return this
    };
    c.prototype.delete = function (h) {
        h = d(this, h);
        return h.D && h.list ? (h.list.splice(h.index, 1), h.list.length || delete this.Qa[h.id], h.D.ea.next = h.D.next, h.D.next.ea = h.D.ea, h.D.head = null, this.size--, !0) : !1
    };
    c.prototype.clear = function () {
        this.Qa = {};
        this.da = this.da.ea = f();
        this.size = 0
    };
    c.prototype.has = function (h) {
        return !!d(this, h).D
    };
    c.prototype.get = function (h) {
        return (h = d(this, h).D) && h.value
    };
    c.prototype.entries = function () {
        return e(this, function (h) {
            return [h.key, h.value]
        })
    };
    c.prototype.keys = function () {
        return e(this, function (h) {
            return h.key
        })
    };
    c.prototype.values = function () {
        return e(this, function (h) {
            return h.value
        })
    };
    c.prototype.forEach = function (h, k) {
        for (var l = this.entries(), r; !(r = l.next()).done;) r = r.value,
        h.call(k, r[1], r[0], this)
    };
    c.prototype[Symbol.iterator] = c.prototype.entries;
    var d = function (h, k) {
        var l = k && typeof k;
        "object" == l || "function" == l ? b.has(k) ? l = b.get(k) : (l = "" + ++g, b.set(k, l)) : l = "p_" + k;
        var r = h.Qa[l];
        if (r && na(h.Qa, l)) for (h = 0; h < r.length; h++) {
            var q = r[h];
            if (k !== k && q.key !== q.key || k === q.key) return {
                id: l,
                list: r,
                index: h,
                D: q
            }
        }
        return {
            id: l,
            list: r,
            index: -1,
            D: void 0
        }
    },
        e = function (h, k) {
            var l = h.da;
            return ea(function () {
                if (l) {
                    for (; l.head != h.da;) l = l.ea;
                    for (; l.next != l.head;) return l =
                    l.next,
                    {
                        done: !1,
                        value: k(l)
                    };
                    l = null
                }
                return {
                    done: !0,
                    value: void 0
                }
            })
        },
        f = function () {
            var h = {};
            return h.ea = h.next = h.head = h
        },
        g = 0;
    return c
});
var oa = function (a, b) {
    a instanceof String && (a += "");
    var c = 0,
        d = !1,
        e = {
            next: function () {
                if (!d && c < a.length) {
                    var f = c++;
                    return {
                        value: b(f, a[f]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
    e[Symbol.iterator] = function () {
        return e
    };
    return e
};
n("Array.prototype.keys", function (a) {
    return a ? a : function () {
        return oa(this, function (b) {
            return b
        })
    }
});
n("Array.from", function (a) {
    return a ? a : function (b, c, d) {
        c = null != c ? c : function (h) {
            return h
        };
        var e = [],
            f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
        if ("function" == typeof f) {
            b = f.call(b);
            for (var g = 0; !(f = b.next()).done;) e.push(c.call(d, f.value, g++))
        } else for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
        return e
    }
});
n("Array.prototype.values", function (a) {
    return a ? a : function () {
        return oa(this, function (b, c) {
            return c
        })
    }
});
n("Set", function (a) {
    if (function () {
        if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
        try {
            var c = Object.seal({
                x: 4
            }),
                d = new a(t([c]));
            if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({
                x: 4
            }) != d || 2 != d.size) return !1;
            var e = d.entries(),
                f = e.next();
            if (f.done || f.value[0] != c || f.value[1] != c) return !1;
            f = e.next();
            return f.done || f.value[0] == c || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : e.next().done
        } catch (g) {
            return !1
        }
    }()) return a;
    var b = function (c) {
        this.o = new Map;
        if (c) {
            c =
            t(c);
            for (var d; !(d = c.next()).done;) this.add(d.value)
        }
        this.size = this.o.size
    };
    b.prototype.add = function (c) {
        c = 0 === c ? 0 : c;
        this.o.set(c, c);
        this.size = this.o.size;
        return this
    };
    b.prototype.delete = function (c) {
        c = this.o.delete(c);
        this.size = this.o.size;
        return c
    };
    b.prototype.clear = function () {
        this.o.clear();
        this.size = 0
    };
    b.prototype.has = function (c) {
        return this.o.has(c)
    };
    b.prototype.entries = function () {
        return this.o.entries()
    };
    b.prototype.values = function () {
        return this.o.values()
    };
    b.prototype.keys = b.prototype.values;
    b.prototype[Symbol.iterator] = b.prototype.values;
    b.prototype.forEach = function (c, d) {
        var e = this;
        this.o.forEach(function (f) {
            return c.call(d, f, f, e)
        })
    };
    return b
});
n("Promise", function (a) {
    function b() {
        this.ga = null
    }

    function c(g) {
        return g instanceof e ? g : new e(function (h) {
            h(g)
        })
    }
    if (a) return a;
    b.prototype.fd = function (g) {
        if (null == this.ga) {
            this.ga = [];
            var h = this;
            this.gd(function () {
                h.ef()
            })
        }
        this.ga.push(g)
    };
    var d = da.setTimeout;
    b.prototype.gd = function (g) {
        d(g, 0)
    };
    b.prototype.ef = function () {
        for (; this.ga && this.ga.length;) {
            var g = this.ga;
            this.ga = [];
            for (var h = 0; h < g.length; ++h) {
                var k = g[h];
                g[h] = null;
                try {
                    k()
                } catch (l) {
                    this.He(l)
                }
            }
        }
        this.ga = null
    };
    b.prototype.He = function (g) {
        this.gd(function () {
            throw g;
        })
    };
    var e = function (g) {
        this.Ja = 0;
        this.hb = void 0;
        this.Ea = [];
        this.Od = !1;
        var h = this.nc();
        try {
            g(h.resolve, h.reject)
        } catch (k) {
            h.reject(k)
        }
    };
    e.prototype.nc = function () {
        function g(l) {
            return function (r) {
                k || (k = !0, l.call(h, r))
            }
        }
        var h = this,
            k = !1;
        return {
            resolve: g(this.$f),
            reject: g(this.Mc)
        }
    };
    e.prototype.$f = function (g) {
        if (g === this) this.Mc(new TypeError("A Promise cannot resolve to itself"));
        else if (g instanceof e) this.lg(g);
        else {
            a: switch (typeof g) {
            case "object":
                var h = null != g;
                break a;
            case "function":
                h = !0;
                break a;
            default:
                h = !1
            }
            h ? this.Zf(g) : this.Ad(g)
        }
    };
    e.prototype.Zf = function (g) {
        var h = void 0;
        try {
            h = g.then
        } catch (k) {
            this.Mc(k);
            return
        }
        "function" == typeof h ? this.mg(h, g) : this.Ad(g)
    };
    e.prototype.Mc = function (g) {
        this.re(2, g)
    };
    e.prototype.Ad = function (g) {
        this.re(1, g)
    };
    e.prototype.re = function (g, h) {
        if (0 != this.Ja) throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.Ja);
        this.Ja = g;
        this.hb = h;
        2 === this.Ja && this.cg();
        this.ff()
    };
    e.prototype.cg = function () {
        var g = this;
        d(function () {
            if (g.Pf()) {
                var h = da.console;
                "undefined" !== typeof h && h.error(g.hb)
            }
        }, 1)
    };
    e.prototype.Pf = function () {
        if (this.Od) return !1;
        var g = da.CustomEvent,
            h = da.Event,
            k = da.dispatchEvent;
        if ("undefined" === typeof k) return !0;
        "function" === typeof g ? g = new g("unhandledrejection", {
            cancelable: !0
        }) : "function" === typeof h ? g = new h("unhandledrejection", {
            cancelable: !0
        }) : (g = da.document.createEvent("CustomEvent"), g.initCustomEvent("unhandledrejection", !1, !0, g));
        g.promise = this;
        g.reason = this.hb;
        return k(g)
    };
    e.prototype.ff = function () {
        if (null != this.Ea) {
            for (var g =
            0; g < this.Ea.length; ++g) f.fd(this.Ea[g]);
            this.Ea = null
        }
    };
    var f = new b;
    e.prototype.lg = function (g) {
        var h = this.nc();
        g.vb(h.resolve, h.reject)
    };
    e.prototype.mg = function (g, h) {
        var k = this.nc();
        try {
            g.call(h, k.resolve, k.reject)
        } catch (l) {
            k.reject(l)
        }
    };
    e.prototype.then = function (g, h) {
        function k(w, p) {
            return "function" == typeof w ?
            function (y) {
                try {
                    l(w(y))
                } catch (u) {
                    r(u)
                }
            } : p
        }
        var l, r, q = new e(function (w, p) {
            l = w;
            r = p
        });
        this.vb(k(g, l), k(h, r));
        return q
    };
    e.prototype.
    catch = function (g) {
        return this.then(void 0, g)
    };
    e.prototype.vb = function (g, h) {
        function k() {
            switch (l.Ja) {
            case 1:
                g(l.hb);
                break;
            case 2:
                h(l.hb);
                break;
            default:
                throw Error("Unexpected state: " + l.Ja);
            }
        }
        var l = this;
        null == this.Ea ? f.fd(k) : this.Ea.push(k);
        this.Od = !0
    };
    e.resolve = c;
    e.reject = function (g) {
        return new e(function (h, k) {
            k(g)
        })
    };
    e.race = function (g) {
        return new e(function (h, k) {
            for (var l = t(g), r = l.next(); !r.done; r = l.next()) c(r.value).vb(h, k)
        })
    };
    e.all = function (g) {
        var h = t(g),
            k = h.next();
        return k.done ? c([]) : new e(function (l, r) {
            function q(y) {
                return function (u) {
                    w[y] = u;
                    p--;
                    0 == p && l(w)
                }
            }
            var w = [],
                p = 0;
            do w.push(void 0),
            p++,
            c(k.value).vb(q(w.length - 1), r),
            k = h.next();
            while (!k.done)
        })
    };
    return e
});
n("Array.prototype.entries", function (a) {
    return a ? a : function () {
        return oa(this, function (b, c) {
            return [b, c]
        })
    }
});
var pa = pa || {},
    x = this || self,
    qa = function () {},
    ra = function (a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    },
    sa = function (a) {
        var b = ra(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    },
    ua = function (a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    },
    va = function (a, b, c) {
        return a.call.apply(a.bind, arguments)
    },
    wa = function (a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    },
    z = function (a, b, c) {
        z = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? va : wa;
        return z.apply(null, arguments)
    },
    xa = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var d = c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    },
    A = function (a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.ja = b.prototype;
        a.prototype = new c;
        a.prototype.constructor =
        a;
        a.zg = function (d, e, f) {
            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
            return b.prototype[e].apply(d, g)
        }
    },
    ya = function (a) {
        return a
    };

function za(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, za);
    else {
        var b = Error().stack;
        b && (this.stack = b)
    }
    a && (this.message = String(a))
}
A(za, Error);
za.prototype.name = "CustomError";
var Aa = function (a, b) {
    a = a.split("%s");
    for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
    za.call(this, c + a[d])
};
A(Aa, za);
Aa.prototype.name = "AssertionError";
var Ba = function (a, b, c, d) {
    var e = "Assertion failed";
    if (c) {
        e += ": " + c;
        var f = d
    } else a && (e += ": " + a, f = b);
    throw new Aa("" + e, f || []);
},
    B = function (a, b, c) {
        a || Ba("", null, b, Array.prototype.slice.call(arguments, 2));
        return a
    },
    Ca = function (a, b) {
        throw new Aa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
    },
    Da = function (a, b, c) {
        "string" !== typeof a && Ba("Expected string but got %s: %s.", [ra(a), a], b, Array.prototype.slice.call(arguments, 2))
    },
    Ea = function (a, b, c) {
        Array.isArray(a) || Ba("Expected array but got %s: %s.", [ra(a), a], b, Array.prototype.slice.call(arguments, 2))
    },
    Ga = function (a, b, c, d) {
        a instanceof b || Ba("Expected instanceof %s but got %s.", [Fa(b), Fa(a)], c, Array.prototype.slice.call(arguments, 3))
    },
    Fa = function (a) {
        return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
    };
var Ha = Array.prototype.indexOf ?
function (a, b) {
    B(null != a.length);
    return Array.prototype.indexOf.call(a, b, void 0)
} : function (a, b) {
    if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
    for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
    return -1
},
    Ia = Array.prototype.forEach ?
    function (a, b, c) {
        B(null != a.length);
        Array.prototype.forEach.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
    },
    Ja = Array.prototype.map ?
    function (a, b) {
        B(null != a.length);
        return Array.prototype.map.call(a, b, void 0)
    } : function (a, b) {
        for (var c = a.length, d = Array(c), e = "string" === typeof a ? a.split("") : a, f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));
        return d
    };

function Ka(a, b) {
    a: {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++) if (e in d && b.call(void 0, d[e], e, a)) {
            b = e;
            break a
        }
        b = -1
    }
    return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
}

function La(a, b) {
    b = Ha(a, b);
    var c;
    if (c = 0 <= b) B(null != a.length),
    Array.prototype.splice.call(a, b, 1);
    return c
};
var Ma = function (a) {
    for (var b = [], c = 0, d = 0; d < a.length; d++) {
        var e = a.charCodeAt(d);
        255 < e && (b[c++] = e & 255, e >>= 8);
        b[c++] = e
    }
    return b
};
var Na = function (a) {
    var b = b || 0;
    return function () {
        return a.apply(this, Array.prototype.slice.call(arguments, 0, b))
    }
};

function Oa(a, b) {
    for (var c in a) if (b.call(void 0, a[c], c, a)) return !0;
    return !1
}

function Pa(a, b) {
    return null !== a && b in a
}
var Qa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

function Ra(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < Qa.length; f++) c = Qa[f],
        Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
};
var Sa;
var Va = function (a, b) {
    this.Uc = a === Ta && b || "";
    this.De = Ua
};
Va.prototype.Eb = !0;
Va.prototype.Va = function () {
    return this.Uc
};
Va.prototype.toString = function () {
    return "Const{" + this.Uc + "}"
};
var Wa = function (a) {
    if (a instanceof Va && a.constructor === Va && a.De === Ua) return a.Uc;
    Ca("expected object of type Const, got '" + a + "'");
    return "type_error:Const"
},
    Ua = {},
    Ta = {};
var Xa = String.prototype.trim ?
function (a) {
    return a.trim()
} : function (a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
},
    Ya = /&/g,
    Za = /</g,
    $a = />/g,
    ab = /"/g,
    bb = /'/g,
    cb = /\x00/g,
    db = /[\x00&<>"']/,
    fb = function (a, b) {
        var c = 0;
        a = Xa(String(a)).split(".");
        b = Xa(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || "",
                g = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                if (0 == f[0].length && 0 == g[0].length) break;
                c = eb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || eb(0 == f[2].length, 0 == g[2].length) || eb(f[2], g[2]);
                f = f[3];
                g = g[3]
            } while (0 == c)
        }
        return c
    },
    eb = function (a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
var hb = function (a, b) {
    this.Lc = b === gb ? a : ""
};
m = hb.prototype;
m.Eb = !0;
m.Va = function () {
    return this.Lc.toString()
};
m.Id = !0;
m.uc = function () {
    return 1
};
m.toString = function () {
    return this.Lc.toString()
};
var ib = function (a) {
    if (a instanceof hb && a.constructor === hb) return a.Lc;
    Ca("expected object of type SafeUrl, got '" + a + "' of type " + ra(a));
    return "type_error:SafeUrl"
},
    jb = /^(?:audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|font\/\w+|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|video\/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i,
    kb = /^data:(.*);base64,[a-z0-9+\/]+=*$/i,
    lb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
    gb = {},
    mb = new hb("about:invalid#zClosurez", gb);
var nb;
a: {
    var ob = x.navigator;
    if (ob) {
        var pb = ob.userAgent;
        if (pb) {
            nb = pb;
            break a
        }
    }
    nb = ""
}
var C = function (a) {
    return -1 != nb.indexOf(a)
},
    qb = function (a) {
        for (var b = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, c = [], d; d = b.exec(a);) c.push([d[1], d[2], d[3] || void 0]);
        return c
    };
var rb = function () {
    return C("Opera")
},
    sb = function () {
        return C("Trident") || C("MSIE")
    },
    tb = function () {
        return C("Firefox") || C("FxiOS")
    },
    vb = function () {
        return C("Safari") && !(ub() || C("Coast") || rb() || C("Edge") || C("Edg/") || C("OPR") || tb() || C("Silk") || C("Android"))
    },
    ub = function () {
        return (C("Chrome") || C("CriOS")) && !C("Edge")
    },
    xb = function () {
        function a(e) {
            e = Ka(e, d);
            return c[e] || ""
        }
        var b = nb;
        if (sb()) return wb(b);
        b = qb(b);
        var c = {};
        Ia(b, function (e) {
            c[e[0]] = e[1]
        });
        var d = xa(Pa, c);
        return rb() ? a(["Version", "Opera"]) : C("Edge") ? a(["Edge"]) : C("Edg/") ? a(["Edg"]) : ub() ? a(["Chrome", "CriOS", "HeadlessChrome"]) : (b = b[2]) && b[1] || ""
    },
    wb = function (a) {
        var b = /rv: *([\d\.]*)/.exec(a);
        if (b && b[1]) return b[1];
        b = "";
        var c = /MSIE +([\d\.]+)/.exec(a);
        if (c && c[1]) if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1]) if (a && a[1]) switch (a[1]) {
        case "4.0":
            b = "8.0";
            break;
        case "5.0":
            b = "9.0";
            break;
        case "6.0":
            b = "10.0";
            break;
        case "7.0":
            b = "11.0"
        } else b = "7.0";
        else b = c[1];
        return b
    };
var zb = function (a, b, c) {
    this.Kc = c === yb ? a : "";
    this.Ze = b
};
m = zb.prototype;
m.Id = !0;
m.uc = function () {
    return this.Ze
};
m.Eb = !0;
m.Va = function () {
    return this.Kc.toString()
};
m.toString = function () {
    return this.Kc.toString()
};
var Ab = function (a) {
    if (a instanceof zb && a.constructor === zb) return a.Kc;
    Ca("expected object of type SafeHtml, got '" + a + "' of type " + ra(a));
    return "type_error:SafeHtml"
},
    Cb = function (a) {
        if (a instanceof zb) return a;
        var b = "object" == typeof a,
            c = null;
        b && a.Id && (c = a.uc());
        a = b && a.Eb ? a.Va() : String(a);
        db.test(a) && (-1 != a.indexOf("&") && (a = a.replace(Ya, "&amp;")), -1 != a.indexOf("<") && (a = a.replace(Za, "&lt;")), -1 != a.indexOf(">") && (a = a.replace($a, "&gt;")), -1 != a.indexOf('"') && (a = a.replace(ab, "&quot;")), -1 != a.indexOf("'") && (a = a.replace(bb, "&#39;")), -1 != a.indexOf("\x00") && (a = a.replace(cb, "&#0;")));
        return Bb(a, c)
    },
    yb = {},
    Bb = function (a, b) {
        if (void 0 === Sa) {
            var c = null;
            var d = x.trustedTypes;
            if (d && d.createPolicy) try {
                c = d.createPolicy("goog#html", {
                    createHTML: ya,
                    createScript: ya,
                    createScriptURL: ya
                })
            } catch (e) {
                x.console && x.console.error(e.message)
            }
            Sa = c
        }
        a = (c = Sa) ? c.createHTML(a) : a;
        return new zb(a, b, yb)
    },
    Db = new zb(x.trustedTypes && x.trustedTypes.emptyHTML || "", 0, yb);
var Eb = function (a) {
    var b = !1,
        c;
    return function () {
        b || (c = a(), b = !0);
        return c
    }
}(function () {
    if ("undefined" === typeof document) return !1;
    var a = document.createElement("div"),
        b = document.createElement("div");
    b.appendChild(document.createElement("div"));
    a.appendChild(b);
    if (!a.firstChild) return !1;
    b = a.firstChild.firstChild;
    a.innerHTML = Ab(Db);
    return !b.parentElement
});
var Fb = function () {
    return C("iPhone") && !C("iPod") && !C("iPad")
},
    Gb = function () {
        var a = nb,
            b = "";
        C("Windows") ? (b = /Windows (?:NT|Phone) ([0-9.]+)/, b = (a = b.exec(a)) ? a[1] : "0.0") : Fb() || C("iPad") || C("iPod") ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : C("Macintosh") ? (b = /Mac OS X ([0-9_.]+)/, b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : -1 != nb.toLowerCase().indexOf("kaios") ? (b = /(?:KaiOS)\/(\S+)/i, b = (a = b.exec(a)) && a[1]) : C("Android") ? (b = /Android\s+([^\);]+)(\)|;)/, b = (a = b.exec(a)) && a[1]) : C("CrOS") && (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, b = (a = b.exec(a)) && a[1]);
        return 0 <= fb(b || "", 12)
    };
var Hb = function (a) {
    Hb[" "](a);
    return a
};
Hb[" "] = qa;
var Jb = function (a, b) {
    var c = Ib;
    return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
};
var Kb = rb(),
    Lb = sb(),
    Mb = C("Edge"),
    Nb = C("Gecko") && !(-1 != nb.toLowerCase().indexOf("webkit") && !C("Edge")) && !(C("Trident") || C("MSIE")) && !C("Edge"),
    Ob = -1 != nb.toLowerCase().indexOf("webkit") && !C("Edge"),
    Pb;
a: {
    var Qb = "",
        Rb = function () {
            var a = nb;
            if (Nb) return /rv:([^\);]+)(\)|;)/.exec(a);
            if (Mb) return /Edge\/([\d\.]+)/.exec(a);
            if (Lb) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (Ob) return /WebKit\/(\S+)/.exec(a);
            if (Kb) return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
    Rb && (Qb = Rb ? Rb[1] : "");
    if (Lb) {
        var Sb, Tb = x.document;
        Sb = Tb ? Tb.documentMode : void 0;
        if (null != Sb && Sb > parseFloat(Qb)) {
            Pb = String(Sb);
            break a
        }
    }
    Pb = Qb
}
var Ub = Pb,
    Ib = {},
    Vb = function (a) {
        return Jb(a, function () {
            return 0 <= fb(Ub, a)
        })
    };
var Wb = tb(),
    Xb = ub(),
    Yb = vb() && !(Fb() || C("iPad") || C("iPod"));
var Zb = {},
    $b = null,
    ac = function (a, b) {
        B(sa(a), "encodeByteArray takes an array as a parameter");
        void 0 === b && (b = 0);
        if (!$b) {
            $b = {};
            for (var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), d = ["+/=", "+/", "-_=", "-_.", "-_"], e = 0; 5 > e; e++) {
                var f = c.concat(d[e].split(""));
                Zb[e] = f;
                for (var g = 0; g < f.length; g++) {
                    var h = f[g],
                        k = $b[h];
                    void 0 === k ? $b[h] = g : B(k === g)
                }
            }
        }
        b = Zb[b];
        c = Array(Math.floor(a.length / 3));
        d = b[64] || "";
        for (e = f = 0; f < a.length - 2; f += 3) {
            k = a[f];
            var l = a[f + 1];
            h = a[f + 2];
            g = b[k >> 2];
            k = b[(k & 3) << 4 | l >> 4];
            l = b[(l & 15) << 2 | h >> 6];
            h = b[h & 63];
            c[e++] = "" + g + k + l + h
        }
        g = 0;
        h = d;
        switch (a.length - f) {
        case 2:
            g = a[f + 1],
            h = b[(g & 15) << 2] || d;
        case 1:
            a = a[f],
            c[e] = "" + b[a >> 2] + b[(a & 3) << 4 | g >> 4] + h + d
        }
        return c.join("")
    };
var bc = function () {
    this.blockSize = -1
};
var cc = function (a, b, c) {
    this.blockSize = -1;
    this.R = a;
    this.blockSize = c || a.blockSize || 16;
    this.Sd = Array(this.blockSize);
    this.Gc = Array(this.blockSize);
    a = b;
    a.length > this.blockSize && (this.R.update(a), a = this.R.digest(), this.R.reset());
    for (c = 0; c < this.blockSize; c++) b = c < a.length ? a[c] : 0,
    this.Sd[c] = b ^ 92,
    this.Gc[c] = b ^ 54;
    this.R.update(this.Gc)
};
A(cc, bc);
cc.prototype.reset = function () {
    this.R.reset();
    this.R.update(this.Gc)
};
cc.prototype.update = function (a, b) {
    this.R.update(a, b)
};
cc.prototype.digest = function () {
    var a = this.R.digest();
    this.R.reset();
    this.R.update(this.Sd);
    this.R.update(a);
    return this.R.digest()
};
var dc = function () {
    this.blockSize = -1;
    this.blockSize = 64;
    this.B = Array(4);
    this.Ke = Array(this.blockSize);
    this.Vb = this.Oa = 0;
    this.reset()
};
A(dc, bc);
dc.prototype.reset = function () {
    this.B[0] = 1732584193;
    this.B[1] = 4023233417;
    this.B[2] = 2562383102;
    this.B[3] = 271733878;
    this.Vb = this.Oa = 0
};
var ec = function (a, b, c) {
    c || (c = 0);
    var d = Array(16);
    if ("string" === typeof b) for (var e = 0; 16 > e; ++e) d[e] = b.charCodeAt(c++) | b.charCodeAt(c++) << 8 | b.charCodeAt(c++) << 16 | b.charCodeAt(c++) << 24;
    else for (e = 0; 16 > e; ++e) d[e] = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24;
    b = a.B[0];
    c = a.B[1];
    e = a.B[2];
    var f = a.B[3];
    var g = b + (f ^ c & (e ^ f)) + d[0] + 3614090360 & 4294967295;
    b = c + (g << 7 & 4294967295 | g >>> 25);
    g = f + (e ^ b & (c ^ e)) + d[1] + 3905402710 & 4294967295;
    f = b + (g << 12 & 4294967295 | g >>> 20);
    g = e + (c ^ f & (b ^ c)) + d[2] + 606105819 & 4294967295;
    e = f + (g << 17 & 4294967295 | g >>> 15);
    g = c + (b ^ e & (f ^ b)) + d[3] + 3250441966 & 4294967295;
    c = e + (g << 22 & 4294967295 | g >>> 10);
    g = b + (f ^ c & (e ^ f)) + d[4] + 4118548399 & 4294967295;
    b = c + (g << 7 & 4294967295 | g >>> 25);
    g = f + (e ^ b & (c ^ e)) + d[5] + 1200080426 & 4294967295;
    f = b + (g << 12 & 4294967295 | g >>> 20);
    g = e + (c ^ f & (b ^ c)) + d[6] + 2821735955 & 4294967295;
    e = f + (g << 17 & 4294967295 | g >>> 15);
    g = c + (b ^ e & (f ^ b)) + d[7] + 4249261313 & 4294967295;
    c = e + (g << 22 & 4294967295 | g >>> 10);
    g = b + (f ^ c & (e ^ f)) + d[8] + 1770035416 & 4294967295;
    b = c + (g << 7 & 4294967295 | g >>> 25);
    g = f + (e ^ b & (c ^ e)) + d[9] + 2336552879 & 4294967295;
    f = b + (g << 12 & 4294967295 | g >>> 20);
    g = e + (c ^ f & (b ^ c)) + d[10] + 4294925233 & 4294967295;
    e = f + (g << 17 & 4294967295 | g >>> 15);
    g = c + (b ^ e & (f ^ b)) + d[11] + 2304563134 & 4294967295;
    c = e + (g << 22 & 4294967295 | g >>> 10);
    g = b + (f ^ c & (e ^ f)) + d[12] + 1804603682 & 4294967295;
    b = c + (g << 7 & 4294967295 | g >>> 25);
    g = f + (e ^ b & (c ^ e)) + d[13] + 4254626195 & 4294967295;
    f = b + (g << 12 & 4294967295 | g >>> 20);
    g = e + (c ^ f & (b ^ c)) + d[14] + 2792965006 & 4294967295;
    e = f + (g << 17 & 4294967295 | g >>> 15);
    g = c + (b ^ e & (f ^ b)) + d[15] + 1236535329 & 4294967295;
    c = e + (g << 22 & 4294967295 | g >>> 10);
    g = b + (e ^ f & (c ^ e)) + d[1] + 4129170786 & 4294967295;
    b = c + (g << 5 & 4294967295 | g >>> 27);
    g = f + (c ^ e & (b ^ c)) + d[6] + 3225465664 & 4294967295;
    f = b + (g << 9 & 4294967295 | g >>> 23);
    g = e + (b ^ c & (f ^ b)) + d[11] + 643717713 & 4294967295;
    e = f + (g << 14 & 4294967295 | g >>> 18);
    g = c + (f ^ b & (e ^ f)) + d[0] + 3921069994 & 4294967295;
    c = e + (g << 20 & 4294967295 | g >>> 12);
    g = b + (e ^ f & (c ^ e)) + d[5] + 3593408605 & 4294967295;
    b = c + (g << 5 & 4294967295 | g >>> 27);
    g = f + (c ^ e & (b ^ c)) + d[10] + 38016083 & 4294967295;
    f = b + (g << 9 & 4294967295 | g >>> 23);
    g = e + (b ^ c & (f ^ b)) + d[15] + 3634488961 & 4294967295;
    e = f + (g << 14 & 4294967295 | g >>> 18);
    g = c + (f ^ b & (e ^ f)) + d[4] + 3889429448 & 4294967295;
    c =
    e + (g << 20 & 4294967295 | g >>> 12);
    g = b + (e ^ f & (c ^ e)) + d[9] + 568446438 & 4294967295;
    b = c + (g << 5 & 4294967295 | g >>> 27);
    g = f + (c ^ e & (b ^ c)) + d[14] + 3275163606 & 4294967295;
    f = b + (g << 9 & 4294967295 | g >>> 23);
    g = e + (b ^ c & (f ^ b)) + d[3] + 4107603335 & 4294967295;
    e = f + (g << 14 & 4294967295 | g >>> 18);
    g = c + (f ^ b & (e ^ f)) + d[8] + 1163531501 & 4294967295;
    c = e + (g << 20 & 4294967295 | g >>> 12);
    g = b + (e ^ f & (c ^ e)) + d[13] + 2850285829 & 4294967295;
    b = c + (g << 5 & 4294967295 | g >>> 27);
    g = f + (c ^ e & (b ^ c)) + d[2] + 4243563512 & 4294967295;
    f = b + (g << 9 & 4294967295 | g >>> 23);
    g = e + (b ^ c & (f ^ b)) + d[7] + 1735328473 & 4294967295;
    e = f + (g << 14 & 4294967295 | g >>> 18);
    g = c + (f ^ b & (e ^ f)) + d[12] + 2368359562 & 4294967295;
    c = e + (g << 20 & 4294967295 | g >>> 12);
    g = b + (c ^ e ^ f) + d[5] + 4294588738 & 4294967295;
    b = c + (g << 4 & 4294967295 | g >>> 28);
    g = f + (b ^ c ^ e) + d[8] + 2272392833 & 4294967295;
    f = b + (g << 11 & 4294967295 | g >>> 21);
    g = e + (f ^ b ^ c) + d[11] + 1839030562 & 4294967295;
    e = f + (g << 16 & 4294967295 | g >>> 16);
    g = c + (e ^ f ^ b) + d[14] + 4259657740 & 4294967295;
    c = e + (g << 23 & 4294967295 | g >>> 9);
    g = b + (c ^ e ^ f) + d[1] + 2763975236 & 4294967295;
    b = c + (g << 4 & 4294967295 | g >>> 28);
    g = f + (b ^ c ^ e) + d[4] + 1272893353 & 4294967295;
    f = b + (g << 11 & 4294967295 | g >>> 21);
    g = e + (f ^ b ^ c) + d[7] + 4139469664 & 4294967295;
    e = f + (g << 16 & 4294967295 | g >>> 16);
    g = c + (e ^ f ^ b) + d[10] + 3200236656 & 4294967295;
    c = e + (g << 23 & 4294967295 | g >>> 9);
    g = b + (c ^ e ^ f) + d[13] + 681279174 & 4294967295;
    b = c + (g << 4 & 4294967295 | g >>> 28);
    g = f + (b ^ c ^ e) + d[0] + 3936430074 & 4294967295;
    f = b + (g << 11 & 4294967295 | g >>> 21);
    g = e + (f ^ b ^ c) + d[3] + 3572445317 & 4294967295;
    e = f + (g << 16 & 4294967295 | g >>> 16);
    g = c + (e ^ f ^ b) + d[6] + 76029189 & 4294967295;
    c = e + (g << 23 & 4294967295 | g >>> 9);
    g = b + (c ^ e ^ f) + d[9] + 3654602809 & 4294967295;
    b = c + (g << 4 & 4294967295 | g >>> 28);
    g = f + (b ^ c ^ e) + d[12] + 3873151461 & 4294967295;
    f = b + (g << 11 & 4294967295 | g >>> 21);
    g = e + (f ^ b ^ c) + d[15] + 530742520 & 4294967295;
    e = f + (g << 16 & 4294967295 | g >>> 16);
    g = c + (e ^ f ^ b) + d[2] + 3299628645 & 4294967295;
    c = e + (g << 23 & 4294967295 | g >>> 9);
    g = b + (e ^ (c | ~f)) + d[0] + 4096336452 & 4294967295;
    b = c + (g << 6 & 4294967295 | g >>> 26);
    g = f + (c ^ (b | ~e)) + d[7] + 1126891415 & 4294967295;
    f = b + (g << 10 & 4294967295 | g >>> 22);
    g = e + (b ^ (f | ~c)) + d[14] + 2878612391 & 4294967295;
    e = f + (g << 15 & 4294967295 | g >>> 17);
    g = c + (f ^ (e | ~b)) + d[5] + 4237533241 & 4294967295;
    c = e + (g << 21 & 4294967295 | g >>> 11);
    g = b + (e ^ (c | ~f)) + d[12] + 1700485571 & 4294967295;
    b = c + (g << 6 & 4294967295 | g >>> 26);
    g = f + (c ^ (b | ~e)) + d[3] + 2399980690 & 4294967295;
    f = b + (g << 10 & 4294967295 | g >>> 22);
    g = e + (b ^ (f | ~c)) + d[10] + 4293915773 & 4294967295;
    e = f + (g << 15 & 4294967295 | g >>> 17);
    g = c + (f ^ (e | ~b)) + d[1] + 2240044497 & 4294967295;
    c = e + (g << 21 & 4294967295 | g >>> 11);
    g = b + (e ^ (c | ~f)) + d[8] + 1873313359 & 4294967295;
    b = c + (g << 6 & 4294967295 | g >>> 26);
    g = f + (c ^ (b | ~e)) + d[15] + 4264355552 & 4294967295;
    f = b + (g << 10 & 4294967295 | g >>> 22);
    g = e + (b ^ (f | ~c)) + d[6] + 2734768916 & 4294967295;
    e = f + (g << 15 & 4294967295 | g >>> 17);
    g = c + (f ^ (e | ~b)) + d[13] + 1309151649 & 4294967295;
    c = e + (g << 21 & 4294967295 | g >>> 11);
    g = b + (e ^ (c | ~f)) + d[4] + 4149444226 & 4294967295;
    b = c + (g << 6 & 4294967295 | g >>> 26);
    g = f + (c ^ (b | ~e)) + d[11] + 3174756917 & 4294967295;
    f = b + (g << 10 & 4294967295 | g >>> 22);
    g = e + (b ^ (f | ~c)) + d[2] + 718787259 & 4294967295;
    e = f + (g << 15 & 4294967295 | g >>> 17);
    g = c + (f ^ (e | ~b)) + d[9] + 3951481745 & 4294967295;
    a.B[0] = a.B[0] + b & 4294967295;
    a.B[1] = a.B[1] + (e + (g << 21 & 4294967295 | g >>> 11)) & 4294967295;
    a.B[2] = a.B[2] + e & 4294967295;
    a.B[3] = a.B[3] + f & 4294967295
};
dc.prototype.update = function (a, b) {
    void 0 === b && (b = a.length);
    for (var c = b - this.blockSize, d = this.Ke, e = this.Oa, f = 0; f < b;) {
        if (0 == e) for (; f <= c;) ec(this, a, f),
        f += this.blockSize;
        if ("string" === typeof a) for (; f < b;) {
            if (d[e++] = a.charCodeAt(f++), e == this.blockSize) {
                ec(this, d);
                e = 0;
                break
            }
        } else for (; f < b;) if (d[e++] = a[f++], e == this.blockSize) {
            ec(this, d);
            e = 0;
            break
        }
    }
    this.Oa = e;
    this.Vb += b
};
dc.prototype.digest = function () {
    var a = Array((56 > this.Oa ? this.blockSize : 2 * this.blockSize) - this.Oa);
    a[0] = 128;
    for (var b = 1; b < a.length - 8; ++b) a[b] = 0;
    var c = 8 * this.Vb;
    for (b = a.length - 8; b < a.length; ++b) a[b] = c & 255,
    c /= 256;
    this.update(a);
    a = Array(16);
    for (b = c = 0; 4 > b; ++b) for (var d = 0; 32 > d; d += 8) a[c++] = this.B[b] >>> d & 255;
    return a
};
var fc = function (a, b) {
    this.Re = a[x.Symbol.iterator]();
    this.Jf = b;
    this.Nf = 0
};
fc.prototype[Symbol.iterator] = function () {
    return this
};
fc.prototype.next = function () {
    var a = this.Re.next();
    return {
        value: a.done ? void 0 : this.Jf.call(void 0, a.value, this.Nf++),
        done: a.done
    }
};
var gc = function (a, b) {
    return new fc(a, b)
};
var hc = function (a, b) {
    return a + Math.random() * (b - a)
};
var ic = "StopIteration" in x ? x.StopIteration : {
    message: "StopIteration",
    stack: ""
},
    jc = function () {};
jc.prototype.next = function () {
    return jc.prototype.Of.call(this)
};
jc.prototype.Of = function () {
    throw ic;
};
jc.prototype.sa = function () {
    return this
};
var pc = function (a) {
    if (a instanceof lc || a instanceof mc || a instanceof nc) return a;
    if ("function" == typeof a.next) return new lc(function () {
        return oc(a)
    });
    if ("function" == typeof a[Symbol.iterator]) return new lc(function () {
        return a[Symbol.iterator]()
    });
    if ("function" == typeof a.sa) return new lc(function () {
        return oc(a.sa())
    });
    throw Error("Not an iterator or iterable.");
},
    oc = function (a) {
        if (!(a instanceof jc)) return a;
        var b = !1;
        return {
            next: function () {
                for (var c; !b;) try {
                    c = a.next();
                    break
                } catch (d) {
                    if (d !== ic) throw d;
                    b = !0
                }
                return {
                    value: c,
                    done: b
                }
            }
        }
    },
    lc = function (a) {
        this.rc = a
    };
lc.prototype.sa = function () {
    return new mc(this.rc())
};
lc.prototype[Symbol.iterator] = function () {
    return new nc(this.rc())
};
lc.prototype.Vc = function () {
    return new nc(this.rc())
};
var mc = function (a) {
    this.Xa = a
};
v(mc, jc);
mc.prototype.next = function () {
    var a = this.Xa.next();
    if (a.done) throw ic;
    return a.value
};
mc.prototype[Symbol.iterator] = function () {
    return new nc(this.Xa)
};
mc.prototype.Vc = function () {
    return new nc(this.Xa)
};
var nc = function (a) {
    lc.call(this, function () {
        return a
    });
    this.Xa = a
};
v(nc, lc);
nc.prototype.next = function () {
    return this.Xa.next()
};
var qc = function (a, b) {
    this.o = {};
    this.v = [];
    this.rb = this.size = 0;
    var c = arguments.length;
    if (1 < c) {
        if (c % 2) throw Error("Uneven number of arguments");
        for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
    } else a && this.addAll(a)
};
m = qc.prototype;
m.Da = function () {
    rc(this);
    for (var a = [], b = 0; b < this.v.length; b++) a.push(this.o[this.v[b]]);
    return a
};
m.na = function () {
    rc(this);
    return this.v.concat()
};
m.rd = function (a) {
    return this.has(a)
};
m.has = function (a) {
    return sc(this.o, a)
};
m.Ld = function () {
    return 0 == this.size
};
m.clear = function () {
    this.o = {};
    this.rb = this.size = this.v.length = 0
};
m.remove = function (a) {
    return this.delete(a)
};
m.delete = function (a) {
    return sc(this.o, a) ? (delete this.o[a], --this.size, this.rb++, this.v.length > 2 * this.size && rc(this), !0) : !1
};
var rc = function (a) {
    if (a.size != a.v.length) {
        for (var b = 0, c = 0; b < a.v.length;) {
            var d = a.v[b];
            sc(a.o, d) && (a.v[c++] = d);
            b++
        }
        a.v.length = c
    }
    if (a.size != a.v.length) {
        var e = {};
        for (c = b = 0; b < a.v.length;) d = a.v[b],
        sc(e, d) || (a.v[c++] = d, e[d] = 1),
        b++;
        a.v.length = c
    }
};
m = qc.prototype;
m.get = function (a, b) {
    return sc(this.o, a) ? this.o[a] : b
};
m.set = function (a, b) {
    sc(this.o, a) || (this.size += 1, this.v.push(a), this.rb++);
    this.o[a] = b
};
m.addAll = function (a) {
    if (a instanceof qc) for (var b = a.na(), c = 0; c < b.length; c++) this.set(b[c], a.get(b[c]));
    else for (b in a) this.set(b, a[b])
};
m.forEach = function (a, b) {
    for (var c = this.na(), d = 0; d < c.length; d++) {
        var e = c[d],
            f = this.get(e);
        a.call(b, f, e, this)
    }
};
m.clone = function () {
    return new qc(this)
};
m.keys = function () {
    return pc(this.sa(!0)).Vc()
};
m.values = function () {
    return pc(this.sa(!1)).Vc()
};
m.entries = function () {
    var a = this;
    return gc(this.keys(), function (b) {
        return [b, a.get(b)]
    })
};
m.sa = function (a) {
    rc(this);
    var b = 0,
        c = this.rb,
        d = this,
        e = new jc;
    e.next = function () {
        if (c != d.rb) throw Error("The map has changed since the iterator was created");
        if (b >= d.v.length) throw ic;
        var f = d.v[b++];
        return a ? f : d.o[f]
    };
    return e
};
var sc = function (a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
};
var tc = function (a) {
    if (a.Da && "function" == typeof a.Da) return a.Da();
    if ("undefined" !== typeof Map && a instanceof Map || "undefined" !== typeof Set && a instanceof Set) return Array.from(a.values());
    if ("string" === typeof a) return a.split("");
    if (sa(a)) {
        for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
        return b
    }
    b = [];
    c = 0;
    for (d in a) b[c++] = a[d];
    return b
},
    uc = function (a) {
        if (a.na && "function" == typeof a.na) return a.na();
        if (!a.Da || "function" != typeof a.Da) {
            if ("undefined" !== typeof Map && a instanceof Map) return Array.from(a.keys());
            if (!("undefined" !== typeof Set && a instanceof Set)) {
                if (sa(a) || "string" === typeof a) {
                    var b = [];
                    a = a.length;
                    for (var c = 0; c < a; c++) b.push(c);
                    return b
                }
                b = [];
                c = 0;
                for (var d in a) b[c++] = d;
                return b
            }
        }
    },
    vc = function (a, b) {
        if (a.forEach && "function" == typeof a.forEach) a.forEach(b, void 0);
        else if (sa(a) || "string" === typeof a) Ia(a, b, void 0);
        else for (var c = uc(a), d = tc(a), e = d.length, f = 0; f < e; f++) b.call(void 0, d[f], c && c[f], a)
    };
var wc = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,
    xc = function (a, b) {
        if (!b) return a;
        var c = a.indexOf("#");
        0 > c && (c = a.length);
        var d = a.indexOf("?");
        if (0 > d || d > c) {
            d = c;
            var e = ""
        } else e = a.substring(d + 1, c);
        a = [a.substr(0, d), e, a.substr(c)];
        c = a[1];
        a[1] = b ? c ? c + "&" + b : b : c;
        return a[0] + (a[1] ? "?" + a[1] : "") + a[2]
    },
    yc = function (a, b, c) {
        Da(a);
        if (Array.isArray(b)) {
            Ea(b);
            for (var d = 0; d < b.length; d++) yc(a, String(b[d]), c)
        } else null != b && c.push(a + ("" === b ? "" : "=" + encodeURIComponent(String(b))))
    },
    zc = function (a, b) {
        B(0 == Math.max(a.length - (b || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
        var c = [];
        for (b = b || 0; b < a.length; b += 2) yc(a[b], a[b + 1], c);
        return c.join("&")
    },
    Ac = function (a, b) {
        var c = 2 == arguments.length ? zc(arguments[1], 0) : zc(arguments, 1);
        return xc(a, c)
    },
    Bc = function (a, b, c) {
        c = null != c ? "=" + encodeURIComponent(String(c)) : "";
        return xc(a, b + c)
    },
    Cc = function (a, b, c, d) {
        for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d;) {
            var f = a.charCodeAt(b - 1);
            if (38 == f || 63 == f) if (f = a.charCodeAt(b + e), !f || 61 == f || 38 == f || 35 == f) return b;
            b += e + 1
        }
        return -1
    },
    Dc = /#|$/,
    Ec = /[?&]($|#)/,
    Fc = function (a, b) {
        for (var c = a.search(Dc), d = 0, e, f = []; 0 <= (e = Cc(a, d, b, c));) f.push(a.substring(d, e)),
        d = Math.min(a.indexOf("&", e) + 1 || c, c);
        f.push(a.substr(d));
        return f.join("").replace(Ec, "$1")
    },
    Gc = function (a) {
        return Bc(Fc(document.location.href, "hl"), "hl", a)
    };
var Hc = {
    Hg: !0
},
    Ic = function () {
        throw Error("Do not instantiate directly");
    };
Ic.prototype.mc = null;
Ic.prototype.toString = function () {
    return this.content
};
var Jc = function () {
    Ic.call(this)
};
A(Jc, Ic);
Jc.prototype.xa = Hc;
var Kc = function (a) {
    var b = null != a && a.xa === Hc;
    b && B(a.constructor === Jc);
    return b
};
var Lc = Object.freeze ||
function (a) {
    return a
};
var Mc = function (a) {
    if (null != a) switch (a.mc) {
    case 1:
        return 1;
    case -1:
        return -1;
    case 0:
        return 0
    }
    return null
},
    Pc = function (a) {
        return Kc(a) ? a : a instanceof zb ? E(Ab(a).toString(), a.uc()) : E(String(String(a)).replace(Nc, Oc), Mc(a))
    },
    E = function (a) {
        function b(c) {
            this.content = c
        }
        b.prototype = a.prototype;
        return function (c, d) {
            c = new b(String(c));
            void 0 !== d && (c.mc = d);
            return c
        }
    }(Jc),
    F = {},
    G = function (a) {
        if (Kc(a)) {
            var b = String;
            a = String(a.content).replace(Qc, "").replace(Rc, "&lt;");
            b = b(a).replace(Sc, Oc)
        } else b = String(a).replace(Nc, Oc);
        return b
    },
    Tc = function (a, b) {
        a || (a = b instanceof Function ? b.displayName || b.name || "unknown type name" : b instanceof Object ? b.constructor.displayName || b.constructor.name || Object.prototype.toString.call(b) : null === b ? "null" : typeof b, Ca("expected @param origin of type string, but got " + a + "."))
    },
    Uc = {},
    Vc = function () {
        B(Uc === Uc, "found an incorrect call marker, was an internal function called from the top level?")
    },
    Wc = {
        "\x00": "&#0;",
        "\t": "&#9;",
        "\n": "&#10;",
        "\x0B": "&#11;",
        "\f": "&#12;",
        "\r": "&#13;",
        " ": "&#32;",
        '"': "&quot;",
        "&": "&amp;",
        "'": "&#39;",
        "-": "&#45;",
        "/": "&#47;",
        "<": "&lt;",
        "=": "&#61;",
        ">": "&gt;",
        "`": "&#96;",
        "\u0085": "&#133;",
        "\u00a0": "&#160;",
        "\u2028": "&#8232;",
        "\u2029": "&#8233;"
    },
    Oc = function (a) {
        return Wc[a]
    },
    Nc = /[\x00\x22\x26\x27\x3c\x3e]/g,
    Sc = /[\x00\x22\x27\x3c\x3e]/g,
    Qc = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
    Rc = /</g;
var Xc = function (a) {
    var b = document;
    return "string" === typeof a ? b.getElementById(a) : a
};
var Zc = function (a, b, c, d) {
    c = b(c || Yc, d);
    if (ua(c)) if (c instanceof Ic) {
        if (c.xa !== Hc) throw Error("Sanitized content was not of kind HTML.");
        b = c.toString();
        c = c.mc;
        d = new Va(Ta, "Soy SanitizedContent of kind HTML produces SafeHtml-contract-compliant value.");
        Da(Wa(d), "must provide justification");
        B(!/^[\s\xa0]*$/.test(Wa(d)), "must provide non-empty justification");
        b = Bb(b, c || null)
    } else Ca("Soy template output is unsafe for use as HTML: " + c),
    b = Cb("zSoyz");
    else b = Cb(String(c));
    a = B(a);
    if (Eb()) for (; a.lastChild;) a.removeChild(a.lastChild);
    a.innerHTML = Ab(b)
},
    Yc = {};
var $c = function (a) {
    if (F["oauth2.gsi.soy.common.dialogHeader"]) return F["oauth2.gsi.soy.common.dialogHeader"](null, a);
    var b = '<div class="' + G("dialog-header") + '"><div class="' + G("google-icon") + '">';
    a = F["oauth2.gsi.soy.common.googleIcon"] ? F["oauth2.gsi.soy.common.googleIcon"](null, a) : E('<svg class="' + G("icon") + '" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/><path fill="none" d="M2 2h44v44H2z"/></svg>');
    return E(b + a + "</div><p>Continue with Google</p></div>")
},
    ad = function (a) {
        if (F["oauth2.gsi.soy.common.dialogFooter"]) var b = F["oauth2.gsi.soy.common.dialogFooter"](null, a);
        else {
            b = E;
            var c = '<div class="' + G("dialog-footer") + '">';
            if (F["oauth2.gsi.soy.common.languageSelector"]) var d = F["oauth2.gsi.soy.common.languageSelector"](null, a);
            else {
                var e = a.oc;
                d = a.languages;
                var f = '<div id="language_selector" class="' + G("language-selector") + '"><div class="' + G("language-selected") + '">';
                if ((e instanceof Ic ? e.content : e) && (d instanceof Ic ? d.content : d)) {
                    for (var g = "", h = d.length, k = 0; k < h; k++) {
                        var l = d[k],
                            r = l.code;
                        g += (r && e && r.Bf && e.Bf ? r.xa !== e.xa ? 0 : r.toString() === e.toString() : r instanceof Ic && e instanceof Ic ? r.xa != e.xa ? 0 : r.toString() == e.toString() : r == e) ? "" + l.displayName : ""
                    }
                    f += "<div>" + Pc(g) + "</div>"
                }
                f += '<div class="' + G("chevron") + '"></div></div><div id="language_list" class="' + G("language-list") + '">';
                if (d) for (e = d.length, g = 0; g < e; g++) h = d[g],
                f += '<div class="' + G("language-option") + '" data-languagecode="' + G(h.code) + '">' + Pc(h.displayName) + "</div>";
                d = E(f + "</div></div>")
            }
            c += d;
            F["oauth2.gsi.soy.common.footerMenu"] ? a = F["oauth2.gsi.soy.common.footerMenu"](null, a) : (a = '<ul class="' + G("footer-menu") + '"><li class="' + G("menu-item") + '"><a class="' + G("menu-content") + '" href="#">', a = a + 'Help</a></li><li class="' + (G("menu-item") + '"><a class="' + G("menu-content") + '" href="#">'), a = a + 'Privacy</a></li><li class="' + (G("menu-item") + '"><a class="' + G("menu-content") + '" href="#">'), a = E(a + "Terms</a></li></ul>"));
            b = b(c + a + "</div>")
        }
        return b
    };
var bd = function (a, b) {
    var c = a.origin;
    Vc();
    if (F["oauth2.gsi.soy.itp.newgrant.dialog"]) b = F["oauth2.gsi.soy.itp.newgrant.dialog"]({
        origin: c
    }, b);
    else {
        Tc("string" === typeof c, c);
        a = E;
        var d = '<div class="' + G("dialog-container dialog-modal") + '"><div class="' + G("dialog inflated-dialog") + '"><div class="' + G("dialog-body") + '">' + $c(b) + '<div class="' + G("dialog-content") + '">';
        if (F["oauth2.gsi.soy.itp.newgrant.title"]) var e = F["oauth2.gsi.soy.itp.newgrant.title"](null, b);
        else e = '<h1 class="' + G("title") + '">',
        e = E(e + "You'll need to give Safari permission to continue</h1>");
        d += e;
        Vc();
        F["oauth2.gsi.soy.itp.newgrant.consentForm"] ? c = F["oauth2.gsi.soy.itp.newgrant.consentForm"]({
            origin: c
        }, b) : (Tc("string" === typeof c, c), e = '<div class="' + G("consent-form") + '"><p class="' + G("consent-text") + '">', c = "In order to continue with your Google Account, Safari will ask if it's ok for Google to use cookies on " + Pc(c) + ".", c = E(e + c + "</p></div>"));
        c = d + c;
        F["oauth2.gsi.soy.itp.newgrant.buttonGroup"] ? d = F["oauth2.gsi.soy.itp.newgrant.buttonGroup"](null, b) : (d = '<div class="' + G("button-group") + '"><div class="' + G("button button-cancel") + '" id="confirm_no">', d = d + 'Cancel</div><div class="' + (G("button button-confirm") + '" id="confirm_yes">'), d = E(d + "Continue</div></div>"));
        b = a(c + d + "</div></div>" + ad(b) + "</div></div>")
    }
    return b
};
var cd = function (a, b) {
    var c = a.origin;
    Vc();
    if (F["oauth2.gsi.soy.itp.regrant.dialog"]) b = F["oauth2.gsi.soy.itp.regrant.dialog"]({
        origin: c
    }, b);
    else {
        Tc("string" === typeof c, c);
        a = E;
        var d = '<div class="' + G("dialog-container dialog-modal") + '"><div class="' + G("dialog") + '"><div class="' + G("dialog-body") + '">' + $c(b) + '<div class="' + G("dialog-content") + '">';
        Vc();
        if (F["oauth2.gsi.soy.itp.regrant.title"]) var e = F["oauth2.gsi.soy.itp.regrant.title"]({
            origin: c
        }, b);
        else Tc("string" === typeof c, c),
        e = '<h1 class="' + G("title") + '">',
        c = "Do you still want Safari to let Google use cookies on " + Pc(c) + "?",
        e = E(e + c + "</h1>");
        d += e;
        F["oauth2.gsi.soy.itp.regrant.buttonGroup"] ? e = F["oauth2.gsi.soy.itp.regrant.buttonGroup"](null, b) : (e = '<div class="' + G("button-group button-group-high") + '"><div class="' + G("button button-cancel") + '" id="confirm_no">', e = e + 'No thanks</div><div class="' + (G("button button-confirm") + '" id="confirm_yes">'), e = E(e + "Yes</div></div>"));
        b = a(d + e + "</div></div>" + ad(b) + "</div></div>")
    }
    return b
};
var dd = function () {
    if (!x.addEventListener || !Object.defineProperty) return !1;
    var a = !1,
        b = Object.defineProperty({}, "passive", {
            get: function () {
                a = !0
            }
        });
    try {
        x.addEventListener("test", qa, b),
        x.removeEventListener("test", qa, b)
    } catch (c) {}
    return a
}();

function ed(a) {
    a && "function" == typeof a.U && a.U()
};
var fd = function () {
    this.Ba = this.Ba;
    this.qa = this.qa
};
fd.prototype.Ba = !1;
fd.prototype.U = function () {
    this.Ba || (this.Ba = !0, this.ca())
};
var gd = function (a, b) {
    a.Ba ? b() : (a.qa || (a.qa = []), a.qa.push(b))
};
fd.prototype.ca = function () {
    if (this.qa) for (; this.qa.length;) this.qa.shift()()
};
var hd = function (a, b) {
    this.type = a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.bb = !1
};
hd.prototype.stopPropagation = function () {
    this.bb = !0
};
hd.prototype.preventDefault = function () {
    this.defaultPrevented = !0
};
var id;
id = Ob ? "webkitTransitionEnd" : Kb ? "otransitionend" : "transitionend";
var jd = function (a, b) {
    hd.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.key = "";
    this.charCode = this.keyCode = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.Sa = null;
    a && this.W(a, b)
};
A(jd, hd);
var kd = Lc({
    2: "touch",
    3: "pen",
    4: "mouse"
});
jd.prototype.W = function (a, b) {
    var c = this.type = a.type,
        d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    if (b = a.relatedTarget) {
        if (Nb) {
            a: {
                try {
                    Hb(b.nodeName);
                    var e = !0;
                    break a
                } catch (f) {}
                e = !1
            }
            e || (b = null)
        }
    } else "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
    this.relatedTarget = b;
    d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY =
    d.screenY || 0) : (this.offsetX = Ob || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY = Ob || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.key = a.key || "";
    this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId =
    a.pointerId || 0;
    this.pointerType = "string" === typeof a.pointerType ? a.pointerType : kd[a.pointerType] || "";
    this.state = a.state;
    this.Sa = a;
    a.defaultPrevented && jd.ja.preventDefault.call(this)
};
jd.prototype.stopPropagation = function () {
    jd.ja.stopPropagation.call(this);
    this.Sa.stopPropagation ? this.Sa.stopPropagation() : this.Sa.cancelBubble = !0
};
jd.prototype.preventDefault = function () {
    jd.ja.preventDefault.call(this);
    var a = this.Sa;
    a.preventDefault ? a.preventDefault() : a.returnValue = !1
};
var ld = "closure_listenable_" + (1E6 * Math.random() | 0);
var md = 0;
var nd = function (a, b, c, d, e) {
    this.listener = a;
    this.Qb = null;
    this.src = b;
    this.type = c;
    this.capture = !! d;
    this.l = e;
    this.key = ++md;
    this.gb = this.ub = !1
},
    od = function (a) {
        a.gb = !0;
        a.listener = null;
        a.Qb = null;
        a.src = null;
        a.l = null
    };
var pd = function (a) {
    this.src = a;
    this.F = {};
    this.nb = 0
};
pd.prototype.add = function (a, b, c, d, e) {
    var f = a.toString();
    a = this.F[f];
    a || (a = this.F[f] = [], this.nb++);
    var g = qd(a, b, d, e); - 1 < g ? (b = a[g], c || (b.ub = !1)) : (b = new nd(b, this.src, f, !! d, e), b.ub = c, a.push(b));
    return b
};
pd.prototype.remove = function (a, b, c, d) {
    a = a.toString();
    if (!(a in this.F)) return !1;
    var e = this.F[a];
    b = qd(e, b, c, d);
    return -1 < b ? (od(e[b]), B(null != e.length), Array.prototype.splice.call(e, b, 1), 0 == e.length && (delete this.F[a], this.nb--), !0) : !1
};
var rd = function (a, b) {
    var c = b.type;
    c in a.F && La(a.F[c], b) && (od(b), 0 == a.F[c].length && (delete a.F[c], a.nb--))
};
pd.prototype.vc = function (a, b, c, d) {
    a = this.F[a.toString()];
    var e = -1;
    a && (e = qd(a, b, c, d));
    return -1 < e ? a[e] : null
};
pd.prototype.hasListener = function (a, b) {
    var c = void 0 !== a,
        d = c ? a.toString() : "",
        e = void 0 !== b;
    return Oa(this.F, function (f) {
        for (var g = 0; g < f.length; ++g) if (!(c && f[g].type != d || e && f[g].capture != b)) return !0;
        return !1
    })
};
var qd = function (a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.gb && f.listener == b && f.capture == !! c && f.l == d) return e
    }
    return -1
};
var sd = "closure_lm_" + (1E6 * Math.random() | 0),
    td = {},
    ud = 0,
    wd = function (a, b, c, d, e) {
        if (d && d.once) return vd(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) wd(a, b[f], c, d, e);
            return null
        }
        c = xd(c);
        return a && a[ld] ? a.S(b, c, ua(d) ? !! d.capture : !! d, e) : yd(a, b, c, !1, d, e)
    },
    yd = function (a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        var g = ua(e) ? !! e.capture : !! e,
            h = zd(a);
        h || (a[sd] = h = new pd(a));
        c = h.add(b, c, d, g, f);
        if (c.Qb) return c;
        d = Ad();
        c.Qb = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener) dd || (e = g),
        void 0 === e && (e = !1),
        a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent) a.attachEvent(Bd(b.toString()), d);
        else if (a.addListener && a.removeListener) B("change" === b, "MediaQueryList only has a change event"),
        a.addListener(d);
        else throw Error("addEventListener and attachEvent are unavailable.");
        ud++;
        return c
    },
    Ad = function () {
        var a = Cd,
            b = function (c) {
                return a.call(b.src, b.listener, c)
            };
        return b
    },
    vd = function (a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) vd(a, b[f], c, d, e);
            return null
        }
        c = xd(c);
        return a && a[ld] ? a.P.add(String(b), c, !0, ua(d) ? !! d.capture : !! d, e) : yd(a, b, c, !0, d, e)
    },
    Dd = function (a, b, c, d, e) {
        if (Array.isArray(b)) for (var f = 0; f < b.length; f++) Dd(a, b[f], c, d, e);
        else d = ua(d) ? !! d.capture : !! d,
        c = xd(c),
        a && a[ld] ? a.ob(b, c, d, e) : a && (a = zd(a)) && (b = a.vc(b, c, d, e)) && Ed(b)
    },
    Ed = function (a) {
        if ("number" !== typeof a && a && !a.gb) {
            var b = a.src;
            if (b && b[ld]) rd(b.P, a);
            else {
                var c = a.type,
                    d = a.Qb;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Bd(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                ud--;
                (c = zd(b)) ? (rd(c, a), 0 == c.nb && (c.src = null, b[sd] = null)) : od(a)
            }
        }
    },
    Bd = function (a) {
        return a in td ? td[a] : td[a] = "on" + a
    },
    Cd = function (a, b) {
        if (a.gb) a = !0;
        else {
            b = new jd(b, this);
            var c = a.listener,
                d = a.l || a.src;
            a.ub && Ed(a);
            a = c.call(d, b)
        }
        return a
    },
    zd = function (a) {
        a = a[sd];
        return a instanceof pd ? a : null
    },
    Fd = "__closure_events_fn_" + (1E9 * Math.random() >>> 0),
    xd = function (a) {
        B(a, "Listener can not be null.");
        if ("function" === typeof a) return a;
        B(a.handleEvent, "An object listener must have handleEvent method.");
        a[Fd] || (a[Fd] =

        function (b) {
            return a.handleEvent(b)
        });
        return a[Fd]
    };
var Gd = function () {
    this.Kb = new Set;
    this.wd = !1
};
Gd.prototype.S = function (a, b, c) {
    a = wd(a, b, c);
    this.Kb.add(a);
    return a
};
Gd.prototype.ob = function (a) {
    Ed(a);
    this.Kb.delete(a)
};
Gd.prototype.U = function () {
    this.wd || (this.Kb.forEach(function (a) {
        Ed(a)
    }), this.Kb.clear(), this.wd = !0)
};
var Hd = function () {
    Gd.call(this);
    this.xb = null;
    this.lc = !1
};
v(Hd, Gd);
var Id = function (a, b) {
    if (a.xb) throw Error("Component already rendered.");
    a.lc = !1;
    a.xb = b
};
Hd.prototype.U = function () {
    if (!this.lc) {
        Gd.prototype.U.call(this);
        for (var a = this.xb, b; b = a.firstChild;) a.removeChild(b);
        this.xb = null;
        this.lc = !0
    }
};
var Jd = {};
var Kd = function () {},
    Ld = function (a, b) {
        if (b !== Jd) throw Error("Bad secret");
        this.ge = a
    };
v(Ld, Kd);
Ld.prototype.toString = function () {
    return this.ge
};
var Md = new Ld("about:invalid#zTSz", Jd);

function Nd(a) {
    if (a instanceof Kd) if (a instanceof Ld) a = a.ge;
    else throw Error("wrong type");
    else a = ib(a);
    return a
};
var Od = function (a, b) {
    a.href = Nd(b)
};
var Pd = function (a) {
    this.Df = a
};

function Qd(a) {
    return new Pd(function (b) {
        return b.substr(0, a.length + 1).toLowerCase() === a + ":"
    })
}
var Rd = [Qd("data"), Qd("http"), Qd("https"), Qd("mailto"), Qd("ftp"), new Pd(function (a) {
    return /^[^:]*([/?#]|$)/.test(a)
})];

function Sd(a) {
    var b = void 0 === b ? Rd : b;
    a: {
        b = void 0 === b ? Rd : b;
        for (var c = 0; c < b.length; ++c) {
            var d = b[c];
            if (d instanceof Pd && d.Df(a)) {
                a = new Ld(a, Jd);
                break a
            }
        }
        a = void 0
    }
    return a || Md
};
var Td = function () {
    Gd.call(this);
    this.ia = this.Sb = this.Rb = null;
    this.ie = this.Vd = !1
};
v(Td, Gd);
Td.prototype.register = function (a, b) {
    var c = this;
    if (this.ie) throw Error("LanguageSelectorModel is already registered.");
    this.ie = !0;
    this.Sb = a;
    this.ia = b;
    this.Ud = this.S(this.Sb, "click", function () {
        return Ud(c)
    })
};
var Ud = function (a) {
    a.ia.style.visibility = "visible";
    a.ia.style.opacity = 1;
    a.ob(a.Ud);
    a.Gf = a.S(document, "mouseup", function (b) {
        return Vd(a, b)
    })
},
    Vd = function (a, b) {
        a.Rb = b.target.getAttribute("data-languagecode");
        if (null != a.Rb || b.target != a.ia) a.ob(a.Gf),
        a.Ff = a.S(a.ia, id, function () {
            return Wd(a)
        }),
        a.ia.style.opacity = 0
    },
    Wd = function (a) {
        a.ob(a.Ff);
        a.ia.style.visibility = "hidden";
        a.Ud = a.S(a.Sb, "click", function () {
            return Ud(a)
        });
        if (null != a.Rb) {
            var b = Gc(a.Rb);
            Od(document.location, Sd(b))
        }
    };
Td.prototype.U = function () {
    this.Vd || (Gd.prototype.U.call(this), this.ia = this.Sb = null, this.Vd = !0)
};
var Xd = function (a) {
    var b = a.origin,
        c = a.oc;
    a = a.languages;
    Hd.call(this);
    this.j = b;
    this.td = c;
    this.Wd = a;
    this.Rd = !1
};
v(Xd, Hd);
Xd.prototype.Wf = function (a, b, c) {
    Id(this, a);
    Zc(a, bd, {
        origin: this.j
    }, {
        oc: this.td,
        languages: this.Wd
    });
    a = Xc("confirm_yes");
    this.S(a, "click", function () {
        (void 0 == document.hasStorageAccess ? Promise.resolve() : document.requestStorageAccess()).then(function () {
            return b()
        }, function () {
            return c()
        })
    });
    a = Xc("confirm_no");
    this.S(a, "click", function () {
        return c()
    });
    Yd(this)
};
Xd.prototype.Xf = function (a, b, c) {
    Id(this, a);
    Zc(a, cd, {
        origin: this.j
    }, {
        oc: this.td,
        languages: this.Wd
    });
    a = Xc("confirm_yes");
    this.S(a, "click", function () {
        return b()
    });
    a = Xc("confirm_no");
    this.S(a, "click", function () {
        return c()
    });
    Yd(this)
};
var Yd = function (a) {
    void 0 == a.Ib && (a.Ib = new Td);
    var b = Xc("language_selector"),
        c = Xc("language_list");
    a.Ib.register(b, c)
};
Xd.prototype.U = function () {
    this.Rd || (Hd.prototype.U.call(this), void 0 != this.Ib && this.Ib.U(), this.Rd = !0)
};
var Zd, $d, ae = void 0,
    be = function (a) {
        try {
            return x.JSON.parse.call(x.JSON, a)
        } catch (b) {
            return !1
        }
    },
    ce = function (a) {
        return Object.prototype.toString.call(a)
    },
    de = ce(0),
    ee = ce(new Date(0)),
    fe = ce(!0),
    ge = ce(""),
    he = ce({}),
    ie = ce([]),
    je = function (a, b) {
        if (b) for (var c = 0, d = b.length; c < d; ++c) if (a === b[c]) throw new TypeError("Converting circular structure to JSON");
        d = typeof a;
        if ("undefined" !== d) {
            c = Array.prototype.slice.call(b || [], 0);
            c[c.length] = a;
            b = [];
            var e = ce(a);
            if (null != a && "function" === typeof a.toJSON && (Object.prototype.hasOwnProperty.call(a, "toJSON") || (e !== ie || a.constructor !== Array && a.constructor !== Object) && (e !== he || a.constructor !== Array && a.constructor !== Object) && e !== ge && e !== de && e !== fe && e !== ee)) return je(a.toJSON.call(a), c);
            if (null == a) b[b.length] = "null";
            else if (e === de) a = Number(a),
            isNaN(a) || isNaN(a - a) ? a = "null" : -0 === a && 0 > 1 / a && (a = "-0"),
            b[b.length] = String(a);
            else if (e === fe) b[b.length] = String( !! Number(a));
            else {
                if (e === ee) return je(a.toISOString.call(a), c);
                if (e === ie && ce(a.length) === de) {
                    b[b.length] = "[";
                    var f = 0;
                    for (d = Number(a.length) >> 0; f < d; ++f) f && (b[b.length] = ","),
                    b[b.length] = je(a[f], c) || "null";
                    b[b.length] = "]"
                } else if (e == ge && ce(a.length) === de) {
                    b[b.length] = '"';
                    f = 0;
                    for (c = Number(a.length) >> 0; f < c; ++f) d = String.prototype.charAt.call(a, f),
                    e = String.prototype.charCodeAt.call(a, f),
                    b[b.length] = "\b" === d ? "\\b" : "\f" === d ? "\\f" : "\n" === d ? "\\n" : "\r" === d ? "\\r" : "\t" === d ? "\\t" : "\\" === d || '"' === d ? "\\" + d : 31 >= e ? "\\u" + (e + 65536).toString(16).substr(1) : 32 <= e && 65535 >= e ? d : "\ufffd";
                    b[b.length] = '"'
                } else if ("object" === d) {
                    b[b.length] = "{";
                    d = 0;
                    for (f in a) Object.prototype.hasOwnProperty.call(a, f) && (e = je(a[f], c), void 0 !== e && (d++ && (b[b.length] = ","), b[b.length] = je(f), b[b.length] = ":", b[b.length] = e));
                    b[b.length] = "}"
                } else return
            }
            return b.join("")
        }
    },
    ke = /[\0-\x07\x0b\x0e-\x1f]/,
    le = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*[\0-\x1f]/,
    me = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\[^\\\/"bfnrtu]/,
    ne = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\u([0-9a-fA-F]{0,3}[^0-9a-fA-F])/,
    oe = /"([^\0-\x1f\\"]|\\[\\\/"bfnrt]|\\u[0-9a-fA-F]{4})*"/g,
    pe = /-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][-+]?[0-9]+)?/g,
    qe = /[ \t\n\r]+/g,
    re = /[^"]:/,
    se = /""/g,
    te = /true|false|null/g,
    ue = /00/,
    ve = /[\{]([^0\}]|0[^:])/,
    we = /(^|\[)[,:]|[,:](\]|\}|[,:]|$)/,
    xe = /[^\[,:][\[\{]/,
    ye = /^(\{|\}|\[|\]|,|:|0)+/,
    ze = /\u2028/g,
    Ae = /\u2029/g,
    Be = function (a) {
        a = String(a);
        if (ke.test(a) || le.test(a) || me.test(a) || ne.test(a)) return !1;
        var b = a.replace(oe, '""');
        b = b.replace(pe, "0");
        b = b.replace(qe, "");
        if (re.test(b)) return !1;
        b = b.replace(se, "0");
        b = b.replace(te, "0");
        if (ue.test(b) || ve.test(b) || we.test(b) || xe.test(b) || !b || (b = b.replace(ye, ""))) return !1;
        a = a.replace(ze, "\\u2028").replace(Ae, "\\u2029");
        b = void 0;
        try {
            b = ae ? [be(a)] : eval("(function (var_args) {\n  return Array.prototype.slice.call(arguments, 0);\n})(\n" + a + "\n)")
        } catch (c) {
            return !1
        }
        return b && 1 === b.length ? b[0] : !1
    },
    Ce = function () {
        var a = ((x.document || {}).scripts || []).length;
        if ((void 0 === Zd || void 0 === ae || $d !== a) && -1 !== $d) {
            Zd = ae = !1;
            $d = -1;
            try {
                try {
                    ae = !! x.JSON && '{"a":[3,true,"1970-01-01T00:00:00.000Z"]}' === x.JSON.stringify.call(x.JSON, {
                        a: [3, !0, new Date(0)],
                        c: function () {}
                    }) && !0 === be("true") && 3 === be('[{"a":3}]')[0].a
                } catch (b) {}
                Zd = ae && !be("[00]") && !be('"\u0007"') && !be('"\\0"') && !be('"\\v"')
            } finally {
                $d = a
            }
        }
    },
    De = !Date.prototype.toISOString || "function" !== typeof Date.prototype.toISOString || "1970-01-01T00:00:00.000Z" !== (new Date(0)).toISOString(),
    Ee = function () {
        var a = Date.prototype.getUTCFullYear.call(this);
        return [0 > a ? "-" + String(1E6 - a).substr(1) : 9999 >= a ? String(1E4 + a).substr(1) : "+" + String(1E6 + a).substr(1), "-", String(101 + Date.prototype.getUTCMonth.call(this)).substr(1), "-", String(100 + Date.prototype.getUTCDate.call(this)).substr(1), "T", String(100 + Date.prototype.getUTCHours.call(this)).substr(1), ":", String(100 + Date.prototype.getUTCMinutes.call(this)).substr(1), ":", String(100 + Date.prototype.getUTCSeconds.call(this)).substr(1), ".", String(1E3 + Date.prototype.getUTCMilliseconds.call(this)).substr(1), "Z"].join("")
    };
Date.prototype.toISOString = De ? Ee : Date.prototype.toISOString;
var Fe, Ge = !1,
    H = function (a) {
        try {
            Ge && window.console && window.console.log && window.console.log(a)
        } catch (b) {}
    },
    He = function (a, b) {
        if (!a) return -1;
        if (a.indexOf) return a.indexOf(b, void 0);
        for (var c = 0, d = a.length; c < d; c++) if (a[c] === b) return c;
        return -1
    },
    I = function (a, b) {
        function c() {}
        if (!a) throw "Child class cannot be empty.";
        if (!b) throw "Parent class cannot be empty.";
        c.prototype = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a
    },
    Ie = function (a) {
        return "[object Function]" === Object.prototype.toString.call(a)
    },
    Je = function (a) {
        var b = [],
            c;
        for (c in a) if (a.hasOwnProperty(c)) {
            var d = a[c];
            if (null === d || void 0 === d) d = "";
            b.push(encodeURIComponent(c) + "=" + encodeURIComponent(d))
        }
        return b.join("&")
    },
    Ke = function (a) {
        var b = window.location.hash;
        a = new RegExp("[&#]" + a + "=([^&]*)");
        b = decodeURIComponent(b);
        b = a.exec(b);
        return null == b ? "" : b[1].replace(/\+/g, " ")
    },
    Le = function (a, b, c) {
        if (a.addEventListener) a.addEventListener(b, c, !1);
        else if (a.attachEvent) a.attachEvent("on" + b, c);
        else throw "Add event handler for " + b + " failed.";
    },
    Me = function (a, b) {
        a = (a || "").split(" ");
        b = (b || "").split(" ");
        for (var c = 0; c < b.length; c++) if (b[c] && 0 > He(a, b[c])) return !1;
        return !0
    },
    Ne = function () {
        if ("undefined" != typeof Fe) return Fe;
        a: {
            try {
                if (window.localStorage) {
                    var a = window.localStorage;
                    break a
                }
            } catch (b) {}
            a = void 0
        }
        if (!a) return Fe = !1;
        try {
            a.setItem("test", "test"),
            a.removeItem("test"),
            Fe = !0
        } catch (b) {
            Fe = !1
        }
        return Fe
    },
    Oe = function () {
        var a = navigator.userAgent.toLowerCase();
        return -1 != a.indexOf("msie") && 8 == parseInt(a.split("msie")[1], 10)
    },
    Pe = function () {
        return Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject
    },
    Qe = function () {
        var a = navigator.userAgent.toLowerCase();
        return 0 > a.indexOf("edge/") && (-1 < a.indexOf("chrome/") || -1 < a.indexOf("crios/"))
    },
    Re = function () {
        var a = navigator.userAgent,
            b;
        if (b = !! a && -1 != a.indexOf("CriOS")) b = -1,
        (a = a.match(/CriOS\/(\d+)/)) && a[1] && (b = parseInt(a[1], 10) || -1),
        b = 48 > b;
        return b
    },
    Se = function () {
        var a = navigator.userAgent.toLowerCase();
        return -1 < a.indexOf("safari/") && 0 > a.indexOf("chrome/") && 0 > a.indexOf("crios/") && 0 > a.indexOf("android")
    },
    J = window.JSON,
    Te = function (a) {
        this.Yc = a || [];
        this.T = {}
    };
Te.prototype.addEventListener = function (a, b) {
    if (!(0 <= He(this.Yc, a))) throw "Unrecognized event type: " + a;
    if (!Ie(b)) throw "The listener for event '" + a + "' is not a function.";
    this.T[a] || (this.T[a] = []);
    0 > He(this.T[a], b) && this.T[a].push(b)
};
Te.prototype.removeEventListener = function (a, b) {
    if (!(0 <= He(this.Yc, a))) throw "Unrecognized event type: " + a;
    Ie(b) && this.T[a] && this.T[a].length && (b = He(this.T[a], b), 0 <= b && this.T[a].splice(b, 1))
};
Te.prototype.dispatchEvent = function (a) {
    var b = a.type;
    if (!(b && 0 <= He(this.Yc, b))) throw "Failed to dispatch unrecognized event type: " + b;
    if (this.T[b] && this.T[b].length) for (var c = 0, d = this.T[b].length; c < d; c++) this.T[b][c](a)
};
J = {
    parse: function (a) {
        a = "[" + String(a) + "]"; - 1 === $d ? a = !1 : (Ce(), a = (Zd ? be : Be)(a));
        if (!1 === a || 1 !== a.length) throw new SyntaxError("JSON parsing failed.");
        return a[0]
    },
    stringify: function (a) {
        -1 !== $d ? (Ce(), a = ae ? x.JSON.stringify.call(x.JSON, a) : je(a)) : a = void 0;
        return a
    }
};
var Ue = function (a) {
    this.md = a
};
var Ve = function (a, b, c) {
    this.Za = a;
    this.Pe = b;
    this.Cb = c || [];
    this.va = new Map
};
m = Ve.prototype;
m.hg = function (a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
    this.va.set(this.Ed(c), [new Ue(a)])
};
m.Bd = function (a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
    b = this.Ed(b);
    return this.va.has(b) ? this.va.get(b) : void 0
};
m.nf = function (a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
    return (b = this.Bd(b)) && b.length ? b[0] : void 0
};
m.clear = function () {
    this.va.clear()
};
m.Ed = function (a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
    return b ? b.join(",") : "key"
};
var We = function (a, b) {
    Ve.call(this, a, 3, b)
};
v(We, Ve);
We.prototype.Jd = function (a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
    this.Gb(1, b)
};
We.prototype.Gb = function (a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
    d = 0;
    var e = this.nf(c);
    e && (d = e.md);
    this.hg(d + a, c)
};
var K = function () {
    fd.call(this);
    this.P = new pd(this);
    this.Ee = this;
    this.Jc = null
};
A(K, fd);
K.prototype[ld] = !0;
m = K.prototype;
m.addEventListener = function (a, b, c, d) {
    wd(this, a, b, c, d)
};
m.removeEventListener = function (a, b, c, d) {
    Dd(this, a, b, c, d)
};
m.dispatchEvent = function (a) {
    Xe(this);
    var b = this.Jc;
    if (b) {
        var c = [];
        for (var d = 1; b; b = b.Jc) c.push(b),
        B(1E3 > ++d, "infinite loop")
    }
    b = this.Ee;
    d = a.type || a;
    if ("string" === typeof a) a = new hd(a, b);
    else if (a instanceof hd) a.target = a.target || b;
    else {
        var e = a;
        a = new hd(d, b);
        Ra(a, e)
    }
    e = !0;
    if (c) for (var f = c.length - 1; !a.bb && 0 <= f; f--) {
        var g = a.currentTarget = c[f];
        e = Ye(g, d, !0, a) && e
    }
    a.bb || (g = a.currentTarget = b, e = Ye(g, d, !0, a) && e, a.bb || (e = Ye(g, d, !1, a) && e));
    if (c) for (f = 0; !a.bb && f < c.length; f++) g = a.currentTarget = c[f],
    e = Ye(g, d, !1, a) && e;
    return e
};
m.ca = function () {
    K.ja.ca.call(this);
    if (this.P) {
        var a = this.P,
            b = 0,
            c;
        for (c in a.F) {
            for (var d = a.F[c], e = 0; e < d.length; e++)++b,
            od(d[e]);
            delete a.F[c];
            a.nb--
        }
    }
    this.Jc = null
};
m.S = function (a, b, c, d) {
    Xe(this);
    return this.P.add(String(a), b, !1, c, d)
};
m.ob = function (a, b, c, d) {
    this.P.remove(String(a), b, c, d)
};
var Ye = function (a, b, c, d) {
    b = a.P.F[String(b)];
    if (!b) return !0;
    b = b.concat();
    for (var e = !0, f = 0; f < b.length; ++f) {
        var g = b[f];
        if (g && !g.gb && g.capture == c) {
            var h = g.listener,
                k = g.l || g.src;
            g.ub && rd(a.P, g);
            e = !1 !== h.call(k, d) && e
        }
    }
    return e && !d.defaultPrevented
};
K.prototype.vc = function (a, b, c, d) {
    return this.P.vc(String(a), b, c, d)
};
K.prototype.hasListener = function (a, b) {
    return this.P.hasListener(void 0 !== a ? String(a) : void 0, b)
};
var Xe = function (a) {
    B(a.P, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
};
var Ze = function (a, b) {
    K.call(this);
    this.Hb = a || 1;
    this.mb = b || x;
    this.hd = z(this.tg, this);
    this.Zd = Date.now()
};
A(Ze, K);
m = Ze.prototype;
m.enabled = !1;
m.G = null;
m.setInterval = function (a) {
    this.Hb = a;
    this.G && this.enabled ? (this.stop(), this.start()) : this.G && this.stop()
};
m.tg = function () {
    if (this.enabled) {
        var a = Date.now() - this.Zd;
        0 < a && a < .8 * this.Hb ? this.G = this.mb.setTimeout(this.hd, this.Hb - a) : (this.G && (this.mb.clearTimeout(this.G), this.G = null), this.dispatchEvent("tick"), this.enabled && (this.stop(), this.start()))
    }
};
m.start = function () {
    this.enabled = !0;
    this.G || (this.G = this.mb.setTimeout(this.hd, this.Hb), this.Zd = Date.now())
};
m.stop = function () {
    this.enabled = !1;
    this.G && (this.mb.clearTimeout(this.G), this.G = null)
};
m.ca = function () {
    Ze.ja.ca.call(this);
    this.stop();
    delete this.mb
};
var $e = function (a, b, c) {
    if ("function" === typeof a) c && (a = z(a, c));
    else if (a && "function" == typeof a.handleEvent) a = z(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return 2147483647 < Number(b) ? -1 : x.setTimeout(a, b || 0)
};
var af = function (a) {
    this.rg = a;
    this.Nb = new Map;
    this.$e = new Set;
    this.Ec = 0;
    this.Af = 100;
    this.mf = 3E4;
    this.Ua = new Ze(this.mf);
    this.Ua.S("tick", this.Qc, !1, this);
    this.dg = !1
};
m = af.prototype;
m.Qc = function () {
    var a = this.Nb.values();
    a = [].concat(a instanceof Array ? a : fa(t(a))).filter(function (b) {
        return b.va.size
    });
    a.length && this.rg.flush(a, this.dg);
    bf(a);
    this.Ec = 0;
    this.Ua.enabled && this.Ua.stop()
};
m.Fe = function (a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
    this.Nb.has(a) || this.Nb.set(a, new We(a, c))
};
m.wc = function (a) {
    return this.$e.has(a) ? void 0 : this.Nb.get(a)
};
m.Jd = function (a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
    this.Gb.apply(this, [a, 1].concat(c instanceof Array ? c : fa(t(c))))
};
m.Gb = function (a, b, c) {
    for (var d = [], e = 2; e < arguments.length; ++e) d[e - 2] = arguments[e];
    (e = this.wc(a)) && e instanceof We && (e.Gb(b, d), this.Mb(), this.Ec++, this.Ec >= this.Af && this.Qc())
};
m.Mb = function () {
    this.Ua.enabled || this.Ua.start()
};
var bf = function (a) {
    for (var b = 0; b < a.length; b++) a[b].clear()
};
var cf = function (a) {
    this.Za = "/client_streamz/google_sign_in_web_client/idpiframe/cookie_blocked_count";
    this.Tc = a;
    this.Tc.Fe(this.Za, {
        yd: 3,
        xd: "browser"
    }, {
        yd: 3,
        xd: "browser_version"
    })
};
cf.prototype.Bc = function (a, b) {
    this.Tc.Jd(this.Za, a, b)
};
cf.prototype.wc = function () {
    return this.Tc.wc(this.Za)
};
var df = "function" === typeof Uint8Array;

function ef(a) {
    if (Array.isArray(a)) {
        for (var b = Array(a.length), c = 0; c < a.length; c++) {
            var d = a[c];
            null != d && (b[c] = "object" == typeof d ? ef(B(d)) : d)
        }
        return b
    }
    if (df && a instanceof Uint8Array) return new Uint8Array(a);
    b = {};
    for (c in a) d = a[c],
    null != d && (b[c] = "object" == typeof d ? ef(B(d)) : d);
    return b
};
var L = function () {
    Ga(this, L, "The message constructor should only be used by subclasses");
    B(this.constructor !== L, "Message is an abstract class and cannot be directly constructed")
},
    ff, M = function (a, b, c, d, e) {
        a.i = null;
        ff && (b || (b = ff), ff = null);
        var f = a.constructor.Fg,
            g = a.constructor.Dg;
        g = f || g;
        b || (b = g ? [f] : []);
        a.ta = g ? 0 : -1;
        a.O = b;
        a: {
            f = a.O.length;
            b = -1;
            if (f && (b = f - 1, f = a.O[b], !(null === f || "object" != typeof f || Array.isArray(f) || df && f instanceof Uint8Array))) {
                a.Ga = b - a.ta;
                a.H = f;
                break a
            } - 1 < c ? (a.Ga = Math.max(c, b + 1 - a.ta), a.H = null) : a.Ga = Number.MAX_VALUE
        }
        a.Cg = {};
        if (d) for (c = 0; c < d.length; c++) b = d[c],
        b < a.Ga ? (b += a.ta, a.O[b] = a.O[b] || gf) : (hf(a), a.H[b] = a.H[b] || gf);
        if (e && e.length) for (d = 0; d < e.length; d++) jf(a, e[d])
    },
    gf = Object.freeze([]),
    hf = function (a) {
        var b = a.Ga + a.ta;
        a.O[b] || (a.H = a.O[b] = {})
    },
    kf = function (a, b) {
        if (b < a.Ga) {
            b += a.ta;
            var c = a.O[b];
            return c !== gf ? c : a.O[b] = []
        }
        if (a.H) return c = a.H[b],
        c === gf ? a.H[b] = [] : c
    },
    lf = function (a, b) {
        a = kf(a, 1);
        return null == a ? b : a
    },
    N = function (a, b, c) {
        b < a.Ga ? a.O[b + a.ta] = c : (hf(a), a.H[b] = c);
        return a
    },
    mf = function (a, b, c, d) {
        (c = jf(a, c)) && c !== b && void 0 !== d && (a.i && c in a.i && (a.i[c] = void 0), N(a, c, void 0));
        N(a, b, d)
    },
    jf = function (a, b) {
        for (var c, d, e = 0; e < b.length; e++) {
            var f = b[e],
                g = kf(a, f);
            null != g && (c = f, d = g, N(a, f, void 0))
        }
        return c ? (N(a, c, d), c) : 0
    },
    nf = function (a, b, c) {
        a.i || (a.i = {});
        if (!a.i[c]) {
            var d = kf(a, c);
            d && (a.i[c] = new b(d))
        }
        return a.i[c]
    },
    pf = function (a, b, c) {
        a.i || (a.i = {});
        var d = c ? of(c) : c;
        a.i[b] = c;
        return N(a, b, d)
    },
    qf = function (a, b, c) {
        a.i || (a.i = {});
        c = c || [];
        for (var d = [], e = 0; e < c.length; e++) d[e] = of(c[e]);
        a.i[b] = c;
        return N(a, b, d)
    },
    of = function (a) {
        if (a.i) for (var b in a.i) {
            var c = a.i[b];
            if (Array.isArray(c)) for (var d = 0; d < c.length; d++) c[d] && of(c[d]);
            else c && of(c)
        }
        return a.O
    };
L.prototype.Ha = df ?
function () {
    var a = Uint8Array.prototype.toJSON;
    Uint8Array.prototype.toJSON = function () {
        return ac(this)
    };
    try {
        return JSON.stringify(this.O && of(this), rf)
    } finally {
        Uint8Array.prototype.toJSON = a
    }
} : function () {
    return JSON.stringify(this.O && of(this), rf)
};
var rf = function (a, b) {
    return "number" !== typeof b || !isNaN(b) && Infinity !== b && -Infinity !== b ? b : String(b)
};
L.prototype.toString = function () {
    return of(this).toString()
};
L.prototype.getExtension = function (a) {
    hf(this);
    this.i || (this.i = {});
    var b = a.lf;
    return a.Cf ? a.yb ? (this.i[b] || (this.i[b] = Ja(this.H[b] || [], function (c) {
        return new a.yb(c)
    })), this.i[b]) : this.H[b] = this.H[b] || [] : a.yb ? (!this.i[b] && this.H[b] && (this.i[b] = new a.yb(this.H[b])), this.i[b]) : this.H[b]
};
L.prototype.clone = function () {
    var a = ef(of(this));
    ff = a;
    a = new this.constructor(a);
    ff = null;
    return a
};
var tf = function (a) {
    L.call(this);
    M(this, a, -1, sf, null)
};
v(tf, L);
var sf = [2];
var uf = function (a) {
    if (!a) return "";
    a = a.split("#")[0].split("?")[0];
    a = a.toLowerCase();
    0 == a.indexOf("//") && (a = window.location.protocol + a);
    /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
    var b = a.substring(a.indexOf("://") + 3),
        c = b.indexOf("/"); - 1 != c && (b = b.substring(0, c));
    c = a.substring(0, a.indexOf("://"));
    if (!c) throw Error("URI is missing protocol: " + a);
    if ("http" !== c && "https" !== c && "chrome-extension" !== c && "moz-extension" !== c && "file" !== c && "android-app" !== c && "chrome-search" !== c && "chrome-untrusted" !== c && "chrome" !== c && "app" !== c && "devtools" !== c) throw Error("Invalid URI scheme in origin: " + c);
    a = "";
    var d = b.indexOf(":");
    if (-1 != d) {
        var e = b.substring(d + 1);
        b = b.substring(0, d);
        if ("http" === c && "80" !== e || "https" === c && "443" !== e) a = ":" + e
    }
    return c + "://" + b + a
};

function vf() {
    function a() {
        e[0] = 1732584193;
        e[1] = 4023233417;
        e[2] = 2562383102;
        e[3] = 271733878;
        e[4] = 3285377520;
        r = l = 0
    }

    function b(q) {
        for (var w = g, p = 0; 64 > p; p += 4) w[p / 4] = q[p] << 24 | q[p + 1] << 16 | q[p + 2] << 8 | q[p + 3];
        for (p = 16; 80 > p; p++) q = w[p - 3] ^ w[p - 8] ^ w[p - 14] ^ w[p - 16],
        w[p] = (q << 1 | q >>> 31) & 4294967295;
        q = e[0];
        var y = e[1],
            u = e[2],
            D = e[3],
            Y = e[4];
        for (p = 0; 80 > p; p++) {
            if (40 > p) if (20 > p) {
                var V = D ^ y & (u ^ D);
                var ta = 1518500249
            } else V = y ^ u ^ D,
            ta = 1859775393;
            else 60 > p ? (V = y & u | D & (y | u), ta = 2400959708) : (V = y ^ u ^ D, ta = 3395469782);
            V = ((q << 5 | q >>> 27) & 4294967295) + V + Y + ta + w[p] & 4294967295;
            Y = D;
            D = u;
            u = (y << 30 | y >>> 2) & 4294967295;
            y = q;
            q = V
        }
        e[0] = e[0] + q & 4294967295;
        e[1] = e[1] + y & 4294967295;
        e[2] = e[2] + u & 4294967295;
        e[3] = e[3] + D & 4294967295;
        e[4] = e[4] + Y & 4294967295
    }

    function c(q, w) {
        if ("string" === typeof q) {
            q = unescape(encodeURIComponent(q));
            for (var p = [], y = 0, u = q.length; y < u; ++y) p.push(q.charCodeAt(y));
            q = p
        }
        w || (w = q.length);
        p = 0;
        if (0 == l) for (; p + 64 < w;) b(q.slice(p, p + 64)),
        p += 64,
        r += 64;
        for (; p < w;) if (f[l++] = q[p++], r++, 64 == l) for (l = 0, b(f); p + 64 < w;) b(q.slice(p, p + 64)),
        p += 64,
        r += 64
    }

    function d() {
        var q = [],
            w = 8 * r;
        56 > l ? c(h, 56 - l) : c(h, 64 - (l - 56));
        for (var p = 63; 56 <= p; p--) f[p] = w & 255,
        w >>>= 8;
        b(f);
        for (p = w = 0; 5 > p; p++) for (var y = 24; 0 <= y; y -= 8) q[w++] = e[p] >> y & 255;
        return q
    }
    for (var e = [], f = [], g = [], h = [128], k = 1; 64 > k; ++k) h[k] = 0;
    var l, r;
    a();
    return {
        reset: a,
        update: c,
        digest: d,
        Ye: function () {
            for (var q = d(), w = "", p = 0; p < q.length; p++) w += "0123456789ABCDEF".charAt(Math.floor(q[p] / 16)) + "0123456789ABCDEF".charAt(q[p] % 16);
            return w
        }
    }
};
var xf = function (a, b, c) {
    var d = String(x.location.href);
    return d && a && b ? [b, wf(uf(d), a, c || null)].join(" ") : null
},
    wf = function (a, b, c) {
        var d = [],
            e = [];
        if (1 == (Array.isArray(c) ? 2 : 1)) return e = [b, a],
        Ia(d, function (h) {
            e.push(h)
        }),
        yf(e.join(" "));
        var f = [],
            g = [];
        Ia(c, function (h) {
            g.push(h.key);
            f.push(h.value)
        });
        c = Math.floor((new Date).getTime() / 1E3);
        e = 0 == f.length ? [c, b, a] : [f.join(":"), c, b, a];
        Ia(d, function (h) {
            e.push(h)
        });
        a = yf(e.join(" "));
        a = [c, a];
        0 == g.length || a.push(g.join(""));
        return a.join("_")
    },
    yf = function (a) {
        var b =
        vf();
        b.update(a);
        return b.Ye().toLowerCase()
    };
var zf = {};
var Af = function () {
    this.Bb = document || {
        cookie: ""
    }
};
m = Af.prototype;
m.isEnabled = function () {
    if (!x.navigator.cookieEnabled) return !1;
    if (!this.Ld()) return !0;
    this.set("TESTCOOKIESENABLED", "1", {
        ae: 60
    });
    if ("1" !== this.get("TESTCOOKIESENABLED")) return !1;
    this.remove("TESTCOOKIESENABLED");
    return !0
};
m.set = function (a, b, c) {
    var d = !1;
    if ("object" === typeof c) {
        var e = c.Gg;
        d = c.Ig || !1;
        var f = c.domain || void 0;
        var g = c.path || void 0;
        var h = c.ae
    }
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
    void 0 === h && (h = -1);
    this.Bb.cookie = a + "=" + b + (f ? ";domain=" + f : "") + (g ? ";path=" + g : "") + (0 > h ? "" : 0 == h ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date(Date.now() + 1E3 * h)).toUTCString()) + (d ? ";secure" : "") + (null != e ? ";samesite=" + e : "")
};
m.get = function (a, b) {
    for (var c = a + "=", d = (this.Bb.cookie || "").split(";"), e = 0, f; e < d.length; e++) {
        f = Xa(d[e]);
        if (0 == f.lastIndexOf(c, 0)) return f.substr(c.length);
        if (f == a) return ""
    }
    return b
};
m.remove = function (a, b, c) {
    var d = this.rd(a);
    this.set(a, "", {
        ae: 0,
        path: b,
        domain: c
    });
    return d
};
m.na = function () {
    return Bf(this).keys
};
m.Da = function () {
    return Bf(this).values
};
m.Ld = function () {
    return !this.Bb.cookie
};
m.rd = function (a) {
    return void 0 !== this.get(a)
};
m.clear = function () {
    for (var a = Bf(this).keys, b = a.length - 1; 0 <= b; b--) this.remove(a[b])
};
var Bf = function (a) {
    a = (a.Bb.cookie || "").split(";");
    for (var b = [], c = [], d, e, f = 0; f < a.length; f++) e = Xa(a[f]),
    d = e.indexOf("="),
    -1 == d ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
    return {
        keys: b,
        values: c
    }
};
var Cf = function (a) {
    return !!zf.FPA_SAMESITE_PHASE2_MOD || !(void 0 === a || !a)
},
    Df = function (a, b, c, d) {
        (a = x[a]) || (a = (new Af).get(b));
        return a ? xf(a, c, d) : null
    },
    Ef = function (a, b) {
        b = void 0 === b ? !1 : b;
        var c = uf(String(x.location.href)),
            d = [];
        var e = b;
        e = void 0 === e ? !1 : e;
        var f = x.__SAPISID || x.__APISID || x.__3PSAPISID || x.__OVERRIDE_SID;
        Cf(e) && (f = f || x.__1PSAPISID);
        if (f) e = !0;
        else {
            var g = new Af;
            f = g.get("SAPISID") || g.get("APISID") || g.get("__Secure-3PAPISID") || g.get("SID");
            Cf(e) && (f = f || g.get("__Secure-1PAPISID"));
            e = !! f
        }
        e && (e = (c =
        0 == c.indexOf("https:") || 0 == c.indexOf("chrome-extension:") || 0 == c.indexOf("moz-extension:")) ? x.__SAPISID : x.__APISID, e || (e = new Af, e = e.get(c ? "SAPISID" : "APISID") || e.get("__Secure-3PAPISID")), (e = e ? xf(e, c ? "SAPISIDHASH" : "APISIDHASH", a) : null) && d.push(e), c && Cf(b) && ((b = Df("__1PSAPISID", "__Secure-1PAPISID", "SAPISID1PHASH", a)) && d.push(b), (a = Df("__3PSAPISID", "__Secure-3PAPISID", "SAPISID3PHASH", a)) && d.push(a)));
        return 0 == d.length ? null : d.join(" ")
    };
var Gf = function (a) {
    L.call(this);
    M(this, a, -1, Ff, null)
};
v(Gf, L);
var If = function (a) {
    L.call(this);
    M(this, a, -1, Hf, null)
};
v(If, L);
var Kf = function (a) {
    L.call(this);
    M(this, a, -1, null, Jf)
};
v(Kf, L);
var Mf = function (a) {
    L.call(this);
    M(this, a, -1, null, Lf)
};
v(Mf, L);
var Ff = [3, 6, 4],
    Hf = [1],
    Jf = [
        [1, 2, 3]
    ],
    Lf = [
        [1, 2, 3]
    ];
var Of = function (a) {
    L.call(this);
    M(this, a, -1, Nf, null)
};
v(Of, L);
var Nf = [1];
var Pf = function (a, b) {
    this.name = a;
    this.value = b
};
Pf.prototype.toString = function () {
    return this.name
};
var Qf = new Pf("OFF", Infinity),
    Rf = new Pf("SEVERE", 1E3),
    Sf = new Pf("WARNING", 900),
    Tf = new Pf("INFO", 800),
    Uf = new Pf("CONFIG", 700),
    Vf = new Pf("FINE", 500),
    Wf = function () {
        this.wb = 0;
        this.clear()
    },
    Xf;
Wf.prototype.clear = function () {
    this.jd = Array(this.wb);
    this.sd = -1;
    this.Md = !1
};
var Yf = function (a, b, c) {
    this.reset(a || Qf, b, c, void 0, void 0)
};
Yf.prototype.reset = function () {};
var Zf = function (a, b) {
    this.level = null;
    this.wf = [];
    this.parent = (void 0 === b ? null : b) || null;
    this.children = [];
    this.$d = {
        xc: function () {
            return a
        }
    }
},
    $f = function (a) {
        if (a.level) return a.level;
        if (a.parent) return $f(a.parent);
        Ca("Root logger has no level set.");
        return Qf
    },
    ag = function (a, b) {
        for (; a;) a.wf.forEach(function (c) {
            c(b)
        }),
        a = a.parent
    },
    bg = function () {
        this.entries = {};
        var a = new Zf("");
        a.level = Uf;
        this.entries[""] = a
    },
    cg, dg = function (a, b, c) {
        var d = a.entries[b];
        if (d) return void 0 !== c && (d.level = c),
        d;
        d = dg(a, b.substr(0, b.lastIndexOf(".")));
        var e = new Zf(b, d);
        a.entries[b] = e;
        d.children.push(e);
        void 0 !== c && (e.level = c);
        return e
    },
    eg = function () {
        cg || (cg = new bg);
        return cg
    },
    fg = function (a, b, c) {
        var d;
        if (d = a) if (d = a && b) {
            d = b.value;
            var e = a ? $f(dg(eg(), a.xc())) : Qf;
            d = d >= e.value
        }
        if (d) {
            b = b || Qf;
            d = dg(eg(), a.xc());
            "function" === typeof c && (c = c());
            Xf || (Xf = new Wf);
            e = Xf;
            a = a.xc();
            if (0 < e.wb) {
                var f = (e.sd + 1) % e.wb;
                e.sd = f;
                e.Md ? (e = e.jd[f], e.reset(b, c, a), a = e) : (e.Md = f == e.wb - 1, a = e.jd[f] = new Yf(b, c, a))
            } else a = new Yf(b, c, a);
            ag(d, a)
        }
    },
    gg = function (a, b) {
        a && fg(a, Tf, b)
    },
    O = function (a, b) {
        a && fg(a, Vf, b)
    };
var hg = function (a) {
    B(0 < a, "Initial value must be greater than zero.");
    B(3E5 >= a, "Max value should be at least as large as initial value.");
    B(!0, "Randomness factor should be between 0 and 1.");
    this.Kd = a;
    this.be = 3E5;
    this.Pa = this.ya = a;
    this.he = .1;
    this.Je = 2
};
hg.prototype.reset = function () {
    this.Pa = this.ya = this.Kd
};
var ig = function () {};
ig.prototype.ld = null;
var kg = function (a) {
    var b;
    (b = a.ld) || (b = {}, jg(a) && (b[0] = !0, b[1] = !0), b = a.ld = b);
    return b
};
var lg, mg = function () {};
A(mg, ig);
var ng = function (a) {
    return (a = jg(a)) ? new ActiveXObject(a) : new XMLHttpRequest
},
    jg = function (a) {
        if (!a.Hd && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d),
                    a.Hd = d
                } catch (e) {}
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.Hd
    };
lg = new mg;
var P = function (a) {
    K.call(this);
    this.headers = new qc;
    this.Zb = a || null;
    this.fa = !1;
    this.Yb = this.g = null;
    this.Ya = this.Yd = this.Jb = "";
    this.pa = this.Ac = this.Fb = this.qc = !1;
    this.Ka = 0;
    this.Ub = null;
    this.je = "";
    this.Xb = this.Uf = this.sb = !1;
    this.Xc = null
};
A(P, K);
P.prototype.m = dg(eg(), "goog.net.XhrIo", void 0).$d;
var og = /^https?$/i,
    pg = ["POST", "PUT"],
    qg = [],
    rg = function (a, b, c, d, e, f, g) {
        var h = new P;
        qg.push(h);
        b && h.S("complete", b);
        h.P.add("ready", h.Se, !0, void 0, void 0);
        f && (h.Ka = Math.max(0, f));
        g && (h.sb = g);
        h.send(a, c, d, e)
    };
P.prototype.Se = function () {
    this.U();
    La(qg, this)
};
P.prototype.setTrustToken = function (a) {
    this.Xc = a
};
P.prototype.send = function (a, b, c, d) {
    if (this.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.Jb + "; newUri=" + a);
    b = b ? b.toUpperCase() : "GET";
    this.Jb = a;
    this.Ya = "";
    this.Yd = b;
    this.qc = !1;
    this.fa = !0;
    this.g = this.Zb ? ng(this.Zb) : ng(lg);
    this.Yb = this.Zb ? kg(this.Zb) : kg(lg);
    this.g.onreadystatechange = z(this.fe, this);
    this.Uf && "onprogress" in this.g && (this.g.onprogress = z(function (f) {
        this.ee(f, !0)
    }, this), this.g.upload && (this.g.upload.onprogress = z(this.ee, this)));
    try {
        O(this.m, sg(this, "Opening Xhr")),
        this.Ac = !0,
        this.g.open(b, String(a), !0),
        this.Ac = !1
    } catch (f) {
        O(this.m, sg(this, "Error opening Xhr: " + f.message));
        tg(this, f);
        return
    }
    a = c || "";
    var e = this.headers.clone();
    d && vc(d, function (f, g) {
        e.set(g, f)
    });
    d = Ka(e.na(), ug);
    c = x.FormData && a instanceof x.FormData;
    !(0 <= Ha(pg, b)) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    e.forEach(function (f, g) {
        this.g.setRequestHeader(g, f)
    }, this);
    this.je && (this.g.responseType = this.je);
    "withCredentials" in this.g && this.g.withCredentials !== this.sb && (this.g.withCredentials = this.sb);
    if ("setTrustToken" in this.g && this.Xc) try {
        this.g.setTrustToken(this.Xc)
    } catch (f) {
        O(this.m, sg(this, "Error SetTrustToken: " + f.message))
    }
    try {
        vg(this),
        0 < this.Ka && (this.Xb = wg(this.g), O(this.m, sg(this, "Will abort after " + this.Ka + "ms if incomplete, xhr2 " + this.Xb)), this.Xb ? (this.g.timeout = this.Ka, this.g.ontimeout = z(this.se, this)) : this.Ub = $e(this.se, this.Ka, this)),
        O(this.m, sg(this, "Sending request")),
        this.Fb = !0,
        this.g.send(a),
        this.Fb = !1
    } catch (f) {
        O(this.m, sg(this, "Send error: " + f.message)),
        tg(this, f)
    }
};
var wg = function (a) {
    return Lb && Vb(9) && "number" === typeof a.timeout && void 0 !== a.ontimeout
},
    ug = function (a) {
        return "content-type" == a.toLowerCase()
    };
P.prototype.se = function () {
    "undefined" != typeof pa && this.g && (this.Ya = "Timed out after " + this.Ka + "ms, aborting", O(this.m, sg(this, this.Ya)), this.dispatchEvent("timeout"), this.abort(8))
};
var tg = function (a, b) {
    a.fa = !1;
    a.g && (a.pa = !0, a.g.abort(), a.pa = !1);
    a.Ya = b;
    xg(a);
    yg(a)
},
    xg = function (a) {
        a.qc || (a.qc = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
    };
P.prototype.abort = function () {
    this.g && this.fa && (O(this.m, sg(this, "Aborting")), this.fa = !1, this.pa = !0, this.g.abort(), this.pa = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), yg(this))
};
P.prototype.ca = function () {
    this.g && (this.fa && (this.fa = !1, this.pa = !0, this.g.abort(), this.pa = !1), yg(this, !0));
    P.ja.ca.call(this)
};
P.prototype.fe = function () {
    this.Ba || (this.Ac || this.Fb || this.pa ? zg(this) : this.Qf())
};
P.prototype.Qf = function () {
    zg(this)
};
var zg = function (a) {
    if (a.fa && "undefined" != typeof pa) if (a.Yb[1] && 4 == Ag(a) && 2 == Bg(a)) O(a.m, sg(a, "Local request error detected and ignored"));
    else if (a.Fb && 4 == Ag(a)) $e(a.fe, 0, a);
    else if (a.dispatchEvent("readystatechange"), 4 == Ag(a)) {
        O(a.m, sg(a, "Request complete"));
        a.fa = !1;
        try {
            if (Cg(a)) a.dispatchEvent("complete"),
            a.dispatchEvent("success");
            else {
                try {
                    var b = 2 < Ag(a) ? a.g.statusText : ""
                } catch (c) {
                    O(a.m, "Can not get status: " + c.message),
                    b = ""
                }
                a.Ya = b + " [" + Bg(a) + "]";
                xg(a)
            }
        } finally {
            yg(a)
        }
    }
};
P.prototype.ee = function (a, b) {
    B("progress" === a.type, "goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");
    this.dispatchEvent(Dg(a, "progress"));
    this.dispatchEvent(Dg(a, b ? "downloadprogress" : "uploadprogress"))
};
var Dg = function (a, b) {
    return {
        type: b,
        lengthComputable: a.lengthComputable,
        loaded: a.loaded,
        total: a.total
    }
},
    yg = function (a, b) {
        if (a.g) {
            vg(a);
            var c = a.g,
                d = a.Yb[0] ? qa : null;
            a.g = null;
            a.Yb = null;
            b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d
            } catch (e) {
                (a = a.m) && fg(a, Rf, "Problem encountered resetting onreadystatechange: " + e.message)
            }
        }
    },
    vg = function (a) {
        a.g && a.Xb && (a.g.ontimeout = null);
        a.Ub && (x.clearTimeout(a.Ub), a.Ub = null)
    },
    Cg = function (a) {
        var b = Bg(a);
        a: switch (b) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 206:
        case 304:
        case 1223:
            var c = !0;
            break a;
        default:
            c = !1
        }
        if (!c) {
            if (b = 0 === b) a = String(a.Jb).match(wc)[1] || null,
            !a && x.self && x.self.location && (a = x.self.location.protocol, a = a.substr(0, a.length - 1)),
            b = !og.test(a ? a.toLowerCase() : "");
            c = b
        }
        return c
    },
    Ag = function (a) {
        return a.g ? a.g.readyState : 0
    },
    Bg = function (a) {
        try {
            return 2 < Ag(a) ? a.g.status : -1
        } catch (b) {
            return -1
        }
    };
P.prototype.getResponseHeader = function (a) {
    if (this.g && 4 == Ag(this)) return a = this.g.getResponseHeader(a),
    null === a ? void 0 : a
};
P.prototype.getAllResponseHeaders = function () {
    return this.g && 4 == Ag(this) ? this.g.getAllResponseHeaders() || "" : ""
};
var sg = function (a, b) {
    return b + " [" + a.Yd + " " + a.Jb + " " + Bg(a) + "]"
};

function Eg(a, b, c) {
    rg(a.url, function (d) {
        d = d.target;
        if (Cg(d)) {
            try {
                var e = d.g ? d.g.responseText : ""
            } catch (f) {
                O(d.m, "Can not get responseText: " + f.message),
                e = ""
            }
            b(e)
        } else c(Bg(d))
    }, a.Yf, a.body, a.Nc, a.ug, a.withCredentials)
};
var Fg = function (a) {
    L.call(this);
    M(this, a, -1, null, null)
};
v(Fg, L);
var Gg = function () {
    var a = new Fg,
        b = document.documentElement.getAttribute("lang");
    return N(a, 5, b)
};
Fg.prototype.jb = function (a) {
    N(this, 7, a)
};
var Hg = function (a) {
    L.call(this);
    M(this, a, -1, null, null)
};
v(Hg, L);
var Jg = function (a) {
    L.call(this);
    M(this, a, 31, Ig, null)
};
v(Jg, L);
Jg.prototype.kb = function (a) {
    return N(this, 26, a)
};
var Ig = [3, 20, 27];
var Lg = function (a) {
    L.call(this);
    M(this, a, 17, Kg, null)
};
v(Lg, L);
var Mg = function (a, b) {
    return qf(a, 3, b)
},
    Ng = function (a, b) {
        return N(a, 14, b)
    };
Lg.prototype.ne = function (a) {
    pf(this, 13, a)
};
var Kg = [3, 5];
var Pg = function (a) {
    L.call(this);
    M(this, a, 6, Og, null)
};
v(Pg, L);
var Og = [5];
var Qg = function (a) {
    L.call(this);
    M(this, a, -1, null, null)
};
v(Qg, L);
var Rg = new

function () {
    this.lf = 175237375;
    this.yb = Qg;
    this.Cf = 0
};
var Tg = function (a, b, c, d, e, f, g, h, k, l, r) {
    var q = this;
    K.call(this);
    this.Lb = a;
    this.Db = b || qa;
    this.ua = new Lg;
    this.ha = "";
    this.Hc = d;
    this.Ob = r;
    this.N = [];
    this.Oe = 1E3;
    this.Xd = "";
    this.wg = xa(hc, 0, 1);
    this.ic = e || null;
    this.Ia = c || null;
    this.Ab = g || !1;
    this.Ic = k || null;
    this.pb = this.qb = this.jc = !1;
    this.ce = this.Rc = -1;
    this.pd = !1;
    this.la = null;
    this.m = dg(eg(), "playlog.clearcut.ClearcutBase", void 0).$d;
    this.sb = !h;
    this.oa = null;
    this.$a = 0;
    this.eg = 1;
    this.kc = null;
    this.Qd = f || !1;
    this.vg = 0;
    this.Wb = !1;
    this.Pd = !this.Qd && (Xb && Vb(65) || Wb && Vb(45) || Yb && Vb(12) || (Fb() || C("iPad") || C("iPod")) && Gb()) && !! window && !! window.navigator && !! window.navigator.sendBeacon;
    a = N(new Hg, 1, 1);
    f || (f = Gg(), pf(a, 11, f));
    pf(this.ua, 1, a);
    N(this.ua, 2, this.Lb);
    this.ma = new hg(1E4);
    this.V = new Ze(this.ma.ya);
    gd(this, xa(ed, this.V));
    wd(this.V, "tick", Na(Sg(this, l)), !1, this);
    this.hc = new Ze(6E5);
    gd(this, xa(ed, this.hc));
    wd(this.hc, "tick", Na(Sg(this, l)), !1, this);
    this.Ab || this.hc.start();
    this.Qd || (wd(window, "beforeunload", this.Ta, !1, this), wd(window, "unload", this.Ta, !1, this), wd(document, "visibilitychange", function () {
        "hidden" === document.visibilityState && q.Ta()
    }), wd(document, "pagehide", this.Ta, !1, this))
};
A(Tg, K);
var Sg = function (a, b) {
    return b ?
    function () {
        b().then(a.flush.bind(a))
    } : a.flush
};
Tg.prototype.ca = function () {
    this.Ta();
    Tg.ja.ca.call(this)
};
var Ug = function (a) {
    a.ic || (a.ic = .01 > a.wg() ? "https://www.google.com/log?format=json&hasfast=true" : "https://play.google.com/log?format=json&hasfast=true");
    return a.ic
};
m = Tg.prototype;
m.Pc = function (a) {
    kf(a, 1) || N(a, 1, 1);
    pf(this.ua, 1, a)
};
m.kb = function (a) {
    this.ha = a
};
m.me = function (a) {
    a ? (this.la || (this.la = new tf), a = a.Ha(), N(this.la, 4, a)) : this.la && N(this.la, 4, void 0)
};
m.ne = function (a) {
    this.kc = a
};
m.qe = function (a) {
    this.oa = a
};
m.jb = function (a) {
    var b = nf(this.ua, Hg, 1),
        c = nf(b, Fg, 11);
    c || (c = new Fg);
    c.jb(a);
    pf(b, 11, c);
    this.Pc(b)
};
m.pe = function (a) {
    this.pd = !0;
    Vg(this, a)
};
var Vg = function (a, b) {
    a.ma = new hg(1 > b ? 1 : b);
    a.V.setInterval(a.ma.ya)
};
Tg.prototype.log = function (a) {
    a = a.clone();
    var b = this.eg++;
    N(a, 21, b);
    this.ha && a.kb(this.ha);
    kf(a, 1) || N(a, 1, Date.now().toString());
    null != kf(a, 15) || N(a, 15, 60 * (new Date).getTimezoneOffset());
    this.la && (b = this.la.clone(), pf(a, 16, b));
    for (; this.N.length >= this.Oe;) this.N.shift(),
    ++this.$a;
    this.N.push(a);
    this.dispatchEvent(new Wg(a));
    this.Mb()
};
Tg.prototype.Mb = function () {
    this.Ab || this.V.enabled || this.V.start()
};
Tg.prototype.flush = function (a, b) {
    var c = this;
    if (0 == this.N.length) a && a();
    else if (this.Wb) Xg(this);
    else {
        var d = Date.now();
        if (this.ce > d && this.Rc < d) gg(this.m, "Not flushing because server requested delay."),
        b && b("throttled");
        else {
            var e = Ng(Mg(N(this.ua.clone(), 4, Date.now().toString()), this.N), this.$a);
            this.kc && e.ne(this.kc);
            d = {};
            var f = this.Db();
            f && (d.Authorization = f);
            var g = Ug(this);
            this.Ia && (d["X-Goog-AuthUser"] = this.Ia, g = Bc(g, "authuser", this.Ia));
            this.Ic && (d["X-Goog-PageId"] = this.Ic, g = Bc(g, "pageId", this.Ic));
            if (f && this.Xd == f) gg(this.m, "XHR with unauthorized request not retried"),
            b && b("stale-auth-token");
            else if (gg(this.m, "Flushing log to clearcut."), this.N = [], this.V.enabled && this.V.stop(), this.$a = 0, this.jc) gg(this.m, e.Ha()),
            d && gg(this.m, JSON.stringify(d)),
            a && a();
            else {
                var h = e.Ha(),
                    k;
                this.oa && this.oa.Eg(h.length) && (k = this.oa.Bg(h));
                var l = {
                    url: g,
                    body: h,
                    Le: 1,
                    Nc: d,
                    Yf: "POST",
                    withCredentials: this.sb,
                    ug: this.vg
                },
                    r = z(function (p) {
                        this.ma.reset();
                        this.V.setInterval(this.ma.ya);
                        if (p) {
                            try {
                                var y = JSON.parse(p.replace(")]}'\n", ""));
                                var u = new Pg(y)
                            } catch (D) {
                                (p = this.m) && fg(p, Sf, "Response parse failed: " + D)
                            }
                            u && (p = lf(u, "-1"), p = Number(p), 0 < p && (this.Rc = Date.now(), this.ce = this.Rc + p), u = u.getExtension(Rg)) && (u = lf(u, -1), -1 != u && (this.pd || Vg(this, u)))
                        }
                        a && a()
                    }, this),
                    q = z(function (p) {
                        e.i || (e.i = {});
                        if (!e.i[3]) {
                            var y = kf(e, 3);
                            for (var u = [], D = 0; D < y.length; D++) u[D] = new Jg(y[D]);
                            e.i[3] = u
                        }
                        y = e.i[3];
                        y == gf && (y = e.i[3] = []);
                        u = this.ma;
                        u.Pa = Math.min(u.be, u.Pa * u.Je);
                        u.ya = Math.min(u.be, u.Pa + (u.he ? Math.round(u.he * (Math.random() - .5) * 2 * u.Pa) : 0));
                        this.V.setInterval(this.ma.ya);
                        401 == p && f && (this.Xd = f);
                        if (500 <= p && 600 > p || 401 == p || 0 == p) this.N = y.concat(this.N),
                        this.Mb();
                        (y = this.m) && fg(y, Sf, "Flush failed. Status code: " + p);
                        b && b("net-send-failed", p)
                    }, this),
                    w = function () {
                        c.Ob ? c.Ob.send(l, r, q) : c.Hc(l, r, q)
                    };
                k ? k.then(function (p) {
                    l.Nc["Content-Encoding"] = "gzip";
                    l.Nc["Content-Type"] = "application/binary";
                    l.body = p;
                    l.Le = 2;
                    w()
                }, function () {
                    w()
                }) : w()
            }
        }
    }
};
Tg.prototype.Ta = function () {
    this.jc || (this.qb && Xg(this), this.pb && Yg(this), this.flush())
};
var Xg = function (a) {
    gg(a.m, "Flushing log using sendBeacon.");
    Zg(a, 32, 10, function (b, c) {
        b = Bc(b, "format", "json");
        b = window.navigator.sendBeacon(b, c.Ha());
        a.Wb && !b && (a.Wb = !1);
        return b
    })
},
    Yg = function (a) {
        gg(a.m, "Flushing log using Image GET.");
        Zg(a, 6, 5, function (b, c) {
            c = c.Ha();
            c = ac(Ma(c), 3);
            c = Ac(b, "format", "base64json", "p", c);
            b = new Image;
            a: {
                try {
                    var d = b && b.ownerDocument,
                        e = d && (d.defaultView || d.parentWindow);
                    e = e || x;
                    if (e.Element && e.Location) {
                        var f = e;
                        break a
                    }
                } catch (h) {}
                f = null
            }
            if (f && "undefined" != typeof f.HTMLImageElement && (!b || !(b instanceof f.HTMLImageElement) && (b instanceof f.Location || b instanceof f.Element))) {
                if (ua(b)) try {
                    var g = b.constructor.displayName || b.constructor.name || Object.prototype.toString.call(b)
                } catch (h) {
                    g = "<object could not be stringified>"
                } else g = void 0 === b ? "undefined" : null === b ? "null" : typeof b;
                Ca("Argument is not a %s (or a non-Element, non-Location mock); got: %s", "HTMLImageElement", g)
            }
            if (c instanceof hb) f = c;
            else a: if (f = c, d = /^data:image\//i.test(c), !(f instanceof hb)) {
                f = "object" == typeof f && f.Eb ? f.Va() : String(f);
                if (d && /^data:/i.test(f) && (d = String(f), d = d.replace(/(%0A|%0D)/g, ""), d = ((e = d.match(kb)) && jb.test(e[1]) ? new hb(d, gb) : null) || mb, d.Va() == f)) {
                    f = d;
                    break a
                }
                B(lb.test(f), "%s does not match the safe URL pattern", f) || (f = "about:invalid#zClosurez");
                f = new hb(f, gb)
            }
            b.src = ib(f);
            return !0
        })
    },
    Zg = function (a, b, c, d) {
        if (0 != a.N.length) {
            var e = Fc(Ug(a), "format");
            e = Ac(e, "auth", a.Db(), "authuser", a.Ia || "0");
            for (var f = 0; f < c && a.N.length; ++f) {
                var g = a.N.slice(0, b),
                    h = Mg(N(a.ua.clone(), 4, Date.now().toString()), g);
                0 === f && Ng(h, a.$a);
                if (!d(e, h)) break;
                a.N = a.N.slice(g.length)
            }
            a.V.enabled && a.V.stop();
            a.$a = 0
        }
    },
    Wg = function () {
        this.type = "event-logged"
    };
A(Wg, hd);

function $g(a) {
    this.Lb = a;
    this.Ia = "0";
    this.ud = "https://play.google.com/log?format=json&hasfast=true";
    this.Ab = !1;
    this.Ef = !0;
    this.vd = !1;
    this.Hc = Eg;
    this.ha = "";
    this.bf = this.pb = this.qb = !1
}
m = $g.prototype;
m.jb = function (a) {
    this.kd = a
};
m.qe = function (a) {
    this.oa = a
};
m.kb = function (a) {
    this.ha = a;
    return this
};
m.me = function (a) {
    this.nd = a
};
m.Pc = function (a) {
    this.od = a
};
m.pe = function (a) {
    this.zd = Math.max(a, 5E3)
};
var ah = function () {
    var a = 1609;
    a = void 0 === a ? -1 : a;
    var b = void 0 === b ? "" : b;
    var c = void 0 === c ? "" : c;
    var d = void 0 === d ? !1 : d;
    var e = void 0 === e ? "" : e;
    var f = (new $g(a)).kb(b);
    "" != c && (f.ud = c);
    d && (f.vd = !0);
    e && f.jb(e);
    c = new Tg(f.Lb, f.Db ? f.Db : Ef, f.Ia, f.Hc, f.ud, f.vd, f.Ab, void 0, void 0, void 0, f.Ob ? f.Ob : void 0);
    f.Ef || (c.jc = !0);
    f.od && c.Pc(f.od);
    f.kd && c.jb(f.kd);
    f.oa && c.qe(f.oa);
    f.ha && c.kb(f.ha);
    f.nd && c.me(f.nd);
    f.qb && (c.qb = f.qb && c.Pd);
    f.pb && (c.pb = f.pb);
    f.zd && c.pe(f.zd);
    f.bf && (c.Wb = c.Pd);
    this.Lb = a;
    this.ha = b;
    this.te = c
};
ah.prototype.flush = function (a) {
    var b = a || [];
    if (b.length) {
        a = new Of;
        for (var c = [], d = 0; d < b.length; d++) {
            var e = b[d],
                f = e;
            var g = new Gf;
            g = N(g, 1, f.Za);
            for (var h = f, k = [], l = 0; l < h.Cb.length; l++) k.push(h.Cb[l].xd);
            g = N(g, 3, k || []);
            h = [];
            k = [];
            l = t(f.va.keys());
            for (var r = l.next(); !r.done; r = l.next()) k.push(r.value.split(","));
            for (l = 0; l < k.length; l++) {
                r = k[l];
                var q = f.Pe;
                for (var w = f.Bd(r) || [], p = [], y = 0; y < w.length; y++) {
                    var u = w[y];
                    u = u && u.md;
                    var D = new Mf;
                    switch (q) {
                    case 3:
                        mf(D, 1, Lf[0], Number(u));
                        break;
                    case 2:
                        mf(D, 2, Lf[0], Number(u))
                    }
                    p.push(D)
                }
                q =
                p;
                for (w = 0; w < q.length; w++) {
                    p = q[w];
                    y = new If;
                    p = pf(y, 2, p);
                    y = r;
                    u = [];
                    D = f;
                    for (var Y = [], V = 0; V < D.Cb.length; V++) Y.push(D.Cb[V].yd);
                    D = Y;
                    for (Y = 0; Y < D.length; Y++) {
                        V = D[Y];
                        var ta = y[Y],
                            kc = new Kf;
                        switch (V) {
                        case 3:
                            mf(kc, 1, Jf[0], String(ta));
                            break;
                        case 2:
                            mf(kc, 2, Jf[0], Number(ta));
                            break;
                        case 1:
                            mf(kc, 3, Jf[0], "true" == ta)
                        }
                        u.push(kc)
                    }
                    qf(p, 1, u);
                    h.push(p)
                }
            }
            qf(g, 4, h);
            c.push(g);
            e.clear()
        }
        qf(a, 1, c);
        b = this.te;
        a instanceof Jg ? b.log(a) : (c = new Jg, a = a.Ha(), a = N(c, 8, a), b.log(a));
        this.te.flush()
    }
};
var Q = {
    yg: {}
},
    R = R || {};
R.fc = "APISID";
R.ec = "SAPISID";
R.cc = "__Secure-3PAPISID";
R.$ = function (a) {
    a = encodeURIComponent(a);
    var b = R.Cd();
    if (b && (a = b.match("(^|;) ?" + a + "=([^;]*)(;|$)")) && 2 < a.length && (a = a[2])) return decodeURIComponent(a)
};
R.sc = function (a) {
    var b;
    (a = R.$(a)) && (b = String(bh(a)));
    return b
};
R.Cd = function () {
    return document.cookie
};
R.ig = function (a) {
    document.cookie = a
};
Q = Q || {};
Q.yf = function (a, b, c, d) {
    d = void 0 === d ? !1 : d;
    if (!0 === Q.Cc) a();
    else {
        var e = 2,
            f = function () {
                e--;
                0 == e && (Q.Cc = !0, a())
            },
            g = function (h) {
                b(h)
            };
        switch (ch()) {
        case "sessionStorage":
            Q.lb = new dh;
            Q.lb.W(f, g);
            if (c) try {
                Q.lb.clear()
            } catch (h) {}
            break;
        case "inMemoryStorage":
            Q.lb = new eh;
            Q.lb.W(f, g);
            break;
        default:
            c = Error("Unsupported storage type: " + ch());
            b(c);
            return
        }
        switch (fh()) {
        case "localStorage":
            Q.Fa = new gh;
            Q.Fa.W(f, g);
            break;
        case "indexedDb":
            Q.Fa = new hh;
            Q.Fa.W(f, g);
            break;
        case "cookieStorage":
            Q.Fa = new ih;
            d ? f() : Q.Fa.W(f, g);
            break;
        default:
            c = Error("Unsupported storage type: " + fh()),
            b(c)
        }
    }
};
Q.Fd = function () {
    if (!Q.Cc) throw Error("Storages are not initialized yet!");
    return Q.Fa
};
Q.uf = function () {
    if (!Q.Cc) throw Error("Storages are not initialized yet!");
    return Q.lb
};
var gh = function () {};
m = gh.prototype;
m.W = function (a, b) {
    Ne() ? (this.Ra = window.localStorage, a()) : b && b(Error("localStorage is not available in the current environment."))
};
m.getItem = function (a, b) {
    b(this.Ra.getItem(a))
};
m.setItem = function (a, b, c) {
    void 0 === b || null === b ? this.Ra.removeItem(a) : this.Ra.setItem(a, b);
    c && c()
};
m.removeItem = function (a, b) {
    this.Ra.removeItem(a);
    b && b()
};
m.clear = function (a) {
    this.Ra.clear();
    a && a()
};
var hh = function () {};
m = hh.prototype;
m.W = function (a, b) {
    var c = this,
        d = window.indexedDB.open("oauth");
    d.onsuccess = function (e) {
        c.zb = e.target.result;
        a()
    };
    d.onupgradeneeded = function (e) {
        e.target.result.createObjectStore("oauth")
    };
    d.onerror = function (e) {
        e = e.target.errorCode;
        b && b(Error("IndexedDb initialization failed: " + e))
    }
};
m.getItem = function (a, b) {
    var c = this.zb.transaction("oauth", "readwrite").objectStore("oauth").get(a);
    c.onsuccess = function () {
        b(c.result)
    }
};
m.setItem = function (a, b, c) {
    var d = this.zb.transaction("oauth", "readwrite").objectStore("oauth");
    if (void 0 === b || null === b) d["delete"](a);
    else d.put(b, a);
    d.transaction.oncomplete = function () {
        c && c()
    }
};
m.removeItem = function (a, b) {
    var c = this.zb.transaction("oauth", "readwrite").objectStore("oauth");
    c["delete"](a);
    c.transaction.oncomplete = function () {
        b && b()
    }
};
m.clear = function (a) {
    var b = this.zb.transaction("oauth", "readwrite").objectStore("oauth");
    b.clear();
    b.transaction.oncomplete = function () {
        a && a()
    }
};
var eh = function () {};
m = eh.prototype;
m.W = function (a) {
    this.Tb = {};
    a()
};
m.getItem = function (a, b) {
    b(this.Tb[a] || null)
};
m.setItem = function (a, b, c) {
    this.Tb[a] = b;
    c && c()
};
m.removeItem = function (a, b) {
    delete this.Tb[a];
    b && b()
};
m.clear = function (a) {
    this.Tb = {};
    a && a()
};
var dh = function () {};
m = dh.prototype;
m.W = function (a, b) {
    Ne() ? (this.ib = window.sessionStorage, a()) : b && b(Error("sessionStorage is not available in the current environment."))
};
m.getItem = function (a, b) {
    b(this.ib.getItem(a))
};
m.setItem = function (a, b, c) {
    void 0 === b || null === b ? this.ib.removeItem(a) : this.ib.setItem(a, b);
    c && c()
};
m.removeItem = function (a, b) {
    this.ib.removeItem(a);
    b && b()
};
m.clear = function (a) {
    this.ib.clear();
    a && a()
};
var ih = function () {
    this.Kf = S.xe
};
m = ih.prototype;
m.W = function (a, b) {
    navigator.cookieEnabled ? a() : b && b(Error("Cookies are not enabled in current environment."))
};
m.getItem = function (a, b) {
    for (var c = null, d = jh(a), e = 0; e < d.length; e++) if (d[e].key == a) {
        c = d[e].value;
        break
    }
    b(c)
};
m.setItem = function (a, b, c) {
    var d = S.tc(a.split(S.A)[0]);
    if (d) {
        var e = kh(d);
        b = {
            key: a,
            value: b
        };
        for (var f = 0; f < e.length; f++) if (e[f].key == a) {
            e.splice(f, 1);
            break
        }
        e.push(b);
        lh(this, d, e)
    }
    c && c()
};
m.removeItem = function (a, b) {
    for (var c = jh(a), d = 0; d < c.length; d++) if (c[d].key == a) {
        c.splice(d, 1);
        break
    }(a = S.tc(a.split(S.A)[0])) && lh(this, a, c);
    b && b()
};
m.clear = function (a) {
    Q.Ue();
    a && a()
};
var jh = function (a) {
    return (a = S.tc(a.split(S.A)[0])) ? kh(a) : []
},
    kh = function (a) {
        a = R.$(a);
        return Q.Xe(a || null)
    },
    lh = function (a, b, c) {
        var d = Q.df(c);
        d.length > a.Kf ? (c.splice(0, 1), 0 < c.length ? lh(a, b, c) : H("Failed to write Cookie based cache due to the big size.")) : Q.oe(b, d)
    };
Q.We = function (a) {
    try {
        return atob(a)
    } catch (b) {
        return a
    }
};
Q.cf = function (a) {
    try {
        return btoa(a)
    } catch (b) {
        return a
    }
};
Q.Xe = function (a) {
    if (!a) return [];
    a = Q.We(a);
    try {
        return J.parse(a).items || []
    } catch (b) {
        return H("Error while parsing items from cookie:" + b.message),
        []
    }
};
Q.df = function (a) {
    return Q.cf(J.stringify({
        items: a
    }))
};
Q.oe = function (a, b) {
    var c = window.location.hostname,
        d = window.location.pathname;
    a = encodeURIComponent(a) + "=" + encodeURIComponent(b) + "; domain=" + c + ";"; - 1 != navigator.userAgent.toLowerCase().indexOf("msie") || Pe() || (a += " path=" + d + ";");
    "https:" == window.location.protocol && (a += " secure;");
    R.ig(a)
};
Q.Ue = function () {
    var a = S.ac,
        b = R.Cd();
    if (b) {
        b = b.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:=[^;]*)?;\s*/);
        for (var c = 0; c < b.length; c++) {
            var d = decodeURIComponent(b[c]);
            0 == d.indexOf(a) && Q.oe(d, "")
        }
    }
};
var mh = function (a) {
    this.Td = a;
    Te.call(this, ["storageValueChanged"])
};
I(mh, Te);
var nh = function (a, b) {
    Q.Fd().getItem(a.Td, b)
};
mh.prototype.addListener = function (a) {
    this.addEventListener("storageValueChanged", a)
};
mh.prototype.start = function () {
    var a = this;
    nh(this, function (b) {
        a.Sf = b;
        a.de = 0;
        a.Dc = window.setInterval(oh(a), 200)
    })
};
mh.prototype.stop = function () {
    void 0 !== this.Dc && (clearInterval(this.Dc), this.Dc = void 0)
};
var oh = function (a) {
    return function () {
        a.de++;
        nh(a, function (b) {
            b != a.Sf ? (a.dispatchEvent({
                type: "storageValueChanged",
                key: a.Td,
                newValue: b
            }), a.stop()) : 1500 <= a.de && a.stop()
        })
    }
},
    bh = function (a) {
        var b = 0,
            c;
        if (a) {
            var d = 0;
            for (c = a.length; d < c; d++) {
                var e = a.charCodeAt(d);
                b = (b << 5) - b + e;
                b |= 0
            }
        }
        return b
    },
    T = function (a) {
        return !!a && 0 <= a.indexOf(S.A)
    },
    ph = function (a, b) {
        if (!a && !b) return !0;
        if (!a || !b) return !1;
        a = a.extraQueryParams;
        b = b.extraQueryParams;
        if (!a && !b) return !0;
        if (!a || !b || Object.keys && Object.keys(a).length != Object.keys(b).length) return !1;
        for (var c in a) if (a[c] !== b[c]) return !1;
        if (!Object.keys) for (c in b) if (a[c] !== b[c]) return !1;
        return !0
    },
    S = S || {};
S.we = 100;
S.ed = "/oauth2/sessionstate/action/updateState";
S.Zc = "/oauth2/sessionstate/action/checkOrigin";
S.cd = "/oauth2/permission/action/refresh";
S.bd = "/oauth2/permission/action/code";
S.dc = "/oauth2/permission/action/listSessions";
S.Ce = "/o/oauth2/revoke";
S.tb = "response_type login_hint client_id origin scope ss_domain authuser hd enable_serial_consent include_granted_scopes nonce".split(" ");
S.ze = "login_hint client_id origin scope ss_domain authuser hd enable_serial_consent include_granted_scopes".split(" ");
S.Ae = "client_id origin scope ss_domain authuser hd enable_serial_consent".split(" ");
S.A = "::";
S.bc = "_ss_";
S.ad = "_tr_";
S.Na = "oauth2_ss";
S.$c = "oauth2_cs";
S.dd = "oauth2_tr";
S.ye = "oauth2_is";
S.Ma = "oauth2_ar";
S.ac = "oauth2c_";
S.xe = 1500;
S.xg = function () {
    var a = {
        bc: 1,
        ad: 2,
        Na: 3,
        $c: 4,
        dd: 5,
        Ma: 6
    },
        b;
    for (b in a) if (a = S[b], !a || 0 <= a.indexOf(S.A)) throw "Invalid value for 'oauth2.spi." + b + "'.";
};
S.xg();
S.Be = 512;
S.Ge = function (a) {
    var b;
    (b = void 0 === a.hint) || (b = a.hint, b = ("" === b ? !0 : b ? "string" == typeof b || "object" == typeof b && b.constructor === String : !1) && a.hint.length <= S.Be);
    return !a.id && b
};
S.sf = function () {
    var a = R.$("https:" == window.location.protocol ? R.ec : R.fc);
    a || (a = R.$(R.cc));
    return a
};
S.tc = function (a) {
    switch (a) {
    case S.Ma:
        return S.ac + S.Ma;
    case S.Na:
        return S.ac + S.Na;
    default:
        return null
    }
};
var fh = function () {
    return (Se() || Qe()) && !Ne() || Pe() && !window.indexedDB ? "cookieStorage" : Pe() ? "indexedDb" : "localStorage"
},
    ch = function () {
        return !Se() && !Qe() || Ne() ? "sessionStorage" : "inMemoryStorage"
    };
R = R || {};
R.$b = "cookieValueChanged";
var qh = function (a) {
    this.zf = a;
    Te.call(this, [R.$b])
};
I(qh, Te);
qh.prototype.$ = function () {
    return R.$(R.fc) || R.$(R.ec) || R.$(R.cc)
};
var rh = function () {
    return R.sc(R.fc) || R.sc(R.ec) || R.sc(R.cc)
};
qh.prototype.addListener = function (a) {
    this.addEventListener(R.$b, a)
};
var uh = function (a) {
    sh(a);
    a.Pb = a.$();
    a.G = window.setInterval(th(a), a.zf);
    H("IDP Session Cookie monitor is started.")
},
    sh = function (a) {
        void 0 !== a.G && (window.clearInterval(a.G), a.G = void 0, H("IDP Session Cookie monitor is stoped."))
    },
    th = function (a) {
        return function () {
            var b = a.$();
            if (a.Pb != b) {
                var c = {
                    type: R.$b,
                    newHash: b && bh(b),
                    oldHash: a.Pb && bh(a.Pb)
                };
                a.Pb = b;
                a.dispatchEvent(c)
            }
        }
    },
    vh = function (a) {
        this.j = a;
        this.ue = void 0
    },
    wh = function (a, b, c) {
        var d = S.Ce,
            e = new XMLHttpRequest;
        e.onreadystatechange = function () {
            if (4 == e.readyState && 200 == e.status) {
                var h;
                e.responseText && (h = J.parse(e.responseText));
                c(h)
            } else 4 == e.readyState && 0 == e.status ? c({
                error: "network_error"
            }) : 4 == e.readyState && c({
                error: "server_error",
                error_subtype: e.responseText
            })
        };
        e.open("POST", d, !0);
        e.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var f = "xsrfToken=";
        a.ue && (f += a.ue);
        if (b) for (var g in b) g && b[g] && (f += "&" + g + "=" + encodeURIComponent(b[g]));
        H("Call " + d + " with postData: " + f);
        e.send(f)
    },
    xh = function (a, b, c, d) {
        var e = new XMLHttpRequest;
        e.onreadystatechange = function () {
            if (4 == e.readyState && 200 == e.status) {
                var g;
                if (e.responseText && (g = J.parse(e.responseText))) {
                    var h = g;
                    if (h.error) {
                        h.thrown_by = "server";
                        try {
                            h.error = h.error.toLowerCase()
                        } catch (k) {}
                    }
                }
                d(g)
            } else 4 == e.readyState && 0 == e.status ? d({
                error: "network_error"
            }) : 4 == e.readyState && d({
                error: "server_error",
                error_subtype: e.responseText
            })
        };
        if (b = Je(b)) a += 0 > a.indexOf("?") ? "?" : "&",
        a += b;
        e.open("GET", a, !0);
        e.setRequestHeader("X-Requested-With", "XmlHttpRequest");
        if (c) for (var f in c) if (c.hasOwnProperty(f)) {
            b =
            c[f];
            if (null === b || void 0 === b) b = "";
            e.setRequestHeader(f, b)
        }
        H("Call " + a + " with Get method.");
        e.send()
    },
    yh = function (a, b, c) {
        xh(S.Zc, {
            origin: a.j,
            client_id: b
        }, null, c)
    },
    zh = function (a, b, c) {
        b && b.length ? xh(S.ed, {
            login_hint: b.join(" "),
            origin: a.j
        }, null, c) : c({
            activeHints: {}
        })
    },
    Bh = function (a, b, c) {
        b.origin = a.j;
        0 > S.tb.indexOf("enable_serial_consent") && S.tb.push("enable_serial_consent");
        b = Ah(b, S.tb);
        xh(S.cd, b, null, c)
    },
    Ch = function (a, b, c) {
        b.origin = a.j;
        b = Ah(b, S.ze);
        xh(S.bd, b, null, c)
    },
    Dh = function (a, b, c) {
        b.origin = a.j;
        b = Ah(b, S.Ae);
        xh(S.dc, b, null, c)
    },
    Eh = function (a, b, c) {
        wh(a, {
            token: b
        }, c)
    },
    Ah = function (a, b) {
        for (var c = {}, d = 0; d < b.length; d++) {
            var e = b[d];
            void 0 !== a[e] && null !== a[e] && (c[e] = a[e])
        }
        return c
    };
Q = Q || {};
var Fh = function () {};
Fh.prototype.M = function () {
    return !1
};
var Gh = {};
Q.Vf = function () {
    var a = new Hh;
    if (!a) throw "policy cannot be empty.";
    if (Q.Nd("DEFAULT")) throw "Duplicate policyName [DEFAULT].";
    Gh.DEFAULT = a
};
Q.Nd = function (a) {
    for (var b in Gh) if (a == b) return !0;
    return !1
};
Q.Dd = function (a) {
    return a && Q.Nd(a) ? a : "DEFAULT"
};
Q.pf = function (a) {
    return Gh[Q.Dd(a)]
};
Q.M = function (a, b, c, d) {
    return Q.pf(d).M(a, b, c)
};
Q.Ag = function (a, b, c, d) {
    if (!Q.M(a, b, c, d)) throw "permission_error";
};
var Ih = function () {};
I(Ih, Fh);
Ih.prototype.M = function (a, b, c) {
    a = c ? this.yc(a) : this.zc(a);
    return 0 <= He(a, b)
};
Ih.prototype.zc = function (a) {
    var b = [];
    if (a && (b.push(a), "http://" == a.substring(0, 7) || "https://" == a.substring(0, 8))) {
        var c = document.createElement("a");
        c.href = a;
        a != c.protocol + "//" + c.hostname && b.push(c.protocol + "//" + c.hostname);
        "https:" == c.protocol && b.push("http://" + c.hostname)
    }
    return b
};
Ih.prototype.yc = function (a) {
    var b = [];
    if (a) {
        b.push(a);
        var c = document.createElement("a");
        c.href = a;
        if ("http:" == c.protocol || "https:" == c.protocol) for (a = c.hostname.split("."); 1 < a.length;) b.push(c.protocol + "//" + a.join(".")),
        "https:" == c.protocol && b.push("http://" + a.join(".")),
        a.shift()
    }
    return b
};
var Hh = function () {};
I(Hh, Fh);
Hh.prototype.M = function (a, b, c) {
    a = c ? this.yc(a) : this.zc(a);
    return 0 <= He(a, b)
};
Hh.prototype.zc = function (a) {
    var b = [];
    if (a && (b.push(a), "https://" == a.substring(0, 8))) {
        var c = document.createElement("a");
        c.href = a;
        "" != c.port && 0 != c.port && 443 != c.port || b.push("http://" + c.hostname)
    }
    return b
};
Hh.prototype.yc = function (a) {
    var b = [];
    if (a) {
        var c = document.createElement("a");
        c.href = a;
        if ("https:" == c.protocol && ("" == c.port || 0 == c.port || 443 == c.port) || "http:" == c.protocol && ("" == c.port || 0 == c.port || 80 == c.port)) for (a = c.hostname.split("."); 1 < a.length;) b.push(c.protocol + "//" + a.join(".")),
        "https:" == c.protocol && b.push("http://" + a.join(".")),
        a.shift();
        else b.push(a)
    }
    return b
};
Q.Vf();
var Jh = function () {};
Jh.prototype.Fc = function () {
    return !0
};
var U = function (a) {
    return a.Fc() ? Q.uf() : Q.Fd()
};
Jh.prototype.u = function () {
    throw Error("unimplemented abstract method");
};
Jh.prototype.Ca = function () {
    throw Error("unimplemented abstract method");
};
Jh.prototype.J = function () {
    throw Error("unimplemented abstract method");
};
Jh.prototype.K = function () {
    throw Error("unimplemented abstract method");
};
var W = function () {};
I(W, Jh);
W.prototype.J = function (a, b, c) {
    var d = this,
        e = this.u(a);
    U(this).getItem(e, function (f) {
        if (f) try {
            var g = J.parse(f);
            if (g.cookieHash != b) {
                U(d).removeItem(e, function () {
                    c(void 0)
                });
                return
            }
            var h = g && g.cachedValue
        } catch (k) {}
        c(h)
    })
};
W.prototype.K = function (a, b, c, d) {
    a = this.u(a);
    void 0 === b || null === b ? U(this).removeItem(a, d) : (b = J.stringify({
        cookieHash: c,
        cachedValue: b
    }), U(this).setItem(a, b, d))
};
var Kh = function () {};
I(Kh, Jh);
Kh.prototype.J = function (a, b, c) {
    U(this).getItem(this.u(a), function (d) {
        if (d) try {
            var e = J.parse(d);
            var f = e && e.cachedValue
        } catch (g) {}
        c(f)
    })
};
Kh.prototype.K = function (a, b, c, d) {
    a = this.u(a);
    void 0 === b || null === b ? U(this).removeItem(a, d) : (b = J.stringify({
        cachedValue: b
    }), U(this).setItem(a, b, d))
};
var Lh = function () {};
I(Lh, Kh);
Lh.prototype.Fc = function () {
    return !1
};
Lh.prototype.u = function (a) {
    return [S.Ma, a.origin, a.clientId, a.id].join(S.A)
};
Lh.prototype.Ca = function (a) {
    var b = {};
    a && (a = a.split(S.A), 4 == a.length && (b.origin = a[1], b.clientId = a[2], b.id = a[3]));
    return b
};
var Mh = function () {};
I(Mh, W);
Mh.prototype.u = function (a) {
    return [S.$c, a.origin, a.clientId].join(S.A)
};
Mh.prototype.Ca = function (a) {
    a = a.split(S.A);
    var b = {};
    3 == a.length && (b.origin = a[1], b.clientId = a[2]);
    return b
};
var Nh = function () {};
I(Nh, W);
Nh.prototype.u = function (a) {
    return [S.ye, a.origin, a.clientId].join(S.A)
};
Nh.prototype.J = function (a, b, c) {
    var d = this;
    W.prototype.J.call(this, a, b, function (e) {
        e && e.expires_at ? 6E4 > e.expires_at - (new Date).getTime() ? U(d).removeItem(d.u(a), c) : Me(e.scope, a.scope) && Me(a.scope, e.scope) ? (e.expires_in = Math.floor((e.expires_at - (new Date).getTime()) / 1E3), c && c(e)) : U(d).removeItem(d.u(a), c) : c && c(void 0)
    })
};
Nh.prototype.K = function (a, b, c, d) {
    var e;
    b && b.expires_at && 18E4 < b.expires_at - (new Date).getTime() && (e = b);
    W.prototype.K.call(this, a, e, c, d)
};
var Oh = function () {};
I(Oh, Kh);
Oh.prototype.Fc = function () {
    return !1
};
Oh.prototype.u = function (a) {
    return [S.Na, a.domain, a.crossSubDomains ? "1" : "0", Q.Dd(a.policy), a.id || S.bc].join(S.A)
};
Oh.prototype.Ca = function (a) {
    a = a.split(S.A);
    var b = {};
    5 == a.length && (b.domain = a[1], b.crossSubDomains = "1" == a[2], b.policy = a[3], b.id = a[4]);
    "DEFAULT" == b.policy && delete b.policy;
    b.id == S.bc && delete b.id;
    return b
};
var Ph = function (a) {
    this.Rf = a || S.dd
};
I(Ph, W);
Ph.prototype.u = function (a) {
    return [this.Rf, a.origin, a.clientId, a.id || S.ad].join(S.A)
};
Ph.prototype.J = function (a, b, c) {
    var d = this;
    W.prototype.J.call(this, a, b, function (e) {
        e && e.La && e.La.expires_at ? a.loginHint != e.La.login_hint ? U(d).removeItem(d.u(a), c) : 6E4 > e.La.expires_at - (new Date).getTime() ? U(d).removeItem(d.u(a), c) : Me(e.La.scope, a.scope) ? Me(e.responseType, a.responseType) ? (e = e.La, e.expires_in = Math.floor((e.expires_at - (new Date).getTime()) / 1E3), c && c(e)) : U(d).removeItem(d.u(a), c) : U(d).removeItem(d.u(a), c) : c && c(void 0)
    })
};
Ph.prototype.K = function (a, b, c, d) {
    var e;
    b && b.expires_at && 18E4 < b.expires_at - (new Date).getTime() && (e = {
        La: b,
        responseType: a.responseType
    });
    W.prototype.K.call(this, a, e, c, d)
};
var Qh = function (a, b) {
    this.j = a;
    this.Oc = b;
    this.pc = !1;
    this.fb = {};
    this.eb = {};
    this.cb = {}
},
    Rh = function (a, b) {
        if (!b) throw "message object cannot be null.";
        b.rpcToken = a.Oc;
        b = J.stringify(b);
        H("IDP IFrame sends message: " + b);
        window.parent.postMessage(b, a.j)
    },
    X = function (a, b, c) {
        b && Rh(a, {
            id: b,
            result: c
        })
    };
Qh.prototype.Tf = function (a) {
    if (a.source == window.parent && a.origin == this.j) {
        H("IDP Session State IFrame receive message:" + a.data);
        try {
            var b = J.parse(a.data)
        } catch (d) {
            return
        }
        if ((b.rpcToken || this.Oc) && b.rpcToken != this.Oc) H("RPC token mismatch.");
        else if (b && b.method && ("showDialog" == b.method || this.fb[b.method])) if ("showDialog" == b.method) if (this.pc) Rh(this, {
            id: b.id,
            error: "dialog_already_displayed"
        });
        else if (a = b.params, b.id && a && a.dialogType && this.cb[a.dialogType]) {
            var c = this.cb[a.dialogType];
            c.C && !c.C(a) ? (H("Bad request."), Rh(this, {
                id: b.id,
                error: "bad_request"
            })) : c.l(b)
        } else H("Bad dialog request.");
        else a = this.fb[b.method],
        a.aa && !b.id ? H("Bad request.") : a.C && !a.C(b) ? (H("Bad request."), Rh(this, {
            id: b.id,
            error: "bad_request"
        })) : a.l(b);
        else H("Bad request.")
    }
};
var Sh = function (a, b) {
    if (b && b.type && a.eb[b.type]) {
        var c = a.eb[b.type].filter;
        c && !c(b) || Rh(a, {
            method: "fireIdpEvent",
            params: b
        })
    } else H("Invalid event type.")
},
    Th = function (a) {
        Sh(a, {
            type: "displayIFrame",
            xf: !1,
            options: {
                fullScreen: !0
            }
        });
        a.pc = !0
    },
    Uh = function (a) {
        Sh(a, {
            type: "displayIFrame",
            xf: !0
        });
        a.pc = !1
    },
    Vh = function (a, b) {
        a.fb = {};
        a.eb = {};
        a.cb = {};
        if (b) {
            if (b.I) for (var c = 0; c < b.I.length; c++) {
                var d = b.I[c];
                if (!d.method || !d.l) throw "Error in RPC policy: method or handler is empty.";
                if (a.fb[d.method]) throw "Error in RPC policy: duplicate entry for RPC '" + d.method + "'.";
                var e = d.method;
                a.fb[e] = {
                    l: d.l,
                    aa: d.aa,
                    C: d.C,
                    method: e
                }
            }
            if (b.Z) for (c = 0; c < b.Z.length; c++) {
                d = b.Z[c];
                if (!d.type) throw "Error in Event policy: type is empty.";
                if (a.eb[d.type]) throw "Error in Event policy: duplicate entry for type '" + d.type + "'.";
                e = d.type;
                a.eb[e] = {
                    filter: d.filter,
                    type: e
                }
            }
            if (b.za) for (c = 0; c < b.za.length; c++) {
                d = b.za[c];
                if (!d.Aa) throw "Error in Dialog policy: dialogType is empty.";
                if (a.cb[d.Aa]) throw "Error in Dialog policy: duplicate entry for dialogType '" + d.Aa + "'.";
                e = d.Aa;
                a.cb[e] = {
                    Aa: e,
                    l: d.l,
                    C: d.C
                }
            }
        }
    },
    Wh = function (a, b, c, d) {
        Sh(a, {
            type: "sessionStateChanged",
            clientId: b,
            user: c,
            sessionState: d
        })
    },
    Xh = function (a) {
        var b = new Oh,
            c = S.Na + S.A;
        return function (d) {
            if (d.key && 0 === d.key.indexOf(c)) {
                var e = b.Ca(d.key);
                if (Q.M(a.j, e.domain, e.crossSubDomains, e.policy)) {
                    var f;
                    if (d.newValue) try {
                        var g = J.parse(d.newValue);
                        g && (f = g.cachedValue)
                    } catch (h) {
                        return
                    }
                    Sh(a, {
                        type: "sessionSelectorChanged",
                        newValue: f,
                        crossSubDomains: e.crossSubDomains,
                        domain: e.domain,
                        policy: e.policy,
                        id: e.id
                    })
                }
            }
        }
    },
    Yh = function (a) {
        var b =
        new Lh,
            c = [S.Ma, a.j].join(S.A) + S.A;
        return function (d) {
            if (!d.key && Oe()) {
                var e = null,
                    f = [];
                for (d = 0; d < window.localStorage.length; d++) {
                    var g = window.localStorage.key(d);
                    if (0 === g.indexOf(c)) if (e) f.push(g);
                    else {
                        var h = window.localStorage.getItem(g);
                        f.push(g);
                        if (h) {
                            try {
                                var k = J.parse(h)
                            } catch (l) {
                                continue
                            }
                            k && k.cachedValue && (e = b.Ca(g), e = {
                                type: "authResult",
                                clientId: e.clientId,
                                id: e.id,
                                authResult: k.cachedValue
                            })
                        }
                    }
                }
                for (d = 0; d < f.length; d++) window.localStorage.removeItem(f[d]);
                (k = e) && Sh(a, k)
            } else if (d.key && 0 === d.key.indexOf(c) && d.newValue) {
                try {
                    f = J.parse(d.newValue)
                } catch (l) {
                    return
                }
                f && f.cachedValue && (k = b.Ca(d.key), k = {
                    type: "authResult",
                    clientId: k.clientId,
                    id: k.id,
                    authResult: f.cachedValue
                }, Sh(a, k))
            }
        }
    },
    Zh = function (a, b) {
        this.j = a;
        this.ka = b;
        this.qd = new Mh;
        this.le = new Oh;
        this.Wc = new Ph;
        this.Gd = new Nh
    },
    $h = function (a, b, c, d, e) {
        a.qd.K({
            origin: a.j,
            clientId: b
        }, {
            user: c.Y,
            session: c.Y ? c.ra : void 0
        }, d, e)
    },
    ai = function (a, b, c) {
        a.qd.J({
            origin: a.j,
            clientId: b
        }, rh(), c)
    },
    bi = function (a, b, c, d, e, f, g) {
        a.Wc.J({
            loginHint: b,
            origin: a.j,
            clientId: c,
            responseType: d,
            scope: e,
            id: f
        }, rh(), g)
    },
    ci = function (a, b, c, d, e, f, g) {
        a.Wc.K({
            origin: a.j,
            clientId: c,
            responseType: d,
            id: f
        }, e, b, g)
    },
    di = function (a, b, c) {
        var d = a.Wc;
        a = {
            origin: a.j,
            clientId: b
        };
        U(d).removeItem(d.u(a), c)
    },
    ei = function (a, b, c, d, e, f) {
        if (!a.M(b, c, e)) throw "Permission denied for '" + a.j + "' to read session selector for domain '" + b + "'.";
        a.le.J({
            domain: b,
            crossSubDomains: c,
            policy: e,
            id: d
        }, void 0, function (g) {
            f && f(g)
        })
    },
    fi = function (a, b, c, d, e, f, g) {
        if (!a.M(b, c, f)) throw "Permission denied for '" + a.j + "' to write session selector for domain '" + b + "'.";
        a.le.K({
            domain: b,
            crossSubDomains: c,
            policy: f,
            id: e
        }, d, void 0, g)
    };
Zh.prototype.M = function (a, b, c) {
    return Q.M(this.j, a, b, c)
};
var gi = function (a, b, c, d) {
    a.Gd.J({
        origin: a.j,
        clientId: b,
        scope: c
    }, rh(), d)
},
    hi = function (a, b, c, d, e) {
        a.Gd.K({
            origin: a.j,
            clientId: c
        }, d, b, e)
    },
    ii = function (a, b, c) {
        this.wa = a;
        this.h = b;
        this.s = c
    },
    ji = function (a, b, c) {
        a.Y ? c && void 0 !== c[a.Y] ? (c = c[a.Y], ph(a.ra, c) || (a.ra = c, $h(a.s, a.wa, a, b, function () {
            Wh(a.h, a.wa, a.Y, a.ra)
        }))) : a.ra && (a.ra = void 0, $h(a.s, a.wa, a, b, function () {
            Wh(a.h, a.wa, a.Y, void 0)
        })) : b && Wh(a.h, a.wa, a.Y, void 0)
    },
    li = function (a, b, c, d) {
        this.ka = a;
        this.h = b;
        this.X = c;
        this.s = d;
        this.ab = void 0;
        this.L = {};
        this.Sc = [];
        var e = this;
        this.ka.addListener(function (f) {
            ki(e, f)
        })
    },
    mi = function (a) {
        var b = [],
            c;
        for (c in a.L) {
            var d = a.L[c].Y;
            d && b.push(d)
        }
        return b
    },
    ki = function (a, b) {
        if (b.newHash) zh(a.X, mi(a), function (d) {
            for (var e in a.L) ji(a.L[e], b.newHash, d && d.activeHints)
        });
        else for (var c in a.L) ji(a.L[c], b.newHash, void 0)
    },
    ni = function (a, b, c, d, e) {
        var f = a.L[b];
        f || (f = new ii(b, a.h, a.s), a.L[b] = f);
        a = f;
        b = c.login_hint;
        c = c.session_state;
        a.Y != b ? (a.Y = b, a.ra = b ? c : void 0, $h(a.s, a.wa, a, d, e)) : e && e()
    },
    oi = function (a, b, c) {
        var d = a.L[b];
        d ? c(!0) : ai(a.s, b, function (e) {
            e ? (d = new ii(b, a.h, a.s), a.L[b] = d, d.Y = e.user, d.ra = e.session, c(!0)) : yh(a.X, b, function (f) {
                f && f.valid ? (f = new ii(b, a.h, a.s), a.L[b] = f, $h(a.s, b, f, rh(), function () {
                    c(!0)
                })) : c(!1)
            })
        })
    },
    pi = function (a, b) {
        Pe() || Re() ? a.Sc.push(b) : Le(Oe() ? document : window, "storage", b)
    },
    qi = function (a, b, c, d) {
        this.j = a;
        this.Te = c;
        this.sg = void 0 === d ? !1 : d;
        this.h = new Qh(a, b);
        this.ka = new qh(S.we);
        this.X = new vh(a);
        this.s = new Zh(a, this.ka);
        this.ba = new li(this.ka, this.h, this.X, this.s)
    };
m = qi.prototype;
m.start = function () {
    var a = this,
        b = function () {
            a.h.Tf.apply(a.h, arguments)
        },
        c = function () {
            Sh(a.h, {
                type: "idpReady",
                cookieDisabled: !navigator.cookieEnabled
            });
            H("Initialize IDP IFrame successfully.")
        },
        d = function (e) {
            var f = window;
            if (f.removeEventListener) f.removeEventListener("message", b, !1);
            else if (f.detachEvent) f.detachEvent("onmessage", b);
            else throw "Remove event handler for message failed.";
            sh(a.ka);
            Sh(a.h, {
                type: "idpError",
                error: e.message
            })
        };
    try {
        Vh(this.h, this.createPolicy()),
        Le(window, "message", b),
        pi(this.ba, Xh(this.h)),
        pi(this.ba, Yh(this.h)),
        uh(this.ka),
        Q.yf(c, d, this.Te, this.sg)
    } catch (e) {
        d(e)
    }
};
m.Lf = function (a) {
    var b = this;
    oi(this.ba, (a.params || {}).clientId, function (c) {
        X(b.h, a.id, c)
    })
};
m.kf = function (a) {
    var b = a.params || {},
        c = this,
        d = function (q) {
            X(c.h, a.id, q)
        },
        e = b.clientId,
        f = b.loginHint,
        g = b.request,
        h = b.sessionSelector;
    g.client_id = e;
    g.login_hint = f;
    g.ss_domain = h.domain;
    var k = rh();
    if (k) {
        var l = !! g.enable_serial_consent,
            r = function (q) {
                q && !q.error && q.login_hint ? (q.first_issued_at = (new Date).getTime(), q.expires_at = q.first_issued_at + 1E3 * q.expires_in, q.session_state || (q.session_state = {}), l || q.scope || (q.scope = g.scope), b.skipCache ? ni(c.ba, e, q, k, function () {
                    d(q)
                }) : ci(c.s, k, e, g.response_type, q, b.id, function () {
                    ni(c.ba, e, q, k, function () {
                        d(q)
                    })
                })) : (q = q || {}, d(q))
            };
        b.forceRefresh ? Bh(this.X, g, r) : bi(this.s, f, e, g.response_type, g.scope, b.id, function (q) {
            q && 18E4 < q.expires_at - (new Date).getTime() ? ni(c.ba, e, q, k, function () {
                d(q)
            }) : Bh(c.X, g, r)
        })
    } else X(c.h, a.id, {
        error: "user_logged_out"
    }),
    b.userInteracted && (f = ri(), si(f).Bc(), f.flush())
};
m.qf = function (a) {
    var b = this,
        c = function (g) {
            X(b.h, a.id, g)
        };
    if (rh()) {
        var d = a.params || {},
            e = d.request,
            f = d.sessionSelector;
        e.client_id = d.clientId;
        e.login_hint = d.loginHint;
        e.ss_domain = f.domain;
        Ch(this.X, e, c)
    } else c({
        error: "user_logged_out"
    })
};
m.ag = function (a) {
    var b = a.params || {},
        c = b.clientId,
        d = this;
    Eh(this.X, b.token, function (e) {
        di(d.s, c, function () {
            X(d.h, a.id, e)
        })
    })
};
m.pg = function (a) {
    if (Pe() || Re()) {
        var b = a.params || {},
            c = (new Lh).u({
                clientId: b.clientId,
                id: b.id,
                origin: b.origin
            });
        b = this.ba;
        if (Pe() || Re()) {
            b.ab && b.ab.stop();
            b.ab = new mh(c);
            for (c = 0; c < b.Sc.length; c++) b.ab.addListener(b.Sc[c]);
            b.ab.start()
        }
    }
    X(this.h, a.id, !0)
};
m.jf = function (a) {
    var b = this,
        c = a.params || {};
    ei(this.s, c.domain, c.crossSubDomains, c.id, c.policy, function (d) {
        X(b.h, a.id, d)
    })
};
m.jg = function (a) {
    var b = a.params || {},
        c = b.hint,
        d = !! b.disabled,
        e = b.domain,
        f = b.crossSubDomains,
        g = b.id,
        h = b.policy,
        k = this;
    if (c || d) var l = {
        hint: c,
        disabled: d
    };
    fi(this.s, e, f, l, g, h, function () {
        Sh(k.h, {
            type: "sessionSelectorChanged",
            newValue: l,
            domain: e,
            crossSubDomains: f,
            id: g,
            policy: h
        });
        X(k.h, a.id, !0)
    })
};
m.Hf = function (a) {
    var b = a.params || {},
        c = this,
        d = function (l) {
            X(c.h, a.id, l)
        },
        e = b.clientId,
        f = b.request,
        g = b.sessionSelector;
    f.client_id = e;
    f.response_type = "id_token";
    f.ss_domain = g.domain;
    var h = rh();
    if (h) {
        var k = function (l) {
            l && !l.error ? (l.first_issued_at = (new Date).getTime(), l.expires_at = l.first_issued_at + 1E3 * l.expires_in, l.scope = f.scope, hi(c.s, h, e, l, function () {
                d(l)
            })) : (l = l || {
                error: "No response returned from Server."
            }, d(l))
        };
        b.forceRefresh ? Dh(this.X, f, k) : gi(this.s, e, f.scope, function (l) {
            l ? d(l) : Dh(c.X, f, k)
        })
    } else d({
        scope: f.scope,
        sessions: []
    })
};
m.Qe = function (a) {
    if (document.hasStorageAccess && Ie(document.hasStorageAccess)) {
        var b = this;
        document.hasStorageAccess().then(function (c) {
            X(b.h, a.id, {
                hasAccess: c
            })
        }, function (c) {
            H("CheckStorageAccess failed: " + c);
            X(b.h, a.id, {
                hasAccess: !1
            })
        })
    } else X(this.h, a.id, {
        hasAccess: !0
    })
};
m.Mf = function (a) {
    a = a && a.params || {};
    return a.clientId && !T(a.clientId)
};
m.vf = function (a) {
    var b = a && a.params || {};
    a = b.loginHint;
    var c = !T(b.id),
        d = b.clientId && !T(b.clientId),
        e = !! b.request,
        f = e && b.request.scope;
    (b = (e = e && b.request.response_type) && 0 <= b.request.response_type.indexOf("code")) && H("Bad request: 'code' response_type is not supported.");
    return a && c && d && f && e && !b
};
m.rf = function (a) {
    a = a && a.params || {};
    var b = !T(a.id),
        c = a.clientId && !T(a.clientId),
        d = !! a.request && a.request.scope;
    return a.loginHint && b && c && d
};
m.tf = function (a) {
    a = a && a.params || {};
    var b = a.domain && !T(a.domain),
        c = !T(a.policy);
    return !T(a.id) && b && c && this.s.M(a.domain, !! a.crossSubDomains, a.policy)
};
m.kg = function (a) {
    a = a && a.params || {};
    var b = a.domain && !T(a.domain),
        c = !T(a.policy);
    return !T(a.id) && b && c && this.s.M(a.domain, !! a.crossSubDomains, a.policy) && S.Ge(a)
};
m.If = function (a) {
    a = a && a.params || {};
    var b = a.clientId && !T(a.clientId),
        c = !! a.request && a.request.scope;
    return !T(a.id) && b && c
};
m.bg = function (a) {
    a = a && a.params || {};
    var b = !! a.token,
        c = a.clientId && !T(a.clientId);
    return !T(a.id) && b && c
};
m.qg = function (a) {
    a = a && a.params || {};
    var b = a.origin && !T(a.origin),
        c = a.id && !T(a.id);
    return a.clientId && !T(a.clientId) && b && c
};
m.gg = function (a) {
    var b;
    if (b = a.clientId) a = a.clientId,
    b = !(!a || !this.ba.L[a]);
    return b
};
m.Ie = function (a) {
    var b;
    if (b = a.clientId) b = a.clientId,
    b = !(!b || !this.ba.L[b]);
    return b && a.id && a.authResult
};
m.af = function (a) {
    return !!a.hide || !! a.options
};
m.fg = function (a) {
    return a.domain && this.s.M(a.domain, a.crossSubDomains, a.policy)
};
var Z = function (a, b) {
    return function () {
        return b.apply(a, arguments)
    }
};
qi.prototype.createPolicy = function () {
    var a = {
        I: [],
        Z: [],
        za: []
    };
    ti(this, a);
    return a
};
var ti = function (a, b) {
    b.I.push({
        method: "monitorClient",
        l: Z(a, a.Lf),
        aa: !1,
        C: Z(a, a.Mf)
    });
    b.I.push({
        method: "getTokenResponse",
        l: Z(a, a.kf),
        aa: !0,
        C: Z(a, a.vf)
    });
    b.I.push({
        method: "getOnlineCode",
        l: Z(a, a.qf),
        aa: !0,
        C: Z(a, a.rf)
    });
    b.I.push({
        method: "getSessionSelector",
        l: Z(a, a.jf),
        aa: !0,
        C: Z(a, a.tf)
    });
    b.I.push({
        method: "setSessionSelector",
        l: Z(a, a.jg),
        aa: !1,
        C: Z(a, a.kg)
    });
    b.I.push({
        method: "listIdpSessions",
        l: Z(a, a.Hf),
        aa: !0,
        C: Z(a, a.If)
    });
    b.I.push({
        method: "revoke",
        l: Z(a, a.ag),
        C: Z(a, a.bg)
    });
    b.I.push({
        method: "startPolling",
        l: Z(a, a.pg),
        C: Z(a, a.qg)
    });
    b.Z.push({
        type: "idpReady"
    });
    b.Z.push({
        type: "idpError"
    });
    b.Z.push({
        type: "sessionStateChanged",
        filter: Z(a, a.gg)
    });
    b.Z.push({
        type: "sessionSelectorChanged",
        filter: Z(a, a.fg)
    });
    b.Z.push({
        type: "authResult",
        filter: Z(a, a.Ie)
    });
    b.Z.push({
        type: "displayIFrame",
        filter: Z(a, a.af)
    });
    b.I.push({
        method: "checkStorageAccess",
        l: Z(a, a.Qe),
        aa: !0
    })
},
    ui = function (a) {
        this.ke = a
    },
    si = function (a) {
        a = new cf(a.ke);
        return new vi(a)
    };
ui.prototype.flush = function () {
    this.ke.Qc()
};
var ri = function () {
    var a = new ah;
    a = new af(a);
    return new ui(a)
},
    vi = function (a) {
        this.Ve = a;
        this.Ne = sb() ? "IE" : rb() ? "Opera" : C("OPR") ? "OPR" : C("Edge") ? "Edge" : C("Edg/") ? "Edg" : !C("Android") || ub() || tb() || rb() || C("Silk") ? ub() ? "Chrome" : tb() ? "Firefox" : !C("iPad") && !C("iPhone") || vb() || ub() || C("Coast") || tb() || !C("AppleWebKit") ? vb() ? "Safari" : "Other" : "iOS Webview" : "Android";
        (a = xb()) ? (a = a.split("."), a = 2 > a.length ? a[0] : a[0] + "." + a[1]) : a = "N/A";
        this.Me = a
    };
vi.prototype.Bc = function () {
    this.Ve.Bc(this.Ne, this.Me)
};
var wi = "client_id origin ss_domain scope privileged authuser".split(" ");
S.tb = "response_type login_hint client_id origin scope ss_domain authuser hd include_granted_scopes nonce spec_compliant".split(" ");
var yi = function (a, b, c) {
    b.origin = a.j;
    b.privileged = !0;
    b = Ah(b, wi);
    xh(S.dc, b, xi(a.j), function (d) {
        c(d)
    })
};

function xi(a) {
    var b = {},
        c = S.sf();
    if (c) {
        if (!c) throw Error("Session cookie value cannot be empty.");
        c = new cc(new dc, Ma(c));
        a = Ma(a);
        c.reset();
        c.update(a);
        a = c.digest();
        a = ac(a);
        b["X-Csrf-Token"] = a
    }
    return b
};
var zi = function () {};
I(zi, W);
zi.prototype.u = function (a) {
    a = void 0 === a ? {} : a;
    return ["gsi_gs", void 0 === a.origin ? null : a.origin, void 0 === a.clientId ? null : a.clientId].join(S.A)
};
zi.prototype.J = function (a, b, c) {
    var d = this;
    c = void 0 === c ?
    function () {} : c;
    W.prototype.J.call(this, a, b, function (e) {
        e ? !e.expires_at || e.expires_at <= (new Date).getTime() ? U(d).removeItem(d.u(a), function () {
            return c(null)
        }) : (e.expires_at = void 0, c(e)) : c(null)
    })
};
zi.prototype.K = function (a, b, c, d) {
    b && (b.expires_at = (new Date).getTime() + 864E5);
    W.prototype.K.call(this, a, b, c, d)
};
qi.prototype.gf = function (a) {
    var b = this;
    a = void 0 === a ? {} : a;
    var c = a.id,
        d = void 0 === a.params ? {} : a.params,
        e = function (r) {
            r && r.sessions ? (r = Ai(f, r.sessions), X(b.h, c, r)) : X(b.h, c, null)
        },
        f = d.loginHint;
    delete d.loginHint;
    var g = rh();
    if (g) {
        a = d.clientId;
        var h = d.request;
        d = d.sessionSelector;
        h.client_id = a;
        h.ss_domain = d.domain;
        var k = new zi,
            l = {
                clientId: a,
                origin: this.j
            };
        k.J(l, g, function (r) {
            r ? e(r) : yi(b.X, h, function (q) {
                !q || q.error ? e(null) : k.K(l, q, g, function () {
                    e(q)
                })
            })
        })
    } else e(null)
};

function Ai(a, b) {
    if (!b.length) return null;
    var c = a.toLowerCase();
    b = t(b);
    for (var d = b.next(); !d.done; d = b.next()) if (d = d.value, d.login_hint) {
        if (a === d.obfuscatedGaiaId) return d.login_hint;
        if (d.emails && d.emails.length) for (var e = t(d.emails), f = e.next(); !f.done; f = e.next()) if (c === f.value.toLowerCase()) return d.login_hint
    }
    return null
}
qi.prototype.ng = function (a) {
    Bi(this, a, !1)
};
qi.prototype.og = function (a) {
    Bi(this, a, !0)
};
var Bi = function (a, b, c) {
    document.requestStorageAccess && Ie(document.requestStorageAccess) ? document.hasStorageAccess().then(function (d) {
        if (d) X(a.h, b.id, {
            hasAccess: !0
        });
        else {
            d = new Xd({
                origin: a.j
            });
            var e = document.getElementById("container");
            (c ? d.Xf : d.Wf).call(d, e, function () {
                Uh(a.h);
                X(a.h, b.id, {
                    hasAccess: !0
                })
            }, function () {
                Uh(a.h);
                X(a.h, b.id, {
                    hasAccess: !1
                })
            });
            Th(a.h)
        }
    }, function (d) {
        H("StorageAccess check failed: " + d);
        X(a.h, b.id, {
            hasAccess: !1
        })
    }) : X(a.h, b.id, {
        hasAccess: !0
    })
};
qi.prototype.hf = function (a) {
    a = void 0 === a ? {} : a;
    a = void 0 === a.params ? {} : a.params;
    var b = !! a.clientId && !T(a.clientId),
        c = !! a.request,
        d = !! a.sessionSelector;
    return !!a.loginHint && b && c && d
};
qi.prototype.createPolicy = function () {
    var a = {
        I: [],
        za: [],
        Z: []
    };
    ti(this, a);
    a.I.push({
        method: "gsi:fetchLoginHint",
        l: Z(this, this.gf),
        aa: !0,
        C: Z(this, this.hf)
    });
    a.za.push({
        Aa: "itpNewGrant",
        l: Z(this, this.ng)
    });
    a.za.push({
        Aa: "itpRegrant",
        l: Z(this, this.og)
    });
    return a
};
S.ed = "/o/oauth2/iframerpc?action=sessionState";
S.Zc = "/o/oauth2/iframerpc?action=checkOrigin";
S.cd = "/o/oauth2/iframerpc?action=issueToken";
S.bd = "/o/oauth2/iframerpc?action=issueOnlineCode";
S.dc = "/o/oauth2/iframerpc?action=listSessions";
var Ci = function () {
    var a = Ke("origin"),
        b = !! Ke("supportBlocked3PCookies");
    if (!a) throw "Failed to get parent origin from URL hash!";
    var c = Ke("rpcToken");
    if (!c) throw "Failed to get rpcToken from URL hash!";
    var d = !! Ke("clearCache"),
        e = Ke("debug");
    Ge = "0" != e && !! e;
    (new qi(a, c, d, b)).start()
},
    Di = ["lso", "startIdpIFrame"],
    Ei = x;
Di[0] in Ei || "undefined" == typeof Ei.execScript || Ei.execScript("var " + Di[0]);
for (var Fi; Di.length && (Fi = Di.shift());) Di.length || void 0 === Ci ? Ei = Ei[Fi] && Ei[Fi] !== Object.prototype[Fi] ? Ei[Fi] : Ei[Fi] = {} : Ei[Fi] = Ci;
