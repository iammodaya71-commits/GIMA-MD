if (text == ".alive") {
await sock.sendMessage(from, {
text: "GIMA MD IS ONLINE ✅"
}, { quoted: mek })
}

if (text == ".owner") {
await sock.sendMessage(from, {
text: "OWNER : PAWAN\nNUMBER : 94762964170"
}, { quoted: mek })
}

if (text == ".ping") {
await sock.sendMessage(from, {
text: "Pong 🏓"
}, { quoted: mek })
}
