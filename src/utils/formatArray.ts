import {BigNumber, utils} from 'ethers';
export default function formatArray(body) {
  const tokenBalanceArr = body.tokenBalanceArr;
  const tokenBalances = [];
  for (const reqToken of tokenBalanceArr) {
    const tokenBalance = BigNumber.from(reqToken.balance);
    const tokenDecimals = findDecimals(reqToken.token);
    const tokenBalanceEth = utils.formatUnits(tokenBalance.toString(), tokenDecimals);
    tokenBalances.push({balance: tokenBalanceEth, token: reqToken.token, decimals: tokenDecimals});
  }
  return tokenBalances;
}

function findDecimals(tokenName) {
  switch (tokenName) {
    case 'DAI':
      return 18;
      break;
    case 'USDC':
      return 6;
      break;
    case 'FUSDT':
      return 6;
      break;
    case 'MIM':
      return 18;
      break;
    default:
      return 18;
      break;
  }
}
