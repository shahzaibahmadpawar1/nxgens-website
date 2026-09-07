# Rebuilds HTML pages from a monolith source file. Run: python build_pages.py
# Place the original single-file site at index.monolith.html (optional) to regenerate.
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "index.monolith.html"
if not SOURCE.exists():
    SOURCE = ROOT / "index.html"
lines = SOURCE.read_text(encoding="utf-8").splitlines()
if len(lines) < 3200:
    raise SystemExit(
        "Source HTML too short for slice rebuild. Save the original single-file site as "
        "index.monolith.html (full ~4000-line file), then run build_pages.py again."
    )

THEME_FLASH = """<script>
try {
  var __t = localStorage.getItem('theme');
  if (__t === 'light' || __t === 'dark') {
    document.documentElement.setAttribute('toggle-theme', __t);
    document.body.setAttribute('toggle-theme', __t);
  }
} catch (e) {}
</script>"""

HEAD_TOP = """<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>"""

HEAD_ICONS = """<link rel="icon" type="image/png" href="favicon.png">
<link rel="shortcut icon" href="./favicon.png">
<link rel="apple-touch-icon" href="./favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&family=Barlow+Condensed:wght@400;500;600;700;800&family=Noto+Kufi+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet">"""


def head(title: str) -> str:
    return "\n".join(
        [
            HEAD_TOP,
            f"<title>{title}</title>",
            HEAD_ICONS,
            '  <link rel="stylesheet" href="styles.css"/>',
            "</head>",
        ]
    )


def nav(active: str) -> str:
    def li(page: str, href: str, en: str, ar: str) -> str:
        cls = ' class="active"' if page == active else ""
        return f'      <li><a href="{href}"{cls} data-en="{en}" data-ar="{ar}">{en}</a></li>'

    lis = "\n".join(
        [
            li("home", "index.html", "Home", "الرئيسية"),
            li("about", "about.html", "About Us", "عن الشركة"),
            li("services", "services.html", "Services", "الخدمات"),
            li("workshop", "workshop.html", "Workshop", "الورشة"),
            li("contact", "contact.html", "Contact", "تواصل معنا"),
        ]
    )

    def ma(href: str, en: str, ar: str) -> str:
        return f'  <a href="{href}" data-en="{en}" data-ar="{ar}">{en}</a>'

    mobile = "\n".join(
        [
            ma("index.html", "Home", "الرئيسية"),
            ma("about.html", "About Us", "عن الشركة"),
            ma("services.html", "Services", "الخدمات"),
            ma("workshop.html", "Workshop", "الورشة"),
            ma("contact.html", "Contact", "تواصل معنا"),
        ]
    )

    return f"""<!-- Shared nav — keep in sync across pages -->
<nav id="navbar">
  <div class="nav-inner">
    <a class="logo" href="index.html">
      <img src="logo.png" alt="NexGen Build logo" height="44" />
    </a>
    <ul class="nav-links">
{lis}
    </ul>
    <div class="nav-right">
      <button type="button" class="theme-toggle" id="btn-theme" aria-pressed="false" aria-label="Toggle color theme" title="Theme">
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="5" fill="currentColor"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/></svg>
      </button>
      <div class="lang-toggle">
        <button type="button" class="lang-btn active" id="btn-en" onclick="setLang('en')">EN</button>
        <button type="button" class="lang-btn" id="btn-ar" onclick="setLang('ar')">AR</button>
      </div>
      <a class="btn-quote" href="contact.html" data-en="Get a Quote" data-ar="طلب عرض سعر">Get a Quote</a>
      <div class="hamburger" onclick="toggleMobile()">
        <span></span><span></span><span></span>
      </div>
    </div>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu">
{mobile}
  <div class="mobile-lang">
    <button type="button" class="lang-btn active" id="m-btn-en" onclick="setLang('en')">EN</button>
    <button type="button" class="lang-btn" id="m-btn-ar" onclick="setLang('ar')">AR</button>
  </div>
  <div class="mobile-theme">
    <span data-en="Theme" data-ar="المظهر">Theme</span>
    <button type="button" class="theme-toggle" id="m-btn-theme" aria-pressed="false" aria-label="Toggle color theme" title="Theme">
      <svg class="icon-sun" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="5" fill="currentColor"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      <svg class="icon-moon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/></svg>
    </button>
  </div>
</div>
"""


