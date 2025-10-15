const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const User = require('./model/User');
const connectToMongo = require('./db');
const app = express();

connectToMongo();

app.use(cors());
app.use(bodyParser.json());

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpzglyra";

app.post("/register", async (req, res) => {
  const { username, email, mobile, gender, city, jobCategory } = req.body;
  const user = new User({ username, email, mobile, gender, city, jobCategory });
  await user.save();

  try {
    await axios.post(
      FORMSPREE_ENDPOINT,
      {
        username,
        email,
        mobile,
        gender,
        city,
        jobCategory,
        _subject: "New User Registration",
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending to Formspree:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to send email notification" });
  }
});

app.get('/jobs', async (req, res) => {
  // Dummy jobs
  const allJobs = [
  // DRIVER
  [
    {
      title: "Personal Driver",
      description: "Driving employer’s personal car safely and on time.",
      category: "Driver",
      image: "https://cdn.vectorstock.com/i/750p/72/09/driver-car-design-vector-7607209.avif",
    },
    {
      title: "Truck Driver",
      description: "Transporting goods across cities safely.",
      category: "Driver",
      image: "https://cdn.vectorstock.com/i/750p/72/09/driver-car-design-vector-7607209.avif",
    },
    {
      title: "Taxi Driver",
      description: "Driving customers to their destinations.",
      category: "Driver",
      image: "https://cdn.vectorstock.com/i/750p/72/09/driver-car-design-vector-7607209.avif",
    },
    {
      title: "Bus Driver",
      description: "Driving school or office buses.",
      category: "Driver",
      image: "https://cdn.vectorstock.com/i/750p/72/09/driver-car-design-vector-7607209.avif",
    },
    {
      title: "Delivery Van Driver",
      description: "Delivering items in a small commercial van.",
      category: "Driver",
      image: "https://cdn.vectorstock.com/i/750p/72/09/driver-car-design-vector-7607209.avif",
    },
  ],

  // HELPER
  [
    {
      title: "Shop Helper",
      description: "Assisting customers and managing stock in shop.",
      category: "Helper",
      image: "https://cdn-icons-png.flaticon.com/512/7571/7571603.png",
    },
    {
      title: "Loading Helper",
      description: "Helping in loading/unloading materials.",
      category: "Helper",
      image: "https://cdn-icons-png.flaticon.com/512/7571/7571603.png",
    },
    {
      title: "Kitchen Helper",
      description: "Assisting cook in chopping, cleaning and serving.",
      category: "Helper",
      image: "https://cdn-icons-png.flaticon.com/512/7571/7571603.png",
    },
    {
      title: "Mechanic Helper",
      description: "Helping senior mechanic in repairs.",
      category: "Helper",
      image: "https://cdn-icons-png.flaticon.com/512/7571/7571603.png",
    },
    {
      title: "Construction Helper",
      description: "Assisting workers in construction work.",
      category: "Helper",
      image: "https://cdn-icons-png.flaticon.com/512/7571/7571603.png",
    },
  ],

  // CLEANER
  [
    {
      title: "Home Cleaner",
      description: "Cleaning houses and apartments.",
      category: "Cleaner",
      image: "https://www.shutterstock.com/image-vector/cleaning-service-design-house-broom-600nw-2486911437.jpg",
    },
    {
      title: "Office Cleaner",
      description: "Keeping office premises tidy and clean.",
      category: "Cleaner",
      image: "https://www.shutterstock.com/image-vector/cleaning-service-design-house-broom-600nw-2486911437.jpg",
    },
    {
      title: "Hospital Cleaner",
      description: "Maintaining hygiene in hospitals.",
      category: "Cleaner",
      image: "https://www.shutterstock.com/image-vector/cleaning-service-design-house-broom-600nw-2486911437.jpg",
    },
    {
      title: "School Cleaner",
      description: "Cleaning classrooms and corridors.",
      category: "Cleaner",
      image: "https://www.shutterstock.com/image-vector/cleaning-service-design-house-broom-600nw-2486911437.jpg",
    },
    {
      title: "Mall Cleaner",
      description: "Maintaining cleanliness in malls.",
      category: "Cleaner",
      image: "https://www.shutterstock.com/image-vector/cleaning-service-design-house-broom-600nw-2486911437.jpg",
    },
  ],

  // SECURITY
  [
    {
      title: "Night Security Guard",
      description: "Guarding premises during night shifts.",
      category: "Security",
      image: "https://i.pinimg.com/474x/03/1d/95/031d950dd5aeb1e8943f52629d1f1582.jpg",
    },
    {
      title: "Mall Security",
      description: "Ensuring security in shopping centers.",
      category: "Security",
      image: "https://i.pinimg.com/474x/03/1d/95/031d950dd5aeb1e8943f52629d1f1582.jpg",
    },
    {
      title: "Office Security Guard",
      description: "Checking visitor entries in offices.",
      category: "Security",
      image: "https://i.pinimg.com/474x/03/1d/95/031d950dd5aeb1e8943f52629d1f1582.jpg",
    },
    {
      title: "Residential Security",
      description: "Monitoring entry at apartment gates.",
      category: "Security",
      image: "https://i.pinimg.com/474x/03/1d/95/031d950dd5aeb1e8943f52629d1f1582.jpg",
    },
    {
      title: "Event Security",
      description: "Managing crowd control during events.",
      category: "Security",
      image: "https://i.pinimg.com/474x/03/1d/95/031d950dd5aeb1e8943f52629d1f1582.jpg",
    },
  ],

  // DELIVERY
  [
    {
      title: "Food Delivery Boy",
      description: "Delivering food orders to customers.",
      category: "Delivery",
      image: "https://static.vecteezy.com/system/resources/previews/049/212/203/non_2x/bike-delivery-logo-icon-vector.jpg",
    },
    {
      title: "Parcel Delivery Executive",
      description: "Delivering e-commerce parcels.",
      category: "Delivery",
      image: "https://static.vecteezy.com/system/resources/previews/049/212/203/non_2x/bike-delivery-logo-icon-vector.jpg",
    },
    {
      title: "Medicine Delivery",
      description: "Delivering medicines from pharmacy.",
      category: "Delivery",
      image: "https://static.vecteezy.com/system/resources/previews/049/212/203/non_2x/bike-delivery-logo-icon-vector.jpg",
    },
    {
      title: "Courier Staff",
      description: "Collecting and delivering packages.",
      category: "Delivery",
      image: "https://static.vecteezy.com/system/resources/previews/049/212/203/non_2x/bike-delivery-logo-icon-vector.jpg",
    },
    {
      title: "Grocery Delivery",
      description: "Delivering groceries to homes.",
      category: "Delivery",
      image: "https://static.vecteezy.com/system/resources/previews/049/212/203/non_2x/bike-delivery-logo-icon-vector.jpg",
    },
  ],
];

 // Flatten the nested job arrays
  const flatJobs = allJobs.flat();

  // Get and sanitize query param (convert to lowercase)
  const categoryQuery = req.query.category
    ? req.query.category.trim().toLowerCase()
    : null;

  // Filter jobs based on category if provided
  const filteredJobs = categoryQuery
    ? flatJobs.filter(
        (job) => job.category && job.category.trim().toLowerCase() === categoryQuery
      )
    : flatJobs;

  // If no jobs found for the category, send a message
  if (categoryQuery && filteredJobs.length === 0) {
    return res.status(404).json({
      message: `No jobs found for category "${req.query.category}"`,
      availableCategories: [
        ...new Set(flatJobs.map((job) => job.category)),
      ],
    });
  }

  // Return filtered or all jobs
  res.json(filteredJobs);
});

app.listen(3000, () => console.log('Server on port 3000'));
