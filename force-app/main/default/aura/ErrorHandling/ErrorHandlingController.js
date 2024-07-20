// Componente - Controller 
({
	validateForm : function(component) {
        
        
        // Validate Lightning:input fields
        var alllghInputValid = component.find("inputCmp").reduce(function (validSoFar, inputCmp) {
            
			// Returns whehther the component is in a valid state. 
            console.log(inputCmp.checkValidity());
            
			// Show error messages previously define on the lighting:input field component.
            inputCmp.reportValidity();

            return validSoFar && inputCmp.checkValidity();
        }, true);
        
        // Validate Select Options
        var allSelectValid = component.find("selectComponents").reduce(function (validSoFar, selectCmp){
            // Show Error message if validStatus is false
            selectCmp.showHelpMessageIfInvalid();
            // Show in console if the component is in valid state./ 
            console.log(selectCmp.get('v.validity ').valid); 
            return validSoFar && selectCmp.get('v.validity ').valid;
        }, true);
        
        
        
        console.log('allSelectValid --> '+ allSelectValid);
            
        
        if(alllghInputValid && allSelectValid)
            alert('Continue');
     
    }
})