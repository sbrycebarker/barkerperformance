# CLAUDE.md

This file provides guidance to Claude Code when working with the Barkerperformance project.

## Project Overview

Barkerperformance is an e-commerce portfolio project for an auto performance parts store. It demonstrates full-stack development skills using modern web technologies.

**Tech Stack:**
- Frontend: AngularJS 1.8.x, jQuery, HTML5, CSS3
- Backend: Node.js + Express 4.x
- Database: MongoDB (Mongoose)
- Authentication: Mock authentication (Auth0 disabled for demo safety)
- Payment: Stripe (test mode)
- Email: Nodemailer
- UI: Owl Carousel, Slick Carousel, Font Awesome, Animate.css

**GitHub:** https://github.com/sbrycebarker/barkerperformance
**Purpose:** Portfolio/demonstration project
**Default Port:** 8085

## Development Commands

```bash
npm start          # Start server (production)
npm run dev        # Start with nodemon (development)
npm test           # Run tests (not implemented yet)
```

## Environment Configuration

**CRITICAL:** All secrets have been moved to `.env` file (NOT committed to git).

Required environment variables in `.env`:

```env
# Server
PORT=8085
NODE_ENV=development

# Session
SESSION_SECRET=your_session_secret

# Auth0
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret

# Stripe (use test keys in development)
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLIC_KEY=pk_test_your_key

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Session Config
SESSION_SAVE_UNINITIALIZED=true
SESSION_RESAVE=true
SESSION_COOKIE_SECURE=false
SESSION_COOKIE_MAX_AGE=86400000
```

See `.env.example` for template.

## File Structure

```
barkerperformance/
├── config.js                 # Configuration (reads from .env)
├── server.js                 # Main Express server
├── package.json             # Dependencies
├── public/                  # Static files
│   ├── index.html          # SPA entry point
│   ├── js/                 # AngularJS app
│   │   ├── app.js          # Routes
│   │   └── mainCtrl.js     # Main controller
│   └── css/                # Styles
└── server/                  # Backend modules
    ├── usercrud.js         # User CRUD operations
    ├── partcrud.js         # Parts CRUD
    ├── purchasecrud.js     # Purchase handling
    ├── nodemailer.js       # Email service
    ├── userschema.js       # User model
    ├── feedbackschema.js   # Feedback model
    └── mailinglist.js      # Mailing list model
```

## API Endpoints

**Authentication (Mock - Demo Mode):**
- `GET /auth` - Serves demo login explanation page
- `GET /login` - Serves demo login explanation page
- `GET /auth/me` - Returns mock "Demo User" data
- `GET /auth/logout` - Redirects to home (no-op)
- Note: Auth0/OAuth disabled for portfolio demo safety

**Users:**
- `GET /getUsers` - List all users
- `GET /getUsers/:id` - Get user by ID
- `POST /addUser` - Create new user
- `PUT /updateUsers/:id` - Update user
- `DELETE /deleteUser/:id` - Delete user
- `PUT /addWishList` - Add item to user wishlist

**Parts:**
- `GET /getParts` - List all parts
- `GET /getPart/:_id` - Get part by ID

**Email/Feedback:**
- `POST /feedback` - Submit feedback (with validation)
- `GET /getFeedback` - Get all feedback
- `POST /addToList` - Subscribe to mailing list (with validation)
- `GET /getList` - Get mailing list subscribers

**Payments (Stripe):**
- `POST /charge` - Process payment
- `GET /paysuccess` - Payment success page

## Recent Fixes (December 2025)

### Security Improvements
- ✅ Moved all secrets from `config.js` to `.env` file
- ✅ Added `.env` to `.gitignore`
- ⚠️ **ACTION REQUIRED:** Rotate all exposed credentials (Auth0, Stripe, MongoDB, email)
- ⚠️ **ACTION REQUIRED:** Update `config.js` to use environment variables

### Dependency Updates
- ✅ Updated all dependencies to latest compatible versions
- ✅ Added `dotenv` for environment variable management
- ✅ Added `express-validator` for input validation
- ✅ Moved `nodemon` to devDependencies

