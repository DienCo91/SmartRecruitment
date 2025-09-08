import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20">
      This is the home page
      {[1, 2, 3, 4, 5, 6].map((item, index) => {
        return (
          <Link key={index} href={`/blog/${index}?name=${index + 2}`}>
            Blog {index}
          </Link>
        );
      })}
    </div>
  );
}
