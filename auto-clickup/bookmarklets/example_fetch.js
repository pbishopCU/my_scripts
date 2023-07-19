javascript:(()=>{

    var listId = "900901227409";
    var api_token = "pk_54098740_0IDUAK7E43J1H4CPE3QUPF3UJ0MPB2FU";
    var query = new URLSearchParams({
        archived: "",
        page: "",
        order_by: "",
        reverse: "",
        subtasks: "",
        statuses: [],
        include_closed: "",
        assignees: [],
        tags: [],
        custom_fields: JSON.stringify([])
      }).toString();

    fetch(`https://api.clickup.com/api/v2/list/${listId}/task?${query}`, {
              "headers": {
                "accept": "application/json, text/plain, */*",
                "authorization": api_token,
              },
              
              "method": "GET"
            })
              .then((response) => response.json())
              .then((json) => {  
                alert(JSON.stringify(json))
              })
              .catch((error) => alert(JSON.stringify(error)))
  })()