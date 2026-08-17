const express = require('express');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const TS_FILE = path.join(__dirname, 'highlightForbiddenWords.ts');

const app = express();

function build() {
    try {
        execSync(`tsc ${TS_FILE} --target es2020 --outDir public`);
        console.log('highlightForbiddenWords.ts -> public/highlightForbiddenWords.js');
    } catch (error) {
        console.error(error.stdout ? error.stdout.toString() : error.message);
    }
}

build();

fs.watch(TS_FILE, build);

app.use(express.static('public'));

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
