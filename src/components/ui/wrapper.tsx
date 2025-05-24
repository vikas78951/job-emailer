import React from 'react'
import { ReactNode } from 'react'
import { cn } from '@/src/lib/utils'

interface WrapperProps {
    className?: string
    children: ReactNode
}

const Wrapper = ({ className = '', children }: WrapperProps) => {
    return (
        <div
            className={cn(
                'max-w-[1600px] mx-auto px-[30px]',
                className
            )}
        >
            {children}
        </div>
    )
}

export default Wrapper
