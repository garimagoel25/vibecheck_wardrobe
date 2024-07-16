const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// AWS S3 configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Models
const User = require('./models/User');
const WardrobeItem = require('./models/WardrobeItem');
const Review = require('./models/Review');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file;
  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `wardrobe/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ACL: 'public-read',
  };

  try {
    const data = await s3.upload(s3Params).promise();
    res.status(200).send({ imageUrl: data.Location });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/wardrobe', async (req, res) => {
  const { userId, imageUrl, description } = req.body;

  const newItem = new WardrobeItem({
    userId,
    imageUrl,
    description,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).send(savedItem);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/wardrobe', async (req, res) => {
  try {
    const items = await WardrobeItem.find().populate('userId').exec();
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/review', async (req, res) => {
  const { wardrobeItemId, userId, comment, rating } = req.body;

  const newReview = new Review({
    wardrobeItemId,
    userId,
    comment,
    rating,
  });

  try {
    const savedReview = await newReview.save();
    res.status(201).send(savedReview);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
