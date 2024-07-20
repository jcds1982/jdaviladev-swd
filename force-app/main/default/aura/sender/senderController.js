({
	send : function(component, event, helper) {
        //var text = event.source.get("v.label");
        var text = event.source.get("v.buttonTitle"); 
        var text2 = component.get("v.plainText");
        var inputT = component.find("txtIn").get("v.value");
        alert(inputT);
        //text = 'This is a test';
        $A.get("e.c:message").setParams({
            txt123: inputT, 
            text2: text2, 
            text: 'test'
       }).fire();
    }
})