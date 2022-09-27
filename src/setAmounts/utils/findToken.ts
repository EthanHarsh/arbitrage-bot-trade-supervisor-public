export default function findToken(tokenBalances, sell) {
  for (const token of tokenBalances) {
    if (token.token === sell) {
      return token;
    }
  }
}
