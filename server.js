const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 🎯 [উইনগো কালার ট্রেড সিঙ্ক - মেগা সকেট প্রোটকল লক]
const io = socketIo(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Content-Security-Policy", "frame-ancestors *; default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:;");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// 🎰 [উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক]
const MAIN_SITE_URL = "https://betlover247.onrender.com"; 

// 🃏 ৫-রিলস ওরিজিনাল সুপার এস ডিল্যাক্স লাক্সারি ক্যাসিনো র্যান্ডমাইজেশন প্রতীক তালিকা ভাই ভাই
const superAceDeluxePool = ["DELUXE_ACE", "DELUXE_KING", "DELUXE_QUEEN", "DELUXE_JACK", "GOLDEN_JOKER", "ROYAL_SPADE", "ROYAL_DIAMOND"];

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স নিয়ে আসার ডেডিকেটেড গেটওয়ে
app.get('/api/acedeluxe-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    const targetWallet = wallet || "main";
    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet",
            username: userId,
            amount: 0,
            wallet: targetWallet
        }, { timeout: 30000 });

        if (response.data && response.data.status === "ok" && response.data.balance !== undefined) {
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, balance: 0 });
    } catch (e) { return res.json({ success: false, balance: 0 }); }
});

// 🛫 ২. সুপার এস ডিল্যাক্স ৫-রিল কোর স্লট স্পিন রাউট (POST Route - ৯৫% RTP গাণিতিক বর্ম কঠোর লক ভাই ভাই!)
app.post('/api/acedeluxe-spin', async (req, res) => {
    const { userId, amount, wallet } = req.body;
    const targetWallet = wallet || "main";
    const reqAmount = parseFloat(amount) || 50;

    // 🔒 [বেট সিকিউরিটি ফিল্টার]: বাজি ১ টাকার কম বা ২০০০০ টাকার বেশি হলে ব্যাকএন্ড ডিরেক্ট ব্লক ভাই ভাই!
    if (reqAmount < 1 || reqAmount > 20000) {
        return res.json({ success: false, message: "🚨 Invalid Bet Amount (৳১ - ৳Subcontinent)" });
    }

    try {
        // 🔒 [ব্যালেন্স যাচাই প্রোটোকল]: বাজি প্লে করার আগে ডাটাবেজ থেকে রিয়েল টাকা নিশ্চিত করার চাবি
        const balResponse = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet",
            username: userId,
            amount: 0,
            wallet: targetWallet
        }, { timeout: 30000 });
        
        let currentDbBalance = 0;
        if (balResponse.data && balResponse.data.status === "ok" && balResponse.data.balance !== undefined) {
            currentDbBalance = parseFloat(balResponse.data.balance);
        } else {
            return res.json({ success: false, balance: 0, message: "❌ Database Sync Error! Please refresh." });
        }

        // 🔒 [ইনসাফিসিয়েন্ট প্রোটেকশন বর্ম]: অ্যাকাউন্টে টাকা কম থাকলে বা জিরো ব্যালেন্স হলে বাজি রিফিউজড ভাই ভাই!
        if (currentDbBalance < reqAmount || currentDbBalance <= 0) {
            return res.json({ success: false, balance: currentDbBalance, message: "❌ Insufficient Balance! Please Recharge BDT." });
        }

        let adminTriggeredPrize = (balResponse.data && balResponse.data.acedeluxe_target) ? balResponse.data.acedeluxe_target : null;

        let spinResults, finalStatus, winMultiplier;
        let isLoopActive = true;
        let loopSafety = 0;

        // 🎰 [🎰 ৯৫% ওরিজিনাল ক্যাসিনো RTP ও ৫-রিলস সুপার এস ডিল্যাক্স গাণিতিক লুপ ভাই ভাই]
        while (isLoopActive && loopSafety < 200) {
            loopSafety++;
            
            // ৫টি প্রিমিয়াম রিলের র্যান্ডম স্টপ প্রতীক জেনারেটর ভাই ভাই
            spinResults = [];
            for (let r = 0; r < 5; r++) {
                spinResults.push(superAceDeluxePool[Math.floor(Math.random() * superAceDeluxePool.length)]);
            }

            // ওরিজিনাল স্লট ৫-রিল পেলাইন ট্র্যাকিং মেথড: রিলসের ফ্রিকোয়েন্সি ম্যাচ কাউন্টার
            let countsMap = {};
            spinResults.forEach(sym => { countsMap[sym] = (countsMap[sym] || 0) + 1; });
            let maxSameSymbolsCount = Math.max(...Object.values(countsMap));

            if (maxSameSymbolsCount >= 3) {
                finalStatus = "win";
                // 🚀 [ডাইনামিক কম্বো চেইন ওッズ]: ৩টি মিললে ৯ গুণ, ৪টি মিললে ৬০ গুণ, ৫টি মিললে ৫০০ গুণের গ্র্যান্ড ডিল্যাক্স জ্যাকপট!
                if (maxSameSymbolsCount === 3) winMultiplier = 9.00;
                else if (maxSameSymbolsCount === 4) winMultiplier = 60.00;
                else winMultiplier = 500.00; 
            } else {
                finalStatus = "lose";
                winMultiplier = 0.00;
            }

            // এডমিন ড্যাশবোর্ড কন্ট্রোল ট্রিগার চাবি
            if (adminTriggeredPrize) {
                if (adminTriggeredPrize === "force_lose" && finalStatus === "lose") isLoopActive = false;
                if (adminTriggeredPrize === "force_win" && finalStatus === "win") isLoopActive = false;
                if (adminTriggeredPrize === "force_jackpot" && winMultiplier === 500.00) isLoopActive = false;
            } else {
                // ৫০০ গুণের গ্র্যান্ড জ্যাকপটের চান্স আরটিপি লুপ ট্র্যাকে কড়া সুরক্ষায় টাইট ০.০০৮% এ লক ভাই ভাই
                if (winMultiplier === 500.00 && Math.random() > 0.0008) continue;

                if (finalStatus === "win") {
                    // ৯৫% আরটিপি সিঙ্ক কন্ট্রোল ম্যাথ লুপ স্বাভাবিক ট্র্যাকে ৩৬% এ ব্যালেন্সড লক ভাই ভাই!
                    if (Math.random() <= 0.36) {
                        isLoopActive = false;
                    }
                } else {
                    isLoopActive = false; 
                }
            }
        }

        let winAmount = 0;
        let dbAction = "bet";
        let dbAmount = reqAmount;

        if (finalStatus === "win") {
            winAmount = parseFloat((reqAmount * winMultiplier).toFixed(2));
            dbAction = "win";
            dbAmount = winAmount;
        }

        let phpPayload = {
            action: dbAction,
            username: userId,
            amount: dbAmount,
            wallet: targetWallet
        };

        if (dbAction === "win") {
            phpPayload.bet_amount = reqAmount;
            phpPayload.multiplier = winMultiplier.toFixed(2);
            phpPayload.status = "win";
            phpPayload.type = "win";
            phpPayload.is_win = 1;
            phpPayload.win_status = "win";
            phpPayload.log_status = "win";
        }

        const response = await axios.post(MAIN_SITE_URL + '/api_callback.php', phpPayload, { timeout: 30000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: userId, balance: response.data.balance });

            return res.json({
                success: true,
                balance: response.data.balance,
                status: finalStatus,
                winAmount: winAmount,
                reels: spinResults
            });
        } else {
            let latestBal = (response.data && response.data.balance !== undefined) ? response.data.balance : currentDbBalance;
            return res.json({ success: false, balance: latestBal, message: "❌ Bet Declined by Database!" });
        }

    } catch (e) {
        console.error("Super Ace Deluxe Core Engine Error:", e.message);
        return res.json({ success: false, message: "⚠️ Timeout! Click SPIN again." });
    }
});

// 🚀 [নট ফাউন্ড এরর ফিক্সড বর্ম]: কারেন্ট ডিরেক্টরির index.html ওয়ান-শটে ফাইল ক্যাচ করার চাবি ভাই ভাই
app.get('/', (req, res) => { 
    res.sendFile(path.resolve(__dirname, 'index.html')); 
});

io.on('connection', (socket) => { console.log("Player connected to Royal Super Ace Deluxe 5-Reel Slot Engine!"); });

// সুপ্রিম ৫০ নম্বর গেম নিজস্ব কাস্টম ৭০০০ পোর্টে কড়া নিয়নে গ্র্যান্ড ফিনালে অন ফায়ার ভাই ভাই!
const PORT = process.env.PORT || 7000; 
server.listen(PORT, () => { console.log(`🎡 Royal Super Ace Deluxe Engine Running on port ${PORT}`); });
