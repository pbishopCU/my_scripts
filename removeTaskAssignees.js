//https://click-up.slack.com/archives/C015N6P6S9J/p1685627787512709
//Question posed here was: "dont think this is possible, but is there a way to remove all assignees from a task at once using a special character or some other syntax, or is the only option to include every userID to be removed in the array."

//This can be done:

//under test script on GET TASK
//create a variable that stores an array of assignee id's

var assigneesArray = [];
for (var i = 0; i< pm.response.json().assignees.length; i++) {
    assigneesArray.push(pm.response.json().assignees[i].id)
}
pm.collectionVariables.set("assigneeArray", assigneesArray)

// then the UPDATE TASK PUT req body would look like this: {    “assignees”: {
//         “add”: [],
//         “rem”: [{{assigneeArray}}]
//     }
// }