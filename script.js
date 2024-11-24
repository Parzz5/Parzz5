const gallery = document.getElementById("gallery");
let selectedImage = null; // To track the currently opened image

const OWNER_PASSWORD = "immanuel_blorok_plantong"; // Replace with your secure password

// Function to load saved images from localStorage
function loadImages() {
  const savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
  savedImages.forEach((src) => createImageElement(src));
}

// Function to create a gallery item
function createImageElement(src) {
  const imageItem = document.createElement("div");
  imageItem.classList.add("gallery-item");
  imageItem.innerHTML = `<img src="${src}" alt="Image" onclick="openModal(this)">`;
  gallery.appendChild(imageItem);
}

// Function to add a new image
function addImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      createImageElement(e.target.result);
    };
    reader.readAsDataURL(file); // Convert the image file to Base64 string
  }
}

// Function to save images to localStorage
function saveImages() {
  const images = gallery.querySelectorAll("img");
  const imageSrcArray = Array.from(images).map((img) => img.src);
  localStorage.setItem("galleryImages", JSON.stringify(imageSrcArray));
  alert("Images saved successfully!");
}

// Function to open modal with clicked image
function openModal(imgElement) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");

  modal.style.display = "block";
  modalImage.src = imgElement.src; // Set modal image to clicked image
  selectedImage = imgElement; // Track the selected image
}

// Function to close modal
function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
  selectedImage = null;
}

// Function to delete the selected image
function deleteImage() {
  const passwordInput = document.getElementById("ownerPassword").value;

  if (passwordInput === OWNER_PASSWORD) {
    if (selectedImage) {
      // Remove the image from the gallery
      selectedImage.parentElement.remove();

      // Close the modal
      closeModal();

      // Optionally, save the updated gallery to localStorage
      saveImages();

      alert("Image deleted successfully!");
    }
  } else {
    alert("Incorrect password! Only the owner can delete images.");
  }
}

// Load images on page load
window.onload = loadImages;