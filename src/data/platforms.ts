// Copy for the two platform pages. Both render through one template (src/pages/[platform].astro),
// so a layout change made there lands on WooCommerce and Shopify together. Strings may contain HTML.

export interface Platform {
  slug: "woocommerce" | "shopify";
  body: string;             // body class: accent colours (pf--woo / pf--shopify)
  name: string;             // platform name in the H1
  title: string;            // <title>
  desc: string;             // meta description
  pill: string | null;      // optional tag above the H1 (removed for now)
  lead: string;
  buttons: string[];        // hero buttons (HTML)
  trust: string[];
  switch: string[] | null;  // optional "Running a … store?" line (removed for now)
  url: string;              // address bar of the store mock
  nav: string[];            // store mock menu
  product: {
    kind: string; crumb: string; name: string; price: string; rating: string;
    colors: [string, boolean][]; color_name: string;
    sizes: [string, string][]; size_label: string;
    main: Record<string, string>; thumbs: Record<string, string>[];
    badge: string; note: string;
  };
  chat: (string | string[] | null)[];   // shopper msg, agent reply, product card [title, meta, btn, btn], optional 2nd msg, system line
  chips: string[][];                     // [kind, title, subtitle] × 3
  feat_h2: string; feat_p: string;
  feats: string[][];                     // [icon, bg, fg, title, text]
  how_h2: string; how_p: string;
  how: string[][];                       // [title, text] × 5 (shots in src/lib/platform.ts)
  how_icons: string[];
  how_ui?: ([string, number] | null)[];   // real screenshot per step: [file in /assets/img/how/, width % of the frame]; null = keep the drawn mock
  how_note: string;
  steps_h2: string; steps_p: string;
  steps: string[][];                     // [icon, title, text] × 3
  steps_note: string | null;
  guide: string;
  faq_chip: string; faq_h2: string; faq_p: string;
  faqs: string[][];                      // [question, answer]
  cta_h2: string; cta_p: string;
  cta_buttons: string[];                 // HTML
}

