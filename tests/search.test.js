import fetch from 'node-fetch';

async function testSearch() {
  const res = await fetch('http://localhost:3000/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'trust' })
  });
  const data = await res.json();
  if (data.results && data.results[0].id === '1') {
    console.log('Search test passed');
  } else {
    console.error('Search test failed', data);
    process.exit(1);
  }
}

testSearch();
