const puppeteer = require('puppeteer');

async function scrapeSnapdealTShirts() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(60000);

  try {
    await page.goto('https://www.snapdeal.com/search?keyword=tshirt&santizedKeyword=&catId=&categoryId=0&suggested=false&vertical=&noOfResults=20&searchState=&clickSrc=go_header&lastKeyword=&prodCatId=&changeBackToAll=false&foundInAll=false&categoryIdSearched=&cityPageUrl=&categoryUrl=&url=&utmContent=&dealDetail=&sort=rlvncy');
  } catch (error) {
    console.error('Navigation Timeout Error:', error);
    await browser.close();
    throw new Error('Navigation Timeout Error');
  }

  const products = await page.evaluate(() => {
    const productList = [];
    const items = document.querySelectorAll('.product-tuple-listing');

    items.forEach(item => {
      const titleElement = item.querySelector('.product-title');
      const priceElement = item.querySelector('.product-price');
      const ratingElement = item.querySelector('.filled-stars');

      if (titleElement && priceElement && ratingElement) {
        const title = titleElement.textContent.trim();
        const price = priceElement.textContent.trim();
        const rating = ratingElement.getAttribute('aria-label');

        productList.push({
          title,
          price,
          rating
        });
      }
    });

    return productList;
  });

  await browser.close();
  return products;
}

module.exports = {
  scrapeSnapdealTShirts
};
