#!/usr/bin/env node
import { executeTippecanoeCommand } from "./utils.js";

function cli() {
  const params = process.argv.slice(2);
  executeTippecanoeCommand(params);
}

cli();