# Footer lines 3386-3436 (1-based)
footer = "\n".join(lines[3385:3436])
repl = [
    ('onclick="showPage(\'home\')"', 'href="index.html"'),
    ('onclick="showPage(\'about\')"', 'href="about.html"'),
    ('onclick="showPage(\'services\')"', 'href="services.html"'),
    ('onclick="showPage(\'workshop\')"', 'href="workshop.html"'),
    ('onclick="showPage(\'contact\')"', 'href="contact.html"'),
    ('onclick="showPage(\'services\');showTab(\'general\')"', 'href="services.html#general"'),
    ('onclick="showPage(\'services\');showTab(\'electrical\')"', 'href="services.html#electrical"'),
    ('onclick="showPage(\'services\');showTab(\'sanitary\')"', 'href="services.html#sanitary"'),
    ('onclick="showPage(\'services\');showTab(\'hvac\')"', 'href="services.html#hvac"'),
    ('onclick="showPage(\'services\');showTab(\'waterproofing\')"', 'href="services.html#waterproofing"'),
    ('onclick="showPage(\'services\');showTab(\'fire\')"', 'href="services.html#fire"'),
]
for a, b in repl:
    footer = footer.replace(a, b)

WHATSAPP = "\n".join(lines[3436:3441])


def fix_home_body(s: str) -> str:
    s = s.replace(
        '<span onclick="showPage(\'home\')" style="cursor:pointer;" data-en="Home" data-ar="الرئيسية">Home</span>',
        '<a href="index.html" style="cursor:pointer;text-decoration:none;color:inherit;" data-en="Home" data-ar="الرئيسية">Home</a>',
    )
    s = s.replace(
        '<button class="btn-primary" onclick="showPage(\'services\')">',
        '<a class="btn-primary" href="services.html">',
    )
    s = s.replace(
        """            <span data-en="Explore Services" data-ar="استكشف الخدمات">Explore Services</span> →
          </button>""",
        """            <span data-en="Explore Services" data-ar="استكشف الخدمات">Explore Services</span> →
          </a>""",
    )
    s = s.replace(
        '<button class="btn-outline" onclick="showPage(\'contact\')">',
        '<a class="btn-outline" href="contact.html">',
    )
    s = s.replace(
        """            <span data-en="Get a Quote" data-ar="طلب عرض سعر">Get a Quote</span>
          </button>""",
        """            <span data-en="Get a Quote" data-ar="طلب عرض سعر">Get a Quote</span>
          </a>""",
    )

    s = s.replace(
        '<button style="padding:12px 24px;border-radius:10px;background:transparent;border:1.5px solid var(--gray-200);color:var(--gray-800);font-size:14px;font-weight:600;cursor:pointer;" onclick="showPage(\'services\')" data-en="View All Services →" data-ar="عرض جميع الخدمات →">View All Services →</button>',
        '<a style="padding:12px 24px;border-radius:10px;background:transparent;border:1.5px solid var(--gray-200);color:var(--gray-800);font-size:14px;font-weight:600;cursor:pointer;display:inline-block;text-decoration:none;box-sizing:border-box;" href="services.html" data-en="View All Services →" data-ar="عرض جميع الخدمات →">View All Services →</a>',
    )

    cards = [
        ("general", "general"),
        ("electrical", "electrical"),
        ("hvac", "hvac"),
        ("sanitary", "sanitary"),
        ("waterproofing", "waterproofing"),
        ("fire", "fire"),
    ]
    for tab, _ in cards:
        s = s.replace(
            f'<div class="service-card" onclick="showPage(\'services\');showTab(\'{tab}\')">',
            f'<a class="service-card" href="services.html#{tab}" style="text-decoration:none;color:inherit;display:block;">',
        )
    s = s.replace(
        '<div class="service-more" data-en="Learn more →" data-ar="اعرف أكثر →">Learn more →</div>\n        </div>',
        '<div class="service-more" data-en="Learn more →" data-ar="اعرف أكثر →">Learn more →</div>\n        </a>',
    )

    s = s.replace(
        '<button style="padding:12px 24px;border-radius:10px;background:var(--white);border:1.5px solid var(--gray-200);color:var(--gray-800);font-size:14px;font-weight:700;cursor:pointer;box-shadow:var(--shadow-sm);" onclick="showPage(\'about\')" data-en="Learn About Us →" data-ar="تعرف علينا →">Learn About Us →</button>',
        '<a style="padding:12px 24px;border-radius:10px;background:var(--white);border:1.5px solid var(--gray-200);color:var(--gray-800);font-size:14px;font-weight:700;cursor:pointer;box-shadow:var(--shadow-sm);display:inline-block;text-decoration:none;box-sizing:border-box;" href="about.html" data-en="Learn About Us →" data-ar="تعرف علينا →">Learn About Us →</a>',
    )

    gal = [
        (
            '<a class="gallery-hover-row is-active" href="#" data-gallery-index="0" onclick="showPage(\'about\'); return false;"',
            '<a class="gallery-hover-row is-active" href="about.html" data-gallery-index="0"',
        ),
        (
            '<a class="gallery-hover-row" href="#" data-gallery-index="1" onclick="showPage(\'services\');showTab(\'general\'); return false;"',
            '<a class="gallery-hover-row" href="services.html#general" data-gallery-index="1"',
        ),
        (
            '<a class="gallery-hover-row" href="#" data-gallery-index="2" onclick="showPage(\'services\');showTab(\'electrical\'); return false;"',
            '<a class="gallery-hover-row" href="services.html#electrical" data-gallery-index="2"',
        ),
        (
            '<a class="gallery-hover-row" href="#" data-gallery-index="3" onclick="showPage(\'workshop\'); return false;"',
            '<a class="gallery-hover-row" href="workshop.html" data-gallery-index="3"',
        ),
        (
            '<a class="gallery-hover-row" href="#" data-gallery-index="4" onclick="showPage(\'services\');showTab(\'waterproofing\'); return false;"',
            '<a class="gallery-hover-row" href="services.html#waterproofing" data-gallery-index="4"',
        ),
        (
            '<a class="gallery-hover-row" href="#" data-gallery-index="5" onclick="showPage(\'contact\'); return false;"',
            '<a class="gallery-hover-row" href="contact.html" data-gallery-index="5"',
        ),
    ]
    for a, b in gal:
        s = s.replace(a, b)

    s = s.replace(
        '<button type="button" class="home-cta-btn" onclick="showPage(\'contact\')" data-en="Get in Touch →" data-ar="تواصل معنا →">Get in Touch →</button>',
        '<a class="home-cta-btn" href="contact.html" data-en="Get in Touch →" data-ar="تواصل معنا →">Get in Touch →</a>',
    )
    return s


