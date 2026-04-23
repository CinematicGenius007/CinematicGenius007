import { contact, resolve } from "../content/profile";
import type { ModeId } from "../modes/types";

type Props = { mode: ModeId };

export default function ContactBlock({ mode }: Props) {
  return (
    <section className="contact-section section-block">
      <div className="section-head">
        <p className="section-number">{contact.sectionNumber}</p>
        <p className="section-kicker">{contact.sectionKicker}</p>
      </div>
      <div className="section-rule" />
      <div className="contact-grid">
        <div>
          <h2>{resolve(contact.h2, mode)}</h2>
          <p>{resolve(contact.body, mode)}</p>
        </div>
        <div className="contact-links">
          <a href="mailto:ayush.trillionarie@gmail.com">EMAIL ↗</a>
          <a href="https://www.linkedin.com/in/ayush-saini-858357200/" target="_blank" rel="noreferrer">
            LINKEDIN ↗
          </a>
          <a href="https://github.com/CinematicGenius007" target="_blank" rel="noreferrer">
            GITHUB ↗
          </a>
        </div>
      </div>
      <div className="contact-footer">
        <div className="section-rule" />
        <p>AYUSH SAINI / CINEMATICGENIUS007.COM / © {new Date().getFullYear()}</p>
      </div>
    </section>
  );
}
