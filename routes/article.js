const express = require('express')

const { updateArticleInfo,
    createArticle,
    deleteArticleInfo,
    getallArticle,
    getSpecificArticle
} = require('../controllers/Article')

const router = express.Router()



//To get all Article route
router.get('/articles', getallArticle);

// GET a specific article by ID route
router.get('/specific-article/:id', getSpecificArticle);

//create a new Article 
router.post('/create-article', createArticle)

// PUT (update) an existing article by ID
router.put('/update-article/:id', updateArticleInfo);

// DELETE an article by ID
router.delete('/delete-article/:id', deleteArticleInfo)

module.exports = { router }

