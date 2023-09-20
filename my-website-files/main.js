//first url for which the the site is loaded with embed=true which is a life saviour!!
var baseUrl = "https://wptavern.com/wp-json/wp/v2/posts?_embed=true";

//variables to be used below
var slideIndex = 1;
var sliderContainer = document.querySelector('.slideshow-container');
var container = document.querySelector('.container');
var form = document.querySelector("#frm");
var img = `<img id="loader" src="./Img/loading.gif" alt="load"></img>`;


//form function which handles the data 
const handleForm = (event) => {
    event.preventDefault();
    alert("changing URL");

    //removing the previous elements inside slider
    sliderContainer.querySelectorAll('*').forEach(n => n.remove());
    //loader gif
    sliderContainer.innerHTML = img;

    const newUrl = document.querySelector('#newUrl').value;

    //combining the website with api endpoint
    const addUrl = newUrl + '/wp-json/wp/v2/posts?_embed=true';

    //calling the function with new url
    getData(addUrl);

    document.querySelector("#newUrl").value = "";
}

// adding event listener for the form
form.addEventListener('submit', handleForm);

//main function which gets the data from wordpress api endpoint
const getData = async (baseUrl) => {

    //Fetch data from url
    try {
        const response = await fetch(baseUrl);

        //validation for the response
        if (response.ok && response.status == 200 &&
            response.headers.get('content-type') == 'application/json; charset=UTF-8') {
            const data = await response.json();

            //if data exist the image loader 
            if (data) {
                const img = document.querySelector("#loader");
                if (img) {
                    img.remove();
                }
                else {
                    alert('Image Gone');
                }
            }
            const dateOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };

            data.forEach(async (item) => {
                if (item._embedded["wp:featuredmedia"]) {
                    //inserting the slides in the slider component
                    sliderContainer.innerHTML += `
                        <div class= "mySlides fade">
                            <a href="${item.link}"> <span class="textTitle">${item.title.rendered}</span></a>

                            <a href="${item.link}"> <img src='${item._embedded["wp:featuredmedia"][0].source_url}'></a>

                            <div class="textAuth"> by ${item._embedded.author[0].name} At 
                            ${(new Date(item.date)).toLocaleDateString("en-US", dateOptions)}</div>
                        </div>
                    `;
                    showSlides(slideIndex);
                }
            });
            //adding the buttons to skip the slides
            sliderContainer.innerHTML += `
                    <a class= "prev" onclick="plusSlides(-1)" >&#10094;</a>
                    <a class="next" onclick="plusSlides(1)">&#10095;</a>`;
        }

    } catch (error) {
        console.trace(error);
    }
}



//calling function which gets the data for the first time
getData(baseUrl);

//function which shows slide 
const showSlides = (n) => {
    var i;
    var slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
    }
}

//skip slide function
const plusSlides = (n) => showSlides(slideIndex += n);

//skipping the slide
setTimeout(() => { setInterval(() => { plusSlides(1) }, 5000) }, 5000);

const checkKey = (e) => {
    //keyboard event function
    e = e || window.event;

    if (e.keyCode == '37') {
        // left arrow
        return plusSlides(-1)
    }
    else if (e.keyCode == '39') {
        // right arrow
        return plusSlides(1)
    }
}

//setting the keystrokes for arrow keys to skip slides
document.onkeydown = checkKey;




