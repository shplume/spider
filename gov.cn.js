const puppeteer = require('puppeteer');

const print = console.log;

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  const page = await browser.newPage();

  const url = 'https://www.gov.cn/';
  const targetID = '#index_zcjd';
  const selectType = 'ul';

  try {
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
