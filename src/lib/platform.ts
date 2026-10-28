// Shared pieces of the platform pages (/woocommerce/, /shopify/): icons, the product art sprite,
// and the HTML for the dense UI mock-ups (store page, chat widget, floating chips, "How it works" shots).
// The page template is src/pages/[platform].astro; the copy lives in src/data/platforms.ts.
import type { Platform } from "../data/platforms";

export const CHECK = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 12.5 4.5 4.5L19 7.5\"/></svg>";
export const INFO = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 11v5\"/><path d=\"M12 8h.01\"/></svg>";

/** Lucide-style icon paths, drawn by ico() */
export const I: Record<string, string> = {
  chat: "<path d=\"M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z\"/><path d=\"M8.5 10.5h7M8.5 14h4.5\"/>",
  search: "<circle cx=\"11\" cy=\"11\" r=\"6.5\"/><path d=\"m20 20-4.2-4.2\"/>",
  cart: "<path d=\"M2.5 3.5h2.2l2.4 11.2h10.6l2.3-7.7H6\"/><circle cx=\"9\" cy=\"19\" r=\"1.6\"/><circle cx=\"17\" cy=\"19\" r=\"1.6\"/>",
  team: "<circle cx=\"9\" cy=\"8\" r=\"3.5\"/><path d=\"M2.5 20c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5\"/><path d=\"M16 4.5a3.5 3.5 0 0 1 0 7M18.5 15c1.6.7 2.6 2.4 3 5\"/>",
  truck: "<path d=\"M3 6.5h11v10H3z\"/><path d=\"M14 9.5h4l3 3.5v3.5h-7\"/><circle cx=\"7\" cy=\"17.5\" r=\"1.8\"/><circle cx=\"17\" cy=\"17.5\" r=\"1.8\"/>",
  lock: "<rect x=\"5\" y=\"11\" width=\"14\" height=\"9\" rx=\"2\"/><path d=\"M8 11V8a4 4 0 0 1 8 0v3\"/>",
  sync: "<path d=\"M20 11a8 8 0 0 0-14.3-4.9L4 8\"/><path d=\"M4 4v4h4\"/><path d=\"M4 13a8 8 0 0 0 14.3 4.9L20 16\"/><path d=\"M20 20v-4h-4\"/>",
  user: "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6\"/>",
  card: "<rect x=\"3\" y=\"5.5\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M3 10h18\"/>",
  download: "<path d=\"M12 3v12\"/><path d=\"m7 10 5 5 5-5\"/><path d=\"M5 20h14\"/>",
  toggle: "<rect x=\"2.5\" y=\"7\" width=\"19\" height=\"10\" rx=\"5\"/><circle cx=\"16.5\" cy=\"12\" r=\"3\"/>",
  palette: "<path d=\"M12 3a9 9 0 0 0 0 18c1.2 0 1.8-.9 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7z\"/><circle cx=\"7.5\" cy=\"11.5\" r=\"1.2\"/><circle cx=\"10.5\" cy=\"7.5\" r=\"1.2\"/><circle cx=\"15\" cy=\"8\" r=\"1.2\"/>",
  link: "<path d=\"M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1\"/><path d=\"M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1\"/>",
  ext: "<path d=\"M14 4h6v6\"/><path d=\"M20 4 11 13\"/><path d=\"M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5\"/>",
  mic: "<rect x=\"9\" y=\"3\" width=\"6\" height=\"11\" rx=\"3\"/><path d=\"M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21\"/>",
  send: "<path d=\"M12 19V5M5 12l7-7 7 7\"/>",
  bag: "<path d=\"M6 8h12l-1 12H7z\"/><path d=\"M9 8V6.5a3 3 0 0 1 6 0V8\"/>",
  heart: "<path d=\"M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z\"/>",
  box: "<path d=\"M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z\"/><path d=\"M3.5 7.5 12 12l8.5-4.5M12 12v9\"/>",
  layers: "<path d=\"m12 3 9 5-9 5-9-5z\"/><path d=\"m3 13 9 5 9-5\"/>",
  chart: "<path d=\"M4 4v16h16\"/><path d=\"M8 15v-3M12 15V8M16 15v-5\"/>",
  dots: "<circle cx=\"12\" cy=\"5.5\" r=\"1.2\"/><circle cx=\"12\" cy=\"12\" r=\"1.2\"/><circle cx=\"12\" cy=\"18.5\" r=\"1.2\"/>",
  x: "<path d=\"M6 6l12 12M18 6 6 18\"/>",
  wave: "<path d=\"M6 10v4M10 7v10M14 9v6M18 11v2\"/>",
  chev: "<path d=\"m6 9 6 6 6-6\"/>",
  gear: "<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z\"/>",
  plug: "<path d=\"M12 22v-5\"/><path d=\"M9 8V2.5\"/><path d=\"M15 8V2.5\"/><path d=\"M18 8v4.5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V8Z\"/>"
};

