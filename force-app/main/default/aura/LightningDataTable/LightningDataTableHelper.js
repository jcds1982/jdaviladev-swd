({
    getDataHelper : function(component, event) {
        var action = component.get("c.getAccRecords");
        //Set the Object parameters and Field Set name
        action.setParams({
            strObjectName : 'Account',
            strFieldSetName : 'DataTableFieldSet'
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set("v.mycolumns", response.getReturnValue().lstDataTableColumns);
                component.set("v.mydata", response.getReturnValue().lstDataTableData);
                component.set("v.filteredData", response.getReturnValue().lstDataTableData); 
                
            }else if (state === 'ERROR'){
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }else{
                console.log('Something went wrong, Please check with your admin');
            }
            
        });
        $A.enqueueAction(action);	
    },
     sortData: function (cmp, fieldName, sortDirection) {
        //var data = cmp.get("v.mydata"); filteredData
        var data = cmp.get("v.filteredData");
        var reverse = sortDirection !== 'asc';

        data = Object.assign([],
            data.sort(this.sortBy(fieldName, reverse ? -1 : 1))
        );
        //cmp.set("v.mydata", data); 
        cmp.set("v.filteredData", data);
    },
    sortBy: function (field, reverse, primer) {
        var key = primer
            ? function(x) { return primer(x[field]) }
            : function(x) { return x[field] };

        return function (a, b) {
            var A = key(a);
            var B = key(b);
            return reverse * ((A > B) - (B > A));
        };
    },
})