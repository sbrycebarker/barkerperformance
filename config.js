module.exports = {
  secret: 'pizzaisgood',
  auth0: {
    domain: "sbrycebarker.auth0.com",
    clientID: "LgPfqUUPQ7wU3B5PHah2dJ4k4QnPCfye",
    clientSecret: "bI3_Si_Au9uA21Qn8g2lRajJSjXL_dy3DMBcfKFTkIZtjvjU-tdspH5Gl6cgomIM"
  },
  session: {
    saveUninitialized: true,
    resave: true,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: 3600*24
    }
  },
  stripe: {
    // pub_key: 'pk_test_8Na8dE5Mru3gFLqBTitXTM2V',
    sec_key: 'sk_test_HfnkOxWVpJKkfsEaH0y9jayf',
    pk_test: 'pk_test_bLfWBEElGWXWGYBGUmZsMIbM'
  },
  mongoose: {
    mongodb: 'mongodb://sbrycebarker:serg1234@ds125628.mlab.com:25628/barkerperformance'
  },
  nodemailer: {
    user: 'sergiobarkerdev@gmail.com',
    pass: '1234Bryce'
  }
}


// mongoose.connect('mongodb://sbrycebarker:serg1234@ds125628.mlab.com:25628/barkerperformance', {
//   useMongoClient: true,
// })
