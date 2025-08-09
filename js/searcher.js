class Searcher{
    search(arrayToSearch, searchTerm){
        let resultArray = [];
        searchTerm = searchTerm.replace(".","");
        searchTerm = searchTerm.replace(",","");
        this.#checkTerm(searchTerm);
        let searchNum = searchTerm.slice(0,9);
        for (let line of arrayToSearch){
            if(line.startsWith(searchNum)) resultArray.push(line);
        }
        return resultArray;   
    }
    #checkTerm(term){
        if (isNaN(term)) alert("not a number");
        if (term.length < 6) alert("less than 6 digits");
    }

}