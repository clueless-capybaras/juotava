export class userSettings {
    constructor(
        auth0id, userName, settings
    ) {
        this.auth0id = auth0id;
        this.userName = userName;
        this.settings = settings;
    }
}

export class Settings {
    constructor(
        uuid, showUserNameInRecipe
    ) {
        this.uuid = uuid;
        this.showUserNameInRecipe = showUserNameInRecipe;
    }
}