public class ContactsToExcelController {
    
    // VF List of Contacts
    public List<Contact> lst_cont	{get;set;}
    
    public ContactsToExcelController(){
    	//Get List of contacts    
        List<contact> lst_ContactsQueried = [select id, name, firstname, lastName from contact limit 10];
       
        // Instantiate List of contacts that will be displayed on VF
        lst_cont = new list<Contact>();
       
        // Loop through Contacts queried
        for(Contact c : lst_ContactsQueried){
            
            // Temporary Contact 
            // Use this to manipulate that from the list of contacs
            Contact tc  = new contact();
            
            // **** IMPORTANT ***** //
            // If you don't need to manipulate data then you can add the contact directly to your list
            // lst_cont.add(c);
            // **** END - IMPORTANT ***** //
             
     
            // Assign mappign fields between objects
            // This is part of an example disregard
            // Example
            string fName = c.FirstName.replace(',','‚'); // Replace comma with a special comma character
            tc.Id = c.Id;
            tc.LastName = c.LastName;
            tc.FirstName = fName;
            // End - Example
               
            // Add manipulated object to the contact list
            lst_cont.add(tc);
                
        }
    }
}