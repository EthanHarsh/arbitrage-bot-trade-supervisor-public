import {formatAmounts, findBuy, findToken} from './utils';
import {handleError} from '../utils';
import {findTx, checkVerb} from '../utils';

export default async function setSellAmount(tokenBalances, stats, sell, buy, sellPrice, buyPrice) {
  const sellObj = findToken(tokenBalances, sell);
  const buyObj = findToken(tokenBalances, buy);
  // @ts-ignore
  const {sellAmount, flag} = await findAmounts(sellObj, buyObj, stats).catch(async (err) => {
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

async function findAmounts(sellObj, buyObj, stats) {
  // @ts-ignore
  const {sellAmount, flag} = await firstTier(sellObj, buyObj, stats).catch(async (err) => {
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

async function firstTier(sellObj, buyObj, stats) {
  const amount = parseFloat(sellObj.balance);
  const amountBuy = parseFloat(buyObj.balance);
  const sellStd = stats.avg - stats.stdev;
  const buyStd = stats.avg + stats.stdev;
  if (amount < sellStd || amountBuy > buyStd) {
    const secondTierObj = await secondTier(amount, amountBuy, stats);
    return {
      // @ts-ignore
      flag: secondTierObj.flag,
      // @ts-ignore
      sellAmount: secondTierObj.sellAmount,
    };
  } else {
    const time = new Date().getTime();
    const timeLimit = time - 1800000;
    const timeFlag = await findTx(timeLimit).catch(async (err) => {
      await handleError(err);
    });
    checkVerb(`Time flag => ${timeFlag}`);
    if (timeFlag) {
      const sellAmount = amount / 2;
      return {
        flag: true,
        sellAmount,
      };
    } else {
      return {
        flag: false,
        sellAmount: 0,
      };
    }
  }
}

async function secondTier(amount, amountBuy, stats) {
  const sellStd = stats.avg - stats.stdev;
  const buyStd = stats.avg + stats.stdev;
  if (amount < sellStd || amountBuy > buyStd) {
    return {
      flag: false,
      sellAmount: 0,
    };
  } else {
    const time = new Date().getTime();
    const timeLimit = time - 3600000;
    const timeFlag = await findTx(timeLimit).catch(async (err) => {
      await handleError(err);
    });
    checkVerb(`Time flag => ${timeFlag}`);
    if (timeFlag) {
      const sellAmount = amount / 3;
      return {
        flag: true,
        sellAmount,
      };
    } else {
      return {
        flag: false,
        sellAmount: 0,
      };
    }
  }
}
