import { Button } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { LogoKAI } from '@/components/Login/components/LogoKAI';
import { useSidebarLayoutStore } from '../../store/useSidebarLayoutStore';

export interface ControlSidebarUIProps {
  environment: string;
}

export const ControlSidebarUI = ({ environment }: ControlSidebarUIProps) => {
  const { open, setOpen } = useSidebarLayoutStore();

  return <div className="flex shrink-0 flex-row items-center justify-start gap-1 md:w-full md:gap-2">
    <Button
      type="text"
      icon={<MenuUnfoldOutlined className="text-white-100" />}
      onClick={() => setOpen(!open)}
    />
    {environment !== 'PRODUCCION' && (
      <div
        className="hidden items-center justify-center rounded-full p-2 md:flex"
        style={{ border: '1px solid #f0f0f0' }}
      >
        <strong className="text-white-100">{environment}</strong>
      </div>
    )}
    {environment === 'PRODUCCION' && (
      <div className="hidden md:block">
        <LogoKAI variant="header" />
      </div>
    )}
  </div>;
};