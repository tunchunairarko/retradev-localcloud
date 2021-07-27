const router = require("express").Router();

const crypto = require('crypto')
require('dotenv').config()

router.post("/signature", async (req, res) => {
    try {
        const timestamp = new Date().getTime() - 30000
        const msg = Buffer.from(process.env.ZOOM_JWT_API_KEY + req.body.meetingNumber + timestamp + req.body.role).toString('base64')
        const hash = crypto.createHmac('sha256', process.env.ZOOM_JWT_API_SECRET).update(msg).digest('base64')
        const signature = Buffer.from(`${process.env.ZOOM_JWT_API_KEY}.${req.body.meetingNumber}.${timestamp}.${req.body.role}.${hash}`).toString('base64')
        
        res.json({signature: signature});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;