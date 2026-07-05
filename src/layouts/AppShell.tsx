import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { useDashboardStore } from '@/store/useDashboardStore';
import { dashboardModules } from '@/config/dashboardModules';
import StaggeredMenu from '@/components/design-system/StaggeredMenu';

export function AppShell() {
  const fetchData = useDashboardStore(state => state.fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const menuItems = dashboardModules?.filter(m => m.showInSidebar)?.map(item => ({
    label: item.title,
    ariaLabel: `Go to ${item.title}`,
    link: item.route
  }));

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative">
      <StaggeredMenu
        position="left"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#333333"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        colors={['#1e1e22', '#35353c']}
        logoUrl=""
        accentColor="#5227FF"
        isFixed={true}
      />

      <main className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden pt-20">
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
