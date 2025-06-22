import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Destination from '../models/Destination';
import User from '../models/User';

// Load environment variables
dotenv.config();

const sampleDestinations = [
  {
    name: "Goa Beaches",
    description: "Goa is a state in western India with coastlines stretching along the Arabian Sea. Its long history as a Portuguese colony prior to 1961 is evident in its preserved 17th-century churches and the area's tropical spice plantations. Goa is also known for its beaches, ranging from popular stretches at Baga and Palolem to those in laid-back fishing villages such as Agonda.",
    shortDescription: "Tropical beach paradise with Portuguese heritage and vibrant nightlife",
    country: "India",
    state: "Goa",
    city: "Panaji",
    region: "Western India",
    coordinates: {
      latitude: 15.2993,
      longitude: 74.1240
    },
    category: "beach",
    popularityScore: 85,
    climate: {
      type: "tropical",
      bestVisitMonths: ["November", "December", "January", "February", "March"],
      averageTemperature: {
        min: 20,
        max: 32
      },
      rainfallPattern: "Heavy monsoon from June to September"
    },
    attractions: [
      {
        name: "Baga Beach",
        type: "Beach",
        description: "Popular beach known for water sports and nightlife",
        entryFee: 0,
        timings: "24 hours",
        rating: 4.2
      },
      {
        name: "Basilica of Bom Jesus",
        type: "Heritage",
        description: "UNESCO World Heritage Site and famous church",
        entryFee: 5,
        timings: "9:00 AM - 6:30 PM",
        rating: 4.5
      }
    ],
    accommodation: {
      budget: {
        available: true,
        priceRange: { min: 800, max: 2000 },
        options: ["Hostels", "Guest Houses", "Budget Hotels"]
      },
      midRange: {
        available: true,
        priceRange: { min: 2000, max: 8000 },
        options: ["3-star Hotels", "Beach Resorts", "Boutique Hotels"]
      },
      luxury: {
        available: true,
        priceRange: { min: 8000, max: 25000 },
        options: ["5-star Resorts", "Luxury Villas", "Heritage Hotels"]
      }
    },
    transportation: {
      nearestAirport: {
        name: "Goa International Airport",
        code: "GOI",
        distance: 29
      },
      nearestRailway: {
        name: "Madgaon Railway Station",
        distance: 15
      },
      roadConnectivity: {
        highways: ["NH-66", "NH-4A"],
        accessibility: "excellent"
      },
      localTransport: ["Buses", "Taxis", "Auto-rickshaws", "Bike rentals"]
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
        alt: "Beautiful Goa beach with palm trees",
        category: "landscape",
        isPrimary: true
      },
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        alt: "Basilica of Bom Jesus",
        category: "attraction",
        isPrimary: false
      }
    ],
    videos: [
      {
        url: "https://example.com/goa-video",
        title: "Discover Goa - Beach Paradise",
        duration: 180,
        type: "promotional"
      }
    ],
    languages: ["English", "Hindi", "Konkani", "Marathi"],
    currency: "INR",
    timeZone: "Asia/Kolkata",
    tags: ["beach", "nightlife", "heritage", "water sports", "seafood"],
    seoData: {
      metaTitle: "Goa Beaches - Tropical Paradise in India",
      metaDescription: "Discover the beautiful beaches of Goa with pristine coastlines, vibrant nightlife, and rich Portuguese heritage.",
      keywords: ["goa", "beaches", "india", "travel", "vacation", "tropical"],
      slug: "goa-beaches"
    },
    statistics: {
      totalVisitors: 150000,
      averageStayDuration: 4.5,
      peakSeason: ["December", "January", "February"],
      offSeason: ["June", "July", "August", "September"]
    },
    rating: {
      average: 4.3,
      totalReviews: 1250,
      distribution: {
        5: 520,
        4: 480,
        3: 180,
        2: 50,
        1: 20
      }
    },
    reviews: [],
    packages: [],
    isActive: true,
    isFeatured: true,
    isPopular: true
  },
  {
    name: "Manali Hill Station",
    description: "Manali is a high-altitude Himalayan resort town in India's northern Himachal Pradesh state. It has a reputation as a backpacking center and honeymoon destination. Set on the Beas River, it's a gateway for skiing in the Solang Valley and trekking in Parvati Valley. It's also a jumping-off point for paragliding, rafting and mountaineering in the Pir Panjal mountains.",
    shortDescription: "Scenic Himalayan hill station perfect for adventure and relaxation",
    country: "India",
    state: "Himachal Pradesh",
    city: "Manali",
    region: "Northern India",
    coordinates: {
      latitude: 32.2396,
      longitude: 77.1887
    },
    category: "hill-station",
    popularityScore: 78,
    climate: {
      type: "temperate",
      bestVisitMonths: ["March", "April", "May", "June", "October", "November"],
      averageTemperature: {
        min: -2,
        max: 25
      },
      rainfallPattern: "Moderate rainfall during monsoon season"
    },
    attractions: [
      {
        name: "Solang Valley",
        type: "Adventure",
        description: "Famous for skiing, paragliding, and zorbing",
        entryFee: 0,
        timings: "6:00 AM - 6:00 PM",
        rating: 4.4
      },
      {
        name: "Rohtang Pass",
        type: "Mountain Pass",
        description: "High mountain pass with stunning views",
        entryFee: 50,
        timings: "6:00 AM - 5:00 PM",
        rating: 4.6
      }
    ],
    accommodation: {
      budget: {
        available: true,
        priceRange: { min: 600, max: 1500 },
        options: ["Hostels", "Guest Houses", "Budget Hotels"]
      },
      midRange: {
        available: true,
        priceRange: { min: 1500, max: 6000 },
        options: ["3-star Hotels", "Mountain Resorts", "Cottages"]
      },
      luxury: {
        available: true,
        priceRange: { min: 6000, max: 20000 },
        options: ["5-star Resorts", "Luxury Cottages", "Heritage Hotels"]
      }
    },
    transportation: {
      nearestAirport: {
        name: "Kullu-Manali Airport",
        code: "KUU",
        distance: 50
      },
      nearestRailway: {
        name: "Joginder Nagar Railway Station",
        distance: 165
      },
      roadConnectivity: {
        highways: ["NH-3"],
        accessibility: "good"
      },
      localTransport: ["Buses", "Taxis", "Auto-rickshaws"]
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        alt: "Manali mountain landscape",
        category: "landscape",
        isPrimary: true
      }
    ],
    videos: [],
    languages: ["English", "Hindi", "Himachali"],
    currency: "INR",
    timeZone: "Asia/Kolkata",
    tags: ["mountains", "adventure", "skiing", "trekking", "honeymoon"],
    seoData: {
      metaTitle: "Manali - Himalayan Hill Station Adventure",
      metaDescription: "Experience the beauty of Manali with adventure sports, scenic mountains, and perfect weather for a memorable vacation.",
      keywords: ["manali", "himachal", "mountains", "adventure", "skiing"],
      slug: "manali-hill-station"
    },
    statistics: {
      totalVisitors: 120000,
      averageStayDuration: 3.5,
      peakSeason: ["April", "May", "June"],
      offSeason: ["January", "February"]
    },
    rating: {
      average: 4.1,
      totalReviews: 980,
      distribution: {
        5: 420,
        4: 380,
        3: 120,
        2: 40,
        1: 20
      }
    },
    reviews: [],
    packages: [],
    isActive: true,
    isFeatured: true,
    isPopular: true
  },
  {
    name: "Kerala Backwaters",
    description: "Kerala, a state on India's tropical Malabar Coast, has nearly 600km of Arabian Sea shoreline. It's known for its palm-lined beaches and backwaters, a network of canals. Inland are the Western Ghats, mountains whose slopes support tea, coffee and spice plantations as well as wildlife preserves.",
    shortDescription: "Serene backwaters, lush greenery, and traditional houseboats",
    country: "India",
    state: "Kerala",
    city: "Alleppey",
    region: "Southern India",
    coordinates: {
      latitude: 9.4981,
      longitude: 76.3388
    },
    category: "cultural",
    popularityScore: 82,
    climate: {
      type: "tropical",
      bestVisitMonths: ["October", "November", "December", "January", "February", "March"],
      averageTemperature: {
        min: 23,
        max: 32
      },
      rainfallPattern: "Heavy monsoon from June to September"
    },
    attractions: [
      {
        name: "Alleppey Backwaters",
        type: "Natural",
        description: "Network of lagoons and lakes lying parallel to the coast",
        entryFee: 0,
        timings: "24 hours",
        rating: 4.7
      },
      {
        name: "Kumarakom Bird Sanctuary",
        type: "Wildlife",
        description: "Bird sanctuary spread across 14 acres",
        entryFee: 30,
        timings: "6:00 AM - 6:00 PM",
        rating: 4.3
      }
    ],
    accommodation: {
      budget: {
        available: true,
        priceRange: { min: 1000, max: 2500 },
        options: ["Homestays", "Budget Hotels", "Guest Houses"]
      },
      midRange: {
        available: true,
        priceRange: { min: 2500, max: 8000 },
        options: ["Houseboats", "Resort Hotels", "Heritage Hotels"]
      },
      luxury: {
        available: true,
        priceRange: { min: 8000, max: 30000 },
        options: ["Luxury Houseboats", "5-star Resorts", "Ayurveda Resorts"]
      }
    },
    transportation: {
      nearestAirport: {
        name: "Cochin International Airport",
        code: "COK",
        distance: 85
      },
      nearestRailway: {
        name: "Alleppey Railway Station",
        distance: 4
      },
      roadConnectivity: {
        highways: ["NH-66", "SH-40"],
        accessibility: "excellent"
      },
      localTransport: ["Buses", "Auto-rickshaws", "Boats", "Taxis"]
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
        alt: "Kerala backwaters with houseboat",
        category: "landscape",
        isPrimary: true
      }
    ],
    videos: [],
    languages: ["English", "Malayalam", "Hindi", "Tamil"],
    currency: "INR",
    timeZone: "Asia/Kolkata",
    tags: ["backwaters", "houseboats", "nature", "ayurveda", "spices"],
    seoData: {
      metaTitle: "Kerala Backwaters - God's Own Country",
      metaDescription: "Experience the tranquil backwaters of Kerala with traditional houseboats, lush landscapes, and authentic cultural experiences.",
      keywords: ["kerala", "backwaters", "houseboats", "alleppey", "nature"],
      slug: "kerala-backwaters"
    },
    statistics: {
      totalVisitors: 95000,
      averageStayDuration: 3.0,
      peakSeason: ["December", "January", "February"],
      offSeason: ["June", "July", "August"]
    },
    rating: {
      average: 4.5,
      totalReviews: 850,
      distribution: {
        5: 450,
        4: 280,
        3: 90,
        2: 20,
        1: 10
      }
    },
    reviews: [],
    packages: [],
    isActive: true,
    isFeatured: true,
    isPopular: false
  },
  {
    name: "Rajasthan Desert Safari",
    description: "Rajasthan is a northern Indian state bordering Pakistan. Its palaces and forts are reminders of the many kingdoms that historically vied for the region. In its capital, Jaipur (the 'Pink City'), are the 18th-century City Palace and Hawa Mahal, a former cloister for royal women, fronted by a 5-story pink sandstone screen.",
    shortDescription: "Royal palaces, desert adventures, and vibrant cultural heritage",
    country: "India",
    state: "Rajasthan",
    city: "Jaisalmer",
    region: "Northern India",
    coordinates: {
      latitude: 26.9157,
      longitude: 70.9083
    },
    category: "adventure",
    popularityScore: 75,
    climate: {
      type: "arid",
      bestVisitMonths: ["October", "November", "December", "January", "February", "March"],
      averageTemperature: {
        min: 5,
        max: 45
      },
      rainfallPattern: "Very low rainfall, mostly during monsoon"
    },
    attractions: [
      {
        name: "Jaisalmer Fort",
        type: "Heritage",
        description: "Living fort with shops, hotels and ancient havelis",
        entryFee: 30,
        timings: "9:00 AM - 6:00 PM",
        rating: 4.6
      },
      {
        name: "Sam Sand Dunes",
        type: "Natural",
        description: "Desert dunes perfect for camel safari",
        entryFee: 0,
        timings: "24 hours",
        rating: 4.4
      }
    ],
    accommodation: {
      budget: {
        available: true,
        priceRange: { min: 800, max: 2000 },
        options: ["Desert Camps", "Budget Hotels", "Guest Houses"]
      },
      midRange: {
        available: true,
        priceRange: { min: 2000, max: 7000 },
        options: ["Heritage Hotels", "Desert Resorts", "Haveli Hotels"]
      },
      luxury: {
        available: true,
        priceRange: { min: 7000, max: 25000 },
        options: ["Palace Hotels", "Luxury Desert Camps", "Heritage Palaces"]
      }
    },
    transportation: {
      nearestAirport: {
        name: "Jaisalmer Airport",
        code: "JSA",
        distance: 17
      },
      nearestRailway: {
        name: "Jaisalmer Railway Station",
        distance: 2
      },
      roadConnectivity: {
        highways: ["NH-11", "SH-11"],
        accessibility: "good"
      },
      localTransport: ["Buses", "Taxis", "Auto-rickshaws", "Camel carts"]
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
        alt: "Rajasthan desert with camels",
        category: "landscape",
        isPrimary: true
      }
    ],
    videos: [],
    languages: ["English", "Hindi", "Rajasthani"],
    currency: "INR",
    timeZone: "Asia/Kolkata",
    tags: ["desert", "heritage", "palaces", "camel safari", "culture"],
    seoData: {
      metaTitle: "Rajasthan Desert Safari - Royal Heritage Experience",
      metaDescription: "Explore the golden deserts of Rajasthan with camel safaris, magnificent palaces, and rich cultural heritage.",
      keywords: ["rajasthan", "desert", "jaisalmer", "camel safari", "heritage"],
      slug: "rajasthan-desert-safari"
    },
    statistics: {
      totalVisitors: 80000,
      averageStayDuration: 2.5,
      peakSeason: ["November", "December", "January", "February"],
      offSeason: ["May", "June", "July", "August"]
    },
    rating: {
      average: 4.2,
      totalReviews: 720,
      distribution: {
        5: 320,
        4: 250,
        3: 100,
        2: 30,
        1: 20
      }
    },
    reviews: [],
    packages: [],
    isActive: true,
    isFeatured: false,
    isPopular: true
  }
];

