import { useCallback } from 'react'

const useReward = (rewardRef, callback) => {
  const handleReward = useCallback(
    async (...args) => {
      await callback(...args)
      rewardRef.current?.rewardMe()
    },
    [callback, rewardRef],
  )

  return handleReward
}

export default useReward