def fix_inner_pages(s: str) -> str:
    s = s.replace(
        '<span onclick="showPage(\'home\')" style="cursor:pointer;" data-en="Home" data-ar="الرئيسية">Home</span>',
        '<a href="index.html" style="cursor:pointer;text-decoration:none;color:inherit;" data-en="Home" data-ar="الرئيسية">Home</a>',
    )
    s = s.replace(
        "<span onclick=\"showPage('home')\" style=\"cursor:pointer;\" data-en=\"Home\" data-ar=\"الرئيسية\">Home</span> &nbsp;/&nbsp;",
        '<a href="index.html" style="cursor:pointer;text-decoration:none;color:inherit;" data-en="Home" data-ar="الرئيسية">Home</a> &nbsp;/&nbsp;',
    )
    return s


SLICES = {
    "index": (2128, 2559),
    "about": (2567, 2812),
    "services": (2821, 3060),
    "workshop": (3068, 3236),
    "contact": (3244, 3379),
}

PAGES = [
    ("index.html", "index", "NexGen Build Company", "home", True),
    ("about.html", "about", "About Us — NexGen Build Company", "about", False),
    ("services.html", "services", "Services — NexGen Build Company", "services", False),
    ("workshop.html", "workshop", "Workshop — NexGen Build Company", "workshop", False),
    ("contact.html", "contact", "Contact — NexGen Build Company", "contact", False),
]

for fname, key, title, nav_key, is_home in PAGES:
    a, b = SLICES[key]
    body = "\n".join(lines[a - 1 : b])
    if is_home:
        body = fix_home_body(body)
    else:
        body = fix_inner_pages(body)
    doc = "\n".join(
        [
            head(title),
            "<body>",
            THEME_FLASH,
            nav(nav_key),
            body,
            footer,
            WHATSAPP,
            '<script src="main.js" defer></script>',
            "</body>",
            "</html>",
        ]
    )
    (ROOT / fname).write_text(doc, encoding="utf-8")
    print("Wrote", fname)

print("Done.")
