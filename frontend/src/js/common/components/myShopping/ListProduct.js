import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListProduct extends Component {
	componentWillMount = () => {
		const { myItems } = this.props;
		myItems();
	};
	render() {
        const {items,loader} = this.props;
		

		return (
			<React.Fragment>
				<h1>MIS COMPRAS</h1>
               
				<Grid
					hover
					striped
					data={items}
					loading={loader}
					
					//onPageChange={onPageChange}
					//onSortChange={onSortChange}
				>
					<TableHeaderColumn  isKey dataField="product" dataSort dataFormat={(cell,row)=>{
						return row.product.name;
					}} >
						Product's name
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="product" dataSort dataFormat={(cell,row)=>{
						return cell.price;
					}} >
						Product's Price 
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default ListProduct;