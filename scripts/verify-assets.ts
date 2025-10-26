import * as fs from 'fs';
import * as path from 'path';
import { WORDS } from '../src/app/data/words';

// Adjust this if your assets are stored differently
const baseDir = path.join(__dirname, '..', 'public');

const missingImages: { id: string; file: string }[] = [];
const missingAudio: { id: string; file: string }[] = [];

for (const word of WORDS) {
  const imagePath = path.join(baseDir, word.image);
  const audioPath = path.join(baseDir, word.audio);

  if (!fs.existsSync(imagePath)) {
    missingImages.push({ id: word.id, file: word.image });
  }
  if (!fs.existsSync(audioPath)) {
    missingAudio.push({ id: word.id, file: word.audio });
  }
}

console.log('✅ Asset Verification Complete!\n');

if (missingImages.length === 0 && missingAudio.length === 0) {
  console.log('🎉 All audio and image files exist.');
} else {
  if (missingImages.length) {
    console.log('⚠️ Missing Images:');
    missingImages.forEach(f => console.log(` - [${f.id}] ${f.file}`));
  }

  if (missingAudio.length) {
    console.log('\n⚠️ Missing Audio:');
    missingAudio.forEach(f => console.log(` - [${f.id}] ${f.file}`));
  }
}
