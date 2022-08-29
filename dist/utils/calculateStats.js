"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateStats(tokenBalances) {
    var balances = [];
    for (var _i = 0, tokenBalances_1 = tokenBalances; _i < tokenBalances_1.length; _i++) {
        var tokenBalance = tokenBalances_1[_i];
        balances.push(parseFloat(tokenBalance.balance));
    }
    var sum = balances.reduce(function (a, b) { return a + b; }, 0);
    var avg = sum / balances.length;
    var stdev = Math.sqrt(balances.reduce(function (a, b) { return a + Math.pow(b - avg, 2); }, 0) / (balances.length - 1));
    var stdev2 = 2 * stdev;
    return { sum: sum, avg: avg, stdev: stdev, stdev2: stdev2 };
}
exports.default = calculateStats;
//# sourceMappingURL=calculateStats.js.map