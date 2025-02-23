public without sharing class ResumeViewController {


    @AuraEnabled(cacheable=true)
    public static Resume getResumeDetails(String resumeId){
        Resume__c resume = [Select id, Name__c, Summary__c, Title__c, Contact_Number__c, Email__c, Location__c From Resume__c where Id=:resumeId];
        List<ResumeLink__c> resLinks = [Select id, Master_Resume__c From ResumeLink__c Where Resume__c=:resumeId];
        Set<Id> masterResumeIdSet = new Set<Id>();
        for(ResumeLink__c rl: resLinks){
            masterResumeIdSet.add(rl.Master_Resume__c);
        }
        List<Master_Resume__c> mrList = [Select id, Name, RecordType.Name, Credential_Id__c, Currently_in_the_Role__c, Description__c, End_Date__c, Field_Of_Study__c, Location__c, No_Expiry__c, 
                                        Organization__c, Organization__r.Name, Start_Date__c, 
                                        Reference_Contact__r.Name, Reference_Contact__r.Email, Reference_Contact__r.Phone, Reference_Contact__r.MobilePhone, Reference_Contact__r.Title
                                        From Master_Resume__c Where Id IN:masterResumeIdSet ORDER BY Start_Date__c DESC];
        List<ContentDocumentLink> contentDocumentLinks = [SELECT ContentDocument.FileExtension, ContentDocument.LatestPublishedVersion.Title, ContentDocument.LatestPublishedVersion.VersionData, LinkedEntityId
                                                            FROM ContentDocumentLink
                                                            WHERE LinkedEntityId IN:masterResumeIdSet];
        System.debug('****contentDocumentLinks***'+contentDocumentLinks);
         List<ID> fileIDs = new List<ID>();
        Map<Id, String> entIdImgUrlMap = new Map<Id, String>();
        for(ContentDocumentLink cdl : contentDocumentLinks){
            String imgUrl;
            imgUrl = 'data:image/' + cdl.ContentDocument.FileExtension + ';charset=utf-8;base64, ';
            imgUrl += EncodingUtil.base64Encode(cdl.ContentDocument.LatestPublishedVersion.VersionData);
            entIdImgUrlMap.put(cdl.LinkedEntityId, imgUrl);
        }
        System.debug('***entIdImgUrlMap****'+entIdImgUrlMap);
        Resume retResume = new Resume();
        retResume.displayName = resume.Name__c;
        retResume.title = resume.Title__c;
        retResume.email = resume.Email__c;
        retResume.phonenumber = resume.Contact_Number__c;
        retResume.location = resume.Location__c;
        retResume.summary = resume.Summary__c;
        retResume.skills = new List<Master_Resume__c>();
        retResume.awards = new List<Master_Resume__c>();
        retResume.certifications = new List<Resume.Certification>();
        retResume.educations = new List<Master_Resume__c>();
        retResume.experiences = new List<Master_Resume__c>();
        retResume.licences = new List<Master_Resume__c>();
        retResume.recognitions = new List<Master_Resume__c>();
        retResume.references = new List<Master_Resume__c>();
        processMasterResumeRecords(mrList, retResume, entIdImgUrlMap);
        return retResume;
    }

    public static void processMasterResumeRecords(List<Master_Resume__c> resumedetails, Resume resume, Map<Id, String> entIdImgUrlMap){

        for(Master_Resume__c mr : resumedetails){
            System.debug('***mr.RecordType.Name***'+mr.RecordType.Name);
            if(mr.RecordType.Name == 'Skill'){                
                resume.skills.add(mr);
            }
            else if(mr.RecordType.Name == 'Award'){
                resume.awards.add(mr);
            }
            else if(mr.RecordType.Name == 'Certification'){
                resume.certifications.add(createCertification(mr, entIdImgUrlMap));
            }
            else if(mr.RecordType.Name == 'Education'){
                resume.educations.add(mr);
            }
            else if(mr.RecordType.Name == 'Experience'){
                resume.experiences.add(mr);
            }
            else if(mr.RecordType.Name == 'License'){
                resume.licences.add(mr);
            }
            else if(mr.RecordType.Name == 'Recognition'){
                resume.recognitions.add(mr);
            }
            else if(mr.RecordType.Name == 'Reference'){
                resume.references.add(mr);
            }
        }
    }

    public static Resume.Certification createCertification(Master_Resume__c mr, Map<Id, String> entIdImgUrlMap){
        Resume.Certification cert = new Resume.Certification(mr);
        cert.certId = mr.Id;
        cert.certName = mr.Name;
        cert.orgName = mr.Organization__r.Name;
        cert.startDate = mr.Start_Date__c;
        cert.endDate = mr.End_Date__c;
        cert.noExpiry = mr.No_Expiry__c;
        cert.cerdentialId = mr.Credential_Id__c;
        if(entIdImgUrlMap.containskey(mr.Id)){
            cert.certImageURL = entIdImgUrlMap.get(mr.Id);
        } 
        return cert;
    }
}