### Code Quality Fixes
- ✅ Fixed deprecated Mongoose connection syntax (removed `useMongoClient`)
- ✅ Fixed deprecated MongoStore syntax imports
- ✅ Fixed error variable typos in `nodemailer.js` (lines 71, 83)
- ✅ Fixed Stripe initialization to use secret key instead of public key
- ✅ Added express-validator import to server.js
- ✅ Improved CORS configuration (partially - see manual tasks)
- ✅ Created `.env.example` template
- ✅ Created `CLAUDE.md` documentation

### Manual Tasks Required (server.js)

The following fixes need to be applied manually to `server.js`:

**1. Remove duplicate CORS (line 31):**
```javascript
// DELETE THIS LINE:
app.use(cors());
// Keep the corsOptions block that follows
```

**2. Update config.js to use environment variables:**
Replace entire file content with:
```javascript
require('dotenv').config();

module.exports = {
  secret: process.env.SESSION_SECRET,
  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET
  },
  session: {
    saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED === 'true',
    resave: process.env.SESSION_RESAVE === 'true',
    cookie: {
      path: '/',
      httpOnly: true,
      secure: process.env.SESSION_COOKIE_SECURE === 'true',
      maxAge: parseInt(process.env.SESSION_COOKIE_MAX_AGE) || 86400000
    }
  },
  stripe: {
    sec_key: process.env.STRIPE_SECRET_KEY,
    pk_test: process.env.STRIPE_PUBLIC_KEY
  },
  mongoose: {
    mongodb: process.env.MONGODB_URI
  },
  nodemailer: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
}
```

**3. Add MongoStore to session config (after line 42):**
```javascript
app.use(session({
  saveUninitialized: config.session.saveUninitialized,
  resave: config.session.resave,
  secret: config.secret,
  cookie: config.session.cookie,
  store: MongoStore.create({
    mongoUrl: config.mongoose.mongodb,
    touchAfter: 24 * 3600
  })
}))
```

**4. Implement Stripe charge handler (replace lines 173-175):**
```javascript
app.post('/charge', async function(req, res) {
  try {
    const { amount, currency, description, source } = req.body;

    const charge = await stripe.charges.create({
      amount: amount,
      currency: currency || 'usd',
      description: description || 'Barker Performance Purchase',
      source: source
    });

    res.status(200).json({
      success: true,
      charge: charge
    });
  } catch (error) {
    console.error('Stripe charge error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
})
```

**5. Add global error handler (before static files, around line 180):**
```javascript
// Global error handler
app.use(function(err, req, res, next) {
  console.error('Global error handler:', err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

app.use(express.static('./public'))
```

**6. Fix port configuration (line 181):**
```javascript
// Change from:
var port = 8085
// To:
var port = process.env.PORT || 8085
```

**7. Fix typo (line 183):**
```javascript
// Change from:
console.log("listining on port " + port)
// To:
console.log("listening on port " + port)
```

### After Manual Fixes

Once manual fixes are complete:

1. **Install updated dependencies:**
   ```bash
   npm install
   ```

2. **Test the server:**
   ```bash
   npm run dev
   ```

3. **Expected output:**
   ```
   MongoDB connected successfully
   listening on port 8085
   ```

### Remaining Tasks
- ⏳ Complete manual server.js fixes (see above)
- ⏳ Update config.js (see above)
- ⏳ Run `npm install` to install updated dependencies
- ⏳ Migrate database from mLab to MongoDB Atlas
- ⏳ Add input validation to all endpoints
- ⏳ Implement comprehensive tests
- ⏳ Add frontend error handling UI
- ⏳ Remove duplicate libraries (jQuery, multiple carousels)
- ⏳ Implement proper logging system
- ⏳ Add pagination to API endpoints

## Recent Updates (January 2026)

### Portfolio Demo Preparation

Prepared Barker Performance for portfolio demonstration with focus on UX and accessibility.

**1. Product Images Fixed (seedData.js)**
- ✅ Updated all 16 products to use appropriate images from assets folder
- Cold Air Intake → `intake.webp`
- Exhaust systems → `exhaustwide.png`
- Clutch/Transmission → `gearbox.png`
- Wheels → `wheel.jpg`
- Shifter → `shifter.jpeg`
- Racing Seats → `seats.jpeg`
- Engine components → `motor.png`
- Suspension → `suspension-icon.png`
- Database successfully seeded with new images

