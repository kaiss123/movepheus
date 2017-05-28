import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Importing Pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { RemindPage } from '../pages/remind/remind';
import { MovePage } from '../pages/move/move';
import { MovedetailPage } from '../pages/movedetail/movedetail';
import { EvaluatePage } from '../pages/evaluate/evaluate';
import { EducatePage } from '../pages/educate/educate';
import { AddReminderModalPage } from '../pages/add-reminder-modal/add-reminder-modal';
import { AddMoveEventModalPage } from '../pages/add-move-event-modal/add-move-event-modal';
import { ListMoveEventsModalPage } from '../pages/list-move-events-modal/list-move-events-modal';

//Menu Items
import { AboPage } from '../pages/abo/abo';
import { SeminarPage } from '../pages/seminar/seminar';
import { SettingsPage } from '../pages/settings/settings';
import { FaqPage } from '../pages/faq/faq';
import { TourPage } from '../pages/tour/tour';
import { ContactPage } from '../pages/contact/contact';
import { AgbPage } from '../pages/agb/agb';

// Importing Providers
import { AuthData } from '../providers/auth-data';
import { LocalNotifications } from 'ionic-native';

// Importing AF2 Module

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// AF2 Settings
const firebaseConfig = {
    apiKey: "AIzaSyAS2_SkNa5ocCFw7amwrLYEGw_iWoH_4Lk",
    authDomain: "movepheus.firebaseapp.com",
    databaseURL: "https://movepheus.firebaseio.com",
    storageBucket: "movepheus.appspot.com",
    messagingSenderId: "466542054348"
};

const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
}


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        ResetPasswordPage,
        SignupPage,
        RemindPage,
        MovePage,
        MovedetailPage,
        EvaluatePage,
        EducatePage,
        AddReminderModalPage,
        AddMoveEventModalPage,
        ListMoveEventsModalPage,
        AboPage,
        SeminarPage,
        SettingsPage,
        FaqPage,
        TourPage,
        ContactPage,
        AgbPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        ResetPasswordPage,
        SignupPage,
        RemindPage,
        MovePage,
        MovedetailPage,
        EvaluatePage,
        EducatePage,
        AddReminderModalPage,
        AddMoveEventModalPage,
        ListMoveEventsModalPage,
        AboPage,
        SeminarPage,
        SettingsPage,
        FaqPage,
        TourPage,
        ContactPage,
        AgbPage
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AuthData,
        LocalNotifications
    ]
})
export class AppModule { }
