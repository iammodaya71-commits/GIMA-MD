const fetch = require("node-fetch")
if (text == ".alive") {

await sock.sendMessage(from, {
image: { url: "https://raw.githubusercontent.com/iammodaya71-commits/GIMA-MD/main/logo.png" },

caption: "GIMA MD IS ONLINE ✅"

}, { quoted: mek })

}
if (text == ".menu") {

await sock.sendMessage(from, {
image: { url: "https://raw.githubusercontent.com/iammodaya71-commits/GIMA-MD/main/logo.png" },

caption: `
╭━━〔 *GIMA MD* 〕━━⬣
┃✦ Owner : PAWAN
┃✦ Prefix : .
┃✦ Status : Online ✅
╰━━━━━━━━━━━━━━⬣

╭━━〔 *MAIN MENU* 〕━━⬣
┃➤ .menu
┃➤ .alive
┃➤ .ping
┃➤ .owner
┃➤ .repo
╰━━━━━━━━━━━━━━⬣

╭━━〔 *DOWNLOAD MENU* 〕━━⬣
┃➤ .song
┃➤ .video
┃➤ .tiktok
┃➤ .fb
┃➤ .play
┃➤ .ytmp3
┃➤ .ytmp4
┃➤ .moviepro
┃➤ .cinesubz
╰━━━━━━━━━━━━━━⬣

╭━━〔 *GROUP MENU* 〕━━⬣
┃➤ .kick
┃➤ .add
┃➤ .promote
┃➤ .demote
┃➤ .tagall
┃➤ .hidetag
╰━━━━━━━━━━━━━━⬣

╭━━〔 *FUN MENU* 〕━━⬣
┃➤ .anime
┃➤ .joke
┃➤ .truth
┃➤ .dare
┃➤ .quote
╰━━━━━━━━━━━━━━⬣

╭━━〔 *TOOLS MENU* 〕━━⬣
┃➤ .sticker
┃➤ .take
┃➤ .img
┃➤ .ai
┃➤ .logo
╰━━━━━━━━━━━━━━⬣

╭━━〔 *OWNER MENU* 〕━━⬣
┃➤ .restart
┃➤ .shutdown
┃➤ .block
┃➤ .unblock
╰━━━━━━━━━━━━━━⬣

> GIMA MD IS ONLINE ✅
`
}, { quoted: mek })

}
if (text == ".ping") {

await sock.sendMessage(from, {
text: "Pong 🏓"
}, { quoted: mek })
if (text.startsWith(".song ")) {

let q = text.replace(".song ", "")

let res = await fetch(`https://api.popcat.xyz/ytmp3?q=${q}`)
let data = await res.json()

await sock.sendMessage(from, {
audio: { url: data.url },
mimetype: 'audio/mpeg',
fileName: data.title + ".mp3"
}, { quoted: mek })

}

if (text.startsWith(".video ")) {

let q = text.replace(".video ", "")

let res = await fetch(`https://api.popcat.xyz/ytmp4?q=${q}`)
let data = await res.json()

await sock.sendMessage(from, {
video: { url: data.url },
caption: data.title
}, { quoted: mek })

}

if (text.startsWith(".fb ")) {

let url = text.replace(".fb ", "")

await sock.sendMessage(from, {
video: { url: url },
caption: "Facebook Video Download ✅"
}, { quoted: mek })

}

if (text.startsWith(".tiktok ")) {

let url = text.replace(".tiktok ", "")

await sock.sendMessage(from, {
video: { url: url },
caption: "TikTok Video Download ✅"
}, { quoted: mek })

}

if (text.startsWith(".ytmp3 ")) {

let q = text.replace(".ytmp3 ", "")

let res = await fetch(`https://api.popcat.xyz/ytmp3?q=${q}`)
let data = await res.json()

await sock.sendMessage(from, {
audio: { url: data.url },
mimetype: 'audio/mpeg',
fileName: data.title + ".mp3"
}, { quoted: mek })

}

if (text.startsWith(".ytmp4 ")) {

let q = text.replace(".ytmp4 ", "")

let res = await fetch(`https://api.popcat.xyz/ytmp4?q=${q}`)
let data = await res.json()

await sock.sendMessage(from, {
video: { url: data.url },
caption: data.title
}, { quoted: mek })

}
}
if (text == ".moviepro") {

await sock.sendMessage(from, {
image: { url: "https://raw.githubusercontent.com/iammodaya71-commits/GIMA-MD/main/logo.png" },

caption: `
🎬 *MOVIE PRO*

🔗 https://moviepro.site

Use this site to download movies 🍿
`
}, { quoted: mek })

}

if (text == ".cinesubz") {

await sock.sendMessage(from, {
image: { url: "https://raw.githubusercontent.com/iammodaya71-commits/GIMA-MD/main/logo.png" },

caption: `
🍿 *CINESUBZ*

🔗 https://cinesubz.co

Latest sub movies available ✅
`
}, { quoted: mek })

  }
