const router = require('express').Router();
const passport = require('passport');
const Account = require('../../models/Account');
const Report = require('../../models/Report');
const config = require('../../config/index');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

router.use(passport.initialize()); // initializes Passport
router.use(passport.session()); //alter the req object and change the ‘user’ value that is currently the session id (from the client cookie) into the true deserialized user object.

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.CALLBACKURL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const date = new Date();
      const existAccount = await Account.findOne({
        email: profile.emails[0].value,
      });
      //account is not exist in db
      if (!existAccount) {
        const newAcc = await new Account({
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
        }).save();
        return cb(null, newAcc);
      }
      //account exist in db
      const existReport = await Report.findOne({
        account_id: existAccount._id,
      })
        .where('time')
        .gt(new Date(date.getFullYear(), date.getMonth()))
        .lt(new Date(date.getFullYear(), date.getMonth() + 1));
      if (existAccount && existReport) {
        return cb(null, existAccount);
      }
      if (existAccount && !existReport) {
        if (existAccount.status === 'accept') {
          await new Report({
            account_id: existAccount._id,
            time: new Date(),
          }).save();
        }
        return cb(null, existAccount);
      }
    },
  ),
);
// serialize user to session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// serialize user to sessionf
passport.deserializeUser(function (user, done) {
  done(null, user);
});
module.exports = router;
