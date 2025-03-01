import { LightningElement } from 'lwc';
import { getURLParam, isMobile } from 'c/utility';
import { NavigationMixin } from 'lightning/navigation';
import EMAIL_IS_REQUIRED from '@salesforce/label/c.EMAIL_IS_REQUIRED';
import ENTER_A_VALID_EMAIL from '@salesforce/label/c.ENTER_A_VALID_EMAIL';

import checkForContact from '@salesforce/apex/psCheckEmailController.checkForContact';

export default class PsCheckEmail extends NavigationMixin(LightningElement) {
    contactEmailAddress;
    resumeid;
    label = {
        EMAIL_IS_REQUIRED,
        ENTER_A_VALID_EMAIL
    };

    connectedCallback() {
        this.checkurl();
    }

    checkurl() {
        const currentURL = window.location.href;
        console.log('*****currentURL*****' + currentURL);
        this.contactEmailAddress = getURLParam('email');
        this.resumeid = getURLParam('rid');
        const emailPattern = /^\w+([\.-]?\w+)*@([a-zA-Z0-9.-]+)\.([a-zA-Z.-]{2,4})$/;
        
        if (this.contactEmailAddress && this.contactEmailAddress.match(emailPattern)) {
            checkForContact({ emailAddress: this.contactEmailAddress })
                .then(result => {
                    console.log('******Result*** ' + result);
                    if (result != 'Failure') {
                        this.displayResume(result);
                    }
                })
                .catch(error => {
                    console.log('**checkEmailCall error****' + error);
                });
        }

        if (this.resumeid) {
            this.displayResume(this.resumeid);
        }
    }

    handleContactEmailAddressChange(event) {
        if (event.target.name === 'contactEmailAddress') {
            this.contactEmailAddress = event.detail;
        }
    }

    validateEmailAddress() {
        var contactEmailAddressNode = this.template.querySelector('.contactEmailAddress');
        const emailPattern = /^\w+([\.-]?\w+)*@([a-zA-Z0-9.-]+)\.([a-zA-Z.-]{2,4})$/;

        if (!this.contactEmailAddress) {
            contactEmailAddressNode.setFieldValidity(this.label.EMAIL_IS_REQUIRED);
            return false;
        } else if (!this.contactEmailAddress.match(emailPattern)) {
            contactEmailAddressNode.setFieldValidity(this.label.ENTER_A_VALID_EMAIL);
            return false;
        } else {
            contactEmailAddressNode.setFieldValidity('');
            return true;
        }
    }

    checkEmail(event) {
        var contactEmailAddressNode = this.template.querySelector('.contactEmailAddress');

        // Perform the validation only when the "Check Email" button is clicked
        if (!this.validateEmailAddress()) {
            return;
        }

        // Proceed with checking the email if it's valid
        checkForContact({ emailAddress: this.contactEmailAddress })
            .then(result => {
                if (result == 'Failure') {
                    contactEmailAddressNode.setFieldValidity('No records for ' + this.contactEmailAddress + '. Click \'Contact Me\' to reach out.');
                } else {
                    if (contactEmailAddressNode) contactEmailAddressNode.setFieldValidity('');
                    this.displayResume(result);
                }
            })
            .catch(error => {
                console.error('**checkEmailCall error****' + error);
            });
    }

    displayResume(resumeId) {
        console.log('********displayResume********');
        const resumeToDisplayId = resumeId;
        const event = new CustomEvent('showresume', {
            detail: resumeToDisplayId
        });
        this.dispatchEvent(event);
    }

    redirectToURL() {
        const currentURL = window.location.href;
        const url = currentURL + '/resume?email=' + this.contactEmailAddress;
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: url
            }
        });
    }
}