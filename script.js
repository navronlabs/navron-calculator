/* 
========================================================================
   NAVRON CALCULATOR SUITE - CORE JAVASCRIPT LOGIC (V3)
   Multi-page Portability, English Dictionary, Live Cursor Commas, PWA Register
======================================================================== 
*/

// --- English Translation Dictionary ---
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
    tabReverseMode: "Target Amount Calculator",
    
    // Form Inputs
    labelAmount: "Loan Amount",
    labelRate: "Interest Rate (per month)",
    labelDuration: "Time Duration",
    labelUnit: "Unit",
    labelFinalAmount: "Total Amount to Receive",
    labelFee: "Processing Fee (Optional)",
    labelCharges: "Extra Charges (Optional)",
    placeholderAmount: "e.g. 100,000",
    placeholderRate: "Enter monthly rate (%)",
    placeholderDuration: "e.g. 12",
    placeholderFinalAmount: "e.g. 1,36,000",
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
    errFinalAmount: "Please enter a Total Amount to Receive greater than the Loan Amount.",
    errRate: "Please enter a valid Interest Rate greater than 0.",
    errDuration: "Please enter a valid Time Duration greater than 0.",
    errFormat: "Please fill in all required inputs correctly."
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
let currentCurrency = 'INR';
let currentTheme = localStorage.getItem('navron_theme') || 'light';

// INR-only currency configuration
const currenciesConfig = {
  INR: { symbol: '₹', locale: 'en-IN', formatType: 'indian' }
};

// Helper format output currency
function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
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
  const dict = translations.en;
  
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
  const formatConf = currenciesConfig.INR;
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

  // Bind settings listeners
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('navron_theme', currentTheme);
      applyTheme();
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

// Global utility to convert numbers into Indian numbering system words
function getIndianNumberWords(num) {
  if (isNaN(num) || num <= 0) return '';
  num = Math.floor(num);
  if (num === 0) return 'Zero';

  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
                 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertLessThanThousand(n) {
    if (n === 0) return '';
    if (n < 20) return units[n] + ' ';
    const t = Math.floor(n / 10);
    const u = n % 10;
    if (n < 100) return tens[t] + ' ' + units[u] + ' ';
    return units[Math.floor(n / 100)] + ' Hundred ' + convertLessThanThousand(n % 100);
  }

  let words = '';
  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;

  if (crore > 0) {
    words += convertLessThanThousand(crore) + 'Crore ';
  }
  if (lakh > 0) {
    words += convertLessThanThousand(lakh) + 'Lakh ';
  }
  if (thousand > 0) {
    words += convertLessThanThousand(thousand) + 'Thousand ';
  }
  if (num > 0) {
    words += convertLessThanThousand(num);
  }

  return words.trim() + ' Only';
}

// Global utility to format date and time with Indian locale formatting
function formatDateTime(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) return '';
  const options = { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  };
  return date.toLocaleString('en-IN', options);
}



