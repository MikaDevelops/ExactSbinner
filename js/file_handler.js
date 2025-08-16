class FileHandler{
    async loadText(file){
        let textFromFile = await file.text();
        return textFromFile;
    }
    saveTextToFile(textToSave){
        let aElement = document.createElement("a");
        let content = new Blob([textToSave],{type:'text/plain'});
        aElement.href = URL.createObjectURL(content);
        aElement.download = "exact_bins_data.json";
        aElement.click();
    }
}