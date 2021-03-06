const express = require('express')
const router = express.Router()
const img = require('../middleware/img')
const auth = require('../middleware/auth')

const { imgDetail, getImage, getImageByUser, deleteImageById, postImageToTwitter } = require('../controllers/food-controller.js')

router.get('/', (req, res) => {
    res.send('food - alive')
})

//  test case all middlewares and creating image object in imgdetail
router.post('/image', img.multer.single('file'), img.sendUploadToGCS, imgDetail)

router.get('/image', getImage)

router.get('/image/:userId', getImageByUser)

router.delete('/image/del/:imageId', deleteImageById)

router.post('/image/posttweet', postImageToTwitter)

module.exports = router;
