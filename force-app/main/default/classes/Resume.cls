public without sharing class Resume {
    @AuraEnabled
    public String displayName;
    @AuraEnabled
    public String title;
    @AuraEnabled
    public String email;
    @AuraEnabled
    public String phonenumber;
    @AuraEnabled
    public String location;
    @AuraEnabled
    public String summary;
    @AuraEnabled
    public List<Master_Resume__c> skills;
    @AuraEnabled
    public List<Master_Resume__c> awards;
    @AuraEnabled
    public List<Certification> certifications;    
    @AuraEnabled
    public List<Master_Resume__c> licences;
    @AuraEnabled
    public List<Master_Resume__c> recognitions;
    @AuraEnabled
    public List<Master_Resume__c> experiences;
    @AuraEnabled
    public List<Master_Resume__c> educations;
    @AuraEnabled
    public List<Master_Resume__c> references;

    public class Certification{
        @AuraEnabled
        public String certId;
        @AuraEnabled
        public String certName;
        @AuraEnabled
        public String orgName;
        @AuraEnabled
        public Date startDate;
        @AuraEnabled
        public Date endDate;
        @AuraEnabled
        public Boolean noExpiry;
        @AuraEnabled
        public String cerdentialId;
        @AuraEnabled
        public String certImageURL;
        
        public Certification(Master_Resume__c mr){
            this.certId = mr.Id;
            this.certName = mr.Name;
            this.orgName = mr.Organization__r.Name;
            this.startDate = mr.Start_Date__c;
            this.endDate = mr.End_Date__c;
            this.noExpiry = mr.No_Expiry__c;
            this.cerdentialId = mr.Credential_Id__c;
        }
    }
}