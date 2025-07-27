'use client';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import useSWR from 'swr';

function Blogs() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR<BlogInterface[]>(
    `http://localhost:3001/posts`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log('Check data: ', data);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 mt-5 gap-5">
        {data?.map((blog, idx) => (
          <Card key={blog.id || idx} className="p-4">
            <Image
              src={
                'https://media.istockphoto.com/id/1354066936/photo/teito-in-veigas-village-somiedo-natural-park-and-biosphere-reserve-asturias-spain.jpg?s=612x612&w=0&k=20&c=CZGKx6vfYbdjNBg89HNFbe4THg5qqMf3NIzZCuHKFv8='
              }
              alt="image"
              width={500}
              height={500}
              className="rounded-t-lg h-[200px] object-cover mx-auto"
            />
            <CardContent className="mt-5">
              <h3 className="text-lg line-clamp-2 font-bold">{blog.title}</h3>
              <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                {blog.smallDescription}
              </p>
              <Button asChild className="w-full mt-7">
                <Link href={`/blog/${blog.slug}`} className="text-white">
                  Read More
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Blogs;
