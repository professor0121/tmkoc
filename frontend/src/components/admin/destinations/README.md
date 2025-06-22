# Admin Destination CRUD Operations

This directory contains all the components and functionality for admin users to perform CRUD (Create, Read, Update, Delete) operations on destinations.

## Files Structure

```
admin/destinations/
├── AdminDestinationsList.jsx      # List view with admin controls
├── DestinationForm.jsx            # Create/Edit form component
├── AdminDestinationsDashboard.jsx # Admin dashboard with statistics
└── README.md                      # This documentation
```

## Components Overview

### 1. AdminDestinationsList.jsx

**Purpose**: Displays all destinations in a table format with admin-specific actions.

**Features**:
- ✅ Search and filter destinations
- ✅ Category and status filtering
- ✅ Bulk operations support
- ✅ Quick edit/delete actions
- ✅ Toggle featured status
- ✅ Responsive table design
- ✅ Confirmation dialogs for destructive actions

**Usage**:
```jsx
import AdminDestinationsList from './components/admin/destinations/AdminDestinationsList';

<AdminDestinationsList />
```

### 2. DestinationForm.jsx

**Purpose**: Comprehensive form for creating and editing destinations.

**Features**:
- ✅ Complete destination data entry
- ✅ Image management
- ✅ Attraction management
- ✅ Climate and transportation info
- ✅ SEO settings
- ✅ Form validation
- ✅ Auto-save drafts (planned)
- ✅ Rich text editing (planned)

**Usage**:
```jsx
// For creating new destination
<DestinationForm isEdit={false} />

// For editing existing destination
<DestinationForm isEdit={true} />
```

### 3. AdminDestinationsDashboard.jsx

**Purpose**: Overview dashboard with statistics and quick actions.

**Features**:
- ✅ Key metrics display
- ✅ Category distribution charts
- ✅ Country distribution
- ✅ Quick action buttons
- ✅ Real-time statistics
- ✅ Visual analytics

## Admin CRUD Operations

### Create Operation

**Route**: `/admin/destinations/create`
**Component**: `CreateDestinationPage` → `DestinationForm`
**Permission**: Admin only

**Process**:
1. User navigates to create page
2. Fills out comprehensive form
3. Form validates data client-side
4. Submits to backend API
5. Redirects to destinations list on success

**Form Sections**:
- Basic Information (name, description, category)
- Location Information (country, state, city, coordinates)
- Climate Information (type, temperature, best months)
- Attractions (dynamic list)
- Images (multiple with categories)
- Transportation (airport, railway, roads)
- Additional Info (languages, currency, tags)
- SEO Information (meta title, description, keywords)
- Status Settings (active, featured, popular)

### Read Operation

**Route**: `/admin/destinations`
**Component**: `AdminDestinationsPage` → `AdminDestinationsList`
**Permission**: Admin only

**Features**:
- Paginated list view
- Advanced filtering and search
- Sortable columns
- Status indicators
- Quick preview
- Bulk selection

### Update Operation

**Route**: `/admin/destinations/edit/:id`
**Component**: `EditDestinationPage` → `DestinationForm`
**Permission**: Admin only

**Process**:
1. Loads existing destination data
2. Pre-fills form with current values
3. Allows modification of all fields
4. Validates changes
5. Submits updates to API
6. Shows success/error feedback

### Delete Operation

**Location**: Within `AdminDestinationsList`
**Permission**: Admin only

**Process**:
1. Click delete button
2. Confirmation dialog appears
3. Confirms deletion
4. Soft delete (sets isActive: false)
5. Updates list view
6. Shows success notification

**Note**: This is a soft delete operation. The destination is marked as inactive but not permanently removed from the database.

## Custom Hooks

### useAdminDestinations

**Purpose**: Provides admin-specific functionality and state management.

**Features**:
- Admin permission checking
- CRUD operation wrappers
- Data validation helpers
- Statistics computation
- Error handling
- Loading states

**Usage**:
```jsx
import { useAdminDestinations } from '../../../hooks/useAdminDestinations';

const {
  hasAdminAccess,
  destinationsWithStats,
  createNewDestination,
  updateExistingDestination,
  removeDestination,
  toggleDestinationFeatured,
  validateDestinationData,
  isLoading,
  hasError
} = useAdminDestinations();
```

## Form Validation

### Client-Side Validation

**Required Fields**:
- Name
- Description
- Short Description
- Country
- State
- City
- Category

