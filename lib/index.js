"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _isomorphicWs = _interopRequireDefault(require("isomorphic-ws"));

var _events = _interopRequireDefault(require("events"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var SOCKET_DEBUG = false;

var TendermintWS = /*#__PURE__*/function (_EventEmitter) {
  (0, _inherits2["default"])(TendermintWS, _EventEmitter);

  var _super = _createSuper(TendermintWS);

  function TendermintWS() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      server: 'wss://rpc.cosmos.network/websocket',
      timeout: 15000,
      autoReconnect: true
    },
        server = _ref.server,
        timeout = _ref.timeout,
        autoReconnect = _ref.autoReconnect;

    (0, _classCallCheck2["default"])(this, TendermintWS);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "url", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "connected", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "closed", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "timeout", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "socket", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "autoReconnect", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "isAlive", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "subscriptions", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "calls", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "connectPromise", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "resolveConnect", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "rejectConnect", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "waitForConnection", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "monitor", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "reconnecting", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "callId", void 0);
    _this.url = server;
    _this.connected = false;
    _this.closed = false;
    _this.autoReconnect = autoReconnect;
    _this.timeout = timeout;
    _this.isAlive = false;
    _this.subscriptions = new Map();
    _this.connectPromise = null;
    _this.calls = new Map();
    return (0, _possibleConstructorReturn2["default"])(_this, (0, _assertThisInitialized2["default"])(_this));
  }

  (0, _createClass2["default"])(TendermintWS, [{
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _this2 = this;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.connectPromise !== null)) {
                  _context.next = 12;
                  break;
                }

                if (!(this.connectPromise.state == 'pending')) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", this.connectPromise);

              case 3:
                if (!(this.connectPromise.state == 'fulfilled')) {
                  _context.next = 10;
                  break;
                }

                if (!this.connected) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", this.connectPromise);

              case 8:
                // If disconnected, try again
                this.connectPromise = new Promise(function (res, rej) {
                  _this2.resolveConnect = res;
                  _this2.rejectConnect = rej;
                });
                this.connectPromise.state = 'pending';

              case 10:
                _context.next = 14;
                break;

              case 12:
                // First connection
                this.connectPromise = new Promise(function (res, rej) {
                  _this2.resolveConnect = res;
                  _this2.rejectConnect = rej;
                });
                this.connectPromise.state = 'pending';

              case 14:
                _context.prev = 14;
                // Start Timeout
                this.waitForConnection = setTimeout(function () {
                  _this2.connectPromise.state = 'fulfilled';

                  _this2.rejectConnect('Connection timed out');
                }, this.timeout);
                this.socket = new _isomorphicWs["default"](this.url);
                this.socket.onopen = this.onOpen.bind(this);
                this.socket.onerror = this.onError.bind(this);
                this.socket.onmessage = this.onMessage.bind(this);
                this.socket.onclose = this.onClose.bind(this);
                this.socket.on('pong', this.heartbeat.bind(this));
                return _context.abrupt("return", this.connectPromise);

              case 25:
                _context.prev = 25;
                _context.t0 = _context["catch"](14);
                this.socket = {
                  readyState: 3,
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  close: function close() {}
                };
                this.connectPromise.state = 'fulfilled';
                this.rejectConnect('Invalid URL: ' + this.url);

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[14, 25]]);
      }));

      function connect() {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "onMessage",
    value: function onMessage(message) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      var response = JSON.parse(message.data);
      console.log(response);

      if (SOCKET_DEBUG) {
        console.log("CWS-Debug: <<< " + JSON.stringify(response));
      }
    }
  }, {
    key: "onOpen",
    value: function onOpen() {
      var _this3 = this;

      clearTimeout(this.waitForConnection);
      this.emit('status', {
        state: 'connected',
        data: this.url
      });

      if (this.reconnecting) {
        this.emit('status', {
          state: 'reconnected',
          data: this.url
        });
        this.reconnecting = false;
      }

      this.isAlive = true;
      this.monitor = setInterval(function () {
        if (_this3.isAlive === false) {
          _this3.emit('status', {
            state: 'disconnected',
            data: 'Keep-alive timed out'
          }); // Clean close connectioon


          _this3.onClose();
        }

        _this3.socket.ping(_this3.noop.bind(_this3));
      }, 5000);
      this.calls = new Map();
      this.callId = 0;
      this.connectPromise.state = 'fulfilled';
      this.resolveConnect(this);
    }
  }, {
    key: "onError",
    value: function onError(error) {
      if (this.monitor) {
        clearInterval(this.monitor);
        this.monitor = undefined;
      }

      clearTimeout(this.waitForConnection);
      this.emit('status', {
        state: 'error',
        data: error
      });
      this.connectPromise.state = 'fulfilled';
      this.rejectConnect(error);
    }
  }, {
    key: "onClose",
    value: function onClose() {
      var _this4 = this;

      this.closed = true;
      this.connected = false;

      if (this.monitor) {
        clearInterval(this.monitor);
        this.monitor = undefined;
      }

      var _iterator = _createForOfIteratorHelper(this.calls),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
              call = _step$value[1];

          call.reject(new Error('connection closed'));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.emit('status', {
        state: 'closed',
        data: null
      });

      if (this.autoReconnect) {
        setTimeout(function () {
          _this4.reconnecting = true;

          try {
            _this4.connect();
          } catch (e) {
            _this4.emit('status', {
              state: 'error',
              data: e
            });
          }
        }, 1000);
      }
    }
  }, {
    key: "close",
    value: function close() {
      var _this5 = this;

      return new Promise(function (res) {
        clearInterval(_this5.monitor);
        _this5.monitor = undefined;

        if (!_this5.socket) {
          console.log('Websocket already cleared', _this5);
          return res();
        }

        if (_this5.socket.terminate) {
          _this5.socket.terminate();
        } else {
          _this5.socket.close();
        }

        if (_this5.socket.readyState === 3) res();
      });
    }
  }, {
    key: "heartbeat",
    value: function heartbeat() {
      if (SOCKET_DEBUG) {
        console.log('CWS-Debug: <<< PONG');
      }

      this.isAlive = true;
    }
  }, {
    key: "noop",
    value: function noop() {
      if (SOCKET_DEBUG) {
        console.log('CWS-Debug: >>> PING');
      }
    }
  }]);
  return TendermintWS;
}(_events["default"]);

