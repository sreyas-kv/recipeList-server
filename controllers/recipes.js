const Recipe = require('../models/recipesSchema');


function getAllRecipes() {
    return Recipe.find()
        .exec()
        .then((recipes) =>
            Promise.resolve({
                success: true,
                message: 'All the recipies',
                recipes,
            })
        );
}

function getRecipeData(recipeId) {
    return Recipe.findById(recipeId)
        .select('recipeName ingeridents cookingTime directions')
        .lean()
        .exec();
}

function getSelectedRecipe(recipeId) {
    const recipePromises = [
        getRecipeData(recipeId),
    ];

    return Promise.all(recipePromises)
        .then(([recipe]) => {
            if (!recipe) {
                return Promise.reject({
                    success: false,
                    message: 'There is no recipe with this ID',
                });
            }

            return Promise.resolve({
                success: true,
                message: 'Recipe has been retrieved',
                recipe: Object.assign({}, recipe),
            });
        });
}

function createRecipe(userId, data) {
    console.log(data)
    const recipe = new Recipe({
        email: userId,
        recipeName: data.recipeName,
        ingeridents: data.ingeridents,
        cookingTime: data.cookingTime,
        directions: data.directions,
    });
    return recipe
        .save()
        .then((createdRecipe) =>
            Recipe.findById(createdRecipe._id)
                // .lean()
                .exec()
        )
        .then((createRecipe) =>
            Promise.resolve({
                success: true,
                message: 'Recipe created successfully',
                recipe: createRecipe,
            })
        );
}

function editRecipe(recipeId) { }

function deleteRecipe(recipeId) {
    return Recipe.findOne({
        _id: recipeId,
    })
        .exec()
        .then((recipe) => {
            if (!recipe) {
                return Promise.reject({
                    success: false,
                    message: 'Recipe cannot be found',
                });
            }
            return Recipe.findByIdAndRemove(recipeId).exec();
        })
        .then(() => {
            Promise.resolve({
                success: true,
                message: 'Reciepe deleted',
            })
        })
}
module.exports = {
    getAllRecipes,
    getSelectedRecipe,
    createRecipe,
    deleteRecipe,
}