# CV Webpage

A clean, minimal CV webpage built with TypeScript.

## Features

- Clean, professional design
- Responsive layout
- TypeScript for type safety
- Print-friendly styles
- Interactive elements

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the TypeScript:
   ```bash
   npm run build
   ```

3. Serve the webpage:
   ```bash
   npm run serve
   ```
   Then open http://localhost:8000

## Development

- `npm run dev` - Watch mode for TypeScript compilation
- `npm run build` - Build TypeScript to JavaScript
- `npm run serve` - Serve the webpage locally

## Customization

1. **Personal Information**: Edit the HTML content in `index.html`
2. **Styling**: Modify the CSS variables in `styles/main.css`
3. **Skills**: Update the skills array in `src/main.ts`
4. **Colors**: Change the CSS custom properties in `:root`

## File Structure

```
cv/
├── src/
│   └── main.ts          # TypeScript source
├── styles/
│   └── main.css         # Styles
├── dist/                # Compiled JavaScript (generated)
├── index.html           # Main HTML file
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript config
```

## Browser Support

Modern browsers with ES2020 support.