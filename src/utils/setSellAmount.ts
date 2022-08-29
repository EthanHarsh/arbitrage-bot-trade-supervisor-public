import {utils} from 'ethers';
import findTx from './findTransactions';

export default async function setSellAmount(tokenBalances, stats, sell, buy, sellPrice, buyPrice) {
  const sellObj = findToken(tokenBalances, sell);
  const buyObj = findToken(tokenBalances, buy);
  // @ts-ignore
  const {sellAmount, flag} = await findAmounts(sellObj, buyObj, stats);
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
  console.log(`Sell amount wei => ${sellAmountWei}`);
  console.log(`Buy amount wei => ${buyAmountWei}`);
  return {
    flag,
    sellAmount,
    buyAmount,
    sellAmountWei,
    buyAmountWei,
  };
}

function findToken(tokenBalances, sell) {
  for (const token of tokenBalances) {
    if (token.token === sell) {
      return token;
    }
  }
}

async function findAmounts(sellObj, buyObj, stats) {
  // @ts-ignore
  const {sellAmount, flag} = await firstTier(sellObj, buyObj, stats);
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
    const timeFlag = await findTx(timeLimit);
    console.log(`Time flag => ${timeFlag}`);
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
    const timeFlag = await findTx(timeLimit);
    console.log(`Time flag => ${timeFlag}`);
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

function findBuy(sellAmount, buyObj, sellPrice, buyPrice) {
  console.log(`Sell price => ${sellPrice}`);
  console.log(`Buy price => ${buyPrice}`);
  const sellAmountUsd = sellAmount * sellPrice;
  const buyAmount = sellAmountUsd / buyPrice;
  console.log(`Sell amount => ${sellAmount}`);
  console.log(`Buy amount => ${buyAmount}`);
  return buyAmount - (0.01 * buyAmount);
}

function formatAmounts(sellAmount, buyAmount, sellDecimals, buyDecmials) {
  const sellAmountWei = utils.parseUnits(sellAmount.toFixed(6).toString(), sellDecimals);
  const buyAmountWei = utils.parseUnits(buyAmount.toFixed(6).toString(), buyDecmials);
  return {
    sellAmountWei,
    buyAmountWei,
  };
}
