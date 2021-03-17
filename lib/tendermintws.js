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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "requests", void 0);
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
    _this.requests = new Map();
    _this.connectPromise = null;
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
      var handler = this.requests.get(response.id);

      if (handler && response.result.query) {
        if (handler.type == 'Subscription') {
          handler.callback(response.result);
        }

        if (handler.type == 'Call') {
          handler.resolve(response.result);
          this.requests["delete"](response.id);
        }
      }

      if (SOCKET_DEBUG) {
        console.log('CWS-Debug: <<< ' + JSON.stringify(response));
      }
    }
  }, {
    key: "subscribe",
    value: function subscribe(params, callback) {
      this.callId++;
      var subscriptionQuery = {
        jsonrpc: "2.0",
        method: "subscribe",
        id: this.callId,
        params: params
      };
      this.requests.set(this.callId, {
        type: 'Subscription',
        callback: callback
      });
      this.socket.send(JSON.stringify(subscriptionQuery));
    }
  }, {
    key: "call",
    value: function () {
      var _call = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(method, params) {
        var callQuery, responseResolve, responseReject, responsePromise;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.callId++;
                callQuery = {
                  jsonrpc: "2.0",
                  method: method,
                  id: this.callId,
                  params: params
                };
                responsePromise = new Promise(function (res, rej) {
                  responseResolve = res;
                  responseReject = rej;
                });
                this.requests.set(this.callId, {
                  type: 'Call',
                  date: Date.now(),
                  resolve: responseResolve,
                  reject: responseReject
                });
                this.socket.send(JSON.stringify(callQuery));
                return _context2.abrupt("return", responsePromise);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function call(_x, _x2) {
        return _call.apply(this, arguments);
      }

      return call;
    }()
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
      this.requests = new Map();
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

      var _iterator = _createForOfIteratorHelper(this.requests),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
              request = _step$value[1];

          if (request.type == 'Call') {
            request.reject(new Error('connection closed'));
          }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZW5kZXJtaW50d3MudHMiXSwibmFtZXMiOlsiU09DS0VUX0RFQlVHIiwiVGVuZGVybWludFdTIiwic2VydmVyIiwidGltZW91dCIsImF1dG9SZWNvbm5lY3QiLCJ1cmwiLCJjb25uZWN0ZWQiLCJjbG9zZWQiLCJpc0FsaXZlIiwicmVxdWVzdHMiLCJNYXAiLCJjb25uZWN0UHJvbWlzZSIsInN0YXRlIiwiUHJvbWlzZSIsInJlcyIsInJlaiIsInJlc29sdmVDb25uZWN0IiwicmVqZWN0Q29ubmVjdCIsIndhaXRGb3JDb25uZWN0aW9uIiwic2V0VGltZW91dCIsInNvY2tldCIsIldlYlNvY2tldCIsIm9ub3BlbiIsIm9uT3BlbiIsImJpbmQiLCJvbmVycm9yIiwib25FcnJvciIsIm9ubWVzc2FnZSIsIm9uTWVzc2FnZSIsIm9uY2xvc2UiLCJvbkNsb3NlIiwib24iLCJoZWFydGJlYXQiLCJyZWFkeVN0YXRlIiwiY2xvc2UiLCJtZXNzYWdlIiwicmVzcG9uc2UiLCJKU09OIiwicGFyc2UiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImhhbmRsZXIiLCJnZXQiLCJpZCIsInJlc3VsdCIsInF1ZXJ5IiwidHlwZSIsImNhbGxiYWNrIiwicmVzb2x2ZSIsInN0cmluZ2lmeSIsInBhcmFtcyIsImNhbGxJZCIsInN1YnNjcmlwdGlvblF1ZXJ5IiwianNvbnJwYyIsIm1ldGhvZCIsInNldCIsInNlbmQiLCJjYWxsUXVlcnkiLCJyZXNwb25zZVByb21pc2UiLCJyZXNwb25zZVJlc29sdmUiLCJyZXNwb25zZVJlamVjdCIsImRhdGUiLCJEYXRlIiwibm93IiwicmVqZWN0IiwiY2xlYXJUaW1lb3V0IiwiZW1pdCIsInJlY29ubmVjdGluZyIsIm1vbml0b3IiLCJzZXRJbnRlcnZhbCIsInBpbmciLCJub29wIiwiZXJyb3IiLCJjbGVhckludGVydmFsIiwidW5kZWZpbmVkIiwicmVxdWVzdCIsIkVycm9yIiwiY29ubmVjdCIsImUiLCJ0ZXJtaW5hdGUiLCJFdmVu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QUFPM0IsR0FBRyxFQUFWO0FBQ0E7O0FBRUQsWUFBSSxNQUFJLENBQUNNLE1BQUwsQ0FBWTRELFNBQWhCLEVBQTJCO0FBQzFCLFVBQUEsTUFBSSxDQUFDNUQsTUFBTCxDQUFZNEQsU0FBWjtBQUNBLFNBRkQsTUFFTztBQUNOLFVBQUEsTUFBSSxDQUFDNUQsTUFBTCxDQUFZYyxLQUFaO0FBQ0E7O0FBRUQsWUFBSSxNQUFJLENBQUNkLE1BQUwsQ0FBWWEsVUFBWixLQUEyQixDQUEvQixFQUFrQ25CLEdBQUc7QUFDckMsT0FmTSxDQUFQO0FBZ0JBOzs7V0FDRCxxQkFBa0I7QUFDakIsVUFBSWQsWUFBSixFQUFrQjtBQUNqQndDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFCQUFaO0FBQ0E7O0FBQ0QsV0FBS2pDLE9BQUwsR0FBZSxJQUFmO0FBQ0E7OztXQUVELGdCQUFhO0FBQ1osVUFBSVIsWUFBSixFQUFrQjtBQUNqQndDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFCQUFaO0FBQ0E7QUFDRDs7O0VBMU93Q3dDLGtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdlYlNvY2tldCBmcm9tICdpc29tb3JwaGljLXdzJztcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnO1xyXG5jb25zdCBTT0NLRVRfREVCVUcgPSBmYWxzZTtcclxuZXhwb3J0IHR5cGUgU3Vic2NyaXB0aW9uID0ge1xyXG5cdGNhbGxiYWNrOiAoZGF0YTogdW5rbm93bikgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgdHlwZSBDYWxsID0ge1xyXG5cdGRhdGU6IG51bWJlcjtcclxuXHRyZXNvbHZlOiAodmFsdWU/OiB1bmtub3duIHwgUHJvbWlzZUxpa2U8dW5rbm93bj4pID0+IHZvaWQ7XHJcblx0cmVqZWN0OiAocmVhc29uPzogRXJyb3IpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJUmVxdWVzdCB7XHJcblx0dHlwZTogJ1N1YnNjcmlwdGlvbicgfCAnQ2FsbCdcclxufVxyXG5leHBvcnQgdHlwZSBSZXF1ZXN0ID0gKCBTdWJzY3JpcHRpb24gfCBDYWxsICkgJiBJUmVxdWVzdDtcclxuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnIHtcclxuXHRzZXJ2ZXI6IHN0cmluZztcclxuXHR0aW1lb3V0OiBudW1iZXI7XHJcblx0YXV0b1JlY29ubmVjdDogYm9vbGVhbjtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElQcm9taXNlU3RhdGVzIHtcclxuXHRzdGF0ZT86ICdwZW5kaW5nJyB8ICdmdWxmaWxsZWQnO1xyXG59XHJcbmV4cG9ydCB0eXBlIFN0YXRlZnVsUHJvbWlzZTxUPiA9IFByb21pc2U8VD4gJiBJUHJvbWlzZVN0YXRlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlbmRlcm1pbnRXUyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblx0cHVibGljIHVybDogc3RyaW5nO1xyXG5cdHB1YmxpYyBjb25uZWN0ZWQ6IGJvb2xlYW47XHJcblx0cHVibGljIGNsb3NlZDogYm9vbGVhbjtcclxuXHRwcml2YXRlIHRpbWVvdXQ6IG51bWJlcjtcclxuXHRwcml2YXRlIHNvY2tldDogV2ViU29ja2V0O1xyXG5cdHByaXZhdGUgYXV0b1JlY29ubmVjdDogYm9vbGVhbjtcclxuXHRwcml2YXRlIGlzQWxpdmU6IGJvb2xlYW47XHJcblx0cHJpdmF0ZSByZXF1ZXN0czogTWFwPG51bWJlciwgUmVxdWVzdD47XHJcblx0cHJpdmF0ZSBjb25uZWN0UHJvbWlzZTogU3RhdGVmdWxQcm9taXNlPFRlbmRlcm1pbnRXUz4gfCBudWxsO1xyXG5cdHByaXZhdGUgcmVzb2x2ZUNvbm5lY3Q6ICh2YWx1ZT86IFRlbmRlcm1pbnRXUyB8IFByb21pc2VMaWtlPFRlbmRlcm1pbnRXUz4pID0+IHZvaWQ7XHJcblx0cHJpdmF0ZSByZWplY3RDb25uZWN0OiAocmVhc29uPzogc3RyaW5nKSA9PiB2b2lkO1xyXG5cdHByaXZhdGUgd2FpdEZvckNvbm5lY3Rpb246IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+O1xyXG5cdHByaXZhdGUgbW9uaXRvcjogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0SW50ZXJ2YWw+O1xyXG5cdHByaXZhdGUgcmVjb25uZWN0aW5nOiBib29sZWFuO1xyXG5cdHByaXZhdGUgY2FsbElkOiBudW1iZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0eyBzZXJ2ZXIsIHRpbWVvdXQsIGF1dG9SZWNvbm5lY3QgfTogSUNvbmZpZyA9IHtcclxuXHRcdFx0c2VydmVyOiAnd3NzOi8vcnBjLmNvc21vcy5uZXR3b3JrL3dlYnNvY2tldCcsXHJcblx0XHRcdHRpbWVvdXQ6IDE1MDAwLFxyXG5cdFx0XHRhdXRvUmVjb25uZWN0OiB0cnVlLFxyXG5cdFx0fSxcclxuXHQpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLnVybCA9IHNlcnZlcjtcclxuXHRcdHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmNsb3NlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5hdXRvUmVjb25uZWN0ID0gYXV0b1JlY29ubmVjdDtcclxuXHRcdHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XHJcblx0XHR0aGlzLmlzQWxpdmUgPSBmYWxzZTtcclxuXHRcdHRoaXMucmVxdWVzdHMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLmNvbm5lY3RQcm9taXNlID0gbnVsbDtcclxuXHRcdFxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY29ubmVjdCgpOiBQcm9taXNlPFRlbmRlcm1pbnRXUz4ge1xyXG5cdFx0aWYgKHRoaXMuY29ubmVjdFByb21pc2UgIT09IG51bGwpIHtcclxuXHRcdFx0aWYgKHRoaXMuY29ubmVjdFByb21pc2Uuc3RhdGUgPT0gJ3BlbmRpbmcnKSB7XHJcblx0XHRcdFx0Ly8gSWYgYWxyZWFkeSB3YWl0aW5nIHRvIGNvbm5lY3QsIGRvIG5vdCByZWF0dGVtcHQ7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29ubmVjdFByb21pc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLmNvbm5lY3RQcm9taXNlLnN0YXRlID09ICdmdWxmaWxsZWQnKSB7XHJcblx0XHRcdFx0Ly8gSWYgYWxyZWFkeSBjb25uZWN0ZWQgaW4gdGhlIHBhc3RcclxuXHRcdFx0XHRpZiAodGhpcy5jb25uZWN0ZWQpIHtcclxuXHRcdFx0XHRcdC8vIElmIGN1cnJlbnRseSBjb25uZWN0ZWQsIGp1c3QgcmV0dXJuXHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5jb25uZWN0UHJvbWlzZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gSWYgZGlzY29ubmVjdGVkLCB0cnkgYWdhaW5cclxuXHJcblx0XHRcdFx0XHR0aGlzLmNvbm5lY3RQcm9taXNlID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMucmVzb2x2ZUNvbm5lY3QgPSByZXM7XHJcblx0XHRcdFx0XHRcdHRoaXMucmVqZWN0Q29ubmVjdCA9IHJlajtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0dGhpcy5jb25uZWN0UHJvbWlzZS5zdGF0ZSA9ICdwZW5kaW5nJztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIEZpcnN0IGNvbm5lY3Rpb25cclxuXHRcdFx0dGhpcy5jb25uZWN0UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xyXG5cdFx0XHRcdHRoaXMucmVzb2x2ZUNvbm5lY3QgPSByZXM7XHJcblx0XHRcdFx0dGhpcy5yZWplY3RDb25uZWN0ID0gcmVqO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoaXMuY29ubmVjdFByb21pc2Uuc3RhdGUgPSAncGVuZGluZyc7XHJcblx0XHR9XHJcblx0XHR0cnkge1xyXG5cdFx0XHQvLyBTdGFydCBUaW1lb3V0XHJcblx0XHRcdHRoaXMud2FpdEZvckNvbm5lY3Rpb24gPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHR0aGlzLmNvbm5lY3RQcm9taXNlLnN0YXRlID0gJ2Z1bGZpbGxlZCc7XHJcblx0XHRcdFx0dGhpcy5yZWplY3RDb25uZWN0KCdDb25uZWN0aW9uIHRpbWVkIG91dCcpO1xyXG5cdFx0XHR9LCB0aGlzLnRpbWVvdXQpO1xyXG5cdFx0XHR0aGlzLnNvY2tldCA9IG5ldyBXZWJTb2NrZXQodGhpcy51cmwpO1xyXG5cdFx0XHR0aGlzLnNvY2tldC5vbm9wZW4gPSB0aGlzLm9uT3Blbi5iaW5kKHRoaXMpO1xyXG5cdFx0XHR0aGlzLnNvY2tldC5vbmVycm9yID0gdGhpcy5vbkVycm9yLmJpbmQodGhpcyk7XHJcblx0XHRcdHRoaXMuc29ja2V0Lm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XHJcblx0XHRcdHRoaXMuc29ja2V0Lm9uY2xvc2UgPSB0aGlzLm9uQ2xvc2UuYmluZCh0aGlzKTtcclxuXHRcdFx0dGhpcy5zb2NrZXQub24oJ3BvbmcnLCB0aGlzLmhlYXJ0YmVhdC5iaW5kKHRoaXMpKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuY29ubmVjdFByb21pc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHRoaXMuc29ja2V0ID0ge1xyXG5cdFx0XHRcdHJlYWR5U3RhdGU6IDMsXHJcblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxyXG5cdFx0XHRcdGNsb3NlOiAoKSA9PiB7fSxcclxuXHRcdFx0fTtcclxuXHRcdFx0dGhpcy5jb25uZWN0UHJvbWlzZS5zdGF0ZSA9ICdmdWxmaWxsZWQnO1xyXG5cdFx0XHR0aGlzLnJlamVjdENvbm5lY3QoJ0ludmFsaWQgVVJMOiAnICsgdGhpcy51cmwpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25NZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2VFdmVudCk6IHZvaWQge1xyXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuXHRcdGNvbnN0IHJlc3BvbnNlOiBhbnkgPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XHJcblx0XHRjb25zb2xlLmxvZyhyZXNwb25zZSlcclxuXHRcdGNvbnN0IGhhbmRsZXI6UmVxdWVzdCA9IHRoaXMucmVxdWVzdHMuZ2V0KHJlc3BvbnNlLmlkKTtcclxuXHRcdGlmKGhhbmRsZXIgJiYgcmVzcG9uc2UucmVzdWx0LnF1ZXJ5KSB7XHJcblx0XHRcdGlmIChoYW5kbGVyLnR5cGU9PSdTdWJzY3JpcHRpb24nKSAge1xyXG5cdFx0XHRcdCg8U3Vic2NyaXB0aW9uPiBoYW5kbGVyKS5jYWxsYmFjayhyZXNwb25zZS5yZXN1bHQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChoYW5kbGVyLnR5cGU9PSdDYWxsJykgIHtcclxuXHRcdFx0XHQoPENhbGw+IGhhbmRsZXIpLnJlc29sdmUocmVzcG9uc2UucmVzdWx0KTtcclxuXHRcdFx0XHR0aGlzLnJlcXVlc3RzLmRlbGV0ZShyZXNwb25zZS5pZCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmIChTT0NLRVRfREVCVUcpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ0NXUy1EZWJ1ZzogPDw8ICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3Vic2NyaWJlKHBhcmFtczpzdHJpbmdbXSxjYWxsYmFjazooZGF0YSk9PnZvaWQpOnZvaWQge1xyXG5cdFx0dGhpcy5jYWxsSWQrKztcclxuXHRcdGNvbnN0IHN1YnNjcmlwdGlvblF1ZXJ5ID0ge1xyXG5cdFx0XHRqc29ucnBjOiBcIjIuMFwiLFxyXG5cdFx0XHRtZXRob2Q6IFwic3Vic2NyaWJlXCIsXHJcblx0XHRcdGlkOiB0aGlzLmNhbGxJZCxcclxuXHRcdFx0cGFyYW1zXHJcblx0XHR9XHJcblx0XHR0aGlzLnJlcXVlc3RzLnNldCh0aGlzLmNhbGxJZCwgeyB0eXBlOiAnU3Vic2NyaXB0aW9uJywgY2FsbGJhY2t9KTtcclxuXHRcdHRoaXMuc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoc3Vic2NyaXB0aW9uUXVlcnkpKTtcclxuXHR9XHJcbiAgYXN5bmMgY2FsbChtZXRob2Q6c3RyaW5nLHBhcmFtczp1bmtub3duW10pOlByb21pc2U8dW5rbm93bj4ge1xyXG5cdFx0dGhpcy5jYWxsSWQrKztcclxuXHRcdGNvbnN0IGNhbGxRdWVyeSA9IHtcclxuXHRcdFx0anNvbnJwYzogXCIyLjBcIixcclxuXHRcdFx0bWV0aG9kOiBtZXRob2QsXHJcblx0XHRcdGlkOiB0aGlzLmNhbGxJZCxcclxuXHRcdFx0cGFyYW1zXHJcblx0XHR9XHJcblx0XHRsZXQgcmVzcG9uc2VSZXNvbHZlLHJlc3BvbnNlUmVqZWN0O1xyXG5cdFx0Y29uc3QgcmVzcG9uc2VQcm9taXNlID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcblx0XHRcdHJlc3BvbnNlUmVzb2x2ZSA9IHJlcztcclxuXHRcdFx0cmVzcG9uc2VSZWplY3QgPSByZWo7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMucmVxdWVzdHMuc2V0KHRoaXMuY2FsbElkLCBcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHR5cGU6ICdDYWxsJyxcclxuXHRcdFx0XHRkYXRlOiBEYXRlLm5vdygpLFxyXG5cdFx0XHRcdHJlc29sdmU6IHJlc3BvbnNlUmVzb2x2ZSxcclxuXHRcdFx0XHRyZWplY3Q6IHJlc3BvbnNlUmVqZWN0XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0XHR0aGlzLnNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KGNhbGxRdWVyeSkpO1xyXG5cdFx0cmV0dXJuIHJlc3BvbnNlUHJvbWlzZVxyXG5cdH1cclxuXHRvbk9wZW4oKTogdm9pZCB7XHJcblx0XHRjbGVhclRpbWVvdXQodGhpcy53YWl0Rm9yQ29ubmVjdGlvbik7XHJcblx0XHR0aGlzLmVtaXQoJ3N0YXR1cycsIHsgc3RhdGU6ICdjb25uZWN0ZWQnLCBkYXRhOiB0aGlzLnVybCB9KTtcclxuXHRcdGlmICh0aGlzLnJlY29ubmVjdGluZykge1xyXG5cdFx0XHR0aGlzLmVtaXQoJ3N0YXR1cycsIHsgc3RhdGU6ICdyZWNvbm5lY3RlZCcsIGRhdGE6IHRoaXMudXJsIH0pO1xyXG5cdFx0XHR0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5pc0FsaXZlID0gdHJ1ZTtcclxuXHRcdHRoaXMubW9uaXRvciA9IHNldEludGVydmFsKCgpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuaXNBbGl2ZSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHR0aGlzLmVtaXQoJ3N0YXR1cycsIHsgc3RhdGU6ICdkaXNjb25uZWN0ZWQnLCBkYXRhOiAnS2VlcC1hbGl2ZSB0aW1lZCBvdXQnIH0pO1xyXG5cdFx0XHRcdC8vIENsZWFuIGNsb3NlIGNvbm5lY3Rpb29uXHJcblx0XHRcdFx0dGhpcy5vbkNsb3NlKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zb2NrZXQucGluZyh0aGlzLm5vb3AuYmluZCh0aGlzKSk7XHJcblx0XHR9LCA1MDAwKTtcclxuXHRcdHRoaXMucmVxdWVzdHMgPSBuZXcgTWFwKCk7XHJcblx0XHR0aGlzLmNhbGxJZCA9IDA7XHJcblx0XHR0aGlzLmNvbm5lY3RQcm9taXNlLnN0YXRlID0gJ2Z1bGZpbGxlZCc7XHJcblx0XHR0aGlzLnJlc29sdmVDb25uZWN0KHRoaXMpO1xyXG5cdH1cclxuXHJcblx0b25FcnJvcihlcnJvcjogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5tb25pdG9yKSB7XHJcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5tb25pdG9yKTtcclxuXHRcdFx0dGhpcy5tb25pdG9yID0gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMud2FpdEZvckNvbm5lY3Rpb24pO1xyXG5cdFx0dGhpcy5lbWl0KCdzdGF0dXMnLCB7IHN0YXRlOiAnZXJyb3InLCBkYXRhOiBlcnJvciB9KTtcclxuXHJcblx0XHR0aGlzLmNvbm5lY3RQcm9taXNlLnN0YXRlID0gJ2Z1bGZpbGxlZCc7XHJcblx0XHR0aGlzLnJlamVjdENvbm5lY3QoZXJyb3IpO1xyXG5cdH1cclxuXHJcblx0b25DbG9zZSgpOiB2b2lkIHtcclxuXHRcdHRoaXMuY2xvc2VkID0gdHJ1ZTtcclxuXHRcdHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XHJcblx0XHRpZiAodGhpcy5tb25pdG9yKSB7XHJcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5tb25pdG9yKTtcclxuXHRcdFx0dGhpcy5tb25pdG9yID0gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChjb25zdCBbLCByZXF1ZXN0XSBvZiB0aGlzLnJlcXVlc3RzKSB7XHJcblx0XHRcdGlmIChyZXF1ZXN0LnR5cGU9PSdDYWxsJykge1xyXG5cdFx0XHRcdCg8Q2FsbD4gcmVxdWVzdCkucmVqZWN0KG5ldyBFcnJvcignY29ubmVjdGlvbiBjbG9zZWQnKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuZW1pdCgnc3RhdHVzJywgeyBzdGF0ZTogJ2Nsb3NlZCcsIGRhdGE6IG51bGwgfSk7XHJcblx0XHRpZiAodGhpcy5hdXRvUmVjb25uZWN0KSB7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMucmVjb25uZWN0aW5nID0gdHJ1ZTtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0dGhpcy5jb25uZWN0KCk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5lbWl0KCdzdGF0dXMnLCB7IHN0YXRlOiAnZXJyb3InLCBkYXRhOiBlIH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgMTAwMCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGNsb3NlKCk6IFByb21pc2U8dm9pZD4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXMpID0+IHtcclxuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLm1vbml0b3IpO1xyXG5cdFx0XHR0aGlzLm1vbml0b3IgPSB1bmRlZmluZWQ7XHJcblx0XHRcdGlmICghdGhpcy5zb2NrZXQpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnV2Vic29ja2V0IGFscmVhZHkgY2xlYXJlZCcsIHRoaXMpO1xyXG5cdFx0XHRcdHJldHVybiByZXMoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMuc29ja2V0LnRlcm1pbmF0ZSkge1xyXG5cdFx0XHRcdHRoaXMuc29ja2V0LnRlcm1pbmF0ZSgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc29ja2V0LmNsb3NlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLnNvY2tldC5yZWFkeVN0YXRlID09PSAzKSByZXMoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRoZWFydGJlYXQoKTogdm9pZCB7XHJcblx0XHRpZiAoU09DS0VUX0RFQlVHKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdDV1MtRGVidWc6IDw8PCBQT05HJyk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmlzQWxpdmUgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0bm9vcCgpOiB2b2lkIHtcclxuXHRcdGlmIChTT0NLRVRfREVCVUcpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ0NXUy1EZWJ1ZzogPj4+IFBJTkcnKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19