import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class AuthData {

    fireAuth: any;

    constructor(public af: AngularFireAuth) {
        // af.auth.sisubscribe( user => {
        //   if (user) { this.fireAuth = user.auth; }
        // });
    }

    loginUser(newEmail: string, newPassword: string): Promise<any> {
        return this.af.auth.signInWithEmailAndPassword(newEmail, newPassword).catch(error => console.log(error));
    }

    resetPassword(email: string): Promise<any> {
        return this.af.auth.sendPasswordResetEmail(email);
    }

    logoutUser(): Promise<any> {
        return this.af.auth.signOut();
    }

    signupUser(newEmail: string, newPassword: string): Promise<any> {
        return this.af.auth.createUserWithEmailAndPassword(newEmail, newPassword);
    }


}
