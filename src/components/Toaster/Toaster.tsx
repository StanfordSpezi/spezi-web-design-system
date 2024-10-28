//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Toaster as ToasterBase,
  type ToasterProps as ToasterPropsBase,
} from 'sonner'

interface ToasterProps extends ToasterPropsBase {}

export const Toaster = (props: ToasterProps) => (
  <ToasterBase position="bottom-center" {...props} />
)
