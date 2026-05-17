const express = require("express")
const {
  default: makeWASocket,
  useMultiFileAuthState
} = require("@whiskeysockets/baileys")

const app = express()

let latestCode = "Loading..."

async function startBot() {

  const { state, saveCreds } =
    await useMultiFileAuthState("session")

  const sock = makeWASocket({
    auth: state
  })

  sock.ev.on("creds.update", saveCreds)

  if (!sock.authState.creds.registered) {

    const number = "94762964170"

    const code = await sock.requestPairingCode(number)

    latestCode = code

    console.log("PAIR CODE:", code)
  }

  sock.ev.on("connection.update", ({ connection }) => {

    if (connection === "open") {
      console.log("Connected")
    }

    if (connection === "close") {
      startBot()
    }
  })
}

app.get("/", (req, res) => {

  res.send(`
    <html>
      <head>
        <title>GIMA PAIR CODE</title>
      </head>
      <body style="background:black;color:white;text-align:center;padding-top:100px;font-family:sans-serif;">
        <h1>GIMA-MD PAIR CODE</h1>
        <h2>${latestCode}</h2>
      </body>
    </html>
  `)
})

app.listen(3000, () => {
  console.log("Server running")
})

startBot()
