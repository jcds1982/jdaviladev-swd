public with sharing class ContactLightning_Controller {



	public ContactLightning_Controller() {
		system.debug('Init');
	}

	@AuraEnabled
	public static list<Contact> GetListContacts(){
		//List<Contact> Contacts = new List<Contact>();
		return [SELECT Id, FirstName, LastName, Email, Phone FROM Contact Limit 10];
	}

	@AuraEnabled
	public static Contact GetContactDetail(String Id){
		//List<Contact> Contacts = new List<Contact>();
		return [SELECT Id, FirstName, LastName, Email, Phone FROM Contact WHERE id =: Id Limit 1];
	}




}