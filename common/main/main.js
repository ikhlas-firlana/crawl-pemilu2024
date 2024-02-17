const puppeteer = require('puppeteer');
const { Administrative } = require("../repositories/administrative");
const db = require('../database/models');

const main = async ({ config, Handlers, url, name, modelName } ) => {

  const browser = await puppeteer.launch(config);
  const page = await browser.newPage();

  try {
    await page.goto(url,{
      waitUntil: 'load',
      timeout: 0
    });
    if (config.screenshot) {
      await page.screenshot({path: `${process.cwd()}/screenshot/${name}.png`});
    }
    if (config.viewPort) {
      await page.setViewport(config.viewPort);
    }

    const administrative = new Administrative({model: db[modelName]});
    const handlers = new Handlers(page, config, administrative, browser);

    await handlers.WrapHandlers();

    await browser.close();
  } catch (e) {
    console.log(e);
    if (config.screenshot) {
      await page.screenshot({path: `${process.cwd()}/screenshot/${name}_error.png`});
    }
    await browser.close();
  }
};

module.exports = {
  main,
}
