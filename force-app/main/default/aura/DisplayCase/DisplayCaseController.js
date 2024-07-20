({
	 getCase: function(cmp){
        
        // (1) First set Action - This will get the values from the Apex controller
        var action = cmp.get("c.getCaseFromId");
        
        // (2) Set callback 
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.record", response.getReturnValue());
            }
        });
        
        // (3) Queue the action
	 	$A.enqueueAction(action);
    }
})