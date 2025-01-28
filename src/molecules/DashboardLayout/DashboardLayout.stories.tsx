//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import { Home, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/DropdownMenu";
import { DashboardLayout, MenuItem, PageTitle, UserMenuItem } from ".";

const meta: Meta<typeof DashboardLayout> = {
  title: "Molecules/DashboardLayout",
  component: DashboardLayout,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default = () => {
  const user = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserMenuItem
          name="John Doe"
          img="https://cdn.icon-icons.com/icons2/2643/PNG/512/avatar_female_woman_person_people_white_tone_icon_159360.png"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const menuLinks = (
    <>
      <MenuItem href="/" label="Home" icon={<Home />} isActive />
      <MenuItem href="/" label="Highligthed" icon={<Home />} isHighlighted />
      <MenuItem href="/" label="Another" icon={<User />} />
    </>
  );

  return (
    <DashboardLayout
      aside={
        <>
          <span className="interactive-opacity w-full px-2 pt-4 text-center">
            Logo
          </span>
          <nav className="mt-24 flex flex-col gap-1 xl:w-full">{menuLinks}</nav>
          {user}
        </>
      }
      mobile={
        <>
          <nav className="mt-10 flex flex-col gap-1 px-4">{menuLinks}</nav>
          {user}
        </>
      }
      title={<PageTitle icon={<Home />} title="Home" />}
    >
      Content
    </DashboardLayout>
  );
};
