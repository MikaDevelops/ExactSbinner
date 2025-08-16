class JsonDataHandler{
    makeJsonString(csvString){
        const jsonObject = {};
        let linesArray = csvString.split("\n");

        for (let line of linesArray){
            
        }

        return JSON.stringify(jsonObject);
    }
}