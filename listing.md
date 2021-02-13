# ApeSwap Listing Tutorial

So, you’ve come, you’ve tasted our secret sauce 🥞 and now you’re wanting to be a part of the ApeSwap kitchen.

If you’re interested in listing on the ApeSwap exchange, follow this guide closely.

## Requirements

If you are seeking to be added to the [ApeSwap.finance](https://apeswap.finance/) exchange, you should open a [listing request issue](#). Someone from the team will review your application. Once it's validated, you can jump to the mext step.

## Adding Tokens

1. Fork the [ApeSwapFinance Interface](https://github.com/ApeSwapFinance/apeswap-dex/) repository on GitHub
2. Upload your **logo** in a 96\*96px transparent .png format to the `/public/images/coins` directory. Please name the logo as your symbol in uppercase.

3. Add your **token information** using the example format provided below to `apeswap.json` in the `/src/constants/token/` directory.

4. Create a **pull request** detailing information about your project, website address, and contact details (telegram)

## Examples

**Logo format:**

`SYRUP.png`

**Token information format:**

```json
{
"name": "Syrup Token",
"symbol": "SYRUP",
"address": "0x009cF7bC57584b7998236eff51b98A168DceA9B0",
"chainId": 56,
"decimals": 18,
"logoURI": "/images/coins/SYRUP.png"
},
```

If you're not comfortable with GitHub pull requests, please open a [new issue](https://github.com/ApeSwapFinance/ape-swap-dex/issues/new) requesting to be added.

## Reviews

Once added, tokens are also re-reviewed at regular intervals in order to maintain quality assurance in-line with the below criteria, and may be removed should severe and/or unresolved issues be encountered.

### Criteria

- Volume
- Liquidity
- Community feedback
