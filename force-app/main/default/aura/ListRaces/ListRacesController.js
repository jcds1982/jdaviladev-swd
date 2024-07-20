({
	doInit : function(component, event, helper) {
		helper.getRaces(component);
	},
    
    handleAddtoRaces : function(component, event, helper) {
        helper.addToRaces(component, event);
    }
})