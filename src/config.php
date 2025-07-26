<?php

// Site Configuration
define('SITE_NAME', 'Pluton');
define('SITE_TAGLINE', '"Science sans conscience n\'est que ruines de l\'âme"');
define('SITE_AUTHOR', 'Julien Dénéréaz');
define('SITE_YEAR', '2025');

// Services Configuration
$services = [
    'neptune' => [
        'name' => 'Neptune',
        'description' => 'Media Server & Storage',
        'icon' => 'server',
        'url' => 'http://neptune18.quickconnect.to', // Direct link to Neptune NAS
        'color' => '#4a90e2'
    ]
];

// Games Configuration
$games = [
    '2048' => [
        'name' => '2048',
        'description' => 'Puzzle number game',
        'category' => 'puzzle',
        'color' => '#edc53f'
    ],
    'snake' => [
        'name' => 'Snake',
        'description' => 'Classic snake game',
        'category' => 'arcade',
        'color' => '#27ae60'
    ],
    'demineur' => [
        'name' => 'Démineur',
        'description' => 'Minesweeper game',
        'category' => 'puzzle',
        'color' => '#e74c3c'
    ],
    'solitaire' => [
        'name' => 'Solitaire',
        'description' => 'Classic card game',
        'category' => 'card',
        'color' => '#2c3e50'
    ],
    'Pong' => [
        'name' => 'Pong',
        'description' => 'Classic arcade game',
        'category' => 'arcade',
        'color' => '#9b59b6'
    ],
    'ConnectFour' => [
        'name' => 'Connect Four',
        'description' => 'Strategy board game',
        'category' => 'strategy',
        'color' => '#f39c12'
    ],
    'BrickBreaker' => [
        'name' => 'Brick Breaker',
        'description' => 'Breakout-style game',
        'category' => 'arcade',
        'color' => '#1abc9c'
    ],
    'Pneumo-Man' => [
        'name' => 'Pneumo-Man',
        'description' => 'Pac-Man inspired game',
        'category' => 'arcade',
        'color' => '#f1c40f'
    ],
    'Motherlode' => [
        'name' => 'Motherlode',
        'description' => 'Mining adventure game',
        'category' => 'adventure',
        'color' => '#8e44ad'
    ],
    'typer' => [
        'name' => 'Typer',
        'description' => 'Typing speed test',
        'category' => 'skill',
        'color' => '#34495e'
    ],
    'Clock' => [
        'name' => 'Clock',
        'description' => 'Analog clock display',
        'category' => 'utility',
        'color' => '#16a085'
    ],
    'painter' => [
        'name' => 'Painter',
        'description' => 'Digital drawing tool',
        'category' => 'creative',
        'color' => '#e67e22'
    ]
];

// Get available games by scanning directory
function getAvailableGames() {
    global $games;
    $available = [];
    
    foreach ($games as $folder => $info) {
        $path = __DIR__ . '/../games/' . $folder . '/index.html';
        if (file_exists($path)) {
            $available[$folder] = $info;
        }
    }
    
    return $available;
}

// Get services
function getServices() {
    global $services;
    return $services;
}

?>
