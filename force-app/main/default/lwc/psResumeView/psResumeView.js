import { LightningElement, api } from 'lwc';
import queryResumeDetails from '@salesforce/apex/ResumeViewController.getResumeDetails';

export default class PsResumeView extends LightningElement {
    @api resumeid;
    resumedetails = {};

    connectedCallback() {
        if (this.resumeid) {
            this.getResumeDetails();
        } else {
            console.error('Resume ID is not provided.');
        }
    }

    getResumeDetails() {
        queryResumeDetails({ resumeId: this.resumeid })
            .then(result => {
                if (result) {
                    this.resumedetails = result;
                    console.log('****this.resumedetails.references***'+this.resumedetails.references);
                } else {
                    console.error('No data returned from Apex method.');
                }
            })
            .catch(error => {
                console.error('Error fetching resume details:', error);
            });
    }
}