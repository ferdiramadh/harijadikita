import { ReactNode } from "react";
import HamburgerMenu from "./HamburgerMenu";


type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <HamburgerMenu />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
