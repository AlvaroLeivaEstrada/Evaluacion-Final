import React, { Component, useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';

import { api } from '../../../utility/api';
import {
	renderField,
	renderDayPicker,
	renderDatePicker,
	renderNumber,
	AsyncSelectField,
	renderFilePicker
} from '../Utils/renderField/renderField';

class Formulario extends Component {
	render() {
		const { handleSubmit, archivo, setArchivo, crear } = this.props;

		const editar = window.location.href.includes('editar');
		let disabled = false;
		let titulo = editar ? 'Editar Producto' : 'Registrar Producto';
		let ver = false
		if (crear == false && editar == false) {
			disabled = true;
			ver =true
			titulo = 'Ver Producto';
		}

		return (
			<form action="" onSubmit={handleSubmit} className="py-4">
				<h2>Producto</h2>
				<div className="mb-4 card card-small">
					

					<div className="p-0 pt-3 d-flex flex-column flex-md-row">
						<div className="form-group has-feedback flex-1 mx-3">
							<label>Imagen</label>
							<Field photo={archivo} setFile={setArchivo} name="archivo" component={renderFilePicker} />
							<a href={archivo} target="_blank" >View product</a> 
						</div>
						
						<div className="d-flex flex-column flex-1 mx-3">
							<div className="form-group has-feedback">
								<label htmlFor="name">nombre</label>
								<Field
									name="name"
									placeholder="Product's name"
									component={renderField}
									type="text"
									className="form-control"
									disabled={disabled}
								/>
							</div>

							<div className="form-group has-feedback">
								<label htmlFor="price">Precio</label>
								<Field
									decimalScale={2}
									name="price"
									placeholder="Product's price"
									component={crear || editar?  renderNumber  : renderField }
									disabled={disabled}
								/>
							</div>

							<div className="form-group has-feedback">
								<label htmlFor="description">Descripción</label>
								<Field
									name="description"
									placeholder="Description"
									component={renderField}
									type="text"
									className="form-control"
									disabled={disabled}
								/>
							</div>
						</div>
					</div>

					<br />
					<div className="d-flex flex-row justify-content-end mt-3">
						{ver?<a className="btn btn-secondary btn-sm mr-2" href="/#/compra">
							Cancelar
						</a>:<a className="btn btn-secondary btn-sm mr-2" href="/#/listProducts">
							Cancelar
						</a>}
							
						{ver? 
							<button className="btn btn-success btn-sm" type="submit">
								COMPRAR
							</button>:null}
						{disabled == false && (
							<button className={`btn ${editar ? 'btn-info' : 'btn-success'} btn-sm`} type="submit">
								{editar ? 'Editar' : 'Registrar'}
							</button>
						)}
					</div>
				</div>
			</form>
		);
	}
}
export default reduxForm({
	form: 'ProductForm' //identificado unico de formulario
})(Formulario);
