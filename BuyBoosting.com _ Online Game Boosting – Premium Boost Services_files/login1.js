//  ABMNZN SDK 2021-04-26-p3vs6bcj
if (window.amazon == null || window.amazon.Login == null) {
    (function () {
        var h, l, n, q, w, x, y;

        function aa(a, b) {
            if (null === a || void 0 === a) a = {};
            for (var c = 1; c < arguments.length; c++) {
                var e = arguments[c];
                if (null !== e && void 0 !== e) for (var d in e) a[d] = e[d]
            }
            return a
        }
        function z(a, b) {
            var c = A.apply(void 0, arguments);
            ba("error", c);
            throw Error(c);
        }
        function A(a, b) {
            var c = arguments,
                e = 1;
            return a.replace(/%((%)|[sid])/g, function (a) {
                if (a[2]) return a[2];
                a = c[e++];
                "object" == typeof a && window.JSON && window.JSON.stringify && (a = window.JSON.stringify(a));
                return a
            })
        }

        function ba(a, b) {
            window.console && window.console.log && ("function" == typeof b && (b = b()), b = A("[Amazon.%s] %s", a, b), window.console.log(b))
        }
        function ca(a) {
            a && "delegate" === a || z("expected %s value to be %s but was %s", "options.response_type", "delegate", a)
        }
        function B(a, b, c) {
            null == b && z("missing %s", a);
            typeof b != c && z("expected %s to be a %s", a, c)
        }

        function C(a) {
            var b = document.getElementById(a);
            b || (b = document.createElement("div"), b.setAttribute("id", a), b.setAttribute("width", 0), b.setAttribute("height", 0), b.setAttribute("style", "position: absolute; left: -1000px; top: -1000px"), b.style.setAttribute && b.style.setAttribute("cssText", "position: absolute; left: -1000px; top: -1000px"), a = document.getElementById("amazon-root"), a || (a = document.createElement("div"), a.setAttribute("id", "amazon-root"), document.body.appendChild(a)), a.appendChild(b));
            return b
        }

        function fa() {
            var a = C("amazon-client-credentials-root"),
                b = ha(16),
                c = document.createElement("iframe");
            c.setAttribute("name", b);
            a.appendChild(c);
            0 == document.getElementsByName(b).length && (a.removeChild(c), c = document.createElement('<iframe name="' + b + '"/>'), a.appendChild(c));
            c.setAttribute("id", b);
            return b
        }
        function F() {
            this.a = []
        }
        F.prototype.wait = function (a, b) {
            this.a.push({
                ya: a,
                persist: !! b
            })
        };
        F.prototype.b = function (a) {
            var b = this.a;
            this.a = [];
            for (var c = 0; c < b.length; c++) b[c].persist && this.a.push(b[c]);
            for (c = 0; c < b.length; c++) b[c].ya.apply(void 0, arguments)
        };
        var G = function () {
            function a() {
                switch (f) {
                case "t":
                    return d("t"),
                    d("r"),
                    d("u"),
                    d("e"),
                    !0;
                case "f":
                    return d("f"),
                    d("a"),
                    d("l"),
                    d("s"),
                    d("e"),
                    !1;
                case "n":
                    return d("n"),
                    d("u"),
                    d("l"),
                    d("l"),
                    null
                }
                g("Unexpected '" + f + "'")
            }
            function b() {
                for (; f && " " >= f;) d()
            }
            function c() {
                var a, b = "",
                    c;
                if ('"' === f) for (; d();) {
                    if ('"' === f) return d(),
                    b;
                    if ("\\" === f) if (d(), "u" === f) {
                        for (a = c = 0; 4 > a; a += 1) {
                            var e = parseInt(d(), 16);
                            if (!isFinite(e)) break;
                            c = 16 * c + e
                        }
                        b += String.fromCharCode(c)
                    } else if ("string" === typeof m[f]) b += m[f];
                    else break;
                    else b += f
                }
                g("Bad string")
            }
            function e() {
                var a = "";
                "-" === f && (a = "-", d("-"));
                for (;
                "0" <= f && "9" >= f;) a += f,
                d();
                if ("." === f) for (a += "."; d() && "0" <= f && "9" >= f;) a += f;
                if ("e" === f || "E" === f) {
                    a += f;
                    d();
                    if ("-" === f || "+" === f) a += f,
                    d();
                    for (;
                    "0" <= f && "9" >= f;) a += f,
                    d()
                }
                a = +a;
                if (isFinite(a)) return a;
                g("Bad number")
            }
            function d(a) {
                a && a !== f && g("Expected '" + a + "' instead of '" + f + "'");
                f = r.charAt(k);
                k += 1;
                return f
            }
            function g(a) {
                throw {
                    name: "SyntaxError",
                    message: a,
                    Ka: k,
                    text: r
                };
            }
            var k, f, m = {
                '"': '"',
                "\\": "\\",
                "/": "/",
                s: "\b",
                I: "\f",
                n: "\n",
                r: "\r",
                t: "\t"
            },
                r;
            var u = function () {
                b();
                switch (f) {
                case "{":
                    a: {
                        var k = {};
                        if ("{" === f) {
                            d("{");
                            b();
                            if ("}" === f) {
                                d("}");
                                var m = k;
                                break a
                            }
                            for (; f;) {
                                m = c();
                                b();
                                d(":");
                                Object.hasOwnProperty.call(k, m) && g('Duplicate key "' + m + '"');
                                k[m] = u();
                                b();
                                if ("}" === f) {
                                    d("}");
                                    m = k;
                                    break a
                                }
                                d(",");
                                b()
                            }
                        }
                        g("Bad object");
                        m = void 0
                    }
                    return m;
                case "[":
                    a: {
                        m = [];
                        if ("[" === f) {
                            d("[");
                            b();
                            if ("]" === f) {
                                d("]");
                                break a
                            }
                            for (; f;) {
                                m.push(u());
                                b();
                                if ("]" === f) {
                                    d("]");
                                    break a
                                }
                                d(",");
                                b()
                            }
                        }
                        g("Bad array");
                        m = void 0
                    }
                    return m;
                case '"':
                    return c();
                case "-":
                    return e();
                default:
                    return "0" <= f && "9" >= f ? e() : a()
                }
            };
            return function (a, c) {
                r = a;
                k = 0;
                f = " ";
                a = u();
                b();
                f && g("Syntax error");
                return "function" === typeof c ?
                function O(a, b) {
                    var d, e = a[b];
                    if (e && "object" === typeof e) for (d in e) if (Object.prototype.hasOwnProperty.call(e, d)) {
                        var f = O(e, d);
                        void 0 !== f ? e[d] = f : delete e[d]
                    }
                    return c.call(a, b, e)
                }({
                    "": a
                }, "") : a
            }
        }(),
            H = function () {
                function a(a) {
                    return 10 > a ? "0" + a : a
                }
                function b(a) {
                    e.lastIndex = 0;
                    return e.test(a) ? '"' + a.replace(e, function (a) {
                        var b = k[a];
                        return "string" === typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                    }) + '"' : '"' + a + '"'
                }
                function c(a, e) {
                    var k = d,
                        p = e[a];
                    p && "object" === typeof p && "function" === typeof p.toJSON && (p = p.toJSON(a));
                    "function" === typeof f && (p = f.call(e, a, p));
                    switch (typeof p) {
                    case "string":
                        return b(p);
                    case "number":
                        return isFinite(p) ? String(p) : "null";
                    case "boolean":
                    case "null":
                        return String(p);
                    case "object":
                        if (!p) return "null";
                        d += g;
                        var m = [];
                        if ("[object Array]" === Object.prototype.toString.apply(p)) {
                            var r = p.length;
                            for (a = 0; a < r; a += 1) m[a] = c(a, p) || "null";
                            e = 0 === m.length ? "[]" : d ? "[\n" + d + m.join(",\n" + d) + "\n" + k + "]" : "[" + m.join(",") + "]";
                            d = k;
                            return e
                        }
                        if (f && "object" === typeof f) for (r = f.length, a = 0; a < r; a += 1) {
                            if ("string" === typeof f[a]) {
                                var E = f[a];
                                (e = c(E, p)) && m.push(b(E) + (d ? ": " : ":") + e)
                            }
                        } else for (E in p) Object.prototype.hasOwnProperty.call(p, E) && (e = c(E, p)) && m.push(b(E) + (d ? ": " : ":") + e);
                        e = 0 === m.length ? "{}" : d ? "{\n" + d + m.join(",\n" + d) + "\n" + k + "}" : "{" + m.join(",") + "}";
                        d = k;
                        return e
                    }
                }
                "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
                    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null
                }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
                    return this.valueOf()
                });
                var e = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    d, g, k = {
                        "\b": "\\b",
                        "\t": "\\t",
                        "\n": "\\n",
                        "\f": "\\f",
                        "\r": "\\r",
                        '"': '\\"',
                        "\\": "\\\\"
                    },
                    f;
                return function (a, b, e) {
                    var k;
                    g = d = "";
                    if ("number" === typeof e) for (k =
                    0; k < e; k += 1) g += " ";
                    else "string" === typeof e && (g = e);
                    if ((f = b) && "function" !== typeof b && ("object" !== typeof b || "number" !== typeof b.length)) throw Error("JSON.stringify");
                    return c("", {
                        "": a
                    })
                }
            }();

        function J(a) {
            var b = "",
                c;
            for (c in a) b && (b += "&"),
            b += encodeURIComponent(c) + "=" + encodeURIComponent(a[c] + "");
            return b
        }(function () {
            function a(a, c) {
                for (var b = 0; b < c.length; b++) {
                    var d = c[b];
                    "" == d || a.b.hasOwnProperty(d) || (a.a.push(d), a.b[d] = 1)
                }
            }
            l = function (b) {
                this.a = [];
                b = "string" == typeof b ? b.split(/\s+/) : b;
                this.b = {};
                a(this, b)
            };
            l.prototype.contains = function (a) {
                for (var b = 0; b < a.a.length; b++) if (!this.b.hasOwnProperty(a.a[b])) return !1;
                return !0
            };
            l.prototype.add = function (b) {
                a(this, b.a)
            };
            l.prototype.g = function (a) {
                for (var b = 0; b < this.a.length; b++) a(this.a[b])
            };
            l.prototype.toString = function () {
                return this.a.join(" ")
            }
        })();
        (function () {
            n = {};
            var a = null;
            n.fa = function () {
                return a
            };
            n.j = function (b) {
                B("domain", b, "string");
                b = b.replace(/^\s+|\s+$/g, "");
                var c = "." + window.location.hostname;
                "." != b.charAt(0) && (b = "." + b);
                c.indexOf(b) != c.length - b.length && z("Site domain must contain the current page's domain");
                a = b
            };
            n.R = function () {};
            n.R.prototype.getItem = function () {};
            n.R.setItem = function () {};
            n.R.removeItem = function () {}
        })();
        (function () {
            function a() {}
            a.prototype.getItem = function (a) {
                a = (new RegExp("(?:^|;)\\s*" + escape(a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*)(?:;|$)")).exec(document.cookie);
                return null == a ? null : unescape(a[1])
            };
            a.prototype.setItem = function (a, c, e) {
                var b = null == e ? "Fri, 31 Dec 9999 23:59:59 GMT" : (new Date((new Date).getTime() + 1E3 * e)).toGMTString();
                var g = n.fa();
                g = null == g ? "" : ";Domain=" + g;
                var k = ia(M(window.location.href)) ? "" : ";Secure";
                document.cookie = a + "=" + escape(c) + ("session" == e ? "" : ";Expires=" + b) + g + ";Path=/" + k
            };
            a.prototype.removeItem = function (a) {
                n.f.setItem(a, "null", 0)
            };
            n.f = new a
        })();
        (function () {
            function a(a) {
                this.a = a
            }
            a.prototype.getItem = function (a) {
                return this.a.getItem(a)
            };
            a.prototype.setItem = function (a, c, e) {
                this.a.setItem(a, c, e)
            };
            a.prototype.removeItem = function (a) {
                n.f.removeItem(a)
            };
            n.C = new a(n.f)
        })();
        q = {
            za: function (a) {
                var b = n.f.getItem("amazon_Login_auth_code_scope_cache");
                if (b) return b = G(b),
                b[a]
            },
            ua: function (a, b) {
                var c = {};
                c[a] = b;
                n.C.setItem("amazon_Login_auth_code_scope_cache", H(c), 240)
            },
            va: function (a, b, c) {
                "bearer" == a.token_type && (a = H({
                    access_token: a.access_token,
                    max_age: c,
                    expiration_date: (new Date).getTime() + 1E3 * c,
                    client_id: w.ea(),
                    scope: b
                }), n.C.setItem("amazon_Login_state_cache", a, "session"))
            },
            T: function () {
                var a = n.C.getItem("amazon_Login_state_cache");
                return null != a && (a = G(a), null != a && a.expiration_date > (new Date).getTime()) ? (a.scope = new l(a.scope), a) : null
            },
            S: function () {
                n.C.removeItem("amazon_Login_state_cache")
            }
        };

        function N() {
            return window.XMLHttpRequest && "withCredentials" in new window.XMLHttpRequest || "undefined" !== typeof window.XDomainRequest ? !0 : !1
        }

        function P(a, b, c, e, d, g) {
            this.h = new Q(a, b, c);
            "string" == typeof e && e || z("missing or invalid path: %s", e);
            this.g = e;
            "object" == typeof d && (d = J(d));
            d && "string" != typeof d && z("invalid query: %s", d);
            this.b = d || "";
            "object" == typeof g && (g = J(g));
            g && "string" != typeof g && z("invalid fragment: %s", g);
            this.a = g || ""
        }

        function M(a) {
            var b = function () {
                var b = document.createElement("div");
                b.innerHTML = "<a></a>";
                b.firstChild.href = a;
                b.innerHTML = b.innerHTML;
                return b.firstChild
            }();
            "" == b.host && (b.href = b.href);
            return new P(b.protocol, b.hostname, function () {
                var a = b.port;
                a && "0" != a || (a = null);
                return a
            }(), function () {
                var a = b.pathname;
                a ? "/" != a[0] && (a = "/" + a) : a = "/";
                return a
            }(), b.search.substring(1), b.href.split("#")[1] || "")
        }
        h = P.prototype;
        h.scheme = function () {
            return this.h.scheme()
        };
        h.host = function () {
            return this.h.host()
        };
        h.port = function () {
            return this.h.port()
        };
        h.path = function () {
            return this.g
        };
        h.query = function () {
            return this.b
        };
        h.u = function () {
            return this.a
        };

        function ia(a) {
            var b = "http" == a.h.scheme();
            a = a.h.host();
            return b && ("localhost" == a || "127.0.0.1" == a)
        }
        h.toString = function () {
            var a = this.h.toString();
            a += this.g;
            a += this.b ? "?" + this.b : "";
            return a += this.a ? "#" + this.a : ""
        };

        function ja(a, b) {
            return new P(void 0 !== b.scheme ? b.scheme : a.scheme(), void 0 !== b.host ? b.host : a.host(), void 0 !== b.port ? b.port : a.port(), void 0 !== b.path ? b.path : a.path(), void 0 !== b.query ? b.query : a.query(), void 0 !== b.u ? b.u : a.u())
        }

        function Q(a, b, c) {
            var e;
            "string" == typeof a && (e = a.match(/^(https?)(:(\/\/)?)?$/i)) || z("missing or invalid scheme: %s", a);
            this.a = "http" == e[1] ? "http" : "https";
            if (a = "string" == typeof b && b)"string" == typeof b && b || z("missing or invalid input: %s", b),
            a = 0 != b.replace(/^\s+|\s+$/g, "").length;
            a || z("missing or invalid host: %s", b);
            this.g = b;
            c && ((c + "").match(/^\d+$/) || z("invalid port: %s", c), 80 == c && "http" == this.a || 443 == c && "https" == this.a) && (c = null);
            this.b = c ? c + "" : null
        }
        Q.prototype.scheme = function () {
            return this.a
        };
        Q.prototype.host = function () {
            return this.g
        };
        Q.prototype.port = function () {
            return this.b
        };
        Q.prototype.toString = function () {
            var a = this.a + "://";
            a += this.g;
            return a += this.b ? ":" + this.b : ""
        };

        function R(a, b, c, e) {
            return new P(a.a, a.g, a.b, b, c, e)
        }
        function ha(a) {
            for (var b = "", c = 0; c < a; c++) b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 * Math.random()));
            return b
        }
        var S = {},
            T = null;

        function ka(a, b) {
            var c = la(a);
            var e = a.host().replace(/[^a-z0-9]/ig, "_");
            a.port() && (e += "_" + a.port());
            e = A("amazon-proxy-%s-%s", a.scheme(), e);
            var d = document.getElementById(e);
            d || (d = document.createElement("iframe"), d.setAttribute("id", e), d.setAttribute("name", e), d.setAttribute("src", ma(a, c).toString()), C("amazon-proxy-root").appendChild(d));
            c = ha(16);
            S[c] || (S[c] = new F);
            S[c].wait(b, !1);
            b = {
                uri: na().toString(),
                proxy: e,
                topic: c,
                version: "3"
            };
            return R(a, "/sdk/2021-04-26-p3vs6bcj/topic.html", b, "")
        }

        function la(a) {
            T || (T = sa(), T.ja(a, function (a, c) {
                (a = S[a]) && a.b(c)
            }));
            return T
        }
        function na() {
            return ja(M(window.location.href), {
                query: "",
                u: ""
            })
        }
        function ma(a, b) {
            b = {
                uri: na().toString(),
                tr: b.name()
            };
            return R(a, "/ap/oa/proxy.html", {
                version: "3",
                build: "2021-04-26-p3vs6bcj"
            }, b)
        }
        var va = /^ABMNZNXDC;([\w\d_\-]+);(.*)$/;

        function wa(a) {
            if ("string" === typeof a) {
                var b = a.match(va);
                if (b) {
                    a = {};
                    a.id = b[1];
                    var c = {};
                    b = b[2].split("&");
                    for (var e = 0; e < b.length; e++) {
                        var d = b[e].split("=");
                        2 == d.length && (c[d[0]] = decodeURIComponent(d[1].replace(/\+/g, " ")))
                    }
                    a.data = c;
                    return a
                }
            }
            return null
        }
        function sa() {
            var a = window.postMessage ? "pm" : "fr";
            window.__toucanForceTransport && (a = window.__toucanForceTransport);
            if ("pm" == a) a = new U;
            else if ("fr" == a) a = new Y;
            else throw z("unknown transport: %s", a),
            Error();
            return a
        }
        function U() {
            this.a = void 0
        }
        U.prototype.name = function () {
            return "pm"
        };

        function ya(a) {
            if (void 0 === a.a) {
                var b = a.a = new F;
                a = function (a) {
                    var c;
                    (c = wa(a.data)) && b.b(a.origin, c.id, c.data)
                };
                window.addEventListener ? window.addEventListener("message", a, !1) : window.attachEvent ? window.attachEvent("onmessage", a) : z("cannot attach message event")
            }
        }
        U.prototype.ja = function (a, b) {
            ya(this);
            var c = a.toString();
            this.a.wait(function (a, d, g) {
                var e = M(window.location.href).h.toString();
                a != c && a != e || b(d, g)
            }, !0)
        };
        U.prototype.send = function (a, b, c) {
            var e = a.h,
                d = G(H(c));
            setTimeout(function () {
                window.parent.postMessage(A("%s;%s;%s", "ABMNZNXDC", b, J(d)), e.toString())
            }, 1)
        };

        function Y() {}
        Y.prototype.name = function () {
            return "fr"
        };
        Y.prototype.ja = function (a, b) {
            window.__toucanInvokeFragment = function (a, e) {
                b(a, e)
            }
        };
        Y.prototype.send = function (a, b, c) {
            var e = a.query();
            (e = e || "") && (e += "&");
            e = e + "ABMNZNXDC" + ("=" + ha(8));
            a = ja(a, {
                query: e,
                u: A("%s;%s;%s", "ABMNZNXDC", b, J(c))
            });
            b = document.createElement("iframe");
            b.setAttribute("src", a.toString());
            document.body.appendChild(b)
        };
        var za = window.location.href.split("#")[1] || "";
        if (za) {
            var Aa = wa(za);
            Aa && (document.documentElement.style.display = "none", "function" == typeof window.parent.parent.__toucanInvokeFragment && window.parent.parent.__toucanInvokeFragment(Aa.id, Aa.data))
        }(function () {
            function a(a) {
                var b = a.match(xa);
                b || z("invalid domain: %s", a);
                var c = b[2] ? b[2].toLowerCase() : "https";
                "https" != c && z("invalid domain: %s; scheme must be https", a);
                a = b[3];
                a.match(/^amazon\.[a-z\.]+$/) && (a = "www." + a);
                return new Q(c, a, b[5])
            }
            function b(a) {
                a = aa({
                    interactive: void 0,
                    popup: !0,
                    response_type: "token",
                    response_mode: void 0,
                    delegated_requests: void 0,
                    direct_post_uri: void 0,
                    state: void 0,
                    scope: void 0,
                    scope_data: void 0,
                    optional_scope: void 0,
                    "com.amazon.oauth2.options": void 0,
                    workflow_data: void 0,
                    pkce: !1,
                    code_challenge: void 0,
                    code_challenge_method: "S256"
                }, a || {});
                B("options.response_type", a.response_type, "string");
                a.response_mode && B("options.response_mode", a.response_mode, "string");
                a.direct_post_uri && B("options.direct_post_uri", a.direct_post_uri, "string");
                !0 === a[t.ra] && a[t.P] === t.Z && a.interactive !== v.NEVER && !0 !== a[t.v] && N() && (a[t.v] = !0, a[t.O] = !0);
                if (!0 === a[t.v] || a[t.l]) a[t.P] = "code";
                var b = a.delegated_requests;
                if (b) {
                    ca(a.response_type);
                    a.scope && z("options.scope is not supported for delegated authorization");
                    a.scope_data && z("options.scope_data is not supported for delegated authorization");
                    a.optional_scope && z("options.optional_scope is not supported for delegated authorization");
                    a.interactive ? a.interactive != v.ALWAYS && z("options.interactive should be '" + v.ALWAYS + "' for delegated authorization") : a.interactive = v.ALWAYS;
                    for (var oa = {}, f = 0; f < b.length; f++) {
                        var k = b[f],
                            m = c(a, k);
                        oa[k.request_id] = m
                    }
                    a.delegated_requests = oa
                } else if (e(a, "missing options.scope"), d(a), g(a), a.interactive ? a.interactive != v.M && a.interactive != v.ALWAYS && a.interactive != v.NEVER && z("expected options.interactive to be one of '" + v.M + "', '" + v.ALWAYS + "', or '" + v.NEVER + "'") : a.interactive = v.M, a.optional_scope) {
                    a.optional_scope.constructor !== Array && "string" != typeof a.optional_scope && z("expected options.optional_scope to be a string or array");
                    a.interactive != v.NEVER && z("options.optional_scope is only supported for options.interactive = never");
                    b = new l(a.optional_scope);
                    a.scope.add(b);
                    var p = {
                        id_token: {}
                    };
                    b.g(function (a) {
                        p.id_token[a] = {
                            essential: !1
                        }
                    });
                    a.optional_scope = H(p)
                }
                return a
            }
            function c(a, b) {
                b.response_mode && z("response_mode is not supported in delegated requests");
                b.direct_post_uri && z("direct_post_uri is not supported in delegated requests");
                "popup" in b && z("popup is not supported in delegated requests");
                b.interactive && z("interactive mode is not supported in delegated requests");
                b.optional_scope && z("optional_scope is not supported in delegated requests");
                b.delegated_requests && z("delegated_requests is not supported in delegated requests");
                null == b.response_type && (b.response_type = "token");
                e(b, "missing 'scope' in delegated request");
                b.scope = b.scope.toString();
                d(b);
                g(a);
                B("request_id", b.request_id, "string");
                b.client_id && !b.client_id.match(O) && z("invalid client_id format: %s", b.client_id);
                a = {};
                for (var c in b)"request_id" != c && (a[c] = b[c]);
                return a
            }
            function e(a, b) {
                a.scope || z(b);
                a.scope.constructor !== Array && "string" != typeof a.scope && z("expected scope to be a string or array");
                a.scope = new l(a.scope)
            }
            function d(a) {
                a.scope_data && (a.scope_data =
                H(a.scope_data))
            }
            function g(a) {
                if (a.workflow_data) {
                    var b = {};
                    b.workflow_data = a.workflow_data;
                    a["com.amazon.oauth2.options"] = H(b)
                }
            }
            function k(a) {
                var b = (void 0 !== window.screenX ? window.screenX : window.screenLeft) + Math.floor(((void 0 !== window.outerWidth ? window.outerWidth : document.documentElement.clientWidth) - 800) / 2),
                    c = (void 0 !== window.screenY ? window.screenY : window.screenTop) + Math.floor(((void 0 !== window.outerHeight ? window.outerHeight : document.documentElement.clientHeight) - 540) / 2);
                b = A("left=%s,top=%s,width=%s,height=%s,scrollbars=1", 0 > b ? 0 : b, 0 > c ? 0 : c, 800, 540);
                L = window.open(a.toString(), "amazonloginpopup", b)
            }
            function f() {
                null != L && ("function" == typeof L.close && L.close(), L = null)
            }
            function m(a, b, c) {
                var d = {
                    client_id: V,
                    redirect_uri: b,
                    response_type: a.response_type,
                    language: pa,
                    ui_locales: qa
                };
                a["com.amazon.oauth2.options"] && (d["com.amazon.oauth2.options"] = a["com.amazon.oauth2.options"]);
                a.response_mode && (d.response_mode = a.response_mode);
                a.scope && (d.scope = a.scope.toString());
                a.direct_post_uri && (d.direct_post_uri = a.direct_post_uri);
                a.scope_data && (d.scope_data = a.scope_data);
                ra && (d.sandbox = !0);
                a.state && (d.state = a.state);
                c && (d.exac = c);
                a.delegated_requests && (d.delegated_requests = H(a.delegated_requests));
                if ((c = d.scope) && -1 !== c.indexOf("payments:widget")) {
                    c = d.sandbox;
                    var e = d.scope_data;
                    try {
                        var f = e && "" !== e ? JSON.parse(e) : {}
                    } catch (Ea) {
                        f = {}
                    }
                    Ba(f, c, b); - 1 === JSON.stringify(f).indexOf("payments:widget") && (f = {}, Ba(f, c, b));
                    b = JSON.stringify(f);
                    d.scope_data = b
                }
                a[t.l] && (d[t.l] = a[t.l], d[t.N] = a[t.N]);
                !0 !== a[t.v] || a[t.l] || (d[t.l] = x.Aa(d.client_id, d.redirect_uri), d[t.N] = "S256");
                a = R(K, "/ap/oa", d);
                if (8196 < a.toString().length) throw console.error("URI has exceeded url length limit of 8196. Current Length of the URI: " + a.toString().length),
                400;
                return a
            }
            function r(a, b, c) {
                W = !1;
                b.access_token ? w.aa(b, b.scope) : c && n.f.removeItem(w.m);
                b.code && !0 === a.a[t.v] && q.ua(b.code, b.scope);
                a.na(b);
                a = da;
                da = [];
                for (b = 0; b < a.length; b++) D(a[b])
            }
            function u(a, b, c, d) {
                var e = J(a);
                !c && d ? (a = M(b), a = ja(a, {
                    u: e
                })) : (b += -1 == b.indexOf("?") ? "?" : "&", b += e, a = M(b));
                e = M(window.location.href);
                "https" == a.scheme() || ia(a) || z("attempted redirect to %s but scheme is not HTTPS", b);
                a.host() != e.host() && z("attempted redirect to %s but it does not match current host %s", a.host(), e.host());
                !c && d ? window.top.location.href = a.toString() : (f(), window.location.href = b)
            }
            function p(a) {
                var b = this;
                this.a = a;
                this.g = null;
                this.W = [];
                this.V = null;
                this.b = {
                    status: null,
                    onComplete: function (a) {
                        "string" != typeof a && "function" != typeof a && z("onComplete expects handler parameter to be a function or a string");
                        var c = b.b.status == X.Y;
                        "string" == typeof a ? c ? u(b.V, a, b.a.popup, "token" == b.a.response_type) : b.g = a : "function" == typeof a && (c ? setTimeout(function () {
                            a(b.b)
                        }, 0) : b.W.push(a));
                        return b.b
                    }
                }
            }
            function D(a) {
                var b = a.a,
                    c = null;
                if (b.delegated_requests) I(a, null);
                else {
                    if (b.interactive == v.ALWAYS) q.S();
                    else {
                        var d = null;
                        w.ma() && (d = n.f.getItem(w.m));
                        if (c = q.T())"token" == b.response_type && b.scope.add(c.scope),
                        d ? d != c.access_token && (q.S(), c = null) : d = c.access_token;
                        if (c && c.scope.contains(b.scope) && (b[t.P] === t.Z || !0 === b[t.O])) {
                            var e = {
                                access_token: c.access_token,
                                token_type: "bearer",
                                expires_in: Math.floor((c.expiration_date - (new Date).getTime()) / 1E3),
                                scope: c.scope.toString()
                            };
                            null != b.state && (e.state = b.state)
                        } else if (b.interactive == v.NEVER && b.popup) {
                            if (W) {
                                da.push(a);
                                a.X(X.sa);
                                return
                            }
                            if (d) {
                                E(a, d);
                                return
                            }
                            e = {
                                error: "invalid_grant",
                                error_description: "invalid grant"
                            }
                        }
                        if (e) {
                            setTimeout(function () {
                                a.na(e)
                            }, 0);
                            return
                        }
                    }
                    I(a, d)
                }
            }
            function I(a, b) {
                var c = a.a;
                if (c.popup) {
                    W = !0;
                    var d = ka(K, function (b) {
                        f();
                        b.code && !0 === c[t.O] ? x.la(b.code, function (c) {
                            !0 === c.success && (c.scope = b.scope);
                            c.success = null;
                            r(a, c, !0)
                        }) : r(a, b, !0)
                    });
                    b = m(a.a, d, b);
                    k(b, a)
                } else(d = a.g) || z("Missing redirectUrl for redirect flow"),
                window.top.location.href = m(c, M(d + ""), b).toString()
            }
            function E(a, b) {
                W = !0;
                var c = C("amazon-client-credentials-root"),
                    d = fa(),
                    e = document.createElement("form");
                c.appendChild(e);
                e.setAttribute("method", "POST");
                e.setAttribute("target", d);
                var f = ka(K, function (b) {
                    c.removeChild(e);
                    var f = document.getElementById(d);
                    null != f && null != f.parentNode && f.parentNode.removeChild(f);
                    null == b && (b = {
                        error: "server_error",
                        description: "Server error."
                    });
                    r(a, b, !1)
                }),
                    g = a.a;
                b = {
                    client_id: V,
                    exac: b,
                    grant_type: "client_credentials",
                    redirect_uri: f,
                    response_type: g.response_type,
                    scope: g.scope
                };
                null != g.state && (b.state = g.state);
                null != g.response_mode && (b.response_mode = g.response_mode);
                null != g.direct_post_uri && (b.direct_post_uri = g.direct_post_uri);
                null != g.scope_data && (b.scope_data = g.scope_data);
                null != g.optional_scope && (b.claims = g.optional_scope);
                null != g["com.amazon.oauth2.options"] && (b["com.amazon.oauth2.options"] = g["com.amazon.oauth2.options"]);
                e.setAttribute("action", R(K, "/ap/oa", b).toString());
                e.submit()
            }
            w = {
                F: {
                    NorthAmerica: "NA",
                    Europe: "EU",
                    AsiaPacific: "APAC",
                    China: "CN"
                },
                pa: {
                    v: "pkce",
                    N: "code_challenge_method",
                    l: "code_challenge",
                    P: "response_type",
                    O: "convert_implicit_to_pkce",
                    ra: "popup",
                    Z: "token"
                },
                m: "amazon_Login_accessToken"
            };
            var t = w.pa,
                O = /^[\w\-\.]+$/,
                xa = /^((http|https):\/\/)?([a-z0-9\-\.]+)(:(\d+))?\/?$/i,
                v = {
                    ALWAYS: "always",
                    M: "auto",
                    NEVER: "never"
                },
                L = null,
                W = !1,
                da = [],
                X = {
                    sa: "queued",
                    oa: "in_progress",
                    Y: "complete"
                },
                V = void 0;
            w.ea = function () {
                return V
            };
            w.Da = function (a) {
                a.match(O) || z("invalid client ID: %s", a);
                V = a
            };
            var ea = "na.account.amazon.com",
                K = new Q("https", ea, null),
                ta = new Q("https", "api.amazon.com", null);
            w.fa = function () {
                return ea
            };
            w.da = function () {
                return ta
            };
            var ra = !1;
            w.Ha = function (a) {
                "number" == typeof a && (a = !! a);
                B("sandboxMode", a, "boolean");
                ra = a
            };
            w.j = function (b) {
                K = a(b);
                ea = b
            };
            w.B = function (b) {
                ta = a(b)
            };
            w.Ga = function (a) {
                a && (a === w.F.Europe ? (w.j("https://eu.account.amazon.com"), w.B("https://api.amazon.co.uk")) : a === w.F.AsiaPacific ? (w.j("https://apac.account.amazon.com"), w.B("https://api.amazon.co.jp")) : a === w.F.China ? (w.j("https://www.amazon.cn"), w.B("https://api.amazon.cn")) : (w.j("https://na.account.amazon.com"), w.B("https://api.amazon.com")))
            };
            var pa = "";
            w.Ea = function (a) {
                pa = a
            };
            var qa = "";
            w.Fa = function (a) {
                qa = a
            };
            w.Ba = function () {
                return K
            };
            var ua = !1;
            w.ma = function () {
                return ua
            };
            w.Ia = function (a) {
                null == a ? z("missing useCookie") : "number" == typeof a ? a = !! a : "boolean" != typeof a && z("expected useCookie to be a boolean");
                ua = a
            };
            w.aa = function (a, b) {
                var c = parseInt(a.expires_in, 10);
                c = 60 >= c ? c : c - Math.min(Math.floor(.1 * c), 300);
                q.va(a, b, c);
                w.ma() ? n.f.setItem(w.m, a.access_token, c) : n.f.removeItem(w.m)
            };
            p.prototype.na = function (a) {
                this.V = a;
                aa(this.b, a);
                this.X(X.Y);
                for (a = 0; a < this.W.length; a++) this.W[a](this.b);
                null != this.g && u(this.V, this.g, this.a.popup, "token" == this.a.response_type)
            };
            p.prototype.X = function (a) {
                this.b.status = a
            };
            w.$ = function (a, c) {
                2 > arguments.length && z("authorize expects two arguments (options, next)");
                a && "object" != typeof a && z("authorize expects options parameter to be an object");
                null != c && "function" != typeof c && "string" != typeof c && z("authorize expects next parameter to be a function or a string");
                a = b(a);
                var d = new p(a),
                    e = d.b;
                d.X(X.oa);
                if (null != c) e.onComplete(c);
                a.popup || "string" == typeof c ? D(d) : z("next must be redirect URI if !options.popup");
                return e
            }
        })();
        (function () {
            function a(a, c) {
                try {
                    var b = G(a)
                } catch (d) {
                    b = null
                }
                b && b.Error ? (a = {
                    success: !1
                }, a.error = A("%s: %s", b.Error.Code || "UnknownError", b.Error.Message || "An unknown error occurred"), c(a)) : b && b.Profile ? (a = {
                    success: !0
                }, a.profile = b.Profile, c(a)) : (a = {
                    success: !1,
                    error: "UnknownError: Incomprehensible response from profile endpoint"
                }, c(a))
            }
            y = {
                ka: function (b, c) {
                    if (null == c && "function" == typeof b) c = b,
                    w.$({
                        scope: "profile"
                    }, function (a) {
                        null == a.error ? y.ka(a.access_token, c) : c({
                            success: !1,
                            error: a.error
                        })
                    });
                    else if (B("accessToken", b, "string"), B("callback", c, "function"), N()) {
                        b = R(w.Ba(), "/ap/user/profile", {
                            access_token: b
                        }, "").toString();
                        if (window.XDomainRequest) {
                            var e = new window.XDomainRequest;
                            e.onload = function () {
                                a(e.responseText, c)
                            }
                        } else {
                            var d = !1;
                            e = new window.XMLHttpRequest;
                            e.onreadystatechange = function () {
                                d || 4 != e.readyState || (d = !0, a(e.responseText, c))
                            }
                        }
                        e.open("GET", b, !0);
                        e.send()
                    } else c({
                        success: !1,
                        error: "UnsupportedOperation: Cannot retrieve profile in this browser"
                    })
                }
            }
        })();
        (function () {
            function a(a, b, c) {
                try {
                    var d = G(a);
                    n.f.removeItem(x.D)
                } catch (m) {
                    d = null
                }
                a = {};
                d && d.Error ? (a.success = !1, a.error = A("%s: %s", d.Error.Code || "UnknownError", d.Error.Message || "An unknown error occurred")) : d && d.access_token ? (a.success = !0, a.access_token = d.access_token, a.token_type = d.token_type, a.expires_in = d.expires_in, (b = q.za(b)) && w.aa(d, b)) : (a.success = !1, a.error = "UnknownError: Incomprehensible response from token endpoint");
                c(a)
            }
            function b(a, b) {
                a = {
                    grant_type: "authorization_code",
                    client_id: a.client_id,
                    redirect_uri: decodeURIComponent(a.redirect_uri),
                    code_verifier: a.code_verifier,
                    code: b
                };
                return H(a)
            }
            function c() {
                var a = n.f.getItem(x.D);
                return a ? G(a) : null
            }
            function e() {
                var a = q.T();
                return a ? {
                    success: !0,
                    access_token: a.access_token,
                    token_type: "bearer",
                    expires_in: Math.floor((a.expiration_date - (new Date).getTime()) / 1E3),
                    scope: a.scope.toString()
                } : null
            }
            x = {
                D: "amazon_Login_pkce_params",
                qa: 240,
                Aa: function (a, b) {
                    var d, e = c();
                    e && (e.client_id != a ? n.f.removeItem(x.D) : e.code_verifier && (d = e.code_verifier));
                    if (!d) {
                        d = "";
                        for (e = 128; 0 < e; --e) d += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" [Math.floor(62 * Math.random())];
                        d = encodeURIComponent(d)
                    }
                    a = {
                        client_id: a,
                        code_verifier: d,
                        redirect_uri: encodeURIComponent(b)
                    };
                    n.f.setItem(x.D, H(a), x.qa);
                    a = Z.hash.K.hash(d);
                    return Z.i.ta.J(a)
                },
                la: function (d, g) {
                    if (null == d && null == g) return e();
                    B("code", d, "string");
                    B("callback", g, "function");
                    var k = {};
                    if (N()) {
                        var f = c();
                        if (f) {
                            k = b(f, d);
                            var m = !1;
                            if (window.XDomainRequest) {
                                var r = new window.XDomainRequest;
                                r.onload = function () {
                                    a(r.responseText, d, g)
                                }
                            } else r = new window.XMLHttpRequest,
                            r.onreadystatechange = function () {
                                m || 4 != r.readyState || (m = !0, a(r.responseText, d, g))
                            };
                            r.open("POST", w.da() + "/auth/O2/token", !0);
                            "function" === typeof r.setRequestHeader && r.setRequestHeader("Content-Type", "application/json");
                            r.send(k)
                        } else k.success = !1,
                        k.error = "UnsupportedOperation: Cookie amazon_Login_pkce_params not found. Cannot retrieve token without cookie.",
                        g(k)
                    } else k.success = !1,
                    k.error = "UnsupportedOperation: Cannot retrieve token in this browser",
                    g(k)
                }
            }
        })();
        (function () {
            function a(a, d) {
                N() || c("UnsupportedOperation: Cannot remotely logout in this browser", d);
                var e = R(w.da(), "/auth/relyingPartyLogout", null, null).toString(),
                    k = {};
                k.token = a;
                k.token_type = "bearer";
                if (window.XDomainRequest) {
                    var f = new window.XDomainRequest;
                    f.onload = function () {
                        b(f.responseText, d)
                    }
                } else {
                    var m = !1;
                    f = new window.XMLHttpRequest;
                    f.onreadystatechange = function () {
                        m || 4 != f.readyState || (m = !0, b(f.responseText, d))
                    }
                }
                f.open("POST", e, !0);
                f.send(H(k))
            }
            function b(a, b) {
                try {
                    var d = G(a).response
                } catch (f) {
                    d =
                    void 0
                }
                if (!d || d.error) {
                    a = "UnknownError";
                    var e = "An unknown error ocurred";
                    d && d.error && d.error.code && d.error.message && (a = d.error.code, e = d.error.message);
                    e = A("%s: %s", a, e)
                }
                c(e, b)
            }
            function c(a, b) {
                a && ba("logout", a);
                b && "function" == typeof b && b()
            }
            w.Ca = function () {
                var b = n.f.getItem(w.m),
                    c = q.T();
                b && n.f.removeItem(w.m);
                !b && c && (b = c.access_token);
                q.S();
                b && a(b, void 0)
            }
        })();
        window.amazon = window.amazon || {};
        window.amazon.Login = window.amazon.Login || {};
        window.amazon.Login.getClientId = function () {
            return w.ea()
        };
        window.amazon.Login.setClientId = function (a) {
            return w.Da(a)
        };
        window.amazon.Login.setDomain = function (a) {
            return w.j(a)
        };
        window.amazon.Login.setAPIDomain = function (a) {
            return w.B(a)
        };
        window.amazon.Login.setSandboxMode = function (a) {
            return w.Ha(a)
        };
        window.amazon.Login.setSiteDomain = function (a) {
            return n.j(a)
        };
        window.amazon.Login.Region = w.F;
        window.amazon.Login.setRegion = function (a) {
            return w.Ga(a)
        };
        window.amazon.Login.setLanguage = function (a) {
            return w.Ea(a)
        };
        window.amazon.Login.setLanguageHint = function (a) {
            return w.Fa(a)
        };
        window.amazon.Login.setUseCookie = function (a) {
            return w.Ia(a)
        };
        window.amazon.Login.authorize = function (a, b) {
            return w.$(a, b)
        };
        window.amazon.Login.logout = function () {
            return w.Ca()
        };
        window.amazon.Login.retrieveProfile = function (a, b) {
            return y.ka(a, b)
        };
        window.amazon.Login.retrieveToken = function (a, b) {
            return x.la(a, b)
        };
        if ("function" == typeof window.onAmazonLoginReady) window.onAmazonLoginReady();

        function Ba(a, b, c) {
            a["payments:widget"] = {
                redirectUrl: c.h.toString(),
                originUrl: window.location.origin,
                isSandbox: b ? b : !1
            }
        };
        var Z = {
            Oa: {},
            hash: {},
            Ta: {},
            mode: {},
            Ua: {},
            i: {},
            ba: {
                Pa: function (a) {
                    this.toString = function () {
                        return "CORRUPT: " + this.message
                    };
                    this.message = a
                },
                ia: function (a) {
                    this.toString = function () {
                        return "INVALID: " + this.message
                    };
                    this.message = a
                },
                Ma: function (a) {
                    this.toString = function () {
                        return "BUG: " + this.message
                    };
                    this.message = a
                },
                Va: function (a) {
                    this.toString = function () {
                        return "NOT READY: " + this.message
                    };
                    this.message = a
                }
            },
            c: {
                La: function (a, b, c) {
                    a = Z.c.ha(a.slice(b / 32), 32 - (b & 31)).slice(1);
                    return void 0 === c ? a : Z.c.wa(a, c - b)
                },
                Ra: function (a, b, c) {
                    var e = Math.floor(-b - c & 31);
                    return ((b + c - 1 ^ b) & -32 ? a[b / 32 | 0] << 32 - e ^ a[b / 32 + 1 | 0] >>> e : a[b / 32 | 0] >>> e) & (1 << c) - 1
                },
                concat: function (a, b) {
                    if (0 === a.length || 0 === b.length) return a.concat(b);
                    var c = a[a.length - 1],
                        e = Z.c.U(c);
                    return 32 === e ? a.concat(b) : Z.c.ha(b, e, c | 0, a.slice(0, a.length - 1))
                },
                w: function (a) {
                    var b = a.length;
                    return 0 === b ? 0 : 32 * (b - 1) + Z.c.U(a[b - 1])
                },
                wa: function (a, b) {
                    if (32 * a.length < b) return a;
                    a = a.slice(0, Math.ceil(b / 32));
                    var c = a.length;
                    b &= 31;
                    0 < c && b && (a[c - 1] = Z.c.A(b, a[c - 1] & 2147483648 >> b - 1, 1));
                    return a
                },
                A: function (a, b, c) {
                    return 32 === a ? b : (c ? b | 0 : b << 32 - a) + 1099511627776 * a
                },
                U: function (a) {
                    return Math.round(a / 1099511627776) || 32
                },
                Qa: function (a, b) {
                    if (Z.c.w(a) !== Z.c.w(b)) return !1;
                    var c = 0,
                        e;
                    for (e = 0; e < a.length; e++) c |= a[e] ^ b[e];
                    return 0 === c
                },
                ha: function (a, b, c, e) {
                    var d;
                    for (void 0 === e && (e = []); 32 <= b; b -= 32) e.push(c),
                    c = 0;
                    if (0 === b) return e.concat(a);
                    for (d = 0; d < a.length; d++) e.push(c | a[d] >>> b),
                    c = a[d] << 32 - b;
                    d = a.length ? a[a.length - 1] : 0;
                    a = Z.c.U(d);
                    e.push(Z.c.A(b + a & 31, 32 < b + a ? c : e.pop(), 1));
                    return e
                },
                Sa: function (a, b) {
                    return [a[0] ^ b[0], a[1] ^ b[1], a[2] ^ b[2], a[3] ^ b[3]]
                },
                Na: function (a) {
                    var b;
                    for (b = 0; b < a.length; ++b) {
                        var c = a[b];
                        a[b] = c >>> 24 | c >>> 8 & 65280 | (c & 65280) << 8 | c << 24
                    }
                    return a
                }
            }
        };
        Z.i.Ja = {
            J: function (a) {
                var b = "",
                    c = Z.c.w(a),
                    e, d;
                for (e = 0; e < c / 8; e++) 0 === (e & 3) && (d = a[e / 4]),
                b += String.fromCharCode(d >>> 8 >>> 8 >>> 8),
                d <<= 8;
                return decodeURIComponent(escape(b))
            },
            L: function (a) {
                a = unescape(encodeURIComponent(a));
                var b = [],
                    c, e = 0;
                for (c = 0; c < a.length; c++) e = e << 8 | a.charCodeAt(c),
                3 === (c & 3) && (b.push(e), e = 0);
                c & 3 && b.push(Z.c.A(8 * (c & 3), e));
                return b
            }
        };
        Z.i.G = {
            ca: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            J: function (a, b, c) {
                var e = "",
                    d = 0,
                    g = Z.i.G.ca,
                    k = 0,
                    f = Z.c.w(a);
                c && (g = g.substr(0, 62) + "-_");
                for (c = 0; 6 * e.length < f;) e += g.charAt((k ^ a[c] >>> d) >>> 26),
                6 > d ? (k = a[c] << 6 - d, d += 26, c++) : (k <<= 6, d -= 6);
                for (; e.length & 3 && !b;) e += "=";
                return e
            },
            L: function (a, b) {
                a = a.replace(/\s|=/g, "");
                var c = [],
                    e = 0,
                    d = Z.i.G.ca,
                    g = 0;
                b && (d = d.substr(0, 62) + "-_");
                for (b = 0; b < a.length; b++) {
                    var k = d.indexOf(a.charAt(b));
                    if (0 > k) throw new Z.ba.ia("this isn't base64!");
                    26 < e ? (e -= 26, c.push(g ^ k >>> e), g = k << 32 - e) : (e += 6, g ^= k << 32 - e)
                }
                e & 56 && c.push(Z.c.A(e & 56, g, 1));
                return c
            }
        };
        Z.i.ta = {
            J: function (a) {
                return Z.i.G.J(a, 1, 1)
            },
            L: function (a) {
                return Z.i.G.L(a, 1)
            }
        };
        Z.hash.K = function (a) {
            this.I[0] || Ca(this);
            a ? (this.H = a.H.slice(0), this.s = a.s.slice(0), this.o = a.o) : this.reset()
        };
        Z.hash.K.hash = function (a) {
            a = (new Z.hash.K).update(a);
            var b, c = a.s,
                e = a.H;
            c = Z.c.concat(c, [Z.c.A(1, 1)]);
            for (b = c.length + 2; b & 15; b++) c.push(0);
            c.push(Math.floor(a.o / 4294967296));
            for (c.push(a.o | 0); c.length;) Da(a, c.splice(0, 16));
            a.reset();
            return e
        };
        Z.hash.K.prototype = {
            reset: function () {
                this.H = this.ga.slice(0);
                this.s = [];
                this.o = 0;
                return this
            },
            update: function (a) {
                "string" === typeof a && (a = Z.i.Ja.L(a));
                var b = this.s = Z.c.concat(this.s, a);
                var c = this.o;
                a = this.o = c + Z.c.w(a);
                if (9007199254740991 < a) throw new Z.ba.ia("Cannot hash more than 2^53 - 1 bits");
                if ("undefined" !== typeof Uint32Array) {
                    var e = new Uint32Array(b),
                        d = 0;
                    for (c = 512 + c - (512 + c & 511); c <= a; c += 512) Da(this, e.subarray(16 * d, 16 * (d + 1))),
                    d += 1;
                    b.splice(0, 16 * d)
                } else for (c = 512 + c - (512 + c & 511); c <= a; c += 512) Da(this, b.splice(0, 16));
                return this
            },
            ga: [],
            I: []
        };

        function Da(a, b) {
            var c, e, d = a.H,
                g = a.I,
                k = d[0],
                f = d[1],
                m = d[2],
                r = d[3],
                u = d[4],
                p = d[5],
                D = d[6],
                I = d[7];
            for (a = 0; 64 > a; a++) 16 > a ? c = b[a] : (c = b[a + 1 & 15], e = b[a + 14 & 15], c = b[a & 15] = (c >>> 7 ^ c >>> 18 ^ c >>> 3 ^ c << 25 ^ c << 14) + (e >>> 17 ^ e >>> 19 ^ e >>> 10 ^ e << 15 ^ e << 13) + b[a & 15] + b[a + 9 & 15] | 0),
            c = c + I + (u >>> 6 ^ u >>> 11 ^ u >>> 25 ^ u << 26 ^ u << 21 ^ u << 7) + (D ^ u & (p ^ D)) + g[a],
            I = D,
            D = p,
            p = u,
            u = r + c | 0,
            r = m,
            m = f,
            f = k,
            k = c + (f & m ^ r & (f ^ m)) + (f >>> 2 ^ f >>> 13 ^ f >>> 22 ^ f << 30 ^ f << 19 ^ f << 10) | 0;
            d[0] = d[0] + k | 0;
            d[1] = d[1] + f | 0;
            d[2] = d[2] + m | 0;
            d[3] = d[3] + r | 0;
            d[4] = d[4] + u | 0;
            d[5] = d[5] + p | 0;
            d[6] = d[6] + D | 0;
            d[7] =
            d[7] + I | 0
        }
        function Ca(a) {
            function b(a) {
                return 4294967296 * (a - Math.floor(a)) | 0
            }
            for (var c = 0, e = 2, d, g; 64 > c; e++) {
                g = !0;
                for (d = 2; d * d <= e; d++) if (0 === e % d) {
                    g = !1;
                    break
                }
                g && (8 > c && (a.ga[c] = b(Math.pow(e, .5))), a.I[c] = b(Math.pow(e, 1 / 3)), c++)
            }
        }
        "undefined" !== typeof module && module.xa && (module.xa = Z);
        "function" === typeof define && define([], function () {
            return Z
        });

    })();
}