import { LightningElement, track, api} from 'lwc';
 
export default class TextArea extends LightningElement {

    @api fieldlabel; 
    @api fieldvalue; // value displayed inside input field
    @api placeholdertext; // might be the same as fieldlabel
    @api type; // text, number, checkbox, combobox
    @api maxlen;
    @api readonlyfield;
    @api maxrows;

    errorMessage;

    renderedCallback(){
        try {
            let elemInput = this.template.querySelector('textarea');                
            let elemLabel = this.template.querySelector('label');
            let elemDiv = this.template.querySelector('[data-id="floatContainer"]');
                
            if(elemInput && elemLabel) {
                if (this.pPlaceHolderText === undefined || elemInput.value === "undefined"){
                    elemInput.value = "";
                }
                
                if (elemInput.value) {
                    elemLabel.innerHTML = this.fieldlabel;
                    elemInput.placeholder = "";
                    elemLabel.classList.add('float-label');
                    //Added to disable the border
                    if(this.readonlyfield == true){ 
                        elemDiv.classList.add('float-container_disabled');
                        elemInput.setAttribute("disabled", true);
                    }else{
                        elemDiv.classList.remove('float-container_disabled');
                    }
                    
                } else {
                    //let elemDiv = this.template.querySelector('[data-id="floatContainer"]');
                    elemDiv.classList.add('float-container_empty');
                    if(this.readonlyfield == true){
                        elemDiv.classList.add('float-container_disabled');
                        elemInput.setAttribute("disabled", true);
                        elemInput.value=this.fieldvalue ;
                        elemLabel.classList.add('float-label');
                        elemLabel.innerHTML = this.fieldlabel;
                    }else{
                        // if (this.pPlaceHolderText != this.fieldlabel) {
                        //     elemLabel.innerHTML = this.fieldlabel;
                        //     elemLabel.classList.add('float-label');
                        // }
                        elemDiv.classList.remove('float-container_disabled');
                    }
                }       
            }
                  
            //this.autoResize();


        } catch (ex) {
            this.error = ex;
            window.console.error("######$ uxMultiLineInput:renderedCallback exception : " + ex);
        }
    }

    get pFieldValue(){
        let txt = "";
        if (this.fieldvalue && this.fieldvalue !== "null")
            txt = this.fieldvalue;

        return txt;
    }

    set pFieldValue(value){
        if (value && value !== "null")
            this.pFieldValue = value;
        else
            this.pFieldValue = "";
    }

    get pPlaceHolderText(){
        let txt = this.fieldlabel;
        if (this.placeholdertext)
            txt = this.placeholdertext;

        return txt;
    }

    set pPlaceHolderText(value){
        if (value && value !== "null")
            this.pPlaceHolderText = value;
        else
            this.pPlaceHolderText = this.fieldlabel;
    }    

    handleFormInputChange(event){
        //this.clearValidationError();
        if( event.target.name === 'inputType' ){
            this.fieldvalue = event.target.value;
            const valueChangeEvent = new CustomEvent('valuechange',  { detail: this.fieldvalue });
            // Fire the custom event
            this.dispatchEvent(valueChangeEvent); 
        }

    }

    autoResize(){
        
        let textareas = this.template.querySelector('[data-id="editInput"]' );
        let hiddenDiv = document.createElement('div');
        let content = null;
        
        // Adds a class to all textareas
        textareas.classList.add('txtstuff');

        // Build the hidden div's attributes
        hiddenDiv.classList.add('txta');
        hiddenDiv.classList.add('hiddendiv');

        textareas.addEventListener('input', function() {
            console.log('######$12 addEventListener input=' ) ; 
            
            // Append hiddendiv to parent of textarea, so the size is correct
            textareas.parentNode.appendChild(hiddenDiv);
            
            // Remove this if you want the user to be able to resize it in modern browsers
            textareas.style.resize = 'none';
            
            // This removes scrollbars
            textareas.style.overflow = 'hidden';

            // Every input/change, grab the content
            content = textareas.value;
            
            // This is for old IE
            content = content.replace(/\n/g, '<br>');
            
            // The <br ..> part is for old IE
            // This also fixes the jumpy way the textarea grows if line-height isn't included
            hiddenDiv.innerHTML = content + '<br style="line-height: 3px;">';

            // Briefly make the hidden div block but invisible
            // This is in order to read the height
            hiddenDiv.style.visibility = 'hidden';
            hiddenDiv.style.display = 'block';
            textareas.style.height = hiddenDiv.offsetHeight + 'px';

            // Make the hidden div display:none again
            hiddenDiv.style.visibility = 'visible';
            hiddenDiv.style.display = 'none';
        });
            

    }

