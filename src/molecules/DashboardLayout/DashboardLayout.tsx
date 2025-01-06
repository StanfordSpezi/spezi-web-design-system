//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Menu } from 'lucide-react'
import { type ReactNode } from 'react'
import { Button } from '../../components/Button'
import { cn } from '../../utils/className'
import { useOpenState } from '../../utils/useOpenState'

export interface DashboardLayoutProps {
  title?: ReactNode
  actions?: ReactNode
  children?: ReactNode
  aside?: ReactNode
  mobile?: ReactNode
}

export const DashboardLayout = ({
  title,
  actions,
  children,
  aside,
  mobile,
}: DashboardLayoutProps) => {
  const menu = useOpenState()

  return (
    <div
      className={cn(
        'text-foreground [--asideWidth:86px] xl:[--asideWidth:240px] [&_*]:[box-sizing:border-box]',
        title ?
          '[--headerHeight:72px] lg:[--headerHeight:86px]'
        : '[--headerHeight:0px]',
      )}
    >
      {title && (
        <header className="border-b-border-layout flex h-[--headerHeight] items-center gap-4 border-x-0 border-b border-t-0 border-solid px-4 py-1 lg:ml-[--asideWidth] xl:px-8">
          {title}
          <div className="ml-auto gap-4">
            {actions}
            <Button
              onClick={menu.toggle}
              aria-label={`${menu.isOpen ? 'Close' : 'Open'} menu`}
              className="ml-4 lg:hidden"
            >
              <Menu />
            </Button>
          </div>
        </header>
      )}

      <aside className="border-r-border-layout fixed left-0 top-0 hidden h-screen w-[--asideWidth] flex-col items-center border-y-0 border-l-0 border-r border-solid bg-surface py-4 lg:flex xl:px-3">
        {aside}
      </aside>
      <nav
        className={cn(
          'fixed left-0 right-0 top-[calc(var(--headerHeight)+1px)] flex h-[calc(100vh-var(--headerHeight)-1px)] w-screen flex-col overflow-y-auto bg-surface transition duration-300 lg:hidden',
          menu.isOpen ? 'z-10 translate-x-0' : (
            'pointer-events-none -translate-x-24 opacity-0'
          ),
        )}
        hidden={!menu.isOpen}
        data-testid="mobileMenu"
      >
        {actions && <div className="p-4">{actions}</div>}
        {mobile}
      </nav>
      <div className="flex min-h-[calc(100vh-var(--headerHeight))] flex-col px-4 pb-12 pt-6 md:px-12 md:pb-16 md:pt-10 lg:ml-[--asideWidth]">
        {children}
      </div>
    </div>
  )
}
