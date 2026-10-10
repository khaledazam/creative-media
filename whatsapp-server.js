const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize WhatsApp Client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

let isReady = false;

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('\n--- SCAN THIS QR CODE WITH WHATSAPP ---');
    qrcode.generate(qr, { small: true });
    console.log('---------------------------------------\n');
});

client.on('ready', () => {
    console.log('WhatsApp Client is ready!');
    isReady = true;
});

client.on('disconnected', (reason) => {
    console.log('WhatsApp Client was disconnected:', reason);
    isReady = false;
});

client.initialize();

// Express Endpoint to send message
app.post('/api/send-message', async (req, res) => {
    if (!isReady) {
        return res.status(503).json({ error: 'WhatsApp client is not ready yet. Please scan the QR code in the terminal.' });
    }

    try {
        let { phone, message } = req.body;
        
        if (!phone || !message) {
            return res.status(400).json({ error: 'Phone and message are required' });
        }

        // Format phone number for WhatsApp (remove +, spaces, leading 0)
        phone = phone.replace(/[^0-9]/g, '');
        if (phone.startsWith('0')) {
            // Assuming Egypt country code if starts with 0
            phone = '2' + phone; 
        } else if (!phone.startsWith('20') && phone.length === 10) {
             phone = '20' + phone;
        }

        const chatId = `${phone}@c.us`;
        
        await client.sendMessage(chatId, message);
        console.log(`Message sent to ${phone}`);
        
        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message', details: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`\nWhatsApp API Server running on http://localhost:${PORT}`);
    console.log(`Waiting for WhatsApp client to initialize...\n`);
});
