public class Service {
    
    public class applicationException extends Exception {}
    
    public boolean checkAccess(){
        
        String[] caseProd = new String[]{'Test__c'};
		Schema.describeSObjectResult[] cp = Schema.describeSObjects(caseProd);
        
        
        if(cp[0].isAccessible()){
            throw new applicationException('Testing Exceptions');
        }
        
                
        system.debug(cp[0].isAccessible()); 
        
        
        return cp[0].isAccessible();
        
    }

}