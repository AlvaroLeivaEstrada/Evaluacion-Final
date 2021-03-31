import React, { Component } from 'react';
import Formulario from './formulario';

class createProduct extends Component {
	state = {
		creacion: true,
		archivo: null
	};

	setAvatar = (archivo) => {
		console.log(archivo)
		this.setState({ archivo });
	};

	registro = (data) => {
		const { registerProduct } = this.props;
		registerProduct({ ...data, archivo: null }, [ { file: this.state.archivo, name: 'archivo' } ]);
	};
	actualizar = (data) => {
		const { update } = this.props;
		update({ ...data, archivo: null }, [ { file: this.state.archivo, name: 'archivo' } ]);
	};

	componentWillMount = () => {
		const { leer, match } = this.props;
		const id = match.params.id;
		if (id) {
			this.setState({ creacion: false });
			leer(id);
		}
	};

	render() {
		const editar = window.location.href.includes('editar');
		const {creacion,clearArchivo} = this.state
		const {purchaseProduct,archivo}=this.props
		let functionEnvio=null
		
		if (creacion){
			functionEnvio=this.registro
		}else if(editar){
			functionEnvio=this.actualizar
		}else{
			functionEnvio=purchaseProduct
		}

		return (
			<React.Fragment>
				<Formulario
					crear={creacion}
					onSubmit={functionEnvio}
					archivo={archivo}
					setArchivo={this.setAvatar}
					clearArchivo={clearArchivo}
                
				
				/>
			</React.Fragment>
		);
	}
}
export default createProduct;
