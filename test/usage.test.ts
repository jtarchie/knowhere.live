import { afterAll, beforeAll, describe, test } from "vitest";
import { chromium } from "playwright";
import type { Browser, Page } from "playwright";
import { expect } from "@playwright/test";
import { ChildProcess, spawn } from "child_process";
import { setTimeout } from "timers/promises";

describe("navigate the site", () => {
  let serverProcess: ChildProcess;
  let browser: Browser;
  let leader: Page;
  let port: number;

  beforeAll(async () => {
    port = 8788; //await getPort();

    serverProcess = spawn("yarn", [
      "run",
      "wrangler",
      "pages",
      "dev",
      "--port",
      port.toString(),
    ], {
      stdio: ["inherit", "pipe", "pipe"],
      shell: true,
    });

    serverProcess.stdout?.on("data", (data) => console.log(`${data}`));
    serverProcess.stderr?.on("data", (data) => console.error(`${data}`));

    await setTimeout(2000);

    browser = await chromium.launch({ headless: true });
    leader = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    serverProcess.kill();
  });

  test("search for a costco", async () => {
    await leader.goto(`http://localhost:${port}/beta/demo/map`);
    await leader.getByRole("button", { name: "Search" }).click();
    expect(leader.url()).toContain("/beta/demo/search");

    await leader.getByLabel("Name").fill("Starbucks");
    await leader.getByLabel("Area").selectOption("new_york");
    await leader.getByRole("button", { name: "Apply" }).click();

    expect(leader.url()).toContain("/beta/demo/map");
    const dialog = await leader.getByRole("dialog");
    expect(await dialog.all()).toHaveLength(0);
  });

  test("searching nearby", async () => {
    const errors: Error[] = [];
    leader.on("pageerror", (error) => {
      errors.push(error);
    });

    await leader.goto(`http://localhost:${port}/beta/nearby/map`);

    await leader.getByRole("button", { name: "Search" }).click();
    expect(leader.url()).toContain("/beta/nearby/search");

    const address = await leader.getByLabel("Address");
    await address.fill("42 grand street new york ny 10013");

    expect(address).toHaveValue(/new york ny/);
    await expect(errors).toHaveLength(0);

    await leader.screenshot({ path: "screenshot.png", fullPage: true });
    await expect(leader.getByRole("option", { name: /New York, New York/ }))
      .toBeVisible();
    leader.getByRole("option", { name: /New York, New York/ }).click();

    await expect(address).toHaveValue(/New York, New York/);

    await leader.getByLabel("Banking").click();
    await leader.getByRole("button", { name: "Apply" }).click();

    expect(leader.url()).toContain("/beta/nearby/map");
    const dialog = await leader.getByRole("dialog");
    expect(await dialog.all()).toHaveLength(0);

    await expect(errors).toHaveLength(0);
  });
});
