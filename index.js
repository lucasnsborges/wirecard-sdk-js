"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function (t, e) {
    for (var r in e) {
        t[r] = e[r];
    }
}(exports, function (t) {
    var e = {};

    function r(n) {
        if (e[n]) return e[n].exports;
        var s = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(s.exports, s, s.exports, r), s.l = !0, s.exports;
    }
    return r.m = t, r.c = e, r.d = function (t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, r.r = function (t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, r.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default;
        } : function () {
            return t;
        };
        return r.d(e, "a", e), e;
    }, r.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, r.p = "", r(r.s = 0);
}([function (t, e, r) {
    r.r(e);

    var n = function () {
        function n() {
            _classCallCheck(this, n);
        }

        _createClass(n, null, [{
            key: "_isInEloBinRanges",
            value: function _isInEloBinRanges(t) {
                var e = parseInt(t);
                for (var _t = 0; _t < this._eloBinRanges.length; _t++) {
                    var _r = this._eloBinRanges[_t][0],
                        _n = this._eloBinRanges[_t][1];
                    if (e >= _r && e <= _n) return !0;
                }
                return !1;
            }
        }, {
            key: "_isInMasterCardRanges",
            value: function _isInMasterCardRanges(t) {
                var e = parseInt(t);
                for (var _t2 = 0; _t2 < this._masterCardRanges.length; _t2 += 2) {
                    var _r2 = this._masterCardRanges[_t2],
                        _n2 = this._masterCardRanges[_t2 + 1];
                    if (e >= _r2 && e <= _n2) return !0;
                }
                return !1;
            }
        }, {
            key: "normalizeCardNumber",
            value: function normalizeCardNumber(t) {
                return t ? (t += "").replace(/[\s+|\.|\-]/g, "") : t;
            }
        }, {
            key: "isValidNumber",
            value: function isValidNumber(t) {
                var e = this.normalizeCardNumber(t),
                    r = this.cardType(e);
                if (r) {
                    if ("HIPERCARD" === r.brand) return !0;{
                        var _t3 = 0;
                        for (var _r3 = 2 - e.length % 2; _r3 <= e.length; _r3 += 2) {
                            _t3 += parseInt(e.charAt(_r3 - 1), 10);
                        }for (var _r4 = e.length % 2 + 1; _r4 < e.length; _r4 += 2) {
                            var _n3 = 2 * parseInt(e.charAt(_r4 - 1), 10);
                            _t3 += _n3 < 10 ? _n3 : _n3 - 9;
                        }
                        return _t3 % 10 == 0;
                    }
                }
                return !1;
            }
        }, {
            key: "isSecurityCodeValid",
            value: function isSecurityCodeValid(t, e) {
                var r = this.cardType(t);
                if (!r) return !1;
                var n = "AMEX" === r.brand ? 4 : 3,
                    s = new RegExp("[0-9]{" + n + "}");
                return !!e && e.length === n && s.test(e);
            }
        }, {
            key: "isExpiryDateValid",
            value: function isExpiryDateValid(t, e) {
                var r = parseInt(t, 10),
                    n = parseInt(e, 10);
                return !(r < 1 || r > 12) && (2 === (n + "").length || 4 === (n + "").length) && (2 === (n + "").length && (n = n > 80 ? "19" + n : "20" + n), !(n < 1e3 || n >= 3e3) && !this.isExpiredDate(r, n));
            }
        }, {
            key: "isExpiredDate",
            value: function isExpiredDate(t, e) {
                var r = new Date(),
                    n = ("0" + (r.getMonth() + 1)).slice(-2),
                    s = r.getFullYear(),
                    i = ("0" + t).slice(-2);
                if (2 === e.toString().length) {
                    if (e > 80) return !0;
                    e = "20" + e;
                }
                var a = s + n;
                return parseInt(e + i, 10) < parseInt(a, 10);
            }
        }, {
            key: "isValid",
            value: function isValid(t) {
                var e = t.number;
                var r = t.cvc;
                var n = t.expirationMonth;
                var s = t.expirationYear;

                return this.isValidNumber(e) && this.isSecurityCodeValid(e, r) && this.isExpiryDateValid(n, s);
            }
        }, {
            key: "cardType",
            value: function cardType(t, e) {
                var _this = this;

                var r = this.normalizeCardNumber(t),
                    n = function n(t) {
                    return t.substring(0, 6);
                };
                var s = {
                    VISA: {
                        matches: function matches(t) {
                            return (/^4\d{15}$/.test(t)
                            );
                        }
                    },
                    MASTERCARD: {
                        matches: function matches(t) {
                            return (/^5[1-5]\d{14}$/.test(t) || null !== t && 16 == t.length && _this._isInMasterCardRanges(n(t))
                            );
                        }
                    },
                    AMEX: {
                        matches: function matches(t) {
                            return (/^3[4,7]\d{13}$/.test(t)
                            );
                        }
                    },
                    DINERS: {
                        matches: function matches(t) {
                            return (/^3[0,6,8]\d{12}$/.test(t)
                            );
                        }
                    },
                    HIPERCARD: {
                        matches: function matches(t) {
                            return null !== t && (16 == t.length || 19 == t.length) && _this._hipercardBins.indexOf(n(t)) > -1;
                        }
                    },
                    ELO: {
                        matches: function matches(t) {
                            return null !== t && 16 == t.length && (_this._eloBins.indexOf(n(t)) > -1 || _this._isInEloBinRanges(n(t)));
                        }
                    },
                    HIPER: {
                        matches: function matches(t) {
                            return null !== t && t.length >= 6 && _this._hiperBins.indexOf(n(t)) > -1;
                        }
                    }
                };
                return e && (s = {
                    VISA: {
                        matches: function matches(t) {
                            return (/^4\d{3}\d*$/.test(t)
                            );
                        }
                    },
                    MASTERCARD: {
                        matches: function matches(t) {
                            return (/^5[1-5]\d{4}\d*$/.test(t) || null !== t && 16 == t.length && _this._isInMasterCardRanges(n(t))
                            );
                        }
                    },
                    AMEX: {
                        matches: function matches(t) {
                            return (/^3[4,7]\d{2}\d*$/.test(t)
                            );
                        }
                    },
                    DINERS: {
                        matches: function matches(t) {
                            return (/^3(?:0[0-5]|[68][0-9])+\d*$/.test(t)
                            );
                        }
                    },
                    HIPERCARD: {
                        matches: function matches(t) {
                            return null !== t && t.length >= 6 && _this._hipercardBins.indexOf(n(t)) > -1;
                        }
                    },
                    ELO: {
                        matches: function matches(t) {
                            return null !== t && t.length >= 6 && (_this._eloBins.indexOf(n(t)) > -1 || _this._isInEloBinRanges(n(t)));
                        }
                    },
                    HIPER: {
                        matches: function matches(t) {
                            return null !== t && t.length >= 6 && _this._hiperBins.indexOf(n(t)) > -1;
                        }
                    }
                }), s.ELO.matches(r) ? {
                    brand: "ELO"
                } : s.HIPER.matches(r) ? {
                    brand: "HIPER"
                } : s.VISA.matches(r) ? {
                    brand: "VISA"
                } : s.MASTERCARD.matches(r) ? {
                    brand: "MASTERCARD"
                } : s.AMEX.matches(r) ? {
                    brand: "AMEX"
                } : s.HIPERCARD.matches(r) ? {
                    brand: "HIPERCARD"
                } : s.DINERS.matches(r) ? {
                    brand: "DINERS"
                } : null;
            }
        }, {
            key: "_eloBins",
            get: function get() {
                return ["401178", "401179", "431274", "438935", "451416", "457393", "457631", "457632", "504175", "627780", "636297", "636368"];
            }
        }, {
            key: "_eloBinRanges",
            get: function get() {
                return [[506699, 506778], [509e3, 509999], [650031, 650033], [650035, 650051], [650405, 650439], [650485, 650538], [650541, 650598], [650700, 650718], [650720, 650727], [650901, 650920], [651652, 651679], [655e3, 655019], [655021, 655058]];
            }
        }, {
            key: "_hiperBins",
            get: function get() {
                return ["637095", "637612", "637599", "637609", "637568"];
            }
        }, {
            key: "_hipercardBins",
            get: function get() {
                return ["606282", "384100", "384140", "384160"];
            }
        }, {
            key: "_masterCardRanges",
            get: function get() {
                return [222100, 272099];
            }
        }]);

        return n;
    }();

    var s = function () {
        function s() {
            _classCallCheck(this, s);
        }

        _createClass(s, null, [{
            key: "setEncrypter",
            value: function setEncrypter(t, e) {
                this.encrypter = t, this.encrypterName = e;
            }
        }, {
            key: "encrypt",
            value: function encrypt(t, e) {
                if (this.encrypter || this.encrypterName || "undefined" == typeof JSEncrypt || (this.encrypter = JSEncrypt, this.encrypterName = "js"), this.encrypter && this.encrypterName) switch (this.encrypterName.toLowerCase()) {
                    case "js":
                    case "ionic":
                    case "node":
                        return this.jsEncrypt(t, e);
                    case "react-native":
                        return this.reactNativeRsa(t, e);
                }
                return Promise.resolve(null);
            }
        }, {
            key: "jsEncrypt",
            value: function jsEncrypt(t, e) {
                var _this2 = this;

                return new Promise(function (r) {
                    var n = new _this2.encrypter({
                        default_key_size: 2048
                    });
                    return n.setPublicKey(e), r(n.encrypt(t));
                });
            }
        }, {
            key: "reactNativeRsa",
            value: function reactNativeRsa(t, e) {
                return this.encrypter.encrypt(t, e);
            }
        }]);

        return s;
    }();

    var i = function () {
        function i() {
            _classCallCheck(this, i);
        }

        _createClass(i, null, [{
            key: "setEncrypter",
            value: function setEncrypter(t, e) {
                return s.setEncrypter(t, e), this;
            }
        }, {
            key: "setCreditCard",
            value: function setCreditCard(t) {
                return t && (this.creditCard = Object.assign(t, {
                    number: n.normalizeCardNumber(t.number)
                })), this;
            }
        }, {
            key: "getCreditCard",
            value: function getCreditCard() {
                return this.creditCard;
            }
        }, {
            key: "setPubKey",
            value: function setPubKey(t) {
                return this.pubKey = t, this;
            }
        }, {
            key: "hash",
            value: function hash() {
                var _creditCard = this.creditCard;
                var t = _creditCard.number;
                var e = _creditCard.cvc;
                var r = _creditCard.expirationMonth;
                var n = _creditCard.expirationYear;

                if (!(this.pubKey && t && e && r && n)) return Promise.resolve(null);
                var i = ["number=" + t, "cvc=" + e, "expirationMonth=" + r, "expirationYear=" + n].join("&");
                return s.encrypt(i, this.pubKey);
            }
        }, {
            key: "isValid",
            value: function isValid() {
                return n.isValid(this.creditCard);
            }
        }, {
            key: "cardType",
            value: function cardType() {
                var t = n.cardType(this.creditCard.number);
                return t ? t.brand : null;
            }
        }]);

        return i;
    }();

    r.d(e, "MoipValidator", function () {
        return n;
    }), r.d(e, "MoipCreditCard", function () {
        return i;
    });
}]));
