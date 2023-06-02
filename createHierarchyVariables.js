pm.collectionVariables.clear()

//create variable for Workspace ID
pm.collectionVariables.set(`TEAM ${pm.response.json().teams[0].name}`, pm.response.json().teams[0].id)

console.log(pm.collectionVariables.get(`Team ${pm.response.json().teams[0].name}`))

//create variables for each Space
pm.sendRequest({ url: `https://api.clickup.com/api/v2/team/${pm.response.json().teams[0].id}/space`, method: 'GET', header: { 'authorization': request.headers['authorization'] } }, function (err, response) {
    if (err != null) {
        console.log(err)
    } else {
        for (var i = 0; i < response.json().spaces.length; i++) {
            pm.collectionVariables.set(`SPACE: ${response.json().spaces[i].name}, id: ${response.json().spaces[i].id}`, response.json().spaces[i].id)
            console.log(`${response.json().spaces[i].name} Space, id: ${response.json().spaces[i].id}`)

            //create variables for each folderless List 
            pm.sendRequest({ url: `https://api.clickup.com/api/v2/space/${response.json().spaces[i].id}/list`, method: 'GET', header: { 'authorization': request.headers['authorization'] } }, function (err, response) {
                if (err != null) {
                    console.log(err)
                } else {
                    for (var i = 0; i < response.json().lists.length; i++) {
                        pm.collectionVariables.set(`LIST: ${response.json().lists[i].name}, id: ${response.json().lists[i].id}`, response.json().lists[i].id)
                        console.log(`${response.json().lists[i].name} List, id: ${response.json().lists[i].id}`)

                        //create variables for each task in a folderless List
                        pm.sendRequest({ url: `https://api.clickup.com/api/v2/list/${response.json().lists[i].id}/task`, method: 'GET', header: { 'authorization': request.headers['authorization'] } }, function (err, response) {
                            if (err != null) {
                                console.log(err)
                            } else {
                                for (var i = 0; i < response.json().tasks.length; i++) {
                                    pm.collectionVariables.set(`TASK: ${response.json().tasks[i].name}, id: ${response.json().tasks[i].id}`, response.json().tasks[i].id)
                                    console.log(`Task ${response.json().tasks[i].name}, id: ${response.json().tasks[i].id}`)

                                }

                            }
                        });

                    }

                }
            });

            //create variables for each Folder
            pm.sendRequest({ url: `https://api.clickup.com/api/v2/space/${response.json().spaces[i].id}/folder`, method: 'GET', header: { 'authorization': request.headers['authorization'] } }, function (err, response) {
                if (err != null) {
                    console.log(err)
                } else {
                    for (var i = 0; i < response.json().folders.length; i++) {
                        pm.collectionVariables.set(`FOLDER: ${response.json().folders[i].name}, id: ${response.json().folders[i].id} `, response.json().folders[i].id)
                        console.log(`${response.json().folders[i].name} Folder, id: ${response.json().folders[i].id} `)

                        //create variables for each List
                        pm.sendRequest({ url: `https://api.clickup.com/api/v2/folder/${response.json().folders[i].id}/list`, method: 'GET', header: { 'authorization': request.headers['authorization'] } }, function (err, response) {
                            if (err != null) {
                                console.log(err)
                            } else {
                                for (var i = 0; i < response.json().lists.length; i++) {
                                    pm.collectionVariables.set(`LIST: ${response.json().lists[i].name}, id: ${response.json().lists[i].id}`, response.json().lists[i].id)
                                    console.log(`${response.json().lists[i].name} List, id: ${response.json().lists[i].id}`)

                                    //create variables for each task in a folderfull(?) List
                                    pm.sendRequest({ url: `https://api.clickup.com/api/v2/list/${response.json().lists[i].id}/task`, method: 'GET', header: { 'authorization': request.headers['authorization'] } }, function (err, response) {
                                        if (err != null) {
                                            console.log(err)
                                        } else {
                                            for (var i = 0; i < response.json().tasks.length; i++) {
                                                pm.collectionVariables.set(`TASK: ${response.json().tasks[i].name}, id: ${response.json().tasks[i].id}`, response.json().tasks[i].id)
                                                console.log(`Task ${response.json().tasks[i].name}, id: ${response.json().tasks[i].id}`)

                                            }

                                        }
                                    });

                                }

                            }
                        });
                    }

                }
            });
        }

    }
});






