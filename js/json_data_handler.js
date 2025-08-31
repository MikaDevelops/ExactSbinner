class JsonDataHandler{

    makeJsonString(csvString, typeOfResultFile){
        const jsonObject = {
            bins:{},
            brands:{},
            issuers:{},
            types:{},
            subtypes:{},
            countries:{}
        };
        //let linesplittingStartTime = performance.now();
        let linesArray = csvString.split("\n");
        
        let countryMap = new Map();
        let subtypeMap = new Map();
        let typeMap = new Map();
        let issuerMap = new Map();
        let brandMap = new Map();

        let countryCounter = 1;
        let subtypeCounter = 1;
        let typeCounter = 1;
        let issuerCounter = 1;
        let brandCounter = 1;

        for (let line of linesArray){
            
            let splitedLine = this.#splitLine(line);

            if(jsonObject.bins[splitedLine[0]]){
                alert('Double entry in list file. Processing stopped.');
                throw new Error("double entry in list file");
            }
            jsonObject.bins[splitedLine[0]] = {};
            
            // country
            if (!countryMap.has(splitedLine[5])) countryMap.set(splitedLine[5], countryCounter++);
            jsonObject.bins[splitedLine[0]]['country'] = countryMap.get(splitedLine[5]);

            // subtype
            if (!subtypeMap.has(splitedLine[4])) subtypeMap.set(splitedLine[4], subtypeCounter++);
            jsonObject.bins[splitedLine[0]]['subtype'] = subtypeMap.get(splitedLine[4]);

            // type
            if (!typeMap.has(splitedLine[3])) typeMap.set(splitedLine[3], typeCounter++);
            jsonObject.bins[splitedLine[0]]['type'] = typeMap.get(splitedLine[3]);

            // issuer
            if (!issuerMap.has(splitedLine[2])) issuerMap.set(splitedLine[2], issuerCounter++);
            jsonObject.bins[splitedLine[0]]['issuer'] = issuerMap.get(splitedLine[2]);

            // brand
            if (!brandMap.has(splitedLine[1])) brandMap.set(splitedLine[1], brandCounter++);
            jsonObject.bins[splitedLine[0]]['brand'] = brandMap.get(splitedLine[1]);
        }

        jsonObject.brands = this.#mapToObjectReverse(brandMap);
        jsonObject.issuers = this.#mapToObjectReverse(issuerMap);
        jsonObject.types = this.#mapToObjectReverse(typeMap);
        jsonObject.subtypes = this.#mapToObjectReverse(subtypeMap);
        jsonObject.countries = this.#mapToObjectReverse(countryMap);

        if (typeOfResultFile === 'json') return JSON.stringify(jsonObject);
        if (typeOfResultFile === 'csv') return this.#makeCSVtext(jsonObject);
    }

    #mapToObjectReverse(mapToReverse){
        let object = {};
        for (let keyValueArr of mapToReverse){
            object[keyValueArr[1]] = keyValueArr[0];
        }
        return object;
    }

    #splitLine(lineToSplit){

        let resultArray = [];
        let startIndex = 0;
        let endIndex = 0;
        let running = true;

        while(running){
            endIndex = lineToSplit.indexOf(",", startIndex);
            let value
            if (endIndex < 1) {
                running = false;
                value = lineToSplit.slice(startIndex).trim();
            }else{
                value = lineToSplit.slice(startIndex, endIndex).trim();
            }
            
            if (value[0] === '"') {
                startIndex++;
                endIndex = lineToSplit.indexOf('"', startIndex);
                if (endIndex < 0) throw new Error('Something wrong with csv value, cell last index not quote.');
                value = lineToSplit.slice(startIndex, endIndex);
                endIndex++;
            }
            resultArray.push(value);
            startIndex = endIndex+1;
        }

        return resultArray;
    }

    #makeCSVtext(jsonObject){
        let theString="";
        
        // bins
        theString += this.#nameTheSet('bins');
        for(let key in jsonObject.bins){
            theString += 
                key +";"+ 
                jsonObject.bins[key].brand + ";" + 
                jsonObject.bins[key].issuer + ";" + 
                jsonObject.bins[key].type + ";"+
                jsonObject.bins[key].subtype + ";"+ 
                jsonObject.bins[key].country + "\n";

        }

        // brands
        theString += this.#nameTheSet('brands');
        let brands = jsonObject.brands;
        for(let key in brands){
            theString += key + ";" + brands[key] + "\n";
        }
        // issuers
        theString += this.#nameTheSet('issuers');
        let issuers = jsonObject.issuers;
        for(let key in issuers){
            theString += key + ";" + issuers[key] + "\n";
        }

        // types
        theString += this.#nameTheSet('types');
        let types = jsonObject.types;
        for(let key in types){
            theString += key + ";" + types[key] + "\n";
        }

        // subtypes
        theString += this.#nameTheSet('subtypes');
        let subtypes = jsonObject.subtypes;
        for(let key in subtypes){
            theString += key + ";" + subtypes[key] + "\n";
        }

        // countries
        theString += this.#nameTheSet('countries');
        let countries = jsonObject.countries;
        for(let key in countries){
            theString += key + ";" + countries[key] + "\n";
        }

        theString.trimEnd();

        console.log(theString);
        return theString;
    }

    #nameTheSet(nameOfSet){
        return `#####${nameOfSet}#####\n`;
    }
}