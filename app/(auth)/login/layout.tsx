import React from 'react';

const LoginLayout = async (props: LayoutProps<'/login'>) => {
  return <div className="h-screen">{props.children}</div>;
};

export default LoginLayout;
