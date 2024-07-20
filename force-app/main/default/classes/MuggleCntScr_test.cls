@isTest
public class MuggleCntScr_test {

    @testSetup
    static public void CreateDTestData()
    {
        Account acc = new Account(name='Test_Acc_Muggle');
        insert acc;
        
        list<Contact> contacts  = new list<Contact>();
        
        Contact cont = new Contact(FirstName='Muggle', 
                               LastName='Test',
                               Email='test@test.com',
                               AccountId = acc.Id);
        
        Contact cont2 = new Contact(FirstName='Muggle2', 
                               LastName='Test',
                               Email='test@test.com',
                               AccountId = acc.Id);
        
        Contact cont3 = new Contact(FirstName='Donald', 
                               LastName='Test',
                               Email='test@test.com',
                               AccountId = acc.Id);
        
        contacts.add(cont);
        contacts.add(cont2);
        contacts.add(cont3);
        
        insert contacts;
    }
    
    
    // Test Muggle Count   
    @isTest
    static void testCount()
    {
        
        test.startTest();
        Account testAcc = [SELECT id, Muggle_Count__c
                           FROM Account 
                           WHERE Name = 'Test_Acc_Muggle'];
        
        List<contact> lst_contact = [SELECT firstName FROM contact where firstName like 'M%'];
        
        system.assertEquals(testAcc.Muggle_Count__c, lst_contact.size());
        test.stopTest();
        
    }
    
    // Test Muggle Score
    @isTest
    static void testScore()
    {
        
        test.startTest();
        CheckScore();
        test.stopTest();
        
    }
    
    static void CheckScore()
    {
        decimal scoreCount  = 0;
        Account testAcc = [SELECT id, Muggle_Score__c 
                           FROM Account 
                           WHERE Name = 'Test_Acc_Muggle'];
        
        for(Contact c :  [	SELECT firstName 
                            FROM contact
                            WHERE AccountId =: testAcc.Id ])
        {
            if(c.firstName.contains('Donald') || c.firstName.contains('Trump'))
            	scoreCount -= c.firstName.length();
            else
                scoreCount += c.firstName.length();
        }
        
        system.assertEquals(scoreCount, testAcc.Muggle_Score__c, 'Score doesnt match the muggle score');
    }
    
    
    
}