import express from 'express';
import 'dotenv/config';
import formatArray from './utils/formatArray';
import calculateStats from './utils/calculateStats';
import setSellAmount from './utils/setSellAmount';
import setSwingAmount from './utils/setSwingAmount';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
  console.log(`Request received.`);
  const tokenBalances = formatArray(req.body);
  const stats = calculateStats(tokenBalances);
  console.log(stats);
  let sellAmount;
  let buyAmount;
  let flag;
  let sellAmountWei;
  let buyAmountWei;
  console.log(`Request received.`);
  console.log(`Calculating sell amount...`);
  console.log(`Flag: ${flag}`);
  console.log(`Sell amount: ${sellAmount}`);
  const date = new Date();
  console.log(`Time: ${date.toUTCString()}`);
  if (req.body.flag === 'swing') {
    const amountFnObj = await setSwingAmount(tokenBalances, stats, req.body.sell, req.body.buy, req.body.sellPrice, req.body.buyPrice, req.body.tokenAmount);
    sellAmount = amountFnObj.sellAmount;
    buyAmount = amountFnObj.buyAmount;
    sellAmountWei = amountFnObj.sellAmountWei;
    buyAmountWei = amountFnObj.buyAmountWei;
    flag = amountFnObj.flag;
  } else {
    const amountFnObj = await setSellAmount(tokenBalances, stats, req.body.sell, req.body.buy, req.body.sellPrice, req.body.buyPrice);
    sellAmount = amountFnObj.sellAmount;
    buyAmount = amountFnObj.buyAmount;
    sellAmountWei = amountFnObj.sellAmountWei;
    buyAmountWei = amountFnObj.buyAmountWei;
    flag = amountFnObj.flag;
  }

  console.log(`Buy Amount => ${buyAmount}`);
  console.log(`Flag => ${flag}`);
  res.status(200).json({
    sellAmount,
    buyAmount,
    flag,
    sellAmountWei,
    buyAmountWei,
  });
});


mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
  const PORT:number = parseInt(process.env.PORT) || 9999;
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
});

