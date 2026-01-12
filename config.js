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
