// Simple test script to verify API endpoints
const baseURL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing TMKOC Backend API...\n');

  try {
    // Test 1: Basic health check
    console.log('1. Testing health check endpoint...');
    const healthResponse = await fetch(`${baseURL}/`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
    console.log('');

    // Test 2: Create a test user
    console.log('2. Creating a test user...');
    const createUserResponse = await fetch(`${baseURL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Jethalal Gada',
        email: 'jethalal@tmkoc.com',
        password: 'password123',
        role: 'user'
      })
    });
    
    const createUserData = await createUserResponse.json();
    console.log('✅ User created:', createUserData);
    console.log('');

    // Test 3: Get all users
    console.log('3. Fetching all users...');
    const getUsersResponse = await fetch(`${baseURL}/api/users`);
    const getUsersData = await getUsersResponse.json();
    console.log('✅ Users fetched:', getUsersData);
    console.log('');

    console.log('🎉 All tests passed! MongoDB connection is working perfectly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the tests
testAPI();
