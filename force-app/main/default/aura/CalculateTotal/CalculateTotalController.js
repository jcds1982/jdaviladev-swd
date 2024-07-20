({
	calculate : function(component, event, helper) {
        
        var inpOne = parseInt(component.find("inputOne").get("v.value"));
        var inpTwo = parseInt(component.find("inputTwo").get("v.value"));
        var inpThree = parseInt(component.find("inputThree").get("v.value"));
        var totalCal = (inpOne + inpTwo) - inpThree;
        
        console.log(inpOne);
        console.log(inpTwo);
        console.log(inpThree);
        console.log(totalCal);
        
        var myOutput = component.find("totalValue");
        myOutput.set("v.value", totalCal);	
		
	}
})