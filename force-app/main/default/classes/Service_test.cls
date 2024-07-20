@isTest
public class Service_test {
    
    @isTest
    static void test1(){
        
        User u = [SELECT ID FROM USER WHERE FIRSTNAME = 'DEEPAK'];
        
        Service s = new Service();
        
        system.runAs(u){
            
            boolean t = s.checkAccess();
            system.debug('As Standard User --> ' + t);
            
        }   
    }
    @isTest
    static void test2(){
        Service s = new Service();
        boolean t = s.checkAccess();
        system.debug('As Admin User --> ' + t);
            
     }

}