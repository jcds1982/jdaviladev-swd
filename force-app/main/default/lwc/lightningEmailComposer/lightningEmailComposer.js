/* eslint-disable no-console */
import { LightningElement, track, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import getEmailTemplates from '@salesforce/apex/lightningEmailComposer_Controller.getEmailTemplates';
import searchContacts from '@salesforce/apex/lightningEmailComposer_Controller.GetContacts';
import sendEmailFromApex from '@salesforce/apex/lightningEmailComposer_Controller.SendEmail';
import getUserValuesForMapping from '@salesforce/apex/lightningEmailComposer_Controller.GetUserFieldAndValues';


/** The delay used when debouncing event handlers before invoking Apex. */
const DELAY = 650;
export default class LightningEmailComposer extends LightningElement {

fileIndex = 0; //Files Attachments index
tempContEmail = '';
tempContEmailType = '';
userFieldsValues = [];
attachment;
content;
fileReader;
MAX_FILE_SIZE = 10000000;
@api isLoaded = false;
@api emailTemplateId;
@track showError = false;
@track errorMessages = [];
@track showContactList = false;
@track contactList = [];
@track showcc = false;
@track showbcc = false;
@track ecFrom;
@track ecTo;
@track ecToRecipients = [{ nameOrEmail: 'Julio', email: 'jcds1982@gmail.com' }]; //TODO: Remove value before deploying
@track ecCC;
@track ecCCRecipients = [];
@track ecBCC;
@track ecBCCRecipients = [];
@track showToRecipientsList = false;
@track showCCRecipientsList = false;
@track showBCCRecipientsList = false;
@track ecAttachment = [];
@track attachmentsToBeSent = []; // This is the final list of attachments to be sent.
@track showAttachments;
@api doNotAttachments = false;
@track ecSubject = 'test'; //TODO: Remove value before deploying
@track ecBody = 'test'; // TODO: Remove value before deploying
@track emailTemplates = [{ value: "", label: "--None--", body: "", subject: "" }];
@track emailTemplateSelected = '-- None --';
@track formats = ['font', 'size', 'bold', 'italic', 'underline', 'strike', 'list', 'indent', 'align', 'link',
    'image', 'clean', 'table', 'header', 'color', 'background','table'];

@track contacts = [];
@track showContactList = false;
@track searchContact;



@wire(searchContacts, { name: '$searchContact' }) contactsList({ data }) {
    if (data) {
      this.contacts = [];
      for (let key in data) {
        if (data[key] != null) {
          this.contacts.push({
            Id: data[key].Id,
            Name: data[key].Name,
            Email: data[key].Email
          });
        }
      }
      console.log('this.contacts.length ', this.contacts.length);
      if (this.contacts.length > 0) {
        this.showContactList = true;
      } else {
        this.showContactList = false;
      }
    }
  }

@wire(getEmailTemplates) ecEmailTemplates({ data, error }) {
    if (data) {
      let tempArray = [{ value: "", label: "--None--", body: "" }];
      console.log("Email Template -->" + this.emailTemplateId);

      for (let key in data) {
        if (data[key] != null) {
          let htmlBody = data[key].HtmlValue;
          if (htmlBody != null) {
            htmlBody = htmlBody.replace(/\<\!\[CDATA\[/g, "");
            htmlBody = htmlBody.replace(/\]\]\>/g, "");
            htmlBody = htmlBody.replace(/\<tr /g, "<p ");
            htmlBody = htmlBody.replace(/\<\\tr\> /g, "</p>");
            htmlBody = htmlBody.replace(/\<td /g, "<span ");
            htmlBody = htmlBody.replace(/\<\\td\> /g, "</span>");
          } else {
            htmlBody = data[key].body;
          }
          tempArray.push({ value: data[key].Id, label: data[key].Name, body: htmlBody, subject: data[key].Subject });

          let tempEmTempId = data[key].Id;
          tempEmTempId = tempEmTempId.slice(0, -3);

          if (tempEmTempId == this.emailTemplateId) {
            console.log("Email Template Found -->" + this.emailTemplateId);
            this.ecSubject = data[key].Subject;
            this.ecBody = htmlBody;
            this.template.querySelector('[data-Id=body]').disabled = false;
            this.template.querySelector('lightning-input-rich-text').focus();
            this.template.querySelector('lightning-input-rich-text').blur();
            this.emailTemplateId = 'Matched';
          }
        }


      }
      this.emailTemplates = tempArray;
    } else if (error) {
      console.log(error);
    }
  }

  renderedCallback() {

    if (this.emailTemplateId !== '' && this.emailTemplateId !== null && this.emailTemplateId !== undefined && this.emailTemplateId != 'Matched') {
      this.template.querySelector('[data-Id=subject]').disabled = true;
      this.template.querySelector('[data-Id=body]').disabled = true;
      this.template.querySelector('[data-Id=emailtemplate]').disabled = true;
      this.template.querySelector('[data-Id=templatespinner]').classList.toggle('hide');


    } else {
      this.template.querySelector('[data-Id=subject]').disabled = false;
      this.template.querySelector('[data-Id=body]').disabled = false;
      this.template.querySelector('[data-Id=emailtemplate]').disabled = false;
      this.template.querySelector('[data-Id=templatespinner]').classList.add('hide');

      // eslint-disable-next-line guard-for-in
      if (this.ecBody !== '' && this.ecBody !== null && this.ecBody !== undefined) {
        for (let key in this.userFieldsValues) {
          if (this.userFieldsValues[key].value !== null && this.userFieldsValues[key].value !== '' && this.userFieldsValues[key].value != undefined && this.ecBody !== undefined && this.ecBody !== null) {
            this.ecBody = this.ecBody.replace('{!User.' + this.userFieldsValues[key].field + '}', this.userFieldsValues[key].value);
          }
        }
      }
    }

  }

@wire(getUserValuesForMapping) ecUserValues({ data, error }) {
    if (data) {
      for (let key in data) {
        if (data[key] != null) {
          this.userFieldsValues.push({ field: key, value: data[key] });
        }
      }
    }
  }


  GetEmailTemplates() {
    console.log('ecEmailTemplates --> ', this.emailTemplates);
    for (let key in this.emailTemplates) {
      if (this.emailTemplates[key] != null)
        console.log(this.emailTemplates[key].Name);
    }
  }

  changeEmailTemplate(event) {
    let emailTemplateId = event.target.value;
    let emailBody = '';
    for (let key in this.emailTemplates) {
      if (this.emailTemplates[key].value == emailTemplateId) {
        this.ecBody = this.emailTemplates[key].body;
        emailBody = this.emailTemplates[key].body;
        this.ecSubject = this.emailTemplates[key].subject;
        this.template.querySelector('lightning-input-rich-text').focus();
        this.template.querySelector('lightning-input-rich-text').blur();
        break;
      }
    }
    // eslint-disable-next-line guard-for-in
    for (let key in this.userFieldsValues) {
      console.log('this.userFieldsValues[key].value ', this.userFieldsValues[key].value);
      if (this.userFieldsValues[key].value !== null && this.userFieldsValues[key].value !== '' && this.userFieldsValues[key].value != undefined && emailBody !== undefined && emailBody !== null) {
        emailBody = emailBody.replace('{!User.' + this.userFieldsValues[key].field + '}', this.userFieldsValues[key].value);
      }
    }
    if (emailBody !== '') {
      this.ecBody = emailBody;
    }
  }
  // getting file
  handleFilesChange(event) {
    if (event.target.files.length > 0) {
      for (let key in event.target.files) {
        this.showError = false;
        if (event.target.files[key].name != null && event.target.files[key].name != ''
            && event.target.files[key].name != 'item' && event.target.files[key].name != "") {

          // Validating MAX file size allowed
          if(event.target.files[key].size > this.MAX_FILE_SIZE){
            this.showError = true;
            this.errorMessages.push('One or more files exceed the maximum size allowed. Please check and try again');
            return false;
          }


          this.ecAttachment.push({ fileIndex: this.fileIndex, file: event.target.files[key] });
          this.fileIndex++;
        }
      }

      this.showAttachments = true;
      this.ReadFiles();
      console.log('ecAttachment -->', this.ecAttachment);
    }
  }

  FlipCard() {

    let flipperContainer = this.template.querySelector('[data-id=previewcard]');
    console.log('flipperContainer Id ', flipperContainer.Id);
    flipperContainer.scrollIntoView({ block: 'end' });

    let flipper = this.template.querySelector('[data-Id=maincard]');
    flipper.classList.toggle('Container__card_flipped');
  }

  handleFileRemove(event) {
    let indexToRemove = -1;
    let fileIndexToRemove = event.target.dataset.fileindex;

    console.log('fileIndexToRemove ', fileIndexToRemove);
    // for index to remove
    for (let key in this.ecAttachment) {
      if (this.ecAttachment[key].fileIndex == fileIndexToRemove) {
        indexToRemove = key;
        break;
      }
    }


    // Remove selected attachment
    if (indexToRemove != -1 && this.ecAttachment.length > 0) {
      console.log('Entered Remove File');
      this.ecAttachment.splice(indexToRemove, 1);
    }
    this.ReadFiles();

    // Clear attachment list
    if (this.ecAttachment.length === 0) {
      //this.showAttachments = !this.showAttachments;
      //this.ecAttachment.length = 0;
      this.ecAttachment = [];
      this.fileIndex = 0;
    }

  }

  ShowCcBccField(event) {
    let ccOrBcc = event.target.dataset.type;
    if (ccOrBcc == 'cc') {
      this.showcc = !this.showcc;
    } else if (ccOrBcc == 'bcc') {
      this.showbcc = !this.showbcc;
    }
  }

  enterEmailAddressFromContact(event) {

    let emailAddress = event.target.value;
    let result = emailAddress.search(/^[^*{}~$;:=!?,`#<>%\(\)\[\]\/\s@]+@[^*{}~$;:=!?,`#<>%\(\)\[\]\/\s@]+\.[^*{}~$;:=!?,`#<>%\(\)\[\]\/\s@]+$/);
    if (result === 0) {

      let showAddCC = this.template.querySelector("[data-id=addcc]");
      // let validEmail = this.template.querySelector("[data-id=validemailaddress]");

      showAddCC.classList.remove('hide');
      // validEmail.classList.remove('hide');


      if ('Enter' === event.key) {
        let emailAddress = event.target.value;
        let result = emailAddress.search(/^[^*{}~$;:=!?,`#<>%\(\)\[\]\/\s@]+@[^*{}~$;:=!?,`#<>%\(\)\[\]\/\s@]+\.[^*{}~$;:=!?,`#<>%\(\)\[\]\/\s@]+$/);
        if (result === 0) {

          if (!this.checkDuplicateEmails(this.ecToRecipients, emailAddress)) {
            this.ecToRecipients.push({ nameOrEmail: emailAddress, email: emailAddress });
            this.showToRecipientsList = true;
            this.searchContact = '';
            showAddCC.classList.add('hide');
            // validEmail.classList.add('hide');
          }

          console.log('Correct Email ' + emailAddress);
        } else {
          alert('Email Address not valid ' + emailAddress);
        }
      }
    } else {
      let showAddCC = this.template.querySelector("[data-id=addcc]");
      // let validEmail = this.template.querySelector("[data-id=validemailaddress]");

      showAddCC.classList.add('hide');
      // validEmail.classList.add('hide');
    }
  }

  AddEmailAddressAsCC(event) {
    let emailAddress = this.template.querySelector("[data-id=todd").value;
    let showAddCC = this.template.querySelector("[data-id=addcc]");
    // let validEmail = this.template.querySelector("[data-id=validemailaddress]");

    if (!this.checkDuplicateEmails(this.ecCCRecipients, emailAddress)) {
      this.ecCCRecipients.push({ nameOrEmail: emailAddress, email: emailAddress });
      this.showCCRecipientsList = true;
      this.searchContact = '';
      showAddCC.classList.add('hide');
      // validEmail.classList.add('hide');
    }
  }

  enteringEmailAddress(event) {

    let emailAddressType = event.target.dataset.reciepienttype;
    let emailAddress = this.template.querySelector('[data-reciepienttype=' + emailAddressType + ']');
    let emailAlreadyInList = false;

    if ('Enter' === event.key) {
      if (emailAddress.reportValidity() && emailAddress.value !== '') {
        switch (emailAddressType) {
            // To Recipient list
          case 'ecto':
            emailAlreadyInList = this.checkDuplicateEmails(this.ecToRecipients, event.target.value);
            if (emailAlreadyInList === false) {
              this.ecToRecipients.push({ nameOrEmail: event.target.value, email: event.target.value });
              this.showToRecipientsList = true;
              this.ecTo = '';
            }
            break;
            // CC Recipient list
          case 'eccc':
            emailAlreadyInList = this.checkDuplicateEmails(this.ecCCRecipients, event.target.value);
            if (emailAlreadyInList === false) {
              this.ecCCRecipients.push({ nameOrEmail: event.target.value, email: event.target.value });
              this.showCCRecipientsList = true;
              this.ecCC = '';
            }
            break;
            // BCC Recipient list
          case 'ecbcc':
            emailAlreadyInList = this.checkDuplicateEmails(this.ecBCCRecipients, event.target.value);
            if (emailAlreadyInList === false) {
              this.ecBCCRecipients.push({ nameOrEmail: event.target.value, email: event.target.value });
              this.showBCCRecipientsList = true;
              this.ecBCC = '';
            }
            break;
          default:
            console.log('Nothing happend while adding email to the list');
            break;
        }

        if (emailAlreadyInList) {
          const eventToastWarning = new ShowToastEvent({
            title: 'Email duplicated',
            message: 'The email address you tried to enter already exist in recipient list.',
            variant: 'warning',
          });
          this.dispatchEvent(eventToastWarning);
        }

        if (event.target.value !== '' && !emailAlreadyInList) {
          const eventToast = new ShowToastEvent({
            title: 'Email added',
            message: 'Email \'' + event.target.value + '\' has been added to the recipient list.  Check the recipients section.',
            variant: 'success',
          });
          this.dispatchEvent(eventToast);
        }
        event.target.value = '';
      }
    }

  }

  RemoveEmailFromList(event) {
    let email = event.target.dataset.emailindex;
    let emailType = event.target.dataset.reciepienttype;

    console.log('emailType ', emailType);

    switch (emailType) {
      case 'ecto':
        for (let key in this.ecToRecipients) {
          if (this.ecToRecipients[key].email === email) {
            this.ecToRecipients.splice(key, 1);
            // TO
            if (this.ecToRecipients.length === 0) {
              this.showToRecipientsList = false;
            }
          }
        }
        break;
      case 'eccc':
        for (let key in this.ecCCRecipients) {
          if (this.ecCCRecipients[key].email === email) {
            this.ecCCRecipients.splice(key, 1);
            // TO
            if (this.ecCCRecipients.length === 0) {
              this.showCCRecipientsList = false;
            }
          }
        }
        break;
      case 'ecbcc':
        for (let key in this.ecBCCRecipients) {
          if (this.ecBCCRecipients[key].email === email) {
            this.ecBCCRecipients.splice(key, 1);
            // TO
            if (this.ecBCCRecipients.length === 0) {
              this.showBCCRecipientsList = false;
            }
          }
        }
        break;
      default:
        console.log('Nothing happened');
        break;
    }
  }

  updateEmailBody(event) {
    this.ecBody = event.target.value;
  }

  SearchContact(event) {
    let contact = event.target.value;
  }

  handleKeyChange(event) {
    const searchKey = event.target.value;
    this.isLoaded = true;
    window.clearTimeout(this.delayTimeout);
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.delayTimeout = setTimeout(() => {
      this.searchContact = searchKey;
    this.isLoaded = false;
  }, DELAY);
  }

  selectContactEmail(event) {
    let email = event.target.dataset.contemail;
    let cotactName = event.target.dataset.contname;
    cotactName = cotactName + ' (' + email + ')';
    let tempContEmailType = event.target.dataset.emailtype;
    let emailDuplicated = false;
    switch (tempContEmailType) {
        // To Recipient list
      case 'ecto':
        emailDuplicated = this.checkDuplicateEmails(this.ecToRecipients, email);
        if (emailDuplicated === false) {
          this.ecToRecipients.push({ nameOrEmail: cotactName, email: email });
          this.showToRecipientsList = true;
          this.ecTo = '';
        }
        break;
        // CC Recipient list
      case 'eccc':
        emailDuplicated = this.checkDuplicateEmails(this.ecCCRecipients, email);
        if (emailDuplicated === false) {
          this.ecCCRecipients.push({ nameOrEmail: cotactName, email: email });
          this.showCCRecipientsList = true;
          this.ecCC = '';
        }
        break;
        // BCC Recipient list
      case 'ecbcc':
        emailDuplicated = this.checkDuplicateEmails(this.ecBCCRecipients, email);
        if (emailDuplicated === false) {
          this.ecBCCRecipients.push({ nameOrEmail: cotactName, email: email });
          this.showBCCRecipientsList = true;
          this.ecBCC = '';
        }
        break;
      default:
        console.log('Nothing happend while adding email to the list');
        break;
    }

    if (emailDuplicated) {
      const eventToastWarning = new ShowToastEvent({
        title: 'Contact duplicated',
        message: 'The contact you selected is already in the recipient list.',
        variant: 'warning',
      });
      this.dispatchEvent(eventToastWarning);
    }

    if (!emailDuplicated) {
      const eventToast = new ShowToastEvent({
        title: 'Email added',
        message: 'Contact \'' + event.target.dataset.contname + '\' has been added to the recipient list. Check the recipients section.',
        variant: 'success',
      });
      this.dispatchEvent(eventToast);
    }
    // Clear values after selection
    this.contacts = [];
    this.searchContact = '';
    this.showContactList = false;
  }


  SendEmail() {

    if (this.validateEmailInformation()) {

      this.CollapseAndSend();


      // Prepare data
      let tempECTo = [];
      let tempECCc = [];
      let tempECBcc = [];

      // To recipients
      // eslint-disable-next-line guard-for-in
      for (let key in this.ecToRecipients) {
        tempECTo.push(this.ecToRecipients[key].email);
      }

      // eslint-disable-next-line guard-for-in
      for (let key in this.ecCCRecipients) {
        tempECCc.push(this.ecCCRecipients[key].email);
      }

      // eslint-disable-next-line guard-for-in
      for (let key in this.ecBCCRecipients) {
        tempECBcc.push(this.ecBCCRecipients[key].email);
      }

      console.log('attachmentsToBeSent', this.attachmentsToBeSent);

      sendEmailFromApex({
        attachment: this.attachmentsToBeSent,
        toAddresses: tempECTo,
        bccAddresses: tempECBcc,
        ccAddresses: tempECCc,
        body: this.ecBody,
        subject: this.ecSubject
      }).then(result => {
        const event = new ShowToastEvent({
          title: 'Message',
          message: 'Your message has been sent.',
          variant: 'success',
        });
      this.dispatchEvent(event);
      this.clearValues();
    })
    .catch(error => {
        this.error = error;
      console.log('Error ', error);
    });
    } else {
      let errorBanner = this.template.querySelector('[data-id=maincard]');
      errorBanner.scrollIntoView({ block: 'end' });
    }
  }

  validateEmailInformation() {
    this.errorMessages.length = 0;
    this.showError = false;
    // Error_highlight
    if (this.ecToRecipients.length < 1) {
      this.showError = true;
      this.errorMessages.push('You must enter at least one email address or  a contact');
      this.template.querySelector('[data-id=todd]').classList.add('Error_highlight');
      // this.template.querySelector('[data-id=toenter]').classList.add('Error_highlight');

    } else {
      this.template.querySelector('[data-id=todd]').classList.remove('Error_highlight');
      // this.template.querySelector('[data-id=toenter]').classList.remove('Error_highlight');
    }
    if (this.ecSubject === '' || this.ecSubject === null || this.ecSubject === undefined) {
      console.log('Subject ', this.ecSubject);
      this.showError = true;
      this.errorMessages.push('You must enter a subject');
      this.template.querySelector('[data-id=subject]').classList.add('Error_highlight');
    } else {
      this.template.querySelector('[data-id=subject]').classList.remove('Error_highlight');
    }
    if (this.ecBody === '' || this.ecBody === null || this.ecBody === undefined) {
      this.showError = true;
      this.errorMessages.push('You must enter a message or select a email template');
      this.template.querySelector('[data-id=body]').classList.add('Error_highlight');
    } else {
      this.template.querySelector('[data-id=body]').classList.remove('Error_highlight');
    }


    if (this.showError === true) {
      return false;
    } else {
      return true;
    }
  }

  updateSubject(event) {
    this.ecSubject = event.target.value;
  }

  clearValues() {
    this.fileIndex = 0; //Files Attachments index
    this.tempContEmail = '';
    this.tempContEmailType = '';
    this.isLoaded = false;
    this.showError = false;
    this.errorMessages = [];
    this.showContactList = false;
    this.contactList = [];
    this.showcc = false;
    this.showbcc = false;
    this.ecTo = '';
    this.ecToRecipients = [];
    this.ecCC = '';
    this.ecCCRecipients = [];
    this.ecBCC = '';
    this.ecBCCRecipients = [];
    this.showToRecipientsList = false;
    this.showCCRecipientsList = false;
    this.showBCCRecipientsList = false;
    this.ecAttachment = [];
    this.showAttachments = false;
    this.ecSubject = '';
    this.ecBody = '';
    this.emailTemplateSelected = '-- None --';
    this.template.querySelector('[data-id=emailtemplate]').value = '';
    this.attachmentsToBeSent = [];
  }

  checkDuplicateEmails(recipientList, emailAddress) {
    for (let key in recipientList) {
      if (recipientList[key].email === emailAddress) {
        return true;
      }
    }
    return false;
  }

  CollapseAndSend() {

    this.template.querySelector('[data-id=containermaster]').classList.toggle('Container__master_Collapse');
    this.template.querySelector('[data-id=message]').classList.toggle('Container__master_Collapse_hide');
    this.template.querySelector('[data-id=message]').classList.toggle('Container__master_Collapse_show');
    // this.template.querySelector('[data-id=newemail]').classList.toggle('Container__master_Collapse_Email_show');
    // this.template.querySelector('[data-id=newemail]').classList.toggle('Container__master_Collapse_Email_hide');

  }

  SendFromPreview() {
    this.FlipCard();
    this.ReadFiles();
    this.SendEmail();
  }


   ReadFile(file, key){

    // Files Management
      let fileReader = new FileReader();
      // set onload function of FileReader object
      fileReader.onload = (()=>{
        let base64 = 'base64,';
        this.attachment = fileReader.result;
        // console.log('###### attachment --> ' + this.attachment);
        this.content = this.attachment.indexOf(base64) + base64.length;
        this.attachment = this.attachment.substring(this.content);
        this.attachmentsToBeSent.push(JSON.stringify({"index": key, "name": file.name, "fileBase64":  this.attachment }));
        // console.log('Enter ', key);
        console.log('this.attachmentsToBeSent  ', this.attachmentsToBeSent);
      });
      fileReader.readAsDataURL(file);

  }

  ReadFiles(){

    // Empty file array before insertion
    this.attachmentsToBeSent = [];


    // console.log('this.ecAttachment ====> ' + this.ecAttachment);
    for(let key=0; key < this.ecAttachment.length; key++){
      this.ReadFile(this.ecAttachment[key].file, key);
    }
  }


}