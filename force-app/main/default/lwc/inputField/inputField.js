import { LightningElement, track, api } from "lwc";
 
export default class InputField extends LightningElement {

    @api type;
    @api fieldlabel;
    @api fieldvalue; 
    @api fieldid;
    @api placeholdertext;
    @api textboxclass;
    @api maxlen;
    @api minlen;
    @api activeindex = -1;
    @api displaypattern;
    @api readonlyfield;
    @api required;
    errorMessage = 'ERROR';

    renderedCallback(){
        try{
            let elemInput = this.template.querySelector("input");
            let elemLabel = this.template.querySelector("label");
            let elemDiv = this.template.querySelector('[data-id="floatContainer"]');
            if (elemInput && elemLabel) {

                if (this.pPlaceHolderText === undefined ||elemInput.value === "undefined") {
                    elemInput.value = "";
                }

                if (elemInput.value) {
                    elemLabel.innerHTML = this.fieldlabel;
                    elemInput.placeholder = "";
                    elemLabel.classList.add("float-label");
                    //Added to disable the border
                    if (this.readonlyfield == true) {
                        elemDiv.classList.add("float-container_disabled");
                    } else {
                        elemDiv.classList.remove("float-container_disabled");
                    }
                } else {
                    elemDiv.classList.add("float-container_empty");
                    if (this.readonlyfield == true) {
                        elemDiv.classList.add("float-container_disabled");
                    } else {
                        elemDiv.classList.remove("float-container_disabled");
                    }
                }
            }
        }
        catch(e){
            console.log('******inputfield renderedCallback ERROR *** '+e);
        }
    }

    get isReadOnly() {
        return this.type === "readonly" ? true : false;
    }

    get isText() {
        return this.type === "text" ? true : false;
    }

    get isEmail() {
        return this.type === "email" ? true : false;
    }

    get isNumber() {
        return this.type === "number" ? true : false;
    }

    get isCurrency() {
        return this.type === "currency" ? true : false;
    }

    validate() {
        const validateEvent = new CustomEvent("validate", {
            detail: this.fieldtext
        });
        // Fire the custom event
        this.dispatchEvent(validateEvent);
    }

    get pFieldValue() {
        let txt = "";
        if (this.fieldvalue && this.fieldvalue !== "null") txt = this.fieldvalue;

        return txt;
    }

    set pFieldValue(value) {
        if (value && value !== "null") this.pFieldValue = value;
        else this.pFieldValue = "";
    }

    get pPlaceHolderText() {
        let txt = this.fieldlabel;
        if (this.placeholdertext) txt = this.placeholdertext;

        return txt;
    }

    set pPlaceHolderText(value) {
        if (value && value !== "null") this.pPlaceHolderText = value;
        else this.pPlaceHolderText = this.fieldlabel;
    }

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
                elemErrDiv.classList.remove("slds-hide");

                //add aria attributes
                elemInput.setAttribute("aria-describedby", elemErrMsg.id);
                elemInput.setAttribute("aria-invalid", "true");

                elemLabel.classList.remove("float-label_focus");
                elemLabel.classList.add("float-label_error");
                elemDiv.classList.remove("float-container_empty");
                elemDiv.classList.add("float-container_error");
            } else {
                this.errorMessage = "";
                elemErrDiv.classList.add("slds-hide");

                //remove aria attributes
                elemInput.setAttribute("aria-describedby", null);
                elemInput.setAttribute("aria-invalid", "false");

                elemLabel.classList.remove("float-label_error");
                elemDiv.classList.remove("float-container_error");
            }
        }
    }

    handleBlur(event){
        let elemInput = event.target;
        let elemLabel = this.template.querySelector('[data-id="editLabel"]');
        let elemDiv = this.template.querySelector('[data-id="floatContainer"]');

        let value = elemInput.value;
        if (elemInput && elemLabel && elemDiv) {
            if (value) {
                elemDiv.classList.remove("float-container_empty");
            } else {
                elemLabel.innerHTML = "";
                elemInput.placeholder = this.pPlaceHolderText;
                elemLabel.classList.add("float-label");
                elemDiv.classList.add("float-container_empty");
            }

            elemLabel.classList.remove("float-label_focus");
            elemDiv.classList.remove("float-container_focus");
        }

        const validateEvent = new CustomEvent("validateinput", {
            detail: value
        });
        this.dispatchEvent(validateEvent);
    }

    handleFocus(event){
        let elemInput = event.target;
        let elemLabel = this.template.querySelector('[data-id="editLabel"]');
        let elemDiv = this.template.querySelector('[data-id="floatContainer"]');
        let value = elemInput.value;

        if (elemInput && elemLabel && elemDiv) {
            if (value === "") {
                elemLabel.innerHTML = this.fieldlabel;                
                elemInput.placeholder = "";
                elemLabel.classList.add("float-label");
            }

            elemLabel.classList.add("float-label_focus");
            elemDiv.classList.remove("float-container_empty");
            elemDiv.classList.add("float-container_focus");
        }
    }

    handleInputChange(event){
        if (event.target.name === "inputType") {
            this.fieldvalue = event.target.value;
            const valueChangeEvent = new CustomEvent("valuechange", {
                detail: this.fieldvalue
            });
            // Fire the custom event
            this.dispatchEvent(valueChangeEvent);
        } 
    }
}