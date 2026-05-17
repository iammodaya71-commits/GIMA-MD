const express = require("express")

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  delay
} = require("@whiskeysockets/baileys")

const app = express()

const PORT = process.env.PORT || 3000

let latestCode = "Loading..."

app.get("/", (req, res) => {
  res.send(`
  <html>
    <body style="background:black;color:white;text-align:center;padding-top:100px;font-family:sans-serif;">
      <h1>PAIR CODE</h1>
      <h2>${latestCode}</h2>
    </body>
  </html>
  `)
})

app.listen(PORT, () => {
  console.log("Server Running")
})

async function startBot() {

  const { state, saveCreds } =
    await useMultiFileAuthState("./session")

  const sock = makeWASocket({
    auth: state
  })

  sock.ev.on("creds.update", saveCreds)

  let requested = false

  sock.ev.on("connection.update", async (update) => {

    const { connection, lastDisconnect } = update

    if (connection === "open") {

      console.log("Connected")

      if (!sock.authState.creds.registered && !requested) {

        requested = true

        await delay(3000)

        const number = "94762964170"

        const code =
          await sock.requestPairingCode(number)

        latestCode = code

        console.log("PAIR CODE:", code)
      }
    }

    if (connection === "close") {

      const reason =
        lastDisconnect?.error?.output?.statusCode

      console.log("Closed:", reason)

      if (reason !== DisconnectReason.loggedOut) {
        startBot()
      }
    }
  })
}

startBot()
