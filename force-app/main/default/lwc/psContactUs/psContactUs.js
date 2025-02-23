import { LightningElement } from 'lwc';
import submitContactUs from '@salesforce/apex/ContactUsController.submitContactUs';

import FIRST_NAME_IS_REQUIRED from '@salesforce/label/c.FIRST_NAME_IS_REQUIRED';
import LAST_NAME_IS_REQUIRED from '@salesforce/label/c.LAST_NAME_IS_REQUIRED';
import EMAIL_IS_REQUIRED from '@salesforce/label/c.EMAIL_IS_REQUIRED';
import ENTER_A_VALID_EMAIL from '@salesforce/label/c.ENTER_A_VALID_EMAIL';
import COMPANY_NAME_IS_REQUIRED from '@salesforce/label/c.COMPANY_NAME_IS_REQUIRED';
import SUBJECT_IS_REQUIRED from '@salesforce/label/c.SUBJECT_IS_REQUIRED';
import MESSAGE_IS_REQUIRED from '@salesforce/label/c.MESSAGE_IS_REQUIRED';
 
export default class PsContactUs extends LightningElement {
    firstName = '';
    lastName = '';
    mobilePhone = '';
    otherPhone = '';
    emailAddress = '';
    companyName = '';
    subject = '';
    message = '';
    lead;
    showContactUsForm = false;
    showToastMessage = false;
    toastTitle = '';
    toastMessage = '';

    errorSet = new Set();

    

    label = {
        FIRST_NAME_IS_REQUIRED,
        LAST_NAME_IS_REQUIRED,
        EMAIL_IS_REQUIRED,
        ENTER_A_VALID_EMAIL,
        COMPANY_NAME_IS_REQUIRED,
        SUBJECT_IS_REQUIRED,
        MESSAGE_IS_REQUIRED
    }

    contactusClick(){
        let element = this.template.querySelector('[data-id="contactus-container"]');
        if(this.showContactUsForm){
            this.showContactUsForm = false;
            if(element){
                element.classList.add('slds-hide');
            }
            this.resetFields();
        }
        else{
            this.showContactUsForm = true;
            if(element){
                element.classList.remove('slds-hide');
            }
        }
    }

    handleValueChange(event) {        
        if (event.target.name === 'firstName') {
            this.firstName = event.detail;
            this.validateFirstName();
        }
        else if (event.target.name === 'lastName') {
            this.lastName = event.detail;
            this.validateLastName();
        }
        else if (event.target.name === 'mobilePhone') {
            this.mobilePhone = event.detail;
            //this.validateMobilePhone();
        }
        else if (event.target.name === 'otherPhone') {
            this.otherPhone = event.detail;
            //this.validateotherPhone();
        }
        else if (event.target.name === 'emailAddress') {
            this.emailAddress = event.detail;
            this.validateEmailAddress();
        }
        else if (event.target.name === 'companyName') {
            this.companyName = event.detail;
            this.validateCompanyName();
        }
        else if (event.target.name === 'subject') {
            this.subject = event.detail;
            this.validateSubject();
        }
        else if (event.target.name === 'messageta') {
            this.message = event.detail;
            this.validateMessage();
        }
   
    }

    validateFirstName(){
        var firstNameNode = this.template.querySelector('.firstName');
        let firstNameIn = this.template.querySelector('.firstName').fieldtext;
        this.addToErrorSet('firstName');
        if(!this.firstName){
            firstNameNode.setFieldValidity(this.label.FIRST_NAME_IS_REQUIRED); 
            return false;
        }
        else{
            firstNameNode.setFieldValidity(''); 
            this.removeFromErrorSet('firstName');
            return true;
        }
    }

    validateLastName(){
        var lastNameNode = this.template.querySelector('.lastName');
        let lastNameIn = this.template.querySelector('.lastName').fieldtext;
        this.addToErrorSet('lastName');
        if(!this.lastName){
            lastNameNode.setFieldValidity(this.label.LAST_NAME_IS_REQUIRED); 
            return false;
        }
        else{
            lastNameNode.setFieldValidity(''); 
            this.removeFromErrorSet('lastName');
            return true;
        }
    }

    // validateMobilePhone(){
    //     let mobilePhoneIn = this.template.querySelector('.mobilePhone').fieldtext;
    //     this.addToErrorSet('mobilePhone');
    // }

    validateEmailAddress(){
        var emailAddressNode = this.template.querySelector('.emailAddress');
        let emailAddressIn = this.template.querySelector('.emailAddress').fieldtext;
        const emailPattern = /^\w+([\.-]?\w+)*@([a-zA-Z0-9.-]+)\.([a-zA-Z.-]{2,4})$/; 
        this.addToErrorSet('emailAddress');
        
        if(!this.emailAddress){
            emailAddressNode.setFieldValidity(this.label.EMAIL_IS_REQUIRED); 
            return false;
        }
        else if(!this.emailAddress.match(emailPattern)){
            emailAddressNode.setFieldValidity(this.label.ENTER_A_VALID_EMAIL);
            return false;
        }   
        else{
            emailAddressNode.setFieldValidity('');
            this.removeFromErrorSet('emailAddress');  
            return true;
        }
    }

