const puppeteer = require('puppeteer');

async function scrapeFlipkartMobiles() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(60000);

  try {
    await page.goto('https://www.flipkart.com/mobiles/pr?sid=tyy,4io');
  } catch (error) {
    console.error('Navigation Timeout Error:', error);
    await browser.close();
    throw new Error('Navigation Timeout Error');
  }

  const products = await page.evaluate(() => {
    const productTitles = document.querySelectorAll('div._1AtVbE a._1fQZEK');
    const productPrices = document.querySelectorAll('div._1AtVbE div._30jeq3');
    const productRatings = document.querySelectorAll('div._1AtVbE div._3LWZlK');

    const productList = [];

    for (let i = 0; i < productTitles.length; i++) {
      const title = productTitles[i].textContent.trim();
      const price = productPrices[i].textContent.trim();
      const rating = productRatings[i].textContent.trim();

      productList.push({ title, price, rating });
    }
    return productList;
  });

  await browser.close();
  return products;
}

async function scrapeFlipkartMobilesFull() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(60000);

  try {
    await page.goto('https://www.flipkart.com/mobiles/pr?sid=tyy,4io');
  } catch (error) {
    console.error('Navigation Timeout Error:', error);
    await browser.close();
    throw new Error('Navigation Timeout Error');
  }

  const productUrls = await page.evaluate(() => {
    const urls = [];
    const products = document.querySelectorAll('div._1AtVbE');

    products.forEach(product => {
      const urlElement = product.querySelector('a._1fQZEK');
      if (urlElement && urlElement.href) { 
        const url = urlElement.href;
        urls.push(url);
      }
    });

    return urls;
  });

  const products = await Promise.all(productUrls.map(async (url) => {
    const productPage = await browser.newPage();
    await productPage.goto(url);

    const productDetails = await productPage.evaluate((url) => { 
      const title = document.querySelector('h1').textContent.trim();
      const price = document.querySelector('div._30jeq3').textContent.trim();
      const rating = document.querySelector('div._3LWZlK').textContent.trim();
  
      return {
        title,
        price,
        rating,
        url 
      };
    }, url); 

    await productPage.close();

    return productDetails;
  }));

  await browser.close();
  return products;
}

module.exports = {
  scrapeFlipkartMobiles,
  scrapeFlipkartMobilesFull
};
