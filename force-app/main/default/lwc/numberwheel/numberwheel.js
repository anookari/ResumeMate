import { LightningElement, track, api } from 'lwc';

export default class NumberWheel extends LightningElement {
    @track numbers = [];
    @api currentNumber = 0;
    totalNumbers = 10;

    connectedCallback() {
        this.initializeNumbers();
    }

    initializeNumbers() {
        // Create a repeating sequence of numbers
        this.numbers = Array.from({ length: this.totalNumbers * 3 }, (_, i) => i % this.totalNumbers);
    }

    renderedCallback() {
        this.updateWheel();
    }

    updateWheel() {
        const wheel = this.template.querySelector('.wheel');
        if (wheel) {
            // Total height to roll through (three times the number of elements)
            const totalHeight = this.numbers.length * 50;
            // Calculate the position to roll to
            const targetPosition = (this.numbers.length - this.totalNumbers + this.currentNumber) * 50;

            // Set up the transition for rolling effect
            wheel.style.transition = 'transform 2s cubic-bezier(0.5, 0, 0.5, 1)';
            wheel.style.transform = `translateY(-${targetPosition}px)`;

            // Reset to the actual position after the transition
            setTimeout(() => {
                wheel.style.transition = 'none';
                wheel.style.transform = `translateY(-${this.currentNumber * 50}px)`;
            }, 2000); // Duration must match the transition time
        }
    }
}