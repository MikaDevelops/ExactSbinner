class JsonDataHandler{
    makeJsonString(csvString){
        console.log("json maker started")
        const jsonObject = {};
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
            console.log(splitedLine)
            // country

            // subtype

            // type

            // issuer

            // brand
        }

        return JSON.stringify(jsonObject);
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
}