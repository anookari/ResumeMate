import { LightningElement, track, api } from 'lwc';

export default class RollingNumberWheel extends LightningElement {
    @api currentNumber = 0; // Set default number or use @api to set from parent component
    @track numbers = Array.from({ length: 100 }, (_, i) => i); // Array of numbers 0 to 99

    wheelStyle = '';

    connectedCallback() {
        this.rollNumbers();
    }

    rollNumbers() {
        // Calculate the amount to roll
        const rollDuration = 2000; // 2 seconds
        const rollSteps = 30; // Number of roll steps
        const rollDistance = this.numbers.length * 20; // Total distance of rolling

        // Update wheel style to roll
        this.wheelStyle = `transform: translateY(-${rollDistance}px); transition: transform ${rollDuration}ms ease-out;`;

        // Calculate final position
        setTimeout(() => {
            this.wheelStyle = `transform: translateY(-${this.currentNumber * 20}px); transition: none;`;
        }, rollDuration);
    }
}