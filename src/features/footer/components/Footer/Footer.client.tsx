import { FooterData } from "../../types";
import ContactFooterColumn from "../ContactFooterColumn";
import MenuFooterColumn from "../MenuFooterColumn";

interface FooterClientProps {
  footerData: FooterData;
}

const FooterClient = ({ footerData }: FooterClientProps) => {
  return (
    <footer className="bg-muted/50">
      <div className="container mx-auto px-4 pt-14 pb-5">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-12">
          {/* Column 1 */}
          <MenuFooterColumn menuData={footerData.menuData.column1} />

          {/* Column 2 */}
          <MenuFooterColumn menuData={footerData.menuData.column2} />

          {/* Column 3 - Hidden on tablet and mobile */}
          <MenuFooterColumn menuData={footerData.menuData.column3} />

          {/* Column 4: Contact */}
          <ContactFooterColumn
            phone={footerData.phone}
            email={footerData.email}
            socialLinks={footerData.socialLinks}
          />
        </div>

        {/* Copyright */}
        <div className="mt-5 flex flex-col items-center gap-6 pt-12">
          <p className="text-sm text-muted-foreground">
            © {footerData.shopName} {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterClient;
