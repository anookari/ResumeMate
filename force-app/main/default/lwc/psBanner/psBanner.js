import { LightningElement } from 'lwc';
import profilePicture from '@salesforce/resourceUrl/profilePicture';
//import linkedinIcon from '@salesforce/resourceUrl/LinkedInIcon';
 
export default class PsBanner extends LightningElement {
    
    welcomeMessages = [
    'Hey there! Welcome to my little corner of the internet',
    'Welcome aboard! Explore and connect!',
    'Hi there! Let’s embark on this curious journey together!',
    'Greetings! Ready to explore my world?',
    'Hello! Welcome to my world of exploration and creativity!',
    'Greetings, friend! Let’s discover something new today!',
    'Welcome! Exciting things await you here!',
    'Hey, glad you’re here! Let’s get to know each other.',
    'Welcome to my space where ideas come to life!',
    'Hi! Ready for a fun journey? Let’s go!',
    'Welcome to a world of curiosity and creativity!',
    'Hey! Dive into the adventure.',
    'Hi there! A warm welcome to my corner of the web.',
    'Welcome to my space of exploration and innovation!'
    ];

    taglines = [
        'A curious mind at work. Explore and connect with me!',
        'Innovation starts with curiosity. Let’s discover together!',
        'Curiosity fuels creativity. Dive into my world!',
        'Always exploring, always learning. Join the adventure!',
        'Exploring ideas, one thought at a time.',
        'Innovation and creativity in motion.',
        'Curiosity is the key to creativity. Let’s unlock it.',
        'Always learning, always growing.',
        'A curious mind, always seeking something new.',
        'Exploring the world through fresh perspectives and ideas.',
        'Turning curiosity into creativity. Building something amazing!',
        'Diving deep into new ideas.',
        'Where innovation and curiosity meet.',
        'Exploring new horizons and endless possibilities.'
    ];
    name = 'Bharath Ammanamanchi';
    profilePictureUrl = profilePicture;


    welcomeMessage = this.getRandomMessage(this.welcomeMessages);    
    tagline = this.getRandomMessage(this.taglines);
    
    
    getRandomMessage(list) {
        const randomIndex = Math.floor(Math.random() * list.length);
        return list[randomIndex];
    }

    /*
    //welcomeMessage = 'Welcome to my space', Welcome to my space. Stay curious., A curious mind at work. Welcome!;
    welcomeMessage = 'Hey there! Welcome to my little corner of the internet';
    name = 'Bharath Ammanamanchi';
    tagline = 'A curious mind at work. Explore and connect with me!';
    //linkedinUrl = 'https://www.linkedin.com/in/bharath-ammanamanchi-9b554837'; 
    profilePictureUrl = profilePicture;
    //linkedinIconUrl = linkedinIcon; */

    
}