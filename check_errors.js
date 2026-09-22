const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const errors = [];
  page.on('pageerror', err => {
    errors.push(`PageError: ${err.toString()}`);
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`ConsoleError: ${msg.text()}`);
    }
  });

  try {
    await page.goto('http://localhost:3005', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000)); // wait for hydration
    
    if (errors.length > 0) {
      console.log('ERRORS FOUND:');
      console.log(errors.join('\n'));
    } else {
      console.log('No errors found on page load/hydration.');
    }
  } catch (err) {
    console.error('Navigation error:', err);
  } finally {
    await browser.close();
  }
})();
