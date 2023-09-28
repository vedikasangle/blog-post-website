//const { localsName } = require('ejs');
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


router.get('', async (req, res) => {
    const locals = {
        title: "NodeJS Blog",
        description: "Simple Blog created with nodejs, express, mongoDB"
    }

    try {
        const data =  await Post.find();
        res.render('index', { 
            locals,
            data,
            currentRoute : '/'
        });
    } catch (error) {
        console.log(error);
    }

});


router.get('/post/:id', async (req, res) => {
        try {
        let slug = req.params.id;
        const data =  await Post.findById({ _id: slug});

        const locals = {
            title: data.title,
            description:  "Simple Blog created with nodejs, express, mongoDB"
        }

        res.render('post', { 
            locals,
            data , 
            currentRoute : `/post/${slug}`
        });
    } catch (error) {
        console.log(error);
    }
});




router.post('/search', async (req, res) => {
    try {
   
    const locals = {
        title: "search",
        description:  "Simple Blog created with nodejs, express, mongoDB"
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g,"")
    
    const data =  await Post.find({
        $or : [
            {title : {$regex : new RegExp(searchNoSpecialChar, 'i')}},
            {body : {$regex : new RegExp(searchNoSpecialChar, 'i')}}
        ]

    });
    res.render("search", { data, locals });
} catch (error) {
    console.log(error);
}
});


router.get('/about', (req, res) => {
    res.render('about', {
    currentRoute : '/about'
});
});



module.exports = router;


// function insertPostData() {
//     Post.insertMany([
//         {
//             title: "Building a blog1",
//             body: "This is the body text"
//         },
//         {
//             title: "Building a blog2",
//             body: "This is the body text"
//         },
//         {
//             title: "Building a blog3",
//             body: "This is the body text"
//         },
//     ])
// }

// insertPostData();