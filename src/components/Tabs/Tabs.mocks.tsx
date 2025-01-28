//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { TabsContent, TabsList, TabsTrigger } from "./Tabs";

export enum Tab {
  lorem = "lorem",
  ipsum = "ipsum",
  dolor = "dolor",
}

export const elements = {
  triggers: (
    <TabsList>
      <TabsTrigger value={Tab.lorem}>Lorem</TabsTrigger>
      <TabsTrigger value={Tab.ipsum}>Ipsum</TabsTrigger>
      <TabsTrigger value={Tab.dolor}>Dolor</TabsTrigger>
    </TabsList>
  ),
  content: (
    <>
      <TabsContent value={Tab.lorem}>
        <h1 className="text-xl">Lorem content</h1>
        Accusantium debitis dignissimos eaque explicabo impedit minima, modi
        nisi pariatur praesentium voluptatem! Aliquam corporis enim error iste
        pariatur sed vel, voluptas voluptates.
      </TabsContent>
      <TabsContent value={Tab.ipsum}>
        <h1 className="text-xl">Ipsum content</h1>
        Alias animi corporis ea facilis magnam nulla obcaecati omnis possimus
        quis voluptatum. Consectetur enim expedita facilis fugiat molestiae odio
        officiis, placeat! Harum.
      </TabsContent>
      <TabsContent value={Tab.dolor}>
        <h1 className="text-xl">Dolor content</h1>
        Ab aperiam autem blanditiis culpa deleniti earum expedita, harum ipsa
        ipsum itaque molestias neque nesciunt nisi odio pariatur quibusdam sequi
        tempora vel?
      </TabsContent>
    </>
  ),
};
