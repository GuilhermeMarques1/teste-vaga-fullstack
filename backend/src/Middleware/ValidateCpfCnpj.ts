function verifyCPF(cpf: string) {  
  cpf = cpf.replace(/[^\d]+/g,'');
  if(cpf == '') return false;
  if (
      cpf.length != 11 || 
      cpf == "00000000000" || 
      cpf == "11111111111" || 
      cpf == "22222222222" || 
      cpf == "33333333333" || 
      cpf == "44444444444" || 
      cpf == "55555555555" || 
      cpf == "66666666666" || 
      cpf == "77777777777" || 
      cpf == "88888888888" || 
      cpf == "99999999999" || 
      cpf == "01234567890" 
    ) return false;      

  let add = 0;
  for (let i=0; i < 9; i ++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;

  if (rev != parseInt(cpf.charAt(9))) return false;

  add = 0;    
  for (let i = 0; i < 10; i ++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }

  rev = 11 - (add % 11);  
  if (rev == 10 || rev == 11) rev = 0;
  
  if (rev != parseInt(cpf.charAt(10))) return false;       
  return true;   
}

function verifyCNPJ(cnpj: string) {
    cnpj = cnpj.replace(/[^\d]+/g,''); 
    let a = new Array();
    let b = 0;
    let c = [6,5,4,3,2,9,8,7,6,5,4,3,2];
    for (let i=0; i<12; i++){
      a[i] = cnpj.charAt(i);
      b = (b + a[i] * c[i + 1]);
    }
    let x;

    if ((x = b % 11) < 2) { a[12] = 0 } else { a[12] = 11-x }

    b = 0;
    for (let y=0; y<13; y++) {
      b += (a[y] * c[y]);
    }

    if ((x = b % 11) < 2) { a[13] = 0; } else { a[13] = 11-x; }
    if ((cnpj.charAt(12) != a[12]) || (cnpj.charAt(13) != a[13])){
        return false;
    }
    if (cnpj == '00000000000000') {
        return false;
    }
    return true;
}


function ValidateCpfCnpj(cpfCnpj: string) {
  let contador = cpfCnpj.replace(/[^0-9]/g,"").length;
  if(contador == 11) {
    if(verifyCPF(cpfCnpj)) {
      return true;
    } else {
      return false;
    }
  } else if(contador == 14) {
    if(verifyCNPJ(cpfCnpj)) {
        return true;
    } else {
        return false;
    }
  } else {
    return false;
  }
}
