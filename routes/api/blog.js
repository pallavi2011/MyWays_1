const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Blog = require('../../models/Blog');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './uploads/images');
    },
    filename: function(req, file, callback){
        callback(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
    limit: {
        fieldSize: 1024*1024*3,

    }
})
// @route POST /api/blog
// @desc Create a blog
router.post('/',upload.single('image'),[auth, [
    check('text','Text is required').not().isEmpty(),
    check('title','Title is required').not().isEmpty()
]],  async (req, res) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }

            try{
                const user = await User.findById(req.user.id).select('-password');

                const newBlog =  new Blog({
                    text: req.body.text,
                    name: user.name,
                    user: req.user.id,
                    title: req.body.title,
                    image: req.file.filename
            });

            const blog = await newBlog.save();
            res.json(blog);

            }catch(err){
                res.status(500).send('Server error');
            }

});


// @route GET /api/blog
// @desc Get all blogs
router.get('/',auth,  async (req, res) => {
    try{
        const blogs = await Blog.find().sort({ date: -1});
        res.json(blogs);
    }catch(err){
        res.status(500).send('Server error');
    }

});


// @route GET /api/blog
// @desc Get blog by id
router.get('/:id',auth,  async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({msg: 'Blog not found'})
        }
        res.json(blog);
    }catch(err){
        res.status(500).send('Server error');
    }

});


// @route DELETE /api/blog
// @desc delete blog by id
router.delete('/:id', auth,  async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({msg: 'Blog not Found'})
        }

        if(blog.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not Authorized'})
        }

        await blog.remove();
        res.json({msg: 'Blog Removed'});
    }catch(err){
        res.status(500).send('Server error');
    }

});


// @route PUT /api/blog
// @desc PUT like on a blog by id
router.put('/like/:id', auth, async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
    
        if(blog.likes.filter(like => like.user.toString() == req.user.id).length > 0){
            return res.status(400).json({msg: 'Blog already liked'})
        }

        blog.likes.unshift({ user: req.user.id});

        await blog.save();

        res.json(blog.likes);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
})


// @route PUT /api/blog
// @desc Unlike a blog
router.put('/unlike/:id', auth, async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
    
        if(blog.likes.filter(like => like.user.toString() == req.user.id).length === 0){
            return res.status(400).json({msg: 'Blog has not yet been liked'})
        }

        const removeIndex = blog.likes.map(like => like.user.toString()).indexOf(req.user.id)

        blog.likes.splice(removeIndex, 1);
        await blog.save();

        res.json(blog.likes);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
});

// @route POST /api/blog/comment/:id
// @desc comment on a blog
router.post('/comment/:id', [auth, [
    check('text','Text is required').not().isEmpty()
]],  async (req, res) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }

            try{
                const user = await User.findById(req.user.id).select('-password');
                const blog = await Blog.findById(req.params.id)

                const newComment = {
                    text: req.body.text,
                    name: user.name,
                    user: req.user.id,
                   
            };
            
            blog.comments.unshift(newComment);
            await blog.save();
            res.json(blog.comments);

            }catch(err){
                res.status(500).send('Server error');
            }

});

// @route DELETE /api/blog/comment/:id/:comment_id
// @desc Delete comment on a blog

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        const comment = blog.comments.find(comment => comment.id === req.params.comment_id);


        if(!comment){
            return res.status(404).json({msg: 'Comment not found'});
        }

        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized'});
        }
        const removeIndex = blog.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

        blog.comments.splice(removeIndex, 1);
        await blog.save();

        res.json(blog.comments);

    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;