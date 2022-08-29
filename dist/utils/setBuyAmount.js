"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setBuyAmount(tokenBalances, stats, buy) {
    var buyObj = findBuy(tokenBalances, buy);
    var _a = findAmounts(buyObj, stats), buyAmount = _a.buyAmount, flag = _a.flag;
    return {
        flag: flag,
        buyAmount: buyAmount,
    };
}
exports.default = setBuyAmount;
function findBuy(tokenBalances, buy) {
    for (var _i = 0, tokenBalances_1 = tokenBalances; _i < tokenBalances_1.length; _i++) {
        var token = tokenBalances_1[_i];
        if (token.token === buy) {
            return token;
        }
    }
}
function findAmounts(buyObj, stats) {
    var _a = firstTier(buyObj, stats), buyAmount = _a.buyAmount, flag = _a.flag;
    return {
        flag: flag,
        buyAmount: buyAmount,
    };
}
function firstTier(buyObj, stats) {
    var amount = parseFloat(buyObj.balance);
    if (amount < stats.stdev) {
        var secondTierObj = secondTier(amount, stats);
        return {
            flag: secondTierObj.flag,
            buyAmount: secondTierObj.buyAmount,
        };
    }
    else {
        var buyAmount = amount / 2;
        buyAmount = buyAmount - (buyAmount * 0.01);
        return {
            flag: true,
            buyAmount: buyAmount,
        };
    }
}
function secondTier(amount, stats) {
    if (amount < stats.stdev2) {
        return {
            flag: false,
            buyAmount: 0,
        };
    }
    else {
        var buyAmount = amount / 3;
        buyAmount = buyAmount - (buyAmount * 0.01);
        return {
            flag: true,
            buyAmount: buyAmount,
        };
    }
}
//# sourceMappingURL=setBuyAmount.js.map