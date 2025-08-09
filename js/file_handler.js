class FileHandler{
    async loadText(file){
        let textFromFile = await file.text();
        return textFromFile;
    }
}