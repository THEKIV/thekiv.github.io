// Константы
var months=["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"];
var weekdays=["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
var timeofday = ["Ночью", "Утром", "Днем", "Вечером"];
var directions = ["Северный", "Северо-Восточный", "Восточный", "Юго-Восточный", "Южный", "Юго-Западный", "Западный", "Северо-Западный"];
var cloudiness=["Ясно", "Малооблачно", "Облачно", "Пасмурно"];
var precipations = ["Дождь", "Ливень", "Снег", "Снег", "Гроза", "", "Без осадков"];
var probability = ["Возможен", "Возможна"];

// Преобразование кода месяца в текстовое представление
function convertMonth(t)
{
if(t>=1&&t<=12)
return months[t-1];
else
return "";
}

// Преобразование кода дня недели в текстовое представление
function convertWeekday(w)
{
if(w>=1&&w<=7)
return weekdays[w-1];
else
return "";
}

// Преобразование кода времени суток в текстовое представление
function convertToD(t)
{
if(t>=0&&t<=3)
return timeofday[t];
else
return "";
}

// Преобразование кода направления ветра в текстовое представление
function convertDirection(d)
{
if(d>=0&&d<=7)
return directions[d];
else
return "";
}

// Преобразование кода облачности в текстовое представление
function convertCloudiness(c)
{
if(c>=0&&c<=3)
return cloudiness[c];
else
return "";
}

// Преобразование кода осадков в текстовое представление
function convertPrecipitation(p, r, s)
{
if(p>=4&&p<=10)
ret=precipations[p-4];
else
ret="";
if(p>=4&&p<=7&&r==0) ret=probability[0]+" "+ret;
if(p==8&&s==0) ret=probability[1]+" "+ret;
return ret;
}

// Парсит в массив аттрибуты XML-ноды
function getAttributes(node)
{
var ret = new Object();
if(node.attributes)
for(var i=0; i<node.attributes.length; i++)
{
var attr = node.attributes[i];
ret[attr.name] = attr.value;
}
return ret;
}

//Загружает XML-документ
function getXMLDocument(url)
{
var xml;
if(window.XMLHttpRequest)
{
xml=new window.XMLHttpRequest();
xml.open("GET", url, false);
xml.send("");
return xml.responseXML;
}
else
if(window.ActiveXObject)
{
xml=new ActiveXObject("Microsoft.XMLDOM");
xml.async=false;
xml.load(url);
return xml;
}
else
{
alert("Загрузка XML не поддерживается браузером");
return null;
}
}

// Разбор XML-документа
function parseGismeteoXML(url, template)
{
var output="";
// Пытаемся загрузить XML-документ
var xml=null;
try
{
xml=getXMLDocument(url);
if(!xml) return "<font color='red'>Нет данных</font>";
}
catch(e)
{
return "<font color='red'>"+e.message+"</font>";
}
// Парсим первый уровень XML-документа - TOWN
var towns=xml.getElementsByTagName("TOWN");
var town=null;
if(towns)
for(var i1=0; i1<towns.length; i1++)
{
town=towns[i1];
var tw_attr = getAttributes(town);
var t_town=template.town.replace(/\{sname\}/g,unescape(tw_attr['sname'])).replace(/\{latitude\}/g,tw_attr['latitude']).replace(/\{longitude\}/g,tw_attr['longitude']).replace(/\{index\}/g,tw_attr['index']);
// Парсим второй уровень XML-документа - FORECAST
var forecasts=town.getElementsByTagName("FORECAST");
var forecast=null;
var t_forecasts="";
if(forecasts)
for(var i2=0; i2<forecasts.length; i2++)
{
forecast=forecasts[i2];
var fc_attr = getAttributes(forecast);
//var fc_date = convertToD(fc_attr['tod']) + " "+ fc_attr['day'] + " " + convertMonth(fc_attr['month']) + " " + fc_attr['year']+ " года.";
var t_forecast=template.forecast.replace(/\{weekday\}/g,fc_attr['weekday']).replace(/\{sweekday\}/g,convertWeekday(fc_attr['weekday'])).replace(/\{tod\}/g,fc_attr['tod']).replace(/\{stod\}/g,convertToD(fc_attr['tod'])).replace(/\{day\}/g,fc_attr['day']).replace(/\{smonth\}/g,convertMonth(fc_attr['month'])).replace(/\{month\}/g,fc_attr['month']).replace(/\{year\}/g,fc_attr['year']).replace(/\{hour\}/g,fc_attr['hour']).replace(/\{predict\}/g,fc_attr['predict']);
// Парсим третий уровень XML-документа - сами параметры погоды
var params=forecast.childNodes;
var t_heat=t_phenomena=t_pressure=t_temperature=t_wind=t_relwet="";
if(params)
for(var i3=0; i3<params.length; i3++)
{
param=params[i3];
var tmp=getAttributes(param);
switch(param.nodeName)
{
case "PHENOMENA":   // Парсим атмосферные явления
var t_phenomena=template.phenomena.replace(/\{scloudiness\}/g,convertCloudiness(tmp["cloudiness"])).replace(/\{cloudiness\}/g,tmp['cloudiness']).replace(/\{rpower\}/g,tmp['rpower']).replace(/\{spower\}/g,tmp['spower']).replace(/\{precipitation\}/g,tmp['precipitation']).replace(/\{sprecipitation\}/g,convertPrecipitation(tmp["precipitation"], tmp["rpower"], tmp["spower"]));
break;
case "PRESSURE":    // Парсим давление
var t_pressure=template.pressure.replace(/\{min\}/g,tmp['min']).replace(/\{max\}/g,tmp['max']);
break;
case "TEMPERATURE": // Парсим температуру
var t_temperature=template.temperature.replace(/\{min\}/g,tmp['min']).replace(/\{max\}/g,tmp['max']);
break;
case "WIND":        // Парсим ветер
var t_wind=template.wind.replace(/\{min\}/g,tmp['min']).replace(/\{max\}/g,tmp['max']).replace(/\{direction\}/g,tmp['direction']).replace(/\{sdirection\}/g,convertDirection(tmp['direction']));
break;
case "RELWET":      // Парсим влажность
var t_relwet=template.relwet.replace(/\{min\}/g,tmp['min']).replace(/\{max\}/g,tmp['max']);
break;
case "HEAT":        // Парсим комфортную температуру
var t_heat=template.heat.replace(/\{min\}/g,tmp['min']).replace(/\{max\}/g,tmp['max']);
break;
}
}
var t_forecast=template.t_forecast.replace(/\{forecast\}/g,t_forecast).replace(/\{phenomena\}/g, t_phenomena).replace(/\{pressure\}/g,t_pressure).replace(/\{temperature\}/g,t_temperature).replace(/\{wind\}/g,t_wind).replace(/\{relwet\}/g,t_relwet).replace(/\{heat\}/g,t_heat);
t_forecasts+=t_forecast;
}
var t_forecast_town=template.t_template.replace(/\{town\}/g,t_town).replace(/\{forecasts\}/g, t_forecasts);
output+=t_forecast_town;
}
return output;
}

// Отрисовывает информер gismeteo
function drawGismeteoInformer(url, div, template)
{
var div=document.getElementById(div);
if(!div) return;
var output=parseGismeteoXML(url, template);
div.innerHTML=output;
}