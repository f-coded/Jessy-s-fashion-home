import { SOCIALS } from "./navData";
import { FacebookIcon, InstagramIcon, YoutubeIcon, TiktokIcon, PinterestIcon } from "@/components/ui/Icons";

const ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
  pinterest: PinterestIcon,
  youtube: YoutubeIcon,
};

export default function SocialGrid() {
  return (
    <ul className="at-offcanvas-social__grid">
      {SOCIALS.map((s) => {
        const Icon = ICONS[s.key];
        return (
          <li key={s.key}>
            <a href="#" className="at-offcanvas-social__link" aria-label={s.label}>
              <Icon />
              <span>{s.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
