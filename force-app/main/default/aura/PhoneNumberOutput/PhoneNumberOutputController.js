({
		phoneOutPut : function(component, event, helper) {
        var phoneOut = event.getParam("phone");
        //alert(phoneOut);
        component.set("v.number", phoneOut);
    }
})