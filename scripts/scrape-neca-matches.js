
// This is a standalone Node.js script that can be run with:
// node scripts/scrape-neca-matches.js

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// URLs to scrape - replace these with actual NECA match page URLs
const matchUrls = [
  'https://neca2020.org/matches/123',
  'https://neca2020.org/matches/456',
  'https://neca2020.org/matches/789'
];

async function scrapeMatchPage(url) {
  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    console.log(`Scraping match data from: ${url}`);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Extract match data using page.evaluate
    const matchData = await page.evaluate(() => {
      // These selector names would need to be adjusted based on actual NECA page structure
      const opponent = document.querySelector('.team-name')?.textContent?.trim() || 'Unknown';
      const dateString = document.querySelector('.match-date')?.textContent?.trim() || '';
      const venue = document.querySelector('.venue')?.textContent?.trim() || 'Unknown';
      
      // Extract scores
      const scoreElements = document.querySelectorAll('.score');
      const uccScore = scoreElements[0]?.textContent?.trim();
      const opponentScore = scoreElements[1]?.textContent?.trim();
      
      // Extract result
      const resultElement = document.querySelector('.result');
      const result = resultElement ? resultElement.textContent?.trim() : undefined;
      
      // Determine if match is completed
      const isCompleted = !!resultElement;
      
      return {
        opponent,
        date: dateString,
        venue,
        result,
        uccScore,
        opponentScore,
        isCompleted,
        id: url.split('/').pop() // Use the last part of the URL as an ID
      };
    });
    
    return matchData;
  } catch (error) {
    console.error(`Error scraping match page ${url}:`, error);
    return null;
  } finally {
    await browser.close();
  }
}

async function scrapeAllMatches() {
  const results = [];
  
  for (const url of matchUrls) {
    const matchData = await scrapeMatchPage(url);
    if (matchData) {
      results.push(matchData);
    }
  }
  
  // Save results to a JSON file
  const outputPath = path.join(__dirname, '../src/data/scraped-matches.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`Scraped ${results.length} matches and saved to ${outputPath}`);
}

// Run the scraping function
scrapeAllMatches().catch(err => {
  console.error('Error in scraping process:', err);
  process.exit(1);
});
