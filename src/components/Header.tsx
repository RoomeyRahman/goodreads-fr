import Image from "next/image";
import Logo from "/public/assets/goodreads_logo.svg";
import { headerNavItems, personalInfoItems } from "@/utils";
import Link from "next/link";
import SearchInput from "./SearchInput";

const Header = () => {
  return (
    <header className="bg-primary border-b shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* nav brand */}
          <div className="nav-brand">
            <Link href={"/"}>
              <Image width={140} height={50} src={Logo} alt="brand-nav" />
            </Link>
          </div>

          {/* nav items */}
          <ul className="flex">
            {headerNavItems.map((navItems, index) => (
              <li key={index} className="flex items-center">
                <Link
                  href={navItems.path}
                  className="capitalize px-8 py-[25px] flex items-center hover:bg-secondary hover:text-primary"
                >
                  {navItems.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* search */}
          <SearchInput />

          {/* personal info */}
          <ul className="flex">
            {personalInfoItems.map((infoItems, index) => (
              <li key={index} className="flex items-center hover:bg-secondary">
                <Link
                  href={infoItems.path}
                  className="p-3 flex items-center hover:bg-secondary hover:text-primary"
                >
                  <Image src={infoItems.img} alt={infoItems.name} />
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </header>
  );
};

export default Header;
