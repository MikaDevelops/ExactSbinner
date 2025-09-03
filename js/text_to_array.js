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
        binsLines = binsLines.replace(/^\n/, "");
        binsLines = binsLines.replace(/\n$/, "");
        binsLines = binsLines.split('\n');
        console.log(binsLines);

        let brandLines;
        let issuersLines;
        let typesLines;
        let subtypesLines;
        let countriesLines;


    }

}