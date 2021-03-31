import { handleActions } from 'redux-actions';

import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { TableHeaderColumn } from "react-bootstrap-table";



const STORE_TOTAL_SALES='STORE_TOTAL_SALES';
const AVG_PRICE="AVG_PRICE";
const STORE_SALES_PRODUCT='STORE_SALES_PRODUCT';

const setTotal = total=>({
    type:STORE_TOTAL_SALES,
    total
})
const setTotalByProducts = sales =>({
    type:STORE_SALES_PRODUCT,
    sales
})
const setAvg = avg =>({
    type:AVG_PRICE,
    avg
})
const salesByProduct =()=>(dispatch)=>{
    api.get('/sales/totalSalesbyProduct').then((sales)=>{
        console.log(sales)
        dispatch(setTotalByProducts(sales))
    }).catch((error)=>{})
}
const totalSales =()=>(dispatch)=>{
    api.get('/sales/totalSales').then((response)=>{
        dispatch(setTotal(response.total_sales))
    }).catch((error)=>{})
}
const avgPriceProduct=()=>(dispatch)=>{
    api.get('/product/avgPriceProduct').then((response)=>{
        dispatch(setAvg(response.promedio_precio))
    })
}
export const actions = {
    salesByProduct,
    totalSales,
    avgPriceProduct
};

export const reducers = {
    [STORE_TOTAL_SALES]:(state,{total})=>{
        return{
            ...state,
            total
        };
    },
    [STORE_SALES_PRODUCT]:(state,{sales})=>{
        return{
            ...state,
            sales:{
                results:sales
            },
        };
    },
    [AVG_PRICE]:(state,{avg})=>{
        return{
            ...state,
            avg:avg
        }
    }
};

export const initialState = {
    loader: false,
    sales:{
        results:[],
        count:0
    },
    avg:0,
    total: null,
};

export default handleActions(reducers, initialState);