// postBuild.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const timestamp = new Date()
  .toISOString()
  .replace(/[^0-9]/g, '')
  .slice(0, 14);

updateOrAddEnvVariable('PUBLIC_URL', `/${timestamp}`);

require('dotenv').config();

buildApp();

uploadStatic();

uploadIndex();

deleteOldVersion();

function updateOrAddEnvVariable(key, value) {
  const envPath = path.join(__dirname, '..', '.env.production'); // Adjust the path to your .env file
  let envContents = fs.readFileSync(envPath, 'utf-8');
  let lines = envContents.split('\n');

  let found = false;
  lines = lines.map(line => {
    const [currentKey] = line.split('=');
    if (currentKey === key) {
      found = true;
      return `${key}=${value}`;
    }
    return line;
  });

  if (!found) {
    lines.push(`${key}=${value}`);
  }

  // Filter out any empty lines
  lines = lines.filter(line => line.trim() !== '');

  fs.writeFileSync(envPath, lines.join('\n'));
}

function buildApp() {
  console.log('Building the app...');
  execSync(`npm run build`);
  console.log('Build app completed.');
}

function uploadStatic() {
  console.log('Uploading assets to S3...');
  execSync(
    `aws s3 sync build/static ${process.env.S3_URL}/${timestamp}/static --cache-control max-age=31536000,public`
  );
  console.log('Upload assets to S3 completed.');
}

function uploadIndex() {
  console.log('Uploading index.html to S3...');
  execSync(
    `aws s3 cp build/index.html ${process.env.S3_URL}/index.html --cache-control max-age=0,no-store`
  );
  console.log('Upload index.html to S3 completed.');
}

function deleteOldVersion() {
  console.log('Deleting old versions ...');
  // Retrieve the list of folder names (versions) from S3
  const command = `aws s3 ls ${process.env.S3_URL} --recursive | awk '{print $4}' | grep '/' | cut -d/ -f1 | uniq`;
  const result = execSync(command).toString();
  // Split the result into an array, filter out 'index.html' and other non-versioned entries, and then sort
  const versions = result
    .split('\n')
    .filter(v => v && v !== 'index.html' && /^\d{14}$/.test(v))
    .sort();
  // If there are more than 10 versions, remove the oldest ones
  if (versions.length > 10) {
    const toDelete = versions.slice(0, versions.length - 10); // Keep the last 10

    toDelete.forEach(version => {
      console.log(`Deleting version: ${version}`);
      execSync(`aws s3 rm ${process.env.S3_URL}/${version} --recursive`);
    });
    console.log('Deleting old versions completed.');
  } else {
    console.log('No old versions to delete.');
  }
}
