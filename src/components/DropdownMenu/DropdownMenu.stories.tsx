//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from '@storybook/react'
import { LogOut } from 'lucide-react'
import { useIsDocs } from '@/tests/storybook'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './DropdownMenu'
import { Button } from '../Button'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
}

export default meta

/**
 * Storybook in Docs view needs couple adjustments to provide good overview behavior
 * */
const useProps = () => {
  const isDocs = useIsDocs()
  return {
    menu: {
      modal: !isDocs,
    },
    content: {
      container: isDocs ? null : undefined,
      avoidCollisions: isDocs ? false : undefined,
    },
  }
}

/**
 * Dropdown with modality and appended to the body
 * */
export const Triggerable = () => (
  <DropdownMenu>
    <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>
        <LogOut />
        Action one
      </DropdownMenuItem>
      <DropdownMenuItem>
        <LogOut />
        Action two
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export const Simple = () => {
  const props = useProps()
  return (
    <div style={{ minHeight: 100 }}>
      <DropdownMenu open={true} {...props.menu}>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent {...props.content}>
          <DropdownMenuItem>
            <LogOut />
            Action one
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut />
            Action two
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const Complex = () => {
  const props = useProps()
  return (
    <div style={{ minHeight: 300 }}>
      <DropdownMenu open={true} {...props.menu}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Trigger</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" {...props.content}>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <LogOut />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <LogOut />
              <span>Billing</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut />
              <span>Keyboard shortcuts</span>
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <LogOut />
                <span>Invite users</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <LogOut />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut />
                    <span>Message</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    <span>More...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
