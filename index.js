const express = require("express");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const app = express();

app.use(express.urlencoded({ extended: true }));

let sock;

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log("Bot connected");
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      if (shouldReconnect) {
        startBot();
      }
    }
  });
}

app.get("/", (req, res) => {
  res.send(`
    <h2>WhatsApp Pair Code</h2>
    <form method="POST" action="/pair">
      <input name="number" placeholder="947XXXXXXXX" />
      <button type="submit">Get Pair Code</button>
    </form>
  `);
});

app.post("/pair", async (req, res) => {
  try {
    const number = req.body.number;

    const code = await sock.requestPairingCode(number);

    res.send(`
      <h2>Your Pair Code</h2>
      <h1>${code}</h1>
    `);
  } catch (err) {
    res.send("Error generating pair code");
    console.log(err);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});

startBot();
