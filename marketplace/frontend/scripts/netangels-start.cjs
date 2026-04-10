/**
 * NetAngels (и похожий хостинг): слушать только APP_IP:APP_PORT из окружения панели.
 * @see https://www.netangels.ru/support/cloud-hosting/node/
 */
const { spawn } = require("child_process");
const path = require("path");

const host = process.env.APP_IP || "0.0.0.0";
const port = String(process.env.APP_PORT || process.env.PORT || "3000");

const nextPkg = path.dirname(require.resolve("next/package.json"));
const nextBin = path.join(nextPkg, "dist", "bin", "next");

const child = spawn(process.execPath, [nextBin, "start", "--hostname", host, "--port", port], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code) => process.exit(code ?? 1));
