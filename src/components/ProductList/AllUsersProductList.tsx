import {IonLabel, IonList, IonItem, IonAvatar, IonProgressBar} from "@ionic/react";
import React from "react";
import {useRecoilState} from "@salvoravida/recoil";
import {allUsersProductsList} from "../../recoil/atoms";
import './ProductList.css';
import drinks from '../../assets/drinks.jpg'
import food from '../../assets/food.jpg'
import { Product } from "../../app.interfaces";
import ParseInitialized from "../../ParseInitialized";


const AllUsersProductList = () => {
    const [allProducts, setAllUsersProducts] = useRecoilState(allUsersProductsList);
    const [loading, setLoading] =React.useState(true);

    React.useEffect(() => {
        const fetchData = () => {
            ParseInitialized.Cloud.run('getAllUsersProducts').then(setAllUsersProducts).then(() => setLoading(false));
        };
        fetchData();
    }, [setAllUsersProducts]);

    if (loading) return <IonProgressBar type="indeterminate"/>

    return (
        <IonList>
            {allProducts.map((product: Product) => {
                return (
                    <IonItem key={product.objectId}>
                        <IonAvatar slot={"start"}>
                            <img alt="alt" src={product.type === 'drinks' ? drinks : food} />
                        </IonAvatar>
                        <IonLabel>
                            <div className={"space-between"}>
                                <div className={"row"}>
                                    <h2>{product.name}</h2>
                                    {product.description && <h2>{`, ${product.description}`}</h2>}
                                </div>
                                <p>{`Ilość: ${product.quantity}`}</p>
                            </div>
                            <div className={"space-between"}>
                                <p>{`Dodany przez: ${product.createdBy?.username}`}</p>
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

export default React.memo(AllUsersProductList);
