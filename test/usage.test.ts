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

  beforeAll(async () => {
    serverProcess = spawn("yarn", ["run", "wrangler", "pages", "dev"], {
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
    await leader.goto("http://localhost:8788/beta/demo/map");
    await leader.getByRole("button", { name: "Filter" }).click();
    expect(leader.url()).toContain("/beta/demo/filter");

    await leader.getByLabel("Name").fill("Starbucks");
    await leader.getByLabel("Area").selectOption("new_york");
    await leader.getByRole("button", { name: "Apply" }).click();

    await expect(leader.locator("#app")).not.toContainText("No results found");
    expect(leader.url()).toContain("/beta/demo/map");
  });

  test.only("searching nearby", async () => {
    await leader.goto("http://localhost:8788/beta/nearby/map");
    await leader.getByRole("button", { name: "Filter" }).click();
    expect(leader.url()).toContain("/beta/nearby/filter");

    await leader.getByLabel("Address").fill(
      "42 grand street new york ny 10013",
    );
    await leader.getByRole("option", { name: /New York, New York/ }).click();
    await leader.getByLabel("Banking").click();
    await leader.getByRole("button", { name: "Apply" }).click();

    await expect(leader.locator("#app")).not.toContainText("No results found");
    expect(leader.url()).toContain("/beta/nearby/map");
  });
});
