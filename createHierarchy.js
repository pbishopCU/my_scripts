//specify the number of Folders per Space you would like
var numberOfFolders = 3;

//specify the number of Lists per Folder you would like
var numberOfLists = 5;

//specify the number of tasks per List
var numberOfTasks = 10;

//create a Space
pm.sendRequest({
  url: `https://api.clickup.com/api/v2/team/${pm.response.json().teams[0].id}/space`, method: 'POST', header: { 'authorization': request.headers['authorization'] }, body: {

    "name": "{{@randomLastName}}",
    "multiple_assignees": true,
    "features": {
      "due_dates": {
        "enabled": true,
        "start_date": false,
        "remap_due_dates": true,
        "remap_closed_due_date": false
      },
      "time_tracking": {
        "enabled": false
      },
      "tags": {
        "enabled": true
      },
      "time_estimates": {
        "enabled": true
      },
      "checklists": {
        "enabled": true
      },
      "custom_fields": {
        "enabled": true
      },
      "remap_dependencies": {
        "enabled": true
      },
      "dependency_warning": {
        "enabled": true
      },
      "portfolios": {
        "enabled": true
      }
    }

  }
}, function (err, spaceResponse) {
  if (err != null) {
    console.log(err)
  } else {
    
for (var i = 1; i <= numberOfFolders; i++) {
  //specify the random name type for each Folder
  var folderName = pm.variables.replaceIn("{{$randomFirstName}}");
  pm.sendRequest({
    url: `https://api.clickup.com/api/v2/space/${spaceResponse.json().id}/folder`, method: 'POST', header: { 'Content-type': 'application/json', 'authorization': request.headers['authorization'] }, body: {
      mode: 'application/json',
      raw: JSON.stringify({ "name": folderName })
    }
  }, function (err, folderResponse) {
    if (err != null) {
      console.log(err);
    } else {
      //make some Lists!
      for (var i = 1; i <= numberOfLists; i++) {
        //specify the random name type for each List
        var listName = pm.variables.replaceIn("{{$randomLocale}}");
        pm.sendRequest({
          url: `https://api.clickup.com/api/v2/folder/${folderResponse.json().id}/list`, method: 'POST', header: { 'Content-type': 'application/json', 'authorization': request.headers['authorization'] }, body: {
            mode: 'application/json',
            raw: JSON.stringify({ "name": listName })
          }
        }, function (err, listResponse) {
          if (err != null) {
            console.log("error found")
          } else {
            console.log(`list ${listResponse.json().name} created`)
            console.log("making tasks")
            for (var t = 1; t <= numberOfTasks; t++) {
              //specify the random name type for each Task
              var taskName = pm.variables.replaceIn("{{$randomBs}}");
              pm.sendRequest({
                url: `https://api.clickup.com/api/v2/list/${listResponse.json().id}/task`, method: 'POST', header: { 'Content-type': 'application/json', 'authorization': request.headers['authorization'] }, body: {
                  mode: 'application/json',
                  raw: JSON.stringify({ "name": taskName })
                }
              }, function (err, taskResponse) {
                if (err != null) {
                  console.log(err);
                } else {
                  console.log(`task ${taskResponse.json().name} created`)
                }
              }
              );
            }
          }
        }
        );
      }
    }
  }
  );
}
  }
})







