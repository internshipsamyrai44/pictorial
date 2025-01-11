import Profile from '@/features/profile/ui/Profile';

export default async function ProfilePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return <Profile userId={params.id} />;
}
