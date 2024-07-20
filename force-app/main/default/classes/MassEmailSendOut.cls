public with sharing class MassEmailSendOut {
	public MassEmailSendOut() {
		
	}



	public void sendEmail(){

		list<Messaging.MassEmailMessage> emails = new list<Messaging.MassEmailMessage>();

		Messaging.SingleEmailMessage newEmail = new Messaging.SingleEmailMessage();


		//EmailMessage newEmail = new EmailMessage();
		list<string> emailAddresses = new list<string>();
		emailAddresses.add('jcds1982@gmail.com');
		

		newEmail.setToAddresses(emailAddresses);
		newEmail.setsubject('test email from salesforce SWD');


	}
}