class JsonDataHandler{
    makeJsonString(csvString){
        const jsonObject = {};
        let linesArray = csvString.split("\n");

        for (let line of linesArray){
            let splitedLine = this.#splitLine(line);

            // country

            // subtype

            // type

            // issuer

            // brand
        }

        return JSON.stringify(jsonObject);
    }
    #splitLine(lineToSplit){
        // TODO
    }
}