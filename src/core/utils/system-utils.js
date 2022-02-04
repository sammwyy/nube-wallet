export const EXECUTION_CONTEXT = {
  DESKTOP: 0,
  BROWSER: 1,
  MOBILE: 2,
  UNKNOWN: 99,
};

export function getSystemAppdata() {
  return (
    process.env.APPDATA ||
    (process.platform === "darwin"
      ? process.env.HOME + "/Library/Preferences"
      : process.env.HOME + "/.local/share")
  );
}

export function getExecutionContext() {
  if (
    typeof process !== "undefined" &&
    typeof process.versions.node !== "undefined"
  ) {
    return EXECUTION_CONTEXT.DESKTOP;
  } else if (
    typeof navigator != "undefined" &&
    navigator.product === "ReactNative"
  ) {
    return EXECUTION_CONTEXT.MOBILE;
  } else if (typeof window !== "undefined" && typeof document !== "undefined") {
    return EXECUTION_CONTEXT.BROWSER;
  } else {
    return EXECUTION_CONTEXT.UNKNOWN;
  }
}

export function hasData(file) {
  const ctx = getExecutionContext();

  if (ctx === EXECUTION_CONTEXT.DESKTOP) {
    const electron = require("electron");
    const path = electron.remote.require("path");
    const fs = electron.remote.require("fs");
    console.log(fs);

    const dir = path.join(getSystemAppdata(), ".nubewallet");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    return fs.existsSync(path.join(dir, file));
  }
}

export function readData(file) {
  const ctx = getExecutionContext();

  if (ctx === EXECUTION_CONTEXT.DESKTOP) {
    const path = require("path");
    const fs = require("fs");

    const dir = path.join(getSystemAppdata(), ".nubewallet");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    return fs.readFileSync(path.join(dir, file), { encoding: "utf-8" });
  }
}

export function writeData(file, data) {
  const ctx = getExecutionContext();

  if (ctx === EXECUTION_CONTEXT.DESKTOP) {
    const path = require("path");
    const fs = require("fs");

    const dir = path.join(getSystemAppdata(), ".nubewallet");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    return fs.writeFileSync(path.join(dir, file), data, { encoding: "utf-8" });
  }
}
