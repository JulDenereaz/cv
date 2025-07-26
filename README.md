# Pluton - Personal Website

A modern, clean personal website built with PHP 8.3+ featuring a tile-based design for showcasing games and services.

## Features

- **Modern Design**: Clean, tile-centered layout with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **PHP 8.3+ Compatible**: Uses modern PHP features
- **Clean URLs**: SEO-friendly URLs with .htaccess configuration
- **Service Integration**: Hidden integration for Synology NAS services
- **Game Showcase**: Automatic detection and categorization of games
- **Performance Optimized**: Lazy loading, caching, and compression

## Structure

```
/
├── index.php              # Main homepage
├── games.php             # Games listing page
├── .htaccess             # URL rewriting and server configuration
├── assets/
│   ├── css/
│   │   └── main.css      # Main stylesheet
│   └── js/
│       └── main.js       # Interactive JavaScript
├── src/
│   ├── config.php        # Site configuration and game definitions
│   └── includes/
│       ├── header.php    # Site header template
│       └── footer.php    # Site footer template
├── games/                # Your existing games directory
└── images/               # Your existing images directory
```

## Setup Instructions

### 1. Server Requirements

- PHP 8.3 or higher
- Apache with mod_rewrite enabled
- (Optional) mod_deflate for compression
- (Optional) mod_expires for caching

### 2. Installation

1. Upload all files to your web server
2. Ensure the web server user has read permissions on all files
3. Make sure `.htaccess` is properly loaded by Apache

### 3. Configuration

Edit `src/config.php` to customize:

- Site name and tagline
- Your services (Neptune, Pluton URLs)
- Game definitions and colors
- Categories and descriptions

### 4. Reverse Proxy Setup (for Synology NAS integration)

To hide your Synology NAS URLs behind your domain, you'll need to configure reverse proxy rules at your DNS provider or server level:

#### Option A: DNS Provider (Cloudflare, etc.)

If using Cloudflare or similar:
1. Create subdomain DNS records (neptune.yourdomain.com, pluton.yourdomain.com)
2. Set up Page Rules or Workers to proxy to your actual NAS URLs

#### Option B: Server-level (Apache/Nginx)

For Apache, add to your virtual host:
```apache
ProxyPass /neptune http://neptune18.quickconnect.to/
ProxyPassReverse /neptune http://neptune18.quickconnect.to/
ProxyPass /pluton http://pluton18.quickconnect.to/
ProxyPassReverse /pluton http://pluton18.quickconnect.to/
```

For Nginx:
```nginx
location /neptune/ {
    proxy_pass http://neptune18.quickconnect.to/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}

location /pluton/ {
    proxy_pass http://pluton18.quickconnect.to/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

### 5. Adding New Games

1. Add your game folder to the `games/` directory
2. Update the `$games` array in `src/config.php` with your game information
3. The system will automatically detect and display games that have an `index.html` file

### 6. Customization

#### Colors and Themes

Edit CSS custom properties in `assets/css/main.css`:
```css
:root {
    --primary-color: #6366f1;    /* Main brand color */
    --secondary-color: #8b5cf6;  /* Secondary brand color */
    --background-color: #0f172a; /* Dark background */
    /* ... more variables */
}
```

#### Game Categories

Add new categories in `src/config.php`:
```php
$games = [
    'your-game-folder' => [
        'name' => 'Your Game Name',
        'description' => 'Game description',
        'category' => 'your-category',
        'color' => '#your-color'
    ]
];
```

## Browser Support

- Chrome/Chromium 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## Performance

The site includes several performance optimizations:
- CSS and JS minification ready
- Image lazy loading support
- Gzip compression via .htaccess
- Static asset caching
- Efficient CSS Grid layouts

## Security

- XSS protection headers
- Content type sniffing protection
- Clickjacking protection
- Sensitive file access blocking
- Input sanitization

## License

Personal project - All rights reserved to Julien Dénéréaz
