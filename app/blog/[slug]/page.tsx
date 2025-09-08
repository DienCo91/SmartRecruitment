import React from 'react';

const BlogSlug: React.FC<{
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}> = async ({ params, searchParams }) => {
  const { slug } = await params;
  const { name, age } = await searchParams;

  return (
    <div>
      BlogSlug {slug} {name} {age}
    </div>
  );
};

export default BlogSlug;
