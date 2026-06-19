/* 
========================================================================
   NAVRON CALCULATOR SUITE - CORE JAVASCRIPT LOGIC (V3)
   Multi-page Portability, Bilingual Dictionary, Live Cursor Commas, PWA Register
======================================================================== 
*/

// --- Dynamic Languages Translation Dictionaries ---
const translations = {
  en: {
    // Header
    suiteTitle: "Navron Suite",
    suiteSubtitle: "Smart Calculators",
    metaTitle: "Smart Calculator Suite",
    metaSubtitle: "All Essential Calculators in One Place",
    placeholderSearch: "Search calculators...",
    breadcrumbsHome: "Home",
    
    // Categories
    catAll: "All",
    catFinance: "Finance",
    catBusiness: "Business",
    catTax: "Tax",
    catInvestment: "Investment",
    catDaily: "Daily Use",
    catUtility: "Utility",
    clearFilters: "Clear Filters",

    // Homepage sections
    recentCalcs: "Recently Used",
    popularCalcs: "Popular Calculators",
    featuredCalcs: "Featured Calculators",
    emptyRecent: "No recently used calculators.",

    // Calculator Views
    btnBackHome: "Back to Suite",
    tabNormalMode: "Normal Mode",
    tabReverseMode: "Reverse Mode",
    
    // Form Inputs
    labelAmount: "Loan Amount",
    labelRate: "Interest Rate (per month)",
    labelDuration: "Time Duration",
    labelUnit: "Unit",
    labelFinalAmount: "Desired Final Amount",
    labelFee: "Processing Fee (Optional)",
    labelCharges: "Extra Charges (Optional)",
    placeholderAmount: "e.g. 100,000",
    placeholderRate: "Enter monthly rate (%)",
    placeholderDuration: "e.g. 12",
    placeholderFinalAmount: "e.g. 136,000",
    placeholderFee: "e.g. 1,000",
    placeholderCharges: "e.g. 500",
    btnCalculate: "Calculate Interest",
    btnClearInputs: "Clear Inputs",
    
    // Result cards titles
    resHeader: "Calculation Details",
    cardTotalAmount: "Total Amount to Receive",
    cardTotalInterest: "Total Interest (Profit)",
    cardPrincipal: "Principal Amount",
    cardDuration: "Time Duration",
    cardRate: "Interest Rate",
    cardEffectiveRate: "Effective Monthly Rate",
    cardCalculationTime: "Calculation Date & Time",
    cardMonthlyInterest: "Monthly Interest",
    cardYearlyInterest: "Yearly Interest",
    cardDailyInterest: "Daily Interest",
    cardNetProfit: "Net Profit (After Charges)",
    cardNetProfitValue: "Net Profit",
    cardProcessingFee: "Processing Fee Paid",
    cardExtraCharges: "Extra Charges Paid",
    
    // Coming soon
    comingSoonTitle: "Coming Soon",
    comingSoonMessage: "This calculator is currently under development and will be available in a future update. Stay tuned for more powerful tools in Navron Suite.",
    btnBackDashboard: "Back to Dashboard",
    
    // Footer Links
    footAbout: "About Us",
    footContact: "Contact",
    footPrivacy: "Privacy Policy",
    footTerms: "Terms of Service",
    footBranding: "© 2026 Navron Suite. Built Offline & Installable.",

    // Actions & Toasts
    copiedToast: "Result copied to clipboard!",
    pdfStart: "Generating PDF statement...",
    pdfSuccess: "PDF downloaded successfully!",
    pdfFail: "PDF rendering failed. Please try printing.",
    pngStart: "Rendering calculation image...",
    pngSuccess: "Image downloaded successfully!",
    resetToast: "Calculator inputs reset.",
    restoreToast: "Calculation restored successfully!",
    historyCleared: "Calculation history cleared.",
    historyConfirm: "Are you sure you want to clear all calculation history?",
    
    // Validation Errors
    errAmount: "Please enter a valid Loan Amount greater than 0.",
    errFinalAmount: "Please enter a Desired Final Amount greater than the Loan Amount.",
    errRate: "Please enter a valid Interest Rate greater than 0.",
    errDuration: "Please enter a valid Time Duration greater than 0.",
    errFormat: "Please fill in all required inputs correctly."
  },
  hi: {
    // Header
    suiteTitle: "नवरॉन सूट",
    suiteSubtitle: "स्मार्ट कैलकुलेटर",
    metaTitle: "स्मार्ट कैलकुलेटर सूट",
    metaSubtitle: "सभी आवश्यक कैलकुलेटर एक ही स्थान पर",
    placeholderSearch: "कैलकुलेटर खोजें...",
    breadcrumbsHome: "होम",
    
    // Categories
    catAll: "सभी",
    catFinance: "वित्त",
    catBusiness: "व्यापार",
    catTax: "टैक्स",
    catInvestment: "निवेश",
    catDaily: "दैनिक उपयोग",
    catUtility: "उपयोगिता",
    clearFilters: "फ़िल्टर साफ़ करें",

    // Homepage sections
    recentCalcs: "हाल ही में उपयोग किया गया",
    popularCalcs: "लोकप्रिय कैलकुलेटर",
    featuredCalcs: "विशेष कैलकुलेटर",
    emptyRecent: "कोई हाल ही में उपयोग किया गया कैलकुलेटर नहीं है।",

    // Calculator Views
    btnBackHome: "सूट पर वापस जाएं",
    tabNormalMode: "सामान्य मोड",
    tabReverseMode: "रिवर्स मोड",
    
    // Form Inputs
    labelAmount: "ऋण राशि (प्रिंसिपल)",
    labelRate: "ब्याज दर (प्रति माह)",
    labelDuration: "समयावधि",
    labelUnit: "इकाई",
    labelFinalAmount: "वांछित अंतिम राशि",
    labelFee: "प्रोसेसिंग शुल्क (वैकल्पिक)",
    labelCharges: "अतिरिक्त शुल्क (वैकल्पिक)",
    placeholderAmount: "जैसे: 1,00,000",
    placeholderRate: "मासिक दर दर्ज करें (%)",
    placeholderDuration: "जैसे: 12",
    placeholderFinalAmount: "जैसे: 1,36,000",
    placeholderFee: "जैसे: 1,000",
    placeholderCharges: "जैसे: 500",
    btnCalculate: "ब्याज की गणना करें",
    btnClearInputs: "इनपुट साफ़ करें",
    
    // Result cards titles
    resHeader: "गणना का विवरण",
    cardTotalAmount: "प्राप्त होने वाली कुल राशि",
    cardTotalInterest: "कुल ब्याज (लाभ)",
    cardPrincipal: "मूलधन (ऋण राशि)",
    cardDuration: "समयावधि",
    cardRate: "ब्याज दर",
    cardEffectiveRate: "प्रभावी मासिक दर",
    cardCalculationTime: "गणना की तिथि और समय",
    cardMonthlyInterest: "मासिक ब्याज",
    cardYearlyInterest: "वार्षिक ब्याज",
    cardDailyInterest: "दैनिक ब्याज",
    cardNetProfit: "शुद्ध लाभ (शुल्कों के बाद)",
    cardNetProfitValue: "शुद्ध लाभ",
    cardProcessingFee: "भुगतान किया गया प्रोसेसिंग शुल्क",
    cardExtraCharges: "भुगतान किया गया अतिरिक्त शुल्क",
    
    // Coming soon
    comingSoonTitle: "जल्द ही आ रहा है",
    comingSoonMessage: "यह कैलकुलेटर वर्तमान में विकास के अधीन है और भविष्य के अपडेट में उपलब्ध होगा। नवरॉन सूट में अधिक शक्तिशाली उपकरणों के लिए बने रहें।",
    btnBackDashboard: "डैशबोर्ड पर वापस",
    
    // Footer Links
    footAbout: "हमारे बारे में",
    footContact: "संपर्क",
    footPrivacy: "गोपनीयता नीति",
    footTerms: "सेवा की शर्तें",
    footBranding: "© 2026 नवरॉन सूट। ऑफलाइन और इंस्टॉल करने योग्य।",

    // Actions & Toasts
    copiedToast: "परिणाम क्लिपबोर्ड पर कॉपी हो गया!",
    pdfStart: "PDF स्टेटमेंट बनाया जा रहा है...",
    pdfSuccess: "PDF सफलतापूर्वक डाउनलोड हो गया!",
    pdfFail: "PDF रेंडरिंग विफल रही। कृपया प्रिंट करने का प्रयास करें।",
    pngStart: "गणना छवि रेंडर की जा रही है...",
    pngSuccess: "छवि सफलतापूर्वक डाउनलोड हो गई!",
    resetToast: "कैलकुलेटर इनपुट रीसेट हो गए।",
    restoreToast: "गणना सफलतापूर्वक पुनर्स्थापित की गई!",
    historyCleared: "गणना इतिहास साफ़ कर दिया गया।",
    historyConfirm: "क्या आप वाकई सभी गणना इतिहास साफ़ करना चाहते हैं?",
    
    // Validation Errors
    errAmount: "कृपया 0 से अधिक वैध ऋण राशि दर्ज करें।",
    errFinalAmount: "कृपया ऋण राशि से अधिक वांछित अंतिम राशि दर्ज करें।",
    errRate: "कृपया 0 से अधिक वैध ब्याज दर दर्ज करें।",
    errDuration: "कृपया 0 से अधिक वैध समयावधि दर्ज करें।",
    errFormat: "कृपया सभी आवश्यक इनपुट सही ढंग से भरें।"
  }
};
// ==========================================
// 1. Live Comma Formatting Logic
// ==========================================
function parseFormattedNumber(val) {
  if (!val) return 0;
  return parseFloat(val.toString().replace(/,/g, ''));
}

