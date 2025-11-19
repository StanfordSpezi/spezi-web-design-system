//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from ".";

const meta: Meta = {
  title: "Components/Select",
};

export default meta;

export const Default = () => (
  <Select>
    <SelectTrigger className="w-[220px]">
      <SelectValue placeholder="Organizations" />
    </SelectTrigger>
    <SelectContent>
      {["Lorem", "Ipsum", "Sir", "Dolor", "Amet"].map((organization) => (
        <SelectItem value={organization} key={organization}>
          {organization}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export const GroupedOptions = () => (
  <Select>
    <SelectTrigger className="w-[220px]">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup heading="Fruits">
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup heading="Vegetables">
        <SelectItem value="carrot">Carrot</SelectItem>
        <SelectItem value="potato">Potato</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

export const CustomOptions = () => (
  <Select search>
    <SelectTrigger className="w-[220px]">
      <SelectValue placeholder="Select option" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="clinician" itemText="Clinician">
        <div className="flex flex-col">
          <b>Clinician</b>
          <p>Clinician can access their organization data </p>
        </div>
      </SelectItem>
      <SelectItem value="owner" itemText="Organization owner">
        <div className="flex flex-col">
          <b>Organization owner</b>
          <p>Organization owner can manage their organization users and data</p>
        </div>
      </SelectItem>
      <SelectItem value="admin" itemText="Admin">
        <div className="flex flex-col">
          <b>Admin</b>
          <p>Admin can modify every organization and invite users</p>
        </div>
      </SelectItem>
    </SelectContent>
  </Select>
);

export const Search = () => (
  <Select search>
    <SelectTrigger className="w-[220px]">
      <SelectValue placeholder="Select a framework" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="react">React</SelectItem>
      <SelectItem value="vue">Vue</SelectItem>
      <SelectItem value="angular">Angular</SelectItem>
      <SelectItem value="svelte">Svelte</SelectItem>
      <SelectItem value="solid">Solid</SelectItem>
      <SelectItem value="qwik">Qwik</SelectItem>
    </SelectContent>
  </Select>
);

export const CustomSearch = () => (
  <Select
    search={{
      placeholder: "Search languages...",
      emptyMessage: "No language found.",
    }}
  >
    <SelectTrigger className="w-[220px]">
      <SelectValue placeholder="Select a language" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="javascript">JavaScript</SelectItem>
      <SelectItem value="typescript">TypeScript</SelectItem>
      <SelectItem value="python">Python</SelectItem>
      <SelectItem value="rust">Rust</SelectItem>
      <SelectItem value="go">Go</SelectItem>
    </SelectContent>
  </Select>
);

export const WithCreate = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <p className="text-muted-foreground mb-2 text-sm">
        Selected: {value || "None"}
      </p>
      <Select
        value={value}
        onValueChange={setValue}
        search
        create
        formatValue={(value) => `new sport: ${value}`}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Select or create sport..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="football">Football</SelectItem>
          <SelectItem value="basketball">Basketball</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export const Controlled = () => {
  const [value, setValue] = useState("apple");

  return (
    <div className="space-y-4">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-muted-foreground text-sm">Selected: {value}</p>
    </div>
  );
};

export const Disabled = () => (
  <Select disabled>
    <SelectTrigger className="w-[220px]">
      <SelectValue placeholder="Organizations" />
    </SelectTrigger>
    <SelectContent>
      {["Lorem", "Ipsum", "Sir", "Dolor", "Amet"].map((organization) => (
        <SelectItem value={organization} key={organization}>
          {organization}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
