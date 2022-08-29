export default function calculateStats(tokenBalances) {
  const balances: Array<number> = [];
  for (const tokenBalance of tokenBalances) {
    balances.push(parseFloat(tokenBalance.balance));
  }
  const sum = balances.reduce((a, b) => a + b, 0);
  const avg = sum / balances.length;
  const stdev = Math.sqrt(balances.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / (balances.length - 1));
  const stdev2 = 2 * stdev;
  return {sum, avg, stdev, stdev2};
}
