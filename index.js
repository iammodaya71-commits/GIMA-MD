const express = require("express");
const axios = require("axios");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

// =====================
// KEEP ALIVE SERVER
// =====================
const app = express();

app.get("/", (req, res) => {
    res.send("GIMA-MD Bot is Running ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("🌐 Server running on port " + PORT);
});

// =====================
// MAIN BOT FUNCTION
// =====================
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        browser: ["GIMA-MD", "Chrome", "1.0.0"]
    });

    // Save session
    sock.ev.on("creds.update", saveCreds);

    // Connection update (auto reconnect fix)
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

            console.log("Connection closed. Reconnecting...", shouldReconnect);

            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === "open") {
            console.log("✅ Bot Connected Successfully");
        }
    });

    // =====================
    // MESSAGE HANDLER
    // =====================
    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const from = msg.key.remoteJid;

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        console.log("📩 Message:", text);

        // ===== COMMANDS =====
        if (text === "hi") {
            await sock.sendMessage(from, {
                text: "👋 Hello! GIMA-MD Bot Active 🚀"
            });
        }

        if (text === "ping") {
            await sock.sendMessage(from, {
                text: "⚡ Pong! Bot is Alive"
            });
        }

        if (text === "menu") {
            await sock.sendMessage(from, {
                text: `
🤖 GIMA-MD MENU

• hi - greeting
• ping - check bot
• menu - show menu

🚀 Railway Bot Running
`
            });
        }
    });
}

// =====================
// START BOT
// =====================
startBot();

// =====================
// CRASH PREVENT FIX
// =====================
process.on("uncaughtException", (err) => {
    console.log("Error:", err);
});

process.on("unhandledRejection", (err) => {
    console.log("Unhandled:", err);
});
