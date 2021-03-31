import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/product/product';
import createProduct from './createProduct';


const ms2p = (state) => {
    return {
        ...state.product,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(createProduct);
