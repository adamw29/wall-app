import {
    IonButton,
    IonButtons,
    IonContent,
    IonRow,
    IonCol,
    IonToolbar,
    IonTitle,
    IonHeader,
    IonItem,
    IonLabel,
    IonListHeader,
    IonInput,
    IonTextarea,
    IonSpinner,
    IonRadioGroup,
    IonRadio,
    IonList,
} from "@ionic/react";
import React, {useCallback} from "react";
import {useRecoilState} from "@salvoravida/recoil";
import {modalAtomState, myProductsList } from "../../recoil/atoms";
import './NewProduct.css'
import ParseInitialized from "../../ParseInitialized";
import { Product } from "../../app.interfaces";

export default React.memo(() => {
    const [, setModal] = useRecoilState(modalAtomState);
    const [myProducts, setMyProducts] = useRecoilState(myProductsList);
    const [ongoing, setOngoing] = React.useState<boolean>(false);
    const [productType, setType] = React.useState<string>('drinks');

    const handleSave = useCallback((e) => {
        setOngoing(true);
        e.preventDefault();
        const formData = new FormData(e.target);
        const entries = (Object.fromEntries(formData.entries()));
        ParseInitialized.Cloud.run('createProduct', {...entries, productType})
            .then((result) => {
                const resultJSON = result.toJSON();
                const newList: Product[] = [...myProducts, {
                    price: resultJSON.price,
                    type: productType,
                    description: resultJSON.description,
                    quantity: resultJSON.quantity,
                    volume: resultJSON.volume,
                    weight: resultJSON.weight,
                    name: resultJSON.name,
                    objectId: resultJSON.objectId,
                    createdBy: resultJSON.createdBy,
                }]
                // @ts-ignore
                setMyProducts(newList)
                setModal(false);
            })
            .catch(() => setOngoing(false));
    }, [setMyProducts, myProducts, productType, setModal]);

    const handleRadioChange = (e: CustomEvent) => setType(e.detail.value)

    return (
        <>
            <IonHeader translucent>
                <IonToolbar>
                    <IonTitle>Dodaj nowy produkt!</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setModal(false)}>Zamknij</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >
                <form onSubmit={handleSave}>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonTextarea name={"productName"} placeholder="Nazwa produktu:" required/>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonList>
                                <IonRadioGroup onIonChange={handleRadioChange} value={productType}>
                                    <IonListHeader>
                                        <IonLabel>Wybierz rodzaj:</IonLabel>
                                    </IonListHeader>
                                    <IonItem>
                                        <IonRadio slot="start" value="drinks" />
                                        <IonLabel>Napój</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonRadio slot="start" value="food" />
                                        <IonLabel>Jedzenie</IonLabel>
                                    </IonItem>
                                </IonRadioGroup>
                            </IonList>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">Ilość:</IonLabel>
                                <IonInput
                                    min={"1"}
                                    name={"productQuantity"}
                                    placeholder={"liczba"}
                                    required
                                    type="number"
                                />
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            {productType === 'drinks' ? (
                                <IonItem>
                                    <IonLabel position="floating">Objętość:</IonLabel>
                                    <IonInput min={"1"} name={"productVolume"} placeholder={"litry"} required type="number"/>
                                </IonItem>
                            ) : (
                                <IonItem>
                                    <IonLabel position="floating">Waga:</IonLabel>
                                    <IonInput min={"1"} name={"productWeight"} placeholder={"kg"} required type="number"/>
                                </IonItem>
                            )}
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">Cena:</IonLabel>
                                <IonInput min={"1"} name={"productPrice"} placeholder={"zł"} required type="number"/>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    {productType === 'food' && (
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonTextarea name={"productDescription"} placeholder="Opisz swój produkt!" required/>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    )}
                    <IonRow>
                        <IonCol>
                            <IonButton disabled={ongoing} expand="block" type="submit" >
                                {ongoing && <IonSpinner name="lines" />}
                                <IonLabel>Zapisz</IonLabel>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </form>
            </IonContent>
        </>
    )
});