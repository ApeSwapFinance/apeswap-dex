
const baseUrlStrapi = 'https://apeswap-strapi.herokuapp.com'

export interface Banner {
    title: string
    subtitle: string
    description: string
    link: string
}

let bannerPromise

export const fetchBanner = async () => {
  const url = `${baseUrlStrapi}/dexes`
  const resp = await fetch(url)
  const data = await resp.json()
  const poolsList: Banner = data.length > 0 ? data[0] : null

  return poolsList
}

export const getBanner = async () => {
  if (!bannerPromise) bannerPromise = fetchBanner()

  return bannerPromise
}
