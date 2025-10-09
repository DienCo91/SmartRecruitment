import { ProgressAccountSetupProvider } from '@/contexts';
import HeaderAccountSetup from '@/components/client/AccountSetup/header';
import Footer from '@/components/client/AccountSetup/footer';

const LayoutAccountSetup = (props: LayoutProps<'/'>) => {
  return (
    <ProgressAccountSetupProvider>
      <div className="w-full flex flex-col items-center  min-h-screen h-full justify-between">
        <div className="w-[80%] h-full">
          <HeaderAccountSetup />

          <div>{props.children}</div>
        </div>
        <Footer />
      </div>
    </ProgressAccountSetupProvider>
  );
};

export default LayoutAccountSetup;
