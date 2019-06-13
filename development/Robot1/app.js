//version 2
//var async = require('async');
//var Promise = require("bluebird");
require('chromedriver');
const {Builder, By, until} = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
var chromeCapabilities = webdriver.Capabilities.chrome();
var chromeOptions = {'args': ['--test-type', '--start-maximized','--headless']};
var chromeOptions = {'args': ['--test-type', '--start-maximized']};
chromeCapabilities.set('chromeOptions', chromeOptions);
let driver = new Builder().withCapabilities(chromeCapabilities).build();

var auxHTML = [];
var auxLinks = [];
var newsProperties = [];
var dataOK = [];
var links = [];
var urls = [];
var newLinks = [];


urlFuente();

function urlFuente(){

	driver.get('https://www.eluniversal.com.mx/');
	driver.wait(until.elementLocated(By.id('universallogo'),5000)).then(null, function(){
		console.log('error al cargar la página');
		/*$insertar errores de ejecucion de robots funcion--$*/
	});
	news();
}

/*$#################################################################################################$*/
function news(){

	driver.wait(until.elementLocated(By.className('universal-boton-despliega'),10000)).then(function(){
		console.log('class boton-link found');
		driver.sleep(7000);
		driver.findElement(By.xpath('//*[@id="universal-menu-primero"]/div[1]')).click();
		driver.sleep(10000);
		driver.findElement(By.xpath('//*[@id="universal-header-bottom"]/div[7]/ul/li[3]/a')).click();

		driver.wait(until.elementLocated(By.className('nombre-seccion'),15000)).then( function(){
			driver.sleep(10000);
			console.log('seccion metropoli|||');

			driver.findElement(By.id('zone-content-wrapper')).getAttribute('innerHTML').then( function(html){

				html = html.replace('>','').replace(/\n/g,'').replace('</a>','').replace('</div>','').trim();
				html = html.split('<div');

				for(var i = 0; i < html.length-1; i++){

					if(html[i].indexOf('href=') != -1){
						auxHTML = html[i].split('>');
						for(var j = 0;j < auxHTML.length; j++) {
            				auxHTML[j] = auxHTML[j].replace('<','').replace('/es-noticia','').replace('"','').replace('https://www.eluniversal.com.mx','').replace('/div','').replace('/span','').replace('/a','').replace('"','').replace('a href=','').split(/\<[^\>]*\>/ig);
       					}
       					newsProperties.push(auxHTML);
					}

				}

				for(var i =0 ; i < newsProperties.length-1; i++){

					if(newsProperties[i].length == 7 || newsProperties[i].length == 11 || newsProperties[i].length == 4){ links.push(newsProperties[i][2]);	}

					if(newsProperties[i].length == 9 || newsProperties[i].length == 13 || newsProperties[i].length == 14){ links.push(newsProperties[i][4]); }

					if(newsProperties[i].length == 10){ links.push(newsProperties[i][1]); }

					if(newsProperties[i].length == 15){ links.push(newsProperties[i][6]); }

				}

				for(var i=0; i< links.length; i++){
					if(links[i][0].indexOf('/metropoli/') != -1){
          				auxLinks.push(links[i][0]);
					}

				}

				urls=auxLinks.unique();
				//console.log('urls:'+urls.length);
				//console.log(urls);
				downloadDataNews(urls);
			});
		});
	});
}

/*$##########################################################################################################################################$*/
Array.prototype.unique=function(a){
	return function(){
  	return this.filter(a)
	}
}(function(a,b,c){
	return c.indexOf(a,b+1)<0
});

/*$##########################################################################################################################################$*/
function downloadDataNews(urls){

  driver.sleep(3000);
  console.log('https://www.eluniversal.com.mx'+urls[3]);
  driver.get('https://www.eluniversal.com.mx'+urls[3]);
  driver.wait(until.elementLocated(By.className('content clearfix')),7000).then( function(){
  	driver.findElement(By.xpath('//*[@id="block-system-main"]/div/div')).getAttribute('innerHTML').then(function(html){
  		//console.log(html);
  		html = html.replace('>','').replace(/\n/g,'').replace('</a>','').replace('</div>','').trim();
		html = html.split('<div');
        auxHTML = [];
        newsProperties = [];
        links = [];
		for(var i = 0; i < html.length-1; i++){

			if(html[i].indexOf('href=') != -1){
				auxHTML = html[i].split('>');
				for(var j = 0;j < auxHTML.length; j++) {
            		auxHTML[j] = auxHTML[j].replace('<','').replace('"','').replace('/div','').replace('/span','').replace('/a','').replace('"','').replace('a href=','').split(/\<[^\>]*\>/ig);
       				}
       			newsProperties.push(auxHTML);
			}

		}

		for(var i =0 ; i < newsProperties.length-1; i++){
			if(newsProperties[i].length == 7){ links.push(newsProperties[i][2]); }
		}

		for(var i=0; i< links.length; i++){
			if(links[i][0].indexOf('/metropoli/') != -1){ newLinks.push(links[i][0]); }
		}

		visitLinksToNews(newLinks);

  	});
  });

}



/*$##########################################################################################################################################$*/

function visitLinksToNews(links){
	var clearData = [];
	var dataNewOk = [];
	console.log('https://www.eluniversal.com.mx'+links[2])
	driver.get('https://www.eluniversal.com.mx'+links[2]);
	driver.wait(until.elementLocated(By.className('nombre-seccion')),7000).then( function(){
		driver.findElement(By.xpath('//*[@id="block-system-main"]/div/div')).getAttribute('innerHTML').then( function(html){
           //console.log(html);
            html = html.replace('>','').replace(/\n/g,'').replace('</a>','').replace(';','').replace('</div>','').replace('<p>','').replace('</p>','').replace('&nbsp','').replace('<strong>','').replace('<br>','').replace('</strong>','').replace('</div>','').replace('.<p>','').trim();
		    html = html.split('<div');
		    //console.log(html);

		    for (var i = 0; i < html.length-1; i++) {

		   		if(html[i].indexOf('class=\"hora\"') != -1 || html[i].indexOf('class=\"fechap\"') != -1 || html[i].indexOf('class=\"pane-content\"><h1>') != -1
		   			|| html[i].indexOf('class=\"field field-name-body field-type-text-with-summary field-label-hidden\"') != -1 ){

		   		    html[i] = html[i].replace('</strong>','').replace('class="hora">','').replace('class="field field-name-body field-type-text-with-summary field-label-hidden">','').replace('class="fechap">','').replace('class="pane-content"><h1>','').replace('<p>','').replace('</p>','').replace('</strong>','').replace('<strong>','').replace('.</p>','').replace('<p>','').replace('.<p>','. ').replace(';','').replace('</p><p>','').replace('</strong></p><p>','').trim();
		   		    clearData = html[i];
		   		    dataNewOk.push(clearData);
		   		}
		    }
            //console.log('---------\n'+clearData);
		    buildJSON(dataNewOk);
		});
	});
}



function buildJSON(dataNewOk){

    var json = {};

    json.title = dataNewOk[0].replace('</h1></div></div></div>','').replace('<div>').trim();
    json.date = dataNewOk[1].replace('</div>','');
    json.publicationHour = dataNewOk[2].replace('</div> </div></div>','');
    json.description = dataNewOk[3].replace('<strong> ','').replace('<strong>','').replace('</strong>','').replace('</p>','').replace('.</p>','').replace('<p>','').replace('</p><p>');

    console.log(json);

}
