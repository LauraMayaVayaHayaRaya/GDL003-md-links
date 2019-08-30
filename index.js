const fs = require('fs');
const marked = require('marked');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const path = require('path');
var fetchUrl = require("fetch");


//LEER ARCHIVO .md
const mdLinks = mdFile => {
  let ext = path.extname(mdFile);
  if (ext == '.md') {
    return new Promise((resolve, reject) => {
      fs.readFile(mdFile, 'utf-8', (err, data) => { 
        if(err) {
          //console.log('ERROR: NO ES UN ARCHIVO VALIDO :() ', err);
        } else {
          let html = marked(data);
          //console.log(html);
          const dom = new JSDOM(html);
          //console.log(dom.window.document.links);
          const linksObject = dom.window.document.links;
          const validLinks = [];
          const brokenLinks =[];
          for (let index = 0; index < linksObject.length; index++) {
            fetchUrl(linksObject[index].href, function(error, meta, body){
              if (meta.status == 200) {
                validLinks.push(linksObject[index].href);
              } else {
                brokenLinks.push(linksObject[index].href);
              }
            }); 
          }
          console.log(validLinks);
          //console.log(links);
          return validLinks;
        }
      }); 
    })
  } else {
    console.log('ERROR:No es un archivo .md');
  }  
}
mdLinks('README.md');

