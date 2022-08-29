export default function setSellAmount(tokenBalances: any, stats: any, sell: any, buy: any, sellPrice: any, buyPrice: any): Promise<{
    flag: boolean;
    sellAmount: number;
    buyAmount: number;
    sellAmountWei: number;
    buyAmountWei: number;
} | {
    flag: true;
    sellAmount: number;
    buyAmount: number;
    sellAmountWei: import("ethers").BigNumber;
    buyAmountWei: import("ethers").BigNumber;
}>;
