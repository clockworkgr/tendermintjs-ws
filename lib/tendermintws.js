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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZW5kZXJtaW50d3MudHMiXSwibmFtZXMiOlsiU09DS0VUX0RFQlVHIiwiVGVuZGVybWludFdTIiwic2VydmVyIiwidGltZW91dCIsImF1dG9SZWNvbm5lY3QiLCJ1cmwiLCJjb25uZWN0ZWQiLCJjbG9zZWQiLCJpc0FsaXZlIiwicmVxdWVzdHMiLCJNYXAiLCJjb25uZWN0UHJvbWlzZSIsInN0YXRlIiwiUHJvbWlzZSIsInJlcyIsInJlaiIsInJlc29sdmVDb25uZWN0IiwicmVqZWN0Q29ubmVjdCIsIndhaXRGb3JDb25uZWN0aW9uIiwic2V0VGltZW91dCIsInNvY2tldCIsIldlYlNvY2tldCIsIm9ub3BlbiIsIm9uT3BlbiIsImJpbmQiLCJvbmVycm9yIiwib25FcnJvciIsIm9ubWVzc2FnZSIsIm9uTWVzc2FnZSIsIm9uY2xvc2UiLCJvbkNsb3NlIiwib24iLCJoZWFydGJlYXQiLCJyZWFkeVN0YXRlIiwiY2xvc2UiLCJtZXNzYWdlIiwicmVzcG9uc2UiLCJKU09OIiwicGFyc2UiLCJkYXRhIiwiaGFuZGxlciIsImdldCIsImlkIiwicmVzdWx0IiwicXVlcnkiLCJ0eXBlIiwiY2FsbGJhY2siLCJyZXNvbHZlIiwiY29uc29sZSIsImxvZyIsInN0cmluZ2lmeSIsInBhcmFtcyIsImNhbGxJZCIsInN1YnNjcmlwdGlvblF1ZXJ5IiwianNvbnJwYyIsIm1ldGhvZCIsInNldCIsInNlbmQiLCJjYWxsUXVlcnkiLCJyZXNwb25zZVByb21pc2UiLCJyZXNwb25zZVJlc29sdmUiLCJyZXNwb25zZVJlamVjdCIsImRhdGUiLCJEYXRlIiwibm93IiwicmVqZWN0IiwiY2xlYXJUaW1lb3V0IiwiZW1pdCIsInJlY29ubmVjdGluZyIsIm1vbml0b3IiLCJzZXRJbnRlcnZhbCIsInBpbmciLCJub29wIiwiZXJyb3IiLCJjbGVhckludGVydmFsIiwidW5kZWZpbmVkIiwicmVxdWVzdCIsIkVycm9yIiwiY29ubmVjdCIsImUiLCJ0ZXJtaW5hdGUiLCJFdmVu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Q0FBQ00sTUFBTCxDQUFZNEQsU0FBaEIsRUFBMkI7QUFDMUIsVUFBQSxNQUFJLENBQUM1RCxNQUFMLENBQVk0RCxTQUFaO0FBQ0EsU0FGRCxNQUVPO0FBQ04sVUFBQSxNQUFJLENBQUM1RCxNQUFMLENBQVljLEtBQVo7QUFDQTs7QUFFRCxZQUFJLE1BQUksQ0FBQ2QsTUFBTCxDQUFZYSxVQUFaLEtBQTJCLENBQS9CLEVBQWtDbkIsR0FBRztBQUNyQyxPQWZNLENBQVA7QUFnQkE7OztXQUNELHFCQUFrQjtBQUNqQixVQUFJZCxZQUFKLEVBQWtCO0FBQ2pCZ0QsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQVo7QUFDQTs7QUFDRCxXQUFLekMsT0FBTCxHQUFlLElBQWY7QUFDQTs7O1dBRUQsZ0JBQWE7QUFDWixVQUFJUixZQUFKLEVBQWtCO0FBQ2pCZ0QsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQVo7QUFDQTtBQUNEOzs7RUExT3dDZ0Msa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViU29ja2V0IGZyb20gJ2lzb21vcnBoaWMtd3MnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnO1xuY29uc3QgU09DS0VUX0RFQlVHID0gZmFsc2U7XG5leHBvcnQgdHlwZSBTdWJzY3JpcHRpb24gPSB7XG5cdGNhbGxiYWNrOiAoZGF0YTogdW5rbm93bikgPT4gdm9pZDtcbn1cbmV4cG9ydCB0eXBlIENhbGwgPSB7XG5cdGRhdGU6IG51bWJlcjtcblx0cmVzb2x2ZTogKHZhbHVlPzogdW5rbm93biB8IFByb21pc2VMaWtlPHVua25vd24+KSA9PiB2b2lkO1xuXHRyZWplY3Q6IChyZWFzb24/OiBFcnJvcikgPT4gdm9pZDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSVJlcXVlc3Qge1xuXHR0eXBlOiAnU3Vic2NyaXB0aW9uJyB8ICdDYWxsJ1xufVxuZXhwb3J0IHR5cGUgUmVxdWVzdCA9ICggU3Vic2NyaXB0aW9uIHwgQ2FsbCApICYgSVJlcXVlc3Q7XG5leHBvcnQgaW50ZXJmYWNlIElDb25maWcge1xuXHRzZXJ2ZXI6IHN0cmluZztcblx0dGltZW91dDogbnVtYmVyO1xuXHRhdXRvUmVjb25uZWN0OiBib29sZWFuO1xufVxuZXhwb3J0IGludGVyZmFjZSBJUHJvbWlzZVN0YXRlcyB7XG5cdHN0YXRlPzogJ3BlbmRpbmcnIHwgJ2Z1bGZpbGxlZCc7XG59XG5leHBvcnQgdHlwZSBTdGF0ZWZ1bFByb21pc2U8VD4gPSBQcm9taXNlPFQ+ICYgSVByb21pc2VTdGF0ZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlbmRlcm1pbnRXUyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cdHB1YmxpYyB1cmw6IHN0cmluZztcblx0cHVibGljIGNvbm5lY3RlZDogYm9vbGVhbjtcblx0cHVibGljIGNsb3NlZDogYm9vbGVhbjtcblx0cHJpdmF0ZSB0aW1lb3V0OiBudW1iZXI7XG5cdHByaXZhdGUgc29ja2V0OiBXZWJTb2NrZXQ7XG5cdHByaXZhdGUgYXV0b1JlY29ubmVjdDogYm9vbGVhbjtcblx0cHJpdmF0ZSBpc0FsaXZlOiBib29sZWFuO1xuXHRwcml2YXRlIHJlcXVlc3RzOiBNYXA8bnVtYmVyLCBSZXF1ZXN0Pjtcblx0cHJpdmF0ZSBjb25uZWN0UHJvbWlzZTogU3RhdGVmdWxQcm9taXNlPFRlbmRlcm1pbnRXUz4gfCBudWxsO1xuXHRwcml2YXRlIHJlc29sdmVDb25uZWN0OiAodmFsdWU/OiBUZW5kZXJtaW50V1MgfCBQcm9taXNlTGlrZTxUZW5kZXJtaW50V1M+KSA9PiB2b2lkO1xuXHRwcml2YXRlIHJlamVjdENvbm5lY3Q6IChyZWFzb24/OiBzdHJpbmcpID0+IHZvaWQ7XG5cdHByaXZhdGUgd2FpdEZvckNvbm5lY3Rpb246IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+O1xuXHRwcml2YXRlIG1vbml0b3I6IFJldHVyblR5cGU8dHlwZW9mIHNldEludGVydmFsPjtcblx0cHJpdmF0ZSByZWNvbm5lY3Rpbmc6IGJvb2xlYW47XG5cdHByaXZhdGUgY2FsbElkOiBudW1iZXI7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0eyBzZXJ2ZXIsIHRpbWVvdXQsIGF1dG9SZWNvbm5lY3QgfTogSUNvbmZpZyA9IHtcblx0XHRcdHNlcnZlcjogJ3dzczovL3JwYy5jb3Ntb3MubmV0d29yay93ZWJzb2NrZXQnLFxuXHRcdFx0dGltZW91dDogMTUwMDAsXG5cdFx0XHRhdXRvUmVjb25uZWN0OiB0cnVlLFxuXHRcdH0sXG5cdCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy51cmwgPSBzZXJ2ZXI7XG5cdFx0dGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcblx0XHR0aGlzLmNsb3NlZCA9IGZhbHNlO1xuXHRcdHRoaXMuYXV0b1JlY29ubmVjdCA9IGF1dG9SZWNvbm5lY3Q7XG5cdFx0dGhpcy50aW1lb3V0ID0gdGltZW91dDtcblx0XHR0aGlzLmlzQWxpdmUgPSBmYWxzZTtcblx0XHR0aGlzLnJlcXVlc3RzID0gbmV3IE1hcCgpO1xuXHRcdHRoaXMuY29ubmVjdFByb21pc2UgPSBudWxsO1xuXHRcdFxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhc3luYyBjb25uZWN0KCk6IFByb21pc2U8VGVuZGVybWludFdTPiB7XG5cdFx0aWYgKHRoaXMuY29ubmVjdFByb21pc2UgIT09IG51bGwpIHtcblx0XHRcdGlmICh0aGlzLmNvbm5lY3RQcm9taXNlLnN0YXRlID09ICdwZW5kaW5nJykge1xuXHRcdFx0XHQvLyBJZiBhbHJlYWR5IHdhaXRpbmcgdG8gY29ubmVjdCwgZG8gbm90IHJlYXR0ZW1wdDtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29ubmVjdFByb21pc2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLmNvbm5lY3RQcm9taXNlLnN0YXRlID09ICdmdWxmaWxsZWQnKSB7XG5cdFx0XHRcdC8vIElmIGFscmVhZHkgY29ubmVjdGVkIGluIHRoZSBwYXN0XG5cdFx0XHRcdGlmICh0aGlzLmNvbm5lY3RlZCkge1xuXHRcdFx0XHRcdC8vIElmIGN1cnJlbnRseSBjb25uZWN0ZWQsIGp1c3QgcmV0dXJuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuY29ubmVjdFByb21pc2U7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gSWYgZGlzY29ubmVjdGVkLCB0cnkgYWdhaW5cblxuXHRcdFx0XHRcdHRoaXMuY29ubmVjdFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucmVzb2x2ZUNvbm5lY3QgPSByZXM7XG5cdFx0XHRcdFx0XHR0aGlzLnJlamVjdENvbm5lY3QgPSByZWo7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0dGhpcy5jb25uZWN0UHJvbWlzZS5zdGF0ZSA9ICdwZW5kaW5nJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBGaXJzdCBjb25uZWN0aW9uXG5cdFx0XHR0aGlzLmNvbm5lY3RQcm9taXNlID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG5cdFx0XHRcdHRoaXMucmVzb2x2ZUNvbm5lY3QgPSByZXM7XG5cdFx0XHRcdHRoaXMucmVqZWN0Q29ubmVjdCA9IHJlajtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmNvbm5lY3RQcm9taXNlLnN0YXRlID0gJ3BlbmRpbmcnO1xuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0Ly8gU3RhcnQgVGltZW91dFxuXHRcdFx0dGhpcy53YWl0Rm9yQ29ubmVjdGlvbiA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmNvbm5lY3RQcm9taXNlLnN0YXRlID0gJ2Z1bGZpbGxlZCc7XG5cdFx0XHRcdHRoaXMucmVqZWN0Q29ubmVjdCgnQ29ubmVjdGlvbiB0aW1lZCBvdXQnKTtcblx0XHRcdH0sIHRoaXMudGltZW91dCk7XG5cdFx0XHR0aGlzLnNvY2tldCA9IG5ldyBXZWJTb2NrZXQodGhpcy51cmwpO1xuXHRcdFx0dGhpcy5zb2NrZXQub25vcGVuID0gdGhpcy5vbk9wZW4uYmluZCh0aGlzKTtcblx0XHRcdHRoaXMuc29ja2V0Lm9uZXJyb3IgPSB0aGlzLm9uRXJyb3IuYmluZCh0aGlzKTtcblx0XHRcdHRoaXMuc29ja2V0Lm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XG5cdFx0XHR0aGlzLnNvY2tldC5vbmNsb3NlID0gdGhpcy5vbkNsb3NlLmJpbmQodGhpcyk7XG5cdFx0XHR0aGlzLnNvY2tldC5vbigncG9uZycsIHRoaXMuaGVhcnRiZWF0LmJpbmQodGhpcykpO1xuXHRcdFx0cmV0dXJuIHRoaXMuY29ubmVjdFByb21pc2U7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0dGhpcy5zb2NrZXQgPSB7XG5cdFx0XHRcdHJlYWR5U3RhdGU6IDMsXG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb25cblx0XHRcdFx0Y2xvc2U6ICgpID0+IHt9LFxuXHRcdFx0fTtcblx0XHRcdHRoaXMuY29ubmVjdFByb21pc2Uuc3RhdGUgPSAnZnVsZmlsbGVkJztcblx0XHRcdHRoaXMucmVqZWN0Q29ubmVjdCgnSW52YWxpZCBVUkw6ICcgKyB0aGlzLnVybCk7XG5cdFx0fVxuXHR9XG5cblx0b25NZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2VFdmVudCk6IHZvaWQge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5cdFx0Y29uc3QgcmVzcG9uc2U6IGFueSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcblx0XHRcblx0XHRjb25zdCBoYW5kbGVyOlJlcXVlc3QgPSB0aGlzLnJlcXVlc3RzLmdldChyZXNwb25zZS5pZCk7XG5cdFx0aWYoaGFuZGxlciAmJiByZXNwb25zZS5yZXN1bHQucXVlcnkpIHtcblx0XHRcdGlmIChoYW5kbGVyLnR5cGU9PSdTdWJzY3JpcHRpb24nKSAge1xuXHRcdFx0XHQoPFN1YnNjcmlwdGlvbj4gaGFuZGxlcikuY2FsbGJhY2socmVzcG9uc2UucmVzdWx0KTtcblx0XHRcdH1cblx0XHRcdGlmIChoYW5kbGVyLnR5cGU9PSdDYWxsJykgIHtcblx0XHRcdFx0KDxDYWxsPiBoYW5kbGVyKS5yZXNvbHZlKHJlc3BvbnNlLnJlc3VsdCk7XG5cdFx0XHRcdHRoaXMucmVxdWVzdHMuZGVsZXRlKHJlc3BvbnNlLmlkKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKFNPQ0tFVF9ERUJVRykge1xuXHRcdFx0Y29uc29sZS5sb2coJ0NXUy1EZWJ1ZzogPDw8ICcgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xuXHRcdH1cblx0fVxuXG5cdHN1YnNjcmliZShwYXJhbXM6c3RyaW5nW10sY2FsbGJhY2s6KGRhdGEpPT52b2lkKTp2b2lkIHtcblx0XHR0aGlzLmNhbGxJZCsrO1xuXHRcdGNvbnN0IHN1YnNjcmlwdGlvblF1ZXJ5ID0ge1xuXHRcdFx0anNvbnJwYzogXCIyLjBcIixcblx0XHRcdG1ldGhvZDogXCJzdWJzY3JpYmVcIixcblx0XHRcdGlkOiB0aGlzLmNhbGxJZCxcblx0XHRcdHBhcmFtc1xuXHRcdH1cblx0XHR0aGlzLnJlcXVlc3RzLnNldCh0aGlzLmNhbGxJZCwgeyB0eXBlOiAnU3Vic2NyaXB0aW9uJywgY2FsbGJhY2t9KTtcblx0XHR0aGlzLnNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHN1YnNjcmlwdGlvblF1ZXJ5KSk7XG5cdH1cbiAgYXN5bmMgY2FsbChtZXRob2Q6c3RyaW5nLHBhcmFtczp1bmtub3duW10pOlByb21pc2U8dW5rbm93bj4ge1xuXHRcdHRoaXMuY2FsbElkKys7XG5cdFx0Y29uc3QgY2FsbFF1ZXJ5ID0ge1xuXHRcdFx0anNvbnJwYzogXCIyLjBcIixcblx0XHRcdG1ldGhvZDogbWV0aG9kLFxuXHRcdFx0aWQ6IHRoaXMuY2FsbElkLFxuXHRcdFx0cGFyYW1zXG5cdFx0fVxuXHRcdGxldCByZXNwb25zZVJlc29sdmUscmVzcG9uc2VSZWplY3Q7XG5cdFx0Y29uc3QgcmVzcG9uc2VQcm9taXNlID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG5cdFx0XHRyZXNwb25zZVJlc29sdmUgPSByZXM7XG5cdFx0XHRyZXNwb25zZVJlamVjdCA9IHJlajtcblx0XHR9KTtcblx0XHR0aGlzLnJlcXVlc3RzLnNldCh0aGlzLmNhbGxJZCwgXG5cdFx0XHR7XG5cdFx0XHRcdHR5cGU6ICdDYWxsJyxcblx0XHRcdFx0ZGF0ZTogRGF0ZS5ub3coKSxcblx0XHRcdFx0cmVzb2x2ZTogcmVzcG9uc2VSZXNvbHZlLFxuXHRcdFx0XHRyZWplY3Q6IHJlc3BvbnNlUmVqZWN0XG5cdFx0XHR9XG5cdFx0KTtcblx0XHR0aGlzLnNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KGNhbGxRdWVyeSkpO1xuXHRcdHJldHVybiByZXNwb25zZVByb21pc2Vcblx0fVxuXHRvbk9wZW4oKTogdm9pZCB7XG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMud2FpdEZvckNvbm5lY3Rpb24pO1xuXHRcdHRoaXMuZW1pdCgnc3RhdHVzJywgeyBzdGF0ZTogJ2Nvbm5lY3RlZCcsIGRhdGE6IHRoaXMudXJsIH0pO1xuXHRcdGlmICh0aGlzLnJlY29ubmVjdGluZykge1xuXHRcdFx0dGhpcy5lbWl0KCdzdGF0dXMnLCB7IHN0YXRlOiAncmVjb25uZWN0ZWQnLCBkYXRhOiB0aGlzLnVybCB9KTtcblx0XHRcdHRoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7XG5cdFx0fVxuXHRcdHRoaXMuaXNBbGl2ZSA9IHRydWU7XG5cdFx0dGhpcy5tb25pdG9yID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMuaXNBbGl2ZSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0dGhpcy5lbWl0KCdzdGF0dXMnLCB7IHN0YXRlOiAnZGlzY29ubmVjdGVkJywgZGF0YTogJ0tlZXAtYWxpdmUgdGltZWQgb3V0JyB9KTtcblx0XHRcdFx0Ly8gQ2xlYW4gY2xvc2UgY29ubmVjdGlvb25cblx0XHRcdFx0dGhpcy5vbkNsb3NlKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNvY2tldC5waW5nKHRoaXMubm9vcC5iaW5kKHRoaXMpKTtcblx0XHR9LCA1MDAwKTtcblx0XHR0aGlzLnJlcXVlc3RzID0gbmV3IE1hcCgpO1xuXHRcdHRoaXMuY2FsbElkID0gMDtcblx0XHR0aGlzLmNvbm5lY3RQcm9taXNlLnN0YXRlID0gJ2Z1bGZpbGxlZCc7XG5cdFx0dGhpcy5yZXNvbHZlQ29ubmVjdCh0aGlzKTtcblx0fVxuXG5cdG9uRXJyb3IoZXJyb3I6IHN0cmluZyk6IHZvaWQge1xuXHRcdGlmICh0aGlzLm1vbml0b3IpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5tb25pdG9yKTtcblx0XHRcdHRoaXMubW9uaXRvciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMud2FpdEZvckNvbm5lY3Rpb24pO1xuXHRcdHRoaXMuZW1pdCgnc3RhdHVzJywgeyBzdGF0ZTogJ2Vycm9yJywgZGF0YTogZXJyb3IgfSk7XG5cblx0XHR0aGlzLmNvbm5lY3RQcm9taXNlLnN0YXRlID0gJ2Z1bGZpbGxlZCc7XG5cdFx0dGhpcy5yZWplY3RDb25uZWN0KGVycm9yKTtcblx0fVxuXG5cdG9uQ2xvc2UoKTogdm9pZCB7XG5cdFx0dGhpcy5jbG9zZWQgPSB0cnVlO1xuXHRcdHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG5cdFx0aWYgKHRoaXMubW9uaXRvcikge1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLm1vbml0b3IpO1xuXHRcdFx0dGhpcy5tb25pdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRmb3IgKGNvbnN0IFssIHJlcXVlc3RdIG9mIHRoaXMucmVxdWVzdHMpIHtcblx0XHRcdGlmIChyZXF1ZXN0LnR5cGU9PSdDYWxsJykge1xuXHRcdFx0XHQoPENhbGw+IHJlcXVlc3QpLnJlamVjdChuZXcgRXJyb3IoJ2Nvbm5lY3Rpb24gY2xvc2VkJykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmVtaXQoJ3N0YXR1cycsIHsgc3RhdGU6ICdjbG9zZWQnLCBkYXRhOiBudWxsIH0pO1xuXHRcdGlmICh0aGlzLmF1dG9SZWNvbm5lY3QpIHtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnJlY29ubmVjdGluZyA9IHRydWU7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dGhpcy5jb25uZWN0KCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHR0aGlzLmVtaXQoJ3N0YXR1cycsIHsgc3RhdGU6ICdlcnJvcicsIGRhdGE6IGUgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIDEwMDApO1xuXHRcdH1cblx0fVxuXHRjbG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlcykgPT4ge1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLm1vbml0b3IpO1xuXHRcdFx0dGhpcy5tb25pdG9yID0gdW5kZWZpbmVkO1xuXHRcdFx0aWYgKCF0aGlzLnNvY2tldCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnV2Vic29ja2V0IGFscmVhZHkgY2xlYXJlZCcsIHRoaXMpO1xuXHRcdFx0XHRyZXR1cm4gcmVzKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLnNvY2tldC50ZXJtaW5hdGUpIHtcblx0XHRcdFx0dGhpcy5zb2NrZXQudGVybWluYXRlKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNvY2tldC5jbG9zZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5zb2NrZXQucmVhZHlTdGF0ZSA9PT0gMykgcmVzKCk7XG5cdFx0fSk7XG5cdH1cblx0aGVhcnRiZWF0KCk6IHZvaWQge1xuXHRcdGlmIChTT0NLRVRfREVCVUcpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdDV1MtRGVidWc6IDw8PCBQT05HJyk7XG5cdFx0fVxuXHRcdHRoaXMuaXNBbGl2ZSA9IHRydWU7XG5cdH1cblxuXHRub29wKCk6IHZvaWQge1xuXHRcdGlmIChTT0NLRVRfREVCVUcpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdDV1MtRGVidWc6ID4+PiBQSU5HJyk7XG5cdFx0fVxuXHR9XG59XG4iXX0=