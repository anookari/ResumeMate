import { LightningElement } from 'lwc';

export default class Tricard extends LightningElement {
    cards = [
        { id: 1, title: 'Card 1', description: 'Description 1', actionTaken: '' },
        { id: 2, title: 'Card 2', description: 'Description 2', actionTaken: '' },
        { id: 3, title: 'Card 3', description: 'Description 3', actionTaken: '' },
        { id: 4, title: 'Card 4', description: 'Description 4', actionTaken: '' },
        { id: 5, title: 'Card 5', description: 'Description 5', actionTaken: '' },
        { id: 6, title: 'Card 6', description: 'Description 6', actionTaken: '' },
        { id: 7, title: 'Card 7', description: 'Description 7', actionTaken: '' },
        { id: 8, title: 'Card 8', description: 'Description 8', actionTaken: '' },
        { id: 9, title: 'Card 9', description: 'Description 9', actionTaken: '' },
        { id: 10, title: 'Card 10', description: 'Description 10', actionTaken: '' },
    ];

    currentIndex = 1;
    isDragging = false;
    startX = 0;
    startY = 0;
    deltaX = 0;
    deltaY = 0;
    middleCardStyle = '';
    likeAnimation = false;
    dislikeAnimation = false;
    displayCards = new Map();
    swipeThreshold = 50;
    horizontalSwipeLimit = 75;
    verticalSwipeLimit = 65;

    connectedCallback() {
        this.initializeCards();
    }

    initializeCards() {
        let tempdisplayCards = new Map();
        tempdisplayCards.set(1, { id: 1, displaytext: 'Move cards left to right to like or dislike word', title: '', description: '', actionTaken: '' });

        this.cards.forEach((card, index) => {
            tempdisplayCards.set(index + 2, { displaytext: card.title, description: card.description, actionTaken: card.actionTaken, ...card });
        });

        tempdisplayCards.set(this.cards.length + 2, { id: this.cards.length + 2, displaytext: 'List Empty', title: '', description: '', actionTaken: '' });
        this.displayCards = tempdisplayCards;
        this.currentIndex = 2;
        this.moveup();
    }

    handleSwipe(action) {
        if (!this.middleCard) return;

        if (action === 'Liked') {
            this.middleCard.actionTaken = action;
            this.likeAnimation = true;            
        } else if (action === 'Disliked') {
            this.middleCard.actionTaken = action;
            this.dislikeAnimation = true;
        }

        this.animateCardSwap(action);
    }

    animateCardSwap(action) {
        this.middleCardStyle = `transform: translateY(-100%); transition: transform 0.3s ease-out;`;

        setTimeout(() => {
            if (action === 'Liked' || action === 'Disliked' || action === 'Up') {
                this.moveup();
            } else if (action === 'Down') {
                this.movedown();
            }
        }, 300);
    }

    startDrag(event) {
        event.preventDefault();
        this.isDragging = true;
        this.startX = event.touches ? event.touches[0].clientX : event.clientX;
        this.startY = event.touches ? event.touches[0].clientY : event.clientY;
        this.deltaX = 0;
        this.deltaY = 0;
    }

    dragging(event) {
        if (!this.isDragging) return;

        this.deltaX = (event.touches ? event.touches[0].clientX : event.clientX) - this.startX;
        this.deltaY = (event.touches ? event.touches[0].clientY : event.clientY) - this.startY;

        this.middleCardStyle = `transform: translate(${this.deltaX}px, ${this.deltaY}px);`;
    }

    endDrag() {
        this.isDragging = false;

        // Handle horizontal swipe logic (Left or Right)
        if (Math.abs(this.deltaX) > this.swipeThreshold) {
            if (this.deltaX > this.horizontalSwipeLimit) {
                // Swipe right - Like action
                this.handleSwipe('Liked');
                this.middleCardStyle = 'transform: translate(150%, 0); transition: transform 0.3s ease-out;';
                setTimeout(() => {
                    this.middleCardStyle = 'transform: scale(1.1); opacity: 0; transition: transform 0.3s ease-out;';
                    setTimeout(() => {
                        this.middleCardStyle = 'transform: scale(1); opacity: 1; transition: transform 0.3s ease-out;';
                    }, 300);
                }, 300);
            } else if (this.deltaX < -this.horizontalSwipeLimit) {
                // Swipe left - Dislike action
                this.handleSwipe('Disliked');
                this.middleCardStyle = 'transform: translate(-150%, 0); transition: transform 0.3s ease-out;';
                setTimeout(() => {                    
                    this.middleCardStyle = 'transform: scale(1.1); opacity: 0; transition: transform 0.3s ease-out;';
                    setTimeout(() => {
                        this.middleCardStyle = 'transform: scale(1); opacity: 1; transition: transform 0.3s ease-out;';
                    }, 300);
                }, 300);
            } else {
                // If swipe is not far enough for like/dislike, reset card to center
                this.middleCardStyle = 'transform: translate(0, 0); transition: transform 0.3s ease-out;';
            }
        }
        // Handle vertical swipe logic (Up or Down)
        else if (Math.abs(this.deltaY) > this.swipeThreshold) {
            if (this.deltaY < -this.verticalSwipeLimit) {
                this.handleSwipe('Up');
                this.middleCardStyle = 'transform: translate(0, -150%); transition: transform 0.3s ease-out;';
                setTimeout(() => {
                    this.middleCardStyle = 'transform: scale(1.1); opacity: 0; transition: transform 0.3s ease-out;';
                    setTimeout(() => {
                        this.middleCardStyle = 'transform: scale(1); opacity: 1; transition: transform 0.3s ease-out;';
                    }, 300);
                }, 300);
            } else if (this.deltaY > this.verticalSwipeLimit) {
                this.handleSwipe('Down');
                this.middleCardStyle = 'transform: translate(0, 150%); transition: transform 0.3s ease-out;';
                setTimeout(() => {
                    this.middleCardStyle = 'transform: scale(1.1); opacity: 0; transition: transform 0.3s ease-out;';
                    setTimeout(() => {
                        this.middleCardStyle = 'transform: scale(1); opacity: 1; transition: transform 0.3s ease-out;';
                    }, 300);
                }, 300);
            }
        } else {
            // Reset card to the center position for small swipe distances
            this.middleCardStyle = 'transform: translate(0, 0); transition: transform 0.3s ease-out;';
        }
    }

    moveup() {
        if(this.currentIndex != this.displayCards.length){
            this.currentIndex++;
        }        
        this.topCard = this.displayCards.get(this.currentIndex - 1) || {};
        this.middleCard = this.displayCards.get(this.currentIndex) || {};
        this.bottomCard = this.displayCards.get(this.currentIndex + 1) || {};
    }

    movedown() {
        if(this.currentIndex != 1){
            this.currentIndex--;
        } 
        this.topCard = this.displayCards.get(this.currentIndex + 1) || {};
        this.middleCard = this.displayCards.get(this.currentIndex) || {};
        this.bottomCard = this.displayCards.get(this.currentIndex - 1) || {};
    }
}