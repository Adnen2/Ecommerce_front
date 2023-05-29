import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;
        console.log(email, password);

        try {
          const res = await axios.post('https://apingweb.com/api/login', {
            email,
            password
          });

          console.log(res)
          if (res) {
            const user = res.data.result;
            const token = res.data.token;
            console.log(user);
            console.log(token);
            return user;
          } else {
            console.log("ERROR");
            return null;
          }
        } catch (error) {
          console.log("ERROR:", error.message);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
});
