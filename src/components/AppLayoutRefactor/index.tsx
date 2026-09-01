import { Layout } from "antd";
import { HeaderLayout } from "./components/Header";
import { SidebarLayout } from "./components/Sidebar";
import { DefaultOptionType } from "antd/es/select";
import { ReactNode } from "react";
export interface AppLayoutProps {
  optionsCompany: DefaultOptionType[];
  appNavigate: () => void;
  loadingAppLayout: boolean;
  children: ReactNode;
}

export const AppLayout = ({ optionsCompany, loadingAppLayout, children, appNavigate }: AppLayoutProps) => {
  return (    <div className="flex h-[100dvh] w-full overflow-hidden">
      <Layout className="md:p-0.5 gap-0.5 md:gap-2">
        <HeaderLayout
          optionsCompany={optionsCompany}
          loadingAppLayout={loadingAppLayout}
          appNavigate={appNavigate}
        />
        <SidebarLayout 
          loadingAppLayout={loadingAppLayout} 
        >
          {children}
        </SidebarLayout>
      </Layout>
    </div>
  );
};