function handleLiveCommaFormatting(inputElement, formatType = 'indian') {
  if (!inputElement) return;

  inputElement.addEventListener('input', () => {
    let rawVal = inputElement.value;
    
    // Extract cursor position
    const cursorPosition = inputElement.selectionStart;
    const originalLength = rawVal.length;

    // Strip commas
    let val = rawVal.replace(/,/g, '');
    if (val === '') {
      inputElement.value = '';
      return;
    }

    // Handle decimal parts separately
    const parts = val.split('.');
    let integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    // Strip non-digits from integer part
    integerPart = integerPart.replace(/\D/g, '');

    if (integerPart === '' && decimalPart === '') {
      inputElement.value = '';
      return;
    }

    // Format integer part
    let formattedInteger = '';
    if (formatType === 'indian') {
      // Indian formatting rule: e.g. 12,34,56,789
      if (integerPart.length <= 3) {
        formattedInteger = integerPart;
      } else {
        const lastThree = integerPart.substring(integerPart.length - 3);
        const otherParts = integerPart.substring(0, integerPart.length - 3);
        formattedInteger = otherParts.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + ',' + lastThree;
      }
    } else {
      // Standard international rule: e.g. 123,456,789
      formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const finalVal = formattedInteger + decimalPart;
    inputElement.value = finalVal;

    // Restore cursor position shifts
    const newLength = finalVal.length;
    const lengthDifference = newLength - originalLength;
    const newCursor = Math.max(0, cursorPosition + lengthDifference);
    inputElement.setSelectionRange(newCursor, newCursor);
  });
}

// ==========================================
// 2. Global State & LocalStorage Caches
// ==========================================
let currentLanguage = localStorage.getItem('navron_lang') || 'en';
let currentCurrency = localStorage.getItem('navron_currency') || 'INR';
let currentTheme = localStorage.getItem('navron_theme') || 'light';

// Currency Symbols and Formatting Config mappings
const currenciesConfig = {
  INR: { symbol: '₹', locale: 'en-IN', formatType: 'indian' },
  USD: { symbol: '$', locale: 'en-US', formatType: 'intl' },
  EUR: { symbol: '€', locale: 'en-IE', formatType: 'intl' },
  GBP: { symbol: '£', locale: 'en-GB', formatType: 'intl' },
  AED: { symbol: 'د.إ', locale: 'ar-AE', formatType: 'intl' },
  SAR: { symbol: '﷼', locale: 'ar-SA', formatType: 'intl' }
};

// Helper format output currency
function formatCurrency(value) {
  const conf = currenciesConfig[currentCurrency] || currenciesConfig.INR;
  // Intl format currency
  return new Intl.NumberFormat(conf.locale, {
    style: 'currency',
    currency: currentCurrency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  }).format(value);
}

// Save recently used calculators in local cache
function updateRecentCalculators(calcId, calcName, url) {
  try {
    let recents = localStorage.getItem('navron_recent_calculators');
    recents = recents ? JSON.parse(recents) : [];
    
    // Strip if exists
    recents = recents.filter(item => item.id !== calcId);
    
    // Add to beginning
    recents.unshift({ id: calcId, name: calcName, url: url, timestamp: Date.now() });
    
    // Cap at 4 items
    recents = recents.slice(0, 4);
    
    localStorage.setItem('navron_recent_calculators', JSON.stringify(recents));
  } catch (e) {
    // Caching failsafe
  }
}

// ==========================================
// 3. Dynamic Localizer Engine
// ==========================================
function applyTranslations() {
  const dict = translations[currentLanguage];
  
  // Update translation attributes [data-translate]
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (dict[key]) {
      // Check input elements vs tag innerTexts
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', dict[key]);
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Update specific elements placeholder keys
  const searchInput = document.getElementById('calculator-search');
  if (searchInput) searchInput.setAttribute('placeholder', dict.placeholderSearch);

  // Update dynamic values in calculations UI
  const formatConf = currenciesConfig[currentCurrency];
  document.querySelectorAll('.input-symbol').forEach(el => {
    el.textContent = formatConf.symbol;
  });
}

// ==========================================
// 4. Initialization Logic
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Theme initialization
  const applyTheme = () => {
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  };
  applyTheme();

  // Settings elements
  const themeToggleBtn = document.getElementById('theme-toggle');
  const langToggleBtn = document.getElementById('lang-toggle');
  const currencyDropdownSelect = document.getElementById('currency-dropdown');

  // Bind settings listeners
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('navron_theme', currentTheme);
      applyTheme();
    });
  }

  if (langToggleBtn) {
    // Render current button indicator text
    langToggleBtn.textContent = currentLanguage === 'en' ? 'हिन्दी' : 'English';
    langToggleBtn.addEventListener('click', () => {
      currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
      localStorage.setItem('navron_lang', currentLanguage);
      langToggleBtn.textContent = currentLanguage === 'en' ? 'हिन्दी' : 'English';
      applyTranslations();
      
      // If interest calculator page, update displays
      if (typeof handleAmountInput === 'function') {
        handleAmountInput();
        handleRateInput();
      }
      
      // Update history render if applicable
      if (typeof renderHistory === 'function') {
        renderHistory();
      }
    });
  }

  if (currencyDropdownSelect) {
    currencyDropdownSelect.value = currentCurrency;
    currencyDropdownSelect.addEventListener('change', () => {
      currentCurrency = currencyDropdownSelect.value;
      localStorage.setItem('navron_currency', currentCurrency);
      applyTranslations();
      
      // Trigger formatting re-syncs
      const formatType = currenciesConfig[currentCurrency].formatType;
      
      const loanAmount = document.getElementById('loan-amount');
      const finalAmount = document.getElementById('final-amount');
      const processingFee = document.getElementById('processing-fee');
      const extraCharges = document.getElementById('extra-charges');
      
      [loanAmount, finalAmount, processingFee, extraCharges].forEach(el => {
        if (el) {
          // Re-trigger live formatting on existing values
          const cleanVal = parseFormattedNumber(el.value);
          if (cleanVal > 0) {
            el.dispatchEvent(new Event('input'));
          }
        }
      });

      if (typeof handleAmountInput === 'function') {
        handleAmountInput();
        handleRateInput();
      }

      // If results already exist, recalculate automatically to swap currency symbol
      const calculatorForm = document.getElementById('calculator-form');
      if (calculatorForm && document.getElementById('results-section') && !document.getElementById('results-section').classList.contains('hidden')) {
        calculatorForm.dispatchEvent(new Event('submit'));
      }
      
      if (typeof renderHistory === 'function') {
        renderHistory();
      }
    });
  }

  // Load translations
  applyTranslations();

  // ==========================================
  // 5. Shared SPA Layout & Swipers on Home
  // ==========================================
  const filterScroll = document.querySelector('.filter-scroll');
  if (filterScroll) {
    // Mouse wheel horizontal scroll helper
    filterScroll.addEventListener('wheel', (e) => {
      e.preventDefault();
      filterScroll.scrollLeft += e.deltaY;
    });
  }

  // Auto focus next input listener (Enter key navigations)
  const calculatorForm = document.getElementById('calculator-form');
  if (calculatorForm) {
    const inputs = Array.from(calculatorForm.querySelectorAll('input, select'));
    inputs.forEach((input, index) => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const nextInput = inputs[index + 1];
          if (nextInput && nextInput.id !== 'calculate-btn') {
            nextInput.focus();
          } else {
            // Trigger calculation
            calculatorForm.dispatchEvent(new Event('submit'));
          }
        }
      });
    });
  }
});

// ==========================================
// PWA Service Worker Registration
// ==========================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => {
        // SW register success
      })
      .catch(err => {
        // Silent error catch
      });
  });
}



