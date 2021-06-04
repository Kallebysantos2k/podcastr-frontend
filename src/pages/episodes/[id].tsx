import { useRouter } from 'next/router';

export default function Episode() {
  const router = useRouter();

  return (
    <div>
      <h2>{router.query.id}</h2>
    </div>
  );
}
