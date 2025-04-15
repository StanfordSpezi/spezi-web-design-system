//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./Tabs";
import { elements, Tab } from "./Tabs.mocks";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};

export default meta;

export const Default = () => (
  <Tabs defaultValue={Tab.lorem}>
    {elements.triggers}
    {elements.content}
  </Tabs>
);

export const Controlled = () => {
  const [tab, setTab] = useState(Tab.lorem);
  return (
    <Tabs value={tab} onValueChange={(value) => setTab(value as Tab)}>
      {elements.triggers}
      <p>active tab: {tab}</p>
      {elements.content}
    </Tabs>
  );
};

export const CustomPositioning = () => {
  const [tab, setTab] = useState(Tab.lorem);
  return (
    <>
      <Tabs value={tab} onValueChange={(value) => setTab(value as Tab)}>
        <nav className="fixed top-0 left-0">{elements.triggers}</nav>
        {elements.content}
      </Tabs>
    </>
  );
};

export const TriggerGrow = () => (
  <div className="w-96">
    <Tabs defaultValue={Tab.lorem}>
      <TabsList grow>
        <TabsTrigger value={Tab.lorem}>Lorem</TabsTrigger>
        <TabsTrigger value={Tab.ipsum}>Ipsum</TabsTrigger>
        <TabsTrigger value={Tab.dolor}>Dolor</TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
);
