import * as WorkspacePlatform from "@openfin/workspace-platform";
import { InitWorkspaceOverrideCallback } from "./overrides/platform";
import { nanoid } from "nanoid";
import { _Window } from "openfin/_v2/api/window/window";

let windows: _Window[] = [];
// let browsers: WorkspacePlatform.BrowserWindowModule[] = [];

const initPlatform = (): Promise<void> => {
  return WorkspacePlatform.init({
    browser: {
      defaultWindowOptions: {
        workspacePlatform: {
          pages: [],
        },
      },
    },
    overrideCallback: InitWorkspaceOverrideCallback(),
  });
};

initPlatform();

const createBrowserBtn = document.getElementById("createBrowserBtn");
const create20BrowserBtn = document.getElementById("create-20-BrowserBtn");
const create20WindowBtn = document.getElementById('create-20-windows-btn');
const clearAllBrowsersBtn = document.getElementById('clear-browsers');
const clearAllWindowsBtn = document.getElementById('clear-windows');
const openOneContainerBtn = document.getElementById('open-one-container');


clearAllBrowsersBtn?.addEventListener('click', async () => {
    const platform = WorkspacePlatform.getCurrentSync();
    const browsers = await platform.Browser.getAllWindows();
    await Promise.all(browsers.map((b) => b.openfinWindow.close()));
});

clearAllWindowsBtn?.addEventListener('click', async () => {
    await Promise.all(windows.map((b) => b.close()));
    windows = [];
});

createBrowserBtn?.addEventListener("click", () => {
  createBrowserWindow();
});

openOneContainerBtn?.addEventListener("click", () => {
    createBrowserWindow('');
});

create20WindowBtn?.addEventListener("click", async () => {
    const promises = Array.from({ length: 20 }, () => {
        const randomUuid = nanoid();
        return fin.Window.create({
            name: `sample=page-${randomUuid}`,
            autoShow: true,
            url: "https://www.example.com/",
            preloadScripts: [
                {
                  url: "https://raw.githack.com/plmzphoebus/openfin-vanila/main/dist/preloads/preload.js",
                },
              ],
        })
    });
    const careatedwindows = await Promise.all(promises);
    windows.push(...careatedwindows);
});

create20BrowserBtn?.addEventListener("click", async () => {
  const promises = Array.from({ length: 20 }, () => createBrowserWindow());
  await Promise.all(promises) as WorkspacePlatform.BrowserWindowModule[];
});

const createBrowserWindow = (url = ''): Promise<
  WorkspacePlatform.BrowserWindowModule | undefined
> => {
  console.log("Starting Application...");
  const platform = WorkspacePlatform.getCurrentSync();
  const randomUuid = nanoid();
  return platform.Browser.createWindow({
    uuid: randomUuid,
    // name: `browser-${randomUuid}`,
    workspacePlatform: {
      title: "Application Browser",
      pages: [
        {
          isActive: true,
          title: "New Application",
          layout: {
            content: [
              {
                type: "component",
                componentName: "view",
                componentState: {
                  name: `Application2-${randomUuid}`,
                  url: url || "https://www.example.com/",
                  preloadScripts: [
                    {
                      url: "https://raw.githack.com/plmzphoebus/openfin-vanila/main/dist/preloads/preload.js",
                      mandatory: true,
                      state: "succeeded",
                    },
                  ],
                },
              },
            ],
          },
          pageId: "Application-tab",
          closeButton: {
            disabled: false,
            hidden: false,
          },
        },
      ],
      newPageUrl: url || "https://www.example.com/",
      favicon: "",
    },
    defaultHeight: 600,
    defaultWidth: 800,
    autoShow: true,
    defaultCentered: true,
    // preloadScripts: [{
    //   url: 'http://localhost:3000/preloads/preload.js',
    //   mandatory: true,
    //   state: 'succeeded'
    // }]
  } as any).catch((error) => {
    console.error("cannot create browser application", error);
    return undefined;
  });
};
