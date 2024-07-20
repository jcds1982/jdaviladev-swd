// Axxis Solutions 2017.12.13
// This trigger updates the Account and Contact(s) owner whenever the Opportunity owner is changed. 

trigger OpportunityOwnerChange on Opportunity (after update) {
    /*
    // Get new Owner Id and Account Id
    id newOwner = trigger.new[0].ownerId;
    id oldOwner = trigger.old[0].ownerId;
    id accountId = trigger.new[0].accountId;
    
    if(newOwner != oldOwner ){
        
        // Account to update
        Account acc = new Account();
        
        acc.Id = accountId;
        acc.OwnerId = newOwner;
        // END - Account to update
        
        // Search Account's contacts 
        List<Contact> contacts = new List<Contact>();
        
        for(contact c : [SELECT id FROM Contact WHERE accountId =: accountId])
        {
            Contact tempContact = new Contact();
            tempContact.Id = c.Id;
            tempContact.OwnerId = newOwner;
            
            contacts.add(tempContact);
        }
        // END - Search Account's contacts 
        
        // Update Records
        update acc;
        if(contacts.isEmpty() != true )
            update contacts;
        // END - Update Records
      
    } */
    
    
    opportunity o = trigger.new[0];
    system.debug('o.owner.email -->' + o.owner.email);  
    
    
    
    
    
    
}