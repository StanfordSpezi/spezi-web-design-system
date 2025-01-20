//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { cva, type VariantProps } from 'class-variance-authority'
import { type ReactNode, useEffect, useState } from 'react'
import { cn } from '@/utils/className'
import { isEmpty, type Nil } from '@/utils/misc'

type AvatarProps = {
  className?: string
  src?: Nil<string>
  fallback?: ReactNode
  name?: Nil<string>
} & VariantProps<typeof avatarVariance>

export const getInitials = (value: string) => {
  const words = value.trim().split(' ')
  if (isEmpty(words)) return ''
  if (words.length === 1)
    return words.at(0)?.substring(0, 2).toLocaleUpperCase() ?? ''
  const nameLetter = words.at(0)?.at(0) ?? ''
  const surnameLetter = words.at(-1)?.at(0) ?? ''
  return `${nameLetter}${surnameLetter}`.toLocaleUpperCase()
}

export const avatarVariants = {
  size: {
    sm: 'size-8 text-xs',
    default: 'size-12',
    lg: 'size-16 text-xl',
  },
}

export const avatarVariance = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: avatarVariants,
    defaultVariants: {
      size: 'default',
    },
  },
)

export const Avatar = ({
  className,
  src,
  fallback,
  size,
  name,
}: AvatarProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    setIsImageLoaded(false)
  }, [src])

  const fallbackContent =
    isImageLoaded ? null
    : name ? getInitials(name)
    : fallback

  return (
    <div className={cn(avatarVariance({ size }), className)}>
      {src && (
        <img
          className={cn(
            'aspect-square size-full object-cover',
            !isImageLoaded && 'opacity-0',
          )}
          src={src}
          onLoad={() => setIsImageLoaded(true)}
          alt={[name, 'avatar'].filter(Boolean).join(' ')}
        />
      )}
      {fallbackContent && (
        <div className="flex-center size-full rounded-full bg-muted">
          {fallbackContent}
        </div>
      )}
    </div>
  )
}
