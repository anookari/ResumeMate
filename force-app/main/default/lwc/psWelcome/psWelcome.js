import { LightningElement } from 'lwc';
 
export default class PsWelcome extends LightningElement {

    showtricard = false;
    showResume = false;
    resumeId;

    handleShowResume(event) {
        const value = event.detail;
        if(value){
            this.showResume = true;
            this.resumeId = value;
        }        
        console.log('***this.showResume****'+this.showResume);
    }
}