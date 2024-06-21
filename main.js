const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

// Define the folder containing the images
const folderPath = './input'; // Change to your folder path

// Function to process each image
async function processImage(filePath, outputDir) {
  const fileName = path.basename(filePath);
  const outputFilePath = path.join(outputDir, fileName);

  try {
    await sharp(filePath)
      .toFile(outputFilePath);
    console.log(`Processed: ${fileName}`);
  } catch (err) {
    console.error(`Error processing ${fileName}: ${err.message}`);
  }
}

// Function to process all images in the folder
async function processFolder(inputDir, outputDir) {
  try {
    const files = await fs.readdir(inputDir);

    // Ensure output directory exists
    await fs.ensureDir(outputDir);

    const imageFiles = files.filter(file => /\.(jpe?g|png)$/i.test(file));

    for (const file of imageFiles) {
      const filePath = path.join(inputDir, file);
      await processImage(filePath, outputDir);
    }

    console.log('All images processed.');
  } catch (err) {
    console.error(`Error processing folder: ${err.message}`);
  }
}

// Run the script
const outputDir = './output'; // Change to your output folder path
processFolder(folderPath, outputDir);
