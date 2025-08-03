const express = require('express');
const router = express.Router();

const userMiddleware=require("../middlewares/user-middleware");
const imageMiddleware=require("../middlewares/image-middleware");

const userController = require('../controllers/user-controller');
const postController = require('../controllers/post-controller');

// User routes
router.post('/user/create-user', userController.createUser);
router.post('/user/user-login', userController.userLogin);

router.put('/user/update-user-profile',imageMiddleware.upload,userMiddleware.isUser, userController.updateUserProfile);
router.get('/user/get-user-details',userMiddleware.isUser,userController.getUserProfile);

// Post routes
router.post('/post/create-post', userMiddleware.isUser, postController.createPost);
router.get('/post/get-post-details/:id', postController.getPostDetails);
router.get('/post/user-all-posts', userMiddleware.isUser, postController.userAllPost);
router.get('/post/all-posts', postController.getAllPost);
router.put('/post/update-post/:id',userMiddleware.isUser, postController.updatePost);
router.delete('/post/delete-post/:id', userMiddleware.isUser, postController.deletePost);


module.exports = router;