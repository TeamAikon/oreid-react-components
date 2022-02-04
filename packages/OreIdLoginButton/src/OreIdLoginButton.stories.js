import React from "react";
import { storiesOf } from "@storybook/react";
import OreIdLoginButton, { Providers } from "./components";

storiesOf("LoginButton", module).add("Default", () => (
  <section>
    <h1>OreId Login Provider Buttons</h1>
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
      {Providers.map((Provider) => (
        <OreIdLoginButton provider={Provider} onClick={(e, provider) => alert(`Login Provider: ${provider}`)} />
      ))}
    </div>
  </section>
));
