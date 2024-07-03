import { _Window } from "openfin/_v2/api/window/window";

let loginWindow: _Window;

const start = async () => {
  loginWindow = await fin.Window.create({
    name: "login window",
    defaultWidth: 410,
    defaultHeight: 568,
    alwaysOnTop: false,
    frame: false,
    saveWindowState: false,
    showTaskbarIcon: true,
    autoShow: true,
    resizable: false,
    defaultCentered: true,
    cornerRounding: {
      width: 10,
      height: 10,
    },
  });
  try {
    await loginWindow.navigate('https://workspace.ppe.refinitiv.com/public/heimdall/logout/logout.html?nextPath=/rap/workspace-login/');
  } catch (err) {
    console.error('navigate failed', err);
  }
};

start();
