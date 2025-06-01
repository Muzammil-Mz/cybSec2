import express from "express"
import userModel from "../../models/Users.js/Users.js"
import axios from "axios"
import config from "config"
import { getScoreFromFeatures } from '../../utils/phishingUtils.js';


const router = express.Router()

router.post("/signup", async (req, res) => {
    try {
        let userData = req.body
        let { email, password } = userData
        if (!email || !password) {
            return res.status(400).json({ msg: "all fields required" })
        }

        let emailCheck = await userModel.findOne({ email });
        if (emailCheck) {
            return res.status(400).json({ msg: "Email already exists" });
        }
        await userModel.create(userData);
        return res.status(200).json({ msg: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})


router.post("/signin", async (req, res) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ msg: "all fields required" })
        }

        let user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: "invalid credentials" })

        }

        if (user.password !== password) {
            return res.status(400).json({ msg: "invalid password" })
        }
        return res.status(200).json({ msg: "Login successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})





router.post("/check-url", async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    try {
        // ——— VirusTotal Check ———
        const vtApiKey = config.get("VIRUSTOTAL_API_KEY");
        const encodedURL = Buffer.from(url).toString("base64").replace(/=+$/, "");
        const vtResponse = await axios.get(
            `https://www.virustotal.com/api/v3/urls/${encodedURL}`,
            { headers: { "x-apikey": vtApiKey } }
        );
        const vtStats = vtResponse.data?.data?.attributes?.last_analysis_stats || {};
        const totalVotes = Object.values(vtStats).reduce((a, b) => a + b, 0);

        // ——— WHOIS Check ———
        const whoisApiKey = config.get("WHOIS_API_KEY");
        const domain = new URL(url).hostname;
        const whoisURL =
            `https://www.whoisxmlapi.com/whoisserver/WhoisService`
            + `?apiKey=${whoisApiKey}`
            + `&domainName=${domain}`
            + `&outputFormat=JSON`;

        const whoisResponse = await axios.get(whoisURL);
        const wr = whoisResponse.data?.WhoisRecord || {};

        // WHOIS Data for domain age
        const domainAge = wr.createdDate ? new Date() - new Date(wr.createdDate) : 0;
        const domainAgeMonths = domainAge / (1000 * 60 * 60 * 24 * 30); // in months

        // Perform Heuristic Analysis
        const heuristic = getScoreFromFeatures(url, vtResponse.data, { domainAgeMonths });

        // ——— Response ———
        const verdict = vtStats.malicious > 0 ? "Malicious" : (heuristic > 70 ? "Safe" : "Suspicious");

        res.json({
            url,
            virusTotal: {
                total: totalVotes,
                malicious: vtStats.malicious || 0,
                suspicious: vtStats.suspicious || 0,
                harmless: vtStats.harmless || 0,
            },
            whois: {
                domainAge: domainAgeMonths,
                domainName: wr.domainName,
                createdDate: wr.createdDate || "Unknown",
                registrarName: wr.registrarName || "N/A",
            },
            heuristicAnalysis: {
                score: heuristic,
            },
            finalVerdict: verdict,
        });

    } catch (error) {
        console.error("URL Check Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to check URL", message: error.message });
    }
});


export default router;



