//public with sharing class AccountController {
//	@AuraEnabled
//	public static List<Account> getAccounts() {
//		List<Account> lst_Acc = [SELECT 	Id,
//											Name,
//											CreatedDate
//								FROM 		Account];
//
//		system.debug('Test');
//		return lst_Acc;
//	}
//
//	@AuraEnabled
//	public static Account getAccount(Id accId)
//	{
//		Account a = [SELECT 	Id,
//								Name,
//								CreatedDate
//					FROM 		Account
//					WHERE 		Id =:accId];
//
//		return a;
//	}
//
//	public static void updateAcc(Id accId)
//	{
//		Account a = new Account();
//		a.name = 'Account Updated';
//		a.Id = accId;
//
//		update a;
//
//	}
//
//	public static Opportunity CreateOpportunit()
//	{
//		return null;
//	}
//}

public with sharing class AccountController {
	public static List<Account> getAllActiveAccounts() {
		return [SELECT Id,Name,Active__c FROM Account WHERE Active__c = 'Yes'];
	}
}