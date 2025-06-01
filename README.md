# 🛡️ PhishGuard – Phishing Detection Using Total Virus API

A cybersecurity project focused on detecting and analyzing phishing URLs using the **Total Virus API**. The tool is designed to help individuals and organizations verify suspicious links and protect against phishing attacks through real-time threat analysis.

---

## 🚨 Project Overview

Phishing remains one of the most dangerous and widespread cybersecurity threats. **PhishGuard** aims to counter this by integrating with **VirusTotal API** to scan URLs and return threat intelligence from 70+ antivirus engines.

---

## 🧰 Features

- 🕵️ Real-time phishing URL detection
- 🔗 VirusTotal API integration
- 📊 Displays threat scores and scan reports
- 🧠 Analyzes domains, IPs, and redirect chains
- 💡 Helps users make informed decisions before clicking links
- 🌐 Simple UI for entering and scanning URLs

---

## 🔍 Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla or React if used)
- **Backend:** Node.js, Express.js
- **API:** [VirusTotal API](https://www.virustotal.com/gui/)
- **Deployment:** *(Mention platform: Vercel, Render, DigitalOcean, etc.)*

---

## 🎯 Impact

> Built to enhance cyber awareness and give users the power to self-verify URLs.

- Reduces risk of phishing attacks
- Encourages proactive cybersecurity behavior
- Useful for students, journalists, corporates, and individuals

---

## 🚀 How It Works

1. User enters a suspicious URL
2. System sends request to VirusTotal API
3. Returns security verdict from multiple engines
4. Highlights malicious reports and alerts the user

---

## 📷 Screenshots

*(Add UI shots showing the input field, scan results, alerts, etc.)*

---

## 🧪 Local Setup

1. Clone the repository
   ```bash
  edit config file with below details
{
    "dbUri": "",
    "VIRUSTOTAL_API_KEY": "",
    "PORT": ,
    "WHOIS_API_KEY": ""
}

2. npm i
3. npm start
