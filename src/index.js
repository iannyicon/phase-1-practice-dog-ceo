console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', () => {
  // Challenge 1: Fetch and display dog images
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const dogImageContainer = document.getElementById('dog-image-container');
  
  // Challenge 2: Fetch and display dog breeds
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  const dogBreedsList = document.getElementById('dog-breeds');
  const breedDropdown = document.getElementById('breed-dropdown');
  
  // Store all breeds for filtering
  let allBreeds = [];
  
  // Challenge 1: Fetch and display random dog images
  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      data.message.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Random dog';
        dogImageContainer.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching images:', error));
  
  // Challenge 2: Fetch and display dog breeds
  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      allBreeds = Object.keys(data.message);
      renderBreeds(allBreeds);
    })
    .catch(error => console.error('Error fetching breeds:', error));
  
  // Function to render breeds to the list
  function renderBreeds(breeds) {
    dogBreedsList.innerHTML = ''; // Clear existing breeds
    
    breeds.forEach(breed => {
      const li = document.createElement('li');
      li.textContent = breed;
      dogBreedsList.appendChild(li);
    });
    
    // Challenge 3: Add click event to change color
    addBreedClickHandlers();
  }
  
  // Challenge 3: Change color when breed is clicked
  function addBreedClickHandlers() {
    const breedItems = document.querySelectorAll('#dog-breeds li');
    breedItems.forEach(item => {
      item.addEventListener('click', () => {
        // Toggle between blue and black (or any color you prefer)
        item.style.color = item.style.color === 'blue' ? 'black' : 'blue';
      });
    });
  }
  
  // Challenge 4: Filter breeds by selected letter
  breedDropdown.addEventListener('change', (event) => {
    const selectedLetter = event.target.value;
    
    if (selectedLetter === 'all') {
      renderBreeds(allBreeds);
    } else {
      const filteredBreeds = allBreeds.filter(breed => 
        breed.startsWith(selectedLetter)
      );
      renderBreeds(filteredBreeds);
    }
  });
});