//get trash https://app.clickup.com/trash/v1/team/{team_id}/trash?${query}
//Query Parameters Availible:
// start_id: the id of the first item in the response is here, so if has_more is true then you can use the ID of the last item here to get more.
// start_type: (task, subtask,, subcategory, etc...)
// start_date_deleted: "1682005643110", //date in milliseconds and 6 days starting from this date back is the date range of the search from what I can see
// "type[]": [
//     "task",
//     "subtask",
//     "subcategory",
//     "category",
//     "project",
//     "doc",
//     "conversation",
//     "page",
//     "field",
//     "dashboard",
//     "projectTag",
//     "form",
//     "reminder",
//     "timeEntry",
// ],

//GET TRASH
javascript:(()=>{

    var team_id = "36226095";
    var cu_jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjo1NDA5ODc0MCwidmFsaWRhdGVkIjp0cnVlLCJzZXNzaW9uX3Rva2VuIjp0cnVlLCJ3c19rZXkiOjU1NDUxMDU1NjIsImlhdCI6MTY4ODgzOTM4MiwiZXhwIjoxNjg5MDEyMTgyfQ.2Cr2BQgxHjiEG27A5STt1pKjqk4iRnoGEx8oHvAUX_g";
    var query = JSON.stringify({"type[]":"task"})

    fetch(`https://prod-us-west-2-2.clickup.com/v1/team/${team_id}/trash?${query}`, {
              "headers": {
                "accept": "application/json, text/plain, */*",
                "authorization": `Bearer ${cu_jwt}`,
              },
              
              "method": "GET"
            })
              .then((response) => response.json())
              .then((json) => {  
                console.log(json)
              })
              .catch((error) => console.log(error))
  })()

//RESTORE TRASH (req JWT)
javascript:(()=>{

    var cu_jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjo1NDA5ODc0MCwidmFsaWRhdGVkIjp0cnVlLCJzZXNzaW9uX3Rva2VuIjp0cnVlLCJ3c19rZXkiOjU1NDUxMDU1NjIsImlhdCI6MTY4ODgzOTM4MiwiZXhwIjoxNjg5MDEyMTgyfQ.2Cr2BQgxHjiEG27A5STt1pKjqk4iRnoGEx8oHvAUX_g";
    
    fetch("https://prod-us-west-2-2.clickup.com/v1/itemUndo", {
              "headers": {
                "accept": "application/json, text/plain, */*",
                "authorization": `Bearer ${cu_jwt}`,
                "content-type": "application/json",
                "Referer": "https://app.clickup.com/36226095/settings/trash",
                "Referrer-Policy": "no-referrer-when-downgrade"
              },
              "body": JSON.stringify({
                method:"delete",
                itemIds:["8684zybuq"]
              }),
              "method": "PUT"
            })
              .then((response) => response.json())
              .then((json) => {  
                console.log(json)
              })
              .catch((error) => console.log(error))
  })()