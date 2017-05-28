import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { AboPage } from '../pages/abo/abo';
import { SeminarPage } from '../pages/seminar/seminar';
import { SettingsPage } from '../pages/settings/settings';
import { FaqPage } from '../pages/faq/faq';
import { TourPage } from '../pages/tour/tour';
import { ContactPage } from '../pages/contact/contact';
import { AgbPage } from '../pages/agb/agb';

import { AngularFire } from 'angularfire2';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any;
    movepheusMenu: Array<MenuItem>;
    helpMenu: Array<MenuItem>;
    infoMenu: Array<MenuItem>;



    constructor(platform: Platform, af: AngularFire) {
        const authObserver = af.auth.subscribe(user => {
            if (user) {
                this.rootPage = HomePage;
                authObserver.unsubscribe();
            } else {
                this.rootPage = LoginPage;
                authObserver.unsubscribe();
            }
        });
        this.movepheusMenu = [
            { title: 'movepheus Abo', component: AboPage, icon: 'home' },
            { title: 'movepheus Seminare', component: SeminarPage, icon: 'people' },
            { title: 'Einstellungen', component: SettingsPage, icon: 'star' },
        ];

        this.helpMenu = [
            { title: 'FAQ', component: FaqPage, icon: 'ios-contact' },
            { title: 'App Tour', component: TourPage, icon: 'log-out' },
        ];

        this.infoMenu = [
            { title: 'Kontakt', component: ContactPage, icon: 'bookmark' },
            { title: 'AGB', component: AgbPage, icon: 'information-circle' },
        ];

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }
    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.push(page.component);
    }
}
