var __wxAppData = {};
var __wxRoute;
var __wxRouteBegin;
var __wxAppCode__ = {};
var global = {};
var __wxAppCurrentFile__;
var Component = Component ||
function() {};
var Behavior = Behavior ||
function() {};
define("components/component.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function t(t, i, e) {
		return i in t ? Object.defineProperty(t, i, {
			value: e,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : t[i] = e,
		t
	}
	function i(t, i) {
		if (! (t instanceof i)) throw new TypeError("Cannot call a class as a function")
	}
	Object.defineProperty(exports, "__esModule", {
		value: !0
	});
	var e = function() {
		function t(t, i) {
			for (var e = 0; e < i.length; e++) {
				var n = i[e];
				n.enumerable = n.enumerable || !1,
				n.configurable = !0,
				"value" in n && (n.writable = !0),
				Object.defineProperty(t, n.key, n)
			}
		}
		return function(i, e, n) {
			return e && t(i.prototype, e),
			n && t(i, n),
			i
		}
	} (),
	n = function() {
		function n() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			i(this, n),
			Object.assign(this, {
				options: t
			}),
			this.__init()
		}
		return e(n, [{
			key: "__init",
			value: function() {
				this.page = getCurrentPages()[getCurrentPages().length - 1],
				this.setData = this.page.setData.bind(this.page),
				this.__initState()
			}
		},
		{
			key: "__initState",
			value: function() {
				this.options.data && this.__initData(),
				this.options.methods && this.__initMethods()
			}
		},
		{
			key: "__initData",
			value: function() {
				var i = this.options.scope,
				e = this.options.data;
				if (this._data = {},
				!this.isEmptyObject(e)) for (var n in e) e.hasOwnProperty(n) && ("function" == typeof e[n] ? e[n] = e[n].bind(this) : this._data[n] = e[n]);
				this.page.setData(t({},
				"" + i, this._data))
			}
		},
		{
			key: "__initMethods",
			value: function() {
				var i = this.options.scope,
				e = this.options.methods;
				if (!this.isEmptyObject(e)) for (var n in e) e.hasOwnProperty(n) && "function" == typeof e[n] && (this[n] = e[n] = e[n].bind(this), this.page[i + "." + n] = e[n], this.setData(t({},
				i + "." + n, i + "." + n)))
			}
		},
		{
			key: "getComponentData",
			value: function() {
				var t = this.page.data;
				return (this.options.scope && this.options.scope.split(".")).forEach(function(i, e) {
					t = t[i]
				}),
				t
			}
		},
		{
			key: "isEmptyObject",
			value: function(t) {
				for (var i in t) return ! 1;
				return ! 0
			}
		},
		{
			key: "setVisible",
			value: function() {
				var i, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "weui-animate-fade-in";
				this.setData((i = {},
				t(i, this.options.scope + ".animateCss", e), t(i, this.options.scope + ".visible", !0), i))
			}
		},
		{
			key: "setHidden",
			value: function() {
				var i = this,
				e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "weui-animate-fade-out",
				n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 300;
				this.setData(t({},
				this.options.scope + ".animateCss", e)),
				setTimeout(function() {
					i.setData(t({},
					i.options.scope + ".visible", !1))
				},
				n)
			}
		}]),
		n
	} ();
	exports.
default = n;
});
define("components/dialog/dialog.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function t(t, e, n) {
		return e in t ? Object.defineProperty(t, e, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : t[e] = n,
		t
	}
	Object.defineProperty(exports, "__esModule", {
		value: !0
	});
	var e = function(t) {
		return t && t.__esModule ? t: {
		default:
			t
		}
	} (require("../component"));
	exports.
default = {
		setDefaults: function() {
			return {
				title: void 0,
				content: void 0,
				buttons: [],
				verticalButtons: !1
			}
		},
		data: function() {
			return {
				onCancel: function() {},
				cancelText: "取消",
				cancelType: "weui-dialog__btn_default",
				onConfirm: function() {},
				confirmText: "确定",
				confirmType: "weui-dialog__btn_primary"
			}
		},
		open: function() {
			var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
			o = Object.assign({
				animateCss: void 0,
				visible: !1
			},
			this.setDefaults(), n),
			i = new e.
		default({
				scope:
				"$wux.dialog",
				data: o,
				methods: {
					hide: function(t) {
						if (this.removed) return ! 1;
						this.removed = !0,
						this.setHidden(),
						setTimeout(function() {
							return "function" == typeof t && t()
						},
						300)
					},
					show: function() {
						if (this.removed) return ! 1;
						this.setVisible()
					},
					buttonTapped: function(t) {
						var e = t.currentTarget.dataset.index,
						n = o.buttons[e];
						this.hide(function() {
							return "function" == typeof n.onTap && n.onTap(t)
						})
					},
					bindinput: function(e) {
						this.setData(t({},
						"$wux.dialog.prompt.response", e.detail.value))
					}
				}
			});
			return i.show(),
			i.hide
		},
		alert: function() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			return this.open(Object.assign({
				buttons: [{
					text: t.confirmText || this.data().confirmText,
					type: t.confirmType || this.data().confirmType,
					onTap: function(e) {
						"function" == typeof t.onConfirm && t.onConfirm(e)
					}
				}]
			},
			t))
		},
		confirm: function() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			return this.open(Object.assign({
				buttons: [{
					text: t.cancelText || this.data().cancelText,
					type: t.cancelType || this.data().cancelType,
					onTap: function(e) {
						"function" == typeof t.onCancel && t.onCancel(e)
					}
				},
				{
					text: t.confirmText || this.data().confirmText,
					type: t.confirmType || this.data().confirmType,
					onTap: function(e) {
						"function" == typeof t.onConfirm && t.onConfirm(e)
					}
				}]
			},
			t))
		},
		prompt: function() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
			e = {
				fieldtype: t.fieldtype ? t.fieldtype: "text",
				password: !!t.password,
				response: t.defaultText ? t.defaultText: "",
				placeholder: t.placeholder ? t.placeholder: "",
				maxlength: t.maxlength ? parseInt(t.maxlength) : "",
				surfix: t.surfix ? t.surfix: ""
			};
			return this.open(Object.assign({
				prompt: e,
				buttons: [{
					text: t.cancelText || this.data().cancelText,
					type: t.cancelType || this.data().cancelType,
					onTap: function(e) {
						"function" == typeof t.onCancel && t.onCancel(e)
					}
				},
				{
					text: t.confirmText || this.data().confirmText,
					type: t.confirmType || this.data().confirmType,
					onTap: function(e) {
						"function" == typeof t.onConfirm && t.onConfirm(e)
					}
				}]
			},
			t))
		}
	};
});
define("components/qrcode/qr.js/index.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var r = require("./lib/QRCode"),
	e = require("./lib/ErrorCorrectLevel"),
	o = function(o, t) {
		var u = new r((t = t || {}).typeNumber || -1, t.errorCorrectLevel || e.H);
		return u.addData(o),
		u.make(),
		u
	};
	o.ErrorCorrectLevel = e,
	module.exports = o;
});
define("components/qrcode/qr.js/lib/8BitByte.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function t(t) {
		this.mode = e.MODE_8BIT_BYTE,
		this.data = t
	}
	var e = require("./mode");
	t.prototype = {
		getLength: function(t) {
			return this.data.length
		},
		write: function(t) {
			for (var e = 0; e < this.data.length; e++) t.put(this.data.charCodeAt(e), 8)
		}
	},
	module.exports = t;
});
define("components/qrcode/qr.js/lib/BitBuffer.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function t() {
		this.buffer = new Array,
		this.length = 0
	}
	t.prototype = {
		get: function(t) {
			var e = Math.floor(t / 8);
			return 1 == (this.buffer[e] >>> 7 - t % 8 & 1)
		},
		put: function(t, e) {
			for (var h = 0; h < e; h++) this.putBit(1 == (t >>> e - h - 1 & 1))
		},
		getLengthInBits: function() {
			return this.length
		},
		putBit: function(t) {
			var e = Math.floor(this.length / 8);
			this.buffer.length <= e && this.buffer.push(0),
			t && (this.buffer[e] |= 128 >>> this.length % 8),
			this.length++
		}
	},
	module.exports = t;
});
define("components/qrcode/qr.js/lib/ErrorCorrectLevel.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	module.exports = {
		L: 1,
		M: 0,
		Q: 3,
		H: 2
	};
});
define("components/qrcode/qr.js/lib/Polynomial.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function t(t, e) {
		if (void 0 == t.length) throw new Error(t.length + "/" + e);
		for (var g = 0; g < t.length && 0 == t[g];) g++;
		this.num = new Array(t.length - g + e);
		for (var n = 0; n < t.length - g; n++) this.num[n] = t[n + g]
	}
	var e = require("./math");
	t.prototype = {
		get: function(t) {
			return this.num[t]
		},
		getLength: function() {
			return this.num.length
		},
		multiply: function(g) {
			for (var n = new Array(this.getLength() + g.getLength() - 1), r = 0; r < this.getLength(); r++) for (var h = 0; h < g.getLength(); h++) n[r + h] ^= e.gexp(e.glog(this.get(r)) + e.glog(g.get(h)));
			return new t(n, 0)
		},
		mod: function(g) {
			if (this.getLength() - g.getLength() < 0) return this;
			for (var n = e.glog(this.get(0)) - e.glog(g.get(0)), r = new Array(this.getLength()), h = 0; h < this.getLength(); h++) r[h] = this.get(h);
			for (h = 0; h < g.getLength(); h++) r[h] ^= e.gexp(e.glog(g.get(h)) + n);
			return new t(r, 0).mod(g)
		}
	},
	module.exports = t;
});
define("components/qrcode/qr.js/lib/QRCode.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function t(t, e) {
		this.typeNumber = t,
		this.errorCorrectLevel = e,
		this.modules = null,
		this.moduleCount = 0,
		this.dataCache = null,
		this.dataList = []
	}
	var e = require("./8BitByte"),
	o = require("./RSBlock"),
	r = require("./BitBuffer"),
	i = require("./util"),
	n = require("./Polynomial"),
	s = t.prototype;
	s.addData = function(t) {
		var o = new e(t);
		this.dataList.push(o),
		this.dataCache = null
	},
	s.isDark = function(t, e) {
		if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e) throw new Error(t + "," + e);
		return this.modules[t][e]
	},
	s.getModuleCount = function() {
		return this.moduleCount
	},
	s.make = function() {
		if (this.typeNumber < 1) {
			var t = 1;
			for (t = 1; t < 40; t++) {
				for (var e = o.getRSBlocks(t, this.errorCorrectLevel), n = new r, s = 0, u = 0; u < e.length; u++) s += e[u].dataCount;
				for (u = 0; u < this.dataList.length; u++) {
					var h = this.dataList[u];
					n.put(h.mode, 4),
					n.put(h.getLength(), i.getLengthInBits(h.mode, t)),
					h.write(n)
				}
				if (n.getLengthInBits() <= 8 * s) break
			}
			this.typeNumber = t
		}
		this.makeImpl(!1, this.getBestMaskPattern())
	},
	s.makeImpl = function(e, o) {
		this.moduleCount = 4 * this.typeNumber + 17,
		this.modules = new Array(this.moduleCount);
		for (var r = 0; r < this.moduleCount; r++) {
			this.modules[r] = new Array(this.moduleCount);
			for (var i = 0; i < this.moduleCount; i++) this.modules[r][i] = null
		}
		this.setupPositionProbePattern(0, 0),
		this.setupPositionProbePattern(this.moduleCount - 7, 0),
		this.setupPositionProbePattern(0, this.moduleCount - 7),
		this.setupPositionAdjustPattern(),
		this.setupTimingPattern(),
		this.setupTypeInfo(e, o),
		this.typeNumber >= 7 && this.setupTypeNumber(e),
		null == this.dataCache && (this.dataCache = t.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)),
		this.mapData(this.dataCache, o)
	},
	s.setupPositionProbePattern = function(t, e) {
		for (var o = -1; o <= 7; o++) if (! (t + o <= -1 || this.moduleCount <= t + o)) for (var r = -1; r <= 7; r++) e + r <= -1 || this.moduleCount <= e + r || (this.modules[t + o][e + r] = 0 <= o && o <= 6 && (0 == r || 6 == r) || 0 <= r && r <= 6 && (0 == o || 6 == o) || 2 <= o && o <= 4 && 2 <= r && r <= 4)
	},
	s.getBestMaskPattern = function() {
		for (var t = 0,
		e = 0,
		o = 0; o < 8; o++) {
			this.makeImpl(!0, o);
			var r = i.getLostPoint(this); (0 == o || t > r) && (t = r, e = o)
		}
		return e
	},
	s.createMovieClip = function(t, e, o) {
		var r = t.createEmptyMovieClip(e, o);
		this.make();
		for (var i = 0; i < this.modules.length; i++) for (var n = 1 * i,
		s = 0; s < this.modules[i].length; s++) {
			var u = 1 * s;
			this.modules[i][s] && (r.beginFill(0, 100), r.moveTo(u, n), r.lineTo(u + 1, n), r.lineTo(u + 1, n + 1), r.lineTo(u, n + 1), r.endFill())
		}
		return r
	},
	s.setupTimingPattern = function() {
		for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0);
		for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0)
	},
	s.setupPositionAdjustPattern = function() {
		for (var t = i.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++) for (var o = 0; o < t.length; o++) {
			var r = t[e],
			n = t[o];
			if (null == this.modules[r][n]) for (var s = -2; s <= 2; s++) for (var u = -2; u <= 2; u++) this.modules[r + s][n + u] = -2 == s || 2 == s || -2 == u || 2 == u || 0 == s && 0 == u
		}
	},
	s.setupTypeNumber = function(t) {
		for (var e = i.getBCHTypeNumber(this.typeNumber), o = 0; o < 18; o++) {
			r = !t && 1 == (e >> o & 1);
			this.modules[Math.floor(o / 3)][o % 3 + this.moduleCount - 8 - 3] = r
		}
		for (o = 0; o < 18; o++) {
			var r = !t && 1 == (e >> o & 1);
			this.modules[o % 3 + this.moduleCount - 8 - 3][Math.floor(o / 3)] = r
		}
	},
	s.setupTypeInfo = function(t, e) {
		for (var o = this.errorCorrectLevel << 3 | e,
		r = i.getBCHTypeInfo(o), n = 0; n < 15; n++) {
			s = !t && 1 == (r >> n & 1);
			n < 6 ? this.modules[n][8] = s: n < 8 ? this.modules[n + 1][8] = s: this.modules[this.moduleCount - 15 + n][8] = s
		}
		for (n = 0; n < 15; n++) {
			var s = !t && 1 == (r >> n & 1);
			n < 8 ? this.modules[8][this.moduleCount - n - 1] = s: n < 9 ? this.modules[8][15 - n - 1 + 1] = s: this.modules[8][15 - n - 1] = s
		}
		this.modules[this.moduleCount - 8][8] = !t
	},
	s.mapData = function(t, e) {
		for (var o = -1,
		r = this.moduleCount - 1,
		n = 7,
		s = 0,
		u = this.moduleCount - 1; u > 0; u -= 2) for (6 == u && u--;;) {
			for (var h = 0; h < 2; h++) if (null == this.modules[r][u - h]) {
				var a = !1;
				s < t.length && (a = 1 == (t[s] >>> n & 1)),
				i.getMask(e, r, u - h) && (a = !a),
				this.modules[r][u - h] = a,
				-1 == --n && (s++, n = 7)
			}
			if ((r += o) < 0 || this.moduleCount <= r) {
				r -= o,
				o = -o;
				break
			}
		}
	},
	t.PAD0 = 236,
	t.PAD1 = 17,
	t.createData = function(e, n, s) {
		for (var u = o.getRSBlocks(e, n), h = new r, a = 0; a < s.length; a++) {
			var l = s[a];
			h.put(l.mode, 4),
			h.put(l.getLength(), i.getLengthInBits(l.mode, e)),
			l.write(h)
		}
		for (var m = 0,
		a = 0; a < u.length; a++) m += u[a].dataCount;
		if (h.getLengthInBits() > 8 * m) throw new Error("code length overflow. (" + h.getLengthInBits() + ">" + 8 * m + ")");
		for (h.getLengthInBits() + 4 <= 8 * m && h.put(0, 4); h.getLengthInBits() % 8 != 0;) h.putBit(!1);
		for (;;) {
			if (h.getLengthInBits() >= 8 * m) break;
			if (h.put(t.PAD0, 8), h.getLengthInBits() >= 8 * m) break;
			h.put(t.PAD1, 8)
		}
		return t.createBytes(h, u)
	},
	t.createBytes = function(t, e) {
		for (var o = 0,
		r = 0,
		s = 0,
		u = new Array(e.length), h = new Array(e.length), a = 0; a < e.length; a++) {
			var l = e[a].dataCount,
			m = e[a].totalCount - l;
			r = Math.max(r, l),
			s = Math.max(s, m),
			u[a] = new Array(l);
			for (v = 0; v < u[a].length; v++) u[a][v] = 255 & t.buffer[v + o];
			o += l;
			var d = i.getErrorCorrectPolynomial(m),
			f = new n(u[a], d.getLength() - 1).mod(d);
			h[a] = new Array(d.getLength() - 1);
			for (v = 0; v < h[a].length; v++) {
				var g = v + f.getLength() - h[a].length;
				h[a][v] = g >= 0 ? f.get(g) : 0
			}
		}
		for (var p = 0,
		v = 0; v < e.length; v++) p += e[v].totalCount;
		for (var C = new Array(p), c = 0, v = 0; v < r; v++) for (a = 0; a < e.length; a++) v < u[a].length && (C[c++] = u[a][v]);
		for (v = 0; v < s; v++) for (a = 0; a < e.length; a++) v < h[a].length && (C[c++] = h[a][v]);
		return C
	},
	module.exports = t;
});
define("components/qrcode/qr.js/lib/RSBlock.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function r(r, e) {
		this.totalCount = r,
		this.dataCount = e
	}
	var e = require("./ErrorCorrectLevel");
	r.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]],
	r.getRSBlocks = function(e, t) {
		var o = r.getRsBlockTable(e, t);
		if (void 0 == o) throw new Error("bad rs block @ typeNumber:" + e + "/errorCorrectLevel:" + t);
		for (var n = o.length / 3,
		u = new Array,
		a = 0; a < n; a++) for (var c = o[3 * a + 0], s = o[3 * a + 1], B = o[3 * a + 2], L = 0; L < c; L++) u.push(new r(s, B));
		return u
	},
	r.getRsBlockTable = function(t, o) {
		switch (o) {
		case e.L:
			return r.RS_BLOCK_TABLE[4 * (t - 1) + 0];
		case e.M:
			return r.RS_BLOCK_TABLE[4 * (t - 1) + 1];
		case e.Q:
			return r.RS_BLOCK_TABLE[4 * (t - 1) + 2];
		case e.H:
			return r.RS_BLOCK_TABLE[4 * (t - 1) + 3];
		default:
			return
		}
	},
	module.exports = r;
});
define("components/qrcode/qr.js/lib/math.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	for (var E = {
		glog: function(r) {
			if (r < 1) throw new Error("glog(" + r + ")");
			return E.LOG_TABLE[r]
		},
		gexp: function(r) {
			for (; r < 0;) r += 255;
			for (; r >= 256;) r -= 255;
			return E.EXP_TABLE[r]
		},
		EXP_TABLE: new Array(256),
		LOG_TABLE: new Array(256)
	},
	r = 0; r < 8; r++) E.EXP_TABLE[r] = 1 << r;
	for (r = 8; r < 256; r++) E.EXP_TABLE[r] = E.EXP_TABLE[r - 4] ^ E.EXP_TABLE[r - 5] ^ E.EXP_TABLE[r - 6] ^ E.EXP_TABLE[r - 8];
	for (r = 0; r < 255; r++) E.LOG_TABLE[E.EXP_TABLE[r]] = r;
	module.exports = E;
});
define("components/qrcode/qr.js/lib/mode.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	module.exports = {
		MODE_NUMBER: 1,
		MODE_ALPHA_NUM: 2,
		MODE_8BIT_BYTE: 4,
		MODE_KANJI: 8
	};
});
define("components/qrcode/qr.js/lib/util.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var r = require("./mode"),
	e = require("./Polynomial"),
	t = require("./math"),
	a = {
		PATTERN000: 0,
		PATTERN001: 1,
		PATTERN010: 2,
		PATTERN011: 3,
		PATTERN100: 4,
		PATTERN101: 5,
		PATTERN110: 6,
		PATTERN111: 7
	},
	i = {
		PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
		G15: 1335,
		G18: 7973,
		G15_MASK: 21522,
		getBCHTypeInfo: function(r) {
			for (var e = r << 10; i.getBCHDigit(e) - i.getBCHDigit(i.G15) >= 0;) e ^= i.G15 << i.getBCHDigit(e) - i.getBCHDigit(i.G15);
			return (r << 10 | e) ^ i.G15_MASK
		},
		getBCHTypeNumber: function(r) {
			for (var e = r << 12; i.getBCHDigit(e) - i.getBCHDigit(i.G18) >= 0;) e ^= i.G18 << i.getBCHDigit(e) - i.getBCHDigit(i.G18);
			return r << 12 | e
		},
		getBCHDigit: function(r) {
			for (var e = 0; 0 != r;) e++,
			r >>>= 1;
			return e
		},
		getPatternPosition: function(r) {
			return i.PATTERN_POSITION_TABLE[r - 1]
		},
		getMask: function(r, e, t) {
			switch (r) {
			case a.PATTERN000:
				return (e + t) % 2 == 0;
			case a.PATTERN001:
				return e % 2 == 0;
			case a.PATTERN010:
				return t % 3 == 0;
			case a.PATTERN011:
				return (e + t) % 3 == 0;
			case a.PATTERN100:
				return (Math.floor(e / 2) + Math.floor(t / 3)) % 2 == 0;
			case a.PATTERN101:
				return e * t % 2 + e * t % 3 == 0;
			case a.PATTERN110:
				return (e * t % 2 + e * t % 3) % 2 == 0;
			case a.PATTERN111:
				return (e * t % 3 + (e + t) % 2) % 2 == 0;
			default:
				throw new Error("bad maskPattern:" + r)
			}
		},
		getErrorCorrectPolynomial: function(r) {
			for (var a = new e([1], 0), i = 0; i < r; i++) a = a.multiply(new e([1, t.gexp(i)], 0));
			return a
		},
		getLengthInBits: function(e, t) {
			if (1 <= t && t < 10) switch (e) {
			case r.MODE_NUMBER:
				return 10;
			case r.MODE_ALPHA_NUM:
				return 9;
			case r.MODE_8BIT_BYTE:
			case r.MODE_KANJI:
				return 8;
			default:
				throw new Error("mode:" + e)
			} else if (t < 27) switch (e) {
			case r.MODE_NUMBER:
				return 12;
			case r.MODE_ALPHA_NUM:
				return 11;
			case r.MODE_8BIT_BYTE:
				return 16;
			case r.MODE_KANJI:
				return 10;
			default:
				throw new Error("mode:" + e)
			} else {
				if (! (t < 41)) throw new Error("type:" + t);
				switch (e) {
				case r.MODE_NUMBER:
					return 14;
				case r.MODE_ALPHA_NUM:
					return 13;
				case r.MODE_8BIT_BYTE:
					return 16;
				case r.MODE_KANJI:
					return 12;
				default:
					throw new Error("mode:" + e)
				}
			}
		},
		getLostPoint: function(r) {
			for (var e = r.getModuleCount(), t = 0, a = 0; a < e; a++) for (E = 0; E < e; E++) {
				for (var i = 0,
				n = r.isDark(a, E), o = -1; o <= 1; o++) if (! (a + o < 0 || e <= a + o)) for (var s = -1; s <= 1; s++) E + s < 0 || e <= E + s || 0 == o && 0 == s || n == r.isDark(a + o, E + s) && i++;
				i > 5 && (t += 3 + i - 5)
			}
			for (a = 0; a < e - 1; a++) for (E = 0; E < e - 1; E++) {
				var T = 0;
				r.isDark(a, E) && T++,
				r.isDark(a + 1, E) && T++,
				r.isDark(a, E + 1) && T++,
				r.isDark(a + 1, E + 1) && T++,
				0 != T && 4 != T || (t += 3)
			}
			for (a = 0; a < e; a++) for (E = 0; E < e - 6; E++) r.isDark(a, E) && !r.isDark(a, E + 1) && r.isDark(a, E + 2) && r.isDark(a, E + 3) && r.isDark(a, E + 4) && !r.isDark(a, E + 5) && r.isDark(a, E + 6) && (t += 40);
			for (E = 0; E < e; E++) for (a = 0; a < e - 6; a++) r.isDark(a, E) && !r.isDark(a + 1, E) && r.isDark(a + 2, E) && r.isDark(a + 3, E) && r.isDark(a + 4, E) && !r.isDark(a + 5, E) && r.isDark(a + 6, E) && (t += 40);
			for (var u = 0,
			E = 0; E < e; E++) for (a = 0; a < e; a++) r.isDark(a, E) && u++;
			return t += 10 * (Math.abs(100 * u / e / e - 50) / 5)
		}
	};
	module.exports = i;
});
define("components/qrcode/qrcode.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	Object.defineProperty(exports, "__esModule", {
		value: !0
	});
	var e = function(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	} (require("qr.js/index"));
	exports.