**Data Type Validation**:
- Coordinates (latitude: -90 to 90, longitude: -180 to 180)
- Temperature range (min < max)
- Entry fees (positive numbers)
- Ratings (0-5 scale)
- URLs (valid format)

**Business Logic Validation**:
- At least one primary image
- Unique slug generation
- Proper date formats
- Valid category selection

### Server-Side Validation

The backend performs additional validation:
- Duplicate name checking
- Slug uniqueness
- Image URL accessibility
- Coordinate validity
- User permissions

## Security Considerations

### Authentication & Authorization

- All admin routes require authentication
- Role-based access control (admin only)
- JWT token validation
- Session management

### Data Protection

- Input sanitization
- XSS prevention
- CSRF protection
- File upload security

### API Security

- Rate limiting
- Request validation
- Error message sanitization
- Audit logging

## Error Handling

### Client-Side Errors

- Form validation errors
- Network connectivity issues
- Permission denied
- Data loading failures

### Server-Side Errors

- Database connection issues
- Validation failures
- Authentication errors
- Resource not found

### User Feedback

- Toast notifications
- Inline error messages
- Loading indicators
- Success confirmations

## Performance Optimizations

### Data Loading

- Lazy loading for large lists
- Pagination for better performance
- Caching frequently accessed data
- Optimistic updates

### Form Performance

- Debounced search inputs
- Conditional field rendering
- Form state optimization
- Auto-save functionality

### Image Handling

- Image compression
- Lazy loading
- CDN integration
- Multiple format support

## Usage Examples

### Creating a New Destination

```jsx
import { useAdminDestinations } from '../hooks/useAdminDestinations';

const CreateDestination = () => {
  const { createNewDestination, validateDestinationData } = useAdminDestinations();
  
  const handleSubmit = async (formData) => {
    const validation = validateDestinationData(formData);
    
    if (!validation.isValid) {
      console.error('Validation errors:', validation.errors);
      return;
    }
    
    const result = await createNewDestination(formData);
    
    if (result.success) {
      console.log('Destination created:', result.data);
      // Redirect to list or show success message
    } else {
      console.error('Creation failed:', result.error);
    }
  };
  
  return <DestinationForm onSubmit={handleSubmit} />;
};
```

### Updating a Destination

```jsx
const EditDestination = ({ destinationId }) => {
  const { 
    updateExistingDestination, 
    loadDestinationForEdit,
    currentDestination 
  } = useAdminDestinations();
  
  useEffect(() => {
    loadDestinationForEdit(destinationId);
  }, [destinationId]);
  
  const handleUpdate = async (formData) => {
    const result = await updateExistingDestination(destinationId, formData);
    
    if (result.success) {
      console.log('Destination updated:', result.data);
    }
  };
  
  return (
    <DestinationForm 
      isEdit={true}
      initialData={currentDestination}
      onSubmit={handleUpdate}
    />
  );
};
```

### Deleting a Destination

```jsx
const DestinationActions = ({ destination }) => {
  const { removeDestination } = useAdminDestinations();
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      const result = await removeDestination(destination._id);
      
      if (result.success) {
        console.log('Destination deleted');
        // Refresh list or remove from UI
      }
    }
  };
  
  return (
    <button onClick={handleDelete} className="text-red-600">
      Delete
    </button>
  );
};
```

## Integration with Routes

Add these routes to your React Router configuration:

```jsx
import { Routes, Route } from 'react-router-dom';
import AdminDestinationsPage from './pages/admin/AdminDestinationsPage';
import CreateDestinationPage from './pages/admin/CreateDestinationPage';
import EditDestinationPage from './pages/admin/EditDestinationPage';

<Routes>
  <Route path="/admin/destinations" element={<AdminDestinationsPage />} />
  <Route path="/admin/destinations/create" element={<CreateDestinationPage />} />
  <Route path="/admin/destinations/edit/:id" element={<EditDestinationPage />} />
</Routes>
```

## Future Enhancements

- [ ] Bulk operations (bulk delete, bulk status change)
- [ ] Advanced analytics and reporting
- [ ] Export functionality (CSV, PDF)
- [ ] Import from external sources
- [ ] Rich text editor for descriptions
- [ ] Image upload with drag & drop
- [ ] Auto-save drafts
- [ ] Version history
- [ ] Approval workflow
- [ ] Advanced search with filters
