[README.md](https://github.com/user-attachments/files/33467578/README.md)
# حاسبة تحويشة الدهب — Swiss Gold

A one-page Arabic (RTL) calculator for the Swiss Gold family workshop.
The visitor picks how much they can save every day, and the page shows what buying
24k gold with that amount every day from October 2022 to October 2026 would be worth today.

## Files

| File | What it is |
|---|---|
| `index.html` | The page: layout, text, links |
| `style.css` | Colors, fonts, layout (light and dark mode) |
| `script.js` | Monthly gold prices and the calculation |
| `logo.png` | Swiss Gold logo (must stay in the same folder) |

No build step and no dependencies. The only external resource is the Tajawal font from Google Fonts.

## Run it locally

Double-click `index.html`, or from this folder:

```
npx serve .
```

## Publish it (free)

**Vercel**

```
cd ~/Desktop/"Swissgold Workshop"/calculator-site
npx vercel --prod
```

Log in when the browser opens, accept the defaults, and copy the `.vercel.app` link it prints.

**Netlify (no terminal)**: open https://app.netlify.com/drop and drag this whole folder onto the page.

After publishing, update the QR code on slide 19 of the deck to the new link.

## How the calculation works

For every day from 15 Oct 2022 to 14 Oct 2026 (1,461 days):

```
grams += daily_amount / price_of_1g_24k_that_month
paid  += daily_amount
```

- **Value today** = total grams × `NOW`
- **Gain** = value today − paid
- **Multiplier** = value today ÷ paid

Prices exclude workmanship (مصنعية) and taxes, so the result is an illustration, not a quote.

## Updating the numbers

All numbers live at the top of `script.js`:

- **`NOW`**: today's 24k gram price used for the value. It is currently **6937.14 EGP**, Swiss Gold's buy-back price on 15 Oct 2026. Change it to the current price before each workshop.
- **`P`**: a list of one 24k price per month (`"YYYY-MM": price`). To extend the period, add the new months to `P` and move `END`.
- **`START` / `END`**: the period. Months in JavaScript dates start at 0, so `Date.UTC(2022,9,15)` means 15 October 2022.

If you change the period, also update the matching text in `index.html`: "من أكتوبر 2022 لحد أكتوبر 2026 (4 سنين)" and the note under the chart.

## Price sources

Monthly 24k prices in EGP from local Egyptian market reports (Al Mal, Ahram Online, Al Dostor, Daily News Egypt, Amwal Al Ghad) and pricegold.net for months without a local report.
The full list with a source link for each month is in `gold_history.csv` in the Swissgold Workshop folder.

## Links on the page

| | |
|---|---|
| Website | https://www.swissgold.com.eg |
| Instagram | https://www.instagram.com/swissgold.eg |
| Facebook | https://www.facebook.com/swissgold.eg |
| LinkedIn | https://www.linkedin.com/company/swissgold-eg |
| WhatsApp | https://wa.me/201212222280 |
| Hotline | 19215 |

The LinkedIn address was not confirmed. Check it opens the right page before publishing.
