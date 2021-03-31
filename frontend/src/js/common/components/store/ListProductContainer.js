import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/product/product'
import ListProduct from './ListProduct';

//El estado
const ms2p = (state) => {
  return {
    ...state.product,
  };
};
// Las actions
const md2p = { ...actions };

export default connect(ms2p, md2p)(ListProduct);
