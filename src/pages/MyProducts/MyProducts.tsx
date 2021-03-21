import React from 'react';
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonButton,
    IonTitle,
    IonToolbar,
    IonModal, IonIcon, IonProgressBar,
} from '@ionic/react';
import {Redirect} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "@salvoravida/recoil";
import { userAtomState, modalAtomState } from '../../recoil/atoms';
import LogOutButton from "../../components/LogOut/LogOutButton";
import NewProductModal from "../../components/NewProduct/NewProductModal";
import MyProductList from '../../components/ProductList/MyProductList';
import { addOutline } from 'ionicons/icons';

const MyProducts: React.FC = () => {
    const user = useRecoilValue(userAtomState);
    const [isModalOpen, setModal] = useRecoilState(modalAtomState);
    const authenticated = user.authenticated;

    if (!authenticated) return <Redirect to="/login" />

    return (
        <>
            <IonModal isOpen={isModalOpen}>
                <NewProductModal />
            </IonModal>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Moje produkty</IonTitle>
                    <IonButtons slot="end">
                        <IonButton color="success" fill="solid" onClick={() => setModal(true)} shape="round">
                            <IonIcon icon={addOutline} slot="start" />
                            Dodaj produkt
                        </IonButton >
                        <IonButton color="primary" fill="outline" routerLink="/AllProducts" shape="round">Wszystkie</IonButton >
                        <React.Suspense fallback={<div/>}>
                            <LogOutButton />
                        </React.Suspense>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <React.Suspense fallback={<IonProgressBar type="indeterminate"/>}>
                    <MyProductList />
                </React.Suspense>
            </IonContent>
        </>
    );
};

export default MyProducts;
