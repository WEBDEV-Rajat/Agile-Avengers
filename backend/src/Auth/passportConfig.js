import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { User } from './models/User'; 
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          return done(null, user);
        } else {
          const newUser = await User.create({
            email: profile.emails[0].value,
            fullName: profile.displayName,
            authMethod: 'google',
          });
          return done(null, newUser);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
