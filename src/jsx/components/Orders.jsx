import React from 'react';
import ContentWrapper from './Layout/ContentWrapper';
import { Table } from 'react-bootstrap';

class Orders extends React.Component {

  render() {
    return (
      <ContentWrapper>
        <h3>
          Orders
          <small>All the orders</small>
        </h3>

	<Table id="orders-datatable" response stripped hover className="b0">
	  <thead>
	    <tr>
	      <th><strong>Order Id</strong></th>
	      <th><strong>User</strong></th>
	      <th><strong>Booked At</strong></th>
	      <th><strong>Delivered At</strong></th>
	      <th><strong>Food</strong></th>
	    </tr>
	  </thead>
	  <tbody>
	    <tr>
	      <td className="orders-data-cell">0001</td>
	      <td className="orders-data-cell">
                <div className="media-box">
		  <div className="pull-left">
                    <img src="img/user.png" className="img-responsive media-box-object img-circle thumb32" />
		  </div>
                  <div className="media-box-body clearfix">
		    <strong className="media-box-heading text-primary">
  		      Horia
		    </strong>
		  </div>
                </div>
	      </td>
	      <td className="orders-data-cell">Five minutes ago</td>
	      <td className="orders-data-cell">ASAP</td>
	      <td className="orders-data-cell">Some food</td>
	    </tr>

	    <tr>
	      <td className="orders-data-cell">0002</td>
	      <td className="orders-data-cell">
                <div className="media-box">
		  <div className="pull-left">
                    <img src="img/user1.jpg" className="img-responsive media-box-object img-circle thumb32" />
		  </div>
                  <div className="media-box-body clearfix">
		    <strong className="media-box-heading text-primary">
  		      Andreea
		    </strong>
		  </div>
                </div>
	      </td>
	      <td className="orders-data-cell">Two hours ago</td>
	      <td className="orders-data-cell">ASAP</td>
	      <td className="orders-data-cell">Some food</td>
	    </tr>

	    <tr>
	      <td className="orders-data-cell">0003</td>
	      <td className="orders-data-cell">
                <div className="media-box">
		  <div className="pull-left">
                    <img src="img/user.png" className="img-responsive media-box-object img-circle thumb32" />
		  </div>
                  <div className="media-box-body clearfix">
		    <strong className="media-box-heading text-primary">
  		      Horia
		    </strong>
		  </div>
                </div>
	      </td>
	      <td className="orders-data-cell">Today at 10am</td>
	      <td className="orders-data-cell">Today at 12am</td>
	      <td className="orders-data-cell">Some food</td>
	    </tr>

	    <tr>
	      <td className="orders-data-cell">0004</td>
	      <td className="orders-data-cell">
                <div className="media-box">
		  <div className="pull-left">
                    <img src="img/user1.jpg" className="img-responsive media-box-object img-circle thumb32" />
		  </div>
                  <div className="media-box-body clearfix">
		    <strong className="media-box-heading text-primary">
  		      Andreea
		    </strong>
		  </div>
                </div>
	      </td>
	      <td className="orders-data-cell">Yesterday 9pm</td>
	      <td className="orders-data-cell">ASAP</td>
	      <td className="orders-data-cell">Some food</td>
	    </tr>

	    <tr>
	      <td className="orders-data-cell">0005</td>
	      <td className="orders-data-cell">
                <div className="media-box">
		  <div className="pull-left">
                    <img src="img/user1.jpg" className="img-responsive media-box-object img-circle thumb32" />
		  </div>
                  <div className="media-box-body clearfix">
		    <strong className="media-box-heading text-primary">
  		      Andreea
		    </strong>
		  </div>
                </div>
	      </td>
	      <td className="orders-data-cell">2016/06/03</td>
	      <td className="orders-data-cell">ASAP</td>
	      <td className="orders-data-cell">Some food</td>
	    </tr>
	  </tbody>
	</Table>
      </ContentWrapper>
    );
  }
}

export default Orders;
