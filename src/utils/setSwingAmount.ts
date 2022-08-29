import {utils} from 'ethers';

export default async function setSwingAmount(tokenBalances, stats, sell, buy, sellPrice, buyPrice, swingTradeAmount) {
  const sellObj = findToken(tokenBalances, sell);
  const buyObj = findToken(tokenBalances, buy);
  // @ts-ignore
  const {sellAmount, flag} = await findAmounts(sellObj, buyObj, stats, swingTradeAmount);
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

async function findAmounts(sellObj, buyObj, stats, swingTradeAmount) {
  const {sellAmount, flag} = await firstTier(sellObj, buyObj, stats, swingTradeAmount);
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
