const express = require("express");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const app = express();

// ================= KEEP ALIVE =================
app.get("/", (req, res) => {
    res.send("💎 Premium Bot Running 24/7");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("🌐 Server running on port " + PORT);
});

// ================= OWNER INFO =================
const OWNER_NUMBER = "94762964170"; // 👈 ඔයාගේ number දාන්න

// ================= BOT START =================
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        browser: ["PremiumBot", "Chrome", "1.0.0"]
    });

    sock.ev.on("creds.update", saveCreds);

    // ================= CONNECTION FIX =================
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

            console.log("🔁 Reconnecting...", shouldReconnect);

            if (shouldReconnect) startBot();
        }

        if (connection === "open") {
            console.log("✅ PREMIUM BOT ONLINE");
        }
    });

    // ================= MESSAGE HANDLER =================
    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const from = msg.key.remoteJid;

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        const isOwner = from.includes(OWNER_NUMBER);

        console.log("📩:", text);

        // ================= COMMANDS =================

        if (text === "hi") {
            await sock.sendMessage(from, {
                text: "👋 Hello! I am Premium Bot 💎"
            });
        }

        if (text === "menu") {
            await sock.sendMessage(from, {
                text: `
💎 PREMIUM BOT MENU

⚡ hi - greeting
⚡ ping - check bot
⚡ menu - commands
⚡ owner - owner info
⚡ alive - uptime check

🚀 Powered by Premium System
`
            });
        }

        if (text === "ping") {
            await sock.sendMessage(from, {
                text: "⚡ Pong! Bot Alive 24/7"
            });
        }

        if (text === "alive") {
            await sock.sendMessage(from, {
                text: "💎 Bot is Running Smoothly 🚀"
            });
        }

        if (text === "owner") {
            await sock.sendMessage(from, {
                text: `👑 Owner Number: ${OWNER_NUMBER}`
            });
        }

        // ================= OWNER ONLY CMD =================
        if (text === "restart" && isOwner) {
            await sock.sendMessage(from, {
                text: "♻️ Restarting Bot..."
            });
            process.exit(1);
        }
    });
}

// ================= START =================
startBot();

// ================= CRASH GUARD =================
process.on("uncaughtException", () => {});
process.on("unhandledRejection", () => {});