default = {
		setDefaults: function() {
			return {
				typeNumber: -1,
				errorCorrectLevel: 2,
				width: 200,
				height: 200,
				fgColor: "black",
				bgColor: "white",
				text: ""
			}
		},
		init: function(t, r) {
			var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
			l = Object.assign({},
			this.setDefaults(), o),
			i = (0, e.
		default)(this.utf16to8(r), {
				typeNumber: l.typeNumber,
				errorCorrectLevel: l.errorCorrectLevel
			}),
			a = wx.createCanvasContext(t),
			n = i.modules,
			h = l.width / n.length,
			f = l.height / n.length;
			a.setFillStyle("white"),
			a.fillRect(0, 0, l.width + 20, l.height + 50),
			a.translate(10, 10),
			a.scale(1, 1),
			n.forEach(function(e, t) {
				e.forEach(function(e, r) {
					a.setFillStyle(e ? l.fgColor: l.bgColor);
					var o = Math.ceil((r + 1) * h) - Math.floor(r * h),
					i = Math.ceil((t + 1) * f) - Math.floor(t * f);
					a.fillRect(Math.round(r * h), Math.round(t * f), o, i)
				})
			}),
			a.setFontSize(12),
			a.setTextAlign("center"),
			a.setFillStyle("black"),
			a.fillText(l.text, 115, 255),
			a.draw()
		},
		utf16to8: function(e) {
			for (var t = e.length,
			r = "",
			o = 0; o < t; o++) {
				var l = e.charCodeAt(o);
				l >= 1 && l <= 127 ? r += e.charAt(o) : l > 2047 ? (r += String.fromCharCode(224 | l >> 12 & 15), r += String.fromCharCode(128 | l >> 6 & 63), r += String.fromCharCode(128 | l >> 0 & 63)) : (r += String.fromCharCode(192 | l >> 6 & 31), r += String.fromCharCode(128 | l >> 0 & 63))
			}
			return r
		}
	};
});
define("components/toptips/toptips.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	Object.defineProperty(exports, "__esModule", {
		value: !0
	});
	var t = function(t) {
		return t && t.__esModule ? t: {
		default:
			t
		}
	} (require("../component"));
	exports.
default = {
		setDefaults: function() {
			return {
				icon: "cancel",
				hidden: !1,
				text: "",
				timer: 3e3,
				className: "",
				success: function() {}
			}
		},
		show: function() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
			i = Object.assign({},
			this.setDefaults(), e);
			this._toptips && (clearTimeout(this._toptips.timeout), this._toptips = null);
			var s = new t.
		default({
				scope:
				"$wux.toptips",
				data: i,
				methods: {
					hide: function() {
						if (this.removed) return ! 1;
						this.removed = !0,
						this.setHidden("weui-animate-notify-upout"),
						"function" == typeof i.success && i.success()
					},
					show: function() {
						if (this.removed) return ! 1;
						this.setVisible("weui-animate-notify-downin")
					}
				}
			});
			return this._toptips = {
				hide: s.hide
			},
			this._toptips.timeout = setTimeout(s.hide, i.timer),
			s.show(),
			this._toptips.hide
		},
		success: function() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			return this.show(Object.assign({
				icon: "success"
			},
			t))
		},
		info: function() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			return this.show(Object.assign({
				icon: "info"
			},
			t))
		},
		warn: function() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			return this.show(Object.assign({
				icon: "warn"
			},
			t))
		},
		error: function() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			return this.show(Object.assign({
				icon: "cancel"
			},
			t))
		}
	};
});
define("components/wux.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function e(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	Object.defineProperty(exports, "__esModule", {
		value: !0
	}),
	exports.$wuxToptips = exports.$wuxQrcode = exports.$wuxDialog = void 0;
	var o = e(require("dialog/dialog")),
	r = e(require("qrcode/qrcode")),
	t = e(require("toptips/toptips"));
	exports.$wuxDialog = o.
default,
	exports.$wuxQrcode = r.
default,
	exports.$wuxToptips = t.
