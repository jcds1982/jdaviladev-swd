public class AccCont_Controller {

    @AuraEnabled
    public static List<Account> getAccounts1()
    {
        List<Account> acc = [SELECT 	Id,
                                        Name,
                                        Industry,
                                        BillingStreet,
                                        BillingCity,
                                        BillingState,
                                        BillingPostalCode
                                FROM 	Account
                                        Limit 10];
        for(Account a : acc){
            system.debug('This is the account ' + a.Name);
            system.debug('This is the account phone number' + a.Phone);
        }
        return acc;
    }
}