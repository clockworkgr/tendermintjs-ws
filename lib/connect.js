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
          client.subscribe(["tm.event='NewBlock'"], function (data) {
            console.log(data);
          });
          client.subscribe(["tm.event='Tx'"], function (data) {
            console.log(data);
          });
          _context.next = 7;
          return client.call("tx_search", ['tx.height>1', true, '1', '30', 'asc']);

        case 7:
          txs = _context.sent;
          console.log(txs);
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 11]]);
}))();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25uZWN0LnRzIl0sIm5hbWVzIjpbImNsaWVudCIsIlRlbmRlcm1pbnRXUyIsImNvbm5lY3QiLCJzdWJzY3JpYmUiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImNhbGwiLCJ0eHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBRUEsSUFBTUEsTUFBbUIsR0FBRyxJQUFJQyx3QkFBSixFQUE1QjtBQUVBLDhFQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFHU0QsTUFBTSxDQUFDRSxPQUFQLEVBSFQ7O0FBQUE7QUFJR0YsVUFBQUEsTUFBTSxDQUFDRyxTQUFQLENBQWlCLENBQUMscUJBQUQsQ0FBakIsRUFBeUMsVUFBQ0MsSUFBRCxFQUFVO0FBQUVDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixJQUFaO0FBQWtCLFdBQXZFO0FBQ0FKLFVBQUFBLE1BQU0sQ0FBQ0csU0FBUCxDQUFpQixDQUFDLGVBQUQsQ0FBakIsRUFBbUMsVUFBQ0MsSUFBRCxFQUFVO0FBQUVDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixJQUFaO0FBQWtCLFdBQWpFO0FBTEg7QUFBQSxpQkFNb0JKLE1BQU0sQ0FBQ08sSUFBUCxDQUFZLFdBQVosRUFBd0IsQ0FBQyxhQUFELEVBQWUsSUFBZixFQUFvQixHQUFwQixFQUF3QixJQUF4QixFQUE2QixLQUE3QixDQUF4QixDQU5wQjs7QUFBQTtBQU1TQyxVQUFBQSxHQU5UO0FBT0dILFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRSxHQUFaO0FBUEg7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFVR0gsVUFBQUEsT0FBTyxDQUFDQyxHQUFSOztBQVZIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGVuZGVybWludFdTIGZyb20gJy4vdGVuZGVybWludHdzJztcclxuXHJcbmNvbnN0IGNsaWVudDpUZW5kZXJtaW50V1MgPSBuZXcgVGVuZGVybWludFdTKCk7XHJcblxyXG4oYXN5bmMgKCk9PiB7XHJcbiAgdHJ5IHtcclxuICAgIFxyXG4gICAgYXdhaXQgY2xpZW50LmNvbm5lY3QoKVxyXG4gICAgY2xpZW50LnN1YnNjcmliZShbXCJ0bS5ldmVudD0nTmV3QmxvY2snXCJdLChkYXRhKSA9PiB7IGNvbnNvbGUubG9nKGRhdGEpfSlcclxuICAgIGNsaWVudC5zdWJzY3JpYmUoW1widG0uZXZlbnQ9J1R4J1wiXSwoZGF0YSkgPT4geyBjb25zb2xlLmxvZyhkYXRhKX0pXHJcbiAgICBjb25zdCB0eHM9IGF3YWl0IGNsaWVudC5jYWxsKFwidHhfc2VhcmNoXCIsWyd0eC5oZWlnaHQ+MScsdHJ1ZSwnMScsJzMwJywnYXNjJ10pXHJcbiAgICBjb25zb2xlLmxvZyh0eHMpO1xyXG4gICAgXHJcbiAgfWNhdGNoKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgfVxyXG59KSgpO1xyXG4iXX0=