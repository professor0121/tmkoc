// test-blog-upload.js
// Test script for blog upload API endpoints

const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Test data
const testBlog = {
  title: 'Ultimate Guide to Himalayan Trekking',
  content: `
    # Ultimate Guide to Himalayan Trekking

    The Himalayas offer some of the most spectacular trekking experiences in the world. From the towering peaks of Everest to the serene valleys of Kashmir, there's something for every adventurer.

    ## Planning Your Trek

    ### Best Time to Visit
    - **Spring (March-May)**: Clear skies and blooming rhododendrons
    - **Autumn (September-November)**: Stable weather and excellent visibility
    - **Winter (December-February)**: Challenging but rewarding for experienced trekkers
    - **Monsoon (June-August)**: Generally avoided due to heavy rainfall

    ### Essential Gear
    1. **Clothing**
       - Layered clothing system
       - Waterproof jacket and pants
       - Insulated jacket for high altitudes
       - Trekking boots and gaiters

    2. **Equipment**
       - Sleeping bag rated for expected temperatures
       - Trekking poles
       - Headlamp with extra batteries
       - First aid kit

    ### Popular Trekking Routes

    #### Everest Base Camp Trek
    - **Duration**: 12-14 days
    - **Difficulty**: Moderate to challenging
    - **Maximum Altitude**: 5,364m
    - **Best Season**: March-May, September-November

    #### Annapurna Circuit
    - **Duration**: 15-20 days
    - **Difficulty**: Moderate
    - **Maximum Altitude**: 5,416m
    - **Highlights**: Diverse landscapes and cultures

    #### Manaslu Circuit
    - **Duration**: 14-18 days
    - **Difficulty**: Challenging
    - **Maximum Altitude**: 5,106m
    - **Features**: Less crowded, authentic experience

    ## Safety Considerations

    ### Altitude Sickness Prevention
    - Ascend gradually (no more than 500m per day above 3,000m)
    - Stay hydrated
    - Recognize symptoms early
    - Carry altitude sickness medication

    ### Weather Preparedness
    - Check weather forecasts regularly
    - Be prepared for sudden weather changes
    - Carry emergency shelter
    - Know evacuation routes

    ## Cultural Respect

    ### Local Customs
    - Dress modestly in villages
    - Ask permission before photographing people
    - Respect religious sites and practices
    - Support local communities

    ### Environmental Responsibility
    - Follow Leave No Trace principles
    - Carry out all waste
    - Use designated camping areas
    - Respect wildlife and vegetation

    ## Conclusion

    Himalayan trekking is a life-changing experience that requires proper preparation, respect for nature and culture, and a spirit of adventure. Whether you're a seasoned mountaineer or a first-time trekker, the Himalayas offer unforgettable memories and breathtaking beauty.

    Remember to trek responsibly, support local communities, and preserve these magnificent mountains for future generations.
  `,
  shortDescription: 'Complete guide to Himalayan trekking with tips, routes, and safety advice for adventurers of all levels.',
  category: 'adventure',
  tags: ['himalaya', 'trekking', 'adventure', 'mountains', 'travel-guide'],
  featuredImage: {
    url: 'https://example.com/images/himalayan-trek.jpg',
    alt: 'Himalayan mountains with trekkers'
  },
  seo: {
    metaTitle: 'Ultimate Himalayan Trekking Guide | TMKOC Tourism',
    metaDescription: 'Complete guide to Himalayan trekking with routes, safety tips, and cultural insights. Plan your adventure with expert advice.',
    keywords: ['himalaya', 'trekking', 'adventure', 'mountains', 'travel', 'guide', 'safety']
  },
  status: 'published'
};

// Admin credentials for testing
const adminCredentials = {
  email: 'admin@tmkoc.com',
  password: 'password123'
};

