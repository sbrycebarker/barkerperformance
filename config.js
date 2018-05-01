module.exports = {
  secret: 'pizzaisgood',
  auth0: {
    domain: "sbrycebarker.auth0.com",
    clientID: "c9iqLtJ5TP88XwmXGKAW62L1gQP1sXzm",
    clientSecret: "ibxfL7srdzqIfkyHo-OtPb-rdAwNp8i6PesgKKbRCmQ2n6mQpbTYSb3sOyWYMB5S"
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
