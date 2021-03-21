import React from 'react';
import { Route } from 'react-router-dom';
import {IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AllProducts from "./pages/AllProducts/AllProducts";
import MyProducts from "./pages/MyProducts/MyProducts";

const MyPartyWallApp: React.FC = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route component={Login} exact={true} path="/login" />
                    <Route component={Register} exact={true} path="/register" />
                    <Route component={AllProducts} exact={true} path="/AllProducts" />
                    <Route component={MyProducts} exact={true} path="/MyProducts" />
                    <Route component={MyProducts} exact={true} path="/" />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}

export default React.memo(MyPartyWallApp);
