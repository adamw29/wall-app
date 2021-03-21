import {IonButton, IonCol, IonIcon, IonLabel, IonRow, IonList, IonItem, IonAvatar} from "@ionic/react";
import {arrowDownOutline} from "ionicons/icons";
import React from "react";
import {useRecoilState} from "@salvoravida/recoil";
import {modalAtomState, myProductsList, handleRemoveProduct} from "../../recoil/atoms";
import './ProductList.css';
import drinks from '../../assets/drinks.jpg'
import food from '../../assets/food.jpg'
import { Product } from "../../app.interfaces";

const removeItemAtIndex = (arr: Product[], index: number) => {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const MyProductList = () => {
    const [, setModal] = useRecoilState(modalAtomState);
    const [myProducts, setMyProducts] = useRecoilState(myProductsList);

    const deleteItem = React.useCallback((index: number) => {
        const newList = removeItemAtIndex(myProducts, index);

        // @ts-ignore
        setMyProducts(newList);
    }, [myProducts, setMyProducts]);

    if(!myProducts?.length) return (
        <>
            <IonRow>
                <IonCol class={"ion-text-center"}>
                    <IonIcon
                        className={"arrow-icon"}
                        icon={arrowDownOutline}
                    />
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol class={"ion-text-center"}>
                    <IonLabel position="floating">Dodaj produkt aby rozpocząć!</IonLabel>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol class={"ion-text-center"}>
                    <IonButton onClick={() => setModal(true)}>Dodaj!</IonButton>
                </IonCol>
            </IonRow>
        </>
    )

    return (
        <IonList>
            {myProducts.map((product: Product, index: number) => {
                return (
                    <IonItem key={product.objectId}>
                        <IonAvatar slot={"start"}>
                            <img alt="alt" src={product.type === 'drinks' ? drinks : food} />
                        </IonAvatar>
                        <IonButton
                            color="danger"
                            fill="clear"
                            onClick={() => handleRemoveProduct(product.objectId).then(() => deleteItem(index))}
                            size="small"
                            slot="end">
                            <span>Usuń</span>
                        </IonButton>
                        <IonLabel>
                            <h2>{product.name}</h2>
                            <h3>{product.description}</h3>
                            <div className={"space-between"}>
                                <p>{`Ilość: ${product.quantity}`}</p>
                                <span>{`Cena: ${product.price}zł`}</span>
                                {product.type === 'drinks' ? (<span>{`Objętość: ${product.volume}l`}</span>)
                                    : (<span>{`Waga: ${product.weight}kg`}</span>)}
                            </div>
                        </IonLabel>
                    </IonItem>
                )
            })}
        </IonList>
    );
}

export default React.memo(MyProductList);
