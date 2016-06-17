import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Table } from 'react-bootstrap';

class Users extends React.Component {

  render() {
    return (
      <ContentWrapper>
        <h3>
          Users
          <small>All current users, their status and roles</small>
        </h3>
        <Grid fluid>
          <Row>
            <Col sm={ 12 }>
	      <div className="panel panel-default">
	        <div className="panel-heading">User List</div>
		<div className="panel-body">
		  <Table responsive bordered hover>
		    <thead>
		      <tr>
			<th>UID</th>
			<th>Picture</th>
			<th>Name</th>
			<th>Roles</th>
                      </tr>
		    </thead>
		  </Table>
		</div>
		<div className="panel-footer">3 users</div>
	      </div>
            </Col>
          </Row>
        </Grid>
      </ContentWrapper>
    );
  }
}

export default Users;
