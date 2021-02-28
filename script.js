let myClass="";//global var

async function getFeatures(urlString)
{
  const featureUrl2 = "https://www.dnd5eapi.co" + urlString;
  const response2 = await fetch(featureUrl2);
  const json2 = await response2.json();
  for(let k = 0; k < json2.desc.length; k++)
  {
    results += "<p>" + json2.desc[k] + "</p>";
  }
  console.log(results2);
  return results2;
}

document.getElementById("levelSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("levelInput").value;
  if (value === "")
    return;
  values = value.split("/");
  if (values.length < 2)
  {
    return;
  }
  // current weather:
  myClass = values[0];
  const url = "http://www.dnd5eapi.co/api/classes/" + values[0] + "/levels/" + values[1];
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
          console.log(json);
            let results = "";
            results += "<h2>You chose " + json.class.name + ", Level " + json.level + "</h2>";
            results += "<h3>Proficiency Bonus: " +json.prof_bonus + "</h3>";
            results += "<h3>Features:</h3>";
            for(let i=0; i < json.features.length; i++)
            {
              const featureUrl2 = "https://www.dnd5eapi.co" + json.features[i].url;
              fetch(featureUrl2)
                .then(function(response2) {
                  return response2.json();
                }).then (function(json2) {
                  results += "<h3>" + json2.name + "</h3>"
                  for(let k = 0; k < json2.desc.length; k++)
                  {
                    results += "<p>" + json2.desc[k] + "</p>";
                  }
                  console.log(results);
                  document.getElementById("classResults").innerHTML = results;
                });
              results += "</div";
              }
            document.getElementById("classResults").innerHTML = results;
      });
});


function spellCheck()
{
  if(myClass === "")
  {
    return;
  }
  const url = "http://www.dnd5eapi.co/api/classes/" + myClass + "/spells";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += "<h2>Number of spells avaible: " + json.count + "</h2>";
      if(json.count === 0)
      {
        results += "<p>You have no spells availble!</p>";
      }
      else {
      results += "<p>List of Spells: <ul>"
        for(let i=0; i < json.results.length; i++) {
          // console.log(json.results[i]);
          results += "<li>" + json.results[i].name + "</li>";
        }
        results += "</ul></p>";
      }
        document.getElementById("spellResultOutput").innerHTML = results;
    });

}