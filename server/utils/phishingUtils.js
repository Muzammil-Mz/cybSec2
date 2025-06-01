export const getScoreFromFeatures = (url, vtData, whoisData) => {
  let score = 0;

  // List of factors
  const suspiciousKeywords = ['login', 'verify', 'update', 'secure'];
  const shorteningServices = ['bit.ly', 'tinyurl', 't.co'];
  const specialChars = ['@', '%', '//'];
  const maxLength = 75;
  const trustedDomains = [
    'amazon.com',
    'facebook.com',
    'linkedin.com',
    'google.com',
    'microsoft.com',
    'apple.com',
    'twitter.com',
    'flipkart.com'  // Add known trusted domains
  ];

  let domain, pathname, fullURL;
  try {
    const parsed = new URL(url);
    domain = parsed.hostname.replace(/^www\./, ''); // Clean domain
    pathname = parsed.pathname;
    fullURL = parsed.href;
  } catch (e) {
    console.error("Invalid URL passed to heuristic:", url);
    return 0;  // Return 0 if URL is invalid
  }

  // Skip scoring for trusted domains
  if (trustedDomains.includes(domain)) return 100;

  // Award points for good signs
  if (!shorteningServices.some(s => domain.includes(s))) score += 25;
  if (!suspiciousKeywords.some(k => fullURL.toLowerCase().includes(k))) score += 20;
  if (!specialChars.some(char => fullURL.includes(char))) score += 15;
  if (fullURL.length < maxLength) score += 10;

  // Add SSL check: Prefer HTTPS
  const usesHTTPS = fullURL.startsWith('https://');
  if (usesHTTPS) score += 25;

  // WHOIS: Add score based on domain age
  const domainAge = whoisData?.domainAgeMonths || 0;
  if (domainAge && domainAge > 12) score += 10; // Give points for older domains

  // If domain age is unknown, give Flipkart a higher score directly
  if (domain === "flipkart.com" && !whoisData?.domainAgeMonths) {
    score += 30; // Provide a strong boost for known trusted domain
  }

  // Log score to track issues
  console.log("Score before VT analysis:", score);

  // Malicious votes from VirusTotal (deduct points if malicious)
  const maliciousVotes = vtData?.data?.attributes?.last_analysis_stats?.malicious || 0;
  if (maliciousVotes > 0) {
    score -= Math.min(maliciousVotes * 10, 30); // Max deduction of 30
    return Math.max(0, score); // Return score immediately if malicious
  }

  // Final score adjustments
  console.log("Final Score:", score);
  return Math.max(0, score); // Ensure score never goes below 0
};
