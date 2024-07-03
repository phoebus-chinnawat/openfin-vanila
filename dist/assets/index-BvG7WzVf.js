(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
let loginWindow;
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
      height: 10
    }
  });
  try {
    await loginWindow.navigate("https://raw.githack.com/phoebus-chinnawat/openfin-vanila/reproduce-err-aborted/dist/login.html");
  } catch (err) {
    console.error("navigate failed", err);
  }
};
start();
