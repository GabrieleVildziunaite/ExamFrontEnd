//Duomenis pasiimsime iš: https://magnetic-melon-yam.glitch.me

//1. Naudojant tik JS, sukurkite lentelę ir į ją įrašykite duomenis (id, name, city, fav_color).
const url = 'https://magnetic-melon-yam.glitch.me';
let dataMasyvas = [];


// 4. Sukurkite checkbox virš lentelės su JS. Jį paspaudus, rodys tik tuos žmones, kurie yra VIP.

let createCheckbox = () => { //Kaip padaryti virsuje?
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', 'checkBox');
    document.body.append(checkbox);
        
    const checkboxLabel = document.createElement('label');
    checkboxLabel.setAttribute('for', 'checkBox');
    checkboxLabel.innerText = 'VIP';
    document.body.append(checkboxLabel);
    }
createCheckbox();

function showVip() {
	const isChecked = document.getElementById("checkBox").checked; //tikrinam ar pazymetas checkbox?

	isChecked
		? drawTable(
				dataMasyvas.filter((item) => { //filltrujam duomenis ???? Kaip veikia?
					return item.vip === true;
				})
		  )
		: drawTable(dataMasyvas);
}

document.getElementById("checkBox").addEventListener("change", showVip);

// 5. Sukurkite virš lentelės ir search laukelį (forma su input type search ir mygtukas). Suvedus duomenis, 
// lentelėje turi prasifiltruoti pagal vardą arba pavardę (fullname contains search string). Capitalizacija turėtų būti nesvarbi.

let createSearchBox = () => { //Kaip padaryti virsuje?
    const searchBox = document.createElement('input');
    searchBox.setAttribute('type', 'search');
    searchBox.setAttribute('id', 'searchBar');
    document.body.append(searchBox);

    const searchButton = document.createElement('button');
    searchButton.innerHTML = 'Searchd';
    searchButton.setAttribute('id', 'searchButton');
  
    const form = document.createElement('form');
    form.append(searchBox, searchButton);
    document.body.append(form);
}

createSearchBox();

// document.querySelector('form').addEventListener('submit', (event) => { // kurioje vietoje turi but?
//     event.preventDefault();
//     const searchString = document.getElementById('searchBar').value.toLowerCase();
//     renderTable(dataMasyvas.filter(data => data.name.toLowerCase().includes(searchString))); //renderTable upodates tabe withough redrawing it
//                          
//   }) // kaip gauti duomenis t.y varda sitoje vietoje? reikia dar vieno variable?//NEVEIKIA


async function getData(url) { // tik gauname duomenis is url
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function drawTableFromUrl(url) { 
	try {
		dataMasyvas = await getData(url);
		drawTable(dataMasyvas);
	} catch (error) {
		console.error(error);
	}
}

function drawTable(data) {
	const tbody = document.querySelector("tbody");
	const thead = document.querySelector("thead");

	tbody.innerHTML = ""; //istrinam viska pries piesiant nauja lentele kad nieko nebutu kad nesidarytu viena ant kitos
	thead.innerHTML = "";

    const idHeader = document.createElement("th");
    idHeader.innerText = "ID";
    const pictureHeader = document.createElement("th");
    pictureHeader.innerText = "Picture";
    const nameHeader = document.createElement("th");
    nameHeader.innerText = "Name";
    const surnameHeader = document.createElement("th");
    surnameHeader.innerText = "Surname";
    const cityHeader = document.createElement("th");
    cityHeader.innerText = "City";
    const fav_colorHeader = document.createElement("th");
    fav_colorHeader.innerText = "Favourite Color";

    const tr = document.createElement("tr");
    tr.append(idHeader, pictureHeader, nameHeader, surnameHeader, cityHeader, fav_colorHeader);
    thead.append(tr)

    data.forEach((dataItem) => {
        const id = document.createElement("td");
        id.innerText = dataItem.id;

// 3. Pridėkite prie lentelės (tarp id ir name) nuotrauką.
        const img = document.createElement('img') //sukuriame image elementa
        img.src = dataItem.image // priskiriam url image elementui
        const picture = document.createElement("td"); //sukuriam eilute
        picture.append(img);//pridedam image elementa prie image eilutes

// 2. Naudojant JS metodus, padalinkite vardą į dvi dalis: vardą ir pavardę (lentelėje).

        let fullName = dataItem.name
        let separateNames = fullName.split(" ")
        let firstName = separateNames[0]
        let lastName = separateNames[1]

        const name = document.createElement("td");
        name.innerText = firstName;
        const surname = document.createElement("td");
        surname.innerText = lastName;

        const city = document.createElement("td");
        city.innerText = dataItem.city;

        const fav_color = document.createElement("td");
        fav_color.innerText = dataItem.fav_color;

        const tr = document.createElement("tr");
        tr.append(id, picture, name, surname, city, fav_color);
        tbody.append(tr);
    });  
}

drawTableFromUrl(url);
