import { Controller, Get, Query } from '@nestjs/common';
import Moralis from 'moralis';

@Controller()
export class MoralisController {
  constructor() {
    Moralis.start({
      apiKey: process.env.moralis_api_key,
    });
  }
  @Get('/balance')
  async getBalance(@Query('address') address: string): Promise<{
    nativeBalance: { wei: string; formatted: string };
    tokenBalances: { name: string; symbol: string; balance: string }[];
  }> {
    const balanceResponse = await Moralis.EvmApi.balance.getNativeBalance({
      address: address,
    });

    const nativeBalance = {
      wei: balanceResponse.result.balance.wei,
      formatted: balanceResponse.result.balance.ether.slice(0, 7),
    };

    const tokensResponse = await Moralis.EvmApi.token.getWalletTokenBalances({
      address: address,
    });

    const tokenList = tokensResponse.raw;

    const tokenBalances = tokenList.map((token) => {
      return {
        name: token.name,
        symbol: token.symbol,
        balance: token.balance,
        formattedBalance: `${Number(token.balance) / 10 ** token.decimals} - ${
          token.symbol
        }`,
      };
    });

    return { nativeBalance, tokenBalances };
  }
}
