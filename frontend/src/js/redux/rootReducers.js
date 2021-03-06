import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';
import product from './modules/product/product'
import statistics from './modules/statistics/statistics'

export default combineReducers({
    form: formReducer,
    product,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    statistics
});
