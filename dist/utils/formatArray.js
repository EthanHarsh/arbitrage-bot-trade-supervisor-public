"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
function formatArray(body) {
    var tokenBalanceArr = body.tokenBalanceArr;
    var tokenBalances = [];
    for (var _i = 0, tokenBalanceArr_1 = tokenBalanceArr; _i < tokenBalanceArr_1.length; _i++) {
        var reqToken = tokenBalanceArr_1[_i];
        var tokenBalance = ethers_1.BigNumber.from(reqToken.balance);
        var tokenDecimals = findDecimals(reqToken.token);
        var tokenBalanceEth = ethers_1.utils.formatUnits(tokenBalance.toString(), tokenDecimals);
        tokenBalances.push({ balance: tokenBalanceEth, token: reqToken.token, decimals: tokenDecimals });
    }
    return tokenBalances;
}
exports.default = formatArray;
function findDecimals(tokenName) {
    switch (tokenName) {
        case 'DAI':
            return 18;
            break;
        case 'USDC':
            return 6;
            break;
        case 'FUSDT':
            return 6;
            break;
        case 'MIM':
            return 18;
            break;
        default:
            return 18;
            break;
    }
}
//# sourceMappingURL=formatArray.js.map