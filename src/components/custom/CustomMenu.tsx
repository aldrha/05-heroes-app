import { cn } from '@/lib/utils';

import { NavigationMenuItem, NavigationMenuLink } from '@radix-ui/react-navigation-menu';
import { Link, useLocation } from 'react-router';
import { NavigationMenu, NavigationMenuList } from '../ui/navigation-menu';

export const CustomMenu = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Inicio */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(isActive('/') && 'bg-slate-200', 'rounded-md p-2')}>
            <Link to="/">Inicio</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Buscar */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(isActive('/search') && 'bg-slate-200', 'rounded-md p-2')}>
            <Link to="/search">Buscar súperheroes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
