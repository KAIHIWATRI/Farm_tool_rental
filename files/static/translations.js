const TRANSLATIONS = {
  en: {
    // Navbar
    "nav.brand":         "FarmRent",
    "nav.admin_panel":   "Admin Panel",
    "nav.browse_tools":  "Browse Tools",
    "nav.my_bookings":   "My Bookings",
    "nav.logout":        "Logout",
    "nav.lang_toggle":   "தமிழ்",

    // Login
    "login.title":       "Welcome Back",
    "login.subtitle":    "Sign in to manage your farm equipment rentals",
    "login.username":    "Username",
    "login.username_ph": "Enter your username",
    "login.password":    "Password",
    "login.password_ph": "Enter your password",
    "login.btn":         "Sign In →",
    "login.no_account":  "Don't have an account?",
    "login.register":    "Register here",
    "login.admin_hint":  "Default admin:",

    // Register
    "register.title":    "Create Account",
    "register.subtitle": "Join FarmRent and access hundreds of farm tools",
    "register.username": "Username",
    "register.username_ph": "Choose a username",
    "register.email":    "Email Address",
    "register.email_ph": "your@email.com",
    "register.password": "Password",
    "register.password_ph": "Choose a strong password",
    "register.hint":     "At least 6 characters recommended.",
    "register.btn":      "Create Account →",
    "register.have_account": "Already have an account?",
    "register.login":    "Sign in here",

    // User Dashboard
    "dash.hello":        "Hello",
    "dash.hero_sub":     "Browse our available farm equipment and book the tools you need.",
    "dash.available":    "Available Equipment",
    "dash.my_bookings":  "My Bookings",
    "dash.no_tools":     "No equipment available right now. Check back soon!",
    "dash.per_day":      "/day",
    "dash.available_qty":"available",
    "dash.out_of_stock": "Out of stock",
    "dash.book_now":     "Book Now",
    "dash.join_queue":   "Join Queue",

    // Admin Dashboard
    "admin.total_tools":    "Total Tools",
    "admin.all_bookings":   "All Bookings",
    "admin.pending":        "Pending",
    "admin.users":          "Registered Users",
    "admin.manage_equip":   "Manage Equipment",
    "admin.add_tool":       "+ Add New Tool",
    "admin.col_tool":       "Tool",
    "admin.col_price":      "Price/day",
    "admin.col_qty":        "Qty",
    "admin.col_status":     "Status",
    "admin.col_actions":    "Actions",
    "admin.enabled":        "Enabled",
    "admin.disabled":       "Disabled",
    "admin.edit":           "Edit",
    "admin.disable":        "Disable",
    "admin.enable":         "Enable",
    "admin.delete":         "Delete",
    "admin.no_tools":       "No tools yet.",
    "admin.add_one":        "Add one now",
    "admin.all_bookings_h": "All Bookings",
    "admin.col_user":       "User",
    "admin.col_date":       "Date & Time",
    "admin.col_contact":    "Contact",
    "admin.approve":        "Approve",
    "admin.reject":         "Reject",
    "admin.no_bookings":    "No bookings have been made yet.",
    "admin.confirm_delete": "Delete this tool? This cannot be undone.",

    // Booking
    "book.back":         "← Back to Browse",
    "book.complete":     "Complete Booking",
    "book.phone":        "Phone Number",
    "book.phone_ph":     "+91 98765 43210",
    "book.address":      "Delivery / Pickup Address",
    "book.address_ph":   "Enter your full address",
    "book.date":         "Booking Date",
    "book.time":         "Preferred Time",
    "book.submit":       "Submit Booking Request",
    "book.queue_btn":    "Join Queue",
    "book.in_stock":     "in stock",
    "book.out_of_stock": "Out of stock – will be queued",
    "book.queue_warn":   "This tool is currently out of stock. Your booking will be queued and fulfilled as soon as stock is replenished (FIFO order).",
    "book.no_desc":      "No description available.",

    // History
    "hist.title":        "My Booking History",
    "hist.back":         "← Browse Tools",
    "hist.col_tool":     "Tool",
    "hist.col_price":    "Price/day",
    "hist.col_booked":   "Booked For",
    "hist.col_phone":    "Phone",
    "hist.col_address":  "Address",
    "hist.col_status":   "Status",
    "hist.col_req":      "Requested On",
    "hist.fifo":         "FIFO queue",
    "hist.leg_pending":  "Awaiting admin review",
    "hist.leg_approved": "Confirmed & quantity reserved",
    "hist.leg_rejected": "Not approved",
    "hist.leg_queued":   "Waiting for stock (FIFO)",
    "hist.empty":        "You haven't made any bookings yet.",
    "hist.browse":       "Browse Equipment",

    // Edit Tool
    "tool.edit_title":   "Edit Tool",
    "tool.add_title":    "Add New Tool",
    "tool.back":         "← Back to Dashboard",
    "tool.name":         "Tool Name *",
    "tool.name_ph":      "e.g. Tractor, Harvester, Cultivator",
    "tool.desc":         "Description",
    "tool.desc_ph":      "Describe the tool, its capacity, usage, etc.",
    "tool.price":        "Price per Day (₹) *",
    "tool.qty":          "Available Quantity *",
    "tool.image":        "Tool Image",
    "tool.upload":       "Click to upload",
    "tool.upload_hint":  "or drag an image here",
    "tool.file_types":   "JPG, PNG, GIF, WEBP accepted",
    "tool.current_img":  "Current image shown. Upload a new one to replace it.",
    "tool.save":         "Save Changes",
    "tool.add_btn":      "Add Tool",
    "tool.cancel":       "Cancel",

    // Status badges
    "status.pending":    "pending",
    "status.approved":   "approved",
    "status.rejected":   "rejected",
    "status.queued":     "queued",
  },

  ta: {
    // Navbar
    "nav.brand":         "பண்ணை வாடகை",
    "nav.admin_panel":   "நிர்வாக பலகை",
    "nav.browse_tools":  "கருவிகள் பார்க்க",
    "nav.my_bookings":   "என் முன்பதிவுகள்",
    "nav.logout":        "வெளியேறு",
    "nav.lang_toggle":   "English",

    // Login
    "login.title":       "மீண்டும் வருக",
    "login.subtitle":    "உங்கள் பண்ணை கருவி வாடகையை நிர்வகிக்க உள்நுழையுங்கள்",
    "login.username":    "பயனர்பெயர்",
    "login.username_ph": "உங்கள் பயனர்பெயரை உள்ளிடுக",
    "login.password":    "கடவுச்சொல்",
    "login.password_ph": "உங்கள் கடவுச்சொல்லை உள்ளிடுக",
    "login.btn":         "உள்நுழை →",
    "login.no_account":  "கணக்கு இல்லையா?",
    "login.register":    "இங்கே பதிவு செய்யுங்கள்",
    "login.admin_hint":  "இயல்புநிலை நிர்வாகி:",

    // Register
    "register.title":    "கணக்கு உருவாக்கு",
    "register.subtitle": "பண்ணை வாடகையில் இணைந்து நூற்றுக்கணக்கான கருவிகளை அணுகுங்கள்",
    "register.username": "பயனர்பெயர்",
    "register.username_ph": "பயனர்பெயரை தேர்ந்தெடுக்கவும்",
    "register.email":    "மின்னஞ்சல் முகவரி",
    "register.email_ph": "your@email.com",
    "register.password": "கடவுச்சொல்",
    "register.password_ph": "வலுவான கடவுச்சொல்லை தேர்ந்தெடுக்கவும்",
    "register.hint":     "குறைந்தது 6 எழுத்துக்கள் பரிந்துரைக்கப்படுகின்றன.",
    "register.btn":      "கணக்கு உருவாக்கு →",
    "register.have_account": "ஏற்கனவே கணக்கு உள்ளதா?",
    "register.login":    "இங்கே உள்நுழையுங்கள்",

    // User Dashboard
    "dash.hello":        "வணக்கம்",
    "dash.hero_sub":     "எங்கள் கிடைக்கக்கூடிய பண்ணை கருவிகளை உலாவி உங்களுக்கு தேவையான கருவிகளை முன்பதிவு செய்யுங்கள்.",
    "dash.available":    "கிடைக்கக்கூடிய கருவிகள்",
    "dash.my_bookings":  "என் முன்பதிவுகள்",
    "dash.no_tools":     "இப்போது எந்த கருவியும் கிடைக்கவில்லை. சீக்கிரம் மீண்டும் சரிபார்க்கவும்!",
    "dash.per_day":      "/நாள்",
    "dash.available_qty":"கிடைக்கும்",
    "dash.out_of_stock": "இருப்பு இல்லை",
    "dash.book_now":     "இப்போது முன்பதிவு செய்",
    "dash.join_queue":   "வரிசையில் சேர்",

    // Admin Dashboard
    "admin.total_tools":    "மொத்த கருவிகள்",
    "admin.all_bookings":   "அனைத்து முன்பதிவுகள்",
    "admin.pending":        "நிலுவையில்",
    "admin.users":          "பதிவான பயனர்கள்",
    "admin.manage_equip":   "கருவிகளை நிர்வகி",
    "admin.add_tool":       "+ புதிய கருவி சேர்",
    "admin.col_tool":       "கருவி",
    "admin.col_price":      "விலை/நாள்",
    "admin.col_qty":        "அளவு",
    "admin.col_status":     "நிலை",
    "admin.col_actions":    "செயல்கள்",
    "admin.enabled":        "இயக்கப்பட்டது",
    "admin.disabled":       "முடக்கப்பட்டது",
    "admin.edit":           "திருத்து",
    "admin.disable":        "முடக்கு",
    "admin.enable":         "இயக்கு",
    "admin.delete":         "நீக்கு",
    "admin.no_tools":       "இன்னும் கருவிகள் இல்லை.",
    "admin.add_one":        "இப்போது சேர்க்கவும்",
    "admin.all_bookings_h": "அனைத்து முன்பதிவுகள்",
    "admin.col_user":       "பயனர்",
    "admin.col_date":       "தேதி & நேரம்",
    "admin.col_contact":    "தொடர்பு",
    "admin.approve":        "அனுமதி",
    "admin.reject":         "நிராகரி",
    "admin.no_bookings":    "இன்னும் முன்பதிவுகள் செய்யப்படவில்லை.",
    "admin.confirm_delete": "இந்த கருவியை நீக்கவா? இதை மீண்டும் செய்ய முடியாது.",

    // Booking
    "book.back":         "← உலாவுக்கு திரும்பு",
    "book.complete":     "முன்பதிவை நிறைவு செய்",
    "book.phone":        "தொலைபேசி எண்",
    "book.phone_ph":     "+91 98765 43210",
    "book.address":      "டெலிவரி / பிக்கப் முகவரி",
    "book.address_ph":   "உங்கள் முழு முகவரியை உள்ளிடுக",
    "book.date":         "முன்பதிவு தேதி",
    "book.time":         "விருப்பமான நேரம்",
    "book.submit":       "முன்பதிவு கோரிக்கையை சமர்ப்பி",
    "book.queue_btn":    "வரிசையில் சேர்",
    "book.in_stock":     "இருப்பில் உள்ளது",
    "book.out_of_stock": "இருப்பு இல்லை – வரிசையில் சேர்க்கப்படும்",
    "book.queue_warn":   "இந்த கருவி தற்போது இருப்பில் இல்லை. உங்கள் முன்பதிவு வரிசையில் வைக்கப்படும், இருப்பு நிரப்பப்படும்போது நிறைவேற்றப்படும் (FIFO வரிசை).",
    "book.no_desc":      "விளக்கம் இல்லை.",

    // History
    "hist.title":        "என் முன்பதிவு வரலாறு",
    "hist.back":         "← கருவிகள் பார்க்க",
    "hist.col_tool":     "கருவி",
    "hist.col_price":    "விலை/நாள்",
    "hist.col_booked":   "முன்பதிவு செய்யப்பட்டது",
    "hist.col_phone":    "தொலைபேசி",
    "hist.col_address":  "முகவரி",
    "hist.col_status":   "நிலை",
    "hist.col_req":      "கோரிக்கை தேதி",
    "hist.fifo":         "FIFO வரிசை",
    "hist.leg_pending":  "நிர்வாக மதிப்பீட்டிற்காக காத்திருக்கிறது",
    "hist.leg_approved": "உறுதிப்படுத்தப்பட்டது & அளவு ஒதுக்கப்பட்டது",
    "hist.leg_rejected": "அனுமதிக்கப்படவில்லை",
    "hist.leg_queued":   "இருப்பிற்காக காத்திருக்கிறது (FIFO)",
    "hist.empty":        "நீங்கள் இன்னும் எந்த முன்பதிவும் செய்யவில்லை.",
    "hist.browse":       "கருவிகளை உலாவுக",

    // Edit Tool
    "tool.edit_title":   "கருவியை திருத்து",
    "tool.add_title":    "புதிய கருவி சேர்",
    "tool.back":         "← டாஷ்போர்டுக்கு திரும்பு",
    "tool.name":         "கருவியின் பெயர் *",
    "tool.name_ph":      "எ.கா. டிராக்டர், அறுவடை இயந்திரம், உழவு கருவி",
    "tool.desc":         "விளக்கம்",
    "tool.desc_ph":      "கருவியை பற்றி விவரிக்கவும்: திறன், பயன்பாடு போன்றவை.",
    "tool.price":        "நாளுக்கு விலை (₹) *",
    "tool.qty":          "கிடைக்கக்கூடிய அளவு *",
    "tool.image":        "கருவி படம்",
    "tool.upload":       "பதிவேற்ற கிளிக் செய்யவும்",
    "tool.upload_hint":  "அல்லது படத்தை இங்கே இழுக்கவும்",
    "tool.file_types":   "JPG, PNG, GIF, WEBP ஏற்றுக்கொள்ளப்படும்",
    "tool.current_img":  "தற்போதைய படம் காட்டப்படுகிறது. புதியதை பதிவேற்றி மாற்றவும்.",
    "tool.save":         "மாற்றங்களை சேமி",
    "tool.add_btn":      "கருவியை சேர்",
    "tool.cancel":       "ரத்து செய்",

    // Status badges
    "status.pending":    "நிலுவை",
    "status.approved":   "அனுமதிக்கப்பட்டது",
    "status.rejected":   "நிராகரிக்கப்பட்டது",
    "status.queued":     "வரிசையில்",
  }
};

// ── Core translator ──────────────────────────────────
function getCurrentLang() {
  return localStorage.getItem('farmrent_lang') || 'en';
}

function setLang(lang) {
  localStorage.setItem('farmrent_lang', lang);
  applyTranslations(lang);
  updateToggleButton(lang);
}

function t(key) {
  const lang = getCurrentLang();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS['en'][key] || key;
}

function applyTranslations(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key]) el.placeholder = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key]) el.innerHTML = dict[key];
  });
  // Tamil font boost
  document.body.classList.toggle('lang-ta', lang === 'ta');
}

function updateToggleButton(lang) {
  const btn = document.getElementById('lang-toggle-btn');
  if (btn) btn.textContent = lang === 'en' ? 'தமிழ்' : 'English';
}

function toggleLanguage() {
  const current = getCurrentLang();
  setLang(current === 'en' ? 'ta' : 'en');
}

// ── Auto-apply on page load ──────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(getCurrentLang());
  updateToggleButton(getCurrentLang());
});
