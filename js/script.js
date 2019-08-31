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

const aTags = Array.from(document.getElementsByTagName('a'));
// console.log(aTags[0].getAttribute('data-title'))
const input = document.getElementById('search');
// console.log(aTags)

// Keyup event listener on search input

input.addEventListener('keyup', e => {
  let value = e.target.value;
  let search = [];
  /*Pushes trimmed and lower case values
   to search array based on whether there 
   is a comma or not*/
  if (!value.includes(',')) {
    search.push(trimAndLowerCase(value))
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
      }
    });
    // console.log(tag, flag);
    // console.log(aTags[index]);
    if (flag) {
      aTags[index].style.display = "block";
    } else {
      aTags[index].style.display = "none";
    }
  });

  // search = search.toLowerCase();
  // search = search.trim();
  // console.log(value, value.length);
});

// Helper function - trims and lower case
function trimAndLowerCase(value) {
  value = value.trim();
  return value.toLowerCase();
}

// a[0].style.display = 'none';

// setTimeout(function () {
//   a[0].style.display = 'block';
// }, 5000)
// img[0].style.display = none;