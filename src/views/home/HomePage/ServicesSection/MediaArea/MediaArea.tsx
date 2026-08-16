import { leistungen } from 'core/consts/content';

type MediaAreaProps = {
  activeIdx: number;
};

/* Medienkarten der drei Leistungen: Bucan-Screenshot im Browserrahmen
   (Platzhalter), abstrakte App-Oberflaeche, Datenbank-/Schnittstellen-Schema.
   Crossfade ueber .media-layer.active (500 ms, CSS). */
function MediaArea({ activeIdx }: MediaAreaProps) {
  return (
    <div className="svc-media">
      <div className={`media-layer${activeIdx === 0 ? ' active' : ''}`}>
        <div className="browser-frame">
          <div className="bf-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span className="bf-url">{leistungen.browserUrl}</span>
          </div>
          <div className="bf-body">{leistungen.screenshotPlatzhalter}</div>
        </div>
      </div>

      <div className={`media-layer${activeIdx === 1 ? ' active' : ''}`}>
        <svg className="media-draw" viewBox="0 0 560 400" aria-hidden="true">
          <rect className="ln" x="1" y="1" width="558" height="398" rx="14" />
          <line className="ln" x1="1" y1="52" x2="559" y2="52" />
          <circle className="ln-dim" cx="26" cy="26" r="5" />
          <line className="ln-dim" x1="44" y1="26" x2="120" y2="26" />
          <line className="ln-dim" x1="32" y1="96" x2="330" y2="96" />
          <line className="ln" x1="32" y1="128" x2="330" y2="128" />
          <line className="ln" x1="32" y1="164" x2="330" y2="164" />
          <line className="ln" x1="32" y1="200" x2="330" y2="200" />
          <line className="ln" x1="32" y1="236" x2="330" y2="236" />
          <line className="ln" x1="32" y1="272" x2="330" y2="272" />
          <line className="ln" x1="32" y1="308" x2="330" y2="308" />
          <line className="ln-dim" x1="150" y1="84" x2="150" y2="320" />
          <line className="ln-dim" x1="248" y1="84" x2="248" y2="320" />
          <line className="ln-dim" x1="376" y1="102" x2="430" y2="102" />
          <line className="ln" x1="376" y1="132" x2="528" y2="132" />
          <line className="ln-dim" x1="376" y1="172" x2="444" y2="172" />
          <line className="ln" x1="376" y1="202" x2="528" y2="202" />
          <line className="ln-dim" x1="376" y1="242" x2="420" y2="242" />
          <rect className="ln" x="376" y="262" width="152" height="58" rx="6" />
          <rect className="ln-cobalt" x="376" y="344" width="112" height="30" rx="15" />
        </svg>
      </div>

      <div className={`media-layer${activeIdx === 2 ? ' active' : ''}`}>
        <svg className="media-draw" viewBox="0 0 560 400" aria-hidden="true">
          <ellipse className="ln-cobalt" cx="280" cy="150" rx="74" ry="22" />
          <line className="ln-cobalt" x1="206" y1="150" x2="206" y2="238" />
          <line className="ln-cobalt" x1="354" y1="150" x2="354" y2="238" />
          <path className="ln-cobalt" d="M206 238 C 206 250, 239 260, 280 260 C 321 260, 354 250, 354 238" />
          <path className="ln-cobalt" d="M206 194 C 206 206, 239 216, 280 216 C 321 216, 354 206, 354 194" />
          <rect className="ln-cobalt" x="40" y="34" width="132" height="86" rx="10" />
          <line className="ln-cobalt" x1="40" y1="56" x2="172" y2="56" />
          <circle className="ln-cobalt" cx="52" cy="45" r="2.4" />
          <circle className="ln-cobalt" cx="61" cy="45" r="2.4" />
          <rect className="ln-cobalt" x="396" y="34" width="124" height="86" rx="10" />
          <line className="ln-cobalt" x1="412" y1="64" x2="470" y2="64" />
          <line className="ln-cobalt" x1="412" y1="84" x2="504" y2="84" />
          <line className="ln-cobalt" x1="412" y1="100" x2="486" y2="100" />
          <rect className="ln-cobalt" x="120" y="316" width="150" height="56" rx="10" />
          <line className="ln-cobalt" x1="138" y1="338" x2="222" y2="338" />
          <line className="ln-cobalt" x1="138" y1="352" x2="196" y2="352" />
          <path className="ln-cobalt" d="M172 92 C 216 108, 232 118, 246 132" strokeDasharray="5 6" />
          <path className="ln-cobalt" d="M396 92 C 356 108, 336 118, 318 132" strokeDasharray="5 6" />
          <path className="ln-cobalt" d="M226 258 C 214 280, 204 296, 197 316" strokeDasharray="5 6" />
          <path
            className="ln-cobalt"
            d="M354 226 C 420 250, 452 292, 460 344 L 270 344"
            strokeDasharray="5 6"
          />
          <circle className="ln-cobalt" cx="246" cy="132" r="3.4" />
          <circle className="ln-cobalt" cx="318" cy="132" r="3.4" />
          <circle className="ln-cobalt" cx="197" cy="316" r="3.4" />
        </svg>
      </div>
    </div>
  );
}

export default MediaArea;
