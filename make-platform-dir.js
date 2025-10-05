import { existsSync, mkdirSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const identifier = os.platform()+'_'+os.arch();

const dir = path.join(process.cwd(), 'bin', identifier);
if (!existsSync(dir)) {
  mkdirSync(dir);
}