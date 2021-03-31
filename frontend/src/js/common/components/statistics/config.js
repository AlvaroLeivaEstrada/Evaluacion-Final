import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableHeaderColumn } from 'react-bootstrap-table';
import Grid from '../Utils/Grid';
import { Link } from 'react-router-dom';
import { standardActions } from '../Utils/Grid/StandardActions';

export default class Config extends Component {
	componentWillMount = () => {
		const { salesByProduct, totalSales,avgPriceProduct } = this.props;
		salesByProduct();
		totalSales();
		avgPriceProduct();
	};

	render() {
		const { loader, sales, total ,avg} = this.props;

		return (
			<div className="py-4">
				<h2 align="center">REPORTE DE VENTAS</h2>

				<div className="row">
					<div className="mb-4 card card-small">
						<div className="border-bottom card-header">
							<h6 className="m-0">Estadisticas de venta</h6>
						</div>
						<div className="p-0 px-3 pt-3">
							<ul>
								<li>
									<h4><strong>Monto acumulado por ventas:</strong> {total}</h4>
								</li>
								<li>
									<h4><strong>Promedio de precio:</strong> {avg}</h4>
								</li>
							</ul>
						</div>

						<div className="p-0 px-3 pt-3">
							<Grid
								data={sales}
								loading={loader}
								//onPageChange={onPageChange}
								//onSortChange={onSortChange}
							>
								<TableHeaderColumn isKey dataField="name" dataSort>
									Producto
								</TableHeaderColumn>
								<TableHeaderColumn dataField="total_Sales" dataSort>
									Total Acumulado
								</TableHeaderColumn>
							</Grid>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
