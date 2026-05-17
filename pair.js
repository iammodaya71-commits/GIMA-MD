const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");

// fake session generator
function generateCode() {
    return "GIMA-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// GET /pair/code
router.get("/code", async (req, res) => {
    const code = generateCode();

    res.json({
        success: true,
        pairing_code: code
    });
});

// GET /pair/qr
router.get("/qr", async (req, res) => {
    const text = generateCode();

    try {
        const qr = await QRCode.toDataURL(text);

        res.json({
            success: true,
            qr: qr,
            code: text
        });
    } catch (err) {
        res.status(500).json({ error: "QR generation failed" });
    }
});

module.exports = router;
