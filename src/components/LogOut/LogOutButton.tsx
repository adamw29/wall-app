import {IonButton, IonIcon } from "@ionic/react";
import {logOutOutline} from "ionicons/icons";
import React from "react";
import ParseInitialized from "../../ParseInitialized";
import {useRecoilState} from "@salvoravida/recoil";
import {allUsersProductsList, myProductsList, userAtomState} from "../../recoil/atoms";


export default React.memo(() => {
    const [, setUser] = useRecoilState(userAtomState);
    const [, setMyProducts] = useRecoilState(myProductsList);
    const [, setAllUsersProducts] = useRecoilState(allUsersProductsList);

    const handleLogOut = () => {
        setAllUsersProducts([])
        setMyProducts([])
        ParseInitialized.User.logOut()
            .then(() => setUser({ authenticated: false }))
            .catch(console.error);
    }

    return (
        <IonButton onClick={handleLogOut}>
            <IonIcon icon={logOutOutline} slot="icon-only" />
        </IonButton>
    )
});