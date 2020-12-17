

module.exports = {
    verifyNumber(string_number){
        let is_Number = false;
        if(string_number){
            string_number = string_number.split(" ").join(""); 
          
               if(string_number.substr(0, 2) == '75' || string_number.substr(0, 2) == '76' || string_number.substr(0, 2) == '77'
               || string_number.substr(0, 2) == '77' || string_number.substr(0, 2) == '78' || string_number.substr(0, 2) == '33' )
               {
                is_Num = parseInt(string_number);    
                if(is_Num!= 'NaN'){
                   is_Number = true;
                   return is_Number;
                }else{
                    return is_Number;
                }
        
        }else{
            return is_Number;
        }      
       
    }
    return is_Number;
}
}

// Quelque soit le resultat on return le is_Number
// Si c'est true alors c'est bon si non l'opération échoue