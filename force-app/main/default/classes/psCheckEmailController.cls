public without sharing class psCheckEmailController {
    public psCheckEmailController(){

    }

    @AuraEnabled
    public static String checkForContact(String emailAddress){
        List<Contact> contactList = new List<Contact>();
        contactList = [Select id,Resume__c from Contact Where Email=:emailAddress];
        if(contactList.size() == 0){
            return 'Failure';
        }
        else{
            return contactList[0].Resume__c;
        }
    }
}