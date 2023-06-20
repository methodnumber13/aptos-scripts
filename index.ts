import { AptosAccount, AptosAccountObject } from 'aptos';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

/**
 * New line character
 * @type {string}
 */
const NEW_LINE = '\n';

/**
 * Account type
 * @typedef {[keyof AptosAccountObject, string]} AccountType
 */
type AccountType = [keyof  AptosAccountObject, string]

/**
 * Generate accounts and save them to a file
 */
const generateAccounts = () => {
    try {
        /**
         * Number of accounts to generate
         * @type {number}
         */
        const ACCOUNTS_COUNT = parseInt(process.env.ACCOUNTS_COUNT || "0");

        if (!ACCOUNTS_COUNT) {
            throw new Error('change ACCOUNTS_COUNT in .env file')
        }
        /**
         * Array of accounts
         * @type {string[]}
         */
        const accounts = [] as string[];
        for (let i = 0; i < ACCOUNTS_COUNT; i++) {
            const newAccount =  new AptosAccount().toPrivateKeyObject();
            const accEntries = Object.entries(newAccount);

            accEntries.forEach((acc, index) => {
                /**
                 * Account key and value
                 * @type {AccountType}
                 */
                const [key, value] = acc as AccountType;
                const newLine = index === 2 ? NEW_LINE : ''
                accounts.push(`${key}: ${value}${newLine}`);
            })
        }

        /**
         * File data to be written
         * @type {string}
         */
        const fileData = accounts.join(';');

        fs.writeFile(process.env.FILE_PATH || 'output.txt', fileData, (err) => {
            if (err) {
                console.error('Error writing fileЖ', err);
            } else {
                console.log('Data successfully written to file');
            }
        });

    } catch (error) {
        console.error(error)
    }
}

generateAccounts()