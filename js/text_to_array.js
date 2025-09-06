class TextToArray{
    makeArray(text, type){
        switch(type){
            case 'csv':
                return text.split("\n");
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

}