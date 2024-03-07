export default class Recipe {
    constructor(
        title, description, category, nonAlcoholic, draft,
        ingredients, steps, image, createdBy
    ) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.nonAlcoholic = nonAlcoholic;
        this.draft = draft;
        this.ingredients = ingredients;
        this.steps = steps;
        this.image = image;
        this.createdBy = createdBy;
    }
}