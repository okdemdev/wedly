import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';

export default async function Home() {
  return (
    <div>
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink>
    </div>
  );
}
