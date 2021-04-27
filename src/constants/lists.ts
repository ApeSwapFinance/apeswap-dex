// the Uniswap Default token list lives here
// export const DEFAULT_TOKEN_LIST_URL = 'tokens.uniswap.eth'
export const DEFAULT_TOKEN_LIST_URL = 'apeswap'
export const BUIDL_TOKEN_LIST_URL = 'buidl'

// export const DEFAULT_LIST_OF_LISTS: string[] = [DEFAULT_TOKEN_LIST_URL]

// copy from uniswap
export const UNSUPPORTED_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  DEFAULT_TOKEN_LIST_URL,
  BUIDL_TOKEN_LIST_URL,
  ...UNSUPPORTED_LIST_URLS // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = []
export const DEFAULT_BUIDL_LIST_URLS: string[] = [BUIDL_TOKEN_LIST_URL]