export const ico = (paths: string, sw = "2") =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

/** <symbol>s for the jacket / shoe product art, coloured through CSS custom properties */
export const SPRITE = "<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n  <defs>\n    <symbol id=\"jacket\" viewBox=\"0 0 200 200\">\n      <path d=\"M60 50 32 66c-4 2-6 6-7 10l-9 70c-.4 3 1.6 5.6 4.6 6l17 2.4c2.8.4 5.4-1.6 5.8-4.4l9.4-56z\" fill=\"var(--b)\"/>\n      <path d=\"m140 50 28 16c4 2 6 6 7 10l9 70c.4 3-1.6 5.6-4.6 6l-17 2.4c-2.8.4-5.4-1.6-5.8-4.4l-9.4-56z\" fill=\"var(--b)\"/>\n      <path d=\"M60 49c10-5 18-9 28-11l12 15 12-15c10 2 18 6 28 11l7 125c-31 8-63 8-94 0z\" fill=\"var(--a)\"/>\n      <path d=\"m86 35 14 20 14-20 9 6-18 26-5-6-5 6-18-26z\" fill=\"var(--c)\"/>\n      <path d=\"M100 60v114\" stroke=\"var(--z)\" stroke-width=\"2.2\"/>\n      <g fill=\"none\" stroke=\"var(--c)\" stroke-width=\"2.6\" stroke-linejoin=\"round\">\n        <rect x=\"63\" y=\"82\" width=\"27\" height=\"23\" rx=\"3\"/><path d=\"M63 89h27\"/>\n        <rect x=\"110\" y=\"82\" width=\"27\" height=\"23\" rx=\"3\"/><path d=\"M110 89h27\"/>\n        <rect x=\"61\" y=\"126\" width=\"31\" height=\"30\" rx=\"3\"/><path d=\"M61 134h31\"/>\n        <rect x=\"108\" y=\"126\" width=\"31\" height=\"30\" rx=\"3\"/><path d=\"M108 134h31\"/>\n      </g>\n      <path d=\"m16 145 21 3-1 8-21-3zM184 145l-21 3 1 8 21-3z\" fill=\"var(--d)\"/>\n      <path d=\"M54 172c31 8 61 8 92 0v9c-31 8-61 8-92 0z\" fill=\"var(--d)\"/>\n    </symbol>\n    <symbol id=\"shoe\" viewBox=\"0 0 220 130\">\n      <path d=\"M24 84c0-16 6-30 22-36l30-10c8-16 22-22 38-18l14 4c10 14 24 24 42 30l26 8c12 4 18 12 18 22v6H24z\" fill=\"var(--a)\"/>\n      <path d=\"M58 64c26-8 58-8 92 2\" fill=\"none\" stroke=\"var(--b)\" stroke-width=\"7\" stroke-linecap=\"round\"/>\n      <path d=\"M24 66c-4 6-5 12-4 18h14c-1-8 1-14 6-20z\" fill=\"var(--b)\"/>\n      <g stroke=\"var(--z)\" stroke-width=\"3.4\" stroke-linecap=\"round\"><path d=\"m92 36 13 13\"/><path d=\"m101 31 13 13\"/><path d=\"m110 28 12 12\"/></g>\n      <path d=\"M18 92h196c2 12-4 20-16 20H36c-12 0-18-8-18-20z\" fill=\"var(--c)\"/>\n      <path d=\"M20 104c4 6 9 8 16 8h162c8 0 13-3 16-9\" fill=\"none\" stroke=\"var(--d)\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n      <circle cx=\"171\" cy=\"73\" r=\"4\" fill=\"var(--z)\" opacity=\".7\"/>\n    </symbol>\n  </defs>\n</svg>";

