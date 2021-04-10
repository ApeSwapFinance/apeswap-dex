import { useEffect, useState } from 'react'
import { useActiveWeb3React } from 'hooks'

const initialState = {
  profileLink: 'https://apeswap.finance/nft',
  noProfileLink: 'https://apeswap.finance/nft',
}

/**
 * Note - this will only work if the app is on the same domain
 */
const useGetLocalProfile = () => {
  const [profile, setProfile] = useState(initialState)
  const { account } = useActiveWeb3React()

  useEffect(() => {
    if (account) {
      try {
        const localData = localStorage.getItem(`profile_${account}`)

        if (localData) {
          const localProfile = JSON.parse(localData)

          setProfile((prevProfile) => ({
            ...prevProfile,
            name: localProfile.name,
            image: localProfile.avatar,
          }))
        }
      } catch (error) {
        setProfile(initialState)
      }
    } else {
      setProfile(initialState)
    }
  }, [account, setProfile])

  return profile
}

export default useGetLocalProfile
