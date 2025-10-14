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
      image: "https://cdn.pixabay.com/photo/2016/11/29/09/32/auto-1868726_1280.jpg",
    },
    {
      title: "Truck Driver",
      description: "Transporting goods across cities safely.",
      category: "Driver",
      image: "https://cdn.pixabay.com/photo/2016/11/18/15/47/truck-1838781_1280.jpg",
    },
    {
      title: "Taxi Driver",
      description: "Driving customers to their destinations.",
      category: "Driver",
      image: "https://cdn.pixabay.com/photo/2016/11/21/15/41/taxi-1845650_1280.jpg",
    },
    {
      title: "Bus Driver",
      description: "Driving school or office buses.",
      category: "Driver",
      image: "https://cdn.pixabay.com/photo/2017/09/02/18/20/bus-2700000_1280.jpg",
    },
    {
      title: "Delivery Van Driver",
      description: "Delivering items in a small commercial van.",
      category: "Driver",
      image: "https://cdn.pixabay.com/photo/2017/06/20/19/22/delivery-2420631_1280.jpg",
    },
  ],

  // HELPER
  [
    {
      title: "Shop Helper",
      description: "Assisting customers and managing stock in shop.",
      category: "Helper",
      image: "https://cdn.pixabay.com/photo/2016/03/26/13/09/cleaning-1287693_1280.jpg",
    },
    {
      title: "Loading Helper",
      description: "Helping in loading/unloading materials.",
      category: "Helper",
      image: "https://cdn.pixabay.com/photo/2016/11/29/12/54/truck-1866583_1280.jpg",
    },
    {
      title: "Kitchen Helper",
      description: "Assisting cook in chopping, cleaning and serving.",
      category: "Helper",
      image: "https://cdn.pixabay.com/photo/2017/06/13/11/39/kitchen-2394227_1280.jpg",
    },
    {
      title: "Mechanic Helper",
      description: "Helping senior mechanic in repairs.",
      category: "Helper",
      image: "https://cdn.pixabay.com/photo/2016/03/27/19/40/auto-repair-1281692_1280.jpg",
    },
    {
      title: "Construction Helper",
      description: "Assisting workers in construction work.",
      category: "Helper",
      image: "https://cdn.pixabay.com/photo/2017/01/29/15/42/construction-2016590_1280.jpg",
    },
  ],

  // CLEANER
  [
    {
      title: "Home Cleaner",
      description: "Cleaning houses and apartments.",
      category: "Cleaner",
      image: "https://cdn.pixabay.com/photo/2015/11/06/13/08/cleaning-1022469_1280.jpg",
    },
    {
      title: "Office Cleaner",
      description: "Keeping office premises tidy and clean.",
      category: "Cleaner",
      image: "https://cdn.pixabay.com/photo/2016/03/09/15/10/office-1245776_1280.jpg",
    },
    {
      title: "Hospital Cleaner",
      description: "Maintaining hygiene in hospitals.",
      category: "Cleaner",
      image: "https://cdn.pixabay.com/photo/2015/07/10/17/46/hospital-839422_1280.jpg",
    },
    {
      title: "School Cleaner",
      description: "Cleaning classrooms and corridors.",
      category: "Cleaner",
      image: "https://cdn.pixabay.com/photo/2016/03/27/22/22/school-1281693_1280.jpg",
    },
    {
      title: "Mall Cleaner",
      description: "Maintaining cleanliness in malls.",
      category: "Cleaner",
      image: "https://cdn.pixabay.com/photo/2017/01/06/20/40/mall-1956413_1280.jpg",
    },
  ],

  // SECURITY
  [
    {
      title: "Night Security Guard",
      description: "Guarding premises during night shifts.",
      category: "Security",
      image: "https://cdn.pixabay.com/photo/2016/07/31/18/22/security-1561947_1280.jpg",
    },
    {
      title: "Mall Security",
      description: "Ensuring security in shopping centers.",
      category: "Security",
      image: "https://cdn.pixabay.com/photo/2016/08/11/08/44/security-1583656_1280.jpg",
    },
    {
      title: "Office Security Guard",
      description: "Checking visitor entries in offices.",
      category: "Security",
      image: "https://cdn.pixabay.com/photo/2015/09/05/20/02/security-925336_1280.jpg",
    },
    {
      title: "Residential Security",
      description: "Monitoring entry at apartment gates.",
      category: "Security",
      image: "https://cdn.pixabay.com/photo/2016/06/17/06/18/security-1467266_1280.jpg",
    },
    {
      title: "Event Security",
      description: "Managing crowd control during events.",
      category: "Security",
      image: "https://cdn.pixabay.com/photo/2017/03/27/15/34/event-2170491_1280.jpg",
    },
  ],

  // DELIVERY
  [
    {
      title: "Food Delivery Boy",
      description: "Delivering food orders to customers.",
      category: "Delivery",
      image: "https://cdn.pixabay.com/photo/2017/05/31/08/46/delivery-2357301_1280.jpg",
    },
    {
      title: "Parcel Delivery Executive",
      description: "Delivering e-commerce parcels.",
      category: "Delivery",
      image: "https://cdn.pixabay.com/photo/2016/11/21/15/47/delivery-1845880_1280.jpg",
    },
    {
      title: "Medicine Delivery",
      description: "Delivering medicines from pharmacy.",
      category: "Delivery",
      image: "https://cdn.pixabay.com/photo/2018/04/09/18/52/pharmacy-3307232_1280.jpg",
    },
    {
      title: "Courier Staff",
      description: "Collecting and delivering packages.",
      category: "Delivery",
      image: "https://cdn.pixabay.com/photo/2017/02/07/20/57/parcel-2040920_1280.jpg",
    },
    {
      title: "Grocery Delivery",
      description: "Delivering groceries to homes.",
      category: "Delivery",
      image: "https://cdn.pixabay.com/photo/2016/02/19/11/19/grocery-1206680_1280.jpg",
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
