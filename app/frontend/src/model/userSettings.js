export class userSettings {
    constructor(
        auth0id, userName, settings, image
    ) {
        this.auth0id = auth0id;
        this.userName = userName;
        this.settings = settings;
        this.image = image;
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

export class Image {
    constructor(
        uuid, base64data
    ) {
        this.uuid = uuid;
        this.base64data = base64data;
    }
}