import { handleActions } from 'redux-actions';

import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { TableHeaderColumn } from "react-bootstrap-table";



const GUARDAR_LISTADO_PRODUCTO='GUARDAR_LISTADO_PRODUCTO';
const GUARDAR_ARCHIVO='GUARDAR_ARCHIVO';
const GUARDAR_MIS_COMPRAS ="GUARDAR_MIS_COMPRAS"

const setProduct = products=>({
    type:GUARDAR_LISTADO_PRODUCTO,
    products
})
const setArchivo = archivo =>({
    type:GUARDAR_ARCHIVO,
    archivo
})
const setItems = items =>({
    type:GUARDAR_MIS_COMPRAS,
    items
})
export const registerProduct = (data,attachments=[]) => (dispatch, getStore)=>{
    api.postAttachments('/product',data,attachments).then((response)=>{
        dispatch(push('/listProducts'))
        NotificationManager.success(
            'Nuevo producto ingresado',
            'Exito',
            300
        )
    }).catch((error)=>{
        NotificationManager.error(
            'Ocurrio un error registrar un producto',
            'Error',
            0
        );
    })

}

export const update = (data,attachment) => (dispatch, getStore)=>{

  
    const formaData = getStore().form.ProductForm.values;
    console.log("FormData :" ,data);
    console.log("attachment :" ,attachment);
    api.putAttachments(`/product/${data.id}`,data,attachment).then((response)=>{
     
        dispatch(push('/listProducts'))
        NotificationManager.success(
            'Cambio realizado correctamente',
            'Exito',
            300
        )
    }).catch((error)=>{
        NotificationManager.error(
            'Hubo un error al editar',
            'Error',
            0)
    })
  
}

const myItems=()=>(dispatch)=>{
    api.get('/sales/myShoppingBasket').then((response)=>{
        dispatch(setItems(response))
    }).catch((error)=>{
    })
}

const clearArchivo = () => (dispatch) => {
	dispatch(setArchivo(null));
};

const listar = () => (dispatch) => {
    api.get('/product').then((response)=>{
        dispatch(setProduct(response));
    }).catch((error)=>{
        console.log("Error :", error);
    })
}
const purchaseProduct=(data)=>(dispatch)=>{
    const token = localStorage.getItem("token")
    api.post('/product/buyProduct',data).then((response)=>{
        NotificationManager.success(
            'Compra realizada satisfactoriamente',
            'Exito',
            300)
        if (token){
            dispatch(push('/home'))
        }else{
            dispatch(push('/compra'))
        }
       
    }).catch((error)=>{
        NotificationManager.error(
            'Ocurrio un error en la compra',
            'ERROR')
    })
}
export const myProducts = () => (dispatch) => {
    api.get('/product/myProducts').then((response)=>{
        dispatch(setProduct(response));
    }).catch((error)=>{
        console.log("Error :", error);
    })
}

export const leer = (id) =>(dispatch)=>{

    api.get(`/product/${id}`).then((response)=>{
     
        dispatch(setArchivo(response.archivo))
        dispatch(initializeForm('ProductForm',response))
    }).catch((error)=>{
        console.log("error",error);
        NotificationManager.error(
            'Ocurrio un error al ver empresa',
            'Error',
            0
        );

    })
}
export const eliminar = (id) => (dispatch)=>{
    api.eliminar(`/product/${id}`).then((response)=>{
        NotificationManager.success(
            'Producto eliminada correctamente ',
            'Exito',
            3000
        ); 
        dispatch(listar());
    }).catch((error)=>{
       
        NotificationManager.error(
            'Ocurrio un error al eliminar producto',
            'Error',
            0
        );
    })
}

export const actions = {
    registerProduct,
    listar,
    leer,
    update,
    eliminar,
    clearArchivo,
    purchaseProduct,
    myProducts,
    myItems
};

export const reducers = {
    [GUARDAR_LISTADO_PRODUCTO]:(state,{products})=>{
        return{
            ...state,
            products:{
                results:products
            },
        };
    },
    [GUARDAR_ARCHIVO]:(state,{archivo})=>{
        return{
            ...state,
            archivo,
        };
    },
    [GUARDAR_MIS_COMPRAS]:(state,{items})=>{
        return{
            ...state,
            items:{
                results:items
            },
        };
    }
};

export const initialState = {
    loader: false,
    products: {
		result: [],
		count: 0
	},
    items:{
        results:[],
        count:0
    },
    archivo: null,
};

export default handleActions(reducers, initialState);