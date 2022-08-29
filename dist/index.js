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
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var formatArray_1 = __importDefault(require("./utils/formatArray"));
var calculateStats_1 = __importDefault(require("./utils/calculateStats"));
var setSellAmount_1 = __importDefault(require("./utils/setSellAmount"));
var setSwingAmount_1 = __importDefault(require("./utils/setSwingAmount"));
var mongoose_1 = __importDefault(require("mongoose"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenBalances, stats, sellAmount, buyAmount, flag, sellAmountWei, buyAmountWei, amountFnObj, amountFnObj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Request received.");
                tokenBalances = (0, formatArray_1.default)(req.body);
                stats = (0, calculateStats_1.default)(tokenBalances);
                console.log(stats);
                if (!(req.body.flag === 'swing')) return [3, 2];
                return [4, (0, setSwingAmount_1.default)(tokenBalances, stats, req.body.sell, req.body.buy, req.body.sellPrice, req.body.buyPrice, req.body.tokenAmount)];
            case 1:
                amountFnObj = _a.sent();
                sellAmount = amountFnObj.sellAmount;
                buyAmount = amountFnObj.buyAmount;
                sellAmountWei = amountFnObj.sellAmountWei;
                buyAmountWei = amountFnObj.buyAmountWei;
                flag = amountFnObj.flag;
                return [3, 4];
            case 2: return [4, (0, setSellAmount_1.default)(tokenBalances, stats, req.body.sell, req.body.buy, req.body.sellPrice, req.body.buyPrice)];
            case 3:
                amountFnObj = _a.sent();
                sellAmount = amountFnObj.sellAmount;
                buyAmount = amountFnObj.buyAmount;
                sellAmountWei = amountFnObj.sellAmountWei;
                buyAmountWei = amountFnObj.buyAmountWei;
                flag = amountFnObj.flag;
                _a.label = 4;
            case 4:
                console.log("Buy Amount => ".concat(buyAmount));
                console.log("Flag => ".concat(flag));
                res.status(200).json({
                    sellAmount: sellAmount,
                    buyAmount: buyAmount,
                    flag: flag,
                    sellAmountWei: sellAmountWei,
                    buyAmountWei: buyAmountWei,
                });
                return [2];
        }
    });
}); });
mongoose_1.default.connect(process.env.MONGO_URI).then(function () {
    console.log('Connected to MongoDB');
    var PORT = parseInt(process.env.PORT) || 9999;
    app.listen(PORT, function () {
        console.log("Listening on port: ".concat(PORT));
    });
});
//# sourceMappingURL=index.js.map