let authToken = '';

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (method, endpoint, data = null) => {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { 'Authorization': `Bearer ${authToken}` })
      },
      withCredentials: true
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error in ${method} ${endpoint}:`, error.response?.data || error.message);
    throw error;
  }
};

// Test functions
const testAdminLogin = async () => {
  console.log('\n🔐 Testing Admin Login...');
  try {
    const response = await makeAuthenticatedRequest('POST', '/auth/login', adminCredentials);
    console.log('✅ Admin login successful');
    console.log('User:', response.data.user.name, '- Role:', response.data.user.role);
    return true;
  } catch (error) {
    console.log('❌ Admin login failed');
    return false;
  }
};

const testCreateBlog = async () => {
  console.log('\n📝 Testing Blog Creation...');
  try {
    const response = await makeAuthenticatedRequest('POST', '/blogs', testBlog);
    console.log('✅ Blog created successfully');
    console.log('Blog ID:', response.data._id);
    console.log('Title:', response.data.title);
    console.log('Status:', response.data.status);
    console.log('Slug:', response.data.slug);
    return response.data._id;
  } catch (error) {
    console.log('❌ Blog creation failed');
    return null;
  }
};

const testGetAllBlogs = async () => {
  console.log('\n📚 Testing Get All Blogs (Admin)...');
  try {
    const response = await makeAuthenticatedRequest('GET', '/blogs?limit=5');
    console.log('✅ Retrieved blogs successfully');
    console.log('Total blogs:', response.data.total);
    console.log('Blogs in response:', response.data.blogs.length);
    
    if (response.data.blogs.length > 0) {
      console.log('First blog:', {
        title: response.data.blogs[0].title,
        status: response.data.blogs[0].status,
        category: response.data.blogs[0].category
      });
    }
    return true;
  } catch (error) {
    console.log('❌ Get all blogs failed');
    return false;
  }
};

const testUpdateBlogStatus = async (blogId) => {
  if (!blogId) return false;
  
  console.log('\n🔄 Testing Blog Status Update...');
  try {
    const response = await makeAuthenticatedRequest('PATCH', `/blogs/${blogId}/status`, {
      status: 'draft'
    });
    console.log('✅ Blog status updated successfully');
    console.log('New status:', response.data.status);
    return true;
  } catch (error) {
    console.log('❌ Blog status update failed');
    return false;
  }
};

const testGetBlogStatistics = async () => {
  console.log('\n📊 Testing Blog Statistics...');
  try {
    const response = await makeAuthenticatedRequest('GET', '/blogs/statistics');
    console.log('✅ Blog statistics retrieved successfully');
    console.log('Statistics:', {
      totalBlogs: response.data.totalBlogs,
      publishedBlogs: response.data.publishedBlogs,
      draftBlogs: response.data.draftBlogs,
      totalViews: response.data.totalViews,
      totalLikes: response.data.totalLikes
    });
    return true;
  } catch (error) {
    console.log('❌ Get blog statistics failed');
    return false;
  }
};

const testDeleteBlog = async (blogId) => {
  if (!blogId) return false;
  
  console.log('\n🗑️ Testing Blog Deletion...');
  try {
    const response = await makeAuthenticatedRequest('DELETE', `/blogs/${blogId}`);
    console.log('✅ Blog deleted successfully');
    console.log('Message:', response.message);
    return true;
  } catch (error) {
    console.log('❌ Blog deletion failed');
    return false;
  }
};

// Main test runner
const runTests = async () => {
  console.log('🚀 Starting Blog Upload API Tests...');
  console.log('=====================================');

  try {
    // Test admin login
    const loginSuccess = await testAdminLogin();
    if (!loginSuccess) {
      console.log('\n❌ Cannot proceed without admin authentication');
      return;
    }

    // Test blog creation
    const blogId = await testCreateBlog();

    // Test get all blogs
    await testGetAllBlogs();

    // Test blog statistics
    await testGetBlogStatistics();

    // Test blog status update
    await testUpdateBlogStatus(blogId);

    // Test blog deletion (cleanup)
    await testDeleteBlog(blogId);

    console.log('\n🎉 All tests completed!');
    console.log('=====================================');

  } catch (error) {
    console.error('\n💥 Test suite failed:', error.message);
  }
};

// Run the tests
if (require.main === module) {
  runTests();
}

module.exports = {
  testAdminLogin,
  testCreateBlog,
  testGetAllBlogs,
  testUpdateBlogStatus,
  testGetBlogStatistics,
  testDeleteBlog,
  runTests
};
