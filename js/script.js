// Light Box Options

lightbox.option({
  resizeDuration: 500,
  // maxWidth: 1000,
  showImageNumberLabel: false,
  wrapAround: true,
  positionFromTop: 65
});

/*************************
 Search 
 ************************/
const gallery = document.getElementsByClassName('gallery')[0];
const container = document.getElementsByClassName('container')[0];
const aTags = Array.from(document.getElementsByTagName('a'));
const input = document.getElementById('search');

// Add 'No Results found' and hide it
const noResults = document.createElement('h2');
noResults.id = 'no-results';
noResults.innerText = "Sorry, no results found.";
noResults.style.display = 'none';
container.insertBefore(noResults, gallery);

// Keyup and input event listeners on search input

input.addEventListener('keyup', e => {
  search(e);
});
input.addEventListener('input', e => {
  search(e);
});

// Helper function - trims and lower case
function trimAndLowerCase(value) {
  value = value.trim();
  return value.toLowerCase();
}

function search(e) {
  noResults.style.display = 'none';
  // e.preventDefault();
  let value = e.target.value;
  let search = [];
  /*Pushes trimmed and lower case values
   to search array based on whether there 
   is a comma or not*/
  if (!value.includes(',')) {
    search.push(trimAndLowerCase(value));
  } else {
    //creates array of search values
    search = value.split(',');
    // checks to see if the last value is blank, and if it is, removes it from the array
    if (search[search.length - 1].trim() === "") {
      search.pop(search[search.length - 1]);
    }
    search.forEach((value, index) => {
      // trims and lower cases each value
      search[index] = trimAndLowerCase(value);
    });
  }

  /*noResultsFlag starts as true, but if the for loops have a search map, 
  it will set noResultsFlag to false, so it doesn't get displayed.
  if no search match is found, no Results message will show.  */

  let noResultsFlag = true;
  /* Loops through each link tag  
    Sets a flag to false.  
    Loops through each of terms stored in the search array.  
    If the link contains the search, changes flag to true.  
    If still false after the code follwing it, 
    the link tag doesn't contain any of the search terms
    Finally, changes the display to block or none depending on the flag
  
  */
  aTags.forEach((tag, index) => {

    let flag = false;

    search.forEach(term => {
      let tagText = tag.getAttribute('data-title').toLowerCase();
      if (tagText.includes(term)) {
        flag = true;
        noResultsFlag = false;
      }
    });

    if (flag) {
      aTags[index].style.display = "block";
    } else {
      aTags[index].style.display = "none";
    }


  });

  if (noResultsFlag === true) {
    noResults.style.display = 'block';
  }

}

