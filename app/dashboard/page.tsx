import { requireUser } from '@/lib/requireUser';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

export default async function Dashboard() {
  const user = await requireUser();
  return (
    <div>
      <p>Hello from the dashboard</p>
      <p>Welcome back, {user.given_name}</p>
      <LogoutLink>Logout</LogoutLink>
    </div>
  );
}
