const puppeteer = require('puppeteer');

const print = console.log;

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = 'https://www.gov.cn/';
  const targetID = '#index_zcjd';
  const selectType = 'ul';

  try {
    // Navigate the page to a URL
    await page.goto(url);

    const container = await page.$(targetID);

    const list = await container.$(selectType);

    const data = await list.$$eval('a', nodes => nodes.map(n => {
      return {
        text: n.innerText,
        link: n.href,
      };
    }));

    print(data);
  } catch (e) {
    print(e.message);
  }

  await browser.close();
})();
