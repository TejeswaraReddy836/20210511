const fs = require('fs');
const http=require('http');
http.createServer(function(req,res){

req.setEncoding('utf8');
let body='';
 req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    try {
        let output=[]
     // let data = body.toStream().pipe(jsonStream.input);
      let data = JSON.parse(body);
      let count=0;
      data.forEach(element => {
          let bmi=element.WeightKg/element.HeightCm;
          let category,healthrisk;
          if(bmi<=18.4){
            category='Underweight';
            healthrisk='Malnutrition risk'
          }
          else if(bmi>=18.5 && bmi<=24.9){
            category='Normal weight';
            healthrisk='Low risk';
        }
        else if(bmi>=25 && bmi<=29.9){
            category='Overweight';
            healthrisk='Enhanced risk';
            count+=1;
        }
        else if(bmi>=30 && bmi<=34.9){
            category='Moderately obese';
            healthrisk='Medium risk';
        }
        else if(bmi>=35 && bmi<=39.9){
            category='Severely obese';
            healthrisk='High risk';
        } 
        else{
            category='Very severely obese';
            healthrisk='Very high risk';
        }
        output=[...output,{BMI_value:bmi,BMIcategory:category,healthRisk:healthrisk}];
      });
      output=[...output,{count_overWeight:count}];
	  res.writeHead(200,{'Content-Type':'application/json'});
	  data=JSON.stringify(output);
      res.write(data);
      res.end();
    } catch (er) {
      res.statusCode = 400;
      return res.end(`error: ${er.message}`);
    }
  });      
}).listen(8080);
