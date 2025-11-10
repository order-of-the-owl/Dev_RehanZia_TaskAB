import fetch from 'node-fetch';

async function testScraper() {
  const res = await fetch('http://localhost:3000/api/scrape?url=https://audionic.co/collections/wireless-headphones-online');
  const data = await res.json();
  if (data.title && data.status === 200) {
    console.log('Scraper test passed');
  } else {
    console.error('Scraper test failed', data);
    process.exit(1);
  }
}

testScraper();
