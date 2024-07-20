public with sharing class MyContactListController {
	public MyContactListController() 
	{
	System.debug('Test');
	}

	@AuraEnabled
	public static List<Contact> getContacts() {
		System.debug('test');
		List<Contact> cont	= [SELECT Id, Name, Email, Title, Phone From Contact];
		return cont;

		}
}