import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import {formatArray, calculateStats, setSellAmount, setSwingAmount, checkVerb, handleError} from './utils';

const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
  checkVerb(`Request received.`);
  const tokenBalances = formatArray(req.body);
  const stats = calculateStats(tokenBalances);
  let sellAmount;
  let buyAmount;
  let flag;
  let sellAmountWei;
  let buyAmountWei;
  checkVerb(`Request received.`);
  checkVerb(`Calculating sell amount...`);
  checkVerb(`Flag: ${flag}`);
  checkVerb(`Sell amount: ${sellAmount}`);
  const date = new Date();
  checkVerb(`Time: ${date.toUTCString()}`);
  if (req.body.flag === 'swing') {
    const amountFnObj = await setSwingAmount(tokenBalances, stats, req.body.sell, req.body.buy, req.body.sellPrice, req.body.buyPrice, req.body.tokenAmount).catch(async (err) => {
      await handleError(err);
      return {
        flag,
        sellAmount: 0,
        buyAmount: 0,
        sellAmountWei: 0,
        buyAmountWei: 0,
      };
    });
    sellAmount = amountFnObj.sellAmount;
    buyAmount = amountFnObj.buyAmount;
    sellAmountWei = amountFnObj.sellAmountWei;
    buyAmountWei = amountFnObj.buyAmountWei;
    flag = amountFnObj.flag;
  } else {
    const amountFnObj = await setSellAmount(tokenBalances, stats, req.body.sell, req.body.buy, req.body.sellPrice, req.body.buyPrice).catch(async (err) => {
      await handleError(err);
      return {
        flag,
        sellAmount: 0,
        buyAmount: 0,
        sellAmountWei: 0,
        buyAmountWei: 0,
      };
    });
    sellAmount = amountFnObj.sellAmount;
    buyAmount = amountFnObj.buyAmount;
    sellAmountWei = amountFnObj.sellAmountWei;
    buyAmountWei = amountFnObj.buyAmountWei;
    flag = amountFnObj.flag;
  }

  checkVerb(`Buy Amount => ${buyAmount}`);
  checkVerb(`Flag => ${flag}`);
  res.status(200).json({
    sellAmount,
    buyAmount,
    flag,
    sellAmountWei,
    buyAmountWei,
  });
});


if (process.env.mongoose) {
  mongoose.connect(process.env.MONGO_URI)
      .catch(async (err) => await handleError(err))
      .then(() => {
        checkVerb('Connected to MongoDB');
        startApp();
      });
} else {
  startApp();
}

function startApp() {
  const PORT:number = parseInt(process.env.PORT) || 9999;
  app.listen(PORT, () => {
    checkVerb(`Listening on port: ${PORT}`);
  });
}
