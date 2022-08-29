export default function setSwingAmount(tokenBalances: any, stats: any, sell: any, buy: any, sellPrice: any, buyPrice: any, swingTradeAmount: any): Promise<{
    flag: boolean;
    sellAmount: number;
    buyAmount: number;
    sellAmountWei: number;
    buyAmountWei: number;
} | {
    flag: true;
    sellAmount: any;
    buyAmount: number;
    sellAmountWei: import("ethers").BigNumber;
    buyAmountWei: import("ethers").BigNumber;
}>;
