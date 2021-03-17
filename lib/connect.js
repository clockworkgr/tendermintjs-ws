"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _tendermintws = _interopRequireDefault(require("./tendermintws"));

var client = new _tendermintws["default"]();
(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var txs;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return client.connect();

        case 3:
          _context.next = 5;
          return client.call("tx_search", ['tx.height>1', true, '1', '30', 'asc']);

        case 5:
          txs = _context.sent;
          console.log(txs);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 9]]);
}))();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25uZWN0LnRzIl0sIm5hbWVzIjpbImNsaWVudCIsIlRlbmRlcm1pbnRXUyIsImNvbm5lY3QiLCJjYWxsIiwidHhzIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFFQSxJQUFNQSxNQUFtQixHQUFHLElBQUlDLHdCQUFKLEVBQTVCO0FBRUEsOEVBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdTRCxNQUFNLENBQUNFLE9BQVAsRUFIVDs7QUFBQTtBQUFBO0FBQUEsaUJBTW9CRixNQUFNLENBQUNHLElBQVAsQ0FBWSxXQUFaLEVBQXdCLENBQUMsYUFBRCxFQUFlLElBQWYsRUFBb0IsR0FBcEIsRUFBd0IsSUFBeEIsRUFBNkIsS0FBN0IsQ0FBeEIsQ0FOcEI7O0FBQUE7QUFNU0MsVUFBQUEsR0FOVDtBQU9HQyxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsR0FBWjtBQVBIO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBVUdDLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUjs7QUFWSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQUFEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRlbmRlcm1pbnRXUyBmcm9tICcuL3RlbmRlcm1pbnR3cyc7XHJcblxyXG5jb25zdCBjbGllbnQ6VGVuZGVybWludFdTID0gbmV3IFRlbmRlcm1pbnRXUygpO1xyXG5cclxuKGFzeW5jICgpPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBcclxuICAgIGF3YWl0IGNsaWVudC5jb25uZWN0KClcclxuICAgIC8vY2xpZW50LnN1YnNjcmliZShbXCJ0bS5ldmVudD0nTmV3QmxvY2snXCJdLChkYXRhKSA9PiB7IGNvbnNvbGUubG9nKGRhdGEpfSlcclxuICAgIC8vY2xpZW50LnN1YnNjcmliZShbXCJ0bS5ldmVudD0nVHgnXCJdLChkYXRhKSA9PiB7IGNvbnNvbGUubG9nKGRhdGEpfSlcclxuICAgIGNvbnN0IHR4cz0gYXdhaXQgY2xpZW50LmNhbGwoXCJ0eF9zZWFyY2hcIixbJ3R4LmhlaWdodD4xJyx0cnVlLCcxJywnMzAnLCdhc2MnXSlcclxuICAgIGNvbnNvbGUubG9nKHR4cyk7XHJcbiAgICBcclxuICB9Y2F0Y2goZSkge1xyXG4gICAgY29uc29sZS5sb2coZSlcclxuICB9XHJcbn0pKCk7XHJcbiJdfQ==