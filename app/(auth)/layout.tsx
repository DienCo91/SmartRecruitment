import React from 'react';

const AuthLayout = async (props: LayoutProps<'/'>) => {
  return <div>{props.children}</div>;
};

export default AuthLayout;
