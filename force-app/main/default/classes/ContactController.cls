public with sharing class ContactController {
    public String firstName{get; set;}
    public String lastName{get; set;}

    
    public void save(){
        if(String.isBlank(lastName)){
            ApexPages.addmessage(new ApexPages.message(ApexPages.severity.ERROR,'Last Name is Required'));
        }
        else{
            ApexPages.addmessage(new ApexPages.message(ApexPages.severity.Info,'Welcome '+firstName+' '+lastName));
        }
    }
}