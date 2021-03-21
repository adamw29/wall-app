import ParseInitialized from "../ParseInitialized";
import {atom} from "@salvoravida/recoil";

export const userAtomState = atom({
    key: 'userState',
    default: { authenticated: ParseInitialized.User.current()?.authenticated() || false},
});

export const modalAtomState = atom({
    key: 'modalAtomState',
    default: false,
});

export const myProductsList = atom({
    key: 'myProductsList',
    default: [],
});

export const allUsersProductsList = atom({
    key: 'allUsersProductsList',
    default: [],
});

export const handleRemoveProduct = (objectId: string)  => ParseInitialized.Cloud.run('deleteProduct', {objectId});
