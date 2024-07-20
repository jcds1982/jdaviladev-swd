// Axxis Solutions 2017.12.13
// Test Class for OpportunityOwnerChange trigger 
@isTest
public class OpportunityOwnerChange_Test {
    
    @testSetup 
    static void CreateTestData() {
        
        // Create Account
        Account a = new Account(Name='Test Account');
        insert a;
        
        // Create Contact
        Contact c = new Contact(LastName = 'Test Last Name', FirstName = 'Test First Name', accountId = a.Id);
        insert c;
        
        // Create Opportunity
        Opportunity o = new Opportunity(Name = 'Test Opportunity', accountId = a.Id, StageName = 'Closed', CloseDate = date.today());
        insert o;
        
        // Create User (New Owner)
        User u = new User( ProfileId = [SELECT Id FROM Profile WHERE Name = 'System Administrator'].Id,
                         LastName = 'last',
                         Email = 'testIdeaFinancial@testIF.com',
                         Username = 'testIdeaFinancial@testIF.com',
                         CompanyName = 'TEST',
                         Title = 'title',
                         Alias = 'alias',
                         TimeZoneSidKey = 'America/Los_Angeles',
                         EmailEncodingKey = 'UTF-8',
                         LanguageLocaleKey = 'en_US',
                         LocaleSidKey = 'en_US');
        
    }
    
    // Test OpportunityOwnerChange trigger
    static testMethod void Test_OpptOwnerChange(){
        
        //Get Opportunity to test
        Opportunity o = [SELECT Id FROM Opportunity limit 1];
        
        // Get new Owner
        user newOwner = [SELECT Id FROM User limit 1];
        
        // Change Owners
        o.OwnerId = newOwner.Id; 
        
        // Change Opportunity Owner
        update o; 
       
    }
    
    
}