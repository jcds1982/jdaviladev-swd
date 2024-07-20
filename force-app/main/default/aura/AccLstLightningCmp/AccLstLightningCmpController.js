({
	getAccs : function(cmp, event, helper) {
    
    // (1) First set Action - This will get the values from the Apex controller
        var action = cmp.get("c.getAccounts");
        
        // (2) Set callback 
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.Accounts", response.getReturnValue());
            }
        });
        
        // (3) Queue the action
	 	$A.enqueueAction(action);
		
	}
})