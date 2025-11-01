document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("download-images-button");
  const output = document.getElementById("output");

  // Ensure button and output exist
  if (!button || !output) {
    console.error("Missing button or output element in HTML!");
    return;
  }

  button.addEventListener("click", async () => {
    output.innerHTML = ""; // Clear previous images

    const imageUrls = [
      "https://picsum.photos/id/237/200/300",
      "https://picsum.photos/id/238/200/300",
      "https://picsum.photos/id/239/200/300",
    ];

    try {
      // Fetch all images in parallel
      const imagePromises = imageUrls.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}`);
        return url; // we can directly return url since picsum allows hotlinking
      });

      const results = await Promise.all(imagePromises);

      // Display images
      results.forEach((url) => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Random";
        img.style.margin = "10px";
        output.appendChild(img);
      });
    } catch (error) {
      console.error("Error loading images:", error);
    }
  });
});