async function seedDestinations() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI);
    console.log('🍃 Connected to MongoDB');

    // Find an admin user to assign as creator
    let adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      // Create an admin user if none exists
      adminUser = new User({
        name: 'Admin User',
        email: 'admin@tmkoc.com',
        password: 'admin123', // This will be hashed by the pre-save middleware
        role: 'admin'
      });
      await adminUser.save();
      console.log('✅ Created admin user');
    }

    // Clear existing destinations
    await Destination.deleteMany({});
    console.log('🗑️ Cleared existing destinations');

    // Add creator and updater fields to destinations
    const destinationsWithCreator = sampleDestinations.map(dest => ({
      ...dest,
      createdBy: adminUser!._id,
      updatedBy: adminUser!._id
    }));

    // Insert sample destinations
    const insertedDestinations = await Destination.insertMany(destinationsWithCreator);
    console.log(`✅ Inserted ${insertedDestinations.length} destinations`);

    console.log('🎉 Seed completed successfully!');
    
    // Log the created destinations
    insertedDestinations.forEach(dest => {
      console.log(`- ${dest.name} (${dest.category})`);
    });

  } catch (error) {
    console.error('❌ Error seeding destinations:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seed function
if (require.main === module) {
  seedDestinations();
}

export default seedDestinations;
