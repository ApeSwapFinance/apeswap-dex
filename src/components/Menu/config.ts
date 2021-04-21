import { MenuEntry } from '@apeswapfinance/uikit'

export const BASE_APP_URL = process.env.REACT_APP_BASE_APP_URL || 'https://apeswap-frontend.vercel.app';

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: BASE_APP_URL,
  },
  {
    label: 'Ape Stats',
    icon: 'StatsIcon',
    href: `${BASE_APP_URL}/stats`,
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: `${BASE_APP_URL}/farms`,
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: `${BASE_APP_URL}/pools`,
  },
  {
    label: 'IAO',
    icon: 'IfoIcon',
    href: `${BASE_APP_URL}/iao`,
  },
  {
    label: 'NFA',
    icon: 'apeNFTIcon',
    href: `${BASE_APP_URL}/nft`,
  },
  {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: `${BASE_APP_URL}/lottery`,
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'https://info.apeswap.finance',
      },
      {
        label: 'Tokens',
        href: 'https://info.apeswap.finance/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://info.apeswap.finance/pairs',
      },
      {
        label: 'Accounts',
        href: 'https://info.apeswap.finance/accounts',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/apeswapfinance',
      },
      {
        label: 'Docs',
        href: 'https://obiedobo.gitbook.io/apeswap-finance',
      },
      {
        label: 'Blog',
        href: 'https://ape-swap.medium.com',
      },
      {
        label: 'Team',
        href: 'https://ape-swap.medium.com/meet-the-founding-monkeys-behind-apeswap-6f837113db00',
      },
      {
        label: 'Community Feedback',
        href: 'https://apeswap.nolt.io/',
      },
      {
        label: 'ApeTV',
        href: 'https://anchor.fm/apetv',
      },
      {
        label: 'GEMZ Audit Report',
        href:
          'https://github.com/ApeSwapFinance/apeswap-banana-farm/blob/master/audits/ApeSwap_GEMZ_Audit_Report_21.03.05.pdf',
      },
    ],
  },
]

export default config