/** Product art: kind = "jacket" | "shoe", colours = CSS custom properties (--a, --b …) */
export const art = (kind: string, colours: Record<string, string>, cls = "") => {
  const style = Object.entries(colours).map(([k, v]) => `--${k}:${v}`).join(";");
  const vb = kind === "jacket" ? "0 0 200 200" : "0 0 220 130";
  return `<svg class="${cls}" viewBox="${vb}" style="${style}" aria-hidden="true"><use href="#${kind}"/></svg>`;
};

// ---------- hero: store mock, chat steps, floating chips ----------
export const cartTime = (d: Platform) => (d.chat[3] ? 4.6 : 3.4);

export function storeParts(d: Platform) {
  const pr = d.product, ON = ' class="on"';
  return {
    swatches: pr.colors.map(([c, on]) => `<i${on ? ON : ""} style="background:${c}"></i>`).join(""),
    sizes: pr.sizes.map(([s, c]) => (c ? `<span class="${c}">${s}</span>` : `<span>${s}</span>`)).join(""),
    thumbs: pr.thumbs.map((t) => `<span>${art(pr.kind, t)}</span>`).join(""),
    nav: d.nav.map((x) => `<span>${x}</span>`).join(""),
  };
}

/** The scripted conversation inside the hero chat widget (each data-step fades in after --d seconds) */
export function chatSteps(d: Platform) {
  const c = d.chat, card = c[2] as string[], pr = d.product;
  let msgs = `<div class="cpw__msg me" data-step style="--d:.4">${c[0]}</div>
                <div class="cpw__slot"><div class="cpw__typing" data-step="typing" style="--d:1.1;--d2:2.1"><i></i><i></i><i></i></div><div class="cpw__msg ai" data-step style="--d:2.1">${c[1]}</div></div>
                <div class="cpw__card" data-step style="--d:2.6"><span class="cpw__thumb">${art(pr.kind, pr.main)}</span><div><b>${card[0]}</b><small>${card[1]}</small></div><div class="cpw__btns"><span>${card[2]}</span><span>${card[3]}</span></div></div>`;
  if (c[3]) msgs += `\n                <div class="cpw__msg me" data-step style="--d:3.7">${c[3]}</div>`;
  msgs += `\n                <span class="cpw__sys" data-step style="--d:${cartTime(d)}">${CHECK}${c[4]}</span>`;
  return msgs;
}

/** Dark floating chips around the store mock; one accent per kind (same on both pages) */
export function chips(d: Platform) {
  const tone: Record<string, string> = { sync: "green", brand: "blue", cart: "orange" };
  const chip = ([kind, b, s]: string[], cls: string) => {
    let ic: string;
    if (kind === "brand") {
      const inner = d.slug === "shopify" ? '<img src="/assets/img/shopify-logo.png" alt="">' : '<img src="/assets/img/woo-logo.png" alt="">';
      ic = `<span class="fchip__ico fchip__ico--${d.slug === "woocommerce" ? "woo" : "shopify"}">${inner}</span>`;
    } else ic = `<span class="fchip__ico">${ico(I[kind], "2")}</span>`;
    return `<div class="fchip ${cls} fchip--${tone[kind]}" aria-hidden="true">${ic}<span><b>${b}</b><small>${s}</small></span></div>`;
  };
  return chip(d.chips[0], "fchip--a") + chip(d.chips[1], "fchip--b") + chip(d.chips[2], "fchip--c");
}

// ---------- "How it works" shots: abstract ground + faded skeleton panel + floating CartPilot card ----------
const skAdmin = () =>
  `<div class="sk sk--admin"><div class="sk__side">${"<i></i>".repeat(6)}<i class="on"></i></div><div class="sk__main"><i class="sk__title"></i><div class="sk__box"><i></i><i></i><i></i></div><div class="sk__cols"><div class="sk__box"><i></i><i></i></div><div class="sk__box"><i></i><i></i></div></div><div class="sk__box"><i></i><i></i></div></div></div>`;
