//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import { Badge } from "@/components/Badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/Table";
import { useIsScreen } from "./useMedia";

const meta: Meta = {
  title: "Utils/UseMedia",
};

export default meta;

const Row = ({ label, value }: { label: string; value: boolean }) => (
  <TableRow>
    <TableCell className="font-medium">{label}</TableCell>
    <TableCell>
      {value ?
        <Badge variant="success">True</Badge>
      : <Badge variant="destructiveLight">False</Badge>}
    </TableCell>
  </TableRow>
);

export const UseIsScreen = () => {
  const isSm = useIsScreen("sm");
  const isMd = useIsScreen("md");
  const isLg = useIsScreen("lg");
  const isXl = useIsScreen("xl");
  const isXxl = useIsScreen("2xl");

  return (
    <>
      <p className="text-muted-foreground mb-4 text-center text-sm">
        Adjust your screen size to see breakpoints
      </p>
      <Table>
        <TableBody>
          <Row label="no breakpoint (<640px)" value={true} />
          <Row label="sm (640px)" value={isSm} />
          <Row label="md (768px)" value={isMd} />
          <Row label="lg (1024px)" value={isLg} />
          <Row label="xl (1280px)" value={isXl} />
          <Row label="2xl (1536px)" value={isXxl} />
        </TableBody>
      </Table>
    </>
  );
};
