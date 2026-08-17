import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { site } from 'core/consts/content';
import 'assets/css/tokens.css';
import 'assets/css/main.css';
import 'assets/css/case-study.css';
import 'lenis/dist/lenis.css';

const monaSans = localFont({
  src: '../assets/fonts/MonaSansVF.woff2',
  weight: '200 900',
  display: 'block',
  variable: '--font-mona-sans',
  declarations: [{ prop: 'font-stretch', value: '75% 125%' }],
});

const geistMono = localFont({
  src: '../assets/fonts/GeistMonoVF.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
};

export const viewport: Viewport = {
  /* Papier – Erstansicht (Hero/Veil) ist hell */
  themeColor: '#F2EFE9',
  viewportFit: 'cover',
};

/* Intro-Veil: deckt die Startseite bei jedem vollen Aufruf vor der Hydration ab,
   damit der Preloader ohne Inhalts-Blitz uebernehmen kann. Nur auf der Startseite –
   Unterseiten haben keinen Preloader, der es wieder abloesen wuerde. Als data-Attribut
   statt Klasse, damit React beim Hydrieren keinen className-Mismatch sieht; der
   Preloader loest es, der Timeout ist das Sicherheitsnetz, falls kein JS uebernimmt. */
const introVeilScript = `(function(){if(!/^\\/(index\\.html)?$/.test(location.pathname))return;var d=document.documentElement;d.setAttribute('data-intro-pending','');setTimeout(function(){d.removeAttribute('data-intro-pending')},5000);})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* suppressHydrationWarning: das Veil-Script setzt data-intro-pending vor
       der Hydration – fuer React ein (gewolltes) Attribut-Delta am html-Tag */
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${monaSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: introVeilScript }} />
        {children}
      </body>
    </html>
  );
}
