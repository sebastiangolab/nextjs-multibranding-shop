import { FooterData } from "../../types";
import {
  Facebook,
  Instagram,
  Mail,
  MessageSquare,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import React from "react";

type ContactFooterColumnProps = Pick<
  FooterData,
  "phone" | "email" | "socialLinks"
>;

const ContactFooterColumn = ({
  phone,
  email,
  socialLinks,
}: ContactFooterColumnProps) => {
  const commonLinksStyles =
    "flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground";

  const socialLinksData = [
    socialLinks.facebook
      ? { icon: Facebook, href: socialLinks.facebook, label: "Facebook" }
      : null,
    socialLinks.instagram
      ? { icon: Instagram, href: socialLinks.instagram, label: "Instagram" }
      : null,
    socialLinks
      ? { icon: Twitter, href: socialLinks.twitter, label: "Twitter" }
      : null,
  ];

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Kontakt</h3>

      <div className="flex flex-col gap-3 text-sm">
        {/* Phone */}
        {phone ? (
          <Link
            href={`tel:${phone.replaceAll(" ", "")}`}
            className={commonLinksStyles}
          >
            <Phone className="size-4" />
            {phone}
          </Link>
        ) : null}

        {/* Email */}
        {email ? (
          <Link href={`mailto:${email}`} className={commonLinksStyles}>
            <Mail className="size-4" />
            {email}
          </Link>
        ) : null}

        {/* Contact Form */}
        <Link href={"/contact"} className={commonLinksStyles}>
          <MessageSquare className="size-4" />
          Formularz kontaktowy
        </Link>

        {/* Social Media */}
        <div className="mt-4 flex gap-4">
          {socialLinksData.map((social) =>
            social ? (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <social.icon className="size-5" />
              </a>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactFooterColumn;
