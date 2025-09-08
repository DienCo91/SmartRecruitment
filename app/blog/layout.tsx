import React from 'react';

const BlogLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main>{children}</main>;
};

export default BlogLayout;
