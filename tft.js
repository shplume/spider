/* eslint-disable no-undef */
const puppeteer = require('puppeteer');
const writeLog = require('./log');

const print = console.log;

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  const page = await browser.newPage();

  const url = 'https://lol.qq.com/tft/#/rank/list';
  const containerClass = '.synergy-rank-list';
  const listClass = '.synergy-rank-info';
  const bondClass = '.synergy-txt';
  const rateClass = '.number-list';

  page.on('console', msg => writeLog('log/tft.log', msg.text()));
  await page.exposeFunction('bondClass', () => bondClass);
  await page.exposeFunction('rateClass', () => rateClass);

  try {
    // Navigate the page to a URL
    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    const container = await page.$(containerClass);
    const data = await container.$$eval(listClass, async nodes => await Promise.all(nodes.map(async n => {
      const bond = n.querySelector('.synergy-txt').innerHTML;

      const rate = n.querySelector('.number-list').children;
      const attendance = rate[0].innerHTML;
      const score = rate[1].innerHTML;
      const victory = rate[2].innerHTML;

      return {
        bond,
        attendance,
        score,
        victory,
      };
    })));

    print(data);

  } catch (e) {
    print(e.message);
  }

  await browser.close();
})();
