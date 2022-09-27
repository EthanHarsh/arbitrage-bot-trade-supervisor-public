import {formatAmounts, findBuy, findToken} from './utils';
import checkVerb from '../utils/checkVerb';
import handleError from '../utils/handleError';

export default async function setSwingAmount(tokenBalances, stats, sell, buy, sellPrice, buyPrice, swingTradeAmount) {
  const sellObj = findToken(tokenBalances, sell);
  const buyObj = findToken(tokenBalances, buy);
  // @ts-ignore
  const {sellAmount, flag} = await findAmounts(sellObj, buyObj, stats, swingTradeAmount).catch(async (err) => {
    await handleError(err);
    return {
      flag: false,
    };
  });
  if (!flag) {
    return {
      flag,
      sellAmount: 0,
      buyAmount: 0,
      sellAmountWei: 0,
      buyAmountWei: 0,
    };
  }
  const buyAmount = findBuy(sellAmount, buyObj, sellPrice, buyPrice);
  const {sellAmountWei, buyAmountWei} = formatAmounts(sellAmount, buyAmount, sellObj.decimals, buyObj.decimals);
  checkVerb(`Sell amount wei => ${sellAmountWei}`);
  checkVerb(`Buy amount wei => ${buyAmountWei}`);
  return {
    flag,
    sellAmount,
    buyAmount,
    sellAmountWei,
    buyAmountWei,
  };
}

async function findAmounts(sellObj, buyObj, stats, swingTradeAmount) {
  const {sellAmount, flag} = await firstTier(sellObj, buyObj, stats, swingTradeAmount).catch(async (err) => {
    await handleError(err);
    return {
      sellAmount: 0,
      flag: false,
    };
  });
  return {
    flag,
    sellAmount,
  };
}

async function firstTier(sellObj, buyObj, stats, swingTradeAmount) {
  const amount = parseFloat(sellObj.balance);
  const amountBuy = parseFloat(buyObj.balance);
  const sellStd = stats.avg - stats.stdev2;
  const buyStd = stats.avg + stats.stdev2;
  if (amount < sellStd || amountBuy > buyStd) {
    return {
      flag: false,
      sellAmount: 0,
    };
  } else {
    const sellAmount = swingTradeAmount;
    return {
      flag: true,
      sellAmount,
    };
  }
}
