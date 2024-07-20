({
	getAccountList: function(component) {
        
        // This is how we need to call methods in apex
        var action = component.get("c.getAccounts1"); 
        
		//Set up the callback
        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set("v.accounts", actionResult.getReturnValue());            
        });
        $A.enqueueAction(action);
	}
})