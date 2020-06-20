

/**
 * Uses the web speech synth API to make the browser talk.
 *
 * Run it:node speech.js -t Hello there, my name is Jarvis.
 * 
 * node speech.js -t Read anything good lately?
 * CHROME_PATH=/path/to/chrome node speech.js -t hi and bye!
 */

const fs = require('fs');
const puppeteer = require('puppeteer-core');

const DEFAULT_TXT = 'Hello there, my name is Puppeteer. I am controlling your browser.';

//const executablePath ='C:\Program Files (x86)\Google\Chrome\Application\chrome.exe';

(async() => {

const browser = await puppeteer.launch({
 // executablePath,  // Note: need Chrome (not Chromium) to use non-default voices.
 //executablePath: '[C:\Program Files (x86)\Google\Chrome\Application\chrome.exe]',
executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  
 headless: false, 
  args: [
    '--window-size=0,0', 
    '--window-position=0,0',
    '--enable-speech-dispatcher', 
  ],
  //userDataDir: 'C:\Users\dell\AppData\Local\Google\Chrome\User Data\Default'
 //.then(async browser => {
});

const page = await browser.newPage();

// Clever way to "communicate with page". Know when speech is done.
page.on('console', async msg => {
  if (msg.text() === 'SPEECH_DONE') {
    await browser.close();
  }
});

const flagIdx = process.argv.findIndex(item => item === '-t');
const text = flagIdx === -1 ? DEFAULT_TXT : process.argv.slice(flagIdx + 1).join(' ');

await page.evaluateOnNewDocument(text => window.TEXT2SPEECH = text, text);

const html = fs.readFileSync('speech_synth.html', {encoding: 'utf-8'});
// Cause a navigation so the evaluateOnNewDocument kicks in.
await page.goto(`data:text/html,${html}`);

const button = await page.$('button');
button.click();

})();