({
	doInit : function(component, event, helper) {
        
        helper.getDataHelper(component, event);
		
	},
    updateColumnSorting: function (cmp, event, helper) {
        //cmp.set('v.isLoading', true);
        // We use the setTimeout method here to simulate the async
        // process of the sorting data, so that user will see the
        // spinner loading when the data is being sorted.
        //setTimeout(function() {
            var fieldName = event.getParam('fieldName');
            var sortDirection = event.getParam('sortDirection');
            cmp.set("v.sortedBy", fieldName);
            cmp.set("v.sortedDirection", sortDirection);
            helper.sortData(cmp, fieldName, sortDirection);
           // cmp.set('v.isLoading', false);
       // }, 0);
    },
    filter: function(component, event, helper) {
        
        var data = component.get("v.mydata"),
            term = component.get("v.filter"),
            results = data, regex;
        
        var cols = component.get("v.mycolumns");
        var columnsToSearch = [];
        
        /*console.log('columns names ' + cols.length);
        for(var i = 0; i < cols.length; i++){
            console.log('Columns -->' +  cols[i].fieldName);
            columnsToSearch.push(cols[i].fieldName);
        }*/
        try {
            regex = new RegExp(term, "i");
            // filter checks each row, constructs new array where function returns true
            //console.log('regex.test(row=>row.Description) --> ' + data.filter(row=>regex.test(row.Description)));
            results = data.filter(row=>regex.test(row.Name) || regex.test(row.Description));
            //results = data.filter(row=>regex.test(row["Name"]));
            //results.length = 0;
            
            //for(var i=0; i < columnsToSearch.length; i++){
            //    console.log(columnsToSearch[i]);
            //    console.log(data.filter(row=>regex.test(row[columnsToSearch[i]])).length);
            //    if(data.filter(row=>regex.test(row[columnsToSearch[i]])).length > 0)
            //    	results.push(data.filter(row=>regex.test(row[columnsToSearch[i]])));
            //}
        } catch(e) {
            // invalid regex, use full list
        }
        component.set("v.filteredData", results);
        //var o = JSON.stringify(results[0]); 
        //console.log('results --> ' + o );
    },
    
    /*search: function(array, text) {
                text = text.toLowerCase();
                return array.filter(function (o) {
                    return ['name', 'Age', 'Sex'].some(function (k) {
                        return o[k].toString().toLowerCase().indexOf(text) !== -1;
                    });
                });
            }*/
    
})