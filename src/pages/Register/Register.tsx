import React, {useCallback} from 'react';
import {
    IonButton,
    IonCol,
    IonContent,
    IonHeader,
    IonIcon, IonInput,
    IonItem,
    IonLabel,
    IonRouterLink,
    IonRow,
    IonTitle, IonToast,
    IonToolbar
} from '@ionic/react';
import './Register.css';
import {personCircle} from "ionicons/icons";
import {Redirect} from 'react-router-dom';
import {useRecoilState} from "@salvoravida/recoil";
import { userAtomState } from '../../recoil/atoms';
import ParseInitialized from "../../ParseInitialized";

const Register: React.FC = () => {
    const [email, setEmail] = React.useState<string>();
    const [username, setUserName] = React.useState<string>()
    const [password, setPassword] = React.useState<string>();
    const [hasError, setError] = React.useState<boolean>(false);
    const [user , setUser] = useRecoilState(userAtomState);

    const handleRegister = useCallback(() => {
        if (email && password ) {
            const user = new ParseInitialized.User();
            user.set("username", username);
            user.set("password", password);
            user.set("email", email);

            user.signUp().then(function(user) {
                setUser({authenticated: true});
                console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
            }).catch(() => setError(true));
        } else setError(true)
    }, [email, username, password, setUser])

    if (user.authenticated) return <Redirect to="/MyProducts" />

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Nowy użytkownik!</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen class="ion-padding">
                <IonRow>
                    <IonCol class={"ion-text-center"}>
                        <IonIcon
                            style={{ fontSize: "70px", color: "#0040ff" }}
                            icon={personCircle}
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">User name</IonLabel>
                            <IonInput
                                type="text"
                                value={username}
                                onIonChange={(e) => setUserName(e.detail.value || "")}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating">Email</IonLabel>
                            <IonInput
                                type="email"
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value || "")}
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
                                type="password"
                                value={password}
                                onIonChange={(e) => setPassword(e.detail.value!)}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol class={"ion-text-center"}>
                        <IonButton expand="block" onClick={handleRegister}>
                            Register
                        </IonButton>
                        <p style={{ fontSize: "medium" }}>
                            Already sing up? <IonRouterLink routerLink="/login">Login!</IonRouterLink >
                        </p>
                    </IonCol>
                </IonRow>
                <IonToast
                    color={"danger"}
                    duration={2000}
                    isOpen={hasError}
                    message="Niepoprawne dane rejestracji!"
                    onDidDismiss={() => setError(false)}
                />
            </IonContent>
        </>
    );
};

export default React.memo(Register);
