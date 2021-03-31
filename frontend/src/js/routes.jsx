import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import OpenRoute from './OpenRoute'
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import productContainer from './common/components/Product/createProductContainer'
import ListProductContainer from './common/components/Product/ListProductContainer'
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
import itemsAvailable from './common/components/store/ListProductContainer'
import StatisticsContainer from './common/components/statistics/index'
import myItems from './common/components/myShopping/ListProductContainer'

require('../style/index.css');

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <OpenRoute exact path="/login" component={itemsAvailable} />
                <Route exact path="/registro" component={Registro} />
                <Route exact path="/product/:id" component={productContainer} />
                <Route exact path="/access/login"component={Login}/>
                
                <OpenRoute exact path ="/compra" component={itemsAvailable}/>
                <ProtectedRoute exact path="/"component={Demo}/>
                <ProtectedRoute exact path="/reporte" component={StatisticsContainer}/>
                <ProtectedRoute exact path="/home" component={itemsAvailable}/>
                <ProtectedRoute exact path="/myShopping" component={myItems}/>
                
              
                <ProtectedRoute exact path="/createProduct" component={productContainer} />
                <ProtectedRoute exact path="/product/:id/editar" component={productContainer} />
             
                <ProtectedRoute exact path="/listProducts" component={ListProductContainer}/>
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />
                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