const skStore = () =>
  `<div class="sk sk--store"><i class="sk__title"></i><div class="sk__grid">${'<div class="sk__card"><i class="sk__img"></i><i class="sk__l1"></i><i class="sk__l2"></i><span class="sk__dots"><b></b><b></b><b></b><b></b><b></b><b></b></span><i class="sk__btn"></i></div>'.repeat(8)}</div></div>`;
const sxCard = (sub: string, body: string, foot = "", tabs = false) => {
  const t = tabs ? `<div class="sxc__tabs"><span class="sxc__seg"><span class="on">${ico(I.chat)}Chat</span><span>${ico(I.wave)}Voice</span></span></div>` : "";
  const f = foot ? `<div class="sxc__ft">${foot}</div>` : "";
  return `<div class="sxc"><div class="sxc__hd"><span class="sxc__av"><img src="/assets/img/favicon.png" alt=""></span>`
    + `<span class="sxc__id"><b>CartPilot</b><small>${sub}</small></span><span class="sxc__ctl">${ico(I.dots)}</span><span class="sxc__ctl">${ico(I.x)}</span></div>`
    + `${t}<div class="sxc__bd">${body}</div>${f}</div>`;
};
const sxRow = (icon: string, b: string, small: string, end: string, ok = false) =>
  `<div class="sxr"><span class="sxr__ico${ok ? " ok" : ""}">${ico(I[icon])}</span><span class="sxr__t"><b>${b}</b><small>${small}</small></span>${end}</div>`;
const badge = (t: string, ok = true) => `<span class="sxbadge${ok ? " ok" : ""}">${t}</span>`;
const field = (label: string, value: string) => `<span class="sxf"><span>${label}</span><i>${value}</i></span>`;
const swatches = (colors: string[]) =>
  '<span class="sxf"><span>Widget color</span><span class="sxsw">' + colors.map((c, i) => `<b${i === 0 ? ' class="on"' : ""} style="background:${c}"></b>`).join("") + "</span></span>";
const status = (icon: string, t: string) => `<span class="sxc__status">${ico(I[icon])}${t}</span>`;
const chatCard = (ask: string, kind: string, colours: Record<string, string>, name: string, price: string, thumbBg: string) => {
  const body = `<p class="sxm">Hi, I’m Oakline Assistant. How can I help you today?</p><p class="sxm sxm--me">${ask}</p>`
    + `<div class="sxp"><div class="sxp__top"><span class="sxp__img" style="background:${thumbBg}">${art(kind, colours)}</span><span class="sxp__t"><b>${name}</b><small>${price}</small></span>`
    + `<span class="sxp__qty"><i>−</i><b>1</b><i>+</i></span></div>`
    + `<div class="sxp__btns"><span class="sxb">${ico(I.ext)}View Details</span><span class="sxb sxb--line">${ico(I.cart)}Add to Cart</span></div></div>`;
  const foot = `<span class="sxc__in">Ask anything here...</span><span class="sxc__send">${ico(I.send)}</span>`;
  return sxCard("Your personal AI Agent", body, foot, true);
};
const shot = (scene: "admin" | "store", card: string, extra = "", launch = false) =>
  `<div class="sx__panel">${scene === "store" ? skStore() : skAdmin()}</div>${extra}<div class="sxw">${card}${launch ? `<span class="sxw__launch">${ico(I.chev, "2.4")}</span>` : ""}</div>`;

