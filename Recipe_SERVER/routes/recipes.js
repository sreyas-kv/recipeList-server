const { Router } = require('express');
const recipeController = require('../controllers/recipes');

const recipeRouter = new Router();

recipeRouter.get('/', (req, res, next) => {
    recipeController.getAllRecipes()
        .then(result => {
            res.json({
                success: result.success,
                message: result.messge,
                recipes: result.recipes,
            });
        })
        .catch(error => {
            res.json({
                success: false,
                message: error.message,
            });
            next();
        });
});

recipeRouter.get('/:id', (req, res, next) => {
    recipeController.getSelectedRecipe(req.params.id)
        .then(result => {
            res.json({
                success: true,
                message: result.message,
                recipe: result.recipe,
            });
        })
        .catch(error => {
            res.json({
                success: false,
                message: error.message,
            });
            next(error);
        });
});

recipeRouter.post('/', (req, res, next) => {
    recipeController
    .createRecipe(req.body.email, req.body)
    .then(({ success, message, recipe }) => {
        res.json({
            success, 
            message,
            recipe,
        });
    })
    .catch((error) => {
        res.json({
            success: false,
            message: error.message,
        });
        next(error);
    });
});

recipeRouter.delete('/:id', (req, res, next) => {
    recipeController
        .deleteRecipe(req.params.id)
        .then(({ success, message }) => {
            res.json({
                success:true,
                message: 'Recipe deleted successfully',
            })
        })
        .catch(error => {
            res.json({
                success: false,
                message: error.message,
            });
            next(error);
        });
});

module.exports = recipeRouter;