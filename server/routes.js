// routes.js
const express = require("express");
const multer = require('multer');
const router = express.Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { login, signUp, verifyCode, logout, authenticateToken } = require("./controllers/user_controller");
const { addContact, getContact , getContactByID,deleteContact} = require("./controllers/contact_controller");
const { addPost, updatePost, getPost, deletePost, getPostByID, uploadFile } = require('./controllers/actual_controller');
const { addEx, updateEx, getEx, deleteEx, getExByID , deleteExFile} = require('./controllers/exercice_controller');
const { addMethode, updateMethode, getMethode, deleteMethode, getMethodeByID } = require('./controllers/methode_controller');
const { addQuiNous, updateQuiNous, getQuiNous, deleteQuiNous, getQuiNousByID } = require('./controllers/quinous_controller');
const { addTarif, updateTarif, getTarif, deleteTarif, getTarifByID } = require('./controllers/tarif_controller');
const { addQui, updateQui, getQui, deleteQui, getQuiByID, addQuiSec,
  updateQuiSec,
  getQuiSec, getQuiSecByID,
  deleteQuiSec } = require('./controllers/qui_controller');
const { updateSlides,
  getSlides, getSlidesByID, addSection, updateSection, getSection, getSectionByID, deleteSection, addBio, updateBio, getBio, getBioByID,
  addSlides,
  addSSection,
  updateSSection,
  getSSection,
  getSSectionByID,
  deleteSSection, deleteFile } = require('./controllers/home_controller');


// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../web/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4();
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueFilename + fileExtension);
  }
});
const fileFilter = (req, file, cb) => {
  // Allow only certain file types, adjust as needed
  const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.gif'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (allowedFileTypes.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};
const fileFilter2 = (req, file, cb) => {
  // Allow only certain file types, adjust as needed
  const allowedFileTypes = ['.doc', '.pdf', '.docx'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (allowedFileTypes.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

const uploadMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter
});
const upload = multer({
  storage: storage,
  fileFilter: fileFilter2
});




//user API
router.post("/login", login);
router.post("/signup", signUp);
router.post('/verifycode', verifyCode);
router.get('/logout', logout);
router.get('/loggedIn', authenticateToken);

//home API
router.post('/slides', addSlides)
router.put('/slides', updateSlides);
router.get('/slides', getSlides);
router.get('/slides/:id', getSlidesByID);
router.post('/bio', addBio)
router.put('/bio', updateBio);
router.get('/bio', getBio);
router.get('/bio/:id', getBioByID);
router.post('/section', uploadMiddleware.array('files', 10), addSection);
router.put('/section', uploadMiddleware.array('files', 10), updateSection);
router.delete('/section/:id', deleteSection);
router.delete('/file/:id', deleteFile);
router.get('/section', getSection);
router.get('/section/:id', getSectionByID);
router.post('/ssection', uploadMiddleware.single('file'), addSSection);
router.put('/ssection', uploadMiddleware.single('file'), updateSSection);
router.delete('/ssection/:id', deleteSSection);
router.get('/ssection', getSSection);
router.get('/ssection/:id', getSSectionByID);

//post API
router.post('/post', uploadMiddleware.single('file'), addPost);
router.put('/post', uploadMiddleware.single('file'), updatePost);
router.delete('/post/:id', deletePost);
router.get('/post', getPost);
router.get('/post/:id', getPostByID);
router.post('/upload', upload.single('file'), uploadFile);

//methode API
router.post('/meth', uploadMiddleware.single('file'), addMethode);
router.put('/meth', uploadMiddleware.single('file'), updateMethode);
router.delete('/meth/:id', deleteMethode);
router.get('/meth', getMethode);
router.get('/meth/:id', getMethodeByID);

// à qui API
router.post('/qui', uploadMiddleware.single('file'), addQui);
router.put('/qui', uploadMiddleware.single('file'), updateQui);
router.delete('/qui/:id', deleteQui);
router.get('/qui', getQui);
router.get('/qui/:id', getQuiByID);
router.post('/quisec', addQuiSec);
router.put('/quisec', updateQuiSec);
router.delete('/quisec/:id', deleteQuiSec);
router.get('/quisec', getQuiSec);
router.get('/quisec/:id', getQuiSecByID);

//qui nous API
router.post('/quinous', uploadMiddleware.single('file'), addQuiNous);
router.put('/quinous', uploadMiddleware.single('file'), updateQuiNous);
router.delete('/quinous/:id', deleteQuiNous);
router.get('/quinous', getQuiNous);
router.get('/quinous/:id', getQuiNousByID);

//tarifs API
router.post('/tarif', addTarif);
router.put('/tarif', updateTarif);
router.delete('/tarif/:id', deleteTarif);
router.get('/tarif', getTarif);
router.get('/tarif/:id', getTarifByID);

//exercice API
router.post('/ex', uploadMiddleware.array('files', 10), addEx);
router.put('/ex', uploadMiddleware.array('files', 10), updateEx);
router.delete('/ex/:id', deleteEx);
router.delete('/exfile/:id', deleteExFile);
router.get('/ex', getEx);
router.get('/ex/:id', getExByID);

//contact API
router.post('/contact', addContact);
router.get('/contact', getContact);
//router.get('/contact/:id', getContactByID);
router.delete('/contact/:id', deleteContact);

module.exports = router;
