<?php
// Debug page to check CSS loading
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>CSS Debug - Pluton</title>
    <link rel="stylesheet" href="assets/css/main.css">
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .debug { background: #f0f0f0; padding: 15px; margin: 10px 0; border: 1px solid #ccc; }
        .success { background: #d4edda; border-color: #c3e6cb; }
        .error { background: #f8d7da; border-color: #f5c6cb; }
    </style>
</head>
<body>
    <h1>CSS Debug Page</h1>
    
    <div class="debug">
        <h3>CSS File Check</h3>
        <p>CSS file path: assets/css/main.css</p>
        <p>File exists: <?php echo file_exists('assets/css/main.css') ? '✅ YES' : '❌ NO'; ?></p>
        <p>File size: <?php echo file_exists('assets/css/main.css') ? filesize('assets/css/main.css') . ' bytes' : 'N/A'; ?></p>
    </div>
    
    <div class="debug">
        <h3>Test if CSS loaded</h3>
        <p>If the background below is dark blue/gray, CSS loaded successfully:</p>
        <div style="background: white; color: black; padding: 10px; border: 2px solid red;" class="container">
            This should have a dark background if CSS loads (container class from main.css)
        </div>
    </div>
    
    <div class="debug">
        <h3>Direct CSS Link Test</h3>
        <p><a href="assets/css/main.css" target="_blank">Click here to test direct CSS access</a></p>
        <p>This should open the CSS file content. If it shows 404, there's a path issue.</p>
    </div>
    
    <div class="debug">
        <h3>Server Info</h3>
        <p>Document Root: <?php echo $_SERVER['DOCUMENT_ROOT'] ?? 'Not set'; ?></p>
        <p>Current Script: <?php echo $_SERVER['SCRIPT_FILENAME'] ?? 'Not set'; ?></p>
        <p>Current Directory: <?php echo getcwd(); ?></p>
    </div>
    
    <script>
        // Check if CSS variables are available
        const bodyStyle = getComputedStyle(document.body);
        const bgColor = bodyStyle.backgroundColor;
        const debugDiv = document.createElement('div');
        debugDiv.className = 'debug';
        debugDiv.innerHTML = '<h3>JavaScript CSS Check</h3><p>Body background: ' + bgColor + '</p>';
        document.body.appendChild(debugDiv);
    </script>
</body>
</html>
