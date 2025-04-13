
#!/usr/bin/env python3
"""
Script to scrape NECA match data using BeautifulSoup
Run with: python scripts/scrape_neca_matches.py
"""

import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import datetime
from typing import Dict, List, Optional, Any

# URLs to scrape - replace these with actual NECA match page URLs
MATCH_URLS = [
    'https://neca2020.org/matches/123',
    'https://neca2020.org/matches/456',
    'https://neca2020.org/matches/789'
]

def scrape_match_page(url: str) -> Optional[Dict[str, Any]]:
    """Scrape match data from a NECA match page URL"""
    try:
        print(f"Scraping match data from: {url}")
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for 4XX/5XX responses
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # These selector names would need to be adjusted based on actual NECA page structure
        # Find the opponent team name
        opponent_elem = soup.select_one('.team-name')
        opponent = opponent_elem.get_text().strip() if opponent_elem else 'Unknown'
        
        # Find the match date
        date_elem = soup.select_one('.match-date')
        date_string = date_elem.get_text().strip() if date_elem else ''
        
        # Find the venue
        venue_elem = soup.select_one('.venue')
        venue = venue_elem.get_text().strip() if venue_elem else 'Unknown'
        
        # Extract scores
        score_elems = soup.select('.score')
        ucc_score = score_elems[0].get_text().strip() if len(score_elems) > 0 else None
        opponent_score = score_elems[1].get_text().strip() if len(score_elems) > 1 else None
        
        # Extract result
        result_elem = soup.select_one('.result')
        result = result_elem.get_text().strip() if result_elem else None
        
        # Determine if match is completed
        is_completed = result_elem is not None
        
        # Use the last part of the URL as an ID
        match_id = url.split('/')[-1]
        
        return {
            'id': match_id,
            'opponent': opponent,
            'date': date_string,
            'venue': venue,
            'result': result,
            'uccScore': ucc_score,
            'opponentScore': opponent_score,
            'isCompleted': is_completed
        }
    except Exception as e:
        print(f"Error scraping match page {url}: {e}")
        return None

def scrape_all_matches() -> List[Dict[str, Any]]:
    """Scrape data from all match URLs"""
    results = []
    
    for url in MATCH_URLS:
        match_data = scrape_match_page(url)
        if match_data:
            results.append(match_data)
    
    return results

def main():
    """Main function to run the scraping process"""
    results = scrape_all_matches()
    
    # Create the output directory if it doesn't exist
    os.makedirs(os.path.join('src', 'data'), exist_ok=True)
    
    # Save results to a JSON file
    output_path = os.path.join('src', 'data', 'scraped-matches.json')
    with open(output_path, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"Scraped {len(results)} matches and saved to {output_path}")

if __name__ == '__main__':
    main()
