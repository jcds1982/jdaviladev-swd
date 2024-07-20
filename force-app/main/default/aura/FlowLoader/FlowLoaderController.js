({
	init : function(component, event, helper) {
        
       let x = [];
        x.push("Testing");
        console.log("X --> ", x);
        
        component.set("v.FValues", x);
        
        let flow = component.find("flowData");
            console.log('Searching Flow');
          // flow.startFlow("Hello_World");     
	},
    
    recordUpdate:function(cmp){
		let accName = cmp.get("v.opportunityRecord.Account.Active__c");
        console.log('accName ', accName);
        let flow = cmp.find('flowData');
        flow.startFlow("Hello_World");
        let x = ["test"];
        //cmp.set("v.FValues", x);
    }
})