export const platforms: Record<string, Platform> = {
  "shopify": {
    "slug": "shopify",
    "body": "pf--shopify",
    "name": "Shopify",
    "title": "CartPilot for Shopify - AI Sales Agent for Your Shopify Store",
    "desc": "Install CartPilot from the Shopify App Store. Shoppers ask by chat or voice, and CartPilot answers from your Shopify catalog, suggests what fits, and adds it to their cart.",
    "pill": null,
    "lead": "Shoppers ask in their own words, by voice or text. CartPilot answers from your Shopify catalog, suggests what fits, and adds it straight to their cart.",
    "buttons": [
      "<a class=\"btn btn--lg\" href=\"https://apps.shopify.com/search?q=cartpilot\" target=\"_blank\" rel=\"noopener\">Install on Shopify</a>"
    ],
    "trust": [
      "Start on the Free plan",
      "Set up inside your Shopify admin",
      "No code"
    ],
    "switch": null,
    "url": "oakline.myshopify.com/products/harbor-field-jacket",
    "nav": [
      "New in",
      "Outerwear",
      "Knitwear",
      "About"
    ],
    "product": {
      "kind": "jacket",
      "crumb": "Home / Outerwear",
      "name": "Harbor Field Jacket",
      "price": "$148.00",
      "rating": "4.8 · 126 reviews",
      "colors": [
        [
          "#22305a",
          true
        ],
        [
          "#5b6b3a",
          false
        ],
        [
          "#d6c4a1",
          false
        ]
      ],
      "color_name": "Navy",
      "sizes": [
        [
          "S",
          ""
        ],
        [
          "M",
          ""
        ],
        [
          "L",
          "on"
        ],
        [
          "XL",
          ""
        ],
        [
          "XXL",
          "off"
        ]
      ],
      "size_label": "Size",
      "main": {
        "a": "#26345f",
        "b": "#1f2b50",
        "c": "#3a4c86",
        "d": "#18213e",
        "z": "#c9a96e"
      },
      "thumbs": [
        {
          "a": "#26345f",
          "b": "#1f2b50",
          "c": "#3a4c86",
          "d": "#18213e",
          "z": "#c9a96e"
        },
        {
          "a": "#5b6b3a",
          "b": "#4e5c31",
          "c": "#6f8148",
          "d": "#414d29",
          "z": "#c9a96e"
        },
        {
          "a": "#d6c4a1",
          "b": "#c4b08b",
          "c": "#b59f78",
          "d": "#a8916a",
          "z": "#7a6440"
        },
        {
          "a": "#3b3b3f",
          "b": "#313135",
          "c": "#55555b",
          "d": "#2a2a2e",
          "z": "#c9a96e"
        }
      ],
      "badge": "Bestseller",
      "note": "Free shipping and returns over $100"
    },
    "chat": [
      "Does this jacket come in navy, size L?",
      "Yes, navy in L is in stock. Want me to add it?",
      [
        "Harbor Field Jacket",
        "Navy · L · In stock",
        "View Details",
        "Add to Cart"
      ],
      "Yes, add it please",
      "Added to cart"
    ],
    "chips": [
      [
        "cart",
        "Added to cart",
        "Harbor Field Jacket · Navy, L"
      ],
      [
        "brand",
        "Shopify App Store",
        "Start on the Free plan"
      ],
      [
        "sync",
        "Catalog synced",
        "Products, options and collections"
      ]
    ],
    "feat_h2": "What CartPilot Does for <span>Your Shopify Store</span>",
    "feat_p": "Your store stays open all night. CartPilot makes sure someone is always there to help shoppers find what they want and buy it.",
    "feats": [
      [
        "chat",
        "#eff6ff",
        "#2563eb",
        "Answers by Chat or Voice",
        "Shoppers type or hold to speak. CartPilot replies from your products, policies, and FAQs, and says so when it doesn’t know. Voice is on paid plans."
      ],
      [
        "search",
        "#fff7e6",
        "#d97706",
        "Recommends What You Actually Sell",
        "It knows your collections, categories, and price range, and suggests in-stock products that fit the shopper’s needs and budget."
      ],
      [
        "cart",
        "#f0fdf4",
        "#16a34a",
        "Turns Questions Into Carts",
        "Shoppers tap Add to Cart on product cards, pick their options, and go to checkout from the cart summary in the chat."
      ],
      [
        "team",
        "#f1eeff",
        "#7047eb",
        "Brings In Your Team When Needed",
        "Shoppers can ask for a real person, and your team replies in the same chat. Human Handover is on the Growth and Scale plans."
      ]
    ],
    "how_h2": "How CartPilot Works <span>Inside Shopify</span>",
    "how_p": "You run CartPilot from the same Shopify admin you already use every day.",
    "how": [
      [
        "Your account sets itself up.",
        "Installing the app creates your CartPilot account and connects your store. There’s no separate sign-up."
      ],
      [
        "Everything lives in your Shopify admin.",
        "Set your agent’s name, greeting, voice, avatar, colors, and widget position, with a live preview as you edit."
      ],
      [
        "Your Shopify data stays in sync.",
        "Products, options, collections, and product categories sync on their own. Products you delete in Shopify are removed automatically."
      ],
      [
        "Goes live with one app embed.",
        "Switch on “CartPilot Chat” in your theme editor. No code and no theme files to edit."
      ],
      [
        "Conversations and analytics, one click away.",
        "“Open CartPilot dashboard” signs you straight in to review conversations, analytics, and training."
      ]
    ],
    "how_icons": [
      "user",
      "gear",
      "sync",
      "toggle",
      "chart"
    ],
    "how_ui": [["shop-ui-1.png", 63], ["shop-ui-2.png", 82], ["shop-ui-3.png", 82], ["shop-ui-4.png", 82], ["shop-ui-5.png", 82]],
    "how_note": "Your CartPilot plan is billed through your Shopify account.",
    "steps_h2": "Live on Your Shopify Store <span>in Three Steps</span>",
    "steps_p": "No developer and no code. Most of it happens inside your Shopify admin.",
    "steps": [
      [
        "download",
        "Install the app",
        "Install CartPilot from the Shopify App Store and approve the permissions. Your account and store connect automatically."
      ],
      [
        "toggle",
        "Turn on the chat widget",
        "In your theme editor, open App embeds and switch on “CartPilot Chat”. The status changes to “Widget live”."
      ],
      [
        "palette",
        "Make it yours",
        "Set your agent’s name, greeting, voice, and colors, add your policies and FAQs, and you’re ready to sell."
      ]
    ],
    "steps_note": null,
    "guide": "Read the full Shopify setup guide →",
    "faq_chip": "Shopify FAQ",
    "faq_h2": "Shopify Questions, Answered",
    "faq_p": "What Shopify merchants usually ask before they install.",
    "faqs": [
      [
        "Do I need to create a CartPilot account first?",
        "No. Your CartPilot account is created automatically when you install the app. If you sign up on the website first and then install, you’ll end up with two separate accounts, so start from the Shopify App Store."
      ],
      [
        "I already use CartPilot for another store. Can I manage them together?",
        "Yes. After you install the app, open the Connection page and choose “Move to a different account”. Your stores then sit together under one CartPilot account."
      ],
      [
        "How do I turn on the chat widget?",
        "In your Shopify admin, go to Online Store &gt; Themes &gt; Customize &gt; App embeds, switch on “CartPilot Chat”, and save. The “Open theme editor” button on CartPilot’s Connection page takes you straight there."
      ],
      [
        "Is the voice agent included?",
        "Voice is included on all paid plans: Pilot, Growth, and Scale. The Free plan includes text chat."
      ],
      [
        "Can I use CartPilot on both Shopify and WooCommerce?",
        "Yes, and every feature works the same on both. Each store counts separately, so running one Shopify store and one WooCommerce store needs a plan with at least two stores."
      ],
      [
        "How am I billed?",
        "Your plan is billed through your Shopify account. Pick your plan inside the app, and you can start on the Free plan."
      ],
      [
        "Where do I see conversations and analytics?",
        "Click “Open CartPilot dashboard” in the app. It opens your CartPilot dashboard, already signed in, where you can review conversations, products, and training, plus analytics on paid plans."
      ]
    ],
    "cta_h2": "Give Your Shopify Store a Salesperson That Never Clocks Out",
    "cta_p": "Install CartPilot, start on the Free plan, and let it help shoppers find, decide, and buy, day and night.",
    "cta_buttons": [
      "<a class=\"btn\" href=\"https://apps.shopify.com/search?q=cartpilot\" target=\"_blank\" rel=\"noopener\">Install on Shopify</a>",
      "<a class=\"btn btn--white\" href=\"/pricing/\">See Plans &amp; Pricing</a>"
    ]
  },
  "woocommerce": {
    "slug": "woocommerce",
    "body": "pf--woo",
    "name": "WooCommerce",
    "title": "CartPilot for WooCommerce - AI Sales Agent WordPress Plugin",
    "desc": "Install the free CartPilot plugin for WooCommerce. Shoppers talk or type, and CartPilot finds the right product, answers their questions, and adds it to their real cart.",
    "pill": null,
    "lead": "Install one plugin and your store gets a salesperson that never logs off. Shoppers talk or type, and CartPilot finds the right product, answers their questions, and adds it to their real cart.",
    "buttons": [
      "<a class=\"btn btn--lg\" href=\"https://wordpress.org/plugins/search/cartpilot/\" target=\"_blank\" rel=\"noopener\">Get the WordPress Plugin</a>",
      "<a class=\"btn btn--secondary btn--lg\" href=\"/pricing/\">See Plans &amp; Pricing</a>"
    ],
    "trust": [
      "Free plugin on WordPress.org",
      "Start on the Free plan",
      "No code"
    ],
    "switch": null,
    "url": "oaklinestore.com/product/trail-runner",
    "nav": [
      "Shop",
      "Running",
      "Trail",
      "Journal"
    ],
    "product": {
      "kind": "shoe",
      "crumb": "Shop / Running / Trail",
      "name": "Trail Runner",
      "price": "$129.00",
      "rating": "4.7 · 212 reviews",
      "colors": [
        [
          "#9aa1ab",
          true
        ],
        [
          "#1f2937",
          false
        ],
        [
          "#2f6b5a",
          false
        ]
      ],
      "color_name": "Grey",
      "sizes": [
        [
          "7",
          ""
        ],
        [
          "8",
          ""
        ],
        [
          "9",
          "on"
        ],
        [
          "10",
          ""
        ],
        [
          "11",
          "off"
        ]
      ],
      "size_label": "US size",
      "main": {
        "a": "#9aa1ab",
        "b": "#6b7280",
        "c": "#f4f5f7",
        "d": "#ff7a45",
        "z": "#ffffff"
      },
      "thumbs": [
        {
          "a": "#9aa1ab",
          "b": "#6b7280",
          "c": "#f4f5f7",
          "d": "#ff7a45",
          "z": "#ffffff"
        },
        {
          "a": "#1f2937",
          "b": "#4b5563",
          "c": "#e5e7eb",
          "d": "#22c55e",
          "z": "#ffffff"
        },
        {
          "a": "#2f6b5a",
          "b": "#1f4d40",
          "c": "#f1f5f2",
          "d": "#f59e0b",
          "z": "#ffffff"
        },
        {
          "a": "#c7a17a",
          "b": "#9b7a56",
          "c": "#f7f3ee",
          "d": "#3b82f6",
          "z": "#ffffff"
        }
      ],
      "badge": "New season",
      "note": "Free returns within 30 days"
    },
    "chat": [
      "These in a 9, but in grey?",
      "Grey is in stock in size 9. I’ve added them to your cart.",
      [
        "Trail Runner",
        "Grey · Size 9 · Added to cart",
        "View Details",
        "Go to Checkout"
      ],
      null,
      "Coupon SAVE10 applied"
    ],
    "chips": [
      [
        "cart",
        "Added to cart",
        "Trail Runner · Grey, size 9"
      ],
      [
        "brand",
        "WordPress.org plugin",
        "Free to install"
      ],
      [
        "sync",
        "WooCommerce synced",
        "Variations, stock and coupons"
      ]
    ],
    "feat_h2": "What CartPilot Does for <span>Your WooCommerce Store</span>",
    "feat_p": "Shoppers land on your store with questions at all hours. CartPilot is there to answer them, point them to the right product, and help them buy.",
    "feats": [
      [
        "chat",
        "#eff6ff",
        "#2563eb",
        "Answers Questions, Day or Night",
        "Sizing, shipping, returns, product details. CartPilot answers by chat or voice from your products, policies, and FAQs. Voice is on paid plans."
      ],
      [
        "search",
        "#fff7e6",
        "#d97706",
        "Finds the Right Product",
        "It knows your categories, brands, and price range, and suggests in-stock products that match the shopper’s needs and budget."
      ],
      [
        "cart",
        "#f0fdf4",
        "#16a34a",
        "Adds It to the Real Cart",
        "It picks the right size, color, and quantity, updates the cart on request, and applies coupon codes, all inside the chat."
      ],
      [
        "truck",
        "#f1eeff",
        "#7047eb",
        "Tracks Orders for Your Customers",
        "Customers signed in to your store can check their order status in the chat, without waiting for your team."
      ]
    ],
    "how_h2": "How CartPilot Works <span>With WooCommerce</span>",
    "how_p": "It installs and runs like the WordPress plugins you already know.",
    "how": [
      [
        "Install it like any other plugin.",
        "Get CartPilot from WordPress.org, or search for it under Plugins &gt; Add New in your WordPress admin."
      ],
      [
        "Connect your account from the plugin.",
        "Create your free CartPilot account during setup, or sign in if you already have one. Then connect your store from the plugin settings."
      ],
      [
        "Manage it inside WordPress.",
        "Your agent’s name, greeting, voice, look, and most other settings live in your WordPress admin. A few extras, like Human Handover, are set up in your CartPilot dashboard."
      ],
      [
        "Your WooCommerce data stays in sync.",
        "Products, variations, prices, stock, categories, brands, and coupons sync on their own."
      ],
      [
        "Fits around your setup.",
        "CartPilot loads as a widget outside your theme layer. It doesn’t change your templates or get in the way of page builders, checkout plugins, or your live chat tool."
      ]
    ],
    "how_icons": [
      "download",
      "link",
      "gear",
      "sync",
      "layers"
    ],
    "how_ui": [["woo-ui-1.png", 63], ["woo-ui-2.png", 82], ["woo-ui-4.png", 80], ["woo-ui-3.png", 80], null],
    "how_note": "Lifetime plans, with the option to use your own AI provider key, are available for WooCommerce stores. <a href=\"/pricing/\">See Plans &amp; Pricing →</a>",
    "steps_h2": "Live on Your WooCommerce Store <span>in Three Steps</span>",
    "steps_p": "No developer and no code. Everything starts from your WordPress admin.",
    "steps": [
      [
        "download",
        "Install the plugin",
        "Install CartPilot from WordPress.org, or search for it in your WordPress admin under Plugins &gt; Add New, then activate it."
      ],
      [
        "link",
        "Connect your store",
        "Open the CartPilot settings, create your free account or sign in, and connect your store. Your catalog syncs on its own."
      ],
      [
        "palette",
        "Make it yours",
        "Set your agent’s name, greeting, voice, and colors, add your policies and FAQs, and you’re ready to sell."
      ]
    ],
    "steps_note": "If you already signed up at app.cartpilot.ai, just install the plugin and sign in when you connect your store.",
    "guide": "Read the full WooCommerce setup guide →",
    "faq_chip": "WooCommerce FAQ",
    "faq_h2": "WooCommerce Questions, Answered",
    "faq_p": "What store owners usually ask before they install the plugin.",
    "faqs": [
      [
        "Do I need a CartPilot account?",
        "Yes. The plugin connects your store to your CartPilot account. You can create a free account during setup, right from the plugin. If you already have one, just sign in and connect your store."
      ],
      [
        "What do I need to run CartPilot?",
        "A WooCommerce store on WordPress 6.6 or higher, with PHP 7.4 or higher."
      ],
      [
        "Will CartPilot slow down my store?",
        "CartPilot is built to stay light. It loads as a separate widget without blocking your WordPress admin, and it answers from a synced copy of your catalog instead of running heavy searches on every page load."
      ],
      [
        "Will it work with my theme and plugins?",
        "CartPilot sits outside your theme layer, so it works with standard WooCommerce setups and doesn’t conflict with page builders, checkout plugins, or live chat tools. If your theme is heavily customized, try it on a staging site first."
      ],
      [
        "Where do I manage my settings?",
        "Most settings, such as your agent’s name, greeting, voice, and widget look, are in your WordPress admin. A few, like Human Handover, are in your CartPilot dashboard at app.cartpilot.ai."
      ],
      [
        "Is the voice agent included?",
        "Voice comes with every paid plan. The Free plan includes text chat."
      ],
      [
        "Are Lifetime plans available for WooCommerce?",
        "Yes. Lifetime plans are a one-time payment and are available only for WooCommerce stores. They include a set number of conversations each month, and unlimited conversations when you connect your own AI provider key. See the Pricing page for current plans."
      ],
      [
        "Can I use CartPilot on both WooCommerce and Shopify?",
        "Yes, and the features are the same on both. Each store counts separately, so a WooCommerce store plus a Shopify store needs a plan that covers at least two stores."
      ]
    ],
    "cta_h2": "Your Store Never Closes. Now It Never Stops Selling.",
    "cta_p": "Install the free plugin, connect your WooCommerce store, and let CartPilot help shoppers find, decide, and buy, day and night.",
    "cta_buttons": [
      "<a class=\"btn\" href=\"https://wordpress.org/plugins/search/cartpilot/\" target=\"_blank\" rel=\"noopener\">Get the WordPress Plugin</a>",
      "<a class=\"btn btn--white\" href=\"/pricing/\">See Plans &amp; Pricing</a>"
    ]
  }
} as Record<string, Platform>;
