//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type UserInfo as AuthUserInfo } from '@firebase/auth-types'
import { type Nil } from '@/utils/misc'

export const getUserInfo = (user: AuthUserInfo) => ({
  displayName: user.displayName,
  email: user.email,
  phoneNumber: user.phoneNumber,
  photoURL: user.photoURL,
  providerId: user.providerId,
  uid: user.uid,
})

export type UserInfo = ReturnType<typeof getUserInfo>

export const getUserName = (user: {
  displayName?: Nil<string>
  email?: Nil<string>
  uid?: Nil<string>
  // We want to exclude empty strings if possible
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
}) => user.displayName || user.email || user.uid
