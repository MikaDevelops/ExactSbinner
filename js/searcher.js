class Searcher{
    search(arrayToSearch, searchTerm){
        let resultArray = [];
        searchTerm = searchTerm.replace(".","");
        searchTerm = searchTerm.replace(",","");
        searchTerm = searchTerm.replace(" ","");
        this.#checkTerm(searchTerm);
        let searchNum = searchTerm.slice(0,9);
        let searchStatus = {};
        for (let lens in arrayToSearch) searchStatus[lens] = false;
        let searchStatusKeys = Object.keys(searchStatus);
        searchStatusKeys.sort((a,b)=>b-a);
        for (let i=0; i<searchStatusKeys.length; i++) searchStatusKeys[i] = Number(searchStatusKeys[i]);
        let lengthOfTerm = searchNum.length;
        let extraNums=0;
        if(lengthOfTerm>6) extraNums = lengthOfTerm-6;
        for (let i=0; i<extraNums+1; i++){
            let searchableLengths = [];
            for(let number in arrayToSearch){
                if (Number(number)>=searchNum.length) searchableLengths.push(number);
            }
            for(let num of searchableLengths){
                if(!searchStatus[num]){
                    this.#searchArray(arrayToSearch, searchNum, resultArray, num);
                    searchStatus[num] = true;
                }
            }
            if (resultArray.length > 0) break;
            searchNum = searchNum.slice(0, -1);
        }
        return resultArray;   
    }

    #checkTerm(term){
        if (isNaN(term)) alert("not a number");
        if (term.length < 6) alert("less than 6 digits");
    }

    #searchArray(arrayToSearch, searchNum, results, num){
        let toBeSlicedFromLengthier = (Number(num) - searchNum.length)*-1;
        for (let line in arrayToSearch[num]){
            let numberToCompare;
            if(toBeSlicedFromLengthier<0) numberToCompare = line.slice(0, toBeSlicedFromLengthier);
            else numberToCompare = line;
            console.log(numberToCompare);console.log(searchNum);
            if(numberToCompare == searchNum) {
                let information = arrayToSearch[num][line];
                let resultLine = `${line} ${information['brand']} ${information['issuer']} `;
                resultLine += `${information['type']} ${information['subtype']} ${information['country']}`;
                results.push(resultLine);
            }
        }
    }
}