/** One shot per "How it works" step, in step order */
export function howShots(d: Platform): string[] {
  const pr = d.product;
  if (d.slug === "woocommerce") return [
    shot("admin", sxCard("Plugins › Add New",
      `<span class="sxq">${ico(I.search)}CartPilot</span>`
      + `<div class="sxpl"><span class="sxpl__ico"><img src="/assets/img/favicon.png" alt=""></span><span><b>CartPilot – AI Sales Agent</b><small>By weDevs</small><em>★★★★★</em></span></div>`
      + `<div class="sxc__btns"><span class="sxb">${ico(I.ext)}More Details</span><span class="sxb sxb--line">${ico(I.plug)}Activate</span></div>`,
      status("download", "Free on WordPress.org"))),
    shot("admin", sxCard("Connect your store",
      `<p class="sxc__txt">Create your free CartPilot account, or sign in if you already have one.</p>`
      + `<div class="sxc__btns"><span class="sxb">Sign in</span><span class="sxb sxb--fill">Create account</span></div>`
      + sxRow("link", "Store connected", "oaklinestore.com", badge("Connected"), true))),
    shot("admin", sxCard("Agent settings",
      field("Agent name", "Oakline Assistant") + field("Greeting", "Hi! Need help finding a size?") + field("Voice", "Warm · Female")
      + swatches(["#2563eb", "#111827", "#8d4dff", "#ff7a45"]),
      `<span class="sxc__hint">Human Handover: CartPilot dashboard</span><span class="sxb sxb--fill">Save</span>`)),
    shot("admin", sxCard("Catalog sync",
      '<div class="sxg">' + sxRow("box", "Products &amp; variations", "2,310 items", badge("Synced"))
      + sxRow("card", "Prices &amp; stock", "Updated as they change", badge("Synced"))
      + sxRow("layers", "Categories &amp; brands", "42 categories · 18 brands", badge("Synced"))
      + sxRow("bag", "Coupons", "Applied in the chat", badge("Synced")) + "</div>",
      status("sync", "Synced just now"))),
    shot("store", chatCard("I need trail shoes under $150", pr.kind, pr.main, pr.name, pr.price, "#fff1e8"),
      '<div class="sxx"><b>Loads outside your theme</b>' + ["Your theme", "Page builders", "Checkout plugins", "Live chat tools"].map((t) => `<span class="sxx__ok">${CHECK}${t}</span>`).join("") + "</div>",
      true),
  ];
  return [
    shot("admin", sxCard("Connection",
      '<div class="sxg">' + sxRow("link", "Store connected", "oakline.myshopify.com", badge("Active"), true)
      + sxRow("user", "CartPilot account", "Created when you installed", badge("No sign-up", false))
      + sxRow("card", "Plan", "Free · billed through Shopify", '<span class="sxb sxb--fill sxb--sm">Upgrade</span>') + "</div>",
      status("lock", "No separate sign-up"))),
    shot("admin", sxCard("Agent setup",
      field("Agent name", "Oakline Assistant") + field("Greeting", "Hi! Looking for something?") + field("Voice", "Warm · Female")
      + swatches(["#2563eb", "#111827", "#95bf47", "#f97316"]),
      `<span class="sxc__hint">Changes show in the live preview</span><span class="sxb sxb--fill">Save</span>`),
      '<div class="sxx sxx--prev"><span class="sxx__lbl">Live preview</span><div class="sxx__hd"><i></i>Oakline Assistant</div><p>Hi! Looking for something?</p></div>'),
    shot("admin", sxCard("Catalog sync",
      '<div class="sxg">' + sxRow("box", "Products", "1,248 items · options included", badge("Synced"))
      + sxRow("layers", "Collections", "36 collections", badge("Synced"))
      + sxRow("search", "Product categories", "Shopify taxonomy", badge("Synced"))
      + sxRow("sync", "Deleted products", "Removed automatically", badge("Auto", false)) + "</div>",
      status("sync", "Synced just now"))),
    shot("store", chatCard("A navy jacket in size L?", pr.kind, pr.main, pr.name, pr.price, "#eef1f8"),
      '<div class="sxx"><b>App embeds</b><span class="sxx__app"><img src="/assets/img/favicon.png" alt="">CartPilot Chat<i class="sxx__tog"></i></span><span class="sxbadge live">Widget live</span></div>',
      true),
    shot("admin", sxCard("Dashboard",
      '<div class="sxs">' + [["Chats", "1,284", "+18%"], ["Carts", "312", "+24%"], ["Answered", "96%", "+3%"]].map(([a, b, c]) => `<span><small>${a}</small><b>${b}</b><em>${c}</em></span>`).join("") + "</div>"
      + '<div class="sxbars">' + [34, 42, 38, 55, 48, 61, 58, 66, 52, 71, 69, 78, 74, 88].map((h) => `<i style="height:${h}%"></i>`).join("") + "</div>",
      `<span class="sxb sxb--fill sxb--wide">Open CartPilot dashboard${ico(I.ext)}</span>`)),
  ];
}
