import { Aurelia, PLATFORM } from 'aurelia-framework';
import { CordovaEvents } from './cordova-events';

declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build
declare const IS_CORDOVA: boolean; // The value is supplied by Webpack during the build

export async function configure(aurelia: Aurelia) {
    if (IS_CORDOVA) {
        const cordova = new CordovaEvents();
        await cordova.waitForDeviceReady();
    }

    aurelia.use
        .standardConfiguration();

    if (IS_DEV_BUILD) {
        aurelia.use.developmentLogging();
    }

    await aurelia.start();

    await aurelia.setRoot(PLATFORM.moduleName('app'));
}
