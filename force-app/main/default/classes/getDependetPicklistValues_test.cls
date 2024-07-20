@isTest
public class getDependetPicklistValues_test {
    
    static testMethod void testBooleanController()
    {
        Test.startTest();
        Map<Object,List<String>> result = getDependentPicklistValues.getDependentPicklistValues( Account.SLA2__c );
        Test.stopTest();
        system.debug('result --> ' +  result);
        List<String> resultList = result.get( 'Bronze' );
        system.debug('resultList -->' + resultList);
        //System.assert( resultList != null );
        System.assert( resultList.size() > 1 );
        System.assert( resultList[0] == '1' );
    }
 
    /*
    static testMethod void testPicklistController()
    {
        Test.startTest();
        Map<Object,List<String>> result =
            getDependentPicklistValues.getDependentPicklistValues( Opportunity.StageName );
        Test.stopTest();
        List<String> resultList = result.get( 'When False' );
        System.assert( resultList != null );
        System.assert( resultList.size() == 1 );
        System.assert( resultList[0] == 'Ugly' );
        resultList = result.get( 'When True' );
        System.assert( resultList != null );
        System.assert( resultList.size() == 2 );
        System.assert( resultList[0] == 'Good' );
        System.assert( resultList[1] == 'Bad' );
        resultList = result.get( 'Unused' );
        System.assert( resultList == null );
    }
*/

}