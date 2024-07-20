public with sharing class lightningEmailComposer_Controller {
    // Get Email Templates
    @AuraEnabled(cacheable=true)
    public static list<EmailTemplate> getEmailTemplates() {

        List<String> FolderIds = new List<String>();
        // Select folder first
        for(folder tempFolder : [SELECT Id FROM Folder WHERE Name = 'Project Console']){
            FolderIds.add(tempFolder.Id);
        }

        list<EmailTemplate> eTemplates =  [ SELECT  Id,
                                                    Name,
                                                    DeveloperName,
                                                    NamespacePrefix,
                                                    OwnerId,
                                                    FolderId,
                                                    FolderName,
                                                    Description,
                                                    Subject,
                                                    HtmlValue,
                                                    Body,
                                                    RelatedEntityType
                                            FROM    EmailTemplate
                                            WHERE   FolderId in :FolderIds limit 150];
        system.debug(eTemplates);
        return eTemplates;
    }

    // Get Contact Information
    @AuraEnabled(cacheable=true)
    public static List<Contact> GetContacts(string name){
        String contName;
        List<contact> contacts = new List<contact>();

        if(name != null && name != ''){
            contName = name + '%';
            contacts = [    SELECT  Id,
                                    Name,
                                    Email,
                                    Account.Name
                                    FROM Contact
                                    WHERE Name like :contName
                                    AND email != '' ];
        }
        return contacts;
    }

    // Send Email 
    @AuraEnabled
    public static void SendEmail(String[] attachment, string[] toAddresses, string[] bccAddresses, string[] ccAddresses, string body, string subject){

        system.debug('Sending Email');
        system.debug('attachments ' + attachment);


        List<Messaging.EmailFileAttachment> attachments = new List<Messaging.EmailFileAttachment>();

        // Prepare email attachment. It is necessary to deserialize the string to break the string down
        // into properties.
//        for(string tempAtt : attachment){
//
//            EmailAttachments values = new EmailAttachments();
//            values = (EmailAttachments) System.JSON.deserialize(tempAtt, EmailAttachments.class);
//
//            //Decoding base64Data
//            Blob tempFile = EncodingUtil.base64Decode(values.fileBase64);
//
//            Messaging.EmailFileAttachment efa = new Messaging.EmailFileAttachment();
//            efa.setFileName(values.name);
//            efa.setBody(tempFile);
//            attachments.add(efa);
//        }

        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(toAddresses);

        if(ccAddresses != null){
            mail.setCcAddresses(ccAddresses);
        }

        mail.setReplyTo('noreply@ultimatesoftware.com');
        mail.setSenderDisplayName('Ultimate Software');
        mail.setSubject(subject);
        mail.setUseSignature(false);
        mail.setHtmlBody(body);

        // Attach files if needed
        if(!attachments.isEmpty()){
            mail.setFileAttachments(attachments);
        }

        // Send Out Email
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        //return 'Email Sent';
    }

    // Get user fields for email template mapping
    @AuraEnabled(cacheable=true)
    public static Map<string, string> GetUserFieldAndValues(){

        String userId = UserInfo.getUserId();
        list<ec_user_field_mapping__c> ecufm_list = [select name from ec_user_field_mapping__c where name like '%User set fields set%' ];
        integer counter = ecufm_list.size();
        string ecSetName = 'User set fields set ';
        string totalFields = '';

        for(integer i = 1 ; i <= counter ; i++){
            ec_user_field_mapping__c ecufm = ec_user_field_mapping__c.getValues('User set fields set ' + i);
            totalFields += string.valueOf(ecufm.get('User_Field__c') + ' ');
        }

        totalFields = totalFields.replace(' ','');
        string soqlQuery = ' SELECT  ' + totalFields +  ' FROM User WHERE Id =\'' + userId + '\' LIMIT 1';
        SObject s = Database.query(soqlQuery);

        list<string> usersFields = totalFields.split(',');
        Map<string, string> UserMapValues = new Map<string, string>();

        for(string tempUserField : usersFields){
            UserMapValues.put(tempUserField, string.valueOf(s.get(tempUserField)));
        }
        system.debug('UserMapValues --> ' + UserMapValues);
        return UserMapValues;
    }

    public class EmailAttachments{
        public string index;
        public string name;
        public string fileBase64;

        public EmailAttachments(){

        }
    }

}