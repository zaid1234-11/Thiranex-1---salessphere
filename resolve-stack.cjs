const fs = require('fs');
const path = require('path');
const { SourceMapConsumer } = require('source-map');

async function resolve() {
  const assetsDir = path.join(__dirname, 'dist', 'assets');
  const files = fs.readdirSync(assetsDir);
  const mapFile = files.find(f => f.startsWith('index-') && f.endsWith('.js.map'));
  
  if (!mapFile) {
    console.error('No source map found');
    return;
  }
  console.log('Using map file:', mapFile);
  const mapData = fs.readFileSync(path.join(assetsDir, mapFile), 'utf8');
  
  await SourceMapConsumer.with(mapData, null, consumer => {
    const positions = [
      { line: 12, column: 2475464 },
      { line: 12, column: 2476019 },
      { line: 12, column: 2475994 },
      { line: 12, column: 2476597 },
      { line: 12, column: 2519091 },
      { line: 12, column: 2530503 }
    ];
    positions.forEach(pos => {
      console.log(consumer.originalPositionFor(pos));
    });
  });
}
resolve();
