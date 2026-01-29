'use client'

import { User } from '@supabase/supabase-js'
import { TypeAnimation } from 'react-type-animation'

export function EntityTypewriter({ user }: { user: User | null }) {
  const userData = user?.user_metadata ?? {}
  return (
    <TypeAnimation
      sequence={[
        userData.full_name,
        4000,
        userData.email,
        4000,
        userData.user_name,
        4000,
      ]}
      repeat={Infinity}
      wrapper='span'
      speed={60}
      className='text-red-700'
    />
  )
}
