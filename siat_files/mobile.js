$(document).bind("ajaxStart", function() {
    $.mobile.showPageLoadingMsg();
});
$(document).bind("ajaxComplete", function() {
    $.mobile.hidePageLoadingMsg()
});
(function(a, c, b) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], function(d) {
            b(d, a, c);
            return d.mobile
        })
    } else {
        b(a.jQuery, a, c)
    }
}(this, document, function(c, b, a, d) {
    (function(A, J, h, p) {
        var I = "virtualMouseBindings",
            f = "virtualTouchID",
            e = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
            z = "clientX clientY pageX pageY screenX screenY".split(" "),
            F = A.event.mouseHooks ? A.event.mouseHooks.props : [],
            B = A.event.props.concat(F),
            D = {},
            K = 0,
            v = 0,
            u = 0,
            s = false,
            N = [],
            k = false,
            U = false,
            x = "addEventListener" in h,
            w = A(h),
            H = 1,
            Q = 0;
        A.vmouse = {
            moveDistanceThreshold: 10,
            clickDistanceThreshold: 10,
            resetTimerDuration: 1500
        };

        function t(V) {
            while (V && typeof V.originalEvent !== "undefined") {
                V = V.originalEvent
            }
            return V
        }

        function l(W, X) {
            var ae = W.type,
                af, ad, Y, V, ac, ab, aa, Z;
            W = A.Event(W);
            W.type = X;
            af = W.originalEvent;
            ad = A.event.props;
            if (ae.search(/^(mouse|click)/) > -1) {
                ad = B
            }
            if (af) {
                for (aa = ad.length, V; aa;) {
                    V = ad[--aa];
                    W[V] = af[V]
                }
            }
            if (ae.search(/mouse(down|up)|click/) > -1 && !W.which) {
                W.which = 1
            }
            if (ae.search(/^touch/) !== -1) {
                Y = t(af);
                ae = Y.touches;
                ac = Y.changedTouches;
                ab = (ae && ae.length) ? ae[0] : ((ac && ac.length) ? ac[0] : p);
                if (ab) {
                    for (Z = 0, len = z.length; Z < len; Z++) {
                        V = z[Z];
                        W[V] = ab[V]
                    }
                }
            }
            return W
        }

        function S(Y) {
            var W = {},
                V, X;
            while (Y) {
                V = A.data(Y, I);
                for (X in V) {
                    if (V[X]) {
                        W[X] = W.hasVirtualBinding = true
                    }
                }
                Y = Y.parentNode
            }
            return W
        }

        function E(X, W) {
            var V;
            while (X) {
                V = A.data(X, I);
                if (V && (!W || V[W])) {
                    return X
                }
                X = X.parentNode
            }
            return null
        }

        function M() {
            U = false
        }

        function n() {
            U = true
        }

        function T() {
            Q = 0;
            N.length = 0;
            k = false;
            n()
        }

        function r() {
            M()
        }

        function y() {
            C();
            K = setTimeout(function() {
                K = 0;
                T()
            }, A.vmouse.resetTimerDuration)
        }

        function C() {
            if (K) {
                clearTimeout(K);
                K = 0
            }
        }

        function q(X, Y, V) {
            var W;
            if ((V && V[X]) || (!V && E(Y.target, X))) {
                W = l(Y, X);
                A(Y.target).trigger(W)
            }
            return W
        }

        function m(W) {
            var X = A.data(W.target, f);
            if (!k && (!Q || Q !== X)) {
                var V = q("v" + W.type, W);
                if (V) {
                    if (V.isDefaultPrevented()) {
                        W.preventDefault()
                    }
                    if (V.isPropagationStopped()) {
                        W.stopPropagation()
                    }
                    if (V.isImmediatePropagationStopped()) {
                        W.stopImmediatePropagation()
                    }
                }
            }
        }

        function R(X) {
            var Z = t(X).touches,
                Y, V;
            if (Z && Z.length === 1) {
                Y = X.target;
                V = S(Y);
                if (V.hasVirtualBinding) {
                    Q = H++;
                    A.data(Y, f, Q);
                    C();
                    r();
                    s = false;
                    var W = t(X).touches[0];
                    v = W.pageX;
                    u = W.pageY;
                    q("vmouseover", X, V);
                    q("vmousedown", X, V)
                }
            }
        }

        function L(V) {
            if (U) {
                return
            }
            if (!s) {
                q("vmousecancel", V, S(V.target))
            }
            s = true;
            y()
        }

        function g(Y) {
            if (U) {
                return
            }
            var W = t(Y).touches[0],
                V = s,
                X = A.vmouse.moveDistanceThreshold;
            s = s || (Math.abs(W.pageX - v) > X || Math.abs(W.pageY - u) > X), flags = S(Y.target);
            if (s && !V) {
                q("vmousecancel", Y, flags)
            }
            q("vmousemove", Y, flags);
            y()
        }

        function j(Y) {
            if (U) {
                return
            }
            n();
            var V = S(Y.target),
                X;
            q("vmouseup", Y, V);
            if (!s) {
                var W = q("vclick", Y, V);
                if (W && W.isDefaultPrevented()) {
                    X = t(Y).changedTouches[0];
                    N.push({
                        touchID: Q,
                        x: X.clientX,
                        y: X.clientY
                    });
                    k = true
                }
            }
            q("vmouseout", Y, V);
            s = false;
            y()
        }

        function G(W) {
            var X = A.data(W, I),
                V;
            if (X) {
                for (V in X) {
                    if (X[V]) {
                        return true
                    }
                }
            }
            return false
        }

        function P() {}

        function o(V) {
            var W = V.substr(1);
            return {
                setup: function(Y, X) {
                    if (!G(this)) {
                        A.data(this, I, {})
                    }
                    var Z = A.data(this, I);
                    Z[V] = true;
                    D[V] = (D[V] || 0) + 1;
                    if (D[V] === 1) {
                        w.bind(W, m)
                    }
                    A(this).bind(W, P);
                    if (x) {
                        D.touchstart = (D.touchstart || 0) + 1;
                        if (D.touchstart === 1) {
                            w.bind("touchstart", R).bind("touchend", j).bind("touchmove", g).bind("scroll", L)
                        }
                    }
                },
                teardown: function(Y, X) {
                    --D[V];
                    if (!D[V]) {
                        w.unbind(W, m)
                    }
                    if (x) {
                        --D.touchstart;
                        if (!D.touchstart) {
                            w.unbind("touchstart", R).unbind("touchmove", g).unbind("touchend", j).unbind("scroll", L)
                        }
                    }
                    var Z = A(this),
                        aa = A.data(this, I);
                    if (aa) {
                        aa[V] = false
                    }
                    Z.unbind(W, P);
                    if (!G(this)) {
                        Z.removeData(I)
                    }
                }
            }
        }
        for (var O = 0; O < e.length; O++) {
            A.event.special[e[O]] = o(e[O])
        }
        if (x) {
            h.addEventListener("click", function(Z) {
                var W = N.length,
                    aa = Z.target,
                    ac, ab, ad, Y, V, X;
                if (W) {
                    ac = Z.clientX;
                    ab = Z.clientY;
                    threshold = A.vmouse.clickDistanceThreshold;
                    ad = aa;
                    while (ad) {
                        for (Y = 0; Y < W; Y++) {
                            V = N[Y];
                            X = 0;
                            if ((ad === aa && Math.abs(V.x - ac) < threshold && Math.abs(V.y - ab) < threshold) || A.data(ad, f) === V.touchID) {
                                Z.preventDefault();
                                Z.stopPropagation();
                                return
                            }
                        }
                        ad = ad.parentNode
                    }
                }
            }, true)
        }
    })(jQuery, b, a);
    (function(h, k, f) {
        var g = "hashchange",
            n = a,
            l, m = h.event.special,
            o = n.documentMode,
            j = "on" + g in k && (o === f || o > 7);

        function e(p) {
            p = p || location.href;
            return "#" + p.replace(/^[^#]*#?(.*)$/, "$1")
        }
        h.fn[g] = function(p) {
            return p ? this.bind(g, p) : this.trigger(g)
        };
        h.fn[g].delay = 50;
        m[g] = h.extend(m[g], {
            setup: function() {
                if (j) {
                    return false
                }
                h(l.start)
            },
            teardown: function() {
                if (j) {
                    return false
                }
                h(l.stop)
            }
        });
        l = (function() {
            var p = {},
                v, s = e(),
                q = function(w) {
                    return w
                },
                r = q,
                u = q;
            p.start = function() {
                v || t()
            };
            p.stop = function() {
                v && clearTimeout(v);
                v = f
            };

            function t() {
                var x = e(),
                    w = u(s);
                if (x !== s) {
                    r(s = x, w);
                    h(k).trigger(g)
                } else {
                    if (w !== s) {
                        location.href = location.href.replace(/#.*/, "") + w
                    }
                }
                v = setTimeout(t, h.fn[g].delay)
            }
            h.browser.msie && !j && (function() {
                var w, x;
                p.start = function() {
                    if (!w) {
                        x = h.fn[g].src;
                        x = x && x + e();
                        w = h('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                            x || r(e());
                            t()
                        }).attr("src", x || "javascript:0").insertAfter("body")[0].contentWindow;
                        n.onpropertychange = function() {
                            try {
                                if (event.propertyName === "title") {
                                    w.document.title = n.title
                                }
                            } catch (y) {}
                        }
                    }
                };
                p.stop = q;
                u = function() {
                    return e(w.location.href)
                };
                r = function(B, y) {
                    var A = w.document,
                        z = h.fn[g].domain;
                    if (B !== y) {
                        A.title = n.title;
                        A.open();
                        z && A.write('<script>document.domain="' + z + '"<\/script>');
                        A.close();
                        w.location.hash = B
                    }
                }
            })();
            return p
        })()
    })(jQuery, this);
    /*
     * jQuery UI Widget @VERSION
     *
     * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
     * Dual licensed under the MIT or GPL Version 2 licenses.
     * http://jquery.org/license
     *
     * http://docs.jquery.com/UI/Widget
     */
    (function(f, h) {
        if (f.cleanData) {
            var g = f.cleanData;
            f.cleanData = function(j) {
                for (var k = 0, l;
                    (l = j[k]) != null; k++) {
                    f(l).triggerHandler("remove")
                }
                g(j)
            }
        } else {
            var e = f.fn.remove;
            f.fn.remove = function(j, k) {
                return this.each(function() {
                    if (!k) {
                        if (!j || f.filter(j, [this]).length) {
                            f("*", this).add([this]).each(function() {
                                f(this).triggerHandler("remove")
                            })
                        }
                    }
                    return e.call(f(this), j, k)
                })
            }
        }
        f.widget = function(k, m, j) {
            var l = k.split(".")[0],
                o;
            k = k.split(".")[1];
            o = l + "-" + k;
            if (!j) {
                j = m;
                m = f.Widget
            }
            f.expr[":"][o] = function(p) {
                return !!f.data(p, k)
            };
            f[l] = f[l] || {};
            f[l][k] = function(p, q) {
                if (arguments.length) {
                    this._createWidget(p, q)
                }
            };
            var n = new m();
            n.options = f.extend(true, {}, n.options);
            f[l][k].prototype = f.extend(true, n, {
                namespace: l,
                widgetName: k,
                widgetEventPrefix: f[l][k].prototype.widgetEventPrefix || k,
                widgetBaseClass: o
            }, j);
            f.widget.bridge(k, f[l][k])
        };
        f.widget.bridge = function(k, j) {
            f.fn[k] = function(n) {
                var l = typeof n === "string",
                    m = Array.prototype.slice.call(arguments, 1),
                    o = this;
                n = !l && m.length ? f.extend.apply(null, [true, n].concat(m)) : n;
                if (l && n.charAt(0) === "_") {
                    return o
                }
                if (l) {
                    this.each(function() {
                        var p = f.data(this, k);
                        if (!p) {
                            throw "cannot call methods on " + k + " prior to initialization; attempted to call method '" + n + "'"
                        }
                        if (!f.isFunction(p[n])) {
                            throw "no such method '" + n + "' for " + k + " widget instance"
                        }
                        var q = p[n].apply(p, m);
                        if (q !== p && q !== h) {
                            o = q;
                            return false
                        }
                    })
                } else {
                    this.each(function() {
                        var p = f.data(this, k);
                        if (p) {
                            p.option(n || {})._init()
                        } else {
                            f.data(this, k, new j(n, this))
                        }
                    })
                }
                return o
            }
        };
        f.Widget = function(j, k) {
            if (arguments.length) {
                this._createWidget(j, k)
            }
        };
        f.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            options: {
                disabled: false
            },
            _createWidget: function(k, l) {
                f.data(l, this.widgetName, this);
                this.element = f(l);
                this.options = f.extend(true, {}, this.options, this._getCreateOptions(), k);
                var j = this;
                this.element.bind("remove." + this.widgetName, function() {
                    j.destroy()
                });
                this._create();
                this._trigger("create");
                this._init()
            },
            _getCreateOptions: function() {
                var j = {};
                if (f.metadata) {
                    j = f.metadata.get(element)[this.widgetName]
                }
                return j
            },
            _create: function() {},
            _init: function() {},
            destroy: function() {
                this.element.unbind("." + this.widgetName).removeData(this.widgetName);
                this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
            },
            widget: function() {
                return this.element
            },
            option: function(k, l) {
                var j = k;
                if (arguments.length === 0) {
                    return f.extend({}, this.options)
                }
                if (typeof k === "string") {
                    if (l === h) {
                        return this.options[k]
                    }
                    j = {};
                    j[k] = l
                }
                this._setOptions(j);
                return this
            },
            _setOptions: function(k) {
                var j = this;
                f.each(k, function(l, m) {
                    j._setOption(l, m)
                });
                return this
            },
            _setOption: function(j, k) {
                this.options[j] = k;
                if (j === "disabled") {
                    this.widget()[k ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", k)
                }
                return this
            },
            enable: function() {
                return this._setOption("disabled", false)
            },
            disable: function() {
                return this._setOption("disabled", true)
            },
            _trigger: function(k, l, m) {
                var o = this.options[k];
                l = f.Event(l);
                l.type = (k === this.widgetEventPrefix ? k : this.widgetEventPrefix + k).toLowerCase();
                m = m || {};
                if (l.originalEvent) {
                    for (var j = f.event.props.length, n; j;) {
                        n = f.event.props[--j];
                        l[n] = l.originalEvent[n]
                    }
                }
                this.element.trigger(l, m);
                return !(f.isFunction(o) && o.call(this.element[0], l, m) === false || l.isDefaultPrevented())
            }
        }
    })(jQuery);
    (function(e, f) {
        e.widget("mobile.widget", {
            _createWidget: function() {
                e.Widget.prototype._createWidget.apply(this, arguments);
                this._trigger("init")
            },
            _getCreateOptions: function() {
                var h = this.element,
                    g = {};
                e.each(this.options, function(j) {
                    var k = h.jqmData(j.replace(/[A-Z]/g, function(l) {
                        return "-" + l.toLowerCase()
                    }));
                    if (k !== f) {
                        g[j] = k
                    }
                });
                return g
            },
            enhanceWithin: function(h, g) {
                this.enhance(e(this.options.initSelector, e(h)), g)
            },
            enhance: function(j, h) {
                var m, l, g = e(j),
                    k = this;
                g = e.mobile.enhanceable(g);
                if (h && g.length) {
                    m = e.mobile.closestPageData(g);
                    l = (m && m.keepNativeSelector()) || "";
                    g = g.not(l)
                }
                g[this.widgetName]()
            },
            raise: function(g) {
                throw "Widget [" + this.widgetName + "]: " + g
            }
        })
    })(jQuery);
    (function(j, h, k) {
        var g = {};
        j.mobile = j.extend({}, {
            version: "1.1.0",
            ns: "",
            subPageUrlKey: "ui-page",
            activePageClass: "ui-page-active",
            activeBtnClass: "ui-btn-active",
            focusClass: "ui-focus",
            ajaxEnabled: true,
            hashListeningEnabled: true,
            linkBindingEnabled: true,
            defaultPageTransition: "fade",
            maxTransitionWidth: false,
            minScrollBack: 250,
            touchOverflowEnabled: false,
            defaultDialogTransition: "pop",
            loadingMessage: "loading",
            pageLoadErrorMessage: "Error Loading Page",
            loadingMessageTextVisible: false,
            loadingMessageTheme: "a",
            pageLoadErrorMessageTheme: "e",
            autoInitializePage: true,
            pushStateEnabled: true,
            ignoreContentEnabled: false,
            orientationChangeEnabled: true,
            buttonMarkup: {
                hoverDelay: 200
            },
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            },
            silentScroll: function(l) {
                if (j.type(l) !== "number") {
                    l = j.mobile.defaultHomeScroll
                }
                j.event.special.scrollstart.enabled = false;
                setTimeout(function() {
                    h.scrollTo(0, l);
                    j(a).trigger("silentscroll", {
                        x: 0,
                        y: l
                    })
                }, 20);
                setTimeout(function() {
                    j.event.special.scrollstart.enabled = true
                }, 150)
            },
            nsNormalizeDict: g,
            nsNormalize: function(l) {
                if (!l) {
                    return
                }
                return g[l] || (g[l] = j.camelCase(j.mobile.ns + l))
            },
            getInheritedTheme: function(q, n) {
                var r = q[0],
                    o = "",
                    p = /ui-(bar|body|overlay)-([a-z])\b/,
                    s, l;
                while (r) {
                    var s = r.className || "";
                    if ((l = p.exec(s)) && (o = l[2])) {
                        break
                    }
                    r = r.parentNode
                }
                return o || n || "a"
            },
            closestPageData: function(l) {
                return l.closest(':jqmData(role="page"), :jqmData(role="dialog")').data("page")
            },
            enhanceable: function(l) {
                return this.haveParents(l, "enhance")
            },
            hijackable: function(l) {
                return this.haveParents(l, "ajax")
            },
            haveParents: function(n, r) {
                if (!j.mobile.ignoreContentEnabled) {
                    return n
                }
                var o = n.length,
                    l = j(),
                    q, t, p;
                for (var m = 0; m < o; m++) {
                    t = n.eq(m);
                    p = false;
                    q = n[m];
                    while (q) {
                        var s = q.getAttribute ? q.getAttribute("data-" + j.mobile.ns + r) : "";
                        if (s === "false") {
                            p = true;
                            break
                        }
                        q = q.parentNode
                    }
                    if (!p) {
                        l = l.add(t)
                    }
                }
                return l
            }
        }, j.mobile);
        j.fn.jqmData = function(n, m) {
            var l;
            if (typeof n != "undefined") {
                if (n) {
                    n = j.mobile.nsNormalize(n)
                }
                l = this.data.apply(this, arguments.length < 2 ? [n] : [n, m])
            }
            return l
        };
        j.jqmData = function(m, o, n) {
            var l;
            if (typeof o != "undefined") {
                l = j.data(m, o ? j.mobile.nsNormalize(o) : o, n)
            }
            return l
        };
        j.fn.jqmRemoveData = function(l) {
            return this.removeData(j.mobile.nsNormalize(l))
        };
        j.jqmRemoveData = function(l, m) {
            return j.removeData(l, j.mobile.nsNormalize(m))
        };
        j.fn.removeWithDependents = function() {
            j.removeWithDependents(this)
        };
        j.removeWithDependents = function(m) {
            var l = j(m);
            (l.jqmData("dependents") || j()).remove();
            l.remove()
        };
        j.fn.addDependents = function(l) {
            j.addDependents(j(this), l)
        };
        j.addDependents = function(l, m) {
            var n = j(l).jqmData("dependents") || j();
            j(l).jqmData("dependents", j.merge(n, m))
        };
        j.fn.getEncodedText = function() {
            return j("<div/>").text(j(this).text()).html()
        };
        j.fn.jqmEnhanceable = function() {
            return j.mobile.enhanceable(this)
        };
        j.fn.jqmHijackable = function() {
            return j.mobile.hijackable(this)
        };
        var f = j.find,
            e = /:jqmData\(([^)]*)\)/g;
        j.find = function(m, o, n, l) {
            m = m.replace(e, "[data-" + (j.mobile.ns || "") + "$1]");
            return f.call(this, m, o, n, l)
        };
        j.extend(j.find, f);
        j.find.matches = function(l, m) {
            return j.find(l, null, null, m)
        };
        j.find.matchesSelector = function(l, m) {
            return j.find(m, null, null, [l]).length > 0
        }
    })(jQuery, this);
    (function(f, h) {
        var g = f(b),
            e = f("html");
        f.mobile.media = (function() {
            var j = {},
                k = f("<div id='jquery-mediatest'>"),
                l = f("<body>").append(k);
            return function(o) {
                if (!(o in j)) {
                    var m = a.createElement("style"),
                        n = "@media " + o + " { #jquery-mediatest { position:absolute; } }";
                    m.type = "text/css";
                    if (m.styleSheet) {
                        m.styleSheet.cssText = n
                    } else {
                        m.appendChild(a.createTextNode(n))
                    }
                    e.prepend(l).prepend(m);
                    j[o] = k.css("position") === "absolute";
                    l.add(m).remove()
                }
                return j[o]
            }
        })()
    })(jQuery);
    (function(l, g) {
        var h = l("<body>").prependTo("html"),
            o = h[0].style,
            q = ["Webkit", "Moz", "O"],
            r = "palmGetResource" in b,
            p = b.operamini && ({}).toString.call(b.operamini) === "[object OperaMini]",
            n = b.blackberry;

        function f(w) {
            var u = w.charAt(0).toUpperCase() + w.substr(1),
                t = (w + " " + q.join(u + " ") + u).split(" ");
            for (var s in t) {
                if (o[t[s]] !== g) {
                    return true
                }
            }
        }

        function k(s, x, u) {
            var t = a.createElement("div"),
                A = function(B) {
                    return B.charAt(0).toUpperCase() + B.substr(1)
                },
                z = function(B) {
                    return "-" + B.charAt(0).toLowerCase() + B.substr(1) + "-"
                },
                y = function(E) {
                    var B = z(E) + s + ": " + x + ";",
                        D = A(E),
                        C = D + A(s);
                    t.setAttribute("style", B);
                    if (!!t.style[C]) {
                        w = true
                    }
                },
                v = u ? [u] : q,
                w;
            for (i = 0; i < v.length; i++) {
                y(v[i])
            }
            return !!w
        }

        function j() {
            var s = "transform-3d";
            return k("perspective", "10px", "moz") || l.mobile.media("(-" + q.join("-" + s + "),(-") + "-" + s + "),(" + s + ")")
        }

        function e() {
            var w = location.protocol + "//" + location.host + location.pathname + "ui-dir/",
                v = l("head base"),
                x = null,
                s = "",
                u, t;
            if (!v.length) {
                v = x = l("<base>", {
                    href: w
                }).appendTo("head")
            } else {
                s = v.attr("href")
            }
            u = l("<a href='testurl' />").prependTo(h);
            t = u[0].href;
            v[0].href = s || location.pathname;
            if (x) {
                x.remove()
            }
            return t.indexOf(w) === 0
        }
        l.extend(l.mobile, {
            browser: {}
        });
        l.mobile.browser.ie = (function() {
            var t = 3,
                u = a.createElement("div"),
                s = u.all || [];
            while (u.innerHTML = "<!--[if gt IE " + (++t) + "]><br><![endif]-->", s[0]) {}
            return t > 4 ? t : !t
        })();
        l.extend(l.support, {
            orientation: "orientation" in b && "onorientationchange" in b,
            touch: "ontouchend" in a,
            cssTransitions: "WebKitTransitionEvent" in b || k("transition", "height 100ms linear"),
            pushState: "pushState" in history && "replaceState" in history,
            mediaquery: l.mobile.media("only all"),
            cssPseudoElement: !!f("content"),
            touchOverflow: !!f("overflowScrolling"),
            cssTransform3d: j(),
            boxShadow: !!f("boxShadow") && !n,
            scrollTop: ("pageXOffset" in b || "scrollTop" in a.documentElement || "scrollTop" in h[0]) && !r && !p,
            dynamicBaseTag: e()
        });
        h.remove();
        var m = (function() {
            var s = b.navigator.userAgent;
            return s.indexOf("Nokia") > -1 && (s.indexOf("Symbian/3") > -1 || s.indexOf("Series60/5") > -1) && s.indexOf("AppleWebKit") > -1 && s.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)
        })();
        l.mobile.gradeA = function() {
            return l.support.mediaquery || l.mobile.browser.ie && l.mobile.browser.ie >= 7
        };
        l.mobile.ajaxBlacklist = b.blackberry && !b.WebKitPoint || p || m;
        if (m) {
            l(function() {
                l("head link[rel='stylesheet']").attr("rel", "alternate stylesheet").attr("rel", "stylesheet")
            })
        }
        if (!l.support.boxShadow) {
            l("html").addClass("ui-mobile-nosupport-boxshadow")
        }
    })(jQuery);
    (function(g, m, e) {
        g.each(("touchstart touchmove touchend orientationchange throttledresize tap taphold swipe swipeleft swiperight scrollstart scrollstop").split(" "), function(p, o) {
            g.fn[o] = function(q) {
                return q ? this.bind(o, q) : this.trigger(o)
            };
            g.attrFn[o] = true
        });
        var h = g.support.touch,
            j = "touchmove scroll",
            n = h ? "touchstart" : "mousedown",
            l = h ? "touchend" : "mouseup",
            f = h ? "touchmove" : "mousemove";

        function k(r, o, q) {
            var p = q.type;
            q.type = o;
            g.event.handle.call(r, q);
            q.type = p
        }
        g.event.special.scrollstart = {
            enabled: true,
            setup: function() {
                var o = this,
                    r = g(o),
                    q, s;

                function p(t, u) {
                    q = u;
                    k(o, q ? "scrollstart" : "scrollstop", t)
                }
                r.bind(j, function(t) {
                    if (!g.event.special.scrollstart.enabled) {
                        return
                    }
                    if (!q) {
                        p(t, true)
                    }
                    clearTimeout(s);
                    s = setTimeout(function() {
                        p(t, false)
                    }, 50)
                })
            }
        };
        g.event.special.tap = {
            setup: function() {
                var o = this,
                    p = g(o);
                p.bind("vmousedown", function(t) {
                    if (t.which && t.which !== 1) {
                        return false
                    }
                    var s = t.target,
                        q = t.originalEvent,
                        w;

                    function r() {
                        clearTimeout(w)
                    }

                    function v() {
                        r();
                        p.unbind("vclick", u).unbind("vmouseup", r);
                        g(a).unbind("vmousecancel", v)
                    }

                    function u(x) {
                        v();
                        if (s == x.target) {
                            k(o, "tap", x)
                        }
                    }
                    p.bind("vmouseup", r).bind("vclick", u);
                    g(a).bind("vmousecancel", v);
                    w = setTimeout(function() {
                        k(o, "taphold", g.Event("taphold", {
                            target: s
                        }))
                    }, 750)
                })
            }
        };
        g.event.special.swipe = {
            scrollSupressionThreshold: 10,
            durationThreshold: 1000,
            horizontalDistanceThreshold: 30,
            verticalDistanceThreshold: 75,
            setup: function() {
                var o = this,
                    p = g(o);
                p.bind(n, function(r) {
                    var t = r.originalEvent.touches ? r.originalEvent.touches[0] : r,
                        u = {
                            time: (new Date()).getTime(),
                            coords: [t.pageX, t.pageY],
                            origin: g(r.target)
                        },
                        q;

                    function s(v) {
                        if (!u) {
                            return
                        }
                        var w = v.originalEvent.touches ? v.originalEvent.touches[0] : v;
                        q = {
                            time: (new Date()).getTime(),
                            coords: [w.pageX, w.pageY]
                        };
                        if (Math.abs(u.coords[0] - q.coords[0]) > g.event.special.swipe.scrollSupressionThreshold) {
                            v.preventDefault()
                        }
                    }
                    p.bind(f, s).one(l, function(v) {
                        p.unbind(f, s);
                        if (u && q) {
                            if (q.time - u.time < g.event.special.swipe.durationThreshold && Math.abs(u.coords[0] - q.coords[0]) > g.event.special.swipe.horizontalDistanceThreshold && Math.abs(u.coords[1] - q.coords[1]) < g.event.special.swipe.verticalDistanceThreshold) {
                                u.origin.trigger("swipe").trigger(u.coords[0] > q.coords[0] ? "swipeleft" : "swiperight")
                            }
                        }
                        u = q = e
                    })
                })
            }
        };
        (function(u, y) {
            var w = u(y),
                o, q, v, r, z, x = {
                    "0": true,
                    "180": true
                };
            if (u.support.orientation) {
                var t = y.innerWidth || u(y).width(),
                    p = y.innerHeight || u(y).height(),
                    s = 50;
                r = t > p && (t - p) > s;
                z = x[y.orientation];
                if ((r && z) || (!r && !z)) {
                    x = {
                        "-90": true,
                        "90": true
                    }
                }
            }
            u.event.special.orientationchange = o = {
                setup: function() {
                    if (u.support.orientation && u.mobile.orientationChangeEnabled) {
                        return false
                    }
                    v = q();
                    w.bind("throttledresize", A)
                },
                teardown: function() {
                    if (u.support.orientation && u.mobile.orientationChangeEnabled) {
                        return false
                    }
                    w.unbind("throttledresize", A)
                },
                add: function(B) {
                    var C = B.handler;
                    B.handler = function(D) {
                        D.orientation = q();
                        return C.apply(this, arguments)
                    }
                }
            };

            function A() {
                var B = q();
                if (B !== v) {
                    v = B;
                    w.trigger("orientationchange")
                }
            }
            u.event.special.orientationchange.orientation = q = function() {
                var C = true,
                    B = a.documentElement;
                if (u.support.orientation) {
                    C = x[y.orientation]
                } else {
                    C = B && B.clientWidth / B.clientHeight < 1.1
                }
                return C ? "portrait" : "landscape"
            }
        })(jQuery, m);
        (function() {
            g.event.special.throttledresize = {
                setup: function() {
                    g(this).bind("resize", q)
                },
                teardown: function() {
                    g(this).unbind("resize", q)
                }
            };
            var r = 250,
                q = function() {
                    t = (new Date()).getTime();
                    s = t - p;
                    if (s >= r) {
                        p = t;
                        g(this).trigger("throttledresize")
                    } else {
                        if (o) {
                            clearTimeout(o)
                        }
                        o = setTimeout(q, r - s)
                    }
                },
                p = 0,
                o, t, s
        })();
        g.each({
            scrollstop: "scrollstart",
            taphold: "tap",
            swipeleft: "swipe",
            swiperight: "swipe"
        }, function(p, o) {
            g.event.special[p] = {
                setup: function() {
                    g(this).bind(o, g.noop)
                }
            }
        })
    })(jQuery, this);
    (function(e, f) {
        e.widget("mobile.page", e.mobile.widget, {
            options: {
                theme: "c",
                domCache: false,
                keepNativeDefault: ":jqmData(role='none'), :jqmData(role='nojs')"
            },
            _create: function() {
                var g = this;
                if (g._trigger("beforecreate") === false) {
                    return false
                }
                g.element.attr("tabindex", "0").addClass("ui-page ui-body-" + g.options.theme).bind("pagebeforehide", function() {
                    g.removeContainerBackground()
                }).bind("pagebeforeshow", function() {
                    g.setContainerBackground()
                })
            },
            removeContainerBackground: function() {
                e.mobile.pageContainer.removeClass("ui-overlay-" + e.mobile.getInheritedTheme(this.element.parent()))
            },
            setContainerBackground: function(g) {
                if (this.options.theme) {
                    e.mobile.pageContainer.addClass("ui-overlay-" + (g || this.options.theme))
                }
            },
            keepNativeSelector: function() {
                var g = this.options,
                    h = g.keepNative && e.trim(g.keepNative);
                if (h && g.keepNative !== g.keepNativeDefault) {
                    return [g.keepNative, g.keepNativeDefault].join(", ")
                }
                return g.keepNativeDefault
            }
        })
    })(jQuery);
    (function(j, f, k) {
        var e = function(l) {
            if (l === k) {
                l = true
            }
            return function(D, u, n, B) {
                var C = new j.Deferred(),
                    m = u ? " reverse" : "",
                    s = j.mobile.urlHistory.getActive(),
                    y = s.lastScroll || j.mobile.defaultHomeScroll,
                    A = j.mobile.getScreenHeight(),
                    p = j.mobile.maxTransitionWidth !== false && j(f).width() > j.mobile.maxTransitionWidth,
                    o = !j.support.cssTransitions || p || !D || D === "none",
                    q = function() {
                        j.mobile.pageContainer.toggleClass("ui-mobile-viewport-transitioning viewport-" + D)
                    },
                    z = function() {
                        j.event.special.scrollstart.enabled = false;
                        f.scrollTo(0, y);
                        setTimeout(function() {
                            j.event.special.scrollstart.enabled = true
                        }, 150)
                    },
                    r = function() {
                        B.removeClass(j.mobile.activePageClass + " out in reverse " + D).height("")
                    },
                    w = function() {
                        if (!l) {
                            x()
                        } else {
                            B.animationComplete(x)
                        }
                        B.height(A + j(f).scrollTop()).addClass(D + " out" + m)
                    },
                    x = function() {
                        if (B && l) {
                            r()
                        }
                        t()
                    },
                    t = function() {
                        n.addClass(j.mobile.activePageClass);
                        j.mobile.focusPage(n);
                        n.height(A + y);
                        z();
                        if (!o) {
                            n.animationComplete(v)
                        }
                        n.addClass(D + " in" + m);
                        if (o) {
                            v()
                        }
                    },
                    v = function() {
                        if (!l) {
                            if (B) {
                                r()
                            }
                        }
                        n.removeClass("out in reverse " + D).height("");
                        q();
                        if (j(f).scrollTop() !== y) {
                            z()
                        }
                        C.resolve(D, u, n, B, true)
                    };
                q();
                if (B && !o) {
                    w()
                } else {
                    x()
                }
                return C.promise()
            }
        };
        var h = e(),
            g = e(false);
        j.mobile.defaultTransitionHandler = h;
        j.mobile.transitionHandlers = {
            "default": j.mobile.defaultTransitionHandler,
            sequential: h,
            simultaneous: g
        };
        j.mobile.transitionFallbacks = {}
    })(jQuery, this);
    (function(l, n) {
        var u = l(b),
            x = l("html"),
            r = l("head"),
            w = {
                urlParseRE: /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,
                parseUrl: function(H) {
                    if (l.type(H) === "object") {
                        return H
                    }
                    var I = w.urlParseRE.exec(H || "") || [];
                    return {
                        href: I[0] || "",
                        hrefNoHash: I[1] || "",
                        hrefNoSearch: I[2] || "",
                        domain: I[3] || "",
                        protocol: I[4] || "",
                        doubleSlash: I[5] || "",
                        authority: I[6] || "",
                        username: I[8] || "",
                        password: I[9] || "",
                        host: I[10] || "",
                        hostname: I[11] || "",
                        port: I[12] || "",
                        pathname: I[13] || "",
                        directory: I[14] || "",
                        filename: I[15] || "",
                        search: I[16] || "",
                        hash: I[17] || ""
                    }
                },
                makePathAbsolute: function(K, J) {
                    if (K && K.charAt(0) === "/") {
                        return K
                    }
                    K = K || "";
                    J = J ? J.replace(/^\/|(\/[^\/]*|[^\/]+)$/g, "") : "";
                    var H = J ? J.split("/") : [],
                        M = K.split("/");
                    for (var I = 0; I < M.length; I++) {
                        var L = M[I];
                        switch (L) {
                            case ".":
                                break;
                            case "..":
                                if (H.length) {
                                    H.pop()
                                }
                                break;
                            default:
                                H.push(L);
                                break
                        }
                    }
                    return "/" + H.join("/")
                },
                isSameDomain: function(I, H) {
                    return w.parseUrl(I).domain === w.parseUrl(H).domain
                },
                isRelativeUrl: function(H) {
                    return w.parseUrl(H).protocol === ""
                },
                isAbsoluteUrl: function(H) {
                    return w.parseUrl(H).protocol !== ""
                },
                makeUrlAbsolute: function(I, K) {
                    if (!w.isRelativeUrl(I)) {
                        return I
                    }
                    var M = w.parseUrl(I),
                        P = w.parseUrl(K),
                        Q = M.protocol || P.protocol,
                        J = M.protocol ? M.doubleSlash : (M.doubleSlash || P.doubleSlash),
                        N = M.authority || P.authority,
                        O = M.pathname !== "",
                        H = w.makePathAbsolute(M.pathname || P.filename, P.pathname),
                        R = M.search || (!O && P.search) || "",
                        L = M.hash;
                    return Q + J + N + H + R + L
                },
                addSearchParams: function(I, L) {
                    var H = w.parseUrl(I),
                        K = (typeof L === "object") ? l.param(L) : L,
                        J = H.search || "?";
                    return H.hrefNoSearch + J + (J.charAt(J.length - 1) !== "?" ? "&" : "") + K + (H.hash || "")
                },
                convertUrlToDataUrl: function(I) {
                    var H = w.parseUrl(I);
                    if (w.isEmbeddedPage(H)) {
                        return H.hash.split(F)[0].replace(/^#/, "")
                    } else {
                        if (w.isSameDomain(H, A)) {
                            return H.hrefNoHash.replace(A.domain, "")
                        }
                    }
                    return I
                },
                get: function(H) {
                    if (H === n) {
                        H = location.hash
                    }
                    return w.stripHash(H).replace(/[^\/]*\.[^\/*]+$/, "")
                },
                getFilePath: function(I) {
                    var H = "&" + l.mobile.subPageUrlKey;
                    return I && I.split(H)[0].split(F)[0]
                },
                set: function(H) {
                    location.hash = H
                },
                isPath: function(H) {
                    return (/\//).test(H)
                },
                clean: function(H) {
                    return H.replace(A.domain, "")
                },
                stripHash: function(H) {
                    return H.replace(/^#/, "")
                },
                cleanHash: function(H) {
                    return w.stripHash(H.replace(/\?.*$/, "").replace(F, ""))
                },
                isExternal: function(I) {
                    var H = w.parseUrl(I);
                    return H.protocol && H.domain !== k.domain ? true : false
                },
                hasProtocol: function(H) {
                    return (/^(:?\w+:)/).test(H)
                },
                isFirstPageUrl: function(J) {
                    var I = w.parseUrl(w.makeUrlAbsolute(J, A)),
                        L = I.hrefNoHash === k.hrefNoHash || (f && I.hrefNoHash === A.hrefNoHash),
                        H = l.mobile.firstPage,
                        K = H && H[0] ? H[0].id : n;
                    return L && (!I.hash || I.hash === "#" || (K && I.hash.replace(/^#/, "") === K))
                },
                isEmbeddedPage: function(I) {
                    var H = w.parseUrl(I);
                    if (H.protocol !== "") {
                        return (H.hash && (H.hrefNoHash === k.hrefNoHash || (f && H.hrefNoHash === A.hrefNoHash)))
                    }
                    return (/^#/).test(H.href)
                }
            },
            G = null,
            j = {
                stack: [],
                activeIndex: 0,
                getActive: function() {
                    return j.stack[j.activeIndex]
                },
                getPrev: function() {
                    return j.stack[j.activeIndex - 1]
                },
                getNext: function() {
                    return j.stack[j.activeIndex + 1]
                },
                addNew: function(H, K, J, I, L) {
                    if (j.getNext()) {
                        j.clearForward()
                    }
                    j.stack.push({
                        url: H,
                        transition: K,
                        title: J,
                        pageUrl: I,
                        role: L
                    });
                    j.activeIndex = j.stack.length - 1
                },
                clearForward: function() {
                    j.stack = j.stack.slice(0, j.activeIndex + 1)
                },
                directHashChange: function(K) {
                    var H, I, L, J = this.getActive();
                    l.each(j.stack, function(M, N) {
                        if (K.currentUrl === N.url) {
                            H = M < j.activeIndex;
                            I = !H;
                            L = M
                        }
                    });
                    this.activeIndex = L !== n ? L : this.activeIndex;
                    if (H) {
                        (K.either || K.isBack)(true)
                    } else {
                        if (I) {
                            (K.either || K.isForward)(false)
                        }
                    }
                },
                ignoreNextHashChange: false
            },
            z = "[tabindex],a,button:visible,select:visible,input",
            t = [],
            B = false,
            F = "&ui-state=dialog",
            q = r.children("base"),
            k = w.parseUrl(location.href),
            A = q.length ? w.parseUrl(w.makeUrlAbsolute(q.attr("href"), k.href)) : k,
            f = (k.hrefNoHash !== A.hrefNoHash);
        var m = l.support.dynamicBaseTag ? {
            element: (q.length ? q : l("<base>", {
                href: A.hrefNoHash
            }).prependTo(r)),
            set: function(H) {
                m.element.attr("href", w.makeUrlAbsolute(H, A))
            },
            reset: function() {
                m.element.attr("href", A.hrefNoHash)
            }
        } : n;
        l.mobile.focusPage = function(I) {
            var J = I.find("[autofocus]"),
                H = I.find(".ui-title:eq(0)");
            if (J.length) {
                J.focus();
                return
            }
            if (H.length) {
                H.focus()
            } else {
                I.focus()
            }
        };

        function D(H) {
            if (!!G && (!G.closest(".ui-page-active").length || H)) {
                G.removeClass(l.mobile.activeBtnClass)
            }
            G = null
        }

        function v() {
            B = false;
            if (t.length > 0) {
                l.mobile.changePage.apply(null, t.pop())
            }
        }
        var s = true,
            g, E;
        g = function() {
            if (!s) {
                return
            }
            var I = l.mobile.urlHistory.getActive();
            if (I) {
                var H = u.scrollTop();
                I.lastScroll = H < l.mobile.minScrollBack ? l.mobile.defaultHomeScroll : H
            }
        };
        E = function() {
            setTimeout(g, 100)
        };
        u.bind(l.support.pushState ? "popstate" : "hashchange", function() {
            s = false
        });
        u.one(l.support.pushState ? "popstate" : "hashchange", function() {
            s = true
        });
        u.one("pagecontainercreate", function() {
            l.mobile.pageContainer.bind("pagechange", function() {
                s = true;
                u.unbind("scrollstop", E);
                u.bind("scrollstop", E)
            })
        });
        u.bind("scrollstop", E);

        function C(J, K, M, H) {
            if (K) {
                K.data("page")._trigger("beforehide", null, {
                    nextPage: J
                })
            }
            J.data("page")._trigger("beforeshow", null, {
                prevPage: K || l("")
            });
            l.mobile.hidePageLoadingMsg();
            if (M && !l.support.cssTransform3d && l.mobile.transitionFallbacks[M]) {
                M = l.mobile.transitionFallbacks[M]
            }
            var I = l.mobile.transitionHandlers[M || "default"] || l.mobile.defaultTransitionHandler,
                L = I(M, H, J, K);
            L.done(function() {
                if (K) {
                    K.data("page")._trigger("hide", null, {
                        nextPage: J
                    })
                }
                J.data("page")._trigger("show", null, {
                    prevPage: K || l("")
                })
            });
            return L
        }

        function p() {
            return b.innerHeight || l(b).height()
        }
        l.mobile.getScreenHeight = p;

        function e() {
            var I = l("." + l.mobile.activePageClass),
                J = parseFloat(I.css("padding-top")),
                H = parseFloat(I.css("padding-bottom"));
            I.css("min-height", p() - J - H)
        }

        function y(H, I) {
            if (I) {
                H.attr("data-" + l.mobile.ns + "role", I)
            }
            H.page()
        }
        l.fn.animationComplete = function(H) {
            if (l.support.cssTransitions) {
                return l(this).one("webkitAnimationEnd animationend", H)
            } else {
                setTimeout(H, 0);
                return l(this)
            }
        };
        l.mobile.path = w;
        l.mobile.base = m;
        l.mobile.urlHistory = j;
        l.mobile.dialogHashKey = F;
        l.mobile.allowCrossDomainPages = false;
        l.mobile.getDocumentUrl = function(H) {
            return H ? l.extend({}, k) : k.href
        };
        l.mobile.getDocumentBase = function(H) {
            return H ? l.extend({}, A) : A.href
        };
        l.mobile._bindPageRemove = function() {
            var H = l(this);
            if (!H.data("page").options.domCache && H.is(":jqmData(external-page='true')")) {
                H.bind("pagehide.remove", function() {
                    var J = l(this),
                        I = new l.Event("pageremove");
                    J.trigger(I);
                    if (!I.isDefaultPrevented()) {
                        J.removeWithDependents()
                    }
                })
            }
        };
        l.mobile.loadPage = function(I, V) {
            var U = l.Deferred(),
                J = l.extend({}, l.mobile.loadPage.defaults, V),
                N = null,
                S = null,
                M = function() {
                    var W = (l.mobile.activePage && h(l.mobile.activePage));
                    return W || A.hrefNoHash
                },
                K = w.makeUrlAbsolute(I, M());
            if (J.data && J.type === "get") {
                K = w.addSearchParams(K, J.data);
                J.data = n
            }
            if (J.data && J.type === "post") {
                J.reloadPage = true
            }
            var R = w.getFilePath(K),
                O = w.convertUrlToDataUrl(K);
            J.pageContainer = J.pageContainer || l.mobile.pageContainer;
            N = J.pageContainer.children(":jqmData(url='" + O + "')");
            if (N.length === 0 && O && !w.isPath(O)) {
                N = J.pageContainer.children("#" + O).attr("data-" + l.mobile.ns + "url", O)
            }
            if (N.length === 0) {
                if (l.mobile.firstPage && w.isFirstPageUrl(R)) {
                    if (l.mobile.firstPage.parent().length) {
                        N = l(l.mobile.firstPage)
                    }
                } else {
                    if (w.isEmbeddedPage(R)) {
                        U.reject(K, V);
                        return U.promise()
                    }
                }
            }
            if (m) {
                m.reset()
            }
            if (N.length) {
                if (!J.reloadPage) {
                    y(N, J.role);
                    U.resolve(K, V, N);
                    return U.promise()
                }
                S = N
            }
            var L = J.pageContainer,
                T = new l.Event("pagebeforeload"),
                H = {
                    url: I,
                    absUrl: K,
                    dataUrl: O,
                    deferred: U,
                    options: J
                };
            L.trigger(T, H);
            if (T.isDefaultPrevented()) {
                return U.promise()
            }
            if (J.showLoadMsg) {
                var Q = setTimeout(function() {
                        // l.mobile.showPageLoadingMsg()
                    }, J.loadMsgDelay),
                    P = function() {
                        clearTimeout(Q);
                        l.mobile.hidePageLoadingMsg()
                    }
            }
            if (!(l.mobile.allowCrossDomainPages || w.isSameDomain(k, K))) {
                U.reject(K, V)
            } else {
                l.ajax({
                    url: R,
                    type: J.type,
                    data: J.data,
                    dataType: "html",
                    success: function(Y, ad, ac) {
                        var Z = l("<div></div>"),
                            W = Y.match(/<title[^>]*>([^<]*)/) && RegExp.$1,
                            ab = new RegExp("(<[^>]+\\bdata-" + l.mobile.ns + "role=[\"']?page[\"']?[^>]*>)"),
                            X = new RegExp("\\bdata-" + l.mobile.ns + "url=[\"']?([^\"'>]*)[\"']?");
                        if (ab.test(Y) && RegExp.$1 && X.test(RegExp.$1) && RegExp.$1) {
                            I = R = w.getFilePath(RegExp.$1)
                        }
                        if (m) {
                            m.set(R)
                        }
                        Z.get(0).innerHTML = Y;
                        N = Z.find(":jqmData(role='page'), :jqmData(role='dialog')").first();
                        if (!N.length) {
                            N = l("<div data-" + l.mobile.ns + "role='page'>" + Y.split(/<\/?body[^>]*>/gmi)[1] + "</div>")
                        }
                        if (W && !N.jqmData("title")) {
                            if (~W.indexOf("&")) {
                                W = l("<div>" + W + "</div>").text()
                            }
                            N.jqmData("title", W)
                        }
                        if (!l.support.dynamicBaseTag) {
                            var aa = w.get(R);
                            N.find("[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]").each(function() {
                                var af = l(this).is("[href]") ? "href" : l(this).is("[src]") ? "src" : "action",
                                    ae = l(this).attr(af);
                                ae = ae.replace(location.protocol + "//" + location.host + location.pathname, "");
                                if (!/^(\w+:|#|\/)/.test(ae)) {
                                    l(this).attr(af, aa + ae)
                                }
                            })
                        }
                        N.attr("data-" + l.mobile.ns + "url", w.convertUrlToDataUrl(R)).attr("data-" + l.mobile.ns + "external-page", true).appendTo(J.pageContainer);
                        N.one("pagecreate", l.mobile._bindPageRemove);
                        y(N, J.role);
                        if (K.indexOf("&" + l.mobile.subPageUrlKey) > -1) {
                            N = J.pageContainer.children(":jqmData(url='" + O + "')")
                        }
                        if (J.showLoadMsg) {
                            P()
                        }
                        H.xhr = ac;
                        H.textStatus = ad;
                        H.page = N;
                        J.pageContainer.trigger("pageload", H);
                        U.resolve(K, V, N, S)
                    },
                    error: function(Y, Z, W) {
                        if (m) {
                            m.set(w.get())
                        }
                        H.xhr = Y;
                        H.textStatus = Z;
                        H.errorThrown = W;
                        var X = new l.Event("pageloadfailed");
                        J.pageContainer.trigger(X, H);
                        if (X.isDefaultPrevented()) {
                            return
                        }
                        if (J.showLoadMsg) {
                            P();
                            l.mobile.showPageLoadingMsg(l.mobile.pageLoadErrorMessageTheme, l.mobile.pageLoadErrorMessage, true);
                            setTimeout(l.mobile.hidePageLoadingMsg, 1500)
                        }
                        U.reject(K, V)
                    }
                })
            }
            return U.promise()
        };
        l.mobile.loadPage.defaults = {
            type: "get",
            data: n,
            reloadPage: false,
            role: n,
            showLoadMsg: false,
            pageContainer: n,
            loadMsgDelay: 50
        };
        l.mobile.changePage = function(V, X) {
            if (B) {
                t.unshift(arguments);
                return
            }
            var P = l.extend({}, l.mobile.changePage.defaults, X);
            P.pageContainer = P.pageContainer || l.mobile.pageContainer;
            P.fromPage = P.fromPage || l.mobile.activePage;
            var R = P.pageContainer,
                L = new l.Event("pagebeforechange"),
                H = {
                    toPage: V,
                    options: P
                };
            R.trigger(L, H);
            if (L.isDefaultPrevented()) {
                return
            }
            V = H.toPage;
            B = true;
            if (typeof V == "string") {
                l.mobile.loadPage(V, P).done(function(aa, Z, ab, Y) {
                    B = false;
                    Z.duplicateCachedPage = Y;
                    l.mobile.changePage(ab, Z)
                }).fail(function(Z, Y) {
                    B = false;
                    D(true);
                    v();
                    P.pageContainer.trigger("pagechangefailed", H)
                });
                return
            }
            if (V[0] === l.mobile.firstPage[0] && !P.dataUrl) {
                P.dataUrl = k.hrefNoHash
            }
            var J = P.fromPage,
                I = (P.dataUrl && w.convertUrlToDataUrl(P.dataUrl)) || V.jqmData("url"),
                O = I,
                U = w.getFilePath(I),
                N = j.getActive(),
                W = j.activeIndex === 0,
                K = 0,
                S = a.title,
                M = P.role === "dialog" || V.jqmData("role") === "dialog";
            if (J && J[0] === V[0] && !P.allowSamePageTransition) {
                B = false;
                R.trigger("pagechange", H);
                return
            }
            y(V, P.role);
            if (P.fromHashChange) {
                j.directHashChange({
                    currentUrl: I,
                    isBack: function() {
                        K = -1
                    },
                    isForward: function() {
                        K = 1
                    }
                })
            }
            try {
                if (a.activeElement && a.activeElement.nodeName.toLowerCase() != "body") {
                    l(a.activeElement).blur()
                } else {
                    l("input:focus, textarea:focus, select:focus").blur()
                }
            } catch (T) {}
            if (M && N) {
                I = (N.url || "") + F
            }
            if (P.changeHash !== false && I) {
                j.ignoreNextHashChange = true;
                w.set(I)
            }
            var Q = (!N) ? S : V.jqmData("title") || V.children(":jqmData(role='header')").find(".ui-title").getEncodedText();
            if (!!Q && S == a.title) {
                S = Q
            }
            if (!V.jqmData("title")) {
                V.jqmData("title", S)
            }
            P.transition = P.transition || ((K && !W) ? N.transition : n) || (M ? l.mobile.defaultDialogTransition : l.mobile.defaultPageTransition);
            if (!K) {
                j.addNew(I, P.transition, S, O, P.role)
            }
            a.title = j.getActive().title;
            l.mobile.activePage = V;
            P.reverse = P.reverse || K < 0;
            C(V, J, P.transition, P.reverse).done(function(Z, Y, ac, ab, aa) {
                D();
                if (P.duplicateCachedPage) {
                    P.duplicateCachedPage.remove()
                }
                if (!aa) {
                    l.mobile.focusPage(V)
                }
                v();
                R.trigger("pagechange", H)
            })
        };
        l.mobile.changePage.defaults = {
            transition: n,
            reverse: false,
            changeHash: true,
            fromHashChange: false,
            role: n,
            duplicateCachedPage: n,
            pageContainer: n,
            showLoadMsg: true,
            dataUrl: n,
            fromPage: n,
            allowSamePageTransition: false
        };

        function o(H) {
            while (H) {
                if ((typeof H.nodeName === "string") && H.nodeName.toLowerCase() == "a") {
                    break
                }
                H = H.parentNode
            }
            return H
        }

        function h(J) {
            var H = l(J).closest(".ui-page").jqmData("url"),
                I = A.hrefNoHash;
            if (!H || !w.isPath(H)) {
                H = I
            }
            return w.makeUrlAbsolute(H, I)
        }
        l.mobile._registerInternalEvents = function() {
            l(a).delegate("form", "submit", function(J) {
                var L = l(this);
                if (!l.mobile.ajaxEnabled || L.is(":jqmData(ajax='false')") || !L.jqmHijackable().length) {
                    return
                }
                var I = L.attr("method"),
                    K = L.attr("target"),
                    H = L.attr("action");
                if (!H) {
                    H = h(L);
                    if (H === A.hrefNoHash) {
                        H = k.hrefNoSearch
                    }
                }
                H = w.makeUrlAbsolute(H, h(L));
                if (w.isExternal(H) || K) {
                    return
                }
                l.mobile.changePage(H, {
                    type: I && I.length && I.toLowerCase() || "get",
                    data: L.serialize(),
                    transition: L.jqmData("transition"),
                    direction: L.jqmData("direction"),
                    reloadPage: true
                });
                J.preventDefault()
            });
            l(a).bind("vclick", function(I) {
                if (I.which > 1 || !l.mobile.linkBindingEnabled) {
                    return
                }
                var H = o(I.target);
                if (!l(H).jqmHijackable().length) {
                    return
                }
                if (H) {
                    if (w.parseUrl(H.getAttribute("href") || "#").hash !== "#") {
                        D(true);
                        G = l(H).closest(".ui-btn").not(".ui-disabled");
                        G.addClass(l.mobile.activeBtnClass);
                        l("." + l.mobile.activePageClass + " .ui-btn").not(H).blur();
                        l(H).jqmData("href", l(H).attr("href")).attr("href", "#")
                    }
                }
            });
            l(a).bind("click", function(I) {
                if (!l.mobile.linkBindingEnabled) {
                    return
                }
                var S = o(I.target),
                    P = l(S),
                    L;
                if (!S || I.which > 1 || !P.jqmHijackable().length) {
                    return
                }
                L = function() {
                    b.setTimeout(function() {
                        D(true)
                    }, 200)
                };
                if (P.jqmData("href")) {
                    P.attr("href", P.jqmData("href"))
                }
                if (P.is(":jqmData(rel='back')")) {
                    b.history.back();
                    return false
                }
                var O = h(P),
                    J = w.makeUrlAbsolute(P.attr("href") || "#", O);
                if (!l.mobile.ajaxEnabled && !w.isEmbeddedPage(J)) {
                    L();
                    return
                }
                if (J.search("#") != -1) {
                    J = J.replace(/[^#]*#/, "");
                    if (!J) {
                        I.preventDefault();
                        return
                    } else {
                        if (w.isPath(J)) {
                            J = w.makeUrlAbsolute(J, O)
                        } else {
                            J = w.makeUrlAbsolute("#" + J, k.hrefNoHash)
                        }
                    }
                }
                var K = P.is("[rel='external']") || P.is(":jqmData(ajax='false')") || P.is("[target]"),
                    R = (l.mobile.allowCrossDomainPages && k.protocol === "file:" && J.search(/^https?:/) != -1),
                    H = K || (w.isExternal(J) && !R);
                if (H) {
                    L();
                    return
                }
                var Q = P.jqmData("transition"),
                    T = P.jqmData("direction"),
                    N = (T && T === "reverse") || P.jqmData("back"),
                    M = P.attr("data-" + l.mobile.ns + "rel") || n;
                l.mobile.changePage(J, {
                    transition: Q,
                    reverse: N,
                    role: M
                });
                I.preventDefault()
            });
            l(a).delegate(".ui-page", "pageshow.prefetch", function() {
                var H = [];
                l(this).find("a:jqmData(prefetch)").each(function() {
                    var I = l(this),
                        J = I.attr("href");
                    if (J && l.inArray(J, H) === -1) {
                        H.push(J);
                        l.mobile.loadPage(J, {
                            role: I.attr("data-" + l.mobile.ns + "rel")
                        })
                    }
                })
            });
            l.mobile._handleHashChange = function(I) {
                var K = w.stripHash(I),
                    J = l.mobile.urlHistory.stack.length === 0 ? "none" : n,
                    H = {
                        transition: J,
                        changeHash: false,
                        fromHashChange: true
                    };
                if (!l.mobile.hashListeningEnabled || j.ignoreNextHashChange) {
                    j.ignoreNextHashChange = false;
                    return
                }
                if (j.stack.length > 1 && K.indexOf(F) > -1) {
                    if (!l.mobile.activePage.is(".ui-dialog")) {
                        j.directHashChange({
                            currentUrl: K,
                            isBack: function() {
                                b.history.back()
                            },
                            isForward: function() {
                                b.history.forward()
                            }
                        });
                        return
                    } else {
                        j.directHashChange({
                            currentUrl: K,
                            either: function(L) {
                                var M = l.mobile.urlHistory.getActive();
                                K = M.pageUrl;
                                l.extend(H, {
                                    role: M.role,
                                    transition: M.transition,
                                    reverse: L
                                })
                            }
                        })
                    }
                }
                if (K) {
                    K = (typeof K === "string" && !w.isPath(K)) ? (w.makeUrlAbsolute("#" + K, A)) : K;
                    l.mobile.changePage(K, H)
                } else {
                    l.mobile.changePage(l.mobile.firstPage, H)
                }
            };
            u.bind("hashchange", function(I, H) {
                l.mobile._handleHashChange(location.hash)
            });
            l(a).bind("pageshow", e);
            l(b).bind("throttledresize", e)
        }
    })(jQuery);
    (function(j, h) {
        var g = {},
            e = g,
            k = j(h),
            f = j.mobile.path.parseUrl(location.href);
        j.extend(g, {
            initialFilePath: (function() {
                return f.pathname + f.search
            })(),
            initialHref: f.hrefNoHash,
            state: function() {
                return {
                    hash: location.hash || "#" + e.initialFilePath,
                    title: a.title,
                    initialHref: e.initialHref
                }
            },
            resetUIKeys: function(m) {
                var n = j.mobile.dialogHashKey,
                    l = "&" + j.mobile.subPageUrlKey,
                    o = m.indexOf(n);
                if (o > -1) {
                    m = m.slice(0, o) + "#" + m.slice(o)
                } else {
                    if (m.indexOf(l) > -1) {
                        m = m.split(l).join("#" + l)
                    }
                }
                return m
            },
            hashValueAfterReset: function(m) {
                var l = e.resetUIKeys(m);
                return j.mobile.path.parseUrl(l).hash
            },
            nextHashChangePrevented: function(l) {
                j.mobile.urlHistory.ignoreNextHashChange = l;
                e.onHashChangeDisabled = l
            },
            onHashChange: function(p) {
                if (e.onHashChangeDisabled) {
                    return
                }
                var l, m, o = location.hash,
                    q = j.mobile.path.isPath(o),
                    n = q ? location.href : j.mobile.getDocumentUrl();
                o = q ? o.replace("#", "") : o;
                m = e.state();
                l = j.mobile.path.makeUrlAbsolute(o, n);
                if (q) {
                    l = e.resetUIKeys(l)
                }
                history.replaceState(m, a.title, l)
            },
            onPopState: function(p) {
                var m = p.originalEvent.state,
                    o, q, n, l;
                if (m) {
                    q = e.hashValueAfterReset(j.mobile.urlHistory.getActive().url);
                    n = e.hashValueAfterReset(m.hash.replace("#", ""));
                    l = q !== n;
                    if (l) {
                        k.one("hashchange.pushstate", function() {
                            e.nextHashChangePrevented(false)
                        })
                    }
                    e.nextHashChangePrevented(false);
                    j.mobile._handleHashChange(m.hash);
                    if (l) {
                        e.nextHashChangePrevented(true)
                    }
                }
            },
            init: function() {
                k.bind("hashchange", e.onHashChange);
                k.bind("popstate", e.onPopState);
                if (location.hash === "") {
                    history.replaceState(e.state(), a.title, location.href)
                }
            }
        });
        j(function() {
            if (j.mobile.pushStateEnabled && j.support.pushState) {
                g.init()
            }
        })
    })(jQuery, this);
    (function(f, e, g) {
        f.mobile.transitionFallbacks.pop = "fade"
    })(jQuery, this);
    (function(f, e, g) {
        f.mobile.transitionHandlers.slide = f.mobile.transitionHandlers.simultaneous;
        f.mobile.transitionFallbacks.slide = "fade"
    })(jQuery, this);
    (function(f, e, g) {
        f.mobile.transitionFallbacks.slidedown = "fade"
    })(jQuery, this);
    (function(f, e, g) {
        f.mobile.transitionFallbacks.slideup = "fade"
    })(jQuery, this);
    (function(f, e, g) {
        f.mobile.transitionFallbacks.flip = "fade"
    })(jQuery, this);
    (function(f, e, g) {
        f.mobile.transitionFallbacks.flow = "fade"
    })(jQuery, this);
    (function(f, e, g) {
        f.mobile.transitionFallbacks.turn = "fade"
    })(jQuery, this);
    (function(e, f) {
        e.mobile.page.prototype.options.degradeInputs = {
            color: false,
            date: false,
            datetime: false,
            "datetime-local": false,
            email: false,
            month: false,
            number: false,
            range: "number",
            search: "text",
            tel: false,
            time: false,
            url: false,
            week: false
        };
        e(a).bind("pagecreate create", function(j) {
            var h = e.mobile.closestPageData(e(j.target)),
                g;
            if (!h) {
                return
            }
            g = h.options;
            e(j.target).find("input").not(h.keepNativeSelector()).each(function() {
                var q = e(this),
                    p = this.getAttribute("type"),
                    l = g.degradeInputs[p] || "text";
                if (g.degradeInputs[p]) {
                    var o = e("<div>").html(q.clone()).html(),
                        k = o.indexOf(" type=") > -1,
                        n = k ? /\s+type=["']?\w+['"]?/ : /\/?>/,
                        m = ' type="' + l + '" data-' + e.mobile.ns + 'type="' + p + '"' + (k ? "" : ">");
                    q.replaceWith(o.replace(n, m))
                }
            })
        })
    })(jQuery);
    (function(f, e, g) {
        f.widget("mobile.dialog", f.mobile.widget, {
            options: {
                closeBtnText: "Close",
                overlayTheme: "a",
                initSelector: ":jqmData(role='dialog')"
            },
            _create: function() {
                var j = this,
                    k = this.element,
                    h = f("<a href='#' data-" + f.mobile.ns + "icon='delete' data-" + f.mobile.ns + "iconpos='notext'>" + this.options.closeBtnText + "</a>"),
                    l = f("<div/>", {
                        role: "dialog",
                        "class": "ui-dialog-contain ui-corner-all ui-overlay-shadow"
                    });
                k.addClass("ui-dialog ui-overlay-" + this.options.overlayTheme);
                k.wrapInner(l).children().find(":jqmData(role='header')").prepend(h).end().children(":first-child").addClass("ui-corner-top").end().children(":last-child").addClass("ui-corner-bottom");
                h.bind("click", function() {
                    j.close()
                });
                k.bind("vclick submit", function(n) {
                    var m = f(n.target).closest(n.type === "vclick" ? "a" : "form"),
                        o;
                    if (m.length && !m.jqmData("transition")) {
                        o = f.mobile.urlHistory.getActive() || {};
                        m.attr("data-" + f.mobile.ns + "transition", (o.transition || f.mobile.defaultDialogTransition)).attr("data-" + f.mobile.ns + "direction", "reverse")
                    }
                }).bind("pagehide", function(n, m) {
                    f(this).find("." + f.mobile.activeBtnClass).removeClass(f.mobile.activeBtnClass)
                }).bind("pagebeforeshow", function() {
                    if (j.options.overlayTheme) {
                        j.element.page("removeContainerBackground").page("setContainerBackground", j.options.overlayTheme)
                    }
                })
            },
            close: function() {
                e.history.back()
            }
        });
        f(a).delegate(f.mobile.dialog.prototype.options.initSelector, "pagecreate", function() {
            f.mobile.dialog.prototype.enhance(this)
        })
    })(jQuery, this);
    (function(e, f) {
        e.fn.fieldcontain = function(g) {
            return this.addClass("ui-field-contain ui-body ui-br")
        };
        e(a).bind("pagecreate create", function(g) {
            e(":jqmData(role='fieldcontain')", g.target).jqmEnhanceable().fieldcontain()
        })
    })(jQuery);
    (function(e, f) {
        e.fn.grid = function(g) {
            return this.each(function() {
                var m = e(this),
                    n = e.extend({
                        grid: null
                    }, g),
                    p = m.children(),
                    k = {
                        solo: 1,
                        a: 2,
                        b: 3,
                        c: 4,
                        d: 5
                    },
                    h = n.grid,
                    j;
                if (!h) {
                    if (p.length <= 5) {
                        for (var l in k) {
                            if (k[l] === p.length) {
                                h = l
                            }
                        }
                    } else {
                        h = "a"
                    }
                }
                j = k[h];
                m.addClass("ui-grid-" + h);
                p.filter(":nth-child(" + j + "n+1)").addClass("ui-block-a");
                if (j > 1) {
                    p.filter(":nth-child(" + j + "n+2)").addClass("ui-block-b")
                }
                if (j > 2) {
                    p.filter(":nth-child(3n+3)").addClass("ui-block-c")
                }
                if (j > 3) {
                    p.filter(":nth-child(4n+4)").addClass("ui-block-d")
                }
                if (j > 4) {
                    p.filter(":nth-child(5n+5)").addClass("ui-block-e")
                }
            })
        }
    })(jQuery);
    (function(e, f) {
        e(a).bind("pagecreate create", function(g) {
            e(":jqmData(role='nojs')", g.target).addClass("ui-nojs")
        })
    })(jQuery);
    (function(f, g) {
        f.fn.buttonMarkup = function(x) {
            var q = this;
            x = (x && (f.type(x) == "object")) ? x : {};
            for (var l = 0; l < q.length; l++) {
                var k = q.eq(l),
                    n = k[0],
                    j = f.extend({}, f.fn.buttonMarkup.defaults, {
                        icon: x.icon !== g ? x.icon : k.jqmData("icon"),
                        iconpos: x.iconpos !== g ? x.iconpos : k.jqmData("iconpos"),
                        theme: x.theme !== g ? x.theme : k.jqmData("theme") || f.mobile.getInheritedTheme(k, "c"),
                        inline: x.inline !== g ? x.inline : k.jqmData("inline"),
                        shadow: x.shadow !== g ? x.shadow : k.jqmData("shadow"),
                        corners: x.corners !== g ? x.corners : k.jqmData("corners"),
                        iconshadow: x.iconshadow !== g ? x.iconshadow : k.jqmData("iconshadow"),
                        mini: x.mini !== g ? x.mini : k.jqmData("mini")
                    }, x),
                    u = "ui-btn-inner",
                    t = "ui-btn-text",
                    v, r, m, s, p, w;
                f.each(j, function(o, y) {
                    n.setAttribute("data-" + f.mobile.ns + o, y);
                    k.jqmData(o, y)
                });
                w = f.data(((n.tagName === "INPUT" || n.tagName === "BUTTON") ? n.parentNode : n), "buttonElements");
                if (w) {
                    n = w.outer;
                    k = f(n);
                    m = w.inner;
                    s = w.text;
                    f(w.icon).remove();
                    w.icon = null
                } else {
                    m = a.createElement(j.wrapperEls);
                    s = a.createElement(j.wrapperEls)
                }
                p = j.icon ? a.createElement("span") : null;
                if (e && !w) {
                    e()
                }
                if (!j.theme) {
                    j.theme = f.mobile.getInheritedTheme(k, "c")
                }
                v = "ui-btn ui-btn-up-" + j.theme;
                v += j.inline ? " ui-btn-inline" : "";
                v += j.shadow ? " ui-shadow" : "";
                v += j.corners ? " ui-btn-corner-all" : "";
                if (j.mini !== g) {
                    v += j.mini ? " ui-mini" : " ui-fullsize"
                }
                if (j.inline !== g) {
                    v += j.inline === false ? " ui-btn-block" : " ui-btn-inline"
                }
                if (j.icon) {
                    j.icon = "ui-icon-" + j.icon;
                    j.iconpos = j.iconpos || "left";
                    r = "ui-icon " + j.icon;
                    if (j.iconshadow) {
                        r += " ui-icon-shadow"
                    }
                }
                if (j.iconpos) {
                    v += " ui-btn-icon-" + j.iconpos;
                    if (j.iconpos == "notext" && !k.attr("title")) {
                        k.attr("title", k.getEncodedText())
                    }
                }
                u += j.corners ? " ui-btn-corner-all" : "";
                if (j.iconpos && j.iconpos === "notext" && !k.attr("title")) {
                    k.attr("title", k.getEncodedText())
                }
                if (w) {
                    k.removeClass(w.bcls || "")
                }
                k.removeClass("ui-link").addClass(v);
                m.className = u;
                s.className = t;
                if (!w) {
                    m.appendChild(s)
                }
                if (p) {
                    p.className = r;
                    if (!(w && w.icon)) {
                        p.appendChild(a.createTextNode("\u00a0"));
                        m.appendChild(p)
                    }
                }
                while (n.firstChild && !w) {
                    s.appendChild(n.firstChild)
                }
                if (!w) {
                    n.appendChild(m)
                }
                w = {
                    bcls: v,
                    outer: n,
                    inner: m,
                    text: s,
                    icon: p
                };
                f.data(n, "buttonElements", w);
                f.data(m, "buttonElements", w);
                f.data(s, "buttonElements", w);
                if (p) {
                    f.data(p, "buttonElements", w)
                }
            }
            return this
        };
        f.fn.buttonMarkup.defaults = {
            corners: true,
            shadow: true,
            iconshadow: true,
            wrapperEls: "span"
        };

        function h(k) {
            var j;
            while (k) {
                j = (typeof k.className === "string") && (k.className + " ");
                if (j && j.indexOf("ui-btn ") > -1 && j.indexOf("ui-disabled ") < 0) {
                    break
                }
                k = k.parentNode
            }
            return k
        }
        var e = function() {
            var k = f.mobile.buttonMarkup.hoverDelay,
                l, j;
            f(a).bind({
                "vmousedown vmousecancel vmouseup vmouseover vmouseout focus blur scrollstart": function(o) {
                    var p, n = f(h(o.target)),
                        m = o.type;
                    if (n.length) {
                        p = n.attr("data-" + f.mobile.ns + "theme");
                        if (m === "vmousedown") {
                            if (f.support.touch) {
                                l = setTimeout(function() {
                                    n.removeClass("ui-btn-up-" + p).addClass("ui-btn-down-" + p)
                                }, k)
                            } else {
                                n.removeClass("ui-btn-up-" + p).addClass("ui-btn-down-" + p)
                            }
                        } else {
                            if (m === "vmousecancel" || m === "vmouseup") {
                                n.removeClass("ui-btn-down-" + p).addClass("ui-btn-up-" + p)
                            } else {
                                if (m === "vmouseover" || m === "focus") {
                                    if (f.support.touch) {
                                        j = setTimeout(function() {
                                            n.removeClass("ui-btn-up-" + p).addClass("ui-btn-hover-" + p)
                                        }, k)
                                    } else {
                                        n.removeClass("ui-btn-up-" + p).addClass("ui-btn-hover-" + p)
                                    }
                                } else {
                                    if (m === "vmouseout" || m === "blur" || m === "scrollstart") {
                                        n.removeClass("ui-btn-hover-" + p + " ui-btn-down-" + p).addClass("ui-btn-up-" + p);
                                        if (l) {
                                            clearTimeout(l)
                                        }
                                        if (j) {
                                            clearTimeout(j)
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "focusin focus": function(m) {
                    f(h(m.target)).addClass(f.mobile.focusClass)
                },
                "focusout blur": function(m) {
                    f(h(m.target)).removeClass(f.mobile.focusClass)
                }
            });
            e = null
        };
        f(a).bind("pagecreate create", function(j) {
            f(":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a, .ui-bar > :jqmData(role='controlgroup') > a", j.target).not(".ui-btn, :jqmData(role='none'), :jqmData(role='nojs')").buttonMarkup()
        })
    })(jQuery);
    (function(e, f) {
        e.mobile.page.prototype.options.backBtnText = "Back";
        e.mobile.page.prototype.options.addBackBtn = false;
        e.mobile.page.prototype.options.backBtnTheme = null;
        e.mobile.page.prototype.options.headerTheme = "a";
        e.mobile.page.prototype.options.footerTheme = "a";
        e.mobile.page.prototype.options.contentTheme = null;
        e(a).delegate(":jqmData(role='page'), :jqmData(role='dialog')", "pagecreate", function(k) {
            var g = e(this),
                l = g.data("page").options,
                j = g.jqmData("role"),
                h = l.theme;
            e(":jqmData(role='header'), :jqmData(role='footer'), :jqmData(role='content')", this).jqmEnhanceable().each(function() {
                var r = e(this),
                    n = r.jqmData("role"),
                    o = r.jqmData("theme"),
                    m = o || l.contentTheme || (j === "dialog" && h),
                    q, s, u, p;
                r.addClass("ui-" + n);
                if (n === "header" || n === "footer") {
                    var t = o || (n === "header" ? l.headerTheme : l.footerTheme) || h;
                    r.addClass("ui-bar-" + t).attr("role", n === "header" ? "banner" : "contentinfo");
                    if (n === "header") {
                        q = r.children("a");
                        s = q.hasClass("ui-btn-left");
                        u = q.hasClass("ui-btn-right");
                        s = s || q.eq(0).not(".ui-btn-right").addClass("ui-btn-left").length;
                        u = u || q.eq(1).addClass("ui-btn-right").length
                    }
                    if (l.addBackBtn && n === "header" && e(".ui-page").length > 1 && g.jqmData("url") !== e.mobile.path.stripHash(location.hash) && !s) {
                        p = e("<a href='#' class='ui-btn-left' data-" + e.mobile.ns + "rel='back' data-" + e.mobile.ns + "icon='arrow-l'>" + l.backBtnText + "</a>").attr("data-" + e.mobile.ns + "theme", l.backBtnTheme || t).prependTo(r)
                    }
                    r.children("h1, h2, h3, h4, h5, h6").addClass("ui-title").attr({
                        role: "heading",
                        "aria-level": "1"
                    })
                } else {
                    if (n === "content") {
                        if (m) {
                            r.addClass("ui-body-" + (m))
                        }
                        r.attr("role", "main")
                    }
                }
            })
        })
    })(jQuery);
    (function(e, f) {
        e.widget("mobile.collapsible", e.mobile.widget, {
            options: {
                expandCueText: " click to expand contents",
                collapseCueText: " click to collapse contents",
                collapsed: true,
                heading: "h1,h2,h3,h4,h5,h6,legend",
                theme: null,
                contentTheme: null,
                iconTheme: "d",
                mini: false,
                initSelector: ":jqmData(role='collapsible')"
            },
            _create: function() {
                var j = this.element,
                    l = this.options,
                    k = j.addClass("ui-collapsible"),
                    g = j.children(l.heading).first(),
                    m = k.wrapInner("<div class='ui-collapsible-content'></div>").find(".ui-collapsible-content"),
                    h = j.closest(":jqmData(role='collapsible-set')").addClass("ui-collapsible-set");
                if (g.is("legend")) {
                    g = e("<div role='heading'>" + g.html() + "</div>").insertBefore(g);
                    g.next().remove()
                }
                if (h.length) {
                    if (!l.theme) {
                        l.theme = h.jqmData("theme") || e.mobile.getInheritedTheme(h, "c")
                    }
                    if (!l.contentTheme) {
                        l.contentTheme = h.jqmData("content-theme")
                    }
                    if (!l.iconPos) {
                        l.iconPos = h.jqmData("iconpos")
                    }
                    if (!l.mini) {
                        l.mini = h.jqmData("mini")
                    }
                }
                m.addClass((l.contentTheme) ? ("ui-body-" + l.contentTheme) : "");
                g.insertBefore(m).addClass("ui-collapsible-heading").append("<span class='ui-collapsible-heading-status'></span>").wrapInner("<a href='#' class='ui-collapsible-heading-toggle'></a>").find("a").first().buttonMarkup({
                    shadow: false,
                    corners: false,
                    iconpos: j.jqmData("iconpos") || l.iconPos || "left",
                    icon: "plus",
                    mini: l.mini,
                    theme: l.theme
                }).add(".ui-btn-inner", j).addClass("ui-corner-top ui-corner-bottom");
                k.bind("expand collapse", function(o) {
                    if (!o.isDefaultPrevented()) {
                        o.preventDefault();
                        var q = e(this),
                            p = (o.type === "collapse"),
                            n = l.contentTheme;
                        g.toggleClass("ui-collapsible-heading-collapsed", p).find(".ui-collapsible-heading-status").text(p ? l.expandCueText : l.collapseCueText).end().find(".ui-icon").toggleClass("ui-icon-minus", !p).toggleClass("ui-icon-plus", p);
                        q.toggleClass("ui-collapsible-collapsed", p);
                        m.toggleClass("ui-collapsible-content-collapsed", p).attr("aria-hidden", p);
                        if (n && (!h.length || k.jqmData("collapsible-last"))) {
                            g.find("a").first().add(g.find(".ui-btn-inner")).toggleClass("ui-corner-bottom", p);
                            m.toggleClass("ui-corner-bottom", !p)
                        }
                        m.trigger("updatelayout")
                    }
                }).trigger(l.collapsed ? "collapse" : "expand");
                g.bind("click", function(o) {
                    var n = g.is(".ui-collapsible-heading-collapsed") ? "expand" : "collapse";
                    k.trigger(n);
                    o.preventDefault()
                })
            }
        });
        e(a).bind("pagecreate create", function(g) {
            e.mobile.collapsible.prototype.enhanceWithin(g.target)
        })
    })(jQuery);
    (function(e, f) {
        e.widget("mobile.collapsibleset", e.mobile.widget, {
            options: {
                initSelector: ":jqmData(role='collapsible-set')"
            },
            _create: function() {
                var g = this.element.addClass("ui-collapsible-set"),
                    h = this.options;
                if (!h.theme) {
                    h.theme = e.mobile.getInheritedTheme(g, "c")
                }
                if (!h.contentTheme) {
                    h.contentTheme = g.jqmData("content-theme")
                }
                if (!h.corners) {
                    h.corners = g.jqmData("corners") === f ? true : false
                }
                if (!g.jqmData("collapsiblebound")) {
                    g.jqmData("collapsiblebound", true).bind("expand collapse", function(l) {
                        var n = (l.type === "collapse"),
                            k = e(l.target).closest(".ui-collapsible"),
                            m = k.data("collapsible"),
                            j = m.options.contentTheme;
                        if (j && k.jqmData("collapsible-last")) {
                            k.find(m.options.heading).first().find("a").first().add(".ui-btn-inner").toggleClass("ui-corner-bottom", n);
                            k.find(".ui-collapsible-content").toggleClass("ui-corner-bottom", !n)
                        }
                    }).bind("expand", function(j) {
                        e(j.target).closest(".ui-collapsible").siblings(".ui-collapsible").trigger("collapse")
                    })
                }
            },
            _init: function() {
                this.refresh()
            },
            refresh: function() {
                var g = this.element,
                    j = this.options,
                    h = g.children(":jqmData(role='collapsible')");
                e.mobile.collapsible.prototype.enhance(h.not(".ui-collapsible"));
                h.each(function() {
                    e(this).find(e.mobile.collapsible.prototype.options.heading).find("a").first().add(".ui-btn-inner").removeClass("ui-corner-top ui-corner-bottom")
                });
                h.first().find("a").first().addClass(j.corners ? "ui-corner-top" : "").find(".ui-btn-inner").addClass("ui-corner-top");
                h.last().jqmData("collapsible-last", true).find("a").first().addClass(j.corners ? "ui-corner-bottom" : "").find(".ui-btn-inner").addClass("ui-corner-bottom")
            }
        });
        e(a).bind("pagecreate create", function(g) {
            e.mobile.collapsibleset.prototype.enhanceWithin(g.target)
        })
    })(jQuery);
    (function(e, f) {
        e.widget("mobile.navbar", e.mobile.widget, {
            options: {
                iconpos: "top",
                grid: null,
                initSelector: ":jqmData(role='navbar')"
            },
            _create: function() {
                var j = this.element,
                    g = j.find("a"),
                    h = g.filter(":jqmData(icon)").length ? this.options.iconpos : f;
                j.addClass("ui-navbar").attr("role", "navigation").find("ul").jqmEnhanceable().grid({
                    grid: this.options.grid
                });
                if (!h) {
                    j.addClass("ui-navbar-noicons")
                }
                g.buttonMarkup({
                    corners: false,
                    shadow: false,
                    inline: true,
                    iconpos: h
                });
                j.delegate("a", "vclick", function(k) {
                    if (!e(k.target).hasClass("ui-disabled")) {
                        g.removeClass(e.mobile.activeBtnClass);
                        e(this).addClass(e.mobile.activeBtnClass)
                    }
                });
                j.closest(".ui-page").bind("pagebeforeshow", function() {
                    g.filter(".ui-state-persist").addClass(e.mobile.activeBtnClass)
                })
            }
        });
        e(a).bind("pagecreate create", function(g) {
            e.mobile.navbar.prototype.enhanceWithin(g.target)
        })
    })(jQuery);
    (function(e, g) {
        var f = {};
        e.widget("mobile.listview", e.mobile.widget, {
            options: {
                theme: null,
                countTheme: "c",
                headerTheme: "b",
                dividerTheme: "b",
                splitIcon: "arrow-r",
                splitTheme: "b",
                mini: false,
                inset: false,
                initSelector: ":jqmData(role='listview')"
            },
            _create: function() {
                var j = this,
                    h = "";
                h += j.options.inset ? " ui-listview-inset ui-corner-all ui-shadow " : "";
                h += j.element.jqmData("mini") || j.options.mini === true ? " ui-mini" : "";
                j.element.addClass(function(k, l) {
                    return l + " ui-listview " + h
                });
                j.refresh(true)
            },
            _removeCorners: function(h, k) {
                var j = "ui-corner-top ui-corner-tr ui-corner-tl",
                    l = "ui-corner-bottom ui-corner-br ui-corner-bl";
                h = h.add(h.find(".ui-btn-inner, .ui-li-link-alt, .ui-li-thumb"));
                if (k === "top") {
                    h.removeClass(j)
                } else {
                    if (k === "bottom") {
                        h.removeClass(l)
                    } else {
                        h.removeClass(j + " " + l)
                    }
                }
            },
            _refreshCorners: function(k) {
                var m, j, h, l;
                if (this.options.inset) {
                    m = this.element.children("li");
                    j = k ? m.not(".ui-screen-hidden") : m.filter(":visible");
                    this._removeCorners(m);
                    h = j.first().addClass("ui-corner-top");
                    h.add(h.find(".ui-btn-inner").not(".ui-li-link-alt span:first-child")).addClass("ui-corner-top").end().find(".ui-li-link-alt, .ui-li-link-alt span:first-child").addClass("ui-corner-tr").end().find(".ui-li-thumb").not(".ui-li-icon").addClass("ui-corner-tl");
                    l = j.last().addClass("ui-corner-bottom");
                    l.add(l.find(".ui-btn-inner")).find(".ui-li-link-alt").addClass("ui-corner-br").end().find(".ui-li-thumb").not(".ui-li-icon").addClass("ui-corner-bl")
                }
                if (!k) {
                    this.element.trigger("updatelayout")
                }
            },
            _findFirstElementByTagName: function(l, j, h, k) {
                var m = {};
                m[h] = m[k] = true;
                while (l) {
                    if (m[l.nodeName]) {
                        return l
                    }
                    l = l[j]
                }
                return null
            },
            _getChildrenByTagName: function(l, j, k) {
                var h = [],
                    m = {};
                m[j] = m[k] = true;
                l = l.firstChild;
                while (l) {
                    if (m[l.nodeName]) {
                        h.push(l)
                    }
                    l = l.nextSibling
                }
                return e(h)
            },
            _addThumbClasses: function(l) {
                var k, j, h = l.length;
                for (k = 0; k < h; k++) {
                    j = e(this._findFirstElementByTagName(l[k].firstChild, "nextSibling", "img", "IMG"));
                    if (j.length) {
                        j.addClass("ui-li-thumb");
                        e(this._findFirstElementByTagName(j[0].parentNode, "parentNode", "li", "LI")).addClass(j.is(".ui-li-icon") ? "ui-li-has-icon" : "ui-li-has-thumb")
                    }
                }
            },
            refresh: function(w) {
                this.parentPage = this.element.closest(".ui-page");
                this._createSubPages();
                var A = this.options,
                    h = this.element,
                    z = this,
                    E = h.jqmData("dividertheme") || A.dividerTheme,
                    x = h.jqmData("splittheme"),
                    p = h.jqmData("spliticon"),
                    y = this._getChildrenByTagName(h[0], "li", "LI"),
                    t = e.support.cssPseudoElement || !e.nodeName(h[0], "ol") ? 0 : 1,
                    v = {},
                    C, j, u, D, s, m, k, B, q, F, n;
                if (t) {
                    h.find(".ui-li-dec").remove()
                }
                if (!A.theme) {
                    A.theme = e.mobile.getInheritedTheme(this.element, "c")
                }
                for (var r = 0, l = y.length; r < l; r++) {
                    C = y.eq(r);
                    j = "ui-li";
                    if (w || !C.hasClass("ui-li")) {
                        u = C.jqmData("theme") || A.theme;
                        D = this._getChildrenByTagName(C[0], "a", "A");
                        if (D.length) {
                            B = C.jqmData("icon");
                            C.buttonMarkup({
                                wrapperEls: "div",
                                shadow: false,
                                corners: false,
                                iconpos: "right",
                                icon: D.length > 1 || B === false ? false : B || "arrow-r",
                                theme: u
                            });
                            if ((B != false) && (D.length == 1)) {
                                C.addClass("ui-li-has-arrow")
                            }
                            D.first().removeClass("ui-link").addClass("ui-link-inherit");
                            if (D.length > 1) {
                                j += " ui-li-has-alt";
                                s = D.last();
                                m = x || s.jqmData("theme") || A.splitTheme;
                                n = s.jqmData("icon");
                                s.appendTo(C).attr("title", s.getEncodedText()).addClass("ui-li-link-alt").empty().buttonMarkup({
                                    shadow: false,
                                    corners: false,
                                    theme: u,
                                    icon: false,
                                    iconpos: false
                                }).find(".ui-btn-inner").append(e(a.createElement("span")).buttonMarkup({
                                    shadow: true,
                                    corners: true,
                                    theme: m,
                                    iconpos: "notext",
                                    icon: n || B || p || A.splitIcon
                                }))
                            }
                        } else {
                            if (C.jqmData("role") === "list-divider") {
                                j += " ui-li-divider ui-bar-" + E;
                                C.attr("role", "heading");
                                if (t) {
                                    t = 1
                                }
                            } else {
                                j += " ui-li-static ui-body-" + u
                            }
                        }
                    }
                    if (t && j.indexOf("ui-li-divider") < 0) {
                        k = C.is(".ui-li-static:first") ? C : C.find(".ui-link-inherit");
                        k.addClass("ui-li-jsnumbering").prepend("<span class='ui-li-dec'>" + (t++) + ". </span>")
                    }
                    if (!v[j]) {
                        v[j] = []
                    }
                    v[j].push(C[0])
                }
                for (j in v) {
                    e(v[j]).addClass(j).children(".ui-btn-inner").addClass(j)
                }
                h.find("h1, h2, h3, h4, h5, h6").addClass("ui-li-heading").end().find("p, dl").addClass("ui-li-desc").end().find(".ui-li-aside").each(function() {
                    var o = e(this);
                    o.prependTo(o.parent())
                }).end().find(".ui-li-count").each(function() {
                    e(this).closest("li").addClass("ui-li-has-count")
                }).addClass("ui-btn-up-" + (h.jqmData("counttheme") || this.options.countTheme) + " ui-btn-corner-all");
                this._addThumbClasses(y);
                this._addThumbClasses(h.find(".ui-link-inherit"));
                this._refreshCorners(w)
            },
            _idStringEscape: function(h) {
                return h.replace(/[^a-zA-Z0-9]/g, "-")
            },
            _createSubPages: function() {
                var r = this.element,
                    s = r.closest(".ui-page"),
                    j = s.jqmData("url"),
                    m = j || s[0][e.expando],
                    k = r.attr("id"),
                    l = this.options,
                    n = "data-" + e.mobile.ns,
                    t = this,
                    q = s.find(":jqmData(role='footer')").jqmData("id"),
                    h;
                if (typeof f[m] === "undefined") {
                    f[m] = -1
                }
                k = k || ++f[m];
                e(r.find("li>ul, li>ol").toArray().reverse()).each(function(y) {
                    var D = this,
                        A = e(this),
                        z = A.attr("id") || k + "-" + y,
                        C = A.parent(),
                        E = e(A.prevAll().toArray().reverse()),
                        E = E.length ? E : e("<span>" + e.trim(C.contents()[0].nodeValue) + "</span>"),
                        B = E.first().getEncodedText(),
                        o = (j || "") + "&" + e.mobile.subPageUrlKey + "=" + z,
                        x = A.jqmData("theme") || l.theme,
                        u = A.jqmData("counttheme") || r.jqmData("counttheme") || l.countTheme,
                        v, w;
                    h = true;
                    v = A.detach().wrap("<div " + n + "role='page' " + n + "url='" + o + "' " + n + "theme='" + x + "' " + n + "count-theme='" + u + "'><div " + n + "role='content'></div></div>").parent().before("<div " + n + "role='header' " + n + "theme='" + l.headerTheme + "'><div class='ui-title'>" + B + "</div></div>").after(q ? e("<div " + n + "role='footer' " + n + "id='" + q + "'>") : "").parent().appendTo(e.mobile.pageContainer);
                    v.page();
                    w = C.find("a:first");
                    if (!w.length) {
                        w = e("<a/>").html(E || B).prependTo(C.empty())
                    }
                    w.attr("href", "#" + o)
                }).listview();
                if (h && s.is(":jqmData(external-page='true')") && s.data("page").options.domCache === false) {
                    var p = function(w, v) {
                        var o = v.nextPage,
                            u;
                        if (v.nextPage) {
                            u = o.jqmData("url");
                            if (u.indexOf(j + "&" + e.mobile.subPageUrlKey) !== 0) {
                                t.childPages().remove();
                                s.remove()
                            }
                        }
                    };
                    s.unbind("pagehide.remove").bind("pagehide.remove", p)
                }
            },
            childPages: function() {
                var h = this.parentPage.jqmData("url");
                return e(":jqmData(url^='" + h + "&" + e.mobile.subPageUrlKey + "')")
            }
        });
        e(a).bind("pagecreate create", function(h) {
            e.mobile.listview.prototype.enhanceWithin(h.target)
        })
    })(jQuery);
    (function(e, f) {
        e.widget("mobile.checkboxradio", e.mobile.widget, {
            options: {
                theme: null,
                initSelector: "input[type='checkbox'],input[type='radio']"
            },
            _create: function() {
                var x = this,
                    t = this.element,
                    o = function(y, z) {
                        return y.jqmData(z) || y.closest("form,fieldset").jqmData(z)
                    },
                    n = e(t).closest("label"),
                    s = n.length ? n : e(t).closest("form,fieldset,:jqmData(role='page'),:jqmData(role='dialog')").find("label").filter("[for='" + t[0].id + "']"),
                    v = t[0].type,
                    m = o(t, "mini"),
                    w = v + "-on",
                    u = v + "-off",
                    q = t.parents(":jqmData(type='horizontal')").length ? f : u,
                    p = o(t, "iconpos"),
                    h = q ? "" : " " + e.mobile.activeBtnClass,
                    l = "ui-" + w + h,
                    k = "ui-" + u,
                    r = "ui-icon-" + w,
                    g = "ui-icon-" + u;
                if (v !== "checkbox" && v !== "radio") {
                    return
                }
                e.extend(this, {
                    label: s,
                    inputtype: v,
                    checkedClass: l,
                    uncheckedClass: k,
                    checkedicon: r,
                    uncheckedicon: g
                });
                if (!this.options.theme) {
                    this.options.theme = e.mobile.getInheritedTheme(this.element, "c")
                }
                s.buttonMarkup({
                    theme: this.options.theme,
                    icon: q,
                    shadow: false,
                    mini: m,
                    iconpos: p
                });
                var j = a.createElement("div");
                j.className = "ui-" + v;
                t.add(s).wrapAll(j);
                s.bind({
                    vmouseover: function(y) {
                        if (e(this).parent().is(".ui-disabled")) {
                            y.stopPropagation()
                        }
                    },
                    vclick: function(y) {
                        if (t.is(":disabled")) {
                            y.preventDefault();
                            return
                        }
                        x._cacheVals();
                        t.prop("checked", v === "radio" && true || !t.prop("checked"));
                        t.triggerHandler("click");
                        x._getInputSet().not(t).prop("checked", false);
                        x._updateAll();
                        return false
                    }
                });
                t.bind({
                    vmousedown: function() {
                        x._cacheVals()
                    },
                    vclick: function() {
                        var y = e(this);
                        if (y.is(":checked")) {
                            y.prop("checked", true);
                            x._getInputSet().not(y).prop("checked", false)
                        } else {
                            y.prop("checked", false)
                        }
                        x._updateAll()
                    },
                    focus: function() {
                        s.addClass(e.mobile.focusClass)
                    },
                    blur: function() {
                        s.removeClass(e.mobile.focusClass)
                    }
                });
                this.refresh()
            },
            _cacheVals: function() {
                this._getInputSet().each(function() {
                    e(this).jqmData("cacheVal", this.checked)
                })
            },
            _getInputSet: function() {
                if (this.inputtype === "checkbox") {
                    return this.element
                }
                return this.element.closest("form,fieldset,:jqmData(role='page')").find("input[name='" + this.element[0].name + "'][type='" + this.inputtype + "']")
            },
            _updateAll: function() {
                var g = this;
                this._getInputSet().each(function() {
                    var h = e(this);
                    if (this.checked || g.inputtype === "checkbox") {
                        h.trigger("change")
                    }
                }).checkboxradio("refresh")
            },
            refresh: function() {
                var g = this.element[0],
                    h = this.label,
                    j = h.find(".ui-icon");
                if (g.checked) {
                    h.addClass(this.checkedClass).removeClass(this.uncheckedClass);
                    j.addClass(this.checkedicon).removeClass(this.uncheckedicon)
                } else {
                    h.removeClass(this.checkedClass).addClass(this.uncheckedClass);
                    j.removeClass(this.checkedicon).addClass(this.uncheckedicon)
                }
                if (g.disabled) {
                    this.disable()
                } else {
                    this.enable()
                }
            },
            disable: function() {
                this.element.prop("disabled", true).parent().addClass("ui-disabled")
            },
            enable: function() {
                this.element.prop("disabled", false).parent().removeClass("ui-disabled")
            }
        });
        e(a).bind("pagecreate create", function(g) {
            e.mobile.checkboxradio.prototype.enhanceWithin(g.target, true)
        })
    })(jQuery);
    (function(e, f) {
        e.widget("mobile.button", e.mobile.widget, {
            options: {
                theme: null,
                icon: null,
                iconpos: null,
                inline: false,
                corners: true,
                shadow: true,
                iconshadow: true,
                initSelector: "button, [type='button'], [type='submit'], [type='reset'], [type='image']",
                mini: false
            },
            _create: function() {
                var j = this.element,
                    m, n = this.options,
                    k, g, h = "",
                    l;
                if (j[0].tagName === "A") {
                    !j.hasClass("ui-btn") && j.buttonMarkup();
                    return
                }
                if (!this.options.theme) {
                    this.options.theme = e.mobile.getInheritedTheme(this.element, "c")
                }
                if (!!~j[0].className.indexOf("ui-btn-left")) {
                    h = "ui-btn-left"
                }
                if (!!~j[0].className.indexOf("ui-btn-right")) {
                    h = "ui-btn-right"
                }
                this.button = e("<div></div>").text(j.text() || j.val()).insertBefore(j).buttonMarkup({
                    theme: n.theme,
                    icon: n.icon,
                    iconpos: n.iconpos,
                    inline: n.inline,
                    corners: n.corners,
                    shadow: n.shadow,
                    iconshadow: n.iconshadow,
                    mini: n.mini
                }).addClass(h).append(j.addClass("ui-btn-hidden"));
                m = this.button;
                k = j.attr("type");
                g = j.attr("name");
                if (k !== "button" && k !== "reset" && g) {
                    j.bind("vclick", function() {
                        if (l === f) {
                            l = e("<input>", {
                                type: "hidden",
                                name: j.attr("name"),
                                value: j.attr("value")
                            }).insertBefore(j);
                            e(a).one("submit", function() {
                                l.remove();
                                l = f
                            })
                        }
                    })
                }
                j.bind({
                    focus: function() {
                        m.addClass(e.mobile.focusClass)
                    },
                    blur: function() {
                        m.removeClass(e.mobile.focusClass)
                    }
                });
                this.refresh()
            },
            enable: function() {
                this.element.attr("disabled", false);
                this.button.removeClass("ui-disabled").attr("aria-disabled", false);
                return this._setOption("disabled", false)
            },
            disable: function() {
                this.element.attr("disabled", true);
                this.button.addClass("ui-disabled").attr("aria-disabled", true);
                return this._setOption("disabled", true)
            },
            refresh: function() {
                var g = this.element;
                if (g.prop("disabled")) {
                    this.disable()
                } else {
                    this.enable()
                }
                e(this.button.data("buttonElements").text).text(g.text() || g.val())
            }
        });
        e(a).bind("pagecreate create", function(g) {
            e.mobile.button.prototype.enhanceWithin(g.target, true)
        })
    })(jQuery);
    (function(e, f) {
        e.fn.controlgroup = function(g) {
            function h(k, j) {
                k.removeClass("ui-btn-corner-all ui-shadow").eq(0).addClass(j[0]).end().last().addClass(j[1]).addClass("ui-controlgroup-last")
            }
            return this.each(function() {
                var k = e(this),
                    m = e.extend({
                        direction: k.jqmData("type") || "vertical",
                        shadow: false,
                        excludeInvisible: true,
                        mini: k.jqmData("mini")
                    }, g),
                    n = k.children("legend"),
                    j = m.direction == "horizontal" ? ["ui-corner-left", "ui-corner-right"] : ["ui-corner-top", "ui-corner-bottom"],
                    l = k.find("input").first().attr("type");
                if (n.length) {
                    k.wrapInner("<div class='ui-controlgroup-controls'></div>");
                    e("<div role='heading' class='ui-controlgroup-label'>" + n.html() + "</div>").insertBefore(k.children(0));
                    n.remove()
                }
                k.addClass("ui-corner-all ui-controlgroup ui-controlgroup-" + m.direction);
                h(k.find(".ui-btn" + (m.excludeInvisible ? ":visible" : "")).not(".ui-slider-handle"), j);
                h(k.find(".ui-btn-inner"), j);
                if (m.shadow) {
                    k.addClass("ui-shadow")
                }
                if (m.mini) {
                    k.addClass("ui-mini")
                }
            })
        }
    })(jQuery);
    (function(e, f) {
        e(a).bind("pagecreate create", function(g) {
            e(g.target).find("a").jqmEnhanceable().not(".ui-btn, .ui-link-inherit, :jqmData(role='none'), :jqmData(role='nojs')").addClass("ui-link")
        })
    })(jQuery);
    (function(g) {
        var h = g("meta[name=viewport]"),
            f = h.attr("content"),
            k = f + ",maximum-scale=1, user-scalable=no",
            j = f + ",maximum-scale=10, user-scalable=yes",
            e = /(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test(f);
        g.mobile.zoom = g.extend({}, {
            enabled: !e,
            locked: false,
            disable: function(l) {
                if (!e && !g.mobile.zoom.locked) {
                    h.attr("content", k);
                    g.mobile.zoom.enabled = false;
                    g.mobile.zoom.locked = l || false
                }
            },
            enable: function(l) {
                if (!e && (!g.mobile.zoom.locked || l === true)) {
                    h.attr("content", j);
                    g.mobile.zoom.enabled = true;
                    g.mobile.zoom.locked = false
                }
            },
            restore: function() {
                if (!e) {
                    h.attr("content", f);
                    g.mobile.zoom.enabled = true
                }
            }
        })
    }(jQuery));
    (function(e, f) {
        e.widget("mobile.textinput", e.mobile.widget, {
            options: {
                theme: null,
                preventFocusZoom: /iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1,
                initSelector: "input[type='text'], input[type='search'], :jqmData(type='search'), input[type='number'], :jqmData(type='number'), input[type='password'], input[type='email'], input[type='url'], input[type='tel'], textarea, input[type='time'], input[type='date'], input[type='month'], input[type='week'], input[type='datetime'], input[type='datetime-local'], input[type='color'], input:not([type])",
                clearSearchButtonText: "clear text"
            },
            _create: function() {
                var r = this.element,
                    j = this.options,
                    l = j.theme || e.mobile.getInheritedTheme(this.element, "c"),
                    u = " ui-body-" + l,
                    p = r.jqmData("mini") == true,
                    n = p ? " ui-mini" : "",
                    m, s;
                e("label[for='" + r.attr("id") + "']").addClass("ui-input-text");
                m = r.addClass("ui-input-text ui-body-" + l);
                if (typeof r[0].autocorrect !== "undefined" && !e.support.touchOverflow) {
                    r[0].setAttribute("autocorrect", "off");
                    r[0].setAttribute("autocomplete", "off")
                }
                if (r.is("[type='search'],:jqmData(type='search')")) {
                    m = r.wrap("<div class='ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield" + u + n + "'></div>").parent();
                    s = e("<a href='#' class='ui-input-clear' title='" + j.clearSearchButtonText + "'>" + j.clearSearchButtonText + "</a>").bind("click", function(o) {
                        r.val("").focus().trigger("change");
                        s.addClass("ui-input-clear-hidden");
                        o.preventDefault()
                    }).appendTo(m).buttonMarkup({
                        icon: "delete",
                        iconpos: "notext",
                        corners: true,
                        shadow: true,
                        mini: p
                    });

                    function h() {
                        setTimeout(function() {
                            s.toggleClass("ui-input-clear-hidden", !r.val())
                        }, 0)
                    }
                    h();
                    r.bind("paste cut keyup focus change blur", h)
                } else {
                    r.addClass("ui-corner-all ui-shadow-inset" + u + n)
                }
                r.focus(function() {
                    m.addClass(e.mobile.focusClass)
                }).blur(function() {
                    m.removeClass(e.mobile.focusClass)
                }).bind("focus", function() {
                    if (j.preventFocusZoom) {
                        e.mobile.zoom.disable(true)
                    }
                }).bind("blur", function() {
                    if (j.preventFocusZoom) {
                        e.mobile.zoom.enable(true)
                    }
                });
                if (r.is("textarea")) {
                    var k = 15,
                        q = 100,
                        g = function() {
                            var v = r[0].scrollHeight,
                                o = r[0].clientHeight;
                            if (o < v) {
                                r.height(v + k)
                            }
                        },
                        t;
                    r.keyup(function() {
                        clearTimeout(t);
                        t = setTimeout(g, q)
                    });
                    e(a).one("pagechange", g);
                    if (e.trim(r.val())) {
                        e(b).load(g)
                    }
                }
            },
            disable: function() {
                (this.element.attr("disabled", true).is("[type='search'],:jqmData(type='search')") ? this.element.parent() : this.element).addClass("ui-disabled")
            },
            enable: function() {
                (this.element.attr("disabled", false).is("[type='search'],:jqmData(type='search')") ? this.element.parent() : this.element).removeClass("ui-disabled")
            }
        });
        e(a).bind("pagecreate create", function(g) {
            e.mobile.textinput.prototype.enhanceWithin(g.target, true)
        })
    })(jQuery);
    (function(e, f) {
        e.mobile.listview.prototype.options.filter = false;
        e.mobile.listview.prototype.options.filterPlaceholder = "Filter items...";
        e.mobile.listview.prototype.options.filterTheme = "c";
        e.mobile.listview.prototype.options.filterCallback = function(h, g) {
            return h.toLowerCase().indexOf(g) === -1
        };
        e(a).delegate(":jqmData(role='listview')", "listviewcreate", function() {
            var j = e(this),
                h = j.data("listview");
            if (!h.options.filter) {
                return
            }
            var k = e("<form>", {
                    "class": "ui-listview-filter ui-bar-" + h.options.filterTheme,
                    role: "search"
                }),
                g = e("<input>", {
                    placeholder: h.options.filterPlaceholder
                }).attr("data-" + e.mobile.ns + "type", "search").jqmData("lastval", "").bind("keyup change", function() {
                    var p = e(this),
                        r = this.value.toLowerCase(),
                        o = null,
                        s = p.jqmData("lastval") + "",
                        q = false,
                        m = "",
                        n;
                    p.jqmData("lastval", r);
                    if (r.length < s.length || r.indexOf(s) !== 0) {
                        o = j.children()
                    } else {
                        o = j.children(":not(.ui-screen-hidden)")
                    }
                    if (r) {
                        for (var l = o.length - 1; l >= 0; l--) {
                            n = e(o[l]);
                            m = n.jqmData("filtertext") || n.text();
                            if (n.is("li:jqmData(role=list-divider)")) {
                                n.toggleClass("ui-filter-hidequeue", !q);
                                q = false
                            } else {
                                if (h.options.filterCallback(m, r)) {
                                    n.toggleClass("ui-filter-hidequeue", true)
                                } else {
                                    q = true
                                }
                            }
                        }
                        o.filter(":not(.ui-filter-hidequeue)").toggleClass("ui-screen-hidden", false);
                        o.filter(".ui-filter-hidequeue").toggleClass("ui-screen-hidden", true).toggleClass("ui-filter-hidequeue", false)
                    } else {
                        o.toggleClass("ui-screen-hidden", false)
                    }
                    h._refreshCorners()
                }).appendTo(k).textinput();
            if (h.options.inset) {
                k.addClass("ui-listview-filter-inset")
            }
            k.bind("submit", function() {
                return false
            }).insertBefore(j)
        })
    })(jQuery);
    (function(e, f) {
        e.widget("mobile.slider", e.mobile.widget, {
            options: {
                theme: null,
                trackTheme: null,
                disabled: false,
                initSelector: "input[type='range'], :jqmData(type='range'), :jqmData(role='slider')",
                mini: false
            },
            _create: function() {
                var u = this,
                    r = this.element,
                    z = e.mobile.getInheritedTheme(r, "c"),
                    J = this.options.theme || z,
                    w = this.options.trackTheme || z,
                    s = r[0].nodeName.toLowerCase(),
                    G = (s == "select") ? "ui-slider-switch" : "",
                    m = r.attr("id"),
                    t = m + "-label",
                    q = e("[for='" + m + "']").attr("id", t),
                    M = function() {
                        return s == "input" ? parseFloat(r.val()) : r[0].selectedIndex
                    },
                    y = s == "input" ? parseFloat(r.attr("min")) : 0,
                    C = s == "input" ? parseFloat(r.attr("max")) : r.find("option").length - 1,
                    p = b.parseFloat(r.attr("step") || 1),
                    v = (this.options.inline || r.jqmData("inline") == true) ? " ui-slider-inline" : "",
                    K = (this.options.mini || r.jqmData("mini")) ? " ui-slider-mini" : "",
                    H = a.createElement("a"),
                    I = e(H),
                    g = a.createElement("div"),
                    x = e(g),
                    F = r.jqmData("highlight") && s != "select" ? (function() {
                        var j = a.createElement("div");
                        j.className = "ui-slider-bg ui-btn-active ui-btn-corner-all";
                        return e(j).prependTo(x)
                    })() : false,
                    l;
                H.setAttribute("href", "#");
                g.setAttribute("role", "application");
                g.className = ["ui-slider ", G, " ui-btn-down-", w, " ui-btn-corner-all", v, K].join("");
                H.className = "ui-slider-handle";
                g.appendChild(H);
                I.buttonMarkup({
                    corners: true,
                    theme: J,
                    shadow: true
                }).attr({
                    role: "slider",
                    "aria-valuemin": y,
                    "aria-valuemax": C,
                    "aria-valuenow": M(),
                    "aria-valuetext": M(),
                    title: M(),
                    "aria-labelledby": t
                });
                e.extend(this, {
                    slider: x,
                    handle: I,
                    valuebg: F,
                    dragging: false,
                    beforeStart: null,
                    userModified: false,
                    mouseMoved: false
                });
                if (s == "select") {
                    var n = a.createElement("div");
                    n.className = "ui-slider-inneroffset";
                    for (var A = 0, k = g.childNodes.length; A < k; A++) {
                        n.appendChild(g.childNodes[A])
                    }
                    g.appendChild(n);
                    I.addClass("ui-slider-handle-snapping");
                    l = r.find("option");
                    for (var B = 0, L = l.length; B < L; B++) {
                        var h = !B ? "b" : "a",
                            o = !B ? " ui-btn-down-" + w : (" " + e.mobile.activeBtnClass),
                            E = a.createElement("div"),
                            D = a.createElement("span");
                        D.className = ["ui-slider-label ui-slider-label-", h, o, " ui-btn-corner-all"].join("");
                        D.setAttribute("role", "img");
                        D.appendChild(a.createTextNode(l[B].innerHTML));
                        e(D).prependTo(x)
                    }
                    u._labels = e(".ui-slider-label", x)
                }
                q.addClass("ui-slider");
                r.addClass(s === "input" ? "ui-slider-input" : "ui-slider-switch").change(function() {
                    if (!u.mouseMoved) {
                        u.refresh(M(), true)
                    }
                }).keyup(function() {
                    u.refresh(M(), true, true)
                }).blur(function() {
                    u.refresh(M(), true)
                });
                e(a).bind("vmousemove", function(j) {
                    if (u.dragging) {
                        u.mouseMoved = true;
                        if (s === "select") {
                            I.removeClass("ui-slider-handle-snapping")
                        }
                        u.refresh(j);
                        u.userModified = u.beforeStart !== r[0].selectedIndex;
                        return false
                    }
                });
                x.bind("vmousedown", function(j) {
                    u.dragging = true;
                    u.userModified = false;
                    u.mouseMoved = false;
                    if (s === "select") {
                        u.beforeStart = r[0].selectedIndex
                    }
                    u.refresh(j);
                    return false
                }).bind("vclick", false);
                x.add(a).bind("vmouseup", function() {
                    if (u.dragging) {
                        u.dragging = false;
                        if (s === "select") {
                            I.addClass("ui-slider-handle-snapping");
                            if (u.mouseMoved) {
                                if (u.userModified) {
                                    u.refresh(u.beforeStart == 0 ? 1 : 0)
                                } else {
                                    u.refresh(u.beforeStart)
                                }
                            } else {
                                u.refresh(u.beforeStart == 0 ? 1 : 0)
                            }
                        }
                        u.mouseMoved = false;
                        return false
                    }
                });
                x.insertAfter(r);
                if (s == "select") {
                    this.handle.bind({
                        focus: function() {
                            x.addClass(e.mobile.focusClass)
                        },
                        blur: function() {
                            x.removeClass(e.mobile.focusClass)
                        }
                    })
                }
                this.handle.bind({
                    vmousedown: function() {
                        e(this).focus()
                    },
                    vclick: false,
                    keydown: function(N) {
                        var j = M();
                        if (u.options.disabled) {
                            return
                        }
                        switch (N.keyCode) {
                            case e.mobile.keyCode.HOME:
                            case e.mobile.keyCode.END:
                            case e.mobile.keyCode.PAGE_UP:
                            case e.mobile.keyCode.PAGE_DOWN:
                            case e.mobile.keyCode.UP:
                            case e.mobile.keyCode.RIGHT:
                            case e.mobile.keyCode.DOWN:
                            case e.mobile.keyCode.LEFT:
                                N.preventDefault();
                                if (!u._keySliding) {
                                    u._keySliding = true;
                                    e(this).addClass("ui-state-active")
                                }
                                break
                        }
                        switch (N.keyCode) {
                            case e.mobile.keyCode.HOME:
                                u.refresh(y);
                                break;
                            case e.mobile.keyCode.END:
                                u.refresh(C);
                                break;
                            case e.mobile.keyCode.PAGE_UP:
                            case e.mobile.keyCode.UP:
                            case e.mobile.keyCode.RIGHT:
                                u.refresh(j + p);
                                break;
                            case e.mobile.keyCode.PAGE_DOWN:
                            case e.mobile.keyCode.DOWN:
                            case e.mobile.keyCode.LEFT:
                                u.refresh(j - p);
                                break
                        }
                    },
                    keyup: function(j) {
                        if (u._keySliding) {
                            u._keySliding = false;
                            e(this).removeClass("ui-state-active")
                        }
                    }
                });
                this.refresh(f, f, true)
            },
            refresh: function(y, w, n) {
                if (this.options.disabled || this.element.attr("disabled")) {
                    this.disable()
                }
                var o = this.element,
                    h, p = o[0].nodeName.toLowerCase(),
                    t = p === "input" ? parseFloat(o.attr("min")) : 0,
                    v = p === "input" ? parseFloat(o.attr("max")) : o.find("option").length - 1,
                    l = (p === "input" && parseFloat(o.attr("step")) > 0) ? parseFloat(o.attr("step")) : 1;
                if (typeof y === "object") {
                    var x = y,
                        r = 8;
                    if (!this.dragging || x.pageX < this.slider.offset().left - r || x.pageX > this.slider.offset().left + this.slider.width() + r) {
                        return
                    }
                    h = Math.round(((x.pageX - this.slider.offset().left) / this.slider.width()) * 100)
                } else {
                    if (y == null) {
                        y = p === "input" ? parseFloat(o.val() || 0) : o[0].selectedIndex
                    }
                    h = (parseFloat(y) - t) / (v - t) * 100
                }
                if (isNaN(h)) {
                    return
                }
                if (h < 0) {
                    h = 0
                }
                if (h > 100) {
                    h = 100
                }
                var q = (h / 100) * (v - t) + t;
                var u = (q - t) % l;
                var m = q - u;
                if (Math.abs(u) * 2 >= l) {
                    m += (u > 0) ? l : (-l)
                }
                q = parseFloat(m.toFixed(5));
                if (q < t) {
                    q = t
                }
                if (q > v) {
                    q = v
                }
                this.handle.css("left", h + "%");
                this.handle.attr({
                    "aria-valuenow": p === "input" ? q : o.find("option").eq(q).attr("value"),
                    "aria-valuetext": p === "input" ? q : o.find("option").eq(q).getEncodedText(),
                    title: p === "input" ? q : o.find("option").eq(q).getEncodedText()
                });
                this.valuebg && this.valuebg.css("width", h + "%");
                if (this._labels) {
                    var s = this.handle.width() / this.slider.width() * 100,
                        g = h && s + (100 - s) * h / 100,
                        j = h === 100 ? 0 : Math.min(s + 100 - g, 100);
                    this._labels.each(function() {
                        var z = e(this).is(".ui-slider-label-a");
                        e(this).width((z ? g : j) + "%")
                    })
                }
                if (!n) {
                    var k = false;
                    if (p === "input") {
                        k = o.val() !== q;
                        o.val(q)
                    } else {
                        k = o[0].selectedIndex !== q;
                        o[0].selectedIndex = q
                    }
                    if (!w && k) {
                        o.trigger("change")
                    }
                }
            },
            enable: function() {
                this.element.attr("disabled", false);
                this.slider.removeClass("ui-disabled").attr("aria-disabled", false);
                return this._setOption("disabled", false)
            },
            disable: function() {
                this.element.attr("disabled", true);
                this.slider.addClass("ui-disabled").attr("aria-disabled", true);
                return this._setOption("disabled", true)
            }
        });
        e(a).bind("pagecreate create", function(g) {
            e.mobile.slider.prototype.enhanceWithin(g.target, true)
        })
    })(jQuery);
    (function(e, f) {
        e.widget("mobile.selectmenu", e.mobile.widget, {
            options: {
                theme: null,
                disabled: false,
                icon: "arrow-d",
                iconpos: "right",
                inline: false,
                corners: true,
                shadow: true,
                iconshadow: true,
                overlayTheme: "a",
                hidePlaceholderMenuItems: true,
                closeText: "Close",
                nativeMenu: true,
                preventFocusZoom: /iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1,
                initSelector: "select:not(:jqmData(role='slider'))",
                mini: false
            },
            _button: function() {
                return e("<div/>")
            },
            _setDisabled: function(g) {
                this.element.attr("disabled", g);
                this.button.attr("aria-disabled", g);
                return this._setOption("disabled", g)
            },
            _focusButton: function() {
                var g = this;
                setTimeout(function() {
                    g.button.focus()
                }, 40)
            },
            _selectOptions: function() {
                return this.select.find("option")
            },
            _preExtension: function() {
                var g = "";
                if (!!~this.element[0].className.indexOf("ui-btn-left")) {
                    g = " ui-btn-left"
                }
                if (!!~this.element[0].className.indexOf("ui-btn-right")) {
                    g = " ui-btn-right"
                }
                this.select = this.element.wrap("<div class='ui-select" + g + "'>");
                this.selectID = this.select.attr("id");
                this.label = e("label[for='" + this.selectID + "']").addClass("ui-select");
                this.isMultiple = this.select[0].multiple;
                if (!this.options.theme) {
                    this.options.theme = e.mobile.getInheritedTheme(this.select, "c")
                }
            },
            _create: function() {
                this._preExtension();
                this._trigger("beforeCreate");
                this.button = this._button();
                var h = this,
                    j = this.options,
                    g = this.select[0].selectedIndex == -1 ? 0 : this.select[0].selectedIndex,
                    k = this.button.text(e(this.select[0].options.item(g)).text()).insertBefore(this.select).buttonMarkup({
                        theme: j.theme,
                        icon: j.icon,
                        iconpos: j.iconpos,
                        inline: j.inline,
                        corners: j.corners,
                        shadow: j.shadow,
                        iconshadow: j.iconshadow,
                        mini: j.mini
                    });
                if (j.nativeMenu && b.opera && b.opera.version) {
                    this.select.addClass("ui-select-nativeonly")
                }
                if (this.isMultiple) {
                    this.buttonCount = e("<span>").addClass("ui-li-count ui-btn-up-c ui-btn-corner-all").hide().appendTo(k.addClass("ui-li-has-count"))
                }
                if (j.disabled || this.element.attr("disabled")) {
                    this.disable()
                }
                this.select.change(function() {
                    h.refresh()
                });
                this.build()
            },
            build: function() {
                var g = this;
                this.select.appendTo(g.button).bind("vmousedown", function() {
                    g.button.addClass(e.mobile.activeBtnClass)
                }).bind("focus", function() {
                    g.button.addClass(e.mobile.focusClass)
                }).bind("blur", function() {
                    g.button.removeClass(e.mobile.focusClass)
                }).bind("focus vmouseover", function() {
                    g.button.trigger("vmouseover")
                }).bind("vmousemove", function() {
                    g.button.removeClass(e.mobile.activeBtnClass)
                }).bind("change blur vmouseout", function() {
                    g.button.trigger("vmouseout").removeClass(e.mobile.activeBtnClass)
                }).bind("change blur", function() {
                    g.button.removeClass("ui-btn-down-" + g.options.theme)
                });
                g.button.bind("vmousedown", function() {
                    if (g.options.preventFocusZoom) {
                        e.mobile.zoom.disable(true)
                    }
                }).bind("mouseup", function() {
                    if (g.options.preventFocusZoom) {
                        e.mobile.zoom.enable(true)
                    }
                })
            },
            selected: function() {
                return this._selectOptions().filter(":selected")
            },
            selectedIndices: function() {
                var g = this;
                return this.selected().map(function() {
                    return g._selectOptions().index(this)
                }).get()
            },
            setButtonText: function() {
                var g = this,
                    h = this.selected();
                this.button.find(".ui-btn-text").text(function() {
                    if (!g.isMultiple) {
                        return h.text()
                    }
                    return h.length ? h.map(function() {
                        return e(this).text()
                    }).get().join(", ") : g.placeholder
                })
            },
            setButtonCount: function() {
                var g = this.selected();
                if (this.isMultiple) {
                    this.buttonCount[g.length > 1 ? "show" : "hide"]().text(g.length)
                }
            },
            refresh: function() {
                this.setButtonText();
                this.setButtonCount()
            },
            open: e.noop,
            close: e.noop,
            disable: function() {
                this._setDisabled(true);
                this.button.addClass("ui-disabled")
            },
            enable: function() {
                this._setDisabled(false);
                this.button.removeClass("ui-disabled")
            }
        });
        e(a).bind("pagecreate create", function(g) {
            e.mobile.selectmenu.prototype.enhanceWithin(g.target, true)
        })
    })(jQuery);
    (function(f, g) {
        var e = function(o) {
            var u = o.select,
                y = o.selectID,
                r = o.label,
                h = o.select.closest(".ui-page"),
                k = f("<div>", {
                    "class": "ui-selectmenu-screen ui-screen-hidden"
                }).appendTo(h),
                w = o._selectOptions(),
                n = o.isMultiple = o.select[0].multiple,
                q = y + "-button",
                s = y + "-menu",
                t = f("<div data-" + f.mobile.ns + "role='dialog' data-" + f.mobile.ns + "theme='" + o.options.theme + "' data-" + f.mobile.ns + "overlay-theme='" + o.options.overlayTheme + "'><div data-" + f.mobile.ns + "role='header'><div class='ui-title'>" + r.getEncodedText() + "</div></div><div data-" + f.mobile.ns + "role='content'></div></div>"),
                j = f("<div>", {
                    "class": "ui-selectmenu ui-selectmenu-hidden ui-overlay-shadow ui-corner-all ui-body-" + o.options.overlayTheme + " " + f.mobile.defaultDialogTransition
                }).insertAfter(k),
                z = f("<ul>", {
                    "class": "ui-selectmenu-list",
                    id: s,
                    role: "listbox",
                    "aria-labelledby": q
                }).attr("data-" + f.mobile.ns + "theme", o.options.theme).appendTo(j),
                x = f("<div>", {
                    "class": "ui-header ui-bar-" + o.options.theme
                }).prependTo(j),
                v = f("<h1>", {
                    "class": "ui-title"
                }).appendTo(x),
                m, l, p;
            if (o.isMultiple) {
                p = f("<a>", {
                    text: o.options.closeText,
                    href: "#",
                    "class": "ui-btn-left"
                }).attr("data-" + f.mobile.ns + "iconpos", "notext").attr("data-" + f.mobile.ns + "icon", "delete").appendTo(x).buttonMarkup()
            }
            f.extend(o, {
                select: o.select,
                selectID: y,
                buttonId: q,
                menuId: s,
                thisPage: h,
                menuPage: t,
                label: r,
                screen: k,
                selectOptions: w,
                isMultiple: n,
                theme: o.options.theme,
                listbox: j,
                list: z,
                header: x,
                headerTitle: v,
                headerClose: p,
                menuPageContent: m,
                menuPageClose: l,
                placeholder: "",
                build: function() {
                    var A = this;
                    A.refresh();
                    A.select.attr("tabindex", "-1").focus(function() {
                        f(this).blur();
                        A.button.focus()
                    });
                    A.button.bind("vclick keydown", function(B) {
                        if (B.type == "vclick" || B.keyCode && (B.keyCode === f.mobile.keyCode.ENTER || B.keyCode === f.mobile.keyCode.SPACE)) {
                            A.open();
                            B.preventDefault()
                        }
                    });
                    A.list.attr("role", "listbox").bind("focusin", function(B) {
                        f(B.target).attr("tabindex", "0").trigger("vmouseover")
                    }).bind("focusout", function(B) {
                        f(B.target).attr("tabindex", "-1").trigger("vmouseout")
                    }).delegate("li:not(.ui-disabled, .ui-li-divider)", "click", function(D) {
                        var E = A.select[0].selectedIndex,
                            B = A.list.find("li:not(.ui-li-divider)").index(this),
                            C = A._selectOptions().eq(B)[0];
                        C.selected = A.isMultiple ? !C.selected : true;
                        if (A.isMultiple) {
                            f(this).find(".ui-icon").toggleClass("ui-icon-checkbox-on", C.selected).toggleClass("ui-icon-checkbox-off", !C.selected)
                        }
                        if (A.isMultiple || E !== B) {
                            A.select.trigger("change")
                        }
                        if (!A.isMultiple) {
                            A.close()
                        }
                        D.preventDefault()
                    }).keydown(function(E) {
                        var F = f(E.target),
                            B = F.closest("li"),
                            D, C;
                        switch (E.keyCode) {
                            case 38:
                                D = B.prev().not(".ui-selectmenu-placeholder");
                                if (D.is(".ui-li-divider")) {
                                    D = D.prev()
                                }
                                if (D.length) {
                                    F.blur().attr("tabindex", "-1");
                                    D.addClass("ui-btn-down-" + o.options.theme).find("a").first().focus()
                                }
                                return false;
                                break;
                            case 40:
                                C = B.next();
                                if (C.is(".ui-li-divider")) {
                                    C = C.next()
                                }
                                if (C.length) {
                                    F.blur().attr("tabindex", "-1");
                                    C.addClass("ui-btn-down-" + o.options.theme).find("a").first().focus()
                                }
                                return false;
                                break;
                            case 13:
                            case 32:
                                F.trigger("click");
                                return false;
                                break
                        }
                    });
                    A.menuPage.bind("pagehide", function() {
                        A.list.appendTo(A.listbox);
                        A._focusButton();
                        f.mobile._bindPageRemove.call(A.thisPage)
                    });
                    A.screen.bind("vclick", function(B) {
                        A.close()
                    });
                    if (A.isMultiple) {
                        A.headerClose.click(function() {
                            if (A.menuType == "overlay") {
                                A.close();
                                return false
                            }
                        })
                    }
                    A.thisPage.addDependents(this.menuPage)
                },
                _isRebuildRequired: function() {
                    var B = this.list.find("li"),
                        A = this._selectOptions();
                    return A.text() !== B.text()
                },
                refresh: function(E, H) {
                    var B = this,
                        A = this.element,
                        F = this.isMultiple,
                        C = this._selectOptions(),
                        D = this.selected(),
                        G = this.selectedIndices();
                    if (E || this._isRebuildRequired()) {
                        B._buildList()
                    }
                    B.setButtonText();
                    B.setButtonCount();
                    B.list.find("li:not(.ui-li-divider)").removeClass(f.mobile.activeBtnClass).attr("aria-selected", false).each(function(I) {
                        if (f.inArray(I, G) > -1) {
                            var J = f(this);
                            J.attr("aria-selected", true);
                            if (B.isMultiple) {
                                J.find(".ui-icon").removeClass("ui-icon-checkbox-off").addClass("ui-icon-checkbox-on")
                            } else {
                                if (J.is(".ui-selectmenu-placeholder")) {
                                    J.next().addClass(f.mobile.activeBtnClass)
                                } else {
                                    J.addClass(f.mobile.activeBtnClass)
                                }
                            }
                        }
                    })
                },
                close: function() {
                    if (this.options.disabled || !this.isOpen) {
                        return
                    }
                    var A = this;
                    if (A.menuType == "page") {
                        b.history.back()
                    } else {
                        A.screen.addClass("ui-screen-hidden");
                        A.listbox.addClass("ui-selectmenu-hidden").removeAttr("style").removeClass("in");
                        A.list.appendTo(A.listbox);
                        A._focusButton()
                    }
                    A.isOpen = false
                },
                open: function() {
                    if (this.options.disabled) {
                        return
                    }
                    var L = this,
                        J = f(b),
                        H = L.list.parent(),
                        M = H.outerHeight(),
                        C = H.outerWidth(),
                        Q = f(".ui-page-active"),
                        A = Q,
                        E = J.scrollTop(),
                        O = L.button.offset().top,
                        R = J.height(),
                        P = J.width();
                    L.button.addClass(f.mobile.activeBtnClass);
                    setTimeout(function() {
                        L.button.removeClass(f.mobile.activeBtnClass)
                    }, 300);

                    function N() {
                        L.list.find("." + f.mobile.activeBtnClass + " a").focus()
                    }
                    if (M > R - 80 || !f.support.scrollTop) {
                        L.menuPage.appendTo(f.mobile.pageContainer).page();
                        L.menuPageContent = t.find(".ui-content");
                        L.menuPageClose = t.find(".ui-header a");
                        L.thisPage.unbind("pagehide.remove");
                        if (E == 0 && O > R) {
                            L.thisPage.one("pagehide", function() {
                                f(this).jqmData("lastScroll", O)
                            })
                        }
                        L.menuPage.one("pageshow", function() {
                            N();
                            L.isOpen = true
                        });
                        L.menuType = "page";
                        L.menuPageContent.append(L.list);
                        L.menuPage.find("div .ui-title").text(L.label.text());
                        f.mobile.changePage(L.menuPage, {
                            transition: f.mobile.defaultDialogTransition
                        })
                    } else {
                        L.menuType = "overlay";
                        L.screen.height(f(a).height()).removeClass("ui-screen-hidden");
                        var D = O - E,
                            B = E + R - O,
                            G = M / 2,
                            K = parseFloat(L.list.parent().css("max-width")),
                            F, I;
                        if (D > M / 2 && B > M / 2) {
                            F = O + (L.button.outerHeight() / 2) - G
                        } else {
                            F = D > B ? E + R - M - 30 : E + 30
                        }
                        if (C < K) {
                            I = (P - C) / 2
                        } else {
                            I = L.button.offset().left + L.button.outerWidth() / 2 - C / 2;
                            if (I < 30) {
                                I = 30
                            } else {
                                if ((I + C) > P) {
                                    I = P - C - 30
                                }
                            }
                        }
                        L.listbox.append(L.list).removeClass("ui-selectmenu-hidden").css({
                            top: F,
                            left: I
                        }).addClass("in");
                        N();
                        L.isOpen = true
                    }
                },
                _buildList: function() {
                    var L = this,
                        Q = this.options,
                        D = this.placeholder,
                        C = true,
                        T = [],
                        A = [],
                        G = L.isMultiple ? "checkbox-off" : "false";
                    L.list.empty().filter(".ui-listview").listview("destroy");
                    var R = L.select.find("option"),
                        I = R.length,
                        P = this.select[0],
                        Y = "data-" + f.mobile.ns,
                        U = Y + "option-index",
                        Z = Y + "icon",
                        E = Y + "role",
                        B = a.createDocumentFragment(),
                        N;
                    for (var V = 0; V < I; V++) {
                        var K = R[V],
                            S = f(K),
                            H = K.parentNode,
                            J = S.text(),
                            F = a.createElement("a"),
                            X = [];
                        F.setAttribute("href", "#");
                        F.appendChild(a.createTextNode(J));
                        if (H !== P && H.nodeName.toLowerCase() === "optgroup") {
                            var M = H.getAttribute("label");
                            if (M != N) {
                                var O = a.createElement("li");
                                O.setAttribute(E, "list-divider");
                                O.setAttribute("role", "option");
                                O.setAttribute("tabindex", "-1");
                                O.appendChild(a.createTextNode(M));
                                B.appendChild(O);
                                N = M
                            }
                        }
                        if (C && (!K.getAttribute("value") || J.length == 0 || S.jqmData("placeholder"))) {
                            C = false;
                            if (Q.hidePlaceholderMenuItems) {
                                X.push("ui-selectmenu-placeholder")
                            }
                            if (!D) {
                                D = L.placeholder = J
                            }
                        }
                        var W = a.createElement("li");
                        if (K.disabled) {
                            X.push("ui-disabled");
                            W.setAttribute("aria-disabled", true)
                        }
                        W.setAttribute(U, V);
                        W.setAttribute(Z, G);
                        W.className = X.join(" ");
                        W.setAttribute("role", "option");
                        F.setAttribute("tabindex", "-1");
                        W.appendChild(F);
                        B.appendChild(W)
                    }
                    L.list[0].appendChild(B);
                    if (!this.isMultiple && !D.length) {
                        this.header.hide()
                    } else {
                        this.headerTitle.text(this.placeholder)
                    }
                    L.list.listview()
                },
                _button: function() {
                    return f("<a>", {
                        href: "#",
                        role: "button",
                        id: this.buttonId,
                        "aria-haspopup": "true",
                        "aria-owns": this.menuId
                    })
                }
            })
        };
        f(a).bind("selectmenubeforecreate", function(j) {
            var h = f(j.target).data("selectmenu");
            if (!h.options.nativeMenu) {
                e(h)
            }
        })
    })(jQuery);
    (function(e, f) {
        e.widget("mobile.fixedtoolbar", e.mobile.widget, {
            options: {
                visibleOnPageShow: true,
                disablePageZoom: true,
                transition: "slide",
                fullscreen: false,
                tapToggle: true,
                tapToggleBlacklist: "a, input, select, textarea, .ui-header-fixed, .ui-footer-fixed",
                hideDuringFocus: "input, textarea, select",
                updatePagePadding: true,
                trackPersistentToolbars: true,
                supportBlacklist: function() {
                    var p = b,
                        h = navigator.userAgent,
                        k = navigator.platform,
                        o = h.match(/AppleWebKit\/([0-9]+)/),
                        n = !!o && o[1],
                        j = h.match(/Fennec\/([0-9]+)/),
                        l = !!j && j[1],
                        m = h.match(/Opera Mobi\/([0-9]+)/),
                        g = !!m && m[1];
                    if (((k.indexOf("iPhone") > -1 || k.indexOf("iPad") > -1 || k.indexOf("iPod") > -1) && n && n < 534) || (p.operamini && ({}).toString.call(p.operamini) === "[object OperaMini]") || (m && g < 7458) || (h.indexOf("Android") > -1 && n && n < 533) || (l && l < 6) || ("palmGetResource" in b && n && n < 534) || (h.indexOf("MeeGo") > -1 && h.indexOf("NokiaBrowser/8.5.0") > -1)) {
                        return true
                    }
                    return false
                },
                initSelector: ":jqmData(position='fixed')"
            },
            _create: function() {
                var g = this,
                    l = g.options,
                    j = g.element,
                    k = j.is(":jqmData(role='header')") ? "header" : "footer",
                    h = j.closest(".ui-page");
                if (l.supportBlacklist()) {
                    g.destroy();
                    return
                }
                j.addClass("ui-" + k + "-fixed");
                if (l.fullscreen) {
                    j.addClass("ui-" + k + "-fullscreen");
                    h.addClass("ui-page-" + k + "-fullscreen")
                } else {
                    h.addClass("ui-page-" + k + "-fixed")
                }
                g._addTransitionClass();
                g._bindPageEvents();
                g._bindToggleHandlers()
            },
            _addTransitionClass: function() {
                var g = this.options.transition;
                if (g && g !== "none") {
                    if (g === "slide") {
                        g = this.element.is(".ui-header") ? "slidedown" : "slideup"
                    }
                    this.element.addClass(g)
                }
            },
            _bindPageEvents: function() {
                var g = this,
                    j = g.options,
                    h = g.element;
                h.closest(".ui-page").bind("pagebeforeshow", function() {
                    if (j.disablePageZoom) {
                        e.mobile.zoom.disable(true)
                    }
                    if (!j.visibleOnPageShow) {
                        g.hide(true)
                    }
                }).bind("webkitAnimationStart animationstart updatelayout", function() {
                    if (j.updatePagePadding) {
                        g.updatePagePadding()
                    }
                }).bind("pageshow", function() {
                    g.updatePagePadding();
                    if (j.updatePagePadding) {
                        e(b).bind("throttledresize." + g.widgetName, function() {
                            g.updatePagePadding()
                        })
                    }
                }).bind("pagebeforehide", function(n, m) {
                    if (j.disablePageZoom) {
                        e.mobile.zoom.enable(true)
                    }
                    if (j.updatePagePadding) {
                        e(b).unbind("throttledresize." + g.widgetName)
                    }
                    if (j.trackPersistentToolbars) {
                        var p = e(".ui-footer-fixed:jqmData(id)", this),
                            o = e(".ui-header-fixed:jqmData(id)", this),
                            l = p.length && m.nextPage && e(".ui-footer-fixed:jqmData(id='" + p.jqmData("id") + "')", m.nextPage),
                            k = o.length && m.nextPage && e(".ui-header-fixed:jqmData(id='" + o.jqmData("id") + "')", m.nextPage);
                        l = l || e();
                        if (l.length || k.length) {
                            l.add(k).appendTo(e.mobile.pageContainer);
                            m.nextPage.one("pageshow", function() {
                                l.add(k).appendTo(this)
                            })
                        }
                    }
                })
            },
            _visible: true,
            updatePagePadding: function() {
                var g = this.element,
                    h = g.is(".ui-header");
                if (this.options.fullscreen) {
                    return
                }
                g.closest(".ui-page").css("padding-" + (h ? "top" : "bottom"), g.outerHeight())
            },
            _useTransition: function(l) {
                var o = e(b),
                    k = this.element,
                    g = o.scrollTop(),
                    h = k.height(),
                    n = k.closest(".ui-page").height(),
                    j = e.mobile.getScreenHeight(),
                    m = k.is(":jqmData(role='header')") ? "header" : "footer";
                return !l && (this.options.transition && this.options.transition !== "none" && ((m === "header" && !this.options.fullscreen && g > h) || (m === "footer" && !this.options.fullscreen && g + j < n - h)) || this.options.fullscreen)
            },
            show: function(h) {
                var j = "ui-fixed-hidden",
                    g = this.element;
                if (this._useTransition(h)) {
                    g.removeClass("out " + j).addClass("in")
                } else {
                    g.removeClass(j)
                }
                this._visible = true
            },
            hide: function(h) {
                var k = "ui-fixed-hidden",
                    g = this.element,
                    j = "out" + (this.options.transition === "slide" ? " reverse" : "");
                if (this._useTransition(h)) {
                    g.addClass(j).removeClass("in").animationComplete(function() {
                        g.addClass(k).removeClass(j)
                    })
                } else {
                    g.addClass(k).removeClass(j)
                }
                this._visible = false
            },
            toggle: function() {
                this[this._visible ? "hide" : "show"]()
            },
            _bindToggleHandlers: function() {
                var g = this,
                    j = g.options,
                    h = g.element;
                h.closest(".ui-page").bind("vclick", function(k) {
                    if (j.tapToggle && !e(k.target).closest(j.tapToggleBlacklist).length) {
                        g.toggle()
                    }
                }).bind("focusin focusout", function(k) {
                    if (screen.width < 500 && e(k.target).is(j.hideDuringFocus) && !e(k.target).closest(".ui-header-fixed, .ui-footer-fixed").length) {
                        g[(k.type === "focusin" && g._visible) ? "hide" : "show"]()
                    }
                })
            },
            destroy: function() {
                this.element.removeClass("ui-header-fixed ui-footer-fixed ui-header-fullscreen ui-footer-fullscreen in out fade slidedown slideup ui-fixed-hidden");
                this.element.closest(".ui-page").removeClass("ui-page-header-fixed ui-page-footer-fixed ui-page-header-fullscreen ui-page-footer-fullscreen")
            }
        });
        e(a).bind("pagecreate create", function(g) {
            if (e(g.target).jqmData("fullscreen")) {
                e(e.mobile.fixedtoolbar.prototype.options.initSelector, g.target).not(":jqmData(fullscreen)").jqmData("fullscreen", true)
            }
            e.mobile.fixedtoolbar.prototype.enhanceWithin(g.target)
        })
    })(jQuery);
    (function(g, h) {
        if (!(/iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1)) {
            return
        }
        var n = g.mobile.zoom,
            m, l, k, j, e;

        function f(o) {
            m = o.originalEvent;
            e = m.accelerationIncludingGravity;
            l = Math.abs(e.x);
            k = Math.abs(e.y);
            j = Math.abs(e.z);
            if (!h.orientation && (l > 7 || ((j > 6 && k < 8 || j < 8 && k > 6) && l > 5))) {
                if (n.enabled) {
                    n.disable()
                }
            } else {
                if (!n.enabled) {
                    n.enable()
                }
            }
        }
        g(h).bind("orientationchange.iosorientationfix", n.enable).bind("devicemotion.iosorientationfix", f)
    }(jQuery, this));
    (function(l, m, g) {
        var j = l("html"),
            n = l("head"),
            f = l(m);
        l(m.document).trigger("mobileinit");
        if (!l.mobile.gradeA()) {
            return
        }
        if (l.mobile.ajaxBlacklist) {
            l.mobile.ajaxEnabled = false
        }
        j.addClass("ui-mobile ui-mobile-rendering");
        setTimeout(p, 5000);
        var h = "ui-loader",
            k = l("<div class='" + h + "'><span class='ui-icon ui-icon-loading'></span><h1></h1></div>");

        function e() {
            var q = l("." + l.mobile.activeBtnClass).first();
            k.css({
                top: l.support.scrollTop && f.scrollTop() + f.height() / 2 || q.length && q.offset().top || 100
            })
        }

        function o() {
            var r = k.offset(),
                q = f.scrollTop(),
                s = l.mobile.getScreenHeight();
            if (r.top < q || (r.top - q) > s) {
                k.addClass("ui-loader-fakefix");
                e();
                f.unbind("scroll", o).bind("scroll", e)
            }
        }

        function p() {
            j.removeClass("ui-mobile-rendering")
        }
        l.extend(l.mobile, {
            showPageLoadingMsg: function(s, q, t) {
                j.addClass("ui-loading");
                if (l.mobile.loadingMessage) {
                    var r = t || l.mobile.loadingMessageTextVisible;
                    s = s || l.mobile.loadingMessageTheme, k.attr("class", h + " ui-corner-all ui-body-" + (s || "a") + " ui-loader-" + (r ? "verbose" : "default") + (t ? " ui-loader-textonly" : "")).find("h1").text(q || l.mobile.loadingMessage).end().appendTo(l.mobile.pageContainer);
                    o();
                    f.bind("scroll", o)
                }
            },
            hidePageLoadingMsg: function() {
                j.removeClass("ui-loading");
                if (l.mobile.loadingMessage) {
                    k.removeClass("ui-loader-fakefix")
                }
                l(m).unbind("scroll", e);
                l(m).unbind("scroll", o)
            },
            initializePage: function() {
                var q = l(":jqmData(role='page'), :jqmData(role='dialog')");
                if (!q.length) {
                    q = l("body").wrapInner("<div data-" + l.mobile.ns + "role='page'></div>").children(0)
                }
                q.each(function() {
                    var r = l(this);
                    if (!r.jqmData("url")) {
                        r.attr("data-" + l.mobile.ns + "url", r.attr("id") || location.pathname + location.search)
                    }
                });
                l.mobile.firstPage = q.first();
                l.mobile.pageContainer = q.first().parent().addClass("ui-mobile-viewport");
                f.trigger("pagecontainercreate");
                // l.mobile.showPageLoadingMsg();
                p();
                if (!l.mobile.hashListeningEnabled || !l.mobile.path.stripHash(location.hash)) {
                    l.mobile.changePage(l.mobile.firstPage, {
                        transition: "none",
                        reverse: true,
                        changeHash: false,
                        fromHashChange: true
                    })
                } else {
                    f.trigger("hashchange", [true])
                }
            }
        });
        l.mobile._registerInternalEvents();
        l(function() {
            m.scrollTo(0, 1);
            l.mobile.defaultHomeScroll = (!l.support.scrollTop || l(m).scrollTop() === 1) ? 0 : 1;
            if (l.fn.controlgroup) {
                l(a).bind("pagecreate create", function(q) {
                    l(":jqmData(role='controlgroup')", q.target).jqmEnhanceable().controlgroup({
                        excludeInvisible: false
                    })
                })
            }
            if (l.mobile.autoInitializePage) {
                l.mobile.initializePage()
            }
            f.load(l.mobile.silentScroll)
        })
    }(jQuery, this))
}));