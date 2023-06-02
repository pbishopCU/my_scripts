//specify the number of Folders per Space you would like
var numberOfFolders = 3;

//specify the number of Lists per Folder you would like
var numberOfLists = 5;

//specify the number of tasks per List
var numberOfTasks = 10;

for (var i = 1; i <= numberOfFolders; i++) {
  //specify the random name type
  var folderName = pm.variables.replaceIn("{{$randomFirstName}}");
  pm.sendRequest({
    url: `https://api.clickup.com/api/v2/space/${pm.response.json().id}/folder`, method: 'POST', header: { 'Content-type': 'application/json', 'authorization': request.headers['authorization'] }, body: {
      mode: 'application/json',
      raw: JSON.stringify({ "name": folderName })
    }
  }, function (err, folderResponse) {
    if (err != null) {
      console.log(err);
    } else {
      //make some Lists!
      for (var i = 1; i <= numberOfLists; i++) {
        //specify the random name type
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
              //specify the random name type
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