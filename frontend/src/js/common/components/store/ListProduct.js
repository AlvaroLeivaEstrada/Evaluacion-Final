import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListProduct extends Component {
	componentWillMount = () => {
		const { listar } = this.props;
		listar();
	};
	render() {
        const {products,loader} = this.props;
		
		return (
			<React.Fragment>
				<h1 align="center">PRODUCTOS EN VENTA</h1>
			
				<Grid
					hover
					striped
					data={products}
					loading={loader}
					
					//onPageChange={onPageChange}
					//onSortChange={onSortChange}
				>
			
					<TableHeaderColumn  dataField="name" dataSort >
						Product's name
					</TableHeaderColumn>
					<TableHeaderColumn  dataField="price" dataSort >
						Product's Price 
					</TableHeaderColumn>
				
					<TableHeaderColumn
						isKey
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ ver: 'product'})}
					>
						Buy item
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default ListProduct;