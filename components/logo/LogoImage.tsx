

'use client'

import Image from 'next/image'

export const Logo = () => {
    return (
        <div className='h-[56px] aspect-square flex items-center justify-center'>
            <Image
                src='/logo.svg'
                alt={'logo.alt'}
                width={56}
                height={42}
                className='block dark:hidden object-contain transition-opacity duration-300'
                priority
            />
            <Image
                src='/logo-dark.svg'
                alt={'logo.alt'}
                width={56}
                height={42}
                className='hidden dark:block object-contain transition-opacity duration-300'
                priority
            />
        </div>
    )
}

export const LogoLarge = () => {
    return (
        <div className='h-[112px] aspect-square flex items-center justify-center'>
            <Image
                src='/logo.svg'
                alt={'logo.alt'}
                width={112}
                height={84}
                className='block dark:hidden object-contain transition-opacity duration-300'
                priority
            />
            <Image
                src='/logo-dark.svg'
                alt={'logo.alt'}
                width={112}
                height={84}
                className='hidden dark:block object-contain transition-opacity duration-300'
                priority
            />
        </div>
    )
}
export const LogoHero = () => {
    return (
        <div className='h-[84px] aspect-square flex items-center justify-center'>
            <Image
                src='/logo.svg'
                alt={'logo.alt'}
                width={72}
                height={54}
                className='block dark:hidden object-contain transition-opacity duration-300'
                priority
            />
            <Image
                src='/logo-dark.svg'
                alt={'logo.alt'}
                width={72}
                height={54}
                className='hidden dark:block object-contain transition-opacity duration-300'
                priority
            />
        </div>
    )
}
