//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Menu } from "lucide-react";
import { type ReactNode } from "react";
import { DashboardContext } from "@/molecules/DashboardLayout/DashboardContext";
import { cn } from "@/utils/className";
import { Button } from "../../components/Button";
import { useOpenState } from "../../utils/useOpenState";

export interface DashboardLayoutProps {
  title?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  mobile?: ReactNode;
  /**
   * Enables auto-shrink of dashboard's aside on lg screens. This optimizes real estate.
   * @default true
   * */
  shrinkable?: boolean;
}

export const DashboardLayout = ({
  title,
  actions,
  children,
  aside,
  mobile,
  shrinkable = true,
}: DashboardLayoutProps) => {
  const menu = useOpenState();

  return (
    <DashboardContext.Provider value={{ shrinkable }}>
      <div
        className={cn(
          "text-foreground [--headerHeight:72px] **:[box-sizing:border-box] lg:[--headerHeight:86px]",
          shrinkable ?
            "[--asideWidth:86px] xl:[--asideWidth:240px]"
          : "[--asideWidth:240px]",
        )}
      >
        <header
          className={cn(
            "border-b-border-layout flex h-(--headerHeight) items-center gap-4 border-x-0 border-t-0 border-b border-solid px-4 py-1 lg:ml-(--asideWidth) xl:px-8",
            !title && !actions && "lg:hidden",
          )}
        >
          {title}
          <div className="ml-auto gap-4">
            {actions}
            <Button
              onClick={menu.toggle}
              aria-label={`${menu.isOpen ? "Close" : "Open"} menu`}
              className="ml-4 lg:hidden"
            >
              <Menu />
            </Button>
          </div>
        </header>
        <aside
          className={cn(
            "border-r-border-layout bg-surface fixed top-0 left-0 hidden h-screen w-(--asideWidth) flex-col items-center border-y-0 border-r border-l-0 border-solid py-4 lg:flex",
            shrinkable ? "xl:px-3" : "lg:px-3",
          )}
        >
          {aside}
        </aside>
        <nav
          className={cn(
            "bg-surface fixed top-[calc(var(--headerHeight)+1px)] right-0 left-0 flex h-[calc(100vh-var(--headerHeight)-1px)] w-screen flex-col overflow-y-auto transition duration-300 lg:hidden",
            menu.isOpen ? "z-10 translate-x-0" : (
              "pointer-events-none -translate-x-24 opacity-0"
            ),
          )}
          hidden={!menu.isOpen}
          data-testid="mobileMenu"
        >
          {actions && <div className="p-4">{actions}</div>}
          {mobile}
        </nav>
        <div className="flex min-h-[calc(100vh-var(--headerHeight))] flex-col px-4 pt-6 pb-12 md:px-12 md:pt-10 md:pb-16 lg:ml-(--asideWidth)">
          {children}
        </div>
      </div>
    </DashboardContext.Provider>
  );
};