    validateCompanyName(){
        var companyNameNode = this.template.querySelector('.companyName');
        let companyNameIn = this.template.querySelector('.companyName').fieldtext;
        this.addToErrorSet('companyName');
        if(!this.companyName){
            companyNameNode.setFieldValidity(this.label.COMPANY_NAME_IS_REQUIRED); 
            return false;
        }
        else{
            companyNameNode.setFieldValidity(''); 
            this.removeFromErrorSet('companyName');
            return true;
        }
    }

    validateSubject(){
        var subjectNode = this.template.querySelector('.subject');
        let subjectIn = this.template.querySelector('.subject').fieldtext;
        this.addToErrorSet('subject');
        if(!this.subject){
            subjectNode.setFieldValidity(this.label.SUBJECT_IS_REQUIRED); 
            return false;
        }
        else{
            subjectNode.setFieldValidity(''); 
            this.removeFromErrorSet('subject');
            return true;
        }
    }

    validateMessage(){
        var messagetaNode = this.template.querySelector('.messageta');
        let messagetaIn = this.template.querySelector('.messageta').fieldtext;
        this.addToErrorSet('messageta');
        if(!this.message){
            messagetaNode.setFieldValidity(this.label.MESSAGE_IS_REQUIRED); 
            return false;
        }
        else{
            messagetaNode.setFieldValidity(''); 
            this.removeFromErrorSet('messageta');
            return true;
        }
    }

    // isPhoneValid(phone){
    //     var newFormattedPhone = this.unFormatPhone(phone);
    //     var phonePattern = new RegExp('[2-9]{1}[0-9]{2}[2-9]{1}[0-9]{6}');
    //     var validPhone = phonePattern.test(newFormattedPhone);
    //     console.log('***isNaN(newFormattedPhone)***'+isNaN(newFormattedPhone)+'**newFormattedPhone.length**'+newFormattedPhone.length+'**validPhone**'+validPhone);
    //     if(isNaN(newFormattedPhone) || (validPhone == false)) {
    //         return false;
    //     }
    //     return true;
    // }

    checkEmptyCase(dataValue) {
        if(dataValue === "" ||dataValue === null || dataValue === 'null' ){
            dataValue = dataValue.trim();
        }
        if (dataValue === "" ||
            dataValue === null ||
            dataValue === 'null' ||
            dataValue === 'undefined' || dataValue === undefined) {
            return true;
        }
        return false;
    }

    addToErrorSet(value){
        this.errorSet.add(value);        
    }

    removeFromErrorSet(value){
        if(this.errorSet.has(value)){
            this.errorSet.delete(value);
        }        
        if(this.errorSet.size === 0){
            this.enableSubmitBtn();
        }   
    }

    disableSignInBtn(){
        let signInBtn = this.template.querySelector('[data-id="signIn"]');
        if(signInBtn){
            signInBtn.classList.remove('btnActiveColor');
            signInBtn.classList.add('btnInActiveColor');
            signInBtn.disabled = true;
        }        
    }

    enableSubmitBtn(){
        let submitBtn = this.template.querySelector('[data-id="submitBtn"]');
        if(submitBtn){
            submitBtn.classList.remove('btnInActiveColor');
            submitBtn.classList.add('btnActiveColor');
            submitBtn.disabled = false;
        }
    }

    validateConfirm(){
        this.validateFirstName();
        this.validateLastName();
        this.validateEmailAddress();
        this.validateCompanyName();
        this.validateSubject();
        this.validateMessage();
    }

    submitClick(){
        this.validateConfirm();
        if(this.errorSet.size > 0){
            this.disableSignInBtn();
            return;
        } 
        this.submitcallback();
        this.contactusClick();     
        this.resetFields();       
        
    }

    submitcallback(){
        submitContactUs({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.emailAddress,
            companyName: this.companyName,
            mobilePhone: this.mobilePhone,
            phone: this.otherPhone,
            subject: this.subject,
            message: this.message
        })
            .then(response => {
                if (response.success) {  // Corrected to use response.success
                    this.showToast('Success', 'Submitted successfully!');
                } else {
                    alert('Error creating lead: ' + response.errorMessage);
                }
            })
            .catch(error => {
                console.log('**submitContactUs error****'+JSON.stringify(error));
            })
            .finally(() => {

            });
    }

    resetFields() {
        this.firstName = '';
        this.lastName = '';
        this.mobilePhone = '';
        this.otherPhone = '';
        this.emailAddress = '';
        this.companyName = '';
        this.subject = '';
        this.message = '';
        
        const messageField = this.template.querySelector('.messageta');
        if (messageField) {
            messageField.setValue(''); 
        }

        this.errorSet.clear();
        
        // Reset individual field validity
        const fields = this.template.querySelectorAll('.firstName, .lastName, .mobilePhone, .otherPhone, .emailAddress, .companyName, .subject, .messageta');
        fields.forEach(field => field.setFieldValidity(''));
    }

    showToast(title, message) {
        // Instead of ShowToastEvent, update custom message
        this.toastTitle = title;
        this.toastMessage = message;
        this.showToastMessage = true;

        // Optionally hide after 3 seconds
        setTimeout(() => {                   
            this.showToastMessage = false;
        }, 3000);
    }

}