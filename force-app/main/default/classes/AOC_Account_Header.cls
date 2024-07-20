/**
 * Created by julioda on 3/20/18.
 */

public with sharing class AOC_Account_Header {


    @AuraEnabled
    public static List<string> GetAccounts(string nameP){

        //string name = '%' + nameP + '%';
        string name = nameP + '%';
        system.debug('Name --> ' + name);

        List<String> AccountString = new List<String>();

        for(Account a : [SELECT Id, Name FROM Account WHERE name like :name order by name ])
            AccountString.add(a.Name);

        return AccountString;

    }


}