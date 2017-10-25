let capstone = require("capstone");
let _ = require("lodash");
let cs = new capstone.Cs(capstone.ARCH_ARM64, capstone.MODE_ARM);

let fs = require("fs");

fs.readFile("./aesmasked.o", (err, code2) => {
  console.log(code2);
  cs.detail = true;
  console.log(JSON.stringify(cs.disasm(code2, 0x1000)));
  cs.close();
});
