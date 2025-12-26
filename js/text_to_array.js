class TextToArray{
    makeArray(text, type){
        switch(type){
            case 'csv':
                let dataset = this.#makeJsonDataSet(text);
                //return text.split("\n");
                break;
            case 'json':
                return this.#jsonToStringArray(text);
                break;
            case 'csv_combined':
                return this.#csvTablesToStringArray(text);
                break;
            default:
                throw new Error('type not supported in TextToArray.makeArray');
        }
        
    }

    #jsonToStringArray(text){
        let dataObject = JSON.parse(text);
        let linesArray = [];
        for(let key in dataObject.bins){
            let lineString = key + ", " + dataObject.brands[dataObject.bins[key].brand] + ", "
            + dataObject.issuers[dataObject.bins[key].issuer] + ", " 
            + dataObject.types[dataObject.bins[key].type] + ", " 
            + dataObject.subtypes[dataObject.bins[key].subtype] + ", " 
            + dataObject.countries[dataObject.bins[key].country] 
            + "\n";
            linesArray.push(lineString);
        }
        return linesArray;
    }

    #csvTablesToStringArray(text){
        let csvSepararators = {
            bins: '#####bins#####',
            brands: '#####brands#####',
            issuers: '#####issuers#####',
            types: '#####types#####',
            subtypes: '#####subtypes#####',
            countries: '#####countries#####'
        };

        let startPos = csvSepararators.bins.length;
        let endPos = text.indexOf(csvSepararators.brands);

        let binsLines = text.slice(startPos, endPos);
        binsLines = this.#csvLineSplitter(binsLines);

        startPos = text.indexOf(csvSepararators.brands)+csvSepararators.brands.length;
        endPos = text.indexOf(csvSepararators.issuers);

        let brandsLines = text.slice(startPos, endPos);
        brandsLines = this.#csvLineSplitter(brandsLines);

        startPos = text.indexOf(csvSepararators.issuers)+csvSepararators.issuers.length;
        endPos = text.indexOf(csvSepararators.types);

        let issuersLines = text.slice(startPos, endPos);
        issuersLines = this.#csvLineSplitter(issuersLines);

        startPos = text.indexOf(csvSepararators.types)+csvSepararators.types.length;
        endPos = text.indexOf(csvSepararators.subtypes);

        let typesLines = text.slice(startPos, endPos);
        typesLines = this.#csvLineSplitter(typesLines);

        startPos = text.indexOf(csvSepararators.subtypes)+csvSepararators.subtypes.length;
        endPos = text.indexOf(csvSepararators.countries);

        let subtypesLines = text.slice(startPos, endPos);
        subtypesLines = this.#csvLineSplitter(subtypesLines);

        startPos = text.indexOf(csvSepararators.countries)+csvSepararators.countries.length;
        endPos = text.indexOf(text.length-1);

        let countriesLines = text.slice(startPos, endPos);
        countriesLines = this.#csvLineSplitter(countriesLines);

        let resultArray = [];
        for(let line of binsLines){
            line = line.split(';');
            resultArray.push(
                line[0]
                +", "+ brandsLines[line[1]-1].split(';')[1]
                +", "+ issuersLines[line[2]-1].split(';')[1]
                +", "+ typesLines[line[3]-1].split(';')[1]
                +", "+ subtypesLines[line[4]-1].split(';')[1]
                +", "+ countriesLines[line[5]-1].split(';')[1]
            );
        }
        return resultArray;
    }

    #csvLineSplitter(csvText){
        csvText = csvText.replace(/^\n/, "");
        csvText = csvText.replace(/\n$/, "");
        return csvText.split('\n');
    }

    #makeJsonDataSet(text){
        const dataSet = {};
        let arrayOfLines = text.split("\n");
        let startIndex = 0;
        let endIndex = 0;
        for (let line of arrayOfLines){

            endIndex = line.indexOf(",");
            let binNum = line.slice(0,endIndex);
            
            startIndex = endIndex+1;
            endIndex = line.indexOf(",", startIndex);
            let brand = line.slice(startIndex,endIndex);
            if(this.#indexQuotationMarks(brand,0)>-1) {
                endIndex = this.#indexQuotationMarks(line, endIndex);
                startIndex = this.#indexQuotationMarks(line, startIndex)+1;
                brand = line.slice(startIndex,endIndex);
                startIndex = line.indexOf(",", endIndex)+1;
            }
            else{
                startIndex = endIndex+1;
            }
            
            endIndex = line.indexOf(",", startIndex);
            let issuer = line.slice(startIndex,endIndex);
            if(this.#indexQuotationMarks(issuer,0)>-1) {
                endIndex = this.#indexQuotationMarks(line, endIndex);
                startIndex = this.#indexQuotationMarks(line, startIndex)+1;
                issuer = line.slice(startIndex,endIndex);
                startIndex = line.indexOf(",", endIndex)+1;
            }
            else{
                startIndex = endIndex+1;
            }
            
            endIndex = line.indexOf(",", startIndex);
            let type = line.slice(startIndex, endIndex);

            startIndex = endIndex+1;
            endIndex = line.indexOf(",", startIndex);
            let subtype = line.slice(startIndex,endIndex);

            startIndex = endIndex+1;
            endIndex = line.indexOf(",", startIndex);
            let country = line.slice(startIndex,endIndex);

            dataSet[binNum] = {
                brand: brand,
                issuer: issuer,
                type: type,
                subtype: subtype,
                country: country
            };
        }
        console.log(dataSet);
    }

    #indexQuotationMarks(text, startIndex){
        let quotationIndex = text.indexOf('"', startIndex);
        return quotationIndex;
    }
}