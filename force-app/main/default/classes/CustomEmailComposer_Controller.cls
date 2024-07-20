public with sharing class CustomEmailComposer_Controller {


    public string ecToAddress {get;set;}
    public string ecSubject {get;set;}
    public string ecBody {get;set;}

    public attachment tempHDNAtt {get  { if (att == null)
                                        att = new Attachment();
                                        return att;
                                }
                                set;
                        }

    public attachment att {get  { if (att == null)
                                        att = new Attachment();
                                        return att;
                                }
                                set;
                        }

    public attachment att2 {get  { if (att2 == null)
                                        att2 = new Attachment();
                                        return att2;
                                }
                                set;
                        }

    public attachment att3 {get  { if (att3 == null)
                                        att3 = new Attachment();
                                        return att3;
                                }
                                set;
                        }

    public attachment att4 {get  { if (att4 == null)
                                        att4 = new Attachment();
                                        return att4;
                                }
                                set;
                        }

    public attachment att5 {get  { if (att5 == null)
                                        att5 = new Attachment();
                                        return att5;
                                }
                                set;
                        }
    //public transient attachment finalAtt {get;set;}
    public boolean ecEnterAttachment {get;set;}
    public string ecEmailTemplateSelected {get;set;}
    public List<SelectOption> templates {get;set;}
    public map<string,EmailTemplatesInfo> ecListOftemplates {get;set;}
    public List<EmailsContacts> contactsEmails {get;set;}
    public List<EmailsContacts> ccContactsEmails {get;set;}
    public List<EmailsContacts> tempSearchContactsEmails {get;set;}
    public Boolean proceedWithAttachments {get;set;}
    public List<String> errorMessages {get;set;}
    public Boolean showErrorMessage {get;set;}

    public Boolean ecRecipientError {get;set;} 
    public Boolean ecSubjectError {get;set;}
    public Boolean ecBodyError {get;set;}

    public CustomEmailComposer_Controller(){

        if(apexpages.currentpage().getparameters().get('templateId') !=  null ){
            ecEmailTemplateSelected = apexpages.currentpage().getparameters().get('templateId');
        }

        ecEnterAttachment = false;
        proceedWithAttachments = false;
        showErrorMessage = false;
        errorMessages = new List<String>();
        contactsEmails = new List<EmailsContacts>();
        ccContactsEmails = new List<EmailsContacts>();
        tempSearchContactsEmails =  new List<EmailsContacts>();
        ecListOftemplates = new map<string, EmailTemplatesInfo>();
        templates =  new List<SelectOption>();
        templates.add(new SelectOption('','--None--'));
        geTemplates();
        if(ecEmailTemplateSelected != null){
            SetEmailTemplateBody();
        }
    }

    public PageReference GetContact(){
        system.debug('testing');
        ecToAddress = 'New Number';
        system.debug('ecSubject --> ' + ecSubject);
        return null;
    }

    // Get Email Templates
    public List<SelectOption> geTemplates() {

        List<String> FolderIds = new List<String>();
        // Select folder first
        // TODO: Remember to change query before deploying it
        // SELECT Id FROM Folder WHERE Name = 'Project Console'
        for(folder tempFolder : [SELECT Id FROM Folder]){
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
        limit 150];  //WHERE   FolderId in :FolderIds
        system.debug(eTemplates);

        List<SelectOption> options = new List<SelectOption>();

        for(EmailTemplate tempEmailTemplates : eTemplates){
            templates.add(new SelectOption(tempEmailTemplates.Id, tempEmailTemplates.Name));

            EmailTemplatesInfo tempETInfo = new EmailTemplatesInfo();
            tempETInfo.subject = tempEmailTemplates.subject;
            tempETInfo.body = (tempEmailTemplates.HtmlValue != null ? tempEmailTemplates.HtmlValue : tempEmailTemplates.body);
            tempETInfo.Id = tempEmailTemplates.Id;

            ecListOftemplates.put(tempEmailTemplates.Id,tempETInfo);
        }
        return null;
    }


    public PageReference GetContacts(){
        String contName = ApexPages.currentPage().getParameters().get('contName');

        tempSearchContactsEmails = new List<EmailsContacts>();

        if(contName != null && contName != ''){
            contName = contName + '%';
            for(Contact tempCont : [SELECT  Id,  Name,  Email,  Account.Name  FROM Contact  WHERE Name like :contName AND email != '' ]){
                EmailsContacts tempEmCont = new EmailsContacts();
                tempEmCont.email =  tempCont.Email;
                tempEmCont.name = tempCont.Name;
                tempSearchContactsEmails.add(tempEmCont);
            }
        }
        return null;
    }

    public PageReference AccessAttachmentOrGoback(){

        // Validate form before access Attachment piece
        att = new Attachment();
        att2 = new Attachment();
        att3 = new Attachment();
        att4 = new Attachment();
        att5 = new Attachment();
        
        if(!ValidateForm()){
            showErrorMessage = true;
            return null;
        }else{
            showErrorMessage = false;
        }

        ecEnterAttachment = (ecEnterAttachment ? false:true);

        if(!ecEnterAttachment){
            att = new attachment();
        }


        string cEmailURL = (ecEnterAttachment ? '/apex/CustomEmailComposerAttachment' : '/apex/CustomEmailComposer' );
        Pagereference pRef = new Pagereference(cEmailURL);
        pRef.setRedirect(false);
        return pRef;
    }

    public PageReference SetEmailTemplateBody(){

        system.debug('ecEmailTemplateSelected --> ' + ecEmailTemplateSelected);
        system.debug('ecListOftemplates --> '+ ecListOftemplates);

        EmailTemplatesInfo ETI = new EmailTemplatesInfo();
        ETI = ecListOftemplates.get(ecEmailTemplateSelected);
        ecBody = ETI.body;
        ecSubject = ETI.subject;

        return null;
    }

    public Pagereference AddEmail(){
        
        String recipientType = ApexPages.currentPage().getParameters().get('recipientType');
        EmailsContacts tempEC = new EmailsContacts();
        tempEC.name = ecToAddress;
        tempEC.email = ecToAddress;
        //Add email to its respective list
        if(recipientType == 'to'){
            contactsEmails.add(tempEC);
         }else if(recipientType == 'cc'){
            ccContactsEmails.add(tempEC);
        }

        ecToAddress = '';
        return null;
    }

    public Pagereference AddContact(){
        EmailsContacts tempEC = new EmailsContacts();
        string name = ApexPages.currentPage().getParameters().get('contName');
        string email = ApexPages.currentPage().getParameters().get('contEmail');
        String recipientType = ApexPages.currentPage().getParameters().get('recipientType');
        tempEC.name = name;
        tempEC.email = email;

        if(recipientType == 'to'){
            contactsEmails.add(tempEC);
        }else if(recipientType == 'cc'){
            ccContactsEmails.add(tempEC);
        }
        ecToAddress = '';

        return null;
    }

    public Pagereference RemoveEmail(){
        string emailtToRemove = ApexPages.currentPage().getParameters().get('emailToRemove');
        string recipientType = ApexPages.currentPage().getParameters().get('recipientType');

        if(recipientType == 'to'){
            for(Integer i = 0; i <= contactsEmails.size(); i++ ){
                if(contactsEmails[i].email == emailtToRemove){
                    contactsEmails.remove(i);
                    break;
                }
            }
        }else if(recipientType == 'cc'){
            for(Integer i = 0; i <= ccContactsEmails.size(); i++ ){
                if(ccContactsEmails[i].email == emailtToRemove){
                    ccContactsEmails.remove(i);
                    break;
                }
            }
        }
        return null;
    }


    public PageReference SendEmail(){

        if(!ValidateForm()){
            showErrorMessage = true;
            return null;
        }else{
            showErrorMessage = false;
        }

        system.debug('Sending Email');
        List<Messaging.EmailFileAttachment> attachments = new List<Messaging.EmailFileAttachment>();

        if(att.name != '' && att.name != null){
            attachments.add(addAttchmentfile(att));
        }
        if(att2.name != '' && att2.name != null ){
            attachments.add(addAttchmentfile(att2));
        }
        if(att3.name  != '' && att3.name != null){
             attachments.add(addAttchmentfile(att3));
        }
        if(att4.name  != '' && att4.name != null){
            attachments.add(addAttchmentfile(att4));
        }
        if(att5.name  != '' && att5.name != null){
            attachments.add(addAttchmentfile(att5));
        }


        list<string> toAddresses = new list<string>();
        system.debug(contactsEmails);

        for(EmailsContacts ec : contactsEmails){
            toAddresses.add(ec.email);
        }

        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(toAddresses);

//        if(ccAddresses != null){
//            mail.setCcAddresses(ccAddresses);
//        }

        mail.setReplyTo('noreply@ultimatesoftware.com');
        mail.setSenderDisplayName('Ultimate Software');
        mail.setSubject(ecSubject);
        mail.setUseSignature(false);
        mail.setHtmlBody(ecBody);

        // Attach files if needed
        system.debug('Attachment is empty --> ' + attachments.isEmpty());
       if(!attachments.isEmpty()){
           system.debug('Attachment is values --> ' + attachments);
           mail.setFileAttachments(attachments);
       }

        // Send Out Email
        //Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });

        att = new Attachment();
        att2 = new Attachment();
        att3 = new Attachment();
        att4 = new Attachment();
        att5 = new Attachment();

        return null;
    }


    public Messaging.EmailFileAttachment addAttchmentfile(attachment tempAtt){
        Messaging.EmailFileAttachment efa = new Messaging.EmailFileAttachment();
        efa.setFileName(tempAtt.name);
        efa.setBody(tempAtt.body);
        return efa;
    }


    public class EmailTemplatesInfo{

        public string body {get;set;}
        public string subject {get;set;}
        public string id {get;set;}
    }

    public class EmailsContacts{
        public string name {get;set;}
        public string email {get;set;}
    }

    public Boolean ValidateForm(){

        ecRecipientError = false;
        ecSubjectError  = false;
        ecBodyError = false;

        boolean isValid = true;
        errorMessages = new List<String>();

        //Check Recipients
        if(contactsEmails.isEmpty()){
            errorMessages.add('You must enter at least one email address or  a contact.');
            ecRecipientError = true;
            isValid = false;
        }

        if(ecSubject == '' || ecSubject == null){
            errorMessages.add('You must enter a subject.');
            ecSubjectError = true; 
            isValid = false;
        }

        if(ecBody == '' || ecBody == null){
            errorMessages.add('You must enter a message or select a email template.');
            ecBodyError = true; 
            isValid = false;
        }

        return isValid;

    }


}