exports["default"] = TendermintWS;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJTT0NLRVRfREVCVUciLCJUZW5kZXJtaW50V1MiLCJzZXJ2ZXIiLCJ0aW1lb3V0IiwiYXV0b1JlY29ubmVjdCIsInVybCIsImNvbm5lY3RlZCIsImNsb3NlZCIsImlzQWxpdmUiLCJzdWJzY3JpcHRpb25zIiwiTWFwIiwiY29ubmVjdFByb21pc2UiLCJjYWxscyIsInN0YXRlIiwiUHJvbWlzZSIsInJlcyIsInJlaiIsInJlc29sdmVDb25uZWN0IiwicmVqZWN0Q29ubmVjdCIsIndhaXRGb3JDb25uZWN0aW9uIiwic2V0VGltZW91dCIsInNvY2tldCIsIldlYlNvY2tldCIsIm9ub3BlbiIsIm9uT3BlbiIsImJpbmQiLCJvbmVycm9yIiwib25FcnJvciIsIm9ubWVzc2FnZSIsIm9uTWVzc2FnZSIsIm9uY2xvc2UiLCJvbkNsb3NlIiwib24iLCJoZWFydGJlYXQiLCJyZWFkeVN0YXRlIiwiY2xvc2UiLCJtZXNzYWdlIiwicmVzcG9uc2UiLCJKU09OIiwicGFyc2UiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsInN0cmluZ2lmeSIsImNsZWFyVGltZW91dCIsImVtaXQiLCJyZWNvbm5lY3RpbmciLCJtb25pdG9yIiwic2V0SW50ZXJ2YWwiLCJwaW5nIiwibm9vcCIsImNhbGxJZCIsImVycm9yIiwiY2xlYXJJbnRlcnZhbCIsInVuZGVmaW5lZCIsImNhbGwiLCJyZWplY3QiLCJFcnJvciIsImNvbm5lY3QiLCJlIiwidGVybWluYXRlIiwiRXZlbnRFbWl0dGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxZQUFZLEdBQUcsS0FBckI7O0lBbUJxQkMsWTs7Ozs7QUFrQm5CLDBCQU1FO0FBQUE7O0FBQUEsbUZBTDhDO0FBQzVDQyxNQUFBQSxNQUFNLEVBQUUsb0NBRG9DO0FBRTVDQyxNQUFBQSxPQUFPLEVBQUUsS0FGbUM7QUFH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QUFDakMsTUFBVixFQUFrQjtBQUNoQm9CLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDJCQUFaLEVBQXlDLE1BQXpDO0FBQ0EsaUJBQU8zQixHQUFHLEVBQVY7QUFDRDs7QUFFRCxZQUFJLE1BQUksQ0FBQ00sTUFBTCxDQUFZdUMsU0FBaEIsRUFBMkI7QUFDekIsVUFBQSxNQUFJLENBQUN2QyxNQUFMLENBQVl1QyxTQUFaO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsVUFBQSxNQUFJLENBQUN2QyxNQUFMLENBQVljLEtBQVo7QUFDRDs7QUFFRCxZQUFJLE1BQUksQ0FBQ2QsTUFBTCxDQUFZYSxVQUFaLEtBQTJCLENBQS9CLEVBQWtDbkIsR0FBRztBQUN0QyxPQWZNLENBQVA7QUFnQkQ7OztXQUNELHFCQUFrQjtBQUNoQixVQUFJZixZQUFKLEVBQWtCO0FBQ2hCeUMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQVo7QUFDRDs7QUFDRCxXQUFLbEMsT0FBTCxHQUFlLElBQWY7QUFDRDs7O1dBRUQsZ0JBQWE7QUFDWCxVQUFJUixZQUFKLEVBQWtCO0FBQ2hCeUMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQVo7QUFDRDtBQUNGOzs7RUE1THVDbUIsa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViU29ja2V0IGZyb20gJ2lzb21vcnBoaWMtd3MnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnO1xuY29uc3QgU09DS0VUX0RFQlVHID0gZmFsc2U7XG5leHBvcnQgaW50ZXJmYWNlIElTdWJzY3JpcHRpb24ge1xuICBjYWxsYmFjazogc3RyaW5nO1xufVxuZXhwb3J0IGludGVyZmFjZSBJQ2FsbCB7XG4gIGRhdGU6IG51bWJlcjtcbiAgcmVzb2x2ZTogKHZhbHVlPzogdW5rbm93biB8IFByb21pc2VMaWtlPHVua25vd24+KSA9PiB2b2lkO1xuICByZWplY3Q6IChyZWFzb24/OiBFcnJvcikgPT4gdm9pZDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZyB7XG4gIHNlcnZlcjogc3RyaW5nO1xuICB0aW1lb3V0OiBudW1iZXI7XG4gIGF1dG9SZWNvbm5lY3Q6IGJvb2xlYW47XG59XG5leHBvcnQgaW50ZXJmYWNlIElQcm9taXNlU3RhdGVzIHtcbiAgc3RhdGU/OiAncGVuZGluZycgfCAnZnVsZmlsbGVkJztcbn1cbmV4cG9ydCB0eXBlIFN0YXRlZnVsUHJvbWlzZTxUPiA9IFByb21pc2U8VD4gJiBJUHJvbWlzZVN0YXRlcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVuZGVybWludFdTIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgcHVibGljIHVybDogc3RyaW5nO1xuICBwdWJsaWMgY29ubmVjdGVkOiBib29sZWFuO1xuICBwdWJsaWMgY2xvc2VkOiBib29sZWFuO1xuICBwcml2YXRlIHRpbWVvdXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBzb2NrZXQ6IFdlYlNvY2tldDtcbiAgcHJpdmF0ZSBhdXRvUmVjb25uZWN0OiBib29sZWFuO1xuICBwcml2YXRlIGlzQWxpdmU6IGJvb2xlYW47XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogTWFwPG51bWJlciwgSVN1YnNjcmlwdGlvbj47XG4gIHByaXZhdGUgY2FsbHM6IE1hcDxudW1iZXIsIElDYWxsPjtcbiAgcHJpdmF0ZSBjb25uZWN0UHJvbWlzZTogU3RhdGVmdWxQcm9taXNlPFRlbmRlcm1pbnRXUz4gfCBudWxsO1xuICBwcml2YXRlIHJlc29sdmVDb25uZWN0OiAodmFsdWU/OiBUZW5kZXJtaW50V1MgfCBQcm9taXNlTGlrZTxUZW5kZXJtaW50V1M+KSA9PiB2b2lkO1xuICBwcml2YXRlIHJlamVjdENvbm5lY3Q6IChyZWFzb24/OiBzdHJpbmcpID0+IHZvaWQ7XG4gIHByaXZhdGUgd2FpdEZvckNvbm5lY3Rpb246IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+O1xuICBwcml2YXRlIG1vbml0b3I6IFJldHVyblR5cGU8dHlwZW9mIHNldEludGVydmFsPjtcbiAgcHJpdmF0ZSByZWNvbm5lY3Rpbmc6IGJvb2xlYW47XG4gIHByaXZhdGUgY2FsbElkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgeyBzZXJ2ZXIsIHRpbWVvdXQsIGF1dG9SZWNvbm5lY3QgfTogSUNvbmZpZyA9IHtcbiAgICAgIHNlcnZlcjogJ3dzczovL3JwYy5jb3Ntb3MubmV0d29yay93ZWJzb2NrZXQnLFxuICAgICAgdGltZW91dDogMTUwMDAsXG4gICAgICBhdXRvUmVjb25uZWN0OiB0cnVlLFxuICAgIH0sXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy51cmwgPSBzZXJ2ZXI7XG4gICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgIHRoaXMuYXV0b1JlY29ubmVjdCA9IGF1dG9SZWNvbm5lY3Q7XG4gICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgICB0aGlzLmlzQWxpdmUgPSBmYWxzZTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5jb25uZWN0UHJvbWlzZSA9IG51bGw7XG4gICAgdGhpcy5jYWxscyA9IG5ldyBNYXAoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYXN5bmMgY29ubmVjdCgpOlByb21pc2U8VGVuZGVybWludFdTPiB7XG4gICAgaWYgKHRoaXMuY29ubmVjdFByb21pc2UgIT09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLmNvbm5lY3RQcm9taXNlLnN0YXRlID09ICdwZW5kaW5nJykge1xuICAgICAgICAvLyBJZiBhbHJlYWR5IHdhaXRpbmcgdG8gY29ubmVjdCwgZG8gbm90IHJlYXR0ZW1wdDtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdFByb21pc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbm5lY3RQcm9taXNlLnN0YXRlID09ICdmdWxmaWxsZWQnKSB7XG4gICAgICAgIC8vIElmIGFscmVhZHkgY29ubmVjdGVkIGluIHRoZSBwYXN0XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgIC8vIElmIGN1cnJlbnRseSBjb25uZWN0ZWQsIGp1c3QgcmV0dXJuXG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdFByb21pc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSWYgZGlzY29ubmVjdGVkLCB0cnkgYWdhaW5cblxuICAgICAgICAgIHRoaXMuY29ubmVjdFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZUNvbm5lY3QgPSByZXM7XG4gICAgICAgICAgICB0aGlzLnJlamVjdENvbm5lY3QgPSByZWo7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5jb25uZWN0UHJvbWlzZS5zdGF0ZSA9ICdwZW5kaW5nJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBGaXJzdCBjb25uZWN0aW9uXG4gICAgICB0aGlzLmNvbm5lY3RQcm9taXNlID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgIHRoaXMucmVzb2x2ZUNvbm5lY3QgPSByZXM7XG4gICAgICAgIHRoaXMucmVqZWN0Q29ubmVjdCA9IHJlajtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmNvbm5lY3RQcm9taXNlLnN0YXRlID0gJ3BlbmRpbmcnO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gU3RhcnQgVGltZW91dFxuICAgICAgdGhpcy53YWl0Rm9yQ29ubmVjdGlvbiA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbm5lY3RQcm9taXNlLnN0YXRlID0gJ2Z1bGZpbGxlZCc7XG4gICAgICAgIHRoaXMucmVqZWN0Q29ubmVjdCgnQ29ubmVjdGlvbiB0aW1lZCBvdXQnKTtcbiAgICAgIH0sIHRoaXMudGltZW91dCk7XG4gICAgICB0aGlzLnNvY2tldCA9IG5ldyBXZWJTb2NrZXQodGhpcy51cmwpO1xuICAgICAgdGhpcy5zb2NrZXQub25vcGVuID0gdGhpcy5vbk9wZW4uYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuc29ja2V0Lm9uZXJyb3IgPSB0aGlzLm9uRXJyb3IuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuc29ja2V0Lm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLnNvY2tldC5vbmNsb3NlID0gdGhpcy5vbkNsb3NlLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLnNvY2tldC5vbigncG9uZycsIHRoaXMuaGVhcnRiZWF0LmJpbmQodGhpcykpO1xuICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdFByb21pc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5zb2NrZXQgPSB7XG4gICAgICAgIHJlYWR5U3RhdGU6IDMsXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb25cbiAgICAgICAgY2xvc2U6ICgpID0+IHt9LFxuICAgICAgfTtcbiAgICAgIHRoaXMuY29ubmVjdFByb21pc2Uuc3RhdGUgPSAnZnVsZmlsbGVkJztcbiAgICAgIHRoaXMucmVqZWN0Q29ubmVjdCgnSW52YWxpZCBVUkw6ICcgKyB0aGlzLnVybCk7XG4gICAgfVxuICB9XG5cblx0b25NZXNzYWdlKG1lc3NhZ2U6TWVzc2FnZUV2ZW50KTp2b2lkIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRcdGNvbnN0IHJlc3BvbnNlOmFueT1KU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XG5cdFx0Y29uc29sZS5sb2cocmVzcG9uc2UpO1xuXHRcdGlmIChTT0NLRVRfREVCVUcpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJDV1MtRGVidWc6IDw8PCBcIitKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xuXHRcdH1cblx0fVxuXG4gIG9uT3BlbigpOiB2b2lkIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy53YWl0Rm9yQ29ubmVjdGlvbik7XG4gICAgdGhpcy5lbWl0KCdzdGF0dXMnLCB7IHN0YXRlOiAnY29ubmVjdGVkJywgZGF0YTogdGhpcy51cmwgfSk7XG4gICAgaWYgKHRoaXMucmVjb25uZWN0aW5nKSB7XG4gICAgICB0aGlzLmVtaXQoJ3N0YXR1cycsIHsgc3RhdGU6ICdyZWNvbm5lY3RlZCcsIGRhdGE6IHRoaXMudXJsIH0pO1xuICAgICAgdGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5pc0FsaXZlID0gdHJ1ZTtcbiAgICB0aGlzLm1vbml0b3IgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc0FsaXZlID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLmVtaXQoJ3N0YXR1cycsIHsgc3RhdGU6ICdkaXNjb25uZWN0ZWQnLCBkYXRhOiAnS2VlcC1hbGl2ZSB0aW1lZCBvdXQnIH0pO1xuICAgICAgICAvLyBDbGVhbiBjbG9zZSBjb25uZWN0aW9vblxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc29ja2V0LnBpbmcodGhpcy5ub29wLmJpbmQodGhpcykpO1xuICAgIH0sIDUwMDApO1xuICAgIHRoaXMuY2FsbHMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5jYWxsSWQgPSAwO1xuICAgIHRoaXMuY29ubmVjdFByb21pc2Uuc3RhdGUgPSAnZnVsZmlsbGVkJztcbiAgICB0aGlzLnJlc29sdmVDb25uZWN0KHRoaXMpO1xuICB9XG5cbiAgb25FcnJvcihlcnJvcjpzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb25pdG9yKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMubW9uaXRvcik7XG4gICAgICB0aGlzLm1vbml0b3IgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNsZWFyVGltZW91dCh0aGlzLndhaXRGb3JDb25uZWN0aW9uKTtcbiAgICB0aGlzLmVtaXQoJ3N0YXR1cycsIHsgc3RhdGU6ICdlcnJvcicsIGRhdGE6IGVycm9yIH0pO1xuXG4gICAgdGhpcy5jb25uZWN0UHJvbWlzZS5zdGF0ZSA9ICdmdWxmaWxsZWQnO1xuICAgIHRoaXMucmVqZWN0Q29ubmVjdChlcnJvcik7XG4gIH1cblxuICBvbkNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLm1vbml0b3IpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5tb25pdG9yKTtcbiAgICAgIHRoaXMubW9uaXRvciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBbLCBjYWxsXSBvZiB0aGlzLmNhbGxzKSB7XG4gICAgICBjYWxsLnJlamVjdChuZXcgRXJyb3IoJ2Nvbm5lY3Rpb24gY2xvc2VkJykpO1xuICAgIH1cbiAgICB0aGlzLmVtaXQoJ3N0YXR1cycsIHsgc3RhdGU6ICdjbG9zZWQnLCBkYXRhOiBudWxsIH0pO1xuICAgIGlmICh0aGlzLmF1dG9SZWNvbm5lY3QpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlY29ubmVjdGluZyA9IHRydWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhpcy5jb25uZWN0KCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aGlzLmVtaXQoJ3N0YXR1cycsIHsgc3RhdGU6ICdlcnJvcicsIGRhdGE6IGUgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgfVxuICBjbG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcykgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLm1vbml0b3IpO1xuICAgICAgdGhpcy5tb25pdG9yID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKCF0aGlzLnNvY2tldCkge1xuICAgICAgICBjb25zb2xlLmxvZygnV2Vic29ja2V0IGFscmVhZHkgY2xlYXJlZCcsIHRoaXMpO1xuICAgICAgICByZXR1cm4gcmVzKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnNvY2tldC50ZXJtaW5hdGUpIHtcbiAgICAgICAgdGhpcy5zb2NrZXQudGVybWluYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNvY2tldC5jbG9zZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5zb2NrZXQucmVhZHlTdGF0ZSA9PT0gMykgcmVzKCk7XG4gICAgfSk7XG4gIH1cbiAgaGVhcnRiZWF0KCk6IHZvaWQge1xuICAgIGlmIChTT0NLRVRfREVCVUcpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdDV1MtRGVidWc6IDw8PCBQT05HJyk7XG4gICAgfVxuICAgIHRoaXMuaXNBbGl2ZSA9IHRydWU7XG4gIH1cblxuICBub29wKCk6IHZvaWQge1xuICAgIGlmIChTT0NLRVRfREVCVUcpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdDV1MtRGVidWc6ID4+PiBQSU5HJyk7XG4gICAgfVxuICB9XG59XG4iXX0=