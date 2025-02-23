import { LightningElement, api, track } from 'lwc';

export default class RollingNumbers extends LightningElement {
    @api number = 12345; // Default number, can be updated from parent component
    @track numbersArray = [];
    digits = Array.from({ length: 10 }, (_, i) => i);

    connectedCallback() {
        this.setupNumbers();
    }

    setupNumbers() {
        const numStr = this.number.toString().padStart(5, '0'); // Ensure the number is always 5 digits
        this.numbersArray = numStr.split('').map((digit, index) => ({
            key: `${digit}-${index}`,
            digit: Number(digit),
            style: `transform: translateY(-${Number(digit) * 100}%); transition: transform 1s ease-in-out;`
        }));
    }

    // Method to update the number (if needed)
    @api
    updateNumber(newNumber) {
        this.number = newNumber;
        this.setupNumbers();
    }
}