default;
});
define("img/base64.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	module.exports = {
		bill: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB+klEQVRYR+2WvW4TQRDHZ7YBdFIS7MpVzu3tiuQNAhISJVBR4oIHyBsAb5AXQApPQERFSfICJNLu1pfKDbaMZCvQzD9a6yzZxoHxccJSlG2uuPn4zdfuMG348Ib9U20Aa+0hgFfGmCsAn0MIR3WCqQVgrT1h5uci8jM5NcbcF5EPMcY360KsDdDtdh9lWXYhImcxxoPksCiKb8aY/cFgkPf7/ct1IFQAnU5nt9VqnTHzFoB7zPxgPB4/LMtylJyl/+12uwRwxcy/AHwfDodPNTAqAGvtFyJ6xsw/ZtF573fmI3XOTWGqsy0iJzHGl3/LhgrAOfeViA6891p5ENGp9/5xLQDnXFL8REQLUa4JMO97BOBJCOF8GWhlRKnLiShn5sOkAKBHRK9DCOoMAPjIzMeVfhrR8xBCsrNwVhqsUk6zFDrn3hHRWyJKX81Jcu+991P5ZXvzBlQAeZ7vZFl2zMwLJbmJBMBoMpn0ZlPyzwCakP8kcwfQSAaKojgyxuxpyiEiFzHG6QQ10oTJiLW2x8y5BgBAGUKYjmBjABrHN8k0UoKNA1Ql2NWAALhsvASzB0kDsPwQ3Y4SKCNfKXY7MrDxHri7iP5rE1Yr2Z4x5rcVqg6IiKR34VS9kllr95k5bcLbdRwu66SbkYheqJfSJpxqbai2XK2xOnLXPQlaMA8CkOkAAAAASUVORK5CYII=",
		bell: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADX0lEQVRoQ+2YQW7TQBSG37PTDSwoJyA9AVkWV9TODkEs2hOQnoD0BE1P0HCChhO0yAGxS1wU013LCVpOQFk0m9bz0Ew8YWoFNOOxQZWcVWR53vu/97+ZzAvCPf/gPdcPNcD/drB2oHbAsgJ1C1kW0Hp5ZQ54J2EXGRxwheTAbrIZDa3VLglQCcD6+EXTdVYuiOg7z4mIT1J2s3ba/nxZNkRhAG/8soXoHKR0u5MXtv6lE7gMxwxhmwt2CI5Sh9qnz0cTFUCAYuOQiO0m7U/nReAKAczFu2MCQEY3LRVAiE9hDxCDO4KIJqkL+yoEB3Bw5RwBiChtF4EwBphXbeWMiwdKA5lUOiKFE0AMAFcZxCoC+OI70UStOF8H6E44xDW5a+ftY7lGyxBjAC8OeTJfbYl51fFIQCENZqwxyAtpjbdWHzi3PSDscbGpS9vSDdlyHG4ajNpayrOXjADEyUJwSED7iT/q8xhqO6mO/EmEWnG1bby400fAPULYMTmxzAAmHXGKJMGoKQVyR4CgpSN+sWbRNnSmVtwT8ZGSIFrTdUEb4NlJuMVPE0C2O938OOAJ5DPVEd3EsuJqK26cvOoBOQf89Pq6GR3rxNIG8OLwGAFeXzP3sezvjTjkP05v1Gc6Sfk7fE88dNIfAPB+6kdd9RkBfEj8aEsnlj4AtxfxMvGjxfEoLM8900maa78nastkLXnn2d9iagHIahHQu8Qf9WTAjTgktYIm4sUBkLk69aOFDi/uDBDwra6rWgAyGbC0r/7YcIAi/f/bgfnJowLwI9Vh2Jsxt6vzm6ANsKy6VQCYulgDlN1CtQMmFaj3QHb/UU8hkwLydwtv4sXUpVzsTJMvrhMW01ohgOxGeYQITZtRUQ40AHQBxHb+yUAjh3Vx93egZ3L1XeYQjwcMBmIqKzD8Gzkg2waIvhGxbpGKLYWYz9dDQHxq6qgZQDasmw4dOntDDkvLhn/ry5wMIMZCTC8R4ZGOKNN3iODnjNymzh1IxjZygC8SG89piPt72R/Gboem/x0ZA5Qt2jZeJQDeJLzKtxlvjySIVm0F59dXA5ANJWqy/DBUFkglANl/QH0gnO8VpOGMNfomm1MXsBIA3eRlvFcDlFFFmxi1AzbVK2Nt7UAZVbSJUTtgU70y1v4CM0v/QFEMhXYAAAAASUVORK5CYII=",
		help: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAG4ElEQVRoQ92aa2wUVRSAz5ktfSyl7ULtIzwsoQoRTO8WEUKotNFEKETAaEysCQVJNFKlBoE/JpYgoiABoiA+kBYkhBBsi0gQMRSRoAE704AUBGR5hEK13W13dru7beeYO92p23Yfs9ulbbx/djNz597znce9554ZhCg1xlgWAMwWQMgnIP4fEDGf/xKRDQAkBLQooEgAUC1JkiUaU2N/B2GMLUbAMkRUhdbbiEgioK2SJFXofcZfv4gBGGMrvIKnaAOPzRR+e3FOoi173LCG1BRDdkwMJmr3rt70WGQHmQ796Mi8dK39Ue06EVkIqCxSkLABuKsg4G7NPRKHw+2SoqTzT083ZgsCPq5Hm50K3blwpf365gpb9t37naO9bsYtsihc1woLwCu8iIhc6y3rVpjOzmTxMwCg2wp6AHz7nLvo/vX9z6yPyU5K4rHihajRO064ACmIKLGJcTc2rR6ZbRBwjN6J1H5EawHAQgBbETHZx41aPvzSZj1x1qXGkULKEkmSyvWMHRYAH9Aqzl0IKOyOSOvkMJnMNTarmJ8CYCwHxAW+Qh48Jp/becA+LRyIsACsYmExIHLhI2wkAcESk/koX0rB33jnL7qvrdncnO2FMEuSpPYN1HQDWMVCBohihJL3fAypzJRzlLuTalECLPd1qR37W64cOu6c6F2hOATfR/w2XQBWcU4WoIELH3Gw+pm9BsixqMul+ipn9cdN93//w5MOBNtqpdrS/gFIhZUAuDAq2u8xCHcpZ4EXood7utxK47zX76d5XWl8oOU1pAWs4vx8QDoZfeG7R6wxse8LutxpXjkgLNbu7K2Wr5dX2ScQUYUoicX+ZAgIkMty31NAqT5ZPnoLAKg5zQNrRNtM5qOlfHUiMFq0eOhUQH7+zXuJdofC9wduhT6x4BeAMVYsoLCbpwblH6RPf2CC+w5MWGAyH6mxivNKAYErTW1bKmxNR2raRgXaG/wCmJmZrwqL3ypK/nnBM8anBgQAwMeVCi2A+DCft/6a51bJ+qZxgdwoEMANnl1WbU+7McJoGD9AAHynXgLgrAI0igBd2W1HJzmeXXZvOF9SRUnsI4tfgFxzLvGHf9qdOWCyB5to5UfNIF12Q61Y20fePhd4wiagcCPRiFC9PWNIASik9NmZ/QHkCyicnDo59v7Gd0alDwWCnQdaXQePOeIVUgokSeqRqQYEmMni69atMOUMBYDKE7Ll0332rLAA2KQ42Lxm5FCQH/ZU2aGiWuZpti4LqDGQkWqAfZvUnXzQmxbECil9Uor/3yrE1W02m3kJJOe7HWlNxgTDqME2wYLl98DuVOpEUWS9ZfFvAZa7FRBWvPtayvWCGQkTBhPgwp/uhtINzZmB0upAuRATUBCzxw2Dz9emDqb8sGN/Kxw67uAB7Pd0FjAbNZvNFgR8+PD2dOtwo2AaLIqiVY3Q8E/HTVEU/RbOAgJoGWlhXoJz5dIU42AA7Dtsd31dKfMNLGCVIuiBRrPCng0P3RydEaNmhwPVXB7F/dLbjXF2pxJQ+1yWoACMMTWtGIxY2LjLBj/80sZ9n1frqgIpLuSRUjsbDKQrnTjb5tnwhS022FFSAwoJ4LsvlL1has6bFv9A84vLf3nk5euaEgmojojyg5VUQrqQRskYSxFQ4PX85KWLEl1Fz42IfxCxwDX/yTctsbKTWhRSskIJrxuAd2SMMUQs5zs0d6eSV5KEuFghaiBawubVfHGoilxYLuRrCQSsQsTZPNlb9sIIuWB6Qvc7gEiscumqx7XrWzmen7iI6BQBLdSj+YgAtIdyWW4ZIPBqWTJPu1+eb2yZOjm+u9qsB+TW3fa2rw7ZE87Uunn3FiAoq5Vqt+p51rePriD2N6j3XQF/taQWovgRNGdSLBQ8mSCPSTd0JBoFzEyLUaFsrZ3Ov5s7PdZWJbbmnMt4ptYFslM9drcQURUBlYaj9agA9AhwEIoJqAQAdCV+BHQNANYDQFWkgvfLhXpbRNsrwjJ/iKKt3rEidiHfCbQyzKpXkyAjNSbo3HWXPbCnWlZfvYqS2O8kMSoAWs40Jk2Qg0kvGJCUTsI7jYq6Ufk7oOjVfFRdiDG2EAH3Iv73WjWYIEQkE1Ce3rU+2FhRsYB3o7uAgFP0aJCIzkh10iw9fUP1iRoAP0cDQU5CHMLYzBgwxgs95na6FLjd0AFtbnX5PCVKYlRK9lED4G4kgFDJE3Qi4t9J9ADovqaAS0Flbu8KWyhNB7ofNQA+QU5OziyDYDjN/095ZBjkPdGVKp0+74KLV9s5mMPldk2ur6+/GanAvZ+LKoA3FtSXI/4EDHU4iQQq6gBeCMY/BAGErjoOQY33g46ofGLjC/ovRrA6XkvlV8AAAAAASUVORK5CYII=",
		about: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAJhElEQVRoQ+1ZeVCTZxr/vV84w+lCUfFKRIKg1JBAsR1HQFu3drVY1zpeFXFHsXVcraLW2a1AnR47i9fqjIizK9TqWneYpULdncEdg9V6kRDHisM1hKEmCgaCgMjx5dt5P/gwSo4vHrvjTN+/krzX83uf5/k9Rwhe8kFecvnxC4D/twZfqAaUSqWSEBLEcdx1vV5veRFgnwsApVKZyjBMMoAFAPbrdLp9VHiJRFJpK/Qrgb1VLfe9mgEUsyxb+DxAPRMAlUq1CkAWIUQmCDoqtPdK6cEbl8BhQfYhmczY4gXdrYBhjy/1Ztn4qR1lsvHdn2/8o/HC02rnmQCo1WpqFkGE4P5rU9urFr5pjp2d2ObnSJiKm/78VGlZKEovhwwtS4pvu5O+8M6a2F8/KHUXiNsAqNAcx3FWqzUOQPCSueat21c3vUM/u3N5R5cEJ46FoeRqCO488Ia/bz/2bquriJvctYYooBd7llsAlEplsEQiaaOHR8s7Zh77smbzoN2LvW/4ujbg8MFwHLk5mgex6YPbDxak3FtPFCgQc6goANQhGYZJtVqt+wHIPvhNc9TmNOMnIFA6u6REE4LS8yEI8GOxZqERUfJu+8vbgJKCUORcmcDPb0lrwtK5zdkkEjmuQIgCoFarKZsoOY5L1xbpNOgH/e7UZLIPyVBaHoJJUd5ouD8OrKkO3qlZmBV3H7smr7CriYq/ByLz0kR09kmw5rdGZCwyFRAF0p2BcAlApVLtI4Rs5DiucfVCU9L6xaZiVy9f3eCL5TtikLulHntHNeEh/NH5bTb66rXw+7gE75McfBSZPVyumwTVP0qx/D+T+bnjX1UhakJ3ujNzcgpAqVQmSySScwDaWZZNrjyl3wgCSp1Ox4kzYdjz9Th8/40ZK00N/Nreugp0HF6HEZ+dw9hWHY5Op2HDztAwyC0bg5P1YVDHdODwzhqAQ5wjx3YIgDoswzCVlON50/lWZwBAwbgclC7X7YrC8S+rsM2jmddA9/kTeFCyB0GfV2BOz35sj9lk/5wWoKPMC0vPKnh22ryyCcvmNhuIAnJ7GxwCUKvVlAXSOI4r1+l0yVwNGkAwFLBcoVibo0BNoy+mz/DFD+a30KM9A+/ZaxA2LQWFcYkI9HSSWZQx0FQFI/OSHP7Sfpz40y2Eh/baNSWHAFQqVQN9fZZlUypP6WUgOOpKaNt5nufPhEFbFYA+zgcTEyKQlNiHmaEiYlUDASoYbLksR/ntIKdasAtAyGNsXr/SleO6A87l2l4A30mgMQbxWlBMeMBrAQTvkUkott1vF4AN83ysLdIVox8DnihyaK4F8+ZDhyq6A/FTOkXutFlWxgAWguTSWHT2SHD6wA1qRoVE8TiJOAIgmI+88pQ+Waz50MCVXzQaphZvjBzrC3OnFP0WM6Rvb0B8/AhkR6U5t31bmJUEqGOQrR+P0vpfDZjRO80WEokRTjVgYz6NOp1OxtXyKkt19YT01TN3R2BUaA8CMvLRGvw6v0Vgn4Btp5HoWY6vYpe5Ompg/jaAHx+ZUVK8Bbsz6+lMComERjhkmAYE7h+y/1p+cZKrWw//YzSOFIXzyxgfX0xZvwN3wt6ClfFE6+fz4JMwH73RGbjyhsvYOXBVCwCNhP8YXzSQsVSc1IoHAKBQq9WuEkufW3Ij+Jxn3sx72P31OCTHW2B9czuKOzei/dBaeEaowU7LwH55ChJChh7Q8bs4BpBDIjEUxp1pIEen02VzteBcvT6dp7RJAdBBYwCNotI5GfjmftbTARhkIjsacA5ApVJtIoTs5TjOLQC2IJ8EIJhQ39QMXE4UaULPACCbEJJFmVir1S7gakFTiIE8V+SIX6JG1joDymOKcN2iQtvOFASk5aIvIAEXZgxUZS6HjQktvaRArVEq+IBLDawihBx114kFgYRMlOZBWz1a0FF3i0/ignecxrjuWsdJ3JOIbAAkfz8VYAg0f+MLNZcsJJNIJA0cxxl0Op1cLI0K99NYkJMnG8pEKY12l+Uj4A8aLIKDNNqeOgbTiYoWP6w7H4l5M83I/sgwLDN1FMj0hJBpLMu6FcioHLkFY1HTKMX6T8KxrfkcXwewrUZ4LslHTth7mDXqsUzAsSVdI4CBQe5P4ThZHYasDw2Yn2RuJ5GPF1JiUokC9IOvg8UM6sDhYb2IWLaKZyDLnqXwoBSakImiWDnGSKlLiRjFDNBHsOy8AjUtUvdSCbVaTRtU/6ShRKvVpnA10INgmohrQR2Yhv2a1/JxqTsV5q3x8FucBTZslngHps91VgJjlxfe/XcMH91LD/4kPpmjggo9H3fSaRoLUn6nRN6n1cgNqsHd2tu8Awdk5GG8tAeFiTPEvAEwaD6ZV+XQNAVhydt3kbnq50YSObwecVYP8PFgSAsi6FSoxE7/5QbSe3rslpG2Ac8umi4AZx7lQP5SFiUHbiBAyrpX0NDDVSoV78xiS0oBwLm/6rGotX8IQOCm4whpugDPit18jStEbLsALjLoaPTA/H9Fo7PPQ3Beu69P94sq6jmOs1itVlqZbQJBmiM7MDZ74d3fx/Im9OegOli4kbwTs6ZafotPcCDU23dilkchUsfZ6VsNUmeuPpwv6mktkZ/1lEW9IKRNcWNYvdCUvH6x6TtnDk1ZiBBgxsZlPAtZuzvw8AcaC47AY6IKPosOIC9iOiYHPdE9pI5bPsA8Qvb5zG0VCmKwO6GhpgRAPyOuNW3f9obztKlrTxM0EmfsioK/1Ir+YDlazSysbSZIJsRhypw3sOv1z4ZTKc17zjJAFwFkVhw2jOK7eMkJlv1kEhy0LwZuF5VZ2YKg5rR87p11m9OMOxxpgoLQVATzBT2NCTTFdlhWUqe9yCD/8mjU9Poga4dB8JHHch5HZisKgLDZptVi8ZeyeeVHr0eLqdYccmcbUF3sh5zLE1DTPlBDH/uiqjNa3r3huTZ3bQUQQNDfaL60YLb57KdrG993ZFIOHf6iN/JLRqPUMPA/AaXLLSubbs5PMq94Ye11QRhadjIMQ9PuwVKTa39V0dnw4WJT5JiRPX7hr1CjHj6qDb7QXQuA9mogH6CGNBvTcW/Dip/T/yd/cNiKNRzIo9lXFZ0PPT04H/qL8a4XTGbvYYhiIrqu+Un79uQV1J90aGYuJtzyAUdnKZVKGcMwtOlLO7bBg4w1bLmE4bpYKznLcZzGarUW6/V6kZmdYxTPBYC94yko+meIMKfX60VU8u7r4YUBcF+Up9vxC4Cne7fnt+ul18B/AQIULW0UAbmsAAAAAElFTkSuQmCC",
		msg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAD5ElEQVRoQ+2ZTUhUURTHz1kUZQs1NFChRnTRl2WF4qJSV0YuPG9RUBtHWipoC4MW4UTQIhcamEudNgW5eFdQyJVZbVIKa/paKGqQQkXpQota3DiP94bHNDPv3jdvUmHOapi5797/752Pe+8ZhG1uuM31Qw5gsz2YNQ8QEQFACwCsAsCoEOJJNmCzAkBEEUTscQuWUhpCCBE0RFYADMOQiUKllKtCiMItDUBEBQDQiYiRFELJNM3RICEC8YAtvA8ACBEZIqWxJwCgHwDuCiH4c0aWMQARhQGgj4Xn7foNNVUrUFu1AqGyNdi3d8MS9+V7HrybK4KZt6UwEyuxvrNBOC8ySu6MAIhoGBEZABpqliBsxGDP7j9p3yjDRM0qC8YGaRNCRP26wTeAI57fevvlV9Zb17HJ6f0w+PBUxhC+AIioCxH7WHyk4zmUl63FtS98zre84IRPOqgECF9lVhuAiEKIuMDCIu3P4Ejlt7jG6VgJ9A7Vwfmzc3Dx3EfPcOIHx6cqICqOOTlRrpvYfgCiiNhac3QZrl15ERfPsc1vniEaaz/pRBN09zbC4nIBQ9wUQqQqwUnn1ALgcomIP3imwRsTUGxXmUePD8LIxCEY6TO1hDuDuTLdGaqzvKC72ekChBFxOFS6Cr3dk/ES2X6ryQqbNiPmC4Afar3eDBu/djLECSHErOpEugDWGYdLJlcetrGpCrgvjkH09phSzKcS1jNwGt7PF2uHkRaAYRh8GGu50PTBSlI2dv3Gzx1WQmdi/wuAd816N0Dk3hkoKlyHDtsjfiE2FeBwxde4R/wC8O48/rQy6yGU1ANBADiVTLeU6uZADiBViOU8oJJ8hmHkQmjLhRDftPhMpHJ8TuflTcsBldBTGZMDUHlLThKH6Q0018+rPKI8xvEAd/FM0+SunpLpbmRWwyrxJqa0kscgVwgtCiHKVedUBuD2Cd8FeGL3ZUZ1Ia9xXAz4YMgmpWxUbbcoAdiNqwXu/bgvM16idH93XWr4QsMQno0vTwAiagAA7v+EWFD7pZfQoHnnVQVx5QF7gSG4U7GY7vm0AETUj4idzgTFhevxm5iqKJ1xfDEaeHDSulo6JqVM2/hKC5Csy6wjKKCxU6ZpchQkNS8PcAOL2xz5AYnRnWZNStmVrvXomQM6K3K+IOI//w2455BSrul0HbzWDxTAMAxOvOMei742TbPaS5jq74ECJCZ9MhFSyqtCCP5/IBALGoA7d+yFAynULUkpq1XquypdoAC8KBFVIyL3+xNDacpOSOWumwpE4ADOovYGyOWPd9NZ1aOBimj3mKwB6ArxOz4H4PfNBfXctvfAX/5FNU+iEqy4AAAAAElFTkSuQmCC",
		err: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACkElEQVRYR8WXjW1TQRCE51WQUAGkApIKCBUAFUAqYKgAqMDbAaECSAU4FWA6cAlQwUNfdGed39/dsyLlJEtRctmbnZ3dHXd64tM98ftaDcD2taRXkl6kDznsuq7b931/HxG7NUk1AbDNY58lvZV0Xnlg33Vd9H3/PSL+1sBUAdi2pE0R6E7SlqwHwWEGgC/T7/eSPkXEzyUQswBsk+kPSQT+Jyn41LJKbH2R9D49fBsRN3MgJgGkx39JupT0h8wigoyaT9IK2Z9JmgUxBwB6ofIuIqD1pGObBG5TrK8RATNHZwTANpcQHJlf1yivIUslISGYeB0R6OdwjgCky7+lh/a8rNFum8D7Gku2YRE9cfdiCQBC+yhpkq5htrZ7SfQ+Ql08tsmc+XHEwpABhPZc0rMW6lcCACTCPtLVAUBS7ejCUlprABDHNoPpLCIO75YA8sBpoj8FbC5Buk9bvinLUALI9R8pdY6FExjIHfYuT8gSwKRIHrkEGcCB5RLAiJ4GZa8twSKA/Mc1JUBU29ocyIkUQ26yBB8kfWudAUlU5y3tWgDIZb7KvqEsAXObKbiLiKsa/QkAvc10a1pUqQ1ZqQdPMTeILlqCrukC25lhjAo/P5whgMlLj9GGtvOUXRzFUMPFyc01sQvoHEo2WrPl3bSWKe9ob0yt47y5UDilqPq6Rr0Ql445ijdnSPJUZN3erHW6LYAmNTCgDSeDrwMxIBbN5UR5MDNH5mMK2KIrtp2Z4H+32O3NZoMrnj1J7TgqrDzASWT2tNhyeh0gpd2mNENbzhzhbu7x+2RmFzVUBVBMMUREm7JO5w72nVLhgqv0j+ZAq3iSeSHjnC2tSzuu+lp2MoBWoC33mkvQEuyUO/8BWl1UMNEo5I0AAAAASUVORK5CYII=",
		cam: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB/0lEQVRYR+1X7VFCMRDcVKBWIFYgVCCUYAViBa4VCBV4ViBWYAlCBWIFQgVqBXH2kccEeDwS5eMPN/NmmElyt7f3icOBxR3YPo4Ashgg2XDOndeFzXv/YWbfqaFdAUDSl4/NbH5OsgngPUGxjHfMbJxwdzUHSPYiAMVvkqfBeCNFKYAJgFYKE7GHa+n13ncB6MuRgXNuUPXAez81M4GcMUCyDeAVgDzdhyhM12Y2LAEI6c2OLP8AMPkJ4CSy8WJm3RLAEMBVBoApAL0paASg3BCLVRXSN7MeSQF4jGyMzKydC0De9MzMlJjOuUspLEuvwoiOx845eu/FgiqplGwAMi4v5bU8WU5KhfE+sJFSrtkApFxG3pY8iSOn2u8EcDHdVdHNAqCyaZBMSdYiuUiKqbqumQXgSbEH8JWYqGfh/l3N/SwAtyH2oj9FFAYlXF0Ydg5Apfm8LQb6IQE/U9wHcBES8WFbAMZm1iKZ0rAKakmqIoo+sUayQiAdiqsyW4rjlhrrV69Q7PVpttRJNgANkFYYWOpqy617FGjXQFOybhps2QDkzXyKhQWl3A8UoknmVP0TgJJS9Xc1pXLraYadIe71m/L1XwA2KU85XwCQ0mJTlObcWdgHNOVSu1yOkbq7WlxnG5FEK3cYpdsyUKdnsrAT7sPiOhtZf0x2AfQI4Bc5Ae0h3g7YBAAAAABJRU5ErkJggg==",
		fee: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEA0lEQVRYR82XX2xTVRzHv+fe4raO/UEU68RSs5GRuJYr2cCYELuosATCSiJZAg8rWZaYoAFjFI0hYyEKaGJG8MUgWqI8GB7cJKEdGTASAiSg6zYfMIFQJavNlLG5YdNu9/zI6Xbrbe9tV+CK3tff757zOb/z/f05DAV+TYrDFQrHIvO5F+qnrcPmW1DYmzxVe4mxnb2DI4vy+b/2/DOKbMMAOLaHhkcChaxdMAAY6wgNjuT1b6pzeCHL50DUGRqK7n1oABFOpmIZQfJDYn7nk4mNWzdP7bh2/bHenj57OHsDTqQw2dYFToHdb4w5nEunv61uVo/nAzE90XrP07vApA4GVKZ+JgJYAcHS/DL8KcI53j49HO02AzGsKu5bhBuE8wD1zwF4IUkv1ziTx1YridbJKenXk2fsxjsm7oIkt5aXzgxufCW+Uvj9cLZ0nAErOafNZhAZACLkIPkmEfX0DkV9GrEGFfxypJEz+RwRztsaVG/2iTQNCNBDHWOtwu/V9jJfMdnDBFZhJuIMgHXuKp8kse+hqo2hn2Op08/8KPu7Q/bdp/rtS498/Md1MCgAxgnMoIFbUal43+HH69pbJmKrlWSN5vfF8TLXybOlri1Nf61tOzh5QQ+eGQEt/HMA6lWpC2A7C1FzPp+hawvwwaeL8dE7f06tcifc7AWk60lOgOA3sTBX5TsPu7n4XwPY/+5teFYkD8n1fJdpIUoLUFUbg1/HIO5bc+y7UIzR2zLqapPwrJg2cF38qQiRWzZTux7AXTudoZ/cEcgCeP+TRRj+pQju2gQOvGcMTD67JQCfHS3HmYt2tLdMwLcubohAPrslAP/sSKk7pAFUmmuEjsn13K+3WwtA1Ck38FSdV6/KZAiFid1aANA4GLqImMKAdLHSRWgchACxlD1VrCwB0FS+RkmgetlMziwws1sCsKHNkdp066ZJbGu+awDQsuBFJY49b01k2C0B2He4ApfDJfhwxx28tCrxP8iCK/DqC5VGRECPrV710QBcXJVvWqaB9JHnVJ4zDR9BFkTAECBiXk3lmfdhzBJLNPCfZ8GWN5fg77gEM5WLCDyyLPhXe4F+Ispuxya9IK1yvQbMsqD7dAmOfFeBrw6OYslinrsdpx8WRJ3Bo9F+szQTM//99gJxPTd+W4ATn4+KATs3gDjJek9VN2OsebkzGWhrmfRnVxzOaer3UflE+UKqKVtIa83sY2NSsKgYDmHv6bPj0kBJuo3PC+BVKiuLuD0gIKwYx4zle7Zdm45k+g3FiN72+t1QPMFqHxTkuWdnUO2cxlNP8PQSEqmNrAGz7w0AeZ87otqpqhxggAXRoAkJ3M/qkfFCKuC9NUtKV2Z7+wN9NkT0o7h+jXsP2/8/JkZ8jgAAAABJRU5ErkJggg==",
		card: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADv0lEQVRYR8WXXUxTZxjH/+9R0dYWqy6LLHOwqDCNF6dlibaGWUeTJdtCiiYmeCGYGbyYJhqjMd6AcTGawdQESErCQC/GPrK4gTdbEFDDKWppT7zQ9kAGigEjEMtX6wec17wntjlHChU4jCc5aZP3zfP/nef5vx+HYJGDLLI+5gWwiXfwnaIgzucl5gyQabXXEUIKZVk+0Cm2180VYtYAGTxvSeEMtQTEbVxrQWQojElZ3tUltrcyiM/47Rkyx5UAeCT5hdJkYLMCUMSJsYUQ8NlFe5DGb8bt8hqEH/eHCUUR5eAmQFFMlMjyp0GxvWcmiPcGYP0mBLUx8XSHTckb7u1D89lK5f8ywwpscDmQbreh+WwFXkWiV6SANw6UCOS9AN6Kt6QYV1hyjh+E5ZM0DIT+Q9cNAf3iw7jwxlwHUowGRcdX9yceC34kq0JSgI38didHuGsx8dfRKB42NmNQ6k4oHHvL8cHn+Od0GSilM1ZhCgDr83IYCilHeEJpBghxsqTMcMuMBgz39scruWp9mgIxXbC5r6MvAJkefYnolR5RDL87VwOgiBNDAIRkJHPvbMcphchROf9dU2oAYmvbc2ILxiKTCPWOz1Yn4fyO0AjYk6gdGoAsq73HaVuTnrl+Ja63PcO3Oz7UBYAlYQC+4EhYCgir1Um1ADYHLc77WJnMfj/PWqUbgKehF9UNTxDyCxrNBQfoG3qJxrZnSkX7hl5BlmFVnx+6AzAxJhorO6umskVnbkJQ6gQFzqi3aN0ARiMTKP7xASSVcc0mE/bv24vCfXuRajbDXVCEYEi6GQp4laXNQjeAsl+7Ud/0FJXl55HrzEnonf3Fh3HHFxClgGDVHcB55C5crq9gNq3E1fo/cK7kNHbnfaMBOVd+GVd/+V1jRN0qkH3Qi8OHvsOdex245xfx5c4cVP10XgNQUf0zKjw1CwNQcOY+xifMqLp4Af8234z3XU3w/fFTaGq9NSz5vRbdW+ALDuNQ2QPF7a5dXyj5U00m5Od9DWZGFswDd33+hTEhE2AQ5b89mrISGMS2bBtOlfyAkdGxv6WA4Na9Aols3zf4Ap6GJ7guDKiG6bGQ33vpfwFQQ5XWdqGxbSD5VlzgWoex6CRMhiVwWtfodhawKiQHsNpbP/pg+U7Pya0oq+/GWGRCN4AOaRSgVGPAKTthJm93E45cy85KBXv0ivh9QKb5kuj9a9rjmA1k2exHKVBKQHQ7iynoMAFK1eZLaEI1GfvAmADmfTVbCvTM9G2Q9FasVxumy7PoAG8An/fXMAiLsSAAAAAASUVORK5CYII="
	};
});
define("utils/http.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function e() {
		function t() {
			wx.getSetting({
				success: function(n) {
					n.authSetting["scope.userInfo"] ? r(c, a) : wx.showModal({
						title: "提示",
						content: "你拒绝了授权，将无法正常使用产品功能，请点击授权允许。",
						confirmText: "授权",
						success: function(n) {
							n.confirm && wx.openSetting({
								success: function(n) {
									console.log("授权", n),
									n.authSetting["scope.userInfo"] && e()
								}
							})
						}
					})
				}
			})
		}
		function r(e, n) {
			wx.request({
				url: s + "/regUserInfo",
				method: "POST",
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: n
				},
				data: {
					rawData: e.rawData,
					signature: e.signature,
					encryptedData: e.encryptedData,
					iv: e.iv,
					appId: "wx8d001aef31c6d06f"
				},
				success: function(e) {
					200 == (e = e.data).code && (console.log("settokennnnnnnnnnnnn", e), wx.setStorage({
						key: "token_1",
						data: e.result.token
					}), wx.setStorage({
						key: "nickName",
						data: e.result.nickName
					}), wx.reLaunch({
						url: "/pages/cardpack/cardpack"
					}))
				},
				fail: function() {}
			})
		}
		wx.getSystemInfo({
			success: function(e) {
				o = e
			}
		}),
		wx.getUserInfo({
			lang: "zh_CN",
			success: function(e) {
				c = e
			},
			complete: function() {
				wx.login({
					success: function(e) {
						e.code ? (console.log("res:", e), n("/onLogin", {
							code: e.code,
							appId: "wx8d001aef31c6d06f",
							model: o.model,
							pixelRatio: o.pixelRatio,
							screenWidth: o.screenWidth,
							screenHeight: o.screenHeight,
							windowWidth: o.windowWidth,
							windowHeight: o.windowHeight,
							language: o.language,
							version: o.version,
							system: o.system,
							platform: o.platform,
							sdkVersion: o.SDKVersion
						}).then(function(e) {
							200 == e.code && (a = e.result.token, e.result.sign ? (wx.setStorage({
								key: "token_1",
								data: e.result.token
							}), wx.setStorage({
								key: "nickName",
								data: e.result.nickName
							}), wx.reLaunch({
								url: "/pages/cardpack/cardpack"
							})) : t())
						})) : console.log("获取用户登录态失败！" + e.errMsg)
					}
				})
			}
		})
	}
	function n(e, n) {
		return t("POST", e, n, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
			"Content-Type": "application/x-www-form-urlencoded"
		})
	}
	function t(n, t, o) {
		var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {
			"Content-Type": "application/json"
		},
		c = void 0,
		r = void 0;
		try {
			var i = wx.getStorageSync("token_1");
			i && (a.Authorization = i)
		} catch(e) {}
		return new Promise(function(i, u) {
			wx.request({
				url: s + t,
				method: n,
				header: a,
				data: o || {},
				success: function(n) {
					c = n.data,
					i(n.data),
					401 == c.code && (wx.clearStorage(), e())
				},
				fail: function(e) {
					r = e,
					u(e)
				},
				complete: function() {
					console.info("==============>请求开始<=============="),
					o && console.warn("参数：", o),
					c ? console.warn("返回成功：", c) : console.warn("返回失败：", r),
					console.info("==============>请求结束<==============")
				}
			})
		})
	}
	Object.defineProperty(exports, "__esModule", {
		value: !0
	}),
	exports.login = e,
	exports.shareLog = function(e) {
		n("/shareLog", {
			shareDes: e.shareDes,
			sharePage: e.sharePage,
			destination: "朋友",
			state: e.state,
			app: "wx8d001aef31c6d06f"
		}).then(function(e) {}).
		catch(function(e) {})
	},
	exports.get = function(e, n, o) {
		return t("GET", e, n, o)
	},
	exports.del = function(e, n, o) {
		return t("DELETE", e, n, o)
	},
	exports.put = function(e, n) {
		return t("PUT", e, n, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
			"Content-Type": "application/x-www-form-urlencoded"
		})
	},
	exports.post = n,
	exports.request = t;
	var o, a, c, s = exports.rootUrlProduce = "https://x.wankadi.com";
});
define("utils/util.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function t(t) {
		return (t = t.toString())[1] ? t: "0" + t
	}
	module.exports = {
		formatTime: function(e) {
			var n = e.getFullYear(),
			o = e.getMonth() + 1,
			i = e.getDate();
			e.getHours(),
			e.getMinutes(),
			e.getSeconds();
			return [n, o, i].map(t).join("/")
		},
		showLoading: function() {
			try {
				wx.canIUse("showLoading") ? wx.showLoading({
					title: "加载中..."
				}) : wx.showToast({
					title: "加载中",
					icon: "loading"
				})
			} catch(t) {
				wx.showToast({
					title: "加载中",
					icon: "loading"
				})
			}
		},
		hideLoading: function() {
			try {
				wx.canIUse("hideLoading") ? wx.hideLoading() : wx.hideToast()
			} catch(t) {
				wx.hideToast()
			}
		},
		hideShareMenu: function() {
			try {
				wx.canIUse("hideShareMenu") && wx.hideShareMenu()
			} catch(t) {}
		}
	};
});
define("wxParse/html2json.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function e(e) {
		for (var t = {},
		r = e.split(","), s = 0; s < r.length; s++) t[r[s]] = !0;
		return t
	}
	function t(e) {
		return e.replace(/<\?xml.*\?>\n/, "").replace(/<.*!doctype.*\>\n/, "").replace(/<.*!DOCTYPE.*\>\n/, "")
	}
	function r(e) {
		return e.replace(/\n+/g, "").replace(/<!--.*?-->/gi, "").replace(/\/\*.*?\*\//gi, "").replace(/[ ]+</gi, "<")
	}
	function s(e) {
		var t = [];
		if (0 == n.length || !i) return (d = {}).node = "text",
		d.text = e,
		s = [d];
		e = e.replace(/\[([^\[\]]+)\]/g, ":$1:");
		for (var r = new RegExp("[:]"), s = e.split(r), a = 0; a < s.length; a++) {
			var l = s[a],
			d = {};
			i[l] ? (d.node = "element", d.tag = "emoji", d.text = i[l], d.baseSrc = o) : (d.node = "text", d.text = l),
			t.push(d)
		}
		return t
	}
	var a = "https",
	n = "",
	o = "",
	i = {},
	l = require("./wxDiscode.js"),
	d = require("./htmlparser.js"),
	c = (e("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), e("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video")),
	u = e("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
	p = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
	e("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),
	e("wxxxcode-style,script,style,view,scroll-view,block");
	module.exports = {
		html2json: function(e, n) {
			e = r(e = t(e)),
			e = l.strDiscode(e);
			var o = [],
			i = {
				node: n,
				nodes: [],
				images: [],
				imageUrls: []
			},
			m = 0;
			return d(e, {
				start: function(e, t, r) {
					var s = {
						node: "element",
						tag: e
					};
					if (0 === o.length ? (s.index = m.toString(), m += 1) : (void 0 === (x = o[0]).nodes && (x.nodes = []), s.index = x.index + "." + x.nodes.length), c[e] ? s.tagType = "block": u[e] ? s.tagType = "inline": p[e] && (s.tagType = "closeSelf"), 0 !== t.length && (s.attr = t.reduce(function(e, t) {
						var r = t.name,
						a = t.value;
						return "class" == r && (console.dir(a), s.classStr = a),
						"style" == r && (console.dir(a), s.styleStr = a),
						a.match(/ /) && (a = a.split(" ")),
						e[r] ? Array.isArray(e[r]) ? e[r].push(a) : e[r] = [e[r], a] : e[r] = a,
						e
					},
					{})), "img" === s.tag) {
						s.imgIndex = i.images.length;
						var d = s.attr.src;
						"" == d[0] && d.splice(0, 1),
						d = l.urlToHttpUrl(d, a),
						s.attr.src = d,
						s.from = n,
						i.images.push(s),
						i.imageUrls.push(d)
					}
					if ("font" === s.tag) {
						var g = ["x-small", "small", "medium", "large", "x-large", "xx-large", "-webkit-xxx-large"],
						f = {
							color: "color",
							face: "font-family",
							size: "font-size"
						};
						s.attr.style || (s.attr.style = []),
						s.styleStr || (s.styleStr = "");
						for (var h in f) if (s.attr[h]) {
							var v = "size" === h ? g[s.attr[h] - 1] : s.attr[h];
							s.attr.style.push(f[h]),
							s.attr.style.push(v),
							s.styleStr += f[h] + ": " + v + ";"
						}
					}
					if ("source" === s.tag && (i.source = s.attr.src), r) {
						var x = o[0] || i;
						void 0 === x.nodes && (x.nodes = []),
						x.nodes.push(s)
					} else o.unshift(s)
				},
				end: function(e) {
					var t = o.shift();
					if (t.tag !== e && console.error("invalid state: mismatch end tag"), "video" === t.tag && i.source && (t.attr.src = i.source, delete result.source), 0 === o.length) i.nodes.push(t);
					else {
						var r = o[0];
						void 0 === r.nodes && (r.nodes = []),
						r.nodes.push(t)
					}
				},
				chars: function(e) {
					var t = {
						node: "text",
						text: e,
						textArray: s(e)
					};
					if (0 === o.length) i.nodes.push(t);
					else {
						var r = o[0];
						void 0 === r.nodes && (r.nodes = []),
						t.index = r.index + "." + r.nodes.length,
						r.nodes.push(t)
					}
				},
				comment: function(e) {}
			}),
			i
		},
		emojisInit: function() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
			t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/",
			r = arguments[2];
			n = e,
			o = t,
			i = r
		}
	};
});
define("wxParse/htmlparser.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function e(e) {
		for (var t = {},
		r = e.split(","), s = 0; s < r.length; s++) t[r[s]] = !0;
		return t
	}
	var t = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
	r = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
	s = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,
	a = e("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"),
	n = e("a,address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),
	i = e("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
	o = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
	l = e("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),
	c = e("wxxxcode-style,script,style,view,scroll-view,block");
	module.exports = function(e, d) {
		function f(e, t) {
			if (t) for (t = t.toLowerCase(), r = b.length - 1; r >= 0 && b[r] != t; r--);
			else var r = 0;
			if (r >= 0) {
				for (var s = b.length - 1; s >= r; s--) d.end && d.end(b[s]);
				b.length = r
			}
		}
		var p, u, h, b = [],
		m = e;
		for (b.last = function() {
			return this[this.length - 1]
		}; e;) {
			if (u = !0, b.last() && c[b.last()]) e = e.replace(new RegExp("([\\s\\S]*?)</" + b.last() + "[^>]*>"),
			function(e, t) {
				return t = t.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"),
				d.chars && d.chars(t),
				""
			}),
			f(0, b.last());
			else if (0 == e.indexOf("\x3c!--") ? (p = e.indexOf("--\x3e")) >= 0 && (d.comment && d.comment(e.substring(4, p)), e = e.substring(p + 3), u = !1) : 0 == e.indexOf("</") ? (h = e.match(r)) && (e = e.substring(h[0].length), h[0].replace(r, f), u = !1) : 0 == e.indexOf("<") && (h = e.match(t)) && (e = e.substring(h[0].length), h[0].replace(t,
			function(e, t, r, c) {
				if (t = t.toLowerCase(), n[t]) for (; b.last() && i[b.last()];) f(0, b.last());
				if (o[t] && b.last() == t && f(0, t), (c = a[t] || !!c) || b.push(t), d.start) {
					var p = [];
					r.replace(s,
					function(e, t) {
						var r = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : l[t] ? t: "";
						p.push({
							name: t,
							value: r,
							escaped: r.replace(/(^|[^\\])"/g, '$1\\"')
						})
					}),
					d.start && d.start(t, p, c)
				}
			}), u = !1), u) {
				p = e.indexOf("<");
				for (var g = ""; 0 === p;) g += "<",
				p = (e = e.substring(1)).indexOf("<");
				g += p < 0 ? e: e.substring(0, p),
				e = p < 0 ? "": e.substring(p),
				d.chars && d.chars(g)
			}
			if (e == m) throw "Parse Error: " + e;
			m = e
		}
		f()
	};
});
define("wxParse/showdown.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function e(e) {
		var r = {
			omitExtraWLInCodeBlocks: {
				defaultValue: !1,
				describe: "Omit the default extra whiteline added to code blocks",
				type: "boolean"
			},
			noHeaderId: {
				defaultValue: !1,
				describe: "Turn on/off generated header id",
				type: "boolean"
			},
			prefixHeaderId: {
				defaultValue: !1,
				describe: "Specify a prefix to generated header ids",
				type: "string"
			},
			headerLevelStart: {
				defaultValue: !1,
				describe: "The header blocks level start",
				type: "integer"
			},
			parseImgDimensions: {
				defaultValue: !1,
				describe: "Turn on/off image dimension parsing",
				type: "boolean"
			},
			simplifiedAutoLink: {
				defaultValue: !1,
				describe: "Turn on/off GFM autolink style",
				type: "boolean"
			},
			literalMidWordUnderscores: {
				defaultValue: !1,
				describe: "Parse midword underscores as literal underscores",
				type: "boolean"
			},
			strikethrough: {
				defaultValue: !1,
				describe: "Turn on/off strikethrough support",
				type: "boolean"
			},
			tables: {
				defaultValue: !1,
				describe: "Turn on/off tables support",
				type: "boolean"
			},
			tablesHeaderId: {
				defaultValue: !1,
				describe: "Add an id to table headers",
				type: "boolean"
			},
			ghCodeBlocks: {
				defaultValue: !0,
				describe: "Turn on/off GFM fenced code blocks support",
				type: "boolean"
			},
			tasklists: {
				defaultValue: !1,
				describe: "Turn on/off GFM tasklist support",
				type: "boolean"
			},
			smoothLivePreview: {
				defaultValue: !1,
				describe: "Prevents weird effects in live previews due to incomplete input",
				type: "boolean"
			},
			smartIndentationFix: {
				defaultValue: !1,
				description: "Tries to smartly fix identation in es6 strings",
				type: "boolean"
			}
		};
		if (!1 === e) return JSON.parse(JSON.stringify(r));
		var t = {};
		for (var n in r) r.hasOwnProperty(n) && (t[n] = r[n].defaultValue);
		return t
	}
	function r(e, r) {
		var t = r ? "Error in " + r + " extension->": "Error in unnamed extension",
		a = {
			valid: !0,
			error: ""
		};
		s.helper.isArray(e) || (e = [e]);
		for (var o = 0; o < e.length; ++o) {
			var i = t + " sub-extension " + o + ": ",
			l = e[o];
			if ("object" !== (void 0 === l ? "undefined": n(l))) return a.valid = !1,
			a.error = i + "must be an object, but " + (void 0 === l ? "undefined": n(l)) + " given",
			a;
			if (!s.helper.isString(l.type)) return a.valid = !1,
			a.error = i + 'property "type" must be a string, but ' + n(l.type) + " given",
			a;
			var c = l.type = l.type.toLowerCase();
			if ("language" === c && (c = l.type = "lang"), "html" === c && (c = l.type = "output"), "lang" !== c && "output" !== c && "listener" !== c) return a.valid = !1,
			a.error = i + "type " + c + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"',
			a;
			if ("listener" === c) {
				if (s.helper.isUndefined(l.listeners)) return a.valid = !1,
				a.error = i + '. Extensions of type "listener" must have a property called "listeners"',
				a
			} else if (s.helper.isUndefined(l.filter) && s.helper.isUndefined(l.regex)) return a.valid = !1,
			a.error = i + c + ' extensions must define either a "regex" property or a "filter" method',
			a;
			if (l.listeners) {
				if ("object" !== n(l.listeners)) return a.valid = !1,
				a.error = i + '"listeners" property must be an object but ' + n(l.listeners) + " given",
				a;
				for (var u in l.listeners) if (l.listeners.hasOwnProperty(u) && "function" != typeof l.listeners[u]) return a.valid = !1,
				a.error = i + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + u + " must be a function but " + n(l.listeners[u]) + " given",
				a
			}
			if (l.filter) {
				if ("function" != typeof l.filter) return a.valid = !1,
				a.error = i + '"filter" must be a function, but ' + n(l.filter) + " given",
				a
			} else if (l.regex) {
				if (s.helper.isString(l.regex) && (l.regex = new RegExp(l.regex, "g")), !l.regex instanceof RegExp) return a.valid = !1,
				a.error = i + '"regex" property must either be a string or a RegExp object, but ' + n(l.regex) + " given",
				a;
				if (s.helper.isUndefined(l.replace)) return a.valid = !1,
				a.error = i + '"regex" extensions must implement a replace string or function',
				a
			}
		}
		return a
	}
	function t(e, r) {
		return "~E" + r.charCodeAt(0) + "E"
	}
	var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
	function(e) {
		return typeof e
	}: function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
	},
	s = {},
	a = {},
	o = {},
	i = e(!0),
	l = {
		github: {
			omitExtraWLInCodeBlocks: !0,
			prefixHeaderId: "user-content-",
			simplifiedAutoLink: !0,
			literalMidWordUnderscores: !0,
			strikethrough: !0,
			tables: !0,
			tablesHeaderId: !0,
			ghCodeBlocks: !0,
			tasklists: !0
		},
		vanilla: e(!0)
	};
	s.helper = {},
	s.extensions = {},
	s.setOption = function(e, r) {
		return i[e] = r,
		this
	},
	s.getOption = function(e) {
		return i[e]
	},
	s.getOptions = function() {
		return i
	},
	s.resetOptions = function() {
		i = e(!0)
	},
	s.setFlavor = function(e) {
		if (l.hasOwnProperty(e)) {
			var r = l[e];
			for (var t in r) r.hasOwnProperty(t) && (i[t] = r[t])
		}
	},
	s.getDefaultOptions = function(r) {
		return e(r)
	},
	s.subParser = function(e, r) {
		if (s.helper.isString(e)) {
			if (void 0 === r) {
				if (a.hasOwnProperty(e)) return a[e];
				throw Error("SubParser named " + e + " not registered!")
			}
			a[e] = r
		}
	},
	s.extension = function(e, t) {
		if (!s.helper.isString(e)) throw Error("Extension 'name' must be a string");
		if (e = s.helper.stdExtName(e), s.helper.isUndefined(t)) {
			if (!o.hasOwnProperty(e)) throw Error("Extension named " + e + " is not registered!");
			return o[e]
		}
		"function" == typeof t && (t = t()),
		s.helper.isArray(t) || (t = [t]);
		var n = r(t, e);
		if (!n.valid) throw Error(n.error);
		o[e] = t
	},
	s.getAllExtensions = function() {
		return o
	},
	s.removeExtension = function(e) {
		delete o[e]
	},
	s.resetExtensions = function() {
		o = {}
	},
	s.validateExtension = function(e) {
		var t = r(e, null);
		return !! t.valid || (console.warn(t.error), !1)
	},
	s.hasOwnProperty("helper") || (s.helper = {}),
	s.helper.isString = function(e) {
		return "string" == typeof e || e instanceof String
	},
	s.helper.isFunction = function(e) {
		var r = {};
		return e && "[object Function]" === r.toString.call(e)
	},
	s.helper.forEach = function(e, r) {
		if ("function" == typeof e.forEach) e.forEach(r);
		else for (var t = 0; t < e.length; t++) r(e[t], t, e)
	},
	s.helper.isArray = function(e) {
		return e.constructor === Array
	},
	s.helper.isUndefined = function(e) {
		return void 0 === e
	},
	s.helper.stdExtName = function(e) {
		return e.replace(/[_-]||\s/g, "").toLowerCase()
	},
	s.helper.escapeCharactersCallback = t,
	s.helper.escapeCharacters = function(e, r, n) {
		var s = "([" + r.replace(/([\[\]\\])/g, "\\$1") + "])";
		n && (s = "\\\\" + s);
		var a = new RegExp(s, "g");
		return e = e.replace(a, t)
	};
	var c = function(e, r, t, n) {
		var s, a, o, i, l, c = n || "",
		u = c.indexOf("g") > -1,
		p = new RegExp(r + "|" + t, "g" + c.replace(/g/g, "")),
		h = new RegExp(r, c.replace(/g/g, "")),
		d = [];
		do {
			for (s = 0; o = p.exec(e);) if (h.test(o[0])) s++||(i = (a = p.lastIndex) - o[0].length);
			else if (s && !--s) {
				l = o.index + o[0].length;
				var f = {
					left: {
						start: i,
						end: a
					},
					match: {
						start: a,
						end: o.index
					},
					right: {
						start: o.index,
						end: l
					},
					wholeMatch: {
						start: i,
						end: l
					}
				};
				if (d.push(f), !u) return d
			}
		} while ( s && ( p . lastIndex = a ));
		return d
	};
	s.helper.matchRecursiveRegExp = function(e, r, t, n) {
		for (var s = c(e, r, t, n), a = [], o = 0; o < s.length; ++o) a.push([e.slice(s[o].wholeMatch.start, s[o].wholeMatch.end), e.slice(s[o].match.start, s[o].match.end), e.slice(s[o].left.start, s[o].left.end), e.slice(s[o].right.start, s[o].right.end)]);
		return a
	},
	s.helper.replaceRecursiveRegExp = function(e, r, t, n, a) {
		if (!s.helper.isFunction(r)) {
			var o = r;
			r = function() {
				return o
			}
		}
		var i = c(e, t, n, a),
		l = e,
		u = i.length;
		if (u > 0) {
			var p = [];
			0 !== i[0].wholeMatch.start && p.push(e.slice(0, i[0].wholeMatch.start));
			for (var h = 0; h < u; ++h) p.push(r(e.slice(i[h].wholeMatch.start, i[h].wholeMatch.end), e.slice(i[h].match.start, i[h].match.end), e.slice(i[h].left.start, i[h].left.end), e.slice(i[h].right.start, i[h].right.end))),
			h < u - 1 && p.push(e.slice(i[h].wholeMatch.end, i[h + 1].wholeMatch.start));
			i[u - 1].wholeMatch.end < e.length && p.push(e.slice(i[u - 1].wholeMatch.end)),
			l = p.join("")
		}
		return l
	},
	s.helper.isUndefined(console) && (console = {
		warn: function(e) {
			alert(e)
		},
		log: function(e) {
			alert(e)
		},
		error: function(e) {
			throw e
		}
	}),
	s.Converter = function(e) {
		function t(e, t) {
			if (t = t || null, s.helper.isString(e)) {
				if (e = s.helper.stdExtName(e), t = e, s.extensions[e]) return console.warn("DEPRECATION WARNING: " + e + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"),
				void a(s.extensions[e], e);
				if (s.helper.isUndefined(o[e])) throw Error('Extension "' + e + '" could not be loaded. It was either not found or is not a valid extension.');
				e = o[e]
			}
			"function" == typeof e && (e = e()),
			s.helper.isArray(e) || (e = [e]);
			var n = r(e, t);
			if (!n.valid) throw Error(n.error);
			for (var i = 0; i < e.length; ++i) {
				switch (e[i].type) {
				case "lang":
					h.push(e[i]);
					break;
				case "output":
					d.push(e[i])
				}
				if (e[i].hasOwnProperty(f)) for (var l in e[i].listeners) e[i].listeners.hasOwnProperty(l) && c(l, e[i].listeners[l])
			}
		}
		function a(e, t) {
			"function" == typeof e && (e = e(new s.Converter)),
			s.helper.isArray(e) || (e = [e]);
			var n = r(e, t);
			if (!n.valid) throw Error(n.error);
			for (var a = 0; a < e.length; ++a) switch (e[a].type) {
			case "lang":
				h.push(e[a]);
				break;
			case "output":
				d.push(e[a]);
				break;
			default:
				throw Error("Extension loader error: Type unrecognized!!!")
			}
		}
		function c(e, r) {
			if (!s.helper.isString(e)) throw Error("Invalid argument in converter.listen() method: name must be a string, but " + (void 0 === e ? "undefined": n(e)) + " given");
			if ("function" != typeof r) throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + (void 0 === r ? "undefined": n(r)) + " given");
			f.hasOwnProperty(e) || (f[e] = []),
			f[e].push(r)
		}
		function u(e) {
			var r = e.match(/^\s*/)[0].length,
			t = new RegExp("^\\s{0," + r + "}", "gm");
			return e.replace(t, "")
		}
		var p = {},
		h = [],
		d = [],
		f = {}; !
		function() {
			e = e || {};
			for (var r in i) i.hasOwnProperty(r) && (p[r] = i[r]);
			if ("object" !== (void 0 === e ? "undefined": n(e))) throw Error("Converter expects the passed parameter to be an object, but " + (void 0 === e ? "undefined": n(e)) + " was passed instead.");
			for (var a in e) e.hasOwnProperty(a) && (p[a] = e[a]);
			p.extensions && s.helper.forEach(p.extensions, t)
		} (),
		this._dispatch = function(e, r, t, n) {
			if (f.hasOwnProperty(e)) for (var s = 0; s < f[e].length; ++s) {
				var a = f[e][s](e, r, this, t, n);
				a && void 0 !== a && (r = a)
			}
			return r
		},
		this.listen = function(e, r) {
			return c(e, r),
			this
		},
		this.makeHtml = function(e) {
			if (!e) return e;
			var r = {
				gHtmlBlocks: [],
				gHtmlMdBlocks: [],
				gHtmlSpans: [],
				gUrls: {},
				gTitles: {},
				gDimensions: {},
				gListLevel: 0,
				hashLinkCounts: {},
				langExtensions: h,
				outputModifiers: d,
				converter: this,
				ghCodeBlocks: []
			};
			return e = e.replace(/~/g, "~T"),
			e = e.replace(/\$/g, "~D"),
			e = e.replace(/\r\n/g, "\n"),
			e = e.replace(/\r/g, "\n"),
			p.smartIndentationFix && (e = u(e)),
			e = e,
			e = s.subParser("detab")(e, p, r),
			e = s.subParser("stripBlankLines")(e, p, r),
			s.helper.forEach(h,
			function(t) {
				e = s.subParser("runExtension")(t, e, p, r)
			}),
			e = s.subParser("hashPreCodeTags")(e, p, r),
			e = s.subParser("githubCodeBlocks")(e, p, r),
			e = s.subParser("hashHTMLBlocks")(e, p, r),
			e = s.subParser("hashHTMLSpans")(e, p, r),
			e = s.subParser("stripLinkDefinitions")(e, p, r),
			e = s.subParser("blockGamut")(e, p, r),
			e = s.subParser("unhashHTMLSpans")(e, p, r),
			e = s.subParser("unescapeSpecialChars")(e, p, r),
			e = e.replace(/~D/g, "$$"),
			e = e.replace(/~T/g, "~"),
			s.helper.forEach(d,
			function(t) {
				e = s.subParser("runExtension")(t, e, p, r)
			}),
			e
		},
		this.setOption = function(e, r) {
			p[e] = r
		},
		this.getOption = function(e) {
			return p[e]
		},
		this.getOptions = function() {
			return p
		},
		this.addExtension = function(e, r) {
			t(e, r = r || null)
		},
		this.useExtension = function(e) {
			t(e)
		},
		this.setFlavor = function(e) {
			if (l.hasOwnProperty(e)) {
				var r = l[e];
				for (var t in r) r.hasOwnProperty(t) && (p[t] = r[t])
			}
		},
		this.removeExtension = function(e) {
			s.helper.isArray(e) || (e = [e]);
			for (var r = 0; r < e.length; ++r) {
				for (var t = e[r], n = 0; n < h.length; ++n) h[n] === t && h[n].splice(n, 1);
				for (; 0 < d.length; ++n) d[0] === t && d[0].splice(n, 1)
			}
		},
		this.getAllExtensions = function() {
			return {
				language: h,
				output: d
			}
		}
	},
	s.subParser("anchors",
	function(e, r, t) {
		var n = function(e, r, n, a, o, i, l, c) {
			s.helper.isUndefined(c) && (c = ""),
			e = r;
			var u = n,
			p = a.toLowerCase(),
			h = o,
			d = c;
			if (!h) if (p || (p = u.toLowerCase().replace(/ ?\n/g, " ")), h = "#" + p, s.helper.isUndefined(t.gUrls[p])) {
				if (! (e.search(/\(\s*\)$/m) > -1)) return e;
				h = ""
			} else h = t.gUrls[p],
			s.helper.isUndefined(t.gTitles[p]) || (d = t.gTitles[p]);
			var f = '<a href="' + (h = s.helper.escapeCharacters(h, "*_", !1)) + '"';
			return "" !== d && null !== d && (d = d.replace(/"/g, "&quot;"), f += ' title="' + (d = s.helper.escapeCharacters(d, "*_", !1)) + '"'),
			f += ">" + u + "</a>"
		};
		return e = (e = t.converter._dispatch("anchors.before", e, r, t)).replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g, n),
		e = e.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, n),
		e = e.replace(/(\[([^\[\]]+)])()()()()()/g, n),
		e = t.converter._dispatch("anchors.after", e, r, t)
	}),
	s.subParser("autoLinks",
	function(e, r, t) {
		function n(e, r) {
			var t = r;
			return /^www\./i.test(r) && (r = r.replace(/^www\./i, "http://www.")),
			'<a href="' + r + '">' + t + "</a>"
		}
		function a(e, r) {
			var t = s.subParser("unescapeSpecialChars")(r);
			return s.subParser("encodeEmailAddress")(t)
		}
		var o = /\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)(?=\s|$)(?!["<>])/gi,
		i = /<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi,
		l = /(?:^|[ \n\t])([A-Za-z0-9!#$%&'*+-/ = ?^_`\ { |
		}~\.] + @ [ - a - z0 - 9] + (\. [ - a - z0 - 9] + ) * \. [a - z] + )( ? :$ | [\n\t]) / gi,
		c = /<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi;
		return e = (e = t.converter._dispatch("autoLinks.before", e, r, t)).replace(i, n),
		e = e.replace(c, a),
		r.simplifiedAutoLink && (e = (e = e.replace(o, n)).replace(l, a)),
		e = t.converter._dispatch("autoLinks.after", e, r, t)
	}),
	s.subParser("blockGamut",
	function(e, r, t) {
		e = t.converter._dispatch("blockGamut.before", e, r, t),
		e = s.subParser("blockQuotes")(e, r, t),
		e = s.subParser("headers")(e, r, t);
		var n = s.subParser("hashBlock")("<hr />", r, t);
		return e = e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, n),
		e = e.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, n),
		e = e.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, n),
		e = s.subParser("lists")(e, r, t),
		e = s.subParser("codeBlocks")(e, r, t),
		e = s.subParser("tables")(e, r, t),
		e = s.subParser("hashHTMLBlocks")(e, r, t),
		e = s.subParser("paragraphs")(e, r, t),
		e = t.converter._dispatch("blockGamut.after", e, r, t)
	}),
	s.subParser("blockQuotes",
	function(e, r, t) {
		return e = t.converter._dispatch("blockQuotes.before", e, r, t),
		e = e.replace(/((^[ \t]{0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm,
		function(e, n) {
			var a = n;
			return a = a.replace(/^[ \t]*>[ \t]?/gm, "~0"),
			a = a.replace(/~0/g, ""),
			a = a.replace(/^[ \t]+$/gm, ""),
			a = s.subParser("githubCodeBlocks")(a, r, t),
			a = s.subParser("blockGamut")(a, r, t),
			a = a.replace(/(^|\n)/g, "$1  "),
			a = a.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,
			function(e, r) {
				var t = r;
				return t = t.replace(/^  /gm, "~0"),
				t = t.replace(/~0/g, "")
			}),
			s.subParser("hashBlock")("<blockquote>\n" + a + "\n</blockquote>", r, t)
		}),
		e = t.converter._dispatch("blockQuotes.after", e, r, t)
	}),
	s.subParser("codeBlocks",
	function(e, r, t) {
		e = t.converter._dispatch("codeBlocks.before", e, r, t);
		var n = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;
		return e = (e += "~0").replace(n,
		function(e, n, a) {
			var o = n,
			i = a,
			l = "\n";
			return o = s.subParser("outdent")(o),
			o = s.subParser("encodeCode")(o),
			o = s.subParser("detab")(o),
			o = o.replace(/^\n+/g, ""),
			o = o.replace(/\n+$/g, ""),
			r.omitExtraWLInCodeBlocks && (l = ""),
			o = "<pre><code>" + o + l + "</code></pre>",
			s.subParser("hashBlock")(o, r, t) + i
		}),
		e = e.replace(/~0/, ""),
		e = t.converter._dispatch("codeBlocks.after", e, r, t)
	}),
	s.subParser("codeSpans",
	function(e, r, t) {
		return void 0 === (e = t.converter._dispatch("codeSpans.before", e, r, t)) && (e = ""),
		e = e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
		function(e, r, t, n) {
			var a = n;
			return a = a.replace(/^([ \t]*)/g, ""),
			a = a.replace(/[ \t]*$/g, ""),
			a = s.subParser("encodeCode")(a),
			r + "<code>" + a + "</code>"
		}),
		e = t.converter._dispatch("codeSpans.after", e, r, t)
	}),
	s.subParser("detab",
	function(e) {
		return e = e.replace(/\t(?=\t)/g, "    "),
		e = e.replace(/\t/g, "~A~B"),
		e = e.replace(/~B(.+?)~A/g,
		function(e, r) {
			for (var t = r,
			n = 4 - t.length % 4,
			s = 0; s < n; s++) t += " ";
			return t
		}),
		e = e.replace(/~A/g, "    "),
		e = e.replace(/~B/g, "")
	}),
	s.subParser("encodeAmpsAndAngles",
	function(e) {
		return e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"),
		e = e.replace(/<(?![a-z\/?\$!])/gi, "&lt;")
	}),
	s.subParser("encodeBackslashEscapes",
	function(e) {
		return e = e.replace(/\\(\\)/g, s.helper.escapeCharactersCallback),
		e = e.replace(/\\([`*_{}\[\]()>#+-.!])/g, s.helper.escapeCharactersCallback)
	}),
	s.subParser("encodeCode",
	function(e) {
		return e = e.replace(/&/g, "&amp;"),
		e = e.replace(/</g, "&lt;"),
		e = e.replace(/>/g, "&gt;"),
		e = s.helper.escapeCharacters(e, "*_{}[]\\", !1)
	}),
	s.subParser("encodeEmailAddress",
	function(e) {
		var r = [function(e) {
			return "&#" + e.charCodeAt(0) + ";"
		},
		function(e) {
			return "&#x" + e.charCodeAt(0).toString(16) + ";"
		},
		function(e) {
			return e
		}];
		return e = "mailto:" + e,
		e = e.replace(/./g,
		function(e) {
			if ("@" === e) e = r[Math.floor(2 * Math.random())](e);
			else if (":" !== e) {
				var t = Math.random();
				e = t > .9 ? r[2](e) : t > .45 ? r[1](e) : r[0](e)
			}
			return e
		}),
		e = '<a href="' + e + '">' + e + "</a>",
		e = e.replace(/">.+:/g, '">')
	}),
	s.subParser("escapeSpecialCharsWithinTagAttributes",
	function(e) {
		var r = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;
		return e = e.replace(r,
		function(e) {
			var r = e.replace(/(.)<\/?code>(?=.)/g, "$1`");
			return r = s.helper.escapeCharacters(r, "\\`*_", !1)
		})
	}),
	s.subParser("githubCodeBlocks",
	function(e, r, t) {
		return r.ghCodeBlocks ? (e = t.converter._dispatch("githubCodeBlocks.before", e, r, t), e += "~0", e = e.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g,
		function(e, n, a) {
			var o = r.omitExtraWLInCodeBlocks ? "": "\n";
			return a = s.subParser("encodeCode")(a),
			a = s.subParser("detab")(a),
			a = a.replace(/^\n+/g, ""),
			a = a.replace(/\n+$/g, ""),
			a = "<pre><code" + (n ? ' class="' + n + " language-" + n + '"': "") + ">" + a + o + "</code></pre>",
			a = s.subParser("hashBlock")(a, r, t),
			"\n\n~G" + (t.ghCodeBlocks.push({
				text: e,
				codeblock: a
			}) - 1) + "G\n\n"
		}), e = e.replace(/~0/, ""), t.converter._dispatch("githubCodeBlocks.after", e, r, t)) : e
	}),
	s.subParser("hashBlock",
	function(e, r, t) {
		return e = e.replace(/(^\n+|\n+$)/g, ""),
		"\n\n~K" + (t.gHtmlBlocks.push(e) - 1) + "K\n\n"
	}),
	s.subParser("hashElement",
	function(e, r, t) {
		return function(e, r) {
			var n = r;
			return n = n.replace(/\n\n/g, "\n"),
			n = n.replace(/^\n/, ""),
			n = n.replace(/\n+$/g, ""),
			n = "\n\n~K" + (t.gHtmlBlocks.push(n) - 1) + "K\n\n"
		}
	}),
	s.subParser("hashHTMLBlocks",
	function(e, r, t) {
		for (var n = ["pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p"], a = 0; a < n.length; ++a) e = s.helper.replaceRecursiveRegExp(e,
		function(e, r, n, s) {
			var a = e;
			return - 1 !== n.search(/\bmarkdown\b/) && (a = n + t.converter.makeHtml(r) + s),
			"\n\n~K" + (t.gHtmlBlocks.push(a) - 1) + "K\n\n"
		},
		"^(?: |\\t){0,3}<" + n[a] + "\\b[^>]*>", "</" + n[a] + ">", "gim");
		return e = e.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, s.subParser("hashElement")(e, r, t)),
		e = e.replace(/(<!--[\s\S]*?-->)/g, s.subParser("hashElement")(e, r, t)),
		e = e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, s.subParser("hashElement")(e, r, t))
	}),
	s.subParser("hashHTMLSpans",
	function(e, r, t) {
		for (var n = s.helper.matchRecursiveRegExp(e, "<code\\b[^>]*>", "</code>", "gi"), a = 0; a < n.length; ++a) e = e.replace(n[a][0], "~L" + (t.gHtmlSpans.push(n[a][0]) - 1) + "L");
		return e
	}),
	s.subParser("unhashHTMLSpans",
	function(e, r, t) {
		for (var n = 0; n < t.gHtmlSpans.length; ++n) e = e.replace("~L" + n + "L", t.gHtmlSpans[n]);
		return e
	}),
	s.subParser("hashPreCodeTags",
	function(e, r, t) {
		return e = s.helper.replaceRecursiveRegExp(e,
		function(e, r, n, a) {
			var o = n + s.subParser("encodeCode")(r) + a;
			return "\n\n~G" + (t.ghCodeBlocks.push({
				text: e,
				codeblock: o
			}) - 1) + "G\n\n"
		},
		"^(?: |\\t){0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^(?: |\\t){0,3}</code>\\s*</pre>", "gim")
	}),
	s.subParser("headers",
	function(e, r, t) {
		function n(e) {
			var r, n = e.replace(/[^\w]/g, "").toLowerCase();
			return t.hashLinkCounts[n] ? r = n + "-" + t.hashLinkCounts[n]++:(r = n, t.hashLinkCounts[n] = 1),
			!0 === a && (a = "section"),
			s.helper.isString(a) ? a + r: r
		}
		e = t.converter._dispatch("headers.before", e, r, t);
		var a = r.prefixHeaderId,
		o = isNaN(parseInt(r.headerLevelStart)) ? 1 : parseInt(r.headerLevelStart),
		i = r.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm: /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
		l = r.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm: /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
		return e = e.replace(i,
		function(e, a) {
			var i = s.subParser("spanGamut")(a, r, t),
			l = r.noHeaderId ? "": ' id="' + n(a) + '"',
			c = o,
			u = "<h" + c + l + ">" + i + "</h" + c + ">";
			return s.subParser("hashBlock")(u, r, t)
		}),
		e = e.replace(l,
		function(e, a) {
			var i = s.subParser("spanGamut")(a, r, t),
			l = r.noHeaderId ? "": ' id="' + n(a) + '"',
			c = o + 1,
			u = "<h" + c + l + ">" + i + "</h" + c + ">";
			return s.subParser("hashBlock")(u, r, t)
		}),
		e = e.replace(/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm,
		function(e, a, i) {
			var l = s.subParser("spanGamut")(i, r, t),
			c = r.noHeaderId ? "": ' id="' + n(i) + '"',
			u = o - 1 + a.length,
			p = "<h" + u + c + ">" + l + "</h" + u + ">";
			return s.subParser("hashBlock")(p, r, t)
		}),
		e = t.converter._dispatch("headers.after", e, r, t)
	}),
	s.subParser("images",
	function(e, r, t) {
		function n(e, r, n, a, o, i, l, c) {
			var u = t.gUrls,
			p = t.gTitles,
			h = t.gDimensions;
			if (n = n.toLowerCase(), c || (c = ""), "" === a || null === a) {
				if ("" !== n && null !== n || (n = r.toLowerCase().replace(/ ?\n/g, " ")), a = "#" + n, s.helper.isUndefined(u[n])) return e;
				a = u[n],
				s.helper.isUndefined(p[n]) || (c = p[n]),
				s.helper.isUndefined(h[n]) || (o = h[n].width, i = h[n].height)
			}
			r = r.replace(/"/g, "&quot;"),
			r = s.helper.escapeCharacters(r, "*_", !1);
			var d = '<img src="' + (a = s.helper.escapeCharacters(a, "*_", !1)) + '" alt="' + r + '"';
			return c && (c = c.replace(/"/g, "&quot;"), d += ' title="' + (c = s.helper.escapeCharacters(c, "*_", !1)) + '"'),
			o && i && (d += ' width="' + (o = "*" === o ? "auto": o) + '"', d += ' height="' + (i = "*" === i ? "auto": i) + '"'),
			d += " />"
		}
		var a = /!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g,
		o = /!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g;
		return e = (e = t.converter._dispatch("images.before", e, r, t)).replace(o, n),
		e = e.replace(a, n),
		e = t.converter._dispatch("images.after", e, r, t)
	}),
	s.subParser("italicsAndBold",
	function(e, r, t) {
		return e = t.converter._dispatch("italicsAndBold.before", e, r, t),
		e = r.literalMidWordUnderscores ? (e = (e = (e = e.replace(/(^|\s|>|\b)__(?=\S)([\s\S]+?)__(?=\b|<|\s|$)/gm, "$1<strong>$2</strong>")).replace(/(^|\s|>|\b)_(?=\S)([\s\S]+?)_(?=\b|<|\s|$)/gm, "$1<em>$2</em>")).replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g, "<strong>$2</strong>")).replace(/(\*)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>") : (e = e.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>")).replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>"),
		e = t.converter._dispatch("italicsAndBold.after", e, r, t)
	}),
	s.subParser("lists",
	function(e, r, t) {
		function n(e, n) {
			t.gListLevel++,
			e = e.replace(/\n{2,}$/, "\n"),
			e += "~0";
			var a = /(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,
			o = /\n[ \t]*\n(?!~0)/.test(e);
			return e = e.replace(a,
			function(e, n, a, i, l, c, u) {
				u = u && "" !== u.trim();
				var p = s.subParser("outdent")(l, r, t),
				h = "";
				return c && r.tasklists && (h = ' class="task-list-item" style="list-style-type: none;"', p = p.replace(/^[ \t]*\[(x|X| )?]/m,
				function() {
					var e = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
					return u && (e += " checked"),
					e += ">"
				})),
				n || p.search(/\n{2,}/) > -1 ? (p = s.subParser("githubCodeBlocks")(p, r, t), p = s.subParser("blockGamut")(p, r, t)) : (p = (p = s.subParser("lists")(p, r, t)).replace(/\n$/, ""), p = o ? s.subParser("paragraphs")(p, r, t) : s.subParser("spanGamut")(p, r, t)),
				p = "\n<li" + h + ">" + p + "</li>\n"
			}),
			e = e.replace(/~0/g, ""),
			t.gListLevel--,
			n && (e = e.replace(/\s+$/, "")),
			e
		}
		function a(e, r, t) {
			var s = "ul" === r ? /^ {0,2}\d+\.[ \t]/gm: /^ {0,2}[*+-][ \t]/gm,
			a = [],
			o = "";
			if ( - 1 !== e.search(s)) { !
				function e(a) {
					var i = a.search(s); - 1 !== i ? (o += "\n\n<" + r + ">" + n(a.slice(0, i), !!t) + "</" + r + ">\n\n", s = "ul" === (r = "ul" === r ? "ol": "ul") ? /^ {0,2}\d+\.[ \t]/gm: /^ {0,2}[*+-][ \t]/gm, e(a.slice(i))) : o += "\n\n<" + r + ">" + n(a, !!t) + "</" + r + ">\n\n"
				} (e);
				for (var i = 0; i < a.length; ++i);
			} else o = "\n\n<" + r + ">" + n(e, !!t) + "</" + r + ">\n\n";
			return o
		}
		e = t.converter._dispatch("lists.before", e, r, t),
		e += "~0";
		var o = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
		return t.gListLevel ? e = e.replace(o,
		function(e, r, t) {
			return a(r, t.search(/[*+-]/g) > -1 ? "ul": "ol", !0)
		}) : (o = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, e = e.replace(o,
		function(e, r, t, n) {
			return a(t, n.search(/[*+-]/g) > -1 ? "ul": "ol")
		})),
		e = e.replace(/~0/, ""),
		e = t.converter._dispatch("lists.after", e, r, t)
	}),
	s.subParser("outdent",
	function(e) {
		return e = e.replace(/^(\t|[ ]{1,4})/gm, "~0"),
		e = e.replace(/~0/g, "")
	}),
	s.subParser("paragraphs",
	function(e, r, t) {
		for (var n = (e = (e = (e = t.converter._dispatch("paragraphs.before", e, r, t)).replace(/^\n+/g, "")).replace(/\n+$/g, "")).split(/\n{2,}/g), a = [], o = n.length, i = 0; i < o; i++) {
			var l = n[i];
			l.search(/~(K|G)(\d+)\1/g) >= 0 ? a.push(l) : (l = (l = s.subParser("spanGamut")(l, r, t)).replace(/^([ \t]*)/g, "<p>"), l += "</p>", a.push(l))
		}
		for (o = a.length, i = 0; i < o; i++) {
			for (var c = "",
			u = a[i], p = !1; u.search(/~(K|G)(\d+)\1/) >= 0;) {
				var h = RegExp.$1,
				d = RegExp.$2;
				c = (c = "K" === h ? t.gHtmlBlocks[d] : p ? s.subParser("encodeCode")(t.ghCodeBlocks[d].text) : t.ghCodeBlocks[d].codeblock).replace(/\$/g, "$$$$"),
				u = u.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/, c),
				/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(u) && (p = !0)
			}
			a[i] = u
		}
		return e = a.join("\n\n"),
		e = e.replace(/^\n+/g, ""),
		e = e.replace(/\n+$/g, ""),
		t.converter._dispatch("paragraphs.after", e, r, t)
	}),
	s.subParser("runExtension",
	function(e, r, t, n) {
		if (e.filter) r = e.filter(r, n.converter, t);
		else if (e.regex) {
			var s = e.regex; ! s instanceof RegExp && (s = new RegExp(s, "g")),
			r = r.replace(s, e.replace)
		}
		return r
	}),
	s.subParser("spanGamut",
	function(e, r, t) {
		return e = t.converter._dispatch("spanGamut.before", e, r, t),
		e = s.subParser("codeSpans")(e, r, t),
		e = s.subParser("escapeSpecialCharsWithinTagAttributes")(e, r, t),
		e = s.subParser("encodeBackslashEscapes")(e, r, t),
		e = s.subParser("images")(e, r, t),
		e = s.subParser("anchors")(e, r, t),
		e = s.subParser("autoLinks")(e, r, t),
		e = s.subParser("encodeAmpsAndAngles")(e, r, t),
		e = s.subParser("italicsAndBold")(e, r, t),
		e = s.subParser("strikethrough")(e, r, t),
		e = e.replace(/  +\n/g, " <br />\n"),
		e = t.converter._dispatch("spanGamut.after", e, r, t)
	}),
	s.subParser("strikethrough",
	function(e, r, t) {
		return r.strikethrough && (e = (e = t.converter._dispatch("strikethrough.before", e, r, t)).replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g, "<del>$1</del>"), e = t.converter._dispatch("strikethrough.after", e, r, t)),
		e
	}),
	s.subParser("stripBlankLines",
	function(e) {
		return e.replace(/^[ \t]+$/gm, "")
	}),
	s.subParser("stripLinkDefinitions",
	function(e, r, t) {
		var n = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm;
		return e += "~0",
		e = e.replace(n,
		function(e, n, a, o, i, l, c) {
			return n = n.toLowerCase(),
			t.gUrls[n] = s.subParser("encodeAmpsAndAngles")(a),
			l ? l + c: (c && (t.gTitles[n] = c.replace(/"|'/g, "&quot;")), r.parseImgDimensions && o && i && (t.gDimensions[n] = {
				width: o,
				height: i
			}), "")
		}),
		e = e.replace(/~0/, "")
	}),
	s.subParser("tables",
	function(e, r, t) {
		function n(e) {
			return /^:[ \t]*--*$/.test(e) ? ' style="text-align:left;"': /^--*[ \t]*:[ \t]*$/.test(e) ? ' style="text-align:right;"': /^:[ \t]*--*[ \t]*:$/.test(e) ? ' style="text-align:center;"': ""
		}
		function a(e, n) {
			var a = "";
			return e = e.trim(),
			r.tableHeaderId && (a = ' id="' + e.replace(/ /g, "_").toLowerCase() + '"'),
			e = s.subParser("spanGamut")(e, r, t),
			"<th" + a + n + ">" + e + "</th>\n"
		}
		function o(e, n) {
			return "<td" + n + ">" + s.subParser("spanGamut")(e, r, t) + "</td>\n"
		}
		function i(e, r) {
			for (var t = "<table>\n<thead>\n<tr>\n",
			n = e.length,
			s = 0; s < n; ++s) t += e[s];
			for (t += "</tr>\n</thead>\n<tbody>\n", s = 0; s < r.length; ++s) {
				t += "<tr>\n";
				for (var a = 0; a < n; ++a) t += r[s][a];
				t += "</tr>\n"
			}
			return t += "</tbody>\n</table>\n"
		}
		if (!r.tables) return e;
		var l = /^[ \t]{0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[\s\S]+?(?:\n\n|~0)/gm;
		return e = t.converter._dispatch("tables.before", e, r, t),
		e = e.replace(l,
		function(e) {
			var r, t = e.split("\n");
			for (r = 0; r < t.length; ++r) / ^[\t] {
				0,
				3
			}\ | /.test(t[r])&&(t[r]=t[r].replace(/ ^ [\t] {
				0,
				3
			}\ | /,"")),/\ | [\t] * $ / .test(t[r]) && (t[r] = t[r].replace(/\|[ \t]*$/, ""));
			var l = t[0].split("|").map(function(e) {
				return e.trim()
			}),
			c = t[1].split("|").map(function(e) {
				return e.trim()
			}),
			u = [],
			p = [],
			h = [],
			d = [];
			for (t.shift(), t.shift(), r = 0; r < t.length; ++r)"" !== t[r].trim() && u.push(t[r].split("|").map(function(e) {
				return e.trim()
			}));
			if (l.length < c.length) return e;
			for (r = 0; r < c.length; ++r) h.push(n(c[r]));
			for (r = 0; r < l.length; ++r) s.helper.isUndefined(h[r]) && (h[r] = ""),
			p.push(a(l[r], h[r]));
			for (r = 0; r < u.length; ++r) {
				for (var f = [], g = 0; g < p.length; ++g) s.helper.isUndefined(u[r][g]),
				f.push(o(u[r][g], h[g]));
				d.push(f)
			}
			return i(p, d)
		}),
		e = t.converter._dispatch("tables.after", e, r, t)
	}),
	s.subParser("unescapeSpecialChars",
	function(e) {
		return e = e.replace(/~E(\d+)E/g,
		function(e, r) {
			var t = parseInt(r);
			return String.fromCharCode(t)
		})
	}),
	module.exports = s;
});define("wxParse/wxDiscode.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function e(e) {
		return e = e.replace(/&forall;/g, "∀"),
		e = e.replace(/&part;/g, "∂"),
		e = e.replace(/&exists;/g, "∃"),
		e = e.replace(/&empty;/g, "∅"),
		e = e.replace(/&nabla;/g, "∇"),
		e = e.replace(/&isin;/g, "∈"),
		e = e.replace(/&notin;/g, "∉"),
		e = e.replace(/&ni;/g, "∋"),
		e = e.replace(/&prod;/g, "∏"),
		e = e.replace(/&sum;/g, "∑"),
		e = e.replace(/&minus;/g, "−"),
		e = e.replace(/&lowast;/g, "∗"),
		e = e.replace(/&radic;/g, "√"),
		e = e.replace(/&prop;/g, "∝"),
		e = e.replace(/&infin;/g, "∞"),
		e = e.replace(/&ang;/g, "∠"),
		e = e.replace(/&and;/g, "∧"),
		e = e.replace(/&or;/g, "∨"),
		e = e.replace(/&cap;/g, "∩"),
		e = e.replace(/&cap;/g, "∪"),
		e = e.replace(/&int;/g, "∫"),
		e = e.replace(/&there4;/g, "∴"),
		e = e.replace(/&sim;/g, "∼"),
		e = e.replace(/&cong;/g, "≅"),
		e = e.replace(/&asymp;/g, "≈"),
		e = e.replace(/&ne;/g, "≠"),
		e = e.replace(/&le;/g, "≤"),
		e = e.replace(/&ge;/g, "≥"),
		e = e.replace(/&sub;/g, "⊂"),
		e = e.replace(/&sup;/g, "⊃"),
		e = e.replace(/&nsub;/g, "⊄"),
		e = e.replace(/&sube;/g, "⊆"),
		e = e.replace(/&supe;/g, "⊇"),
		e = e.replace(/&oplus;/g, "⊕"),
		e = e.replace(/&otimes;/g, "⊗"),
		e = e.replace(/&perp;/g, "⊥"),
		e = e.replace(/&sdot;/g, "⋅")
	}
	function a(e) {
		return e = e.replace(/&Alpha;/g, "Α"),
		e = e.replace(/&Beta;/g, "Β"),
		e = e.replace(/&Gamma;/g, "Γ"),
		e = e.replace(/&Delta;/g, "Δ"),
		e = e.replace(/&Epsilon;/g, "Ε"),
		e = e.replace(/&Zeta;/g, "Ζ"),
		e = e.replace(/&Eta;/g, "Η"),
		e = e.replace(/&Theta;/g, "Θ"),
		e = e.replace(/&Iota;/g, "Ι"),
		e = e.replace(/&Kappa;/g, "Κ"),
		e = e.replace(/&Lambda;/g, "Λ"),
		e = e.replace(/&Mu;/g, "Μ"),
		e = e.replace(/&Nu;/g, "Ν"),
		e = e.replace(/&Xi;/g, "Ν"),
		e = e.replace(/&Omicron;/g, "Ο"),
		e = e.replace(/&Pi;/g, "Π"),
		e = e.replace(/&Rho;/g, "Ρ"),
		e = e.replace(/&Sigma;/g, "Σ"),
		e = e.replace(/&Tau;/g, "Τ"),
		e = e.replace(/&Upsilon;/g, "Υ"),
		e = e.replace(/&Phi;/g, "Φ"),
		e = e.replace(/&Chi;/g, "Χ"),
		e = e.replace(/&Psi;/g, "Ψ"),
		e = e.replace(/&Omega;/g, "Ω"),
		e = e.replace(/&alpha;/g, "α"),
		e = e.replace(/&beta;/g, "β"),
		e = e.replace(/&gamma;/g, "γ"),
		e = e.replace(/&delta;/g, "δ"),
		e = e.replace(/&epsilon;/g, "ε"),
		e = e.replace(/&zeta;/g, "ζ"),
		e = e.replace(/&eta;/g, "η"),
		e = e.replace(/&theta;/g, "θ"),
		e = e.replace(/&iota;/g, "ι"),
		e = e.replace(/&kappa;/g, "κ"),
		e = e.replace(/&lambda;/g, "λ"),
		e = e.replace(/&mu;/g, "μ"),
		e = e.replace(/&nu;/g, "ν"),
		e = e.replace(/&xi;/g, "ξ"),
		e = e.replace(/&omicron;/g, "ο"),
		e = e.replace(/&pi;/g, "π"),
		e = e.replace(/&rho;/g, "ρ"),
		e = e.replace(/&sigmaf;/g, "ς"),
		e = e.replace(/&sigma;/g, "σ"),
		e = e.replace(/&tau;/g, "τ"),
		e = e.replace(/&upsilon;/g, "υ"),
		e = e.replace(/&phi;/g, "φ"),
		e = e.replace(/&chi;/g, "χ"),
		e = e.replace(/&psi;/g, "ψ"),
		e = e.replace(/&omega;/g, "ω"),
		e = e.replace(/&thetasym;/g, "ϑ"),
		e = e.replace(/&upsih;/g, "ϒ"),
		e = e.replace(/&piv;/g, "ϖ"),
		e = e.replace(/&middot;/g, "·")
	}
	function r(e) {
		return e = e.replace(/&nbsp;/g, " "),
		e = e.replace(/&quot;/g, "'"),
		e = e.replace(/&amp;/g, "&"),
		e = e.replace(/&lt;/g, "<"),
		e = e.replace(/&gt;/g, ">"),
		e = e.replace(/&#8226;/g, "•")
	}
	function l(e) {
		return e = e.replace(/&OElig;/g, "Œ"),
		e = e.replace(/&oelig;/g, "œ"),
		e = e.replace(/&Scaron;/g, "Š"),
		e = e.replace(/&scaron;/g, "š"),
		e = e.replace(/&Yuml;/g, "Ÿ"),
		e = e.replace(/&fnof;/g, "ƒ"),
		e = e.replace(/&circ;/g, "ˆ"),
		e = e.replace(/&tilde;/g, "˜"),
		e = e.replace(/&ensp;/g, ""),
		e = e.replace(/&emsp;/g, ""),
		e = e.replace(/&thinsp;/g, ""),
		e = e.replace(/&zwnj;/g, ""),
		e = e.replace(/&zwj;/g, ""),
		e = e.replace(/&lrm;/g, ""),
		e = e.replace(/&rlm;/g, ""),
		e = e.replace(/&ndash;/g, "–"),
		e = e.replace(/&mdash;/g, "—"),
		e = e.replace(/&lsquo;/g, "‘"),
		e = e.replace(/&rsquo;/g, "’"),
		e = e.replace(/&sbquo;/g, "‚"),
		e = e.replace(/&ldquo;/g, "“"),
		e = e.replace(/&rdquo;/g, "”"),
		e = e.replace(/&bdquo;/g, "„"),
		e = e.replace(/&dagger;/g, "†"),
		e = e.replace(/&Dagger;/g, "‡"),
		e = e.replace(/&bull;/g, "•"),
		e = e.replace(/&hellip;/g, "…"),
		e = e.replace(/&permil;/g, "‰"),
		e = e.replace(/&prime;/g, "′"),
		e = e.replace(/&Prime;/g, "″"),
		e = e.replace(/&lsaquo;/g, "‹"),
		e = e.replace(/&rsaquo;/g, "›"),
		e = e.replace(/&oline;/g, "‾"),
		e = e.replace(/&euro;/g, "€"),
		e = e.replace(/&trade;/g, "™"),
		e = e.replace(/&larr;/g, "←"),
		e = e.replace(/&uarr;/g, "↑"),
		e = e.replace(/&rarr;/g, "→"),
		e = e.replace(/&darr;/g, "↓"),
		e = e.replace(/&harr;/g, "↔"),
		e = e.replace(/&crarr;/g, "↵"),
		e = e.replace(/&lceil;/g, "⌈"),
		e = e.replace(/&rceil;/g, "⌉"),
		e = e.replace(/&lfloor;/g, "⌊"),
		e = e.replace(/&rfloor;/g, "⌋"),
		e = e.replace(/&loz;/g, "◊"),
		e = e.replace(/&spades;/g, "♠"),
		e = e.replace(/&clubs;/g, "♣"),
		e = e.replace(/&hearts;/g, "♥"),
		e = e.replace(/&diams;/g, "♦"),
		e = e.replace(/&#39;/g, "'")
	}
	function p(e) {
		return e = e.replace(/\r\n/g, ""),
		e = e.replace(/\n/g, ""),
		e = e.replace(/code/g, "wxxxcode-style")
	}
	module.exports = {
		strDiscode: function(c) {
			return c = e(c),
			c = a(c),
			c = r(c),
			c = l(c),
			c = p(c)
		},
		urlToHttpUrl: function(e, a) {
			return new RegExp("^//").test(e) && (e = a + ":" + e),
			e
		}
	};
});define("wxParse/wxParse.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function e(e) {
		return e && e.__esModule ? e: {
		default:
			e
		}
	}
	function t(e, t, a) {
		return t in e ? Object.defineProperty(e, t, {
			value: a,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = a,
		e
	}
	function a(e) {
		var t = this,
		a = e.target.dataset.src,
		i = e.target.dataset.from;
		void 0 !== i && i.length > 0 && wx.previewImage({
			current: a,
			urls: t.data[i].imageUrls
		})
	}
	function i(e) {
		var t = this,
		a = e.target.dataset.from,
		i = e.target.dataset.idx;
		void 0 !== a && a.length > 0 && r(e, i, t, a)
	}
	function r(e, a, i, r) {
		var o, d = i.data[r];
		if (d && 0 != d.images.length) {
			var s = d.images,
			l = n(e.detail.width, e.detail.height, i, r),
			g = s[a].index,
			h = "" + r,
			m = !0,
			u = !1,
			v = void 0;
			try {
				for (var f, w = g.split(".")[Symbol.iterator](); ! (m = (f = w.next()).done); m = !0) h += ".nodes[" + f.value + "]"
			} catch(e) {
				u = !0,
				v = e
			} finally {
				try { ! m && w.
					return && w.
					return ()
				} finally {
					if (u) throw v
				}
			}
			var c = h + ".width",
			x = h + ".height";
			i.setData((o = {},
			t(o, c, l.imageWidth), t(o, x, l.imageheight), o))
		}
	}
	function n(e, t, a, i) {
		var r = 0,
		n = 0,
		o = 0,
		d = {},
		g = a.data[i].view.imagePadding;
		return r = s - 2 * g,
		l,
		e > r ? (o = (n = r) * t / e, d.imageWidth = n, d.imageheight = o) : (d.imageWidth = e, d.imageheight = t),
		d
	}
	var o = e(require("./showdown.js")),
	d = e(require("./html2json.js")),
	s = 0,
	l = 0;
	wx.getSystemInfo({
		success: function(e) {
			s = e.windowWidth,
			l = e.windowHeight
		}
	}),
	module.exports = {
		wxParse: function() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wxParseData",
			t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html",
			r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>',
			n = arguments[3],
			s = arguments[4],
			l = n,
			g = {};
			if ("html" == t) g = d.
		default.html2json(r, e),
			console.log(JSON.stringify(g, " ", " "));
			else if ("md" == t || "markdown" == t) {
				var h = (new o.
			default.Converter).makeHtml(r);
				g = d.
			default.html2json(h, e),
				console.log(JSON.stringify(g, " ", " "))
			}
			g.view = {},
			g.view.imagePadding = 0,
			void 0 !== s && (g.view.imagePadding = s);
			var m = {};
			m[e] = g,
			l.setData(m),
			l.wxParseImgLoad = i,
			l.wxParseImgTap = a
		},
		wxParseTemArray: function(e, t, a, i) {
			for (var r = [], n = i.data, o = null, d = 0; d < a; d++) {
				var s = n[t + d].nodes;
				r.push(s)
			}
			e = e || "wxParseTemArray",
			(o = JSON.parse('{"' + e + '":""}'))[e] = r,
			i.setData(o)
		},
		emojisInit: function() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
			t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/",
			a = arguments[2];
			d.
		default.emojisInit(e, t, a)
		}
	};
});define("app.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var n = require("utils/http.js");
	App({
		onLaunch: function() {
			wx.getStorage({
				key: "token_1",
				success: function(n) {},
				fail: function() { (0, n.login)()
				}
			})
		},
		globalData: {
			userInfo: null,
			token: null
		}
	});
});require("app.js");__wxRoute = 'pages/cardpack/cardpack';__wxRouteBegin = true;define("pages/cardpack/cardpack.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js"),
	a = require("../../components/wux"),
	n = require("../../img/base64"),
	e = require("../../utils/util");
	Page({
		data: {
			datas: [],
			activeIndex: "all"
		},
		initData: function() {
			var a = this; (0, t.get)("/userBankCard/listCard/" + this.data.activeIndex + "/1").then(function(t) {
				wx.stopPullDownRefresh(),
				a.setData({
					datas: t.result.records
				}),
				e.hideLoading()
			}).
			catch(function(t) {})
		},
		getTags: function() {
			var a = this; (0, t.get)("/userBankCardPacket/listPacket").then(function(t) {
				var n = {
					id: "all",
					name: "全部"
				};
				t.result.unshift(n),
				a.setData({
					tags: t.result
				})
			}).
			catch(function(t) {})
		},
		goCardInfo: function(t) {
			console.log(t);
			var a = t.currentTarget.dataset.obj;
			a.cid && wx.navigateTo({
				url: "/pages/cardinfo/cardinfo?id=" + a.cid + "&bid=" + a.bid
			})
		},
		tagClick: function(t) {
			console.log(t.currentTarget.id),
			this.setData({
				activeIndex: t.currentTarget.id
			}),
			this.initData()
		},
		longTap: function(t) {
			console.log(t),
			wx.navigateTo({
				url: "/pages/managetags/managetags"
			})
		},
		add: function() {
			var t = this;
			wx.showActionSheet({
				itemList: ["添加卡片", "添加卡包"],
				success: function(a) {
					console.log(a.tapIndex),
					0 == a.tapIndex && wx.navigateTo({
						url: "/pages/addcard/addcard"
					}),
					1 == a.tapIndex && t.addTag()
				}
			})
		},
		addTag: function() {
			var n = this;
			this.data;
			a.$wuxDialog.prompt({
				title: "输入卡包名称",
				content: " ",
				fieldtype: "text",
				maxlength: 6,
				onConfirm: function(a) {
					var e = n.data.$wux.dialog.prompt.response; (0, t.post)("/userBankCardPacket/packet", {
						name: e
					}).then(function(t) {
						200 == t.code && (n.getTags(), wx.showToast({
							title: t.msg,
							icon: "success"
						}))
					}),
					console.log(e)
				}
			})
		},
		onLoad: function(t) {
			e.showLoading(),
			this.setData({
				bell: n.bell
			})
		},
		onReady: function() {},
		onShow: function() {
			this.initData(),
			this.getTags()
		},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {
			console.log("refresh"),
			this.initData()
		},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/cardpack/cardpack.js");__wxRoute = 'pages/annulfeeinfo/annulfeeinfo';__wxRouteBegin = true;define("pages/annulfeeinfo/annulfeeinfo.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var e = require("../../utils/http.js"),
	t = require("../../components/wux");
	Page({
		data: {
			feeType: [{
				name: "强制收取",
				value: 1
			},
			{
				name: "刷次数",
				value: 2
			},
			{
				name: "刷金额",
				value: 3
			},
			{
				name: "积分换",
				value: 4
			},
			{
				name: "有效期内免",
				value: 5
			},
			{
				name: "终身免年费",
				value: 6
			},
			{
				name: "其他",
				value: 7
			}],
			index: 0,
			cantClick: !0,
			dateDisable: !1,
			date: "",
			currentType: ""
		},
		initData: function() {
			var t = this; (0, e.get)("/userBankCard/getAnnualFee/" + this.data.id).then(function(e) {
				if (200 == e.code) {
					for (var a = e.result,
					n = t.data.feeType,
					i = 0; i < n.length; i++) n[i].value == a.nextAnnualFeeType && t.setData({
						index: i
					});
					t.setStates(a.nextAnnualFeeType),
					t.setData({
						datas: e.result,
						currentType: a.nextAnnualFeeType,
						newDate: null == a.annualFeeDate ? "": t.formatTime(a.annualFeeDate),
						date: null == a.annualFeeDate ? "": t.formatTime1(a.annualFeeDate),
						nextAnnualFeeCondition: a.nextAnnualFeeCondition,
						condition: "" == a.nextAnnualFeeCondition ? "": a.nextAnnualFeeCondition + t.data.surfix
					})
				}
			}).
			catch(function(e) {})
		},
		formatTime: function(e) {
			var t = new Date(e);
			return t.getFullYear() + "年" + (t.getMonth() + 1) + "月"
		},
		formatTime1: function(e) {
			var t = new Date(e);
			return t.getFullYear() + "-" + (t.getMonth() + 1)
		},
		typeChange: function(e) {
			console.log(e);
			var t = e.detail.value,
			a = this.data.feeType[t].value;
			this.setData({
				index: t,
				currentType: a,
				date: "",
				nextAnnualFeeCondition: "",
				condition: "",
				surfix: "",
				newDate: ""
			});
			var n = this.data.feeType[t].value;
			this.setStates(n)
		},
		setStates: function(e) {
			switch (e) {
			case 1:
			case 5:
				this.setData({
					cantClick:
					!0,
					dateDisable: !1
				});
				break;
			case 6:
				this.setData({
					cantClick:
					!0,
					dateDisable: !0
				});
				break;
			case 2:
				this.setData({
					cantClick:
					!1,
					surfix: "次",
					dateDisable: !1
				});
				break;
			case 3:
				this.setData({
					cantClick:
					!1,
					surfix: "元",
					dateDisable: !1
				});
				break;
			case 4:
				this.setData({
					cantClick:
					!1,
					surfix: "分",
					dateDisable: !1
				});
				break;
			case 7:
				this.setData({
					cantClick:
					!1,
					dateDisable: !1
				})
			}
		},
		bindDateChange: function(e) {
			console.log("picker发送选择改变，携带值为", e.detail.value);
			var t = e.detail.value,
			a = t.replace(/-/, "年") + "月";
			console.log(a),
			this.setData({
				date: t,
				newDate: a
			})
		},
		now: function() {
			var e = new Date,
			t = e.getFullYear(),
			a = e.getMonth() + 1;
			this.setData({
				now: t + "-" + a
			})
		},
		showAlert: function() {
			var e = this;
			this.data.cantClick || t.$wuxDialog.prompt({
				title: "",
				content: "所需条件",
				fieldtype: "number",
				maxlength: 36,
				surfix: e.data.surfix,
				onConfirm: function(t) {
					var a = e.data.$wux.dialog.prompt.response;
					e.setData({
						condition: "" == a ? "": a + e.data.surfix,
						nextAnnualFeeCondition: a
					}),
					console.log(a)
				}
			})
		},
		save: function() { (0, e.put)("/userBankCard/putAnnualFee", {
				id: this.data.id,
				nextAnnualFeeType: this.data.currentType,
				nextAnnualFeeCondition: this.data.nextAnnualFeeCondition,
				annualFeeDateString: this.data.newDate
			}).then(function(e) {
				200 == e.code ? (wx.showToast({
					title: e.msg
				}), setTimeout(function() {
					wx.navigateBack()
				},
				600)) : wx.showModal({
					title: "提示",
					content: e.msg,
					showCancel: !1,
					success: function(e) {}
				})
			}).
			catch(function(e) {})
		},
		onLoad: function(e) {
			this.setData({
				id: e.id
			}),
			this.initData(),
			this.now()
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/annulfeeinfo/annulfeeinfo.js");__wxRoute = 'pages/qrcode/qrcode';__wxRouteBegin = true;define("pages/qrcode/qrcode.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var o = require("../../components/wux");
	Page({
		data: {},
		previewImage: function() {
			wx.canvasToTempFilePath({
				canvasId: "qrcode",
				success: function(o) {
					wx.previewImage({
						urls: [o.tempFilePath]
					})
				}
			})
		},
		saveQr: function() {
			wx.canvasToTempFilePath({
				canvasId: "qrcode",
				success: function(o) {
					wx.saveImageToPhotosAlbum ? wx.saveImageToPhotosAlbum({
						filePath: o.tempFilePath,
						success: function(o) {
							console.log(o),
							wx.showToast({
								title: "保存成功"
							})
						}
					}) : wx.showModal({
						title: "提示",
						content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
					})
				}
			})
		},
		copyUrl: function() {
			var o = this;
			wx.setClipboardData ? wx.setClipboardData({
				data: o.data.url,
				success: function(o) {
					wx.showToast({
						title: "复制成功"
					})
				}
			}) : wx.showModal({
				title: "提示",
				content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
			})
		},
		randomColor: function() {
			var o = Math.floor(16777215 * Math.random()).toString(16).toUpperCase();
			o.length;
			return "#" + "000000".substring(0, 6 - o.length) + o
		},
		renderQrcode: function(t, e, n) {
			var a = "极速申请“" + n + "”";
			o.$wuxQrcode.init(t, e, {
				fgColor: "#02c863",
				width: 230,
				height: 230,
				text: a
			})
		},
		onLoad: function(o) {
			var t = "",
			e = this;
			wx.getStorage({
				key: "nickName",
				success: function(o) {
					t = "?u=" + encodeURI(o.data),
					console.log(t)
				},
				complete: function() {
					e.setData({
						url: o.url + t
					}),
					e.renderQrcode("qrcode", o.url + t, o.bankName)
				}
			})
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/qrcode/qrcode.js");__wxRoute = 'pages/annulfee/annulfee';__wxRouteBegin = true;define("pages/annulfee/annulfee.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function t(t, n, e) {
		return n in t ? Object.defineProperty(t, n, {
			value: e,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : t[n] = e,
		t
	}
	var n, e = require("../../utils/http.js");
	Page((n = {
		data: {
			activeIndex: "all",
			datas: []
		},
		tagClick: function(t) {
			console.log(t.currentTarget.id),
			this.setData({
				activeIndex: t.currentTarget.id
			})
		},
		initData: function() {
			var t = this; (0, e.get)("/userBankCard/listAnnualFee/" + this.data.activeIndex + "/1").then(function(n) {
				200 == n.code && t.setData({
					datas: n.result.records
				})
			}).
			catch(function(t) {})
		},
		getTags: function() {
			var t = this; (0, e.get)("/userBankCardPacket/listPacket").then(function(n) {
				var e = {
					id: "all",
					name: "全部"
				};
				n.result.unshift(e),
				t.setData({
					tags: n.result
				})
			}).
			catch(function(t) {})
		}
	},
	t(n, "tagClick",
	function(t) {
		console.log(t.currentTarget.id),
		this.setData({
			activeIndex: t.currentTarget.id
		}),
		this.initData()
	}), t(n, "onLoad",
	function(t) {
		this.getTags()
	}), t(n, "onReady",
	function() {}), t(n, "onShow",
	function() {
		this.initData()
	}), t(n, "onHide",
	function() {}), t(n, "onUnload",
	function() {}), t(n, "onPullDownRefresh",
	function() {}), t(n, "onReachBottom",
	function() {}), t(n, "onShareAppMessage",
	function() {}), n));
});require("pages/annulfee/annulfee.js");__wxRoute = 'pages/edittag/edittag';__wxRouteBegin = true;define("pages/edittag/edittag.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js");
	Page({
		data: {
			show: !0,
			loading: !1
		},
		formSubmit: function(n) {
			console.log("form发生了submit事件，携带数据为：", n.detail.value);
			var a = n.detail.value;
			a.states ? a.states = 2 : a.states = 1,
			(0, t.post)("/userBankCardPacket/saveCardPacket", a).then(function(t) {
				200 == t.code && (wx.showToast({
					title: t.msg,
					icon: "success"
				}), setTimeout(function() {
					wx.navigateBack()
				},
				600))
			}).
			catch(function(t) {})
		},
		del: function() {
			var n = this;
			this.setData({
				loading: !0
			}),
			(0, t.del)("/userBankCardPacket/packet/" + this.data.id).then(function(t) {
				200 == t.code && (n.setData({
					loading: !1
				}), wx.showToast({
					title: t.msg,
					icon: "success"
				}), setTimeout(function() {
					wx.navigateBack()
				},
				600))
			}).
			catch(function(t) {})
		},
		onLoad: function(t) {
			console.log(t),
			void 0 == t.name ? this.setData({
				show: !1
			}) : this.setData({
				name: t.name,
				id: t.id,
				states: t.states
			})
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/edittag/edittag.js");__wxRoute = 'pages/managetags/managetags';__wxRouteBegin = true;define("pages/managetags/managetags.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var n = require("../../utils/http.js");
	Page({
		data: {},
		getTags: function() {
			var t = this; (0, n.get)("/userBankCardPacket/listPacket").then(function(n) {
				t.setData({
					tags: n.result
				})
			}).
			catch(function(n) {})
		},
		onLoad: function(n) {},
		onReady: function() {},
		onShow: function() {
			this.getTags()
		},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/managetags/managetags.js");__wxRoute = 'pages/actinfo/actinfo';__wxRouteBegin = true;define("pages/actinfo/actinfo.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js"),
	e = require("../../img/base64"),
	i = require("../../utils/util"),
	a = require("../../wxParse/wxParse.js");
	Page({
		data: {},
		initData: function(e) {
			var n = this;
			i.showLoading(),
			(0, t.get)("/bankActivity/detailBankActivity/" + e).then(function(t) {
				if (200 == t.code) {
					var e = t.result;
					e.startTime = n.date(e.startTime),
					e.endTime = n.date(e.endTime),
					n.setData({
						datas: e,
						sub: e.sub,
						subWx: e.subWx,
						isRemind: 1 == e.remind && 1 == e.subWx
					});
					var s = t.result.content;
					a.wxParse("content", "html", s, n, 5);
					var r = t.result.regulation;
					a.wxParse("regulation", "html", r, n, 5);
					var o = t.result.howPlay;
					a.wxParse("howPlay", "html", o, n, 5),
					i.hideLoading()
				}
			}).
			catch(function(t) {})
		},
		getReletive: function(e, i) {
			var a = this; (0, t.post)("/bankActivity/listBankActivity", {
				bankId: e,
				id: i,
				current: 1
			}).then(function(t) {
				if (200 == t.code) {
					for (var e = t.result.records,
					i = 0; i < e.length; i++) e[i].startTime = a.date(e[i].startTime),
					e[i].endTime = a.date(e[i].endTime);
					a.setData({
						reletives: e
					})
				}
			}).
			catch(function(t) {})
		},
		flow: function() {
			var e = this; (0, t.get)("/bankActivity/subBankActivity/" + this.data.id).then(function(t) {
				200 == t.code && (e.setData({
					sub: t.result.sub
				}), 1 == e.data.sub && 0 != e.data.datas.reminderType && e.remindMe())
			}).
			catch(function(t) {})
		},
		remindMe: function() {
			var e = this;
			0 == this.data.subWx ? this.alert() : (0, t.get)("/bankActivity/remindBankActivity/" + this.data.id).then(function(t) {
				200 == t.code && e.setData({
					isRemind: 1 == t.result.remind
				})
			}).
			catch(function(t) {})
		},
		alert: function() {
			var t = this;
			0 == this.data.subWx && wx.showModal({
				title: "提示",
				content: "你尚未关注微信公众号「玩卡帝」，关注后才能开启活动提醒噢~",
				showCancel: !1,
				success: function(e) {
					e.confirm && (t.setData({
						isRemind: !1
					}), console.log("用户点击确定"))
				}
			})
		},
		date: function(t) {
			return i.formatTime(new Date(t))
		},
		onLoad: function(t) {
			this.setData({
				bell: e.bell,
				err: e.err,
				cam: e.cam,
				id: t.id
			}),
			this.initData(t.id),
			this.getReletive(t.bankId, t.id)
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {
			var e = {
				shareDes: this.data.datas.title,
				sharePage: getCurrentPages()[getCurrentPages().length - 1].route,
				state: 0
			};
			return {
				success: function(i) {
					e.state = 1,
					(0, t.shareLog)(e)
				},
				fail: function(i) { (0, t.shareLog)(e)
				}
			}
		}
	});
});require("pages/actinfo/actinfo.js");__wxRoute = 'pages/activity/activity';__wxRouteBegin = true;define("pages/activity/activity.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js"),
	a = require("../../img/base64"),
	e = require("../../utils/util");
	Page({
		data: {
			activeIndex: 0,
			array: ["美国", "中国", "巴西", "日本"],
			index: 0,
			myLists: [],
			allLists: [],
			page: 1,
			bankName: "选择银行",
			actType: "活动类型",
			states: "完成状态",
			bankName1: "选择银行",
			actType1: "活动类型",
			order: "排序",
			bankVal: "",
			typeVal: "",
			statesVal: "",
			bankVal1: "",
			typeVal1: "",
			orderVal: "",
			bankData: null,
			typeData: null,
			only: !1,
			statesData: [{
				name: "全部",
				value: ""
			},
			{
				name: "已完成",
				value: "1"
			},
			{
				name: "未完成",
				value: "0"
			}],
			orderData: [{
				name: "全部",
				value: ""
			},
			{
				name: "关注数",
				value: "sub_num"
			},
			{
				name: "时间",
				value: "start_time"
			}]
		},
		tabClick: function(t) {
			this.setData({
				activeIndex: t.currentTarget.id
			}),
			2 == t.currentTarget.id ? this.getAllAct() : (this.setData({
				bankName: "选择银行",
				bankVal: "",
				actType: "活动类型",
				typeVal: "",
				states: "完成状态",
				statesVal: "",
				myLists: []
			}), this.initData())
		},
		gofind: function() {
			this.setData({
				activeIndex: 2
			}),
			this.getAllAct()
		},
		initData: function() {
			var a = this,
			i = "";
			0 == this.data.activeIndex && (i = "Today"),
			(0, t.post)("/bankActivity/listMyBankActivity" + i, {
				bankId: this.data.bankVal,
				prizeType: this.data.typeVal,
				states: this.data.statesVal
			}).then(function(t) {
				200 == t.code && (a.setData({
					myLists: t.result
				}), e.hideLoading())
			}).
			catch(function(t) {})
		},
		getAllAct: function(a) {
			var i = this,
			n = a || 1; (0, t.post)("/bankActivity/listBankActivity", {
				bankId: this.data.bankVal1,
				prizeType: this.data.typeVal1,
				orderBy: this.data.orderVal,
				current: n,
				only: this.data.only
			}).then(function(t) {
				if (200 == t.code) {
					for (var a = t.result.records,
					n = 0; n < a.length; n++) a[n].startTime = i.date(a[n].startTime),
					a[n].endTime = i.date(a[n].endTime);
					i.setData({
						allLists: a
					}),
					e.hideLoading()
				}
			}).
			catch(function(t) {})
		},
		getFilters: function() {
			var a = this; (0, t.get)("/dictType/getDictByType/bank,activityType").then(function(t) {
				if (200 == t.code) {
					var e = {
						name: "全部",
						value: ""
					};
					t.result.bank.unshift(e),
					t.result.activityType.unshift(e),
					a.setData({
						bankData: t.result.bank,
						typeData: t.result.activityType
					})
				}
			}).
			catch(function(t) {})
		},
		switchBank: function(t) {
			console.log(t),
			this.setData({
				bankName: "全部" == this.data.bankData[t.detail.value].name ? "选择银行": this.data.bankData[t.detail.value].name,
				bankVal: this.data.bankData[t.detail.value].value,
				myLists: []
			}),
			e.showLoading(),
			this.initData()
		},
		switchType: function(t) {
			this.setData({
				actType: "全部" == this.data.typeData[t.detail.value].name ? "活动类型": this.data.typeData[t.detail.value].name,
				typeVal: this.data.typeData[t.detail.value].value,
				myLists: []
			}),
			e.showLoading(),
			this.initData()
		},
		switchStates: function(t) {
			this.setData({
				states: "全部" == this.data.statesData[t.detail.value].name ? "完成状态": this.data.statesData[t.detail.value].name,
				statesVal: this.data.statesData[t.detail.value].value,
				myLists: []
			}),
			e.showLoading(),
			this.initData()
		},
		switchBank1: function(t) {
			this.setData({
				bankName1: "全部" == this.data.bankData[t.detail.value].name ? "选择银行": this.data.bankData[t.detail.value].name,
				bankVal1: this.data.bankData[t.detail.value].value,
				allLists: []
			}),
			e.showLoading(),
			this.getAllAct()
		},
		switchType1: function(t) {
			this.setData({
				actType1: "全部" == this.data.typeData[t.detail.value].name ? "活动类型": this.data.typeData[t.detail.value].name,
				typeVal1: this.data.typeData[t.detail.value].value,
				allLists: []
			}),
			e.showLoading(),
			this.getAllAct()
		},
		switchOrder: function(t) {
			this.setData({
				order: "全部" == this.data.orderData[t.detail.value].name ? "完成状态": this.data.orderData[t.detail.value].name,
				orderVal: this.data.orderData[t.detail.value].value,
				allLists: []
			}),
			e.showLoading(),
			this.getAllAct()
		},
		checking: function(a) {
			var e = this;
			console.log(a);
			var i = a.currentTarget.dataset.id,
			n = this.data.myLists; (0, t.get)("/bankActivity/overDayBankActivity/" + i).then(function(t) {
				if (200 == t.code) for (var a = 0; a < n.length; a++) for (var s = 0; s < n[a].bankActiveVO.length; s++) n[a].bankActiveVO[s].id == i && (n[a].bankActiveVO[s].states = t.result.states, e.setData({
					myLists: n
				}))
			}).
			catch(function(t) {})
		},
		checkboxChange: function(t) {
			console.log(t)
		},
		date: function(t) {
			return e.formatTime(new Date(t))
		},
		seeMy: function(t) {
			this.setData({
				only: t.detail.value
			}),
			this.getAllAct()
		},
		onLoad: function(t) {
			this.setData({
				bell: a.bell
			}),
			this.getFilters(),
			this.getAllAct()
		},
		onReady: function() {},
		onShow: function() {
			this.initData()
		},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/activity/activity.js");__wxRoute = 'pages/bill/bill';__wxRouteBegin = true;define("pages/bill/bill.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../components/wux"),
	a = require("../../utils/http.js"),
	e = require("../../img/base64");
	Page({
		data: {
			activeIndex: 0,
			ndatas: [],
			pdatas: [],
			obj: {},
			recentPay: ""
		},
		tabClick: function(t) {
			this.setData({
				activeIndex: t.currentTarget.id
			})
		},
		actionSheetTap: function(t) {
			this.setData({
				obj: t.currentTarget.dataset.obj
			});
			var a = t.currentTarget.dataset.obj.id,
			e = this,
			n = this.data.obj.cardName || "卡信息待补充";
			wx.showActionSheet({
				itemList: [n, "设为已还", "还部分", "编辑", "删除"],
				success: function(t) {
					switch (console.log(t.tapIndex), t.tapIndex) {
					case 1:
						e.payBack( - 1);
						break;
					case 2:
						e.payPart();
						break;
					case 3:
						e.editBill();
						break;
					case 4:
						e.delConfirm(a)
					}
					e.notPayData()
				}
			})
		},
		delTap: function(t) {
			var a = t.currentTarget.dataset.obj.billId;
			console.log(a);
			var e = this;
			wx.showActionSheet({
				itemList: ["删除"],
				success: function(t) {
					console.log(t.tapIndex),
					0 === t.tapIndex && e.delConfirm(a)
				}
			})
		},
		delConfirm: function(t) {
			var a = this;
			wx.showModal({
				title: "是否确认删除账单？",
				confirmText: "是",
				cancelText: "否",
				success: function(e) {
					console.log(e),
					e.confirm ? a.delBill(t) : console.log("用户点击辅助操作")
				}
			})
		},
		notPayData: function() {
			var t = this; (0, a.get)("/creditCardStatement/listStatement/1").then(function(a) {
				200 == a.code && (a.result.records.map(function(t) { - 1 != t.dictBank.difDay.indexOf("到期") || "3天" == t.dictBank.difDay ? t.color = "orange": -1 != t.dictBank.difDay.indexOf("逾期") ? t.color = "red": t.color = "black"
				}), t.setData({
					ndatas: a.result.records
				}))
			}).
			catch(function(t) {})
		},
		payedData: function() {
			var t = this; (0, a.get)("/repaymentHistory/listRepayHistoryPage/1").then(function(a) {
				200 == a.code && t.setData({
					pdatas: a.result.records,
					recentPay: a.result.condition.repayHistoryByRecent
				})
			}).
			catch(function(t) {})
		},
		payBack: function(t) {
			var e = this,
			n = this.data; (0, a.post)("/creditCardStatement/repayment", {
				id: n.obj.id,
				amount: t
			}).then(function(t) {
				200 == t.code && (e.notPayData(), wx.showToast({
					title: t.msg,
					icon: "success"
				}))
			})
		},
		payPart: function() {
			var a = this,
			e = this.data.obj;
			t.$wuxDialog.prompt({
				title: "标记已还部分",
				content: "应还：" + e.repaymentAmount + "，已还：" + e.repaymentAmountFact + "，待还:" + e.surplusAmount,
				fieldtype: "digit",
				maxlength: 36,
				onConfirm: function(t) {
					var e = a.data.$wux.dialog.prompt.response;
					a.payBack(e)
				}
			})
		},
		editBill: function() {
			var e = this,
			n = this.data;
			t.$wuxDialog.prompt({
				title: "编辑账单金额",
				content: " ",
				fieldtype: "digit",
				maxlength: 36,
				onConfirm: function(t) {
					var o = e.data.$wux.dialog.prompt.response; (0, a.put)("/creditCardStatement/statement", {
						id: n.obj.id,
						amount: o
					}).then(function(t) {
						200 == t.code && (e.notPayData(), wx.showToast({
							title: t.msg,
							icon: "success"
						}))
					})
				}
			})
		},
		delBill: function(t) {
			var e = this; (0, a.del)("/creditCardStatement/statement/" + t).then(function(t) {
				200 == t.code && (e.notPayData(), e.payedData(), wx.showToast({
					title: t.msg,
					icon: "success"
				}))
			})
		},
		add: function() {
			wx.showActionSheet({
				itemList: ["选择卡片添加账单", "粘贴短信添加账单"],
				success: function(t) {
					console.log(t.tapIndex),
					0 == t.tapIndex && wx.navigateTo({
						url: "/pages/adbill/addbill"
					}),
					1 == t.tapIndex && wx.navigateTo({
						url: "/pages/sms/sms"
					})
				}
			})
		},
		onLoad: function(t) {
			this.setData({
				bill: e.bill
			});
			var a = this;
			setTimeout(function() {
				a.notPayData(),
				a.payedData()
			},
			1e3)
		},
		onReady: function() {},
		onShow: function() {
			this.notPayData(),
			this.payedData()
		},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/bill/bill.js");__wxRoute = 'pages/history/history';__wxRouteBegin = true;define("pages/history/history.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js"),
	n = require("../../utils/util");
	Page({
		data: {
			datas: []
		},
		initData: function(n) {
			var i = this; (0, t.get)("/repaymentHistory/listRepayHistory/" + n).then(function(t) {
				200 == t.code && i.setData({
					datas: t.result
				})
			}).
			catch(function(t) {})
		},
		onLoad: function(t) {
			var i = t.id;
			this.initData(i),
			n.hideShareMenu()
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/history/history.js");__wxRoute = 'pages/cardedit/cardedit';__wxRouteBegin = true;define("pages/cardedit/cardedit.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function e(e, t, a) {
		return t in e ? Object.defineProperty(e, t, {
			value: a,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = a,
		e
	}
	var t, a = require("../../components/wux"),
	n = require("../../utils/http.js"),
	i = require("../../utils/util");
	Page({
		data: (t = {
			name: "页面的初始数据页面的初始数据页面的初始数据",
			days0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
			days1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
			id: ""
		},
		e(t, "name", ""), e(t, "billDate", null), e(t, "repayDate", null), e(t, "quota", ""), e(t, "dictBankId", ""), e(t, "cardNo", ""), e(t, "des", ""), e(t, "dictBankCardinfoId", ""), e(t, "index", 0), t),
		bindPickerChange0: function(e) {
			console.log("picker发送选择改变，携带值为", e),
			this.setData({
				billDate: Number(e.detail.value)
			})
		},
		bindPickerChange1: function(e) {
			console.log("picker发送选择改变，携带值为", e),
			this.setData({
				repayDate: Number(e.detail.value)
			})
		},
		changeData: function(e) {
			this.setData(e),
			console.log("设置数据：", e)
		},
		editCard: function() {
			var e = this.data; (0, n.put)("/userBankCard/card", {
				cardNo: e.cardNo,
				id: e.id,
				dictBankCardinfoId: e.dictBankCardinfoId,
				quota: e.quota,
				statementDate: e.billDate + 1,
				repaymentDate: e.repayDate + 1,
				des: e.des,
				packetName: 0 == e.index ? "": e.packets[e.index]
			}).then(function(e) {
				200 == e.code ? (wx.showToast({
					title: e.msg,
					icon: "success"
				}), setTimeout(function() {
					wx.navigateBack()
				},
				600)) : a.$wuxToptips.show({
					timer: 3e3,
					text: e.msg || "请填写正确的字段"
				})
			})
		},
		delCard: function() { (0, n.del)("/userBankCard/card/" + this.data.id).then(function(e) {
				200 == e.code ? (wx.showToast({
					title: e.msg,
					icon: "success"
				}), setTimeout(function() {
					wx.navigateBack({
						delta: 2
					})
				},
				600)) : a.$wuxToptips.show({
					timer: 3e3,
					text: e.msg || "删除失败"
				})
			}).
			catch(function(e) {})
		},
		bindPickerChange: function(e) {
			console.log("picker发送选择改变，携带值为", e.detail.value),
			this.setData({
				index: e.detail.value
			})
		},
		getCardNo: function(e) {
			this.data.cardNo = e.detail.value
		},
		getQuota: function(e) {
			this.data.quota = e.detail.value
		},
		getDes: function(e) {
			this.data.des = e.detail.value
		},
		onLoad: function(e) {
			console.log(e.obj);
			var t = JSON.parse(e.obj);
			if (console.log(t), t.packets) {
				t.packets.unshift("无");
				for (var a = 0; a < t.packets.length; a++) t.packets[a] == t.packetName && this.setData({
					index: a
				})
			} else t.packets = ["无"];
			this.setData({
				billDate: t.statementDate - 1,
				repayDate: t.repaymentDate - 1,
				id: t.id,
				name: t.dictBankCardinfoName,
				quota: t.quota,
				dictBankId: t.dictBankId,
				cardNo: t.cardNo,
				des: t.des,
				dictBankCardinfoId: t.dictBankCardinfoId,
				packets: t.packets
			}),
			console.log("dddddddddddd", t),
			i.hideShareMenu()
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/cardedit/cardedit.js");__wxRoute = 'pages/carddetail/carddetail';__wxRouteBegin = true;define("pages/carddetail/carddetail.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js"),
	n = require("../../utils/util");
	Page({
		data: {
			datas: "",
			id: ""
		},
		initData: function() {
			var n = this; (0, t.get)("/userBankCard/card/" + this.data.id).then(function(t) {
				200 == t.code && n.setData({
					datas: t.result
				})
			}).
			catch(function(t) {})
		},
		toggleRemind: function(n) {
			var a = n.detail.value,
			i = "关闭成功";
			a && (i = "开启成功"),
			(0, t.get)("/userBankCard/setRemind/" + this.data.id + "/" + a).then(function(t) {
				200 == t.code && wx.showToast({
					title: i,
					icon: "success"
				})
			}).
			catch(function(t) {})
		},
		goToEdit: function(t) {
			var n = JSON.stringify(t.currentTarget.dataset.obj);
			wx.navigateTo({
				url: "/pages/cardedit/cardedit?obj=" + n
			})
		},
		goCardInfo: function(t) {
			console.log(t);
			var n = t.currentTarget.dataset.obj;
			n.dictBankCardinfoId && wx.navigateTo({
				url: "/pages/cardinfo/cardinfo?id=" + n.dictBankCardinfoId + "&bid=" + n.dictBankId
			})
		},
		onLoad: function(t) {
			this.setData({
				id: t.id
			}),
			n.hideShareMenu()
		},
		onReady: function() {},
		onShow: function() {
			this.initData()
		},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/carddetail/carddetail.js");__wxRoute = 'pages/addcard/addcard';__wxRouteBegin = true;define("pages/addcard/addcard.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	function t(t, a, e) {
		return a in t ? Object.defineProperty(t, a, {
			value: e,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : t[a] = e,
		t
	}
	var a, e = require("../../components/wux"),
	n = require("../../utils/http.js");
	getApp();
	Page({
		data: (a = {
			name: "页面的初始数据页面的初始数据页面的初始数据",
			days0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
			days1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
			billDate: null,
			repayDate: null,
			dictBankCardinfoId: ""
		},
		t(a, "name", ""), t(a, "cardNo", ""), t(a, "dictBankId", ""), t(a, "des", ""), t(a, "quota", ""), a),
		bindPickerChange0: function(t) {
			var a = t.detail.value,
			e = Number(a) - 10;
			e < 0 ? e += 30 : 0 == e && (e = 1),
			this.setData({
				billDate: a,
				repayDate: e
			})
		},
		bindPickerChange1: function(t) {
			console.log("picker发送选择改变，携带值为", t),
			this.setData({
				repayDate: t.detail.value
			})
		},
		getNum: function(t) {
			this.data.cardNo = t.detail.value
		},
		getMoney: function(t) {
			this.data.quota = t.detail.value
		},
		getDes: function(t) {
			this.data.des = t.detail.value
		},
		changeData: function(t) {
			this.setData(t),
			console.log("设置数据：", t)
		},
		addCard: function(t) {
			var a = this.data; (0, n.post)("/userBankCard/card", {
				cardNo: a.cardNo,
				dictBankId: a.dictBankId,
				dictBankCardinfoId: a.dictBankCardinfoId,
				quota: a.quota,
				statementDate: Number(a.billDate) + 1,
				repaymentDate: Number(a.repayDate) + 1,
				des: a.des,
				formId: t.detail.formId,
				appId: "wx8d001aef31c6d06f"
			}).then(function(t) {
				200 == t.code ? (wx.showToast({
					title: t.msg,
					icon: "success"
				}), setTimeout(function() {
					wx.navigateBack()
				},
				600)) : e.$wuxToptips.show({
					timer: 3e3,
					text: t.msg || "请填写正确的字段"
				})
			})
		},
		onLoad: function(t) {},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/addcard/addcard.js");__wxRoute = 'pages/cardlist/list1/list1';__wxRouteBegin = true;define("pages/cardlist/list1/list1.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var n = require("../../../utils/http.js"),
	t = require("../../../utils/util");
	Page({
		data: {
			datas: []
		},
		initData: function() {
			var t = this; (0, n.get)("/dictBank/listBank").then(function(n) {
				200 == n.code && t.setData({
					datas: n.result
				})
			}).
			catch(function(n) {})
		},
		onLoad: function(n) {
			t.hideShareMenu()
		},
		onReady: function() {},
		onShow: function() {
			this.initData()
		},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/cardlist/list1/list1.js");__wxRoute = 'pages/cardlist/list2/list2';__wxRouteBegin = true;define("pages/cardlist/list2/list2.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../../utils/http.js"),
	n = require("../../../utils/util");
	Page({
		data: {
			level: "",
			id: "",
			datas: []
		},
		onLoad: function(t) {
			console.log(t),
			this.setData({
				level: t.level,
				id: t.id
			}),
			n.hideShareMenu()
		},
		initData: function() {
			var n = this; (0, t.get)("/dictBank/listBankCards/" + this.data.id).then(function(t) {
				200 == t.code && n.setData({
					datas: t.result
				})
			}).
			catch(function(t) {})
		},
		onReady: function() {},
		onShow: function() {
			this.initData()
		},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/cardlist/list2/list2.js");__wxRoute = 'pages/cardlist/list3/list3';__wxRouteBegin = true;define("pages/cardlist/list3/list3.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../../components/wux"),
	a = require("../../../utils/http.js"),
	n = require("../../../utils/util");
	Page({
		data: {
			backto: 0,
			id: "",
			datas: [],
			inputShowed: !0,
			inputVal: ""
		},
		pick: function(t) {
			var n = t.currentTarget.dataset.obj,
			e = n.bankId,
			i = getCurrentPages(),
			o = (i[i.length - 1], i[i.length - this.data.backto - 1]),
			s = this.data; (0, a.get)("/userBankCard/cardDefault/" + e).then(function(t) {
				200 == t.code && (o.changeData({
					dictBankCardinfoId: n.id,
					name: n.name,
					billDate: t.result.statementDate - 1,
					repayDate: t.result.repaymentDate - 1,
					quota: t.result.quota,
					dictBankId: n.bankId
				}), wx.navigateBack({
					delta: s.backto
				}))
			}).
			catch(function(t) {})
		},
		initData: function() {
			var t = this; (0, a.get)("/dictBank/listBankCardInfo/" + this.data.id).then(function(a) {
				200 == a.code && t.setData({
					datas: a.result
				})
			}).
			catch(function(t) {})
		},
		showInput: function() {
			this.setData({
				inputShowed: !0
			})
		},
		hideInput: function() {
			this.setData({
				inputVal: "",
				inputShowed: !1
			})
		},
		clearInput: function() {
			this.setData({
				inputVal: ""
			})
		},
		inputTyping: function(t) {
			this.setData({
				inputVal: t.detail.value
			})
		},
		search: function() {
			var t = this,
			n = this.data; (0, a.post)("/dictBank/searchCardInfo/", {
				bankId: n.id,
				name: n.inputVal
			}).then(function(a) {
				200 == a.code && t.setData({
					datas: a.result
				})
			})
		},
		postcardTap: function() {
			var a = this;
			t.$wuxDialog.prompt({
				title: "",
				content: "提交卡片",
				fieldtype: "text",
				placeholder: "请输入卡片名称，我们将会尽快补充卡片信息",
				maxlength: 36,
				onConfirm: function(t) {
					var n = a.data.$wux.dialog.prompt.response;
					a.postcard(n)
				}
			})
		},
		postcard: function(t) {
			var n = this.data; (0, a.post)("/userBankCard/feedbackCard", {
				cardName: t,
				id: n.bid
			}).then(function(t) {
				200 == t.code && wx.redirectTo({
					url: "/pages/thanks/thanks"
				})
			})
		},
		onLoad: function(t) {
			if (console.log("进来了", t), this.setData({
				bid: t.bid
			}), t.level && (2 == (a = Number(t.level)) && this.setData({
				backto: 2,
				id: t.id
			}), 1 == a && this.setData({
				backto: 3,
				id: t.id
			}), this.initData()), t.back) {
				var a = Number(t.back);
				2 == t.back ? this.setData({
					backto: 2,
					id: t.id
				}) : this.setData({
					backto: 3,
					id: t.id
				})
			}
			1 == t.search && this.setData({
				search: !0
			}),
			n.hideShareMenu()
		},
		onReady: function() {},
		onShow: function() {
			console.log(this.data.datas)
		},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/cardlist/list3/list3.js");__wxRoute = 'pages/mycardlist/mycardlist';__wxRouteBegin = true;define("pages/mycardlist/mycardlist.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js");
	getApp();
	Page({
		data: {
			datas: []
		},
		pick: function(t) {
			console.log(t);
			var n = t.currentTarget.dataset.obj,
			a = n.repaymentDate,
			e = new Date,
			o = e.getFullYear(),
			i = e.getMonth() + 1;
			e.getDate() > a && (i += 1);
			var c = i + "月" + a + "日",
			r = getCurrentPages(),
			u = (r[r.length - 1], r[r.length - 2]);
			console.log("前一页：", u),
			u.changeData({
				obj: n,
				date: c,
				dateVal: o + "-" + i + "-" + a
			}),
			wx.navigateBack({
				delta: 1
			})
		},
		initData: function() {
			var n = this; (0, t.get)("/userBankCard/listCard/all/1").then(function(t) {
				200 == t.code && n.setData({
					datas: t.result.records
				})
			}).
			catch(function(t) {})
		},
		onLoad: function(t) {},
		onReady: function() {},
		onShow: function() {
			this.initData()
		},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/mycardlist/mycardlist.js");__wxRoute = 'pages/adbill/addbill';__wxRouteBegin = true;define("pages/adbill/addbill.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../components/wux"),
	e = require("../../utils/http.js");
	getApp();
	Page({
		data: {
			name: "",
			obj: {},
			repaymentAmount: "",
			start: (new Date).getFullYear() + "-01-01",
			end: (new Date).getFullYear() + "-12-31",
			date: "",
			dateVal: ""
		},
		bindDateChange: function(t) {
			console.log("picker发送选择改变，携带值为", t.detail.value);
			var e = t.detail.value,
			n = e.substr(5).replace("-", "月") + "日";
			this.setData({
				date: n,
				dateVal: e
			})
		},
		changeData: function(t) {
			this.setData(t),
			console.log("设置数据：", t)
		},
		addBill: function(n) {
			console.log("form发生了submit事件，携带数据为：", n);
			var a = this.data,
			o = a.dateVal.split("-"); (0, e.post)("/creditCardStatement/statement", {
				repaymentMonth: o[1],
				repaymentDay: o[2],
				repaymentAmount: a.repaymentAmount,
				userBankId: a.obj.id,
				formId: n.detail.formId,
				appId: "wx8d001aef31c6d06f"
			}).then(function(e) {
				200 == e.code ? (wx.showToast({
					title: e.msg,
					icon: "success"
				}), setTimeout(function() {
					wx.navigateBack()
				},
				600)) : t.$wuxToptips.show({
					timer: 3e3,
					text: e.msg || "请填写正确的字段"
				})
			})
		},
		setStart: function() {},
		getInput: function(t) {
			this.data.repaymentAmount = t.detail.value
		},
		onLoad: function(t) {},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/adbill/addbill.js");__wxRoute = 'pages/help/help';__wxRouteBegin = true;define("pages/help/help.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var n = require("../../utils/http.js");
	Page({
		data: {},
		initData: function() {
			var t = this; (0, n.get)("/helpList/2").then(function(n) {
				200 == n.code && t.setData({
					datas: n.result
				})
			}).
			catch(function(n) {})
		},
		onLoad: function(n) {
			this.initData()
		},
		onReady: function() {},
		onShow: function() {
			this.initData()
		},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/help/help.js");__wxRoute = 'pages/helpinfo/helpinfo';__wxRouteBegin = true;define("pages/helpinfo/helpinfo.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var n = require("../../utils/http.js"),
	t = require("../../wxParse/wxParse.js");
	Page({
		data: {
			datas: ""
		},
		initData: function(o) {
			var e = this; (0, n.get)("/help/" + o).then(function(n) {
				if (200 == n.code) {
					e.setData({
						datas: n.result.content
					});
					var o = n.result.content;
					t.wxParse("richText", "html", o, e, 5)
				}
			}).
			catch(function(n) {})
		},
		onLoad: function(n) {
			console.log(n.id),
			this.initData(n.id)
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/helpinfo/helpinfo.js");__wxRoute = 'pages/home/home';__wxRouteBegin = true;define("pages/home/home.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js"),
	n = (getApp(), require("../../utils/util"));
	Page({
		data: {
			hotCards: [],
			hotTheme: [],
			allBanks: []
		},
		initData: function() {
			var i = this;
			n.showLoading(),
			(0, t.get)("/equityHome/home").then(function(t) {
				i.setData({
					hotCards: t.result[0].cardAlbumListList,
					hotTheme: t.result[1],
					allBanks: t.result[2]
				}),
				n.hideLoading()
			}).
			catch(function(t) {}),
			(0, t.get)("/miniAppList/wx5a9a7d00de14f9c4").then(function(t) {
				i.setData({
					appList: t.result
				}),
				n.hideLoading()
			}).
			catch(function(t) {})
		},
		jumpApp: function(t) {
			console.log(t),
			wx.navigateToMiniProgram({
				appId: t.currentTarget.dataset.appid,
				success: function(t) {
					console.log(t)
				}
			})
		},
		onLoad: function(t) {
			var n = this;
			setTimeout(function() {
				n.initData()
			},
			600)
		},
		onReady: function() {},
		onShow: function() {
			this.initData()
		},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/home/home.js");__wxRoute = 'pages/search/search';__wxRouteBegin = true;define("pages/search/search.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js");
	Page({
		data: {
			searchRes: []
		},
		goback: function() {
			this.setData({
				keyword: "",
				searchRes: []
			}),
			wx.navigateBack()
		},
		clearInput: function() {
			this.setData({
				keyword: "",
				searchRes: []
			})
		},
		inputTyping: function(t) {
			this.setData({
				keyword: t.detail.value
			}),
			"" == t.detail.value && this.setData({
				searchRes: []
			})
		},
		initData: function() {
			var a = this; (0, t.get)("/dictBank/searchHotWords").then(function(t) {
				a.setData({
					hotwords: t.result
				})
			}).
			catch(function(t) {})
		},
		search: function(a) {
			var n = this;
			wx.showNavigationBarLoading(),
			console.log(a);
			var e = a.target.dataset.hotwords;
			e && this.setData({
				keyword: e
			}),
			(0, t.post)("/dictBank/searchCardInfo", {
				name: this.data.keyword
			}).then(function(t) {
				n.setData({
					searchRes: t.result
				}),
				wx.hideNavigationBarLoading()
			})
		},
		onLoad: function(t) {
			this.initData()
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/search/search.js");__wxRoute = 'pages/tip/tip';__wxRouteBegin = true;define("pages/tip/tip.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js"),
	n = require("../../wxParse/wxParse.js");
	Page({
		data: {},
		initData: function(a) {
			var e = this; (0, t.get)("/cardPlayStrategy/cardPlayStrategy/" + a).then(function(t) {
				e.setData({
					tip: t.result
				});
				var a = t.result.content;
				n.wxParse("article", "html", a, e, 5)
			}).
			catch(function(t) {})
		},
		onLoad: function(t) {
			this.initData(t.id)
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/tip/tip.js");__wxRoute = 'pages/cardinfo/cardinfo';__wxRouteBegin = true;define("pages/cardinfo/cardinfo.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js"),
	a = require("../../utils/util"),
	e = require("../../wxParse/wxParse.js");
	Page({
		data: {
			tabs: ["权益", "积分", "攻略"],
			activeIndex: 0,
			sliderOffset: 0,
			sliderLeft: 0,
			btnTxt: "放入卡包"
		},
		initData: function(e) {
			var i = this;
			a.showLoading(),
			(0, t.get)("/dictBank/dictBankCardInfo/" + e).then(function(t) {
				i.setData({
					cardinfo: t.result
				}),
				wx.setNavigationBarTitle({
					title: t.result.name
				}),
				a.hideLoading()
			}).
			catch(function(t) {})
		},
		getRights: function(e) {
			var i = this;
			a.showLoading(),
			(0, t.get)("/cardInfoEquityItems/list/" + e).then(function(t) {
				i.setData({
					rightsData: t.result
				}),
				a.hideLoading()
			}).
			catch(function(t) {})
		},
		getPoints: function(i, n) {
			var s = this;
			console.log("iiiiiiiiiiiid", i),
			a.showLoading(),
			(0, t.get)("/dictCardPoints/list?bid=" + i + "&cid=" + n).then(function(t) {
				s.setData({
					pointsData: t.result
				});
				var i = t.result.otherList[0].content;
				e.wxParse("others", "html", i, s, 5);
				for (var n = t.result.onlineList,
				o = [], c = 0; c < n.length; c++) for (var r in n[c]) if ("" != n[c][r]) {
					switch (console.log(r), console.log(n[c][r]), r) {
					case "alipay":
						o.push({
							name:
							"支付宝",
							value: n[c][r]
						});
						break;
					case "applepay":
						o.push({
							name:
							"ApplePay",
							value: n[c][r]
						});
						break;
					case "baidupay":
						o.push({
							name:
							"百度支付",
							value: n[c][r]
						});
						break;
					case "jdpay":
						o.push({
							name:
							"京东支付",
							value: n[c][r]
						});
						break;
					case "qqpay":
						o.push({
							name:
							"QQ支付",
							value: n[c][r]
						});
						break;
					case "tentcentpay":
						o.push({
							name:
							"微信/财付通支付",
							value: n[c][r]
						});
						break;
					case "unionpay":
						o.push({
							name:
							"银联支付",
							value: n[c][r]
						})
					}
					s.setData({
						pay: o
					})
				}
				a.hideLoading()
			}).
			catch(function(t) {})
		},
		getTips: function(a, e) {
			var i = this; (0, t.get)("/cardPlayStrategy/list?bid=" + a + "&cid=" + e).then(function(t) {
				i.setData({
					tipsData: t.result
				})
			}).
			catch(function(t) {})
		},
		tabClick: function(t) {
			console.log(t),
			this.setData({
				sliderOffset: t.currentTarget.offsetLeft,
				activeIndex: t.currentTarget.id
			})
		},
		advertise: function(a, e) {
			var i = this; (0, t.get)("/generalizeLinkShort?bid=" + a + "&cid=" + e).then(function(t) {
				var a;
				a = t.result.own ? "已持有": "放入卡包",
				i.setData({
					ad: t.result.cardConversionLink,
					btnTxt: a,
					own: t.result.own
				})
			}).
			catch(function(t) {})
		},
		doihave: function() {
			var a = this;
			this.data.own ? wx.showModal({
				title: "提示",
				content: "已持有此卡，若需删除，请到卡包中删除",
				showCancel: !1
			}) : (0, t.post)("/userBankCard/addUserBankCardBySimple", {
				dictBankCardinfoId: this.data.cid,
				dictBankId: this.data.bid
			}).then(function(t) {
				200 == t.code && (a.setData({
					own: !0,
					btnTxt: "已持有"
				}), wx.showModal({
					title: "提示",
					content: "添加成功，请到卡包中补充信息",
					showCancel: !1
				}))
			}).
			catch(function(t) {})
		},
		onLoad: function(t) {
			var a = this;
			this.initData(t.id),
			this.getRights(t.id),
			this.getPoints(t.bid, t.id),
			this.getTips(t.bid, t.id),
			this.advertise(t.bid, t.id),
			this.setData({
				cid: t.id,
				bid: t.bid
			}),
			wx.getSystemInfo({
				success: function(t) {
					a.setData({
						sliderLeft: (t.windowWidth / a.data.tabs.length - 96) / 2,
						sliderOffset: t.windowWidth / a.data.tabs.length * a.data.activeIndex
					})
				}
			})
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {
			var a = {
				shareDes: this.data.cardinfo.name,
				sharePage: getCurrentPages()[getCurrentPages().length - 1].route,
				state: 0
			};
			return {
				title: this.data.cardinfo.name,
				success: function(e) {
					a.state = 1,
					(0, t.shareLog)(a)
				},
				fail: function(e) { (0, t.shareLog)(a)
				}
			}
		}
	});
});require("pages/cardinfo/cardinfo.js");__wxRoute = 'pages/rights/rights';__wxRouteBegin = true;define("pages/rights/rights.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js"),
	n = require("../../utils/util"),
	i = require("../../wxParse/wxParse.js");
	Page({
		data: {},
		initData: function(e) {
			var o = this;
			n.showLoading(),
			(0, t.get)("/cardInfoEquityItems/equityItems/" + e).then(function(t) {
				o.setData({
					rights: t.result
				});
				var e = t.result.items.value,
				a = t.result.items.description;
				i.wxParse("brief", "html", e, o, 5),
				i.wxParse("intro", "html", a, o, 5),
				n.hideLoading()
			}).
			catch(function(t) {})
		},
		copyUrl: function(t) {
			wx.setClipboardData({
				data: t.target.dataset.url,
				success: function(t) {
					wx.showToast({
						title: "链接已复制",
						icon: "success",
						duration: 2e3
					})
				}
			})
		},
		onLoad: function(t) {
			this.initData(t.id)
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/rights/rights.js");__wxRoute = 'pages/theme/theme';__wxRouteBegin = true;define("pages/theme/theme.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js"),
	n = require("../../utils/util");
	Page({
		data: {},
		initData: function() {
			var i = this;
			n.showLoading(),
			(0, t.get)("/cardAlbum/cardAlbumHotList/" + this.data.id).then(function(t) {
				i.setData({
					hotCards: t.result
				}),
				n.hideLoading()
			}).
			catch(function(t) {})
		},
		onLoad: function(t) {
			wx.setNavigationBarTitle({
				title: t.name
			}),
			console.log(t),
			this.setData({
				id: t.id
			}),
			this.initData()
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/theme/theme.js");__wxRoute = 'pages/mine/mine';__wxRouteBegin = true;define("pages/mine/mine.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js"),
	n = require("../../img/base64");
	Page({
		data: {},
		initData: function() {
			var n = this; (0, t.get)("/currentUserInfo").then(function(t) {
				200 == t.code && n.setData({
					datas: t.result
				})
			}).
			catch(function(t) {})
		},
		onLoad: function(t) {
			this.setData({
				help: n.help,
				about: n.about,
				msg: n.msg,
				card: n.card,
				fee: n.fee
			})
		},
		onReady: function() {},
		onShow: function() {
			this.initData()
		},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/mine/mine.js");__wxRoute = 'pages/posterror/posterror';__wxRouteBegin = true;define("pages/posterror/posterror.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js");
	require("../../utils/util");
	Page({
		data: {},
		bindFormSubmit: function(n) {
			console.log(n),
			(0, t.post)("/bankActivity/activityInfoReport", {
				bankActiveId: this.data.id,
				type: n.detail.value.reason,
				des: n.detail.value.des
			}).then(function(t) {
				200 == t.code ? wx.redirectTo({
					url: "/pages/thanks/thanks"
				}) : wx.showToast({
					title: t.msg,
					icon: "success",
					duration: 1e3
				})
			}).
			catch(function(t) {
				wx.showToast({
					title: "提交失败！",
					icon: "success",
					duration: 2e3
				})
			})
		},
		onLoad: function(t) {
			this.setData({
				id: t.id,
				name: t.name,
				title: t.title
			})
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/posterror/posterror.js");__wxRoute = 'pages/postcarderror/postcarderror';__wxRouteBegin = true;define("pages/postcarderror/postcarderror.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js");
	require("../../utils/util");
	Page({
		data: {},
		bindFormSubmit: function(n) {
			console.log(n),
			(0, t.post)("/bankActivity/activityInfoReport", {
				bankActiveId: this.data.id,
				type: n.detail.value.reason,
				des: n.detail.value.des,
				classify: 2
			}).then(function(t) {
				200 == t.code ? wx.redirectTo({
					url: "/pages/thanks/thanks"
				}) : wx.showToast({
					title: t.msg,
					icon: "success",
					duration: 1e3
				})
			}).
			catch(function(t) {
				wx.showToast({
					title: "提交失败！",
					icon: "success",
					duration: 2e3
				})
			})
		},
		onLoad: function(t) {
			this.setData({
				id: t.cid,
				name: t.name
			})
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/postcarderror/postcarderror.js");__wxRoute = 'pages/postact/postact';__wxRouteBegin = true;define("pages/postact/postact.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js");
	require("../../utils/util");
	Page({
		data: {
			bankName: "请选择 >",
			bankId: ""
		},
		getBanks: function() {
			var n = this; (0, t.get)("/dictBank/listBank").then(function(t) {
				200 == t.code && n.setData({
					banks: t.result
				})
			}).
			catch(function(t) {})
		},
		switchBank: function(t) {
			console.log(t.detail.value),
			this.setData({
				bankName: this.data.banks[t.detail.value].name,
				bankId: this.data.banks[t.detail.value].id
			})
		},
		bindFormSubmit: function(n) {
			console.log(n),
			(0, t.post)("/bankActivity/submitNewActivity", {
				bankId: this.data.bankId,
				bankName: this.data.bankName,
				url: n.detail.value.url,
				des: n.detail.value.des
			}).then(function(t) {
				200 == t.code ? (wx.showToast({
					title: "感谢反馈！",
					icon: "success",
					duration: 2e3
				}), setTimeout(function() {
					wx.navigateBack()
				},
				1e3)) : wx.showToast({
					title: t.msg,
					icon: "success",
					duration: 1e3
				})
			}).
			catch(function(t) {
				wx.showToast({
					title: "提交失败！",
					icon: "success",
					duration: 2e3
				})
			})
		},
		onLoad: function(t) {
			this.getBanks()
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/postact/postact.js");__wxRoute = 'pages/sms/sms';__wxRouteBegin = true;define("pages/sms/sms.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js");
	Page({
		data: {
			sms: "",
			loading: !1
		},
		getClip: function() {
			var t = this;
			wx.getClipboardData({
				success: function(n) {
					console.log(n.data),
					t.setData({
						sms: n.data
					})
				}
			})
		},
		updateSms: function(t) {
			this.setData({
				sms: t.detail.value
			})
		},
		reset: function() {
			this.setData({
				sms: ""
			})
		},
		initData: function() {},
		submit: function() {
			var n = this;
			this.setData({
				loading: !0
			}),
			(0, t.post)("/userBankCard/smsAnalysis", {
				sms: this.data.sms
			}).then(function(t) {
				console.log(t),
				n.setData({
					loading: !1
				}),
				200 == t.code ? "账单已收录" == t.result ? (wx.showToast({
					title: t.result
				}), setTimeout(function() {
					wx.navigateBack({})
				},
				600)) : wx.showModal({
					title: "提示",
					content: t.result,
					showCancel: !1,
					success: function(t) {}
				}) : wx.showModal({
					title: "提示",
					content: t.msg,
					showCancel: !1,
					success: function(t) {}
				})
			}).
			catch(function(t) {}),
			console.log(this.data.sms)
		},
		onLoad: function(t) {},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/sms/sms.js");__wxRoute = 'pages/bank/bank';__wxRouteBegin = true;define("pages/bank/bank.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var t = require("../../utils/http.js"),
	a = (getApp(), require("../../utils/util"));
	Page({
		data: {
			bankId: null,
			bankList: [],
			bank: "",
			page: 1,
			pages: null,
			array: ["美国", "中国", "巴西", "日本"],
			index: 0,
			levelName: "卡级别",
			orgName: "卡组织",
			typeName: "卡类型",
			levelArr: [],
			orgArr: [],
			typeArr: [],
			levelVal: "",
			orgVal: "",
			typeVal: ""
		},
		switchLevel: function(t) {
			console.log("picker发送选择改变，携带值为", t),
			this.setData({
				levelName: this.data.levelArr[t.detail.value].name,
				levelVal: this.data.levelArr[t.detail.value].value,
				bankList: []
			}),
			this.initData(1)
		},
		switchOrg: function(t) {
			console.log("picker发送选择改变，携带值为", t),
			this.setData({
				orgName: this.data.orgArr[t.detail.value].name,
				orgVal: this.data.orgArr[t.detail.value].value,
				bankList: []
			}),
			this.initData(1)
		},
		switchType: function(t) {
			console.log("picker发送选择改变，携带值为", t),
			this.setData({
				typeName: this.data.typeArr[t.detail.value].name,
				typeVal: this.data.typeArr[t.detail.value].value,
				bankList: []
			}),
			this.initData(1)
		},
		initData: function(e) {
			var n = this;
			a.showLoading();
			var i = this.data.bankList;
			console.log(i),
			(0, t.post)("/dictBank/bankCardInfo", {
				bankId: this.data.bankId,
				current: e,
				level: this.data.levelVal,
				org: this.data.orgVal,
				type: this.data.typeVal
			}).then(function(t) {
				n.setData({
					pages: t.result.pages
				}),
				0 == t.result.records.length && console.log("暂无数据"),
				0 == n.data.bankList.length ? n.setData({
					bankList: t.result.records
				}) : n.setData({
					bankList: i.concat(t.result.records)
				}),
				a.hideLoading()
			})
		},
		getBankInfo: function(e) {
			var n = this; (0, t.get)("/dictBank/bankInfo/" + e).then(function(t) {
				n.setData({
					bank: t.result
				}),
				wx.setNavigationBarTitle({
					title: t.result.name
				}),
				a.hideLoading()
			}).
			catch(function(t) {})
		},
		getTags: function() {
			var a = this; (0, t.get)("/dictType/getDictByType/level,org,priority").then(function(t) {
				a.setData({
					levelArr: t.result.level,
					orgArr: t.result.org,
					typeArr: t.result.priority
				})
			}).
			catch(function(t) {})
		},
		onLoad: function(t) {
			this.setData({
				bankId: t.bankId
			}),
			this.initData(1),
			this.getBankInfo(t.bankId),
			this.getTags()
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {
			console.log("到底了");
			var t = this.data.page + 1;
			this.setData({
				page: t
			}),
			t <= this.data.pages ? this.initData(t) : wx.showToast({
				title: "没有更多数据",
				duration: 1500
			})
		},
		onShareAppMessage: function() {
			var a = {
				shareDes: this.data.bank.name,
				sharePage: getCurrentPages()[getCurrentPages().length - 1].route,
				state: 0
			};
			return {
				success: function(e) {
					a.state = 1,
					(0, t.shareLog)(a)
				},
				fail: function(e) { (0, t.shareLog)(a)
				}
			}
		}
	});
});require("pages/bank/bank.js");__wxRoute = 'pages/thanks/thanks';__wxRouteBegin = true;define("pages/thanks/thanks.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	var n = require("../../utils/http.js");
	Page({
		data: {},
		flow: function() {
			wx.redirectTo({
				url: "/pages/flowus/flowus"
			})
		},
		ok: function() {
			wx.navigateBack()
		},
		initData: function() {
			var t = this; (0, n.get)("/isSubscribe").then(function(n) {
				200 == n.code && t.setData({
					isSubscribe: n.result
				})
			}).
			catch(function(n) {})
		},
		onLoad: function(n) {
			this.initData()
		},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/thanks/thanks.js");__wxRoute = 'pages/flowus/flowus';__wxRouteBegin = true;define("pages/flowus/flowus.js",
function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
	"use strict";
	Page({
		data: {
			img: "https://pic.wankadi.com/bank/fee6dd40f76c45509d4b6ba30a272d8a.jpg"
		},
		save: function() {
			wx.showLoading({
				title: "下载中..."
			});
			wx.downloadFile({
				url: this.data.img,
				success: function(o) {
					var n = o.tempFilePath;
					wx.saveImageToPhotosAlbum ? wx.saveImageToPhotosAlbum({
						filePath: n,
						success: function() {
							wx.showToast({
								title: "保存成功",
								icon: "success"
							})
						},
						fail: function() {
							wx.hideLoading(),
							wx.showModal({
								title: "提示",
								content: "您拒绝了保存图片"
							})
						}
					}) : wx.showModal({
						title: "提示",
						content: "您的微信版本过低，请升级体验本功能"
					})
				}
			})
		},
		ok: function() {
			wx.navigateBack()
		},
		onLoad: function(o) {},
		onReady: function() {},
		onShow: function() {},
		onHide: function() {},
		onUnload: function() {},
		onPullDownRefresh: function() {},
		onReachBottom: function() {},
		onShareAppMessage: function() {}
	});
});require("pages/flowus/flowus.js");