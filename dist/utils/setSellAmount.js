"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var findTransactions_1 = __importDefault(require("./findTransactions"));
function setSellAmount(tokenBalances, stats, sell, buy, sellPrice, buyPrice) {
    return __awaiter(this, void 0, void 0, function () {
        var sellObj, buyObj, _a, sellAmount, flag, buyAmount, _b, sellAmountWei, buyAmountWei;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    sellObj = findToken(tokenBalances, sell);
                    buyObj = findToken(tokenBalances, buy);
                    return [4, findAmounts(sellObj, buyObj, stats)];
                case 1:
                    _a = _c.sent(), sellAmount = _a.sellAmount, flag = _a.flag;
                    if (!flag) {
                        return [2, {
                                flag: flag,
                                sellAmount: 0,
                                buyAmount: 0,
                                sellAmountWei: 0,
                                buyAmountWei: 0,
                            }];
                    }
                    buyAmount = findBuy(sellAmount, buyObj, sellPrice, buyPrice);
                    _b = formatAmounts(sellAmount, buyAmount, sellObj.decimals, buyObj.decimals), sellAmountWei = _b.sellAmountWei, buyAmountWei = _b.buyAmountWei;
                    console.log("Sell amount wei => ".concat(sellAmountWei));
                    console.log("Buy amount wei => ".concat(buyAmountWei));
                    return [2, {
                            flag: flag,
                            sellAmount: sellAmount,
                            buyAmount: buyAmount,
                            sellAmountWei: sellAmountWei,
                            buyAmountWei: buyAmountWei,
                        }];
            }
        });
    });
}
exports.default = setSellAmount;
function findToken(tokenBalances, sell) {
    for (var _i = 0, tokenBalances_1 = tokenBalances; _i < tokenBalances_1.length; _i++) {
        var token = tokenBalances_1[_i];
        if (token.token === sell) {
            return token;
        }
    }
}
function findAmounts(sellObj, buyObj, stats) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, sellAmount, flag;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, firstTier(sellObj, buyObj, stats)];
                case 1:
                    _a = _b.sent(), sellAmount = _a.sellAmount, flag = _a.flag;
                    return [2, {
                            flag: flag,
                            sellAmount: sellAmount,
                        }];
            }
        });
    });
}
function firstTier(sellObj, buyObj, stats) {
    return __awaiter(this, void 0, void 0, function () {
        var amount, amountBuy, sellStd, buyStd, secondTierObj, time, timeLimit, timeFlag, sellAmount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    amount = parseFloat(sellObj.balance);
                    amountBuy = parseFloat(buyObj.balance);
                    sellStd = stats.avg - stats.stdev;
                    buyStd = stats.avg + stats.stdev;
                    if (!(amount < sellStd || amountBuy > buyStd)) return [3, 2];
                    return [4, secondTier(amount, amountBuy, stats)];
                case 1:
                    secondTierObj = _a.sent();
                    return [2, {
                            flag: secondTierObj.flag,
                            sellAmount: secondTierObj.sellAmount,
                        }];
                case 2:
                    time = new Date().getTime();
                    timeLimit = time - 1800000;
                    return [4, (0, findTransactions_1.default)(timeLimit)];
                case 3:
                    timeFlag = _a.sent();
                    console.log("Time flag => ".concat(timeFlag));
                    if (timeFlag) {
                        sellAmount = amount / 2;
                        return [2, {
                                flag: true,
                                sellAmount: sellAmount,
                            }];
                    }
                    else {
                        return [2, {
                                flag: false,
                                sellAmount: 0,
                            }];
                    }
                    _a.label = 4;
                case 4: return [2];
            }
        });
    });
}
function secondTier(amount, amountBuy, stats) {
    return __awaiter(this, void 0, void 0, function () {
        var sellStd, buyStd, time, timeLimit, timeFlag, sellAmount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sellStd = stats.avg - stats.stdev;
                    buyStd = stats.avg + stats.stdev;
                    if (!(amount < sellStd || amountBuy > buyStd)) return [3, 1];
                    return [2, {
                            flag: false,
                            sellAmount: 0,
                        }];
                case 1:
                    time = new Date().getTime();
                    timeLimit = time - 3600000;
                    return [4, (0, findTransactions_1.default)(timeLimit)];
                case 2:
                    timeFlag = _a.sent();
                    console.log("Time flag => ".concat(timeFlag));
                    if (timeFlag) {
                        sellAmount = amount / 3;
                        return [2, {
                                flag: true,
                                sellAmount: sellAmount,
                            }];
                    }
                    else {
                        return [2, {
                                flag: false,
                                sellAmount: 0,
                            }];
                    }
                    _a.label = 3;
                case 3: return [2];
            }
        });
    });
}
function findBuy(sellAmount, buyObj, sellPrice, buyPrice) {
    console.log("Sell price => ".concat(sellPrice));
    console.log("Buy price => ".concat(buyPrice));
    var sellAmountUsd = sellAmount * sellPrice;
    var buyAmount = sellAmountUsd / buyPrice;
    console.log("Sell amount => ".concat(sellAmount));
    console.log("Buy amount => ".concat(buyAmount));
    return buyAmount - (0.01 * buyAmount);
}
function formatAmounts(sellAmount, buyAmount, sellDecimals, buyDecmials) {
    var sellAmountWei = ethers_1.utils.parseUnits(sellAmount.toFixed(6).toString(), sellDecimals);
    var buyAmountWei = ethers_1.utils.parseUnits(buyAmount.toFixed(6).toString(), buyDecmials);
    return {
        sellAmountWei: sellAmountWei,
        buyAmountWei: buyAmountWei,
    };
}
//# sourceMappingURL=setSellAmount.js.map