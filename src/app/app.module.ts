import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
// Importing Pages
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {ResetPasswordPage} from '../pages/reset-password/reset-password';
import {SignupPage} from '../pages/signup/signup';
import {RemindPage} from '../pages/remind/remind';
import {MovePage} from '../pages/move/move';
import {MovedetailPage} from '../pages/movedetail/movedetail';
import {EvaluatePage} from '../pages/evaluate/evaluate';
import {EducatePage} from '../pages/educate/educate';
import {AddReminderModalPage} from '../pages/add-reminder-modal/add-reminder-modal';
import {AddMoveEventModalPage} from '../pages/add-move-event-modal/add-move-event-modal';
import {ListMoveEventsModalPage} from '../pages/list-move-events-modal/list-move-events-modal';
//Menu Items
import {AboPage} from '../pages/abo/abo';
import {SeminarPage} from '../pages/seminar/seminar';
import {SettingsPage} from '../pages/settings/settings';
import {FaqPage} from '../pages/faq/faq';
import {TourPage} from '../pages/tour/tour';
import {ContactPage} from '../pages/contact/contact';
import {AgbPage} from '../pages/agb/agb';
// Importing Providers
import {AuthData} from '../providers/auth-data';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {BrowserModule} from "@angular/platform-browser";

// Importing AF2 Module

// AF2 Settings
const firebaseConfig = {
    apiKey: "AIzaSyAS2_SkNa5ocCFw7amwrLYEGw_iWoH_4Lk",
    authDomain: "movepheus.firebaseapp.com",
    databaseURL: "https://movepheus.firebaseio.com",
    projectId: 'movepheus',
    storageBucket: "movepheus.appspot.com",
    messagingSenderId: "466542054348"

};

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
        BrowserModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule
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
