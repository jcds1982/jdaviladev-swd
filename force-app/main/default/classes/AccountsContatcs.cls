/**
Julio Davila 05.19.2016
Account and Contacts
//

Julio Davila - 05.19.2016
	- [x] Move Aggregate Query to main Controller and loop through it to add the account and 
	      a list of contacts.
	- [x] Create a collection of the wrapper class and loop through it after adding the values.

Julio Davila - 05.24.2016
	- [x] Add a wrapper class to another wrapper class. 
*/

public with sharing class AccountsContatcs {


	public Account 				rd_Account 	{get;set;}
	public Id 					accId 		{get;set;}
	public List<AcctConts> 		lstOfAccNConts 	{get;set;}
	//public Id 					accId = '001610000055mKTAAY';


	// Constructor
	public AccountsContatcs() {

		lstOfAccNConts = getAccNConts();

		/*** Check what object lstOfAccNConts has ***/
		system.debug('lstOfAccNConts -->' + lstOfAccNConts);
		for(AcctConts a: lstOfAccNConts) 
		{
			for(wpOpp o: a.wpOpps)
			{
				system.debug('Opportunity --> ' + o);
			}
		}
	}

	public List<AcctConts> getAccNConts()
	{
		list<AcctConts> lst_getAccNCont = new list<AcctConts>();
		for(Account a : [ 	SELECT 	Id, 
									Name, 
									(SELECT Id, 
											FirstName, 
											LastName, 
											Phone, 
											Email,
											account.Phone 
									FROM 	Contacts),
									(SELECT Id,
											Name,
											Account.Name
									FROM 	Opportunities) 
							FROM 	Account LIMIT 4 ])
		{
			AcctConts ancs = new AcctConts(a, a.Contacts, a.Opportunities);
			lst_getAccNCont.add(ancs);
		}
		return lst_getAccNCont;
	}


	/*** Julio Davila 05.24.2016
	This is a test for wrapper classes. In this example I instatiated a wrapper class 
	inside another wrapper class. ***/
	public class AcctConts
	{
		public Account 				acc 	{get;set;}
		public List<contact> 		conts 	{get;set;}
		public List<wpOpp>			wpOpps 	{get;set;} 	// Wrapper Calss Inside a Wrapper Class
		
		public AcctConts(Account  rd_acc, List<Contact> lst_Cont, List<Opportunity> lst_Opp)
		{
			acc 	= rd_acc;
			conts 	= lst_Cont;

			wpOpps = new List<wpOpp>();
			for(Opportunity o : lst_Opp)
			{
				wpOpp wpO = new wpOpp(o, o.Account.Name);
				wpOpps.add(wpO);
			}
		}
	}


	/*** Julio Davila 05.24.2016
	Opportunity Wrapper Class ***/
	public class wpOpp 
	{
		public Opportunity 		opp 	{get;set;}
		String 					field1 	{get;set;}
		public list<String> 	lstStr 	{get;set;}

		public wpOpp(Opportunity a, string b)
		{
			opp = a;
			field1  = b;
			lstStr.add('1');
		}
	}

	
}