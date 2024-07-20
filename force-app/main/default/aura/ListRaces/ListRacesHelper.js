({
	getRaces : function(component) {
        //1
        var action = component.get('c.getRacesDB');
        //2
        action.setCallback(this, function(response){
            var state = response.getState();
         	if(component.isValid() && state == "SUCCESS") {
               component.set("v.races",response.getReturnValue());
            }
        });
        //4
        $A.enqueueAction(action);
    },
    
    addToRaces: function(component, event){
        
        var race = event.getParam('race');
        var races = component.get("v.races");
        
        races.push(race);
        component.set("v.races", races);
    }
})