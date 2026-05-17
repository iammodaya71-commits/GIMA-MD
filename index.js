const express = require("express")

const {
  default: makeWASocket,
  useMultiFileAuthState,
  delay
} = require("@whiskeysockets/baileys")

const app = express()

let latestCode = "Loading..."

app.get("/", (req, res) => {

  res.send(`
  <html>
    <head>
      <title>GIMA PAIR</title>
    </head>

    <body style="background:black;color:white;text-align:center;padding-top:100px;font-family:sans-serif;">
      <h1>GIMA-MD PAIR CODE</h1>
      <h2>${latestCode}</h2>
    </body>
  </html>
  `)
})

app.listen(3000, () => {
  console.log("Server Running")
})

async function startBot() {

  const { state, saveCreds } =
    await useMultiFileAuthState("./session")

  const sock = makeWASocket({
    auth: state
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", async ({
    connection
  }) => {

    if (connection === "open") {

      console.log("Connected to WhatsApp")

      if (!sock.authState.creds.registered) {

        await delay(5000)

        const number = "94762964170"

        const code =
          await sock.requestPairingCode(number)

        latestCode = code

        console.log("PAIR CODE:", code)
      }
    }

    if (connection === "close") {
      console.log("Reconnecting...")
      startBot()
    }
  })
}

startBot()
