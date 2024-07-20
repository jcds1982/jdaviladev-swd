({
	answer : function(component, event, helper) {
        var text = event.getParam("text");
        var text2 = event.getParam("text2");
        var txt123 = event.getParam("txt123");
        alert(txt123);
        component.set("v.myText", txt123);
        //component.set("v.myText", text2);
    }
})