    // Method to set validity of the field. Input: Error message. If Error message is empty, validity will be cleaned
    @api
    setFieldValidity(errMsg) {
        // const element = this.template.querySelector('lightning-input');
        let elemInput = this.template.querySelector('[data-id="editInput"]');
        let elemLabel = this.template.querySelector('[data-id="editLabel"]');
        let elemDiv = this.template.querySelector('[data-id="floatContainer"]');
        let elemErrDiv = this.template.querySelector('[data-id="errorDiv"]');
        let elemErrMsg = this.template.querySelector('[data-id="errorMsg"]');

        if (elemInput && elemLabel && elemDiv && elemErrDiv && elemErrMsg) {
            if (errMsg) {
                this.errorMessage = errMsg;
                elemErrDiv.classList.remove('slds-hide');

                //add aria attributes
                elemInput.setAttribute("aria-describedby", elemErrMsg.id);
                elemInput.setAttribute("aria-invalid", "true");

                elemLabel.classList.remove('float-label_focus');
                elemLabel.classList.add('float-label_error');
                elemDiv.classList.remove('float-container_empty');
                elemDiv.classList.add('float-container_error');
            } else {
                this.errorMessage = '';
                elemErrDiv.classList.add('slds-hide');

                //remove aria attributes
                elemInput.setAttribute("aria-describedby", null);
                elemInput.setAttribute("aria-invalid", "false");

                elemLabel.classList.remove('float-label_error');
                elemDiv.classList.remove('float-container_error');
            }
        }
    } 
   
    // Method dispatch event from child to parent capturing the value entered 
    handleBlur(event){
        let elemInput = event.target;
        let elemLabel = this.template.querySelector('[data-id="editLabel"]');
        let elemDiv = this.template.querySelector('[data-id="floatContainer"]');
               
        let value = elemInput.value;
        if(elemInput && elemLabel && elemDiv) {
            if (value) {
                elemDiv.classList.remove('float-container_empty');
            } else {
                // if(this.pPlaceHolderText == this.fieldlabel) {
                //     elemLabel.innerHTML = '';
                // }
                elemLabel.innerHTML = '';
                elemInput.placeholder = this.pPlaceHolderText;
                elemLabel.classList.add('float-label');
                elemDiv.classList.add('float-container_empty'); 
            } 
            
            elemLabel.classList.remove('float-label_focus');
            elemDiv.classList.remove('float-container_focus');
        }

        const validateEvent = new CustomEvent('validateinput', {detail:value});
        this.dispatchEvent(validateEvent);
    }

    @api
    setValue(elemVal) {
        let elemInput = this.template.querySelector('textarea');
        elemInput.value = elemVal;
    }

    handleFocus(event){
        let elemInput = event.target;
        let elemLabel = this.template.querySelector('[data-id="editLabel"]');
        let elemDiv = this.template.querySelector('[data-id="floatContainer"]');
        let value = elemInput.value;
                
        if(elemInput && elemLabel && elemDiv) {
            if (value === '') {
                elemLabel.innerHTML = this.fieldlabel;
                elemInput.placeholder = "";
                elemLabel.classList.add('float-label'); 
            }
            
            elemLabel.classList.add('float-label_focus');        
            elemDiv.classList.remove('float-container_empty');
            elemDiv.classList.add('float-container_focus');
        }
    }

    // Method to set red color for the field. Input: Error message. If Error message is empty, validity will be cleaned
    @api
    setFieldRed(enable) {

        let elemInput = this.template.querySelector('[data-id="editInput"]');
        let elemLabel = this.template.querySelector('[data-id="editLabel"]');
        let elemDiv = this.template.querySelector('[data-id="floatContainer"]');
   
        if (elemInput && elemLabel && elemDiv) {
            if(enable == true){
                elemInput.setAttribute("aria-invalid", "true");
                elemLabel.classList.remove('float-label_focus');
                elemLabel.classList.add('float-label_error');
                elemDiv.classList.remove('float-container_empty');
                elemDiv.classList.add('float-container_error');
            } else {
                //remove aria attributes
                elemInput.setAttribute("aria-invalid", "false");
                elemLabel.classList.remove('float-label_error');
                elemDiv.classList.remove('float-container_error');
            }
        }
    } 

}