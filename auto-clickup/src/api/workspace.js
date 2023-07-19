import { Button, Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react';

export default function APITesting() {

  const style = {
    row: {
      width: "100%",
      justifyContent: "space-between",
      display: "flex",
      flexDirection: "row"
    }
  }

  const [resp, setResp] = useState("");

    async function GetTasks() {

      const query = new URLSearchParams({
        // archived: 'false',
        // page: '0',
        // order_by: 'string', //{"err": "Internal server error","ECODE": "ITEMV2_003"} -> Options include: id, created, updated, and due_date.
        // reverse: 'true', //{"err": "Internal server error","ECODE": "ITEMV2_003"}
        // subtasks: 'true', //{"err": "Internal server error","ECODE": "ITEMV2_003"}
        // statuses: 'string', //"err": "Statuses must be an array", "ECODE": "OAUTH_040"
        // include_closed: 'true',
        // assignees: 'string', //{"err": "Assignees must be an array","ECODE": "OAUTH_043"}
        // tags: 'string', //{"err": "Internal server error","ECODE": "ITEMV2_003"}
        // due_date_gt: '0',
        // due_date_lt: '0',
        // date_created_gt: '0', 
        // date_created_lt: '0',
        // date_updated_gt: '0',
        // date_updated_lt: '0', 
        // date_done_gt: '0', 
        // date_done_lt: '0',
        // custom_fields: 'string' //{"err": "custom fields must be a json parsable string","ECODE": "ITEM_155"}
      }).toString();

      const teamId = '36226095';
      const spaceId = '90090113569';
      const folderId = '90110146716';
      const listId = '901100336858';
      const taskId = "86853cbng";
    
      await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/task?${query}`,
        {
          method: 'GET',
          headers: {
            Authorization: process.env.REACT_APP_CLICKUP_API_KEY
          }
        }
      )
          .then((response) => response.json())
          .then((json) => {
            
            setResp(json);
          })
          .catch((error) => setResp(error));
      }

      return (
<Container>
  <Row style={style.row}>
    <Col> <Button
        onClick={() => {
          GetTasks();
        }} 
      >
        FETCH
      </Button></Col>
    <Col></Col>
    <Col><Button
        onClick={() => {
          setResp("");
        }} 
      >
        CLEAR
      </Button></Col>
  </Row>
  <Row style={style.row}>
    <Col xs={1}></Col>
    <Col xs={10}>
    {resp ? (
        <pre>{JSON.stringify(resp, null, 2)}</pre>
      ) : (
        "Loading..."
      )}
    </Col>
    <Col xs={1}></Col>
  </Row>
     
      
      
    </Container>
      )
        
}

