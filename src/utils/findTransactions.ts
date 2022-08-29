import mongoose from 'mongoose';
const transactionSchema = new mongoose.Schema({
  action: String,
  sell: String,
  buy: String,
  sellPriceFTM: Number,
  buyPriceFTM: Number,
  sellPriceUSD: Number,
  buyPriceUSD: Number,
  sellNumberofTokens: Number,
  buyNumberofTokens: Number,
  time: Number,
  humanTime: String,
  swing_complete: Boolean,
  exchange: String,
});

const TxModel = mongoose.model('executed-transaction', transactionSchema);

const findTx = async (timeLimit) => {
  const transaction = await TxModel
      .find({
        time: {$gt: timeLimit},
      })
      .limit(1);
  console.log(transaction);
  if (transaction.length > 0) {
    return false;
  } else {
    return true;
  }
};

export default findTx;
