import { chmodSync, existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

export function loadTippecanoePath() {
  const identifier = os.platform() + "_" + os.arch();
  const tippeCanoePath = path.join(
    import.meta.dirname,
    "bin",
    identifier,
    "tippecanoe"
  );
  if (!existsSync(tippeCanoePath)) {
    reject(
      new Error(
        `Hosted binaries don't exist for ${identifier}, contribute at https://github.com/bikehopper/node-tippecanoe`
      )
    );
    return;
  }
  return tippeCanoePath;
}

export function executeTippecanoeCommand(params) {
  const tippecanoePath = loadTippecanoePath();

  console.log(`Running tippecanoe ${params.join(" ")}`);
  return new Promise((resolve, reject) => {
    try {
      chmodSync(tippecanoePath, 0o755);
      const proc = spawn(tippecanoePath, params);
      proc.stdout.on("data", (data) => {
        console.log(`${data}`);
      });
      // Tippecanoe is weird and can sometimes write out normal logs to stderr (why idk!)
      proc.stderr.on("data", (data) => {
        console.log(`${data}`);
      });

      proc.on("close", (code) => {
        if (code !== 0) {
          reject(new Error("Tippecanoe failed to tile"));
        } else {
          resolve();
        }
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}
