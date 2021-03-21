import React, {useCallback} from 'react';
import {useRecoilState} from "@salvoravida/recoil";
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonIcon, IonItem, IonInput, IonLabel, IonButton, IonRouterLink, IonToast } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import {Redirect} from 'react-router-dom';
import {myProductsList, userAtomState} from '../../recoil/atoms';
import ParseInitialized from '../../ParseInitialized';

const Login: React.FC = () => {
    const [, setMyProducts] = useRecoilState(myProductsList);
    const [email, setEmail] = React.useState<string>()
    const [password, setPassword] = React.useState<string>();
    const [hasError, setError] = React.useState<boolean>(false);
    const [user, setUser] = useRecoilState(userAtomState);

    const handleLogin = useCallback(() => {
        if (email && password ) {
            ParseInitialized.User.logIn(email, password)
                .then(() => {
                    setUser({authenticated: true});
                    ParseInitialized.Cloud.run('getCurrentUserProducts').then(setMyProducts);
                })
                .catch(() => setError(true));
        } else setError(true);
    }, [email, password, setMyProducts, setUser])

    if (user.authenticated) return <Redirect to="/MyProducts" />

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Zaloguj się!</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding" fullscreen>
                <IonRow>
                    <IonCol class={"ion-text-center"}>
                        <IonIcon
                            icon={personCircle}
                            style={{ fontSize: "70px", color: "#0040ff" }}
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Email</IonLabel>
                            <IonInput
                                onIonChange={(e) => setEmail(e.detail.value || "")}
                                type="email"
                                value={email}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput
                                onIonChange={(e) => setPassword(e.detail.value || "")}
                                type="password"
                                value={password}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol class={"ion-text-center"}>
                        <IonButton expand="block" onClick={handleLogin}>
                            Login
                        </IonButton>
                        <p style={{ fontSize: "medium" }}>
                            Don't have an account? <IonRouterLink routerLink="/register">Register!</IonRouterLink >
                        </p>
                    </IonCol>
                </IonRow>
                <IonToast
                    color={"danger"}
                    duration={2000}
                    isOpen={hasError}
                    message="Niepoprawne dane logowania!"
                    onDidDismiss={() => setError(false)}
                />
            </IonContent>
        </>
    );
};

export default React.memo(Login);
