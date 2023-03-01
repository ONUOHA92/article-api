const Article = require('../models/Article')


// GET /: Retrieves all articles from the database
// GET /:id: Retrieves a specific article by its ID
// POST /: Creates a new article and saves it to the database
// PUT /:id: Updates an existing article by its ID
// DELETE /:id: Deletes an existing article by its ID

// Create a function to get articles with pagination: 

async function getArticles(page, limit) {
    const skipIndex = (page - 1) * limit;

    const articles = await Article.find()
        .sort({ createdAt: -1 })
        .skip(skipIndex)
        .limit(limit);

    const totalArticles = await Article.countDocuments();
    const totalPages = Math.ceil(totalArticles / limit);

    return {
        currentPage: page,
        totalPages,
        totalArticles,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        articles,
    };
}


// GET all articles
const getallArticle = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // default to page 1
        const limit = parseInt(req.query.limit) || 10; // default to 10 articles per page

        // call the function to get articles with pagination
        const getallArticles = await getArticles(page, limit);
        res.json({ getallArticles, status_code: 200 })
    } catch (error) {
        res.status(500).send(error)
    }
}

// GET a specific article by ID
const getSpecificArticle = async (req, res) => {
    try {
        const specificArticle = await Article.findById(req.params.id);
        if (!specificArticle) {
            res.status(404).send('Article not found');
        } else {
            res.json({ specificArticle, status_code: 200 })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}


// POST a new article
const createArticle = async (req, res) => {
    try {
        const article = req.body;
        const newArticle = new Article(article);
        const savedArticle = await newArticle.save();
        res.status(201).json({
            savedArticle,
            status_code: 200,
            status: 'Article Created Successful'
        });

    } catch (error) {
        res.status(500).send(error);
    }
}



// PUT (update) an existing article by ID
const updateArticleInfo = async (req, res) => {
    try {
        const updateArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateArticle) {
            res.status(404).send('Article not found');
        } else {
            res.status(201).json({
                updateArticle,
                status_code: 200,
                status: 'Article updated Successful'
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}



// DELETE an article by ID
const deleteArticleInfo = async (req, res) => {
    try {
        const deleteArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deleteArticle) {
            res.status(404).send('Article not found');
        } else {
            res.json({
                status_code: 200,
                status: `Article  deleted Successful`
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }


}

module.exports = { getallArticle, getSpecificArticle, updateArticleInfo, createArticle, deleteArticleInfo }