**2. Authentication Disabled for Demo (server.js)**
- ✅ Commented out Auth0/Passport initialization (lines 46-97)
- ✅ Created mock authentication endpoints:
  - `GET /auth` → Serves professional login.html explanation page
  - `GET /auth/me` → Returns mock Demo User data
  - `GET /auth/logout` → Redirects to home
- ✅ Created `/public/html/login.html` with professional demo notice
  - Yellow warning box explaining OAuth disabled for safety
  - Lists accessible features (browse, cart, wishlist, profile)
  - "Continue Shopping" button to return to store

**3. Profile Page Updated (profile.html)**
- ✅ Added demo notice banner at top of page
- Yellow bordered box explaining mock profile
- Informs users this is demonstration data

**4. UI/UX Improvements**

**Button Hover Effects (`public/css/view.css`):**
```css
#btn-con button {
  cursor: pointer;
  transition: all 0.3s ease;
}

#btn-con button:hover {
  background-color: #ff2800;
  border-color: #ff2800;
  color: white;
  transform: translateY(-2px);
}
```

**Remove from Cart Feature:**
- ✅ Added remove button to cart items (`public/index.html` line 83):
  ```html
  <button class="remove-btn" ng-click="removeFromCart($index)">✕</button>
  ```
- ✅ Added button styles (`public/css/full.css`):
  ```css
  .remove-btn {
    background: #ff2800;
    border: none;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.3s ease;
  }
  ```
- ✅ Implemented `removeFromCart()` function (`public/js/mainCtrl.js` lines 183-200):
  - Removes item from cart array
  - Removes price from total array
  - Recalculates total (handles empty cart)
  - Updates scope

**5. Bug Fixes**

**Mongoose Callback Error (server.js line 143):**
- ✅ Converted `/addWishList` endpoint from callback to async/await pattern
- Fixed: `Model.findByIdAndUpdate() no longer accepts a callback`
- Now uses modern async/await syntax with try/catch error handling

### Testing Checklist
- [ ] Verify button hover states work (cursor, color, transform)
- [ ] Test remove from cart button appears and functions correctly
- [ ] Test cart total recalculates after item removal
- [ ] Verify no Mongoose callback errors in console
- [ ] Test demo login page displays properly
- [ ] Test profile page shows demo notice

### Next Steps
- [ ] Commit all changes to GitHub
- [ ] Deploy to Render for live portfolio demo
- [ ] Update portfolio site with Render URL
- [ ] Test all features on deployed version

## MongoDB Atlas Migration

**mLab was shut down in 2020.** You need to migrate to MongoDB Atlas:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Create database user
4. Get connection string
5. Update `MONGODB_URI` in `.env`
6. Import existing data (if any)

Connection string format:
```
mongodb+srv://username:password@cluster.mongodb.net/barkerperformance?retryWrites=true&w=majority
```

## Important Notes

### AngularJS End-of-Life
AngularJS 1.x reached EOL on January 1, 2022. For production use, consider migrating to React, Vue.js, or Angular 2+.

### Stripe Integration
- Currently using test keys
- Test card: `4242 4242 4242 4242`
- Never commit real Stripe keys to git

### Email Configuration
- Using Gmail SMTP
- Requires app-specific password
- May need to enable "Less secure app access" or use OAuth2

### CORS Configuration
- Development: Allows all origins
- Production: Set `ALLOWED_ORIGIN` in `.env`

## Common Issues

**MongoDB connection failed:** mLab is shut down. Migrate to MongoDB Atlas.

**Stripe charge fails:** Ensure using `STRIPE_SECRET_KEY` (sk_test_...).

**Email not sending:** Check Gmail app password and settings.

**Session not persisting:** Ensure MongoDB is connected.

## Security Checklist

- [ ] Never commit `.env` file
- [ ] Rotate credentials if exposed
- [ ] Use HTTPS in production
- [ ] Set `SESSION_COOKIE_SECURE=true` in production
- [ ] Validate all user inputs
- [ ] Keep dependencies updated
- [ ] Implement rate limiting
- [ ] Add CSP headers in production

---

**Last Updated:** January 11, 2026
**Updated By:** Claude Code

**Recent Session:** Portfolio demo preparation - Fixed product images, disabled Auth0 for demo safety, added cart remove functionality, improved button hover UX, and fixed Mongoose callback errors. Ready for testing and deployment to Render.
