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
          return client.call("tx_search", ['tx.height>1', null, null, null, null]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25uZWN0LnRzIl0sIm5hbWVzIjpbImNsaWVudCIsIlRlbmRlcm1pbnRXUyIsImNvbm5lY3QiLCJjYWxsIiwidHhzIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFFQSxJQUFNQSxNQUFtQixHQUFHLElBQUlDLHdCQUFKLEVBQTVCO0FBRUEsOEVBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdTRCxNQUFNLENBQUNFLE9BQVAsRUFIVDs7QUFBQTtBQUFBO0FBQUEsaUJBTWtCRixNQUFNLENBQUNHLElBQVAsQ0FBWSxXQUFaLEVBQXdCLENBQUMsYUFBRCxFQUFlLElBQWYsRUFBb0IsSUFBcEIsRUFBeUIsSUFBekIsRUFBOEIsSUFBOUIsQ0FBeEIsQ0FObEI7O0FBQUE7QUFNT0MsVUFBQUEsR0FOUDtBQU9HQyxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsR0FBWjtBQVBIO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBVUdDLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUjs7QUFWSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQUFEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRlbmRlcm1pbnRXUyBmcm9tICcuL3RlbmRlcm1pbnR3cyc7XG5cbmNvbnN0IGNsaWVudDpUZW5kZXJtaW50V1MgPSBuZXcgVGVuZGVybWludFdTKCk7XG5cbihhc3luYyAoKT0+IHtcbiAgdHJ5IHtcbiAgICBcbiAgICBhd2FpdCBjbGllbnQuY29ubmVjdCgpXG4gICAgLy9jbGllbnQuc3Vic2NyaWJlKFtcInRtLmV2ZW50PSdOZXdCbG9jaydcIl0sKGRhdGEpID0+IHsgY29uc29sZS5sb2coZGF0YSl9KVxuICAgIC8vY2xpZW50LnN1YnNjcmliZShbXCJ0bS5ldmVudD0nVHgnXCJdLChkYXRhKSA9PiB7IGNvbnNvbGUubG9nKGRhdGEpfSlcbiAgICBsZXQgdHhzPSBhd2FpdCBjbGllbnQuY2FsbChcInR4X3NlYXJjaFwiLFsndHguaGVpZ2h0PjEnLG51bGwsbnVsbCxudWxsLG51bGxdKVxuICAgIGNvbnNvbGUubG9nKHR4cyk7XG4gICAgXG4gIH1jYXRjaChlKSB7XG4gICAgY29uc29sZS5sb2coZSlcbiAgfVxufSkoKTtcbiJdfQ==