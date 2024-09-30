import dotenv from 'dotenv';
import Typicode from 'chimoney-typescript-sdk';

// Load environment variables from .env file
dotenv.config();

// Check if API key is defined
if (!process.env.API_KEY) {
    throw new Error("API_KEY is not defined in the environment variables");
}

// Create an instance of Typicode with the API key from the environment variables
const client = new Typicode({
    apikey: process.env.API_KEY // Ensure you access the API key from the environment variables
});

// Function to create payout data dynamically
function createPayoutData(
    email: string,
    phone: string,
    valueInUSD: number,
    walletID: string,
    interledgerWalletAddress: string,
    bank: string,
    accountNumber: string,
    currency: string,
    fullname: string,
    narration: string,
    amount: number
) {
    return {
        email,
        phone,
        valueInUSD,
        chimoneys: [
            {
                email, // Required
                phone, // Required
                valueInUSD, // Required
                amount, // Required
                currency, // Required
                narration, // Required
                redeemData: {
                    walletID, // Required
                    interledgerWalletAddress, // Required
                }
            }
        ]
    };
}

// Example function to test the payout API call
async function testPayout() {
    // Define the payout data (replace values accordingly)
    const payoutData = createPayoutData(
        "recipient@example.com", // Replace with the recipient's email
        "1234567890", // Replace with the recipient's phone number
        50, // Replace with the amount in USD
        "exampleWalletID", // Replace with actual wallet ID
        "exampleInterledgerWalletAddress", // Replace with actual wallet address
        "exampleBank", // Replace with the bank name
        "123456789", // Replace with the account number
        "USD", // Replace with the currency
        "Joseph", // Replace with the recipient's full name
        "Payment for services rendered", // Narration for the payment
        50 // Amount in the specified currency
    );

    try {
        // Call the createPayout method from your SDK
        const response = await client.createChimoneyPayout(payoutData); // Use the actual method from your SDK
        console.log('Payout Response:', response);
    } catch (error) {
        console.error('Error creating payout:', error);
    }
}

// Run the test
testPayout();
