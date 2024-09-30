"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const chimoney_typescript_sdk_1 = __importDefault(require("chimoney-typescript-sdk"));
dotenv_1.default.config();
if (!process.env.API_KEY) {
    throw new Error("API_KEY is not defined in the environment variables");
}
const client = new chimoney_typescript_sdk_1.default({
    apikey: process.env.API_KEY
});
function createPayoutData(email, phone, valueInUSD, walletID, interledgerWalletAddress, bank, accountNumber, currency, fullname, narration, amount) {
    return {
        email,
        phone,
        valueInUSD,
        chimoneys: [
            {
                email,
                phone,
                valueInUSD,
                amount,
                currency,
                narration,
                redeemData: {
                    walletID,
                    interledgerWalletAddress,
                }
            }
        ]
    };
}
async function testPayout() {
    const payoutData = createPayoutData("recipient@example.com", "1234567890", 50, "exampleWalletID", "exampleInterledgerWalletAddress", "exampleBank", "123456789", "USD", "Joseph", "Payment for services rendered", 50);
    try {
        const response = await client.createChimoneyPayout(payoutData);
        console.log('Payout Response:', response);
    }
    catch (error) {
        console.error('Error creating payout:', error);
    }
}
testPayout();
