const express = require('express');
const bodyParser = require('body-parser');
const BitcoinMobileSDK = require('./bitcoinMobileSdk');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const config = {
    bitcoinApiUrl: 'https://api.blockcypher.com/v1/btc/main', // Replace with your preferred Bitcoin API
    lndCert: 'path/to/tls.cert', // Path to LND certificate
    lndMacaroon: 'path/to/admin.macaroon', // Path to LND macaroon
    lndHost: 'localhost:10009', // LND host
    network: 'mainnet', // or 'testnet'
};

const sdk = new BitcoinMobileSDK(config);

app.post('/createWallet', async (req, res) => {
    try {
        const wallet = await sdk.createWallet();
        res.json(wallet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/importWallet', async (req, res) => {
    try {
        const { mnemonic } = req.body;
        const wallet = await sdk.importWallet(mnemonic);
        res.json(wallet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/getBalance/:address', async (req, res) => {
    try {
        const balance = await sdk.getBalance(req.params.address);
        res.json(balance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/createTransaction', async (req, res) => {
    try {
        const { fromAddress, toAddress, amount, keyPair } = req.body;
        const rawTransaction = await sdk.createTransaction(fromAddress, toAddress, amount, keyPair);
        res.json(rawTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/sendTransaction', async (req, res) => {
    try {
        const { rawTransaction } = req.body;
        const txid = await sdk.sendTransaction(rawTransaction);
        res.json(txid);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/createLightningInvoice', async (req, res) => {
    try {
        const { amount, memo } = req.body;
        const invoice = await sdk.createLightningInvoice(amount, memo);
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/payLightningInvoice', async (req, res) => {
    try {
        const { paymentRequest } = req.body;
        const paymentResult = await sdk.payLightningInvoice(paymentRequest);
        res.json(paymentResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/queryLightningInvoice/:paymentRequest', async (req, res) => {
    try {
        const invoice = await sdk.queryLightningInvoice(req.params.paymentRequest);
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/openChannel', async (req, res) => {
    try {
        const { pubkey, localAmt } = req.body;
        const channel = await sdk.openChannel(pubkey, localAmt);
        res.json(channel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/closeChannel', async (req, res) => {
    try {
        const { channelPoint } = req.body;
        const closedChannel = await sdk.closeChannel(channelPoint);
        res.json(closedChannel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Bitcoin Mobile API server running on port ${port}`);
});
