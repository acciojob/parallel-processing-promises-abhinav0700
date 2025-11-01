//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image and return a Promise
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}

// Main function to download all images
async function downloadImages() {
  // Clear previous messages and content
  output.innerHTML = "";
  errorDiv.innerHTML = "";

  // Show loading spinner
  loading.style.display = "block";

  try {
    // Create array of Promises
    const promises = images.map((imgObj) => downloadImage(imgObj.url));

    // Wait for all images to download
    const downloadedImages = await Promise.all(promises);

    // Hide loading spinner
    loading.style.display = "none";

    // Display downloaded images
    downloadedImages.forEach((img) => output.appendChild(img));
  } catch (err) {
    // Hide loading spinner
    loading.style.display = "none";

    // Show error message
    errorDiv.textContent = err.message;
  }
}

// Event listener for button click
btn.addEventListener("click", downloadImages);
