import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

interface BlogsPropsInterface {
  blogs: BlogInterface[];
}

function Blogs(props: BlogsPropsInterface) {
  const { blogs } = props;
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 mt-5 gap-5">
        {blogs?.map((post, idx) => (
          <Card key={post.id || idx} className="p-4">
            <Image
              src={
                'https://media.istockphoto.com/id/1354066936/photo/teito-in-veigas-village-somiedo-natural-park-and-biosphere-reserve-asturias-spain.jpg?s=612x612&w=0&k=20&c=CZGKx6vfYbdjNBg89HNFbe4THg5qqMf3NIzZCuHKFv8='
              }
              alt="image"
              width={500}
              height={500}
              className="rounded-t-lg h-[200px] object-cover"
            />
            <CardContent className="mt-5">
              <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
              <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                {post.smallDescription}
              </p>
              <Button asChild className="w-full mt-7">
                <Link href={`/blog/${post.slug}`} className="text-white">
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
