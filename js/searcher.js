class Searcher{
    search(arrayToSearch, searchTerm){
        let resultArray = [];
        searchTerm = searchTerm.replace(".","");
        searchTerm = searchTerm.replace(",","");
        this.#checkTerm(searchTerm);
        let searchNum = searchTerm.slice(0,9);
        let extraNums=0;
        if(searchNum.length>6) extraNums = searchNum.length-6;

        for (let i=0; i<extraNums+1; i++){
            console.log(searchNum)
            this.#searchArray(arrayToSearch,searchNum,resultArray);
            if (resultArray.length > 0) break;
            searchNum = searchNum.slice(0, -1);
        }
        return resultArray;   
    }
    #checkTerm(term){
        if (isNaN(term)) alert("not a number");
        if (term.length < 6) alert("less than 6 digits");
    }
    #searchArray(arrayToSearch, searchNum, results){
        for (let line of arrayToSearch){
            if(line.startsWith(searchNum)) results.push(line);
        }
    }
}