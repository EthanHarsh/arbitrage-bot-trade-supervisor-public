import {checkVerb} from '../../utils';
export default function findBuy(sellAmount, buyObj, sellPrice, buyPrice) {
  checkVerb(`Sell price => ${sellPrice}`);
  checkVerb(`Buy price => ${buyPrice}`);
  const sellAmountUsd = sellAmount * sellPrice;
  const buyAmount = sellAmountUsd / buyPrice;
  checkVerb(`Sell amount => ${sellAmount}`);
  checkVerb(`Buy amount => ${buyAmount}`);
  return buyAmount - (0.01 * buyAmount);
}
