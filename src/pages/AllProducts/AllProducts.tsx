import React from 'react';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
} from '@ionic/react';

import {Redirect} from "react-router-dom";
import {useRecoilValue} from "@salvoravida/recoil";
import {userAtomState} from "../../recoil/atoms";
import LogOutButton from '../../components/LogOut/LogOutButton';
import AllUsersProductList from "../../components/ProductList/AllUsersProductList";


const AllProducts: React.FC = () => {
    const user = useRecoilValue(userAtomState);
    const authenticated = user.authenticated;

    if (!authenticated) return <Redirect to="/login" />

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Produkty wszystkich gości</IonTitle>
                    <IonButtons slot="end">
                        <IonButton color="success" fill="outline" routerLink="/MyProducts" shape="round">Tylko moje!</IonButton >
                        <IonButton color="primary" fill="solid" routerLink="/AllProducts" shape="round">Wszystkie!</IonButton >
                        <React.Suspense fallback={<div/>}>
                            <LogOutButton />
                        </React.Suspense>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <AllUsersProductList />
            </IonContent>
        </>
    );
};

export default AllProducts;
