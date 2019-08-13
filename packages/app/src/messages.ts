import { translate as $l } from "@padloc/locale/src/translate";

export function trialingMessage(days: number) {
    return $l(
        "Your trial period ends in {0} days. Upgrade now to continue using online features like " +
            "synchronization and automatic backups!",
        days.toString()
    );
}

export function trialExpiredMessage() {
    return $l(
        "Your free trial has expired. Upgrade now to continue using advanced features like " +
            "automatic online backups and seamless synchronization between devices!"
    );
}

export function subUnpaidMessage() {
    return $l("Your last payment has failed. Please contact your card provider " + "or update your payment method!");
}

export function subCanceledMessage() {
    return $l(
        "Your subscription has been canceled. Reactivate it now to continue using advanced " +
            "features like automatic online backups and seamless synchronization between devices!"
    );
}

export function loginInfoText() {
    return $l(
        "Log in now to unlock advanced features like automatic online backups and " +
            "seamless synchronization between devices!"
    );
}
