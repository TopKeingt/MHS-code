! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).superagent = t()
    }
}(function() {
    return function n(o, a, u) {
        function h(e, t) {
            if (!a[e]) {
                if (!o[e]) {
                    var r = "function" == typeof require && require;
                    if (!t && r) return r(e, !0);
                    if (p) return p(e, !0);
                    var s = new Error("Cannot find module '" + e + "'");
                    throw s.code = "MODULE_NOT_FOUND", s
                }
                var i = a[e] = {
                    exports: {}
                };
                o[e][0].call(i.exports, function(t) {
                    return h(o[e][1][t] || t)
                }, i, i.exports, n, o, a, u)
            }
            return a[e].exports
        }
        for (var p = "function" == typeof require && require, t = 0; t < u.length; t++) h(u[t]);
        return h
    }({
        1: [
            function(t, e, r) {
                function s() {
                    this._defaults = []
                }["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects", "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert"].forEach(function(t) {
                    s.prototype[t] = function() {
                        return this._defaults.push({
                            fn: t,
                            arguments: arguments
                        }), this
                    }
                }), s.prototype._setDefaults = function(e) {
                    this._defaults.forEach(function(t) {
                        e[t.fn].apply(e, t.arguments)
                    })
                }, e.exports = s
            }, {}
        ],
        2: [
            function(t, e, r) {
                "use strict";
                e.exports = function(t) {
                    return null !== t && "object" == typeof t
                }
            }, {}
        ],
        3: [
            function(t, e, r) {
                "use strict";
                var i = t("./is-object");

                function s(t) {
                    if (t) return function(t) {
                        for (var e in s.prototype) t[e] = s.prototype[e];
                        return t
                    }(t)
                }(e.exports = s).prototype.clearTimeout = function() {
                    return clearTimeout(this._timer), clearTimeout(this._responseTimeoutTimer), delete this._timer, delete this._responseTimeoutTimer, this
                }, s.prototype.parse = function(t) {
                    return this._parser = t, this
                }, s.prototype.responseType = function(t) {
                    return this._responseType = t, this
                }, s.prototype.serialize = function(t) {
                    return this._serializer = t, this
                }, s.prototype.timeout = function(t) {
                    if (!t || "object" != typeof t) return this._timeout = t, this._responseTimeout = 0, this;
                    for (var e in t) switch (e) {
                        case "deadline":
                            this._timeout = t.deadline;
                            break;
                        case "response":
                            this._responseTimeout = t.response;
                            break;
                        default:
                            console.warn("Unknown timeout option", e)
                    }
                    return this
                }, s.prototype.retry = function(t, e) {
                    return 0 !== arguments.length && !0 !== t || (t = 1), t <= 0 && (t = 0), this._maxRetries = t, this._retries = 0, this._retryCallback = e, this
                };
                var n = ["ECONNRESET", "ETIMEDOUT", "EADDRINFO", "ESOCKETTIMEDOUT"];
                s.prototype._shouldRetry = function(t, e) {
                    if (!this._maxRetries || this._retries++ >= this._maxRetries) return !1;
                    if (this._retryCallback) try {
                        var r = this._retryCallback(t, e);
                        if (!0 === r) return !0;
                        if (!1 === r) return !1
                    } catch (t) {
                        console.error(t)
                    }
                    if (e && e.status && 500 <= e.status && 501 != e.status) return !0;
                    if (t) {
                        if (t.code && ~n.indexOf(t.code)) return !0;
                        if (t.timeout && "ECONNABORTED" == t.code) return !0;
                        if (t.crossDomain) return !0
                    }
                    return !1
                }, s.prototype._retry = function() {
                    return this.clearTimeout(), this.req && (this.req = null, this.req = this.request()), this._aborted = !1, this.timedout = !1, this._end()
                }, s.prototype.then = function(t, e) {
                    if (!this._fullfilledPromise) {
                        var i = this;
                        this._endCalled && console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises"), this._fullfilledPromise = new Promise(function(r, s) {
                            i.end(function(t, e) {
                                t ? s(t) : r(e)
                            })
                        })
                    }
                    return this._fullfilledPromise.then(t, e)
                }, s.prototype.
                catch = function(t) {
                    return this.then(void 0, t)
                }, s.prototype.use = function(t) {
                    return t(this), this
                }, s.prototype.ok = function(t) {
                    if ("function" != typeof t) throw Error("Callback required");
                    return this._okCallback = t, this
                }, s.prototype._isResponseOK = function(t) {
                    return !!t && (this._okCallback ? this._okCallback(t) : 200 <= t.status && t.status < 300)
                }, s.prototype.getHeader = s.prototype.get = function(t) {
                    return this._header[t.toLowerCase()]
                }, s.prototype.set = function(t, e) {
                    if (i(t)) {
                        for (var r in t) this.set(r, t[r]);
                        return this
                    }
                    return this._header[t.toLowerCase()] = e, this.header[t] = e, this
                }, s.prototype.unset = function(t) {
                    return delete this._header[t.toLowerCase()], delete this.header[t], this
                }, s.prototype.field = function(t, e) {
                    if (null == t) throw new Error(".field(name, val) name can not be empty");
                    if (this._data && console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()"), i(t)) {
                        for (var r in t) this.field(r, t[r]);
                        return this
                    }
                    if (Array.isArray(e)) {
                        for (var s in e) this.field(t, e[s]);
                        return this
                    }
                    if (null == e) throw new Error(".field(name, val) val can not be empty");
                    return "boolean" == typeof e && (e = "" + e), this._getFormData().append(t, e), this
                }, s.prototype.abort = function() {
                    return this._aborted || (this._aborted = !0, this.xhr && this.xhr.abort(), this.req && this.req.abort(), this.clearTimeout(), this.emit("abort")), this
                }, s.prototype._auth = function(t, e, r, s) {
                    switch (r.type) {
                        case "basic":
                            this.set("Authorization", "Basic " + s(t + ":" + e));
                            break;
                        case "auto":
                            this.username = t, this.password = e;
                            break;
                        case "bearer":
                            this.set("Authorization", "Bearer " + t)
                    }
                    return this
                }, s.prototype.withCredentials = function(t) {
                    return null == t && (t = !0), this._withCredentials = t, this
                }, s.prototype.redirects = function(t) {
                    return this._maxRedirects = t, this
                }, s.prototype.maxResponseSize = function(t) {
                    if ("number" != typeof t) throw TypeError("Invalid argument");
                    return this._maxResponseSize = t, this
                }, s.prototype.toJSON = function() {
                    return {
                        method: this.method,
                        url: this.url,
                        data: this._data,
                        headers: this._header
                    }
                }, s.prototype.send = function(t) {
                    var e = i(t),
                        r = this._header["content-type"];
                    if (this._formData && console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()"), e && !this._data) Array.isArray(t) ? this._data = [] : this._isHost(t) || (this._data = {});
                    else if (t && this._data && this._isHost(this._data)) throw Error("Can't merge these send calls");
                    if (e && i(this._data))
                        for (var s in t) this._data[s] = t[s];
                    else "string" == typeof t ? (r || this.type("form"), r = this._header["content-type"], this._data = "application/x-www-form-urlencoded" == r ? this._data ? this._data + "&" + t : t : (this._data || "") + t) : this._data = t;
                    return !e || this._isHost(t) || r || this.type("json"), this
                }, s.prototype.sortQuery = function(t) {
                    return this._sort = void 0 === t || t, this
                }, s.prototype._finalizeQueryString = function() {
                    var t = this._query.join("&");
                    if (t && (this.url += (0 <= this.url.indexOf("?") ? "&" : "?") + t), this._query.length = 0, this._sort) {
                        var e = this.url.indexOf("?");
                        if (0 <= e) {
                            var r = this.url.substring(e + 1).split("&");
                            "function" == typeof this._sort ? r.sort(this._sort) : r.sort(), this.url = this.url.substring(0, e) + "?" + r.join("&")
                        }
                    }
                }, s.prototype._appendQueryString = function() {
                    console.trace("Unsupported")
                }, s.prototype._timeoutError = function(t, e, r) {
                    if (!this._aborted) {
                        var s = new Error(t + e + "ms exceeded");
                        s.timeout = e, s.code = "ECONNABORTED", s.errno = r, this.timedout = !0, this.abort(), this.callback(s)
                    }
                }, s.prototype._setTimeouts = function() {
                    var t = this;
                    this._timeout && !this._timer && (this._timer = setTimeout(function() {
                        t._timeoutError("Timeout of ", t._timeout, "ETIME")
                    }, this._timeout)), this._responseTimeout && !this._responseTimeoutTimer && (this._responseTimeoutTimer = setTimeout(function() {
                        t._timeoutError("Response timeout of ", t._responseTimeout, "ETIMEDOUT")
                    }, this._responseTimeout))
                }
            }, {
                "./is-object": 2
            }
        ],
        4: [
            function(t, e, r) {
                "use strict";
                var i = t("./utils");

                function s(t) {
                    if (t) return function(t) {
                        for (var e in s.prototype) t[e] = s.prototype[e];
                        return t
                    }(t)
                }(e.exports = s).prototype.get = function(t) {
                    return this.header[t.toLowerCase()]
                }, s.prototype._setHeaderProperties = function(t) {
                    var e = t["content-type"] || "";
                    this.type = i.type(e);
                    var r = i.params(e);
                    for (var s in r) this[s] = r[s];
                    this.links = {};
                    try {
                        t.link && (this.links = i.parseLinks(t.link))
                    } catch (t) {}
                }, s.prototype._setStatusProperties = function(t) {
                    var e = t / 100 | 0;
                    this.status = this.statusCode = t, this.statusType = e, this.info = 1 == e, this.ok = 2 == e, this.redirect = 3 == e, this.clientError = 4 == e, this.serverError = 5 == e, this.error = (4 == e || 5 == e) && this.toError(), this.created = 201 == t, this.accepted = 202 == t, this.noContent = 204 == t, this.badRequest = 400 == t, this.unauthorized = 401 == t, this.notAcceptable = 406 == t, this.forbidden = 403 == t, this.notFound = 404 == t, this.unprocessableEntity = 422 == t
                }
            }, {
                "./utils": 5
            }
        ],
        5: [
            function(t, e, r) {
                "use strict";
                r.type = function(t) {
                    return t.split(/ *; */).shift()
                }, r.params = function(t) {
                    return t.split(/ *; */).reduce(function(t, e) {
                        var r = e.split(/ *= */),
                            s = r.shift(),
                            i = r.shift();
                        return s && i && (t[s] = i), t
                    }, {})
                }, r.parseLinks = function(t) {
                    return t.split(/ *, */).reduce(function(t, e) {
                        var r = e.split(/ *; */),
                            s = r[0].slice(1, -1);
                        return t[r[1].split(/ *= */)[1].slice(1, -1)] = s, t
                    }, {})
                }, r.cleanHeader = function(t, e) {
                    return delete t["content-type"], delete t["content-length"], delete t["transfer-encoding"], delete t.host, e && (delete t.authorization, delete t.cookie), t
                }
            }, {}
        ],
        6: [
            function(t, e, r) {
                function s(t) {
                    if (t) return function(t) {
                        for (var e in s.prototype) t[e] = s.prototype[e];
                        return t
                    }(t)
                }
                void 0 !== e && (e.exports = s), s.prototype.on = s.prototype.addEventListener = function(t, e) {
                    return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this
                }, s.prototype.once = function(t, e) {
                    function r() {
                        this.off(t, r), e.apply(this, arguments)
                    }
                    return r.fn = e, this.on(t, r), this
                }, s.prototype.off = s.prototype.removeListener = s.prototype.removeAllListeners = s.prototype.removeEventListener = function(t, e) {
                    if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                    var r, s = this._callbacks["$" + t];
                    if (!s) return this;
                    if (1 == arguments.length) return delete this._callbacks["$" + t], this;
                    for (var i = 0; i < s.length; i++)
                        if ((r = s[i]) === e || r.fn === e) {
                            s.splice(i, 1);
                            break
                        }
                    return this
                }, s.prototype.emit = function(t) {
                    this._callbacks = this._callbacks || {};
                    var e = [].slice.call(arguments, 1),
                        r = this._callbacks["$" + t];
                    if (r)
                        for (var s = 0, i = (r = r.slice(0)).length; s < i; ++s) r[s].apply(this, e);
                    return this
                }, s.prototype.listeners = function(t) {
                    return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || []
                }, s.prototype.hasListeners = function(t) {
                    return !!this.listeners(t).length
                }
            }, {}
        ],
        7: [
            function(t, e, r) {
                var s;
                "undefined" != typeof window ? s = window : "undefined" != typeof self ? s = self : (console.warn("Using browser-only version of superagent in non-browser environment"), s = this);
                var i = t("component-emitter"),
                    n = t("./request-base"),
                    o = t("./is-object"),
                    a = t("./response-base"),
                    u = t("./agent-base");

                function h() {}
                var p = r = e.exports = function(t, e) {
                    return "function" == typeof e ? new r.Request("GET", t).end(e) : 1 == arguments.length ? new r.Request("GET", t) : new r.Request(t, e)
                };
                r.Request = m, p.getXHR = function() {
                    if (!(!s.XMLHttpRequest || s.location && "file:" == s.location.protocol && s.ActiveXObject)) return new XMLHttpRequest;
                    try {
                        return new ActiveXObject("Microsoft.XMLHTTP")
                    } catch (t) {}
                    try {
                        return new ActiveXObject("Msxml2.XMLHTTP.6.0")
                    } catch (t) {}
                    try {
                        return new ActiveXObject("Msxml2.XMLHTTP.3.0")
                    } catch (t) {}
                    try {
                        return new ActiveXObject("Msxml2.XMLHTTP")
                    } catch (t) {}
                    throw Error("Browser-only version of superagent could not find XHR")
                };
                var c = "".trim ? function(t) {
                        return t.trim()
                    } : function(t) {
                        return t.replace(/(^\s*|\s*$)/g, "")
                    };

                function l(t) {
                    if (!o(t)) return t;
                    var e = [];
                    for (var r in t) f(e, r, t[r]);
                    return e.join("&")
                }

                function f(e, r, t) {
                    if (null != t)
                        if (Array.isArray(t)) t.forEach(function(t) {
                            f(e, r, t)
                        });
                        else if (o(t))
                        for (var s in t) f(e, r + "[" + s + "]", t[s]);
                    else e.push(encodeURIComponent(r) + "=" + encodeURIComponent(t));
                    else null === t && e.push(encodeURIComponent(r))
                }

                function d(t) {
                    for (var e, r, s = {}, i = t.split("&"), n = 0, o = i.length; n < o; ++n) - 1 == (r = (e = i[n]).indexOf("=")) ? s[decodeURIComponent(e)] = "" : s[decodeURIComponent(e.slice(0, r))] = decodeURIComponent(e.slice(r + 1));
                    return s
                }

                function y(t) {
                    return /[\/+]json($|[^-\w])/.test(t)
                }

                function _(t) {
                    this.req = t, this.xhr = this.req.xhr, this.text = "HEAD" != this.req.method && ("" === this.xhr.responseType || "text" === this.xhr.responseType) || void 0 === this.xhr.responseType ? this.xhr.responseText : null, this.statusText = this.req.xhr.statusText;
                    var e = this.xhr.status;
                    1223 === e && (e = 204), this._setStatusProperties(e), this.header = this.headers = function(t) {
                        for (var e, r, s, i, n = t.split(/\r?\n/), o = {}, a = 0, u = n.length; a < u; ++a) - 1 !== (e = (r = n[a]).indexOf(":")) && (s = r.slice(0, e).toLowerCase(), i = c(r.slice(e + 1)), o[s] = i);
                        return o
                    }(this.xhr.getAllResponseHeaders()), this.header["content-type"] = this.xhr.getResponseHeader("content-type"), this._setHeaderProperties(this.header), null === this.text && t._responseType ? this.body = this.xhr.response : this.body = "HEAD" != this.req.method ? this._parseBody(this.text ? this.text : this.xhr.response) : null
                }

                function m(t, e) {
                    var s = this;
                    this._query = this._query || [], this.method = t, this.url = e, this.header = {}, this._header = {}, this.on("end", function() {
                        var e, r = null,
                            t = null;
                        try {
                            t = new _(s)
                        } catch (t) {
                            return (r = new Error("Parser is unable to parse the response")).parse = !0, r.original = t, s.xhr ? (r.rawResponse = void 0 === s.xhr.responseType ? s.xhr.responseText : s.xhr.response, r.status = s.xhr.status ? s.xhr.status : null, r.statusCode = r.status) : (r.rawResponse = null, r.status = null), s.callback(r)
                        }
                        s.emit("response", t);
                        try {
                            s._isResponseOK(t) || (e = new Error(t.statusText || "Unsuccessful HTTP response"))
                        } catch (t) {
                            e = t
                        }
                        e ? (e.original = r, e.response = t, e.status = t.status, s.callback(e, t)) : s.callback(null, t)
                    })
                }

                function b(t, e, r) {
                    var s = p("DELETE", t);
                    return "function" == typeof e && (r = e, e = null), e && s.send(e), r && s.end(r), s
                }
                p.serializeObject = l, p.parseString = d, p.types = {
                    html: "text/html",
                    json: "application/json",
                    xml: "text/xml",
                    urlencoded: "application/x-www-form-urlencoded",
                    form: "application/x-www-form-urlencoded",
                    "form-data": "application/x-www-form-urlencoded"
                }, p.serialize = {
                    "application/x-www-form-urlencoded": l,
                    "application/json": JSON.stringify
                }, p.parse = {
                    "application/x-www-form-urlencoded": d,
                    "application/json": JSON.parse
                }, a(_.prototype), _.prototype._parseBody = function(t) {
                    var e = p.parse[this.type];
                    return this.req._parser ? this.req._parser(this, t) : (!e && y(this.type) && (e = p.parse["application/json"]), e && t && (t.length || t instanceof Object) ? e(t) : null)
                }, _.prototype.toError = function() {
                    var t = this.req,
                        e = t.method,
                        r = t.url,
                        s = "cannot " + e + " " + r + " (" + this.status + ")",
                        i = new Error(s);
                    return i.status = this.status, i.method = e, i.url = r, i
                }, p.Response = _, i(m.prototype), n(m.prototype), m.prototype.type = function(t) {
                    return this.set("Content-Type", p.types[t] || t), this
                }, m.prototype.accept = function(t) {
                    return this.set("Accept", p.types[t] || t), this
                }, m.prototype.auth = function(t, e, r) {
                    1 === arguments.length && (e = ""), "object" == typeof e && null !== e && (r = e, e = ""), r || (r = {
                        type: "function" == typeof btoa ? "basic" : "auto"
                    });
                    return this._auth(t, e, r, function(t) {
                        if ("function" == typeof btoa) return btoa(t);
                        throw new Error("Cannot use basic auth, btoa is not a function")
                    })
                }, m.prototype.query = function(t) {
                    return "string" != typeof t && (t = l(t)), t && this._query.push(t), this
                }, m.prototype.attach = function(t, e, r) {
                    if (e) {
                        if (this._data) throw Error("superagent can't mix .send() and .attach()");
                        this._getFormData().append(t, e, r || e.name)
                    }
                    return this
                }, m.prototype._getFormData = function() {
                    return this._formData || (this._formData = new s.FormData), this._formData
                }, m.prototype.callback = function(t, e) {
                    if (this._shouldRetry(t, e)) return this._retry();
                    var r = this._callback;
                    this.clearTimeout(), t && (this._maxRetries && (t.retries = this._retries - 1), this.emit("error", t)), r(t, e)
                }, m.prototype.crossDomainError = function() {
                    var t = new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");
                    t.crossDomain = !0, t.status = this.status, t.method = this.method, t.url = this.url, this.callback(t)
                }, m.prototype.buffer = m.prototype.ca = m.prototype.agent = function() {
                    return console.warn("This is not supported in browser version of superagent"), this
                }, m.prototype.pipe = m.prototype.write = function() {
                    throw Error("Streaming is not supported in browser version of superagent")
                }, m.prototype._isHost = function(t) {
                    return t && "object" == typeof t && !Array.isArray(t) && "[object Object]" !== Object.prototype.toString.call(t)
                }, m.prototype.end = function(t) {
                    return this._endCalled && console.warn("Warning: .end() was called twice. This is not supported in superagent"), this._endCalled = !0, this._callback = t || h, this._finalizeQueryString(), this._end()
                }, m.prototype._end = function() {
                    var r = this,
                        s = this.xhr = p.getXHR(),
                        t = this._formData || this._data;
                    this._setTimeouts(), s.onreadystatechange = function() {
                        var t = s.readyState;
                        if (2 <= t && r._responseTimeoutTimer && clearTimeout(r._responseTimeoutTimer), 4 == t) {
                            var e;
                            try {
                                e = s.status
                            } catch (t) {
                                e = 0
                            }
                            if (!e) {
                                if (r.timedout || r._aborted) return;
                                return r.crossDomainError()
                            }
                            r.emit("end")
                        }
                    };
                    var e = function(t, e) {
                        0 < e.total && (e.percent = e.loaded / e.total * 100), e.direction = t, r.emit("progress", e)
                    };
                    if (this.hasListeners("progress")) try {
                        s.onprogress = e.bind(null, "download"), s.upload && (s.upload.onprogress = e.bind(null, "upload"))
                    } catch (t) {}
                    try {
                        this.username && this.password ? s.open(this.method, this.url, !0, this.username, this.password) : s.open(this.method, this.url, !0)
                    } catch (t) {
                        return this.callback(t)
                    }
                    if (this._withCredentials && (s.withCredentials = !0), !this._formData && "GET" != this.method && "HEAD" != this.method && "string" != typeof t && !this._isHost(t)) {
                        var i = this._header["content-type"],
                            n = this._serializer || p.serialize[i ? i.split(";")[0] : ""];
                        !n && y(i) && (n = p.serialize["application/json"]), n && (t = n(t))
                    }
                    for (var o in this.header) null != this.header[o] && this.header.hasOwnProperty(o) && s.setRequestHeader(o, this.header[o]);
                    return this._responseType && (s.responseType = this._responseType), this.emit("request", this), s.send(void 0 !== t ? t : null), this
                }, p.agent = function() {
                    return new u
                }, ["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"].forEach(function(s) {
                    u.prototype[s.toLowerCase()] = function(t, e) {
                        var r = new p.Request(s, t);
                        return this._setDefaults(r), e && r.end(e), r
                    }
                }), u.prototype.del = u.prototype.delete, p.get = function(t, e, r) {
                    var s = p("GET", t);
                    return "function" == typeof e && (r = e, e = null), e && s.query(e), r && s.end(r), s
                }, p.head = function(t, e, r) {
                    var s = p("HEAD", t);
                    return "function" == typeof e && (r = e, e = null), e && s.query(e), r && s.end(r), s
                }, p.options = function(t, e, r) {
                    var s = p("OPTIONS", t);
                    return "function" == typeof e && (r = e, e = null), e && s.send(e), r && s.end(r), s
                }, p.del = b, p.delete = b, p.patch = function(t, e, r) {
                    var s = p("PATCH", t);
                    return "function" == typeof e && (r = e, e = null), e && s.send(e), r && s.end(r), s
                }, p.post = function(t, e, r) {
                    var s = p("POST", t);
                    return "function" == typeof e && (r = e, e = null), e && s.send(e), r && s.end(r), s
                }, p.put = function(t, e, r) {
                    var s = p("PUT", t);
                    return "function" == typeof e && (r = e, e = null), e && s.send(e), r && s.end(r), s
                }
            }, {
                "./agent-base": 1,
                "./is-object": 2,
                "./request-base": 3,
                "./response-base": 4,
                "component-emitter": 6
            }
        ]
    }, {}, [7])(7)
});