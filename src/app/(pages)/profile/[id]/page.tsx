import Profile from '@/features/profile/ui/Profile';

type ProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = await params;
  return <Profile id={resolvedParams.id} />;
}
