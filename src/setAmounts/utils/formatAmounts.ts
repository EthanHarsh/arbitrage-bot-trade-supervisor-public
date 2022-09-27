import {utils} from 'ethers';
export default function formatAmounts(sellAmount, buyAmount, sellDecimals, buyDecmials) {
  const sellAmountWei = utils.parseUnits(sellAmount.toFixed(6).toString(), sellDecimals);
  const buyAmountWei = utils.parseUnits(buyAmount.toFixed(6).toString(), buyDecmials);
  return {
    sellAmountWei,
    buyAmountWei,
  };
}
