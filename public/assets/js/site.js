/* CartPilot — shared behaviour: nav dropdown, mobile drawer, FAQ accordion,
   subscribe form, demo chat, video modal, scroll reveal, pricing toggles. */
(() => {
  const doc = document.documentElement;
  doc.classList.add("js");
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Buttons: build the rolling label + chevron badge ----------
     <a class="btn">Label</a> → label duplicated for the hover roll; primaries also get the badge. */
  const CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.9" stroke-linecap="round" stroke-linejoin="round"><path d="m5 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>';
  const NO_BADGE = /\bbtn--(outline|soft|white|secondary|line|ghost|tertiary)\b/;
  $$(".btn").forEach((btn) => {
    if (btn.querySelector(".btn__label")) return;
    const primary = !NO_BADGE.test(btn.className);
    [...btn.childNodes].forEach((n) => {
      if (n.nodeType !== 3 || !n.textContent.trim()) return;
      let t = n.textContent.replace(/\s+/g, " ").trim();
      if (primary) t = t.replace(/\s*[→›»]$/, ""); // the badge already points the way
      const label = document.createElement("span");
      label.className = "btn__label";
      label.append(Object.assign(document.createElement("b"), { textContent: t }), Object.assign(document.createElement("b"), { textContent: t }));
      label.lastChild.setAttribute("aria-hidden", "true");
      n.replaceWith(label);
    });
    if (primary && btn.querySelector(".btn__label")) btn.insertAdjacentHTML("beforeend", `<span class="btn__ico" aria-hidden="true"><i>${CHEV}</i><i>${CHEV}</i></span>`);
  });

  /* ---------- Resources dropdown (hover on desktop, click everywhere) ---------- */
  $$("[data-dropdown]").forEach((item) => {
    const btn = $("button", item);
    let t;
    const set = (open) => { item.classList.toggle("is-open", open); btn.setAttribute("aria-expanded", String(open)); };
    btn.addEventListener("click", (e) => { e.stopPropagation(); set(!item.classList.contains("is-open")); });
    item.addEventListener("mouseenter", () => { clearTimeout(t); if (matchMedia("(hover: hover)").matches) set(true); });
    item.addEventListener("mouseleave", () => { t = setTimeout(() => set(false), 150); });
    document.addEventListener("click", (e) => { if (!item.contains(e.target)) set(false); });
    item.addEventListener("keydown", (e) => { if (e.key === "Escape") { set(false); btn.focus(); } });
  });

  /* ---------- Mobile drawer ---------- */
  const burgers = $$("[data-burger]");
  const setMenu = (open) => {
    doc.classList.toggle("menu-open", open);
    burgers.forEach((b) => b.setAttribute("aria-expanded", String(open)));
    if (open) $("#drawer a, #drawer button")?.focus({ preventScroll: true });
  };
  burgers.forEach((b) => b.addEventListener("click", () => setMenu(!doc.classList.contains("menu-open"))));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && doc.classList.contains("menu-open")) setMenu(false); });
  matchMedia("(min-width: 1025px)").addEventListener("change", (m) => m.matches && setMenu(false));
  $$("[data-drawer-group]").forEach((g) => {
    const b = $("button", g);
    b.addEventListener("click", () => { const o = !g.classList.contains("is-open"); g.classList.toggle("is-open", o); b.setAttribute("aria-expanded", String(o)); });
  });

  /* ---------- FAQ accordion ---------- */
  $$(".faq").forEach((f, i) => {
    const q = $(".faq__q", f), a = $(".faq__a", f);
    if (!q || !a) return;
    const id = a.id || `faq-a-${i}`;
    a.id = id;
    q.setAttribute("aria-controls", id);
    q.setAttribute("aria-expanded", String(f.classList.contains("is-open")));
    q.addEventListener("click", () => {
      const open = !f.classList.contains("is-open");
      if (f.closest("[data-faq-single]")) $$(".faq.is-open", f.parentElement).forEach((o) => { if (o !== f) { o.classList.remove("is-open"); $(".faq__q", o).setAttribute("aria-expanded", "false"); } });
      f.classList.toggle("is-open", open);
      q.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- Subscribe (front-end only) ---------- */
  $$("[data-subscribe]").forEach((form) => {
    const msg = form.parentElement.querySelector(".subscribe__msg");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = $("input", form);
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      if (msg) { msg.style.color = ok ? "#15803d" : "#dc2626"; msg.textContent = ok ? "Thanks! You’re on the list." : "Please enter a valid email address."; }
      if (ok) form.reset();
    });
  });

  /* ---------- Demo chat ---------- */
  const panel = $("[data-chat-panel]");
  const toggle = $("[data-chat-toggle]");
  if (panel && toggle) {
    const body = $("[data-chat-body]", panel);
    const form = $("[data-chat-form]", panel);
    const input = $("input", form);
    const answers = [
      [/price|cost|plan|lifetime|pay/i, "Plans start with a free tier. Paid plans are billed per AI conversation, and lifetime deals start at $139 for a limited time. See /pricing/ for details."],
      [/platform|woo|shopify|wordpress/i, "CartPilot works with WooCommerce and Shopify. Install the WordPress plugin or the Shopify app, connect your store and you’re live — no developer needed."],
      [/voice|talk|speak/i, "Yes — shoppers can switch between chat and voice. The agent answers out loud and can still add items to the cart."],
      [/setup|install|developer|minutes/i, "No developer needed: install the plugin, add your knowledge base and customise the widget. Most stores are live in minutes."],
      [/\b(cart|add|buy|order|track)\b/i, "CartPilot searches your live catalog, compares products, adds them to the cart, applies coupons and tracks orders — all inside the chat."],
      [/what|feature|do|can/i, "I find products from plain-English requests, compare options, add items to the cart, answer policy questions and track orders. Want to see pricing?"],
    ];
    const reply = (q) => (answers.find(([re]) => re.test(q)) || [0, "Good question! Our team can help with that — reach us from the Contact page, or start a free trial to try CartPilot on your own store."])[1];
    const add = (text, me) => {
      const p = document.createElement("p");
      p.className = "msg" + (me ? " msg--me" : "");
      p.textContent = text;
      body.appendChild(p);
      body.scrollTop = body.scrollHeight;
      return p;
    };
    const ask = (q) => {
      if (!q.trim()) return;
      $("[data-chat-chips]", body)?.remove();
      add(q, true);
      const typing = document.createElement("p");
      typing.className = "msg msg--typing";
      typing.innerHTML = "<i></i><i></i><i></i>";
      body.appendChild(typing);
      body.scrollTop = body.scrollHeight;
      setTimeout(() => { typing.remove(); add(reply(q)); }, reduce ? 0 : 700);
    };
    const setChat = (open) => { doc.classList.toggle("chat-open", open); toggle.setAttribute("aria-expanded", String(open)); if (open) setTimeout(() => input.focus({ preventScroll: true }), 50); };
    toggle.addEventListener("click", () => setChat(!doc.classList.contains("chat-open")));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && doc.classList.contains("chat-open")) setChat(false); });
    form.addEventListener("submit", (e) => { e.preventDefault(); ask(input.value); input.value = ""; });
    $$("[data-chat-chips] button", body).forEach((b) => b.addEventListener("click", () => ask(b.textContent)));
  }

  /* ---------- Video / media modal: <button data-modal-src="/assets/img/x.gif"> ---------- */
  let modal;
  $$("[data-modal-src]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      if (!modal) {
        modal = document.createElement("div");
        modal.className = "modal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-label", "Product demo");
        modal.innerHTML = '<div class="modal__box"><button class="modal__close" type="button" aria-label="Close">×</button><div data-modal-media></div></div>';
        document.body.appendChild(modal);
        const close = () => { modal.classList.remove("is-open"); setTimeout(() => ($("[data-modal-media]", modal).innerHTML = ""), 250); };
        modal.addEventListener("click", (ev) => { if (ev.target === modal || ev.target.closest(".modal__close")) close(); });
        document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") close(); });
      }
      const src = trigger.dataset.modalSrc;
      const media = /youtube\.com\/embed\//.test(src)
        ? `<div style="aspect-ratio:16/9"><iframe src="${src}${src.includes("?") ? "&" : "?"}autoplay=1" title="CartPilot demo video" style="width:100%;height:100%;border:0;display:block" allow="autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe></div>`
        : /\.(mp4|webm)$/i.test(src) ? `<video src="${src}" autoplay controls playsinline></video>` : `<img src="${src}" alt="CartPilot demo">`;
      $("[data-modal-media]", modal).innerHTML = media;
      requestAnimationFrame(() => modal.classList.add("is-open"));
      $(".modal__close", modal).focus({ preventScroll: true });
    });
  });

  /* ---------- Generic tab/segmented toggles: [data-toggle-group] > [data-toggle="key"], panes [data-pane="key"] ---------- */
  $$("[data-toggle-group]").forEach((group) => {
    const scope = group.closest("[data-toggle-scope]") || document;
    const btns = $$("[data-toggle]", group);
    const show = (key) => {
      btns.forEach((b) => { const on = b.dataset.toggle === key; b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", String(on)); });
      $$("[data-pane]", scope).forEach((p) => (p.hidden = p.dataset.pane !== key));
      $$("[data-show-for]", scope).forEach((p) => (p.hidden = !p.dataset.showFor.split(" ").includes(key)));
      scope.dispatchEvent?.(new CustomEvent("toggle:change", { detail: key }));
    };
    btns.forEach((b) => b.addEventListener("click", () => show(b.dataset.toggle)));
    const initial = btns.find((b) => b.classList.contains("is-active")) || btns[0];
    if (initial) show(initial.dataset.toggle);
  });

  /* ---------- Reveal on scroll ---------- */
  const els = $$("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) els.forEach((el) => el.classList.add("is-in"));
  else {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
  }
})();
