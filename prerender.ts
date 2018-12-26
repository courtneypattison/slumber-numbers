// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';

enableProdMode();

import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { readFile, ensureDir, writeFile } from 'fs-extra';
import { join } from 'path';

const ROUTES = [
  '/',
  '/signin',
];
const APP_NAME = 'slumber-numbers';

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist/${APP_NAME}-server/main`);

async function prerender() {
  // Get the app index
  const browserBuild = `dist/${APP_NAME}`;
  const index = await readFile(join(browserBuild, 'index.html'), 'utf8');

  for (const route of ROUTES) {
    const pageDir = join(browserBuild, route);
    await ensureDir(pageDir);

    // render with universal
    const html = await renderModuleFactory(AppServerModuleNgFactory, {
      document: index,
      url: route,
      extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
    });

    await writeFile(join(pageDir, 'index.html'), html);
  }

  process.exit();
}

prerender();
