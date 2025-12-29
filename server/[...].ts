import { NuxtAuthHandler } from '#auth';
import GithubProvider from 'next-auth/providers/github';

const config = useRuntimeConfig();

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: config.authSecret,
  
  providers: [
    // @ts-expect-error
    GithubProvider.default({
      clientId: config.clientId,
      clientSecret: config.clientSecret
    })
  ]
});