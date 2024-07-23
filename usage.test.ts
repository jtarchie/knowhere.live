import { afterAll, beforeAll, describe, test } from "vitest";
import { ChildProcess, spawn } from "child_process";
import { chromium } from "playwright";
import { expect } from "@playwright/test";
import type { Browser, Page } from "playwright";

const PORT = 3001;

describe("when visiting the site", async () => {
  let serverProcess: ChildProcess;
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    // Start pocketbase server
    serverProcess = spawn("yarn", [
      "run",
      "wrangler",
      "pages",
      "dev",
      "dist/",
      `--port=${PORT}`,
    ], {
      stdio: ["inherit", "pipe", "pipe"],
      shell: true,
    });

    serverProcess.stdout?.on("data", (data) => console.log(`${data}`));
    serverProcess.stderr?.on("data", (data) => console.error(`${data}`));

    // Wait for pocketbase to initialize
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust timeout based on how quickly your server starts

    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
  })

  afterAll(async () => {
    await browser?.close();
    serverProcess.kill();
  });

  test("should work", async () => {
    await page.goto(`http://localhost:${PORT}`);

    await expect(page.locator("#app")).toContainText(
      "Discover Your Ideal Location",
    );
  })
});