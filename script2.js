//creating HTML element using DOM

document.body.innerHTML = `<body><div class="heading-container">
<h1> POKEMON </h1>
<img src="/img/pokemon.jfif" alt="pokemon"  class="icon" style="height: 200px; width:200px;">
</div>
<button id="previous" onclick="backward()" class="btn btn-primary">previous..</button>
<button id="next" onclick="forward()" class="btn btn-primary">next..</button>
<div id="mainContainer" >
</div>

    
 <p  hidden id="pcount"></p>
 </body>
`;

//creating a variable to keep count of the pages
var a=0;
document.getElementById('pcount').innerHTML=a;
console.log(document.getElementById('pcount').innerHTML);


//creating onclick button functions for navigating the pages
function forward(){
    
    a++;
    document.getElementById('pcount').innerHTML=a;
    getData(document.getElementById('pcount').innerHTML);
}

function backward(){
    if(a>0){
        a--;
        document.getElementById('pcount').innerHTML=a;
        getData(document.getElementById('pcount').innerHTML);
    }
    
}

//the functionality of the page
const getData = async (count1) => {
    try {
        console.log('im here');
      const data = await fetch("https://pokeapi.co/api/v2/pokemon/");
      const pokemon = await data.json();
     
      console.log(pokemon.results[count1].name);
      mainContainer.innerHTML = "";
      
   displayData(pokemon.results[count1]);

       
    } catch (error) {
      console.log(error);
    }

    // data1();
  };

  getData(document.getElementById('pcount').innerHTML);
  

//Create display method to show the data from api in clean way

const displayData =async  (res) => {
    console.log(res.url);
    const power  = await fetch(res.url);
    const sup=await power.json();
    //pokemon name
    mainContainer.innerHTML += `
        <p class="para blue"> Name:${res.name}</p>
`
    console.log(sup.abilities.length);
    //pokemon weight
    mainContainer.innerHTML += `
    <p> Weight: ${sup.weight}</p>
    
`   //pokemon abilities
    mainContainer.innerHTML += `
    
    <p> Abilities:</p>
    `
    for(let i=0;i<sup.abilities.length;i++){
        console.log(sup.abilities[i].ability.name);
        mainContainer.innerHTML += `
                <span> ${sup.abilities[i].ability.name}</span>
                <br>
        `

            
    }
    //pokemon moves
    mainContainer.innerHTML += `
    
    <p> Moves:</p>
    `
    for(let i=0;i<sup.moves.length;i++){
        console.log(sup.moves[i].move.name);
        mainContainer.innerHTML += `
        <span> ${sup.moves[i].move.name}</span>
        <br>
`
    }
    console.log(sup.weight);



};
