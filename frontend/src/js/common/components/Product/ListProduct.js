import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListProduct extends Component {
	componentWillMount = () => {
		const { myProducts } = this.props;
		myProducts();
	};
	render() {
        const {products,loader,eliminar} = this.props;
		

		return (
			<React.Fragment>
				<h1>MI CATALOGO DE PRODUCTOS</h1>
				<a className="btn btn-success" href="#/createProduct">
                    Subir nuevo producto
                </a>
               
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
					<TableHeaderColumn  dataField="description" dataSort>
						Product's description  
					</TableHeaderColumn>
					
					<TableHeaderColumn
						isKey
						dataField="id"
						dataAlign="center"
						dataSort
						dataFormat={standardActions({ editar: 'product', eliminar: eliminar })}
					>
						Acciones
					</TableHeaderColumn>
				</Grid>
			</React.Fragment>
		);
	}
}

export default ListProduct;