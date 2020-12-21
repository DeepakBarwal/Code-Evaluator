let inpCode = document.getElementById('inpCode');
let btnEncode = document.getElementById('btnEncode');
let btnEncrypt = document.getElementById('btnEncrypt');
let code = document.getElementById('code');

btnEncode.onclick = function () {
  let data = inpCode.value;
  data = btoa(data); // converts into base64
  code.value = data;
};

btnEncrypt.onclick = function () {
  let data = code.value;
  data = encryptData(data);
  code.value = data;
};

function encryptData(rawData) {
  let data = '';
  for (char in rawData) {
    //   lower to upper
    if (rawData.charCodeAt(char) >= 97 && rawData.charCodeAt(char) <= 122) {
      data += rawData[char].toUpperCase();
    }
    //   upper to lower
    else if (rawData.charCodeAt(char) >= 65 && rawData.charCodeAt(char) <= 96) {
      data += rawData[char].toLowerCase();
    }
    //   =,/
    else {
      data += rawData[char];
    }
  }
  return data;
}
