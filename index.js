const {
  default: makeWASocket,
  useMultiFileAuthState
} = require("@whiskeysockets/baileys")

const P = require("pino")
const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res.send("GIMA-MD RUNNING")
})

app.listen(3000, () => {
  console.log("Server Started")
})

async function startBot() {

  const { state, saveCreds } =
    await useMultiFileAuthState("session")

  const sock = makeWASocket({
    logger: P({ level: "silent" }),
    auth: state,
    browser: ["GIMA-MD", "Chrome", "1.0.0"]
  })

  sock.ev.on("creds.update", saveCreds)

  if (!sock.authState.creds.registered) {

    const phoneNumber = "94762964170"

    const code = await sock.requestPairingCode(phoneNumber)

    console.log(`
PAIR CODE: ${code}
`)
  }

  sock.ev.on("connection.update", async ({ connection }) => {

    if (connection === "open") {
      console.log("BOT CONNECTED")
    }

    if (connection === "close") {
      console.log("RECONNECTING...")
      startBot()
    }
  })

  sock.ev.on("messages.upsert", async (m) => {

    const msg = m.messages[0]

    if (!msg.message) return

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text

    const from = msg.key.remoteJid

    if (text === ".ping") {

      await sock.sendMessage(from, {
        text: "Pong 🟢"
      })
    }
  })
}

startBot()
