import Logo from '@/components/header/logo';
import UserInfo from '@/components/header/userInfo';
// import { ModeToggle } from '@/theme/modeToggle';

const Header = () => {
  return (
    <header className='flex h-full items-center justify-between'>
      <Logo />
      <UserInfo />
    </header>
  );
};

export default Header;
